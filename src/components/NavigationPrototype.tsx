"use client";

import { useState } from "react";

// ============================================================
// beauOS Navigation Prototype — 5 Rollen, Dark Theme
// Lucide-Icons als inline SVG (keine externe Dependency)
// ============================================================

// --- Icon Components (Lucide-style, inline) ---
const icons: Record<string, JSX.Element> = {
  home: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  calendar: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>,
  mail: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
  users: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  building: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18"/><path d="M2 22h20"/><path d="M10 6h4M10 10h4M10 14h4M10 18h4"/></svg>,
  shield: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  clipboard: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1"/><path d="M9 14l2 2 4-4"/></svg>,
  layers: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5M2 12l10 5 10-5"/></svg>,
  trophy: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M8 21H16M12 17V21M5 3H19M6 3V9a6 6 0 0012 0V3"/></svg>,
  euro: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17.5 7.5A6.5 6.5 0 0 0 7 12a6.5 6.5 0 0 0 10.5 4.5"/><path d="M5 10h8M5 14h8"/></svg>,
  receipt: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 2v20l3-2 3 2 3-2 3 2 3-2 3 2V2l-3 2-3-2-3 2-3-2-3 2-3-2z"/><path d="M8 10h8M8 14h5"/></svg>,
  scale: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v18M3 7l9-4 9 4"/><path d="M3 7l3 9a5 5 0 0 0 6 0l3-9"/><path d="M15 7l3 9a5 5 0 0 0 6 0l-3-9"/></svg>,
  barChart: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/></svg>,
  zap: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  whistle: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18.5 9.5a5.5 5.5 0 1 1-5.5 5.5"/><path d="M13 15H4a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1h9"/><circle cx="18.5" cy="15" r="1.5" fill="currentColor" stroke="none"/><path d="M3 8V5"/></svg>,
  megaphone: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 11l18-5v12L3 13v-2z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/></svg>,
  newspaper: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/><path d="M18 14h-8M15 18h-5M10 6h8v4h-8z"/></svg>,
  graduation: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10l-10-5L2 10l10 5 10-5z"/><path d="M6 12v5c0 2 3 3 6 3s6-1 6-3v-5"/><path d="M22 10v6"/></svg>,
  handshake: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M11 17l-1 1a2 2 0 0 1-3 0l-1-1a2 2 0 0 1 0-3l5-5 3.5 3.5"/><path d="M13 7l1-1a2 2 0 0 1 3 0l1 1a2 2 0 0 1 0 3l-5 5"/><path d="M2 11l3-3M19 13l3 3"/><path d="M2 11h4M18 13h4"/></svg>,
  shoppingBag: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>,
  map: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></svg>,
  award: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>,
  orgTree: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="8" y="2" width="8" height="4" rx="1"/><rect x="2" y="18" width="6" height="4" rx="1"/><rect x="16" y="18" width="6" height="4" rx="1"/><path d="M12 6v4M12 10H5v8M12 10h7v8"/></svg>,
  settings: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9c.26.604.852.997 1.51 1H21a2 2 0 0 1 0 4h-.09c-.658.003-1.25.396-1.51 1z"/></svg>,
  list: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>,
  pieChart: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21.21 15.89A10 10 0 1 1 8 2.83"/><path d="M22 12A10 10 0 0 0 12 2v10z"/></svg>,
  volleyball: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a15 15 0 0 1 4 10 15 15 0 0 1-4 10"/><path d="M2 12h20"/></svg>,
  star: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  bookOpen: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>,
  messageSquare: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
  user: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  car: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 16H9m10 0h3v-3.15a1 1 0 0 0-.84-.99L16 11l-2.7-3.6a1 1 0 0 0-.8-.4H5.24a2 2 0 0 0-1.8 1.1l-.8 1.63A6 6 0 0 0 2 12.42V16h2"/><circle cx="6.5" cy="16.5" r="2.5"/><circle cx="16.5" cy="16.5" r="2.5"/></svg>,
  tv: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="15" rx="2"/><polyline points="17 2 12 7 7 2"/></svg>,
  ticket: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/><path d="M13 5v2M13 17v2M13 11v2"/></svg>,
  video: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/></svg>,
  database: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>,
  trendingUp: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>,
  file: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>,
  chevronDown: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>,
  chevronRight: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>,
  alert: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
  calendarStar: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/><path d="M12 13l1 2 2.2.3-1.6 1.5.4 2.2-2-1-2 1 .4-2.2-1.6-1.5 2.2-.3z"/></svg>,
  scan: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 7V5a2 2 0 0 1 2-2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2"/><line x1="7" y1="12" x2="17" y2="12"/></svg>,
  edit: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>,
  clock: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
};

