"use client";

import { useState, useEffect, useRef } from "react";
import type { NavSection } from "@/types/roles";

interface SidebarProps {
  active: string;
  onNavigate: (screen: string) => void;
  navSections: NavSection[];
  mobileOpen?: boolean;
  onMobileClose?: () => void;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
}

function NavIcon({ type }: { type: string }) {
  const cls = "w-[18px] h-[18px] shrink-0";
  const icons: Record<string, React.ReactNode> = {
    grid: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></svg>,
    list: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 7h18M3 12h18M3 17h18" /></svg>,
    calendar: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>,
    users: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></svg>,
    layers: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5M2 12l10 5 10-5" /></svg>,
    trophy: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M8 21H16M12 17V21M5 3H19M6 3V9a6 6 0 0012 0V3" /></svg>,
    file: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></svg>,
    home: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>,
    clipboard: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" /><rect x="8" y="2" width="8" height="4" rx="1" /><path d="M9 14l2 2 4-4" /></svg>,
    scan: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 7V5a2 2 0 0 1 2-2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2" /><line x1="7" y1="12" x2="17" y2="12" /></svg>,
    building: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18" /><path d="M2 22h20" /><path d="M10 6h4M10 10h4M10 14h4M10 18h4" /></svg>,
    "bar-chart": <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="20" x2="12" y2="10" /><line x1="18" y1="20" x2="18" y2="4" /><line x1="6" y1="20" x2="6" y2="16" /></svg>,
    mail: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>,
    alert: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>,
    edit: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" /></svg>,
    star: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>,
    "book-open": <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></svg>,
    "calendar-star": <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /><path d="M12 13l1 2 2.2.3-1.6 1.5.4 2.2-2-1-2 1 .4-2.2-1.6-1.5 2.2-.3z" /></svg>,
    "pie-chart": <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21.21 15.89A10 10 0 1 1 8 2.83" /><path d="M22 12A10 10 0 0 0 12 2v10z" /></svg>,
    shield: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>,
    "calendar-edit": <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /><path d="M15 13.5l-4.5 4.5L9 18l.5-1.5 4.5-4.5a.7.7 0 0 1 1 1z" /></svg>,
    "calendar-home": <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /><path d="M9 19v-3h6v3M12 13l-4 3h8z" /></svg>,
    "org-tree": <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="8" y="2" width="8" height="4" rx="1" /><rect x="2" y="18" width="6" height="4" rx="1" /><rect x="16" y="18" width="6" height="4" rx="1" /><path d="M12 6v4M12 10H5v8M12 10h7v8" /></svg>,
    volleyball: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 2a15 15 0 0 1 4 10 15 15 0 0 1-4 10" /><path d="M2 12h20" /></svg>,
    whistle: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18.5 9.5a5.5 5.5 0 1 1-5.5 5.5" /><path d="M13 15H4a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1h9" /><circle cx="18.5" cy="15" r="1.5" fill="currentColor" stroke="none" /><path d="M3 8V5" /></svg>,
    "graduation-cap": <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10l-10-5L2 10l10 5 10-5z" /><path d="M6 12v5c0 2 3 3 6 3s6-1 6-3v-5" /><path d="M22 10v6" /></svg>,
    megaphone: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 11l18-5v12L3 13v-2z" /><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" /></svg>,
    handshake: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M11 17l-1 1a2 2 0 0 1-3 0l-1-1a2 2 0 0 1 0-3l5-5 3.5 3.5" /><path d="M13 7l1-1a2 2 0 0 1 3 0l1 1a2 2 0 0 1 0 3l-5 5" /><path d="M2 11l3-3M19 13l3 3" /><path d="M2 11h4M18 13h4" /></svg>,
    "shopping-bag": <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" /></svg>,
    key: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="15" r="5" /><path d="M13 10l4-4M21 2l-4 4M18 3l3 3" /></svg>,
    award: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="7" /><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" /></svg>,
    map: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" /><line x1="8" y1="2" x2="8" y2="18" /><line x1="16" y1="6" x2="16" y2="22" /></svg>,
    coin: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M15 9.5c-.5-1-1.5-1.5-3-1.5-2 0-3 1-3 2.25S10 12.5 12 13s3 1.25 3 2.25S14 17.5 12 17.5c-1.5 0-2.5-.5-3-1.5M12 6v1.5M12 16.5V18" /></svg>,
    zap: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>,
    newspaper: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" /><path d="M18 14h-8M15 18h-5M10 6h8v4h-8z" /></svg>,
    settings: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>,
    check: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>,
    refresh: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10" /><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" /></svg>,
    info: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" /></svg>,
    user: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>,
    camera: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" /><circle cx="12" cy="13" r="4" /></svg>,
    target: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></svg>,
    clock: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>,
    search: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>,
    "shield-check": <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="M9 12l2 2 4-4" /></svg>,
    "trending-up": <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" /></svg>,
  };
  return icons[type] || null;
}

// Chevron icons
const ChevronDown = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
);
const ChevronRight = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
);

