'use client';

import type { ReactNode } from 'react';

/**
 * Submit-Button für `<form action={serverAction}>`, der vor dem
 * Absenden eine native `confirm()`-Bestätigung einholt.
 *
 * Nötig, weil Server Components keine `onClick`/`onSubmit` an HTML-
 * Elemente weiterreichen dürfen. Diese kleine Client-Hülle nimmt das
 * Event entgegen und cancelt das Submit, wenn der User abbricht.
 */
export function ConfirmSubmit({
  children,
  className,
  message,
  type = 'submit',
}: {
  children: ReactNode;
  className?: string;
  message: string;
  type?: 'submit' | 'button';
}) {
  return (
    <button
      type={type}
      className={className}
      onClick={(e) => {
        if (!confirm(message)) e.preventDefault();
      }}
    >
      {children}
    </button>
  );
}
