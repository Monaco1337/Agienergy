import Link from 'next/link';
import type { Commission, CommissionStatus, Deal, Partner } from '@elo/core';
import { getStorage } from '@elo/storage';
import { requireSession, isAdminRole, isPartnerRole, getCurrentPartnerId } from '@/lib/agi/permissions';
import { setCommissionStatusAction } from '@/app/actions/commissionMutations';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Provisionen · AGI Operations' };

const STATUS_TONE: Record<CommissionStatus, 'cyan' | 'gold' | 'success' | 'critical' | 'warning'> = {
  pending: 'cyan',
  approved: 'gold',
  paid: 'success',
  rejected: 'critical',
  cancelled: 'warning',
};

const STATUS_LABEL: Record<CommissionStatus, string> = {
  pending: 'Offen',
  approved: 'Freigegeben',
  paid: 'Ausgezahlt',
  rejected: 'Abgelehnt',
  cancelled: 'Storniert',
};

function fmtEur(v?: number): string {
  if (v == null) return '—';
  return v.toLocaleString('de-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 });
}
function fmtDate(iso?: string): string {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString('de-DE');
}

export default async function CommissionsPage() {
  const session = await requireSession();
  const storage = getStorage();
  const partnerId = await getCurrentPartnerId(session);

  const filter = isPartnerRole(session.role) && partnerId ? { partnerId: partnerId as never } : {};
  const [commissions, deals, partners] = await Promise.all([
    storage.listCommissions(filter),
    storage.listDeals(),
    storage.listPartners(),
  ]);
  const dealById: Record<string, Deal> = Object.fromEntries(deals.map((d) => [d.id, d]));
  const partnerById: Record<string, Partner> = Object.fromEntries(partners.map((p) => [p.id, p]));

  const sums = (status: CommissionStatus) =>
    commissions.filter((c) => c.status === status).reduce((sum, c) => sum + (c.amount ?? 0), 0);

  const sumPending = sums('pending');
  const sumApproved = sums('approved');
  const sumPaid = sums('paid');

  const sorted = [...commissions].sort((a, b) => {
    const order: CommissionStatus[] = ['approved', 'pending', 'paid', 'rejected', 'cancelled'];
    const so = order.indexOf(a.status) - order.indexOf(b.status);
    if (so !== 0) return so;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  const canAdmin = isAdminRole(session.role);

  return (
    <div className="space-y-6">
      <header>
        <div className="text-[11px] uppercase tracking-[0.18em] text-[var(--ops-muted)]">Workflow</div>
        <h1 className="font-display text-[28px] sm:text-[32px] tracking-[-0.015em] text-[var(--ops-text)]">
          Provisionen
        </h1>
        <p className="mt-1 text-[13.5px] text-[var(--ops-text-2)] max-w-2xl">
          {canAdmin
            ? 'Provisionen prüfen, freigeben und auszahlen.'
            : 'Deine offenen und ausgezahlten Provisionen.'}
        </p>
      </header>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <div className="ops-kpi">
          <div className="text-[10.5px] uppercase tracking-[0.14em] text-[var(--ops-muted)]">Offen</div>
          <div className="mt-2 text-[22px] font-display font-semibold text-[var(--ops-cyan)] tabular-nums">
            {fmtEur(sumPending)}
          </div>
          <div className="mt-0.5 text-[11px] text-[var(--ops-text-2)]">
            {commissions.filter((c) => c.status === 'pending').length} Vorgänge
          </div>
        </div>
        <div className="ops-kpi">
          <div className="text-[10.5px] uppercase tracking-[0.14em] text-[var(--ops-muted)]">Freigegeben</div>
          <div className="mt-2 text-[22px] font-display font-semibold text-[var(--ops-gold)] tabular-nums">
            {fmtEur(sumApproved)}
          </div>
          <div className="mt-0.5 text-[11px] text-[var(--ops-text-2)]">
            {commissions.filter((c) => c.status === 'approved').length} Vorgänge
          </div>
        </div>
        <div className="ops-kpi">
          <div className="text-[10.5px] uppercase tracking-[0.14em] text-[var(--ops-muted)]">Ausgezahlt</div>
          <div className="mt-2 text-[22px] font-display font-semibold text-[var(--ops-success)] tabular-nums">
            {fmtEur(sumPaid)}
          </div>
          <div className="mt-0.5 text-[11px] text-[var(--ops-text-2)]">
            {commissions.filter((c) => c.status === 'paid').length} Vorgänge
          </div>
        </div>
      </div>

      {sorted.length === 0 ? (
        <div className="ops-card p-10 text-center text-[14px] text-[var(--ops-text-2)]">
          Noch keine Provisionen erfasst.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3">
          {sorted.map((c) => {
            const deal = dealById[c.dealId];
            const partner = partnerById[c.partnerId];
            return (
              <article key={c.id} className="ops-card p-4 flex flex-wrap items-center gap-4">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="ops-pill" data-tone={STATUS_TONE[c.status]}>
                      {STATUS_LABEL[c.status]}
                    </span>
                    {partner && (
                      <Link
                        href={`/admin/vertriebspartner/${partner.id}`}
                        className="text-[13px] text-[var(--ops-text)] hover:text-[var(--ops-cyan)]"
                      >
                        {partner.name}
                      </Link>
                    )}
                    {deal && (
                      <span className="text-[12px] text-[var(--ops-muted)]">
                        · Abschluss {fmtDate(deal.closedAt ?? deal.createdAt)}
                      </span>
                    )}
                  </div>
                  {c.notes && (
                    <p className="mt-1.5 text-[12.5px] text-[var(--ops-text-2)] line-clamp-2">{c.notes}</p>
                  )}
                  <div className="mt-1 text-[11.5px] text-[var(--ops-muted)]">
                    Erstellt {fmtDate(c.createdAt)}
                    {c.approvedAt && <> · Freigabe {fmtDate(c.approvedAt)}</>}
                    {c.paidAt && <> · Auszahlung {fmtDate(c.paidAt)}</>}
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-[10.5px] uppercase tracking-[0.14em] text-[var(--ops-muted)]">Betrag</div>
                  <div className="mt-0.5 font-display text-[20px] text-[var(--ops-text)] tabular-nums">
                    {fmtEur(c.amount)}
                  </div>
                </div>

                {canAdmin && (
                  <div className="flex flex-wrap gap-2">
                    {c.status === 'pending' && (
                      <form action={setCommissionStatusAction}>
                        <input type="hidden" name="id" value={c.id} />
                        <input type="hidden" name="status" value="approved" />
                        <input type="hidden" name="redirectTo" value="/admin/provisionen" />
                        <button className="ops-cta h-9 px-3 rounded-lg text-[12px]">Freigeben</button>
                      </form>
                    )}
                    {(c.status === 'pending' || c.status === 'approved') && (
                      <form action={setCommissionStatusAction}>
                        <input type="hidden" name="id" value={c.id} />
                        <input type="hidden" name="status" value="paid" />
                        <input type="hidden" name="redirectTo" value="/admin/provisionen" />
                        <button className="ops-cta-ghost h-9 px-3 rounded-lg text-[12px]">Auszahlen</button>
                      </form>
                    )}
                    {c.status !== 'rejected' && c.status !== 'paid' && (
                      <form action={setCommissionStatusAction}>
                        <input type="hidden" name="id" value={c.id} />
                        <input type="hidden" name="status" value="rejected" />
                        <input type="hidden" name="redirectTo" value="/admin/provisionen" />
                        <button className="h-9 px-3 rounded-lg border border-[rgba(239,68,68,0.32)] text-[var(--ops-critical)] hover:bg-[rgba(239,68,68,0.08)] text-[12px]">
                          Ablehnen
                        </button>
                      </form>
                    )}
                  </div>
                )}
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
