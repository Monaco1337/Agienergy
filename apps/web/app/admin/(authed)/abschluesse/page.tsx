import Link from 'next/link';
import type { Deal, DealStatus, Lead, Partner } from '@elo/core';
import { getStorage } from '@elo/storage';
import { requireSession, isAdminRole, isPartnerRole, getCurrentPartnerId } from '@/lib/agi/permissions';
import { setDealStatusAction } from '@/app/actions/dealMutations';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Abschlüsse · AGI Operations' };

const STATUS_TONE: Record<DealStatus, 'cyan' | 'gold' | 'success' | 'critical' | 'warning'> = {
  reported: 'cyan',
  review: 'gold',
  confirmed: 'success',
  rejected: 'critical',
  cancelled: 'warning',
};

const STATUS_LABEL: Record<DealStatus, string> = {
  reported: 'Gemeldet',
  review: 'In Prüfung',
  confirmed: 'Bestätigt',
  rejected: 'Abgelehnt',
  cancelled: 'Storniert',
};

const PRODUCT_LABEL: Record<Deal['product'], string> = {
  strom: 'Strom',
  gas: 'Gas',
  photovoltaik: 'Photovoltaik',
  strom_gas: 'Strom + Gas',
  gewerbe: 'Gewerbe',
  other: 'Sonstiges',
};

