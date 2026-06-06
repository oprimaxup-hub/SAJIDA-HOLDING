import { createFileRoute } from "@tanstack/react-router";
import { Banknote } from "lucide-react";
import { ComingSoon } from "@/components/app/coming-soon";

export const Route = createFileRoute("/_app/tresorerie")({
  head: () => ({ meta: [{ title: "Trésorerie — SAJIDA ERP" }] }),
  component: () => <ComingSoon title="Trésorerie" description="Caisses, banques, encaissements et décaissements" icon={Banknote} />,
});
