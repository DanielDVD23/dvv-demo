"use client";

import { useState } from "react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";

interface Spiel {
  id: string;
  mannschaft: string;
  gegner: string;
  datum: string;
  uhrzeit: string;
  halle: string;
  liga: string;
  typ: "Heimspiel" | "Auswärts";
  nominierung: "OK" | "Offen" | "Unvollständig";
  ergebnis?: string;
}

const spiele: Spiel[] = [
  { id: "s1", mannschaft: "Herren 1", gegner: "SVC Göttingen", datum: "Sa, 29.03.2026", uhrzeit: "16:00", halle: "Sporthalle Am Maschsee", liga: "Verbandsliga Nord", typ: "Heimspiel", nominierung: "OK" },
  { id: "s2", mannschaft: "Damen 1", gegner: "MTV Braunschweig", datum: "Sa, 29.03.2026", uhrzeit: "14:00", halle: "Tunica-Halle Braunschweig", liga: "Verbandsliga Nord", typ: "Auswärts", nominierung: "OK" },
  { id: "s3", mannschaft: "Herren 2", gegner: "VfR Bielefeld", datum: "So, 30.03.2026", uhrzeit: "15:00", halle: "Sporthalle Am Maschsee", liga: "Bezirksliga", typ: "Heimspiel", nominierung: "Offen" },
  { id: "s4", mannschaft: "Herren 1", gegner: "SC Paderborn", datum: "Sa, 05.04.2026", uhrzeit: "18:00", halle: "Ahorn-Sportpark Paderborn", liga: "Verbandsliga Nord", typ: "Auswärts", nominierung: "Unvollständig" },
  { id: "s5", mannschaft: "Damen 1", gegner: "TV Hildesheim", datum: "Sa, 05.04.2026", uhrzeit: "16:00", halle: "Sporthalle Am Maschsee", liga: "Verbandsliga Nord", typ: "Heimspiel", nominierung: "Offen" },
  { id: "s6", mannschaft: "U18 Herren", gegner: "SVC Göttingen U18", datum: "So, 06.04.2026", uhrzeit: "11:00", halle: "Turnhalle Bothfeld", liga: "Jugendliga", typ: "Heimspiel", nominierung: "Offen" },
];

const vergangene: (Spiel & { ergebnis: string })[] = [
  { id: "v1", mannschaft: "Herren 1", gegner: "MTV Wolfsburg", datum: "Sa, 22.03.2026", uhrzeit: "16:00", halle: "Sporthalle Am Maschsee", liga: "Verbandsliga Nord", typ: "Heimspiel", nominierung: "OK", ergebnis: "3:1" },
  { id: "v2", mannschaft: "Damen 1", gegner: "SVC Göttingen", datum: "Sa, 22.03.2026", uhrzeit: "14:00", halle: "Jahnhalle Göttingen", liga: "Verbandsliga Nord", typ: "Auswärts", nominierung: "OK", ergebnis: "2:3" },
  { id: "v3", mannschaft: "Herren 2", gegner: "SG Münster", datum: "So, 23.03.2026", uhrzeit: "15:00", halle: "Sporthalle Am Maschsee", liga: "Bezirksliga", typ: "Heimspiel", nominierung: "OK", ergebnis: "3:0" },
];

const nomColor = { OK: "green" as const, Offen: "orange" as const, Unvollständig: "red" as const };
const typColor = { Heimspiel: "green" as const, Auswärts: "blue" as const };

