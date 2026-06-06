import { createFileRoute } from "@tanstack/react-router";
import { Calculator } from "lucide-react";
import { ComingSoon } from "@/components/app/coming-soon";

export const Route = createFileRoute("/_app/comptabilite")({
  head: () => ({ meta: [{ title: "Comptabilité — SAJIDA ERP" }] }),
  component: () => <ComingSoon title="Comptabilité" description="Plan comptable, journaux et écritures" icon={Calculator} />,
});
