// components/ui/stat-card.tsx
import * as React from "react";
import { cn } from "@/lib/utils";
import { Card, CardHeader, CardTitle, CardContent } from "./card";

interface StatCardProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  value: string | number;
  helper?: string;
}

export function StatCard({
  label,
  value,
  helper,
  className,
  ...props
}: StatCardProps) {
  return (
    <Card className={cn("bg-slate-900/90", className)} {...props}>
      <CardHeader className="flex flex-col items-start gap-1">
        <CardTitle className="text-xs font-medium tracking-wide text-slate-400 uppercase">
          {label}
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="text-2xl font-semibold text-slate-50">
          {value}
        </div>
        {helper && (
          <p className="mt-1 text-xs text-slate-400">
            {helper}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
