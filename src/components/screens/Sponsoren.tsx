"use client";

import { useState } from "react";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";

const SPONSOREN = [
  { name: "Mikasa", kategorie: "Hauptsponsor", vertragEnde: "31.12.2027", kontakt: "J. Tanaka", status: "aktiv", volumen: "€ 450.000/Jahr" },
  { name: "ERIMA", kategorie: "Ausrüster", vertragEnde: "30.06.2026", kontakt: "M. Bauer", status: "verlaengerung", volumen: "€ 280.000/Jahr" },
  { name: "Sportdeutschland.tv", kategorie: "Medienpartner", vertragEnde: "31.12.2026", kontakt: "S. Weber", status: "aktiv", volumen: "€ 120.000/Jahr" },
  { name: "DKB", kategorie: "Co-Sponsor", vertragEnde: "15.08.2026", kontakt: "K. Richter", status: "aktiv", volumen: "€ 85.000/Jahr" },
  { name: "Regional Energie AG", kategorie: "Regionalsponsor", vertragEnde: "01.03.2026", kontakt: "H. Müller", status: "abgelaufen", volumen: "€ 25.000/Jahr" },
];

const statusColors: Record<string, "green" | "orange" | "red" | "blue"> = {
  aktiv: "green", verlaengerung: "orange", abgelaufen: "red", verhandlung: "blue",
};
const statusLabels: Record<string, string> = {
  aktiv: "Aktiv", verlaengerung: "Verlängerung", abgelaufen: "Abgelaufen", verhandlung: "Verhandlung",
};

export default function Sponsoren() {
  const [viewMode, setViewMode] = useState<"table" | "kanban">("table");

  return (
    <div className="animate-fadeIn">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="text-[22px] font-bold mb-1">Sponsorenverwaltung</h1>
          <p className="text-[13px] text-text-muted">CRM & Vertragsmanagement</p>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost"><Icon name="refresh" size={14} /> Sponsorium Sync</Button>
          <Button>+ Neuer Sponsor</Button>
        </div>
      </div>

      {/* Alert */}
      <div className="bg-orange-dim border border-[rgba(217,119,6,0.2)] rounded-[8px] px-4 py-3 mb-5 flex items-center gap-3">
        <Icon name="alert" size={18} className="text-orange shrink-0" />
        <span className="text-[13px] text-orange font-medium">1 Sponsor-Vertrag ist abgelaufen, 1 Verlängerung steht an</span>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
        <Card className="!mb-0 !p-4"><div className="text-[22px] font-bold">€ 960K</div><div className="text-[11px] text-text-muted">Sponsoring-Volumen</div></Card>
        <Card className="!mb-0 !p-4"><div className="text-[22px] font-bold">5</div><div className="text-[11px] text-text-muted">Aktive Verträge</div></Card>
        <Card className="!mb-0 !p-4"><div className="text-[22px] font-bold">1</div><div className="text-[11px] text-text-muted">Neue Verträge (Q1)</div></Card>
        <Card className="!mb-0 !p-4"><div className="text-[22px] font-bold">80%</div><div className="text-[11px] text-text-muted">Verlängerungsquote</div></Card>
      </div>

      <Card noPadding className="!mb-0 overflow-hidden">
        <div className="px-5 py-3 border-b border-border flex items-center justify-between">
          <span className="text-xs font-bold text-text-muted uppercase tracking-wider">Sponsoren</span>
          <div className="flex gap-1">
            <button className={`px-3 py-1 rounded-[4px] text-[12px] font-medium cursor-pointer ${viewMode === "table" ? "bg-accent text-white" : "text-text-muted bg-s2"}`} onClick={() => setViewMode("table")}>Tabelle</button>
            <button className={`px-3 py-1 rounded-[4px] text-[12px] font-medium cursor-pointer ${viewMode === "kanban" ? "bg-accent text-white" : "text-text-muted bg-s2"}`} onClick={() => setViewMode("kanban")}>Kanban</button>
          </div>
        </div>
        <table className="w-full border-collapse text-[13px]">
          <thead><tr>
            {["Logo", "Name", "Kategorie", "Vertrag bis", "Kontakt", "Volumen", "Status"].map(h => (
              <th key={h} className="text-[11px] font-semibold text-text-muted uppercase tracking-wide px-4 py-2.5 text-left border-b border-border">{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {SPONSOREN.map((s, i) => (
              <tr key={i} className="hover:bg-s2 cursor-pointer">
                <td className="px-4 py-2.5 border-b border-border">
                  <div className="w-10 h-10 rounded-lg bg-s3 flex items-center justify-center text-[10px] font-bold text-accent">{s.name.slice(0, 2).toUpperCase()}</div>
                </td>
                <td className="px-4 py-2.5 border-b border-border font-semibold">{s.name}</td>
                <td className="px-4 py-2.5 border-b border-border"><Badge color="purple">{s.kategorie}</Badge></td>
                <td className="px-4 py-2.5 border-b border-border text-text-muted text-[12px]">{s.vertragEnde}</td>
                <td className="px-4 py-2.5 border-b border-border text-text-dim">{s.kontakt}</td>
                <td className="px-4 py-2.5 border-b border-border font-semibold">{s.volumen}</td>
                <td className="px-4 py-2.5 border-b border-border"><Badge color={statusColors[s.status]}>{statusLabels[s.status]}</Badge></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
