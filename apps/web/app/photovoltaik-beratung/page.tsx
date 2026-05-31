import { TopicLeadShell } from '@/components/landing/TopicLeadShell';
import { TopicEditorialBand } from '@/components/landing/TopicEditorialBand';

export const metadata = {
  title: 'Photovoltaik-Beratung – wirtschaftlich geprüft',
  description:
    'Wir prüfen, ob Photovoltaik für Ihr Gebäude wirtschaftlich sinnvoll sein kann – ehrlich, ohne Werbeversprechen.',
};

export default function PVPage() {
  return (
    <TopicLeadShell
      eyebrow="Photovoltaik"
      h1="Photovoltaik-Beratung – wirtschaftlich geprüft."
      heroIntro="Wir prüfen, ob Photovoltaik für Ihr Gebäude wirtschaftlich sinnvoll sein kann. Mit klaren Annahmen statt aggressiven Werbeversprechen."
      category="solar"
    >
      <TopicEditorialBand
        eyebrow="Wirtschaftlichkeit zuerst"
        title="Drei Säulen unserer PV-Einordnung"
        intro="Photovoltaik ist eine Investitionsentscheidung. Wir arbeiten mit konservativen Parametern und machen transparent, welche Annahmen Ihr Ergebnis tragen – damit Sie souverän entscheiden."
        columns={3}
        panels={[
          {
            title: 'Dachlandschaft & Ertrag',
            body: 'Neigung, Ausrichtung, Verschattung und technische Randbedingungen – bewertet mit Blick auf langfristige Ertragsstabilität, nicht nur auf Katalogwerte.',
          },
          {
            title: 'Lastprofil & Speicherlogik',
            body: 'Der wirtschaftliche Hebel liegt im zeitlichen Zusammenspiel von Erzeugung und Verbrauch. Wir ordnen Eigenverbrauch, Speicheroption und Netzbezug nüchtern ein.',
          },
          {
            title: 'Szenarien statt Idealwelt',
            body: 'Mehrere Rechenvarianten, klar benannte Annahmen und eine ehrliche Ergebnisbandbreite – statt eines optimistischen Bestfalls, der in der Praxis selten hält.',
          },
        ]}
      />
    </TopicLeadShell>
  );
}
