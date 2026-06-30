import { NextResponse } from 'next/server';
import { z } from 'zod';
import {
  newId,
  newReferralCode,
  nowIso,
  CONSENT_TEXT,
  CONSENT_TEXT_VERSION,
  PRIVACY_POLICY_VERSION,
  hashIp,
  type Lead,
  type LeadId,
  type Interest,
  type CustomerType,
  type OwnsProperty,
  type ContactPreference,
} from '@elo/core';
import { getStorage } from '@elo/storage';
import { scoreLead } from '@elo/scoring';
import { rateLimit, getClientKeyFromHeaders } from '@/lib/rateLimit';
import { env } from '@/lib/env';

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
  filePathname: z.string().max(300).startsWith('leads/').optional(),
  consent: z.boolean().refine((v) => v === true, { message: 'Einwilligung erforderlich.' }),
  whatsappConsent: z.boolean().optional(),
  partnerForwardingConsent: z.boolean().optional(),
  consentVersion: z.string().max(120).optional(),
  privacyPolicyVersion: z.string().max(120).optional(),
  consentTextPrivacy: z.string().max(1000).optional(),
  consentTextWhatsapp: z.string().max(1000).optional(),
  consentTextPartnerForwarding: z.string().max(1000).optional(),
  pagePath: z.string().max(240).optional(),
  technicalRequestId: z.string().max(120).optional(),
  source: z.string().max(60).optional(),
  createdAt: z.string().max(40).optional(),
  /** Honeypot – muss leer bleiben */
  company: z.string().max(0).optional(),
  /** Optional: Empfehlungscode (aus Cookie oder Direkt-Link). */
  referredByCode: z.string().min(4).max(16).optional(),
  /** Optional: First-Touch-UTM-/Referrer-Daten aus Cookie. */
  utmSource: z.string().max(60).optional(),
  utmMedium: z.string().max(60).optional(),
  utmCampaign: z.string().max(60).optional(),
  utmTerm: z.string().max(60).optional(),
  utmContent: z.string().max(60).optional(),
  referrer: z.string().max(200).optional(),
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

function buildSourceDetails(base: string, referrer?: string): string {
  if (!referrer) return base;
  try {
    const u = new URL(referrer);
    return `${base} | ref:${u.hostname}`;
  } catch {
    return `${base} | ref:${referrer.slice(0, 60)}`;
  }
}

export async function POST(req: Request) {
  const ip = getClientKeyFromHeaders(req.headers);
  const ipHash = hashIp(ip, env.NEXTAUTH_SECRET);
  const userAgent = req.headers.get('user-agent')?.slice(0, 300) || undefined;
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
  const hasFile = Boolean(d.fileName || d.filePathname);
  const now = nowIso();

  const funnelInput = {
    source: 'website' as const,
    customerType: map.customerType,
    interests: map.interests,
    urgency: 'unknown' as const,
    hasInvoice: (hasFile ? 'upload_now' : 'unknown') as 'upload_now' | 'unknown',
    monthlyEnergyCosts: 'unknown' as const,
    ownsProperty: map.ownsProperty,
    contactPreference: (d.whatsappConsent ? 'whatsapp' : 'phone') as ContactPreference,
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

  // Empfehlungs-Resolving
  const storage = getStorage();
  let referredByLeadId: LeadId | undefined;
  if (d.referredByCode) {
    try {
      const ref = await storage.findLeadByReferralCode(d.referredByCode);
      if (ref) referredByLeadId = ref.id;
    } catch {
      /* nicht blockieren */
    }
  }
  const ownReferralCode = newReferralCode();

  const lead: Lead = {
    id,
    createdAt: now,
    updatedAt: now,
    source: referredByLeadId ? 'referral' : 'website',
    sourceDetails: buildSourceDetails(d.source ?? 'landingpage-hero', d.referrer),
    referralCode: ownReferralCode,
    ...(d.referredByCode ? { referredByCode: d.referredByCode.toUpperCase() } : {}),
    ...(referredByLeadId ? { referredByLeadId } : {}),
    ...(d.utmSource ? { utmSource: d.utmSource } : {}),
    ...(d.utmMedium ? { utmMedium: d.utmMedium } : {}),
    ...(d.utmCampaign ? { utmCampaign: d.utmCampaign } : {}),
    ...(d.utmTerm ? { utmTerm: d.utmTerm } : {}),
    ...(d.utmContent ? { utmContent: d.utmContent } : {}),

    customerType: map.customerType,
    interests: map.interests,
    urgency: 'unknown',
    hasInvoice: hasFile ? 'upload_now' : 'unknown',
    monthlyEnergyCosts: 'unknown' as const,
    annualConsumptionKwh: d.annualConsumptionKwh,
    ownsProperty: map.ownsProperty,
    contactPreference: d.whatsappConsent ? 'whatsapp' : 'phone',

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
      consentPrivacyAccepted: true,
      consentWhatsappAccepted: Boolean(d.whatsappConsent),
      consentPartnerForwardingAccepted: Boolean(d.partnerForwardingConsent),
      consentTextPrivacy: d.consentTextPrivacy ?? CONSENT_TEXT.privacy,
      consentTextWhatsapp: d.consentTextWhatsapp ?? CONSENT_TEXT.whatsapp,
      consentTextPartnerForwarding:
        d.consentTextPartnerForwarding ?? CONSENT_TEXT.partnerForwarding,
      consentVersion: d.consentVersion ?? CONSENT_TEXT_VERSION,
      privacyPolicyVersion: d.privacyPolicyVersion ?? PRIVACY_POLICY_VERSION,
      timestamp: now,
      formSource: 'landingpage-hero',
      pagePath: d.pagePath ?? '/',
      referrer: d.referrer,
      utmSource: d.utmSource,
      utmMedium: d.utmMedium,
      utmCampaign: d.utmCampaign,
      utmTerm: d.utmTerm,
      utmContent: d.utmContent,
      technicalRequestId: d.technicalRequestId ?? newId('req'),
      ipHash,
      userAgent,
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
            fileName: d.fileName ?? 'Rechnung',
            fileType: d.fileType ?? 'application/octet-stream',
            fileUrl: d.filePathname ?? '',
            category: 'invoice',
          },
        ]
      : [],
    isDemo: false,
  };

  try {
    await storage.createLead(lead);
  } catch {
    return NextResponse.json(
      { ok: false, error: 'Speichern fehlgeschlagen. Bitte später erneut.' },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true, id, referralCode: ownReferralCode });
}
