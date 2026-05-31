import Link from 'next/link';
import { getStorage } from '@elo/storage';
import type { Lead, LeadColor } from '@elo/core';
import { LeadColorBadge } from '@/components/admin/LeadColorBadge';
import { ContactBadge } from '@/components/admin/ContactBadge';
import { ConsentBadge } from '@/components/admin/ConsentBadge';
import { Badge } from '@elo/ui';

export const dynamic = 'force-dynamic';

const COLOR_PRIORITY: Record<LeadColor, number> = {
  red: 5,
  orange: 4,
  yellow: 3,
  blue: 2,
  gray: 1,
  black: 0,
};

const INTEREST_LABEL: Record<string, string> = {
  strom: 'Strom',
  gas: 'Gas',
  strom_gas: 'Strom & Gas',
  photovoltaik: 'Photovoltaik',
  unknown: 'Allgemein',
};

const TYPE_LABEL: Record<string, string> = {
  private: 'Privat',
  home_owner: 'Eigentümer',
  business: 'Gewerbe',
  landlord: 'Vermieter',
  unknown: '—',
};

function isToday(iso: string): boolean {
  const d = new Date(iso);
  const now = new Date();
  return (
    d.getDate() === now.getDate() &&
    d.getMonth() === now.getMonth() &&
    d.getFullYear() === now.getFullYear()
  );
}

function canBeContacted(l: Lead): boolean {
  return l.legalBasis !== 'unknown_blocked' && l.leadColor !== 'black';
}

function relativeTime(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const min = Math.floor(diff / 60000);
  if (min < 1) return 'gerade eben';
  if (min < 60) return `vor ${min} Min`;
  const h = Math.floor(min / 60);
  if (h < 24) return `vor ${h} Std`;
  const d = Math.floor(h / 24);
  if (d === 1) return 'gestern';
  if (d < 7) return `vor ${d} Tagen`;
  return new Date(iso).toLocaleDateString('de-DE');
}

