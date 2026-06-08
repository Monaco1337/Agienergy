'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { newId, nowIso } from '@elo/core';
import type { Lead, LeadId, LeadStatus, Note, ContactEvent } from '@elo/core';
import { getStorage } from '@elo/storage';
import { logAudit, diffObjects } from '@elo/audit';
import { requireSession, getCurrentPartnerId, isAdminRole, canSeeLead } from '@/lib/agi/permissions';
import { computePartnerLoad, pickPartnerForLead } from '@/lib/agi/routing';

const LEAD_STATUSES: readonly LeadStatus[] = [
  'Neu',
  'Zu prüfen',
  'Priorisiert',
  'Heute anrufen',
  'Angerufen',
  'Nicht erreicht',
  'Rückruf geplant',
  'Unterlagen angefordert',
  'Rechnung erhalten',
  'Beratung durchgeführt',
  'Angebot vorbereitet',
  'Angebot gesendet',
  'Abschluss wahrscheinlich',
  'Abgeschlossen',
  'Verloren',
  'Gesperrt',
];

async function loadLeadOrAbort(id: string): Promise<Lead> {
  const storage = getStorage();
  const lead = await storage.getLead(id as LeadId);
  if (!lead) throw new Error('Lead nicht gefunden.');
  return lead;
}

async function ensureCanEdit(leadId: string) {
  const session = await requireSession();
  const lead = await loadLeadOrAbort(leadId);
  const partnerId = await getCurrentPartnerId(session);
  if (!canSeeLead(lead, session, partnerId)) {
    throw new Error('Kein Zugriff auf diesen Lead.');
  }
  // Partner darf bestimmte Felder bearbeiten, aber nicht alle. Wir
  // unterscheiden im jeweiligen Action-Handler.
  return { session, lead, partnerId };
}

// ─── Status ändern ──────────────────────────────────────────────────────

const statusSchema = z.object({
  leadId: z.string().min(1),
  status: z.enum(LEAD_STATUSES as readonly [LeadStatus, ...LeadStatus[]]),
  reason: z.string().optional(),
  redirectTo: z.string().optional(),
});

export async function updateLeadStatusAction(formData: FormData): Promise<void> {
  const parsed = statusSchema.parse({
    leadId: formData.get('leadId'),
    status: formData.get('status'),
    reason: formData.get('reason') || undefined,
    redirectTo: formData.get('redirectTo') || undefined,
  });

  const { session, lead } = await ensureCanEdit(parsed.leadId);
  const storage = getStorage();

  const patch: Partial<Lead> = { status: parsed.status };
  if (parsed.status === 'Abgeschlossen') patch.closedAt = nowIso();
  if (parsed.status === 'Verloren') patch.closedAt = nowIso();

  const updated = await storage.updateLead(lead.id, patch);
  if (!updated) throw new Error('Update fehlgeschlagen.');

  await logAudit({
    ctx: { actorId: session.userId, actorRole: session.role },
    action: 'lead.status_changed',
    entity: 'lead',
    entityId: lead.id,
    diff: diffObjects(lead, updated, ['status', 'closedAt']),
  });

  revalidatePath('/admin', 'layout');
  if (parsed.redirectTo) redirect(parsed.redirectTo);
}

// ─── Notiz hinzufügen ──────────────────────────────────────────────────

const noteSchema = z.object({
  leadId: z.string().min(1),
  text: z.string().min(1).max(4000),
  redirectTo: z.string().optional(),
});

export async function addLeadNoteAction(formData: FormData): Promise<void> {
  const parsed = noteSchema.parse({
    leadId: formData.get('leadId'),
    text: formData.get('text'),
    redirectTo: formData.get('redirectTo') || undefined,
  });
  const { session, lead } = await ensureCanEdit(parsed.leadId);
  const storage = getStorage();

  const note: Note = {
    id: newId('note'),
    createdAt: nowIso(),
    author: session.email,
    text: parsed.text.trim(),
  };

  const updated = await storage.updateLead(lead.id, {
    notes: [note, ...lead.notes],
  });
  if (!updated) throw new Error('Notiz konnte nicht gespeichert werden.');

  await logAudit({
    ctx: { actorId: session.userId, actorRole: session.role },
    action: 'lead.note_added',
    entity: 'lead',
    entityId: lead.id,
  });

  revalidatePath('/admin', 'layout');
  if (parsed.redirectTo) redirect(parsed.redirectTo);
}

// ─── Kontaktevent loggen ───────────────────────────────────────────────

const contactSchema = z.object({
  leadId: z.string().min(1),
  type: z.enum(['call', 'email', 'whatsapp', 'note', 'meeting', 'offer']),
  result: z.enum(['reached', 'not_reached', 'interested', 'not_interested', 'callback', 'closed', 'lost']),
  text: z.string().max(2000).optional(),
  redirectTo: z.string().optional(),
});

