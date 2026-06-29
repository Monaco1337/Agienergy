import type { Metadata } from 'next';
import { Suspense } from 'react';
import { Header } from '@/components/landing/Header';
import { Footer } from '@/components/landing/Footer';
import { EnergyCheckWizard } from '@/components/funnel/EnergyCheckWizard';
import { jsonLdScriptProps, serviceSchema } from '@/lib/seoSchemas';

const PATH = '/energiecheck';

export const metadata: Metadata = {
  title: 'Energie-Check starten – persönliche Prüfung in wenigen Schritten',
  description:
    'Starten Sie den persönlichen Energie-Check für Strom, Gas, Photovoltaik oder Gewerbe. Verständlich, unverbindlich, DSGVO-konform.',
  alternates: { canonical: PATH },
};

function WizardFallback() {
  return (
    <div className="mx-auto max-w-2xl px-5 py-20 text-center text-[15px] text-muted">
      Energie-Check wird geladen…
    </div>
  );
}

export default function EnergyCheckPage() {
  return (
    <>
      <script {...jsonLdScriptProps(serviceSchema({
        path: PATH,
        name: 'Persönlicher Energie-Check',
        description:
          'Geführter Energie-Check für Strom, Gas, Photovoltaik und Gewerbe – mit persönlicher Rückmeldung.',
        serviceType: 'Energie-Check',
      }))} />
      <Header />
      <main className="min-h-[60vh]">
        <Suspense fallback={<WizardFallback />}>
          <EnergyCheckWizard />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
