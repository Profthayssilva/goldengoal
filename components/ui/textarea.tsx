import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

/**
 * Textarea base profissional:
 * - Visual consistente com Input
 * - Suporte a estado de erro
 * - Acessibilidade via aria-invalid
 */
export function Textarea({ className, error, ...props }: TextareaProps) {
  return (
    <textarea
      className={cn(
        "block w-full rounded-lg border bg-slate-900 px-3 py-2 text-sm text-slate-100 shadow-sm",
        "placeholder:text-slate-500",
        "focus:outline-none focus:ring-1 resize-none",
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
