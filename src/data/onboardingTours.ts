import type { Role } from "@/types/roles";

export interface TourStep {
  targetSelector: string;
  title: string;
  description: string;
  position: "top" | "bottom" | "left" | "right";
}

export interface Tour {
  id: string;
  role: Role;
  title: string;
  steps: TourStep[];
}

export const tours: Record<Role, Tour> = {
  staffelleitung: {
    id: "staffelleitung-onboarding",
    role: "staffelleitung",
    title: "Willkommen, Staffelleitung!",
    steps: [
      {
        targetSelector: "[data-tour='sidebar']",
        title: "Deine Navigation",
        description: "Hier findest du alle Bereiche, die für deine Rolle relevant sind: Spielbetrieb, Ligen und Verbandsfunktionen.",
        position: "right",
      },
      {
        targetSelector: "[data-tour='dashboard']",
        title: "Dein Dashboard",
        description: "Das Dashboard zeigt dir alle offenen To-Dos, anstehende Spieltage und wichtige Benachrichtigungen auf einen Blick.",
        position: "bottom",
      },
      {
        targetSelector: "[data-tour='new-button']",
        title: "Schnellzugriff: Neu erstellen",
        description: "Über diesen Button erreichst du die wichtigsten Aktionen: Spieltag verwalten, Mannschaftsmeldung prüfen und mehr.",
        position: "bottom",
      },
      {
        targetSelector: "[data-tour='help-button']",
        title: "Hilfe & KI-Assistent",
        description: "Brauchst du Hilfe? Der KI-Assistent kennt deine Rolle und kann dir kontextbezogene Antworten geben.",
        position: "left",
      },
      {
        targetSelector: "[data-tour='role-switcher']",
        title: "Rolle & Profil",
        description: "Hier siehst du deine aktuelle Rolle. In der Demo kannst du zwischen verschiedenen Perspektiven wechseln.",
        position: "bottom",
      },
    ],
  },
  clubadmin: {
    id: "clubadmin-onboarding",
    role: "clubadmin",
    title: "Willkommen, Vereins-Admin!",
    steps: [
      {
        targetSelector: "[data-tour='sidebar']",
        title: "Dein Vereinsbereich",
        description: "Hier findest du alles rund um deinen Verein: Mannschaften, Heimspieltermine, Spielplan und Finanzen.",
        position: "right",
      },
      {
        targetSelector: "[data-tour='dashboard']",
        title: "Vereins-Dashboard",
        description: "Dein Dashboard zeigt dir Meldefristen, offene Rechnungen und anstehende Spiele deiner Mannschaften.",
        position: "bottom",
      },
      {
        targetSelector: "[data-tour='new-button']",
        title: "Mannschaft erstellen & melden",
        description: "Erstelle hier neue Mannschaften, melde Spielerinnen und beantrage Vereinswechsel.",
        position: "bottom",
      },
      {
        targetSelector: "[data-tour='help-button']",
        title: "Hilfe & KI-Assistent",
        description: "Der Assistent hilft dir bei Fragen zu Mannschaftsmeldungen, Spielerpässen und Vereinsverwaltung.",
        position: "left",
      },
      {
        targetSelector: "[data-tour='role-switcher']",
        title: "Dein Profil",
        description: "Hier siehst du, als welcher Verein du angemeldet bist. In der Demo kannst du die Perspektive wechseln.",
        position: "bottom",
      },
    ],
  },
  verbandsadmin: {
    id: "verbandsadmin-onboarding",
    role: "verbandsadmin",
    title: "Willkommen, Verbandsadmin!",
    steps: [
      {
        targetSelector: "[data-tour='sidebar']",
        title: "Vollständige Navigation",
        description: "Als Verbandsadmin hast du Zugriff auf alle Bereiche: Spielbetrieb, Stammdaten, Finanzen und Ordnung.",
        position: "right",
      },
      {
        targetSelector: "[data-tour='dashboard']",
        title: "Verbands-Dashboard",
        description: "Dein Dashboard zeigt dir die wichtigsten KPIs: Mitglieder, Vereine, offene Vorgänge und Finanzen.",
        position: "bottom",
      },
      {
        targetSelector: "[data-tour='new-button']",
        title: "Veranstaltungen & Inhalte",
        description: "Erstelle Turniere, Lehrgänge, Strafbescheide und CMS-Inhalte – alles über den Schnellzugriff.",
        position: "bottom",
      },
      {
        targetSelector: "[data-tour='help-button']",
        title: "Hilfe & KI-Assistent",
        description: "Der Assistent unterstützt dich bei komplexen Verwaltungsaufgaben und verweist auf die Wissensdatenbank.",
        position: "left",
      },
      {
        targetSelector: "[data-tour='role-switcher']",
        title: "Verbandsprofil",
        description: "Hier siehst du deine Rolle und den zugehörigen Verband. Wechsle die Perspektive für die Demo.",
        position: "bottom",
      },
    ],
  },
};
