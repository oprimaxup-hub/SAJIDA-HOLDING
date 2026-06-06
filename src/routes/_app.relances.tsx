import { createFileRoute } from "@tanstack/react-router";
import { Bell } from "lucide-react";
import { ComingSoon } from "@/components/app/coming-soon";

export const Route = createFileRoute("/_app/relances")({
  head: () => ({ meta: [{ title: "Centre de relance — SAJIDA ERP" }] }),
  component: () => <ComingSoon title="Centre de relance" description="Suivi des locataires à relancer" icon={Bell} />,
});
