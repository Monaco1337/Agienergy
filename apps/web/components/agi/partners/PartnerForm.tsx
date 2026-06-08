import type { Partner, PartnerSpecialty, PartnerStatus } from '@elo/core';
import { upsertPartnerAction } from '@/app/actions/partnerMutations';

const SPECIALTIES: { value: PartnerSpecialty; label: string }[] = [
  { value: 'strom', label: 'Strom' },
  { value: 'gas', label: 'Gas' },
  { value: 'photovoltaik', label: 'Photovoltaik' },
  { value: 'strom_gas', label: 'Strom + Gas' },
  { value: 'gewerbe', label: 'Gewerbe' },
];

const STATUSES: { value: PartnerStatus; label: string }[] = [
  { value: 'active', label: 'Aktiv' },
  { value: 'paused', label: 'Pausiert' },
  { value: 'full', label: 'Voll' },
  { value: 'inactive', label: 'Inaktiv' },
];

function Field({ label, children, hint }: { label: string; children: React.ReactNode; hint?: string }) {
  return (
    <label className="block">
      <span className="text-[11px] uppercase tracking-[0.14em] text-[var(--ops-muted)]">{label}</span>
      <div className="mt-1.5">{children}</div>
      {hint && <p className="mt-1 text-[11px] text-[var(--ops-muted)]">{hint}</p>}
    </label>
  );
}

const inputCls =
  'w-full h-10 px-3 rounded-lg bg-white/[0.04] border border-[var(--ops-border)] text-[var(--ops-text)] placeholder:text-[var(--ops-muted)] focus:outline-none focus:border-[rgba(54,230,208,0.45)] focus:ring-2 focus:ring-[rgba(54,230,208,0.15)]';

export function PartnerForm({ partner, redirectTo = '/admin/vertriebspartner' }: { partner?: Partner; redirectTo?: string }) {
  return (
    <form action={upsertPartnerAction} className="ops-card p-5 space-y-5">
      {partner && <input type="hidden" name="id" value={partner.id} />}
      <input type="hidden" name="redirectTo" value={redirectTo} />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Name / Firma">
          <input
            name="name"
            required
            defaultValue={partner?.name ?? ''}
            className={inputCls}
            placeholder="Max Müller / Energie GmbH"
          />
        </Field>
        <Field label="E-Mail">
          <input
            name="email"
            type="email"
            required
            defaultValue={partner?.email ?? ''}
            className={inputCls}
            placeholder="kontakt@..."
          />
        </Field>
        <Field label="Telefon">
          <input
            name="phone"
            type="tel"
            defaultValue={partner?.phone ?? ''}
            className={inputCls}
            placeholder="+49 ..."
          />
        </Field>
        <Field label="Region (Anzeige)">
          <input
            name="regionLabel"
            defaultValue={partner?.regionLabel ?? ''}
            className={inputCls}
            placeholder="z. B. Berlin / Brandenburg"
          />
        </Field>
        <Field
          label="PLZ-Präfixe"
          hint="Komma- oder leerzeichengetrennt, z. B. 10, 11, 12, 13"
        >
          <input
            name="regionPrefixes"
            defaultValue={partner?.regionPrefixes.join(', ') ?? ''}
            className={inputCls}
            placeholder="10, 11, 12"
          />
        </Field>
        <Field label="Kapazität (Leads parallel)">
          <input
            name="capacity"
            type="number"
            min={0}
            defaultValue={partner?.capacity ?? 20}
            className={inputCls}
          />
        </Field>
        <Field label="Routing-Gewicht" hint="Höher = bevorzugt bei Hot-Leads (0–100)">
          <input
            name="routingWeight"
            type="number"
            min={0}
            max={100}
            defaultValue={partner?.routingWeight ?? 0}
            className={inputCls}
          />
        </Field>
        <Field label="Status">
          <select name="status" defaultValue={partner?.status ?? 'active'} className={inputCls}>
            {STATUSES.map((s) => (
              <option key={s.value} value={s.value} className="bg-[var(--ops-card)]">
                {s.label}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <fieldset>
        <legend className="text-[11px] uppercase tracking-[0.14em] text-[var(--ops-muted)]">
          Spezialgebiete
        </legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {SPECIALTIES.map((s) => {
            const checked = partner?.specialties.includes(s.value) ?? false;
            return (
              <label
                key={s.value}
                className="inline-flex items-center gap-2 px-3 h-9 rounded-lg border border-[var(--ops-border)] bg-white/[0.03] hover:border-[rgba(54,230,208,0.32)] cursor-pointer text-[13px] text-[var(--ops-text)]"
              >
                <input
                  type="checkbox"
                  name="specialties"
                  value={s.value}
                  defaultChecked={checked}
                  className="accent-[var(--ops-cyan)]"
                />
                {s.label}
              </label>
            );
          })}
        </div>
      </fieldset>

      <div className="flex items-center gap-3 pt-2">
        <button type="submit" className="ops-cta h-10 px-5 rounded-lg">
          {partner ? 'Speichern' : 'Partner anlegen'}
        </button>
      </div>
    </form>
  );
}
