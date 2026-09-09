"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

type SidebarProps = { isOpen: boolean; onClose: () => void };
const menuItems = [
  { label: "Dashboard", icon: "⌂", href: "/dashboard" }, { label: "Market Scanner", icon: "⌕", href: "/scan" },
  { label: "Commodities", icon: "◇", href: "/history" }, { label: "Price Analytics", icon: "▥", href: "/report" },
  { label: "AI Insights", icon: "✦", href: "/report" }, { label: "Forecast & Trends", icon: "↗", href: "/report" },
  { label: "Risk Alerts", icon: "△", href: "/history" }, { label: "Reports & Analytics", icon: "▤", href: "/report" },
];

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  return <>
    {isOpen && <div className="fixed inset-0 z-40 bg-[#001d3d]/50 lg:hidden" onClick={onClose} />}
    <aside className={`fixed left-0 top-0 z-50 flex h-screen w-[244px] flex-col bg-[#032b4f] text-white shadow-xl transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
      <div className="border-b border-white/10 px-5 py-4"><div className="flex items-center gap-3"><Image src="/labeliq-logo.png" alt="LabeLiq" width={48} height={48} className="h-12 w-12 rounded-full bg-white object-cover" /><div><p className="text-[22px] font-bold tracking-tight">Labe<span className="text-[#30b466]">Liq</span></p><p className="text-[10px] tracking-wide text-[#b9d6c5]">Insights. Intelligence. Growth.</p></div></div></div>
      <nav className="flex-1 overflow-y-auto px-3 py-5"><p className="mb-2 px-3 text-[10px] font-semibold tracking-[.15em] text-[#a9c2d4]">MAIN MENU</p><div className="space-y-1">{menuItems.map((item) => {
        const active = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
        return <Link key={`${item.label}-${item.href}`} href={item.href} onClick={onClose} className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition ${active ? "bg-[#08783f] text-white shadow" : "text-[#e3eef5] hover:bg-white/10"}`}><span className="w-5 text-center text-lg">{item.icon}</span>{item.label}</Link>;
      })}</div><div className="mt-7 rounded-lg border border-white/15 p-3"><p className="text-[10px] font-semibold text-[#c9dce9]">QUICK ACTIONS</p><Link href="/scan" className="mt-3 flex items-center gap-2 rounded-md border border-[#22b969] px-2.5 py-2 text-xs font-medium text-white">⌕ Scan Product</Link><Link href="/report" className="mt-2 flex items-center gap-2 px-2.5 py-1.5 text-xs text-[#dceaf2]">☆ Generate Report</Link></div></nav>
      <div className="m-3 rounded-lg border border-white/15 p-3 text-xs text-[#dceaf2]"><p className="font-semibold text-white">Need help?</p><p className="mt-1">support@labeliq.demo</p></div><div className="border-t border-white/10 p-3"><Link href="/login" onClick={onClose} className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-[#dceaf2] hover:bg-white/10">⇥ Sign out</Link></div>
    </aside>
  </>;
}
