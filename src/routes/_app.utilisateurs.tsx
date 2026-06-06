import { createFileRoute } from "@tanstack/react-router";
import { UserCog } from "lucide-react";
import { ComingSoon } from "@/components/app/coming-soon";

export const Route = createFileRoute("/_app/utilisateurs")({
  head: () => ({ meta: [{ title: "Utilisateurs — SAJIDA ERP" }] }),
  component: () => <ComingSoon title="Utilisateurs" description="Gestion des comptes et permissions" icon={UserCog} />,
});
