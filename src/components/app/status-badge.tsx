import { cn } from "@/lib/utils";

const VARIANTS: Record<string, string> = {
  Disponible: "bg-info/10 text-info border-info/20",
  Loué: "bg-success/10 text-success border-success/20",
  Vendu: "bg-primary/10 text-primary border-primary/20",
  Indisponible: "bg-muted text-muted-foreground border-border",
  Actif: "bg-success/10 text-success border-success/20",
  Sorti: "bg-muted text-muted-foreground border-border",
  Expiré: "bg-destructive/10 text-destructive border-destructive/20",
  Résilié: "bg-destructive/10 text-destructive border-destructive/20",
  Standard: "bg-info/10 text-info border-info/20",
  Premium: "bg-primary/10 text-primary border-primary/20",
  Payé: "bg-success/10 text-success border-success/20",
  Impayé: "bg-destructive/10 text-destructive border-destructive/20",
  "En retard": "bg-warning/10 text-warning border-warning/20",
};

export function StatusBadge({ status }: { status: string }) {
  return (
    <span className={cn(
      "inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 text-xs font-medium",
      VARIANTS[status] ?? "bg-muted text-muted-foreground border-border",
    )}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}
