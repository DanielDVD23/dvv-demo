"use client";

import { useState } from "react";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import HelperTooltip from "@/components/ui/HelperTooltip";
import ClubLogo from "@/components/ui/ClubLogo";

interface Spielstaette {
  id: string;
  name: string;
  ort: string;
  typ: "halle" | "beach";
  spielklassen: string[];
  vereine: string[];
  groesse: string;
  plaetze: number;
  adresse: string;
  status: "aktiv" | "gesperrt" | "renovierung";
}

const SPIELSTAETTEN: Spielstaette[] = [
  { id: "SS-001", name: "Max-Schmeling-Halle", ort: "Berlin", typ: "halle", spielklassen: ["1. Bundesliga", "2. Bundesliga"], vereine: ["BR Volleys"], groesse: "60×30m", plaetze: 8500, adresse: "Am Falkplatz 1, 10437 Berlin", status: "aktiv" },
  { id: "SS-002", name: "Sporthalle Am Maschsee", ort: "Hannover", typ: "halle", spielklassen: ["Verbandsliga", "Bezirksliga"], vereine: ["TSV Hannover", "SC Hannover 96"], groesse: "44×22m", plaetze: 1200, adresse: "Maschstr. 18, 30169 Hannover", status: "aktiv" },
  { id: "SS-003", name: "Margon Arena", ort: "Dresden", typ: "halle", spielklassen: ["1. Bundesliga"], vereine: ["DSC 1898 Volleyball"], groesse: "55×28m", plaetze: 3200, adresse: "Bodenbacher Str. 154, 01277 Dresden", status: "aktiv" },
  { id: "SS-004", name: "Timmendorfer Strand", ort: "Timmendorfer Strand", typ: "beach", spielklassen: ["DVV Beach-Tour"], vereine: [], groesse: "3 Courts", plaetze: 5000, adresse: "Strandpromenade, 23669 Timmendorfer Strand", status: "aktiv" },
  { id: "SS-005", name: "Kurt-Ritter-Sporthalle", ort: "Giesen", typ: "halle", spielklassen: ["1. Bundesliga"], vereine: ["Grizzlys Giesen"], groesse: "48×24m", plaetze: 1800, adresse: "Industriestr. 2, 31180 Giesen", status: "aktiv" },
  { id: "SS-006", name: "ratiopharm arena", ort: "Neu-Ulm", typ: "halle", spielklassen: ["1. Bundesliga", "Champions League"], vereine: ["VfB Friedrichshafen"], groesse: "52×27m", plaetze: 4000, adresse: "Europastr. 25, 89231 Neu-Ulm", status: "aktiv" },
  { id: "SS-007", name: "Sporthalle Charlottenburg", ort: "Berlin", typ: "halle", spielklassen: ["Regionalliga", "Verbandsliga"], vereine: ["VC Olympia Berlin", "PSV Berlin"], groesse: "42×21m", plaetze: 800, adresse: "Sömmeringstr. 29, 10589 Berlin", status: "aktiv" },
  { id: "SS-008", name: "Gerry Weber Stadion", ort: "Halle (Westf.)", typ: "halle", spielklassen: ["Supercup", "Pokalfinale"], vereine: [], groesse: "68×40m", plaetze: 12300, adresse: "Roger-Federer-Allee 1, 33790 Halle", status: "aktiv" },
  { id: "SS-009", name: "Beachanlage Am Tempelhofer Feld", ort: "Berlin", typ: "beach", spielklassen: ["DVV Beach-Tour", "Landesmeisterschaft"], vereine: ["Beach Berlin e.V."], groesse: "6 Courts", plaetze: 2000, adresse: "Columbiadamm 160, 10965 Berlin", status: "aktiv" },
  { id: "SS-010", name: "Sporthalle Wandsbek", ort: "Hamburg", typ: "halle", spielklassen: ["2. Bundesliga", "Regionalliga"], vereine: ["VT Hamburg"], groesse: "45×23m", plaetze: 1500, adresse: "Lesserstr. 131, 22049 Hamburg", status: "renovierung" },
  { id: "SS-011", name: "Ballsporthalle Frankfurt", ort: "Frankfurt am Main", typ: "halle", spielklassen: ["1. Bundesliga"], vereine: ["United Volleys Frankfurt"], groesse: "50×26m", plaetze: 5000, adresse: "Ginnheimer Landstr. 39, 60487 Frankfurt", status: "aktiv" },
  { id: "SS-012", name: "Beach Center Düsseldorf", ort: "Düsseldorf", typ: "beach", spielklassen: ["DVV Beach-Tour"], vereine: ["BV Düsseldorf"], groesse: "4 Courts", plaetze: 1500, adresse: "Am Staad 25, 40474 Düsseldorf", status: "gesperrt" },
];

