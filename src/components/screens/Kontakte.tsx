"use client";

import { useState } from "react";
import Badge from "@/components/ui/Badge";
import Icon from "@/components/ui/Icon";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import FilterBar from "@/components/ui/FilterBar";

interface Kontakt {
  name: string;
  initialen: string;
  avatarBg: string;
  rolle: string;
  verein: string;
  liga: string;
  mannschaft: string;
  status: "aktiv" | "inaktiv";
  email?: string;
  telefon?: string;
  notiz?: string;
}

const INIT_KONTAKTE: Kontakt[] = [
  { name: "Thomas Weber", initialen: "TW", avatarBg: "#02ca4b", rolle: "Vereinsadmin", verein: "TSV Hannover", liga: "Verbandsliga Nord", mannschaft: "Herren I", status: "aktiv", email: "t.weber@tsv-hannover.de", telefon: "0511 5678-200" },
  { name: "Dr. Claudia Meier", initialen: "CM", avatarBg: "#3b82f6", rolle: "Verbandsadmin", verein: "NWVV", liga: "\u2014", mannschaft: "\u2014", status: "aktiv", email: "c.meier@nwvv.de", telefon: "0511 1234-100" },
  { name: "Michael Krause", initialen: "MK", avatarBg: "#f97316", rolle: "Trainer", verein: "TSV Hannover", liga: "Verbandsliga Nord", mannschaft: "Herren I", status: "aktiv", email: "m.krause@tsv-hannover.de", telefon: "0511 5678-205" },
  { name: "Markus Schr\u00f6der", initialen: "MS", avatarBg: "#794dff", rolle: "SR-Wart", verein: "Bezirk Hannover", liga: "\u2014", mannschaft: "\u2014", status: "aktiv", email: "m.schroeder@nwvv.de", telefon: "0511 1234-110" },
  { name: "Anna Fischer", initialen: "AF", avatarBg: "#ec4899", rolle: "Staffelleiterin", verein: "NWVV", liga: "Bezirksliga S\u00fcd", mannschaft: "\u2014", status: "aktiv", email: "a.fischer@nwvv.de", telefon: "0511 1234-115" },
  { name: "Jens Prie\u00df", initialen: "JP", avatarBg: "#02ca4b", rolle: "Vereinsadmin", verein: "MTV Wolfsburg", liga: "Verbandsliga Nord", mannschaft: "Herren I, Damen", status: "aktiv", email: "j.priess@mtv-wolfsburg.de", telefon: "05361 8877-100" },
  { name: "Laura Berger", initialen: "LB", avatarBg: "#8b5cf6", rolle: "Trainerin", verein: "SVC G\u00f6ttingen", liga: "Bezirksliga S\u00fcd", mannschaft: "Damen I", status: "aktiv", email: "l.berger@svc-goettingen.de", telefon: "0551 3344-200" },
  { name: "Peter Hoffmann", initialen: "PH", avatarBg: "#06b6d4", rolle: "Vereinsadmin", verein: "SC Paderborn", liga: "Verbandsliga Nord", mannschaft: "Herren I", status: "inaktiv", email: "p.hoffmann@sc-paderborn.de", telefon: "05251 2233-100" },
  { name: "Sandra M\u00fcller", initialen: "SM", avatarBg: "#ef4444", rolle: "Schiedsrichterin", verein: "\u2014", liga: "Verbandsliga Nord", mannschaft: "\u2014", status: "aktiv", email: "s.mueller@nwvv.de", telefon: "0511 1234-120" },
  { name: "Karl Richter", initialen: "KR", avatarBg: "#f97316", rolle: "Trainer", verein: "VfR Bielefeld", liga: "Verbandsliga Nord", mannschaft: "Herren I", status: "aktiv", email: "k.richter@vfr-bielefeld.de", telefon: "0521 4455-200" },
];

const avatarColors = ["#02ca4b", "#3b82f6", "#f97316", "#794dff", "#ec4899", "#8b5cf6", "#06b6d4", "#ef4444"];

const rollen = [...new Set(INIT_KONTAKTE.map(k => k.rolle))].sort();
const vereine = [...new Set(INIT_KONTAKTE.map(k => k.verein).filter(v => v !== "\u2014"))].sort();
const ligen = [...new Set(INIT_KONTAKTE.map(k => k.liga).filter(l => l !== "\u2014"))].sort();

