import * as React from "react";
import { cn } from "@/lib/utils";

type Variant =
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

type Size = "sm" | "default" | "lg";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

export function Button({
  className,
  variant = "primary",
  size = "default",
  ...props
}: ButtonProps) {
  const variants: Record<Variant, string> = {
    primary:
      "bg-yellow-500 text-slate-900 hover:bg-yellow-400 disabled:bg-yellow-700/60 disabled:text-slate-400",

    secondary:
      "bg-slate-700 text-slate-100 hover:bg-slate-600 disabled:bg-slate-800/70 disabled:text-slate-400",

    ghost:
      "bg-transparent text-slate-200 hover:bg-slate-800/40 disabled:text-slate-500 disabled:hover:bg-transparent",

    danger:
      "bg-red-500 text-white hover:bg-red-400 disabled:bg-red-700/70 disabled:text-red-300",

    destructive:
      "bg-red-700 text-white hover:bg-red-600 disabled:bg-red-900/60 disabled:text-red-300",

    success:
      "bg-green-600 text-white hover:bg-green-500 disabled:bg-green-800/60 disabled:text-green-200",

    warning:
      "bg-orange-500 text-white hover:bg-orange-400 disabled:bg-orange-700/60 disabled:text-orange-200",

    outline:
      "border border-slate-600 text-slate-200 hover:bg-slate-800/30 disabled:opacity-50 disabled:hover:bg-transparent",

    link:
      "underline underline-offset-2 text-yellow-400 hover:text-yellow-300 p-0 bg-transparent disabled:text-yellow-600",

    soft:
      "bg-yellow-500/15 text-yellow-400 hover:bg-yellow-500/25 disabled:opacity-50 disabled:text-yellow-600",
  };

  const sizes: Record<Size, string> = {
    sm: "h-8 px-3 text-xs",
    default: "h-10 px-4 text-sm",
    lg: "h-12 px-6 text-base",
  };

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all select-none",
        "focus:outline-none focus:ring-2 focus:ring-yellow-500/70 focus:ring-offset-2 focus:ring-offset-slate-950",
        "disabled:cursor-not-allowed disabled:opacity-70",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    />
  );
}
