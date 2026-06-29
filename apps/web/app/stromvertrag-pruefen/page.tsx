import type { Metadata } from 'next';
import { TopicLeadShell } from '@/components/landing/TopicLeadShell';
import { TopicEditorialBand } from '@/components/landing/TopicEditorialBand';
import {
  breadcrumbSchema,
  faqSchema,
  jsonLdScriptProps,
  serviceSchema,
} from '@/lib/seoSchemas';

const PATH = '/stromvertrag-pruefen';

export const metadata: Metadata = {
  title: 'Stromvertrag prüfen lassen – persönliche Einschätzung',
  description:
    'Wir prüfen Ihren aktuellen Stromvertrag persönlich – Tarif, Verbrauch und Vertragsdetails ergebnisoffen eingeordnet. Keine automatische Umstellung, keine Verpflichtung.',
  alternates: { canonical: PATH },
  openGraph: {
    type: 'website',
    title: 'Stromvertrag persönlich prüfen lassen',
    description:
      'Statt anonymem Tarifportal: persönliche Prüfung Ihres Stromvertrags. Unverbindlich, DSGVO-konform.',
    url: PATH,
  },
};

const FAQS = [
  {
    q: 'Warum nicht einfach ein Tarifportal nutzen?',
    a: 'Tarifportale rechnen Theorie auf Basis weniger Eingaben. Wir prüfen Ihren konkreten Vertrag, Ihren tatsächlichen Verbrauch und Ihre Lebenssituation – und sagen Ihnen, ob ein Wechsel überhaupt sinnvoll ist.',
  },
  {
    q: 'Bekomme ich eine Empfehlung für einen konkreten Anbieter?',
    a: 'Wenn ein Wechsel sich lohnt, schlagen wir passende Optionen vor – aber unabhängig vom Vermittlungsdruck. Sie entscheiden in Ruhe.',
  },
  {
    q: 'Wie lange dauert die Prüfung?',
    a: 'In der Regel melden wir uns innerhalb von 24 Stunden an Werktagen mit einer ersten Einschätzung.',
  },
  {
    q: 'Muss ich Unterlagen hochladen?',
    a: 'Ein Upload Ihrer Jahresabrechnung beschleunigt die Prüfung, ist aber nicht zwingend nötig. Sie können auch nur Ihre Eckdaten angeben.',
  },
  {
    q: 'Was kostet die Prüfung?',
    a: 'Die Erstprüfung ist für Sie kostenfrei und unverbindlich – ohne automatische Vertragsumstellung.',
  },
];

export default function StromvertragPruefenPage() {
  return (
    <>
      <script {...jsonLdScriptProps(serviceSchema({
        path: PATH,
        name: 'Persönliche Stromvertrag-Prüfung',
        description:
          'Persönliche Prüfung des Stromvertrags anhand Verbrauch, Tarifdetails und Marktlage.',
        serviceType: 'Stromvertrag-Prüfung',
      }))} />
      <script {...jsonLdScriptProps(faqSchema(FAQS))} />
      <script {...jsonLdScriptProps(breadcrumbSchema([
        { name: 'Startseite', path: '/' },
        { name: 'Stromvertrag prüfen', path: PATH },
      ]))} />

      <TopicLeadShell
        eyebrow="Strom"
        h1="Stromvertrag persönlich prüfen lassen."
        heroIntro="Wir vergleichen nicht blind Tarife. Wir prüfen Ihren konkreten Vertrag – Arbeitspreis, Grundpreis, Laufzeit, Verbrauch – und geben eine klare, ergebnisoffene Einschätzung."
        category="strom"
      >
        <TopicEditorialBand
          eyebrow="Vertragsprüfung mit Substanz"
          title="So prüfen wir Ihren Stromvertrag"
          intro="Eine seriöse Prüfung braucht Kontext: Ihre Lebenssituation, Ihr Verbrauch und Ihre Vertragslage. Erst dann lässt sich beurteilen, ob ein Wechsel oder eine Anpassung Sinn ergibt."
          panels={[
            {
              title: 'Was wir auswerten',
              items: [
                'Arbeitspreis und Grundpreis im Kontext Ihres Verbrauchs',
                'Laufzeit, Kündigungsfristen und Preisgarantien',
                'Boni und Sonderkonditionen realistisch eingeordnet',
                'Klare Empfehlung: anpassen, wechseln – oder vorerst nichts tun',
              ],
            },
            {
              title: 'Woran Sie uns erkennen',
              items: [
                'Keine „garantierte Ersparnis" ohne belastbare Zahlen',
                'Keine automatische Vertragsumstellung, keine Verpflichtung',
                'Persönlicher Ansprechpartner statt Callcenter-Druck',
                'DSGVO-konforme Bearbeitung, EU-Server',
              ],
            },
          ]}
        />
        <TopicEditorialBand
          eyebrow="Häufige Fragen"
          title="Antworten vorab"
          columns={2}
          panels={FAQS.map((f) => ({ title: f.q, body: f.a }))}
        />
      </TopicLeadShell>
    </>
  );
}
