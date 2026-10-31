"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ShieldCheck,
  Flag,
  Users,
  ChartNoAxesColumn,
  UserCog,
  ScrollText,
  Shield,
} from "lucide-react";

import Brand from "./Brand";

const adminNavigation = [
  {
    label: "Dashboard",
    bangla: "ড্যাশবোর্ড",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Verifications",
    bangla: "যাচাইকরণ",
    href: "/admin/verifications",
    icon: ShieldCheck,
  },
  {
    label: "Reports & Flags",
    bangla: "রিপোর্ট এবং ফ্ল্যাগ",
    href: "/admin/reports",
    icon: Flag,
  },
  {
    label: "User Management",
    bangla: "ব্যবহারকারী ব্যবস্থাপনা",
    href: "/admin/users",
    icon: Users,
  },
  {
    label: "Analytics",
    bangla: "বিশ্লেষণ",
    href: "/admin/analytics",
    icon: ChartNoAxesColumn,
  },
];

const superAdminNavigation = [
  {
    label: "Admin Management",
    bangla: "অ্যাডমিন ব্যবস্থাপনা",
    href: "/super-admin/admin-management",
    icon: UserCog,
  },
  {
    label: "Audit Logs",
    bangla: "অডিট লগ",
    href: "/super-admin/audit-logs",
    icon: ScrollText,
  },
  {
    label: "Super Admin Overview",
    bangla: "সুপার অ্যাডমিন ওভারভিউ",
    href: "/super-admin/dashboard",
    icon: Shield,
  },
];

export default function Sidebar({ role = "admin" }) {
  const pathname = usePathname();
  const isSuperAdmin = role === "super_admin";

  return (
    <aside className="flex min-h-full w-64 shrink-0 flex-col bg-[#064E46] text-white">
      <div className="border-b border-white/10 px-5 py-5">
        <Brand />
      </div>

      <nav className="flex-1 space-y-6 px-3 py-5">
        <div>
          <p className="mb-3 px-3 text-[9px] font-semibold uppercase tracking-[0.16em] text-teal-100/50">
            Core Modules / মূল বিভাগ
          </p>

          <div className="space-y-1">
            {adminNavigation.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-lg border-l-2 px-3 py-2.5 text-xs transition-colors ${
                    isActive
                      ? "border-teal-300 bg-white/10 font-semibold text-white"
                      : "border-transparent text-teal-50/75 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <Icon size={16} strokeWidth={1.8} />

                  <span className="min-w-0">
                    <span className="block">{item.label}</span>
                    <span className="mt-0.5 block text-[10px] text-teal-100/65">
                      {item.bangla}
                    </span>
                  </span>
                </Link>
              );
            })}
          </div>
        </div>

        {isSuperAdmin && (
          <div>
            <p className="mb-3 px-3 text-[9px] font-semibold uppercase tracking-[0.16em] text-teal-100/50">
              Super Admin / সুপার অ্যাডমিন
            </p>

            <div className="space-y-1">
              {superAdminNavigation.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 rounded-lg border-l-2 px-3 py-2.5 text-xs transition-colors ${
                      isActive
                        ? "border-teal-300 bg-white/10 font-semibold text-white"
                        : "border-transparent text-teal-50/75 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <Icon size={16} strokeWidth={1.8} />

                    <span className="min-w-0">
                      <span className="block">{item.label}</span>
                      <span className="mt-0.5 block text-[10px] text-teal-100/65">
                        {item.bangla}
                      </span>
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </nav>

      <div className="border-t border-white/10 p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-teal-100/15 text-xs font-bold text-teal-100">
            {isSuperAdmin ? "SA" : "AD"}
          </div>

          <div className="min-w-0">
            <p className="truncate text-xs font-semibold">
              {isSuperAdmin ? "Super Admin" : "Admin"}
            </p>

            <p className="mt-0.5 text-[10px] text-teal-100/60">
              {isSuperAdmin ? "Full Access" : "Admin Access"}
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}