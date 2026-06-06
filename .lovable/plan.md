
# Plan — ERP Immobilier Premium (Itération 1)

Objectif : poser une fondation visuelle et structurelle premium (niveau Odoo/SAP/Zoho) sur laquelle on étendra ensuite les autres modules (Lotissements, Ventes, Échéanciers, Commissions, Chantiers, Stocks, Maintenance, Compta, Trésorerie, Rapports).

## 1. Identité visuelle & design system

Mise à jour de `src/styles.css` avec les tokens demandés en **oklch** (équivalents des hex fournis) :

- `--primary` : Orange Premium (#F97316)
- `--primary-hover` : Orange secondaire (#EA580C)
- `--background` / `--foreground` clair (#F8FAFC / #1C1F26) et sombre (#111827 / #FFFFFF)
- `--sidebar` anthracite (#1C1F26) avec accent orange
- Sémantique : `--success`, `--danger`, `--warning`, `--info`
- Radius doux (10–12px), ombres subtiles, gradient orange premium pour CTAs hero
- Typographie : Inter (UI) + chiffres tabulaires pour montants FCFA

Mode sombre + mode clair via classe `dark` sur `<html>`, toggle dans le header.

## 2. Shell applicatif (layout global)

Route layout `src/routes/_app.tsx` (pathless) avec `<Outlet />` :

- **Sidebar fixe** (shadcn sidebar, collapsible icon) noir anthracite, sections groupées :
  - Pilotage : Dashboard
  - Patrimoine : Biens, Propriétaires, Lotissements
  - Location : Locataires, Contrats, Loyers, Relances
  - Vente : Ventes, Échéanciers, Commissions, Partenaires
  - Opérations : Chantiers, Stocks, Maintenance
  - Finance : Comptabilité, Trésorerie, Rapports
  - Système : Utilisateurs, Paramètres
  Icônes Lucide, badge actif orange, état réduit en icônes uniquement.
- **Header** : breadcrumb dynamique, recherche globale (Command palette ⌘K), notifications (popover), toggle thème, menu profil avec **sélecteur de rôle mocké** (DG / Secrétaire / Gestionnaire / Technicien / Comptable / Admin).
- **RBAC UI** : un hook `useRole()` filtre les entrées de la sidebar et masque/désactive les actions selon le rôle actif (purement présentation, basé sur un store Zustand léger ou contexte React).

## 3. Authentification (pages publiques)

Routes publiques (hors `_app`) :

- `/auth/login` — design split-screen, visuel premium à gauche, formulaire à droite (React Hook Form + Zod)
- `/auth/forgot-password`
- `/auth/reset-password`

Comportement mocké : `login` redirige vers `/` et initialise le rôle sélectionné.

## 4. Tableau de bord exécutif

Route `/` (sous `_app`) :

- 9 cartes KPI (Biens, Locataires, Loyers encaissés, Loyers impayés, Revenus mois, Dépenses mois, Trésorerie, Ventes, Chantiers actifs) avec delta % et mini sparkline
- Graphiques Recharts :
  - Revenus mensuels (bar)
  - Encaissements vs Dépenses (area)
  - Évolution des ventes (line)
  - Taux d'occupation (donut)
- Widgets latéraux : Échéances à venir, Loyers en retard (top 5), Interventions maintenance, Activités récentes (timeline)
- Tous montants en **FCFA** formatés (`Intl.NumberFormat('fr-FR')`).

## 5. Module Biens immobiliers

- `/biens` — liste : DataTable avancée (tri, filtres multi-critères type/ville/statut, recherche, pagination, sélection multiple, export CSV mocké), vue alternative en cartes
- `/biens/nouveau` — formulaire multi-étapes (Infos, Localisation, Caractéristiques, Photos/Docs, Propriétaire & contrat de gestion **Standard %** ou **Premium montant garanti**)
- `/biens/$id` — fiche détail : galerie, infos, locataires actuels, historique loyers, documents, timeline
- `/biens/$id/modifier`

Types : Villa, Appartement, Immeuble, Magasin, Bureau, Terrain. Statuts : Disponible, Loué, Vendu, Indisponible.

## 6. Module Locataires

- `/locataires` — DataTable
- `/locataires/$id` — fiche : infos, contrats, historique paiements, pièces jointes, relances
- `/locataires/nouveau`

## 7. Module Contrats & Loyers (couplé)

- `/contrats` — liste contrats actifs/expirés
- `/contrats/nouveau` — wizard (Bien → Locataire → Conditions financières → Garanties → Signature)
- `/contrats/$id` — détail avec échéancier de loyers généré
- `/loyers` — dashboard loyers : KPIs (taux recouvrement, impayés, à encaisser), table échéances mensuelles avec actions Encaisser / Relancer / Pénalité

## 8. Composants UI réutilisables (`src/components/`)

- `kpi-card.tsx`, `stat-trend.tsx`
- `data-table/` (table générique avec colonnes configurables, filtres, pagination)
- `page-header.tsx` (titre + breadcrumb + actions)
- `empty-state.tsx`, `status-badge.tsx`
- `money.tsx` (formatteur FCFA)
- `multi-step-form.tsx`
- `file-uploader.tsx` (drag & drop, preview)
- `chart-card.tsx` (wrapper Recharts thémé)
- `command-palette.tsx`

## 9. Données mockées

Dossier `src/lib/mock/` :
- `properties.ts`, `owners.ts`, `tenants.ts`, `contracts.ts`, `rents.ts`, `dashboard.ts`
- Données réalistes africaines (Abidjan, Dakar, Cotonou, Yaoundé…), montants FCFA cohérents
- Exposées via TanStack Query (`useQuery`) avec faux délai pour réalisme

## Détails techniques

- **Routing** : TanStack Router file-based ; layout pathless `_app.tsx` avec sidebar/header, routes publiques `auth.*` en dehors.
- **State rôle** : contexte React `RoleProvider` + `useRole()`, persistance localStorage.
- **Thème** : `next-themes`-like manuel (class `dark` sur `<html>`), toggle dans header.
- **Forms** : React Hook Form + résolveurs Zod, schémas dans `src/lib/schemas/`.
- **i18n** : interface en français (libellés en dur pour cette itération).
- **Format monétaire** : helper `formatFCFA(n)` → `1 250 000 FCFA`.
- **Recharts** : couleurs depuis tokens CSS (`var(--primary)`, etc.) via wrapper.
- **shadcn** : composants déjà présents réutilisés (sidebar, table, dialog, form, command, dropdown, tabs, popover, etc.). Pas d'ajout de dépendance externe.

## Hors scope de cette itération (à venir)

Modules Propriétaires (fiche détaillée), Relances, Lotissements (vue plan), Ventes, Échéanciers, Partenaires, Commissions, Chantiers, Stocks, Maintenance, Comptabilité, Trésorerie, Rapports PDF/Excel. Le shell et la sidebar les listeront avec un état « Bientôt disponible » pour préserver la navigation complète.

## Livrable

Un ERP visuellement premium, navigable, avec 3 modules fonctionnels (mockés), prêt à être étendu module par module dans les itérations suivantes.
