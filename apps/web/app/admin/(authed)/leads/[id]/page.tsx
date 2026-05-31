import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getStorage } from '@elo/storage';
import type { LeadId } from '@elo/core';
import { LeadColorBadge } from '@/components/admin/LeadColorBadge';
import { PrintButton } from '@/components/admin/PrintButton';
import { Badge } from '@elo/ui';

export const dynamic = 'force-dynamic';

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

const URGENCY_LABEL: Record<string, string> = {
  immediate: 'Sofort',
  weeks: 'In Wochen',
  information: 'Information',
  unknown: '—',
};

const COSTS_LABEL: Record<string, string> = {
  under_100: 'unter 100 €',
  '100_200': '100–200 €',
  '200_400': '200–400 €',
  over_400: 'über 400 €',
  unknown: '—',
};

const PREF_LABEL: Record<string, string> = {
  phone: 'Telefon',
  whatsapp: 'WhatsApp',
  email: 'E-Mail',
};

export default async function LeadDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const storage = getStorage();
  const lead = await storage.getLead(id as LeadId);
  if (!lead) notFound();

  const tel = lead.phone?.replace(/\s/g, '');

  return (
    <div className="space-y-7 max-w-5xl">
      {lead.isDemo && (
        <div className="no-print rounded-elo border border-gold/40 bg-gold/[0.08] px-4 py-2.5 flex items-center gap-3">
          <span aria-hidden className="size-2 rounded-full bg-gold" />
          <span className="text-[13px] text-gold2 font-semibold uppercase tracking-[0.12em]">
            Demo-Lead
          </span>
          <span className="text-[13px] text-ink2">
            Dieser Datensatz ist ein Beispiel-Lead und nicht real.
          </span>
        </div>
      )}

      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <Link href="/admin/leads" className="text-[13px] text-sage font-medium no-print inline-flex items-center gap-1">
            <span aria-hidden>←</span> Alle Leads
          </Link>
          <h1 className="mt-2 font-display text-[30px] tracking-[-0.015em] text-ink">
            {lead.firstName} {lead.lastName}
          </h1>
          <div className="mt-2.5 flex gap-2 items-center flex-wrap">
            <LeadColorBadge color={lead.leadColor} />
            <Badge tone="neutral" className="tabular-nums">Score {lead.leadScore}</Badge>
            <Badge tone="sage">{lead.status}</Badge>
            <span className="text-[12.5px] text-muted">
              Eingegangen {new Date(lead.createdAt).toLocaleString('de-DE')}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2 no-print">
          {tel && (
            <a
              href={`tel:${tel}`}
              className="inline-flex items-center gap-2 h-10 px-4 rounded-elo bg-sage text-paper text-[14px] font-semibold hover:bg-sage2 transition-colors"
            >
              <svg width="15" height="15" viewBox="0 0 20 20" fill="none" aria-hidden stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round">
                <path d="M4.5 3h3l1.2 3.2-1.7 1.3a10 10 0 004.5 4.5l1.3-1.7L16.5 14v3a1 1 0 01-1.1 1A13 13 0 013.5 4.1 1 1 0 014.5 3z" />
              </svg>
              Anrufen
            </a>
          )}
          {lead.email && (
            <a
              href={`mailto:${lead.email}`}
              className="inline-flex items-center h-10 px-4 rounded-elo border border-line bg-card text-[14px] font-medium text-ink hover:border-lineStrong hover:bg-paper2/60 transition-colors"
            >
              E-Mail
            </a>
          )}
          <PrintButton />
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 space-y-5">
          <section className="print-card bg-card border border-line rounded-eloLg p-6 shadow-eloSm">
            <h2 className="font-display text-[18px] text-ink">Empfohlene Aktion</h2>
            <p className="mt-2 text-[15px] text-ink2 leading-relaxed">{lead.recommendedAction}</p>
            <div className="mt-3 text-[13px] text-muted">{lead.leadLabel}</div>
          </section>

          {lead.message && (
            <section className="print-card bg-card border border-line rounded-eloLg p-6 shadow-eloSm">
              <h2 className="font-display text-[18px] text-ink">Nachricht des Kunden</h2>
              <p className="mt-2 text-[15px] text-ink2 leading-relaxed whitespace-pre-line">{lead.message}</p>
            </section>
          )}

          <section className="print-card bg-card border border-line rounded-eloLg p-6 shadow-eloSm">
            <h2 className="font-display text-[18px] text-ink">Score-Begründung</h2>
            <ul className="mt-3 divide-y divide-line">
              {lead.scoreReasons.map((r) => (
                <li key={r.code} className="py-2.5 flex items-center gap-3 text-[14px]">
                  <span className="font-mono text-[12px] text-muted w-32 truncate">{r.code}</span>
                  <span className="flex-1">{r.label}</span>
                  <span className={r.delta >= 0 ? 'text-sage font-semibold tabular-nums' : 'text-leadRed font-semibold tabular-nums'}>
                    {r.delta >= 0 ? `+${r.delta}` : r.delta}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          {lead.files.length > 0 && (
            <section className="print-card bg-card border border-line rounded-eloLg p-6 shadow-eloSm">
              <h2 className="font-display text-[18px] text-ink">Unterlagen</h2>
              <ul className="mt-3 space-y-2">
                {lead.files.map((f) => (
                  <li key={f.id} className="flex items-center gap-3 text-[14px] text-ink2">
                    <span aria-hidden className="size-2 rounded-full bg-sage" />
                    <span className="flex-1 truncate">{f.fileName}</span>
                    <span className="text-[12px] text-muted">{f.category}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section className="print-card bg-card border border-line rounded-eloLg p-6 shadow-eloSm">
            <h2 className="font-display text-[18px] text-ink">Kontaktverlauf</h2>
            {lead.contactHistory.length === 0 ? (
              <p className="mt-2 text-[14px] text-muted">Noch keine Einträge.</p>
            ) : (
              <ul className="mt-3 space-y-2">
                {lead.contactHistory.map((c) => (
                  <li key={c.id} className="text-[14px] text-ink2">
                    <span className="font-medium text-ink">{c.type}</span> ·{' '}
                    {new Date(c.createdAt).toLocaleString('de-DE')} · {c.text}
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>

        <aside className="space-y-5">
          <section className="print-card bg-card border border-line rounded-eloLg p-6 shadow-eloSm">
            <h2 className="font-display text-[18px] text-ink">Kontakt</h2>
            <dl className="mt-3 grid grid-cols-3 gap-y-2.5 text-[14px]">
              <dt className="text-muted">Telefon</dt>
              <dd className="col-span-2">
                {tel ? (
                  <a href={`tel:${tel}`} className="text-sage font-medium hover:text-sage2">
                    {lead.phone}
                  </a>
                ) : (
                  '—'
                )}
              </dd>
              <dt className="text-muted">E-Mail</dt>
              <dd className="col-span-2 break-all">
                {lead.email ? (
                  <a href={`mailto:${lead.email}`} className="text-sage font-medium hover:text-sage2">
                    {lead.email}
                  </a>
                ) : (
                  '—'
                )}
              </dd>
              <dt className="text-muted">PLZ / Ort</dt>
              <dd className="col-span-2">{lead.postalCode} {lead.city ?? ''}</dd>
              <dt className="text-muted">Wunsch</dt>
              <dd className="col-span-2">{lead.contactPreference ? PREF_LABEL[lead.contactPreference] : '—'}</dd>
            </dl>
          </section>

          <section className="print-card bg-card border border-line rounded-eloLg p-6 shadow-eloSm">
            <h2 className="font-display text-[18px] text-ink">Profil</h2>
            <dl className="mt-3 grid grid-cols-3 gap-y-2.5 text-[14px]">
              <dt className="text-muted">Typ</dt>
              <dd className="col-span-2">{TYPE_LABEL[lead.customerType] ?? lead.customerType}</dd>
              <dt className="text-muted">Interessen</dt>
              <dd className="col-span-2">{lead.interests.map((i) => INTEREST_LABEL[i] ?? i).join(', ')}</dd>
              <dt className="text-muted">Dringlichkeit</dt>
              <dd className="col-span-2">{URGENCY_LABEL[lead.urgency] ?? lead.urgency}</dd>
              <dt className="text-muted">Kosten / Monat</dt>
              <dd className="col-span-2">{COSTS_LABEL[lead.monthlyEnergyCosts] ?? lead.monthlyEnergyCosts}</dd>
              <dt className="text-muted">Rechnung</dt>
              <dd className="col-span-2">{lead.hasInvoice === 'upload_now' ? 'Hochgeladen' : lead.hasInvoice === 'later' ? 'Wird nachgereicht' : lead.hasInvoice === 'no' ? 'Nein' : '—'}</dd>
            </dl>
          </section>

          <section className="print-card bg-card border border-line rounded-eloLg p-6 shadow-eloSm">
            <h2 className="font-display text-[18px] text-ink">Consent</h2>
            <dl className="mt-3 grid grid-cols-3 gap-y-2.5 text-[14px]">
              <dt className="text-muted">Grundlage</dt>
              <dd className="col-span-2">{lead.legalBasis}</dd>
              <dt className="text-muted">Version</dt>
              <dd className="col-span-2">{lead.consent?.consentTextVersion ?? '—'}</dd>
              <dt className="text-muted">Zeitpunkt</dt>
              <dd className="col-span-2">
                {lead.consent?.consentTimestamp
                  ? new Date(lead.consent.consentTimestamp).toLocaleString('de-DE')
                  : '—'}
              </dd>
            </dl>
          </section>
        </aside>
      </div>
    </div>
  );
}
