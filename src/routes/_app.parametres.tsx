import { createFileRoute } from "@tanstack/react-router";
import { Settings } from "lucide-react";
import { ComingSoon } from "@/components/app/coming-soon";

export const Route = createFileRoute("/_app/parametres")({
  head: () => ({ meta: [{ title: "Paramètres — SAJIDA ERP" }] }),
  component: () => <ComingSoon title="Paramètres" description="Configuration générale de l'ERP" icon={Settings} />,
});
