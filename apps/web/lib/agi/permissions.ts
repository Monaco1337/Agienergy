import { redirect } from 'next/navigation';
import type { Lead, Role, AdminUser } from '@elo/core';
import { getStorage } from '@elo/storage';
import type { Session } from '@/lib/auth/session';
import { getSession } from '@/lib/auth/session';

/**
 * Liefert die aktuelle Session oder leitet auf Login um.
 * Verwendet in Server-Actions und Server-Components, die einen
 * eingeloggten User voraussetzen.
 */
export async function requireSession(): Promise<Session> {
  const s = await getSession();
  if (!s) redirect('/admin/login');
  return s;
}

/**
 * Erzwingt eine bestimmte Rolle (oder eine aus einer Liste). Bei
 * Verstoß redirect auf /admin (Cockpit), nicht 403 – wir wollen das
 * UI nie hart abbrechen, sondern den User auf eine erlaubte Stelle
 * lenken.
 */
export async function requireRole(allowed: Role | Role[]): Promise<Session> {
  const s = await requireSession();
  const list = Array.isArray(allowed) ? allowed : [allowed];
  if (!list.includes(s.role)) redirect('/admin');
  return s;
}

export function isAdminRole(role: Role): boolean {
  return role === 'admin' || role === 'sales';
}

export function isPartnerRole(role: Role): boolean {
  return role === 'partner';
}

/** Liefert den hinterlegten `partnerId` für einen Login (`AdminUser.partnerId`). */
export async function getCurrentPartnerId(session: Session): Promise<string | null> {
  if (!isPartnerRole(session.role)) return null;
  const storage = getStorage();
  const user = await storage.getUser(session.userId as never);
  return user?.partnerId ?? null;
}

/**
 * Sichtbarkeits-Filter: Admin/Sales/Viewer sehen alle Leads, Partner
 * nur eigene. Wird zentral in Server-Actions/Pages verwendet, damit es
 * nirgends vergessen werden kann.
 */
export function canSeeLead(lead: Lead, session: Session, partnerId: string | null): boolean {
  if (isAdminRole(session.role) || session.role === 'viewer') return true;
  if (isPartnerRole(session.role)) return !!partnerId && lead.assignedPartnerId === partnerId;
  return false;
}

/** Lead aus Storage holen + Sichtbarkeitscheck. Wirft beim Verstoß. */
export async function loadVisibleLead(
  id: string,
  session: Session,
): Promise<Lead | null> {
  const storage = getStorage();
  const lead = await storage.getLead(id as never);
  if (!lead) return null;
  const partnerId = await getCurrentPartnerId(session);
  if (!canSeeLead(lead, session, partnerId)) return null;
  return lead;
}

/** Liefert den `AdminUser` für die aktuelle Session (oder null). */
export async function getSessionUser(session: Session): Promise<AdminUser | null> {
  const storage = getStorage();
  return storage.getUser(session.userId as never);
}
