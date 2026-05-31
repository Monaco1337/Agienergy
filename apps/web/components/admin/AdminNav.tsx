'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

type IconName = 'cockpit' | 'leads' | 'settings' | 'analytics' | 'experiments' | 'research' | 'import' | 'audit';

function Icon({ name }: { name: IconName }) {
  const common = {
    width: 17,
    height: 17,
    viewBox: '0 0 20 20',
    fill: 'none',
    'aria-hidden': true,
    stroke: 'currentColor',
    strokeWidth: 1.5,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };
  switch (name) {
    case 'cockpit':
      return (
        <svg {...common}>
          <rect x="2.5" y="2.5" width="6.5" height="6.5" rx="1.5" />
          <rect x="11" y="2.5" width="6.5" height="4" rx="1.5" />
          <rect x="11" y="8.5" width="6.5" height="9" rx="1.5" />
          <rect x="2.5" y="11" width="6.5" height="6.5" rx="1.5" />
        </svg>
      );
    case 'leads':
      return (
        <svg {...common}>
          <circle cx="7.5" cy="6.5" r="2.6" />
          <path d="M2.8 16c.6-2.6 2.5-4 4.7-4s4.1 1.4 4.7 4" />
          <path d="M13.5 5.5a2.3 2.3 0 010 4.4M15 16c-.2-1.6-.9-2.9-1.9-3.6" />
        </svg>
      );
    case 'settings':
      return (
        <svg {...common}>
          <circle cx="10" cy="10" r="2.6" />
          <path d="M10 2.5v2M10 15.5v2M17.5 10h-2M4.5 10h-2M15.3 4.7l-1.4 1.4M6.1 13.9l-1.4 1.4M15.3 15.3l-1.4-1.4M6.1 6.1L4.7 4.7" />
        </svg>
      );
    case 'analytics':
      return (
        <svg {...common}>
          <path d="M3 17V8M8 17V4M13 17v-6M18 17V9" />
        </svg>
      );
    case 'experiments':
      return (
        <svg {...common}>
          <path d="M8 2.5v5L4 15a1.5 1.5 0 001.4 2.2h9.2A1.5 1.5 0 0016 15l-4-7.5v-5M6.5 2.5h7M7 11h6" />
        </svg>
      );
    case 'research':
      return (
        <svg {...common}>
          <circle cx="9" cy="9" r="5.5" />
          <path d="M13.5 13.5L17.5 17.5" />
        </svg>
      );
    case 'import':
      return (
        <svg {...common}>
          <path d="M10 2.5v9M6.5 8l3.5 3.5L13.5 8M3.5 14v1.5A1.5 1.5 0 005 17h10a1.5 1.5 0 001.5-1.5V14" />
        </svg>
      );
    case 'audit':
      return (
        <svg {...common}>
          <path d="M5 2.5h7l3.5 3.5V17a.5.5 0 01-.5.5H5a.5.5 0 01-.5-.5V3a.5.5 0 01.5-.5z" />
          <path d="M11.5 2.5V6h4M7 10h6M7 13h4" />
        </svg>
      );
  }
}

function SectionLabel({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`px-3 pt-2 pb-1.5 text-[10.5px] uppercase tracking-[0.14em] text-muted/70 font-semibold ${className}`}>
      {children}
    </div>
  );
}

function NavLink({ href, label, icon }: { href: string; label: string; icon: IconName }) {
  const pathname = usePathname();
  const active = href === '/admin' ? pathname === '/admin' : pathname.startsWith(href);
  return (
    <Link
      href={href}
      aria-current={active ? 'page' : undefined}
      className={`group relative flex items-center gap-3 rounded-elo px-3 py-2.5 text-[14px] transition-colors ${
        active
          ? 'bg-sage/10 text-ink font-semibold'
          : 'text-ink2 hover:bg-paper2 hover:text-ink'
      }`}
    >
      {active && (
        <span aria-hidden className="absolute left-0 top-1.5 bottom-1.5 w-[3px] rounded-full bg-sage" />
      )}
      <span className={active ? 'text-sage' : 'text-muted group-hover:text-ink2'}>
        <Icon name={icon} />
      </span>
      {label}
    </Link>
  );
}

function PreparedLink({ href, label, icon }: { href: string; label: string; icon: IconName }) {
  return (
    <Link
      href={href}
      className="group flex items-center gap-3 rounded-elo px-3 py-2.5 text-[14px] text-muted hover:bg-paper2 hover:text-ink2 transition-colors"
    >
      <span className="text-muted/70 group-hover:text-muted">
        <Icon name={icon} />
      </span>
      <span className="flex-1">{label}</span>
      <span className="text-[9.5px] uppercase tracking-[0.1em] rounded-full border border-line px-1.5 py-0.5 text-muted/70 group-hover:border-lineStrong">
        bald
      </span>
    </Link>
  );
}

export function AdminNav() {
  return (
    <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
      <SectionLabel>Vertrieb</SectionLabel>
      <NavLink href="/admin" label="Cockpit" icon="cockpit" />
      <NavLink href="/admin/leads" label="Leads" icon="leads" />

      <SectionLabel className="mt-5">Konto</SectionLabel>
      <NavLink href="/admin/settings" label="Einstellungen" icon="settings" />

      <SectionLabel className="mt-5">In Vorbereitung</SectionLabel>
      <PreparedLink href="/admin/funnel-analytics" label="Funnel-Analytics" icon="analytics" />
      <PreparedLink href="/admin/experiments" label="Experimente" icon="experiments" />
      <PreparedLink href="/admin/research" label="Research-Board" icon="research" />
      <PreparedLink href="/admin/import" label="CSV-Import" icon="import" />
      <PreparedLink href="/admin/audit" label="Audit-Log" icon="audit" />
      <p className="px-3 mt-2 text-[11.5px] leading-snug text-muted/80">
        Phase-2-Module. Werden produktiv mit Supabase, Cron und CRM-Integration freigeschaltet.
      </p>
    </nav>
  );
}
