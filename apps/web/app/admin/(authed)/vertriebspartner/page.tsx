import Link from 'next/link';
import { getStorage } from '@elo/storage';
import { requireRole } from '@/lib/agi/permissions';
import { PartnerCard, type PartnerCardData } from '@/components/agi/partners/PartnerCard';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Vertriebspartner · AGI Operations' };

function isInThisMonth(iso?: string): boolean {
  if (!iso) return false;
  const d = new Date(iso);
  const now = new Date();
  return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth();
}

export default async function PartnersPage() {
  await requireRole(['admin', 'sales']);
  const storage = getStorage();
  const [partners, leads, deals, commissions] = await Promise.all([
    storage.listPartners(),
    storage.listLeads(),
    storage.listDeals(),
    storage.listCommissions(),
  ]);

  const data: PartnerCardData[] = partners.map((p) => {
    const myLeads = leads.filter((l) => l.assignedPartnerId === p.id);
    const active = myLeads.filter(
      (l) => l.status !== 'Abgeschlossen' && l.status !== 'Verloren' && l.status !== 'Gesperrt',
    ).length;
    const closed = myLeads.filter((l) => l.status === 'Abgeschlossen');
    const conv = myLeads.length > 0 ? closed.length / myLeads.length : 0;
    const closedMonth = deals.filter(
      (d) => d.partnerId === p.id && d.status === 'confirmed' && isInThisMonth(d.closedAt ?? d.updatedAt),
    ).length;
    const pendingCom = commissions
      .filter((c) => c.partnerId === p.id && (c.status === 'pending' || c.status === 'approved'))
      .reduce((sum, c) => sum + (c.amount ?? 0), 0);
    return {
      partner: p,
      activeLeads: active,
      totalAssigned: myLeads.length,
      closedThisMonth: closedMonth,
      conversionRate: conv,
      pendingCommission: pendingCom,
    };
  });
  data.sort((a, b) => {
    const sr =
      ['active', 'paused', 'full', 'inactive'].indexOf(a.partner.status) -
      ['active', 'paused', 'full', 'inactive'].indexOf(b.partner.status);
    if (sr !== 0) return sr;
    return b.totalAssigned - a.totalAssigned;
  });

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="text-[11px] uppercase tracking-[0.18em] text-[var(--ops-muted)]">Vertrieb</div>
          <h1 className="font-display text-[28px] sm:text-[32px] tracking-[-0.015em] text-[var(--ops-text)]">
            Vertriebspartner
          </h1>
          <p className="mt-1 text-[13.5px] text-[var(--ops-text-2)] max-w-2xl">
            Stammdaten, Kapazitäten und Performance der angeschlossenen Partner.
          </p>
        </div>
        <Link href="/admin/vertriebspartner/neu" className="ops-cta h-10 rounded-lg">
          + Partner anlegen
        </Link>
      </header>

      {data.length === 0 ? (
        <div className="ops-card p-10 text-center">
          <h2 className="text-[18px] font-display font-semibold text-[var(--ops-text)]">
            Noch keine Vertriebspartner
          </h2>
          <p className="mt-2 text-[13.5px] text-[var(--ops-text-2)]">
            Lege deinen ersten Partner an, um Leads verteilen zu können.
          </p>
          <Link href="/admin/vertriebspartner/neu" className="ops-cta inline-flex mt-4 h-10 rounded-lg">
            Ersten Partner anlegen
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {data.map((d) => (
            <PartnerCard key={d.partner.id} data={d} />
          ))}
        </div>
      )}
    </div>
  );
}
