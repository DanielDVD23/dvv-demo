"use client";

import { useState } from "react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import SectionHeader from "@/components/ui/SectionHeader";

interface Veranstaltung {
  id: string;
  name: string;
  typ: "Turnier" | "Lehrgang" | "Versammlung" | "Fortbildung";
  datum: string;
  ort: string;
  teilnehmer: number;
  maxTeilnehmer: number;
  status: "Geplant" | "Anmeldung offen" | "Anmeldung geschlossen" | "Laufend" | "Abgeschlossen" | "Abgesagt";
  statusColor: "gray" | "green" | "orange" | "purple" | "blue" | "red";
}

const veranstaltungen: Veranstaltung[] = [
  { id: "V-001", name: "NWVV Beachvolleyball-Turnier Cuxhaven", typ: "Turnier", datum: "14.06.2026", ort: "Cuxhaven", teilnehmer: 24, maxTeilnehmer: 32, status: "Anmeldung offen", statusColor: "green" },
  { id: "V-002", name: "C-Trainer Ausbildung Volleyball", typ: "Lehrgang", datum: "05.04.2026", ort: "Hannover", teilnehmer: 18, maxTeilnehmer: 20, status: "Anmeldung offen", statusColor: "green" },
  { id: "V-003", name: "Schiedsrichter-Fortbildung Frühjahr", typ: "Fortbildung", datum: "22.03.2026", ort: "Online", teilnehmer: 45, maxTeilnehmer: 50, status: "Laufend", statusColor: "purple" },
  { id: "V-004", name: "NWVV Verbandstag 2026", typ: "Versammlung", datum: "15.03.2026", ort: "Osnabrück", teilnehmer: 120, maxTeilnehmer: 150, status: "Abgeschlossen", statusColor: "gray" },
  { id: "V-005", name: "Jugend-Hallenturnier Bezirk Hannover", typ: "Turnier", datum: "28.06.2026", ort: "Hannover", teilnehmer: 8, maxTeilnehmer: 16, status: "Anmeldung offen", statusColor: "green" },
  { id: "V-006", name: "B-Trainer Fortbildung Schwerpunkt Jugend", typ: "Fortbildung", datum: "12.07.2026", ort: "Göttingen", teilnehmer: 0, maxTeilnehmer: 25, status: "Geplant", statusColor: "gray" },
  { id: "V-007", name: "Beachvolleyball-Turnier Norddeich", typ: "Turnier", datum: "08.03.2026", ort: "Norddeich", teilnehmer: 32, maxTeilnehmer: 32, status: "Abgeschlossen", statusColor: "gray" },
  { id: "V-008", name: "Hallenturnier Wintercup Braunschweig", typ: "Turnier", datum: "01.02.2026", ort: "Braunschweig", teilnehmer: 16, maxTeilnehmer: 16, status: "Abgesagt", statusColor: "red" },
];

const typBadgeColor: Record<string, "purple" | "blue" | "orange" | "green"> = {
  Turnier: "purple",
  Lehrgang: "blue",
  Fortbildung: "orange",
  Versammlung: "green",
};

interface VeranstaltungenProps {
  onNavigate: (screen: string) => void;
}

