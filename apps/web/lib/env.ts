import { z } from 'zod';

// Helfer: behandelt "" als undefined, damit optionale URL-/String-Vars
// nicht an .url()-Validierung scheitern, wenn sie im .env leer stehen.
const emptyToUndef = z.preprocess(
  (v) => (typeof v === 'string' && v.trim() === '' ? undefined : v),
  z.unknown(),
);
const optStr = emptyToUndef.pipe(z.string().optional());
const optUrl = emptyToUndef.pipe(z.string().url().optional());

const schema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  NEXT_PUBLIC_SITE_URL: emptyToUndef.pipe(z.string().url().default('http://localhost:3000')),

  STORAGE_DRIVER: z.enum(['json', 'supabase']).default('json'),
  SUPABASE_URL: optUrl,
  SUPABASE_ANON_KEY: optStr,
  SUPABASE_SERVICE_ROLE_KEY: optStr,

  NEXTAUTH_SECRET: emptyToUndef.pipe(z.string().min(16).default('dev-secret-change-me-32-chars-please')),
  NEXTAUTH_URL: emptyToUndef.pipe(z.string().url().default('http://localhost:3000')),

  MAIL_DRIVER: z.enum(['console', 'resend', 'smtp']).default('console'),
  RESEND_API_KEY: optStr,
  MAIL_FROM: emptyToUndef.pipe(z.string().default('Energy Lead OS <noreply@example.com>')),
  SALES_INBOX_EMAIL: optStr,

  CRON_SECRET: emptyToUndef.pipe(z.string().default('dev-cron-secret')),

  AI_ASSIST: z.enum(['on', 'off']).default('off'),
  EXPERIMENTS_ENABLED: z.enum(['on', 'off']).default('on'),

  AI_PROVIDER: z.enum(['noop', 'mistral_eu', 'azure_openai_eu']).default('noop'),
  AI_API_KEY: optStr,
  AI_BASE_URL: optStr,

  ADMIN_BOOTSTRAP_EMAIL: optStr,
  ADMIN_BOOTSTRAP_PASSWORD: optStr,

  /** Optional: Zapier / Make / HubSpot / n8n Webhook – FAQ-Kontaktanfragen */
  CRM_CONTACT_WEBHOOK_URL: optUrl,
  CRM_CONTACT_WEBHOOK_SECRET: optStr,
});

export const env = schema.parse(process.env);
export type Env = z.infer<typeof schema>;
