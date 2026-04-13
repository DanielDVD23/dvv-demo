"use client";

import { useState } from "react";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";

const KPI_SR = [
  { label: "Offene Ansetzungen", value: "14", color: "text-red", icon: "alert" },
  { label: "Bestätigt (Woche)", value: "38", color: "text-green", icon: "check" },
  { label: "Abgelehnt (offen)", value: "3", color: "text-orange", icon: "alert" },
  { label: "SR ohne Einsatz (2 Wo.)", value: "7", color: "text-blue", icon: "users" },
];

interface Ansetzung {
  id: string;
  spiel: string;
  datum: string;
  ort: string;
  qualifikation: string;
  sr: string;
  status: "bestaetigt" | "ausstehend" | "unbesetzt" | "abgelehnt";
  entfernung?: string;
}

const ANSETZUNGEN: Ansetzung[] = [
  { id: "A-501", spiel: "BR Volleys vs. VfB Friedrichshafen", datum: "12.04.2026 19:00", ort: "Berlin", qualifikation: "Bundesliga", sr: "Felix Schmidt", status: "bestaetigt", entfernung: "12 km" },
  { id: "A-502", spiel: "Grizzlys Giesen vs. TSV Herrsching", datum: "12.04.2026 19:30", ort: "Giesen", qualifikation: "Bundesliga", sr: "Anna Berger", status: "ausstehend", entfernung: "45 km" },
  { id: "A-503", spiel: "SWD Düren vs. Alpenvolleys", datum: "12.04.2026 20:00", ort: "Düren", qualifikation: "Bundesliga", sr: "", status: "unbesetzt" },
  { id: "A-504", spiel: "TSV Hannover vs. SC Paderborn", datum: "13.04.2026 15:00", ort: "Hannover", qualifikation: "Verbandsliga", sr: "Peter Wagner", status: "bestaetigt", entfernung: "8 km" },
  { id: "A-505", spiel: "VfR Bielefeld vs. MTV Wolfsburg", datum: "13.04.2026 16:00", ort: "Bielefeld", qualifikation: "Verbandsliga", sr: "Maria Keller", status: "abgelehnt", entfernung: "120 km" },
  { id: "A-506", spiel: "DSC Dresden vs. USC Münster", datum: "13.04.2026 17:00", ort: "Dresden", qualifikation: "2. Bundesliga", sr: "", status: "unbesetzt" },
];

const statusColors: Record<string, "green" | "orange" | "red" | "blue"> = {
  bestaetigt: "green", ausstehend: "orange", unbesetzt: "red", abgelehnt: "red",
};
const statusLabels: Record<string, string> = {
  bestaetigt: "Bestätigt", ausstehend: "Ausstehend", unbesetzt: "Unbesetzt", abgelehnt: "Abgelehnt",
};

const SR_POOL = [
  { name: "Felix Schmidt", qualifikation: "Bundesliga", ort: "Berlin", einsaetze: 18, verfuegbar: true, entfernung: "12 km" },
  { name: "Anna Berger", qualifikation: "Bundesliga", ort: "Hannover", einsaetze: 15, verfuegbar: true, entfernung: "45 km" },
  { name: "Peter Wagner", qualifikation: "Regionalliga", ort: "Hannover", einsaetze: 12, verfuegbar: true, entfernung: "8 km" },
  { name: "Maria Keller", qualifikation: "Bundesliga", ort: "München", einsaetze: 16, verfuegbar: false, entfernung: "—" },
  { name: "Thomas Braun", qualifikation: "Regionalliga", ort: "Köln", einsaetze: 8, verfuegbar: true, entfernung: "65 km" },
];

