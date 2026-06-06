import { createFileRoute } from "@tanstack/react-router";
import { Building2, Users2, Wallet, AlertTriangle, TrendingUp, Receipt, Banknote, ShoppingCart, HardHat, ArrowRight } from "lucide-react";
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  AreaChart, Area, PieChart, Pie, Cell, Legend, LineChart, Line,
} from "recharts";
import { KpiCard } from "@/components/app/kpi-card";
import { PageHeader } from "@/components/app/page-header";
import { StatusBadge } from "@/components/app/status-badge";
import { Button } from "@/components/ui/button";
import { dashboard, rentSchedules, tenants, properties } from "@/lib/mock/data";
import { formatFCFA } from "@/lib/format";

export const Route = createFileRoute("/_app/")({
  head: () => ({ meta: [{ title: "Tableau de bord — SAJIDA ERP" }] }),
  component: Dashboard,
});

const COLORS = ["var(--primary)", "var(--info)", "var(--success)", "var(--warning)"];

function Dashboard() {
  const k = dashboard.kpis;
  const retards = rentSchedules
    .filter((r) => !r.paye && (r.retardJours ?? 0) > 0)
    .sort((a, b) => (b.retardJours ?? 0) - (a.retardJours ?? 0))
    .slice(0, 5);

  return (
    <div>
      <PageHeader
        title="Tableau de bord"
        description="Vue d'ensemble de l'activité immobilière — Juin 2026"
        actions={
          <>
            <Button variant="outline">Exporter</Button>
            <Button className="bg-gradient-to-r from-primary to-primary-hover shadow-md shadow-primary/20">Nouvelle opération</Button>
          </>
        }
      />

      {/* Chiffres simples (Opérations) */}
      <h3 className="mb-3 mt-2 text-sm font-semibold text-muted-foreground">Vue d'ensemble</h3>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
        <KpiCard label="Biens" value={k.biens} delta={4} icon={Building2} accent="primary" />
        <KpiCard label="Locataires actifs" value={k.locataires} delta={2} icon={Users2} accent="info" />
        <KpiCard label="Ventes réalisées" value={k.ventes} delta={33} icon={ShoppingCart} accent="info" />
        <KpiCard label="Chantiers actifs" value={k.chantiersActifs} delta={0} icon={HardHat} accent="warning" />
        <KpiCard label="Trésorerie" value={formatFCFA(k.tresorerie)} delta={6} icon={Banknote} accent="primary" />
      </div>

      {/* Montants (Finances) */}
      <h3 className="mb-3 mt-6 text-sm font-semibold text-muted-foreground">Indicateurs financiers</h3>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <KpiCard label="Loyers encaissés" value={formatFCFA(k.loyersEncaisses)} delta={8} icon={Wallet} accent="success" />
        <KpiCard label="Loyers impayés" value={formatFCFA(k.loyersImpayes)} delta={-3} icon={AlertTriangle} accent="danger" />
        <KpiCard label="Revenus du mois" value={formatFCFA(k.revenusMois)} delta={5} icon={TrendingUp} accent="success" />
        <KpiCard label="Dépenses du mois" value={formatFCFA(k.depensesMois)} delta={2} icon={Receipt} accent="warning" />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="rounded-xl border bg-card p-5 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold">Revenus & Dépenses</h3>
              <p className="text-xs text-muted-foreground">6 derniers mois</p>
            </div>
          </div>
          <div className="h-72">
            <ResponsiveContainer>
              <AreaChart data={dashboard.revenusMensuels}>
                <defs>
                  <linearGradient id="gR" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="var(--primary)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gD" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--info)" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="var(--info)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="mois" tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                <YAxis tickFormatter={(v) => `${(v / 1_000_000).toFixed(0)}M`} tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 }}
                  formatter={(v: number) => formatFCFA(v)}
                />
                <Area type="monotone" dataKey="revenus" stroke="var(--primary)" strokeWidth={2.5} fill="url(#gR)" name="Revenus" />
                <Area type="monotone" dataKey="depenses" stroke="var(--info)" strokeWidth={2} fill="url(#gD)" name="Dépenses" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-xl border bg-card p-5">
          <h3 className="text-sm font-semibold">Occupation des biens</h3>
          <p className="text-xs text-muted-foreground">Répartition actuelle</p>
          <div className="h-72">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={dashboard.occupation} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={3}>
                  {dashboard.occupation.map((_, i) => (<Cell key={i} fill={COLORS[i % COLORS.length]} />))}
                </Pie>
                <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 }} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="rounded-xl border bg-card p-5">
          <h3 className="text-sm font-semibold">Évolution des ventes</h3>
          <p className="text-xs text-muted-foreground">Volume mensuel</p>
          <div className="h-56">
            <ResponsiveContainer>
              <LineChart data={dashboard.ventesMensuelles}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="mois" tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 }} />
                <Line type="monotone" dataKey="ventes" stroke="var(--primary)" strokeWidth={2.5} dot={{ r: 4, fill: "var(--primary)" }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-xl border bg-card p-5">
          <h3 className="text-sm font-semibold">Encaissements mensuels</h3>
          <p className="text-xs text-muted-foreground">FCFA</p>
          <div className="h-56">
            <ResponsiveContainer>
              <BarChart data={dashboard.revenusMensuels}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="mois" tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                <YAxis tickFormatter={(v) => `${(v / 1_000_000).toFixed(0)}M`} tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 }} formatter={(v: number) => formatFCFA(v)} />
                <Bar dataKey="revenus" fill="var(--primary)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-xl border bg-card p-5">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold">Loyers en retard</h3>
              <p className="text-xs text-muted-foreground">Top 5</p>
            </div>
            <Button variant="ghost" size="sm" className="text-xs">Tout voir <ArrowRight className="ml-1 h-3 w-3" /></Button>
          </div>
          <div className="space-y-3">
            {retards.length === 0 && <p className="text-xs text-muted-foreground">Aucun retard.</p>}
            {retards.map((r) => {
              const tenant = tenants.find((t) => t.id === r.locataireId);
              const bien = properties.find((p) => p.id === r.bienId);
              return (
                <div key={r.id} className="flex items-center justify-between gap-2 rounded-lg border bg-background/50 p-3">
                  <div className="min-w-0">
                    <div className="truncate text-sm font-medium">{tenant?.nom}</div>
                    <div className="truncate text-xs text-muted-foreground">{bien?.nom} · {r.periode}</div>
                  </div>
                  <div className="text-right">
                    <div className="tabular text-sm font-semibold text-destructive">{formatFCFA(r.montant)}</div>
                    <StatusBadge status="En retard" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mt-4 rounded-xl border bg-card p-5">
        <h3 className="text-sm font-semibold">Activités récentes</h3>
        <div className="mt-4 space-y-4">
          {dashboard.activites.map((a) => (
            <div key={a.id} className="flex gap-3">
              <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary" />
              <div className="flex-1 border-l-2 border-dashed border-border pb-3 pl-4">
                <p className="text-sm">{a.texte}</p>
                <p className="text-xs text-muted-foreground">{a.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
