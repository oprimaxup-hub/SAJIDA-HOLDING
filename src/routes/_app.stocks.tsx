import { createFileRoute } from "@tanstack/react-router";
import { Boxes } from "lucide-react";
import { ComingSoon } from "@/components/app/coming-soon";

export const Route = createFileRoute("/_app/stocks")({
  head: () => ({ meta: [{ title: "Stocks — SAJIDA ERP" }] }),
  component: () => <ComingSoon title="Stocks" description="Produits, matériaux, entrées et sorties" icon={Boxes} />,
});
