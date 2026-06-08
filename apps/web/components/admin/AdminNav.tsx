'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import type { Role } from '@elo/core';

type IconName =
  | 'cockpit'
  | 'feed'
  | 'leads'
  | 'distribution'
  | 'partners'
  | 'myleads'
  | 'tasks'
  | 'deals'
  | 'commissions'
  | 'performance'
  | 'audit'
  | 'settings';

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
    case 'feed':
      return (
        <svg {...common}>
          <path d="M3 6h14M3 10h14M3 14h9" />
          <circle cx="16" cy="14" r="1.4" />
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
    case 'distribution':
      return (
        <svg {...common}>
          <circle cx="10" cy="4.5" r="1.8" />
          <circle cx="4.5" cy="14.5" r="1.8" />
          <circle cx="15.5" cy="14.5" r="1.8" />
          <path d="M10 6.5l-4.6 6.6M10 6.5l4.6 6.6" />
        </svg>
      );
    case 'partners':
      return (
        <svg {...common}>
          <path d="M6.5 9.5a2.3 2.3 0 110-4.6 2.3 2.3 0 010 4.6zM13.5 9.5a2.3 2.3 0 110-4.6 2.3 2.3 0 010 4.6z" />
          <path d="M2.8 16c.4-2 1.8-3.4 3.7-3.4s3.3 1.4 3.7 3.4M9.8 16c.4-2 1.8-3.4 3.7-3.4s3.3 1.4 3.7 3.4" />
        </svg>
      );
    case 'myleads':
      return (
        <svg {...common}>
          <path d="M5 3.5h7l3 3V16a.5.5 0 01-.5.5H5a.5.5 0 01-.5-.5V4a.5.5 0 01.5-.5z" />
          <path d="M11.5 3.5V7H15M7 11h6M7 13.5h4" />
        </svg>
      );
    case 'tasks':
      return (
        <svg {...common}>
          <rect x="3" y="3" width="6" height="14" rx="1.5" />
          <rect x="11" y="3" width="6" height="9" rx="1.5" />
          <path d="M5 6.5l1.2 1.2L7.4 6" />
        </svg>
      );
    case 'deals':
      return (
        <svg {...common}>
          <path d="M3.5 6.5h13l-1.5 9a1 1 0 01-1 .9H6a1 1 0 01-1-.9L3.5 6.5z" />
          <path d="M7 6.5V4.7a1.5 1.5 0 011.5-1.5h3A1.5 1.5 0 0113 4.7v1.8" />
        </svg>
      );
    case 'commissions':
      return (
        <svg {...common}>
          <circle cx="10" cy="10" r="6.5" />
          <path d="M10 6.5v7M7.5 8.5c0-.9.8-1.5 2-1.5s2 .6 2 1.5-1 1.4-2 1.4-2 .5-2 1.4.8 1.5 2 1.5 2-.6 2-1.5" />
        </svg>
      );
    case 'performance':
      return (
        <svg {...common}>
          <path d="M3 17l4-5 3 3 7-9" />
          <path d="M13 6h4v4" />
        </svg>
      );
    case 'audit':
      return (
        <svg {...common}>
          <path d="M5 2.5h7l3.5 3.5V17a.5.5 0 01-.5.5H5a.5.5 0 01-.5-.5V3a.5.5 0 01.5-.5z" />
          <path d="M11.5 2.5V6h4M7 10h6M7 13h4" />
        </svg>
      );
    case 'settings':
      return (
        <svg {...common}>
          <circle cx="10" cy="10" r="2.6" />
          <path d="M10 2.5v2M10 15.5v2M17.5 10h-2M4.5 10h-2M15.3 4.7l-1.4 1.4M6.1 13.9l-1.4 1.4M15.3 15.3l-1.4-1.4M6.1 6.1L4.7 4.7" />
        </svg>
      );
  }
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-3 pt-3 pb-1.5 text-[10px] uppercase tracking-[0.18em] text-[var(--ops-muted)] font-semibold">
      {children}
    </div>
  );
}

