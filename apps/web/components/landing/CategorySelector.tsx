'use client';

import type { ReactNode } from 'react';
import type { LeadCategory } from '@/types/lead';
import { energyLandingContent } from '@/data/energyLandingContent';
import { cn } from '@elo/ui';

const ORDER: LeadCategory[] = ['strom', 'gas', 'solar', 'gewerbe'];

const ICONS: Record<LeadCategory, ReactNode> = {
  strom: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M13 2L4 13h7l-1 9 9-11h-7l1-9z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  ),
  gas: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 3c1.5 3 5 5 5 9a5 5 0 11-10 0c0-2 1-3 2-4 0 2 1 3 2 3-1-3 0-5 1-8z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  ),
  solar: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M5.6 18.4L7 17M17 7l1.4-1.4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  ),
  gewerbe: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 21V7l8-4 8 4v14M9 21v-6h6v6M9 11h.01M12 11h.01M15 11h.01"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
};

interface CategorySelectorProps {
  value: LeadCategory | null;
  onChange: (c: LeadCategory) => void;
  disabled?: boolean;
}

export function CategorySelector({ value, onChange, disabled }: CategorySelectorProps) {
  const copy = energyLandingContent.categorySelector;
  return (
    <div className="grid grid-cols-2 gap-2.5" role="group" aria-label="Bereich">
      {ORDER.map((id) => {
        const sel = value === id;
        const meta = copy[id];
        return (
          <button
            key={id}
            type="button"
            disabled={disabled}
            aria-pressed={sel}
            onClick={() => onChange(id)}
            className={cn(
              'category-pill group relative flex items-center gap-2.5 rounded-xl px-[14px] py-2 text-left h-[56px]',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-0 focus-visible:ring-cyan',
              disabled && 'opacity-50 cursor-not-allowed',
              sel && 'category-pill--selected',
            )}
          >
            <span
              className="cat-icon-frame flex size-8 items-center justify-center rounded-lg shrink-0"
              aria-hidden
            >
              {ICONS[id]}
            </span>
            <span className="flex flex-col leading-tight min-w-0">
              <span className="cat-label font-display text-[13.5px] font-semibold tracking-[-0.005em] truncate">
                {meta.label}
              </span>
              <span className="cat-hint text-[11px] truncate">{meta.hint}</span>
            </span>
            {sel && (
              <span
                className="absolute top-1.5 right-1.5 flex size-[18px] items-center justify-center rounded-full bg-[rgba(57,216,232,0.95)] text-[#04080d] shadow-[0_0_0_3px_rgba(57,216,232,0.18)]"
                aria-hidden
              >
                <svg width="10" height="10" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M2.8 7.2L5.6 10L11.2 4"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
