'use client';

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  useTransition,
  type Dispatch,
  type SetStateAction,
} from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button, OptionCard, Field, Checkbox } from '@elo/ui';
import { WizardInstantEstimate } from '@/components/funnel/WizardInstantEstimate';
import { visibleSteps } from '@/lib/funnel/config';
import { audienceFromState } from '@/lib/funnel/audience';
import { CONSENT_TEXTS, CONSENT_VERSION, PRIVACY_POLICY_VERSION } from '@/lib/consent';
import { submitLead } from '@/app/actions/submitLead';
import { uploadLeadFile } from '@/lib/uploadFile';
import type { AnswerState, FunnelStep, Interest } from '@elo/core';

const STORAGE_KEY = 'elo_funnel_state_v1';

function readCookie(name: string): string | undefined {
  if (typeof document === 'undefined') return undefined;
  const m = document.cookie.match(new RegExp(`(?:^|;\\s*)${name}=([^;]+)`));
  if (!m) return undefined;
  try {
    return decodeURIComponent(m[1]!);
  } catch {
    return undefined;
  }
}

function readUtmCookies() {
  return {
    utmSource: readCookie('agi_utm_source'),
    utmMedium: readCookie('agi_utm_medium'),
    utmCampaign: readCookie('agi_utm_campaign'),
    utmTerm: readCookie('agi_utm_term'),
    utmContent: readCookie('agi_utm_content'),
    referrer: readCookie('agi_referrer'),
  };
}

function isFilled(s: AnswerState, step: FunnelStep): boolean {
  if (step.type === 'contact') {
    return Boolean(s.firstName && s.lastName && s.postalCode && (s.phone || s.email));
  }
  if (step.type === 'consent') {
    return Boolean(s.contactConsent && s.privacyAccepted);
  }
  if (!step.field) return true;
  const v = s[step.field];
  return v !== undefined && v !== '' && (Array.isArray(v) ? v.length > 0 : true);
}

