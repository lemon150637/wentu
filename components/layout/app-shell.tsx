"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpenText, FolderKanban, History, Languages } from "lucide-react";

import { ApiStatusIndicator } from "@/components/layout/api-status-indicator";
import { UserMenu } from "@/components/layout/user-menu";
import { SettingsNav } from "@/components/settings/settings-nav";
import { cn } from "@/lib/utils";

const appName = "文图";

const navItems = [
  { href: "/", label: "图文创作", icon: FolderKanban },
  { href: "/translate", label: "详情页翻译", icon: Languages },
  { href: "/xiaohongshu", label: "小红书图文", icon: BookOpenText },
  { href: "/history", label: "素材与作品", icon: History },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isSettings = pathname === "/settings" || pathname.startsWith("/settings/") || pathname === "/monitor/usage";
  const activeNavHref = navItems.find(item => item.href !== "/" && (pathname === item.href || pathname.startsWith(`${item.href}/`)))?.href
    ?? (pathname === "/tasks" || /^\/projects\/[^/]+\/(editor|export)(\/|$)/.test(pathname) ? "/history" : "/");
  return (
    <div className="wentu-shell min-h-screen text-foreground">
      <div className="mx-auto min-h-screen max-w-[1600px] px-4 py-5 md:px-6">
        <aside
          className="scrollbar-hidden fixed top-5 z-40 hidden h-[calc(100vh-2.5rem)] w-72 overflow-y-auto rounded-[1.25rem] border border-border bg-card p-5 shadow-soft md:flex md:flex-col"
          style={{ left: "max(1.5rem, calc((100vw - 1600px) / 2 + 1.5rem))" }}
        >
          <Link
            href="/"
            className="flex items-center gap-4 rounded-2xl border border-border bg-background p-4"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm dark:border-white/10 dark:bg-white">
              <img src="/wentu-mark.svg" alt={appName} className="h-full w-full object-cover" suppressHydrationWarning />
            </div>
            <div className="min-w-0 flex-1 space-y-1">
              <p className="text-lg font-semibold leading-6 tracking-normal text-slate-950 dark:text-white">{appName}</p>
              <p className="whitespace-nowrap text-xs leading-5 tracking-[0.02em] text-muted-foreground">商家商品图文工作台</p>
            </div>
          </Link>

          {isSettings ? <div className="mt-6"><SettingsNav /></div> : <nav aria-label="主导航" className="mt-6 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={activeNavHref === item.href ? "page" : undefined}
                  className={cn(
                    "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    activeNavHref === item.href
                      ? "bg-secondary font-semibold text-primary ring-1 ring-inset ring-border"
                      : "text-muted-foreground hover:bg-accent hover:text-foreground",
                  )}
                >
                  <Icon aria-hidden="true" className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>}

          <div className="mt-auto pt-6"><p className="mb-4 px-3 text-xs leading-6 text-muted-foreground">商品上新，从容有序。<br />文案与视觉，在此准备。</p>
            <UserMenu />
          </div>
        </aside>

        <main className="min-w-0 rounded-[1.25rem] border border-border bg-card p-5 shadow-soft md:ml-[19.5rem] md:p-8">
          <div className="mb-6 flex min-w-0 items-center justify-between gap-3 md:justify-end">
            <div className="shrink-0 md:hidden"><UserMenu compact /></div>
            <ApiStatusIndicator />
          </div>
          {isSettings ? <div className="mb-6 border-b border-border pb-4 md:hidden"><SettingsNav mobile /></div> : <nav aria-label="移动端主导航" className="mb-6 flex flex-wrap gap-2 border-b border-border pb-4 md:hidden">
            {navItems.map(({ href, label, icon: Icon }) => (
              <Link key={href} href={href} aria-current={activeNavHref === href ? "page" : undefined} className={cn("flex items-center gap-2 rounded-xl px-3 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", activeNavHref === href ? "bg-secondary font-semibold text-primary ring-1 ring-inset ring-border" : "text-muted-foreground hover:bg-accent hover:text-foreground")}>
                <Icon aria-hidden="true" className="h-4 w-4" />
                {label}
              </Link>
            ))}
          </nav>}
          {children}
        </main>
      </div>
    </div>
  );
}
