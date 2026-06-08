import type { Brand, LeadId } from './lead';
import type { PartnerId } from './partner';

export type DealId = Brand<string, 'DealId'>;

export type DealStatus =
  | 'reported' // vom Partner gemeldet, ungeprüft
  | 'review' // Admin prüft
  | 'confirmed' // Vertrag bestätigt
  | 'rejected' // abgelehnt
  | 'cancelled'; // storniert (Widerruf etc.)

export type DealProduct = 'strom' | 'gas' | 'photovoltaik' | 'strom_gas' | 'gewerbe' | 'other';

export interface Deal {
  id: DealId;
  createdAt: string;
  updatedAt: string;

  leadId: LeadId;
  partnerId: PartnerId;

  product: DealProduct;
  productLabel?: string;

  status: DealStatus;

  /** Optionaler Vertragswert in EUR (Brutto). */
  value?: number;
  /** Optionaler erwarteter Provisionswert in EUR. */
  expectedCommission?: number;

  /** ISO-Datum des Vertragsabschlusses. */
  closedAt?: string;

  /** Kurze Begründung bei rejected/cancelled. */
  notes?: string;

  /** Userid des Melders (i. d. R. Partner). */
  reportedBy: string;
  /** Userid des Prüfers (Admin). */
  reviewedBy?: string;
}
