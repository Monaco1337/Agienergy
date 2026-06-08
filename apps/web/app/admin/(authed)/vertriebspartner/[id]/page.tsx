import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { PartnerId } from '@elo/core';
import { getStorage } from '@elo/storage';
import { requireRole } from '@/lib/agi/permissions';
import { PartnerForm } from '@/components/agi/partners/PartnerForm';
import { LeadCard } from '@/components/agi/leads/LeadCard';
import { setPartnerStatusAction, deletePartnerAction } from '@/app/actions/partnerMutations';
import { ConfirmSubmit } from '@/components/agi/shared/ConfirmSubmit';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const storage = getStorage();
  const partner = await storage.getPartner(id as PartnerId);
  return { title: `${partner?.name ?? 'Partner'} · AGI Operations` };
}

function fmtEur(v: number): string {
  return v.toLocaleString('de-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 });
}

export default async function PartnerDetailPage({ params }: { params: Promise<{ id: string }> }) {
  await requireRole(['admin', 'sales']);
  const { id } = await params;
  const storage = getStorage();
  const partner = await storage.getPartner(id as PartnerId);
  if (!partner) notFound();

  const [leads, deals, commissions] = await Promise.all([
    storage.listLeads({ assignedPartnerId: partner.id }),
    storage.listDeals({ partnerId: partner.id }),
    storage.listCommissions({ partnerId: partner.id }),
  ]);

  const active = leads.filter(
    (l) => l.status !== 'Abgeschlossen' && l.status !== 'Verloren' && l.status !== 'Gesperrt',
  );
  const closed = leads.filter((l) => l.status === 'Abgeschlossen');
  const conv = leads.length > 0 ? closed.length / leads.length : 0;
  const pendingCom = commissions
    .filter((c) => c.status === 'pending' || c.status === 'approved')
    .reduce((sum, c) => sum + (c.amount ?? 0), 0);
  const paidCom = commissions
    .filter((c) => c.status === 'paid')
    .reduce((sum, c) => sum + (c.amount ?? 0), 0);

  const isActive = partner.status === 'active';

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <Link
            href="/admin/vertriebspartner"
            className="text-[12px] text-[var(--ops-text-2)] hover:text-[var(--ops-cyan)]"
          >
            ← Vertriebspartner
          </Link>
          <h1 className="mt-2 font-display text-[28px] sm:text-[32px] tracking-[-0.015em] text-[var(--ops-text)]">
            {partner.name}
          </h1>
          <p className="mt-1 text-[13.5px] text-[var(--ops-text-2)]">
            {partner.regionLabel || partner.regionPrefixes.join(', ') || 'Bundesweit'} ·{' '}
            {partner.specialties.join(' / ') || 'allg.'} · Kapazität {partner.capacity}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <form action={setPartnerStatusAction}>
            <input type="hidden" name="id" value={partner.id} />
            <input type="hidden" name="status" value={isActive ? 'inactive' : 'active'} />
            <input type="hidden" name="redirectTo" value={`/admin/vertriebspartner/${partner.id}`} />
            <button className="ops-cta-ghost h-9 px-4 rounded-lg text-[12.5px]">
              {isActive ? 'Deaktivieren' : 'Aktivieren'}
            </button>
          </form>
          <form action={deletePartnerAction}>
            <input type="hidden" name="id" value={partner.id} />
            <input type="hidden" name="redirectTo" value="/admin/vertriebspartner" />
            <ConfirmSubmit
              message="Partner wirklich löschen? Alle aktiven Leads müssen vorher neu zugewiesen sein."
              className="h-9 px-4 rounded-lg border border-[rgba(239,68,68,0.32)] text-[var(--ops-critical)] hover:bg-[rgba(239,68,68,0.08)] text-[12.5px]"
            >
              Löschen
            </ConfirmSubmit>
          </form>
        </div>
      </header>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="ops-kpi">
          <div className="text-[10.5px] uppercase tracking-[0.14em] text-[var(--ops-muted)]">Aktive Leads</div>
          <div className="mt-2 text-[28px] font-display font-semibold text-[var(--ops-text)] tabular-nums">
            {active.length}
          </div>
          <div className="mt-0.5 text-[11px] text-[var(--ops-text-2)]">von {leads.length} insgesamt</div>
        </div>
        <div className="ops-kpi">
          <div className="text-[10.5px] uppercase tracking-[0.14em] text-[var(--ops-muted)]">Conversion</div>
          <div className="mt-2 text-[28px] font-display font-semibold text-[var(--ops-cyan)] tabular-nums">
            {Math.round(conv * 100)}%
          </div>
          <div className="mt-0.5 text-[11px] text-[var(--ops-text-2)]">{closed.length} abgeschlossen</div>
        </div>
        <div className="ops-kpi">
          <div className="text-[10.5px] uppercase tracking-[0.14em] text-[var(--ops-muted)]">Offene Provision</div>
          <div className="mt-2 text-[24px] font-display font-semibold text-[var(--ops-gold)] tabular-nums">
            {fmtEur(pendingCom)}
          </div>
          <div className="mt-0.5 text-[11px] text-[var(--ops-text-2)]">freigegeben + ungeprüft</div>
        </div>
        <div className="ops-kpi">
          <div className="text-[10.5px] uppercase tracking-[0.14em] text-[var(--ops-muted)]">Ausgezahlt</div>
          <div className="mt-2 text-[24px] font-display font-semibold text-[var(--ops-success)] tabular-nums">
            {fmtEur(paidCom)}
          </div>
          <div className="mt-0.5 text-[11px] text-[var(--ops-text-2)]">{commissions.filter((c) => c.status === 'paid').length} Auszahlungen</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)] gap-5">
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-display text-[18px] text-[var(--ops-text)]">Zugewiesene Leads</h2>
            <span className="text-[11.5px] text-[var(--ops-text-2)]">{active.length} aktiv</span>
          </div>
          {active.length === 0 ? (
            <div className="ops-card p-8 text-center text-[13px] text-[var(--ops-text-2)]">
              Keine aktiven Leads bei diesem Partner.
            </div>
          ) : (
            <ul className="grid grid-cols-1 gap-3">
              {active.slice(0, 12).map((l) => (
                <li key={l.id}>
                  <LeadCard lead={l} partner={partner} compact />
                </li>
              ))}
            </ul>
          )}
        </section>

        <aside>
          <h2 className="font-display text-[18px] text-[var(--ops-text)] mb-3">Stammdaten bearbeiten</h2>
          <PartnerForm partner={partner} redirectTo={`/admin/vertriebspartner/${partner.id}`} />
        </aside>
      </div>
    </div>
  );
}
