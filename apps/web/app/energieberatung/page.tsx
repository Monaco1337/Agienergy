import type { Metadata } from 'next';
import { Header } from '@/components/landing/Header';
import { Footer } from '@/components/landing/Footer';
import { CITIES } from '@/data/germanCities';
import { breadcrumbSchema, jsonLdScriptProps } from '@/lib/seoSchemas';
import { CitiesIndexInteractive } from '@/components/landing/CitiesIndexInteractive';

const PATH = '/energieberatung';

export const metadata: Metadata = {
  title: 'Energieberatung in Deutschland – persönlich, alle Städte',
  description:
    'Persönliche Energieberatung für Strom, Gas und Photovoltaik in über 100 deutschen Städten. Postleitzahlen-genaue Prüfung – ohne automatische Vertragsumstellung.',
  alternates: { canonical: PATH },
  openGraph: {
    type: 'website',
    title: 'Energieberatung in ganz Deutschland',
    description:
      'Persönliche Energieberatung in über 100 Städten – verständlich und ergebnisoffen.',
    url: PATH,
  },
};

export default function EnergieberatungIndexPage() {
  const totalCities = CITIES.length;
  const totalPopulation = CITIES.reduce((sum, c) => sum + c.population, 0);
  const regions = new Set(CITIES.map((c) => c.region)).size;

  return (
    <>
      <script
        {...jsonLdScriptProps(
          breadcrumbSchema([
            { name: 'Startseite', path: '/' },
            { name: 'Energieberatung', path: PATH },
          ]),
        )}
      />

      <Header />
      <main className="min-h-[70vh] bg-softWhite">
        {/* Premium-Hero */}
        <section className="relative overflow-hidden">
          <div
            className="pointer-events-none absolute -top-32 right-1/4 size-[640px] rounded-full opacity-40"
            style={{
              background:
                'radial-gradient(closest-side, rgba(57,216,232,0.18), transparent 70%)',
              filter: 'blur(60px)',
            }}
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -bottom-20 left-1/4 size-[520px] rounded-full opacity-30"
            style={{
              background:
                'radial-gradient(closest-side, rgba(30,168,255,0.14), transparent 70%)',
              filter: 'blur(60px)',
            }}
            aria-hidden
          />

          <div className="relative mx-auto max-w-5xl px-5 lg:px-8 pt-[calc(env(safe-area-inset-top)+var(--agi-header-row)+72px)] sm:pt-[calc(env(safe-area-inset-top)+var(--agi-header-row)+96px)] pb-10">
            <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-energyGreen/90">
              Energieberatung Deutschland
            </p>
            <h1 className="mt-3 font-display text-[32px] sm:text-[44px] lg:text-[52px] font-semibold text-navy leading-[1.05] tracking-tight">
              Persönliche Energieberatung.<br />
              <span className="text-slate">In Ihrer Stadt.</span>
            </h1>
            <p className="mt-5 max-w-2xl text-[16px] sm:text-[17px] text-slate leading-[1.7]">
              Über {totalCities} deutsche Städte mit eigener Energie-Übersicht:
              regionale Netzentgelte, lokale Versorgerlandschaft,
              postleitzahlen-genauer Tarif-Check. Wählen Sie Ihre Stadt – wir melden
              uns persönlich.
            </p>

            {/* Trust-Statistik */}
            <dl className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4">
              <Stat
                label="Städte mit Stadt-Seite"
                value={totalCities.toLocaleString('de-DE')}
              />
              <Stat
                label="Bundesländer abgedeckt"
                value={regions.toString()}
              />
              <Stat
                label="Einwohner im Versorgungsgebiet"
                value={`${Math.round(totalPopulation / 1_000_000)} Mio.+`}
              />
              <Stat label="Automatische Tarifwechsel" value="0" highlight />
            </dl>
          </div>
        </section>

        <CitiesIndexInteractive cities={CITIES} />
      </main>
      <Footer />
    </>
  );
}

function Stat({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="rounded-eloLg border border-borderLight bg-white/80 backdrop-blur-sm px-4 py-3.5">
      <dt className="text-[11px] font-semibold tracking-[0.16em] uppercase text-slate/70">
        {label}
      </dt>
      <dd
        className={`mt-1 font-display text-[22px] sm:text-[26px] font-semibold tracking-tight ${
          highlight ? 'text-energyGreen' : 'text-navy'
        }`}
      >
        {value}
      </dd>
    </div>
  );
}
