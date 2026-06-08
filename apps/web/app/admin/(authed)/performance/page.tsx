import Link from 'next/link';
import { getStorage } from '@elo/storage';
import { requireSession, isAdminRole, getCurrentPartnerId } from '@/lib/agi/permissions';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Performance · AGI Operations' };

interface PartnerStat {
  id: string;
  name: string;
  status: string;
  capacity: number;
  active: number;
  utilization: number;
  totalLeads: number;
  closed: number;
  conversionRate: number;
  avgReactionMs: number | null;
  closedThisMonth: number;
  pendingCommission: number;
}

function fmtEur(v: number): string {
  return v.toLocaleString('de-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 });
}

function fmtReaction(ms: number | null): string {
  if (ms == null) return '—';
  const min = ms / 60_000;
  if (min < 60) return `${Math.round(min)} Min`;
  const h = min / 60;
  if (h < 24) return `${h.toFixed(1)} Std`;
  return `${(h / 24).toFixed(1)} Tage`;
}

export default async function PerformancePage() {
  const session = await requireSession();
  const storage = getStorage();
  const [partners, leads, deals, commissions] = await Promise.all([
    storage.listPartners(),
    storage.listLeads(),
    storage.listDeals(),
    storage.listCommissions(),
  ]);

  const now = new Date();
  const stats: PartnerStat[] = partners.map((p) => {
    const myLeads = leads.filter((l) => l.assignedPartnerId === p.id);
    const closed = myLeads.filter((l) => l.status === 'Abgeschlossen');
    const active = myLeads.filter(
      (l) => l.status !== 'Abgeschlossen' && l.status !== 'Verloren' && l.status !== 'Gesperrt',
    ).length;
    const conv = myLeads.length > 0 ? closed.length / myLeads.length : 0;

    const reactionTimes = myLeads
      .map((l) => {
        const first = l.contactHistory.at(-1) ?? l.contactHistory[0];
        if (!first) return null;
        const t = new Date(first.createdAt).getTime() - new Date(l.assignedAt ?? l.createdAt).getTime();
        return t > 0 ? t : null;
      })
      .filter((v): v is number => v != null);
    const avgReaction = reactionTimes.length > 0
      ? reactionTimes.reduce((s, n) => s + n, 0) / reactionTimes.length
      : null;

    const closedMonth = deals.filter(
      (d) =>
        d.partnerId === p.id &&
        d.status === 'confirmed' &&
        new Date(d.closedAt ?? d.updatedAt).getFullYear() === now.getFullYear() &&
        new Date(d.closedAt ?? d.updatedAt).getMonth() === now.getMonth(),
    ).length;
    const pendingCom = commissions
      .filter((c) => c.partnerId === p.id && (c.status === 'pending' || c.status === 'approved'))
      .reduce((sum, c) => sum + (c.amount ?? 0), 0);

    return {
      id: p.id,
      name: p.name,
      status: p.status,
      capacity: p.capacity,
      active,
      utilization: p.capacity > 0 ? Math.min(1, active / p.capacity) : 0,
      totalLeads: myLeads.length,
      closed: closed.length,
      conversionRate: conv,
      avgReactionMs: avgReaction,
      closedThisMonth: closedMonth,
      pendingCommission: pendingCom,
    };
  });

  const partnerId = await getCurrentPartnerId(session);
  const focus = isAdminRole(session.role) ? null : stats.find((s) => s.id === partnerId) ?? null;

  const topByConv = [...stats].sort((a, b) => b.conversionRate - a.conversionRate).slice(0, 5);
  const topByClose = [...stats].sort((a, b) => b.closedThisMonth - a.closedThisMonth).slice(0, 5);
  const fastest = [...stats]
    .filter((s) => s.avgReactionMs != null)
    .sort((a, b) => (a.avgReactionMs ?? 0) - (b.avgReactionMs ?? 0))
    .slice(0, 5);
  const overload = [...stats].filter((s) => s.utilization >= 0.85).sort((a, b) => b.utilization - a.utilization);
  const idle = [...stats].filter((s) => s.utilization < 0.4 && s.status === 'active').sort((a, b) => a.utilization - b.utilization);

  return (
    <div className="space-y-6">
      <header>
        <div className="text-[11px] uppercase tracking-[0.18em] text-[var(--ops-muted)]">Operations</div>
        <h1 className="font-display text-[28px] sm:text-[32px] tracking-[-0.015em] text-[var(--ops-text)]">
          Performance
        </h1>
        <p className="mt-1 text-[13.5px] text-[var(--ops-text-2)] max-w-2xl">
          {focus
            ? 'Deine Leistung im Überblick.'
            : 'Top-Partner, schnellste Reaktionen, Über-/Unterauslastung.'}
        </p>
      </header>

      {focus && (
        <section className="ops-card p-5 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Stat label="Conversion" value={`${Math.round(focus.conversionRate * 100)}%`} tone="cyan" />
          <Stat label="Abschlüsse Mt." value={String(focus.closedThisMonth)} tone="success" />
          <Stat label="Reaktionszeit" value={fmtReaction(focus.avgReactionMs)} />
          <Stat label="Offene Provision" value={fmtEur(focus.pendingCommission)} tone="gold" />
        </section>
      )}

      {!focus && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <RankCard
            title="Top Conversion"
            entries={topByConv.map((s) => ({
              id: s.id,
              name: s.name,
              value: `${Math.round(s.conversionRate * 100)}%`,
              hint: `${s.closed} / ${s.totalLeads}`,
            }))}
          />
          <RankCard
            title="Top Abschlüsse (Monat)"
            entries={topByClose.map((s) => ({
              id: s.id,
              name: s.name,
              value: String(s.closedThisMonth),
              hint: `${s.totalLeads} Leads`,
            }))}
          />
          <RankCard
            title="Schnellste Reaktion"
            entries={fastest.map((s) => ({
              id: s.id,
              name: s.name,
              value: fmtReaction(s.avgReactionMs),
              hint: '—',
            }))}
          />
          <RankCard
            title="Überlastet (≥ 85%)"
            tone="warning"
            entries={overload.map((s) => ({
              id: s.id,
              name: s.name,
              value: `${Math.round(s.utilization * 100)}%`,
              hint: `${s.active}/${s.capacity}`,
            }))}
            empty="Niemand am Limit. Sauber."
          />
          <RankCard
            title="Ungenutzte Kapazität (< 40%)"
            tone="cyan"
            entries={idle.map((s) => ({
              id: s.id,
              name: s.name,
              value: `${Math.round(s.utilization * 100)}%`,
              hint: `${s.active}/${s.capacity}`,
            }))}
            empty="Alle Partner gut ausgelastet."
          />
        </div>
      )}
    </div>
  );
}