const statusColors: Record<string, "green" | "red" | "orange"> = {
  aktiv: "green", gesperrt: "red", renovierung: "orange",
};
const statusLabels: Record<string, string> = {
  aktiv: "Aktiv", gesperrt: "Gesperrt", renovierung: "Renovierung",
};

export default function Spielstaetten() {
  const [viewMode, setViewMode] = useState<"cards" | "list">("cards");
  const [filterTyp, setFilterTyp] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterOrt, setFilterOrt] = useState("");
  const [search, setSearch] = useState("");

  const filtered = SPIELSTAETTEN.filter(s => {
    if (search && !s.name.toLowerCase().includes(search.toLowerCase()) && !s.ort.toLowerCase().includes(search.toLowerCase())) return false;
    if (filterTyp && s.typ !== filterTyp) return false;
    if (filterStatus && s.status !== filterStatus) return false;
    if (filterOrt && s.ort !== filterOrt) return false;
    return true;
  });

  const orte = [...new Set(SPIELSTAETTEN.map(s => s.ort))].sort();

  const hallenCount = SPIELSTAETTEN.filter(s => s.typ === "halle").length;
  const beachCount = SPIELSTAETTEN.filter(s => s.typ === "beach").length;

  return (
    <div className="animate-fadeIn">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="text-[22px] font-bold mb-1">Spielstätten</h1>
          <p className="text-[13px] text-text-muted">{SPIELSTAETTEN.length} Spielstätten registriert · {hallenCount} Hallen · {beachCount} Beach</p>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost"><Icon name="bar-chart" size={14} /> Export</Button>
          <Button>+ Neue Spielstätte</Button>
        </div>
      </div>

      <Card className="!mb-4 !p-3">
        <div className="flex gap-3 flex-wrap items-center">
          <div className="relative">
            <Icon name="search" size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" />
            <input className="!w-64 !pl-8" placeholder="Name oder Ort suchen..." value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <div className="flex items-center gap-1">
            <select className="!w-36" value={filterTyp} onChange={(e) => setFilterTyp(e.target.value)}>
              <option value="">Alle Typen</option>
              <option value="halle">Halle</option>
              <option value="beach">Beach</option>
            </select>
            <HelperTooltip title="Hallentyp" body="Halle = Indoor-Spielstätten. Beach = Outdoor-Sandplätze für Beach-Volleyball." />
          </div>
          <select className="!w-40" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            <option value="">Alle Status</option>
            <option value="aktiv">Aktiv</option>
            <option value="gesperrt">Gesperrt</option>
            <option value="renovierung">Renovierung</option>
          </select>
          <select className="!w-44" value={filterOrt} onChange={(e) => setFilterOrt(e.target.value)}>
            <option value="">Alle Orte</option>
            {orte.map(o => <option key={o} value={o}>{o}</option>)}
          </select>
          {(filterTyp || filterStatus || filterOrt || search) && (
            <button className="text-[12px] text-accent hover:underline cursor-pointer bg-transparent border-0" onClick={() => { setFilterTyp(""); setFilterStatus(""); setFilterOrt(""); setSearch(""); }}>
              Filter zurücksetzen
            </button>
          )}
          <div className="ml-auto flex gap-1">
            <button className={`w-8 h-8 rounded-[6px] flex items-center justify-center cursor-pointer border transition-colors ${viewMode === "cards" ? "bg-accent-dim border-accent text-accent" : "bg-transparent border-border text-text-muted hover:text-accent"}`} onClick={() => setViewMode("cards")} title="Kachelansicht">
              <Icon name="grid" size={14} />
            </button>
            <button className={`w-8 h-8 rounded-[6px] flex items-center justify-center cursor-pointer border transition-colors ${viewMode === "list" ? "bg-accent-dim border-accent text-accent" : "bg-transparent border-border text-text-muted hover:text-accent"}`} onClick={() => setViewMode("list")} title="Listenansicht">
              <Icon name="list" size={14} />
            </button>
          </div>
        </div>
      </Card>

      {viewMode === "cards" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(s => (
            <Card key={s.id} borderColor={s.typ === "halle" ? "border-l-blue" : "border-l-orange"} className="!mb-0 hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-lg bg-s2 flex items-center justify-center">
                  <Icon name={s.typ === "halle" ? "building" : "volleyball"} size={20} className="text-text-muted" />
                </div>
                <div className="flex gap-1.5">
                  <Badge color={statusColors[s.status]}>{statusLabels[s.status]}</Badge>
                  <Badge color={s.typ === "halle" ? "blue" : "orange"}>{s.typ === "halle" ? "Halle" : "Beach"}</Badge>
                </div>
              </div>
              <h3 className="font-bold text-[14px] mb-1">{s.name}</h3>
              <div className="text-[12px] text-text-muted mb-3">{s.ort} · {s.id}</div>
              <div className="space-y-2 text-[12px]">
                <div className="flex justify-between"><span className="text-text-muted">Adresse</span><span className="text-right max-w-[60%] truncate">{s.adresse}</span></div>
                <div className="flex justify-between"><span className="text-text-muted">Größe</span><span>{s.groesse}</span></div>
                <div className="flex justify-between"><span className="text-text-muted">Kapazität</span><span>{s.plaetze.toLocaleString("de-DE")} Plätze</span></div>
              </div>
              <div className="flex gap-1 flex-wrap mt-3">
                {s.spielklassen.map(k => <Badge key={k} color="purple">{k}</Badge>)}
              </div>
              {s.vereine.length > 0 && (
                <div className="mt-2 text-[12px] text-text-muted flex items-center gap-1.5">
                  {s.vereine.map(v => <ClubLogo key={v} name={v} size={18} />)}
                  {s.vereine.length === 1 ? s.vereine[0] : `${s.vereine.length} Vereine`}
                </div>
              )}
            </Card>
          ))}
        </div>
      ) : (
        <Card className="!mb-0 !p-0 overflow-hidden">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="border-b border-border bg-s2">
                <th className="text-left px-4 py-3 font-semibold text-text-muted">Name</th>
                <th className="text-left px-4 py-3 font-semibold text-text-muted">Ort</th>
                <th className="text-left px-4 py-3 font-semibold text-text-muted hidden md:table-cell">Typ</th>
                <th className="text-left px-4 py-3 font-semibold text-text-muted hidden lg:table-cell">Größe</th>
                <th className="text-right px-4 py-3 font-semibold text-text-muted hidden md:table-cell">Kapazität</th>
                <th className="text-left px-4 py-3 font-semibold text-text-muted hidden lg:table-cell">Spielklassen</th>
                <th className="text-left px-4 py-3 font-semibold text-text-muted">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(s => (
                <tr key={s.id} className="border-b border-border last:border-0 hover:bg-s2/50 cursor-pointer transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-md bg-s2 flex items-center justify-center shrink-0">
                        <Icon name={s.typ === "halle" ? "building" : "volleyball"} size={14} className="text-text-muted" />
                      </div>
                      <div>
                        <div className="font-semibold">{s.name}</div>
                        <div className="text-[11px] text-text-muted">{s.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-text-muted">{s.ort}</td>
                  <td className="px-4 py-3 hidden md:table-cell"><Badge color={s.typ === "halle" ? "blue" : "orange"}>{s.typ === "halle" ? "Halle" : "Beach"}</Badge></td>
                  <td className="px-4 py-3 text-text-muted hidden lg:table-cell">{s.groesse}</td>
                  <td className="px-4 py-3 text-right hidden md:table-cell">{s.plaetze.toLocaleString("de-DE")}</td>
                  <td className="px-4 py-3 hidden lg:table-cell">
                    <div className="flex gap-1 flex-wrap">
                      {s.spielklassen.map(k => <Badge key={k} color="purple">{k}</Badge>)}
                    </div>
                  </td>
                  <td className="px-4 py-3"><Badge color={statusColors[s.status]}>{statusLabels[s.status]}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="text-center py-12 text-text-muted text-[13px]">Keine Spielstätten gefunden</div>
          )}
        </Card>
      )}

      <div className="mt-3 text-[12px] text-text-muted text-right">{filtered.length} von {SPIELSTAETTEN.length} Spielstätten</div>
    </div>
  );
}
