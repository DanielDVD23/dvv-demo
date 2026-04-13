"use client";

import React, { useState } from "react";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import Modal from "@/components/ui/Modal";

interface Antrag {
  id: string;
  name: string;
  typ: string;
  verein: string;
  eingangsdatum: string;
  wartezeit: number;
  status: "offen" | "in-pruefung" | "nachfordern" | "freigegeben" | "abgelehnt";
  dokumente: { name: string; status: "ok" | "fehlend" | "abgelehnt" }[];
}

const ANTRAEGE: Antrag[] = [
  { id: "LA-2026-0891", name: "Jonas Becker", typ: "Spieler Halle Jugend", verein: "TSV Herrsching", eingangsdatum: "02.04.2026", wartezeit: 5, status: "offen", dokumente: [{ name: "Passfoto", status: "ok" }, { name: "Geburtsurkunde", status: "ok" }] },
  { id: "LA-2026-0887", name: "Laura Heinz", typ: "Trainer C-Lizenz", verein: "SWD Düren", eingangsdatum: "28.03.2026", wartezeit: 10, status: "in-pruefung", dokumente: [{ name: "Passfoto", status: "ok" }, { name: "Erste-Hilfe-Nachweis", status: "fehlend" }] },
  { id: "LA-2026-0879", name: "Markus Wolf", typ: "Schiedsrichter Regional", verein: "DVV", eingangsdatum: "25.03.2026", wartezeit: 13, status: "nachfordern", dokumente: [{ name: "Passfoto", status: "ok" }, { name: "Regeltest", status: "abgelehnt" }] },
  { id: "LA-2026-0892", name: "Sophie Klein", typ: "Spieler Beach", verein: "Beach Berlin", eingangsdatum: "01.04.2026", wartezeit: 6, status: "offen", dokumente: [{ name: "Passfoto", status: "ok" }] },
  { id: "LA-2026-0885", name: "Tim Fischer", typ: "Spieler Halle Senioren", verein: "Grizzlys Giesen", eingangsdatum: "30.03.2026", wartezeit: 8, status: "in-pruefung", dokumente: [{ name: "Passfoto", status: "ok" }, { name: "Vereinsbescheinigung", status: "ok" }] },
  { id: "LA-2026-0893", name: "Pia Wagner", typ: "Trainer B-Lizenz", verein: "TSV Hannover", eingangsdatum: "04.04.2026", wartezeit: 3, status: "offen", dokumente: [{ name: "Passfoto", status: "ok" }, { name: "C-Lizenz Nachweis", status: "ok" }, { name: "Lehrgangsbestätigung", status: "ok" }] },
  { id: "LA-2026-0878", name: "Max Lehmann", typ: "Spieler Halle Senioren", verein: "BR Volleys", eingangsdatum: "24.03.2026", wartezeit: 14, status: "offen", dokumente: [{ name: "Passfoto", status: "ok" }] },
];

const statusColors: Record<string, "blue" | "orange" | "red" | "green" | "gray"> = {
  offen: "blue", "in-pruefung": "orange", nachfordern: "red", freigegeben: "green", abgelehnt: "gray",
};
const statusLabels: Record<string, string> = {
  offen: "Offen", "in-pruefung": "In Prüfung", nachfordern: "Nachfordern", freigegeben: "Freigegeben", abgelehnt: "Abgelehnt",
};

