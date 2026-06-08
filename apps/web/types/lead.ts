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
  consent: boolean;
  source: 'landingpage-hero';
  createdAt: string;
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
