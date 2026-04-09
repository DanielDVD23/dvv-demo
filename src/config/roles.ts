import type { Role, RoleConfig } from "@/types/roles";

export const roleConfigs: Record<Role, RoleConfig> = {
  staffelleitung: {
    id: "staffelleitung",
    label: "Staffelleitung",
    subtitle: "NWVV · Verbandsliga Nord",
    userName: "Stefan Meier",
    initials: "SM",
    gradient: "from-accent to-[#6D28D9]",
    defaultScreen: "dashboard",
    navSections: [
      {
        label: "",
        items: [
          { id: "dashboard", label: "Dashboard", badge: 5, icon: "grid" },
          { id: "admin-league", label: "Admin League", icon: "trophy" },
          { id: "mail", label: "Mail", icon: "mail" },
          { id: "kalender", label: "Kalender", icon: "calendar" },
          { id: "kontakte", label: "Kontakte", icon: "book-open" },
        ],
      },
      {
        label: "Spielbetrieb",
        items: [
          { id: "spieltag", label: "Ligenübersicht", badge: 2, icon: "calendar-edit" },
          { id: "ligen", label: "Meine Ligen", icon: "star" },
          { id: "mannschaft", label: "Mannschaften meiner Ligen", icon: "users" },
          { id: "heimspieltermine", label: "Heimspieltermine", icon: "calendar-home" },
        ],
      },
      {
        label: "Verband",
        items: [
          { id: "alle-ligen", label: "Alle Ligen", icon: "org-tree" },
          { id: "alle-mannschaften", label: "Alle Mannschaften", icon: "users" },
          { id: "statistik", label: "Statistiken", icon: "pie-chart" },
          { id: "strafen", label: "Meine Strafbescheide", badge: 1, icon: "alert" },
        ],
      },
    ],
    breadcrumbs: {
      dashboard: ["NWVV", "Dashboard"],
      "admin-league": ["NWVV", "Admin League"],
      "mentor-profile": ["NWVV", "Mein Profil"],
      mail: ["NWVV", "Mail"],
      kalender: ["NWVV", "Kalender"],
      kontakte: ["NWVV", "Kontakte"],
      ligen: ["NWVV", "Meine Ligen"],
      mannschaft: ["NWVV", "Mannschaften meiner Ligen"],
      "alle-ligen": ["NWVV", "Alle Ligen"],
      "alle-mannschaften": ["NWVV", "Alle Mannschaften"],
      spieltag: ["NWVV", "Ligenübersicht"],
      heimspieltermine: ["NWVV", "Heimspieltermine"],
      statistik: ["NWVV", "Statistiken"],
      veranstaltungen: ["NWVV", "Veranstaltungen"],
      veranstaltung: ["NWVV", "Veranstaltung erstellen"],
      rechnungen: ["NWVV", "Rechnungen"],
      strafen: ["NWVV", "Meine Strafbescheide"],
    },
    newModalItems: [
      { icon: "calendar", name: "Spieltag verwalten", desc: "Spielplan bearbeiten, Verlegungen", border: "border-l-accent", nav: "spieltag" },
      { icon: "clipboard", name: "Mannschaftsmeldung", desc: "Meldungen prüfen & bestätigen", border: "border-l-green", nav: "mannschaft", action: "open-neue-meldung" },
      { icon: "volleyball", name: "Turnier erstellen", desc: "Turnierbaum & Feldplanung", border: "border-l-orange", nav: "turnier" },
      { icon: "bar-chart", name: "Statistiken", desc: "Auswertungen & Berichte", border: "border-l-blue", nav: "statistik" },
    ],
  },

  clubadmin: {
    id: "clubadmin",
    label: "Club Admin",
    subtitle: "TSV Hannover",
    userName: "Thomas Weber",
    initials: "TW",
    gradient: "from-green to-[#15803d]",
    defaultScreen: "dashboard",
    navSections: [
      {
        label: "",
        items: [
          { id: "dashboard", label: "Dashboard", badge: 3, icon: "grid" },
          { id: "mail", label: "Mail", icon: "mail" },
          { id: "kalender", label: "Kalender", icon: "calendar" },
          { id: "kontakte", label: "Kontakte", icon: "book-open" },
        ],
      },
      {
        label: "Mein Verein",
        items: [
          { id: "mannschaften", label: "Meine Mannschaften", icon: "users" },
          { id: "heimspieltermine", label: "Heimspieltermine", icon: "calendar-home" },
          { id: "spielplan", label: "Spielplan", icon: "calendar-edit" },
        ],
      },
      {
        label: "Verband",
        items: [
          { id: "alle-ligen", label: "Alle Ligen", icon: "org-tree" },
          { id: "alle-mannschaften", label: "Alle Mannschaften", icon: "users" },
          { id: "statistik", label: "Statistiken", icon: "pie-chart" },
        ],
      },
      {
        label: "Finanzen",
        items: [
          { id: "rechnungen", label: "Rechnungen", badge: 1, icon: "file" },
        ],
      },
    ],
    breadcrumbs: {
      dashboard: ["TSV Hannover", "Dashboard"],
      "admin-league": ["TSV Hannover", "Admin League"],
      "mentor-profile": ["TSV Hannover", "Mein Profil"],
      mail: ["TSV Hannover", "Mail"],
      kalender: ["TSV Hannover", "Kalender"],
      kontakte: ["TSV Hannover", "Kontakte"],
      mannschaften: ["TSV Hannover", "Meine Mannschaften"],
      "alle-ligen": ["TSV Hannover", "Alle Ligen"],
      "alle-mannschaften": ["TSV Hannover", "Alle Mannschaften"],
      spielplan: ["TSV Hannover", "Spielplan"],
      heimspieltermine: ["TSV Hannover", "Heimspieltermine"],
      statistik: ["TSV Hannover", "Statistiken"],
      rechnungen: ["TSV Hannover", "Rechnungen"],
      strafen: ["TSV Hannover", "Strafen"],
    },
    newModalItems: [
      { icon: "users", name: "Mannschaft erstellen", desc: "Neues Team anlegen & melden", border: "border-l-green", nav: "mannschaften", action: "open-create" },
      { icon: "clipboard", name: "Spieler melden", desc: "Spielermeldung nach BSO §6.10", border: "border-l-accent", nav: "mannschaften", action: "open-create" },
      { icon: "refresh", name: "Vereinswechsel", desc: "Transfer beantragen nach BSO §8", border: "border-l-orange", nav: "mannschaften" },
      { icon: "calendar", name: "Spielplan ansehen", desc: "Nächste Spiele & Termine", border: "border-l-blue", nav: "spieltag" },
    ],
  },

  verbandsadmin: {
    id: "verbandsadmin",
    label: "Verbandsadmin",
    subtitle: "NWVV",
    userName: "Dr. Claudia Meier",
    initials: "CM",
    gradient: "from-blue to-[#1d4ed8]",
    defaultScreen: "dashboard",
    navSections: [
      {
        label: "",
        items: [
          { id: "dashboard", label: "Dashboard", badge: 8, icon: "grid" },
          { id: "mail", label: "Mail", icon: "mail" },
          { id: "kalender", label: "Kalender", icon: "calendar" },
          { id: "kontakte", label: "Kontakte", icon: "book-open" },
        ],
      },
      {
        label: "Spielbetrieb",
        items: [
          { id: "spieltag", label: "Ligenübersicht", badge: 2, icon: "calendar-edit" },
          { id: "heimspieltermine", label: "Heimspieltermine", icon: "calendar-home" },
          { id: "veranstaltungen", label: "Veranstaltungen", icon: "calendar-star" },
        ],
      },
      {
        label: "Stammdaten",
        items: [
          { id: "alle-ligen", label: "Alle Ligen", icon: "org-tree" },
          { id: "alle-mannschaften", label: "Alle Mannschaften", icon: "users" },
          { id: "vereine", label: "Vereine", icon: "building" },
          { id: "statistik", label: "Statistiken", icon: "pie-chart" },
        ],
      },
      {
        label: "Finanzen & Ordnung",
        items: [
          { id: "rechnungen", label: "Rechnungen", badge: 5, icon: "file" },
          { id: "strafen", label: "Strafbescheide", badge: 2, icon: "alert" },
        ],
      },
    ],
    breadcrumbs: {
      dashboard: ["NWVV", "Dashboard"],
      "admin-league": ["NWVV", "Admin League"],
      "mentor-profile": ["NWVV", "Mein Profil"],
      mail: ["NWVV", "Mail"],
      kalender: ["NWVV", "Kalender"],
      kontakte: ["NWVV", "Kontakte"],
      "alle-ligen": ["NWVV", "Alle Ligen"],
      "alle-mannschaften": ["NWVV", "Alle Mannschaften"],
      vereine: ["NWVV", "Vereine"],
      spieltag: ["NWVV", "Ligenübersicht"],
      heimspieltermine: ["NWVV", "Heimspieltermine"],
      statistik: ["NWVV", "Statistiken"],
      veranstaltungen: ["NWVV", "Veranstaltungen"],
      veranstaltung: ["NWVV", "Veranstaltung erstellen"],
      rechnungen: ["NWVV", "Rechnungen"],
      strafen: ["NWVV", "Strafbescheide"],
    },
    newModalItems: [
      { icon: "trophy", name: "Veranstaltung erstellen", desc: "Turnier, Lehrgang, Versammlung", border: "border-l-accent", nav: "veranstaltung" },
      { icon: "volleyball", name: "Turnier erstellen", desc: "Turnierbaum & Feldplanung", border: "border-l-orange", nav: "turnier" },
      { icon: "coin", name: "Strafbescheid", desc: "Ordnungsstrafe nach BSO §17", border: "border-l-red", nav: "rechnungen", action: "open-strafe" },
      { icon: "newspaper", name: "Inhalt erstellen", desc: "CMS Block-Editor & KI-Assistent", border: "border-l-blue", nav: "cms" },
    ],
  },
};
