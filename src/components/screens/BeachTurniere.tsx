"use client";

import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";

const TURNIERE = [
  { name: "DVV Beach-Tour Timmendorf", datum: "15.–17.05.2026", ort: "Timmendorfer Strand", kategorie: "DVV Beach-Tour", teams: 32, status: "anmeldung" },
  { name: "DVV Beach-Tour St. Peter-Ording", datum: "22.–24.05.2026", ort: "St. Peter-Ording", kategorie: "DVV Beach-Tour", teams: 24, status: "planung" },
  { name: "Deutsche Meisterschaft Beach", datum: "28.–30.08.2026", ort: "Timmendorfer Strand", kategorie: "DM", teams: 16, status: "planung" },
  { name: "Beach-Cup NRW", datum: "10.–11.04.2026", ort: "Düsseldorf", kategorie: "Regional", teams: 48, status: "laufend" },
  { name: "U19 Beach DM", datum: "05.–07.07.2026", ort: "Berlin", kategorie: "Jugend-DM", teams: 24, status: "planung" },
];

const statusColors: Record<string, "green" | "blue" | "orange" | "gray"> = { laufend: "green", anmeldung: "blue", planung: "orange", abgeschlossen: "gray" };

export default function BeachTurniere() {
  return (
    <div className="animate-fadeIn">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="text-[22px] font-bold mb-1">Beach-Turniere</h1>
          <p className="text-[13px] text-text-muted">DVV Beach-Tour & Meisterschaften</p>
        </div>
        <Button>+ Turnier erstellen</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {TURNIERE.map((t, i) => (
          <Card key={i} borderColor={t.status === "laufend" ? "border-l-green" : t.status === "anmeldung" ? "border-l-blue" : "border-l-orange"} className="!mb-0 hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-start justify-between mb-3">
              <Badge color={statusColors[t.status]}>{t.status.charAt(0).toUpperCase() + t.status.slice(1)}</Badge>
              <Badge color="orange">{t.kategorie}</Badge>
            </div>
            <h3 className="font-bold text-[14px] mb-1">{t.name}</h3>
            <div className="space-y-2 text-[12px] mt-3">
              <div className="flex justify-between"><span className="text-text-muted">Datum</span><span>{t.datum}</span></div>
              <div className="flex justify-between"><span className="text-text-muted">Ort</span><span>{t.ort}</span></div>
              <div className="flex justify-between"><span className="text-text-muted">Teams</span><span className="font-semibold">{t.teams}</span></div>
            </div>
            <div className="mt-3 flex gap-2">
              <Button size="sm" variant="ghost">Details</Button>
              {t.status === "anmeldung" && <Button size="sm">Anmelden</Button>}
              {t.status === "laufend" && <Button size="sm">Live-Ergebnisse</Button>}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
