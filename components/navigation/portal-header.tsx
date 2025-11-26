"use client";

import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

export function PortalHeader() {
  const pathname = usePathname();

  const segments = pathname.split("/").filter(Boolean).slice(1);

  const map = {
    filhos: "Meus Filhos",
    financeiro: "Financeiro",
    dados: "Meus Dados",
  } as any;

  return (
    <header className="sticky top-0 z-40 border-b border-slate-800/60 bg-slate-950/75 backdrop-blur-2xl shadow-[0_2px_10px_rgba(0,0,0,0.35)] relative">

      {/* Glow dourado premium */}
      <div
        className="absolute inset-x-0 top-0 h-10 
        bg-[radial-gradient(circle_at_top,rgba(250,204,21,0.12),transparent_75%)] 
        pointer-events-none"
      />

      <div className="relative z-10 flex items-center justify-between py-4 px-6">

        <div className="flex items-center gap-4">

          {/* Título */}
          <motion.span
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="font-bold text-2xl tracking-tight text-slate-100"
          >
            Portal do Responsável
          </motion.span>

          {/* Breadcrumb Premium */}
          <div className="flex items-center text-xs text-slate-500 pl-4 border-l border-slate-700/50">
            <span className="font-medium text-slate-400">Início</span>

            {segments.map((s: string, i: number) => (
              <span key={i} className="flex items-center gap-1 ml-1">
                <ChevronRight className="h-3 w-3 text-slate-500" />

                <span
                  className={`transition ${
                    i === segments.length - 1
                      ? "text-yellow-400 font-medium"
                      : "text-slate-400 hover:text-slate-300"
                  }`}
                >
                  {map[s] || s}
                </span>
              </span>
            ))}
          </div>
        </div>

        {/* Badge PRO de área */}
        <span
          className="
            text-[10px] px-3 py-1 
            rounded-xl
            bg-yellow-500/10 
            text-yellow-400 
            border border-yellow-500/30
            font-medium
            shadow-[0_0_10px_rgba(250,204,21,0.15)]
          "
        >
          Área do Responsável
        </span>

      </div>
    </header>
  );
}
