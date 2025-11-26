"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  CreditCard,
  MessageSquare,
  LogOut,
  UserCog,
  ShieldCheck,
} from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function Sidebar() {
  const pathname = usePathname();

  const [hover, setHover] = useState(false);
  const [role, setRole] = useState("GESTOR"); // padrão
  const [name, setName] = useState("Gestor");

  // Buscar dados do usuário via cookie
  useEffect(() => {
    async function load() {
      const res = await fetch("/api/auth/me");
      const dados = await res.json();

      if (dados.logado) {
        setRole(dados.role);
        setName("Admin"); // você pode trocar depois se tiver nome real
      }
    }
    load();
  }, []);

  // LINKS PRINCIPAIS
  const links = [
    {
      label: "Dashboard",
      href: "/painel/dashboard",
      icon: LayoutDashboard,
      allow: ["ADMIN", "GESTOR"],
    },
    {
      label: "Alunos",
      href: "/painel/alunos",
      icon: Users,
      allow: ["ADMIN", "GESTOR"],
    },
    {
      label: "Responsáveis",
      href: "/painel/responsavel",
      icon: UserCog,
      allow: ["ADMIN", "GESTOR"],
    },
    {
      label: "Financeiro",
      href: "/painel/financeiro",
      icon: CreditCard,
      allow: ["ADMIN", "GESTOR"],
    },
    {
      label: "Mensagens",
      href: "/painel/mensagens",
      icon: MessageSquare,
      allow: ["ADMIN", "GESTOR"],
    },
  ].filter((item) => item.allow.includes(role));

  // LINKS DO ADMIN
  const adminLinks =
    role === "ADMIN"
      ? [
          {
            label: "Administração",
            href: "/painel/admin/users",
            icon: ShieldCheck,
          },
        ]
      : [];

  function logout() {
    document.cookie =
      "admin_token=; Max-Age=0; path=/; SameSite=Strict;";
    window.location.href = "/login";
  }

  return (
    <aside
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={`
        group flex flex-col min-h-screen
        border-r border-slate-800/60 bg-slate-900/40 backdrop-blur-2xl 
        relative overflow-hidden
        transition-all duration-300
        ${hover ? "w-56" : "w-20"}
      `}
    >
      {/* Glow esquerdo */}
      <div
        className="absolute inset-y-0 left-0 w-20 
        bg-[radial-gradient(circle_at_left,rgba(250,204,21,0.08),transparent_85%)]
        pointer-events-none"
      />

      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-7 relative z-10">
        <div className="h-11 w-11 rounded-xl bg-yellow-500 flex items-center justify-center shadow-lg shadow-yellow-500/25">
          <span className="text-slate-900 font-extrabold text-lg">G</span>
        </div>

        {hover && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="font-semibold text-lg tracking-wide text-slate-100"
          >
            Gestor
          </motion.span>
        )}
      </div>

      {/* LINKS */}
      <nav className="px-3 space-y-1 flex-1 relative z-10">
        {links.map((item, i) => {
          const active = pathname.startsWith(item.href);
          const Icon = item.icon;

          return (
            <Link
              key={i}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all
                ${
                  active
                    ? "bg-yellow-500/15 text-yellow-400 border border-yellow-500/40 shadow-sm shadow-yellow-500/10"
                    : "text-slate-300 hover:bg-slate-800/40 hover:text-slate-100"
                }`}
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

        {/* ADMIN */}
        {adminLinks.map((item, i) => {
          const active = pathname.startsWith(item.href);
          const Icon = item.icon;

          return (
            <Link
              key={"admin-" + i}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all
                ${
                  active
                    ? "bg-yellow-500/15 text-yellow-400 border border-yellow-500/40 shadow-sm"
                    : "text-slate-300 hover:bg-slate-800/40 hover:text-slate-100"
                }`}
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

      {/* PERFIL + LOGOUT */}
      <div className="px-4 py-6 border-t border-slate-800/70 relative z-10 space-y-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center shadow-sm shadow-black/20">
            <span className="text-xs text-slate-300 uppercase">
              {name.substring(0, 2)}
            </span>
          </div>

          {hover && (
            <div>
              <p className="text-sm font-medium text-slate-100">{name}</p>
              <p className="text-xs text-slate-400 capitalize">{role}</p>
            </div>
          )}
        </div>

        <button
          onClick={logout}
          className="flex items-center gap-3 w-full px-3 py-3 text-sm rounded-xl 
            text-slate-300 hover:bg-slate-800/50 hover:text-yellow-400 transition-all"
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
