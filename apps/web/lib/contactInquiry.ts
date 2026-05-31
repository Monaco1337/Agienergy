import { z } from 'zod';

export const contactInquirySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Bitte geben Sie Ihren Namen ein.')
    .max(120, 'Name ist zu lang.'),
  email: z.string().trim().email('Bitte geben Sie eine gültige E-Mail-Adresse ein.'),
  phone: z
    .string()
    .trim()
    .min(5, 'Bitte geben Sie eine Telefonnummer ein.')
    .max(40, 'Telefonnummer ist zu lang.'),
  message: z
    .string()
    .trim()
    .min(10, 'Bitte formulieren Sie Ihre Nachricht (mind. 10 Zeichen).')
    .max(5000, 'Nachricht ist zu lang.'),
  consent: z
    .boolean()
    .refine((v) => v === true, { message: 'Bitte stimmen Sie der Datenverarbeitung zu.' }),
  /** Honeypot – muss leer bleiben */
  company: z.string().max(0).optional(),
});

export type ContactInquiryInput = z.infer<typeof contactInquirySchema>;
