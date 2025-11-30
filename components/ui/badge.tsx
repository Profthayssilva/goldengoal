import * as React from "react";
import { cn } from "@/lib/utils";

type BadgeVariant = "default" | "outline" | "success" | "warning" | "danger";

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

/**
 * Badge estilizado para indicadores de status.
 * Variantes tipadas, styles consistentes e visual limpo.
 */
export function Badge({
  className,
  variant = "default",
  ...props
}: BadgeProps) {
  const styles: Record<BadgeVariant, string> = {
    default:
      "bg-slate-800 text-slate-100 border border-slate-700",

    outline:
      "bg-transparent text-slate-200 border border-slate-500",

    success:
      "bg-emerald-600/20 text-emerald-300 border border-emerald-500/50",

    warning:
      "bg-amber-500/15 text-amber-300 border border-amber-400/70",

    danger:
      "bg-red-500/15 text-red-300 border border-red-400/70",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5",
        "text-[11px] font-medium uppercase tracking-wide",
        styles[variant],
        className
      )}
      role="status"
      {...props}
    />
  );
}
