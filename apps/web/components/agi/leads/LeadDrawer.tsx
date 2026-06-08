import type { Lead, LeadStatus, Partner } from '@elo/core';
import { LeadStatusBadge } from './LeadStatusBadge';
import { LeadScoreBadge } from './LeadScoreBadge';
import { LeadQuickActions } from './LeadQuickActions';
import { leadCategory } from '@/lib/agi/routing';
import {
  updateLeadStatusAction,
  addLeadNoteAction,
  logLeadContactAction,
  assignLeadAction,
  unassignLeadAction,
  autoRouteSingleLeadAction,
  deleteLeadAction,
} from '@/app/actions/leadMutations';
import { reportDealAction } from '@/app/actions/dealMutations';
import { ConfirmSubmit } from '@/components/agi/shared/ConfirmSubmit';

const ALL_STATUSES: LeadStatus[] = [
  'Neu',
  'Zu prüfen',
  'Priorisiert',
  'Heute anrufen',
  'Angerufen',
  'Nicht erreicht',
  'Rückruf geplant',
  'Unterlagen angefordert',
  'Rechnung erhalten',
  'Beratung durchgeführt',
  'Angebot vorbereitet',
  'Angebot gesendet',
  'Abschluss wahrscheinlich',
  'Abgeschlossen',
  'Verloren',
  'Gesperrt',
];

const inputCls =
  'w-full h-10 px-3 rounded-lg bg-white/[0.04] border border-[var(--ops-border)] text-[var(--ops-text)] placeholder:text-[var(--ops-muted)] focus:outline-none focus:border-[rgba(54,230,208,0.45)] focus:ring-2 focus:ring-[rgba(54,230,208,0.15)] text-[13.5px]';

const CAT_LABEL = { strom: 'Strom', gas: 'Gas', solar: 'Photovoltaik', gewerbe: 'Gewerbe' } as const;

interface Props {
  lead: Lead;
  /** Partner-Liste für die Zuweisung (Admin-Sicht). */
  partners: Partner[];
  /** Aktuell zugewiesener Partner (falls vorhanden). */
  assignedPartner: Partner | null;
  /** True = Admin/Sales, darf alles. */
  canAdmin: boolean;
  /** True = Partner-View (eigener Lead), darf Status/Note/Contact/Deal melden. */
  canEdit: boolean;
  redirectTo?: string;
}

function fmtDateTime(iso?: string): string {
  if (!iso) return '—';
  return new Date(iso).toLocaleString('de-DE');
}