export default function Sidebar({ active, onNavigate, navSections = [], mobileOpen, onMobileClose, collapsed = false }: SidebarProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({});
  const [flyoutSection, setFlyoutSection] = useState<number | null>(null);
  const flyoutRef = useRef<HTMLDivElement>(null);
  const flyoutTimeout = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Close flyout on click outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (flyoutRef.current && !flyoutRef.current.contains(e.target as Node)) {
        setFlyoutSection(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  if (isMobile && !mobileOpen) return null;

  const showLabels = !collapsed || (isMobile && mobileOpen);
  const sidebarWidth = showLabels ? 240 : 60;

  const toggleSection = (label: string) => {
    setCollapsedSections(prev => ({ ...prev, [label]: !prev[label] }));
  };

  // Determine if a section contains the active item
  const sectionHasActive = (section: NavSection) => section.items.some(i => i.id === active);

  // For collapsed mode: get first icon of each section as representative
  const sectionRepIcons = navSections.filter(s => s.label).map(s => ({
    icon: s.items[0]?.icon || "grid",
    label: s.label,
  }));

  const handleFlyoutEnter = (idx: number) => {
    clearTimeout(flyoutTimeout.current);
    setFlyoutSection(idx);
  };
  const handleFlyoutLeave = () => {
    flyoutTimeout.current = setTimeout(() => setFlyoutSection(null), 150);
  };

  return (
    <>
      {isMobile && mobileOpen && (
        <div onClick={onMobileClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 199 }} />
      )}

      <nav
        ref={flyoutRef}
        style={{
          width: sidebarWidth, minWidth: sidebarWidth,
          height: isMobile ? "100vh" : "100%",
          position: isMobile ? "fixed" : "relative",
          top: isMobile ? 0 : undefined, left: isMobile ? 0 : undefined,
          zIndex: isMobile ? 200 : 100,
          background: "#fff",
          borderRight: isMobile ? "1px solid #eee" : "none",
          borderRadius: isMobile ? 0 : 12,
          display: "flex", flexDirection: "column",
          transition: "width 0.2s, min-width 0.2s",
          overflow: collapsed ? "visible" : "hidden",
        }}
      >
        {isMobile && (
          <div style={{ display: "flex", justifyContent: "flex-end", padding: "12px 12px 0" }}>
            <button onClick={onMobileClose} style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
            </button>
          </div>
        )}

        <div style={{ flex: 1, overflowY: "auto", padding: "10px 12px 8px" }}>
          {/* EXPANDED MODE */}
          {showLabels && navSections.map((section, si) => {
            const isCollapsed = section.label ? collapsedSections[section.label] : false;

            return (
              <div key={si}>
                {si > 0 && section.label && (
                  <div
                    onClick={() => toggleSection(section.label)}
                    style={{
                      padding: "8px 8px", margin: "4px 0 2px", fontSize: 12, fontWeight: 400,
                      color: "rgba(63,64,77,0.5)", textTransform: "uppercase",
                      whiteSpace: "nowrap", cursor: "pointer", borderRadius: 6,
                      display: "flex", alignItems: "center", justifyContent: "space-between",
                      userSelect: "none", transition: "background 0.15s",
                    }}
                    className="hover:bg-[rgba(124,58,237,0.03)]"
                  >
                    <span>{section.label}</span>
                    <span style={{ opacity: 0.35, transition: "transform 0.2s", transform: isCollapsed ? "rotate(-90deg)" : "none" }}>
                      <ChevronDown />
                    </span>
                  </div>
                )}

                {(!isCollapsed || !section.label) && section.items.map((item) => {
                  const isActive = active === item.id;
                  return (
                    <div
                      key={item.id}
                      className="cursor-pointer group relative"
                      onClick={() => { onNavigate(item.id); if (isMobile && onMobileClose) onMobileClose(); }}
                      style={{
                        display: "flex", alignItems: "center", gap: 8,
                        padding: "8px 8px", borderRadius: 6, marginBottom: 1,
                        background: isActive ? "rgba(121,77,255,0.3)" : "transparent",
                        color: isActive ? "#3f404d" : "#3f404d",
                        fontWeight: 400, transition: "all 0.15s",
                        fontSize: 14,
                      }}
                      onMouseEnter={e => { if (!isActive) (e.currentTarget as HTMLElement).style.background = "rgba(121,77,255,0.06)"; }}
                      onMouseLeave={e => { if (!isActive) (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                    >
                      <span style={{ color: isActive ? "#3f404d" : "#64748b", display: "flex" }}><NavIcon type={item.icon} /></span>
                      <span style={{ flex: 1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.label}</span>
                      {item.badge != null && (
                        <span style={{ background: "#794dff", color: "#f3f2ff", fontSize: 12, fontWeight: 400, padding: "2px 8px", borderRadius: 99, lineHeight: "16px" }}>{item.badge}</span>
                      )}
                    </div>
                  );
                })}
              </div>
            );
          })}

          {/* COLLAPSED MODE — section icons with flyouts */}
          {!showLabels && (
            <div style={{ padding: "0 6px" }}>
              {/* Core items */}
              {navSections[0]?.items.map((item) => {
                const isActive = active === item.id;
                return (
                  <div
                    key={item.id}
                    className="cursor-pointer group relative"
                    onClick={() => onNavigate(item.id)}
                    style={{
                      display: "flex", alignItems: "center", justifyContent: "center",
                      padding: 10, borderRadius: 6, marginBottom: 2,
                      background: isActive ? "rgba(121,77,255,0.3)" : "transparent",
                      color: isActive ? "#3f404d" : "#64748b",
                      transition: "background 0.15s",
                    }}
                    onMouseEnter={e => { if (!isActive) (e.currentTarget as HTMLElement).style.background = "rgba(121,77,255,0.06)"; }}
                    onMouseLeave={e => { if (!isActive) (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                  >
                    <NavIcon type={item.icon} />
                    {item.badge != null && (
                      <span style={{ position: "absolute", top: 4, right: 4, width: 8, height: 8, borderRadius: "50%", background: "#794dff", border: "2px solid #fff" }} />
                    )}
                    <span className="absolute left-full ml-2 px-2.5 py-1.5 bg-[#1e1b4b] text-white text-[11px] font-semibold rounded-md whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all pointer-events-none z-[100]" style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.3)" }}>
                      {item.label}
                    </span>
                  </div>
                );
              })}

              {/* Divider */}
              <div style={{ margin: "6px 8px", borderBottom: "1px solid #e8e5f0" }} />

              {/* Section icons with flyout */}
              {navSections.filter(s => s.label).map((section, idx) => {
                const repIcon = section.items[0]?.icon || "grid";
                const hasActive = sectionHasActive(section);
                const isFlyoutOpen = flyoutSection === idx;

                return (
                  <div
                    key={section.label}
                    className="relative"
                    onMouseEnter={() => handleFlyoutEnter(idx)}
                    onMouseLeave={handleFlyoutLeave}
                  >
                    <div
                      className="cursor-pointer"
                      style={{
                        display: "flex", alignItems: "center", justifyContent: "center",
                        padding: 10, borderRadius: 6, marginBottom: 2,
                        background: isFlyoutOpen ? "rgba(121,77,255,0.3)" : hasActive ? "rgba(121,77,255,0.08)" : "transparent",
                        color: hasActive || isFlyoutOpen ? "#3f404d" : "#64748b",
                        transition: "background 0.15s",
                      }}
                      onMouseEnter={e => { if (!isFlyoutOpen && !hasActive) (e.currentTarget as HTMLElement).style.background = "rgba(121,77,255,0.06)"; }}
                      onMouseLeave={e => { if (!isFlyoutOpen && !hasActive) (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                    >
                      <NavIcon type={repIcon} />
                      {section.items.some(i => i.badge != null) && (
                        <span style={{ position: "absolute", top: 4, right: 4, width: 8, height: 8, borderRadius: "50%", background: "#794dff", border: "2px solid #fff" }} />
                      )}
                    </div>

                    {/* Flyout panel */}
                    {isFlyoutOpen && (
                      <div
                        onMouseEnter={() => handleFlyoutEnter(idx)}
                        onMouseLeave={handleFlyoutLeave}
                        style={{
                          position: "absolute", left: 52, top: -4, zIndex: 200,
                          background: "#fff", border: "1px solid #e8e5f0",
                          borderRadius: 8, padding: "6px", minWidth: 220,
                          boxShadow: "0 4px 6px rgba(64,63,67,0.06), 0 2px 4px rgba(64,63,67,0.06)",
                        }}
                      >
                        <div style={{ padding: "6px 8px 6px", fontSize: 12, fontWeight: 400, color: "rgba(63,64,77,0.5)", textTransform: "uppercase" }}>
                          {section.label}
                        </div>
                        {section.items.map((item) => {
                          const isActive = active === item.id;
                          return (
                            <div
                              key={item.id}
                              className="cursor-pointer"
                              onClick={() => { onNavigate(item.id); setFlyoutSection(null); }}
                              style={{
                                display: "flex", alignItems: "center", gap: 8,
                                padding: "8px 8px", borderRadius: 6,
                                color: "#3f404d",
                                background: isActive ? "rgba(121,77,255,0.3)" : "transparent",
                                fontWeight: 400, fontSize: 14,
                                transition: "background 0.15s",
                              }}
                              onMouseEnter={e => { if (!isActive) (e.currentTarget as HTMLElement).style.background = "rgba(121,77,255,0.06)"; }}
                              onMouseLeave={e => { if (!isActive) (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                            >
                              <span style={{ color: isActive ? "#3f404d" : "#64748b", display: "flex" }}><NavIcon type={item.icon} /></span>
                              <span style={{ flex: 1 }}>{item.label}</span>
                              {item.badge != null && (
                                <span style={{ background: "#794dff", color: "#f3f2ff", fontSize: 12, fontWeight: 400, padding: "2px 8px", borderRadius: 99, lineHeight: "16px" }}>{item.badge}</span>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </nav>
    </>
  );
}
