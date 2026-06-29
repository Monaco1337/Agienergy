import type { Metadata } from 'next';
import { TopicLeadShell } from '@/components/landing/TopicLeadShell';
import { TopicEditorialBand } from '@/components/landing/TopicEditorialBand';
import {
  breadcrumbSchema,
  faqSchema,
  jsonLdScriptProps,
  serviceSchema,
} from '@/lib/seoSchemas';

const PATH = '/jahresabrechnung-pruefen';

export const metadata: Metadata = {
  title: 'Jahresabrechnung prüfen lassen – persönlich & verständlich',
  description:
    'Strom- oder Gas-Jahresabrechnung erhalten? Wir prüfen Abschlag, Verbrauch und Tarifposten persönlich. Keine automatische Vertragsumstellung, keine Verpflichtung.',
  alternates: { canonical: PATH },
  openGraph: {
    type: 'website',
    title: 'Jahresabrechnung Strom/Gas prüfen lassen',
    description:
      'Persönliche Prüfung Ihrer Jahresabrechnung. Verständliche Einschätzung statt langer Recherche.',
    url: PATH,
  },
};

const FAQS = [
  {
    q: 'Was kostet die Prüfung der Jahresabrechnung?',
    a: 'Die Erstprüfung ist für Sie kostenfrei und unverbindlich. Wir melden uns persönlich per Telefon oder E-Mail mit einer Einschätzung – ohne automatische Vertragsumstellung.',
  },
  {
    q: 'Welche Unterlagen brauchen Sie von mir?',
    a: 'Die aktuelle Jahresabrechnung Ihres Strom- oder Gasanbieters reicht in der Regel aus. Der Upload ist optional – Sie können auch zunächst nur Ihre Eckdaten angeben.',
  },
  {
    q: 'Wie schnell bekomme ich eine Rückmeldung?',
    a: 'In der Regel innerhalb von 24 Stunden an Werktagen. Bei kurzfristigen Wechselfristen priorisieren wir die Prüfung.',
  },
  {
    q: 'Wechseln Sie automatisch den Anbieter?',
    a: 'Nein. Wir prüfen nur und geben Ihnen eine Einschätzung. Sie entscheiden in Ruhe, ob und welche Schritte folgen.',
  },
  {
    q: 'Werden meine Daten an Dritte weitergegeben?',
    a: 'Ihre Daten werden ausschließlich zur Bearbeitung Ihrer Anfrage verwendet. Wir nutzen EU-Server und arbeiten DSGVO-konform. Eine Weitergabe ohne Ihre Zustimmung erfolgt nicht.',
  },
  {
    q: 'Was, wenn meine Rechnung in Ordnung ist?',
    a: 'Dann sagen wir Ihnen das auch ehrlich. Eine seriöse Prüfung ist ergebnisoffen – wir empfehlen nur dann einen Schritt, wenn er sich für Sie wirklich rechnet.',
  },
];

export default function JahresabrechnungPruefenPage() {
  return (
    <>
      <script {...jsonLdScriptProps(serviceSchema({
        path: PATH,
        name: 'Persönliche Prüfung der Jahresabrechnung',
        description:
          'Persönliche Prüfung der Strom- oder Gas-Jahresabrechnung anhand Verbrauch, Tarifstruktur und Vertragsdetails.',
        serviceType: 'Energieprüfung Jahresabrechnung',
      }))} />
      <script {...jsonLdScriptProps(faqSchema(FAQS))} />
      <script {...jsonLdScriptProps(breadcrumbSchema([
        { name: 'Startseite', path: '/' },
        { name: 'Jahresabrechnung prüfen', path: PATH },
      ]))} />

      <TopicLeadShell
        eyebrow="Jahresabrechnung"
        h1="Jahresabrechnung verständlich prüfen lassen."
        heroIntro="Strom- oder Gas-Jahresabrechnung erhalten und nicht sicher, ob Abschlag, Verbrauch und Tarif zusammenpassen? Wir ordnen die Posten persönlich ein – ohne automatische Vertragsumstellung."
        category="strom"
      >
        <TopicEditorialBand
          eyebrow="Strukturierte Prüfung"
          title="Was wir uns konkret anschauen"
          intro="Eine Jahresabrechnung besteht aus mehreren Posten, die zusammenpassen müssen. Wir prüfen die wichtigsten und sagen Ihnen, wo der Hebel sitzt."
          panels={[
            {
              title: 'Was wir auswerten',
              items: [
                'Verbrauch im Vorjahr im Vergleich zum aktuellen Tarif',
                'Höhe des Abschlags und ob die Nachzahlung gerechtfertigt ist',
                'Arbeitspreis, Grundpreis und ggf. Boni im Kontext Ihres Vertrags',
                'Laufzeit, Kündigungsfristen und Wechseloptionen – falls relevant',
              ],
            },
            {
              title: 'Woran Sie uns erkennen',
              items: [
                'Eine ehrliche Einschätzung – auch dann, wenn Ihr Vertrag bereits gut passt',
                'Keine automatische Vertragsumstellung, keine Verpflichtung',
                'Keine Werbeanrufe ohne Ihre Einwilligung',
                'Persönliche Rückmeldung per Telefon oder E-Mail innerhalb 24 h',
              ],
            },
          ]}
        />
        <TopicEditorialBand
          eyebrow="Häufige Fragen"
          title="Was Sie vorab wissen sollten"
          intro="Die wichtigsten Fragen rund um die persönliche Prüfung Ihrer Jahresabrechnung – auf einen Blick."
          columns={2}
          panels={FAQS.map((f) => ({ title: f.q, body: f.a }))}
        />
      </TopicLeadShell>
    </>
  );
}
