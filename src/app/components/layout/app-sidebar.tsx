"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, LifeBuoy, Tickets, Users } from "lucide-react";

const navItems = [
  {
    label: "Overview",
    href: "/overview",
    icon: BarChart3,
  },
  {
    label: "Tickets",
    href: "/tickets",
    icon: Tickets,
  },
  {
    label: "Customers",
    href: "/customers",
    icon: Users,
  },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-72 border-r border-slate-200 bg-white xl:flex xl:flex-col">
      <div className="border-b border-slate-200 px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-900 text-white">
            <LifeBuoy className="h-5 w-5" />
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Support Ops
            </p>
            <h2 className="text-base font-semibold text-slate-900">
              Dashboard
            </h2>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-4 py-4">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={[
                    "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition",
                    isActive
                      ? "bg-slate-900 text-white"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
                  ].join(" ")}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
