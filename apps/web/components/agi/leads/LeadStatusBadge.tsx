import type { LeadStatus } from '@elo/core';

const TONE: Record<LeadStatus, 'cyan' | 'success' | 'warning' | 'critical' | 'gold' | 'blue' | 'neutral'> = {
  Neu: 'cyan',
  'Zu prüfen': 'neutral',
  Priorisiert: 'cyan',
  'Heute anrufen': 'critical',
  Angerufen: 'blue',
  'Nicht erreicht': 'warning',
  'Rückruf geplant': 'warning',
  'Unterlagen angefordert': 'gold',
  'Rechnung erhalten': 'gold',
  'Beratung durchgeführt': 'blue',
  'Angebot vorbereitet': 'gold',
  'Angebot gesendet': 'gold',
  'Abschluss wahrscheinlich': 'success',
  Abgeschlossen: 'success',
  Verloren: 'neutral',
  Gesperrt: 'critical',
};

export function LeadStatusBadge({ status }: { status: LeadStatus }) {
  const tone = TONE[status] ?? 'neutral';
  return (
    <span className="ops-pill" data-tone={tone === 'neutral' ? undefined : tone}>
      {status}
    </span>
  );
}