export async function logLeadContactAction(formData: FormData): Promise<void> {
  const parsed = contactSchema.parse({
    leadId: formData.get('leadId'),
    type: formData.get('type'),
    result: formData.get('result'),
    text: formData.get('text') || undefined,
    redirectTo: formData.get('redirectTo') || undefined,
  });
  const { session, lead } = await ensureCanEdit(parsed.leadId);
  const storage = getStorage();

  const event: ContactEvent = {
    id: newId('cevt'),
    createdAt: nowIso(),
    type: parsed.type,
    direction: 'outbound',
    result: parsed.result,
    text: parsed.text?.trim() ?? '',
    createdBy: session.email,
  };

  const patch: Partial<Lead> = {
    contactHistory: [event, ...lead.contactHistory],
    lastContactAt: event.createdAt,
  };
  if (parsed.result === 'reached' && lead.status === 'Neu') patch.status = 'Angerufen';
  if (parsed.result === 'not_reached' && (lead.status === 'Neu' || lead.status === 'Heute anrufen'))
    patch.status = 'Nicht erreicht';
  if (parsed.result === 'callback') patch.status = 'Rückruf geplant';

  const updated = await storage.updateLead(lead.id, patch);
  if (!updated) throw new Error('Kontakt-Log fehlgeschlagen.');

  await logAudit({
    ctx: { actorId: session.userId, actorRole: session.role },
    action: 'lead.contact_logged',
    entity: 'lead',
    entityId: lead.id,
  });

  revalidatePath('/admin', 'layout');
  if (parsed.redirectTo) redirect(parsed.redirectTo);
}

// ─── Lead löschen ──────────────────────────────────────────────────────

const deleteSchema = z.object({
  leadId: z.string().min(1),
  redirectTo: z.string().optional(),
});

export async function deleteLeadAction(formData: FormData): Promise<void> {
  const parsed = deleteSchema.parse({
    leadId: formData.get('leadId'),
    redirectTo: formData.get('redirectTo') || undefined,
  });
  const session = await requireSession();
  if (!isAdminRole(session.role)) throw new Error('Nur Admin darf Leads löschen.');
  const storage = getStorage();
  const lead = await storage.getLead(parsed.leadId as LeadId);
  if (!lead) throw new Error('Lead nicht gefunden.');

  await storage.deleteLead(lead.id);

  await logAudit({
    ctx: { actorId: session.userId, actorRole: session.role },
    action: 'lead.deleted',
    entity: 'lead',
    entityId: lead.id,
  });

  revalidatePath('/admin', 'layout');
  redirect(parsed.redirectTo ?? '/admin/leads');
}

// ─── Manuelle Zuweisung ────────────────────────────────────────────────

const assignSchema = z.object({
  leadId: z.string().min(1),
  partnerId: z.string().min(1),
  redirectTo: z.string().optional(),
});

export async function assignLeadAction(formData: FormData): Promise<void> {
  const parsed = assignSchema.parse({
    leadId: formData.get('leadId'),
    partnerId: formData.get('partnerId'),
    redirectTo: formData.get('redirectTo') || undefined,
  });
  const session = await requireSession();
  if (!isAdminRole(session.role)) throw new Error('Nur Admin darf zuweisen.');
  const storage = getStorage();
  const lead = await storage.getLead(parsed.leadId as LeadId);
  if (!lead) throw new Error('Lead nicht gefunden.');
  const partner = await storage.getPartner(parsed.partnerId as never);
  if (!partner) throw new Error('Partner nicht gefunden.');

  const before = { ...lead };
  const updated = await storage.updateLead(lead.id, {
    assignedPartnerId: partner.id,
    assignedAt: nowIso(),
    status: lead.status === 'Neu' ? 'Priorisiert' : lead.status,
  });
  if (!updated) throw new Error('Zuweisung fehlgeschlagen.');

  await logAudit({
    ctx: { actorId: session.userId, actorRole: session.role },
    action: 'lead.assigned',
    entity: 'lead',
    entityId: lead.id,
    diff: diffObjects(before, updated, ['assignedPartnerId', 'assignedAt', 'status']),
  });

  revalidatePath('/admin', 'layout');
  if (parsed.redirectTo) redirect(parsed.redirectTo);
}

const unassignSchema = z.object({
  leadId: z.string().min(1),
  redirectTo: z.string().optional(),
});

