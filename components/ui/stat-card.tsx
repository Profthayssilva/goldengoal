import * as React from "react";
import { cn } from "@/lib/utils";
import { Card, CardHeader, CardTitle, CardContent } from "./card";

interface StatCardProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  value: string | number;
  helper?: string;
  icon?: React.ReactNode;
}

export function StatCard({
  label,
  value,
  helper,
  icon,
  className,
  ...props
}: StatCardProps) {
  return (
    <Card
      className={cn(
        "bg-slate-900/90 backdrop-blur-sm transition hover:shadow-lg hover:shadow-black/50",
        className
      )}
      {...props}
    >
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex flex-col gap-1">
          <CardTitle className="text-xs font-medium tracking-wide text-slate-400 uppercase">
            {label}
          </CardTitle>
        </div>

        {icon && (
          <div className="text-slate-400">
            {icon}
          </div>
        )}
      </CardHeader>

      <CardContent>
        <div className="text-3xl font-semibold text-slate-50 leading-tight">
          {value}
        </div>

        {helper && (
          <p className="mt-1 text-xs text-slate-400 leading-relaxed">
            {helper}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