export default function SrAnsetzung() {
  const [showPool, setShowPool] = useState(false);

  return (
    <div className="animate-fadeIn">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="text-[22px] font-bold mb-1">SR-Ansetzungen</h1>
          <p className="text-[13px] text-text-muted">Schiedsrichter-Einsatzplanung</p>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" onClick={() => setShowPool(!showPool)}>
            <Icon name="users" size={14} /> SR-Pool
          </Button>
          <Button>Optimale Ansetzung vorschlagen</Button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
        {KPI_SR.map(k => (
          <Card key={k.label} className="!mb-0 !p-4">
            <div className={`w-8 h-8 rounded-lg bg-s2 flex items-center justify-center mb-2`}>
              <Icon name={k.icon} size={16} className={k.color} />
            </div>
            <div className="text-[22px] font-bold">{k.value}</div>
            <div className="text-[11px] text-text-muted font-medium">{k.label}</div>
          </Card>
        ))}
      </div>

      {/* Conflict alerts */}
      {ANSETZUNGEN.some(a => a.status === "abgelehnt") && (
        <div className="bg-red-dim border border-[rgba(239,68,68,0.2)] rounded-[8px] px-4 py-3 mb-4 flex items-center gap-3">
          <Icon name="alert" size={18} className="text-red shrink-0" />
          <span className="text-[13px] text-red font-medium">SR Müller hat Ansetzung abgelehnt — Neubesetzung erforderlich</span>
          <Button size="sm" variant="danger" className="ml-auto">SR zuweisen</Button>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-4">
        {/* Ansetzungen */}
        <Card noPadding className="!mb-0 overflow-hidden">
          <div className="px-5 py-3 border-b border-border flex items-center justify-between">
            <span className="text-xs font-bold text-text-muted uppercase tracking-wider">Ansetzungen</span>
            <div className="flex gap-2">
              <select className="!w-36 !h-7 text-[12px]"><option>Alle Status</option><option>Unbesetzt</option><option>Ausstehend</option></select>
            </div>
          </div>
          <table className="w-full border-collapse text-[13px]">
            <thead><tr>
              {["Spiel", "Datum", "Ort", "Qualifikation", "SR", "Entfernung", "Status", ""].map(h => (
                <th key={h} className="text-[11px] font-semibold text-text-muted uppercase tracking-wide px-3 py-2.5 text-left border-b border-border">{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {ANSETZUNGEN.map(a => (
                <tr key={a.id} className={`hover:bg-s2 ${a.status === "unbesetzt" ? "status-bar-red" : a.status === "abgelehnt" ? "status-bar-orange" : ""}`}>
                  <td className="px-3 py-2.5 border-b border-border font-semibold text-[12px]">{a.spiel}</td>
                  <td className="px-3 py-2.5 border-b border-border text-[12px]">{a.datum}</td>
                  <td className="px-3 py-2.5 border-b border-border text-text-dim text-[12px]">{a.ort}</td>
                  <td className="px-3 py-2.5 border-b border-border"><Badge color="purple">{a.qualifikation}</Badge></td>
                  <td className="px-3 py-2.5 border-b border-border">{a.sr || <Badge color="red">Nicht besetzt</Badge>}</td>
                  <td className="px-3 py-2.5 border-b border-border text-text-muted text-[12px]">{a.entfernung || "—"}</td>
                  <td className="px-3 py-2.5 border-b border-border"><Badge color={statusColors[a.status]}>{statusLabels[a.status]}</Badge></td>
                  <td className="px-3 py-2.5 border-b border-border">
                    {(a.status === "unbesetzt" || a.status === "abgelehnt") && <Button size="sm">Zuweisen</Button>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        {/* SR Pool / Map */}
        <Card className="!mb-0">
          <div className="text-xs font-bold text-text-muted uppercase tracking-wider mb-3">Verfügbare Schiedsrichter</div>
          <div className="space-y-3">
            {SR_POOL.map((sr, i) => (
              <div key={i} className={`flex items-center gap-3 p-2 rounded-[6px] ${sr.verfuegbar ? "hover:bg-s2 cursor-pointer" : "opacity-50"}`}>
                <div className={`w-9 h-9 rounded-full flex items-center justify-center text-[11px] font-bold ${sr.verfuegbar ? "bg-green-dim text-green" : "bg-[rgba(100,116,139,.15)] text-text-muted"}`}>
                  {sr.name.split(" ").map(n => n[0]).join("")}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-[13px]">{sr.name}</div>
                  <div className="text-[11px] text-text-muted">{sr.qualifikation} · {sr.ort} · {sr.einsaetze} Einsätze</div>
                </div>
                {sr.verfuegbar ? (
                  <Badge color="green">Frei</Badge>
                ) : (
                  <Badge color="gray">Besetzt</Badge>
                )}
              </div>
            ))}
          </div>

          <div className="mt-4 bg-s2 rounded-[6px] p-4 text-center">
            <Icon name="map" size={24} className="text-text-muted mx-auto mb-2" />
            <div className="text-[12px] text-text-muted">Geo-Filter: SR nach Entfernung sortiert</div>
          </div>
        </Card>
      </div>
    </div>
  );
}
