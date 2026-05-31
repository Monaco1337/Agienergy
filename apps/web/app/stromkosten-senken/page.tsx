import { TopicLeadShell } from '@/components/landing/TopicLeadShell';
import { TopicEditorialBand } from '@/components/landing/TopicEditorialBand';

export const metadata = {
  title: 'Stromkosten senken – persönlich geprüft',
  description:
    'Wir prüfen, ob bei Ihren Stromkosten Einsparpotenzial besteht. Verständlich, unverbindlich, ohne Verkaufsdruck.',
};

export default function StromPage() {
  return (
    <TopicLeadShell
      eyebrow="Strom"
      h1="Stromkosten senken – ehrlich geprüft."
      heroIntro="Wir vergleichen nicht blind Tarife. Wir schauen uns Ihre Situation an und prüfen, ob ein Wechsel oder eine Anpassung wirtschaftlich sinnvoll ist."
      category="strom"
    >
      <TopicEditorialBand
        eyebrow="Präzise Einordnung"
        title="So arbeiten wir mit Ihren Stromdaten"
        intro="Kein automatisierter Tarifwechsel und kein Callcenter-Druck – sondern eine ruhige, strukturierte Prüfung Ihrer Ausgangslage."
        panels={[
          {
            title: 'Was wir auswerten',
            items: [
              'Verbrauchsverlauf und Lastprofil – belastbar statt geraten',
              'Arbeitspreis, Grundpreis und Preisstabilität im Kontext Ihres Vertrags',
              'Laufzeit, Kündigungsfristen und vertragliche Rahmenbedingungen',
              'Klare Empfehlung: anpassen, wechseln – oder vorerst bewusst nichts tun',
            ],
          },
          {
            title: 'Woran Sie uns erkennen',
            items: [
              'Keine „garantierte Ersparnis“, bevor wir Ihre Zahlen verstanden haben',
              'Keine Werbeanrufe und kein aggressives Nachfassen ohne Ihre Einwilligung',
              'Keine versteckten Gebühren – Transparenz ist Teil des Standards',
            ],
          },
        ]}
      />
    </TopicLeadShell>
  );
}