export default function LizenzQueue() {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState("");
  const [search, setSearch] = useState("");
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);

  const filtered = ANTRAEGE.filter(a => {
    if (search && !a.name.toLowerCase().includes(search.toLowerCase()) && !a.id.toLowerCase().includes(search.toLowerCase())) return false;
    if (filterStatus && a.status !== filterStatus) return false;
    return true;
  });

  const toggleSelect = (id: string) => {
    setSelected(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id]);
  };

  return (
    <div className="animate-fadeIn">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="text-[22px] font-bold mb-1">Lizenz-Bearbeitungsqueue</h1>
          <p className="text-[13px] text-text-muted">{ANTRAEGE.filter(a => a.status === "offen").length} offene Anträge</p>
        </div>
        <div className="flex gap-2">
          {selected.length > 0 && (
            <>
              <Button variant="success" size="sm"><Icon name="check" size={14} /> Freigeben ({selected.length})</Button>
              <Button variant="danger" size="sm" onClick={() => setShowRejectModal(true)}>Ablehnen ({selected.length})</Button>
            </>
          )}
        </div>
      </div>

      {/* Duplicate warning */}
      {ANTRAEGE.some(a => a.wartezeit > 10) && (
        <div className="bg-red-dim border border-[rgba(239,68,68,0.2)] rounded-[8px] px-4 py-3 mb-4 flex items-center gap-3">
          <Icon name="alert" size={18} className="text-red shrink-0" />
          <span className="text-[13px] text-red font-medium">{ANTRAEGE.filter(a => a.wartezeit > 10).length} Anträge sind länger als 10 Werktage offen</span>
        </div>
      )}

      <Card className="!mb-4 !p-3">
        <div className="flex gap-3 flex-wrap">
          <input className="!w-64" placeholder="Name oder Antragsnr. suchen..." value={search} onChange={(e) => setSearch(e.target.value)} />
          <select className="!w-36" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            <option value="">Alle Status</option>
            <option value="offen">Offen</option>
            <option value="in-pruefung">In Prüfung</option>
            <option value="nachfordern">Nachfordern</option>
          </select>
          <select className="!w-44">
            <option value="">Alle Lizenztypen</option>
            <option>Spieler Halle</option>
            <option>Spieler Beach</option>
            <option>Trainer</option>
            <option>Schiedsrichter</option>
          </select>
        </div>
      </Card>

      <Card noPadding className="!mb-0 overflow-hidden">
        <table className="w-full border-collapse text-[13px]">
          <thead>
            <tr>
              <th className="w-10 px-3 py-2.5 border-b border-border">
                <input type="checkbox" className="!w-4 !h-4" />
              </th>
              {["Antrag-Nr.", "Antragsteller", "Lizenztyp", "Verein", "Eingang", "Wartezeit", "Status", ""].map(h => (
                <th key={h} className="text-[11px] font-semibold text-text-muted uppercase tracking-wide px-3 py-2.5 text-left border-b border-border">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(a => (
              <React.Fragment key={a.id}>
                <tr className={`hover:bg-s2 cursor-pointer ${a.wartezeit > 10 ? "status-bar-red" : ""} ${expanded === a.id ? "bg-s2" : ""}`} onClick={() => setExpanded(expanded === a.id ? null : a.id)}>
                  <td className="px-3 py-2.5 border-b border-border" onClick={e => e.stopPropagation()}>
                    <input type="checkbox" className="!w-4 !h-4" checked={selected.includes(a.id)} onChange={() => toggleSelect(a.id)} />
                  </td>
                  <td className="px-3 py-2.5 border-b border-border font-mono text-[11px] text-text-muted">{a.id}</td>
                  <td className="px-3 py-2.5 border-b border-border font-semibold">{a.name}</td>
                  <td className="px-3 py-2.5 border-b border-border text-text-dim">{a.typ}</td>
                  <td className="px-3 py-2.5 border-b border-border text-text-dim">{a.verein}</td>
                  <td className="px-3 py-2.5 border-b border-border text-text-muted text-[12px]">{a.eingangsdatum}</td>
                  <td className="px-3 py-2.5 border-b border-border">
                    <span className={a.wartezeit > 10 ? "text-red font-bold" : a.wartezeit > 7 ? "text-orange font-semibold" : "text-text-dim"}>
                      {a.wartezeit} Tage
                    </span>
                  </td>
                  <td className="px-3 py-2.5 border-b border-border">
                    <Badge color={statusColors[a.status]}>{statusLabels[a.status]}</Badge>
                  </td>
                  <td className="px-3 py-2.5 border-b border-border">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-text-muted" style={{ transform: expanded === a.id ? "rotate(180deg)" : "none", transition: "transform 0.15s" }}>
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </td>
                </tr>
                {expanded === a.id && (
                  <tr>
                    <td colSpan={9} className="px-6 py-4 bg-s2 border-b border-border">
                      <div className="animate-fadeIn grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <div className="text-xs font-bold text-text-muted uppercase tracking-wider mb-3">Dokumente</div>
                          <div className="space-y-2">
                            {a.dokumente.map((d, i) => (
                              <div key={i} className="flex items-center gap-2 text-[13px]">
                                {d.status === "ok" && <Icon name="check" size={14} className="text-green" />}
                                {d.status === "fehlend" && <Icon name="alert" size={14} className="text-orange" />}
                                {d.status === "abgelehnt" && <span className="text-red">✕</span>}
                                <span>{d.name}</span>
                                <Badge color={d.status === "ok" ? "green" : d.status === "fehlend" ? "orange" : "red"}>
                                  {d.status === "ok" ? "OK" : d.status === "fehlend" ? "Fehlend" : "Abgelehnt"}
                                </Badge>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          <div className="text-xs font-bold text-text-muted uppercase tracking-wider mb-2">Aktionen</div>
                          <Button size="sm" className="w-fit"><Icon name="check" size={14} /> Freigeben</Button>
                          <Button size="sm" variant="danger" className="w-fit">Ablehnen</Button>
                          <Button size="sm" variant="warning" className="w-fit">Nachfordern</Button>
                          <Button size="sm" variant="ghost" className="w-fit">Delegieren</Button>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </Card>

      <Modal open={showRejectModal} onClose={() => setShowRejectModal(false)} title="Anträge ablehnen">
        <div className="space-y-4">
          <p className="text-[13px] text-text-dim">{selected.length} Anträge werden abgelehnt.</p>
          <div>
            <label className="text-[11px] font-semibold text-text-dim uppercase tracking-wide mb-1.5 block">Ablehnungsgrund</label>
            <select>
              <option>Unvollständige Unterlagen</option>
              <option>Voraussetzungen nicht erfüllt</option>
              <option>Duplikat-Antrag</option>
              <option>Sonstiges</option>
            </select>
          </div>
          <div>
            <label className="text-[11px] font-semibold text-text-dim uppercase tracking-wide mb-1.5 block">Freitext</label>
            <textarea placeholder="Zusätzliche Begründung..." />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="ghost" onClick={() => setShowRejectModal(false)}>Abbrechen</Button>
            <Button variant="danger" onClick={() => setShowRejectModal(false)}>Ablehnen & Benachrichtigen</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
