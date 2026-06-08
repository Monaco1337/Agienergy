import Link from 'next/link';
import type { LeadStatus } from '@elo/core';
import { getStorage } from '@elo/storage';
import { requireRole, getCurrentPartnerId } from '@/lib/agi/permissions';
import { LeadCard } from '@/components/agi/leads/LeadCard';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Meine Leads · AGI Operations' };

const PRIORITY_STATUSES: LeadStatus[] = ['Heute anrufen', 'Neu', 'Priorisiert', 'Rückruf geplant'];

export default async function MyLeadsPage() {
  const session = await requireRole(['partner', 'admin', 'sales']);
  const storage = getStorage();
  const partnerId = await getCurrentPartnerId(session);

  // Fallback: wenn Admin/Sales rein klickt, zeigen wir „alle aktiven Leads", damit
  // die Seite auch zur Vorschau klappt; Partner sieht nur seine.
  const leads = partnerId
    ? await storage.listLeads({ assignedPartnerId: partnerId })
    : await storage.listLeads();

  const partner = partnerId ? await storage.getPartner(partnerId as never) : null;

  const active = leads.filter(
    (l) => l.status !== 'Abgeschlossen' && l.status !== 'Verloren' && l.status !== 'Gesperrt',
  );
  const today = active.filter((l) => PRIORITY_STATUSES.includes(l.status));
  const inProgress = active.filter((l) => !PRIORITY_STATUSES.includes(l.status));
  const closed = leads.filter((l) => l.status === 'Abgeschlossen').length;
  const conv = leads.length > 0 ? closed / leads.length : 0;

  // Provisionen + offene Tasks
  const [tasks, commissions, deals] = await Promise.all([
    storage.listTasks(partnerId ? { partnerId: partnerId as never } : {}),
    storage.listCommissions(partnerId ? { partnerId: partnerId as never } : {}),
    storage.listDeals(partnerId ? { partnerId: partnerId as never } : {}),
  ]);
  const openTasks = tasks.filter((t) => t.status !== 'done').length;
  const openCom = commissions
    .filter((c) => c.status === 'pending' || c.status === 'approved')
    .reduce((sum, c) => sum + (c.amount ?? 0), 0);
  const closedThisMonth = deals.filter((d) => {
    if (d.status !== 'confirmed') return false;
    const dt = new Date(d.closedAt ?? d.updatedAt);
    const now = new Date();
    return dt.getFullYear() === now.getFullYear() && dt.getMonth() === now.getMonth();
  }).length;

  return (
    <div className="space-y-6">
      <header>
        <div className="text-[11px] uppercase tracking-[0.18em] text-[var(--ops-muted)]">Vertrieb</div>
        <h1 className="font-display text-[28px] sm:text-[32px] tracking-[-0.015em] text-[var(--ops-text)]">
          Meine Leads
        </h1>
        <p className="mt-1 text-[13.5px] text-[var(--ops-text-2)] max-w-2xl">
          {partner ? <>Hi {partner.name}. </> : null}Heute anrufen, in Bearbeitung, abgeschlossen.
        </p>
      </header>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="ops-kpi">
          <div className="text-[10.5px] uppercase tracking-[0.14em] text-[var(--ops-muted)]">Neue Leads</div>
          <div className="mt-2 text-[24px] font-display font-semibold text-[var(--ops-cyan)] tabular-nums">
            {leads.filter((l) => l.status === 'Neu').length}
          </div>
        </div>
        <div className="ops-kpi">
          <div className="text-[10.5px] uppercase tracking-[0.14em] text-[var(--ops-muted)]">Heute anrufen</div>
          <div className="mt-2 text-[24px] font-display font-semibold text-[var(--ops-critical)] tabular-nums">
            {today.length}
          </div>
        </div>
        <div className="ops-kpi">
          <div className="text-[10.5px] uppercase tracking-[0.14em] text-[var(--ops-muted)]">In Bearbeitung</div>
          <div className="mt-2 text-[24px] font-display font-semibold text-[var(--ops-text)] tabular-nums">
            {inProgress.length}
          </div>
        </div>
        <div className="ops-kpi">
          <div className="text-[10.5px] uppercase tracking-[0.14em] text-[var(--ops-muted)]">Abschlüsse Mt.</div>
          <div className="mt-2 text-[24px] font-display font-semibold text-[var(--ops-success)] tabular-nums">
            {closedThisMonth}
          </div>
        </div>
        <div className="ops-kpi">
          <div className="text-[10.5px] uppercase tracking-[0.14em] text-[var(--ops-muted)]">Conversion</div>
          <div className="mt-2 text-[24px] font-display font-semibold text-[var(--ops-cyan)] tabular-nums">
            {Math.round(conv * 100)}%
          </div>
        </div>
        <div className="ops-kpi">
          <div className="text-[10.5px] uppercase tracking-[0.14em] text-[var(--ops-muted)]">Offene Provision</div>
          <div className="mt-2 text-[20px] font-display font-semibold text-[var(--ops-gold)] tabular-nums">
            {openCom.toLocaleString('de-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 })}
          </div>
        </div>
      </div>

      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-display text-[18px] text-[var(--ops-text)]">
            Top-Prioritäten <span className="text-[var(--ops-cyan)] tabular-nums">{today.length}</span>
          </h2>
          <Link href="/admin/aufgaben" className="text-[12px] text-[var(--ops-text-2)] hover:text-[var(--ops-cyan)]">
            Aufgaben ({openTasks}) →
          </Link>
        </div>
        {today.length === 0 ? (
          <div className="ops-card p-8 text-center text-[14px] text-[var(--ops-text-2)]">
            Keine Top-Prioritäten. Gut gemacht.
          </div>
        ) : (
          <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
            {today.slice(0, 12).map((l) => (
              <li key={l.id}>
                <LeadCard lead={l} />
              </li>
            ))}
          </ul>
        )}
      </section>

      {inProgress.length > 0 && (
        <section>
          <h2 className="font-display text-[18px] text-[var(--ops-text)] mb-3">
            In Bearbeitung
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
            {inProgress.slice(0, 18).map((l) => (
              <li key={l.id}>
                <LeadCard lead={l} compact />
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
