import { createFileRoute } from "@tanstack/react-router";
import { MapPinned } from "lucide-react";
import { ComingSoon } from "@/components/app/coming-soon";

export const Route = createFileRoute("/_app/lotissements")({
  head: () => ({ meta: [{ title: "Lotissements — SAJIDA ERP" }] }),
  component: () => <ComingSoon title="Lotissements" description="Gestion des lotissements, îlots et lots" icon={MapPinned} />,
});