function Stat({ label, value, tone }: { label: string; value: string; tone?: 'cyan' | 'gold' | 'success' }) {
  const color = tone === 'cyan' ? 'var(--ops-cyan)' : tone === 'gold' ? 'var(--ops-gold)' : tone === 'success' ? 'var(--ops-success)' : 'var(--ops-text)';
  return (
    <div>
      <div className="text-[10.5px] uppercase tracking-[0.14em] text-[var(--ops-muted)]">{label}</div>
      <div className="mt-1 text-[24px] font-display font-semibold tabular-nums" style={{ color }}>
        {value}
      </div>
    </div>
  );
}

function RankCard({
  title,
  entries,
  tone,
  empty,
}: {
  title: string;
  entries: { id: string; name: string; value: string; hint: string }[];
  tone?: 'cyan' | 'warning';
  empty?: string;
}) {
  return (
    <div className="ops-card p-5">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-[16px] text-[var(--ops-text)]">{title}</h2>
        {tone === 'warning' && <span className="ops-pill" data-tone="warning">Achtung</span>}
        {tone === 'cyan' && <span className="ops-pill" data-tone="cyan">Potenzial</span>}
      </div>
      {entries.length === 0 ? (
        <p className="mt-3 text-[13px] text-[var(--ops-muted)]">{empty ?? 'Keine Daten.'}</p>
      ) : (
        <ol className="mt-3 space-y-2">
          {entries.map((e, i) => (
            <li key={e.id} className="flex items-center gap-3 text-[13.5px]">
              <span className="w-6 text-center text-[11px] text-[var(--ops-muted)] tabular-nums">#{i + 1}</span>
              <Link
                href={`/admin/vertriebspartner/${e.id}`}
                className="flex-1 truncate text-[var(--ops-text)] hover:text-[var(--ops-cyan)]"
              >
                {e.name}
              </Link>
              <span className="text-[var(--ops-muted)] tabular-nums text-[11.5px]">{e.hint}</span>
              <span className="font-display font-semibold tabular-nums text-[var(--ops-cyan)]">{e.value}</span>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
