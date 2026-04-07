"use client";

import { useState } from "react";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";

interface Kurs {
  id: string;
  name: string;
  zielgruppe: string;
  lizenztyp: string;
  dauer: string;
  kosten: string;
  naechsterTermin: string;
  freiePlaetze: number;
  maxPlaetze: number;
  status: "buchbar" | "fast-voll" | "ausgebucht" | "abgelaufen";
  ort: string;
  format: "praesenz" | "online" | "hybrid";
}

const KURSE: Kurs[] = [
  { id: "K-001", name: "Trainer C-Lizenz Halle", zielgruppe: "Trainer", lizenztyp: "C-Lizenz", dauer: "120 LE", kosten: "€ 380", naechsterTermin: "20.04.2026", freiePlaetze: 8, maxPlaetze: 24, status: "buchbar", ort: "Frankfurt", format: "praesenz" },
  { id: "K-002", name: "Trainer B-Lizenz Halle", zielgruppe: "Trainer", lizenztyp: "B-Lizenz", dauer: "60 LE", kosten: "€ 520", naechsterTermin: "15.05.2026", freiePlaetze: 2, maxPlaetze: 20, status: "fast-voll", ort: "Berlin", format: "praesenz" },
  { id: "K-003", name: "SR-Lizenz Regional", zielgruppe: "Schiedsrichter", lizenztyp: "SR Regional", dauer: "32 LE", kosten: "€ 150", naechsterTermin: "10.04.2026", freiePlaetze: 0, maxPlaetze: 30, status: "ausgebucht", ort: "Hannover", format: "hybrid" },
  { id: "K-004", name: "SR-Fortbildung Bundesliga", zielgruppe: "Schiedsrichter", lizenztyp: "SR Bundesliga", dauer: "16 LE", kosten: "€ 80", naechsterTermin: "25.04.2026", freiePlaetze: 12, maxPlaetze: 20, status: "buchbar", ort: "Online", format: "online" },
  { id: "K-005", name: "Beach-Trainer Grundlehrgang", zielgruppe: "Trainer", lizenztyp: "Beach-Trainer", dauer: "40 LE", kosten: "€ 280", naechsterTermin: "01.06.2026", freiePlaetze: 15, maxPlaetze: 20, status: "buchbar", ort: "Timmendorfer Strand", format: "praesenz" },
  { id: "K-006", name: "Trainer A-Lizenz Halle", zielgruppe: "Trainer", lizenztyp: "A-Lizenz", dauer: "90 LE", kosten: "€ 850", naechsterTermin: "—", freiePlaetze: 0, maxPlaetze: 16, status: "abgelaufen", ort: "—", format: "praesenz" },
];

const statusColors: Record<string, "green" | "orange" | "red" | "gray"> = {
  buchbar: "green", "fast-voll": "orange", ausgebucht: "red", abgelaufen: "gray",
};
const statusLabels: Record<string, string> = {
  buchbar: "Buchbar", "fast-voll": "Fast voll", ausgebucht: "Ausgebucht", abgelaufen: "Abgelaufen",
};
const formatLabels: Record<string, string> = { praesenz: "Präsenz", online: "Online", hybrid: "Hybrid" };

export default function Lehrgaenge() {
  const [filterZielgruppe, setFilterZielgruppe] = useState("");
  const [filterFormat, setFilterFormat] = useState("");

  const filtered = KURSE.filter(k => {
    if (filterZielgruppe && k.zielgruppe !== filterZielgruppe) return false;
    if (filterFormat && k.format !== filterFormat) return false;
    return true;
  });

  return (
    <div className="animate-fadeIn">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="text-[22px] font-bold mb-1">Lehrgänge & Aus-/Fortbildung</h1>
          <p className="text-[13px] text-text-muted">{KURSE.length} Lehrgänge im Katalog</p>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost"><Icon name="refresh" size={14} /> DOSB-LiMS Sync</Button>
          <Button>+ Lehrgang erstellen</Button>
        </div>
      </div>

      {/* Recommended */}
      <Card className="!mb-4 border-l-4 border-l-accent">
        <div className="flex items-center gap-3">
          <Icon name="star" size={18} className="text-accent" />
          <div>
            <div className="font-semibold text-[13px]">Empfohlen: Trainer B-Lizenz Halle</div>
            <div className="text-[11px] text-text-muted">Nächste Stufe basierend auf Ihren aktuellen Lizenzen</div>
          </div>
          <Button size="sm" className="ml-auto">Anmelden</Button>
        </div>
      </Card>

      <Card className="!mb-4 !p-3">
        <div className="flex gap-3 flex-wrap">
          <input className="!w-64" placeholder="Lehrgang suchen..." />
          <select className="!w-36" value={filterZielgruppe} onChange={(e) => setFilterZielgruppe(e.target.value)}>
            <option value="">Alle Zielgruppen</option>
            <option value="Trainer">Trainer</option>
            <option value="Schiedsrichter">Schiedsrichter</option>
          </select>
          <select className="!w-36" value={filterFormat} onChange={(e) => setFilterFormat(e.target.value)}>
            <option value="">Alle Formate</option>
            <option value="praesenz">Präsenz</option>
            <option value="online">Online</option>
            <option value="hybrid">Hybrid</option>
          </select>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(k => (
          <Card key={k.id} borderColor={k.status === "buchbar" ? "border-l-green" : k.status === "fast-voll" ? "border-l-orange" : k.status === "ausgebucht" ? "border-l-red" : "border-l-gray"} className="!mb-0 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <Badge color={statusColors[k.status]}>{statusLabels[k.status]}</Badge>
              <Badge color="purple">{formatLabels[k.format]}</Badge>
            </div>
            <h3 className="font-bold text-[14px] mb-1">{k.name}</h3>
            <div className="text-[12px] text-text-muted mb-3">{k.zielgruppe} · {k.lizenztyp}</div>
            <div className="space-y-2 text-[12px]">
              <div className="flex justify-between"><span className="text-text-muted">Dauer</span><span>{k.dauer}</span></div>
              <div className="flex justify-between"><span className="text-text-muted">Kosten</span><span className="font-semibold">{k.kosten}</span></div>
              <div className="flex justify-between"><span className="text-text-muted">Nächster Termin</span><span>{k.naechsterTermin}</span></div>
              <div className="flex justify-between"><span className="text-text-muted">Ort</span><span>{k.ort}</span></div>
              {k.status !== "abgelaufen" && (
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 bg-s2 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${k.freiePlaetze === 0 ? "bg-red" : k.freiePlaetze < 5 ? "bg-orange" : "bg-green"}`} style={{ width: `${((k.maxPlaetze - k.freiePlaetze) / k.maxPlaetze) * 100}%` }} />
                  </div>
                  <span className="text-[11px] text-text-muted">{k.freiePlaetze}/{k.maxPlaetze} frei</span>
                </div>
              )}
            </div>
            <div className="mt-3">
              {k.status === "buchbar" || k.status === "fast-voll" ? (
                <Button size="sm" className="w-full">Anmelden</Button>
              ) : k.status === "ausgebucht" ? (
                <Button size="sm" variant="warning" className="w-full">Warteliste</Button>
              ) : (
                <Button size="sm" variant="ghost" className="w-full" disabled>Nicht verfügbar</Button>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
