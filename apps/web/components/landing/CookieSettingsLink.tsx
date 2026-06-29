'use client';

import { reopenConsent } from '@/components/landing/ConsentBanner';

interface Props {
  className?: string;
  children?: React.ReactNode;
}

/**
 * Kleiner Footer-Button, der den ConsentBanner wieder oeffnet.
 * Muss client-seitig sein, weil reopenConsent() ein CustomEvent dispatched.
 */
export function CookieSettingsLink({ className, children }: Props) {
  return (
    <button
      type="button"
      onClick={reopenConsent}
      className={className}
    >
      {children ?? 'Cookie-Einstellungen'}
    </button>
  );
}
