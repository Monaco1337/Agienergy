import { hasIncompleteCompanyInfo } from '@/data/companyInfo';

/**
 * Rotes Hinweis-Banner, das auf Impressum/Datenschutz/AGB/Widerruf sichtbar wird,
 * wenn in `apps/web/data/companyInfo.ts` noch Platzhalter stehen. Damit der
 * Inhaber das vor Live-Schaltung definitiv sieht.
 *
 * Wird in Production NICHT versteckt - bewusst: lieber peinliches Banner als
 * Abmahnung.
 */
export function MissingDataWarning() {
  if (!hasIncompleteCompanyInfo()) return null;
  return (
    <div className="rounded-elo border-2 border-red-300 bg-red-50 p-5 mb-8">
      <p className="text-[13px] font-semibold uppercase tracking-[0.16em] text-red-800">
        Hinweis fuer den Webseiten-Inhaber
      </p>
      <p className="mt-2 text-[14.5px] text-red-900 leading-relaxed">
        Diese Seite zeigt aktuell Platzhalter-Werte, weil noch keine echten
        Firmen-/Inhaber-Daten gepflegt sind. <strong>Vor der ersten echten
        Bewerbung der Domain</strong> bitte die Datei{' '}
        <code className="rounded bg-white px-1.5 py-0.5 text-[13px] text-red-900">
          apps/web/data/companyInfo.ts
        </code>{' '}
        oeffnen, alle <code className="rounded bg-white px-1.5 py-0.5 text-[13px] text-red-900">PLACEHOLDER_*</code>-Werte
        ersetzen und einmal deployen. Bis dahin besteht ein Abmahnrisiko nach
        § 5 TMG und Art. 13 DSGVO.
      </p>
    </div>
  );
}
