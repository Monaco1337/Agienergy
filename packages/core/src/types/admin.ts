import type { UserId } from './lead';

/**
 * Rollen-Hierarchie:
 *  - admin   : Vollzugriff (Distribution, Provisionen, Settings)
 *  - sales   : interner Vertriebsmitarbeiter (alle Leads)
 *  - partner : externer Vertriebspartner (sieht nur eigene Leads)
 *  - viewer  : reiner Lesezugriff
 */
export type Role = 'admin' | 'sales' | 'partner' | 'viewer';

export interface AdminUser {
  id: UserId;
  email: string;
  name: string;
  role: Role;
  passwordHash: string;
  createdAt: string;
  failedLoginCount: number;
  lockedUntil?: string;
  lastLoginAt?: string;
  /** Verknüpfung Login-Konto ↔ Vertriebspartner-Stammdaten. */
  partnerId?: string;
}