// --- Types ---
interface NavItem {
  id: string;
  label: string;
  icon: string;
  badge?: number | string;
  reqIds?: string; // Anforderungs-IDs
}
interface NavSection {
  label: string;
  collapsible?: boolean;
  items: NavItem[];
}
interface RoleConfig {
  id: string;
  label: string;
  labelShort: string;
  color: string;
  navSections: NavSection[];
  mobileBar: NavItem[];
}

// ============================================================
// ROLLE 1: VERBANDSADMIN
// ============================================================
const verbandsadmin: RoleConfig = {
  id: "verbandsadmin",
  label: "Verbandsadmin",
  labelShort: "Verband",
  color: "bg-blue-600",
  navSections: [
    {
      label: "",
      items: [
        { id: "dashboard", label: "Dashboard", icon: "home", reqIds: "1.1.1" },
        { id: "mail", label: "Mail", icon: "mail", badge: 5, reqIds: "1.6.2" },
        { id: "kalender", label: "Kalender", icon: "calendar", reqIds: "1.7.1" },
        { id: "messenger", label: "Messenger", icon: "messageSquare", reqIds: "1.6.3" },
        { id: "kontakte", label: "Kontakte", icon: "bookOpen", reqIds: "1.1.1" },
      ],
    },
    {
      label: "Stammdaten",
      collapsible: true,
      items: [
        { id: "organisationen", label: "Organisationen", icon: "orgTree", reqIds: "1.1.2" },
        { id: "personen", label: "Personen", icon: "users", reqIds: "1.1.4" },
        { id: "spielstaetten", label: "Spielstätten", icon: "map", reqIds: "1.1.7" },
        { id: "vereine", label: "Vereine", icon: "building", reqIds: "1.1.5, 1.1.3" },
        { id: "rechte-rollen", label: "Rechte & Rollen", icon: "shield", reqIds: "1.1.1" },
        { id: "ehrungen", label: "Ehrungen", icon: "award", reqIds: "1.1.1" },
      ],
    },
    {
      label: "Lizenzwesen",
      collapsible: true,
      items: [
        { id: "lizenz-dashboard", label: "Lizenz-Dashboard", icon: "clipboard", reqIds: "1.2.1" },
        { id: "lizenz-queue", label: "Bearbeitungsqueue", icon: "list", badge: 8, reqIds: "1.2.1" },
        { id: "lizenz-config", label: "Lizenztypen", icon: "settings", reqIds: "1.2.1" },
      ],
    },
    {
      label: "Spielbetrieb",
      collapsible: true,
      items: [
        { id: "ligen", label: "Ligen", icon: "layers", reqIds: "1.4.1" },
        { id: "spieltag", label: "Spieltagsübersicht", icon: "scan", reqIds: "1.4.1, 1.4.2" },
        { id: "spielplan", label: "Spielplan-Verwaltung", icon: "calendar", reqIds: "1.4.1" },
        { id: "live-ticker", label: "Live-Ticker", icon: "volleyball", reqIds: "1.4.2" },
        { id: "beach-turniere", label: "Beach-Turniere", icon: "trophy", reqIds: "1.5.1, 1.5.2" },
        { id: "spielanalyse", label: "Spielanalyse", icon: "pieChart", reqIds: "1.4.6" },
        { id: "sr-ansetzung", label: "SR-Ansetzungen", icon: "whistle", badge: 6, reqIds: "1.12.1" },
        { id: "sr-pool", label: "SR-Pool", icon: "star", reqIds: "1.12.1" },
        { id: "fahrtkosten", label: "Fahrtkosten", icon: "car", reqIds: "1.12.2" },
      ],
    },
    {
      label: "Finanzen & Organisation",
      collapsible: true,
      items: [
        { id: "finanzen", label: "Finanzen", icon: "euro", reqIds: "1.3.1" },
        { id: "rechnungen", label: "Rechnungen", icon: "receipt", reqIds: "1.3.1" },
        { id: "strafbescheide", label: "Strafbescheide", icon: "scale", badge: 2, reqIds: "1.4.3, 1.5.3" },
        { id: "reporting", label: "Reporting", icon: "barChart", reqIds: "1.3.3" },
        { id: "automationen", label: "Automationen", icon: "zap", reqIds: "1.3.4" },
      ],
    },
    {
      label: "Kommunikation & Medien",
      collapsible: true,
      items: [
        { id: "kommunikation", label: "Rundschreiben", icon: "megaphone", reqIds: "1.6.2" },
        { id: "veranstaltungen", label: "Veranstaltungen", icon: "calendarStar", reqIds: "1.7.2" },
        { id: "cms", label: "CMS / Webseite", icon: "newspaper", reqIds: "1.6.4" },
        { id: "lehrgaenge", label: "Lehrgänge", icon: "graduation", reqIds: "1.6.1, 1.8.1" },
        { id: "tv-modul", label: "TV & Streaming", icon: "tv", reqIds: "1.6.7" },
        { id: "presse", label: "Presse", icon: "file", reqIds: "1.6.8" },
        { id: "videosharing", label: "Videosharing", icon: "video", reqIds: "1.6.6" },
      ],
    },
    {
      label: "Erweitert",
      collapsible: true,
      items: [
        { id: "sponsoren", label: "Sponsoren", icon: "handshake", reqIds: "1.9.1" },
        { id: "shop", label: "Shop & Ausrüstung", icon: "shoppingBag", reqIds: "1.10.1, 1.10.2" },
        { id: "stakeholder", label: "Stakeholder & Ticketing", icon: "ticket", reqIds: "1.4.5" },
        { id: "sql-dashboard", label: "SQL-Dashboard", icon: "database", reqIds: "1.13.4" },
        { id: "kommerzialisierung", label: "Kommerzialisierung", icon: "trendingUp", reqIds: "1.13.1, 1.13.2, 1.13.3" },
      ],
    },
  ],
  mobileBar: [
    { id: "dashboard", label: "Home", icon: "home" },
    { id: "kalender", label: "Kalender", icon: "calendar" },
    { id: "mail", label: "Mail", icon: "mail", badge: 5 },
    { id: "spieltag", label: "Spieltag", icon: "volleyball" },
    { id: "more", label: "Mehr", icon: "list" },
  ],
};

