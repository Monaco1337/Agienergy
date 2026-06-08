import Link from 'next/link';
import { getStorage } from '@elo/storage';
import { requireSession, isAdminRole, isPartnerRole, getCurrentPartnerId } from '@/lib/agi/permissions';
import { LeadCard } from '@/components/agi/leads/LeadCard';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Cockpit · AGI Operations Center' };

function fmtEur(v: number): string {
  return v.toLocaleString('de-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 });
}

interface Kpi {
  label: string;
  value: string | number;
  hint?: string;
  href?: string;
  tone?: 'cyan' | 'gold' | 'success' | 'critical' | 'warning';
}

function KpiTile({ kpi }: { kpi: Kpi }) {
  const color =
    kpi.tone === 'cyan'
      ? 'var(--ops-cyan)'
      : kpi.tone === 'gold'
        ? 'var(--ops-gold)'
        : kpi.tone === 'success'
          ? 'var(--ops-success)'
          : kpi.tone === 'critical'
            ? 'var(--ops-critical)'
            : kpi.tone === 'warning'
              ? 'var(--ops-warning)'
              : 'var(--ops-text)';
  const inner = (
    <div className="ops-kpi h-full">
      <div className="text-[10.5px] uppercase tracking-[0.14em] text-[var(--ops-muted)]">{kpi.label}</div>
      <div className="mt-2 text-[26px] sm:text-[28px] font-display font-semibold tabular-nums" style={{ color }}>
        {kpi.value}
      </div>
      {kpi.hint && <div className="mt-1 text-[11.5px] text-[var(--ops-text-2)]">{kpi.hint}</div>}
    </div>
  );
  return kpi.href ? <Link href={kpi.href}>{inner}</Link> : inner;
}

interface Alert {
  message: string;
  href: string;
  tone: 'cyan' | 'critical' | 'warning' | 'gold';
  count: number;
}

function AlertCard({ alert }: { alert: Alert }) {
  return (
    <Link href={alert.href} className="ops-card ops-card-hover p-4 flex items-center gap-3">
      <span
        className="inline-flex items-center justify-center size-9 rounded-full font-display font-semibold tabular-nums shrink-0"
        style={{
          background:
            alert.tone === 'critical'
              ? 'rgba(239,68,68,0.16)'
              : alert.tone === 'warning'
                ? 'rgba(245,158,11,0.14)'
                : alert.tone === 'gold'
                  ? 'rgba(234,179,8,0.14)'
                  : 'rgba(54,230,208,0.12)',
          color:
            alert.tone === 'critical'
              ? '#fca5a5'
              : alert.tone === 'warning'
                ? '#fbbf24'
                : alert.tone === 'gold'
                  ? '#facc15'
                  : '#7df2e0',
        }}
      >
        {alert.count}
      </span>
      <div className="min-w-0 flex-1 text-[13.5px] text-[var(--ops-text)]">{alert.message}</div>
      <span className="text-[var(--ops-muted)]">→</span>
    </Link>
  );
}

export default async function AdminCockpit() {
  const session = await requireSession();
  const partnerId = await getCurrentPartnerId(session);
  const storage = getStorage();

  const isPartner = isPartnerRole(session.role);
  const adminView = isAdminRole(session.role);

  // Daten laden
  const [allLeads, allPartners, allDeals, allCommissions, allTasks] = await Promise.all([
    storage.listLeads(),
    storage.listPartners(),
    storage.listDeals(),
    storage.listCommissions(),
    storage.listTasks(),
  ]);

  // Partner-Sicht: Daten beschränken
  const myLeads = isPartner ? allLeads.filter((l) => l.assignedPartnerId === partnerId) : allLeads;
  const myDeals = isPartner ? allDeals.filter((d) => d.partnerId === partnerId) : allDeals;
  const myCommissions = isPartner ? allCommissions.filter((c) => c.partnerId === partnerId) : allCommissions;
  const myTasks = isPartner
    ? allTasks.filter((t) => t.ownerId === session.userId || t.partnerId === partnerId)
    : allTasks;

  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  const leadsToday = myLeads.filter((l) => new Date(l.createdAt) >= todayStart).length;
  const unassigned = myLeads.filter((l) => !l.assignedPartnerId);
  const assigned = myLeads.filter((l) => l.assignedPartnerId).length;
  const inProgress = myLeads.filter((l) =>
    ['Angerufen', 'Rückruf geplant', 'Beratung durchgeführt', 'Angebot vorbereitet', 'Angebot gesendet'].includes(l.status),
  ).length;
  const callNow = myLeads.filter((l) => l.status === 'Heute anrufen' || (l.status === 'Neu' && (l.leadColor === 'red' || l.leadColor === 'orange'))).length;
  const closed = myLeads.filter((l) => l.status === 'Abgeschlossen').length;
  const conv = myLeads.length > 0 ? closed / myLeads.length : 0;
  const openCommission = myCommissions
    .filter((c) => c.status === 'pending' || c.status === 'approved')
    .reduce((sum, c) => sum + (c.amount ?? 0), 0);

  // Alerts (Admin-fokussiert)
  const partnersOverCap = allPartners.filter((p) => {
    const active = allLeads.filter(
      (l) =>
        l.assignedPartnerId === p.id &&
        l.status !== 'Abgeschlossen' &&
        l.status !== 'Verloren' &&
        l.status !== 'Gesperrt',
    ).length;
    return active >= p.capacity && p.capacity > 0;
  });
  const dealsWithoutCommission = allDeals.filter((d) => d.status === 'confirmed' && !allCommissions.some((c) => c.dealId === d.id));
  const hotUnassigned = unassigned.filter((l) => l.leadColor === 'red' || l.leadColor === 'orange');
  const alerts: Alert[] = [];
  if (adminView) {
    if (unassigned.length > 0) {
      alerts.push({
        count: unassigned.length,
        message: `Leads warten auf Verteilung`,
        href: '/admin/distribution',
        tone: 'critical',
      });
    }
    if (hotUnassigned.length > 0) {
      alerts.push({
        count: hotUnassigned.length,
        message: 'Hot-Leads unverteilt – sofort routen',
        href: '/admin/distribution?filter=hot',
        tone: 'critical',
      });
    }
    if (partnersOverCap.length > 0) {
      alerts.push({
        count: partnersOverCap.length,
        message: 'Partner über Kapazität',
        href: '/admin/performance',
        tone: 'warning',
      });
    }
    if (dealsWithoutCommission.length > 0) {
      alerts.push({
        count: dealsWithoutCommission.length,
        message: 'Bestätigte Abschlüsse ohne Provisionsstatus',
        href: '/admin/abschluesse',
        tone: 'gold',
      });
    }
    const reportedDeals = allDeals.filter((d) => d.status === 'reported' || d.status === 'review').length;
    if (reportedDeals > 0) {
      alerts.push({
        count: reportedDeals,
        message: 'Abschlussmeldungen warten auf Prüfung',
        href: '/admin/abschluesse',
        tone: 'cyan',
      });
    }
  }

  if (callNow > 0) {
    alerts.push({
      count: callNow,
      message: 'Hot-Leads – jetzt anrufen',
      href: isPartner ? '/admin/meine-leads' : '/admin/lead-feed?filter=hot',
      tone: 'critical',
    });
  }
  const overdueTasks = myTasks.filter(
    (t) => t.dueAt && t.status !== 'done' && new Date(t.dueAt).getTime() < Date.now(),
  ).length;
  if (overdueTasks > 0) {
    alerts.push({
      count: overdueTasks,
      message: 'Überfällige Aufgaben',
      href: '/admin/aufgaben',
      tone: 'warning',
    });
  }

  // Top-Prioritäten (für Live-Vorschau)
  const sortedHot = [...myLeads]
    .filter((l) => l.status !== 'Abgeschlossen' && l.status !== 'Verloren' && l.status !== 'Gesperrt')
    .sort((a, b) => {
      const colorRank = (c: typeof a.leadColor) =>
        ({ red: 0, orange: 1, yellow: 2, blue: 3, gray: 4, black: 5 })[c] ?? 99;
      const cr = colorRank(a.leadColor) - colorRank(b.leadColor);
      if (cr !== 0) return cr;
      return b.leadScore - a.leadScore;
    })
    .slice(0, 6);

  const partnerById = Object.fromEntries(allPartners.map((p) => [p.id, p]));

  // KPIs
  const kpis: Kpi[] = adminView
    ? [
        { label: 'Leads heute', value: leadsToday, tone: 'cyan', href: '/admin/lead-feed?filter=today' },
        {
          label: 'Unverteilt',
          value: unassigned.length,
          tone: unassigned.length > 0 ? 'warning' : undefined,
          href: '/admin/distribution',
        },
        { label: 'Verteilt', value: assigned, tone: 'cyan', href: '/admin/leads' },
        { label: 'In Bearbeitung', value: inProgress, href: '/admin/leads' },
        { label: 'Sofort anrufen', value: callNow, tone: callNow > 0 ? 'critical' : undefined, href: '/admin/lead-feed?filter=hot' },
        { label: 'Abschlüsse', value: closed, tone: 'success', href: '/admin/abschluesse' },
        { label: 'Conversion', value: `${Math.round(conv * 100)}%`, tone: 'cyan', href: '/admin/performance' },
        { label: 'Provision offen', value: fmtEur(openCommission), tone: 'gold', href: '/admin/provisionen' },
      ]
    : [
        { label: 'Neue Leads', value: myLeads.filter((l) => l.status === 'Neu').length, tone: 'cyan', href: '/admin/meine-leads' },
        { label: 'Heute anrufen', value: callNow, tone: 'critical', href: '/admin/meine-leads' },
        { label: 'In Bearbeitung', value: inProgress, href: '/admin/meine-leads' },
        { label: 'Abschlüsse Mt.', value: myDeals.filter((d) => d.status === 'confirmed' && new Date(d.closedAt ?? d.updatedAt).getMonth() === new Date().getMonth()).length, tone: 'success', href: '/admin/abschluesse' },
        { label: 'Provision offen', value: fmtEur(openCommission), tone: 'gold', href: '/admin/provisionen' },
        { label: 'Conversion', value: `${Math.round(conv * 100)}%`, tone: 'cyan', href: '/admin/performance' },
      ];

  return (
    <div className="space-y-7">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="text-[11px] uppercase tracking-[0.18em] text-[var(--ops-muted)]">
            AGI Energy · Lead Operations Center
          </div>
          <h1 className="font-display text-[28px] sm:text-[34px] tracking-[-0.015em] text-[var(--ops-text)]">
            {adminView ? 'Cockpit' : 'Dein Tag'}
          </h1>
          <p className="mt-1 text-[13.5px] text-[var(--ops-text-2)] max-w-2xl">
            Lead-Zufluss, Verteilung, Partnerleistung &amp; Abschlusskontrolle.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <span className="ops-pill" data-tone="cyan">
            Heute · {new Date().toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' })}
          </span>
          <span className="ops-pill" data-tone="success">Live</span>
          {myLeads.some((l) => l.isDemo) && <span className="ops-pill" data-tone="gold">Demo-Daten</span>}
          <span className="ops-pill">{session.role}</span>
        </div>
      </header>

      <section className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 xl:grid-cols-8 gap-3">
        {kpis.map((k) => (
          <KpiTile key={k.label} kpi={k} />
        ))}
      </section>

      {alerts.length > 0 && (
        <section>
          <h2 className="font-display text-[16px] text-[var(--ops-text)] mb-3">Kritische Alerts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
            {alerts.map((a) => (
              <AlertCard key={a.message} alert={a} />
            ))}
          </div>
        </section>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_minmax(0,420px)] gap-5">
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-display text-[18px] text-[var(--ops-text)]">Top-Prioritäten</h2>
            <Link href={adminView ? '/admin/lead-feed' : '/admin/meine-leads'} className="text-[12px] text-[var(--ops-text-2)] hover:text-[var(--ops-cyan)]">
              Alle Leads →
            </Link>
          </div>
          {sortedHot.length === 0 ? (
            <div className="ops-card p-8 text-center text-[14px] text-[var(--ops-text-2)]">
              Keine offenen Prioritäten – sauber.
            </div>
          ) : (
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {sortedHot.map((l) => (
                <li key={l.id}>
                  <LeadCard
                    lead={l}
                    partner={l.assignedPartnerId ? partnerById[l.assignedPartnerId] : null}
                  />
                </li>
              ))}
            </ul>
          )}
        </section>

        {adminView && (
          <aside className="space-y-3">
            <div className="ops-card p-5">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-[16px] text-[var(--ops-text)]">Verteilungsübersicht</h2>
                <Link href="/admin/distribution" className="text-[12px] text-[var(--ops-cyan)] hover:underline">
                  Distribution →
                </Link>
              </div>
              <ul className="mt-3 space-y-2.5">
                {allPartners.slice(0, 6).map((p) => {
                  const active = allLeads.filter(
                    (l) =>
                      l.assignedPartnerId === p.id &&
                      l.status !== 'Abgeschlossen' &&
                      l.status !== 'Verloren' &&
                      l.status !== 'Gesperrt',
                  ).length;
                  const u = p.capacity > 0 ? Math.min(1, active / p.capacity) : 0;
                  return (
                    <li key={p.id}>
                      <Link
                        href={`/admin/vertriebspartner/${p.id}`}
                        className="block hover:bg-white/[0.03] rounded-lg px-2 py-1.5 -mx-2"
                      >
                        <div className="flex items-center justify-between text-[13px]">
                          <span className="truncate text-[var(--ops-text)]">{p.name}</span>
                          <span className="text-[var(--ops-text-2)] tabular-nums text-[11.5px]">
                            {active}/{p.capacity}
                          </span>
                        </div>
                        <div className="mt-1 h-1 rounded-full bg-white/[0.05] overflow-hidden">
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${Math.round(u * 100)}%`,
                              background:
                                u >= 0.95
                                  ? 'linear-gradient(90deg,#ef4444,#f59e0b)'
                                  : u >= 0.7
                                    ? 'linear-gradient(90deg,#f59e0b,#eab308)'
                                    : 'linear-gradient(90deg,#36e6d0,#38bdf8)',
                            }}
                          />
                        </div>
                      </Link>
                    </li>
                  );
                })}
                {allPartners.length === 0 && (
                  <li className="text-[12.5px] text-[var(--ops-text-2)]">
                    Noch keine Partner.{' '}
                    <Link href="/admin/vertriebspartner/neu" className="text-[var(--ops-cyan)] hover:underline">
                      Anlegen
                    </Link>
                  </li>
                )}
              </ul>
            </div>

            <div className="ops-card p-5">
              <h2 className="font-display text-[16px] text-[var(--ops-text)]">Abschlüsse / Provision</h2>
              <ul className="mt-3 space-y-2 text-[13px] text-[var(--ops-text-2)]">
                <li className="flex justify-between">
                  <span>Gemeldet (offen)</span>
                  <span className="tabular-nums text-[var(--ops-text)]">
                    {allDeals.filter((d) => d.status === 'reported' || d.status === 'review').length}
                  </span>
                </li>
                <li className="flex justify-between">
                  <span>Bestätigt</span>
                  <span className="tabular-nums text-[var(--ops-success)]">
                    {allDeals.filter((d) => d.status === 'confirmed').length}
                  </span>
                </li>
                <li className="flex justify-between">
                  <span>Provisionen offen</span>
                  <span className="tabular-nums text-[var(--ops-gold)]">{fmtEur(openCommission)}</span>
                </li>
              </ul>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}
