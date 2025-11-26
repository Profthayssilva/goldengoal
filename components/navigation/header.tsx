"use client";

import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

export function Header() {
  const pathname = usePathname();

  // Remove "/painel"
  const parts = pathname.split("/").filter(Boolean).slice(1);

  // Mapa completo de páginas
  const map: Record<string, string> = {
    dashboard: "Dashboard",
    alunos: "Alunos",
    responsavel: "Responsáveis",
    financeiro: "Financeiro",
    mensagens: "Mensagens",
    matriculas: "Pré-Matrículas",
    dados: "Dados e Relatórios",
  };

  // Detecta ambiente automaticamente
  const env =
    process.env.NODE_ENV === "production"
      ? "Produção"
      : process.env.VERCEL_ENV === "preview"
      ? "Homologação"
      : "Desenvolvimento";

  // Última parte da URL
  const last = parts[parts.length - 1];

  // Evita exibir IDs no breadcrumb
  const isDynamic = last && last.length > 15;

  return (
    <header className="sticky top-0 z-40 border-b border-slate-800/60 bg-slate-950/75 backdrop-blur-2xl shadow-[0_2px_10px_rgba(0,0,0,0.35)]">


      {/* Glow dourado premium */}
      <div
        className="absolute inset-x-0 top-0 h-10 
        bg-[radial-gradient(circle_at_top,rgba(250,204,21,0.12),transparent_75%)] 
        pointer-events-none"
      />

      <div className="relative z-10 flex items-center justify-between py-4 px-6">

        {/* Breadcrumb + Título */}
        <div className="flex items-center gap-4">

          {/* Título principal dinâmico */}
          <motion.span
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="font-bold text-2xl tracking-tight text-slate-100"
          >
            {map[parts[0]] || "Painel do Gestor"}
          </motion.span>

          {/* Breadcrumb */}
          <div className="flex items-center text-xs text-slate-500 pl-4 border-l border-slate-700/50">
            <span className="font-medium text-slate-400">Início</span>

            {parts.map((p, i) => (
              <span key={i} className="flex items-center gap-1 ml-1">
                <ChevronRight className="h-3 w-3 text-slate-500" />

                <span
                  className={`transition ${
                    i === parts.length - 1
                      ? "text-yellow-400 font-medium"
                      : "text-slate-400 hover:text-slate-300"
                  }`}
                >
                  {isDynamic && i === parts.length - 1
                    ? "Detalhes"
                    : map[p] || p}
                </span>
              </span>
            ))}
          </div>
        </div>

        {/* Badge de ambiente */}
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
          {env}
        </span>
      </div>
    </header>
  );
}
