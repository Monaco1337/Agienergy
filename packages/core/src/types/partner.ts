import type { Brand } from './lead';

export type PartnerId = Brand<string, 'PartnerId'>;

export type PartnerStatus = 'active' | 'paused' | 'full' | 'inactive';

/**
 * Bereiche, die ein Partner abdeckt. Mappt auf Lead-Interests/Kategorien
 * (strom/gas/photovoltaik/strom_gas) und kennt zusätzlich `gewerbe` als
 * Quer-Spezialisierung für B2B-Leads.
 */
export type PartnerSpecialty = 'strom' | 'gas' | 'photovoltaik' | 'strom_gas' | 'gewerbe';

export interface Partner {
  id: PartnerId;
  createdAt: string;
  updatedAt: string;

  /** Anzeigename (Person oder Firma). */
  name: string;
  email: string;
  phone?: string;

  /** Optionale Verknüpfung zu einem `AdminUser` (Login-Konto). */
  userId?: string;

  /** PLZ-Präfixe, die der Partner bedient (z. B. ['10', '11', '12']). */
  regionPrefixes: string[];
  /** Frei lesbarer Region-Name (z. B. „Berlin / Brandenburg"). */
  regionLabel?: string;

  specialties: PartnerSpecialty[];

  /** Maximale Anzahl gleichzeitig zugewiesener Leads. */
  capacity: number;

  status: PartnerStatus;

  /** Kostencent-genaue Gewichtung für Routing (höher = bevorzugt). */
  routingWeight?: number;

  /** Demo-Marker, identisch zu Lead.isDemo. */
  isDemo?: boolean;
}
