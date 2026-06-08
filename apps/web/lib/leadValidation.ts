import type { LeadCategory, LeadFormErrors, LeadPayload } from '@/types/lead';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const ALLOWED_TYPES = new Set(['application/pdf', 'image/jpeg', 'image/jpg', 'image/png']);
const MAX_BYTES = 10 * 1024 * 1024;

export interface LeadFormInput {
  category: LeadCategory | null;
  name: string;
  phone: string;
  email: string;
  zip: string;
  annualConsumptionKwh: string;
  file: File | null;
  consent: boolean;
}

export function validateLeadForm(input: LeadFormInput): LeadFormErrors {
  const errors: LeadFormErrors = {};

  if (!input.category) {
    errors.category = 'Bitte wählen Sie eine Kategorie.';
  }

  const name = input.name.trim();
  if (name.length < 2) {
    errors.name = 'Bitte geben Sie Ihren vollständigen Namen ein (mindestens 2 Zeichen).';
  }

  const phone = input.phone.trim();
  if (phone.length < 5) {
    errors.phone = 'Bitte geben Sie eine gültige Telefonnummer ein.';
  }

  const email = input.email.trim();
  if (!EMAIL_RE.test(email)) {
    errors.email = 'Bitte geben Sie eine gültige E-Mail-Adresse ein.';
  }

  const zip = input.zip.trim();
  if (zip.length < 4) {
    errors.zip = 'Bitte geben Sie PLZ und Ort an (mindestens 4 Zeichen).';
  }

  const kwhRaw = input.annualConsumptionKwh.trim().replace(/\s/g, '').replace(/\./g, '').replace(',', '.');
  if (kwhRaw.length > 0) {
    const kwh = Number(kwhRaw);
    if (!Number.isFinite(kwh) || kwh <= 0) {
      errors.annualConsumptionKwh = 'Bitte geben Sie einen gültigen Jahresverbrauch in kWh ein.';
    } else if (kwh > 999_999) {
      errors.annualConsumptionKwh = 'Bitte prüfen Sie den Jahresverbrauch – der Wert wirkt ungewöhnlich hoch.';
    }
  }

  if (input.file) {
    const t = input.file.type.toLowerCase();
    const okType = ALLOWED_TYPES.has(t) || t === 'image/jpg';
    if (!okType) {
      errors.file = 'Nur PDF, JPG oder PNG sind erlaubt.';
    }
    if (input.file.size > MAX_BYTES) {
      errors.file = 'Die Datei darf maximal 10 MB groß sein.';
    }
  }

  if (!input.consent) {
    errors.consent = 'Bitte stimmen Sie der Datenverarbeitung zu.';
  }

  return errors;
}

export function toLeadPayload(input: LeadFormInput): LeadPayload | null {
  const e = validateLeadForm(input);
  if (Object.keys(e).length > 0) return null;
  const payload: LeadPayload = {
    category: input.category!,
    name: input.name.trim(),
    phone: input.phone.trim(),
    email: input.email.trim(),
    zip: input.zip.trim(),
    consent: input.consent,
    source: 'landingpage-hero',
    createdAt: new Date().toISOString(),
  };
  const kwhRaw = input.annualConsumptionKwh.trim().replace(/\s/g, '').replace(/\./g, '').replace(',', '.');
  if (kwhRaw.length > 0) {
    payload.annualConsumptionKwh = Math.round(Number(kwhRaw));
  }
  if (input.file) {
    payload.fileName = input.file.name;
    payload.fileType = input.file.type || 'application/octet-stream';
    payload.fileSize = input.file.size;
  }
  return payload;
}
