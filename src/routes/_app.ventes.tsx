import { createFileRoute } from "@tanstack/react-router";
import { ShoppingCart } from "lucide-react";
import { ComingSoon } from "@/components/app/coming-soon";

export const Route = createFileRoute("/_app/ventes")({
  head: () => ({ meta: [{ title: "Ventes — SAJIDA ERP" }] }),
  component: () => <ComingSoon title="Ventes" description="Réservations, ventes et facturation" icon={ShoppingCart} />,
});
