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

  return (
    <div>
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
          tabIndex={0}
          aria-label={copy.uploadHeadline}
          onKeyDown={(e) => {
            if (disabled) return;
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              inputRef.current?.click();
            }
          }}
          onClick={() => !disabled && inputRef.current?.click()}
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
            'upload-dropzone w-full cursor-pointer rounded-2xl border border-dashed px-5 py-4 text-center transition-all min-h-[128px]',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white/90 focus-visible:ring-cyan',
            disabled && 'opacity-50 cursor-not-allowed',
            error
              ? 'border-error/50 bg-error/[0.04]'
              : 'border-borderLight bg-white/50 hover:border-cyan/40 hover:bg-white/70',
            drag && !disabled && 'border-cyan bg-cyan/5 scale-[1.005] shadow-lift',
          )}
        >
          <div className="mx-auto mb-2 flex size-10 items-center justify-center rounded-full bg-cyan/10 text-cyanDeep pointer-events-none">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M12 16V4m0 0l-4 4m4-4l4 4M6 20h12"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <p className="text-[14.5px] font-semibold text-navy pointer-events-none leading-tight">
            {copy.uploadHeadline}
          </p>
          <p className="mt-1 text-[12px] text-slate pointer-events-none leading-snug">
            {copy.uploadHint}
          </p>
          <p className="mt-1.5 text-[12px] font-medium text-cyanDeep pointer-events-none">
            Datei auswählen oder hierher ziehen
          </p>
        </div>
      ) : (
        <div className="upload-dropzone-filled rounded-2xl border border-borderLight bg-white/70 px-5 py-4 flex items-center gap-4">
          <div className="flex size-11 items-center justify-center rounded-xl bg-cyan/10 text-cyanDeep shrink-0">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M14 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V8m-5-5l5 5m-5-5v5h5"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="flex-1 min-w-0 text-left">
            <p className="text-[14.5px] font-semibold text-navy truncate">{file.name}</p>
            <p className="text-[12.5px] text-slate">
              {formatBytes(file.size)} · vertraulich übermittelt
            </p>
          </div>
          <button
            type="button"
            className="text-[12.5px] font-medium text-slate hover:text-error transition-colors shrink-0"
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
        <p id="upload-dropzone-error" className="mt-2 text-[13px] text-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
