"use client";

import { useState } from "react";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";

interface Spiel {
  id: string;
  datum: string;
  uhrzeit: string;
  heim: string;
  gast: string;
  halle: string;
  schiedsrichter: string;
  ergebnis?: string;
  status: "geplant" | "laufend" | "beendet" | "abgesetzt";
  spieltag: number;
}

const SPIELE: Spiel[] = [
  { id: "S-1201", datum: "12.04.2026", uhrzeit: "19:00", heim: "BR Volleys", gast: "VfB Friedrichshafen", halle: "Max-Schmeling-Halle", schiedsrichter: "Felix Schmidt", status: "geplant", spieltag: 19 },
  { id: "S-1202", datum: "12.04.2026", uhrzeit: "19:30", heim: "Grizzlys Giesen", gast: "TSV Herrsching", halle: "Kurt-Ritter-Sporthalle", schiedsrichter: "Anna Berger", status: "geplant", spieltag: 19 },
  { id: "S-1203", datum: "12.04.2026", uhrzeit: "20:00", heim: "SWD Düren", gast: "Alpenvolleys Haching", halle: "Arena Kreis Düren", schiedsrichter: "", status: "geplant", spieltag: 19 },
  { id: "S-1101", datum: "05.04.2026", uhrzeit: "19:00", heim: "VfB Friedrichshafen", gast: "Grizzlys Giesen", halle: "ratiopharm arena", schiedsrichter: "Felix Schmidt", ergebnis: "3:1", status: "beendet", spieltag: 18 },
  { id: "S-1102", datum: "05.04.2026", uhrzeit: "19:30", heim: "TSV Herrsching", gast: "BR Volleys", halle: "Nikolaushalle", schiedsrichter: "Peter Wagner", ergebnis: "0:3", status: "beendet", spieltag: 18 },
  { id: "S-1103", datum: "05.04.2026", uhrzeit: "20:00", heim: "Alpenvolleys Haching", gast: "SWD Düren", halle: "Inntal-Halle", schiedsrichter: "Maria Keller", ergebnis: "3:2", status: "beendet", spieltag: 18 },
];

const statusColors: Record<string, "blue" | "green" | "gray" | "red"> = { geplant: "blue", laufend: "green", beendet: "gray", abgesetzt: "red" };
const statusLabels: Record<string, string> = { geplant: "Geplant", laufend: "Laufend", beendet: "Beendet", abgesetzt: "Abgesetzt" };

export default function SpielplanVerwaltung() {
  const [viewMode, setViewMode] = useState<"list" | "kalender">("list");
  const [filterSpieltag, setFilterSpieltag] = useState("");

  const filtered = SPIELE.filter(s => {
    if (filterSpieltag && s.spieltag !== Number(filterSpieltag)) return false;
    return true;
  });

  return (
    <div className="animate-fadeIn">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="text-[22px] font-bold mb-1">Spielplan-Verwaltung</h1>
          <p className="text-[13px] text-text-muted">1. Bundesliga Männer · Saison 2025/26</p>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost"><Icon name="bar-chart" size={14} /> Export</Button>
          <Button>+ Spiel ansetzen</Button>
        </div>
      </div>

      <Card className="!mb-4 !p-3">
        <div className="flex gap-3 flex-wrap items-center">
          <select className="!w-36" value={filterSpieltag} onChange={(e) => setFilterSpieltag(e.target.value)}>
            <option value="">Alle Spieltage</option>
            {Array.from({ length: 22 }, (_, i) => <option key={i} value={i + 1}>Spieltag {i + 1}</option>)}
          </select>
          <select className="!w-44"><option>Alle Status</option><option>Geplant</option><option>Beendet</option></select>
          <div className="ml-auto flex bg-s2 rounded-[6px] p-0.5 border border-border">
            <button className={`px-3 py-1.5 rounded-[4px] text-[12px] font-medium cursor-pointer ${viewMode === "list" ? "bg-accent text-white" : "text-text-muted"}`} onClick={() => setViewMode("list")}>Liste</button>
            <button className={`px-3 py-1.5 rounded-[4px] text-[12px] font-medium cursor-pointer ${viewMode === "kalender" ? "bg-accent text-white" : "text-text-muted"}`} onClick={() => setViewMode("kalender")}>Kalender</button>
          </div>
        </div>
      </Card>

      {/* Spiel without SR warning */}
      {SPIELE.some(s => !s.schiedsrichter && s.status === "geplant") && (
        <div className="bg-orange-dim border border-[rgba(217,119,6,0.2)] rounded-[8px] px-4 py-3 mb-4 flex items-center gap-3">
          <Icon name="alert" size={18} className="text-orange shrink-0" />
          <span className="text-[13px] text-orange font-medium">{SPIELE.filter(s => !s.schiedsrichter && s.status === "geplant").length} Pflichtspiele ohne Schiedsrichter</span>
          <Button size="sm" variant="warning" className="ml-auto">SR zuweisen</Button>
        </div>
      )}

      <Card noPadding className="!mb-0 overflow-hidden">
        <table className="w-full border-collapse text-[13px]">
          <thead>
            <tr>
              {["Nr.", "Datum", "Uhrzeit", "Heim", "Gast", "Halle", "Schiedsrichter", "Ergebnis", "Status"].map(h => (
                <th key={h} className="text-[11px] font-semibold text-text-muted uppercase tracking-wide px-3.5 py-2.5 text-left border-b border-border">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(s => (
              <tr key={s.id} className={`hover:bg-s2 cursor-pointer ${s.status === "laufend" ? "bg-green-dim" : ""}`}>
                <td className="px-3.5 py-2.5 border-b border-border font-mono text-[11px] text-text-muted">{s.id}</td>
                <td className="px-3.5 py-2.5 border-b border-border">{s.datum}</td>
                <td className="px-3.5 py-2.5 border-b border-border text-text-dim">{s.uhrzeit}</td>
                <td className="px-3.5 py-2.5 border-b border-border font-semibold">{s.heim}</td>
                <td className="px-3.5 py-2.5 border-b border-border font-semibold">{s.gast}</td>
                <td className="px-3.5 py-2.5 border-b border-border text-text-dim text-[12px]">{s.halle}</td>
                <td className="px-3.5 py-2.5 border-b border-border">
                  {s.schiedsrichter ? s.schiedsrichter : <Badge color="orange">Nicht besetzt</Badge>}
                </td>
                <td className="px-3.5 py-2.5 border-b border-border font-bold text-[14px]">{s.ergebnis || "–"}</td>
                <td className="px-3.5 py-2.5 border-b border-border">
                  <Badge color={statusColors[s.status]}>
                    {s.status === "laufend" && <span className="w-2 h-2 bg-green rounded-full animate-pulse-live inline-block mr-1" />}
                    {statusLabels[s.status]}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