export default function Veranstaltungen({ onNavigate }: VeranstaltungenProps) {
  const [filter, setFilter] = useState({ typ: "", status: "" });
  const [search, setSearch] = useState("");

  const filtered = veranstaltungen.filter(v => {
    const s = search.toLowerCase();
    const matchSearch = !search || v.name.toLowerCase().includes(s) || v.ort.toLowerCase().includes(s);
    return matchSearch && (!filter.typ || v.typ === filter.typ) && (!filter.status || v.status === filter.status);
  });

  const upcoming = filtered.filter(v => v.status !== "Abgeschlossen" && v.status !== "Abgesagt");
  const past = filtered.filter(v => v.status === "Abgeschlossen" || v.status === "Abgesagt");

  return (
    <div className="animate-fadeIn">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-[22px] font-bold mb-1">Veranstaltungen</h1>
          <p className="text-[13px] text-text-muted">{veranstaltungen.length} Veranstaltungen · Saison 2025/26</p>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm">Export</Button>
          <Button onClick={() => onNavigate("veranstaltung")}>+ Veranstaltung erstellen</Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2 items-center mb-4 flex-wrap">
        <div className="relative flex items-center">
          <svg className="absolute left-3 text-text-muted" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Veranstaltung suchen..." className="!pl-9 !w-[220px] text-xs" />
        </div>
        <select value={filter.typ} onChange={e => setFilter(p => ({ ...p, typ: e.target.value }))} className="!w-[140px] text-xs">
          <option value="">Alle Typen</option>
          <option>Turnier</option><option>Lehrgang</option><option>Fortbildung</option><option>Versammlung</option>
        </select>
        <select value={filter.status} onChange={e => setFilter(p => ({ ...p, status: e.target.value }))} className="!w-[160px] text-xs">
          <option value="">Alle Status</option>
          <option>Geplant</option><option>Anmeldung offen</option><option>Laufend</option><option>Abgeschlossen</option><option>Abgesagt</option>
        </select>
      </div>

      {/* Upcoming */}
      <SectionHeader title="Kommende Veranstaltungen" right={<Badge color="green">{upcoming.length} aktiv</Badge>} />
      <Card noPadding className="overflow-hidden mb-6">
        <table className="w-full border-collapse text-[13px]">
          <thead>
            <tr>
              {["Name", "Typ", "Datum", "Ort", "Teilnehmer", "Status", ""].map(h => (
                <th key={h} className="text-[11px] font-semibold text-text-muted uppercase tracking-wide px-3.5 py-2.5 text-left border-b border-border">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {upcoming.map(v => (
              <tr key={v.id} className="hover:bg-s2">
                <td className="px-3.5 py-3 border-b border-border"><strong>{v.name}</strong></td>
                <td className="px-3.5 py-3 border-b border-border"><Badge color={typBadgeColor[v.typ] || "gray"}>{v.typ}</Badge></td>
                <td className="px-3.5 py-3 border-b border-border">{v.datum}</td>
                <td className="px-3.5 py-3 border-b border-border">{v.ort}</td>
                <td className="px-3.5 py-3 border-b border-border"><span className="font-bold">{v.teilnehmer}</span><span className="text-text-muted">/{v.maxTeilnehmer}</span></td>
                <td className="px-3.5 py-3 border-b border-border"><Badge color={v.statusColor}>{v.status}</Badge></td>
                <td className="px-3.5 py-3 border-b border-border"><Button variant="ghost" size="sm">Details</Button></td>
              </tr>
            ))}
            {upcoming.length === 0 && <tr><td colSpan={7} className="px-3.5 py-8 text-center text-text-muted">Keine Veranstaltungen gefunden</td></tr>}
          </tbody>
        </table>
      </Card>

      {/* Past */}
      {past.length > 0 && (
        <>
          <SectionHeader title="Vergangene Veranstaltungen" right={<Badge color="gray">{past.length}</Badge>} />
          <Card noPadding className="overflow-hidden">
            <table className="w-full border-collapse text-[13px]">
              <thead>
                <tr>
                  {["Name", "Typ", "Datum", "Ort", "Teilnehmer", "Status"].map(h => (
                    <th key={h} className="text-[11px] font-semibold text-text-muted uppercase tracking-wide px-3.5 py-2.5 text-left border-b border-border">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {past.map(v => (
                  <tr key={v.id} className="hover:bg-s2 opacity-60">
                    <td className="px-3.5 py-3 border-b border-border">{v.name}</td>
                    <td className="px-3.5 py-3 border-b border-border"><Badge color={typBadgeColor[v.typ] || "gray"}>{v.typ}</Badge></td>
                    <td className="px-3.5 py-3 border-b border-border">{v.datum}</td>
                    <td className="px-3.5 py-3 border-b border-border">{v.ort}</td>
                    <td className="px-3.5 py-3 border-b border-border"><span className="font-bold">{v.teilnehmer}</span>/{v.maxTeilnehmer}</td>
                    <td className="px-3.5 py-3 border-b border-border"><Badge color={v.statusColor}>{v.status}</Badge></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </>
      )}
    </div>
  );
}
