"use client";

import { useState } from "react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import ExportDropdown from "@/components/ui/ExportDropdown";
import Icon from "@/components/ui/Icon";

interface Team {
  mannschaft: string;
  verein: string;
  liga: string;
  spielklasse: string;
  kaderstaerke: number;
  status: "Bestätigt" | "In Prüfung" | "Gemeldet" | "Abgelehnt";
}

const teams: Team[] = [
  // Verbandsliga
  { mannschaft: "Herren 1", verein: "TSV Hannover", liga: "Verbandsliga Nord", spielklasse: "Verbandsliga", kaderstaerke: 12, status: "Bestätigt" },
  { mannschaft: "Damen 1", verein: "TSV Hannover", liga: "Verbandsliga Nord", spielklasse: "Verbandsliga", kaderstaerke: 14, status: "Bestätigt" },
  { mannschaft: "Herren 1", verein: "MTV Wolfsburg", liga: "Verbandsliga Nord", spielklasse: "Verbandsliga", kaderstaerke: 13, status: "Bestätigt" },
  { mannschaft: "Damen 1", verein: "VfR Bielefeld", liga: "Verbandsliga Süd", spielklasse: "Verbandsliga", kaderstaerke: 12, status: "Bestätigt" },
  { mannschaft: "Herren 1", verein: "SC Paderborn", liga: "Verbandsliga Süd", spielklasse: "Verbandsliga", kaderstaerke: 11, status: "Bestätigt" },
  { mannschaft: "Damen 1", verein: "SC Paderborn", liga: "Verbandsliga Süd", spielklasse: "Verbandsliga", kaderstaerke: 10, status: "Bestätigt" },
  { mannschaft: "Herren 1", verein: "USC Braunschweig", liga: "Verbandsliga Nord", spielklasse: "Verbandsliga", kaderstaerke: 12, status: "Bestätigt" },
  { mannschaft: "Damen 1", verein: "VC Osnabrück", liga: "Verbandsliga Nord", spielklasse: "Verbandsliga", kaderstaerke: 11, status: "In Prüfung" },
  // Bezirksliga
  { mannschaft: "Damen 1", verein: "SVC Göttingen", liga: "Bezirksliga Süd", spielklasse: "Bezirksliga", kaderstaerke: 10, status: "Bestätigt" },
  { mannschaft: "Herren 2", verein: "SVC Göttingen", liga: "Bezirksliga Süd", spielklasse: "Bezirksliga", kaderstaerke: 11, status: "In Prüfung" },
  { mannschaft: "Herren 1", verein: "MTV Braunschweig", liga: "Bezirksliga Nord", spielklasse: "Bezirksliga", kaderstaerke: 11, status: "In Prüfung" },
  { mannschaft: "Damen 2", verein: "TSV Hannover", liga: "Bezirksliga Nord", spielklasse: "Bezirksliga", kaderstaerke: 10, status: "Bestätigt" },
  { mannschaft: "Herren 2", verein: "TSV Hannover", liga: "Bezirksliga Nord", spielklasse: "Bezirksliga", kaderstaerke: 9, status: "Bestätigt" },
  { mannschaft: "Damen 1", verein: "SVC Wolfsburg", liga: "Bezirksliga Nord", spielklasse: "Bezirksliga", kaderstaerke: 9, status: "Gemeldet" },
  { mannschaft: "Herren 1", verein: "TSV Hildesheim", liga: "Bezirksliga Süd", spielklasse: "Bezirksliga", kaderstaerke: 12, status: "Bestätigt" },
  { mannschaft: "Damen 1", verein: "TV Hildesheim", liga: "Bezirksliga Süd", spielklasse: "Bezirksliga", kaderstaerke: 10, status: "Gemeldet" },
  // Kreisliga
  { mannschaft: "Herren 1", verein: "TV Hildesheim", liga: "Kreisliga Hannover", spielklasse: "Kreisliga", kaderstaerke: 0, status: "Abgelehnt" },
  { mannschaft: "Herren 1", verein: "SC Osnabrück", liga: "Kreisliga Osnabrück", spielklasse: "Kreisliga", kaderstaerke: 9, status: "Gemeldet" },
  { mannschaft: "Mixed 1", verein: "TuS Göttingen", liga: "Kreisliga Göttingen", spielklasse: "Kreisliga", kaderstaerke: 14, status: "Bestätigt" },
  { mannschaft: "Damen 1", verein: "TuS Göttingen", liga: "Kreisliga Göttingen", spielklasse: "Kreisliga", kaderstaerke: 8, status: "Bestätigt" },
  // Jugend
  { mannschaft: "U18 Herren", verein: "TSV Hannover", liga: "Jugendliga", spielklasse: "Jugend", kaderstaerke: 14, status: "Bestätigt" },
  { mannschaft: "U18 Damen", verein: "SVC Göttingen", liga: "Jugendliga", spielklasse: "Jugend", kaderstaerke: 12, status: "Bestätigt" },
  { mannschaft: "U16 Mixed", verein: "MTV Wolfsburg", liga: "Jugendliga", spielklasse: "Jugend", kaderstaerke: 15, status: "In Prüfung" },
  { mannschaft: "U18 Herren", verein: "VfR Bielefeld", liga: "Jugendliga", spielklasse: "Jugend", kaderstaerke: 11, status: "Gemeldet" },
];

const statusColor = { "Bestätigt": "green" as const, "In Prüfung": "orange" as const, "Gemeldet": "blue" as const, "Abgelehnt": "red" as const };