function NavLink({
  href,
  label,
  icon,
  exact,
  badge,
  onNavigate,
}: {
  href: string;
  label: string;
  icon: IconName;
  exact?: boolean;
  badge?: number | string;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const active = exact ? pathname === href : pathname === href || pathname.startsWith(`${href}/`);
  return (
    <Link
      href={href}
      aria-current={active ? 'page' : undefined}
      data-active={active ? 'true' : 'false'}
      onClick={onNavigate}
      className="ops-nav-item group"
    >
      <span className="ops-nav-icon">
        <Icon name={icon} />
      </span>
      <span className="flex-1 truncate">{label}</span>
      {badge !== undefined && badge !== 0 && (
        <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-white/[0.06] text-[var(--ops-text-2)] border border-white/[0.08]">
          {badge}
        </span>
      )}
    </Link>
  );
}

export interface AdminNavProps {
  role: Role;
  /** Wird beim Klick aufgerufen – nutzt der Mobile-Drawer zum Schließen. */
  onNavigate?: () => void;
  counts?: {
    unassigned?: number;
    todayCalls?: number;
    openTasks?: number;
    pendingDeals?: number;
    openCommissions?: number;
  };
}

export function AdminNav({ role, onNavigate, counts = {} }: AdminNavProps) {
  const isAdmin = role === 'admin' || role === 'sales';
  const isPartner = role === 'partner';

  return (
    <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
      <SectionLabel>Operations</SectionLabel>
      <NavLink href="/admin" label="Cockpit" icon="cockpit" exact onNavigate={onNavigate} />
      {isAdmin && (
        <>
          <NavLink
            href="/admin/lead-feed"
            label="Lead Feed"
            icon="feed"
            badge={counts.unassigned}
            onNavigate={onNavigate}
          />
          <NavLink href="/admin/leads" label="Leads" icon="leads" onNavigate={onNavigate} />
          <NavLink
            href="/admin/distribution"
            label="Distribution"
            icon="distribution"
            badge={counts.unassigned}
            onNavigate={onNavigate}
          />
          <NavLink href="/admin/vertriebspartner" label="Vertriebspartner" icon="partners" onNavigate={onNavigate} />
        </>
      )}

      {isPartner && (
        <NavLink
          href="/admin/meine-leads"
          label="Meine Leads"
          icon="myleads"
          badge={counts.todayCalls}
          onNavigate={onNavigate}
        />
      )}

      <SectionLabel>Workflow</SectionLabel>
      <NavLink
        href="/admin/aufgaben"
        label="Aufgaben"
        icon="tasks"
        badge={counts.openTasks}
        onNavigate={onNavigate}
      />
      <NavLink
        href="/admin/abschluesse"
        label="Abschlüsse"
        icon="deals"
        badge={counts.pendingDeals}
        onNavigate={onNavigate}
      />
      <NavLink
        href="/admin/provisionen"
        label="Provisionen"
        icon="commissions"
        badge={counts.openCommissions}
        onNavigate={onNavigate}
      />
      <NavLink href="/admin/performance" label="Performance" icon="performance" onNavigate={onNavigate} />

      {isAdmin && (
        <>
          <SectionLabel>System</SectionLabel>
          <NavLink href="/admin/audit" label="Audit Log" icon="audit" onNavigate={onNavigate} />
          <NavLink href="/admin/settings" label="Einstellungen" icon="settings" onNavigate={onNavigate} />
        </>
      )}
    </nav>
  );
}

/**
 * Mobile-Topbar mit Burger-Button. Öffnet den Drawer mit der gleichen
 * `AdminNav` (steuert Sichtbarkeit per State). Versteckt sich auf `lg`.
 */
export function AdminMobileTopbar({
  role,
  email,
  counts,
}: {
  role: Role;
  email: string;
  counts?: AdminNavProps['counts'];
}) {
  const [open, setOpen] = useState(false);

  // Bei Routen-Wechsel automatisch schließen
  const pathname = usePathname();
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Body-Scroll sperren während Drawer offen
  useEffect(() => {
    if (open) {
      const original = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = original;
      };
    }
  }, [open]);

  return (
    <>
      <header className="lg:hidden sticky top-0 z-30 flex items-center justify-between h-14 px-4 border-b border-[var(--ops-border)] bg-[var(--ops-sidebar)]/90 backdrop-blur-md">
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Menü öffnen"
          className="inline-flex items-center justify-center size-10 rounded-lg border border-[var(--ops-border)] text-[var(--ops-text)] hover:bg-white/[0.04]"
        >
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
            <path d="M3 5h14M3 10h14M3 15h14" />
          </svg>
        </button>
        <Link href="/admin" className="text-[14px] font-display font-semibold tracking-[-0.01em] text-[var(--ops-text)]">
          AGI Energy <span className="text-[var(--ops-cyan)]">·</span> Operations
        </Link>
        <div className="text-[10.5px] text-[var(--ops-text-2)] uppercase tracking-[0.12em]">{role}</div>
      </header>

      {open && (
        <div className="lg:hidden fixed inset-0 z-40 ops-drawer-backdrop" onClick={() => setOpen(false)} role="presentation">
          <div
            className="absolute left-0 top-0 bottom-0 w-72 bg-[var(--ops-sidebar)] border-r border-[var(--ops-border)] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="h-14 px-4 flex items-center justify-between border-b border-[var(--ops-border)]">
              <span className="text-[14px] font-display font-semibold text-[var(--ops-text)]">Navigation</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Schließen"
                className="size-9 rounded-lg border border-[var(--ops-border)] text-[var(--ops-text-2)] hover:text-[var(--ops-text)]"
              >
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" className="mx-auto">
                  <path d="M4 4l8 8M12 4l-8 8" />
                </svg>
              </button>
            </div>
            <AdminNav role={role} counts={counts} onNavigate={() => setOpen(false)} />
            <div className="p-3 border-t border-[var(--ops-border)] text-[12px] text-[var(--ops-text-2)] truncate">
              {email}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
