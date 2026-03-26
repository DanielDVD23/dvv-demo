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
        label: "Übersicht",
        items: [
          { id: "dashboard", label: "Dashboard", badge: 5, icon: "grid" },
          { id: "mail", label: "Mail", icon: "mail" },
          { id: "kalender", label: "Kalender", icon: "calendar" },
          { id: "kontakte", label: "Kontakte", icon: "book-open" },
        ],
      },
      {
        label: "Verwaltung",
        items: [
          { id: "ligen", label: "Meine Ligen", icon: "star" },
          { id: "alle-ligen", label: "Alle Ligen", icon: "bar-chart" },
          { id: "alle-mannschaften", label: "Alle Mannschaften", icon: "users" },
          { id: "spieltag", label: "Spieltagsplanung", badge: 2, icon: "calendar" },
          { id: "heimspieltermine", label: "Heimspieltermine", icon: "home" },
          { id: "statistik", label: "Statistiken", icon: "bar-chart" },
          { id: "veranstaltungen", label: "Veranstaltungen", icon: "trophy" },
        ],
      },
      {
        label: "Finanzen",
        items: [
          { id: "rechnungen", label: "Rechnungen", badge: 3, icon: "file" },
        ],
      },
    ],
    breadcrumbs: {
      dashboard: ["NWVV", "Dashboard"],
      mail: ["NWVV", "Mail"],
      kalender: ["NWVV", "Kalender"],
      kontakte: ["NWVV", "Kontakte"],
      ligen: ["NWVV", "Meine Ligen"],
      "alle-ligen": ["NWVV", "Alle Ligen"],
      "alle-mannschaften": ["NWVV", "Alle Mannschaften"],
      spieltag: ["NWVV", "Spieltagsplanung"],
      heimspieltermine: ["NWVV", "Heimspieltermine"],
      statistik: ["NWVV", "Statistiken"],
      veranstaltungen: ["NWVV", "Veranstaltungen"],
      veranstaltung: ["NWVV", "Veranstaltung erstellen"],
      rechnungen: ["NWVV", "Rechnungen"],
      strafen: ["NWVV", "Strafen"],
    },
    newModalItems: [
      { icon: "calendar", name: "Spieltag verwalten", desc: "Spielplan bearbeiten, Verlegungen", border: "border-l-accent", nav: "spieltag" },
      { icon: "clipboard", name: "Mannschaftsmeldung", desc: "Meldungen prüfen & bestätigen", border: "border-l-green", nav: "mannschaft", action: "open-neue-meldung" },
      { icon: "coin", name: "Strafbescheid", desc: "Ordnungsstrafe nach BSO §17", border: "border-l-red", nav: "rechnungen", action: "open-strafe" },
      { icon: "volleyball", name: "Turnier erstellen", desc: "Turnierbaum & Feldplanung", border: "border-l-orange", nav: "turnier" },
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
        label: "Übersicht",
        items: [
          { id: "dashboard", label: "Dashboard", badge: 3, icon: "grid" },
          { id: "mail", label: "Mail", icon: "mail" },
          { id: "kalender", label: "Kalender", icon: "calendar" },
          { id: "kontakte", label: "Kontakte", icon: "book-open" },
        ],
      },
      {
        label: "Verwaltung",
        items: [
          { id: "mannschaften", label: "Meine Teams", icon: "users" },
          { id: "alle-ligen", label: "Alle Ligen", icon: "bar-chart" },
          { id: "alle-mannschaften", label: "Alle Mannschaften", icon: "users" },
          { id: "spieltag", label: "Spieltagsplanung", icon: "calendar" },
          { id: "heimspieltermine", label: "Heimspieltermine", icon: "home" },
          { id: "statistik", label: "Statistiken", icon: "bar-chart" },
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
      mail: ["TSV Hannover", "Mail"],
      kalender: ["TSV Hannover", "Kalender"],
      kontakte: ["TSV Hannover", "Kontakte"],
      mannschaften: ["TSV Hannover", "Meine Teams"],
      "alle-ligen": ["TSV Hannover", "Alle Ligen"],
      "alle-mannschaften": ["TSV Hannover", "Alle Mannschaften"],
      spieltag: ["TSV Hannover", "Spieltagsplanung"],
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
        label: "Übersicht",
        items: [
          { id: "dashboard", label: "Dashboard", badge: 8, icon: "grid" },
          { id: "mail", label: "Mail", icon: "mail" },
          { id: "kalender", label: "Kalender", icon: "calendar" },
          { id: "kontakte", label: "Kontakte", icon: "book-open" },
        ],
      },
      {
        label: "Verwaltung",
        items: [
          { id: "alle-ligen", label: "Alle Ligen", icon: "bar-chart" },
          { id: "alle-mannschaften", label: "Alle Mannschaften", icon: "users" },
          { id: "spieltag", label: "Spieltagsplanung", badge: 2, icon: "calendar" },
          { id: "heimspieltermine", label: "Heimspieltermine", icon: "home" },
          { id: "statistik", label: "Statistiken", icon: "bar-chart" },
          { id: "veranstaltungen", label: "Veranstaltungen", icon: "trophy" },
        ],
      },
      {
        label: "Finanzen",
        items: [
          { id: "rechnungen", label: "Rechnungen", badge: 5, icon: "file" },
        ],
      },
    ],
    breadcrumbs: {
      dashboard: ["NWVV", "Dashboard"],
      mail: ["NWVV", "Mail"],
      kalender: ["NWVV", "Kalender"],
      kontakte: ["NWVV", "Kontakte"],
      "alle-ligen": ["NWVV", "Alle Ligen"],
      "alle-mannschaften": ["NWVV", "Alle Mannschaften"],
      spieltag: ["NWVV", "Spieltagsplanung"],
      heimspieltermine: ["NWVV", "Heimspieltermine"],
      statistik: ["NWVV", "Statistiken"],
      veranstaltungen: ["NWVV", "Veranstaltungen"],
      veranstaltung: ["NWVV", "Veranstaltung erstellen"],
      rechnungen: ["NWVV", "Rechnungen"],
      strafen: ["NWVV", "Strafen"],
    },
    newModalItems: [
      { icon: "trophy", name: "Veranstaltung erstellen", desc: "Turnier, Lehrgang, Versammlung", border: "border-l-accent", nav: "veranstaltung" },
      { icon: "volleyball", name: "Turnier erstellen", desc: "Turnierbaum & Feldplanung", border: "border-l-orange", nav: "turnier" },
      { icon: "clipboard", name: "Mannschaftsmeldung", desc: "Meldungen verwalten", border: "border-l-green", nav: "mannschaft", action: "open-neue-meldung" },
      { icon: "newspaper", name: "Inhalt erstellen", desc: "CMS Block-Editor & KI-Assistent", border: "border-l-blue", nav: "cms" },
    ],
  },
};
