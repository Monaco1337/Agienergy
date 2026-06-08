import { NextResponse } from 'next/server';
import { z } from 'zod';
import {
  newId,
  nowIso,
  CONSENT_TEXT_VERSION,
  type Lead,
  type LeadId,
  type Interest,
  type CustomerType,
  type OwnsProperty,
} from '@elo/core';
import { getStorage } from '@elo/storage';
import { scoreLead } from '@elo/scoring';
import { rateLimit, getClientKeyFromHeaders } from '@/lib/rateLimit';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const schema = z.object({
  category: z.enum(['strom', 'gas', 'solar', 'gewerbe']),
  name: z.string().trim().min(2).max(120),
  phone: z.string().trim().min(5).max(40),
  email: z.string().trim().email(),
  zip: z.string().trim().min(4).max(120),
  annualConsumptionKwh: z.number().int().positive().max(999_999).optional(),
  fileName: z.string().max(260).optional(),
  fileType: z.string().max(120).optional(),
  fileSize: z.number().nonnegative().optional(),
  consent: z.boolean().refine((v) => v === true, { message: 'Einwilligung erforderlich.' }),
  source: z.string().max(60).optional(),
  createdAt: z.string().max(40).optional(),
  /** Honeypot – muss leer bleiben */
  company: z.string().max(0).optional(),
});

const CATEGORY_MAP: Record<
  'strom' | 'gas' | 'solar' | 'gewerbe',
  { interests: Interest[]; customerType: CustomerType; ownsProperty: OwnsProperty }
> = {
  strom: { interests: ['strom'], customerType: 'unknown', ownsProperty: 'unknown' },
  gas: { interests: ['gas'], customerType: 'unknown', ownsProperty: 'unknown' },
  solar: { interests: ['photovoltaik'], customerType: 'home_owner', ownsProperty: 'yes' },
  gewerbe: { interests: ['strom_gas'], customerType: 'business', ownsProperty: 'business_property' },
};

function splitName(full: string): { firstName: string; lastName: string } {
  const parts = full.trim().split(/\s+/);
  if (parts.length === 1) return { firstName: parts[0]!, lastName: '' };
  return { firstName: parts[0]!, lastName: parts.slice(1).join(' ') };
}

function parseZip(raw: string): { postalCode: string; city?: string } {
  const m = raw.trim().match(/(\d{4,5})\s*(.*)$/);
  if (m) return { postalCode: m[1]!, city: m[2]?.trim() || undefined };
  return { postalCode: raw.trim() };
}

export async function POST(req: Request) {
  const ip = getClientKeyFromHeaders(req.headers);
  const rl = rateLimit(ip, 'lead');
  if (!rl.allowed) {
    return NextResponse.json(
      { ok: false, error: 'Zu viele Anfragen. Bitte später erneut.' },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Ungültige Anfrage.' }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: 'Validierung fehlgeschlagen.', fields: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  // Honeypot ausgefüllt → still als Erfolg quittieren, aber nicht speichern.
  if (parsed.data.company) {
    return NextResponse.json({ ok: true });
  }

  const d = parsed.data;
  const map = CATEGORY_MAP[d.category];
  const { firstName, lastName } = splitName(d.name);
  const { postalCode, city } = parseZip(d.zip);
  const hasFile = Boolean(d.fileName);
  const now = nowIso();

  const funnelInput = {
    source: 'website' as const,
    customerType: map.customerType,
    interests: map.interests,
    urgency: 'unknown' as const,
    hasInvoice: (hasFile ? 'upload_now' : 'unknown') as 'upload_now' | 'unknown',
    monthlyEnergyCosts: 'unknown' as const,
    ownsProperty: map.ownsProperty,
    contactPreference: 'phone' as const,
    firstName,
    lastName,
    phone: d.phone,
    email: d.email,
    postalCode,
    city,
    legalBasis: 'consent' as const,
  };

  const score = scoreLead(funnelInput);
  const id = newId('lead') as LeadId;

  const lead: Lead = {
    id,
    createdAt: now,
    updatedAt: now,
    source: 'website',
    sourceDetails: d.source ?? 'landingpage-hero',

    customerType: map.customerType,
    interests: map.interests,
    urgency: 'unknown',
    hasInvoice: hasFile ? 'upload_now' : 'unknown',
    monthlyEnergyCosts: 'unknown' as const,
    annualConsumptionKwh: d.annualConsumptionKwh,
    ownsProperty: map.ownsProperty,
    contactPreference: 'phone',

    firstName,
    lastName,
    phone: d.phone,
    email: d.email,
    postalCode,
    city,

    legalBasis: 'consent',
    consent: {
      contactConsent: true,
      privacyAccepted: true,
      consentTextVersion: CONSENT_TEXT_VERSION,
      consentTimestamp: now,
      source: d.source ?? 'landingpage-hero',
    },

    leadScore: score.score,
    leadColor: score.color,
    leadLabel: score.label,
    scoreReasons: score.reasons,
    recommendedAction: score.recommendedAction,

    status: 'Neu',
    notes: [],
    contactHistory: [],
    files: hasFile
      ? [
          {
            id: newId('file'),
            createdAt: now,
            fileName: d.fileName!,
            fileType: d.fileType ?? 'application/octet-stream',
            fileUrl: '',
            category: 'invoice',
          },
        ]
      : [],
    isDemo: false,
  };

  try {
    const storage = getStorage();
    await storage.createLead(lead);
  } catch {
    return NextResponse.json(
      { ok: false, error: 'Speichern fehlgeschlagen. Bitte später erneut.' },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true, id });
}
