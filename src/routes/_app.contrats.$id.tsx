import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { ArrowLeft, FileSignature } from "lucide-react";
import { PageHeader } from "@/components/app/page-header";
import { StatusBadge } from "@/components/app/status-badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { contracts, properties, tenants, rentSchedules } from "@/lib/mock/data";
import { formatFCFA, formatDate } from "@/lib/format";

export const Route = createFileRoute("/_app/contrats/$id")({
  component: ContratDetail,
});

function ContratDetail() {
  const { id } = useParams({ from: "/_app/contrats/$id" });
  const c = contracts.find((x) => x.id === id);
  if (!c) return <div className="p-8">Contrat introuvable</div>;
  const b = properties.find((p) => p.id === c.bienId);
  const t = tenants.find((x) => x.id === c.locataireId);
  const echeances = rentSchedules.filter((r) => r.contratId === c.id);

  return (
    <div>
      <Button asChild variant="ghost" size="sm" className="mb-4 -ml-2">
        <Link to="/contrats"><ArrowLeft className="mr-2 h-4 w-4" /> Retour</Link>
      </Button>
      <PageHeader
        title={c.reference}
        description={`${b?.nom} · ${t?.nom}`}
        actions={<><StatusBadge status={c.statut} /><Button variant="outline">Imprimer</Button><Button className="bg-gradient-to-r from-primary to-primary-hover"><FileSignature className="mr-2 h-4 w-4" /> Renouveler</Button></>}
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="rounded-xl border bg-card p-5 lg:col-span-1">
          <h3 className="text-sm font-semibold">Conditions financières</h3>
          <dl className="mt-4 space-y-3 text-sm">
            <div className="flex justify-between"><dt className="text-muted-foreground">Loyer</dt><dd className="tabular font-semibold">{formatFCFA(c.loyer)}</dd></div>
            <div className="flex justify-between"><dt className="text-muted-foreground">Dépôt de garantie</dt><dd className="tabular font-semibold">{formatFCFA(c.depot)}</dd></div>
            <div className="flex justify-between"><dt className="text-muted-foreground">Début</dt><dd>{formatDate(c.dateDebut)}</dd></div>
            <div className="flex justify-between"><dt className="text-muted-foreground">Fin</dt><dd>{formatDate(c.dateFin)}</dd></div>
          </dl>
        </div>
        <div className="rounded-xl border bg-card lg:col-span-2">
          <div className="border-b p-4">
            <h3 className="text-sm font-semibold">Échéancier des loyers</h3>
          </div>
          <Table>
            <TableHeader><TableRow><TableHead>Période</TableHead><TableHead>Échéance</TableHead><TableHead className="text-right">Montant</TableHead><TableHead>Statut</TableHead></TableRow></TableHeader>
            <TableBody>
              {echeances.map((r) => (
                <TableRow key={r.id}>
                  <TableCell>{r.periode}</TableCell>
                  <TableCell>{formatDate(r.echeance)}</TableCell>
                  <TableCell className="tabular text-right">{formatFCFA(r.montant)}</TableCell>
                  <TableCell><StatusBadge status={r.paye ? "Payé" : (r.retardJours ?? 0) > 0 ? "En retard" : "Impayé"} /></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
