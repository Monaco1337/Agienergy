import type { LeadPayload } from '@/types/lead';

/**
 * Übermittelt einen Landing-Lead an die API. Der Lead wird serverseitig
 * validiert, bewertet (Scoring) und im Storage gespeichert, sodass er im
 * Admin-Cockpit erscheint.
 */
export async function submitLandingLead(payload: LeadPayload): Promise<void> {
  const res = await fetch('/api/leads', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    let message = 'Übermittlung fehlgeschlagen.';
    try {
      const data = (await res.json()) as { error?: string };
      if (data?.error) message = data.error;
    } catch {
      // Antwort ohne JSON – Standardmeldung beibehalten.
    }
    throw new Error(message);
  }
}
