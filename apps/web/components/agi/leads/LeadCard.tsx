import Link from 'next/link';
import type { Lead, Partner } from '@elo/core';
import { LeadStatusBadge } from './LeadStatusBadge';
import { LeadScoreBadge } from './LeadScoreBadge';
import { LeadQuickActions } from './LeadQuickActions';
import { leadCategory } from '@/lib/agi/routing';

function timeAgo(iso: string): string {
  const ms = Date.now() - new Date(iso).getTime();
  const m = Math.floor(ms / 60_000);
  if (m < 1) return 'jetzt';
  if (m < 60) return `vor ${m} Min`;
  const h = Math.floor(m / 60);
  if (h < 24) return `vor ${h} Std`;
  const d = Math.floor(h / 24);
  if (d < 30) return `vor ${d} T.`;
  return new Date(iso).toLocaleDateString('de-DE');
}

const CATEGORY_LABEL = {
  strom: 'Strom',
  gas: 'Gas',
  solar: 'Photovoltaik',
  gewerbe: 'Gewerbe',
} as const;

export function LeadCard({
  lead,
  partner,
  href,
  compact = false,
  draggable = false,
}: {
  lead: Lead;
  partner?: Partner | null;
  href?: string;
  compact?: boolean;
  draggable?: boolean;
}) {
  const cat = leadCategory(lead);
  const fullName = `${lead.firstName} ${lead.lastName}`.trim() || 'Unbekannt';
  const location = [lead.postalCode, lead.city].filter(Boolean).join(' ');
  const target = href ?? `/admin/leads/${lead.id}`;

  return (
    <article
      className={`ops-card ops-card-hover group relative ${draggable ? 'ops-draggable' : ''}`}
      draggable={draggable || undefined}
      data-lead-id={lead.id}
    >
      <Link href={target} className="block p-4 outline-none">
        <div className="flex items-start gap-3">
          <LeadScoreBadge color={lead.leadColor} score={lead.leadScore} size={compact ? 'sm' : 'md'} />
          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <div className="text-[14.5px] font-display font-semibold text-[var(--ops-text)] truncate">
                  {fullName}
                  {lead.isDemo && (
                    <span className="ml-2 ops-pill" data-tone="gold" style={{ verticalAlign: '2px' }}>
                      Demo
                    </span>
                  )}
                </div>
                <div className="mt-0.5 text-[12px] text-[var(--ops-text-2)] truncate">
                  {[location, CATEGORY_LABEL[cat]].filter(Boolean).join(' · ')}
                </div>
              </div>
              <div className="text-[10.5px] uppercase tracking-[0.12em] text-[var(--ops-muted)] whitespace-nowrap">
                {timeAgo(lead.createdAt)}
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between gap-3 flex-wrap">
              <LeadStatusBadge status={lead.status} />
              {partner && (
                <span className="ops-pill" data-tone="blue" title="Zugewiesener Partner">
                  {partner.name}
                </span>
              )}
              {!partner && lead.assignedPartnerId === undefined && (
                <span className="ops-pill" data-tone="warning">
                  Unverteilt
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>

      {!compact && (
        <div className="px-4 pb-4 pt-0 -mt-1 flex items-center justify-between gap-3">
          <div className="text-[11.5px] text-[var(--ops-text-2)] truncate flex items-center gap-2">
            {lead.phone && <span className="truncate">{lead.phone}</span>}
            {lead.email && <span className="truncate text-[var(--ops-muted)]">· {lead.email}</span>}
          </div>
          <LeadQuickActions lead={lead} compact />
        </div>
      )}
    </article>
  );
}
