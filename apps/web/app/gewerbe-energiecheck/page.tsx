import { TopicLeadShell } from '@/components/landing/TopicLeadShell';
import { TopicEditorialBand } from '@/components/landing/TopicEditorialBand';

export const metadata = {
  title: 'Gewerbe-Energie-Check',
  description:
    'Energie-Check für Unternehmen: Strom, Gas und PV-Potenziale für Ihren Standort verständlich geprüft.',
};

export default function GewerbePage() {
  return (
    <TopicLeadShell
      eyebrow="Gewerbe"
      h1="Gewerbe-Energie-Check"
      heroIntro="Für Unternehmen mit hohen Energiekosten: wir prüfen Strom, Gas und PV-Potenziale für Ihren Standort – mit Blick auf Lastprofil und Beschaffung."
      category="gewerbe"
    >
      <TopicEditorialBand
        eyebrow="Operative Tiefe"
        title="So bewerten wir Energie im Unternehmen"
        intro="Hohe Lastspitzen, volatile Verbräuche und beschaffungsrechtliche Feinheiten verlangen mehr als Standardprivattarife. Wir strukturieren Strom, Gas und PV entlang Ihres Betriebsmodells."
        panels={[
          {
            title: 'Analysefokus',
            items: [
              'Verbrauchs- und Laststruktur über Tages- und Jahresverlauf',
              'Beschaffungs- und Verlängerungsoptionen für Strom und Gas',
              'Photovoltaik und Eigenstromnutzung auf dem Gewerbeareal',
              'Wirtschaftlichkeit im Kontext Ihrer Branche und Investitionsplanung',
            ],
          },
          {
            title: 'Wo der Hebel besonders groß ist',
            body: 'Standortgebundene Betriebe mit hohem Thermo-, Kälte- oder Prozessenergiebedarf profitieren zuerst von einer belastbaren Datenbasis – etwa in Bäckereien, Gastronomie und Hotellerie, Pflege und Medizin, Fitness, Handel und Werkstätten, Produktion und Logistik, bei verwalteten Immobilienbeständen sowie in vielen landwirtschaftlichen Betrieben.',
          },
        ]}
      />
    </TopicLeadShell>
  );
}
