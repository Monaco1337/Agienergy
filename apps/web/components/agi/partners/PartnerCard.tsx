import Link from 'next/link';
import type { Partner } from '@elo/core';

const STATUS_TONE: Record<Partner['status'], 'success' | 'warning' | 'critical' | 'neutral'> = {
  active: 'success',
  paused: 'warning',
  full: 'warning',
  inactive: 'critical',
};

export interface PartnerCardData {
  partner: Partner;
  activeLeads: number;
  totalAssigned: number;
  closedThisMonth: number;
  conversionRate: number;
  pendingCommission: number;
}

export function PartnerCard({ data }: { data: PartnerCardData }) {
  const { partner: p, activeLeads, totalAssigned, closedThisMonth, conversionRate, pendingCommission } = data;
  const utilization = p.capacity > 0 ? Math.min(1, activeLeads / p.capacity) : 0;
  return (
    <Link
      href={`/admin/vertriebspartner/${p.id}`}
      className="ops-card ops-card-hover p-5 block"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="text-[15.5px] font-display font-semibold text-[var(--ops-text)] truncate">
              {p.name}
            </h3>
            {p.isDemo && (
              <span className="ops-pill" data-tone="gold">Demo</span>
            )}
          </div>
          <div className="mt-0.5 text-[12px] text-[var(--ops-text-2)] truncate">
            {p.email}
          </div>
          <div className="mt-1.5 text-[11.5px] text-[var(--ops-muted)] truncate">
            {p.regionLabel || p.regionPrefixes.join(', ') || 'Bundesweit'} ·{' '}
            {p.specialties.length > 0 ? p.specialties.join(' / ') : 'allg.'}
          </div>
        </div>
        <span className="ops-pill" data-tone={STATUS_TONE[p.status]}>
          {p.status}
        </span>
      </div>

      <div className="mt-4">
        <div className="flex items-baseline justify-between text-[11.5px] text-[var(--ops-text-2)]">
          <span>
            <span className="text-[var(--ops-text)] font-semibold tabular-nums">{activeLeads}</span>{' '}
            / {p.capacity}
          </span>
          <span>{Math.round(utilization * 100)}%</span>
        </div>
        <div className="mt-1.5 h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
          <div
            className="h-full rounded-full"
            style={{
              width: `${Math.round(utilization * 100)}%`,
              background:
                utilization >= 0.95
                  ? 'linear-gradient(90deg,#ef4444,#f59e0b)'
                  : utilization >= 0.7
                    ? 'linear-gradient(90deg,#f59e0b,#eab308)'
                    : 'linear-gradient(90deg,#36e6d0,#38bdf8)',
            }}
          />
        </div>
      </div>

      <dl className="mt-4 grid grid-cols-3 gap-3 text-center">
        <div>
          <dt className="text-[10px] uppercase tracking-[0.12em] text-[var(--ops-muted)]">Verteilt</dt>
          <dd className="mt-0.5 text-[16px] font-display font-semibold text-[var(--ops-text)] tabular-nums">
            {totalAssigned}
          </dd>
        </div>
        <div>
          <dt className="text-[10px] uppercase tracking-[0.12em] text-[var(--ops-muted)]">Conv.</dt>
          <dd className="mt-0.5 text-[16px] font-display font-semibold text-[var(--ops-cyan)] tabular-nums">
            {Math.round(conversionRate * 100)}%
          </dd>
        </div>
        <div>
          <dt className="text-[10px] uppercase tracking-[0.12em] text-[var(--ops-muted)]">Abschl./Mt.</dt>
          <dd className="mt-0.5 text-[16px] font-display font-semibold text-[var(--ops-success)] tabular-nums">
            {closedThisMonth}
          </dd>
        </div>
      </dl>

      {pendingCommission > 0 && (
        <div className="mt-4 pt-3 border-t border-[var(--ops-border)] flex items-center justify-between text-[11.5px]">
          <span className="text-[var(--ops-text-2)]">Offene Provision</span>
          <span className="font-display font-semibold text-[var(--ops-gold)] tabular-nums">
            {pendingCommission.toLocaleString('de-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 })}
          </span>
        </div>
      )}
    </Link>
  );
}
