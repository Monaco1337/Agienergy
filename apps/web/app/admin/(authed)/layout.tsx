import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth/session';
import { logoutAction } from '@/app/actions/auth';
import { Badge } from '@elo/ui';
import { Logo } from '@/components/brand/Logo';
import { AdminNav, AdminMobileTopbar } from '@/components/admin/AdminNav';
import { getStorage } from '@elo/storage';

export const dynamic = 'force-dynamic';

async function loadCounts(role: string, userId: string) {
  const storage = getStorage();
  if (role === 'partner') {
    // Partner sieht eigene Zahlen
    const me = (await storage.listUsers()).find((u) => u.id === userId);
    const partnerId = me?.partnerId;
    if (!partnerId) return { unassigned: 0, todayCalls: 0, openTasks: 0, pendingDeals: 0, openCommissions: 0 };
    const [leads, tasks, deals, commissions] = await Promise.all([
      storage.listLeads({ assignedPartnerId: partnerId }),
      storage.listTasks({ partnerId: partnerId as never, statuses: ['open', 'today', 'in_progress'] }),
      storage.listDeals({ partnerId: partnerId as never, statuses: ['reported', 'review'] }),
      storage.listCommissions({ partnerId: partnerId as never, statuses: ['pending', 'approved'] }),
    ]);
    return {
      unassigned: 0,
      todayCalls: leads.filter((l) => l.status === 'Heute anrufen' || l.status === 'Neu').length,
      openTasks: tasks.length,
      pendingDeals: deals.length,
      openCommissions: commissions.length,
    };
  }

  const [leads, tasks, deals, commissions] = await Promise.all([
    storage.listLeads({ unassigned: true }),
    storage.listTasks({ statuses: ['open', 'today', 'in_progress'] }),
    storage.listDeals({ statuses: ['reported', 'review'] }),
    storage.listCommissions({ statuses: ['pending', 'approved'] }),
  ]);
  return {
    unassigned: leads.length,
    todayCalls: 0,
    openTasks: tasks.length,
    pendingDeals: deals.length,
    openCommissions: commissions.length,
  };
}

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  if (!session) redirect('/admin/login');

  const initials = (session.email[0] ?? 'A').toUpperCase();
  const counts = await loadCounts(session.role, session.userId);

  return (
    <div className="agi-admin min-h-screen">
      {/* Desktop-Sidebar */}
      <aside className="agi-admin-aside fixed inset-y-0 left-0 w-64 border-r border-[var(--ops-border)] hidden lg:flex flex-col z-20">
        <div className="px-5 h-16 flex items-center border-b border-[var(--ops-border)]">
          <Link href="/admin" className="flex items-center" aria-label="AGI Energy – Operations Center">
            <Logo variant="wordmark" size="sm" onDark />
          </Link>
        </div>

        <AdminNav role={session.role} counts={counts} />

        <div className="p-3 border-t border-[var(--ops-border)]">
          <div className="flex items-center gap-3 rounded-[12px] px-2.5 py-2.5 bg-white/[0.04] border border-white/[0.06]">
            <span className="inline-flex items-center justify-center size-9 rounded-full bg-gradient-to-br from-[var(--ops-cyan)] to-[#0fb5a1] text-[#062420] text-[14px] font-bold shrink-0">
              {initials}
            </span>
            <div className="min-w-0 flex-1">
              <div className="text-[12.5px] text-[var(--ops-text)] font-medium truncate">{session.email}</div>
              <div className="mt-0.5">
                <Badge tone="sage" className="!h-5 !px-2 !text-[10px]">
                  {session.role}
                </Badge>
              </div>
            </div>
          </div>
          <form action={logoutAction} className="mt-2.5">
            <button className="w-full text-left rounded-[10px] px-2.5 py-2 text-[13px] text-[var(--ops-text-2)] hover:text-[var(--ops-text)] hover:bg-white/[0.04] transition-colors">
              Abmelden
            </button>
          </form>
        </div>
      </aside>

      {/* Mobile Topbar mit Drawer */}
      <AdminMobileTopbar role={session.role} email={session.email} counts={counts} />

      <main className="lg:pl-64 relative z-10">
        <div className="px-4 sm:px-5 lg:px-10 py-6 lg:py-10">{children}</div>
      </main>
    </div>
  );
}
