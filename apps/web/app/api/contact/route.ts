import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { contactInquirySchema } from '@/lib/contactInquiry';
import { rateLimit, getClientKeyFromHeaders } from '@/lib/rateLimit';
import { env } from '@/lib/env';

const DATA_FILE = path.join(process.cwd(), 'data', 'contact-inquiries.json');

async function persistLocal(record: Record<string, unknown>) {
  let inquiries: unknown[] = [];
  try {
    const raw = await fs.readFile(DATA_FILE, 'utf8');
    const j = JSON.parse(raw) as { inquiries?: unknown[] };
    if (Array.isArray(j.inquiries)) inquiries = j.inquiries;
  } catch {
    // Datei fehlt – neu anlegen
  }
  inquiries.push(record);
  await fs.writeFile(DATA_FILE, JSON.stringify({ inquiries }, null, 2), 'utf8');
}

export async function POST(req: Request) {
  const ip = getClientKeyFromHeaders(req.headers);
  const rl = rateLimit(ip, 'contact');
  if (!rl.allowed) {
    return NextResponse.json({ ok: false, error: 'Zu viele Anfragen. Bitte später erneut.' }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Ungültige Anfrage.' }, { status: 400 });
  }

  const parsed = contactInquirySchema.safeParse(body);
  if (!parsed.success) {
    const flat = parsed.error.flatten().fieldErrors;
    return NextResponse.json(
      { ok: false, error: 'Validierung fehlgeschlagen.', fields: flat },
      { status: 400 },
    );
  }

  const { name, email, phone, message, company: _company } = parsed.data;
  const submittedAt = new Date().toISOString();

  const crmPayload = {
    type: 'faq_contact',
    source: 'landing_faq',
    name,
    email,
    phone,
    message,
    submittedAt,
  };

  if (env.CRM_CONTACT_WEBHOOK_URL) {
    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    if (env.CRM_CONTACT_WEBHOOK_SECRET) {
      headers.Authorization = `Bearer ${env.CRM_CONTACT_WEBHOOK_SECRET}`;
    }
    try {
      const upstream = await fetch(env.CRM_CONTACT_WEBHOOK_URL, {
        method: 'POST',
        headers,
        body: JSON.stringify(crmPayload),
        signal: AbortSignal.timeout(12_000),
      });
      if (!upstream.ok) {
        return NextResponse.json(
          { ok: false, error: 'CRM-Übermittlung fehlgeschlagen. Bitte später erneut.' },
          { status: 502 },
        );
      }
    } catch {
      return NextResponse.json(
        { ok: false, error: 'CRM-Übermittlung fehlgeschlagen. Bitte später erneut.' },
        { status: 502 },
      );
    }
  } else if (env.NODE_ENV === 'development') {
    try {
      await persistLocal({ ...crmPayload, receivedAt: submittedAt });
    } catch (e) {
      // eslint-disable-next-line no-console -- Dev-Fallback
      console.error('[contact] local persist failed', e);
      return NextResponse.json({ ok: false, error: 'Speichern fehlgeschlagen.' }, { status: 500 });
    }
  } else {
    return NextResponse.json(
      {
        ok: false,
        error:
          'Kontaktweg nicht konfiguriert. Bitte CRM_CONTACT_WEBHOOK_URL in der Umgebung setzen.',
      },
      { status: 503 },
    );
  }

  return NextResponse.json({ ok: true });
}
