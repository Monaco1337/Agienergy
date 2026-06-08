import type { Brand } from './lead';
import type { DealId } from './deal';
import type { PartnerId } from './partner';

export type CommissionId = Brand<string, 'CommissionId'>;

export type CommissionStatus = 'pending' | 'approved' | 'paid' | 'rejected' | 'cancelled';

export interface Commission {
  id: CommissionId;
  createdAt: string;
  updatedAt: string;

  dealId: DealId;
  partnerId: PartnerId;

  /** Betrag in EUR. */
  amount: number;
  /** Optionaler ISO-Code (Default EUR). */
  currency?: string;

  status: CommissionStatus;

  dueAt?: string;
  approvedAt?: string;
  paidAt?: string;

  notes?: string;

  approvedBy?: string;
}
