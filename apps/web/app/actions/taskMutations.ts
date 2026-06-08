'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { newId, nowIso } from '@elo/core';
import type { Task, TaskId, TaskKind, TaskPriority, TaskStatus, LeadId, PartnerId } from '@elo/core';
import { getStorage } from '@elo/storage';
import { logAudit } from '@elo/audit';
import { requireSession, isAdminRole, getCurrentPartnerId } from '@/lib/agi/permissions';

const STATUSES: readonly TaskStatus[] = ['open', 'today', 'in_progress', 'waiting', 'done'];
const PRIORITIES: readonly TaskPriority[] = ['low', 'normal', 'high', 'urgent'];
const KINDS: readonly TaskKind[] = ['call', 'callback', 'email', 'whatsapp', 'meeting', 'document', 'other'];

const createSchema = z.object({
  title: z.string().min(2).max(200),
  description: z.string().max(2000).optional(),
  kind: z.enum(KINDS as readonly [TaskKind, ...TaskKind[]]).default('call'),
  priority: z.enum(PRIORITIES as readonly [TaskPriority, ...TaskPriority[]]).default('normal'),
  status: z.enum(STATUSES as readonly [TaskStatus, ...TaskStatus[]]).default('open'),
  leadId: z.string().optional(),
  partnerId: z.string().optional(),
  dueAt: z.string().optional(),
  redirectTo: z.string().optional(),
});

export async function createTaskAction(formData: FormData): Promise<void> {
  const parsed = createSchema.parse({
    title: formData.get('title'),
    description: formData.get('description') || undefined,
    kind: (formData.get('kind') as string) || 'call',
    priority: (formData.get('priority') as string) || 'normal',
    status: (formData.get('status') as string) || 'open',
    leadId: (formData.get('leadId') as string) || undefined,
    partnerId: (formData.get('partnerId') as string) || undefined,
    dueAt: (formData.get('dueAt') as string) || undefined,
    redirectTo: (formData.get('redirectTo') as string) || undefined,
  });
  const session = await requireSession();
  const storage = getStorage();
  const partnerId = parsed.partnerId ?? (await getCurrentPartnerId(session)) ?? undefined;

  const task: Task = {
    id: newId('tsk') as TaskId,
    createdAt: nowIso(),
    updatedAt: nowIso(),
    title: parsed.title,
    description: parsed.description,
    kind: parsed.kind,
    priority: parsed.priority,
    status: parsed.status,
    leadId: parsed.leadId ? (parsed.leadId as LeadId) : undefined,
    partnerId: partnerId ? (partnerId as PartnerId) : undefined,
    ownerId: session.userId,
    createdBy: session.userId,
    dueAt: parsed.dueAt && parsed.dueAt.length > 0 ? parsed.dueAt : undefined,
  };
  await storage.createTask(task);
  await logAudit({
    ctx: { actorId: session.userId, actorRole: session.role },
    action: 'task.created',
    entity: 'task',
    entityId: task.id,
  });
  revalidatePath('/admin', 'layout');
  if (parsed.redirectTo) redirect(parsed.redirectTo);
}

const updateStatusSchema = z.object({
  id: z.string().min(1),
  status: z.enum(STATUSES as readonly [TaskStatus, ...TaskStatus[]]),
  redirectTo: z.string().optional(),
});

export async function updateTaskStatusAction(formData: FormData): Promise<void> {
  const parsed = updateStatusSchema.parse({
    id: formData.get('id'),
    status: formData.get('status'),
    redirectTo: formData.get('redirectTo') || undefined,
  });
  const session = await requireSession();
  const storage = getStorage();
  const task = await storage.getTask(parsed.id as TaskId);
  if (!task) throw new Error('Aufgabe nicht gefunden.');

  // Partner darf nur eigene Aufgaben ändern
  if (!isAdminRole(session.role)) {
    const partnerId = await getCurrentPartnerId(session);
    if (task.ownerId !== session.userId && task.partnerId !== partnerId) {
      throw new Error('Kein Zugriff.');
    }
  }

  const updated = await storage.updateTask(task.id, {
    status: parsed.status,
    completedAt: parsed.status === 'done' ? nowIso() : undefined,
  });
  if (updated) {
    await logAudit({
      ctx: { actorId: session.userId, actorRole: session.role },
      action: parsed.status === 'done' ? 'task.completed' : 'task.updated',
      entity: 'task',
      entityId: task.id,
    });
  }
  revalidatePath('/admin', 'layout');
  if (parsed.redirectTo) redirect(parsed.redirectTo);
}

const deleteSchema = z.object({
  id: z.string().min(1),
  redirectTo: z.string().optional(),
});

export async function deleteTaskAction(formData: FormData): Promise<void> {
  const parsed = deleteSchema.parse({
    id: formData.get('id'),
    redirectTo: formData.get('redirectTo') || undefined,
  });
  const session = await requireSession();
  const storage = getStorage();
  const task = await storage.getTask(parsed.id as TaskId);
  if (!task) return;
  if (!isAdminRole(session.role) && task.ownerId !== session.userId) {
    throw new Error('Kein Zugriff.');
  }
  await storage.deleteTask(task.id);
  await logAudit({
    ctx: { actorId: session.userId, actorRole: session.role },
    action: 'task.deleted',
    entity: 'task',
    entityId: task.id,
  });
  revalidatePath('/admin', 'layout');
  if (parsed.redirectTo) redirect(parsed.redirectTo);
}
