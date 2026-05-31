'use client';

export function PrintButton({ className = '' }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className={
        className ||
        'no-print inline-flex items-center gap-2 h-10 px-4 rounded-elo border border-line bg-card text-[14px] font-medium text-ink hover:border-lineStrong hover:bg-paper2/60 transition-colors'
      }
    >
      <svg width="15" height="15" viewBox="0 0 20 20" fill="none" aria-hidden stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 7V3h8v4M6 14H4.5A1.5 1.5 0 013 12.5v-3A1.5 1.5 0 014.5 8h11A1.5 1.5 0 0117 9.5v3a1.5 1.5 0 01-1.5 1.5H14M6 12h8v5H6z" />
      </svg>
      Drucken / PDF
    </button>
  );
}
