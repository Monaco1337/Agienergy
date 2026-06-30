'use server';

import { headers } from 'next/headers';
import { z } from 'zod';
import {
  CONSENT_TEXT,
  CONSENT_TEXT_VERSION,
  PRIVACY_POLICY_VERSION,
  hashIp,
  newId,
  newReferralCode,
  nowIso,
  schemas,
  type Lead,
  type LeadFunnelInput,
  type LeadId,
} from '@elo/core';
import { scoreLead } from '@elo/scoring';
import { getStorage } from '@elo/storage';
import { logAudit } from '@elo/audit';
import { getMailer, leadConfirmation, salesNotification } from '@elo/mail';
import { rateLimit, getClientKeyFromHeaders } from '@/lib/rateLimit';
import { isLikelyDisposableEmail, looksLikeBotSubmit } from '@/lib/security';
import { env } from '@/lib/env';

const payloadSchema = z.object({
  state: z.record(z.unknown()),
  consentTextVersion: z.string().min(1),
  privacyPolicyVersion: z.string().min(1).optional(),
  pagePath: z.string().max(240).optional(),
  technicalRequestId: z.string().max(120).optional(),
  submittedAtMs: z.number().int().nonnegative(),
  /** Hochgeladene Rechnung (Blob-Pfad + Metadaten, siehe /api/upload). */
  filePathname: z.string().max(300).startsWith('leads/').optional(),
  fileName: z.string().max(260).optional(),
  fileType: z.string().max(120).optional(),
  /** Optional: Empfehlungscode des werbenden Leads (aus /empfehlung/[code]). */
  referredByCode: z.string().min(4).max(16).optional(),
  /** First-Touch-UTM-Daten aus Client-Cookie (siehe UtmCookieSetter). */
  utmSource: z.string().max(60).optional(),
  utmMedium: z.string().max(60).optional(),
  utmCampaign: z.string().max(60).optional(),
  utmTerm: z.string().max(60).optional(),
  utmContent: z.string().max(60).optional(),
  referrer: z.string().max(200).optional(),
});

export interface SubmitResult {
  ok: boolean;
  error?: string;
  leadId?: string;
  /** Persoenlicher Empfehlungscode des soeben angelegten Leads. */
  referralCode?: string;
}

function asInterest(v: unknown): LeadFunnelInput['interests'] {
  const arr = Array.isArray(v) ? v : v ? [v] : [];
  const allowed = new Set(['strom', 'gas', 'photovoltaik', 'strom_gas', 'unknown']);
  const filtered = arr.filter((x): x is LeadFunnelInput['interests'][number] => typeof x === 'string' && allowed.has(x));
  return (filtered.length > 0 ? filtered : ['unknown']) as LeadFunnelInput['interests'];
}

function asEnum<T extends string>(v: unknown, fallback: T, allowed: readonly T[]): T {
  return typeof v === 'string' && (allowed as readonly string[]).includes(v) ? (v as T) : fallback;
}

function tryHostname(raw: string): string {
  try {
    return new URL(raw).hostname;
  } catch {
    return raw.slice(0, 60);
  }
}

