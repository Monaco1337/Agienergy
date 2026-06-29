'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import type { GermanCity } from '@/data/germanCities';

interface Props {
  cities: GermanCity[];
}

const REGION_ORDER = [
  'Berlin',
  'Hamburg',
  'Bayern',
  'Nordrhein-Westfalen',
  'Baden-Württemberg',
  'Hessen',
  'Niedersachsen',
  'Sachsen',
  'Rheinland-Pfalz',
  'Schleswig-Holstein',
  'Sachsen-Anhalt',
  'Brandenburg',
  'Thüringen',
  'Bremen',
  'Mecklenburg-Vorpommern',
  'Saarland',
];

function normalize(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/ß/g, 'ss');
}

function formatPopulation(p: number): string {
  if (p >= 1_000_000) return `${(p / 1_000_000).toFixed(1)} Mio.`;
  if (p >= 1_000) return `${Math.round(p / 1000)}k`;
  return p.toString();
}

export function CitiesIndexInteractive({ cities }: Props) {
  const [query, setQuery] = useState('');
  const [activeRegion, setActiveRegion] = useState<string | null>(null);

  const regions = useMemo(() => {
    const set = new Set(cities.map((c) => c.region));
    return REGION_ORDER.filter((r) => set.has(r));
  }, [cities]);

  const top = useMemo(
    () => [...cities].sort((a, b) => b.population - a.population).slice(0, 12),
    [cities],
  );

  const filtered = useMemo(() => {
    const nq = normalize(query.trim());
    return cities.filter((c) => {
      if (activeRegion && c.region !== activeRegion) return false;
      if (!nq) return true;
      return (
        normalize(c.name).includes(nq) ||
        normalize(c.region).includes(nq) ||
        c.postalCodePrefix.startsWith(nq)
      );
    });
  }, [cities, query, activeRegion]);

  const grouped = useMemo(() => {
    const map = new Map<string, GermanCity[]>();
    for (const c of filtered) {
      const arr = map.get(c.region) ?? [];
      arr.push(c);
      map.set(c.region, arr);
    }
    for (const [r, arr] of map.entries()) {
      arr.sort((a, b) => b.population - a.population);
      map.set(r, arr);
    }
    return regions
      .filter((r) => map.has(r))
      .map((r) => ({ region: r, list: map.get(r) ?? [] }));
  }, [filtered, regions]);

  const isSearching = query.trim().length > 0;

  return (
    <>
      {/* Suche + Region-Filter */}
      <section className="mx-auto max-w-5xl px-5 lg:px-8">
        <div className="rounded-eloLg border border-borderLight bg-white p-4 sm:p-5 shadow-soft">
          <label className="block">
            <span className="sr-only">Stadt suchen</span>
            <div className="relative">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate/60"
                aria-hidden
              >
                <circle cx="11" cy="11" r="7" />
                <path d="M21 21l-4.3-4.3" />
              </svg>
              <input
                type="search"
                inputMode="search"
                placeholder="Stadt oder PLZ-Anfang eingeben…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full h-12 sm:h-14 rounded-elo border border-borderLight bg-white pl-12 pr-4 text-[15px] sm:text-[16px] text-navy placeholder:text-slate/55 focus:border-energyGreen focus:outline-none focus:ring-2 focus:ring-energyGreen/30"
                aria-label="Stadt suchen"
              />
            </div>
          </label>
          <div className="mt-4 -mx-1 flex flex-wrap gap-1.5">
            <button
              type="button"
              onClick={() => setActiveRegion(null)}
              className={`rounded-full px-3 py-1.5 text-[13px] transition ${
                !activeRegion
                  ? 'bg-navy text-white'
                  : 'bg-paper2 text-slate hover:bg-borderLight'
              }`}
            >
              Alle Regionen
            </button>
            {regions.map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setActiveRegion(activeRegion === r ? null : r)}
                className={`rounded-full px-3 py-1.5 text-[13px] transition ${
                  activeRegion === r
                    ? 'bg-navy text-white'
                    : 'bg-paper2 text-slate hover:bg-borderLight'
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Top-Städte – nur wenn keine aktive Suche */}
      {!isSearching && !activeRegion ? (
        <section className="mx-auto max-w-5xl px-5 lg:px-8 mt-12">
          <div className="flex items-end justify-between flex-wrap gap-3">
            <h2 className="font-display text-[22px] sm:text-[26px] font-semibold text-navy tracking-tight">
              Top-Städte
            </h2>
            <p className="text-[13px] text-slate/80">
              Die {top.length} größten Märkte mit eigener Stadt-Seite
            </p>
          </div>
          <div className="mt-6 grid gap-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
            {top.map((c) => (
              <Link
                key={c.slug}
                href={`/energieberatung/${c.slug}`}
                className="group rounded-eloLg border border-borderLight bg-white p-4 sm:p-5 hover:border-energyGreen/60 hover:shadow-soft transition"
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate/70">
                    {c.region}
                  </span>
                  <span className="inline-flex items-center rounded-full bg-energyGreen/10 px-2 py-0.5 text-[11px] font-medium text-energyGreen">
                    {formatPopulation(c.population)}
                  </span>
                </div>
                <h3 className="mt-3 font-display text-[18px] sm:text-[20px] font-semibold text-navy group-hover:text-premiumBlue transition-colors">
                  {c.name}
                </h3>
                <p className="mt-1 text-[12.5px] text-slate/80">
                  PLZ-Bereich {c.postalCodePrefix}xxx
                </p>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      {/* Vollständige Listing */}
      <section className="mx-auto max-w-5xl px-5 lg:px-8 mt-14 pb-20 space-y-10">
        <div className="flex items-baseline justify-between flex-wrap gap-2">
          <h2 className="font-display text-[22px] sm:text-[26px] font-semibold text-navy tracking-tight">
            {isSearching || activeRegion ? 'Treffer' : 'Alle Städte nach Region'}
          </h2>
          <p className="text-[13px] text-slate/80">
            {filtered.length} {filtered.length === 1 ? 'Stadt' : 'Städte'}
          </p>
        </div>

        {grouped.length === 0 ? (
          <div className="rounded-eloLg border border-borderLight bg-white p-8 text-center">
            <p className="text-navy font-medium">Keine Stadt gefunden.</p>
            <p className="mt-2 text-[14px] text-slate">
              Ihre Stadt ist nicht dabei? Wir prüfen Ihren Standort gerne
              individuell.{' '}
              <Link
                href="/kontakt"
                className="text-premiumBlue underline underline-offset-4 hover:text-energyGreen"
              >
                Direkt Kontakt aufnehmen
              </Link>
              .
            </p>
          </div>
        ) : (
          grouped.map(({ region, list }) => (
            <section key={region}>
              <h3 className="font-display text-[18px] sm:text-[20px] font-semibold text-navy tracking-tight">
                {region}
                <span className="ml-2 text-[13px] font-normal text-slate/80">
                  · {list.length} {list.length === 1 ? 'Stadt' : 'Städte'}
                </span>
              </h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {list.map((c) => (
                  <li key={c.slug}>
                    <Link
                      href={`/energieberatung/${c.slug}`}
                      className="inline-flex items-center gap-2 rounded-full border border-borderLight bg-white px-3.5 py-1.5 text-[13.5px] text-navy hover:border-energyGreen/60 transition"
                    >
                      {c.name}
                      <span className="text-[11px] text-slate/70">
                        {formatPopulation(c.population)}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))
        )}

        {/* CTA wenn nichts passt */}
        <div className="rounded-eloLg border border-borderLight bg-gradient-to-br from-white to-paper2 p-6 sm:p-8 shadow-soft">
          <h3 className="font-display text-[20px] sm:text-[22px] font-semibold text-navy tracking-tight">
            Ihre Stadt nicht dabei?
          </h3>
          <p className="mt-2 text-[15px] text-slate leading-[1.7] max-w-2xl">
            Wir beraten deutschlandweit – auch in kleineren Gemeinden. Schreiben
            Sie uns kurz Ihre PLZ, wir melden uns persönlich zurück.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/#hero"
              className="inline-flex h-11 items-center justify-center rounded-elo bg-gradient-to-br from-energyGreen to-premiumBlue px-6 text-[14.5px] font-semibold text-white shadow-lift hover:shadow-premium transition"
            >
              Energie-Check starten
            </Link>
            <Link
              href="/kontakt"
              className="inline-flex h-11 items-center justify-center rounded-elo border border-borderLight bg-white px-5 text-[14.5px] font-medium text-navy hover:bg-paper2 transition"
            >
              Kontakt aufnehmen
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
