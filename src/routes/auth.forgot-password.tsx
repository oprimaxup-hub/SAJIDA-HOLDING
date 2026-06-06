import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/auth/forgot-password")({
  component: () => (
    <div className="flex min-h-screen items-center justify-center bg-background p-6">
      <div className="w-full max-w-sm">
        <Link to="/auth/login" className="mb-6 inline-flex items-center text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="mr-1 h-4 w-4" /> Retour
        </Link>
        <h2 className="text-2xl font-semibold">Mot de passe oublié</h2>
        <p className="mt-1 text-sm text-muted-foreground">Nous vous enverrons un lien de réinitialisation.</p>
        <form className="mt-6 space-y-4">
          <div>
            <Label>Email</Label>
            <div className="relative mt-1">
              <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input className="pl-9" placeholder="vous@entreprise.ci" />
            </div>
          </div>
          <Button className="h-11 w-full bg-gradient-to-r from-primary to-primary-hover">Envoyer le lien</Button>
        </form>
      </div>
    </div>
  ),
});
