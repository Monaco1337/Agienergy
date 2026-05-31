'use client';

import * as React from 'react';
import Link from 'next/link';
import { cn } from '@elo/ui';
import { energyLandingContent } from '@/data/energyLandingContent';

type FieldErrors = Partial<Record<'name' | 'email' | 'phone' | 'message' | 'consent', string[]>>;

export function FaqContactCta() {
  const c = energyLandingContent.faqContact;
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [consent, setConsent] = React.useState(false);
  const [company, setCompany] = React.useState('');
  const [busy, setBusy] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [fields, setFields] = React.useState<FieldErrors>({});

  const reset = () => {
    setName('');
    setEmail('');
    setPhone('');
    setMessage('');
    setConsent(false);
    setCompany('');
    setSuccess(false);
    setError(null);
    setFields({});
  };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setFields({});
    setBusy(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          phone,
          message,
          consent,
          company,
        }),
      });
      const data = (await res.json()) as {
        ok?: boolean;
        error?: string;
        fields?: FieldErrors;
      };
      if (!res.ok) {
        if (data.fields) {
          setFields(data.fields);
          setError(data.error ?? c.errorGeneric);
        } else {
          setError(data.error ?? c.errorGeneric);
        }
        setBusy(false);
        return;
      }
      setSuccess(true);
      setOpen(false);
      setBusy(false);
    } catch {
      setError(c.errorGeneric);
      setBusy(false);
    }
  }

  const firstErr = (k: keyof FieldErrors) => fields[k]?.[0];

  return (
    <div className="faq-contact-wrap mx-auto max-w-[860px] mt-14 sm:mt-16 text-center">
      {!success && (
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="faq-contact-open-btn"
          aria-expanded={open}
        >
          {c.cta}
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden
            className={cn('shrink-0 transition-transform duration-300', open && 'rotate-180')}
          >
            <path
              d="M4 6l4 4 4-4"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )}

      {success && (
        <div className="faq-contact-success">
          <div className="faq-contact-success-icon" aria-hidden>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path
                d="M20 6L9 17l-5-5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h3 className="faq-contact-success-title">{c.successTitle}</h3>
          <p className="faq-contact-success-text">{c.successText}</p>
          <button type="button" className="faq-contact-open-btn mt-6" onClick={reset}>
            {c.back}
          </button>
        </div>
      )}

      {open && !success && (
        <div className="faq-contact-panel text-left">
          <h3 className="faq-contact-panel-title">{c.title}</h3>
          <p className="faq-contact-panel-intro">{c.intro}</p>

          {error && (
            <div className="faq-contact-alert" role="alert">
              {error}
            </div>
          )}

          <form onSubmit={onSubmit} className="faq-contact-form mt-6 space-y-4" noValidate>
            {/* Honeypot */}
            <label className="sr-only" htmlFor="faq-contact-company">
              Firma
            </label>
            <input
              id="faq-contact-company"
              name="company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              tabIndex={-1}
              autoComplete="off"
              className="absolute -left-[9999px] h-0 w-0 opacity-0"
              aria-hidden
            />

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="faq-contact-field">
                <label htmlFor="faq-name">{c.name}</label>
                <input
                  id="faq-name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                  required
                  aria-invalid={Boolean(firstErr('name'))}
                />
                {firstErr('name') && (
                  <p className="faq-contact-field-error">{firstErr('name')}</p>
                )}
              </div>
              <div className="faq-contact-field">
                <label htmlFor="faq-email">{c.email}</label>
                <input
                  id="faq-email"
                  name="email"
                  type="email"
                  inputMode="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  required
                  aria-invalid={Boolean(firstErr('email'))}
                />
                {firstErr('email') && (
                  <p className="faq-contact-field-error">{firstErr('email')}</p>
                )}
              </div>
            </div>

            <div className="faq-contact-field">
              <label htmlFor="faq-phone">{c.phone}</label>
              <input
                id="faq-phone"
                name="phone"
                type="tel"
                inputMode="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                autoComplete="tel"
                required
                aria-invalid={Boolean(firstErr('phone'))}
              />
              {firstErr('phone') && (
                <p className="faq-contact-field-error">{firstErr('phone')}</p>
              )}
            </div>

            <div className="faq-contact-field">
              <label htmlFor="faq-message">{c.message}</label>
              <textarea
                id="faq-message"
                name="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={c.placeholderMessage}
                rows={5}
                required
                aria-invalid={Boolean(firstErr('message'))}
              />
              {firstErr('message') && (
                <p className="faq-contact-field-error">{firstErr('message')}</p>
              )}
            </div>

            <div className="faq-contact-consent">
              <label className="faq-contact-consent-label">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  aria-invalid={Boolean(firstErr('consent'))}
                />
                <span>
                  {c.consentBefore}
                  <Link href="/datenschutz" className="faq-contact-consent-link">
                    {c.consentLink}
                  </Link>
                  .
                </span>
              </label>
              {firstErr('consent') && (
                <p className="faq-contact-field-error">{firstErr('consent')}</p>
              )}
            </div>

            <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3 pt-2">
              <button
                type="button"
                className="faq-contact-secondary"
                onClick={() => {
                  setOpen(false);
                  setError(null);
                  setFields({});
                }}
              >
                {c.cancel}
              </button>
              <button type="submit" className="faq-contact-submit" disabled={busy}>
                {busy ? c.submitting : c.submit}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
