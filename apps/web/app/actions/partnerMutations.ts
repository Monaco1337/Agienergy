'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { newId, nowIso } from '@elo/core';
import type { Partner, PartnerId, PartnerSpecialty, PartnerStatus } from '@elo/core';
import { getStorage } from '@elo/storage';
import { logAudit, diffObjects } from '@elo/audit';
import { requireSession, isAdminRole } from '@/lib/agi/permissions';

const SPECIALTIES: readonly PartnerSpecialty[] = ['strom', 'gas', 'photovoltaik', 'strom_gas', 'gewerbe'];
const STATUSES: readonly PartnerStatus[] = ['active', 'paused', 'full', 'inactive'];

const upsertSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2).max(120),
  email: z.string().email(),
  phone: z.string().max(40).optional(),
  regionLabel: z.string().max(120).optional(),
  regionPrefixes: z.string().max(200).optional(),
  capacity: z
    .preprocess((v) => (typeof v === 'string' ? Number(v) : v), z.number().int().min(0).max(10_000))
    .default(20 as never),
  routingWeight: z
    .preprocess((v) => (typeof v === 'string' && v ? Number(v) : v ?? 0), z.number().int().min(0).max(100))
    .default(0 as never),
  status: z.enum(STATUSES as readonly [PartnerStatus, ...PartnerStatus[]]).default('active'),
  specialties: z
    .union([z.string(), z.array(z.string())])
    .transform((v) => (Array.isArray(v) ? v : v ? [v] : []) as string[]),
  redirectTo: z.string().optional(),
});

export async function upsertPartnerAction(formData: FormData): Promise<void> {
  const raw = {
    id: (formData.get('id') as string) || undefined,
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone') || undefined,
    regionLabel: formData.get('regionLabel') || undefined,
    regionPrefixes: (formData.get('regionPrefixes') as string) || undefined,
    capacity: formData.get('capacity'),
    routingWeight: formData.get('routingWeight'),
    status: (formData.get('status') as string) || 'active',
    specialties: formData.getAll('specialties').map(String),
    redirectTo: (formData.get('redirectTo') as string) || undefined,
  };
  const parsed = upsertSchema.parse(raw);

  const session = await requireSession();
  if (!isAdminRole(session.role)) throw new Error('Nur Admin darf Partner verwalten.');
  const storage = getStorage();

  const specialties = parsed.specialties
    .map((s) => s as PartnerSpecialty)
    .filter((s) => SPECIALTIES.includes(s));
  const prefixes = (parsed.regionPrefixes ?? '')
    .split(/[\s,]+/)
    .map((p) => p.trim())
    .filter(Boolean);

  if (parsed.id) {
    const existing = await storage.getPartner(parsed.id as PartnerId);
    if (!existing) throw new Error('Partner nicht gefunden.');
    const updated = await storage.updatePartner(existing.id, {
      name: parsed.name,
      email: parsed.email.toLowerCase(),
      phone: parsed.phone,
      regionLabel: parsed.regionLabel,
      regionPrefixes: prefixes,
      capacity: parsed.capacity,
      routingWeight: parsed.routingWeight,
      status: parsed.status,
      specialties,
    });
    if (updated) {
      await logAudit({
        ctx: { actorId: session.userId, actorRole: session.role },
        action: 'partner.updated',
        entity: 'partner',
        entityId: existing.id,
        diff: diffObjects(existing, updated, [
          'name',
          'email',
          'phone',
          'regionLabel',
          'regionPrefixes',
          'capacity',
          'routingWeight',
          'status',
          'specialties',
        ]),
      });
    }
  } else {
    const partner: Partner = {
      id: newId('prt') as PartnerId,
      createdAt: nowIso(),
      updatedAt: nowIso(),
      name: parsed.name,
      email: parsed.email.toLowerCase(),
      phone: parsed.phone,
      regionLabel: parsed.regionLabel,
      regionPrefixes: prefixes,
      specialties,
      capacity: parsed.capacity,
      routingWeight: parsed.routingWeight,
      status: parsed.status,
    };
    await storage.createPartner(partner);
    await logAudit({
      ctx: { actorId: session.userId, actorRole: session.role },
      action: 'partner.created',
      entity: 'partner',
      entityId: partner.id,
    });
  }

  revalidatePath('/admin', 'layout');
  redirect(parsed.redirectTo ?? '/admin/vertriebspartner');
}

const setStatusSchema = z.object({
  id: z.string().min(1),
  status: z.enum(STATUSES as readonly [PartnerStatus, ...PartnerStatus[]]),
  redirectTo: z.string().optional(),
});

export async function setPartnerStatusAction(formData: FormData): Promise<void> {
  const parsed = setStatusSchema.parse({
    id: formData.get('id'),
    status: formData.get('status'),
    redirectTo: formData.get('redirectTo') || undefined,
  });
  const session = await requireSession();
  if (!isAdminRole(session.role)) throw new Error('Nur Admin.');
  const storage = getStorage();
  const partner = await storage.getPartner(parsed.id as PartnerId);
  if (!partner) throw new Error('Partner nicht gefunden.');
  const updated = await storage.updatePartner(partner.id, { status: parsed.status });
  if (updated) {
    await logAudit({
      ctx: { actorId: session.userId, actorRole: session.role },
      action: parsed.status === 'inactive' ? 'partner.suspended' : 'partner.reactivated',
      entity: 'partner',
      entityId: partner.id,
      diff: diffObjects(partner, updated, ['status']),
    });
  }
  revalidatePath('/admin', 'layout');
  if (parsed.redirectTo) redirect(parsed.redirectTo);
}

const deleteSchema = z.object({
  id: z.string().min(1),
  redirectTo: z.string().optional(),
});

export async function deletePartnerAction(formData: FormData): Promise<void> {
  const parsed = deleteSchema.parse({
    id: formData.get('id'),
    redirectTo: formData.get('redirectTo') || undefined,
  });
  const session = await requireSession();
  if (!isAdminRole(session.role)) throw new Error('Nur Admin.');
  const storage = getStorage();

  // Sicherheits-Check: Partner darf nicht gelöscht werden, wenn ihm
  // noch aktive Leads gehören – Admin sollte vorher reassignen.
  const leads = await storage.listLeads({ assignedPartnerId: parsed.id });
  const activeLeads = leads.filter(
    (l) => l.status !== 'Abgeschlossen' && l.status !== 'Verloren' && l.status !== 'Gesperrt',
  );
  if (activeLeads.length > 0) {
    throw new Error(
      `Partner hat ${activeLeads.length} aktive Leads. Bitte zuerst neu zuweisen oder Status ändern.`,
    );
  }

  const ok = await storage.deletePartner(parsed.id as PartnerId);
  if (ok) {
    await logAudit({
      ctx: { actorId: session.userId, actorRole: session.role },
      action: 'partner.deleted',
      entity: 'partner',
      entityId: parsed.id,
    });
  }
  revalidatePath('/admin', 'layout');
  redirect(parsed.redirectTo ?? '/admin/vertriebspartner');
}