const labelCls = "text-[11px] font-semibold text-text-dim uppercase tracking-wide mb-1.5 block";

export default function Kontakte() {
  const [kontakte, setKontakte] = useState(INIT_KONTAKTE);
  const [search, setSearch] = useState("");
  const [filterRolle, setFilterRolle] = useState("");
  const [filterVerein, setFilterVerein] = useState("");
  const [filterLiga, setFilterLiga] = useState("");
  const [sortierung, setSortierung] = useState("Name");
  const [currentPage, setCurrentPage] = useState(1);

  // Detail panel
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  // Create modal
  const [createModal, setCreateModal] = useState(false);
  const emptyForm = { name: "", rolle: "", verein: "", liga: "", mannschaft: "", email: "", telefon: "", status: "aktiv" as const };
  const [form, setForm] = useState(emptyForm);

  // Success toast
  const [successMsg, setSuccessMsg] = useState("");
  const showSuccess = (msg: string) => { setSuccessMsg(msg); setTimeout(() => setSuccessMsg(""), 3000); };

  const filtered = kontakte.filter(k => {
    const s = search.toLowerCase();
    const matchSearch = !search || k.name.toLowerCase().includes(s) || k.verein.toLowerCase().includes(s) || k.rolle.toLowerCase().includes(s);
    const matchRolle = !filterRolle || k.rolle === filterRolle;
    const matchVerein = !filterVerein || k.verein === filterVerein;
    const matchLiga = !filterLiga || k.liga === filterLiga;
    return matchSearch && matchRolle && matchVerein && matchLiga;
  });

  const handleCreate = () => {
    if (!form.name.trim()) return;
    const initialen = form.name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
    const avatarBg = avatarColors[kontakte.length % avatarColors.length];
    const newKontakt: Kontakt = {
      name: form.name,
      initialen,
      avatarBg,
      rolle: form.rolle || "Kontakt",
      verein: form.verein || "\u2014",
      liga: form.liga || "\u2014",
      mannschaft: form.mannschaft || "\u2014",
      status: form.status,
      email: form.email,
      telefon: form.telefon,
    };
    setKontakte(prev => [newKontakt, ...prev]);
    setCreateModal(false);
    setForm(emptyForm);
    showSuccess(`${form.name} wurde als Kontakt hinzugefügt.`);
  };

  const selected = selectedIdx !== null ? kontakte[selectedIdx] : null;

  const thStyle: React.CSSProperties = { fontSize: 12, fontWeight: 500, color: "#94a3b8", padding: "12px 16px", textAlign: "left", borderBottom: "1px solid #e2e8f0" };
  const tdStyle: React.CSSProperties = { padding: "12px 16px", fontSize: 13, borderBottom: "1px solid #e2e8f0" };
  const pages = [1, 2, 3, 5];

  return (
    <div className="animate-fadeIn">
      {/* Success toast */}
      {successMsg && (
        <div className="fixed top-4 right-4 z-[999] bg-green text-white px-5 py-3 rounded-[10px] text-[13px] font-semibold shadow-lg animate-slideUp flex items-center gap-2">
          <Icon name="check" size={16} /> {successMsg}
        </div>
      )}

      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-[22px] font-bold mb-1">Kontakte</h1>
          <p className="text-[13px] text-text-muted">{kontakte.length} Kontakte &middot; NWVV &middot; Saison 2025/26</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="ghost">
            <Icon name="download" size={15} />
            Export
          </Button>
          <Button onClick={() => setCreateModal(true)}>+ Kontakt hinzufügen</Button>
        </div>
      </div>

      {/* Filter Bar */}
      <FilterBar
        search={search}
        onSearch={setSearch}
        searchPlaceholder="Name, Verein oder Rolle"
        filters={[
          { label: "Rolle", value: "rolle", options: rollen, active: filterRolle || "Alle", onChange: v => setFilterRolle(v === "Alle" ? "" : v) },
          { label: "Verein", value: "verein", options: vereine, active: filterVerein || "Alle", onChange: v => setFilterVerein(v === "Alle" ? "" : v) },
          { label: "Liga", value: "liga", options: ligen, active: filterLiga || "Alle", onChange: v => setFilterLiga(v === "Alle" ? "" : v) },
          { label: "Sortierung", value: "sortierung", options: ["Name", "Rolle", "Verein"], active: sortierung, onChange: v => setSortierung(v) },
        ]}
        onReset={() => { setFilterRolle(""); setFilterVerein(""); setFilterLiga(""); setSortierung("Name"); }}
      />

      {/* Main area: Table + Detail panel */}
      <div className="flex gap-5">
        {/* Table */}
        <div className={`bg-s1 rounded-[12px] overflow-hidden transition-all ${selected ? "flex-1 min-w-0" : "w-full"}`} style={{ border: "1px solid #e2e8f0" }}>
          <table className="w-full border-collapse" style={{ tableLayout: "auto" }}>
            <thead>
              <tr>
                <th style={thStyle}>Name</th>
                <th style={thStyle}>Rolle</th>
                <th style={thStyle}>Verein</th>
                {!selected && <th style={thStyle}>Liga</th>}
                {!selected && <th style={thStyle}>Mannschaft</th>}
                <th style={thStyle}>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((k, i) => {
                const globalIdx = kontakte.indexOf(k);
                return (
                  <tr
                    key={i}
                    className={`hover:bg-s2 cursor-pointer transition-colors ${selectedIdx === globalIdx ? "bg-accent-dim" : ""}`}
                    onClick={() => setSelectedIdx(selectedIdx === globalIdx ? null : globalIdx)}
                  >
                    <td style={tdStyle}>
                      <div className="flex items-center gap-3">
                        <div style={{ width: 32, height: 32, borderRadius: "50%", background: k.avatarBg, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 11, fontWeight: 700, flexShrink: 0 }}>
                          {k.initialen}
                        </div>
                        <span className="font-semibold text-[13px]">{k.name}</span>
                      </div>
                    </td>
                    <td style={tdStyle}><span className="text-[13px] text-text-dim">{k.rolle}</span></td>
                    <td style={tdStyle}>
                      {k.verein !== "\u2014" ? (
                        <span style={{ color: "#794dff", fontSize: 13, fontWeight: 500 }}>{k.verein}</span>
                      ) : (
                        <span className="text-text-dim text-[13px]">{k.verein}</span>
                      )}
                    </td>
                    {!selected && <td style={tdStyle}><span className="text-[13px] text-text-dim">{k.liga}</span></td>}
                    {!selected && <td style={tdStyle}><span className="text-[13px] text-text-dim">{k.mannschaft}</span></td>}
                    <td style={tdStyle}>
                      <Badge color={k.status === "aktiv" ? "green" : "gray"}>
                        <span style={{ width: 6, height: 6, borderRadius: "50%", background: k.status === "aktiv" ? "#22c55e" : "#94a3b8", display: "inline-block" }} />
                        {k.status === "aktiv" ? "Aktiv" : "Inaktiv"}
                      </Badge>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex items-center justify-between" style={{ padding: "12px 16px", borderTop: "1px solid #e2e8f0" }}>
            <span className="text-[13px] text-text-muted">1&ndash;{filtered.length} von {kontakte.length} Kontakten</span>
            <div className="flex items-center gap-1">
              {["«", ...pages.map(String), "»"].map((p, i) => (
                <button
                  key={i}
                  onClick={() => { if (!isNaN(Number(p))) setCurrentPage(Number(p)); }}
                  style={{
                    width: 32, height: 32, borderRadius: 6,
                    border: (currentPage === Number(p)) ? "none" : "1px solid #e2e8f0",
                    background: (currentPage === Number(p)) ? "#794dff" : "#fff",
                    color: (currentPage === Number(p)) ? "#fff" : "#94a3b8",
                    cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 13, fontWeight: (currentPage === Number(p)) ? 600 : 400, fontFamily: "inherit",
                  }}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Detail Panel */}
        {selected && (
          <div className="w-[360px] shrink-0 bg-s1 border border-border rounded-[12px] p-6 animate-fadeIn" style={{ alignSelf: "flex-start" }}>
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-[15px] font-bold">Kontaktdetails</h3>
              <button onClick={() => setSelectedIdx(null)} className="bg-s2 border border-border text-text-muted w-7 h-7 rounded-[6px] cursor-pointer text-base flex items-center justify-center hover:text-text">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
              </button>
            </div>

            {/* Avatar + Name */}
            <div className="flex items-center gap-4 mb-6">
              <div style={{ width: 56, height: 56, borderRadius: "50%", background: selected.avatarBg, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 18, fontWeight: 700, flexShrink: 0 }}>
                {selected.initialen}
              </div>
              <div>
                <div className="text-[16px] font-bold">{selected.name}</div>
                <div className="text-[13px] text-text-muted">{selected.rolle}</div>
                <Badge color={selected.status === "aktiv" ? "green" : "gray"}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: selected.status === "aktiv" ? "#22c55e" : "#94a3b8", display: "inline-block" }} />
                  {selected.status === "aktiv" ? "Aktiv" : "Inaktiv"}
                </Badge>
              </div>
            </div>

            {/* Details */}
            <div className="space-y-4">
              {selected.verein !== "\u2014" && (
                <div>
                  <div className="text-[10px] font-semibold text-text-muted uppercase tracking-wide mb-1">Verein</div>
                  <div className="text-[13px] font-medium" style={{ color: "#794dff" }}>{selected.verein}</div>
                </div>
              )}
              {selected.liga !== "\u2014" && (
                <div>
                  <div className="text-[10px] font-semibold text-text-muted uppercase tracking-wide mb-1">Liga</div>
                  <div className="text-[13px]">{selected.liga}</div>
                </div>
              )}
              {selected.mannschaft !== "\u2014" && (
                <div>
                  <div className="text-[10px] font-semibold text-text-muted uppercase tracking-wide mb-1">Mannschaft</div>
                  <div className="text-[13px]">{selected.mannschaft}</div>
                </div>
              )}
              {selected.email && (
                <div>
                  <div className="text-[10px] font-semibold text-text-muted uppercase tracking-wide mb-1">E-Mail</div>
                  <a href={`mailto:${selected.email}`} className="text-[13px] text-accent hover:underline">{selected.email}</a>
                </div>
              )}
              {selected.telefon && (
                <div>
                  <div className="text-[10px] font-semibold text-text-muted uppercase tracking-wide mb-1">Telefon</div>
                  <div className="text-[13px]">{selected.telefon}</div>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-2 mt-6">
              <Button variant="ghost" size="sm" className="flex-1">
                <Icon name="mail" size={14} /> Nachricht
              </Button>
              <Button variant="ghost" size="sm" className="flex-1">
                <Icon name="edit-3" size={14} /> Bearbeiten
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Create Kontakt Modal */}
      <Modal open={createModal} onClose={() => setCreateModal(false)} title="Neuen Kontakt anlegen">
        <div className="space-y-4">
          <div>
            <label className={labelCls}>Name *</label>
            <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Vor- und Nachname" style={{ width: "100%" }} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>Rolle</label>
              <select value={form.rolle} onChange={e => setForm({ ...form, rolle: e.target.value })} style={{ width: "100%" }}>
                <option value="">Auswählen...</option>
                {rollen.map(r => <option key={r} value={r}>{r}</option>)}
                <option value="Kontakt">Sonstige</option>
              </select>
            </div>
            <div>
              <label className={labelCls}>Verein</label>
              <select value={form.verein} onChange={e => setForm({ ...form, verein: e.target.value })} style={{ width: "100%" }}>
                <option value="">Auswählen...</option>
                {vereine.map(v => <option key={v} value={v}>{v}</option>)}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>Liga</label>
              <select value={form.liga} onChange={e => setForm({ ...form, liga: e.target.value })} style={{ width: "100%" }}>
                <option value="">Auswählen...</option>
                {ligen.map(l => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>
            <div>
              <label className={labelCls}>Mannschaft</label>
              <input value={form.mannschaft} onChange={e => setForm({ ...form, mannschaft: e.target.value })} placeholder="z.B. Herren I" style={{ width: "100%" }} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>E-Mail</label>
              <input value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="name@verein.de" style={{ width: "100%" }} />
            </div>
            <div>
              <label className={labelCls}>Telefon</label>
              <input value={form.telefon} onChange={e => setForm({ ...form, telefon: e.target.value })} placeholder="0511 ..." style={{ width: "100%" }} />
            </div>
          </div>
          <div className="flex gap-3 pt-3">
            <Button variant="ghost" className="flex-1" onClick={() => setCreateModal(false)}>Abbrechen</Button>
            <Button className="flex-1" onClick={handleCreate} disabled={!form.name.trim()}>Kontakt anlegen</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