// ============================================================
// ROLLE 2: STAFFELLEITER
// ============================================================
const staffelleiter: RoleConfig = {
  id: "staffelleiter",
  label: "Staffelleiter",
  labelShort: "Staffel",
  color: "bg-purple-600",
  navSections: [
    {
      label: "",
      items: [
        { id: "dashboard", label: "Dashboard", icon: "home", reqIds: "1.1.2" },
        { id: "mail", label: "Mail", icon: "mail", badge: 3, reqIds: "1.6.2" },
        { id: "kalender", label: "Kalender", icon: "calendar", reqIds: "1.7.1" },
        { id: "messenger", label: "Messenger", icon: "messageSquare", reqIds: "1.6.3" },
      ],
    },
    {
      label: "Meine Staffeln",
      collapsible: true,
      items: [
        { id: "liguebersicht", label: "Ligenübersicht", icon: "layers", reqIds: "1.4.1" },
        { id: "spielplan", label: "Spielplan", icon: "calendar", reqIds: "1.4.1" },
        { id: "mannschaften", label: "Mannschaften", icon: "users", reqIds: "1.1.6" },
        { id: "ergebnisse", label: "Ergebnisse & Live", icon: "volleyball", reqIds: "1.4.1, 1.4.2" },
        { id: "heimspieltermine", label: "Heimspieltermine", icon: "map", reqIds: "1.1.7" },
      ],
    },
    {
      label: "Ordnung & Strafen",
      collapsible: true,
      items: [
        { id: "strafbescheide", label: "Strafbescheide", icon: "scale", badge: 1, reqIds: "1.4.3" },
        { id: "reporting", label: "Reporting", icon: "barChart", reqIds: "1.3.3" },
        { id: "automationen", label: "Automationen", icon: "zap", reqIds: "1.3.4" },
      ],
    },
    {
      label: "Schiedsrichter",
      collapsible: true,
      items: [
        { id: "sr-ansetzung", label: "SR-Ansetzungen", icon: "whistle", badge: 3, reqIds: "1.12.1" },
      ],
    },
    {
      label: "Verband",
      collapsible: true,
      items: [
        { id: "alle-ligen", label: "Alle Ligen", icon: "orgTree", reqIds: "1.3.2" },
        { id: "alle-mannschaften", label: "Alle Mannschaften", icon: "users", reqIds: "1.3.2" },
        { id: "statistiken", label: "Statistiken", icon: "pieChart", reqIds: "1.3.3" },
      ],
    },
  ],
  mobileBar: [
    { id: "dashboard", label: "Home", icon: "home" },
    { id: "liguebersicht", label: "Ligen", icon: "layers" },
    { id: "ergebnisse", label: "Live", icon: "volleyball" },
    { id: "mail", label: "Mail", icon: "mail", badge: 3 },
    { id: "more", label: "Mehr", icon: "list" },
  ],
};

