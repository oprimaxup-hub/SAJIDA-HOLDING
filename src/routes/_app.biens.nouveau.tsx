import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowLeft, Check, ChevronRight, Upload } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/app/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { owners } from "@/lib/mock/data";
import { formatFCFA } from "@/lib/format";

export const Route = createFileRoute("/_app/biens/nouveau")({
  component: NouveauBien,
});

const schema = z.object({
  nom: z.string().min(2, "Nom trop court"),
  type: z.string().min(1, "Requis"),
  reference: z.string().min(3),
  adresse: z.string().min(2),
  quartier: z.string().min(2),
  ville: z.string().min(2),
  superficie: z.coerce.number().min(1),
  loyer: z.coerce.number().min(0),
  proprietaireId: z.string().min(1),
  gestionType: z.enum(["Standard", "Premium"]),
  partAgencePct: z.coerce.number().min(0).max(100).optional(),
  montantGaranti: z.coerce.number().min(0).optional(),
});

type FormData = z.infer<typeof schema>;

const STEPS = ["Informations", "Localisation", "Caractéristiques", "Gestion & propriétaire"];

function NouveauBien() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { gestionType: "Standard", partAgencePct: 20, loyer: 350000, superficie: 100 },
  });
  const gestionType = form.watch("gestionType");
  const loyer = form.watch("loyer");

  const onSubmit = (data: FormData) => {
    toast.success(`Bien "${data.nom}" créé avec succès (démo)`);
    navigate({ to: "/biens" });
  };

  return (
    <div>
      <Button asChild variant="ghost" size="sm" className="mb-4 -ml-2">
        <Link to="/biens"><ArrowLeft className="mr-2 h-4 w-4" /> Retour</Link>
      </Button>
      <PageHeader title="Nouveau bien" description="Enregistrez un bien dans le portefeuille" />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[260px_1fr]">
        <ol className="space-y-1">
          {STEPS.map((label, i) => (
            <li key={label}>
              <button
                type="button"
                onClick={() => setStep(i)}
                className={cn(
                  "flex w-full items-center gap-3 rounded-lg border p-3 text-left transition-colors",
                  i === step ? "border-primary bg-primary/5" : "border-border bg-card hover:bg-muted/40",
                )}
              >
                <span className={cn(
                  "flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-xs font-semibold",
                  i < step ? "border-success bg-success text-success-foreground" :
                  i === step ? "border-primary bg-primary text-primary-foreground" :
                  "border-border text-muted-foreground",
                )}>
                  {i < step ? <Check className="h-3.5 w-3.5" /> : i + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">Étape {i + 1}</div>
                  <div className="truncate text-sm font-medium">{label}</div>
                </div>
                {i === step && <ChevronRight className="h-4 w-4 text-primary" />}
              </button>
            </li>
          ))}
        </ol>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="rounded-xl border bg-card p-6">
            {step === 0 && (
              <div className="grid grid-cols-2 gap-4">
                <FormField control={form.control} name="reference" render={({ field }) => (
                  <FormItem><FormLabel>Référence</FormLabel><FormControl><Input placeholder="BIM-2026001" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="nom" render={({ field }) => (
                  <FormItem><FormLabel>Nom du bien</FormLabel><FormControl><Input placeholder="Villa Bellevue" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="type" render={({ field }) => (
                  <FormItem className="col-span-2"><FormLabel>Type</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl><SelectTrigger><SelectValue placeholder="Sélectionner" /></SelectTrigger></FormControl>
                      <SelectContent>
                        {["Villa", "Appartement", "Immeuble", "Magasin", "Bureau", "Terrain"].map((t) => (
                          <SelectItem key={t} value={t}>{t}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select><FormMessage /></FormItem>
                )} />
              </div>
            )}
            {step === 1 && (
              <div className="grid grid-cols-2 gap-4">
                <FormField control={form.control} name="adresse" render={({ field }) => (
                  <FormItem className="col-span-2"><FormLabel>Adresse</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="quartier" render={({ field }) => (
                  <FormItem><FormLabel>Quartier</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="ville" render={({ field }) => (
                  <FormItem><FormLabel>Ville</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                )} />
              </div>
            )}
            {step === 2 && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField control={form.control} name="superficie" render={({ field }) => (
                    <FormItem><FormLabel>Superficie (m²)</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="loyer" render={({ field }) => (
                    <FormItem><FormLabel>Loyer mensuel (FCFA)</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                </div>
                <div>
                  <Label>Photos & documents</Label>
                  <div className="mt-2 flex h-32 items-center justify-center rounded-lg border border-dashed bg-muted/30 text-sm text-muted-foreground">
                    <div className="text-center">
                      <Upload className="mx-auto mb-1 h-5 w-5" />
                      Glissez-déposez vos fichiers ou cliquez pour parcourir
                    </div>
                  </div>
                </div>
              </div>
            )}
            {step === 3 && (
              <div className="space-y-4">
                <FormField control={form.control} name="proprietaireId" render={({ field }) => (
                  <FormItem><FormLabel>Propriétaire</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl><SelectTrigger><SelectValue placeholder="Sélectionner" /></SelectTrigger></FormControl>
                      <SelectContent>{owners.map((o) => (<SelectItem key={o.id} value={o.id}>{o.nom}</SelectItem>))}</SelectContent>
                    </Select><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="gestionType" render={({ field }) => (
                  <FormItem><FormLabel>Mode de gestion</FormLabel>
                    <FormControl>
                      <RadioGroup value={field.value} onValueChange={field.onChange} className="grid grid-cols-2 gap-3">
                        {[
                          { v: "Standard", t: "Standard", d: "Pourcentage prélevé sur le loyer" },
                          { v: "Premium", t: "Premium", d: "Montant garanti au propriétaire" },
                        ].map((opt) => (
                          <label key={opt.v} className={cn(
                            "flex cursor-pointer items-start gap-3 rounded-lg border p-4",
                            field.value === opt.v && "border-primary bg-primary/5 ring-1 ring-primary",
                          )}>
                            <RadioGroupItem value={opt.v} />
                            <div>
                              <div className="font-medium">{opt.t}</div>
                              <div className="text-xs text-muted-foreground">{opt.d}</div>
                            </div>
                          </label>
                        ))}
                      </RadioGroup>
                    </FormControl>
                  </FormItem>
                )} />
                {gestionType === "Standard" ? (
                  <FormField control={form.control} name="partAgencePct" render={({ field }) => (
                    <FormItem><FormLabel>Part agence (%)</FormLabel><FormControl><Input type="number" {...field} /></FormControl>
                      <p className="text-xs text-muted-foreground">Le propriétaire reçoit {100 - (field.value ?? 0)}% du loyer perçu.</p>
                    </FormItem>
                  )} />
                ) : (
                  <FormField control={form.control} name="montantGaranti" render={({ field }) => (
                    <FormItem><FormLabel>Montant garanti (FCFA)</FormLabel><FormControl><Input type="number" {...field} /></FormControl>
                      <p className="text-xs text-muted-foreground">
                        Loyer perçu : {formatFCFA(loyer)} · Reversé : {formatFCFA(field.value)} · Marge agence : {formatFCFA((loyer ?? 0) - (field.value ?? 0))}
                      </p>
                    </FormItem>
                  )} />
                )}
              </div>
            )}

            <div className="mt-6 flex justify-between border-t pt-4">
              <Button type="button" variant="outline" disabled={step === 0} onClick={() => setStep(step - 1)}>Précédent</Button>
              {step < STEPS.length - 1 ? (
                <Button type="button" onClick={() => setStep(step + 1)} className="bg-gradient-to-r from-primary to-primary-hover">Continuer</Button>
              ) : (
                <Button type="submit" className="bg-gradient-to-r from-primary to-primary-hover">Créer le bien</Button>
              )}
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
