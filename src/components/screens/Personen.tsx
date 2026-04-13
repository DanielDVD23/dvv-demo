"use client";

import { useState } from "react";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import ClubLogo from "@/components/ui/ClubLogo";

interface Person {
  id: string;
  name: string;
  dvvId: string;
  verein: string;
  rollen: string[];
  lizenzStatus: "aktiv" | "abgelaufen" | "beantragt" | "keine";
  letzteAenderung: string;
  foto?: string;
  geburtsdatum: string;
  minderjaehrig?: boolean;
}

const PERSONEN: Person[] = [
  { id: "1", name: "Lena Weber", dvvId: "DVV-2024-0812", verein: "TSV Hannover", rollen: ["Spielerin"], lizenzStatus: "aktiv", letzteAenderung: "05.04.2026", geburtsdatum: "12.05.2000" },
  { id: "2", name: "Dr. Thomas Müller", dvvId: "DVV-2019-0234", verein: "SWD powervolleys Düren", rollen: ["Trainer", "Schiedsrichter"], lizenzStatus: "aktiv", letzteAenderung: "01.04.2026", geburtsdatum: "03.11.1975" },
  { id: "3", name: "Anna Koch", dvvId: "DVV-2024-0813", verein: "TSV Hannover", rollen: ["Spielerin"], lizenzStatus: "aktiv", letzteAenderung: "28.03.2026", geburtsdatum: "23.08.1999" },
  { id: "4", name: "Michael Krause", dvvId: "DVV-2018-0567", verein: "Grizzlys Giesen", rollen: ["Trainer"], lizenzStatus: "abgelaufen", letzteAenderung: "15.03.2026", geburtsdatum: "17.06.1980" },
  { id: "5", name: "Sarah Braun", dvvId: "DVV-2024-0814", verein: "TSV Bayer 04 Leverkusen", rollen: ["Spielerin"], lizenzStatus: "aktiv", letzteAenderung: "10.03.2026", geburtsdatum: "07.01.2001" },
  { id: "6", name: "Felix Schmidt", dvvId: "DVV-2022-1045", verein: "—", rollen: ["Schiedsrichter"], lizenzStatus: "aktiv", letzteAenderung: "22.03.2026", geburtsdatum: "29.09.1992" },
  { id: "7", name: "Emma Richter", dvvId: "DVV-2025-0102", verein: "Alpenvolleys Haching", rollen: ["Spielerin", "Trainerin"], lizenzStatus: "beantragt", letzteAenderung: "04.04.2026", geburtsdatum: "14.02.1997" },
  { id: "8", name: "Jonas Becker", dvvId: "DVV-2026-0044", verein: "TSV Herrsching", rollen: ["Spieler"], lizenzStatus: "aktiv", letzteAenderung: "06.04.2026", geburtsdatum: "22.07.2009", minderjaehrig: true },
  { id: "9", name: "Marie Schulz", dvvId: "DVV-2024-0815", verein: "TSV Hannover", rollen: ["Spielerin"], lizenzStatus: "aktiv", letzteAenderung: "01.04.2026", geburtsdatum: "30.11.1998" },
  { id: "10", name: "Stefan Meier", dvvId: "DVV-2015-0890", verein: "DVV", rollen: ["Funktionär", "Staffelleiter"], lizenzStatus: "keine", letzteAenderung: "07.04.2026", geburtsdatum: "05.03.1968" },
];

const lizenzColors: Record<string, "green" | "red" | "orange" | "gray"> = {
  aktiv: "green", abgelaufen: "red", beantragt: "orange", keine: "gray",
};

