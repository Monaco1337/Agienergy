/**
 * Zentrale Firmenstammdaten fuer Impressum, Datenschutz, AGB, Widerrufsbelehrung,
 * Kontakt-Seite und Organization-JSON-LD.
 *
 * WICHTIG: Diese Datei MUSS vor dem ersten echten Launch mit echten Daten gefuellt
 * werden. Felder mit `PLACEHOLDER`-Werten sind rechtlich riskant und werden auf
 * den Seiten als "noch nicht gepflegt" markiert (rotes Hinweis-Banner).
 *
 * Pflichtangaben fuer ein deutsches Impressum nach § 5 TMG:
 *   - Vollstaendiger Firmenname inkl. Rechtsform
 *   - Ladungsfaehige Anschrift (kein Postfach)
 *   - Vertretungsberechtigte Person(en)
 *   - Kontakt (E-Mail UND Telefon ODER andere unmittelbare Kontaktmoeglichkeit)
 *   - Handelsregister-Eintrag (bei eingetragenen Unternehmen)
 *   - Umsatzsteuer-ID (sofern vorhanden)
 *   - Berufsaufsichtsbehoerde (bei reglementierten Berufen)
 *   - Streitbeilegungs-Hinweise nach Art. 14 Abs. 1 ODR-VO + § 36 VSBG
 */

export const COMPANY_INFO = {
  /** Anzeigename + Rechtsform, exakt wie im Handelsregister */
  legalName: 'AGI Energy',
  /** Optional, separater Geschaeftsname (wenn anders als legalName) */
  tradingName: 'AGI Energy',
  /** Inhaber / Geschaeftsfuehrung */
  responsiblePerson: 'Kevin Blazevic',
  /** Strasse + Hausnummer */
  street: 'PLACEHOLDER_STRASSE_HAUSNUMMER',
  /** PLZ + Ort */
  postalCity: 'PLACEHOLDER_PLZ_ORT',
  /** Land in ISO-Form */
  country: 'Deutschland',
  /** E-Mail fuer Kontakt + § 5 TMG */
  contactEmail: 'kontakt@agienergy.de',
  /** Telefon fuer unmittelbare Kontaktmoeglichkeit */
  contactPhone: 'PLACEHOLDER_TELEFON',
  /** Optional: USt-IdNr. nach § 27a UStG */
  vatId: 'PLACEHOLDER_USTID',
  /** Optional: Handelsregister bei eingetragenen Unternehmen */
  hrb: 'PLACEHOLDER_HRB',
  registerCourt: 'PLACEHOLDER_AMTSGERICHT',
  /** Verantwortlich nach § 18 Abs. 2 MStV (Medienrecht / Inhaltlich Verantwortlicher) */
  pressResponsible: 'Kevin Blazevic',
  /** Stand der Rechtstexte */
  lastUpdated: '2026-06-29',
  /** Auftragsverarbeiter laut Art. 28 DSGVO */
  processors: [
    {
      name: 'Vercel Inc.',
      purpose: 'Hosting + Edge-Network',
      location: 'USA / EU-Regionen (Frankfurt)',
      basis: 'EU-Standardvertragsklauseln (Art. 46 DSGVO)',
    },
    {
      name: 'Neon Database / Vercel Postgres',
      purpose: 'Datenbank fuer Lead- und Nutzerdaten',
      location: 'EU (Frankfurt)',
      basis: 'Auftragsverarbeitung nach Art. 28 DSGVO',
    },
    {
      name: 'Resend (resend.com)',
      purpose: 'Transaktionale E-Mails (Lead-Bestaetigung, Newsletter-DOI)',
      location: 'EU / USA',
      basis: 'EU-Standardvertragsklauseln (nur wenn aktiviert)',
    },
  ],
} as const;

/**
 * Pruefen, ob ein Wert ein Platzhalter ist. Wird zur Anzeige eines roten
 * Hinweis-Banners genutzt, wenn echte Daten fehlen.
 */
export function isPlaceholder(value: string): boolean {
  return value.startsWith('PLACEHOLDER_');
}

/** Sammelpruefung: gibt es mindestens einen ungesetzten Platzhalter? */
export function hasIncompleteCompanyInfo(): boolean {
  return Object.values(COMPANY_INFO).some(
    (v) => typeof v === 'string' && isPlaceholder(v),
  );
}

/** Display-Helfer: ersetzt Platzhalter durch sichtbare Warnung */
export function displayField(value: string): string {
  if (isPlaceholder(value)) {
    return `[BITTE_IN_companyInfo.ts_PFLEGEN: ${value.replace('PLACEHOLDER_', '')}]`;
  }
  return value;
}
