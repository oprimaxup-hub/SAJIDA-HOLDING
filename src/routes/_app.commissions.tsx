import { createFileRoute } from "@tanstack/react-router";
import { Percent } from "lucide-react";
import { ComingSoon } from "@/components/app/coming-soon";

export const Route = createFileRoute("/_app/commissions")({
  head: () => ({ meta: [{ title: "Commissions — SAJIDA ERP" }] }),
  component: () => <ComingSoon title="Commissions" description="Répartition automatique des commissions" icon={Percent} />,
});
