import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getStorage } from '@elo/storage';
import type { LeadId, PartnerId } from '@elo/core';
import { requireSession, isAdminRole, isPartnerRole, getCurrentPartnerId } from '@/lib/agi/permissions';
import { LeadDrawer } from '@/components/agi/leads/LeadDrawer';

export const dynamic = 'force-dynamic';

export default async function LeadDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await requireSession();
  const { id } = await params;
  const storage = getStorage();
  const lead = await storage.getLead(id as LeadId);
  if (!lead) notFound();

  const partnerId = await getCurrentPartnerId(session);
  // Sichtbarkeit: Partner darf nur eigene Leads sehen
  if (isPartnerRole(session.role) && (!partnerId || lead.assignedPartnerId !== partnerId)) {
    notFound();
  }

  const [partners, assignedPartner] = await Promise.all([
    isAdminRole(session.role) ? storage.listPartners({ statuses: ['active'] }) : Promise.resolve([]),
    lead.assignedPartnerId ? storage.getPartner(lead.assignedPartnerId as PartnerId) : Promise.resolve(null),
  ]);

  const canAdmin = isAdminRole(session.role);
  const canEdit = canAdmin || isPartnerRole(session.role);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <Link
          href={isAdminRole(session.role) ? '/admin/leads' : '/admin/meine-leads'}
          className="text-[12px] text-[var(--ops-text-2)] hover:text-[var(--ops-cyan)]"
        >
          ← Zurück
        </Link>
      </div>
      <LeadDrawer
        lead={lead}
        partners={partners}
        assignedPartner={assignedPartner}
        canAdmin={canAdmin}
        canEdit={canEdit}
        redirectTo={`/admin/leads/${lead.id}`}
      />
    </div>
  );
}
