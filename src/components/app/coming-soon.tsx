import type { LucideIcon } from "lucide-react";
import { Construction } from "lucide-react";
import { PageHeader } from "./page-header";

export function ComingSoon({ title, description, icon: Icon = Construction }: { title: string; description?: string; icon?: LucideIcon }) {
  return (
    <div>
      <PageHeader title={title} description={description} />
      <div className="rounded-xl border border-dashed bg-card p-16 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/15 to-primary/5">
          <Icon className="h-8 w-8 text-primary" />
        </div>
        <h3 className="mt-5 text-lg font-semibold">Module en cours de construction</h3>
        <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
          Ce module sera livré dans une prochaine itération. Le shell, les permissions et la navigation sont déjà prêts à l'accueillir.
        </p>
      </div>
    </div>
  );
}
