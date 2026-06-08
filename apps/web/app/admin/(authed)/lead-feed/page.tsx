import Link from 'next/link';
import { getStorage } from '@elo/storage';
import { requireRole } from '@/lib/agi/permissions';
import { LeadCard } from '@/components/agi/leads/LeadCard';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Lead Feed · AGI Operations' };

const FILTERS = [
  { value: 'unassigned', label: 'Unverteilt' },
  { value: 'hot', label: 'Hot (rot/orange)' },
  { value: 'today', label: 'Heute' },
  { value: 'all', label: 'Alle' },
] as const;
type FilterValue = (typeof FILTERS)[number]['value'];

export default async function LeadFeedPage({
  searchParams,
}: {
  searchParams: Promise<{ filter?: FilterValue }>;
}) {
  await requireRole(['admin', 'sales']);
  const sp = await searchParams;
  const filter: FilterValue = (sp.filter as FilterValue) ?? 'unassigned';
  const storage = getStorage();
  const [leads, partners] = await Promise.all([storage.listLeads(), storage.listPartners()]);
  const partnerById = Object.fromEntries(partners.map((p) => [p.id, p]));

  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  const filtered = leads
    .filter((l) => {
      if (filter === 'unassigned') return !l.assignedPartnerId;
      if (filter === 'hot') return l.leadColor === 'red' || l.leadColor === 'orange';
      if (filter === 'today') return new Date(l.createdAt) >= todayStart;
      return true;
    })
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="text-[11px] uppercase tracking-[0.18em] text-[var(--ops-muted)]">Operations</div>
          <h1 className="font-display text-[28px] sm:text-[32px] tracking-[-0.015em] text-[var(--ops-text)]">
            Lead Feed
          </h1>
          <p className="mt-1 text-[13.5px] text-[var(--ops-text-2)] max-w-2xl">
            Live-Eingang aller Leads – chronologisch, als Karten. Hot zuerst.
          </p>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {FILTERS.map((f) => (
            <Link
              key={f.value}
              href={`/admin/lead-feed?filter=${f.value}`}
              className="ops-pill"
              data-tone={f.value === filter ? 'cyan' : undefined}
            >
              {f.label}
            </Link>
          ))}
        </div>
      </header>

      {filtered.length === 0 ? (
        <div className="ops-card p-10 text-center text-[14px] text-[var(--ops-text-2)]">
          Keine Leads in diesem Filter.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
          {filtered.slice(0, 60).map((l) => (
            <LeadCard
              key={l.id}
              lead={l}
              partner={l.assignedPartnerId ? partnerById[l.assignedPartnerId] ?? null : null}
            />
          ))}
        </div>
      )}
      {filtered.length > 60 && (
        <p className="text-[12px] text-[var(--ops-muted)]">
          {filtered.length - 60} weitere Leads. Verfeinere den Filter, um mehr zu sehen.
        </p>
      )}
    </div>
  );
}
