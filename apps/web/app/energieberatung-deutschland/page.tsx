import { TopicLeadShell } from '@/components/landing/TopicLeadShell';
import { TopicEditorialBand } from '@/components/landing/TopicEditorialBand';

export const metadata = {
  title: 'Energieberatung Deutschland',
  description: 'Persönliche Energieberatung für Strom, Gas und Photovoltaik in Deutschland.',
};

export default function Page() {
  return (
    <TopicLeadShell
      eyebrow="Energieberatung"
      h1="Energieberatung in Deutschland – persönlich, ehrlich, ruhig."
      heroIntro="Wir helfen Privatkunden, Eigentümern, Vermietern und Unternehmen, ihre Energiesituation realistisch einzuschätzen."
      category="strom"
    >
      <TopicEditorialBand
        eyebrow="Leistungsportfolio"
        title="Für wen wir Energiefragen strukturieren"
        intro="Vom ambitionierten Privathaushalt bis zum komplexen Gewerbepark – ein Ansprechpartner, eine durchgängige Methodik."
        panels={[
          {
            title: 'Zielgruppen',
            items: [
              'Privathaushalte mit überdurchschnittlichem Strom- oder Gasbezug',
              'Eigentümer mit realistischem PV- oder Modernisierungspotenzial',
              'Vermieter, Verwaltungen und institutionelle Bestandshalter',
              'Unternehmen, bei denen Energie einen signifikanten Kostenhebel darstellt',
            ],
          },
          {
            title: 'Ihr Nutzen',
            items: [
              'Eine zusammenhängende Einschätzung – statt Tarif-Chaos aus vielen Quellen',
              'Kommunikation auf Augenhöhe: fachlich präzise, ohne unnötiges Jargon',
              'Klare nächste Schritte – frei von Kaufanreizen und verstecktem Upselling',
            ],
          },
        ]}
      />
    </TopicLeadShell>
  );
}