// ============================================================
// ROLLE 3: CLUB-ADMIN
// ============================================================
const clubAdmin: RoleConfig = {
  id: "clubadmin",
  label: "Club Admin",
  labelShort: "Club",
  color: "bg-green-600",
  navSections: [
    {
      label: "",
      items: [
        { id: "dashboard", label: "Dashboard", icon: "home", reqIds: "1.11.2" },
        { id: "mail", label: "Mail", icon: "mail", reqIds: "1.6.2" },
        { id: "kalender", label: "Kalender", icon: "calendar", reqIds: "1.7.1" },
        { id: "messenger", label: "Messenger", icon: "messageSquare", reqIds: "1.6.3" },
      ],
    },
    {
      label: "Mein Verein",
      collapsible: true,
      items: [
        { id: "mannschaften", label: "Meine Mannschaften", icon: "users", reqIds: "1.1.6" },
        { id: "mitglieder", label: "Mitglieder", icon: "star", reqIds: "1.11.2" },
        { id: "spielplan", label: "Spielplan", icon: "calendar", reqIds: "1.1.6" },
        { id: "heimspieltermine", label: "Heimspieltermine", icon: "map", reqIds: "1.1.7" },
        { id: "meldewesen", label: "Meldewesen", icon: "clipboard", badge: "!", reqIds: "1.1.5" },
      ],
    },
    {
      label: "Lizenzen",
      collapsible: true,
      items: [
        { id: "lizenzen", label: "Lizenzen", icon: "shield", reqIds: "1.2.1" },
      ],
    },
    {
      label: "Finanzen",
      collapsible: true,
      items: [
        { id: "rechnungen", label: "Rechnungen", icon: "receipt", badge: 1, reqIds: "1.3.1" },
      ],
    },
    {
      label: "Verband",
      collapsible: true,
      items: [
        { id: "alle-ligen", label: "Alle Ligen", icon: "layers", reqIds: "1.3.2" },
        { id: "alle-mannschaften", label: "Alle Mannschaften", icon: "users", reqIds: "1.3.2" },
        { id: "statistiken", label: "Statistiken", icon: "pieChart", reqIds: "1.3.3" },
      ],
    },
  ],
  mobileBar: [
    { id: "dashboard", label: "Home", icon: "home" },
    { id: "mannschaften", label: "Teams", icon: "users" },
    { id: "meldewesen", label: "Melden", icon: "clipboard", badge: "!" },
    { id: "kalender", label: "Kalender", icon: "calendar" },
    { id: "more", label: "Mehr", icon: "list" },
  ],
};

