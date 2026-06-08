'use client';

import { useTransition } from 'react';
import Link from 'next/link';
import type { Task, TaskStatus, Lead, Partner } from '@elo/core';
import { updateTaskStatusAction, deleteTaskAction } from '@/app/actions/taskMutations';

const COLUMNS: { id: TaskStatus; label: string; tone: 'cyan' | 'critical' | 'gold' | 'warning' | 'success' }[] = [
  { id: 'open', label: 'Offen', tone: 'cyan' },
  { id: 'today', label: 'Heute', tone: 'critical' },
  { id: 'in_progress', label: 'In Arbeit', tone: 'gold' },
  { id: 'waiting', label: 'Wartet', tone: 'warning' },
  { id: 'done', label: 'Erledigt', tone: 'success' },
];

const PRIO_TONE = {
  urgent: 'critical',
  high: 'warning',
  normal: 'cyan',
  low: 'neutral',
} as const;

const KIND_LABEL: Record<Task['kind'], string> = {
  call: '📞 Anruf',
  callback: '↩ Rückruf',
  email: '✉ E-Mail',
  whatsapp: '💬 WhatsApp',
  meeting: '👥 Termin',
  document: '📄 Dokument',
  other: '· Sonstiges',
};

function fmtDue(iso?: string): string | null {
  if (!iso) return null;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleString('de-DE', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' });
}

interface Props {
  tasks: Task[];
  leadById: Record<string, Lead>;
  partnerById: Record<string, Partner>;
  redirectTo?: string;
}

export function TaskBoard({ tasks, leadById, partnerById, redirectTo = '/admin/aufgaben' }: Props) {
  const [pending, startTransition] = useTransition();

  function moveTask(id: string, status: TaskStatus) {
    const fd = new FormData();
    fd.set('id', id);
    fd.set('status', status);
    fd.set('redirectTo', redirectTo);
    startTransition(() => {
      void updateTaskStatusAction(fd);
    });
  }

  function removeTask(id: string) {
    const fd = new FormData();
    fd.set('id', id);
    fd.set('redirectTo', redirectTo);
    startTransition(() => {
      void deleteTaskAction(fd);
    });
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4">
      {COLUMNS.map((col) => {
        const colTasks = tasks.filter((t) => t.status === col.id);
        return (
          <section
            key={col.id}
            className="ops-card p-3 min-h-[260px]"
            onDragOver={(e) => {
              e.preventDefault();
              e.dataTransfer.dropEffect = 'move';
            }}
            onDrop={(e) => {
              e.preventDefault();
              const id = e.dataTransfer.getData('text/task-id');
              if (id) moveTask(id, col.id);
            }}
          >
            <header className="flex items-center justify-between gap-2 px-1 pb-2 border-b border-[var(--ops-border)]">
              <div className="flex items-center gap-2">
                <span className="ops-pill" data-tone={col.tone}>
                  {col.label}
                </span>
                <span className="text-[11.5px] text-[var(--ops-muted)] tabular-nums">{colTasks.length}</span>
              </div>
            </header>

            <ul className="mt-3 space-y-2">
              {colTasks.length === 0 && (
                <li className="text-[12px] text-[var(--ops-muted)] py-6 text-center">leer</li>
              )}
              {colTasks.map((t) => {
                const lead = t.leadId ? leadById[t.leadId] : undefined;
                const partner = t.partnerId ? partnerById[t.partnerId] : undefined;
                const due = fmtDue(t.dueAt);
                return (
                  <li key={t.id}>
                    <article
                      draggable
                      onDragStart={(e) => {
                        e.dataTransfer.setData('text/task-id', t.id);
                        e.dataTransfer.effectAllowed = 'move';
                      }}
                      className="ops-card ops-draggable p-3"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <div className="text-[13.5px] font-semibold text-[var(--ops-text)] truncate">
                            {t.title}
                          </div>
                          <div className="mt-0.5 text-[11px] text-[var(--ops-muted)]">
                            {KIND_LABEL[t.kind]}
                            {due && <> · Fällig {due}</>}
                          </div>
                        </div>
                        <span className="ops-pill" data-tone={PRIO_TONE[t.priority] === 'neutral' ? undefined : PRIO_TONE[t.priority]}>
                          {t.priority}
                        </span>
                      </div>

                      {t.description && (
                        <p className="mt-2 text-[12px] text-[var(--ops-text-2)] line-clamp-2">{t.description}</p>
                      )}

                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {lead && (
                          <Link
                            href={`/admin/leads/${lead.id}`}
                            className="text-[11px] px-1.5 py-0.5 rounded-md border border-[var(--ops-border)] text-[var(--ops-text-2)] hover:text-[var(--ops-cyan)] hover:border-[rgba(54,230,208,0.4)] truncate max-w-[200px]"
                            title={`${lead.firstName} ${lead.lastName}`}
                          >
                            {lead.firstName} {lead.lastName}
                          </Link>
                        )}
                        {partner && (
                          <span className="text-[11px] px-1.5 py-0.5 rounded-md bg-white/[0.04] text-[var(--ops-text-2)] truncate max-w-[180px]">
                            {partner.name}
                          </span>
                        )}
                      </div>

                      <div className="mt-3 flex items-center justify-between gap-2">
                        <div className="flex gap-1">
                          {COLUMNS.filter((c) => c.id !== t.status).slice(0, 3).map((c) => (
                            <button
                              key={c.id}
                              type="button"
                              onClick={() => moveTask(t.id, c.id)}
                              disabled={pending}
                              className="text-[10.5px] px-2 h-6 rounded-md border border-[var(--ops-border)] hover:border-[rgba(54,230,208,0.4)] hover:text-[var(--ops-cyan)] text-[var(--ops-text-2)]"
                            >
                              → {c.label}
                            </button>
                          ))}
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            if (confirm('Aufgabe löschen?')) removeTask(t.id);
                          }}
                          disabled={pending}
                          className="text-[11px] text-[var(--ops-muted)] hover:text-[var(--ops-critical)]"
                        >
                          Löschen
                        </button>
                      </div>
                    </article>
                  </li>
                );
              })}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
