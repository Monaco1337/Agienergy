'use client';

import { useMemo, useRef, useState, useTransition } from 'react';
import Link from 'next/link';
import type { Lead, Partner } from '@elo/core';
import { assignLeadAction, autoRouteSingleLeadAction, autoRouteUnassignedAction } from '@/app/actions/leadMutations';
import { LeadStatusBadge } from '@/components/agi/leads/LeadStatusBadge';
import { LeadScoreBadge } from '@/components/agi/leads/LeadScoreBadge';
import { computePartnerLoad, leadCategory, pickPartnerForLead } from '@/lib/agi/routing';

const CAT_LABEL = { strom: 'Strom', gas: 'Gas', solar: 'PV', gewerbe: 'Gewerbe' } as const;

interface Props {
  unassigned: Lead[];
  partners: Partner[];
  /** Alle Leads (für Auslastungs-Berechnung). */
  allLeads: Lead[];
}

function timeAgo(iso: string): string {
  const ms = Date.now() - new Date(iso).getTime();
  const m = Math.floor(ms / 60_000);
  if (m < 1) return 'jetzt';
  if (m < 60) return `vor ${m} Min`;
  const h = Math.floor(m / 60);
  if (h < 24) return `vor ${h} Std`;
  const d = Math.floor(h / 24);
  return `vor ${d} T.`;
}

