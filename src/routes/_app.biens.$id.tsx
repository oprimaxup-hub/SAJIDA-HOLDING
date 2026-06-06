import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { ArrowLeft, MapPin, Maximize2, User, FileText, Wrench, Image as ImgIcon } from "lucide-react";
import { PageHeader } from "@/components/app/page-header";
import { StatusBadge } from "@/components/app/status-badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { properties, owners, tenants, contracts, rentSchedules } from "@/lib/mock/data";
import { formatFCFA, formatDate } from "@/lib/format";

export const Route = createFileRoute("/_app/biens/$id")({
  component: BienDetail,
  notFoundComponent: () => <div>Bien introuvable</div>,
});

function BienDetail() {
  const { id } = useParams({ from: "/_app/biens/$id" });
  const bien = properties.find((p) => p.id === id);
  if (!bien) return <div className="p-8">Bien introuvable.</div>;
  const owner = owners.find((o) => o.id === bien.proprietaireId);
  const contrat = contracts.find((c) => c.bienId === bien.id);
  const locataire = contrat ? tenants.find((t) => t.id === contrat.locataireId) : null;
  const historique = rentSchedules.filter((r) => r.bienId === bien.id);

  return (
    <div>
      <Button asChild variant="ghost" size="sm" className="mb-4 -ml-2">
        <Link to="/biens"><ArrowLeft className="mr-2 h-4 w-4" /> Retour aux biens</Link>
      </Button>

      <PageHeader
        title={bien.nom}
        description={`${bien.reference} · ${bien.type}`}
        actions={
          <>
            <StatusBadge status={bien.statut} />
            <Button variant="outline">Modifier</Button>
            <Button className="bg-gradient-to-r from-primary to-primary-hover">Nouveau contrat</Button>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          <div className="overflow-hidden rounded-xl border bg-card">
            <div className="grid h-72 grid-cols-4 gap-1 bg-secondary p-1">
              <div className="col-span-2 row-span-2 rounded-lg bg-gradient-to-br from-primary/30 to-primary/5" />
              <div className="rounded-lg bg-gradient-to-br from-info/30 to-info/5" />
              <div className="rounded-lg bg-gradient-to-br from-success/30 to-success/5" />
              <div className="rounded-lg bg-gradient-to-br from-warning/30 to-warning/5" />
              <div className="relative flex items-center justify-center rounded-lg bg-gradient-to-br from-muted to-secondary">
                <ImgIcon className="h-6 w-6 text-muted-foreground" />
              </div>
            </div>
          </div>

          <Tabs defaultValue="infos" className="rounded-xl border bg-card">
            <TabsList className="m-2">
              <TabsTrigger value="infos">Informations</TabsTrigger>
              <TabsTrigger value="historique">Historique loyers</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
              <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
            </TabsList>
            <TabsContent value="infos" className="p-5 pt-0">
              <div className="grid grid-cols-2 gap-4 text-sm md:grid-cols-3">
                {[
                  ["Référence", bien.reference],
                  ["Type", bien.type],
                  ["Superficie", `${bien.superficie} m²`],
                  ["Adresse", bien.adresse],
                  ["Quartier", bien.quartier],
                  ["Ville", bien.ville],
                  ["Loyer mensuel", formatFCFA(bien.loyer)],
                  ["Mode de gestion", bien.gestionType],
                  bien.gestionType === "Standard"
                    ? ["Part agence", `${bien.partAgencePct}%`]
                    : ["Montant garanti", formatFCFA(bien.montantGaranti)],
                ].map(([l, v]) => (
                  <div key={l as string}>
                    <div className="text-xs uppercase tracking-wider text-muted-foreground">{l}</div>
                    <div className="mt-0.5 font-medium">{v}</div>
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="historique" className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Période</TableHead>
                    <TableHead>Échéance</TableHead>
                    <TableHead className="text-right">Montant</TableHead>
                    <TableHead>Statut</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {historique.map((r) => (
                    <TableRow key={r.id}>
                      <TableCell>{r.periode}</TableCell>
                      <TableCell>{formatDate(r.echeance)}</TableCell>
                      <TableCell className="tabular text-right">{formatFCFA(r.montant)}</TableCell>
                      <TableCell><StatusBadge status={r.paye ? "Payé" : (r.retardJours ?? 0) > 0 ? "En retard" : "Impayé"} /></TableCell>
                    </TableRow>
                  ))}
                  {historique.length === 0 && (
                    <TableRow><TableCell colSpan={4} className="py-8 text-center text-sm text-muted-foreground">Aucun historique</TableCell></TableRow>
                  )}
                </TableBody>
              </Table>
            </TabsContent>
            <TabsContent value="documents" className="p-5 pt-0">
              <div className="rounded-lg border border-dashed p-8 text-center text-sm text-muted-foreground">
                <FileText className="mx-auto mb-2 h-6 w-6" />
                Aucun document. Glissez-déposez pour téléverser.
              </div>
            </TabsContent>
            <TabsContent value="maintenance" className="p-5 pt-0">
              <div className="rounded-lg border border-dashed p-8 text-center text-sm text-muted-foreground">
                <Wrench className="mx-auto mb-2 h-6 w-6" />
                Aucune intervention enregistrée.
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-4">
          <div className="rounded-xl border bg-card p-5">
            <h3 className="mb-3 text-sm font-semibold">Localisation</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 text-muted-foreground" />{bien.adresse}, {bien.quartier}, {bien.ville}</div>
              <div className="flex items-center gap-2"><Maximize2 className="h-4 w-4 text-muted-foreground" />{bien.superficie} m²</div>
            </div>
          </div>

          <div className="rounded-xl border bg-card p-5">
            <h3 className="mb-3 text-sm font-semibold">Propriétaire</h3>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                {owner?.nom.split(" ").map((w) => w[0]).slice(0, 2).join("")}
              </div>
              <div>
                <div className="font-medium">{owner?.nom}</div>
                <div className="text-xs text-muted-foreground">{owner?.telephone}</div>
              </div>
            </div>
            <div className="mt-3 rounded-lg bg-muted/40 p-3 text-xs">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Mode</span>
                <StatusBadge status={bien.gestionType} />
              </div>
              {bien.gestionType === "Standard" ? (
                <div className="mt-2 grid grid-cols-2 gap-2">
                  <div><div className="text-muted-foreground">Part propriétaire</div><div className="tabular font-semibold">{100 - (bien.partAgencePct ?? 0)}%</div></div>
                  <div><div className="text-muted-foreground">Part agence</div><div className="tabular font-semibold">{bien.partAgencePct}%</div></div>
                </div>
              ) : (
                <div className="mt-2">
                  <div className="text-muted-foreground">Montant garanti / mois</div>
                  <div className="tabular font-semibold text-primary">{formatFCFA(bien.montantGaranti)}</div>
                  <div className="mt-1 text-[10px] text-muted-foreground">Le surplus est conservé par l'agence.</div>
                </div>
              )}
            </div>
          </div>

          {locataire && (
            <div className="rounded-xl border bg-card p-5">
              <h3 className="mb-3 text-sm font-semibold">Locataire actuel</h3>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-success/10 text-sm font-semibold text-success">
                  <User className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-medium">{locataire.nom}</div>
                  <div className="text-xs text-muted-foreground">{locataire.profession}</div>
                </div>
              </div>
              <Button asChild variant="outline" size="sm" className="mt-3 w-full">
                <Link to="/locataires/$id" params={{ id: locataire.id }}>Voir la fiche locataire</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
