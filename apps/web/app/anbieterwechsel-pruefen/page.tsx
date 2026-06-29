import type { Metadata } from 'next';
import { TopicLeadShell } from '@/components/landing/TopicLeadShell';
import { TopicEditorialBand } from '@/components/landing/TopicEditorialBand';
import {
  breadcrumbSchema,
  faqSchema,
  jsonLdScriptProps,
  serviceSchema,
} from '@/lib/seoSchemas';

const PATH = '/anbieterwechsel-pruefen';

export const metadata: Metadata = {
  title: 'Anbieterwechsel prüfen lassen – Strom & Gas',
  description:
    'Bevor Sie wechseln: Wir prüfen ehrlich, ob ein Strom- oder Gasanbieterwechsel sich für Sie konkret rechnet. Persönlich, unverbindlich, ohne automatische Umstellung.',
  alternates: { canonical: PATH },
  openGraph: {
    type: 'website',
    title: 'Anbieterwechsel prüfen lassen',
    description:
      'Persönliche Wechselprüfung statt automatisierter Tarifumstellung. Sie entscheiden in Ruhe.',
    url: PATH,
  },
};

const FAQS = [
  {
    q: 'Wechseln Sie meinen Anbieter automatisch?',
    a: 'Nein. Wir prüfen und beraten – die Entscheidung bleibt vollständig bei Ihnen.',
  },
  {
    q: 'Was prüfen Sie konkret?',
    a: 'Wir vergleichen Ihren bestehenden Vertrag (Arbeitspreis, Grundpreis, Laufzeit, Boni) mit realistischen Alternativen unter Berücksichtigung Ihres Verbrauchs und Ihrer Lebenssituation.',
  },
  {
    q: 'Was ist, wenn sich der Wechsel nicht lohnt?',
    a: 'Dann sagen wir Ihnen das auch ehrlich. Eine seriöse Prüfung ist ergebnisoffen – wir empfehlen nur dann einen Wechsel, wenn er sich für Sie wirklich rechnet.',
  },
  {
    q: 'Wie lange dauert ein Wechsel?',
    a: 'In der Regel 3–6 Wochen, abhängig von Ihrer aktuellen Kündigungsfrist. Wir kümmern uns auf Wunsch um den Übergang, sodass Sie ohne Versorgungslücke wechseln.',
  },
  {
    q: 'Bekommt der alte Anbieter mit, dass ich mich beraten lasse?',
    a: 'Nein. Die Prüfung passiert vertraulich. Ein Wechsel wird – wenn überhaupt – erst nach Ihrer expliziten Zustimmung initiiert.',
  },
  {
    q: 'Werden meine Daten weitergegeben?',
    a: 'Nur zur Bearbeitung Ihrer Anfrage und nur, wenn ein Wechsel ausdrücklich von Ihnen beauftragt wird. DSGVO-konform, EU-Server.',
  },
];

export default function AnbieterwechselPruefenPage() {
  return (
    <>
      <script {...jsonLdScriptProps(serviceSchema({
        path: PATH,
        name: 'Persönliche Wechselprüfung für Strom und Gas',
        description:
          'Persönliche Prüfung eines Anbieterwechsels für Strom und Gas – ergebnisoffen, unverbindlich.',
        serviceType: 'Anbieterwechsel-Prüfung',
      }))} />
      <script {...jsonLdScriptProps(faqSchema(FAQS))} />
      <script {...jsonLdScriptProps(breadcrumbSchema([
        { name: 'Startseite', path: '/' },
        { name: 'Anbieterwechsel prüfen', path: PATH },
      ]))} />

      <TopicLeadShell
        eyebrow="Anbieterwechsel"
        h1="Bevor Sie wechseln – wir prüfen, ob es sich für Sie rechnet."
        heroIntro="Ein Wechsel klingt oft attraktiver, als er ist. Wir prüfen ergebnisoffen, ob ein Strom- oder Gasanbieterwechsel sich für Ihre konkrete Situation lohnt – oder ob Sie besser bleiben."
        category="strom"
      >
        <TopicEditorialBand
          eyebrow="Wechselprüfung mit Substanz"
          title="So prüfen wir Ihren möglichen Wechsel"
          intro="Wechsel ist Mittel, nicht Ziel. Erst wenn Substanz, Zahlen und Vertragslage zusammenpassen, ist ein Schritt sinnvoll."
          panels={[
            {
              title: 'Was wir prüfen',
              items: [
                'Belastbare Alternativen zu Ihrem aktuellen Vertrag',
                'Realistische Einsparung über die gesamte Laufzeit – inkl. Boni',
                'Sonderkündigungsrechte und vertragliche Stolpersteine',
                'Klare Empfehlung: wechseln, anpassen oder bewusst bleiben',
              ],
            },
            {
              title: 'Woran Sie uns erkennen',
              items: [
                'Keine pauschalen „Wechsel-jetzt"-Versprechen',
                'Keine automatische Vertragsumstellung, keine Verpflichtung',
                'Persönlicher Ansprechpartner statt Tarif-Bot',
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
