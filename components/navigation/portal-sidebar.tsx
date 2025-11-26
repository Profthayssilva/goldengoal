"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Users, CreditCard, User, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { useState } from "react";
import { motion } from "framer-motion";

export function PortalSidebar() {
  const pathname = usePathname();
  const [hover, setHover] = useState(false);

  const links = [
    { label: "Meus Filhos", href: "/portal/filhos", icon: Users },
    { label: "Financeiro", href: "/portal/financeiro", icon: CreditCard },
    { label: "Meus Dados", href: "/portal/dados", icon: User },
  ];

  return (
    <aside
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={`
        group flex flex-col min-h-screen border-r border-slate-800/60
        bg-slate-900/40 backdrop-blur-2xl relative overflow-hidden
        transition-all duration-300
        ${hover ? "w-56" : "w-20"}
      `}
    >
      {/* Glow dourado lateral */}
      <div
        className="absolute inset-y-0 left-0 w-16 
        bg-[radial-gradient(circle_at_left,rgba(250,204,21,0.08),transparent_85%)]
        pointer-events-none"
      />

      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-7 relative z-10">
        <div className="h-11 w-11 rounded-xl bg-yellow-500 flex items-center justify-center shadow-lg shadow-yellow-500/25">
          <span className="text-slate-900 font-extrabold text-lg">R</span>
        </div>

        {hover && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="font-semibold text-lg text-slate-100 tracking-wide"
          >
            Responsável
          </motion.span>
        )}
      </div>

      {/* Navegação */}
      <nav className="px-3 space-y-1 flex-1 relative z-10">
        {links.map((item, idx) => {
          const active = pathname.startsWith(item.href);
          const Icon = item.icon;

          return (
            <Link
              key={idx}
              href={item.href}
              className={`
                flex items-center gap-3 px-3 py-3 rounded-xl transition-all
                ${
                  active
                    ? "bg-yellow-500/15 text-yellow-400 border border-yellow-500/40 shadow-sm shadow-yellow-500/10"
                    : "text-slate-300 hover:bg-slate-800/40 hover:text-slate-100"
                }
              `}
            >
              <Icon className="h-5 w-5 min-w-[20px]" />
              {hover && (
                <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  {item.label}
                </motion.span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="px-4 py-6 border-t border-slate-800/70 relative z-10">
        <button
          onClick={() => signOut()}
          className="
            flex items-center gap-3 w-full px-3 py-3 rounded-xl text-sm
            text-slate-300 hover:bg-slate-800/50 hover:text-yellow-400 transition-all
          "
        >
          <LogOut className="h-5 w-5 min-w-[20px]" />
          {hover && (
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              Sair
            </motion.span>
          )}
        </button>
      </div>
    </aside>
  );
}
