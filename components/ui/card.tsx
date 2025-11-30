import * as React from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * Componente Card aprimorado:
 * - Visual consistente e elegante
 * - Hover sutil
 * - Backdrop blur para melhor integração com UI moderna
 */
export function Card({ className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-slate-800 bg-slate-900/80 backdrop-blur-sm",
        "p-4 shadow-md shadow-black/40 transition",
        "hover:shadow-lg hover:shadow-black/50",
        className
      )}
      {...props}
    />
  );
}

/**
 * Header do Card: área para título, ícones ou ações.
 */
export function CardHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("mb-3 flex items-center justify-between gap-2", className)}
      {...props}
    />
  );
}

/**
 * Título do Card
 */
export function CardTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn(
        "text-base font-semibold text-slate-100 tracking-tight",
        className
      )}
      {...props}
    />
  );
}

/**
 * Descrição: subtítulo leve para contexto
 */
export function CardDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn("text-sm text-slate-400", className)}
      {...props}
    />
  );
}

/**
 * Conteúdo principal do Card
 */
export function CardContent({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("text-sm text-slate-300", className)}
      {...props}
    />
  );
}

/**
 * Rodapé do Card: ideal para botões e ações
 */
export function CardFooter({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("mt-4 flex items-center justify-end gap-2", className)}
      {...props}
    />
  );
}