export default function Spielplan({ onNavigate }: { onNavigate?: (screen: string) => void }) {
  const [tab, setTab] = useState<"kommend" | "vergangen">("kommend");

  const offeneNominierungen = spiele.filter(s => s.nominierung !== "OK").length;

  return (
    <div className="animate-fadeIn">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-[22px] font-bold mb-1">Spielplan</h1>
          <p className="text-[13px] text-text-muted">TSV Hannover · Saison 2025/26 · {spiele.length} anstehende Spiele</p>
        </div>
      </div>

      {/* Warning if nominations are open */}
      {offeneNominierungen > 0 && (
        <div className="flex items-center gap-2 bg-orange-dim border border-[rgba(245,158,11,0.3)] rounded-[6px] px-4 py-2.5 mb-5 text-[13px] text-orange">
          <Icon name="warning" size={14} /> {offeneNominierungen} {offeneNominierungen === 1 ? "Spiel" : "Spiele"} ohne vollständige Nominierung – bitte Aufstellung vor Spieltag melden.
        </div>
      )}

      {/* KPIs */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-5">
        <div className="bg-s1 border border-border rounded-[10px] p-4">
          <div className="text-[10px] font-semibold text-text-muted uppercase tracking-wide">Anstehend</div>
          <div className="text-[22px] font-bold text-accent mt-1">{spiele.length}</div>
        </div>
        <div className="bg-s1 border border-border rounded-[10px] p-4">
          <div className="text-[10px] font-semibold text-text-muted uppercase tracking-wide">Heimspiele</div>
          <div className="text-[22px] font-bold text-green mt-1">{spiele.filter(s => s.typ === "Heimspiel").length}</div>
        </div>
        <div className="bg-s1 border border-border rounded-[10px] p-4">
          <div className="text-[10px] font-semibold text-text-muted uppercase tracking-wide">Nominierung OK</div>
          <div className="text-[22px] font-bold text-green mt-1">{spiele.filter(s => s.nominierung === "OK").length}</div>
        </div>
        <div className="bg-s1 border border-border rounded-[10px] p-4">
          <div className="text-[10px] font-semibold text-text-muted uppercase tracking-wide">Nominierung offen</div>
          <div className="text-[22px] font-bold text-orange mt-1">{offeneNominierungen}</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-5">
        <Button variant={tab === "kommend" ? "primary" : "ghost"} size="sm" onClick={() => setTab("kommend")}>
          Anstehende Spiele
          <Badge color="purple">{spiele.length}</Badge>
        </Button>
        <Button variant={tab === "vergangen" ? "primary" : "ghost"} size="sm" onClick={() => setTab("vergangen")}>
          Vergangene Spiele
          <Badge color="gray">{vergangene.length}</Badge>
        </Button>
      </div>

      {/* Upcoming games */}
      {tab === "kommend" && (
        <div className="space-y-2">
          {spiele.map((s) => (
            <div
              key={s.id}
              className={`bg-s1 border border-border rounded-[10px] overflow-hidden border-l-[3px] ${s.typ === "Heimspiel" ? "border-l-green" : "border-l-blue"}`}
            >
              <div className="flex items-center gap-4 px-4 py-3.5">
                {/* Time + Date */}
                <div className="w-[100px] shrink-0">
                  <div className="text-[15px] font-bold text-accent">{s.uhrzeit}</div>
                  <div className="text-[11px] text-text-muted">{s.datum}</div>
                </div>

                {/* Match info */}
                <div className="flex-1 min-w-0">
                  <div className="text-[14px] font-semibold mb-0.5">
                    {s.mannschaft} vs. {s.gegner}
                  </div>
                  <div className="text-[11px] text-text-muted">
                    {s.liga} · {s.halle}
                  </div>
                </div>

                {/* Badges */}
                <div className="flex items-center gap-2 shrink-0">
                  <Badge color={typColor[s.typ]}>{s.typ}</Badge>
                  <Badge color={nomColor[s.nominierung]}>
                    {s.nominierung === "OK" && <Icon name="check" size={10} />}
                    {s.nominierung === "OK" ? "Nominiert" : s.nominierung === "Offen" ? "Nominierung offen" : "Unvollständig"}
                  </Badge>
                </div>

                {/* Action */}
                <Button
                  size="sm"
                  variant={s.nominierung === "OK" ? "ghost" : "primary"}
                  onClick={() => onNavigate?.("nominierung")}
                >
                  {s.nominierung === "OK" ? "Ansehen" : "→ Nominieren"}
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Past games */}
      {tab === "vergangen" && (
        <div className="bg-s1 border border-border rounded-[10px] overflow-hidden">
          <table className="w-full border-collapse text-[13px]">
            <thead>
              <tr>
                {["Datum", "Mannschaft", "Gegner", "Liga", "Ort", "Ergebnis"].map(h => (
                  <th key={h} className="text-[11px] font-semibold text-text-muted uppercase tracking-wide px-3.5 py-2.5 text-left border-b border-border">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {vergangene.map((s) => (
                <tr key={s.id} className="hover:bg-s2">
                  <td className="px-3.5 py-3 border-b border-border text-text-muted">{s.datum}</td>
                  <td className="px-3.5 py-3 border-b border-border font-semibold">{s.mannschaft}</td>
                  <td className="px-3.5 py-3 border-b border-border">{s.gegner}</td>
                  <td className="px-3.5 py-3 border-b border-border text-text-muted">{s.liga}</td>
                  <td className="px-3.5 py-3 border-b border-border"><Badge color={typColor[s.typ]}>{s.typ}</Badge></td>
                  <td className="px-3.5 py-3 border-b border-border font-bold">{s.ergebnis}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