export default function Personen() {
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState<"table" | "cards">("table");
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
  const [filterVerein, setFilterVerein] = useState("");
  const [filterRolle, setFilterRolle] = useState("");

  const filtered = PERSONEN.filter(p => {
    if (search && !p.name.toLowerCase().includes(search.toLowerCase()) && !p.dvvId.toLowerCase().includes(search.toLowerCase())) return false;
    if (filterVerein && p.verein !== filterVerein) return false;
    if (filterRolle && !p.rollen.some(r => r.toLowerCase().includes(filterRolle.toLowerCase()))) return false;
    return true;
  });

  const duplicateCount = 3;

  return (
    <div className="animate-fadeIn">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="text-[22px] font-bold mb-1">Personen-Verzeichnis</h1>
          <p className="text-[13px] text-text-muted">{PERSONEN.length} Personen registriert</p>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost"><Icon name="bar-chart" size={14} /> Export</Button>
          <Button>+ Person anlegen</Button>
        </div>
      </div>

      {/* Duplicate warning */}
      <div className="bg-orange-dim border border-[rgba(217,119,6,0.2)] rounded-[8px] px-4 py-3 mb-4 flex items-center gap-3">
        <Icon name="alert" size={18} className="text-orange shrink-0" />
        <span className="text-[13px] text-orange font-medium">{duplicateCount} mögliche Dubletten gefunden</span>
        <Button size="sm" variant="warning" className="ml-auto">Dubletten prüfen</Button>
      </div>

      {/* Filters */}
      <Card className="!mb-4 !p-3">
        <div className="flex gap-3 flex-wrap items-center">
          <input className="!w-64" placeholder="Name oder DVV-ID suchen..." value={search} onChange={(e) => setSearch(e.target.value)} />
          <select className="!w-44" value={filterVerein} onChange={(e) => setFilterVerein(e.target.value)}>
            <option value="">Alle Vereine</option>
            <option value="TSV Hannover">TSV Hannover</option>
            <option value="SWD powervolleys Düren">SWD powervolleys Düren</option>
            <option value="TSV Bayer 04 Leverkusen">TSV Bayer 04 Leverkusen</option>
            <option value="Grizzlys Giesen">Grizzlys Giesen</option>
          </select>
          <select className="!w-36" value={filterRolle} onChange={(e) => setFilterRolle(e.target.value)}>
            <option value="">Alle Rollen</option>
            <option value="Spieler">Spieler/in</option>
            <option value="Trainer">Trainer/in</option>
            <option value="Schiedsrichter">Schiedsrichter</option>
            <option value="Funktionär">Funktionär</option>
          </select>
          <div className="ml-auto flex gap-1">
            <button className={`w-8 h-8 rounded-[6px] flex items-center justify-center cursor-pointer border ${viewMode === "table" ? "bg-accent-dim border-accent text-accent" : "bg-transparent border-border text-text-muted"}`} onClick={() => setViewMode("table")}>
              <Icon name="list" size={14} />
            </button>
            <button className={`w-8 h-8 rounded-[6px] flex items-center justify-center cursor-pointer border ${viewMode === "cards" ? "bg-accent-dim border-accent text-accent" : "bg-transparent border-border text-text-muted"}`} onClick={() => setViewMode("cards")}>
              <Icon name="grid" size={14} />
            </button>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-4">
        {/* Table or Cards */}
        {viewMode === "table" ? (
          <Card noPadding className="!mb-0 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-[13px]">
                <thead>
                  <tr>
                    {["", "Name", "DVV-ID", "Verein", "Rollen", "Lizenz", "Letzte Änderung"].map(h => (
                      <th key={h} className="text-[11px] font-semibold text-text-muted uppercase tracking-wide px-3.5 py-2.5 text-left border-b border-border">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((p) => (
                    <tr key={p.id} className={`hover:bg-s2 cursor-pointer ${selectedPerson?.id === p.id ? "bg-accent-dim" : ""}`} onClick={() => setSelectedPerson(p)}>
                      <td className="px-3.5 py-2.5 border-b border-border">
                        <div className="w-8 h-8 rounded-full bg-s3 flex items-center justify-center text-[11px] font-bold text-accent">
                          {p.name.split(" ").map(n => n[0]).join("")}
                        </div>
                      </td>
                      <td className="px-3.5 py-2.5 border-b border-border">
                        <div className="font-semibold">{p.name}</div>
                        {p.minderjaehrig && <span className="text-[10px] text-orange font-medium">Minderjährig</span>}
                      </td>
                      <td className="px-3.5 py-2.5 border-b border-border font-mono text-[11px] text-text-muted">{p.dvvId}</td>
                      <td className="px-3.5 py-2.5 border-b border-border text-text-dim">
                        {p.verein === "—" ? <Badge color="gray">Freie Mitgliedschaft</Badge> : <span className="flex items-center gap-2"><ClubLogo name={p.verein} size={22} />{p.verein}</span>}
                      </td>
                      <td className="px-3.5 py-2.5 border-b border-border">
                        <div className="flex gap-1 flex-wrap">
                          {p.rollen.map(r => <Badge key={r} color="purple">{r}</Badge>)}
                        </div>
                      </td>
                      <td className="px-3.5 py-2.5 border-b border-border">
                        <Badge color={lizenzColors[p.lizenzStatus]}>{p.lizenzStatus.charAt(0).toUpperCase() + p.lizenzStatus.slice(1)}</Badge>
                      </td>
                      <td className="px-3.5 py-2.5 border-b border-border text-text-muted text-[12px]">{p.letzteAenderung}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {filtered.map(p => (
              <Card key={p.id} borderColor={p.lizenzStatus === "aktiv" ? "border-l-green" : p.lizenzStatus === "abgelaufen" ? "border-l-red" : "border-l-orange"} className={`!mb-0 cursor-pointer hover:shadow-md transition-shadow ${selectedPerson?.id === p.id ? "ring-2 ring-accent" : ""}`}>
                <div onClick={() => setSelectedPerson(p)}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-s3 flex items-center justify-center text-[12px] font-bold text-accent">
                      {p.name.split(" ").map(n => n[0]).join("")}
                    </div>
                    <div>
                      <div className="font-semibold text-[14px]">{p.name}</div>
                      <div className="text-[11px] text-text-muted font-mono">{p.dvvId}</div>
                    </div>
                  </div>
                  <div className="flex gap-1 flex-wrap mb-2">
                    {p.rollen.map(r => <Badge key={r} color="purple">{r}</Badge>)}
                    <Badge color={lizenzColors[p.lizenzStatus]}>{p.lizenzStatus.charAt(0).toUpperCase() + p.lizenzStatus.slice(1)}</Badge>
                  </div>
                  <div className="text-[12px] text-text-muted">{p.verein}</div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Detail Drawer */}
        <Card className="!mb-0 sticky top-0">
          {selectedPerson ? (
            <div className="animate-fadeIn">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-14 h-14 rounded-full bg-s3 flex items-center justify-center text-[16px] font-bold text-accent">
                  {selectedPerson.name.split(" ").map(n => n[0]).join("")}
                </div>
                <div>
                  <div className="font-bold text-[16px]">{selectedPerson.name}</div>
                  <div className="text-[12px] text-text-muted font-mono">{selectedPerson.dvvId}</div>
                </div>
              </div>

              {selectedPerson.minderjaehrig && (
                <div className="bg-orange-dim border border-[rgba(217,119,6,0.2)] rounded-[6px] px-3 py-2 mb-4 text-[12px] text-orange flex items-center gap-2">
                  <Icon name="alert" size={14} /> Minderjährig — Erziehungsberechtigte verknüpft
                </div>
              )}

              <div className="space-y-3 text-[13px] mb-4">
                <div className="flex justify-between"><span className="text-text-muted">Geburtsdatum</span><span>{selectedPerson.geburtsdatum}</span></div>
                <div className="flex justify-between"><span className="text-text-muted">Verein</span><span>{selectedPerson.verein}</span></div>
                <div className="flex justify-between"><span className="text-text-muted">Rollen</span><span>{selectedPerson.rollen.join(", ")}</span></div>
                <div className="flex justify-between"><span className="text-text-muted">Lizenzstatus</span><Badge color={lizenzColors[selectedPerson.lizenzStatus]}>{selectedPerson.lizenzStatus}</Badge></div>
                <div className="flex justify-between"><span className="text-text-muted">Letzte Änderung</span><span>{selectedPerson.letzteAenderung}</span></div>
              </div>

              <div className="flex gap-2">
                <Button size="sm">Profil öffnen</Button>
                <Button size="sm" variant="ghost">Bearbeiten</Button>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-12 h-12 rounded-xl bg-accent-dim flex items-center justify-center mx-auto mb-3">
                <Icon name="users" size={24} className="text-accent" />
              </div>
              <div className="text-sm font-semibold mb-1">Person auswählen</div>
              <div className="text-xs text-text-muted">Klicken Sie auf eine Person in der Liste</div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
