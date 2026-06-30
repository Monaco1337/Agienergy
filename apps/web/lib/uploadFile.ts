export interface UploadedFileMeta {
  pathname: string;
  fileName: string;
  fileType: string;
  fileSize: number;
}

/**
 * Lädt eine einzelne Datei in den privaten Blob-Store (via /api/upload) und
 * gibt die Metadaten zurück, die anschließend mit dem Lead gespeichert werden.
 * Wirft bei Fehlern eine Exception mit einer nutzerfreundlichen Meldung.
 */
export async function uploadLeadFile(file: File): Promise<UploadedFileMeta> {
  const fd = new FormData();
  fd.set('file', file);

  const res = await fetch('/api/upload', { method: 'POST', body: fd });
  if (!res.ok) {
    let message = 'Die Datei konnte nicht hochgeladen werden.';
    try {
      const data = (await res.json()) as { error?: string };
      if (data?.error) message = data.error;
    } catch {
      /* Standardmeldung beibehalten. */
    }
    throw new Error(message);
  }

  const data = (await res.json()) as Partial<UploadedFileMeta>;
  if (!data.pathname) throw new Error('Die Datei konnte nicht hochgeladen werden.');
  return {
    pathname: data.pathname,
    fileName: data.fileName ?? file.name,
    fileType: data.fileType ?? file.type,
    fileSize: data.fileSize ?? file.size,
  };
}
