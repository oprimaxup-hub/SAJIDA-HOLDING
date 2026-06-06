export type PropertyType = "Villa" | "Appartement" | "Immeuble" | "Magasin" | "Bureau" | "Terrain";
export type PropertyStatus = "Disponible" | "Loué" | "Vendu" | "Indisponible";
export type GestionType = "Standard" | "Premium";

export type Property = {
  id: string;
  reference: string;
  nom: string;
  type: PropertyType;
  adresse: string;
  quartier: string;
  ville: string;
  superficie: number;
  statut: PropertyStatus;
  loyer: number;
  proprietaireId: string;
  gestionType: GestionType;
  partAgencePct?: number; // standard
  montantGaranti?: number; // premium
};

export type Owner = {
  id: string;
  nom: string;
  telephone: string;
  email: string;
  nbBiens: number;
  revenusGeneres: number;
  gestionType: GestionType;
};

export type Tenant = {
  id: string;
  nom: string;
  telephone: string;
  email: string;
  profession: string;
  biensIds: string[];
  statut: "Actif" | "Sorti";
};

export type Contract = {
  id: string;
  reference: string;
  bienId: string;
  locataireId: string;
  dateDebut: string;
  dateFin: string;
  loyer: number;
  depot: number;
  statut: "Actif" | "Expiré" | "Résilié";
};

export type RentSchedule = {
  id: string;
  contratId: string;
  bienId: string;
  locataireId: string;
  periode: string; // "2026-04"
  montant: number;
  echeance: string;
  paye: boolean;
  datePaiement?: string;
  retardJours?: number;
};

const VILLES = ["Abidjan", "Dakar", "Cotonou", "Yaoundé", "Lomé", "Bamako"];
const QUARTIERS = ["Cocody", "Plateau", "Almadies", "Akpakpa", "Bastos", "Hamdallaye"];

export const owners: Owner[] = [
  { id: "o1", nom: "M. Konan Bertrand", telephone: "+225 07 12 34 56 78", email: "bkonan@mail.ci", nbBiens: 4, revenusGeneres: 18_400_000, gestionType: "Standard" },
  { id: "o2", nom: "Mme Diop Aïssatou", telephone: "+221 77 654 12 34", email: "adiop@mail.sn", nbBiens: 2, revenusGeneres: 9_600_000, gestionType: "Premium" },
  { id: "o3", nom: "Société Atlas Holding", telephone: "+225 27 22 50 10 10", email: "contact@atlas.ci", nbBiens: 7, revenusGeneres: 42_300_000, gestionType: "Standard" },
  { id: "o4", nom: "M. Tchami Joseph", telephone: "+237 690 22 33 44", email: "jtchami@mail.cm", nbBiens: 3, revenusGeneres: 12_750_000, gestionType: "Premium" },
];

export const properties: Property[] = Array.from({ length: 24 }).map((_, i) => {
  const types: PropertyType[] = ["Villa", "Appartement", "Immeuble", "Magasin", "Bureau", "Terrain"];
  const statuts: PropertyStatus[] = ["Disponible", "Loué", "Loué", "Loué", "Vendu", "Indisponible"];
  const type = types[i % types.length];
  const statut = statuts[i % statuts.length];
  const proprio = owners[i % owners.length];
  const loyer = [250_000, 350_000, 450_000, 600_000, 850_000, 1_200_000][i % 6];
  return {
    id: `p${i + 1}`,
    reference: `BIM-${String(2024100 + i)}`,
    nom: `${type} ${["Bellevue", "Les Palmiers", "Riviera", "Horizon", "Émeraude", "Atlantique"][i % 6]}`,
    type,
    adresse: `Rue ${i + 12}, Lot ${i + 4}`,
    quartier: QUARTIERS[i % QUARTIERS.length],
    ville: VILLES[i % VILLES.length],
    superficie: 80 + (i % 6) * 35,
    statut,
    loyer,
    proprietaireId: proprio.id,
    gestionType: proprio.gestionType,
    partAgencePct: proprio.gestionType === "Standard" ? 20 : undefined,
    montantGaranti: proprio.gestionType === "Premium" ? Math.round(loyer * 0.75) : undefined,
  };
});

