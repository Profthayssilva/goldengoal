import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

/**
 * Input base totalmente estável.
 * - Compatível com todos os tipos HTML
 * - Suporte a estado de erro
 * - Acessibilidade aprimorada
 * - Design alinhado ao restante do sistema
 */
export function Input({ className, error, ...props }: InputProps) {
  return (
    <input
      className={cn(
        "block w-full rounded-lg border bg-slate-900 px-3 py-2 text-sm text-slate-100 shadow-sm",
        "placeholder:text-slate-500",
        "focus:outline-none focus:ring-1",
        error
          ? "border-red-500 focus:ring-red-500"
          : "border-slate-700 focus:border-yellow-500 focus:ring-yellow-500",
        "disabled:cursor-not-allowed disabled:opacity-60",
        className
      )}
      aria-invalid={error || undefined}
      {...props}
    />
  );
}