export function DistributionCenter({ unassigned, partners, allLeads }: Props) {
  const load = useMemo(() => computePartnerLoad(partners, allLeads), [partners, allLeads]);
  const loadById = useMemo(() => new Map(load.map((l) => [l.partner.id, l] as const)), [load]);

  const [selectedLeadId, setSelectedLeadId] = useState<string | null>(unassigned[0]?.id ?? null);
  const [draggingLeadId, setDraggingLeadId] = useState<string | null>(null);
  const [dragOverPartner, setDragOverPartner] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);

  const selectedLead = unassigned.find((l) => l.id === selectedLeadId) ?? unassigned[0] ?? null;
  const decision =
    selectedLead != null
      ? pickPartnerForLead(selectedLead, partners, load)
      : null;

  function submitAssign(leadId: string, partnerId: string) {
    const fd = new FormData();
    fd.set('leadId', leadId);
    fd.set('partnerId', partnerId);
    startTransition(() => {
      void assignLeadAction(fd);
    });
  }

  function submitAutoSingle(leadId: string) {
    const fd = new FormData();
    fd.set('leadId', leadId);
    startTransition(() => {
      void autoRouteSingleLeadAction(fd);
    });
  }

  function submitAutoAll() {
    const fd = new FormData();
    startTransition(() => {
      void autoRouteUnassignedAction(fd);
    });
  }

  return (
    <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,360px)_minmax(0,1fr)_minmax(0,360px)] gap-5">
      {/* Linke Spalte: Unverteilte Leads */}
      <section className="ops-card p-4 flex flex-col min-h-[420px]">
        <header className="flex items-center justify-between gap-3 pb-3 border-b border-[var(--ops-border)]">
          <div>
            <div className="text-[10.5px] uppercase tracking-[0.16em] text-[var(--ops-muted)]">Eingang</div>
            <h2 className="text-[16px] font-display font-semibold text-[var(--ops-text)]">
              Unverteilt <span className="text-[var(--ops-cyan)] tabular-nums">{unassigned.length}</span>
            </h2>
          </div>
          <button
            type="button"
            onClick={submitAutoAll}
            disabled={pending || unassigned.length === 0}
            className="ops-cta disabled:opacity-50 disabled:cursor-not-allowed"
            title="Alle Leads auto-verteilen"
          >
            <span aria-hidden>⚡</span> Auto-Verteilen
          </button>
        </header>
        <div className="mt-3 -mr-1 pr-1 overflow-y-auto flex-1 max-h-[70vh]">
          {unassigned.length === 0 && (
            <div className="text-[13px] text-[var(--ops-text-2)] py-10 text-center">
              Keine unverteilten Leads.
            </div>
          )}
          <ul className="space-y-2">
            {unassigned.map((lead) => {
              const cat = leadCategory(lead);
              const active = lead.id === selectedLeadId;
              return (
                <li key={lead.id}>
                  <article
                    className={`ops-card ops-card-hover ops-draggable cursor-pointer p-3 ${active ? 'ring-1 ring-[rgba(54,230,208,0.5)]' : ''}`}
                    draggable
                    onDragStart={(e) => {
                      setDraggingLeadId(lead.id);
                      e.dataTransfer.setData('text/lead-id', lead.id);
                      e.dataTransfer.effectAllowed = 'move';
                    }}
                    onDragEnd={() => {
                      setDraggingLeadId(null);
                      setDragOverPartner(null);
                    }}
                    onClick={() => setSelectedLeadId(lead.id)}
                    data-dragging={draggingLeadId === lead.id ? 'true' : 'false'}
                  >
                    <div className="flex items-start gap-3">
                      <LeadScoreBadge color={lead.leadColor} score={lead.leadScore} size="sm" />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <div className="text-[13.5px] font-semibold text-[var(--ops-text)] truncate">
                              {lead.firstName} {lead.lastName}
                            </div>
                            <div className="mt-0.5 text-[11.5px] text-[var(--ops-text-2)] truncate">
                              {lead.postalCode} {lead.city ?? ''} · {CAT_LABEL[cat]}
                            </div>
                          </div>
                          <span className="text-[10.5px] uppercase tracking-[0.1em] text-[var(--ops-muted)] whitespace-nowrap">
                            {timeAgo(lead.createdAt)}
                          </span>
                        </div>
                        <div className="mt-2 flex items-center gap-2 flex-wrap">
                          <LeadStatusBadge status={lead.status} />
                          {lead.phone && (
                            <span className="text-[11px] text-[var(--ops-text-2)] truncate">{lead.phone}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </article>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Mitte: Vertriebspartner mit Drop-Zonen */}
      <section className="ops-card p-4 flex flex-col">
        <header className="flex items-center justify-between gap-3 pb-3 border-b border-[var(--ops-border)]">
          <div>
            <div className="text-[10.5px] uppercase tracking-[0.16em] text-[var(--ops-muted)]">Partner</div>
            <h2 className="text-[16px] font-display font-semibold text-[var(--ops-text)]">
              Kapazität & Drop-Zonen
            </h2>
          </div>
          <Link
            href="/admin/vertriebspartner"
            className="text-[12px] text-[var(--ops-text-2)] hover:text-[var(--ops-cyan)]"
          >
            Verwalten →
          </Link>
        </header>

        <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {partners.length === 0 && (
            <div className="col-span-full text-[13px] text-[var(--ops-text-2)] py-10 text-center">
              Noch keine Vertriebspartner. {' '}
              <Link href="/admin/vertriebspartner" className="text-[var(--ops-cyan)] hover:underline">
                Jetzt anlegen
              </Link>
              .
            </div>
          )}
          {partners.map((p) => {
            const lp = loadById.get(p.id);
            const free = Math.max(0, p.capacity - (lp?.activeLeads ?? 0));
            const utilization = lp?.utilization ?? 0;
            const isFull = lp?.activeLeads != null && lp.activeLeads >= p.capacity;
            const tone = p.status !== 'active' ? 'warning' : isFull ? 'critical' : 'cyan';
            const isOver = dragOverPartner === p.id;
            return (
              <article
                key={p.id}
                className="ops-dropzone p-4"
                data-over={isOver ? 'true' : 'false'}
                onDragOver={(e) => {
                  e.preventDefault();
                  e.dataTransfer.dropEffect = 'move';
                  if (dragOverPartner !== p.id) setDragOverPartner(p.id);
                }}
                onDragLeave={() => {
                  if (dragOverPartner === p.id) setDragOverPartner(null);
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  const leadId = e.dataTransfer.getData('text/lead-id') || draggingLeadId;
                  setDragOverPartner(null);
                  setDraggingLeadId(null);
                  if (!leadId) return;
                  if (p.status !== 'active' || isFull) return;
                  submitAssign(leadId, p.id);
                }}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <div className="text-[14.5px] font-display font-semibold text-[var(--ops-text)] truncate">
                      {p.name}
                    </div>
                    <div className="mt-0.5 text-[11.5px] text-[var(--ops-text-2)] truncate">
                      {p.regionLabel || p.regionPrefixes.join(', ') || 'Bundesweit'} ·{' '}
                      {p.specialties.length > 0 ? p.specialties.join(' / ') : 'allg.'}
                    </div>
                  </div>
                  <span className="ops-pill" data-tone={tone}>
                    {p.status === 'active' ? (isFull ? 'Voll' : 'Aktiv') : p.status}
                  </span>
                </div>

                <div className="mt-4">
                  <div className="flex items-baseline justify-between text-[11px] text-[var(--ops-text-2)]">
                    <span>
                      <span className="font-semibold text-[var(--ops-text)] tabular-nums">
                        {lp?.activeLeads ?? 0}
                      </span>{' '}
                      / {p.capacity}
                    </span>
                    <span>
                      Frei:{' '}
                      <span className="tabular-nums text-[var(--ops-text)]">{free}</span>
                    </span>
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

                {selectedLead && (
                  <button
                    type="button"
                    disabled={pending || p.status !== 'active' || isFull}
                    onClick={() => submitAssign(selectedLead.id, p.id)}
                    className="mt-4 w-full ops-cta-ghost h-9 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    title={`„${selectedLead.firstName} ${selectedLead.lastName}" zuweisen`}
                  >
                    Zuweisen
                  </button>
                )}
              </article>
            );
          })}
        </div>

        {/* Hidden form for native action posts (fallback) */}
        <form ref={formRef} action={assignLeadAction} className="hidden">
          <input type="hidden" name="leadId" />
          <input type="hidden" name="partnerId" />
        </form>
      </section>

      {/* Rechte Spalte: Auto-Routing-Empfehlung für ausgewählten Lead */}
      <aside className="ops-card p-4 flex flex-col min-h-[420px]">
        <header className="pb-3 border-b border-[var(--ops-border)]">
          <div className="text-[10.5px] uppercase tracking-[0.16em] text-[var(--ops-muted)]">Auto-Routing</div>
          <h2 className="text-[16px] font-display font-semibold text-[var(--ops-text)]">
            Empfehlung
          </h2>
        </header>
        {!selectedLead && (
          <p className="mt-4 text-[13px] text-[var(--ops-text-2)]">
            Wähle links einen Lead aus, um die Empfehlung zu sehen.
          </p>
        )}
        {selectedLead && decision && (
          <div className="mt-4 flex flex-col gap-4 flex-1">
            <div className="ops-elevated p-4">
              <div className="text-[11px] uppercase tracking-[0.14em] text-[var(--ops-muted)]">Lead</div>
              <div className="mt-1 text-[14.5px] font-display font-semibold text-[var(--ops-text)]">
                {selectedLead.firstName} {selectedLead.lastName}
              </div>
              <div className="mt-1 text-[12px] text-[var(--ops-text-2)]">
                {selectedLead.postalCode} {selectedLead.city ?? ''} ·{' '}
                {CAT_LABEL[leadCategory(selectedLead)]}
              </div>
              <div className="mt-3 flex items-center gap-2 flex-wrap">
                <LeadStatusBadge status={selectedLead.status} />
                <LeadScoreBadge color={selectedLead.leadColor} score={selectedLead.leadScore} size="sm" />
              </div>
            </div>

            {decision.partnerId ? (
              <div className="ops-card p-4 border-[rgba(54,230,208,0.32)]">
                <div className="text-[11px] uppercase tracking-[0.14em] text-[var(--ops-cyan)]">Top-Empfehlung</div>
                {decision.candidates.slice(0, 1).map((c) => (
                  <div key={c.partner.id} className="mt-1.5">
                    <div className="text-[14.5px] font-display font-semibold text-[var(--ops-text)]">
                      {c.partner.name}
                    </div>
                    <div className="mt-1 text-[12px] text-[var(--ops-text-2)]">
                      Score {c.score} · Auslastung {Math.round(c.utilization * 100)}%
                    </div>
                    <ul className="mt-2 text-[11.5px] text-[var(--ops-text-2)] space-y-0.5">
                      {decision.reasons.map((r) => (
                        <li key={r}>· {r}</li>
                      ))}
                    </ul>
                    <button
                      type="button"
                      onClick={() => submitAutoSingle(selectedLead.id)}
                      disabled={pending}
                      className="mt-3 w-full ops-cta disabled:opacity-50"
                    >
                      ⚡ Auto an {c.partner.name}
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="ops-card p-4 border-[rgba(245,158,11,0.32)]">
                <div className="text-[12px] text-[var(--ops-warning)]">
                  Kein passender Partner mit Kapazität gefunden.
                </div>
              </div>
            )}

            {decision.candidates.length > 1 && (
              <div className="ops-card p-4">
                <div className="text-[11px] uppercase tracking-[0.14em] text-[var(--ops-muted)]">Alternativen</div>
                <ul className="mt-2 space-y-2">
                  {decision.candidates.slice(1, 4).map((c) => (
                    <li key={c.partner.id} className="flex items-center justify-between gap-2">
                      <div className="min-w-0">
                        <div className="text-[13px] text-[var(--ops-text)] truncate">{c.partner.name}</div>
                        <div className="text-[11px] text-[var(--ops-muted)]">
                          Score {c.score} · {Math.round(c.utilization * 100)}%
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => submitAssign(selectedLead.id, c.partner.id)}
                        disabled={pending}
                        className="ops-cta-ghost h-8 px-3 rounded-lg disabled:opacity-50 text-[11.5px]"
                      >
                        Zuweisen
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </aside>
    </div>
  );
}
