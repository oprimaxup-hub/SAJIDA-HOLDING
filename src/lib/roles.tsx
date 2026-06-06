import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";

export type Role =
  | "directeur"
  | "secretaire"
  | "gestionnaire"
  | "technicien"
  | "comptable"
  | "admin";

export const ROLES: { value: Role; label: string; short: string }[] = [
  { value: "directeur", label: "Directeur Général", short: "DG" },
  { value: "secretaire", label: "Secrétaire", short: "SE" },
  { value: "gestionnaire", label: "Gestionnaire Immobilier", short: "GI" },
  { value: "technicien", label: "Technicien", short: "TE" },
  { value: "comptable", label: "Comptable", short: "CO" },
  { value: "admin", label: "Administrateur Système", short: "AD" },
];

// Modules visible per role
const ACCESS: Record<Role, string[] | "all"> = {
  directeur: "all",
  admin: "all",
  secretaire: [
    "dashboard", "biens", "proprietaires", "locataires", "contrats", "loyers",
    "relances", "ventes", "echeanciers", "partenaires",
  ],
  gestionnaire: [
    "dashboard", "biens", "proprietaires", "locataires", "contrats", "loyers",
    "relances", "lotissements", "ventes", "echeanciers", "partenaires", "commissions",
  ],
  technicien: ["dashboard", "biens", "chantiers", "stocks", "maintenance"],
  comptable: [
    "dashboard", "loyers", "ventes", "echeanciers", "commissions",
    "comptabilite", "tresorerie", "rapports",
  ],
};

type Ctx = {
  role: Role;
  setRole: (r: Role) => void;
  canAccess: (module: string) => boolean;
};

const RoleContext = createContext<Ctx | null>(null);

export function RoleProvider({ children }: { children: ReactNode }) {
  const [role, setRoleState] = useState<Role>("directeur");

  useEffect(() => {
    const saved = typeof window !== "undefined" ? localStorage.getItem("erp-role") : null;
    if (saved && ROLES.find((r) => r.value === saved)) setRoleState(saved as Role);
  }, []);

  const setRole = useCallback((r: Role) => {
    setRoleState(r);
    if (typeof window !== "undefined") localStorage.setItem("erp-role", r);
  }, []);

  const canAccess = useCallback(
    (m: string) => {
      const a = ACCESS[role];
      return a === "all" || a.includes(m);
    },
    [role],
  );

  return <RoleContext.Provider value={{ role, setRole, canAccess }}>{children}</RoleContext.Provider>;
}

export function useRole() {
  const ctx = useContext(RoleContext);
  if (!ctx) throw new Error("useRole must be inside RoleProvider");
  return ctx;
}

export function roleLabel(r: Role) {
  return ROLES.find((x) => x.value === r)?.label ?? r;
}
