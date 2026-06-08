'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { newId, nowIso } from '@elo/core';
import type {
  Deal,
  DealId,
  DealProduct,
  DealStatus,
  Commission,
  CommissionId,
  LeadId,
  PartnerId,
} from '@elo/core';
import { getStorage } from '@elo/storage';
import { logAudit } from '@elo/audit';
import { requireSession, isAdminRole, getCurrentPartnerId, isPartnerRole } from '@/lib/agi/permissions';

const PRODUCTS: readonly DealProduct[] = ['strom', 'gas', 'photovoltaik', 'strom_gas', 'gewerbe', 'other'];
const STATUSES: readonly DealStatus[] = ['reported', 'review', 'confirmed', 'rejected', 'cancelled'];

const reportSchema = z.object({
  leadId: z.string().min(1),
  product: z.enum(PRODUCTS as readonly [DealProduct, ...DealProduct[]]),
  productLabel: z.string().max(120).optional(),
  value: z
    .preprocess(
      (v) => (typeof v === 'string' && v.length > 0 ? Number(v) : undefined),
      z.number().positive().max(10_000_000).optional(),
    ),
  expectedCommission: z
    .preprocess(
      (v) => (typeof v === 'string' && v.length > 0 ? Number(v) : undefined),
      z.number().positive().max(1_000_000).optional(),
    ),
  notes: z.string().max(2000).optional(),
  closedAt: z.string().optional(),
  redirectTo: z.string().optional(),
});

export async function reportDealAction(formData: FormData): Promise<void> {
  const parsed = reportSchema.parse({
    leadId: formData.get('leadId'),
    product: formData.get('product') ?? 'strom',
    productLabel: formData.get('productLabel') || undefined,
    value: formData.get('value') || undefined,
    expectedCommission: formData.get('expectedCommission') || undefined,
    notes: formData.get('notes') || undefined,
    closedAt: formData.get('closedAt') || undefined,
    redirectTo: formData.get('redirectTo') || undefined,
  });

  const session = await requireSession();
  const storage = getStorage();
  const lead = await storage.getLead(parsed.leadId as LeadId);
  if (!lead) throw new Error('Lead nicht gefunden.');

  // Partner darf nur eigene Leads abschließen
  if (isPartnerRole(session.role)) {
    const partnerId = await getCurrentPartnerId(session);
    if (!partnerId || lead.assignedPartnerId !== partnerId) {
      throw new Error('Lead nicht dir zugewiesen.');
    }
  }
  if (!lead.assignedPartnerId) {
    throw new Error('Lead muss zuerst einem Partner zugewiesen sein.');
  }

  const deal: Deal = {
    id: newId('deal') as DealId,
    createdAt: nowIso(),
    updatedAt: nowIso(),
    leadId: lead.id,
    partnerId: lead.assignedPartnerId as PartnerId,
    product: parsed.product,
    productLabel: parsed.productLabel,
    status: 'reported',
    value: parsed.value,
    expectedCommission: parsed.expectedCommission,
    notes: parsed.notes,
    closedAt: parsed.closedAt && parsed.closedAt.length > 0 ? parsed.closedAt : nowIso(),
    reportedBy: session.userId,
  };
  await storage.createDeal(deal);

  // Lead-Status auf "Abschluss wahrscheinlich" setzen, falls noch offen
  if (lead.status !== 'Abgeschlossen' && lead.status !== 'Verloren') {
    await storage.updateLead(lead.id, { status: 'Abschluss wahrscheinlich' });
  }

  await logAudit({
    ctx: { actorId: session.userId, actorRole: session.role },
    action: 'deal.reported',
    entity: 'deal',
    entityId: deal.id,
  });

  revalidatePath('/admin', 'layout');
  if (parsed.redirectTo) redirect(parsed.redirectTo);
}

const setStatusSchema = z.object({
  id: z.string().min(1),
  status: z.enum(STATUSES as readonly [DealStatus, ...DealStatus[]]),
  notes: z.string().max(1000).optional(),
  redirectTo: z.string().optional(),
});

export async function setDealStatusAction(formData: FormData): Promise<void> {
  const parsed = setStatusSchema.parse({
    id: formData.get('id'),
    status: formData.get('status'),
    notes: formData.get('notes') || undefined,
    redirectTo: formData.get('redirectTo') || undefined,
  });
  const session = await requireSession();
  if (!isAdminRole(session.role)) throw new Error('Nur Admin darf Abschlüsse prüfen.');
  const storage = getStorage();
  const deal = await storage.getDeal(parsed.id as DealId);
  if (!deal) throw new Error('Abschluss nicht gefunden.');

  const updated = await storage.updateDeal(deal.id, {
    status: parsed.status,
    notes: parsed.notes ?? deal.notes,
    reviewedBy: session.userId,
  });
  if (!updated) throw new Error('Update fehlgeschlagen.');

  // Bei `confirmed`: Lead schließen + Provision anlegen
  if (parsed.status === 'confirmed') {
    const lead = await storage.getLead(deal.leadId);
    if (lead) {
      await storage.updateLead(lead.id, { status: 'Abgeschlossen', closedAt: nowIso() });
    }
    if (deal.expectedCommission && deal.expectedCommission > 0) {
      const commission: Commission = {
        id: newId('com') as CommissionId,
        createdAt: nowIso(),
        updatedAt: nowIso(),
        dealId: deal.id,
        partnerId: deal.partnerId,
        amount: deal.expectedCommission,
        currency: 'EUR',
        status: 'pending',
      };
      await storage.createCommission(commission);
      await logAudit({
        ctx: { actorId: session.userId, actorRole: session.role },
        action: 'commission.created',
        entity: 'commission',
        entityId: commission.id,
      });
    }
  }

  if (parsed.status === 'rejected' || parsed.status === 'cancelled') {
    const lead = await storage.getLead(deal.leadId);
    if (lead && lead.status === 'Abschluss wahrscheinlich') {
      await storage.updateLead(lead.id, { status: 'Beratung durchgeführt' });
    }
  }

  await logAudit({
    ctx: { actorId: session.userId, actorRole: session.role },
    action:
      parsed.status === 'confirmed'
        ? 'deal.confirmed'
        : parsed.status === 'rejected'
          ? 'deal.rejected'
          : parsed.status === 'cancelled'
            ? 'deal.cancelled'
            : 'deal.reported',
    entity: 'deal',
    entityId: deal.id,
  });

  revalidatePath('/admin', 'layout');
  if (parsed.redirectTo) redirect(parsed.redirectTo);
}
