import { createFileRoute, Link } from "@tanstack/react-router";
import { ComingSoon } from "@/components/app/coming-soon";
import { UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/_app/locataires/nouveau")({
  component: () => (
    <div>
      <Button asChild variant="ghost" size="sm" className="mb-4 -ml-2">
        <Link to="/locataires"><ArrowLeft className="mr-2 h-4 w-4" /> Retour</Link>
      </Button>
      <ComingSoon title="Nouveau locataire" description="Formulaire de création" icon={UserPlus} />
    </div>
  ),
});
