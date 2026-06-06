import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard, Building2, Users2, FileText, Wallet, Bell, MapPinned,
  ShoppingCart, CalendarClock, Handshake, Percent, HardHat, Boxes, Wrench,
  Calculator, Banknote, FileBarChart, UserCog, Settings, Flame,
} from "lucide-react";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel,
  SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar,
} from "@/components/ui/sidebar";
import { useRole } from "@/lib/roles";
import { cn } from "@/lib/utils";

type Item = { title: string; url: string; icon: any; module: string };
type Group = { label: string; items: Item[] };

const groups: Group[] = [
  { label: "Pilotage", items: [
    { title: "Tableau de bord", url: "/", icon: LayoutDashboard, module: "dashboard" },
  ]},
  { label: "Patrimoine", items: [
    { title: "Biens", url: "/biens", icon: Building2, module: "biens" },
    { title: "Propriétaires", url: "/proprietaires", icon: Users2, module: "proprietaires" },
    { title: "Lotissements", url: "/lotissements", icon: MapPinned, module: "lotissements" },
  ]},
  { label: "Location", items: [
    { title: "Locataires", url: "/locataires", icon: Users2, module: "locataires" },
    { title: "Contrats", url: "/contrats", icon: FileText, module: "contrats" },
    { title: "Loyers", url: "/loyers", icon: Wallet, module: "loyers" },
    { title: "Relances", url: "/relances", icon: Bell, module: "relances" },
  ]},
  { label: "Vente", items: [
    { title: "Ventes", url: "/ventes", icon: ShoppingCart, module: "ventes" },
    { title: "Échéanciers", url: "/echeanciers", icon: CalendarClock, module: "echeanciers" },
    { title: "Partenaires", url: "/partenaires", icon: Handshake, module: "partenaires" },
    { title: "Commissions", url: "/commissions", icon: Percent, module: "commissions" },
  ]},
  { label: "Opérations", items: [
    { title: "Chantiers", url: "/chantiers", icon: HardHat, module: "chantiers" },
    { title: "Stocks", url: "/stocks", icon: Boxes, module: "stocks" },
    { title: "Maintenance", url: "/maintenance", icon: Wrench, module: "maintenance" },
  ]},
  { label: "Finance", items: [
    { title: "Comptabilité", url: "/comptabilite", icon: Calculator, module: "comptabilite" },
    { title: "Trésorerie", url: "/tresorerie", icon: Banknote, module: "tresorerie" },
    { title: "Rapports", url: "/rapports", icon: FileBarChart, module: "rapports" },
  ]},
  { label: "Système", items: [
    { title: "Utilisateurs", url: "/utilisateurs", icon: UserCog, module: "utilisateurs" },
    { title: "Paramètres", url: "/parametres", icon: Settings, module: "parametres" },
  ]},
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { canAccess, role } = useRole();
  const isAdmin = role === "admin" || role === "directeur";

  return (
    <Sidebar collapsible="icon" className="border-r-0">
      <SidebarHeader className="border-b border-sidebar-border px-4 py-4">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary-hover shadow-lg shadow-primary/20">
            <Flame className="h-5 w-5 text-primary-foreground" />
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="text-sm font-semibold tracking-tight text-sidebar-foreground">SAJIDA</span>
              <span className="text-[10px] uppercase tracking-wider text-sidebar-foreground/50">ERP Premium</span>
            </div>
          )}
        </Link>
      </SidebarHeader>
      <SidebarContent className="px-2 py-3">
        {groups.map((g) => {
          const visible = g.items.filter((i) =>
            ["utilisateurs", "parametres"].includes(i.module) ? isAdmin : canAccess(i.module),
          );
          if (!visible.length) return null;
          return (
            <SidebarGroup key={g.label}>
              {!collapsed && (
                <SidebarGroupLabel className="px-2 text-[10px] font-semibold uppercase tracking-wider text-sidebar-foreground/40">
                  {g.label}
                </SidebarGroupLabel>
              )}
              <SidebarGroupContent>
                <SidebarMenu>
                  {visible.map((item) => {
                    const active =
                      item.url === "/" ? pathname === "/" : pathname === item.url || pathname.startsWith(item.url + "/");
                    return (
                      <SidebarMenuItem key={item.url}>
                        <SidebarMenuButton
                          asChild
                          isActive={active}
                          className={cn(
                            "h-9 gap-3 rounded-md text-sidebar-foreground/80 transition-colors",
                            "hover:bg-sidebar-accent hover:text-sidebar-foreground",
                            active &&
                              "bg-gradient-to-r from-primary/15 to-transparent text-sidebar-foreground font-medium border-l-2 border-primary rounded-l-none",
                          )}
                        >
                          <Link to={item.url}>
                            <item.icon className="h-[18px] w-[18px] shrink-0" />
                            {!collapsed && <span className="text-sm">{item.title}</span>}
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          );
        })}
      </SidebarContent>
    </Sidebar>
  );
}
