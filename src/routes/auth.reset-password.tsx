import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/auth/reset-password")({
  component: () => (
    <div className="flex min-h-screen items-center justify-center bg-background p-6">
      <div className="w-full max-w-sm">
        <Link to="/auth/login" className="mb-6 inline-flex items-center text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="mr-1 h-4 w-4" /> Retour
        </Link>
        <h2 className="text-2xl font-semibold">Nouveau mot de passe</h2>
        <p className="mt-1 text-sm text-muted-foreground">Définissez un mot de passe sécurisé.</p>
        <form className="mt-6 space-y-4">
          <div>
            <Label>Nouveau mot de passe</Label>
            <div className="relative mt-1"><Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" /><Input className="pl-9" type="password" /></div>
          </div>
          <div>
            <Label>Confirmer</Label>
            <div className="relative mt-1"><Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" /><Input className="pl-9" type="password" /></div>
          </div>
          <Button className="h-11 w-full bg-gradient-to-r from-primary to-primary-hover">Mettre à jour</Button>
        </form>
      </div>
    </div>
  ),
});
