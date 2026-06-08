'use client';

import * as React from 'react';
import { cn } from '@elo/ui';
import { energyLandingContent } from '@/data/energyLandingContent';

const ACCEPT = 'application/pdf,image/jpeg,image/jpg,image/png';

function formatBytes(n: number): string {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / (1024 * 1024)).toFixed(2)} MB`;
}

interface UploadDropzoneProps {
  file: File | null;
  onFile: (f: File | null) => void;
  error?: string;
  disabled?: boolean;
}

export function UploadDropzone({ file, onFile, error, disabled }: UploadDropzoneProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [drag, setDrag] = React.useState(false);
  const copy = energyLandingContent.leadForm;

  const pick = (list: FileList | null) => {
    if (!list?.length) return;
    onFile(list[0]!);
  };

  const openPicker = () => {
    if (!disabled) inputRef.current?.click();
  };

  return (
    <div className="upload-attach">
      <input
        ref={inputRef}
        type="file"
        className="sr-only"
        accept={ACCEPT}
        disabled={disabled}
        onChange={(e) => pick(e.target.files)}
      />

      {!file ? (
        <div
          role="group"
          aria-label={`${copy.uploadHeadline} (${copy.uploadOptional})`}
          onDragEnter={(e) => {
            e.preventDefault();
            if (!disabled) setDrag(true);
          }}
          onDragOver={(e) => {
            e.preventDefault();
            if (!disabled) setDrag(true);
          }}
          onDragLeave={() => setDrag(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDrag(false);
            if (disabled) return;
            pick(e.dataTransfer.files);
          }}
          className={cn(
            'upload-attach-row flex items-center gap-3 rounded-xl border px-3.5 py-2.5 transition-colors',
            disabled && 'opacity-50 pointer-events-none',
            error
              ? 'border-error/40 bg-error/[0.04]'
              : drag
                ? 'border-cyan/35 bg-cyan/[0.06]'
                : 'border-white/[0.08] bg-white/[0.02] hover:border-white/[0.14] hover:bg-white/[0.04]',
          )}
        >
          <span
            aria-hidden
            className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.03] text-slate"
          >
            <PaperclipIcon />
          </span>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
              <span className="upload-attach-optional rounded-md border border-white/10 bg-white/[0.04] px-1.5 py-px text-[10px] font-medium uppercase tracking-[0.12em] text-slate">
                {copy.uploadOptional}
              </span>
              <span className="text-[13px] font-medium text-[rgba(245,250,255,0.88)] leading-tight">
                {copy.uploadHeadline}
              </span>
            </div>
            <p className="mt-0.5 text-[11.5px] leading-snug text-slate">
              {copy.uploadHint}
              <span className="text-slate/80"> · {copy.uploadBenefit}</span>
            </p>
          </div>

          <button
            type="button"
            onClick={openPicker}
            disabled={disabled}
            className={cn(
              'upload-attach-cta shrink-0 rounded-lg border px-3 py-1.5 text-[12px] font-medium transition-colors',
              'border-white/10 bg-white/[0.04] text-[rgba(235,245,250,0.78)]',
              'hover:border-cyan/30 hover:bg-cyan/[0.08] hover:text-cyan',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan/60 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent',
            )}
          >
            {copy.uploadCta}
          </button>
        </div>
      ) : (
        <div
          className={cn(
            'upload-attach-filled flex items-center gap-3 rounded-xl border px-3.5 py-2.5',
            'border-cyan/20 bg-cyan/[0.05]',
          )}
        >
          <span
            aria-hidden
            className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-cyan/20 bg-cyan/10 text-cyanDeep"
          >
            <DocIcon />
          </span>
          <div className="min-w-0 flex-1 text-left">
            <p className="truncate text-[13px] font-medium text-[rgba(245,250,255,0.92)]">{file.name}</p>
            <p className="text-[11.5px] text-slate">{formatBytes(file.size)} · angehängt</p>
          </div>
          <button
            type="button"
            className="shrink-0 text-[11.5px] font-medium text-slate transition-colors hover:text-error"
            disabled={disabled}
            onClick={() => {
              onFile(null);
              if (inputRef.current) inputRef.current.value = '';
            }}
          >
            Entfernen
          </button>
        </div>
      )}

      {error && (
        <p id="upload-dropzone-error" className="mt-1.5 text-[12px] text-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

function PaperclipIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M21.44 11.05l-8.49 8.49a5.5 5.5 0 01-7.78-7.78l9.19-9.19a3.5 3.5 0 014.95 4.95l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DocIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M14 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V8m-5-5l5 5m-5-5v5h5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