export default async function AdminCockpit() {
  const storage = getStorage();
  const leads = await storage.listLeads();

  const newToday = leads.filter((l) => isToday(l.createdAt));
  const hot = leads.filter((l) => l.leadColor === 'red' || l.leadColor === 'orange');
  const callableToday = leads
    .filter((l) => canBeContacted(l) && l.contactHistory.length === 0)
    .sort((a, b) => {
      const cp = COLOR_PRIORITY[b.leadColor] - COLOR_PRIORITY[a.leadColor];
      if (cp !== 0) return cp;
      return b.leadScore - a.leadScore;
    });

  const top = callableToday.slice(0, 6);
  const nextUp = callableToday.slice(6, 12);
  const blocked = leads.filter((l) => !canBeContacted(l));

  const pipeline: Array<{ key: string; label: string; count: number; color: LeadColor }> = [
    { key: 'red', label: 'Sofort-Abschluss', count: leads.filter((l) => l.leadColor === 'red').length, color: 'red' },
    { key: 'orange', label: 'Sehr heiß', count: leads.filter((l) => l.leadColor === 'orange').length, color: 'orange' },
    { key: 'yellow', label: 'Warm', count: leads.filter((l) => l.leadColor === 'yellow').length, color: 'yellow' },
    { key: 'blue', label: 'Information', count: leads.filter((l) => l.leadColor === 'blue').length, color: 'blue' },
    { key: 'gray', label: 'Niedrig', count: leads.filter((l) => l.leadColor === 'gray').length, color: 'gray' },
    { key: 'black', label: 'Gesperrt', count: leads.filter((l) => l.leadColor === 'black').length, color: 'black' },
  ];
  const pipelineMax = Math.max(1, ...pipeline.map((p) => p.count));

  const bySource = new Map<string, number>();
  for (const l of leads) bySource.set(l.source, (bySource.get(l.source) ?? 0) + 1);
  const sources = [...bySource.entries()].sort((a, b) => b[1] - a[1]);
  const sourceMax = Math.max(1, ...sources.map(([, n]) => n));

  const isDemoMode = leads.length > 0 && leads.every((l) => l.isDemo);
  const today = new Date().toLocaleDateString('de-DE', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
  });

  return (
    <div className="space-y-9 max-w-[1280px]">
      {/* Header */}
      <header className="flex items-end justify-between flex-wrap gap-4">
        <div>
          <p className="text-[12px] uppercase tracking-[0.18em] text-sage font-semibold">
            Vertriebs-Cockpit
          </p>
          <h1 className="mt-1.5 font-display text-[32px] leading-[1.05] tracking-[-0.02em] text-ink">
            Heute wichtigste Leads
          </h1>
          <p className="text-[13.5px] text-muted mt-2 capitalize">{today}</p>
        </div>
        <div className="flex items-center gap-3">
          {isDemoMode && (
            <span className="inline-flex items-center gap-2 h-9 px-3.5 rounded-pill border border-gold/40 bg-gold/10 text-gold2 text-[12px] font-semibold uppercase tracking-[0.12em]">
              <span aria-hidden className="size-1.5 rounded-full bg-gold animate-pulse" />
              Demo-Daten
            </span>
          )}
          <Link
            href="/admin/leads"
            className="inline-flex items-center gap-2 h-9 px-4 rounded-pill bg-gradient-to-br from-cyan to-cyanDeep text-[#05201d] text-[13.5px] font-semibold shadow-[0_6px_20px_rgba(57,216,232,0.28)] hover:shadow-[0_8px_26px_rgba(57,216,232,0.42)] transition-shadow"
          >
            Alle Leads
            <span aria-hidden>→</span>
          </Link>
        </div>
      </header>

      {/* KPI-Band */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          accent="sage"
          label="Jetzt kontaktierbar"
          value={callableToday.length}
          hint="offen, freigegeben"
          href="/admin/leads"
        />
        <StatCard
          accent="red"
          label="Heiße Leads"
          value={hot.length}
          hint="rot & orange"
          href="/admin/leads?color=red&color=orange"
        />
        <StatCard
          accent="blue"
          label="Neu heute"
          value={newToday.length}
          hint="in den letzten 24 h"
          href="/admin/leads"
        />
        <StatCard
          accent="gold"
          label="Leads gesamt"
          value={leads.length}
          hint={blocked.length > 0 ? `${blocked.length} gesperrt` : 'gesamter Bestand'}
          href="/admin/leads"
        />
      </section>

      {/* TOP-PRIORITÄTEN */}
      <section>
        <SectionHeader
          eyebrow="01 · Wen jetzt zuerst anrufen"
          title="Top-Prioritäten"
          right={
            <Link
              href="/admin/leads?color=red&color=orange"
              className="text-sage text-[14px] font-semibold hover:text-sage2 inline-flex items-center gap-1"
            >
              Priorisierte Leads <span aria-hidden>→</span>
            </Link>
          }
        />
        {top.length === 0 ? (
          <EmptyState
            title="Alles abgearbeitet."
            hint="Aktuell gibt es keine offenen Leads mit Priorität. Neue Anfragen erscheinen hier automatisch."
          />
        ) : (
          <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
            {top.map((l, i) => (
              <LeadCockpitCard key={l.id} lead={l} rank={i + 1} />
            ))}
          </div>
        )}
      </section>

      {/* NÄCHSTE LEADS */}
      {nextUp.length > 0 && (
        <section>
          <SectionHeader eyebrow="02 · Danach" title="Weitere offene Leads" />
          <div className="bg-card border border-line rounded-eloLg overflow-hidden divide-y divide-line shadow-eloSm">
            {nextUp.map((l) => (
              <CompactLeadRow key={l.id} lead={l} />
            ))}
          </div>
        </section>
      )}

      {/* PIPELINE + QUELLEN */}
      <section className="grid gap-5 lg:grid-cols-3">
        <div className="lg:col-span-2 bg-card border border-line rounded-eloLg p-6 shadow-eloSm">
          <SectionHeader eyebrow="03 · Pipeline" title="Verteilung nach Priorität" inline />
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3">
            {pipeline.map((p) => (
              <Link
                key={p.key}
                href={`/admin/leads?color=${p.key}`}
                className="group block rounded-elo border border-line bg-paper2/30 hover:bg-paper2 hover:border-lineStrong px-4 py-3.5 transition-all"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[12.5px] text-muted truncate">{p.label}</span>
                  <LeadColorBadge color={p.color} />
                </div>
                <div className="mt-2 font-display text-[26px] leading-none text-ink">{p.count}</div>
                <div className="mt-2.5 h-1.5 rounded-full bg-line/70 overflow-hidden">
                  <span
                    className="block h-full rounded-full bg-sage/70 group-hover:bg-sage transition-all"
                    style={{ width: `${Math.round((p.count / pipelineMax) * 100)}%` }}
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="bg-card border border-line rounded-eloLg p-6 shadow-eloSm">
          <SectionHeader eyebrow="Quellen" title="Top-Kanäle" inline />
          {sources.length === 0 ? (
            <p className="mt-4 text-[14px] text-muted">Noch keine Daten.</p>
          ) : (
            <ul className="mt-5 space-y-4 text-[14px]">
              {sources.slice(0, 6).map(([s, n]) => (
                <li key={s}>
                  <div className="flex items-center justify-between">
                    <span className="text-ink2 capitalize">{s.replace(/_/g, ' ')}</span>
                    <span className="text-ink font-semibold tabular-nums">{n}</span>
                  </div>
                  <div className="mt-1.5 h-1.5 rounded-full bg-line/70 overflow-hidden">
                    <span
                      className="block h-full rounded-full bg-gold/70"
                      style={{ width: `${Math.round((n / sourceMax) * 100)}%` }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {/* GESPERRT */}
      {blocked.length > 0 && (
        <section>
          <SectionHeader
            eyebrow="04 · Achtung"
            title="Kontaktaufnahme nicht freigegeben"
            right={<span className="text-[13px] text-muted">{blocked.length} Leads</span>}
          />
          <div className="bg-card border border-line rounded-eloLg overflow-hidden divide-y divide-line shadow-eloSm">
            {blocked.slice(0, 5).map((l) => (
              <CompactLeadRow key={l.id} lead={l} blocked />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

/* ————————————————————————————————————————— Komponenten ————————————————————————————————————————— */

const ACCENT: Record<string, { bar: string; dot: string; text: string; glow: string }> = {
  sage: { bar: 'bg-sage', dot: 'bg-sage', text: 'text-sage', glow: 'from-sage/12' },
  red: { bar: 'bg-leadRed', dot: 'bg-leadRed', text: 'text-leadRed', glow: 'from-leadRed/12' },
  blue: { bar: 'bg-leadBlue', dot: 'bg-leadBlue', text: 'text-leadBlue', glow: 'from-leadBlue/12' },
  gold: { bar: 'bg-gold', dot: 'bg-gold', text: 'text-gold', glow: 'from-gold/12' },
};

function StatCard({
  accent,
  label,
  value,
  hint,
  href,
}: {
  accent: keyof typeof ACCENT;
  label: string;
  value: number;
  hint: string;
  href: string;
}) {
  const a = ACCENT[accent]!;
  return (
    <Link
      href={href}
      className="group relative overflow-hidden bg-card border border-line rounded-eloLg p-5 transition-all"
    >
      <span aria-hidden className={`absolute left-0 top-0 h-full w-1 ${a.bar}`} />
      <span
        aria-hidden
        className={`pointer-events-none absolute -right-10 -top-10 size-32 rounded-full bg-gradient-to-br ${a.glow} to-transparent blur-2xl opacity-0 group-hover:opacity-100 transition-opacity`}
      />
      <div className="flex items-center gap-2">
        <span aria-hidden className={`size-1.5 rounded-full ${a.dot}`} />
        <span className="text-[11.5px] uppercase tracking-[0.12em] text-muted font-semibold">
          {label}
        </span>
      </div>
      <div className={`mt-3 font-display text-[42px] leading-none tracking-[-0.02em] tabular-nums ${a.text}`}>
        {value}
      </div>
      <div className="mt-2 text-[12.5px] text-muted">{hint}</div>
    </Link>
  );
}

function SectionHeader({
  eyebrow,
  title,
  right,
  inline,
}: {
  eyebrow: string;
  title: string;
  right?: React.ReactNode;
  inline?: boolean;
}) {
  return (
    <div className={inline ? 'flex items-end justify-between gap-3' : 'mb-5 flex items-end justify-between gap-3'}>
      <div>
        <p className="text-[11.5px] uppercase tracking-[0.14em] text-muted font-semibold">{eyebrow}</p>
        <h2 className="mt-1 font-display text-[20px] sm:text-[22px] tracking-[-0.01em] text-ink leading-tight">
          {title}
        </h2>
      </div>
      {right}
    </div>
  );
}

function EmptyState({ title, hint }: { title: string; hint: string }) {
  return (
    <div className="rounded-eloLg border border-dashed border-line bg-paper2/30 px-6 py-12 text-center">
      <div className="text-[15px] font-semibold text-ink">{title}</div>
      <p className="mt-1.5 text-[13.5px] text-muted max-w-md mx-auto">{hint}</p>
    </div>
  );
}

function CallIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path
        d="M4.5 3h3l1.2 3.2-1.7 1.3a10 10 0 004.5 4.5l1.3-1.7L16.5 14v3a1 1 0 01-1.1 1A13 13 0 013.5 4.1 1 1 0 014.5 3z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LeadCockpitCard({ lead, rank }: { lead: Lead; rank: number }) {
  const why = lead.scoreReasons.filter((r) => r.delta > 0).slice(0, 3).map((r) => r.label);
  const interest = lead.interests[0] ?? 'unknown';
  return (
    <article className="group relative bg-card border border-line rounded-eloLg p-5 hover:border-lineStrong hover:shadow-elo transition-all flex flex-col">
      <div className="absolute -top-2.5 left-4 flex items-center gap-2">
        <span className="inline-flex items-center justify-center size-6 rounded-full bg-gradient-to-br from-cyan to-cyanDeep text-[#05201d] text-[12px] font-bold tabular-nums shadow-[0_4px_14px_rgba(57,216,232,0.35)]">
          {rank}
        </span>
        {lead.isDemo && (
          <span className="inline-flex items-center h-5 px-2 rounded-full bg-gold/12 border border-gold/30 text-gold2 text-[10px] uppercase tracking-[0.14em] font-semibold">
            Demo
          </span>
        )}
      </div>

      <header className="flex items-start gap-3 pt-1.5">
        <LeadColorBadge color={lead.leadColor} />
        <div className="flex-1 min-w-0">
          <div className="text-[15.5px] font-semibold text-ink truncate">
            {lead.firstName} {lead.lastName}
          </div>
          <div className="text-[12.5px] text-muted truncate">
            {lead.postalCode} {lead.city ?? ''} · {INTEREST_LABEL[interest] ?? interest}
            {lead.customerType !== 'unknown' ? ` · ${TYPE_LABEL[lead.customerType]}` : ''}
          </div>
        </div>
        <Badge tone="neutral" className="tabular-nums">
          {lead.leadScore}
        </Badge>
      </header>

      <div className="mt-4 rounded-elo bg-sage/[0.06] border border-sage/20 px-4 py-3">
        <div className="text-[11px] uppercase tracking-[0.14em] text-sage font-semibold">
          Nächste Aktion
        </div>
        <p className="mt-1 text-[14px] text-ink leading-snug">{lead.recommendedAction}</p>
      </div>

      {why.length > 0 && (
        <div className="mt-3">
          <div className="text-[11px] uppercase tracking-[0.14em] text-muted font-semibold">
            Warum wichtig
          </div>
          <ul className="mt-1.5 space-y-1">
            {why.map((w) => (
              <li key={w} className="text-[13px] text-ink2 leading-snug flex items-start gap-2">
                <span aria-hidden className="mt-1.5 size-1 rounded-full bg-sage shrink-0" />
                <span>{w}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-3 flex items-center gap-2 flex-wrap">
        <ContactBadge preference={lead.contactPreference} />
        <ConsentBadge legalBasis={lead.legalBasis} />
        <span className="text-[12px] text-muted ml-auto">{relativeTime(lead.createdAt)}</span>
      </div>

      <footer className="mt-4 pt-4 border-t border-line flex items-center gap-2">
        {lead.phone ? (
          <a
            href={`tel:${lead.phone.replace(/\s/g, '')}`}
            className="inline-flex items-center justify-center gap-1.5 h-9 px-3.5 rounded-elo bg-sage text-paper text-[13.5px] font-semibold hover:bg-sage2 transition-colors"
          >
            <CallIcon />
            Anrufen
          </a>
        ) : lead.email ? (
          <a
            href={`mailto:${lead.email}`}
            className="inline-flex items-center justify-center h-9 px-3.5 rounded-elo bg-sage text-paper text-[13.5px] font-semibold hover:bg-sage2 transition-colors"
          >
            E-Mail
          </a>
        ) : null}
        <Link
          href={`/admin/leads/${lead.id}`}
          className="inline-flex items-center gap-1.5 h-9 px-3.5 rounded-elo border border-line bg-card text-ink text-[13.5px] font-semibold hover:border-lineStrong hover:bg-paper2/60 transition-colors ml-auto"
        >
          Details
          <span aria-hidden className="transition-transform group-hover:translate-x-0.5">→</span>
        </Link>
      </footer>
    </article>
  );
}

function CompactLeadRow({ lead, blocked = false }: { lead: Lead; blocked?: boolean }) {
  return (
    <Link
      href={`/admin/leads/${lead.id}`}
      className="grid grid-cols-[auto_1fr_auto] items-center gap-4 px-5 py-3.5 hover:bg-paper2/40 transition-colors"
    >
      <LeadColorBadge color={lead.leadColor} />
      <div className="min-w-0">
        <div className="text-[14.5px] font-semibold text-ink truncate">
          {lead.firstName} {lead.lastName}
          {lead.isDemo && (
            <span className="ml-2 text-[10.5px] uppercase tracking-[0.14em] text-gold2">Demo</span>
          )}
        </div>
        <div className="text-[12.5px] text-muted truncate">
          {blocked ? (
            <>
              <span className="text-leadRed font-medium">Kontakt nicht freigegeben</span> ·{' '}
              {lead.legalBasis}
            </>
          ) : (
            lead.recommendedAction
          )}
        </div>
      </div>
      <div className="flex items-center gap-3 shrink-0">
        <Badge tone="neutral" className="tabular-nums">
          {lead.leadScore}
        </Badge>
        <span aria-hidden className="text-muted">→</span>
      </div>
    </Link>
  );
}
