/** Zentrale Copy für die Premium-Landingpage (AGI Energy). */

export const energyLandingContent = {
  hero: {
    eyebrow: 'PERSÖNLICHE ENERGIEPRÜFUNG',
    eyebrowCategories: 'STROM · GAS · SOLAR · GEWERBE',
    h1: 'Persönliche Energieprüfung statt anonymer Tarifportale.',
    h1Alt:
      'Ihre Energiekosten verstehen. Mit persönlicher Prüfung statt automatischer Tariflogik.',
    subline:
      'Laden Sie Ihre Jahresabrechnung hoch und erhalten Sie eine individuelle Einschätzung durch einen persönlichen Ansprechpartner – verständlich, transparent und auf Ihre Situation abgestimmt.',
    ctaPrimary: 'Persönliche Beratung anfragen',
    ctaSecondary: 'So funktioniert es',
    trustLine:
      'Persönlicher Ansprechpartner · Vertrauliche Prüfung · Keine automatische Tarifentscheidung',
    process: [
      { step: '1', title: 'Unterlagen sicher übermitteln' },
      { step: '2', title: 'Persönliche Analyse' },
      { step: '3', title: 'Klare Rückmeldung' },
    ],
    uploadMicrocopy:
      'Ihre Unterlagen werden ausschließlich zur Bearbeitung Ihrer Anfrage verwendet – persönlich geprüft, nicht automatisiert.',
  },
  leadForm: {
    cardTitle: 'Kostenlose persönliche Energieprüfung starten',
    cardSubline:
      'Ihre Unterlagen werden nicht automatisiert ausgewertet, sondern persönlich geprüft und vertraulich behandelt.',
    badgeFree: 'Kostenlos',
    uploadOptional: 'Optional',
    uploadHeadline: 'Jahresabrechnung anhängen',
    uploadHint: 'PDF oder Foto · max. 10 MB',
    uploadBenefit: 'Hilft bei der Prüfung – kein Muss.',
    uploadOfferHint:
      'Damit können wir Ihnen ein passenderes Angebot erstellen – freiwillig und ohne Verpflichtung.',
    uploadCta: 'Datei wählen',
    uploadTrustLine: 'Nur zur Bearbeitung Ihrer Anfrage · vertraulich behandelt.',
    annualConsumptionLabel: 'Jahresverbrauch (kWh)',
    annualConsumptionPlaceholder: 'z. B. 3500',
    submit: 'Jetzt persönlich prüfen lassen',
    submitting: 'Anfrage wird vertraulich übermittelt…',
    submitFootnote: 'Keine automatische Tarifentscheidung · Persönliche Rückmeldung',
    successTitle: 'Anfrage sicher eingegangen',
    successText:
      'Vielen Dank. Ihre Unterlagen wurden vertraulich übermittelt. Ein persönlicher Ansprechpartner prüft Ihre Anfrage und meldet sich mit einer klaren Einschätzung.',
    successCta: 'Weitere Anfrage starten',
    consentLabel:
      'Ich stimme der vertraulichen Verarbeitung meiner Anfrage durch AGI Energy zu. Hinweise zur Datenverarbeitung finden Sie in der Datenschutzerklärung.',
  },
  trustBar: {
    items: [
      'Persönlicher Ansprechpartner',
      'Keine automatische Tarifentscheidung',
      'Vertrauliche Prüfung Ihrer Unterlagen',
      'Individuelle Rückmeldung statt Standardvergleich',
      'DSGVO-orientierte Verarbeitung',
    ],
  },
  /** „Problem" → Trust-Section (persönliche Betreuung statt anonymer Vergleichslogik) */
  problem: {
    eyebrow: 'PERSÖNLICHE BETREUUNG STATT ANONYMER VERGLEICHSLOGIK',
    title: 'Ihre Vorteile auf einen Blick',
    intro:
      'Viele Plattformen zeigen automatisch generierte Tariflisten. Wir prüfen jede Anfrage individuell und melden uns persönlich mit einer verständlichen Einschätzung zurück.',
    cards: [
      {
        title: 'Persönlicher Ansprechpartner',
        text: 'Feste Kontaktperson statt anonymes Callcenter.',
      },
      {
        title: 'Individuelle Prüfung',
        text: 'Verbrauch, Laufzeiten, Region und Situation werden persönlich betrachtet.',
      },
      {
        title: 'Vertrauliche Behandlung',
        text: 'Ihre Unterlagen werden ausschließlich zur Anfragebearbeitung verwendet.',
      },
      {
        title: 'Verständliche Empfehlung',
        text: 'Keine komplizierten Tariftabellen, sondern klare Rückmeldungen.',
      },
    ],
  },
  process: {
    eyebrow: 'ABLAUF',
    title: 'In 3 Schritten zur persönlichen Energieprüfung',
    steps: [
      {
        title: 'Unterlagen sicher übermitteln',
        text: 'Laden Sie Ihre Jahresabrechnung vertraulich hoch.',
      },
      {
        title: 'Persönliche Analyse',
        text: 'Ein Ansprechpartner prüft Verbrauch, Tarifstruktur und Situation individuell.',
      },
      {
        title: 'Klare Rückmeldung',
        text: 'Sie werden persönlich per Telefon oder E-Mail kontaktiert und erhalten eine verständliche Einschätzung – statt unübersichtlicher Tariflisten.',
      },
    ],
  },
  categories: {
    eyebrow: 'BEREICHE',
    title: 'Eine Plattform für Strom, Gas, Solar und Gewerbe',
    cta: 'Persönlich prüfen lassen',
    cards: [
      {
        id: 'strom' as const,
        icon: '⚡',
        title: 'Strom',
        text: 'Prüfung Ihres aktuellen Stromvertrags anhand von Verbrauch, Region, Laufzeit und Tarifdetails.',
      },
      {
        id: 'gas' as const,
        icon: '🔥',
        title: 'Gas',
        text: 'Analyse Ihres Gastarifs mit Blick auf Verbrauch, Grundpreis und Vertragsbedingungen.',
      },
      {
        id: 'solar' as const,
        icon: '☀️',
        title: 'Solar',
        text: 'Vorqualifizierung für Photovoltaik- und Speicherlösungen inklusive Potenzialbewertung.',
      },
      {
        id: 'gewerbe' as const,
        icon: '🏢',
        title: 'Gewerbe',
        text: 'Individuelle Energieprüfung für Unternehmen mit komplexeren Verbrauchsstrukturen.',
      },
    ],
  },
  concierge: {
    eyebrow: 'PERSONALISIERTE BETREUUNG',
    title: 'Keine anonyme Tarifmaschine. Ein echter Ansprechpartner.',
    intro:
      'Ihre Anfrage wird persönlich geprüft und individuell eingeordnet. Keine automatisierten Empfehlungen. Keine Massenabfertigung.',
    bullets: [
      'Persönliche Rückmeldung',
      'Verständliche Einschätzung',
      'Individuelle Prüfung',
      'Vertrauliche Bearbeitung',
    ],
    cta: 'Persönliche Beratung anfragen',
    portraitAlt:
      'Persönlicher Ansprechpartner – freundlicher Berater mit modernem dunklen Anzug, ruhiger Blick, vertrauenswürdige Ausstrahlung',
    previewStatuses: [
      'Anfrage sicher eingegangen',
      'Unterlagen vertraulich erfasst',
      'Persönliche Prüfung wird vorbereitet',
      'Ihr Ansprechpartner erstellt Ihre Einschätzung',
    ],
  },
  /** Anti-Scam / Reasons-To-Switch – Vertrauens-Cards mit cyan Lichtbogen */
  antiScam: {
    eyebrow: 'WARUM KUNDEN WECHSELN',
    title: 'Warum viele Kunden eine persönliche Prüfung bevorzugen',
    intro: '',
    cards: [
      {
        id: 'tarife' as const,
        title: 'Unübersichtliche Tarife',
        text: 'Viele Angebote wirken günstig, enthalten aber Bedingungen und Einschränkungen.',
      },
      {
        id: 'zeit' as const,
        title: 'Keine Zeit für Vergleichsportale',
        text: 'Kunden möchten keine stundenlangen Tarifvergleiche durchführen.',
      },
      {
        id: 'einschaetzung' as const,
        title: 'Persönliche Einschätzung',
        text: 'Eine verständliche Rückmeldung schafft Sicherheit bei Entscheidungen.',
      },
      {
        id: 'vertrauen' as const,
        title: 'Vertrauen statt Massenabwicklung',
        text: 'Persönliche Ansprechpartner sorgen für Klarheit und Transparenz.',
      },
    ],
    badges: [
      'Keine öffentliche Weitergabe Ihrer Daten',
      'Keine automatische Tarifvermittlung',
      'Keine Massenweiterleitung',
      'Persönliche Bearbeitung',
      'Vertrauliche Anfrageprüfung',
    ],
  },
  /** Strukturierte Energieprüfung – Premium-Trust-Block direkt nach Anti-Scam */
  structuredAudit: {
    eyebrow: 'STRUKTURIERTE ENERGIEPRÜFUNG',
    title: 'Strukturierte Energieprüfung statt unübersichtlicher Vergleichslisten',
    cards: [
      {
        id: 'concierge' as const,
        title: 'Persönliche Betreuung',
        text: 'Jede Anfrage wird individuell geprüft und durch einen festen Ansprechpartner begleitet.',
      },
      {
        id: 'gdpr' as const,
        title: 'DSGVO-orientierte Prozesse',
        text: 'Vertrauliche Verarbeitung Ihrer Unterlagen mit strukturierter und sicherer Bearbeitung.',
      },
      {
        id: 'segments' as const,
        title: 'Für Privat & Gewerbe',
        text: 'Strom, Gas, Solar und komplexere Verbrauchsstrukturen aus einer Hand.',
      },
    ],
  },
  /** FAQ – Premium-Trust-Block direkt nach „Strukturierte Energieprüfung" */
  faq: {
    eyebrow: 'HÄUFIGE FRAGEN',
    title: 'Häufige Fragen zur persönlichen Energieprüfung',
    items: [
      {
        q: 'Werden meine Daten weitergegeben?',
        a: 'Nein. Ihre Unterlagen werden ausschließlich zur Bearbeitung Ihrer Anfrage verwendet.',
      },
      {
        q: 'Muss ich sofort den Anbieter wechseln?',
        a: 'Nein. Sie erhalten zunächst eine persönliche Einschätzung Ihrer aktuellen Situation.',
      },
      {
        q: 'Ist die Prüfung kostenlos?',
        a: 'Ja. Die erste Einschätzung erfolgt unverbindlich und kostenlos.',
      },
      {
        q: 'Wer prüft meine Anfrage?',
        a: 'Ihre Anfrage wird persönlich durch einen Ansprechpartner bearbeitet.',
      },
      {
        q: 'Kann ich auch Gewerbeverträge prüfen lassen?',
        a: 'Ja. Die Plattform unterstützt Privat- und Gewerbekunden.',
      },
    ],
  },
  /** Kontakt unter FAQ – Nachricht an CRM / Webhook */
  faqContact: {
    cta: 'Noch Fragen?',
    title: 'Persönliche Rückmeldung',
    intro:
      'Haben Sie eine Frage, die hier nicht beantwortet wurde? Schreiben Sie uns – wir melden uns vertraulich bei Ihnen.',
    name: 'Name',
    email: 'E-Mail-Adresse',
    phone: 'Telefonnummer',
    message: 'Ihre Nachricht',
    placeholderMessage: 'Wobei können wir Sie unterstützen?',
    consentBefore: 'Ich stimme zu, dass meine Angaben zur Bearbeitung der Anfrage verarbeitet werden. Hinweise in der ',
    consentLink: 'Datenschutzerklärung',
    submit: 'Nachricht senden',
    submitting: 'Wird sicher übermittelt…',
    successTitle: 'Nachricht eingegangen',
    successText: 'Vielen Dank. Wir prüfen Ihre Nachricht und melden uns persönlich bei Ihnen.',
    errorGeneric: 'Übermittlung fehlgeschlagen. Bitte versuchen Sie es in wenigen Minuten erneut.',
    back: 'Weitere Nachricht senden',
    cancel: 'Schließen',
  },
  security: {
    eyebrow: 'DATENSCHUTZ',
    title: 'Ihre Daten werden zweckgebunden verarbeitet',
    intro:
      'Die übermittelten Unterlagen werden ausschließlich zur Bearbeitung Ihrer Anfrage verwendet und nicht öffentlich verarbeitet.',
    points: [
      'Upload nur mit Zustimmung',
      'Vertrauliche Verarbeitung',
      'Keine öffentliche Veröffentlichung',
      'DSGVO-orientierte Prozesse',
      'Persönliche Anfragebearbeitung',
    ],
  },
  finalCta: {
    eyebrow: 'JETZT STARTEN',
    title: 'Jetzt persönliche\nEnergieprüfung anfragen',
    text: 'Laden Sie Ihre Unterlagen sicher hoch und erhalten Sie eine verständliche persönliche Einschätzung.',
    button: 'Persönliche Prüfung starten',
    trust:
      'Persönlicher Ansprechpartner · Vertrauliche Bearbeitung · Keine Tarifmaschine',
    trustItems: [
      { id: 'concierge' as const, label: 'Persönlicher Ansprechpartner' },
      { id: 'confidential' as const, label: 'Vertrauliche Verarbeitung' },
      { id: 'no-auto' as const, label: 'Keine automatische Tarifentscheidung' },
    ],
  },
  stickyMobile: {
    label: 'Persönliche Beratung anfragen',
  },
  categorySelector: {
    strom: { label: 'Strom', hint: 'Haushalt' },
    gas: { label: 'Gas', hint: 'Wärme & Warmwasser' },
    solar: { label: 'Solar', hint: 'PV & Speicher' },
    gewerbe: { label: 'Gewerbe', hint: 'Unternehmen' },
  },
} as const;
