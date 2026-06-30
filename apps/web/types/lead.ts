export type LeadCategory = 'strom' | 'gas' | 'solar' | 'gewerbe';

export type SubmitStatus =
  | 'idle'
  | 'validating'
  | 'submitting'
  | 'success'
  | 'error';

export interface LeadPayload {
  category: LeadCategory;
  name: string;
  phone: string;
  email: string;
  zip: string;
  annualConsumptionKwh?: number;
  fileName?: string;
  fileType?: string;
  fileSize?: number;
  /** Blob-Pfad der hochgeladenen Datei (siehe /api/upload). */
  filePathname?: string;
  consent: boolean;
  whatsappConsent?: boolean;
  partnerForwardingConsent?: boolean;
  consentVersion?: string;
  privacyPolicyVersion?: string;
  consentTextPrivacy?: string;
  consentTextWhatsapp?: string;
  consentTextPartnerForwarding?: string;
  pagePath?: string;
  technicalRequestId?: string;
  source: 'landingpage-hero';
  createdAt: string;
  /** Optional: Empfehlungscode (clientseitig aus Cookie nachgereicht). */
  referredByCode?: string;
  /** Optional: UTM/Referrer aus Cookie (First-Touch). */
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
  referrer?: string;
}

export interface LeadFormErrors {
  category?: string;
  name?: string;
  phone?: string;
  email?: string;
  zip?: string;
  annualConsumptionKwh?: string;
  file?: string;
  consent?: string;
  general?: string;
}