// ============================================================
// ROLLE 4: BENUTZER (Spieler/Mitglied)
// ============================================================
const benutzer: RoleConfig = {
  id: "benutzer",
  label: "Spieler / Mitglied",
  labelShort: "Spieler",
  color: "bg-orange-500",
  navSections: [
    {
      label: "",
      items: [
        { id: "dashboard", label: "Mein Dashboard", icon: "home", reqIds: "1.11.1" },
        { id: "kalender", label: "Mein Kalender", icon: "calendar", reqIds: "1.7.1" },
        { id: "lizenzen", label: "Meine Lizenzen", icon: "shield", reqIds: "1.2.1, 1.11.1" },
        { id: "messenger", label: "Nachrichten", icon: "messageSquare", badge: 2, reqIds: "1.6.3" },
        { id: "profil", label: "Mein Profil", icon: "user", reqIds: "1.1.4" },
      ],
    },
    {
      label: "Mein Sport",
      collapsible: true,
      items: [
        { id: "mein-team", label: "Mein Team", icon: "users", reqIds: "1.1.6" },
        { id: "spielplan", label: "Spielplan", icon: "calendar", reqIds: "1.4.1" },
        { id: "ergebnisse", label: "Ergebnisse", icon: "volleyball", reqIds: "1.4.2" },
        { id: "statistiken", label: "Meine Statistiken", icon: "pieChart", reqIds: "1.4.6" },
      ],
    },
    {
      label: "Weiterbildung",
      collapsible: true,
      items: [
        { id: "lehrgaenge", label: "Lehrgänge & Kurse", icon: "graduation", reqIds: "1.6.1, 1.6.5" },
        { id: "veranstaltungen", label: "Veranstaltungen", icon: "calendarStar", reqIds: "1.7.2" },
      ],
    },
  ],
  mobileBar: [
    { id: "dashboard", label: "Home", icon: "home" },
    { id: "kalender", label: "Kalender", icon: "calendar" },
    { id: "lizenzen", label: "Lizenz", icon: "shield" },
    { id: "messenger", label: "Chat", icon: "messageSquare", badge: 2 },
    { id: "profil", label: "Profil", icon: "user" },
  ],
};

// ============================================================
// ROLLE 5: SCHIEDSRICHTER
// ============================================================
const schiedsrichter: RoleConfig = {
  id: "schiedsrichter",
  label: "Schiedsrichter",
  labelShort: "SR",
  color: "bg-yellow-600",
  navSections: [
    {
      label: "",
      items: [
        { id: "dashboard", label: "Mein Dashboard", icon: "home", reqIds: "1.12.1" },
        { id: "einsaetze", label: "Meine Einsätze", icon: "whistle", badge: 2, reqIds: "1.12.1" },
        { id: "verfuegbarkeit", label: "Verfügbarkeit", icon: "calendar", reqIds: "1.12.1" },
        { id: "messenger", label: "Nachrichten", icon: "messageSquare", reqIds: "1.6.3" },
      ],
    },
    {
      label: "Spielbetrieb",
      collapsible: true,
      items: [
        { id: "spielberichte", label: "Spielberichte", icon: "edit", reqIds: "1.4.2, 1.5.2" },
        { id: "live-scoring", label: "Live-Scoring", icon: "volleyball", reqIds: "1.4.2" },
        { id: "spielplan", label: "Spielplan", icon: "layers", reqIds: "1.4.1" },
      ],
    },
    {
      label: "Abrechnung",
      collapsible: true,
      items: [
        { id: "fahrtkosten", label: "Fahrtkosten", icon: "car", reqIds: "1.12.2" },
        { id: "abrechnungen", label: "Meine Abrechnungen", icon: "receipt", reqIds: "1.12.2" },
      ],
    },
    {
      label: "Mein Profil",
      collapsible: true,
      items: [
        { id: "profil", label: "Profil & Lizenz", icon: "user", reqIds: "1.1.4, 1.2.1" },
        { id: "lehrgaenge", label: "Fortbildungen", icon: "graduation", reqIds: "1.6.1" },
        { id: "statistiken", label: "Meine Einsatzstatistik", icon: "pieChart", reqIds: "1.12.1" },
      ],
    },
  ],
  mobileBar: [
    { id: "dashboard", label: "Home", icon: "home" },
    { id: "einsaetze", label: "Einsätze", icon: "whistle", badge: 2 },
    { id: "verfuegbarkeit", label: "Termine", icon: "calendar" },
    { id: "spielberichte", label: "Scoring", icon: "edit" },
    { id: "profil", label: "Profil", icon: "user" },
  ],
};

