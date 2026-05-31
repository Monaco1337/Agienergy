import Link from 'next/link';
import { getStorage } from '@elo/storage';
import type { Lead, LeadColor } from '@elo/core';
import { LeadColorBadge } from '@/components/admin/LeadColorBadge';
import { ContactBadge } from '@/components/admin/ContactBadge';
import { ConsentBadge } from '@/components/admin/ConsentBadge';
import { Badge } from '@elo/ui';

export const dynamic = 'force-dynamic';

interface PageProps {
  searchParams: Promise<{ color?: string | string[]; q?: string; status?: string }>;
}

const INTEREST_LABEL: Record<string, string> = {
  strom: 'Strom',
  gas: 'Gas',
  strom_gas: 'Strom & Gas',
  photovoltaik: 'Photovoltaik',
  unknown: '—',
};

const TYPE_LABEL: Record<string, string> = {
  private: 'Privat',
  home_owner: 'Eigentümer',
  business: 'Gewerbe',
  landlord: 'Vermieter',
  unknown: '—',
};

export default async function LeadsPage({ searchParams }: PageProps) {
  const sp = await searchParams;
  const colors = (Array.isArray(sp.color) ? sp.color : sp.color ? [sp.color] : []) as LeadColor[];
  const storage = getStorage();
  const leads = await storage.listLeads({
    colors: colors.length ? colors : undefined,
    search: sp.q,
  });

  const isDemoMode = leads.length > 0 && leads.every((l) => l.isDemo);

  return (
    <div className="space-y-7 max-w-[1240px]">
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <div>
          <p className="text-[12px] uppercase tracking-[0.16em] text-sage font-medium">Leads</p>
          <h1 className="mt-1 font-display text-[28px] tracking-[-0.012em] text-ink">
            Alle Leads
          </h1>
          <p className="text-[14px] text-muted mt-1">
            {leads.length} {leads.length === 1 ? 'Treffer' : 'Treffer'}
            {colors.length > 0 && (
              <>
                {' '}
                · gefiltert nach{' '}
                <span className="text-ink2">{colors.join(', ')}</span>
              </>
            )}
          </p>
        </div>
        <div className="flex items-center gap-3">
          {isDemoMode && (
            <span className="inline-flex items-center gap-2 h-8 px-3 rounded-full border border-gold/40 bg-gold/10 text-gold text-[11.5px] font-medium uppercase tracking-[0.12em]">
              Demo-Daten
            </span>
          )}
          <form className="flex gap-2">
            <input
              type="text"
              name="q"
              placeholder="Name, PLZ, E-Mail…"
              defaultValue={sp.q ?? ''}
              className="h-10 w-64 rounded-elo border border-line bg-card px-3.5 text-[14px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-paper focus-visible:ring-sage"
            />
            <button className="h-10 px-4 rounded-elo bg-sage text-paper text-[14px] font-medium hover:bg-sage2 transition-colors">
              Suchen
            </button>
          </form>
        </div>
      </div>

      <FilterTabs current={colors} />

      {/* Desktop-Tabelle */}
      <div className="hidden lg:block bg-card border border-line rounded-eloLg overflow-hidden shadow-eloSm">
        <table className="w-full text-[14px]">
          <thead className="bg-paper2/50 text-muted border-b border-line">
            <tr className="text-left">
              <Th>Lead</Th>
              <Th>Score</Th>
              <Th>Profil</Th>
              <Th>Kontakt</Th>
              <Th>Empfohlene Aktion</Th>
              <Th>Status</Th>
              <Th className="text-right">Aktion</Th>
            </tr>
          </thead>
          <tbody>
            {leads.map((l) => (
              <LeadRow key={l.id} lead={l} />
            ))}
            {leads.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-14 text-center">
                  <div className="text-[15px] font-medium text-ink">Keine Leads gefunden.</div>
                  <p className="mt-1 text-[13.5px] text-muted">
                    Anderer Filter oder andere Suche?
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile-Karten */}
      <div className="lg:hidden grid gap-3">
        {leads.map((l) => (
          <LeadMobileCard key={l.id} lead={l} />
        ))}
        {leads.length === 0 && (
          <div className="bg-card border border-line rounded-eloLg px-5 py-10 text-center">
            <div className="text-[15px] font-medium text-ink">Keine Leads gefunden.</div>
            <p className="mt-1 text-[13.5px] text-muted">Anderer Filter oder andere Suche?</p>
          </div>
        )}
      </div>
    </div>
  );
}

function Th({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <th
      className={`px-5 py-3 text-[11.5px] uppercase tracking-[0.12em] font-medium ${className}`}
    >
      {children}
    </th>
  );
}

