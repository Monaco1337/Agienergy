import type { AnswerState, FunnelConfig, FunnelStep } from '@elo/core';

const STEPS: FunnelStep[] = [
  {
    id: 'interests',
    question: 'Wobei möchten Sie sparen?',
    helpText: 'Wählen Sie, was am ehesten passt.',
    type: 'single_choice',
    field: 'interests',
    options: [
      { id: 'strom', label: 'Strom', description: 'Tarif & Verbrauch im Haushalt' },
      { id: 'gas', label: 'Gas', description: 'Heizung oder Warmwasser' },
      { id: 'strom_gas', label: 'Strom & Gas', description: 'Beides gemeinsam prüfen' },
      { id: 'photovoltaik', label: 'Photovoltaik', description: 'Eigenstrom vom Dach' },
      { id: 'unknown', label: 'Gewerbe / unsicher', description: 'Wir helfen Ihnen weiter' },
    ],
  },
  {
    id: 'monthlyEnergyCosts',
    question: 'Wie hoch sind Ihre Energiekosten?',
    helpText: 'Eine grobe Einschätzung pro Monat reicht.',
    type: 'single_choice',
    field: 'monthlyEnergyCosts',
    options: [
      { id: 'under_100', label: 'Unter 100 € / Monat' },
      { id: '100_200', label: '100–200 € / Monat' },
      { id: '200_400', label: '200–400 € / Monat' },
      { id: 'over_400', label: 'Über 400 € / Monat' },
      { id: 'unknown', label: 'Weiß ich nicht' },
    ],
  },
  {
    id: 'hasInvoice',
    question: 'Aktuelle Rechnung zur Hand?',
    helpText: 'Optional. Mit Rechnung wird Ihre Auswertung präziser – „Nein" ist auch in Ordnung.',
    type: 'single_choice',
    field: 'hasInvoice',
    options: [
      { id: 'upload_now', label: 'Ja, jetzt hochladen', description: 'PDF, JPG oder PNG · max. 10 MB' },
      { id: 'later', label: 'Sende ich später', description: 'Per E-Mail oder im Gespräch' },
      { id: 'no', label: 'Nein', description: 'Wir prüfen mit Ihren Angaben' },
    ],
  },
  {
    id: 'contact',
    question: 'Wie können wir Sie erreichen?',
    helpText:
      'Wir nutzen Ihre Daten ausschließlich für Ihre Energieprüfung. Keine Newsletter, keine Weitergabe.',
    type: 'contact',
  },
  {
    id: 'consent',
    question: 'Einverständnis und Datenschutz',
    helpText: 'Letzter Schritt. Sie können Ihre Einwilligung jederzeit widerrufen.',
    type: 'consent',
  },
];

export const funnelConfig: FunnelConfig = {
  version: '1.0.0',
  steps: STEPS,
};

export function visibleSteps(state: AnswerState, audience?: string): FunnelStep[] {
  return STEPS.map((s) => applyAudience(s, audience)).filter((s) => (s.visibleIf ? s.visibleIf(state) : true));
}

function applyAudience(step: FunnelStep, audience?: string): FunnelStep {
  if (!audience || !step.audienceOverrides) return step;
  const ov = (step.audienceOverrides as Record<string, Partial<FunnelStep>>)[audience];
  if (!ov) return step;
  return { ...step, ...ov };
}