function fmtEur(v?: number): string {
  if (v == null) return '—';
  return v.toLocaleString('de-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 });
}

function fmtDate(iso?: string): string {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString('de-DE');
}

export default async function DealsPage() {
  const session = await requireSession();
  const storage = getStorage();
  const partnerId = await getCurrentPartnerId(session);

  const filter = isPartnerRole(session.role) && partnerId ? { partnerId: partnerId as never } : {};
  const [deals, leads, partners] = await Promise.all([
    storage.listDeals(filter),
    storage.listLeads(),
    storage.listPartners(),
  ]);

  const leadById: Record<string, Lead> = Object.fromEntries(leads.map((l) => [l.id, l]));
  const partnerById: Record<string, Partner> = Object.fromEntries(partners.map((p) => [p.id, p]));
  const sorted = [...deals].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const counts = {
    reported: deals.filter((d) => d.status === 'reported').length,
    review: deals.filter((d) => d.status === 'review').length,
    confirmed: deals.filter((d) => d.status === 'confirmed').length,
    rejected: deals.filter((d) => d.status === 'rejected').length,
    cancelled: deals.filter((d) => d.status === 'cancelled').length,
  };
  const totalValue = deals
    .filter((d) => d.status === 'confirmed')
    .reduce((sum, d) => sum + (d.value ?? 0), 0);

  const canAdmin = isAdminRole(session.role);

  return (
    <div className="space-y-6">
      <header>
        <div className="text-[11px] uppercase tracking-[0.18em] text-[var(--ops-muted)]">Workflow</div>
        <h1 className="font-display text-[28px] sm:text-[32px] tracking-[-0.015em] text-[var(--ops-text)]">
          Abschlüsse
        </h1>
        <p className="mt-1 text-[13.5px] text-[var(--ops-text-2)] max-w-2xl">
          Gemeldete und geprüfte Abschlüsse. Bestätigt → Provision wird angelegt, Lead schließt.
        </p>
      </header>

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <div className="ops-kpi">
          <div className="text-[10.5px] uppercase tracking-[0.14em] text-[var(--ops-muted)]">Gemeldet</div>
          <div className="mt-2 text-[24px] font-display font-semibold text-[var(--ops-cyan)] tabular-nums">
            {counts.reported + counts.review}
          </div>
        </div>
        <div className="ops-kpi">
          <div className="text-[10.5px] uppercase tracking-[0.14em] text-[var(--ops-muted)]">Bestätigt</div>
          <div className="mt-2 text-[24px] font-display font-semibold text-[var(--ops-success)] tabular-nums">
            {counts.confirmed}
          </div>
        </div>
        <div className="ops-kpi">
          <div className="text-[10.5px] uppercase tracking-[0.14em] text-[var(--ops-muted)]">Abgelehnt</div>
          <div className="mt-2 text-[24px] font-display font-semibold text-[var(--ops-critical)] tabular-nums">
            {counts.rejected}
          </div>
        </div>
        <div className="ops-kpi">
          <div className="text-[10.5px] uppercase tracking-[0.14em] text-[var(--ops-muted)]">Storniert</div>
          <div className="mt-2 text-[24px] font-display font-semibold text-[var(--ops-warning)] tabular-nums">
            {counts.cancelled}
          </div>
        </div>
        <div className="ops-kpi">
          <div className="text-[10.5px] uppercase tracking-[0.14em] text-[var(--ops-muted)]">Volumen (best.)</div>
          <div className="mt-2 text-[20px] font-display font-semibold text-[var(--ops-text)] tabular-nums">
            {fmtEur(totalValue)}
          </div>
        </div>
      </div>

      {sorted.length === 0 ? (
        <div className="ops-card p-10 text-center text-[14px] text-[var(--ops-text-2)]">
          Noch keine Abschlüsse gemeldet.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3">
          {sorted.map((d) => {
            const lead = leadById[d.leadId];
            const partner = partnerById[d.partnerId];
            return (
              <article key={d.id} className="ops-card p-4 flex flex-wrap items-center gap-4">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="ops-pill" data-tone={STATUS_TONE[d.status]}>
                      {STATUS_LABEL[d.status]}
                    </span>
                    <span className="ops-pill">{PRODUCT_LABEL[d.product]}</span>
                    {d.productLabel && <span className="text-[11.5px] text-[var(--ops-text-2)]">{d.productLabel}</span>}
                  </div>
                  <div className="mt-1.5 text-[14px] text-[var(--ops-text)]">
                    {lead ? (
                      <Link href={`/admin/leads/${lead.id}`} className="hover:text-[var(--ops-cyan)]">
                        {lead.firstName} {lead.lastName} · {lead.postalCode}
                      </Link>
                    ) : (
                      'Lead unbekannt'
                    )}
                    {' · '}
                    <span className="text-[var(--ops-text-2)]">
                      {partner ? (
                        <Link href={`/admin/vertriebspartner/${partner.id}`} className="hover:text-[var(--ops-cyan)]">
                          {partner.name}
                        </Link>
                      ) : (
                        'Partner ?'
                      )}
                    </span>
                  </div>
                  <div className="mt-1 text-[11.5px] text-[var(--ops-muted)]">
                    Gemeldet {fmtDate(d.createdAt)}
                    {d.closedAt && d.closedAt !== d.createdAt && <> · Abschluss {fmtDate(d.closedAt)}</>}
                  </div>
                  {d.notes && (
                    <div className="mt-1.5 text-[12px] text-[var(--ops-text-2)] line-clamp-2">{d.notes}</div>
                  )}
                </div>

                <div className="text-right">
                  <div className="text-[10.5px] uppercase tracking-[0.14em] text-[var(--ops-muted)]">Wert</div>
                  <div className="mt-0.5 font-display text-[18px] text-[var(--ops-text)] tabular-nums">
                    {fmtEur(d.value)}
                  </div>
                  <div className="text-[11px] text-[var(--ops-text-2)]">
                    Provision {fmtEur(d.expectedCommission)}
                  </div>
                </div>

                {canAdmin && (
                  <div className="flex flex-wrap gap-2">
                    {d.status === 'reported' && (
                      <>
                        <form action={setDealStatusAction}>
                          <input type="hidden" name="id" value={d.id} />
                          <input type="hidden" name="status" value="review" />
                          <input type="hidden" name="redirectTo" value="/admin/abschluesse" />
                          <button className="ops-cta-ghost h-9 px-3 rounded-lg text-[12px]">In Prüfung</button>
                        </form>
                      </>
                    )}
                    {(d.status === 'reported' || d.status === 'review') && (
                      <>
                        <form action={setDealStatusAction}>
                          <input type="hidden" name="id" value={d.id} />
                          <input type="hidden" name="status" value="confirmed" />
                          <input type="hidden" name="redirectTo" value="/admin/abschluesse" />
                          <button className="ops-cta h-9 px-3 rounded-lg text-[12px]">Bestätigen</button>
                        </form>
                        <form action={setDealStatusAction}>
                          <input type="hidden" name="id" value={d.id} />
                          <input type="hidden" name="status" value="rejected" />
                          <input type="hidden" name="redirectTo" value="/admin/abschluesse" />
                          <button className="h-9 px-3 rounded-lg border border-[rgba(239,68,68,0.32)] text-[var(--ops-critical)] hover:bg-[rgba(239,68,68,0.08)] text-[12px]">
                            Ablehnen
                          </button>
                        </form>
                      </>
                    )}
                    {d.status === 'confirmed' && (
                      <form action={setDealStatusAction}>
                        <input type="hidden" name="id" value={d.id} />
                        <input type="hidden" name="status" value="cancelled" />
                        <input type="hidden" name="redirectTo" value="/admin/abschluesse" />
                        <button className="ops-cta-ghost h-9 px-3 rounded-lg text-[12px]">Stornieren</button>
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
