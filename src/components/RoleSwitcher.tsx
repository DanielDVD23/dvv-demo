"use client";

import { useState, useEffect, useRef } from "react";
import type { Role } from "@/types/roles";
import { roleConfigs } from "@/config/roles";

interface RoleSwitcherProps {
  currentRole: Role;
  onRoleChange: (role: Role) => void;
}

const roles: Role[] = ["staffelleitung", "clubadmin", "verbandsadmin"];

export default function RoleSwitcher({ currentRole, onRoleChange }: RoleSwitcherProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const config = roleConfigs[currentRole];

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    if (open) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  return (
    <div className="relative" ref={ref}>
      {/* Trigger */}
      <button
        className="flex items-center gap-2.5 px-3 py-1.5 rounded-[10px] bg-white/[0.08] border border-white/10 cursor-pointer transition-all hover:bg-white/[0.14]"
        onClick={() => setOpen(!open)}
      >
        <div className={`w-7 h-7 rounded-lg bg-gradient-to-br ${config.gradient} flex items-center justify-center text-[11px] font-bold text-white shrink-0`}>
          {config.initials}
        </div>
        <div className="text-left">
          <div className="text-[12px] font-bold text-white leading-tight">{config.userName}</div>
          <div className="text-[10px] text-white/50 leading-tight">{config.label}</div>
        </div>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`text-white/40 ml-1 transition-transform ${open ? "rotate-180" : ""}`}>
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute top-[calc(100%+6px)] left-0 bg-s1 border border-border rounded-[12px] shadow-lg min-w-[260px] z-50 overflow-hidden animate-fadeIn">
          <div className="px-4 pt-3 pb-1.5 text-[10px] font-semibold text-text-muted uppercase tracking-wider">
            Rolle wechseln
          </div>
          {roles.map((roleId) => {
            const rc = roleConfigs[roleId];
            const isActive = roleId === currentRole;
            return (
              <button
                key={roleId}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors cursor-pointer ${
                  isActive ? "bg-s3" : "hover:bg-s2"
                }`}
                onClick={() => { onRoleChange(roleId); setOpen(false); }}
              >
                <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${rc.gradient} flex items-center justify-center text-[11px] font-bold text-white shrink-0`}>
                  {rc.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[13px] font-semibold text-text">{rc.userName}</div>
                  <div className="text-[11px] text-text-muted">{rc.label} · {rc.subtitle}</div>
                </div>
                {isActive && (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-accent shrink-0">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
