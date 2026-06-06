import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { ArrowLeft, Mail, Phone, Briefcase } from "lucide-react";
import { PageHeader } from "@/components/app/page-header";
import { StatusBadge } from "@/components/app/status-badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { tenants, contracts, properties, rentSchedules } from "@/lib/mock/data";
import { formatFCFA, formatDate } from "@/lib/format";

export const Route = createFileRoute("/_app/locataires/$id")({
  component: TenantDetail,
});

function TenantDetail() {
  const { id } = useParams({ from: "/_app/locataires/$id" });
  const t = tenants.find((x) => x.id === id);
  if (!t) return <div className="p-8">Locataire introuvable</div>;
  const ctrs = contracts.filter((c) => c.locataireId === t.id);
  const paiements = rentSchedules.filter((r) => r.locataireId === t.id);

  return (
    <div>
      <Button asChild variant="ghost" size="sm" className="mb-4 -ml-2">
        <Link to="/locataires"><ArrowLeft className="mr-2 h-4 w-4" /> Retour</Link>
      </Button>
      <PageHeader title={t.nom} description={t.profession} actions={<StatusBadge status={t.statut} />} />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="rounded-xl border bg-card p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary-hover text-lg font-semibold text-primary-foreground">
              {t.nom.split(" ").map((w) => w[0]).slice(0, 2).join("")}
            </div>
            <div>
              <div className="font-semibold">{t.nom}</div>
              <div className="text-xs text-muted-foreground">{t.profession}</div>
            </div>
          </div>
          <div className="mt-4 space-y-2 text-sm">
            <div className="flex items-center gap-2"><Phone className="h-4 w-4 text-muted-foreground" /> {t.telephone}</div>
            <div className="flex items-center gap-2"><Mail className="h-4 w-4 text-muted-foreground" /> {t.email}</div>
            <div className="flex items-center gap-2"><Briefcase className="h-4 w-4 text-muted-foreground" /> {t.profession}</div>
          </div>
        </div>

        <Tabs defaultValue="contrats" className="rounded-xl border bg-card lg:col-span-2">
          <TabsList className="m-2">
            <TabsTrigger value="contrats">Contrats</TabsTrigger>
            <TabsTrigger value="paiements">Paiements</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
          </TabsList>
          <TabsContent value="contrats" className="p-0">
            <Table>
              <TableHeader><TableRow><TableHead>Référence</TableHead><TableHead>Bien</TableHead><TableHead>Période</TableHead><TableHead className="text-right">Loyer</TableHead><TableHead>Statut</TableHead></TableRow></TableHeader>
              <TableBody>
                {ctrs.map((c) => {
                  const b = properties.find((p) => p.id === c.bienId);
                  return (
                    <TableRow key={c.id}>
                      <TableCell className="font-mono text-xs">{c.reference}</TableCell>
                      <TableCell>{b?.nom}</TableCell>
                      <TableCell className="text-xs">{formatDate(c.dateDebut)} → {formatDate(c.dateFin)}</TableCell>
                      <TableCell className="tabular text-right">{formatFCFA(c.loyer)}</TableCell>
                      <TableCell><StatusBadge status={c.statut} /></TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TabsContent>
          <TabsContent value="paiements" className="p-0">
            <Table>
              <TableHeader><TableRow><TableHead>Période</TableHead><TableHead>Échéance</TableHead><TableHead className="text-right">Montant</TableHead><TableHead>Statut</TableHead></TableRow></TableHeader>
              <TableBody>
                {paiements.map((r) => (
                  <TableRow key={r.id}>
                    <TableCell>{r.periode}</TableCell>
                    <TableCell>{formatDate(r.echeance)}</TableCell>
                    <TableCell className="tabular text-right">{formatFCFA(r.montant)}</TableCell>
                    <TableCell><StatusBadge status={r.paye ? "Payé" : (r.retardJours ?? 0) > 0 ? "En retard" : "Impayé"} /></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
          <TabsContent value="documents" className="p-5">
            <div className="rounded-lg border border-dashed p-8 text-center text-sm text-muted-foreground">Aucun document.</div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