export function EnergyCheckWizard() {
  const router = useRouter();
  const [state, setState] = useState<AnswerState>({});
  const [stepIdx, setStepIdx] = useState(0);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const startedAt = useRef<number>(Date.now());
  const hydrated = useRef(false);

  // Einmalig: Session wiederherstellen + fromInvoice (kein useSearchParams-Loop, der State überschreibt)
  useEffect(() => {
    if (hydrated.current) return;
    hydrated.current = true;
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (raw) {
        const obj = JSON.parse(raw) as { state: AnswerState; idx: number };
        setState(obj.state ?? {});
        setStepIdx(typeof obj.idx === 'number' && obj.idx >= 0 ? obj.idx : 0);
      }
    } catch {
      /* ignore */
    }
    try {
      const qs = new URLSearchParams(window.location.search);
      if (qs.get('fromInvoice') === '1') {
        setState((prev) => ({ ...prev, hasInvoice: 'upload_now' }));
      }
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ state, idx: stepIdx }));
  }, [state, stepIdx]);

  const audience = audienceFromState(state);
  const steps = useMemo(() => visibleSteps(state, audience), [state, audience]);
  const total = steps.length;
  const safeIdx = Math.min(stepIdx, total - 1);
  const step = steps[safeIdx]!;
  const completedSteps = safeIdx + (isFilled(state, step) ? 1 : 0);
  const progress = completedSteps / total;
  const canNext = isFilled(state, step);
  const isLast = safeIdx === total - 1;
  const minutesLeft = Math.max(1, Math.ceil((total - safeIdx) * 0.3));

  function setField<K extends keyof AnswerState>(key: K, value: AnswerState[K]) {
    setState((prev) => ({ ...prev, [key]: value }));
  }

  function next() {
    setError(null);
    if (safeIdx < total - 1) {
      setStepIdx(safeIdx + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      handleSubmit();
    }
  }

  function back() {
    setError(null);
    if (safeIdx > 0) {
      setStepIdx(safeIdx - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  function handleSubmit() {
    if (!canNext) return;
    const elapsed = Date.now() - startedAt.current;
    const utm = readUtmCookies();
    const technicalRequestId =
      typeof crypto !== 'undefined' && 'randomUUID' in crypto
        ? crypto.randomUUID()
        : `agi-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    startTransition(async () => {
      try {
        let uploaded: { pathname: string; fileName: string; fileType: string } | null = null;
        if (file) {
          setUploading(true);
          try {
            uploaded = await uploadLeadFile(file);
          } catch (uploadErr) {
            setUploading(false);
            setError(
              uploadErr instanceof Error
                ? uploadErr.message
                : 'Die Datei konnte nicht hochgeladen werden.',
            );
            return;
          }
          setUploading(false);
        }

        const fd = new FormData();
        fd.set(
          'payload',
          JSON.stringify({
            state,
            consentTextVersion: CONSENT_VERSION,
            privacyPolicyVersion: PRIVACY_POLICY_VERSION,
            consentTexts: CONSENT_TEXTS,
            pagePath: window.location.pathname,
            technicalRequestId,
            submittedAtMs: elapsed,
            ...(uploaded
              ? {
                  filePathname: uploaded.pathname,
                  fileName: uploaded.fileName,
                  fileType: uploaded.fileType,
                }
              : {}),
            ...(utm.utmSource ? { utmSource: utm.utmSource } : {}),
            ...(utm.utmMedium ? { utmMedium: utm.utmMedium } : {}),
            ...(utm.utmCampaign ? { utmCampaign: utm.utmCampaign } : {}),
            ...(utm.utmTerm ? { utmTerm: utm.utmTerm } : {}),
            ...(utm.utmContent ? { utmContent: utm.utmContent } : {}),
            ...(utm.referrer ? { referrer: utm.referrer } : {}),
          }),
        );

        const res = await submitLead(fd);
        if (res.ok) {
          sessionStorage.removeItem(STORAGE_KEY);
          const qs = res.referralCode ? `?ref=${encodeURIComponent(res.referralCode)}` : '';
          router.push(`/danke${qs}`);
        } else {
          setError(res.error ?? 'Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut.');
        }
      } catch {
        setError(
          'Verbindung unterbrochen. Bitte prüfen Sie Ihre Internetverbindung und versuchen Sie es erneut.',
        );
      }
    });
  }

  // Tastatur-Shortcuts
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;
      if (e.key === 'ArrowRight' && canNext) next();
      if (e.key === 'ArrowLeft' && safeIdx > 0) back();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canNext, safeIdx]);

  return (
    <div className="relative">
      {/* Sticky Wizard-Header mit Schritt-Indikator */}
      <div className="sticky top-[60px] sm:top-16 z-20 bg-softWhite/90 backdrop-blur border-b border-borderLight">
        <div className="mx-auto max-w-2xl px-5 py-3">
          <div className="flex items-center justify-between text-[12.5px] text-muted">
            <span className="font-medium text-ink2">
              Schritt {safeIdx + 1} von {total}
            </span>
            <span>ca. {minutesLeft} Min. übrig</span>
          </div>
          <StepDots total={total} idx={safeIdx} done={completedSteps} />
        </div>
      </div>

      <div className="mx-auto max-w-2xl px-5 pt-8 pb-32 sm:pb-16">
        {/* Eyebrow */}
        <p className="text-[11.5px] uppercase tracking-[0.16em] text-sage font-medium">
          Energie-Check · {Math.round(progress * 100)}% erledigt
        </p>

        <h1 className="mt-3 font-display text-[26px] sm:text-[34px] leading-[1.12] tracking-[-0.012em] text-ink">
          {step.question}
        </h1>
        {step.helpText && (
          <p className="mt-3 text-[15.5px] text-ink2 leading-relaxed">{step.helpText}</p>
        )}

        {(step.id === 'interests' || step.id === 'hasInvoice') && (
          <WizardInstantEstimate
            key={step.id}
            interestHint={state.interests?.[0] ?? null}
          />
        )}

        <div
          className={
            step.id === 'interests' || step.id === 'hasInvoice' ? 'mt-5 grid gap-3' : 'mt-7 grid gap-3'
          }
          aria-live="polite"
        >
          {(step.type === 'single_choice' || step.type === 'multi_choice') && step.options && (
            <div role="radiogroup" aria-label={step.question} className="grid gap-2.5 relative z-10">
              {step.options.map((o: { id: string; label: string; description?: string }) => {
                const sel = isOptionSelected(state, step, o.id);
                return (
                  <OptionCard
                    key={o.id}
                    label={o.label}
                    description={o.description}
                    selected={sel}
                    onClick={() => onPickOption(setState, step, o.id)}
                  />
                );
              })}
            </div>
          )}

          {step.id === 'hasInvoice' && state.hasInvoice === 'upload_now' && (
            <WizardUpload file={file} onFile={setFile} busy={uploading} />
          )}

          {step.type === 'contact' && <ContactFields state={state} setField={setField} />}
          {step.type === 'consent' && <ConsentFields state={state} setField={setField} />}
        </div>

        {error && (
          <div
            role="alert"
            className="mt-5 rounded-elo border border-leadRed/40 bg-leadRed/5 px-4 py-3 text-[14px] text-leadRed"
          >
            {error}
          </div>
        )}

        {/* Desktop-Aktionen */}
        <div className="mt-9 hidden sm:flex items-center justify-between gap-3">
          <Button variant="ghost" size="lg" onClick={back} disabled={safeIdx === 0}>
            ← Zurück
          </Button>
          <div className="flex items-center gap-4">
            {!canNext && (
              <span className="text-[13px] text-muted">
                {step.type === 'contact'
                  ? 'Bitte mindestens Name, PLZ und Telefon oder E-Mail.'
                  : 'Bitte eine Option auswählen.'}
              </span>
            )}
            <Button
              variant="primary"
              size="xl"
              onClick={next}
              disabled={!canNext || isPending}
            >
              {isLast
                ? isPending
                  ? uploading
                    ? 'Datei wird hochgeladen…'
                    : 'Wird gesendet…'
                  : 'Kostenlose Energieprüfung anfragen'
                : 'Weiter →'}
            </Button>
          </div>
        </div>

        {/* Vertrauens-Strip unter Aktionen (Desktop) */}
        <TrustStrip />
      </div>

      {/* Sticky Mobile-Aktionen */}
      <div className="sm:hidden fixed inset-x-0 bottom-0 z-30 border-t border-line bg-paper/95 backdrop-blur">
        <div className="px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={back}
              disabled={safeIdx === 0}
              className="h-12 px-4 rounded-elo border border-line bg-card text-[14px] text-ink2 disabled:opacity-40"
            >
              ← Zurück
            </button>
            <Button
              variant="primary"
              size="lg"
              onClick={next}
              disabled={!canNext || isPending}
              fullWidth
            >
              {isLast
                ? isPending
                  ? uploading
                    ? 'Lädt…'
                    : 'Wird gesendet…'
                  : 'Anfragen'
                : 'Weiter →'}
            </Button>
          </div>
          <p className="mt-2 text-center text-[11.5px] text-muted">
            DSGVO · Verarbeitung in Deutschland
          </p>
        </div>
      </div>
    </div>
  );
}

function StepDots({ total, idx, done }: { total: number; idx: number; done: number }) {
  return (
    <div
      className="mt-2 flex items-center gap-1.5"
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={total}
      aria-valuenow={done}
    >
      {Array.from({ length: total }).map((_, i) => {
        const state = i < idx ? 'done' : i === idx ? 'active' : 'pending';
        const cls =
          state === 'done'
            ? 'bg-sage'
            : state === 'active'
              ? 'bg-sage'
              : 'bg-line';
        return (
          <span
            key={i}
            aria-hidden
            className={`h-1.5 flex-1 rounded-full ${cls} transition-colors`}
          />
        );
      })}
    </div>
  );
}

function TrustStrip() {
  return (
    <div className="mt-10 pt-6 border-t border-line grid grid-cols-1 sm:grid-cols-3 gap-3 text-[13px] text-muted">
      <span className="inline-flex items-center gap-2">
        <Dot /> Ca. 2 Minuten · jederzeit zurück
      </span>
      <span className="inline-flex items-center gap-2">
        <Dot /> Lokale Speicherung in dieser Sitzung
      </span>
      <span className="inline-flex items-center gap-2">
        <Dot /> DSGVO ·{' '}
        <Link href="/datenschutz" className="underline underline-offset-4 hover:text-ink">
          Datenschutz
        </Link>
      </span>
    </div>
  );
}

function Dot() {
  return <span aria-hidden className="size-1.5 rounded-full bg-sage shrink-0" />;
}

function isOptionSelected(s: AnswerState, step: FunnelStep, optionId: string): boolean {
  if (!step.field) return false;
  const v = s[step.field];
  if (step.id === 'interests') {
    return (Array.isArray(v) ? v[0] : undefined) === optionId;
  }
  return v === optionId;
}

function onPickOption(
  setState: Dispatch<SetStateAction<AnswerState>>,
  step: FunnelStep,
  optionId: string,
) {
  if (!step.field) return;
  if (step.id === 'interests') {
    setState((prev) => ({ ...prev, interests: [optionId as Interest] }));
  } else {
    setState((prev) => ({ ...prev, [step.field!]: optionId } as AnswerState));
  }
}

function ContactFields({
  state,
  setField,
}: {
  state: AnswerState;
  setField: <K extends keyof AnswerState>(k: K, v: AnswerState[K]) => void;
}) {
  return (
    <div className="grid gap-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <Field
          label="Vorname"
          autoComplete="given-name"
          value={state.firstName ?? ''}
          onChange={(e) => setField('firstName', e.target.value)}
          required
        />
        <Field
          label="Nachname"
          autoComplete="family-name"
          value={state.lastName ?? ''}
          onChange={(e) => setField('lastName', e.target.value)}
          required
        />
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <Field
          label="Telefon"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          hint="Schnellster Weg zur Auswertung"
          value={state.phone ?? ''}
          onChange={(e) => setField('phone', e.target.value)}
        />
        <Field
          label="E-Mail"
          type="email"
          inputMode="email"
          autoComplete="email"
          hint="Bitte mindestens Telefon oder E-Mail."
          value={state.email ?? ''}
          onChange={(e) => setField('email', e.target.value)}
        />
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <Field
          label="Postleitzahl"
          inputMode="numeric"
          autoComplete="postal-code"
          maxLength={5}
          value={state.postalCode ?? ''}
          onChange={(e) =>
            setField('postalCode', e.target.value.replace(/\D/g, '').slice(0, 5))
          }
          required
        />
        <Field
          label="Ort (optional)"
          autoComplete="address-level2"
          value={state.city ?? ''}
          onChange={(e) => setField('city', e.target.value)}
        />
      </div>
      <p className="text-[12.5px] text-muted leading-snug">
        Wir verwenden Ihre Daten zur Bearbeitung Ihrer Energieprüfungsanfrage.
      </p>
      {/* Honeypot */}
      <div className="elo-hp" aria-hidden>
        <label>
          Website
          <input type="text" name="website_url" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
    </div>
  );
}

function ConsentFields({
  state,
  setField,
}: {
  state: AnswerState;
  setField: <K extends keyof AnswerState>(k: K, v: AnswerState[K]) => void;
}) {
  return (
    <div className="grid gap-4">
      <div className="rounded-eloLg border border-line bg-card p-5 sm:p-6">
        <div className="grid gap-4">
          <Checkbox
            label={
              <>
                Ich habe die{' '}
                <Link
                  className="underline underline-offset-4"
                  href="/datenschutz"
                  target="_blank"
                  rel="noreferrer"
                >
                  Datenschutzerklärung
                </Link>
                {' '}
                gelesen und bin damit einverstanden, dass meine Angaben zur
                Bearbeitung meiner Anfrage zur persönlichen Energieprüfung
                verarbeitet werden. Mir ist bekannt, dass ich zur Bearbeitung
                meiner Anfrage per Telefon oder E-Mail kontaktiert werden kann.
              </>
            }
            checked={Boolean(state.privacyAccepted)}
            onChange={(e) => {
              setField('privacyAccepted', e.target.checked);
              setField('contactConsent', e.target.checked);
            }}
          />
          <Checkbox
            label={CONSENT_TEXTS.whatsapp}
            checked={Boolean(state.whatsappConsent)}
            onChange={(e) => setField('whatsappConsent', e.target.checked)}
          />
        </div>
      </div>
      <p className="text-[12.5px] text-muted leading-relaxed">
        Mit dem Absenden der Anfrage werden Ihre Angaben zur Bearbeitung Ihrer
        Energieprüfungsanfrage verarbeitet. Weitere Informationen finden Sie in
        unserer{' '}
        <Link
          href="/datenschutz"
          className="underline underline-offset-4 hover:text-ink"
        >
          Datenschutzerklärung
        </Link>
        .
      </p>
    </div>
  );
}

const UPLOAD_ACCEPT = 'application/pdf,image/jpeg,image/jpg,image/png';
const UPLOAD_MAX_BYTES = 10 * 1024 * 1024;

function formatBytes(n: number): string {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(0)} KB`;
  return `${(n / (1024 * 1024)).toFixed(1)} MB`;
}

function WizardUpload({
  file,
  onFile,
  busy,
}: {
  file: File | null;
  onFile: (f: File | null) => void;
  busy: boolean;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [drag, setDrag] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  const accept = (f: File | undefined | null) => {
    if (!f) return;
    const t = (f.type || '').toLowerCase();
    if (!UPLOAD_ACCEPT.split(',').includes(t)) {
      setLocalError('Nur PDF, JPG oder PNG sind möglich.');
      return;
    }
    if (f.size > UPLOAD_MAX_BYTES) {
      setLocalError('Die Datei darf maximal 10 MB groß sein.');
      return;
    }
    setLocalError(null);
    onFile(f);
  };

  if (file) {
    return (
      <div className="flex items-center gap-3 rounded-elo border border-sage/40 bg-sage/5 px-4 py-3">
        <span aria-hidden className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-sage/15 text-sage">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M14 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V8m-5-5l5 5m-5-5v5h5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-[14px] font-medium text-ink">{file.name}</p>
          <p className="text-[12px] text-muted">{formatBytes(file.size)} · angehängt</p>
        </div>
        <button
          type="button"
          disabled={busy}
          onClick={() => {
            onFile(null);
            if (inputRef.current) inputRef.current.value = '';
          }}
          className="shrink-0 text-[12.5px] font-medium text-muted hover:text-leadRed disabled:opacity-40"
        >
          Entfernen
        </button>
      </div>
    );
  }

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        className="sr-only"
        accept={UPLOAD_ACCEPT}
        onChange={(e) => accept(e.target.files?.[0])}
      />
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        onDragEnter={(e) => {
          e.preventDefault();
          setDrag(true);
        }}
        onDragOver={(e) => {
          e.preventDefault();
          setDrag(true);
        }}
        onDragLeave={() => setDrag(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDrag(false);
          accept(e.dataTransfer.files?.[0]);
        }}
        className={`flex w-full items-center gap-3 rounded-elo border border-dashed px-4 py-4 text-left transition-colors ${
          drag ? 'border-sage bg-sage/[0.06]' : 'border-borderLight bg-card hover:border-sage/50'
        }`}
      >
        <span aria-hidden className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-sage/10 text-sage">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M12 16V4m0 0l-4 4m4-4l4 4M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <span className="min-w-0">
          <span className="block text-[14px] font-medium text-ink">
            Rechnung hierher ziehen oder auswählen
          </span>
          <span className="block text-[12.5px] text-muted">PDF, JPG oder PNG · max. 10 MB · optional</span>
        </span>
      </button>
      {localError && (
        <p role="alert" className="mt-1.5 text-[12.5px] text-leadRed">
          {localError}
        </p>
      )}
    </div>
  );
}
