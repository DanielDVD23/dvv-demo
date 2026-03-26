"use client";

import { useState, useEffect } from "react";
import type { NavSection } from "@/types/roles";

interface SidebarProps {
  active: string;
  onNavigate: (screen: string) => void;
  navSections: NavSection[];
  mobileOpen?: boolean;
  onMobileClose?: () => void;
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
    info: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" /></svg>,
    "book-open": <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></svg>,
  };
  return icons[type] || null;
}

export default function Sidebar({ active, onNavigate, navSections = [], mobileOpen, onMobileClose }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const check = () => {
      const w = window.innerWidth;
      setIsMobile(w < 768);
      setIsTablet(w >= 768 && w < 1024);
      if (w >= 768 && w < 1024) setCollapsed(true);
      if (w >= 1024) setCollapsed(false);
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // On mobile: show as overlay when mobileOpen, otherwise hidden
  if (isMobile && !mobileOpen) return null;

  const showLabels = !collapsed || (isMobile && mobileOpen);
  const sidebarWidth = showLabels ? 240 : 60;

  return (
    <>
      {/* Mobile overlay backdrop */}
      {isMobile && mobileOpen && (
        <div
          onClick={onMobileClose}
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 199 }}
        />
      )}

      <nav
        style={{
          width: sidebarWidth,
          minWidth: sidebarWidth,
          height: isMobile ? "100vh" : "100%",
          position: isMobile ? "fixed" : "relative",
          top: isMobile ? 0 : undefined,
          left: isMobile ? 0 : undefined,
          zIndex: isMobile ? 200 : 100,
          background: "#fff",
          borderRight: "1px solid #eee",
          display: "flex",
          flexDirection: "column",
          transition: "width 0.2s, min-width 0.2s",
          overflow: "hidden",
        }}
      >
        {/* Mobile close button */}
        {isMobile && (
          <div style={{ display: "flex", justifyContent: "flex-end", padding: "12px 12px 0" }}>
            <button onClick={onMobileClose} style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
            </button>
          </div>
        )}

        {/* Nav items */}
        <div style={{ flex: 1, overflowY: "auto", paddingTop: 12, paddingBottom: 8 }}>
          {navSections.map((section, si) => (
            <div key={section.label}>
              {si > 0 && (
                showLabels
                  ? <div style={{ padding: "16px 16px 6px", fontSize: 10, fontWeight: 600, color: "#94a3b8", textTransform: "uppercase", letterSpacing: 1.2, whiteSpace: "nowrap" }}>{section.label}</div>
                  : <div style={{ margin: "8px 12px", borderBottom: "1px solid #e8e5f0" }} />
              )}
              {section.items.map((item) => {
                const isActive = active === item.id;
                return (
                  <div
                    key={item.id}
                    className="cursor-pointer"
                    onClick={() => { onNavigate(item.id); if (isMobile && onMobileClose) onMobileClose(); }}
                    style={{
                      display: "flex", alignItems: "center", gap: 10,
                      padding: showLabels ? "10px 12px" : "10px 0",
                      justifyContent: showLabels ? "flex-start" : "center",
                      margin: "0 8px", borderRadius: 10, marginBottom: 1,
                      background: isActive ? "rgba(124,58,237,0.08)" : "transparent",
                      color: isActive ? "#7c3aed" : "#64748b",
                      fontWeight: isActive ? 600 : 400,
                      transition: "all 0.15s",
                    }}
                  >
                    <NavIcon type={item.icon} />
                    {showLabels && <span style={{ fontSize: 13.5, whiteSpace: "nowrap", flex: 1 }}>{item.label}</span>}
                    {showLabels && item.badge != null && (
                      <span style={{ background: "#7c3aed", color: "#fff", fontSize: 10, fontWeight: 700, padding: "0 5px", borderRadius: 99, minWidth: 18, height: 18, display: "flex", alignItems: "center", justifyContent: "center" }}>{item.badge}</span>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {/* + Button / collapse toggle */}
        {!isMobile && (
          <div style={{ padding: "8px 12px 16px" }}>
            <button
              onClick={() => setCollapsed(!collapsed)}
              style={{ width: 36, height: 36, borderRadius: "50%", background: "rgba(124,58,237,0.08)", color: "#7c3aed", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: collapsed ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
          </div>
        )}
      </nav>
    </>
  );
}
