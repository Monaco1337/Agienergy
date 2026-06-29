import type { Metadata } from 'next';
import { TopicLeadShell } from '@/components/landing/TopicLeadShell';
import { TopicEditorialBand } from '@/components/landing/TopicEditorialBand';
import {
  breadcrumbSchema,
  faqSchema,
  jsonLdScriptProps,
  serviceSchema,
} from '@/lib/seoSchemas';

const PATH = '/gasvertrag-pruefen';

export const metadata: Metadata = {
  title: 'Gasvertrag prüfen lassen – persönlich eingeordnet',
  description:
    'Gasabschlag gestiegen oder unklarer Tarif? Wir prüfen Ihren Gasvertrag persönlich und sagen, ob ein Wechsel oder eine Anpassung wirtschaftlich sinnvoll ist.',
  alternates: { canonical: PATH },
  openGraph: {
    type: 'website',
    title: 'Gasvertrag persönlich prüfen lassen',
    description:
      'Gasvertrag, Verbrauch und Abschlag ergebnisoffen prüfen – ohne automatische Umstellung.',
    url: PATH,
  },
};

const FAQS = [
  {
    q: 'Mein Gasabschlag wurde stark erhöht – ist das gerechtfertigt?',
    a: 'Das hängt von mehreren Faktoren ab: Verbrauchsentwicklung, aktueller Arbeitspreis, gesetzliche Umlagen und Preisgleitklauseln im Vertrag. Wir prüfen das und ordnen die Erhöhung ein.',
  },
  {
    q: 'Lohnt sich ein Anbieterwechsel beim Gas aktuell?',
    a: 'Manchmal ja, manchmal nicht. Wir vergleichen Ihren bestehenden Vertrag mit realistischen Alternativen und sagen Ihnen, ob ein Wechsel sich für Sie konkret rechnet.',
  },
  {
    q: 'Was, wenn ich noch in einer Preisgarantie bin?',
    a: 'Preisgarantien können ein Vorteil oder ein Nachteil sein, je nach Marktlage. Wir berücksichtigen Laufzeit und Kündigungsfristen in der Empfehlung.',
  },
  {
    q: 'Welche Unterlagen sind hilfreich?',
    a: 'Die aktuelle Gas-Jahresabrechnung ist ideal. Der Upload ist optional – Ihre Eckdaten reichen für eine erste Einschätzung.',
  },
  {
    q: 'Werde ich nach der Prüfung kontaktiert?',
    a: 'Nur, wenn Sie es ausdrücklich wünschen und der von Ihnen gewählten Kontaktart zugestimmt haben. Keine ungebetenen Anrufe.',
  },
];

export default function GasvertragPruefenPage() {
  return (
    <>
      <script {...jsonLdScriptProps(serviceSchema({
        path: PATH,
        name: 'Persönliche Gasvertrag-Prüfung',
        description:
          'Persönliche Prüfung des Gasvertrags anhand Verbrauch, Tarifdetails und Marktlage.',
        serviceType: 'Gasvertrag-Prüfung',
      }))} />
      <script {...jsonLdScriptProps(faqSchema(FAQS))} />
      <script {...jsonLdScriptProps(breadcrumbSchema([
        { name: 'Startseite', path: '/' },
        { name: 'Gasvertrag prüfen', path: PATH },
      ]))} />

      <TopicLeadShell
        eyebrow="Gas"
        h1="Gasvertrag persönlich prüfen lassen."
        heroIntro="Gestiegener Abschlag oder unklarer Tarif? Wir prüfen Ihren Gasvertrag mit Blick auf Verbrauch, Arbeitspreis und Marktlage – und sagen Ihnen klar, ob ein Schritt sinnvoll ist."
        category="gas"
      >
        <TopicEditorialBand
          eyebrow="Strukturierte Prüfung"
          title="Was wir bei Ihrem Gasvertrag prüfen"
          intro="Gaspreise sind durch Großhandelsmarkt, Umlagen und individuelle Vertragsbestandteile beeinflusst. Wir trennen, was beeinflussbar ist – und was nicht."
          panels={[
            {
              title: 'Was wir auswerten',
              items: [
                'Verbrauchsentwicklung und Plausibilität des Abschlags',
                'Arbeitspreis, Grundpreis, Boni und Preisgarantien',
                'Laufzeit, Kündigungsfristen, Sonderkündigungsrechte',
                'Ehrliche Empfehlung: anpassen, wechseln – oder bewusst halten',
              ],
            },
            {
              title: 'Woran Sie uns erkennen',
              items: [
                'Keine Panikmache bei Preiserhöhungen',
                'Keine automatische Vertragsumstellung, keine Verpflichtung',
                'Persönlicher Ansprechpartner statt Tarif-Roboter',
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
