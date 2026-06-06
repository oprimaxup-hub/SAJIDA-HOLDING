import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown } from "lucide-react";

type Props = {
  label: string;
  value: ReactNode;
  delta?: number;
  icon: any;
  accent?: "primary" | "success" | "warning" | "info" | "danger";
  hint?: string;
};

const ACCENTS: Record<string, string> = {
  primary: "from-primary/15 to-primary/0 text-primary",
  success: "from-success/15 to-success/0 text-success",
  warning: "from-warning/15 to-warning/0 text-warning",
  info: "from-info/15 to-info/0 text-info",
  danger: "from-destructive/15 to-destructive/0 text-destructive",
};

export function KpiCard({ label, value, delta, icon: Icon, accent = "primary", hint }: Props) {
  const positive = (delta ?? 0) >= 0;
  return (
    <div className="group relative overflow-hidden rounded-xl border bg-card p-5 transition-shadow hover:shadow-md">
      <div className={cn("absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gradient-to-br opacity-60 blur-2xl", ACCENTS[accent])} />
      <div className="relative flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</p>
          <p className="tabular text-lg font-semibold tracking-tight whitespace-nowrap">{value}</p>
          {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
        </div>
        <div className={cn("flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br", ACCENTS[accent])}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
      {delta !== undefined && (
        <div className="relative mt-3 flex items-center gap-1.5 text-xs">
          <span className={cn("inline-flex items-center gap-0.5 rounded-md px-1.5 py-0.5 font-medium",
            positive ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive")}>
            {positive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
            {positive ? "+" : ""}{delta}%
          </span>
          <span className="text-muted-foreground">vs mois dernier</span>
        </div>
      )}
    </div>
  );
}
