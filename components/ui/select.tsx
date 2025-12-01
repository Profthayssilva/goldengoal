"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  children: React.ReactNode;
}

/**
 * Select estilizado, semelhante aos outros componentes UI do projeto.
 * Mantém forma simples, sem Radix, 100% compatível com React padrão.
 */
export function Select({ className, children, ...props }: SelectProps) {
  return (
    <select
      className={cn(
        "w-full rounded-md border border-slate-700 bg-slate-800",
        "text-sm text-slate-100 px-3 py-2",
        "focus:outline-none focus:ring-2 focus:ring-yellow-500/70",
        "disabled:opacity-50 disabled:bg-slate-900",
        className
      )}
      {...props}
    >
      {children}
    </select>
  );
}

/**
 * SelectTrigger — wrapper apenas para manter compatibilidade com a API
 * usada pelo seu Financeiro Admin.
 */
export function SelectTrigger({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "w-full rounded-md border border-slate-700 bg-slate-800",
        "text-sm text-slate-100 px-3 py-2 cursor-pointer",
        "flex items-center justify-between",
        className
      )}
    >
      {children}
    </div>
  );
}

/**
 * SelectContent & SelectItem — wrappers sem funcionalidade,
 * garantindo compatibilidade com o padrão shadcn.
 */
export function SelectContent({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

export function SelectItem({
  value,
  children,
}: {
  value: string;
  children: React.ReactNode;
}) {
  return <option value={value}>{children}</option>;
}

/**
 * SelectValue — exibe valor atual dentro do SelectTrigger.
 */
export function SelectValue({ placeholder }: { placeholder?: string }) {
  return (
    <span className="text-slate-400 text-sm">
      {placeholder}
    </span>
  );
}
