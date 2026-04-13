"use client";

import { useState } from "react";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";

const ROLLEN = [
  { name: "Verbandsadmin", nutzer: 12, ebene: "DVV", vererbt: false, module: { stammdaten: true, lizenzen: true, finanzen: true, spielbetrieb: true, reporting: true, admin: true } },
  { name: "Landesverbandsadmin", nutzer: 48, ebene: "Landesverband", vererbt: true, module: { stammdaten: true, lizenzen: true, finanzen: true, spielbetrieb: true, reporting: true, admin: false } },
  { name: "Vereinsadmin", nutzer: 1240, ebene: "Verein", vererbt: true, module: { stammdaten: true, lizenzen: false, finanzen: true, spielbetrieb: false, reporting: false, admin: false } },
  { name: "Staffelleitung", nutzer: 86, ebene: "Staffel", vererbt: false, module: { stammdaten: false, lizenzen: false, finanzen: false, spielbetrieb: true, reporting: true, admin: false } },
  { name: "Schiedsrichter-Wart", nutzer: 24, ebene: "Landesverband", vererbt: false, module: { stammdaten: false, lizenzen: false, finanzen: false, spielbetrieb: true, reporting: false, admin: false } },
  { name: "Spieler (Self-Service)", nutzer: 42800, ebene: "Person", vererbt: false, module: { stammdaten: false, lizenzen: false, finanzen: false, spielbetrieb: false, reporting: false, admin: false } },
];

const MODULE = ["stammdaten", "lizenzen", "finanzen", "spielbetrieb", "reporting", "admin"];
const MODULE_LABELS: Record<string, string> = { stammdaten: "Stammdaten", lizenzen: "Lizenzen", finanzen: "Finanzen", spielbetrieb: "Spielbetrieb", reporting: "Reporting", admin: "Admin" };

export default function RechteRollen() {
  return (
    <div className="animate-fadeIn">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="text-[22px] font-bold mb-1">Rechte & Rollen</h1>
          <p className="text-[13px] text-text-muted">Rollenbasierte Zugriffssteuerung</p>
        </div>
        <Button>+ Neue Rolle</Button>
      </div>

      {/* Vererbungsvisualisierung */}
      <Card className="!mb-5">
        <div className="text-xs font-bold text-text-muted uppercase tracking-wider mb-4">Vererbungshierarchie</div>
        <div className="flex items-center gap-4 justify-center text-[13px]">
          <div className="bg-accent-dim border border-accent px-4 py-2 rounded-[6px] font-semibold text-accent">DVV</div>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          <div className="bg-blue-dim border border-blue px-4 py-2 rounded-[6px] font-semibold text-blue">Landesverband</div>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          <div className="bg-green-dim border border-green px-4 py-2 rounded-[6px] font-semibold text-green">Verein</div>
        </div>
        <div className="text-center text-[11px] text-text-muted mt-2">Berechtigungen werden nach unten vererbt (einschränkbar)</div>
      </Card>

      {/* Rollen-Matrix */}
      <Card noPadding className="!mb-0 overflow-x-auto">
        <div className="px-5 py-3 border-b border-border">
          <span className="text-xs font-bold text-text-muted uppercase tracking-wider">Rollen-Matrix</span>
        </div>
        <table className="w-full border-collapse text-[13px]">
          <thead><tr>
            <th className="text-[11px] font-semibold text-text-muted uppercase tracking-wide px-4 py-2.5 text-left border-b border-border w-48">Rolle</th>
            <th className="text-[11px] font-semibold text-text-muted uppercase tracking-wide px-4 py-2.5 text-left border-b border-border w-20">Nutzer</th>
            <th className="text-[11px] font-semibold text-text-muted uppercase tracking-wide px-4 py-2.5 text-left border-b border-border w-28">Ebene</th>
            {MODULE.map(m => (
              <th key={m} className="text-[11px] font-semibold text-text-muted uppercase tracking-wide px-4 py-2.5 text-center border-b border-border">{MODULE_LABELS[m]}</th>
            ))}
          </tr></thead>
          <tbody>
            {ROLLEN.map((r, i) => (
              <tr key={i} className="hover:bg-s2">
                <td className="px-4 py-2.5 border-b border-border">
                  <div className="font-semibold">{r.name}</div>
                  {r.vererbt && <span className="text-[10px] text-text-muted">Vererbt</span>}
                </td>
                <td className="px-4 py-2.5 border-b border-border text-text-dim">{r.nutzer.toLocaleString("de-DE")}</td>
                <td className="px-4 py-2.5 border-b border-border"><Badge color={r.ebene === "DVV" ? "purple" : r.ebene === "Landesverband" ? "blue" : r.ebene === "Verein" ? "green" : "gray"}>{r.ebene}</Badge></td>
                {MODULE.map(m => (
                  <td key={m} className="px-4 py-2.5 border-b border-border text-center">
                    {r.module[m as keyof typeof r.module] ? (
                      <div className="w-5 h-5 rounded bg-green-dim flex items-center justify-center mx-auto">
                        <Icon name="check" size={12} className="text-green" />
                      </div>
                    ) : (
                      <div className="w-5 h-5 rounded bg-s2 mx-auto" />
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
