import type { Lead } from '@elo/core';

const COLOR_MAP: Record<Lead['leadColor'], { bg: string; text: string; ring: string; label: string }> = {
  red: {
    bg: 'rgba(239,68,68,0.18)',
    text: '#fca5a5',
    ring: 'rgba(239,68,68,0.5)',
    label: 'Heiß',
  },
  orange: {
    bg: 'rgba(245,158,11,0.16)',
    text: '#fbbf24',
    ring: 'rgba(245,158,11,0.45)',
    label: 'Warm',
  },
  yellow: {
    bg: 'rgba(234,179,8,0.14)',
    text: '#facc15',
    ring: 'rgba(234,179,8,0.45)',
    label: 'Mittel',
  },
  blue: {
    bg: 'rgba(56,189,248,0.14)',
    text: '#7dd3fc',
    ring: 'rgba(56,189,248,0.45)',
    label: 'Info',
  },
  gray: {
    bg: 'rgba(255,255,255,0.05)',
    text: '#94a3b8',
    ring: 'rgba(255,255,255,0.12)',
    label: 'Unklar',
  },
  black: {
    bg: 'rgba(0,0,0,0.4)',
    text: '#94a3b8',
    ring: 'rgba(255,255,255,0.18)',
    label: 'Block',
  },
};

export function LeadScoreBadge({
  color,
  score,
  size = 'md',
}: {
  color: Lead['leadColor'];
  score: number;
  size?: 'sm' | 'md' | 'lg';
}) {
  const c = COLOR_MAP[color];
  const dim = size === 'lg' ? 56 : size === 'sm' ? 30 : 40;
  const fontSize = size === 'lg' ? 18 : size === 'sm' ? 11 : 14;
  return (
    <span
      className="inline-flex items-center justify-center font-display font-semibold tabular-nums shrink-0"
      style={{
        width: dim,
        height: dim,
        borderRadius: 999,
        background: c.bg,
        color: c.text,
        boxShadow: `inset 0 0 0 1px ${c.ring}`,
        fontSize,
      }}
      title={`${c.label} · Score ${score}`}
    >
      {score}
    </span>
  );
}
