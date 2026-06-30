import { NextResponse } from 'next/server';
import { get } from '@vercel/blob';
import { getSession } from '@/lib/auth/session';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Authentifizierter Download für private Lead-Unterlagen (z. B. hochgeladene
 * Energierechnungen). Nur eingeloggte Admin-/Partner-Sessions dürfen Dateien
 * abrufen; der Pfad wird strikt auf das `leads/`-Präfix beschränkt.
 */
export async function GET(req: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ ok: false, error: 'Nicht autorisiert.' }, { status: 401 });
  }

  const url = new URL(req.url);
  const path = url.searchParams.get('path') ?? '';
  if (!path || !path.startsWith('leads/') || path.includes('..')) {
    return NextResponse.json({ ok: false, error: 'Ungültiger Pfad.' }, { status: 400 });
  }

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json({ ok: false, error: 'Speicher nicht verfügbar.' }, { status: 503 });
  }

  try {
    const res = await get(path, { access: 'private', useCache: false });
    if (!res || res.statusCode !== 200) {
      return NextResponse.json({ ok: false, error: 'Datei nicht gefunden.' }, { status: 404 });
    }
    const fileName = path.split('/').pop() || 'datei';
    const contentType =
      res.headers?.get('content-type') || res.blob?.contentType || 'application/octet-stream';
    return new Response(res.stream as ReadableStream, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': `inline; filename="${fileName}"`,
        'Cache-Control': 'private, no-store',
      },
    });
  } catch (err) {
    console.error('[admin/file] download failed', err);
    return NextResponse.json({ ok: false, error: 'Download fehlgeschlagen.' }, { status: 500 });
  }
}
