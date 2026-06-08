export type AuditAction =
  | 'lead.created'
  | 'lead.updated'
  | 'lead.status_changed'
  | 'lead.note_added'
  | 'lead.contact_logged'
  | 'lead.consent_updated'
  | 'lead.assigned'
  | 'lead.unassigned'
  | 'lead.deleted'
  | 'lead.closed'
  | 'lead.lost'
  | 'partner.created'
  | 'partner.updated'
  | 'partner.suspended'
  | 'partner.reactivated'
  | 'partner.deleted'
  | 'task.created'
  | 'task.updated'
  | 'task.completed'
  | 'task.deleted'
  | 'deal.reported'
  | 'deal.confirmed'
  | 'deal.rejected'
  | 'deal.cancelled'
  | 'commission.created'
  | 'commission.approved'
  | 'commission.paid'
  | 'commission.rejected'
  | 'research.created'
  | 'research.updated'
  | 'research.converted_to_lead'
  | 'import.batch'
  | 'auth.login_success'
  | 'auth.login_failed'
  | 'auth.logout'
  | 'experiment.created'
  | 'experiment.stopped'
  | 'settings.updated';

export interface AuditEntry {
  id: string;
  createdAt: string;
  actorId: string;
  actorRole: 'admin' | 'sales' | 'partner' | 'viewer' | 'system' | 'anonymous';
  action: AuditAction;
  entity:
    | 'lead'
    | 'partner'
    | 'task'
    | 'deal'
    | 'commission'
    | 'research'
    | 'user'
    | 'import'
    | 'experiment'
    | 'settings'
    | 'auth';
  entityId: string;
  diff?: Record<string, { from: unknown; to: unknown }>;
  ipHash?: string;
  ua?: string;
  requestId?: string;
}
