import type {
  Lead,
  LeadId,
  LeadStatus,
  ResearchProspect,
  ResearchId,
  AuditEntry,
  AdminUser,
  UserId,
  FunnelEvent,
  Partner,
  PartnerId,
  PartnerStatus,
  Task,
  TaskId,
  TaskStatus,
  Deal,
  DealId,
  DealStatus,
  Commission,
  CommissionId,
  CommissionStatus,
} from '@elo/core';

export interface LeadFilter {
  colors?: Lead['leadColor'][];
  statuses?: LeadStatus[];
  customerTypes?: Lead['customerType'][];
  interests?: Lead['interests'][number][];
  source?: Lead['source'];
  postalCodePrefix?: string;
  search?: string;
  assignedTo?: string;
  /** Filtert auf einen bestimmten Vertriebspartner. */
  assignedPartnerId?: string;
  /** Wenn `true`, nur unverteilte Leads. */
  unassigned?: boolean;
  hasInvoice?: boolean;
}

export interface PartnerFilter {
  statuses?: PartnerStatus[];
  search?: string;
}

export interface TaskFilter {
  statuses?: TaskStatus[];
  ownerId?: string;
  partnerId?: PartnerId;
  leadId?: LeadId;
}

export interface DealFilter {
  statuses?: DealStatus[];
  partnerId?: PartnerId;
  leadId?: LeadId;
}

export interface CommissionFilter {
  statuses?: CommissionStatus[];
  partnerId?: PartnerId;
}

export interface StorageAdapter {
  // Leads
  createLead(lead: Lead): Promise<Lead>;
  updateLead(id: LeadId, patch: Partial<Lead>): Promise<Lead | null>;
  getLead(id: LeadId): Promise<Lead | null>;
  listLeads(filter?: LeadFilter): Promise<Lead[]>;
  deleteLead(id: LeadId): Promise<boolean>;
  findDuplicate(args: {
    email?: string;
    phone?: string;
    name?: string;
    postalCode?: string;
  }): Promise<Lead | null>;

  // Research
  createResearch(p: ResearchProspect): Promise<ResearchProspect>;
  updateResearch(id: ResearchId, patch: Partial<ResearchProspect>): Promise<ResearchProspect | null>;
  getResearch(id: ResearchId): Promise<ResearchProspect | null>;
  listResearch(): Promise<ResearchProspect[]>;

  // Audit
  appendAudit(entry: AuditEntry): Promise<void>;
  listAudit(limit?: number): Promise<AuditEntry[]>;

  // Users
  getUserByEmail(email: string): Promise<AdminUser | null>;
  getUser(id: UserId): Promise<AdminUser | null>;
  listUsers(): Promise<AdminUser[]>;
  upsertUser(user: AdminUser): Promise<AdminUser>;
  updateUser(id: UserId, patch: Partial<AdminUser>): Promise<AdminUser | null>;

  // Events
  appendEvent(event: FunnelEvent): Promise<void>;
  listEvents(limit?: number): Promise<FunnelEvent[]>;

  // Partner
  createPartner(p: Partner): Promise<Partner>;
  updatePartner(id: PartnerId, patch: Partial<Partner>): Promise<Partner | null>;
  getPartner(id: PartnerId): Promise<Partner | null>;
  listPartners(filter?: PartnerFilter): Promise<Partner[]>;
  deletePartner(id: PartnerId): Promise<boolean>;

  // Tasks
  createTask(t: Task): Promise<Task>;
  updateTask(id: TaskId, patch: Partial<Task>): Promise<Task | null>;
  getTask(id: TaskId): Promise<Task | null>;
  listTasks(filter?: TaskFilter): Promise<Task[]>;
  deleteTask(id: TaskId): Promise<boolean>;

  // Deals
  createDeal(d: Deal): Promise<Deal>;
  updateDeal(id: DealId, patch: Partial<Deal>): Promise<Deal | null>;
  getDeal(id: DealId): Promise<Deal | null>;
  listDeals(filter?: DealFilter): Promise<Deal[]>;

  // Commissions
  createCommission(c: Commission): Promise<Commission>;
  updateCommission(id: CommissionId, patch: Partial<Commission>): Promise<Commission | null>;
  getCommission(id: CommissionId): Promise<Commission | null>;
  listCommissions(filter?: CommissionFilter): Promise<Commission[]>;
}
