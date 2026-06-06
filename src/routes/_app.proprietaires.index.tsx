import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/app/page-header";
import { StatusBadge } from "@/components/app/status-badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { owners, properties } from "@/lib/mock/data";
import { formatFCFA } from "@/lib/format";

export const Route = createFileRoute("/_app/proprietaires/")({
  head: () => ({ meta: [{ title: "Propriétaires — SAJIDA ERP" }] }),
  component: ProprietairesList,
});

function ProprietairesList() {
  return (
    <div>
      <PageHeader title="Propriétaires" description={`${owners.length} propriétaires partenaires`} />
      <div className="overflow-hidden rounded-xl border bg-card">
        <Table>
          <TableHeader><TableRow>
            <TableHead>Nom</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead className="text-right">Biens</TableHead>
            <TableHead className="text-right">Revenus générés</TableHead>
            <TableHead className="text-right">Part agence</TableHead>
            <TableHead>Mode</TableHead>
          </TableRow></TableHeader>
          <TableBody>
            {owners.map((o) => {
              const nbBiens = properties.filter((p) => p.proprietaireId === o.id).length;
              const partAgence = o.gestionType === "Standard" ? o.revenusGeneres * 0.2 : o.revenusGeneres * 0.18;
              return (
                <TableRow key={o.id}>
                  <TableCell className="font-medium">{o.nom}</TableCell>
                  <TableCell>
                    <div className="text-xs">{o.telephone}</div>
                    <div className="text-xs text-muted-foreground">{o.email}</div>
                  </TableCell>
                  <TableCell className="text-right tabular">{nbBiens}</TableCell>
                  <TableCell className="text-right tabular font-medium">{formatFCFA(o.revenusGeneres)}</TableCell>
                  <TableCell className="text-right tabular text-muted-foreground">{formatFCFA(partAgence)}</TableCell>
                  <TableCell><StatusBadge status={o.gestionType} /></TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