const ALL_ROLES: RoleConfig[] = [verbandsadmin, staffelleiter, clubAdmin, benutzer, schiedsrichter];

// ============================================================
// COMPONENT
// ============================================================
export default function NavigationPrototype() {
  const [activeRole, setActiveRole] = useState(0);
  const [activeItem, setActiveItem] = useState("dashboard");
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});
  const [showAnnotation, setShowAnnotation] = useState<NavItem | null>(null);

  const role = ALL_ROLES[activeRole];

  const toggleSection = (label: string) => {
    setCollapsed((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  return (
    <div className="flex flex-col h-screen" style={{ background: "#0B0E1A", fontFamily: "DM Sans, sans-serif" }}>
      {/* Role Switcher Tabs */}
      <div className="flex items-center gap-1 px-4 pt-4 pb-2 border-b border-white/10">
        {ALL_ROLES.map((r, i) => (
          <button
            key={r.id}
            onClick={() => { setActiveRole(i); setActiveItem("dashboard"); setShowAnnotation(null); }}
            className={`px-4 py-2 rounded-t-lg text-[13px] font-medium transition-all ${
              i === activeRole
                ? "bg-white/10 text-white border-b-2 border-purple-500"
                : "text-white/40 hover:text-white/70"
            }`}
          >
            {r.label}
          </button>
        ))}
        <div className="ml-auto flex items-center gap-2">
          <div className={`w-2.5 h-2.5 rounded-full ${role.color}`} />
          <span className="text-white/50 text-[12px]">{role.navSections.reduce((a, s) => a + s.items.length, 0)} Menüpunkte</span>
        </div>
      </div>

      <div className="flex flex-1 min-h-0">
        {/* Sidebar */}
        <div className="w-[280px] border-r border-white/10 overflow-y-auto flex-shrink-0" style={{ background: "#0F1120" }}>
          <div className="p-3">
            {role.navSections.map((section, si) => (
              <div key={si} className={si > 0 ? "mt-2" : ""}>
                {section.label && (
                  <button
                    onClick={() => section.collapsible && toggleSection(section.label)}
                    className="flex items-center justify-between w-full px-3 py-2 text-[11px] font-semibold uppercase tracking-[1.2px] text-white/30 hover:text-white/50 transition-colors"
                  >
                    <span>{section.label}</span>
                    {section.collapsible && (
                      <span className="opacity-50">
                        {collapsed[section.label] ? icons.chevronRight : icons.chevronDown}
                      </span>
                    )}
                  </button>
                )}

                {!collapsed[section.label] &&
                  section.items.map((item) => {
                    const isActive = activeItem === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => { setActiveItem(item.id); setShowAnnotation(item); }}
                        className={`flex items-center gap-2.5 w-full px-3 py-2 rounded-lg text-[13px] transition-all group ${
                          isActive
                            ? "bg-[#6C5CE7]/15 text-[#8B5CF6] font-medium"
                            : "text-white/50 hover:text-white/80 hover:bg-white/5"
                        }`}
                      >
                        <span className={isActive ? "text-[#8B5CF6]" : "text-white/30 group-hover:text-white/50"}>
                          {icons[item.icon] || icons.file}
                        </span>
                        <span className="flex-1 text-left truncate">{item.label}</span>
                        {item.badge != null && (
                          <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold min-w-[20px] text-center ${
                            isActive ? "bg-[#6C5CE7] text-white" : "bg-white/10 text-white/60"
                          }`}>
                            {item.badge}
                          </span>
                        )}
                      </button>
                    );
                  })}
              </div>
            ))}
          </div>
        </div>

        {/* Main Content: Mobile Preview + Annotation */}
        <div className="flex-1 flex gap-6 p-6 overflow-y-auto">
          {/* Mobile Preview */}
          <div className="flex flex-col items-center">
            <div className="text-white/30 text-[11px] uppercase tracking-wider font-semibold mb-3">Mobile Bottom Bar</div>
            <div className="w-[375px] rounded-[32px] border-2 border-white/10 overflow-hidden" style={{ background: "#0F1120" }}>
              {/* Phone screen mock */}
              <div className="h-[600px] flex flex-col">
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <div className={`w-12 h-12 rounded-xl ${role.color} mx-auto mb-3 flex items-center justify-center`}>
                      {icons[role.navSections[0]?.items[0]?.icon || "home"]}
                    </div>
                    <div className="text-white/80 text-[15px] font-medium">{role.label}</div>
                    <div className="text-white/30 text-[12px] mt-1">beauOS Mobile</div>
                  </div>
                </div>

                {/* Bottom Tab Bar */}
                <div className="flex items-end border-t border-white/10 px-2 pb-6 pt-2" style={{ background: "#0B0E1A" }}>
                  {role.mobileBar.map((item) => {
                    const isActive = activeItem === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => setActiveItem(item.id)}
                        className="flex-1 flex flex-col items-center gap-1 py-1 relative"
                      >
                        <span className={isActive ? "text-[#8B5CF6]" : "text-white/30"}>
                          {icons[item.icon] || icons.file}
                        </span>
                        <span className={`text-[10px] ${isActive ? "text-[#8B5CF6] font-medium" : "text-white/30"}`}>
                          {item.label}
                        </span>
                        {item.badge != null && (
                          <span className="absolute -top-0.5 right-[calc(50%-14px)] w-4 h-4 rounded-full bg-red-500 text-white text-[9px] font-bold flex items-center justify-center">
                            {item.badge}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Annotation Panel */}
          <div className="flex-1 min-w-[300px]">
            <div className="text-white/30 text-[11px] uppercase tracking-wider font-semibold mb-3">Anforderungs-Mapping</div>

            {showAnnotation ? (
              <div className="rounded-xl border border-white/10 p-5" style={{ background: "#0F1120" }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-[#6C5CE7]/15 flex items-center justify-center text-[#8B5CF6]">
                    {icons[showAnnotation.icon] || icons.file}
                  </div>
                  <div>
                    <div className="text-white font-medium text-[15px]">{showAnnotation.label}</div>
                    <div className="text-white/40 text-[12px]">ID: {showAnnotation.id}</div>
                  </div>
                </div>
                <div className="text-[11px] font-semibold uppercase tracking-wider text-white/30 mb-2">Abgedeckte Anforderungen</div>
                <div className="flex flex-wrap gap-1.5">
                  {(showAnnotation.reqIds || "").split(",").map((id) => (
                    <span key={id.trim()} className="px-2 py-1 rounded bg-[#6C5CE7]/10 text-[#8B5CF6] text-[12px] font-medium">
                      {id.trim()}
                    </span>
                  ))}
                </div>
              </div>
            ) : (
              <div className="rounded-xl border border-white/10 p-8 text-center" style={{ background: "#0F1120" }}>
                <div className="text-white/20 text-[14px]">Klicke auf einen Menüpunkt, um die zugeordneten Anforderungs-IDs zu sehen</div>
              </div>
            )}

            {/* Full Mapping Table */}
            <div className="mt-6 rounded-xl border border-white/10 overflow-hidden" style={{ background: "#0F1120" }}>
              <div className="px-4 py-3 border-b border-white/10">
                <div className="text-white/60 text-[13px] font-medium">Alle Menüpunkte — {role.label}</div>
              </div>
              <div className="max-h-[400px] overflow-y-auto">
                {role.navSections.map((section) =>
                  section.items.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => { setActiveItem(item.id); setShowAnnotation(item); }}
                      className={`flex items-center gap-3 px-4 py-2.5 border-b border-white/5 cursor-pointer transition-colors ${
                        activeItem === item.id ? "bg-[#6C5CE7]/10" : "hover:bg-white/5"
                      }`}
                    >
                      <span className="text-white/30">{icons[item.icon] || icons.file}</span>
                      <span className="flex-1 text-white/70 text-[13px]">{item.label}</span>
                      <span className="text-white/20 text-[11px] font-mono">{item.reqIds}</span>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Edge Cases */}
            <div className="mt-6 rounded-xl border border-white/10 p-4" style={{ background: "#0F1120" }}>
              <div className="text-white/30 text-[11px] uppercase tracking-wider font-semibold mb-3">Edge Cases — {role.label}</div>
              <div className="space-y-2 text-[12px] text-white/40">
                {role.id === "verbandsadmin" && (
                  <>
                    <div className="flex gap-2"><span className="text-yellow-500">!</span> Eingeschränkter Admin (z.B. nur Beach): Halle-spezifische Items dynamisch ausgeblendet</div>
                    <div className="flex gap-2"><span className="text-yellow-500">!</span> 7 Top-Level-Gruppen + Progressive Disclosure via "Erweitert"</div>
                  </>
                )}
                {role.id === "staffelleiter" && (
                  <>
                    <div className="flex gap-2"><span className="text-yellow-500">!</span> Staffel-Kontext-Switcher im Header (Dropdown), nicht als Menüpunkt</div>
                    <div className="flex gap-2"><span className="text-yellow-500">!</span> Mehrere Staffeln: Daten in Tabellen sind auf aktive Staffel gefiltert</div>
                  </>
                )}
                {role.id === "clubadmin" && (
                  <>
                    <div className="flex gap-2"><span className="text-yellow-500">!</span> Ehrenamtler: Maximal einfache Navigation, "Mein Verein" als Fokus</div>
                    <div className="flex gap-2"><span className="text-yellow-500">!</span> Gleichzeitig Spieler? Rollenwechsel via Header-Dropdown</div>
                    <div className="flex gap-2"><span className="text-yellow-500">!</span> Meldewesen mit Badge "!" für saisonkritische Fristen</div>
                  </>
                )}
                {role.id === "benutzer" && (
                  <>
                    <div className="flex gap-2"><span className="text-yellow-500">!</span> Ohne aktive Lizenz: CTA "Lizenz beantragen" statt leerer Seite</div>
                    <div className="flex gap-2"><span className="text-yellow-500">!</span> Alles aus Ich-Perspektive: "Meine Lizenzen", "Mein Kalender"</div>
                    <div className="flex gap-2"><span className="text-yellow-500">!</span> Mobile-First: Bottom-Tab-Bar als primäre Navigation</div>
                  </>
                )}
                {role.id === "schiedsrichter" && (
                  <>
                    <div className="flex gap-2"><span className="text-yellow-500">!</span> "Nächster Einsatz" prominent auf Dashboard, nicht unter Verwaltung</div>
                    <div className="flex gap-2"><span className="text-yellow-500">!</span> Verfügbarkeit melden als eigener Top-Level-Punkt</div>
                    <div className="flex gap-2"><span className="text-yellow-500">!</span> Live-Scoring direkt erreichbar (Spielbericht am Spieltag)</div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
