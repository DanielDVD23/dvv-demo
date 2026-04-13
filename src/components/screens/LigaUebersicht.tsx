"use client";

import { useState } from "react";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";

interface Liga {
  id: string;
  name: string;
  saison: string;
  teams: number;
  spieltage: { aktuell: number; gesamt: number };
  status: "aktiv" | "planung" | "abgeschlossen";
  ebene: number;
}

const LIGEN: Liga[] = [
  { id: "L-001", name: "1. Bundesliga Männer", saison: "2025/26", teams: 12, spieltage: { aktuell: 18, gesamt: 22 }, status: "aktiv", ebene: 1 },
  { id: "L-002", name: "1. Bundesliga Frauen", saison: "2025/26", teams: 12, spieltage: { aktuell: 18, gesamt: 22 }, status: "aktiv", ebene: 1 },
  { id: "L-003", name: "2. Bundesliga Männer Nord", saison: "2025/26", teams: 10, spieltage: { aktuell: 16, gesamt: 22 }, status: "aktiv", ebene: 2 },
  { id: "L-004", name: "2. Bundesliga Männer Süd", saison: "2025/26", teams: 10, spieltage: { aktuell: 16, gesamt: 22 }, status: "aktiv", ebene: 2 },
  { id: "L-005", name: "3. Liga Männer Nord", saison: "2025/26", teams: 12, spieltage: { aktuell: 14, gesamt: 22 }, status: "aktiv", ebene: 3 },
  { id: "L-006", name: "3. Liga Männer Süd", saison: "2025/26", teams: 12, spieltage: { aktuell: 14, gesamt: 22 }, status: "aktiv", ebene: 3 },
  { id: "L-007", name: "Regionalliga Nord", saison: "2025/26", teams: 10, spieltage: { aktuell: 12, gesamt: 20 }, status: "aktiv", ebene: 4 },
  { id: "L-008", name: "Regionalliga West", saison: "2025/26", teams: 10, spieltage: { aktuell: 12, gesamt: 20 }, status: "aktiv", ebene: 4 },
  { id: "L-009", name: "Verbandsliga Niedersachsen", saison: "2025/26", teams: 10, spieltage: { aktuell: 10, gesamt: 18 }, status: "aktiv", ebene: 5 },
];

const EBENEN = [
  { level: 1, label: "Bundesliga", color: "bg-accent", textColor: "text-accent" },
  { level: 2, label: "2. Bundesliga", color: "bg-blue", textColor: "text-blue" },
  { level: 3, label: "3. Liga", color: "bg-green", textColor: "text-green" },
  { level: 4, label: "Regionalliga", color: "bg-orange", textColor: "text-orange" },
  { level: 5, label: "Verbandsliga", color: "bg-red", textColor: "text-red" },
];

const statusColors: Record<string, "green" | "blue" | "gray"> = { aktiv: "green", planung: "blue", abgeschlossen: "gray" };

export default function LigaUebersicht() {
  const [toggle, setToggle] = useState<"halle" | "beach">("halle");

  return (
    <div className="animate-fadeIn">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="text-[22px] font-bold mb-1">Liga-Übersicht & Struktur</h1>
          <p className="text-[13px] text-text-muted">Saison 2025/26 · {LIGEN.length} Ligen</p>
        </div>
        <div className="flex gap-2 items-center">
          <div className="flex bg-s2 rounded-[6px] p-0.5 border border-border">
            <button className={`px-3 py-1.5 rounded-[4px] text-[12px] font-medium cursor-pointer ${toggle === "halle" ? "bg-accent text-white" : "text-text-muted"}`} onClick={() => setToggle("halle")}>Halle</button>
            <button className={`px-3 py-1.5 rounded-[4px] text-[12px] font-medium cursor-pointer ${toggle === "beach" ? "bg-accent text-white" : "text-text-muted"}`} onClick={() => setToggle("beach")}>Beach</button>
          </div>
          <Button variant="ghost"><Icon name="bar-chart" size={14} /> Export</Button>
        </div>
      </div>

      {/* Pyramid visualization */}
      <Card className="!mb-5">
        <div className="text-xs font-bold text-text-muted uppercase tracking-wider mb-4">Liga-Pyramide</div>
        <div className="space-y-2">
          {EBENEN.map(e => {
            const ligen = LIGEN.filter(l => l.ebene === e.level);
            return (
              <div key={e.level} className="flex items-center gap-3">
                <div className={`w-2 h-8 rounded-full ${e.color}`} />
                <div className="w-28 text-[12px] font-semibold">{e.label}</div>
                <div className="flex-1 flex gap-2 flex-wrap">
                  {ligen.map(l => (
                    <div key={l.id} className="bg-s2 border border-border rounded-[6px] px-3 py-1.5 text-[12px] cursor-pointer hover:border-accent transition-colors">
                      <span className="font-medium">{l.name}</span>
                      <span className="text-text-muted ml-2">{l.teams} Teams</span>
                    </div>
                  ))}
                  {ligen.length === 0 && <span className="text-[12px] text-text-muted italic">Keine Ligen in dieser Ebene</span>}
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Liga Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {LIGEN.map(l => {
          const ebene = EBENEN.find(e => e.level === l.ebene);
          const progress = (l.spieltage.aktuell / l.spieltage.gesamt) * 100;
          return (
            <Card key={l.id} borderColor={`border-l-${ebene?.color.replace("bg-", "") || "accent"}`} className="!mb-0 cursor-pointer hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="font-bold text-[14px]">{l.name}</div>
                  <div className="text-[12px] text-text-muted">{l.saison}</div>
                </div>
                <Badge color={statusColors[l.status]}>{l.status.charAt(0).toUpperCase() + l.status.slice(1)}</Badge>
              </div>
              <div className="grid grid-cols-2 gap-3 mb-3 text-[12px]">
                <div><span className="text-text-muted">Teams:</span> <span className="font-semibold">{l.teams}</span></div>
                <div><span className="text-text-muted">Spieltage:</span> <span className="font-semibold">{l.spieltage.aktuell}/{l.spieltage.gesamt}</span></div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-2 bg-s2 rounded-full overflow-hidden">
                  <div className={`h-full ${ebene?.color || "bg-accent"} rounded-full`} style={{ width: `${progress}%` }} />
                </div>
                <span className="text-[11px] text-text-muted font-medium">{Math.round(progress)}%</span>
              </div>
              <div className="mt-3 flex gap-2">
                <Button size="sm" variant="ghost">Tabelle</Button>
                <Button size="sm" variant="ghost">Spielplan</Button>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