export async function submitLead(formData: FormData): Promise<SubmitResult> {
  const h = await headers();
  const clientKey = getClientKeyFromHeaders(h);
  const userAgent = h.get('user-agent')?.slice(0, 300) || undefined;
  const ipHash = hashIp(clientKey, env.NEXTAUTH_SECRET);
  const rl = rateLimit(clientKey, 'funnel');
  if (!rl.allowed) return { ok: false, error: 'Zu viele Anfragen. Bitte warten Sie kurz.' };

  const raw = formData.get('payload');
  if (typeof raw !== 'string') return { ok: false, error: 'Ungültige Anfrage.' };

  let payload: z.infer<typeof payloadSchema>;
  try {
    payload = payloadSchema.parse(JSON.parse(raw));
  } catch {
    return { ok: false, error: 'Eingabe konnte nicht geprüft werden.' };
  }

  const s = payload.state as Record<string, unknown>;
  const whatsappAccepted =
    Boolean(s.whatsappConsent) || s.contactPreference === 'whatsapp';
  const partnerForwardingAccepted = Boolean(s.partnerForwardingConsent);

  // Aus AnswerState in LeadFunnelInput überführen
  const input: LeadFunnelInput = {
    source: 'website',
    customerType: asEnum(s.customerType, 'unknown', ['private', 'home_owner', 'business', 'landlord', 'unknown']),
    interests: asInterest(s.interests),
    urgency: asEnum(s.urgency, 'unknown', ['immediate', 'weeks', 'information', 'unknown']),
    hasInvoice: asEnum(s.hasInvoice, 'unknown', ['upload_now', 'later', 'no', 'unknown']),
    monthlyEnergyCosts: asEnum(s.monthlyEnergyCosts, 'unknown', ['under_100', '100_200', '200_400', 'over_400', 'unknown']),
    ownsProperty: asEnum(s.ownsProperty, 'unknown', ['yes', 'no', 'business_property', 'rental_property', 'unknown']),
    contactPreference:
      typeof s.contactPreference === 'string'
        ? (asEnum(s.contactPreference, 'phone', ['phone', 'whatsapp', 'email']) as 'phone' | 'whatsapp' | 'email')
        : whatsappAccepted
          ? 'whatsapp'
          : undefined,
    firstName: String(s.firstName ?? '').trim(),
    lastName: String(s.lastName ?? '').trim(),
    phone: typeof s.phone === 'string' && s.phone.trim() ? s.phone.trim() : undefined,
    email: typeof s.email === 'string' && s.email.trim() ? s.email.trim() : undefined,
    postalCode: String(s.postalCode ?? '').trim(),
    city: typeof s.city === 'string' ? s.city.trim() : undefined,
    legalBasis: 'consent',
    consent: {
      contactConsent: Boolean(s.contactConsent),
      privacyAccepted: Boolean(s.privacyAccepted),
      consentTextVersion: payload.consentTextVersion,
      consentTimestamp: nowIso(),
      source: 'website_funnel',
      consentPrivacyAccepted: Boolean(s.privacyAccepted),
      consentWhatsappAccepted: whatsappAccepted,
      consentPartnerForwardingAccepted: partnerForwardingAccepted,
      consentTextPrivacy: CONSENT_TEXT.privacy,
      consentTextWhatsapp: CONSENT_TEXT.whatsapp,
      consentTextPartnerForwarding: CONSENT_TEXT.partnerForwarding,
      consentVersion: CONSENT_TEXT_VERSION,
      privacyPolicyVersion: payload.privacyPolicyVersion ?? PRIVACY_POLICY_VERSION,
      timestamp: nowIso(),
      formSource: 'seed-funnel',
      pagePath: payload.pagePath ?? '/energiecheck',
      referrer: payload.referrer,
      utmSource: payload.utmSource,
      utmMedium: payload.utmMedium,
      utmCampaign: payload.utmCampaign,
      utmTerm: payload.utmTerm,
      utmContent: payload.utmContent,
      technicalRequestId: payload.technicalRequestId ?? newId('req'),
      ipHash,
      userAgent,
    },
  };

  // Server-seitige Pflichtfeld-Validierung
  const validation = schemas.leadFunnelInputSchema.safeParse({
    ...input,
    consent: input.consent,
  });
  if (!validation.success) {
    const first = validation.error.issues[0];
    return { ok: false, error: first?.message ?? 'Bitte prüfen Sie Ihre Eingaben.' };
  }
  if (!input.consent?.contactConsent || !input.consent.privacyAccepted) {
    return { ok: false, error: 'Bitte beiden Einwilligungen zustimmen.' };
  }

  // Anti-Bot
  const botSignal = looksLikeBotSubmit({
    submittedAtMs: payload.submittedAtMs,
    minMs: 1500,
  });

  // Score
  const result = scoreLead(input, {
    spamSignal: botSignal,
    invalidContact: isLikelyDisposableEmail(input.email),
  });

  // Dublettenprüfung (darf den Lead-Eingang nie blockieren)
  const storage = getStorage();
  let dup: Lead | null = null;
  try {
    dup = await storage.findDuplicate({
      email: input.email,
      phone: input.phone,
      name: `${input.firstName} ${input.lastName}`,
      postalCode: input.postalCode,
    });
  } catch {
    dup = null;
  }

  const id = newId('lead') as LeadId;
  const now = nowIso();

  // Empfehlungssystem: Eigener Code immer setzen; werbenden Lead bei Vorhandensein aufloesen.
  const ownReferralCode = newReferralCode();
  let referredByLeadId: LeadId | undefined;
  if (payload.referredByCode) {
    try {
      const referrer = await storage.findLeadByReferralCode(payload.referredByCode);
      if (referrer) referredByLeadId = referrer.id;
    } catch {
      /* Referral-Auflösung ist optional. */
    }
  }

  const sourceDetails = payload.referrer
    ? `website_funnel | ref:${tryHostname(payload.referrer)}`
    : undefined;

  const lead: Lead = {
    id,
    createdAt: now,
    updatedAt: now,
    source: referredByLeadId ? 'referral' : input.source,
    ...(sourceDetails ? { sourceDetails } : {}),
    referralCode: ownReferralCode,
    ...(payload.referredByCode ? { referredByCode: payload.referredByCode.toUpperCase() } : {}),
    ...(referredByLeadId ? { referredByLeadId } : {}),
    ...(payload.utmSource ? { utmSource: payload.utmSource } : {}),
    ...(payload.utmMedium ? { utmMedium: payload.utmMedium } : {}),
    ...(payload.utmCampaign ? { utmCampaign: payload.utmCampaign } : {}),
    ...(payload.utmTerm ? { utmTerm: payload.utmTerm } : {}),
    ...(payload.utmContent ? { utmContent: payload.utmContent } : {}),
    customerType: input.customerType,
    interests: input.interests,
    urgency: input.urgency,
    hasInvoice: input.hasInvoice,
    monthlyEnergyCosts: input.monthlyEnergyCosts,
    ownsProperty: input.ownsProperty,
    contactPreference: input.contactPreference,
    firstName: input.firstName,
    lastName: input.lastName,
    phone: input.phone,
    email: input.email,
    postalCode: input.postalCode,
    city: input.city,
    legalBasis: input.legalBasis,
    consent: input.consent,
    leadScore: result.score,
    leadColor: result.color,
    leadLabel: result.label,
    scoreReasons: result.reasons,
    recommendedAction: result.recommendedAction,
    status: result.color === 'black' ? 'Gesperrt' : 'Neu',
    notes: dup ? [{ id: newId('note'), createdAt: now, author: 'system', text: `Mögliche Dublette zu Lead ${dup.id}.` }] : [],
    contactHistory: [],
    files: payload.filePathname
      ? [
          {
            id: newId('file'),
            createdAt: now,
            fileName: payload.fileName ?? 'Rechnung',
            fileType: payload.fileType ?? 'application/octet-stream',
            fileUrl: payload.filePathname,
            category: 'invoice',
          },
        ]
      : [],
    isDemo: false,
  };

  try {
    await storage.createLead(lead);
  } catch (err) {
    console.error('[submitLead] createLead failed', err);
    return {
      ok: false,
      error: 'Ihre Anfrage konnte gerade nicht gespeichert werden. Bitte versuchen Sie es in einem Moment erneut.',
    };
  }

  try {
    await logAudit({
      ctx: {
        actorId: 'anonymous',
        actorRole: 'anonymous',
        ipHash,
      },
      action: 'lead.created',
      entity: 'lead',
      entityId: id,
    });
  } catch {
    /* Audit darf den Lead-Eingang nie blockieren. */
  }

  // Mails: nur wenn nicht gesperrt
  if (lead.leadColor !== 'black') {
    const mailer = getMailer();
    if (lead.email) {
      try {
        await mailer.send(leadConfirmation(lead));
      } catch {
        /* nicht blockieren */
      }
    }
    if (env.SALES_INBOX_EMAIL) {
      try {
        await mailer.send(salesNotification(lead, env.SALES_INBOX_EMAIL));
      } catch {
        /* nicht blockieren */
      }
    }
  }

  return { ok: true, leadId: id, referralCode: ownReferralCode };
}

// Re-export für sicheres Imports
export { CONSENT_TEXT, CONSENT_TEXT_VERSION };