export default function AlleMannschaften({ onNavigate }: { onNavigate: (screen: string) => void }) {
  const [search, setSearch] = useState("");
  const [filterSpielklasse, setFilterSpielklasse] = useState("Alle");
  const [filterLiga, setFilterLiga] = useState("Alle");
  const [filterStatus, setFilterStatus] = useState("Alle");
  const [detailTab, setDetailTab] = useState<"info" | "einsaetze">("info");

  const ligas = [...new Set(teams.map(t => t.liga))];

  const filtered = teams.filter(t => {
    if (search && !t.mannschaft.toLowerCase().includes(search.toLowerCase()) && !t.verein.toLowerCase().includes(search.toLowerCase())) return false;
    if (filterSpielklasse !== "Alle" && t.spielklasse !== filterSpielklasse) return false;
    if (filterLiga !== "Alle" && t.liga !== filterLiga) return false;
    if (filterStatus !== "Alle" && t.status !== filterStatus) return false;
    return true;
  });

  const confirmed = teams.filter(t => t.status === "Bestätigt").length;
  const pending = teams.filter(t => t.status === "In Prüfung" || t.status === "Gemeldet").length;

  return (
    <div className="animate-fadeIn">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-[22px] font-bold mb-1">Alle Mannschaften</h1>
          <p className="text-[13px] text-text-muted">{teams.length} Mannschaften · {confirmed} bestätigt · {pending} ausstehend</p>
        </div>
        <ExportDropdown formats={["CSV", "PDF"]} />
      </div>

      {/* Filters – single row, compact chips */}
      <div className="flex gap-2 items-center mb-5" style={{ flexWrap: "nowrap" }}>
        <div className="relative" style={{ flex: "0 1 220px", minWidth: 160 }}>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Team oder Verein suchen..." className="!pl-9" style={{ width: "100%" }} />
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
        </div>
        <div style={{ width: 1, height: 20, background: "#e8e5f0", flexShrink: 0 }} />
        <select value={filterSpielklasse} onChange={e => setFilterSpielklasse(e.target.value)} style={{ width: "auto", padding: "5px 28px 5px 10px", borderRadius: 99, fontSize: 12, fontWeight: filterSpielklasse !== "Alle" ? 600 : 400, background: filterSpielklasse !== "Alle" ? "rgba(124,58,237,0.06)" : "#fff", color: filterSpielklasse !== "Alle" ? "#7c3aed" : "#475569", borderColor: filterSpielklasse !== "Alle" ? "rgba(124,58,237,0.18)" : "#e8e5f0" }}>
          <option value="Alle">Spielklasse</option>
          <option>Verbandsliga</option>
          <option>Bezirksliga</option>
          <option>Kreisliga</option>
          <option>Jugend</option>
        </select>
        <select value={filterLiga} onChange={e => setFilterLiga(e.target.value)} style={{ width: "auto", padding: "5px 28px 5px 10px", borderRadius: 99, fontSize: 12, fontWeight: filterLiga !== "Alle" ? 600 : 400, background: filterLiga !== "Alle" ? "rgba(124,58,237,0.06)" : "#fff", color: filterLiga !== "Alle" ? "#7c3aed" : "#475569", borderColor: filterLiga !== "Alle" ? "rgba(124,58,237,0.18)" : "#e8e5f0" }}>
          <option value="Alle">Liga</option>
          {ligas.map(l => <option key={l}>{l}</option>)}
        </select>
        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} style={{ width: "auto", padding: "5px 28px 5px 10px", borderRadius: 99, fontSize: 12, fontWeight: filterStatus !== "Alle" ? 600 : 400, background: filterStatus !== "Alle" ? "rgba(124,58,237,0.06)" : "#fff", color: filterStatus !== "Alle" ? "#7c3aed" : "#475569", borderColor: filterStatus !== "Alle" ? "rgba(124,58,237,0.18)" : "#e8e5f0" }}>
          <option value="Alle">Status</option>
          <option>Bestätigt</option>
          <option>In Prüfung</option>
          <option>Gemeldet</option>
          <option>Abgelehnt</option>
        </select>
        {(search || filterSpielklasse !== "Alle" || filterLiga !== "Alle" || filterStatus !== "Alle") && (
          <Button variant="ghost" size="sm" onClick={() => { setSearch(""); setFilterSpielklasse("Alle"); setFilterLiga("Alle"); setFilterStatus("Alle"); }}>Zurücksetzen</Button>
        )}
      </div>

      {/* Table */}
      <Card noPadding className="overflow-hidden">
        <table className="w-full border-collapse text-[13px]">
          <thead>
            <tr>
              {["Mannschaft", "Verein", "Liga", "Kader", "Status", ""].map(h => (
                <th key={h} className="text-[11px] font-semibold text-text-muted uppercase tracking-wide px-3.5 py-2.5 text-left border-b border-border">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((t, i) => (
              <tr key={i} className="hover:bg-s2 transition-colors">
                <td className="px-3.5 py-3 border-b border-border font-semibold">{t.mannschaft}</td>
                <td className="px-3.5 py-3 border-b border-border">{t.verein}</td>
                <td className="px-3.5 py-3 border-b border-border"><span className="text-[11px] bg-s2 px-2 py-0.5 rounded text-text-muted">{t.liga}</span></td>
                <td className="px-3.5 py-3 border-b border-border font-bold">{t.kaderstaerke || "–"}</td>
                <td className="px-3.5 py-3 border-b border-border"><Badge color={statusColor[t.status]}>{t.status}</Badge></td>
                <td className="px-3.5 py-3 border-b border-border">
                  <Button variant="ghost" size="sm" onClick={() => onNavigate(`team-detail:${encodeURIComponent(t.verein + ' – ' + t.mannschaft)}`)}>Details</Button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={6} className="px-3.5 py-8 text-center text-text-muted">Keine Mannschaften gefunden.</td></tr>
            )}
          </tbody>
        </table>
      </Card>

      {/* Team detail opens as full page via onNavigate */}
    </div>
  );
}
