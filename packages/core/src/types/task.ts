import type { Brand, LeadId } from './lead';
import type { PartnerId } from './partner';

export type TaskId = Brand<string, 'TaskId'>;

export type TaskStatus = 'open' | 'today' | 'in_progress' | 'waiting' | 'done';

export type TaskPriority = 'low' | 'normal' | 'high' | 'urgent';

export type TaskKind = 'call' | 'callback' | 'email' | 'whatsapp' | 'meeting' | 'document' | 'other';

export interface Task {
  id: TaskId;
  createdAt: string;
  updatedAt: string;

  title: string;
  description?: string;

  kind: TaskKind;
  status: TaskStatus;
  priority: TaskPriority;

  leadId?: LeadId;
  partnerId?: PartnerId;

  /** Userid (admin oder partner.userId), der die Aufgabe besitzt. */
  ownerId: string;
  /** Userid des Erstellers. */
  createdBy: string;

  dueAt?: string;
  completedAt?: string;
}
