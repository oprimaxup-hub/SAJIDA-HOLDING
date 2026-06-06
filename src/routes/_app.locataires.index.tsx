import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, Search, Mail, Phone } from "lucide-react";
import { PageHeader } from "@/components/app/page-header";
import { StatusBadge } from "@/components/app/status-badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { tenants, contracts, properties } from "@/lib/mock/data";
import { formatFCFA } from "@/lib/format";

export const Route = createFileRoute("/_app/locataires/")({
  head: () => ({ meta: [{ title: "Locataires — SAJIDA ERP" }] }),
  component: LocatairesList,
});

function LocatairesList() {
  const [q, setQ] = useState("");
  const navigate = useNavigate();
  const list = tenants.filter((t) => `${t.nom} ${t.email}`.toLowerCase().includes(q.toLowerCase()));

  return (
    <div>
      <PageHeader
        title="Locataires"
        description={`${tenants.length} locataires dans le portefeuille`}
        actions={
          <Button asChild className="bg-gradient-to-r from-primary to-primary-hover">
            <Link to="/locataires/nouveau"><Plus className="mr-2 h-4 w-4" /> Nouveau locataire</Link>
          </Button>
        }
      />
      <div className="rounded-xl border bg-card">
        <div className="border-b p-4">
          <div className="relative max-w-md">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Rechercher un locataire…" value={q} onChange={(e) => setQ(e.target.value)} className="pl-9" />
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Locataire</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Profession</TableHead>
              <TableHead>Bien occupé</TableHead>
              <TableHead className="text-right">Loyer</TableHead>
              <TableHead>Statut</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {list.map((t) => {
              const ctr = contracts.find((c) => c.locataireId === t.id);
              const bien = ctr ? properties.find((p) => p.id === ctr.bienId) : null;
              return (
                <TableRow key={t.id} className="cursor-pointer" onClick={() => navigate({ to: "/locataires/$id", params: { id: t.id } })}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-primary/5 text-xs font-semibold text-primary">
                        {t.nom.split(" ").map((w) => w[0]).slice(0, 2).join("")}
                      </div>
                      <div className="font-medium">{t.nom}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground"><Phone className="h-3 w-3" /> {t.telephone}</div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground"><Mail className="h-3 w-3" /> {t.email}</div>
                  </TableCell>
                  <TableCell className="text-sm">{t.profession}</TableCell>
                  <TableCell className="text-sm">{bien?.nom ?? "—"}</TableCell>
                  <TableCell className="tabular text-right">{bien ? formatFCFA(bien.loyer) : "—"}</TableCell>
                  <TableCell><StatusBadge status={t.statut} /></TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