export function LeadDrawer({
  lead,
  partners,
  assignedPartner,
  canAdmin,
  canEdit,
  redirectTo,
}: Props) {
  const ret = redirectTo ?? `/admin/leads/${lead.id}`;
  const cat = leadCategory(lead);

  return (
    <div className="space-y-5">
      {/* Header-Card */}
      <section className="ops-elevated p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="flex items-start gap-4">
            <LeadScoreBadge color={lead.leadColor} score={lead.leadScore} size="lg" />
            <div>
              <h2 className="font-display text-[24px] sm:text-[28px] tracking-[-0.015em] text-[var(--ops-text)]">
                {lead.firstName} {lead.lastName}
              </h2>
              <div className="mt-1 text-[13px] text-[var(--ops-text-2)]">
                {lead.postalCode} {lead.city ?? ''} · {CAT_LABEL[cat]}
                {lead.isDemo && (
                  <span className="ml-2 ops-pill" data-tone="gold">
                    Demo
                  </span>
                )}
              </div>
              <div className="mt-3 flex items-center gap-2 flex-wrap">
                <LeadStatusBadge status={lead.status} />
                {assignedPartner ? (
                  <span className="ops-pill" data-tone="blue">
                    Partner: {assignedPartner.name}
                  </span>
                ) : (
                  <span className="ops-pill" data-tone="warning">
                    Unverteilt
                  </span>
                )}
                <span className="ops-pill">Eingang: {fmtDateTime(lead.createdAt)}</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end gap-3">
            <LeadQuickActions lead={lead} />
            {canAdmin && (
              <form action={deleteLeadAction} className="inline-block">
                <input type="hidden" name="leadId" value={lead.id} />
                <input type="hidden" name="redirectTo" value="/admin/leads" />
                <ConfirmSubmit
                  message="Lead wirklich löschen? Das ist nicht rückgängig."
                  className="text-[11.5px] text-[var(--ops-muted)] hover:text-[var(--ops-critical)] underline-offset-2 hover:underline"
                >
                  Lead löschen
                </ConfirmSubmit>
              </form>
            )}
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,360px)] gap-5">
        {/* Spalte 1: Kontakt + Profil + Score */}
        <div className="space-y-5">
          <section className="ops-card p-5">
            <h3 className="font-display text-[16px] text-[var(--ops-text)]">Kontakt</h3>
            <dl className="mt-3 grid grid-cols-3 gap-y-2 text-[13px]">
              <dt className="text-[var(--ops-text-2)]">Telefon</dt>
              <dd className="col-span-2">
                {lead.phone ? (
                  <a href={`tel:${lead.phone}`} className="text-[var(--ops-cyan)] hover:underline">
                    {lead.phone}
                  </a>
                ) : (
                  '—'
                )}
              </dd>
              <dt className="text-[var(--ops-text-2)]">E-Mail</dt>
              <dd className="col-span-2 break-all">
                {lead.email ? (
                  <a href={`mailto:${lead.email}`} className="text-[var(--ops-cyan)] hover:underline">
                    {lead.email}
                  </a>
                ) : (
                  '—'
                )}
              </dd>
              <dt className="text-[var(--ops-text-2)]">PLZ / Ort</dt>
              <dd className="col-span-2">{lead.postalCode} {lead.city ?? ''}</dd>
              <dt className="text-[var(--ops-text-2)]">Wunsch</dt>
              <dd className="col-span-2">
                {lead.contactPreference === 'phone'
                  ? 'Telefon'
                  : lead.contactPreference === 'whatsapp'
                    ? 'WhatsApp'
                    : lead.contactPreference === 'email'
                      ? 'E-Mail'
                      : '—'}
              </dd>
            </dl>
          </section>

          <section className="ops-card p-5">
            <h3 className="font-display text-[16px] text-[var(--ops-text)]">Profil</h3>
            <dl className="mt-3 grid grid-cols-3 gap-y-2 text-[13px]">
              <dt className="text-[var(--ops-text-2)]">Typ</dt>
              <dd className="col-span-2 capitalize">{lead.customerType.replace('_', ' ')}</dd>
              <dt className="text-[var(--ops-text-2)]">Interesse</dt>
              <dd className="col-span-2">{lead.interests.join(', ')}</dd>
              <dt className="text-[var(--ops-text-2)]">Dringlichkeit</dt>
              <dd className="col-span-2">{lead.urgency}</dd>
              <dt className="text-[var(--ops-text-2)]">Kosten/Monat</dt>
              <dd className="col-span-2">{lead.monthlyEnergyCosts}</dd>
              {lead.annualConsumptionKwh != null && (
                <>
                  <dt className="text-[var(--ops-text-2)]">Jahresverbrauch</dt>
                  <dd className="col-span-2">{lead.annualConsumptionKwh.toLocaleString('de-DE')} kWh</dd>
                </>
              )}
              <dt className="text-[var(--ops-text-2)]">Rechnung</dt>
              <dd className="col-span-2">{lead.hasInvoice}</dd>
            </dl>
          </section>

          <section className="ops-card p-5">
            <h3 className="font-display text-[16px] text-[var(--ops-text)]">Score-Begründung</h3>
            <ul className="mt-3 divide-y divide-[var(--ops-border)] text-[13px]">
              {lead.scoreReasons.map((r) => (
                <li key={r.code} className="py-2 flex items-center gap-3">
                  <span className="font-mono text-[11.5px] text-[var(--ops-muted)] w-24 truncate">{r.code}</span>
                  <span className="flex-1 text-[var(--ops-text-2)]">{r.label}</span>
                  <span
                    className={`tabular-nums font-semibold ${r.delta >= 0 ? 'text-[var(--ops-cyan)]' : 'text-[var(--ops-critical)]'}`}
                  >
                    {r.delta >= 0 ? `+${r.delta}` : r.delta}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Spalte 2: Aktionen + Notizen + Kontaktverlauf */}
        <div className="space-y-5">
          <section className="ops-card p-5">
            <h3 className="font-display text-[16px] text-[var(--ops-text)]">Empfohlene Aktion</h3>
            <p className="mt-2 text-[14px] text-[var(--ops-text-2)] leading-relaxed">
              {lead.recommendedAction}
            </p>
            {lead.message && (
              <div className="mt-4 pt-4 border-t border-[var(--ops-border)]">
                <div className="text-[11.5px] uppercase tracking-[0.14em] text-[var(--ops-muted)]">
                  Nachricht des Kunden
                </div>
                <p className="mt-1 text-[13.5px] text-[var(--ops-text-2)] whitespace-pre-line leading-relaxed">
                  {lead.message}
                </p>
              </div>
            )}
          </section>

          {canEdit && (
            <section className="ops-card p-5">
              <h3 className="font-display text-[16px] text-[var(--ops-text)]">Status ändern</h3>
              <form action={updateLeadStatusAction} className="mt-3 flex flex-wrap items-center gap-2">
                <input type="hidden" name="leadId" value={lead.id} />
                <input type="hidden" name="redirectTo" value={ret} />
                <select name="status" defaultValue={lead.status} className={`${inputCls} max-w-[260px]`}>
                  {ALL_STATUSES.map((s) => (
                    <option key={s} value={s} className="bg-[var(--ops-card)]">
                      {s}
                    </option>
                  ))}
                </select>
                <button type="submit" className="ops-cta h-10 px-4 rounded-lg">
                  Übernehmen
                </button>
              </form>
            </section>
          )}

          {canEdit && (
            <section className="ops-card p-5">
              <h3 className="font-display text-[16px] text-[var(--ops-text)]">Kontakt loggen</h3>
              <form action={logLeadContactAction} className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
                <input type="hidden" name="leadId" value={lead.id} />
                <input type="hidden" name="redirectTo" value={ret} />
                <select name="type" defaultValue="call" className={inputCls}>
                  <option value="call" className="bg-[var(--ops-card)]">Anruf</option>
                  <option value="whatsapp" className="bg-[var(--ops-card)]">WhatsApp</option>
                  <option value="email" className="bg-[var(--ops-card)]">E-Mail</option>
                  <option value="meeting" className="bg-[var(--ops-card)]">Termin</option>
                  <option value="offer" className="bg-[var(--ops-card)]">Angebot</option>
                  <option value="note" className="bg-[var(--ops-card)]">Notiz</option>
                </select>
                <select name="result" defaultValue="reached" className={inputCls}>
                  <option value="reached" className="bg-[var(--ops-card)]">erreicht</option>
                  <option value="not_reached" className="bg-[var(--ops-card)]">nicht erreicht</option>
                  <option value="callback" className="bg-[var(--ops-card)]">Rückruf vereinbart</option>
                  <option value="interested" className="bg-[var(--ops-card)]">interessiert</option>
                  <option value="not_interested" className="bg-[var(--ops-card)]">nicht interessiert</option>
                  <option value="closed" className="bg-[var(--ops-card)]">abgeschlossen</option>
                  <option value="lost" className="bg-[var(--ops-card)]">verloren</option>
                </select>
                <input
                  name="text"
                  placeholder="Optionale Notiz zum Kontakt …"
                  className={`${inputCls} sm:col-span-2`}
                />
                <button type="submit" className="ops-cta h-10 px-4 rounded-lg sm:col-span-2">
                  Kontakt speichern
                </button>
              </form>
            </section>
          )}

          {canEdit && (
            <section className="ops-card p-5">
              <h3 className="font-display text-[16px] text-[var(--ops-text)]">Notiz hinzufügen</h3>
              <form action={addLeadNoteAction} className="mt-3 space-y-2">
                <input type="hidden" name="leadId" value={lead.id} />
                <input type="hidden" name="redirectTo" value={ret} />
                <textarea
                  name="text"
                  required
                  rows={3}
                  placeholder="Was wichtig ist …"
                  className={`${inputCls} h-auto py-2.5 leading-snug resize-none`}
                />
                <button type="submit" className="ops-cta h-10 px-4 rounded-lg">
                  Notiz speichern
                </button>
              </form>
              {lead.notes.length > 0 && (
                <ul className="mt-4 space-y-2">
                  {lead.notes.map((n) => (
                    <li key={n.id} className="text-[12.5px] text-[var(--ops-text-2)] border-l-2 border-[rgba(54,230,208,0.32)] pl-3">
                      <span className="text-[var(--ops-text)]">{n.author}</span> ·{' '}
                      <span className="text-[var(--ops-muted)]">{fmtDateTime(n.createdAt)}</span>
                      <p className="mt-0.5 text-[var(--ops-text-2)] whitespace-pre-line">{n.text}</p>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          )}

          {canEdit && lead.assignedPartnerId && (
            <section className="ops-card p-5 border-[rgba(54,230,208,0.32)]">
              <h3 className="font-display text-[16px] text-[var(--ops-text)]">Abschluss melden</h3>
              <form action={reportDealAction} className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
                <input type="hidden" name="leadId" value={lead.id} />
                <input type="hidden" name="redirectTo" value={ret} />
                <select name="product" defaultValue={cat === 'solar' ? 'photovoltaik' : cat} className={inputCls}>
                  <option value="strom" className="bg-[var(--ops-card)]">Strom</option>
                  <option value="gas" className="bg-[var(--ops-card)]">Gas</option>
                  <option value="strom_gas" className="bg-[var(--ops-card)]">Strom + Gas</option>
                  <option value="photovoltaik" className="bg-[var(--ops-card)]">Photovoltaik</option>
                  <option value="gewerbe" className="bg-[var(--ops-card)]">Gewerbe</option>
                  <option value="other" className="bg-[var(--ops-card)]">Sonstiges</option>
                </select>
                <input
                  name="productLabel"
                  placeholder="Tarif/Paket (optional)"
                  className={inputCls}
                />
                <input
                  name="value"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="Vertragswert €"
                  className={inputCls}
                />
                <input
                  name="expectedCommission"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="Erwartete Provision €"
                  className={inputCls}
                />
                <textarea
                  name="notes"
                  rows={2}
                  placeholder="Notizen zum Abschluss …"
                  className={`${inputCls} h-auto py-2.5 leading-snug resize-none sm:col-span-2`}
                />
                <button type="submit" className="ops-cta h-10 px-4 rounded-lg sm:col-span-2">
                  Abschluss melden
                </button>
              </form>
            </section>
          )}
        </div>

        {/* Spalte 3: Verteilung + Activity */}
        <aside className="space-y-5">
          {canAdmin && (
            <section className="ops-card p-5">
              <h3 className="font-display text-[16px] text-[var(--ops-text)]">Verteilung</h3>
              {assignedPartner ? (
                <div className="mt-3 space-y-3">
                  <div className="text-[13px] text-[var(--ops-text-2)]">
                    Aktuell:{' '}
                    <a
                      href={`/admin/vertriebspartner/${assignedPartner.id}`}
                      className="text-[var(--ops-cyan)] hover:underline"
                    >
                      {assignedPartner.name}
                    </a>
                  </div>
                  <div className="text-[11.5px] text-[var(--ops-muted)]">
                    Zugewiesen {fmtDateTime(lead.assignedAt)}
                  </div>
                  <form action={unassignLeadAction}>
                    <input type="hidden" name="leadId" value={lead.id} />
                    <input type="hidden" name="redirectTo" value={ret} />
                    <button className="ops-cta-ghost w-full h-9 rounded-lg">
                      Zuweisung aufheben
                    </button>
                  </form>
                </div>
              ) : (
                <div className="mt-3 space-y-3">
                  <p className="text-[12.5px] text-[var(--ops-text-2)]">
                    Wähle einen Partner oder lass das System routen.
                  </p>
                  <form action={assignLeadAction} className="space-y-2">
                    <input type="hidden" name="leadId" value={lead.id} />
                    <input type="hidden" name="redirectTo" value={ret} />
                    <select name="partnerId" required className={inputCls}>
                      <option value="" className="bg-[var(--ops-card)]">— Partner wählen —</option>
                      {partners.map((p) => (
                        <option key={p.id} value={p.id} className="bg-[var(--ops-card)]">
                          {p.name}
                          {p.status !== 'active' ? ` (${p.status})` : ''}
                        </option>
                      ))}
                    </select>
                    <button type="submit" className="ops-cta w-full h-10 rounded-lg">
                      Zuweisen
                    </button>
                  </form>
                  <form action={autoRouteSingleLeadAction}>
                    <input type="hidden" name="leadId" value={lead.id} />
                    <input type="hidden" name="redirectTo" value={ret} />
                    <button className="ops-cta-ghost w-full h-9 rounded-lg">
                      ⚡ Auto-Route
                    </button>
                  </form>
                </div>
              )}
            </section>
          )}

          <section className="ops-card p-5">
            <h3 className="font-display text-[16px] text-[var(--ops-text)]">Activity</h3>
            {lead.contactHistory.length === 0 && lead.notes.length === 0 ? (
              <p className="mt-2 text-[13px] text-[var(--ops-muted)]">Noch keine Einträge.</p>
            ) : (
              <ul className="mt-3 space-y-2.5 text-[12.5px]">
                {lead.contactHistory.slice(0, 8).map((c) => (
                  <li key={c.id} className="flex gap-3">
                    <span className="ops-pill" data-tone="blue">
                      {c.type}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="text-[var(--ops-text)]">{c.result}</div>
                      <div className="text-[var(--ops-muted)]">{fmtDateTime(c.createdAt)}</div>
                      {c.text && <div className="mt-0.5 text-[var(--ops-text-2)] truncate">{c.text}</div>}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>

          {lead.files.length > 0 && (
            <section className="ops-card p-5">
              <h3 className="font-display text-[16px] text-[var(--ops-text)]">Unterlagen</h3>
              <ul className="mt-3 space-y-2 text-[13px]">
                {lead.files.map((f) => (
                  <li key={f.id} className="flex items-center gap-2 text-[var(--ops-text-2)]">
                    <span aria-hidden className="size-1.5 rounded-full bg-[var(--ops-cyan)]" />
                    <span className="flex-1 truncate">{f.fileName}</span>
                    <span className="ops-pill">{f.category}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </aside>
      </div>
    </div>
  );
}
