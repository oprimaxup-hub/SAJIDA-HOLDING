import { useRouterState, Link, useNavigate } from "@tanstack/react-router";
import { Bell, Moon, Search, Sun, ChevronDown, LogOut, UserCircle2 } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel,
  DropdownMenuSeparator, DropdownMenuTrigger, DropdownMenuRadioGroup, DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useTheme } from "@/lib/theme";
import { useRole, ROLES, roleLabel, type Role } from "@/lib/roles";

const LABELS: Record<string, string> = {
  "": "Tableau de bord",
  biens: "Biens immobiliers",
  proprietaires: "Propriétaires",
  lotissements: "Lotissements",
  locataires: "Locataires",
  contrats: "Contrats",
  loyers: "Loyers",
  relances: "Relances",
  ventes: "Ventes",
  echeanciers: "Échéanciers",
  partenaires: "Partenaires",
  commissions: "Commissions",
  chantiers: "Chantiers",
  stocks: "Stocks",
  maintenance: "Maintenance",
  comptabilite: "Comptabilité",
  tresorerie: "Trésorerie",
  rapports: "Rapports",
  utilisateurs: "Utilisateurs",
  parametres: "Paramètres",
  nouveau: "Nouveau",
  modifier: "Modifier",
};

function Breadcrumb() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const parts = pathname.split("/").filter(Boolean);
  const crumbs = [{ label: "Accueil", to: "/" }];
  let cur = "";
  for (const p of parts) {
    cur += "/" + p;
    crumbs.push({ label: LABELS[p] ?? p, to: cur });
  }
  return (
    <nav className="hidden items-center gap-1.5 text-sm text-muted-foreground md:flex">
      {crumbs.map((c, i) => (
        <span key={c.to} className="flex items-center gap-1.5">
          {i > 0 && <span className="text-muted-foreground/40">/</span>}
          {i === crumbs.length - 1 ? (
            <span className="font-medium text-foreground">{c.label}</span>
          ) : (
            <Link to={c.to} className="hover:text-foreground">{c.label}</Link>
          )}
        </span>
      ))}
    </nav>
  );
}

export function AppHeader() {
  const { theme, toggle } = useTheme();
  const { role, setRole } = useRole();
  const navigate = useNavigate();
  const initials = roleLabel(role).split(" ").map((w) => w[0]).slice(0, 2).join("");

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b bg-background/80 px-4 backdrop-blur-md md:px-6">
      <SidebarTrigger className="h-9 w-9" />
      <Breadcrumb />
      <div className="ml-auto flex items-center gap-2">
        <div className="relative hidden md:block">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Rechercher un bien, locataire, contrat…"
            className="h-9 w-[320px] pl-9 bg-muted/40"
          />
          <kbd className="pointer-events-none absolute right-2 top-1/2 hidden -translate-y-1/2 select-none items-center gap-1 rounded border bg-background px-1.5 font-mono text-[10px] text-muted-foreground md:inline-flex">
            ⌘K
          </kbd>
        </div>

        <Button variant="ghost" size="icon" className="h-9 w-9" onClick={toggle} aria-label="Basculer thème">
          {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Button>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" className="relative h-9 w-9">
              <Bell className="h-4 w-4" />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-primary ring-2 ring-background" />
            </Button>
          </PopoverTrigger>
          <PopoverContent align="end" className="w-80 p-0">
            <div className="border-b px-4 py-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold">Notifications</span>
                <Badge variant="secondary" className="text-[10px]">3 nouvelles</Badge>
              </div>
            </div>
            <div className="max-h-80 divide-y overflow-auto">
              {[
                { t: "Loyer impayé", d: "Sarr Mamadou — Mai 2026", a: "Il y a 1h", c: "warning" },
                { t: "Nouveau contrat signé", d: "CTR-2026-108", a: "Il y a 3h", c: "success" },
                { t: "Intervention urgente", d: "Villa Bellevue — Plomberie", a: "Hier", c: "danger" },
              ].map((n, i) => (
                <div key={i} className="flex gap-3 px-4 py-3 hover:bg-muted/50">
                  <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${n.c === "warning" ? "bg-warning" : n.c === "success" ? "bg-success" : "bg-destructive"}`} />
                  <div className="flex-1">
                    <div className="text-sm font-medium">{n.t}</div>
                    <div className="text-xs text-muted-foreground">{n.d}</div>
                    <div className="mt-0.5 text-[10px] text-muted-foreground/70">{n.a}</div>
                  </div>
                </div>
              ))}
            </div>
          </PopoverContent>
        </Popover>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-9 gap-2 pl-1.5 pr-2">
              <Avatar className="h-7 w-7">
                <AvatarFallback className="bg-gradient-to-br from-primary to-primary-hover text-xs font-semibold text-primary-foreground">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div className="hidden text-left md:block">
                <div className="text-xs font-medium leading-tight">{roleLabel(role)}</div>
                <div className="text-[10px] leading-tight text-muted-foreground">Connecté</div>
              </div>
              <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-64">
            <DropdownMenuLabel>Mon compte</DropdownMenuLabel>
            <DropdownMenuItem><UserCircle2 className="mr-2 h-4 w-4" /> Profil</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuLabel className="text-xs text-muted-foreground">Basculer de rôle (démo)</DropdownMenuLabel>
            <DropdownMenuRadioGroup value={role} onValueChange={(v) => setRole(v as Role)}>
              {ROLES.map((r) => (
                <DropdownMenuRadioItem key={r.value} value={r.value}>{r.label}</DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate({ to: "/auth/login" })}>
              <LogOut className="mr-2 h-4 w-4" /> Se déconnecter
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
