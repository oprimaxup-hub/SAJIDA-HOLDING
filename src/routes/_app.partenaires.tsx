import { createFileRoute } from "@tanstack/react-router";
import { Handshake } from "lucide-react";
import { ComingSoon } from "@/components/app/coming-soon";

export const Route = createFileRoute("/_app/partenaires")({
  head: () => ({ meta: [{ title: "Partenaires — SAJIDA ERP" }] }),
  component: () => <ComingSoon title="Partenaires" description="Apporteurs d'affaires et commerciaux" icon={Handshake} />,
});
