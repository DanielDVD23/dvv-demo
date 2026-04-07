"use client";

import { useState } from "react";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";

interface Spielstaette {
  id: string;
  name: string;
  ort: string;
  typ: "halle" | "beach";
  spielklassen: string[];
  vereine: string[];
  groesse: string;
  plaetze: number;
}

const SPIELSTAETTEN: Spielstaette[] = [
  { id: "SS-001", name: "Max-Schmeling-Halle", ort: "Berlin", typ: "halle", spielklassen: ["1. Bundesliga", "2. Bundesliga"], vereine: ["BR Volleys"], groesse: "60×30m", plaetze: 8500 },
  { id: "SS-002", name: "Sporthalle Am Maschsee", ort: "Hannover", typ: "halle", spielklassen: ["Verbandsliga", "Bezirksliga"], vereine: ["TSV Hannover", "SC Hannover 96"], groesse: "44×22m", plaetze: 1200 },
  { id: "SS-003", name: "Margon Arena", ort: "Dresden", typ: "halle", spielklassen: ["1. Bundesliga"], vereine: ["DSC 1898 Volleyball"], groesse: "55×28m", plaetze: 3200 },
  { id: "SS-004", name: "Timmendorfer Strand", ort: "Timmendorfer Strand", typ: "beach", spielklassen: ["DVV Beach-Tour"], vereine: [], groesse: "3 Courts", plaetze: 5000 },
  { id: "SS-005", name: "Kurt-Ritter-Sporthalle", ort: "Giesen", typ: "halle", spielklassen: ["1. Bundesliga"], vereine: ["Grizzlys Giesen"], groesse: "48×24m", plaetze: 1800 },
  { id: "SS-006", name: "ratiopharm arena", ort: "Neu-Ulm", typ: "halle", spielklassen: ["1. Bundesliga", "Champions League"], vereine: ["VfB Friedrichshafen"], groesse: "52×27m", plaetze: 4000 },
];

export default function Spielstaetten() {
  const [viewMode, setViewMode] = useState<"cards" | "list">("cards");
  const [filterTyp, setFilterTyp] = useState("");
  const [search, setSearch] = useState("");

  const filtered = SPIELSTAETTEN.filter(s => {
    if (search && !s.name.toLowerCase().includes(search.toLowerCase())) return false;
    if (filterTyp && s.typ !== filterTyp) return false;
    return true;
  });

  return (
    <div className="animate-fadeIn">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="text-[22px] font-bold mb-1">Spielstätten</h1>
          <p className="text-[13px] text-text-muted">{SPIELSTAETTEN.length} Spielstätten registriert</p>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost"><Icon name="bar-chart" size={14} /> Export</Button>
          <Button>+ Neue Spielstätte</Button>
        </div>
      </div>

      <Card className="!mb-4 !p-3">
        <div className="flex gap-3 flex-wrap items-center">
          <input className="!w-64" placeholder="Spielstätte suchen..." value={search} onChange={(e) => setSearch(e.target.value)} />
          <select className="!w-36" value={filterTyp} onChange={(e) => setFilterTyp(e.target.value)}>
            <option value="">Alle Typen</option>
            <option value="halle">Halle</option>
            <option value="beach">Beach</option>
          </select>
          <div className="ml-auto flex gap-1">
            <button className={`w-8 h-8 rounded-[6px] flex items-center justify-center cursor-pointer border ${viewMode === "cards" ? "bg-accent-dim border-accent text-accent" : "bg-transparent border-border text-text-muted"}`} onClick={() => setViewMode("cards")}>
              <Icon name="grid" size={14} />
            </button>
            <button className={`w-8 h-8 rounded-[6px] flex items-center justify-center cursor-pointer border ${viewMode === "list" ? "bg-accent-dim border-accent text-accent" : "bg-transparent border-border text-text-muted"}`} onClick={() => setViewMode("list")}>
              <Icon name="list" size={14} />
            </button>
          </div>
        </div>
      </Card>

      {/* Map placeholder */}
      <Card className="!mb-4 !p-0 overflow-hidden">
        <div className="h-48 bg-s2 flex items-center justify-center">
          <div className="text-center">
            <Icon name="map" size={32} className="text-text-muted mx-auto mb-2" />
            <div className="text-[13px] text-text-muted">Google Maps Integration</div>
            <div className="text-[11px] text-text-dim">{filtered.length} Standorte auf der Karte</div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(s => (
          <Card key={s.id} borderColor={s.typ === "halle" ? "border-l-blue" : "border-l-orange"} className="!mb-0 hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 rounded-lg bg-s2 flex items-center justify-center">
                <Icon name={s.typ === "halle" ? "building" : "volleyball"} size={20} className="text-text-muted" />
              </div>
              <Badge color={s.typ === "halle" ? "blue" : "orange"}>{s.typ === "halle" ? "Halle" : "Beach"}</Badge>
            </div>
            <h3 className="font-bold text-[14px] mb-1">{s.name}</h3>
            <div className="text-[12px] text-text-muted mb-3">{s.ort} · {s.id}</div>
            <div className="space-y-2 text-[12px]">
              <div className="flex justify-between"><span className="text-text-muted">Größe</span><span>{s.groesse}</span></div>
              <div className="flex justify-between"><span className="text-text-muted">Kapazität</span><span>{s.plaetze.toLocaleString("de-DE")} Plätze</span></div>
            </div>
            <div className="flex gap-1 flex-wrap mt-3">
              {s.spielklassen.map(k => <Badge key={k} color="purple">{k}</Badge>)}
            </div>
            {s.vereine.length > 1 && (
              <div className="mt-2">
                <Badge color="blue">{s.vereine.length} Vereine</Badge>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