function LeadRow({ lead }: { lead: Lead }) {
  const interest = lead.interests[0] ?? 'unknown';
  return (
    <tr className="border-t border-line hover:bg-paper2/40 transition-colors">
      <td className="px-5 py-4">
        <div className="flex items-center gap-3">
          <LeadColorBadge color={lead.leadColor} />
          <div className="min-w-0">
            <div className="text-[14.5px] font-semibold text-ink truncate">
              {lead.firstName} {lead.lastName}
              {lead.isDemo && (
                <span className="ml-2 text-[10.5px] uppercase tracking-[0.14em] text-gold">
                  Demo
                </span>
              )}
            </div>
            <div className="text-[12.5px] text-muted truncate">
              {lead.postalCode} {lead.city ?? ''} ·{' '}
              {new Date(lead.createdAt).toLocaleDateString('de-DE')}
            </div>
          </div>
        </div>
      </td>
      <td className="px-5 py-4">
        <div className="font-display text-[18px] text-ink leading-none">{lead.leadScore}</div>
        <div className="mt-1 text-[11.5px] text-muted">{lead.leadLabel}</div>
      </td>
      <td className="px-5 py-4">
        <div className="text-[13.5px] text-ink">{INTEREST_LABEL[interest] ?? interest}</div>
        <div className="text-[12.5px] text-muted">{TYPE_LABEL[lead.customerType] ?? lead.customerType}</div>
      </td>
      <td className="px-5 py-4">
        <div className="flex flex-col gap-1">
          <div className="text-[13.5px] text-ink2 truncate max-w-[18ch]">
            {lead.phone ?? lead.email ?? '—'}
          </div>
          <ContactBadge preference={lead.contactPreference} />
        </div>
      </td>
      <td className="px-5 py-4">
        <p className="text-[13.5px] text-ink2 leading-snug max-w-[36ch] line-clamp-2">
          {lead.recommendedAction}
        </p>
        <div className="mt-1.5">
          <ConsentBadge legalBasis={lead.legalBasis} />
        </div>
      </td>
      <td className="px-5 py-4">
        <Badge tone="neutral">{lead.status}</Badge>
      </td>
      <td className="px-5 py-4 text-right">
        <Link
          href={`/admin/leads/${lead.id}`}
          className="inline-flex items-center justify-center h-9 px-3.5 rounded-elo border border-line bg-card text-[13.5px] font-medium text-ink hover:border-lineStrong hover:bg-paper2/60 transition-colors"
        >
          Details →
        </Link>
      </td>
    </tr>
  );
}

function LeadMobileCard({ lead }: { lead: Lead }) {
  const interest = lead.interests[0] ?? 'unknown';
  return (
    <Link
      href={`/admin/leads/${lead.id}`}
      className="block bg-card border border-line rounded-eloLg p-4 hover:border-lineStrong transition-colors"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <LeadColorBadge color={lead.leadColor} />
          <div className="min-w-0">
            <div className="text-[15px] font-semibold text-ink truncate">
              {lead.firstName} {lead.lastName}
              {lead.isDemo && (
                <span className="ml-2 text-[10px] uppercase tracking-[0.14em] text-gold">
                  Demo
                </span>
              )}
            </div>
            <div className="text-[12.5px] text-muted truncate">
              {lead.postalCode} {lead.city ?? ''} · {INTEREST_LABEL[interest] ?? interest} ·{' '}
              {TYPE_LABEL[lead.customerType] ?? lead.customerType}
            </div>
          </div>
        </div>
        <div className="text-right shrink-0">
          <div className="font-display text-[18px] text-ink leading-none">{lead.leadScore}</div>
          <div className="text-[11px] text-muted mt-0.5">{lead.leadLabel}</div>
        </div>
      </div>

      <p className="mt-3 text-[13.5px] text-ink2 leading-snug">{lead.recommendedAction}</p>

      <div className="mt-3 pt-3 border-t border-line flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-2 flex-wrap">
          <ContactBadge preference={lead.contactPreference} />
          <ConsentBadge legalBasis={lead.legalBasis} />
        </div>
        <span className="text-sage text-[13px] font-medium">Details →</span>
      </div>
    </Link>
  );
}

function FilterTabs({ current }: { current: LeadColor[] }) {
  const opts: { id: LeadColor; label: string }[] = [
    { id: 'red', label: 'Rot' },
    { id: 'orange', label: 'Orange' },
    { id: 'yellow', label: 'Gelb' },
    { id: 'blue', label: 'Blau' },
    { id: 'gray', label: 'Grau' },
    { id: 'black', label: 'Schwarz' },
  ];
  return (
    <div className="flex flex-wrap gap-2">
      <Link href="/admin/leads" className={tabCls(current.length === 0)}>
        Alle
      </Link>
      {opts.map((o) => {
        const active = current.includes(o.id);
        const next = active ? current.filter((c) => c !== o.id) : [...current, o.id];
        const qs = next.map((c) => `color=${c}`).join('&');
        return (
          <Link key={o.id} href={qs ? `/admin/leads?${qs}` : '/admin/leads'} className={tabCls(active)}>
            {o.label}
          </Link>
        );
      })}
    </div>
  );
}

function tabCls(active: boolean): string {
  return `inline-flex items-center h-9 px-3.5 rounded-pill border text-[13px] font-medium transition-colors ${
    active
      ? 'bg-sage text-paper border-sage'
      : 'bg-card text-ink2 border-line hover:border-lineStrong hover:text-ink'
  }`;
}
