import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "primary"
    | "secondary"
    | "ghost"
    | "danger"
    | "destructive"
    | "success"
    | "warning"
    | "outline"
    | "link"
    | "soft";
  size?: "sm" | "default" | "lg";
}

export function Button({
  className,
  variant = "primary",
  size = "default",
  ...props
}: ButtonProps) {
  const variants: Record<string, string> = {
    primary:
      "bg-yellow-500 text-slate-900 hover:bg-yellow-400 disabled:bg-yellow-700/60",

    secondary:
      "bg-slate-700 text-slate-100 hover:bg-slate-600 disabled:bg-slate-800/70",

    ghost:
      "bg-transparent text-slate-200 hover:bg-slate-800 disabled:text-slate-500",

    danger:
      "bg-red-500 text-white hover:bg-red-400 disabled:bg-red-700/70",

    // NOVOS VARIANTS
    destructive:
      "bg-red-700 text-white hover:bg-red-600 disabled:bg-red-900/60",

    success:
      "bg-green-600 text-white hover:bg-green-500 disabled:bg-green-800/60",

    warning:
      "bg-orange-500 text-white hover:bg-orange-400 disabled:bg-orange-700/60",

    outline:
      "border border-slate-500 text-slate-200 hover:bg-slate-800/20 disabled:opacity-60",

    link:
      "underline text-yellow-400 hover:text-yellow-300 p-0 bg-transparent",

    soft:
      "bg-yellow-500/15 text-yellow-400 hover:bg-yellow-500/25 disabled:opacity-50",
  };

  const sizes: Record<string, string> = {
    sm: "h-8 px-3 text-xs",
    default: "h-10 px-4 text-sm",
    lg: "h-12 px-6 text-base",
  };

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition focus:outline-none focus:ring-2 focus:ring-yellow-500/70 focus:ring-offset-2 focus:ring-offset-slate-950 disabled:cursor-not-allowed",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    />
  );
}
