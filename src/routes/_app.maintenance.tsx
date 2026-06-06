import { createFileRoute } from "@tanstack/react-router";
import { Wrench } from "lucide-react";
import { ComingSoon } from "@/components/app/coming-soon";

export const Route = createFileRoute("/_app/maintenance")({
  head: () => ({ meta: [{ title: "Maintenance — SAJIDA ERP" }] }),
  component: () => <ComingSoon title="Maintenance" description="Demandes, interventions et techniciens" icon={Wrench} />,
});
