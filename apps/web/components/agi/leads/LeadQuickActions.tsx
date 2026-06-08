'use client';

import type { Lead } from '@elo/core';

function PhoneIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 4.5c0 5.5 3 9 8.5 9l1.5-2.5-3-1.5-1.5 1.5c-2-1-3-2-4-4l1.5-1.5L4.5 3 3 4.5z" />
    </svg>
  );
}
function MailIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3.5" width="12" height="9" rx="1.5" />
      <path d="M2.5 4.5l5.5 4 5.5-4" />
    </svg>
  );
}
function WhatsIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2.5 13.5l1-3a5.5 5.5 0 113.6 3L4 13.5z" />
    </svg>
  );
}

function digits(s: string): string {
  return s.replace(/\D/g, '');
}

export function LeadQuickActions({ lead, compact = false }: { lead: Lead; compact?: boolean }) {
  const phone = lead.phone?.trim();
  const email = lead.email?.trim();
  const tel = phone ? `tel:${digits(phone).startsWith('0') ? '+49' + digits(phone).slice(1) : phone}` : null;
  const wa = phone
    ? `https://wa.me/${digits(phone).startsWith('0') ? '49' + digits(phone).slice(1) : digits(phone)}`
    : null;

  return (
    <div className="flex items-center gap-2">
      {tel && (
        <a
          href={tel}
          onClick={(e) => e.stopPropagation()}
          className={`inline-flex items-center justify-center gap-1.5 rounded-lg border border-[var(--ops-border)] hover:border-[rgba(54,230,208,0.45)] hover:text-[var(--ops-cyan)] text-[var(--ops-text)] transition-colors ${
            compact ? 'h-8 px-2 text-[11.5px]' : 'h-9 px-3 text-[12.5px]'
          }`}
          title={`Anrufen: ${phone}`}
        >
          <PhoneIcon />
          {!compact && <span className="font-medium">Anrufen</span>}
        </a>
      )}
      {wa && (
        <a
          href={wa}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className={`inline-flex items-center justify-center gap-1.5 rounded-lg border border-[var(--ops-border)] hover:border-[rgba(34,197,94,0.45)] hover:text-[var(--ops-success)] text-[var(--ops-text)] transition-colors ${
            compact ? 'h-8 px-2 text-[11.5px]' : 'h-9 px-3 text-[12.5px]'
          }`}
          title="WhatsApp öffnen"
        >
          <WhatsIcon />
          {!compact && <span className="font-medium">WhatsApp</span>}
        </a>
      )}
      {email && (
        <a
          href={`mailto:${email}`}
          onClick={(e) => e.stopPropagation()}
          className={`inline-flex items-center justify-center gap-1.5 rounded-lg border border-[var(--ops-border)] hover:border-[rgba(56,189,248,0.45)] hover:text-[var(--ops-blue)] text-[var(--ops-text)] transition-colors ${
            compact ? 'h-8 px-2 text-[11.5px]' : 'h-9 px-3 text-[12.5px]'
          }`}
          title={`E-Mail: ${email}`}
        >
          <MailIcon />
          {!compact && <span className="font-medium">E-Mail</span>}
        </a>
      )}
    </div>
  );
}
