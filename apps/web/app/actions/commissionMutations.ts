'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { nowIso } from '@elo/core';
import type { CommissionId, CommissionStatus } from '@elo/core';
import { getStorage } from '@elo/storage';
import { logAudit } from '@elo/audit';
import { requireSession, isAdminRole } from '@/lib/agi/permissions';

const STATUSES: readonly CommissionStatus[] = ['pending', 'approved', 'paid', 'rejected', 'cancelled'];

const setStatusSchema = z.object({
  id: z.string().min(1),
  status: z.enum(STATUSES as readonly [CommissionStatus, ...CommissionStatus[]]),
  notes: z.string().max(1000).optional(),
  redirectTo: z.string().optional(),
});

export async function setCommissionStatusAction(formData: FormData): Promise<void> {
  const parsed = setStatusSchema.parse({
    id: formData.get('id'),
    status: formData.get('status'),
    notes: formData.get('notes') || undefined,
    redirectTo: formData.get('redirectTo') || undefined,
  });
  const session = await requireSession();
  if (!isAdminRole(session.role)) throw new Error('Nur Admin.');
  const storage = getStorage();
  const c = await storage.getCommission(parsed.id as CommissionId);
  if (!c) throw new Error('Provision nicht gefunden.');

  const patch: Parameters<typeof storage.updateCommission>[1] = {
    status: parsed.status,
    notes: parsed.notes ?? c.notes,
  };
  if (parsed.status === 'approved') {
    patch.approvedAt = nowIso();
    patch.approvedBy = session.userId;
  }
  if (parsed.status === 'paid') {
    patch.paidAt = nowIso();
  }

  const updated = await storage.updateCommission(c.id, patch);
  if (updated) {
    await logAudit({
      ctx: { actorId: session.userId, actorRole: session.role },
      action:
        parsed.status === 'approved'
          ? 'commission.approved'
          : parsed.status === 'paid'
            ? 'commission.paid'
            : parsed.status === 'rejected'
              ? 'commission.rejected'
              : 'commission.created',
      entity: 'commission',
      entityId: c.id,
    });
  }
  revalidatePath('/admin', 'layout');
  if (parsed.redirectTo) redirect(parsed.redirectTo);
}
