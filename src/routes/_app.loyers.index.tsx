import { createFileRoute } from "@tanstack/react-router";
import { Wallet, TrendingUp, AlertTriangle, Clock, Check, Bell } from "lucide-react";
import { PageHeader } from "@/components/app/page-header";
import { KpiCard } from "@/components/app/kpi-card";
import { StatusBadge } from "@/components/app/status-badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { rentSchedules, tenants, properties } from "@/lib/mock/data";
import { formatFCFA, formatDate } from "@/lib/format";
import { toast } from "sonner";

export const Route = createFileRoute("/_app/loyers/")({
  head: () => ({ meta: [{ title: "Loyers — SAJIDA ERP" }] }),
  component: LoyersPage,
});

function LoyersPage() {
  const total = rentSchedules.reduce((s, r) => s + r.montant, 0);
  const encaisse = rentSchedules.filter((r) => r.paye).reduce((s, r) => s + r.montant, 0);
  const impayes = rentSchedules.filter((r) => !r.paye).reduce((s, r) => s + r.montant, 0);
  const taux = total ? Math.round((encaisse / total) * 100) : 0;
  const retards = rentSchedules.filter((r) => !r.paye && (r.retardJours ?? 0) > 0).length;

  return (
    <div>
      <PageHeader title="Gestion des loyers" description="Suivi des encaissements, impayés et relances" />

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <KpiCard label="Taux de recouvrement" value={`${taux}%`} delta={3} icon={TrendingUp} accent="success" />
        <KpiCard label="Encaissé" value={formatFCFA(encaisse)} delta={5} icon={Wallet} accent="primary" />
        <KpiCard label="Impayés" value={formatFCFA(impayes)} delta={-2} icon={AlertTriangle} accent="danger" />
        <KpiCard label="Retards" value={retards} delta={0} icon={Clock} accent="warning" />
      </div>

      <div className="mt-6 rounded-xl border bg-card">
        <div className="border-b p-4">
          <h3 className="text-sm font-semibold">Échéances</h3>
        </div>
        <Table>
          <TableHeader><TableRow>
            <TableHead>Période</TableHead>
            <TableHead>Locataire</TableHead>
            <TableHead>Bien</TableHead>
            <TableHead>Échéance</TableHead>
            <TableHead className="text-right">Montant</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow></TableHeader>
          <TableBody>
            {rentSchedules.slice(0, 30).map((r) => {
              const t = tenants.find((x) => x.id === r.locataireId);
              const b = properties.find((p) => p.id === r.bienId);
              const status = r.paye ? "Payé" : (r.retardJours ?? 0) > 0 ? "En retard" : "Impayé";
              return (
                <TableRow key={r.id}>
                  <TableCell>{r.periode}</TableCell>
                  <TableCell>{t?.nom}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{b?.nom}</TableCell>
                  <TableCell className="text-xs">{formatDate(r.echeance)}</TableCell>
                  <TableCell className="tabular text-right font-medium">{formatFCFA(r.montant)}</TableCell>
                  <TableCell><StatusBadge status={status} /></TableCell>
                  <TableCell className="text-right">
                    {r.paye ? (
                      <span className="inline-flex items-center gap-1 text-xs text-success"><Check className="h-3 w-3" /> {formatDate(r.datePaiement!)}</span>
                    ) : (
                      <div className="flex justify-end gap-1">
                        <Button size="sm" variant="outline" onClick={() => toast.success("Paiement enregistré (démo)")}>Encaisser</Button>
                        <Button size="sm" variant="ghost" onClick={() => toast.info("Relance envoyée (démo)")}><Bell className="h-3.5 w-3.5" /></Button>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
