import Link from 'next/link';
import { requireRole } from '@/lib/agi/permissions';
import { PartnerForm } from '@/components/agi/partners/PartnerForm';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Neuer Partner · AGI Operations' };

export default async function NewPartnerPage() {
  await requireRole(['admin', 'sales']);
  return (
    <div className="space-y-6 max-w-3xl">
      <header>
        <Link
          href="/admin/vertriebspartner"
          className="text-[12px] text-[var(--ops-text-2)] hover:text-[var(--ops-cyan)]"
        >
          ← Vertriebspartner
        </Link>
        <h1 className="mt-2 font-display text-[26px] tracking-[-0.015em] text-[var(--ops-text)]">
          Neuer Vertriebspartner
        </h1>
        <p className="mt-1 text-[13.5px] text-[var(--ops-text-2)]">
          Lege Stammdaten, Region, Spezialgebiete und Kapazität fest. Auto-Routing nutzt diese Felder.
        </p>
      </header>
      <PartnerForm redirectTo="/admin/vertriebspartner" />
    </div>
  );
}