export const tenants: Tenant[] = [
  { id: "t1", nom: "Kouamé Yves", telephone: "+225 07 88 11 22 33", email: "yves.k@mail.ci", profession: "Ingénieur Télécom", biensIds: ["p2"], statut: "Actif" },
  { id: "t2", nom: "Ngozi Adaeze", telephone: "+234 803 222 33 44", email: "ngozi.a@mail.ng", profession: "Médecin", biensIds: ["p3"], statut: "Actif" },
  { id: "t3", nom: "Sarr Mamadou", telephone: "+221 77 111 22 33", email: "msarr@mail.sn", profession: "Avocat", biensIds: ["p8"], statut: "Actif" },
  { id: "t4", nom: "Boukar Aminata", telephone: "+237 690 55 66 77", email: "aboukar@mail.cm", profession: "Consultante RH", biensIds: ["p9"], statut: "Actif" },
  { id: "t5", nom: "Traoré Ibrahim", telephone: "+223 76 22 11 00", email: "itraore@mail.ml", profession: "Commerçant", biensIds: ["p14"], statut: "Actif" },
  { id: "t6", nom: "Dossou Romaric", telephone: "+229 97 33 22 11", email: "rdossou@mail.bj", profession: "Architecte", biensIds: ["p15"], statut: "Actif" },
  { id: "t7", nom: "Effah Akosua", telephone: "+233 24 555 77 88", email: "aeffah@mail.gh", profession: "Enseignante", biensIds: ["p20"], statut: "Sorti" },
];

export const contracts: Contract[] = tenants
  .filter((t) => t.statut === "Actif")
  .map((t, i) => {
    const bien = properties.find((p) => p.id === t.biensIds[0])!;
    return {
      id: `c${i + 1}`,
      reference: `CTR-${2024 + i}-${String(100 + i).padStart(3, "0")}`,
      bienId: bien.id,
      locataireId: t.id,
      dateDebut: `2024-${String(((i + 1) % 12) + 1).padStart(2, "0")}-01`,
      dateFin: `2026-${String(((i + 1) % 12) + 1).padStart(2, "0")}-01`,
      loyer: bien.loyer,
      depot: bien.loyer * 2,
      statut: "Actif" as const,
    };
  });

export const rentSchedules: RentSchedule[] = (() => {
  const out: RentSchedule[] = [];
  const now = new Date(2026, 5, 1);
  contracts.forEach((c) => {
    for (let m = -3; m <= 1; m++) {
      const d = new Date(now.getFullYear(), now.getMonth() + m, 5);
      const periode = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
      const paye = m < 0 ? Math.random() > 0.25 : false;
      const retard = !paye && m < 0 ? Math.abs(m) * 30 : 0;
      out.push({
        id: `r-${c.id}-${periode}`,
        contratId: c.id,
        bienId: c.bienId,
        locataireId: c.locataireId,
        periode,
        montant: c.loyer,
        echeance: d.toISOString().slice(0, 10),
        paye,
        datePaiement: paye ? d.toISOString().slice(0, 10) : undefined,
        retardJours: retard,
      });
    }
  });
  return out;
})();

// Dashboard KPIs & charts
export const dashboard = {
  kpis: {
    biens: properties.length,
    locataires: tenants.filter((t) => t.statut === "Actif").length,
    loyersEncaisses: 18_750_000,
    loyersImpayes: 3_450_000,
    revenusMois: 22_400_000,
    depensesMois: 7_850_000,
    tresorerie: 87_320_000,
    ventes: 4,
    chantiersActifs: 6,
  },
  revenusMensuels: [
    { mois: "Jan", revenus: 18_200_000, depenses: 6_400_000 },
    { mois: "Fév", revenus: 19_500_000, depenses: 7_100_000 },
    { mois: "Mar", revenus: 21_300_000, depenses: 6_900_000 },
    { mois: "Avr", revenus: 20_800_000, depenses: 8_200_000 },
    { mois: "Mai", revenus: 22_900_000, depenses: 7_500_000 },
    { mois: "Juin", revenus: 22_400_000, depenses: 7_850_000 },
  ],
  ventesMensuelles: [
    { mois: "Jan", ventes: 2 },
    { mois: "Fév", ventes: 3 },
    { mois: "Mar", ventes: 1 },
    { mois: "Avr", ventes: 4 },
    { mois: "Mai", ventes: 3 },
    { mois: "Juin", ventes: 4 },
  ],
  occupation: [
    { name: "Loué", value: properties.filter((p) => p.statut === "Loué").length },
    { name: "Disponible", value: properties.filter((p) => p.statut === "Disponible").length },
    { name: "Vendu", value: properties.filter((p) => p.statut === "Vendu").length },
    { name: "Indisponible", value: properties.filter((p) => p.statut === "Indisponible").length },
  ],
  activites: [
    { id: 1, type: "paiement", texte: "Loyer reçu de Kouamé Yves — 450 000 FCFA", date: "Il y a 2h" },
    { id: 2, type: "contrat", texte: "Nouveau contrat CTR-2026-108 signé", date: "Il y a 5h" },
    { id: 3, type: "maintenance", texte: "Intervention plomberie clôturée — Villa Bellevue", date: "Hier" },
    { id: 4, type: "vente", texte: "Réservation lot L-204 validée", date: "Hier" },
    { id: 5, type: "relance", texte: "Relance envoyée à Sarr Mamadou", date: "Il y a 2j" },
  ],
};
