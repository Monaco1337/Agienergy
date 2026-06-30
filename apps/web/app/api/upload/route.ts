import { NextResponse } from 'next/server';
import { put } from '@vercel/blob';
import { newId } from '@elo/core';
import { rateLimit, getClientKeyFromHeaders } from '@/lib/rateLimit';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const ALLOWED_TYPES = new Set([
  'application/pdf',
  'image/jpeg',
  'image/jpg',
  'image/png',
]);
const MAX_BYTES = 10 * 1024 * 1024;

function safeName(name: string): string {
  const base = name.replace(/\.[^.]+$/, '');
  const ext = name.match(/\.[^.]+$/)?.[0] ?? '';
  const cleanBase = base
    .normalize('NFKD')
    .replace(/[^a-zA-Z0-9._-]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 60);
  const cleanExt = ext.replace(/[^a-zA-Z0-9.]+/g, '').slice(0, 8);
  return `${cleanBase || 'datei'}${cleanExt}`;
}

/**
 * Nimmt eine einzelne Datei (Energie-/Strom-/Gasrechnung) per multipart-Upload
 * entgegen und legt sie im privaten Vercel-Blob-Store ab. Gibt den Pfad zurueck,
 * der anschliessend mit dem Lead gespeichert wird. Der Inhalt ist nur ueber den
 * authentifizierten Admin-Download-Endpunkt einsehbar.
 */
export async function POST(req: Request) {
  const ip = getClientKeyFromHeaders(req.headers);
  const rl = rateLimit(ip, 'lead');
  if (!rl.allowed) {
    return NextResponse.json(
      { ok: false, error: 'Zu viele Uploads. Bitte später erneut.' },
      { status: 429 },
    );
  }

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json(
      { ok: false, error: 'Datei-Upload ist derzeit nicht verfügbar.' },
      { status: 503 },
    );
  }

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ ok: false, error: 'Ungültige Anfrage.' }, { status: 400 });
  }

  const file = form.get('file');
  if (!(file instanceof File)) {
    return NextResponse.json({ ok: false, error: 'Keine Datei übermittelt.' }, { status: 400 });
  }

  const type = (file.type || '').toLowerCase();
  if (!ALLOWED_TYPES.has(type)) {
    return NextResponse.json(
      { ok: false, error: 'Nur PDF, JPG oder PNG sind erlaubt.' },
      { status: 415 },
    );
  }
  if (file.size <= 0 || file.size > MAX_BYTES) {
    return NextResponse.json(
      { ok: false, error: 'Die Datei darf maximal 10 MB groß sein.' },
      { status: 413 },
    );
  }

  const pathname = `leads/${newId('file')}/${safeName(file.name)}`;

  try {
    await put(pathname, file, {
      access: 'private',
      contentType: type,
      addRandomSuffix: false,
      allowOverwrite: false,
    });
  } catch (err) {
    console.error('[upload] blob put failed', err);
    return NextResponse.json(
      { ok: false, error: 'Upload fehlgeschlagen. Bitte später erneut.' },
      { status: 500 },
    );
  }

  return NextResponse.json({
    ok: true,
    pathname,
    fileName: file.name.slice(0, 200),
    fileType: type,
    fileSize: file.size,
  });
}
