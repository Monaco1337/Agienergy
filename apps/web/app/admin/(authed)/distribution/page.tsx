import { getStorage } from '@elo/storage';
import { DistributionCenter } from '@/components/agi/distribution/DistributionCenter';
import { requireRole } from '@/lib/agi/permissions';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Distribution · AGI Operations' };

export default async function DistributionPage({
  searchParams,
}: {
  searchParams: Promise<{ routed?: string }>;
}) {
  await requireRole(['admin', 'sales']);
  const sp = await searchParams;
  const storage = getStorage();
  const [unassigned, partners, allLeads] = await Promise.all([
    storage.listLeads({ unassigned: true }),
    storage.listPartners(),
    storage.listLeads(),
  ]);

  // Sortierung: Hot zuerst, dann Score absteigend, dann Eingang
  const sortedUnassigned = [...unassigned].sort((a, b) => {
    const colorRank = (c: typeof a.leadColor) =>
      ({ red: 0, orange: 1, yellow: 2, blue: 3, gray: 4, black: 5 })[c] ?? 99;
    const cr = colorRank(a.leadColor) - colorRank(b.leadColor);
    if (cr !== 0) return cr;
    if (a.leadScore !== b.leadScore) return b.leadScore - a.leadScore;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
  const sortedPartners = [...partners].sort((a, b) => {
    const sr = ['active', 'paused', 'full', 'inactive'].indexOf(a.status) -
      ['active', 'paused', 'full', 'inactive'].indexOf(b.status);
    if (sr !== 0) return sr;
    return a.name.localeCompare(b.name, 'de');
  });

  const routedCount = sp.routed ? Number(sp.routed) : 0;

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="text-[11px] uppercase tracking-[0.18em] text-[var(--ops-muted)]">
            Operations · Distribution
          </div>
          <h1 className="font-display text-[28px] sm:text-[32px] tracking-[-0.015em] text-[var(--ops-text)]">
            Lead-Verteilung
          </h1>
          <p className="mt-1 text-[13.5px] text-[var(--ops-text-2)] max-w-2xl">
            Verteile Leads per Drag &amp; Drop oder Klick an Vertriebspartner – inkl. Auto-Routing
            nach Region, Spezialgebiet und Auslastung.
          </p>
        </div>
        {routedCount > 0 && (
          <div className="ops-pill" data-tone="success">
            {routedCount} Leads automatisch verteilt
          </div>
        )}
      </header>

      <DistributionCenter unassigned={sortedUnassigned} partners={sortedPartners} allLeads={allLeads} />
    </div>
  );
}
