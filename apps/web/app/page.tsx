import { Header } from '@/components/landing/Header';
import { EnergyHero } from '@/components/landing/EnergyHero';
import { ProblemSection } from '@/components/landing/ProblemSection';
import { ProcessSection } from '@/components/landing/ProcessSection';
import { CategorySection } from '@/components/landing/CategorySection';
import { ConciergeSection } from '@/components/landing/ConciergeSection';
import { AntiScamSection } from '@/components/landing/AntiScamSection';
import { StructuredAuditSection } from '@/components/landing/StructuredAuditSection';
import { FaqSection } from '@/components/landing/FaqSection';
import { FinalCta } from '@/components/landing/FinalCta';
import { Footer } from '@/components/landing/Footer';
import { StickyMobileCta } from '@/components/landing/StickyMobileCta';
import { personalize } from '@/lib/personalize';
import { energyLandingContent } from '@/data/energyLandingContent';
import type { LeadCategory } from '@/types/lead';

interface PageProps {
  searchParams: Promise<{
    for?: string;
    utm_source?: string;
    utm_campaign?: string;
    trick?: string;
    energietrick?: string;
    fromInvoice?: string;
    category?: string;
  }>;
}

function categoryFromQuery(q: string | undefined): LeadCategory | null {
  if (!q) return null;
  const v = q.toLowerCase();
  if (v === 'strom' || v === 'gas' || v === 'solar' || v === 'gewerbe') return v;
  return null;
}

export default async function HomePage({ searchParams }: PageProps) {
  const sp = await searchParams;
  const p = personalize({
    for: sp.for ?? null,
    utm_source: sp.utm_source ?? null,
    utm_campaign: sp.utm_campaign ?? null,
  });

  const emphasizeForm =
    sp.trick === '1' || sp.energietrick === '1' || sp.fromInvoice === '1' || sp.trick === 'true';

  const defaultCategory = categoryFromQuery(sp.category);

  const headline =
    emphasizeForm || p.audience === 'unknown'
      ? energyLandingContent.hero.h1
      : p.heroHeadline;
  const subline = p.heroSubline;

  return (
    <>
      <Header />
      <main>
        <EnergyHero
          headline={headline}
          subline={subline}
          defaultCategory={defaultCategory}
          emphasizeForm={emphasizeForm}
        />
        <ProblemSection />
        <ProcessSection />
        <CategorySection />
        <ConciergeSection />
        <AntiScamSection />
        <StructuredAuditSection />
        <FaqSection />
        <FinalCta />
      </main>
      <Footer />
      <StickyMobileCta />
    </>
  );
}
