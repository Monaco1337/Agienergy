import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth/session';
import { logoutAction } from '@/app/actions/auth';
import { Badge } from '@elo/ui';
import { Logo } from '@/components/brand/Logo';
import { AdminNav } from '@/components/admin/AdminNav';

export const dynamic = 'force-dynamic';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  if (!session) redirect('/admin/login');

  const initials = (session.email[0] ?? 'A').toUpperCase();

  return (
    <div className="agi-admin min-h-screen">
      <aside className="agi-admin-aside fixed inset-y-0 left-0 w-64 border-r border-line hidden lg:flex flex-col z-20">
        <div className="px-5 h-16 flex items-center border-b border-line">
          <Link href="/admin" className="flex items-center" aria-label="AGI Energy – Admin">
            <Logo variant="wordmark" size="sm" onDark />
          </Link>
        </div>

        <AdminNav />

        <div className="p-3 border-t border-line">
          <div className="flex items-center gap-3 rounded-elo px-2.5 py-2.5 bg-white/[0.04] border border-white/[0.06]">
            <span className="inline-flex items-center justify-center size-9 rounded-full bg-gradient-to-br from-cyan to-cyanDeep text-[#05201d] text-[14px] font-bold shrink-0">
              {initials}
            </span>
            <div className="min-w-0 flex-1">
              <div className="text-[12.5px] text-ink font-medium truncate">{session.email}</div>
              <div className="mt-0.5">
                <Badge tone="sage" className="!h-5 !px-2 !text-[10px]">
                  {session.role}
                </Badge>
              </div>
            </div>
          </div>
          <form action={logoutAction} className="mt-2.5">
            <button className="w-full text-left rounded-elo px-2.5 py-2 text-[13px] text-muted hover:text-ink hover:bg-white/[0.04] transition-colors">
              Abmelden
            </button>
          </form>
        </div>
      </aside>

      <main className="lg:pl-64 relative z-10">
        <div className="px-5 lg:px-10 py-8 lg:py-10">{children}</div>
      </main>
    </div>
  );
}
