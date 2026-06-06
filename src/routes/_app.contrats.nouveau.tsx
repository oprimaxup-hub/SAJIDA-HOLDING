import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, FileSignature } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ComingSoon } from "@/components/app/coming-soon";

export const Route = createFileRoute("/_app/contrats/nouveau")({
  component: () => (
    <div>
      <Button asChild variant="ghost" size="sm" className="mb-4 -ml-2">
        <Link to="/contrats"><ArrowLeft className="mr-2 h-4 w-4" /> Retour</Link>
      </Button>
      <ComingSoon title="Nouveau contrat" description="Wizard de création de contrat" icon={FileSignature} />
    </div>
  ),
});
