import { createFileRoute } from "@tanstack/react-router";
import { FileBarChart } from "lucide-react";
import { ComingSoon } from "@/components/app/coming-soon";

export const Route = createFileRoute("/_app/rapports")({
  head: () => ({ meta: [{ title: "Rapports — SAJIDA ERP" }] }),
  component: () => <ComingSoon title="Rapports" description="Rapports financiers et exports PDF/Excel" icon={FileBarChart} />,
});
