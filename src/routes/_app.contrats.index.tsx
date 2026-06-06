import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { PageHeader } from "@/components/app/page-header";
import { StatusBadge } from "@/components/app/status-badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { contracts, properties, tenants } from "@/lib/mock/data";
import { formatFCFA, formatDate } from "@/lib/format";

export const Route = createFileRoute("/_app/contrats/")({
  head: () => ({ meta: [{ title: "Contrats — SAJIDA ERP" }] }),
  component: ContratsList,
});

function ContratsList() {
  const navigate = useNavigate();
  return (
    <div>
      <PageHeader
        title="Contrats de location"
        description={`${contracts.length} contrats en cours`}
        actions={
          <Button className="bg-gradient-to-r from-primary to-primary-hover" onClick={() => navigate({ to: "/contrats/nouveau" })}>
            <Plus className="mr-2 h-4 w-4" /> Nouveau contrat
          </Button>
        }
      />
      <div className="overflow-hidden rounded-xl border bg-card">
        <Table>
          <TableHeader><TableRow>
            <TableHead>Référence</TableHead>
            <TableHead>Bien</TableHead>
            <TableHead>Locataire</TableHead>
            <TableHead>Début</TableHead>
            <TableHead>Fin</TableHead>
            <TableHead className="text-right">Loyer</TableHead>
            <TableHead className="text-right">Dépôt</TableHead>
            <TableHead>Statut</TableHead>
          </TableRow></TableHeader>
          <TableBody>
            {contracts.map((c) => {
              const b = properties.find((p) => p.id === c.bienId);
              const t = tenants.find((x) => x.id === c.locataireId);
              return (
                <TableRow key={c.id} className="cursor-pointer" onClick={() => navigate({ to: "/contrats/$id", params: { id: c.id } })}>
                  <TableCell className="font-mono text-xs">{c.reference}</TableCell>
                  <TableCell>{b?.nom}</TableCell>
                  <TableCell>{t?.nom}</TableCell>
                  <TableCell className="text-xs">{formatDate(c.dateDebut)}</TableCell>
                  <TableCell className="text-xs">{formatDate(c.dateFin)}</TableCell>
                  <TableCell className="tabular text-right">{formatFCFA(c.loyer)}</TableCell>
                  <TableCell className="tabular text-right text-muted-foreground">{formatFCFA(c.depot)}</TableCell>
                  <TableCell><StatusBadge status={c.statut} /></TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
