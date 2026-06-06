import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Flame, Mail, Lock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

export const Route = createFileRoute("/auth/login")({
  head: () => ({ meta: [{ title: "Connexion — SAJIDA ERP" }] }),
  component: Login,
});

const schema = z.object({
  email: z.string().email("Email invalide"),
  password: z.string().min(6, "6 caractères minimum"),
});

function Login() {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { email: "demo@sajida.ci", password: "demo123" },
  });

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Visual */}
      <div className="relative hidden overflow-hidden bg-gradient-to-br from-[#1C1F26] via-[#111827] to-[#1C1F26] lg:block">
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="relative z-10 flex h-full flex-col justify-between p-12">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary-hover shadow-lg shadow-primary/30">
              <Flame className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <div className="text-lg font-semibold text-white">SAJIDA</div>
              <div className="text-xs uppercase tracking-wider text-white/50">ERP Premium</div>
            </div>
          </div>
          <div className="max-w-md">
            <h1 className="text-4xl font-semibold leading-tight text-white">
              La gestion immobilière, <span className="bg-gradient-to-r from-primary to-warning bg-clip-text text-transparent">repensée</span>.
            </h1>
            <p className="mt-4 text-white/70">
              Centralisez vos biens, locataires, contrats, ventes et comptabilité dans une plateforme conçue pour les entreprises immobilières africaines exigeantes.
            </p>
            <div className="mt-8 grid grid-cols-3 gap-4 border-t border-white/10 pt-8">
              {[
                { v: "150+", l: "Biens gérés" },
                { v: "98%", l: "Recouvrement" },
                { v: "6", l: "Rôles métier" },
              ].map((s) => (
                <div key={s.l}>
                  <div className="text-2xl font-semibold text-white">{s.v}</div>
                  <div className="text-xs text-white/60">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="text-xs text-white/40">© 2026 SAJIDA. Tous droits réservés.</div>
        </div>
      </div>

      {/* Form */}
      <div className="flex items-center justify-center bg-background p-6 sm:p-12">
        <div className="w-full max-w-sm">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold tracking-tight">Bon retour</h2>
            <p className="mt-1 text-sm text-muted-foreground">Connectez-vous à votre espace de gestion.</p>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(() => navigate({ to: "/" }))} className="space-y-4">
              <FormField control={form.control} name="email" render={({ field }) => (
                <FormItem>
                  <FormLabel>Email professionnel</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input className="pl-9" placeholder="vous@entreprise.ci" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="password" render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between">
                    <FormLabel>Mot de passe</FormLabel>
                    <Link to="/auth/forgot-password" className="text-xs text-primary hover:underline">Oublié ?</Link>
                  </div>
                  <FormControl>
                    <div className="relative">
                      <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input className="pl-9" type="password" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <input type="checkbox" id="remember" className="h-3.5 w-3.5 rounded border-input" defaultChecked />
                <Label htmlFor="remember" className="text-xs font-normal">Rester connecté sur ce poste</Label>
              </div>
              <Button type="submit" className="h-11 w-full bg-gradient-to-r from-primary to-primary-hover text-base shadow-md shadow-primary/20">
                Se connecter <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </Form>
          <p className="mt-6 text-center text-xs text-muted-foreground">
            Accès réservé au personnel autorisé. Tentatives loggées.
          </p>
        </div>
      </div>
    </div>
  );
}
