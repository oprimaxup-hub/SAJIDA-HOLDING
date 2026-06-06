import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { Plus, Search, LayoutGrid, List as ListIcon, Filter, Download } from "lucide-react";
import { PageHeader } from "@/components/app/page-header";
import { StatusBadge } from "@/components/app/status-badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { properties, owners } from "@/lib/mock/data";
import { formatFCFA } from "@/lib/format";

export const Route = createFileRoute("/_app/biens/")({
  head: () => ({ meta: [{ title: "Biens immobiliers — SAJIDA ERP" }] }),
  component: BiensList,
});

function BiensList() {
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const [type, setType] = useState<string>("all");
  const [statut, setStatut] = useState<string>("all");
  const [view, setView] = useState<"table" | "cards">("table");

  const filtered = useMemo(() => {
    return properties.filter((p) => {
      if (type !== "all" && p.type !== type) return false;
      if (statut !== "all" && p.statut !== statut) return false;
      if (q && !`${p.nom} ${p.reference} ${p.ville} ${p.quartier}`.toLowerCase().includes(q.toLowerCase())) return false;
      return true;
    });
  }, [q, type, statut]);

  return (
    <div>
      <PageHeader
        title="Biens immobiliers"
        description={`${properties.length} biens dans le portefeuille`}
        actions={
          <>
            <Button variant="outline"><Download className="mr-2 h-4 w-4" /> Exporter</Button>
            <Button asChild className="bg-gradient-to-r from-primary to-primary-hover shadow-md shadow-primary/20">
              <Link to="/biens/nouveau"><Plus className="mr-2 h-4 w-4" /> Nouveau bien</Link>
            </Button>
          </>
        }
      />

      <div className="rounded-xl border bg-card">
        <div className="flex flex-col gap-3 border-b p-4 lg:flex-row lg:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Rechercher par référence, nom, ville…" value={q} onChange={(e) => setQ(e.target.value)} className="pl-9" />
          </div>
          <div className="flex gap-2">
            <Select value={type} onValueChange={setType}>
              <SelectTrigger className="w-40"><Filter className="mr-1 h-3 w-3" /><SelectValue placeholder="Type" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les types</SelectItem>
                {["Villa", "Appartement", "Immeuble", "Magasin", "Bureau", "Terrain"].map((t) => (
                  <SelectItem key={t} value={t}>{t}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={statut} onValueChange={setStatut}>
              <SelectTrigger className="w-40"><SelectValue placeholder="Statut" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous statuts</SelectItem>
                {["Disponible", "Loué", "Vendu", "Indisponible"].map((s) => (
                  <SelectItem key={s} value={s}>{s}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex rounded-md border bg-background">
              <Button variant={view === "table" ? "secondary" : "ghost"} size="icon" className="h-9 w-9 rounded-r-none" onClick={() => setView("table")}>
                <ListIcon className="h-4 w-4" />
              </Button>
              <Button variant={view === "cards" ? "secondary" : "ghost"} size="icon" className="h-9 w-9 rounded-l-none" onClick={() => setView("cards")}>
                <LayoutGrid className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {view === "table" ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Référence</TableHead>
                <TableHead>Bien</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Localisation</TableHead>
                <TableHead>Propriétaire</TableHead>
                <TableHead>Gestion</TableHead>
                <TableHead className="text-right">Loyer</TableHead>
                <TableHead>Statut</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((p) => {
                const owner = owners.find((o) => o.id === p.proprietaireId);
                return (
                  <TableRow key={p.id} className="cursor-pointer" onClick={() => navigate({ to: "/biens/$id", params: { id: p.id } })}>
                    <TableCell className="font-mono text-xs">{p.reference}</TableCell>
                    <TableCell>
                      <div className="font-medium">{p.nom}</div>
                      <div className="text-xs text-muted-foreground">{p.superficie} m²</div>
                    </TableCell>
                    <TableCell>{p.type}</TableCell>
                    <TableCell>
                      <div className="text-sm">{p.quartier}</div>
                      <div className="text-xs text-muted-foreground">{p.ville}</div>
                    </TableCell>
                    <TableCell className="text-sm">{owner?.nom}</TableCell>
                    <TableCell><StatusBadge status={p.gestionType} /></TableCell>
                    <TableCell className="tabular text-right font-medium">{formatFCFA(p.loyer)}</TableCell>
                    <TableCell><StatusBadge status={p.statut} /></TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        ) : (
          <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 xl:grid-cols-3">
            {filtered.map((p) => {
              const owner = owners.find((o) => o.id === p.proprietaireId);
              return (
                <Link key={p.id} to="/biens/$id" params={{ id: p.id }} className="group overflow-hidden rounded-xl border bg-card transition-shadow hover:shadow-md">
                  <div className="relative h-40 bg-gradient-to-br from-primary/20 via-primary/10 to-secondary">
                    <div className="absolute right-3 top-3"><StatusBadge status={p.statut} /></div>
                    <div className="absolute bottom-3 left-3 rounded-md bg-background/90 px-2 py-1 text-xs font-mono">{p.reference}</div>
                  </div>
                  <div className="p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <h4 className="font-semibold">{p.nom}</h4>
                      <span className="text-xs text-muted-foreground">{p.type}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{p.quartier} · {p.ville} · {p.superficie} m²</p>
                    <div className="mt-3 flex items-center justify-between border-t pt-3">
                      <span className="text-xs text-muted-foreground">{owner?.nom}</span>
                      <span className="tabular text-sm font-semibold text-primary">{formatFCFA(p.loyer)}</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        <div className="flex items-center justify-between border-t px-4 py-3 text-sm text-muted-foreground">
          <span>{filtered.length} bien{filtered.length > 1 ? "s" : ""} affiché{filtered.length > 1 ? "s" : ""}</span>
          <div className="flex gap-1">
            <Button variant="outline" size="sm" disabled>Précédent</Button>
            <Button variant="outline" size="sm" disabled>Suivant</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
