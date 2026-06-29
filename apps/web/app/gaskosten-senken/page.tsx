import type { Metadata } from 'next';
import { TopicLeadShell } from '@/components/landing/TopicLeadShell';
import { TopicEditorialBand } from '@/components/landing/TopicEditorialBand';
import { jsonLdScriptProps, serviceSchema } from '@/lib/seoSchemas';

const PATH = '/gaskosten-senken';

export const metadata: Metadata = {
  title: 'Gaskosten senken – persönlich geprüft',
  description:
    'Wir prüfen, ob bei Ihren Gaskosten Einsparpotenzial besteht. Verständlich, unverbindlich, ohne Verkaufsdruck.',
  alternates: { canonical: PATH },
};

export default function GasPage() {
  return (
    <>
    <script {...jsonLdScriptProps(serviceSchema({
      path: PATH,
      name: 'Persönliche Gaskosten-Prüfung',
      description: 'Persönliche Prüfung Ihrer Gaskosten anhand Verbrauch und Vertrag.',
      serviceType: 'Gaskosten-Prüfung',
    }))} />
    <TopicLeadShell
      eyebrow="Gas"
      h1="Gaskosten senken – verständlich geprüft."
      heroIntro="Wir bewerten Ihren Gasvertrag und prüfen, ob ein Wechsel oder eine Anpassung tatsächlich sinnvoll ist – ohne Lockangebot-Mathematik."
      category="gas"
    >
      <TopicEditorialBand
        eyebrow="Klare Analyse"
        title="So bewerten wir Ihren Gasvertrag"
        intro="Wir denken in Jahresverbrauch, regionalem Kontext und belastbarer Preislogik – nicht in Schnapszahlen aus anonymen Vergleichsportalen."
        panels={[
          {
            title: 'Unsere Prüfdimensionen',
            items: [
              'Aktuelles Tarifwerk, Preisfindung und verbleibende Vertragslaufzeit',
              'Abgleich Ihres Verbrauchs mit sinnvollen Referenzprofilen',
              'Regionale Rahmenbedingungen, Zeitfenster und realistische Wechselpunkte',
              'Handlungsempfehlung nur dort, wo sie sich für Sie rechnerisch lohnt',
            ],
          },
          {
            title: 'Was Sie von uns erhalten',
            items: [
              'Eine persönlich formulierte Einschätzung – keine Massen-PDF',
              'Die ehrliche Aussage, ob ein Wechsel tragfähig sein kann',
              'Keine generische Tarifliste, sondern maßgeschneiderte Orientierung',
            ],
          },
        ]}
      />
    </TopicLeadShell>
    </>
  );
}
