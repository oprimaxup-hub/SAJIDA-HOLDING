import { createFileRoute } from "@tanstack/react-router";
import { HardHat } from "lucide-react";
import { ComingSoon } from "@/components/app/coming-soon";

export const Route = createFileRoute("/_app/chantiers")({
  head: () => ({ meta: [{ title: "Chantiers — SAJIDA ERP" }] }),
  component: () => <ComingSoon title="Chantiers" description="Suivi des projets, budgets et avancement" icon={HardHat} />,
});
