// Brand-Helper für nominale Typen
declare const __brand: unique symbol;
export type Brand<T, B> = T & { readonly [__brand]: B };

export type LeadId = Brand<string, 'LeadId'>;
export type UserId = Brand<string, 'UserId'>;
export type ResearchId = Brand<string, 'ResearchId'>;

export type LeadSource =
  | 'website'
  | 'google_ads'
  | 'meta_ads'
  | 'linkedin_lead_gen_form'
  | 'referral'
  | 'partner'
  | 'manual_research'
  | 'csv_import'
  | 'phone'
  | 'event'
  | 'existing_customer';

export type LegalBasis =
  | 'consent'
  | 'contract_request'
  | 'legitimate_interest_b2b_review_required'
  | 'existing_customer'
  | 'referral_with_permission'
  | 'unknown_blocked';

export type CustomerType = 'private' | 'home_owner' | 'business' | 'landlord' | 'unknown';

export type Interest = 'strom' | 'gas' | 'photovoltaik' | 'strom_gas' | 'unknown';

export type Urgency = 'immediate' | 'weeks' | 'information' | 'unknown';

export type HasInvoice = 'upload_now' | 'later' | 'no' | 'unknown';

export type MonthlyEnergyCosts = 'under_100' | '100_200' | '200_400' | 'over_400' | 'unknown';

export type OwnsProperty =
  | 'yes'
  | 'no'
  | 'business_property'
  | 'rental_property'
  | 'unknown';

export type ContactPreference = 'phone' | 'whatsapp' | 'email';

export type LeadColor = 'red' | 'orange' | 'yellow' | 'blue' | 'gray' | 'black';

export type LeadPriority = 'urgent' | 'high' | 'normal' | 'low';

/**
 * Top-Level-Kategorie für die Operations-View. Wird zusätzlich zu
 * `interests` geführt (interests bleibt für die Funnel-Logik bestehen).
 */
export type LeadCategory = 'strom' | 'gas' | 'solar' | 'gewerbe';

export type LeadStatus =
  | 'Neu'
  | 'Zu prüfen'
  | 'Priorisiert'
  | 'Heute anrufen'
  | 'Angerufen'
  | 'Nicht erreicht'
  | 'Rückruf geplant'
  | 'Unterlagen angefordert'
  | 'Rechnung erhalten'
  | 'Beratung durchgeführt'
  | 'Angebot vorbereitet'
  | 'Angebot gesendet'
  | 'Abschluss wahrscheinlich'
  | 'Abgeschlossen'
  | 'Verloren'
  | 'Gesperrt';

export interface ConsentRecord {
  contactConsent: boolean;
  privacyAccepted: boolean;
  consentTextVersion: string;
  consentTimestamp: string;
  source: string;
}

export interface ScoreReason {
  code: string;
  label: string;
  delta: number;
}

export interface ScoreResult {
  score: number;
  color: LeadColor;
  label: string;
  reasons: ScoreReason[];
  recommendedAction: string;
}

export interface ContactEvent {
  id: string;
  createdAt: string;
  type: 'call' | 'email' | 'whatsapp' | 'note' | 'meeting' | 'offer';
  direction: 'inbound' | 'outbound';
  result:
    | 'reached'
    | 'not_reached'
    | 'interested'
    | 'not_interested'
    | 'callback'
    | 'closed'
    | 'lost';
  text: string;
  createdBy: string;
}

export interface Note {
  id: string;
  createdAt: string;
  author: string;
  text: string;
}

export interface LeadFile {
  id: string;
  createdAt: string;
  fileName: string;
  fileType: string;
  fileUrl: string;
  category: 'invoice' | 'offer' | 'contract' | 'other';
}

export interface Lead {
  id: LeadId;
  createdAt: string;
  updatedAt: string;
  source: LeadSource;
  sourceDetails?: string;
  campaignId?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;

  customerType: CustomerType;
  interests: Interest[];
  urgency: Urgency;
  hasInvoice: HasInvoice;
  monthlyEnergyCosts: MonthlyEnergyCosts;
  /** Jahresverbrauch in kWh – optional aus Hero-Formular. */
  annualConsumptionKwh?: number;
  ownsProperty: OwnsProperty;
  contactPreference?: ContactPreference;

  firstName: string;
  lastName: string;
  phone?: string;
  email?: string;
  postalCode: string;
  city?: string;
  message?: string;

  legalBasis: LegalBasis;
  consent?: ConsentRecord;

  leadScore: number;
  leadColor: LeadColor;
  leadLabel: string;
  scoreReasons: ScoreReason[];
  recommendedAction: string;

  status: LeadStatus;
  assignedTo?: string;
  /** Vertriebspartner, an den der Lead aktuell verteilt ist. */
  assignedPartnerId?: string;
  /** Zeitpunkt der Verteilung. */
  assignedAt?: string;
  /** Manuelle Priorität (zusätzlich zu leadColor). */
  priority?: LeadPriority;
  /** Klare Handlungsempfehlung – Human-Override oder von AI. */
  nextAction?: string;
  /** ISO-Datum, an dem der Lead abgeschlossen oder verloren wurde. */
  closedAt?: string;
  /** Optionaler Top-Level-Bereich (mappt auf Landing-Kategorien). */
  category?: LeadCategory;
  nextFollowUpAt?: string;
  lastContactAt?: string;

  notes: Note[];
  contactHistory: ContactEvent[];
  files: LeadFile[];

  // optional, von AI-Assist befüllt – klar gekennzeichnet
  aiOptIn?: boolean;
  aiSummary?: string;
  aiSuggestedAction?: string;

  // Demo-Marker
  isDemo?: boolean;
}

export interface LeadFunnelInput {
  source: LeadSource;
  sourceDetails?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  campaignId?: string;

  customerType: CustomerType;
  interests: Interest[];
  urgency: Urgency;
  hasInvoice: HasInvoice;
  monthlyEnergyCosts: MonthlyEnergyCosts;
  /** Jahresverbrauch in kWh – optional aus Hero-Formular. */
  annualConsumptionKwh?: number;
  ownsProperty: OwnsProperty;
  contactPreference?: ContactPreference;

  firstName: string;
  lastName: string;
  phone?: string;
  email?: string;
  postalCode: string;
  city?: string;
  message?: string;

  legalBasis: LegalBasis;
  consent?: ConsentRecord;
}
