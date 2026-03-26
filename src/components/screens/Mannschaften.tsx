"use client";

import { useState, useEffect } from "react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import SectionHeader from "@/components/ui/SectionHeader";
import Modal from "@/components/ui/Modal";
import Icon from "@/components/ui/Icon";
import FilterBar from "@/components/ui/FilterBar";

interface MannschaftenProps {
  onNavigate: (screen: string) => void;
  action?: string | null;
  onActionHandled?: () => void;
}

const teams = [
  { name: "TSV Hannover Herren 1", liga: "Verbandsliga Nord", geschlecht: "Herren", altersklasse: "Erwachsene", spieler: 14, spieltag: "8/22", status: "Aktiv", statusColor: "green" as const },
  { name: "TSV Hannover Herren 2", liga: "Bezirksliga", geschlecht: "Herren", altersklasse: "Erwachsene", spieler: 12, spieltag: "7/22", status: "Meldung offen", statusColor: "orange" as const },
  { name: "TSV Hannover Herren 3", liga: "Kreisliga", geschlecht: "Herren", altersklasse: "Erwachsene", spieler: 10, spieltag: "6/22", status: "Aktiv", statusColor: "green" as const },
  { name: "TSV Hannover Damen 1", liga: "Verbandsliga Nord", geschlecht: "Damen", altersklasse: "Erwachsene", spieler: 13, spieltag: "8/22", status: "Aktiv", statusColor: "green" as const },
  { name: "TSV Hannover Damen 2", liga: "Bezirksliga", geschlecht: "Damen", altersklasse: "Erwachsene", spieler: 11, spieltag: "7/22", status: "Aktiv", statusColor: "green" as const },
  { name: "TSV Hannover U20 m", liga: "Bezirksliga Jugend", geschlecht: "Herren", altersklasse: "U20", spieler: 12, spieltag: "5/18", status: "Aktiv", statusColor: "green" as const },
  { name: "TSV Hannover U18 w", liga: "Kreisliga Jugend", geschlecht: "Damen", altersklasse: "U18", spieler: 10, spieltag: "4/16", status: "Aktiv", statusColor: "green" as const },
  { name: "TSV Hannover Senioren", liga: "Seniorenliga", geschlecht: "Herren", altersklasse: "Senioren", spieler: 9, spieltag: "3/12", status: "Inaktiv", statusColor: "gray" as const },
];

