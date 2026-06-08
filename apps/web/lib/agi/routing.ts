import type { Lead, LeadCategory, Partner, PartnerSpecialty } from '@elo/core';

/**
 * Mappt Lead-Eigenschaften auf eine `LeadCategory` (Top-Level).
 * Wenn `lead.category` bereits gesetzt ist, hat sie Vorrang.
 */
export function leadCategory(lead: Lead): LeadCategory {
  if (lead.category) return lead.category;
  if (lead.customerType === 'business') return 'gewerbe';
  if (lead.interests.includes('photovoltaik')) return 'solar';
  if (lead.interests.includes('gas')) return 'gas';
  if (lead.interests.includes('strom') || lead.interests.includes('strom_gas')) return 'strom';
  return 'strom';
}

function categoryToSpecialties(c: LeadCategory): PartnerSpecialty[] {
  switch (c) {
    case 'strom':
      return ['strom', 'strom_gas'];
    case 'gas':
      return ['gas', 'strom_gas'];
    case 'solar':
      return ['photovoltaik'];
    case 'gewerbe':
      return ['gewerbe'];
  }
}

export interface PartnerLoad {
  partner: Partner;
  /** Aktuell zugewiesene, noch nicht abgeschlossene Leads. */
  activeLeads: number;
  /** Anteil 0..1 der genutzten Kapazität. */
  utilization: number;
}

export interface RoutingCandidate extends PartnerLoad {
  score: number;
  reasons: string[];
}

export interface RoutingDecision {
  partnerId: string | null;
  reasons: string[];
  candidates: RoutingCandidate[];
}

/** Aktive Leads pro Partner aus einer Lead-Liste berechnen. */
export function computePartnerLoad(partners: Partner[], leads: Lead[]): PartnerLoad[] {
  const counts = new Map<string, number>();
  for (const l of leads) {
    if (!l.assignedPartnerId) continue;
    if (l.status === 'Abgeschlossen' || l.status === 'Verloren' || l.status === 'Gesperrt') continue;
    counts.set(l.assignedPartnerId, (counts.get(l.assignedPartnerId) ?? 0) + 1);
  }
  return partners.map((p) => {
    const active = counts.get(p.id) ?? 0;
    const utilization = p.capacity > 0 ? Math.min(1, active / p.capacity) : 0;
    return { partner: p, activeLeads: active, utilization };
  });
}

interface RouteOptions {
  /** PLZ-Match minimal nötige Zeichen. */
  zipPrefixLength?: number;
}

/**
 * Wählt den besten Partner für einen Lead. Regeln:
 *  - nur `status: 'active'` Partner
 *  - PLZ-Präfix-Match bevorzugt (>= 2 Zeichen)
 *  - Spezialgebiet matcht Lead-Kategorie
 *  - Kapazität nicht überschritten (sonst Kandidat ausgeschlossen)
 *  - höhere Conversion-Auslastung (= weniger ausgelastet) bevorzugt
 *  - Hot Leads (rot/orange) an stärkere Partner (höheres routingWeight)
 *  - Round-Robin als Fallback (per Hash der Lead-ID)
 */
export function pickPartnerForLead(
  lead: Lead,
  partners: Partner[],
  load: PartnerLoad[],
  opts: RouteOptions = {},
): RoutingDecision {
  const zipLen = opts.zipPrefixLength ?? 2;
  const cat = leadCategory(lead);
  const wantedSpecialties = categoryToSpecialties(cat);
  const isHot = lead.leadColor === 'red' || lead.leadColor === 'orange';
  const loadById = new Map(load.map((l) => [l.partner.id, l] as const));

  const scored: RoutingCandidate[] = [];
  for (const p of partners) {
    if (p.status !== 'active') continue;
    const l = loadById.get(p.id);
    if (!l) continue;
    if (l.activeLeads >= p.capacity) continue;

    let score = 0;
    const reasons: string[] = [];

    const specialtyHit = p.specialties.some((s) => wantedSpecialties.includes(s));
    if (specialtyHit) {
      score += 40;
      reasons.push(`Spezialgebiet ${cat}`);
    }

    if (lead.postalCode && p.regionPrefixes.length > 0) {
      const zip = lead.postalCode.slice(0, zipLen);
      if (p.regionPrefixes.some((pref) => zip.startsWith(pref))) {
        score += 30;
        reasons.push(`Region ${zip}`);
      }
    }

    // Auslastung: weniger ausgelastet = mehr Punkte (max. 20)
    score += Math.round((1 - l.utilization) * 20);

    if (isHot) {
      const weight = p.routingWeight ?? 0;
      score += weight;
      if (weight > 0) reasons.push(`Hot-Lead → Top-Partner (+${weight})`);
    }

    scored.push({ ...l, score, reasons });
  }

  scored.sort((a, b) => b.score - a.score);

  // Wenn keine Punkte erzielt wurden (alle 0), Round-Robin per Hash
  if (scored.length === 0) {
    return { partnerId: null, reasons: ['Keine aktiven Partner mit freier Kapazität'], candidates: [] };
  }

  const top = scored[0]!;
  if (top.score === 0) {
    // Fallback Round-Robin
    const idx = simpleHash(lead.id) % scored.length;
    const fallback = scored[idx]!;
    return {
      partnerId: fallback.partner.id,
      reasons: ['Round-Robin Fallback'],
      candidates: scored,
    };
  }

  return { partnerId: top.partner.id, reasons: top.reasons, candidates: scored };
}

function simpleHash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}
