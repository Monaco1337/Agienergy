'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button, Checkbox, Field, GlassCard } from '@elo/ui';
import { energyLandingContent } from '@/data/energyLandingContent';
import { validateLeadForm, toLeadPayload } from '@/lib/leadValidation';
import { submitLandingLead } from '@/lib/leadSubmit';
import { uploadLeadFile } from '@/lib/uploadFile';
import { ENERGY_LEAD_FORM_ID } from '@/lib/scrollToEnergyForm';
import { CONSENT_TEXTS } from '@/lib/consent';
import type { LeadCategory, LeadFormErrors, SubmitStatus } from '@/types/lead';
import { CategorySelector } from './CategorySelector';
import { UploadDropzone } from './UploadDropzone';

interface EnergyLeadFormProps {
  defaultCategory?: LeadCategory | null;
  emphasize?: boolean;
  onCategoryChange?: (category: LeadCategory | null) => void;
}

function ShieldIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 20 20" fill="none" aria-hidden className="shrink-0 text-cyanDeep">
      <path
        d="M10 2L3.5 4.5v5c0 4 2.8 7.5 6.5 8.5 3.7-1 6.5-4.5 6.5-8.5v-5L10 2z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path d="M7.5 10.2l1.8 1.8L13 8.2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function EnergyLeadForm({
  defaultCategory = null,
  emphasize = false,
  onCategoryChange,
}: EnergyLeadFormProps) {
  const c = energyLandingContent.leadForm;
  const router = useRouter();
  const [category, setCategory] = React.useState<LeadCategory | null>(defaultCategory);
  const [name, setName] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [zip, setZip] = React.useState('');
  const [annualConsumptionKwh, setAnnualConsumptionKwh] = React.useState('');
  const [file, setFile] = React.useState<File | null>(null);
  const [consent, setConsent] = React.useState(false);
  const [whatsappConsent, setWhatsappConsent] = React.useState(false);
  const [status, setStatus] = React.useState<SubmitStatus>('idle');
  const [errors, setErrors] = React.useState<LeadFormErrors>({});

  React.useEffect(() => {
    if (defaultCategory) setCategory(defaultCategory);
  }, [defaultCategory]);

  React.useEffect(() => {
    onCategoryChange?.(category);
  }, [category, onCategoryChange]);

  React.useEffect(() => {
    const h = (e: Event) => {
      const ce = e as CustomEvent<LeadCategory>;
      if (ce.detail) setCategory(ce.detail);
    };
    window.addEventListener('agi-preset-category', h as EventListener);
    return () => window.removeEventListener('agi-preset-category', h as EventListener);
  }, []);

  const reset = () => {
    setCategory(defaultCategory ?? null);
    setName('');
    setPhone('');
    setEmail('');
    setZip('');
    setAnnualConsumptionKwh('');
    setFile(null);
    setConsent(false);
    setWhatsappConsent(false);
    setErrors({});
    setStatus('idle');
  };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('validating');
    const input = {
      category,
      name,
      phone,
      email,
      zip,
      annualConsumptionKwh,
      file,
      consent,
      whatsappConsent,
    };
    const next = validateLeadForm(input);
    setErrors(next);
    if (Object.keys(next).length > 0) {
      setStatus('idle');
      return;
    }
    const payload = toLeadPayload(input);
    if (!payload) {
      setStatus('idle');
      return;
    }
    setStatus('submitting');
    try {
      if (file) {
        try {
          const uploaded = await uploadLeadFile(file);
          payload.filePathname = uploaded.pathname;
          payload.fileName = uploaded.fileName;
          payload.fileType = uploaded.fileType;
          payload.fileSize = uploaded.fileSize;
        } catch (uploadErr) {
          setStatus('idle');
          setErrors({
            file:
              uploadErr instanceof Error
                ? uploadErr.message
                : 'Die Datei konnte nicht hochgeladen werden.',
          });
          return;
        }
      }
      const result = await submitLandingLead(payload);
      setStatus('success');
      if (result.referralCode) {
        const qs = `?ref=${encodeURIComponent(result.referralCode)}`;
        router.push(`/danke${qs}`);
      }
    } catch {
      setStatus('error');
      setErrors({
        general:
          'Übermittlung fehlgeschlagen. Bitte versuchen Sie es erneut – Ihre Anfrage bleibt vertraulich.',
      });
    }
  }

  const busy = status === 'submitting';
  const locked = status === 'success' || busy;

  return (
    <GlassCard
      id={ENERGY_LEAD_FORM_ID}
      tone="dark"
      className={
        'hero-form-card scroll-mt-28 ' +
        (emphasize ? 'ring-1 ring-cyan/40 ring-offset-2 ring-offset-transparent' : '')
      }
    >
      {status === 'success' ? (
        <div className="p-7 sm:p-10 text-center space-y-5">
          <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-cyan/15 text-cyanDeep">
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M20 6L9 17l-5-5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h2 className="font-display text-2xl sm:text-[26px] font-semibold text-navy tracking-tight">
            {c.successTitle}
          </h2>
          <p className="text-[14.5px] text-slate leading-relaxed max-w-md mx-auto">{c.successText}</p>
          <Button type="button" variant="primary" size="lg" className="mt-2" onClick={reset}>
            {c.successCta}
          </Button>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="p-6 sm:p-7 lg:p-[26px]" noValidate>
          <p className="text-[13.5px] sm:text-[14px] text-slate leading-[1.5] mb-4 lg:mb-[18px]">
            {c.cardSubline}
          </p>

          {errors.general && (
            <div
              role="alert"
              className="mb-4 rounded-xl border border-error/30 bg-error/5 px-4 py-3 text-[13.5px] text-error"
            >
              {errors.general}
            </div>
          )}

          {/* Kategorie-Auswahl – kompakt */}
          <div className="mb-[18px]">
            <p className="text-[11px] font-medium text-slate uppercase tracking-[0.14em] mb-2">
              Bereich
            </p>
            <CategorySelector value={category} onChange={setCategory} disabled={locked} />
            {errors.category && (
              <p className="mt-1.5 text-[13px] text-error" role="alert">
                {errors.category}
              </p>
            )}
          </div>

          {/* Kontaktdaten + optionaler Upload dezent daneben */}
          <div className="grid gap-3 lg:grid-cols-[1fr_minmax(220px,0.72fr)] lg:items-start lg:gap-4 mb-[14px]">
            <div className="grid sm:grid-cols-2 gap-3">
              <Field
                label="Name"
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                error={errors.name}
                disabled={locked}
                required
              />
              <Field
                label="Telefonnummer"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                error={errors.phone}
                disabled={locked}
                required
              />
              <Field
                label="E-Mail-Adresse"
                type="email"
                inputMode="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={errors.email}
                disabled={locked}
                required
              />
              <Field
                label="PLZ"
                autoComplete="postal-code"
                value={zip}
                onChange={(e) => setZip(e.target.value)}
                error={errors.zip}
                disabled={locked}
                required
              />
              <Field
                label={c.annualConsumptionLabel}
                type="text"
                inputMode="numeric"
                placeholder={c.annualConsumptionPlaceholder}
                value={annualConsumptionKwh}
                onChange={(e) => setAnnualConsumptionKwh(e.target.value)}
                error={errors.annualConsumptionKwh}
                disabled={locked}
              />
            </div>

            <div className="lg:pt-[26px]">
              <UploadDropzone file={file} onFile={setFile} error={errors.file} disabled={locked} />
              <p className="mt-2 text-[10.5px] text-slate/95 leading-[1.45]">{c.uploadOfferHint}</p>
              <p className="mt-1.5 flex items-start gap-1.5 text-[10.5px] text-slate/80 leading-[1.4]">
                <ShieldIcon />
                <span>{c.uploadTrustLine}</span>
              </p>
            </div>
          </div>

          <div className="mt-[14px] mb-[16px]">
            <Checkbox
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              disabled={locked}
              label={
                <>
                  Ich habe die{' '}
                  <Link
                    href="/datenschutz"
                    className="text-cyanDeep underline underline-offset-2 font-medium hover:text-cyan transition-colors"
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
            />
            {errors.consent && (
              <p className="mt-1.5 text-[13px] text-error" role="alert">
                {errors.consent}
              </p>
            )}
            <div className="mt-4">
              <Checkbox
                checked={whatsappConsent}
                onChange={(e) => setWhatsappConsent(e.target.checked)}
                disabled={locked}
                label={CONSENT_TEXTS.whatsapp}
              />
            </div>
          </div>

          <Button type="submit" variant="primary" size="lg" fullWidth disabled={locked} className="h-[54px] text-[14.5px]">
            {busy ? c.submitting : 'Kostenlose Energieprüfung anfragen'}
          </Button>

          <p className="mt-2.5 text-center text-[11.5px] text-slate leading-[1.45]">
            Mit dem Absenden der Anfrage werden Ihre Angaben zur Bearbeitung Ihrer
            Energieprüfungsanfrage verarbeitet. Weitere Informationen finden Sie in
            unserer{' '}
            <Link
              href="/datenschutz"
              className="text-cyanDeep underline underline-offset-2 font-medium hover:text-cyan transition-colors"
            >
              Datenschutzerklärung
            </Link>
            .
          </p>
        </form>
      )}
    </GlassCard>
  );
}