export default function Mannschaften({ onNavigate, action, onActionHandled }: MannschaftenProps) {
  const [filterLiga, setFilterLiga] = useState("Alle");
  const [filterGeschlecht, setFilterGeschlecht] = useState("Alle");
  const [filterAlter, setFilterAlter] = useState("Alle");
  const [filterStatus, setFilterStatus] = useState("Alle");
  const [createModal, setCreateModal] = useState(false);

  useEffect(() => {
    if (action === "open-create") {
      const t = setTimeout(() => { setCreateModal(true); onActionHandled?.(); }, 50);
      return () => clearTimeout(t);
    }
  }, [action, onActionHandled]);

  const filtered = teams.filter((t) => {
    if (filterLiga !== "Alle" && !t.liga.includes(filterLiga)) return false;
    if (filterGeschlecht !== "Alle" && t.geschlecht !== filterGeschlecht) return false;
    if (filterAlter !== "Alle" && t.altersklasse !== filterAlter) return false;
    if (filterStatus !== "Alle" && t.status !== filterStatus) return false;
    return true;
  });

  const herren = teams.filter((t) => t.geschlecht === "Herren" && t.altersklasse === "Erwachsene").length;
  const damen = teams.filter((t) => t.geschlecht === "Damen" && t.altersklasse === "Erwachsene").length;
  const jugend = teams.filter((t) => ["U20", "U18", "U16"].includes(t.altersklasse)).length;

  return (
    <div className="animate-fadeIn">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-[22px] font-bold mb-1">Meine Mannschaften</h1>
          <p className="text-[13px] text-text-muted">Alle Teams des TSV Hannover im Überblick</p>
        </div>
        <Button onClick={() => setCreateModal(true)}>+ Neue Mannschaft</Button>
      </div>

      {/* Summary stats */}
      <div className="flex gap-3 mb-5">
        <div className="bg-s1 border border-border rounded-[10px] px-4 py-3 flex items-center gap-2">
          <div className="text-[20px] font-bold">{teams.length}</div>
          <div className="text-xs text-text-muted">Gesamt</div>
        </div>
        <div className="bg-s1 border border-border rounded-[10px] px-4 py-3 flex items-center gap-2">
          <div className="text-[20px] font-bold text-blue">{herren}</div>
          <div className="text-xs text-text-muted">Herren</div>
        </div>
        <div className="bg-s1 border border-border rounded-[10px] px-4 py-3 flex items-center gap-2">
          <div className="text-[20px] font-bold text-accent">{damen}</div>
          <div className="text-xs text-text-muted">Damen</div>
        </div>
        <div className="bg-s1 border border-border rounded-[10px] px-4 py-3 flex items-center gap-2">
          <div className="text-[20px] font-bold text-orange">{jugend}</div>
          <div className="text-xs text-text-muted">Jugend</div>
        </div>
      </div>

      <FilterBar
        search="" onSearch={() => {}} searchPlaceholder="Mannschaft suchen..."
        filters={[
          { label: "Liga", value: "liga", options: ["Verbandsliga", "Bezirksliga", "Kreisliga", "Seniorenliga"], active: filterLiga, onChange: setFilterLiga },
          { label: "Geschlecht", value: "geschlecht", options: ["Herren", "Damen"], active: filterGeschlecht, onChange: setFilterGeschlecht },
          { label: "Altersklasse", value: "alter", options: ["Erwachsene", "U20", "U18", "U16", "Senioren"], active: filterAlter, onChange: setFilterAlter },
          { label: "Status", value: "status", options: ["Aktiv", "Meldung offen", "Inaktiv"], active: filterStatus, onChange: setFilterStatus },
        ]}
        onReset={() => { setFilterLiga("Alle"); setFilterGeschlecht("Alle"); setFilterAlter("Alle"); setFilterStatus("Alle"); }}
      >
        <span className="ml-auto text-xs text-text-muted whitespace-nowrap">{filtered.length} von {teams.length} Teams</span>
      </FilterBar>

      {/* Table */}
      <div className="bg-s1 border border-border rounded-[10px] overflow-hidden">
        <table className="w-full border-collapse text-[13px]">
          <thead>
            <tr>
              {["Mannschaft", "Liga", "Geschlecht", "Altersklasse", "Spieler", "Spieltag", "Status"].map((h) => (
                <th key={h} className="text-[11px] font-semibold text-text-muted uppercase tracking-wide px-3.5 py-2.5 text-left border-b border-border">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((t, i) => (
              <tr key={i} className="hover:bg-s2 cursor-pointer" onClick={() => onNavigate(`team-detail:${encodeURIComponent(t.name)}`)}>
                <td className="px-3.5 py-3 border-b border-border font-semibold">{t.name}</td>
                <td className="px-3.5 py-3 border-b border-border">{t.liga}</td>
                <td className="px-3.5 py-3 border-b border-border">{t.geschlecht}</td>
                <td className="px-3.5 py-3 border-b border-border">{t.altersklasse}</td>
                <td className="px-3.5 py-3 border-b border-border">{t.spieler}</td>
                <td className="px-3.5 py-3 border-b border-border">{t.spieltag}</td>
                <td className="px-3.5 py-3 border-b border-border"><Badge color={t.statusColor}>{t.status}</Badge></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Create Team Modal */}
      <Modal open={createModal} onClose={() => setCreateModal(false)} title="Neue Mannschaft erstellen">
        <div className="mb-3.5">
          <div className="text-xs font-semibold text-text-dim mb-1.5">Mannschaftsname *</div>
          <input placeholder="z.B. TSV Hannover Herren 3" />
        </div>
        <div className="grid grid-cols-2 gap-3.5 mb-3.5">
          <div>
            <div className="text-xs font-semibold text-text-dim mb-1.5">Geschlecht *</div>
            <select><option>Herren</option><option>Damen</option><option>Mixed</option></select>
          </div>
          <div>
            <div className="text-xs font-semibold text-text-dim mb-1.5">Altersklasse *</div>
            <select><option>Erwachsene</option><option>U20</option><option>U18</option><option>U16</option><option>Senioren</option></select>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3.5 mb-3.5">
          <div>
            <div className="text-xs font-semibold text-text-dim mb-1.5">Spielklasse *</div>
            <select><option>Verbandsliga</option><option>Bezirksliga</option><option>Kreisliga</option></select>
          </div>
          <div>
            <div className="text-xs font-semibold text-text-dim mb-1.5">Heimhalle</div>
            <select><option>Sporthalle Am Maschsee</option><option>IGS-Halle Hannover</option><option>Turnhalle Bothfeld</option></select>
          </div>
        </div>
        <div className="mb-3.5">
          <div className="text-xs font-semibold text-text-dim mb-1.5">Trainer</div>
          <input placeholder="Name des Trainers" />
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" className="flex-1" onClick={() => setCreateModal(false)}>Abbrechen</Button>
          <Button className="flex-1" onClick={() => setCreateModal(false)}>Mannschaft erstellen</Button>
        </div>
      </Modal>
    </div>
  );
}