export async function unassignLeadAction(formData: FormData): Promise<void> {
  const parsed = unassignSchema.parse({
    leadId: formData.get('leadId'),
    redirectTo: formData.get('redirectTo') || undefined,
  });
  const session = await requireSession();
  if (!isAdminRole(session.role)) throw new Error('Nur Admin darf entziehen.');
  const storage = getStorage();
  const lead = await storage.getLead(parsed.leadId as LeadId);
  if (!lead) throw new Error('Lead nicht gefunden.');

  const before = { ...lead };
  const updated = await storage.updateLead(lead.id, {
    assignedPartnerId: undefined,
    assignedAt: undefined,
  });
  if (!updated) throw new Error('Entfernen fehlgeschlagen.');

  await logAudit({
    ctx: { actorId: session.userId, actorRole: session.role },
    action: 'lead.unassigned',
    entity: 'lead',
    entityId: lead.id,
    diff: diffObjects(before, updated, ['assignedPartnerId', 'assignedAt']),
  });

  revalidatePath('/admin', 'layout');
  if (parsed.redirectTo) redirect(parsed.redirectTo);
}

// ─── Auto-Routing (alle unverteilten Leads) ────────────────────────────

const autoRouteSchema = z.object({
  redirectTo: z.string().optional(),
});

export async function autoRouteUnassignedAction(formData: FormData): Promise<void> {
  const parsed = autoRouteSchema.parse({ redirectTo: formData.get('redirectTo') || undefined });
  const session = await requireSession();
  if (!isAdminRole(session.role)) throw new Error('Nur Admin darf auto-routen.');
  const storage = getStorage();

  const [unassigned, partners, allLeads] = await Promise.all([
    storage.listLeads({ unassigned: true }),
    storage.listPartners({ statuses: ['active'] }),
    storage.listLeads(),
  ]);

  const load = computePartnerLoad(partners, allLeads);

  let routed = 0;
  // Wir adjustieren `load` während der Iteration, damit die Kapazität
  // nicht in einem Schwung überschritten wird.
  const loadCopy = load.map((l) => ({ ...l }));

  for (const lead of unassigned) {
    const decision = pickPartnerForLead(lead, partners, loadCopy);
    if (!decision.partnerId) continue;
    const before = { ...lead };
    const updated = await storage.updateLead(lead.id, {
      assignedPartnerId: decision.partnerId,
      assignedAt: nowIso(),
      status: lead.status === 'Neu' ? 'Priorisiert' : lead.status,
    });
    if (updated) {
      routed += 1;
      const target = loadCopy.find((l) => l.partner.id === decision.partnerId);
      if (target) {
        target.activeLeads += 1;
        target.utilization = Math.min(1, target.activeLeads / target.partner.capacity);
      }
      await logAudit({
        ctx: { actorId: session.userId, actorRole: session.role },
        action: 'lead.assigned',
        entity: 'lead',
        entityId: lead.id,
        diff: diffObjects(before, updated, ['assignedPartnerId', 'assignedAt', 'status']),
      });
    }
  }

  revalidatePath('/admin', 'layout');
  redirect(parsed.redirectTo ?? `/admin/distribution?routed=${routed}`);
}

// ─── Single auto-route (für einen einzelnen Lead) ──────────────────────

export async function autoRouteSingleLeadAction(formData: FormData): Promise<void> {
  const parsed = z.object({
    leadId: z.string().min(1),
    redirectTo: z.string().optional(),
  }).parse({
    leadId: formData.get('leadId'),
    redirectTo: formData.get('redirectTo') || undefined,
  });
  const session = await requireSession();
  if (!isAdminRole(session.role)) throw new Error('Nur Admin darf auto-routen.');
  const storage = getStorage();
  const lead = await storage.getLead(parsed.leadId as LeadId);
  if (!lead) throw new Error('Lead nicht gefunden.');
  const [partners, allLeads] = await Promise.all([
    storage.listPartners({ statuses: ['active'] }),
    storage.listLeads(),
  ]);
  const load = computePartnerLoad(partners, allLeads);
  const decision = pickPartnerForLead(lead, partners, load);
  if (!decision.partnerId) {
    revalidatePath('/admin', 'layout');
    if (parsed.redirectTo) redirect(parsed.redirectTo);
    return;
  }
  const before = { ...lead };
  const updated = await storage.updateLead(lead.id, {
    assignedPartnerId: decision.partnerId,
    assignedAt: nowIso(),
    status: lead.status === 'Neu' ? 'Priorisiert' : lead.status,
  });
  if (updated) {
    await logAudit({
      ctx: { actorId: session.userId, actorRole: session.role },
      action: 'lead.assigned',
      entity: 'lead',
      entityId: lead.id,
      diff: diffObjects(before, updated, ['assignedPartnerId', 'assignedAt', 'status']),
    });
  }
  revalidatePath('/admin', 'layout');
  if (parsed.redirectTo) redirect(parsed.redirectTo);
}
