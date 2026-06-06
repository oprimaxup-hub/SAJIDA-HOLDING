import { createFileRoute } from "@tanstack/react-router";
import { CalendarClock } from "lucide-react";
import { ComingSoon } from "@/components/app/coming-soon";

export const Route = createFileRoute("/_app/echeanciers")({
  head: () => ({ meta: [{ title: "Échéanciers — SAJIDA ERP" }] }),
  component: () => <ComingSoon title="Échéanciers" description="Plans de paiement et calendriers" icon={CalendarClock} />,
});
