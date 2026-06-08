import type { Lead, Partner } from '@elo/core';
import { getStorage } from '@elo/storage';
import { requireSession, isAdminRole, isPartnerRole, getCurrentPartnerId } from '@/lib/agi/permissions';
import { TaskBoard } from '@/components/agi/tasks/TaskBoard';
import { createTaskAction } from '@/app/actions/taskMutations';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Aufgaben · AGI Operations' };

const inputCls =
  'w-full h-10 px-3 rounded-lg bg-white/[0.04] border border-[var(--ops-border)] text-[var(--ops-text)] placeholder:text-[var(--ops-muted)] focus:outline-none focus:border-[rgba(54,230,208,0.45)] focus:ring-2 focus:ring-[rgba(54,230,208,0.15)] text-[13.5px]';

export default async function TasksPage() {
  const session = await requireSession();
  const storage = getStorage();
  const partnerId = await getCurrentPartnerId(session);

  const filter = isPartnerRole(session.role)
    ? partnerId
      ? { partnerId: partnerId as never }
      : { ownerId: session.userId }
    : {};
  const [tasks, leads, partners] = await Promise.all([
    storage.listTasks(filter),
    storage.listLeads(isPartnerRole(session.role) && partnerId ? { assignedPartnerId: partnerId } : {}),
    isAdminRole(session.role) ? storage.listPartners() : Promise.resolve([]),
  ]);

  const leadById: Record<string, Lead> = {};
  for (const l of leads) leadById[l.id] = l;
  const partnerById: Record<string, Partner> = {};
  for (const p of partners) partnerById[p.id] = p;

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="text-[11px] uppercase tracking-[0.18em] text-[var(--ops-muted)]">Workflow</div>
          <h1 className="font-display text-[28px] sm:text-[32px] tracking-[-0.015em] text-[var(--ops-text)]">
            Aufgaben
          </h1>
          <p className="mt-1 text-[13.5px] text-[var(--ops-text-2)] max-w-2xl">
            Operations-Board: Was steht heute an, was wartet, was ist erledigt.
          </p>
        </div>
        <details className="ops-card p-4 w-full sm:w-auto">
          <summary className="cursor-pointer text-[13px] font-semibold text-[var(--ops-text)]">
            + Neue Aufgabe
          </summary>
          <form action={createTaskAction} className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
            <input name="title" required placeholder="Titel" className={`${inputCls} sm:col-span-2`} />
            <select name="kind" defaultValue="call" className={inputCls}>
              <option value="call" className="bg-[var(--ops-card)]">Anruf</option>
              <option value="callback" className="bg-[var(--ops-card)]">Rückruf</option>
              <option value="email" className="bg-[var(--ops-card)]">E-Mail</option>
              <option value="whatsapp" className="bg-[var(--ops-card)]">WhatsApp</option>
              <option value="meeting" className="bg-[var(--ops-card)]">Termin</option>
              <option value="document" className="bg-[var(--ops-card)]">Dokument</option>
              <option value="other" className="bg-[var(--ops-card)]">Sonstiges</option>
            </select>
            <select name="priority" defaultValue="normal" className={inputCls}>
              <option value="urgent" className="bg-[var(--ops-card)]">Urgent</option>
              <option value="high" className="bg-[var(--ops-card)]">Hoch</option>
              <option value="normal" className="bg-[var(--ops-card)]">Normal</option>
              <option value="low" className="bg-[var(--ops-card)]">Niedrig</option>
            </select>
            <select name="leadId" defaultValue="" className={inputCls}>
              <option value="" className="bg-[var(--ops-card)]">Kein Lead</option>
              {leads.slice(0, 50).map((l) => (
                <option key={l.id} value={l.id} className="bg-[var(--ops-card)]">
                  {l.firstName} {l.lastName} · {l.postalCode}
                </option>
              ))}
            </select>
            <input name="dueAt" type="datetime-local" className={inputCls} />
            <textarea
              name="description"
              rows={2}
              placeholder="Beschreibung (optional)"
              className={`${inputCls} h-auto py-2 leading-snug resize-none sm:col-span-2`}
            />
            <input type="hidden" name="redirectTo" value="/admin/aufgaben" />
            <button type="submit" className="ops-cta h-10 rounded-lg sm:col-span-2">
              Aufgabe anlegen
            </button>
          </form>
        </details>
      </header>

      <TaskBoard tasks={tasks} leadById={leadById} partnerById={partnerById} />
    </div>
  );
}
