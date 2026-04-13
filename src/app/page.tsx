"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import Dashboard from "@/components/screens/Dashboard";
import ClubDashboard from "@/components/screens/ClubDashboard";
import VerbandDashboard from "@/components/screens/VerbandDashboard";
import RoleSwitcher from "@/components/RoleSwitcher";
import Ligen from "@/components/screens/Ligen";
import Spieltag from "@/components/screens/Spieltag";
import Heimspieltermine from "@/components/screens/Heimspieltermine";
import Mannschaft from "@/components/screens/Mannschaft";
import Veranstaltung from "@/components/screens/Veranstaltung";
import Turnier from "@/components/screens/Turnier";
import Rechnungen from "@/components/screens/Rechnungen";
import Cms from "@/components/screens/Cms";
import Nominierung from "@/components/screens/Nominierung";
import Passkontrolle from "@/components/screens/Passkontrolle";
import Mannschaften from "@/components/screens/Mannschaften";
import Statistik from "@/components/screens/Statistik";
import PlayerDashboardShell from "@/components/screens/PlayerDashboardShell";
import CoachDashboardShell from "@/components/screens/CoachDashboardShell";
import AlleLigen from "@/components/screens/AlleLigen";
import AlleMannschaften from "@/components/screens/AlleMannschaften";
import Vereine from "@/components/screens/Vereine";
import Veranstaltungen from "@/components/screens/Veranstaltungen";
import Kontakte from "@/components/screens/Kontakte";
import Kalender from "@/components/screens/Kalender";
import Strafen from "@/components/screens/Strafen";
import Mail from "@/components/screens/Mail";
import Spielplan from "@/components/screens/Spielplan";
import HelpPanel from "@/components/HelpPanel";
// New DVV module screens
import Organisationen from "@/components/screens/Organisationen";
import Personen from "@/components/screens/Personen";
import Spielstaetten from "@/components/screens/Spielstaetten";
import RechteRollen from "@/components/screens/RechteRollen";
import Ehrungen from "@/components/screens/Ehrungen";
import LizenzDashboard from "@/components/screens/LizenzDashboard";
import LizenzQueue from "@/components/screens/LizenzQueue";
import LizenzConfig from "@/components/screens/LizenzConfig";
import LizenzUebersichtSpieler from "@/components/screens/LizenzUebersichtSpieler";
import LigaUebersicht from "@/components/screens/LigaUebersicht";
import SpielplanVerwaltung from "@/components/screens/SpielplanVerwaltung";
import LiveTicker from "@/components/screens/LiveTicker";
import BeachTurniere from "@/components/screens/BeachTurniere";
import Spielanalyse from "@/components/screens/Spielanalyse";
import FinanzDashboard from "@/components/screens/FinanzDashboard";
import Automationen from "@/components/screens/Automationen";
import Reporting from "@/components/screens/Reporting";
import SrAnsetzung from "@/components/screens/SrAnsetzung";
import SrPool from "@/components/screens/SrPool";
import SrFahrtkosten from "@/components/screens/SrFahrtkosten";
import Kommunikation from "@/components/screens/Kommunikation";
import Lehrgaenge from "@/components/screens/Lehrgaenge";
import Sponsoren from "@/components/screens/Sponsoren";
import Shop from "@/components/screens/Shop";
import VereinsMitglieder from "@/components/screens/VereinsMitglieder";
import MatchDetail from "@/components/screens/MatchDetail";
import Spielbericht from "@/components/screens/Spielbericht";
import SpielerSelfService from "@/components/screens/SpielerSelfService";
import SocialBriefing from "@/components/screens/SocialBriefing";
import SocialReview from "@/components/screens/SocialReview";
import MatchDayMaster from "@/components/screens/MatchDayMaster";
import SupportCenter from "@/components/screens/SupportCenter";
import ChatWidget from "@/components/ChatWidget";
import DvvAnalytics from "@/components/screens/DvvAnalytics";
import AeoAnalytics from "@/components/screens/AeoAnalytics";
import WebPerformance from "@/components/screens/WebPerformance";
import Staffelplanung from "@/components/screens/Staffelplanung";
import Icon from "@/components/ui/Icon";
import Badge from "@/components/ui/Badge";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { roleConfigs } from "@/config/roles";
import type { Role } from "@/types/roles";

function EmptyScreen({ title, subtitle, icon }: { title: string; subtitle: string; icon: string }) {
  return (
    <div className="animate-fadeIn">
      <h1 className="text-[22px] font-bold mb-1">{title}</h1>
      <p className="text-[13px] text-text-muted mb-8">{subtitle}</p>
      <div className="flex flex-col items-center justify-center py-20">
        <div className="w-16 h-16 rounded-2xl bg-accent-dim flex items-center justify-center mb-4">
          <Icon name={icon} size={28} className="text-accent" />
        </div>
        <div className="text-lg font-bold mb-1">{title}</div>
        <div className="text-sm text-text-muted">Diese Seite wird gerade eingerichtet.</div>
      </div>
    </div>
  );
}

interface Player { name: string; nr: number; position: string; status: string; geburtsdatum?: string; passNr?: string; }

const INIT_PLAYERS: Player[] = [
  { name: "Lena Weber", nr: 1, position: "Zuspielerin", status: "Aktiv", geburtsdatum: "12.05.2000", passNr: "DVV-2024-0812" },
  { name: "Anna Koch", nr: 3, position: "Außenangreiferin", status: "Aktiv", geburtsdatum: "23.08.1999", passNr: "DVV-2024-0813" },
  { name: "Sarah Braun", nr: 5, position: "Mittelblockerin", status: "Aktiv", geburtsdatum: "07.01.2001", passNr: "DVV-2024-0814" },
  { name: "Marie Schulz", nr: 7, position: "Diagonalangreiferin", status: "Aktiv", geburtsdatum: "30.11.1998", passNr: "DVV-2024-0815" },
  { name: "Lisa Fischer", nr: 9, position: "Libera", status: "Aktiv", geburtsdatum: "15.03.2002", passNr: "DVV-2024-0816" },
  { name: "Julia Becker", nr: 11, position: "Außenangreiferin", status: "Aktiv", geburtsdatum: "02.07.2000", passNr: "DVV-2024-0817" },
  { name: "Emma Hoffmann", nr: 13, position: "Mittelblockerin", status: "Aktiv", geburtsdatum: "19.09.2001", passNr: "DVV-2024-0818" },
  { name: "Lea Wagner", nr: 15, position: "Zuspielerin", status: "Aktiv", geburtsdatum: "25.04.1999", passNr: "DVV-2024-0819" },
  { name: "Sophie Krüger", nr: 17, position: "Außenangreiferin", status: "Verletzt", geburtsdatum: "08.12.2000", passNr: "DVV-2024-0820" },
  { name: "Mia Schäfer", nr: 19, position: "Libera", status: "Aktiv", geburtsdatum: "14.06.2002", passNr: "DVV-2024-0821" },
];

const teamGames = [
  { date: "15.03.2026", gegner: "SVC Göttingen", ergebnis: "3:1", heim: true },
  { date: "08.03.2026", gegner: "MTV Wolfsburg", ergebnis: "3:0", heim: false },
  { date: "01.03.2026", gegner: "TV Hildesheim", ergebnis: "2:3", heim: true },
  { date: "22.02.2026", gegner: "SC Paderborn", ergebnis: "3:2", heim: false },
  { date: "15.02.2026", gegner: "VfR Bielefeld", ergebnis: "3:1", heim: true },
];

const POSITIONS = ["Zuspielerin", "Außenangreiferin", "Mittelblockerin", "Diagonalangreiferin", "Libera"];
const STATUS_OPTS = ["Aktiv", "Verletzt", "Gesperrt", "Inaktiv"];

function TeamDetail({ teamName, onBack }: { teamName: string; onBack: () => void }) {
  const [players, setPlayers] = useState<Player[]>(INIT_PLAYERS);
  const [addModal, setAddModal] = useState(false);
  const [editIdx, setEditIdx] = useState<number | null>(null);
  const [editModal, setEditModal] = useState(false);
  const [teamEditModal, setTeamEditModal] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
  const [successMsg, setSuccessMsg] = useState("");

  // Form state for add/edit player
  const emptyForm = { name: "", nr: 0, position: "Zuspielerin", status: "Aktiv", geburtsdatum: "", passNr: "" };
  const [form, setForm] = useState<Player>(emptyForm);

  // Team edit form
  const [teamForm, setTeamForm] = useState({ trainer: "Michael Krause", halle: "Sporthalle Am Maschsee", training: "Di & Do 18:00–20:00" });

  const showSuccess = (msg: string) => { setSuccessMsg(msg); setTimeout(() => setSuccessMsg(""), 3000); };

  const openAdd = () => { setForm({ ...emptyForm, nr: Math.max(...players.map(p => p.nr), 0) + 2 }); setAddModal(true); };
  const openEdit = (idx: number) => { setForm({ ...players[idx] }); setEditIdx(idx); setEditModal(true); };

  const handleAdd = () => {
    if (!form.name.trim()) return;
    setPlayers(p => [...p, { ...form, passNr: form.passNr || `DVV-2026-${String(1000 + p.length).slice(1)}` }]);
    setAddModal(false);
    showSuccess(`${form.name} wurde zum Kader hinzugefügt.`);
  };

  const handleEdit = () => {
    if (editIdx === null || !form.name.trim()) return;
    setPlayers(p => p.map((pl, i) => i === editIdx ? { ...form } : pl));
    setEditModal(false);
    setEditIdx(null);
    showSuccess(`${form.name} wurde aktualisiert.`);
  };

  const handleDelete = (idx: number) => {
    const name = players[idx].name;
    setPlayers(p => p.filter((_, i) => i !== idx));
    setDeleteConfirm(null);
    showSuccess(`${name} wurde aus dem Kader entfernt.`);
  };

  const handleTeamSave = () => { setTeamEditModal(false); showSuccess("Teamdaten wurden gespeichert."); };

  const labelCls = "text-[11px] font-semibold text-text-dim uppercase tracking-wide mb-1.5 block";

  return (
    <div className="animate-fadeIn">
      {/* Success toast */}
      {successMsg && (
        <div className="fixed top-4 right-4 z-[999] bg-green text-white px-5 py-3 rounded-[10px] text-[13px] font-semibold shadow-lg animate-slideUp flex items-center gap-2">
          <Icon name="check" size={16} /> {successMsg}
        </div>
      )}

      <div className="flex items-center gap-3 mb-6 flex-wrap">
        <button onClick={onBack} className="p-1.5 rounded-lg hover:bg-s2 bg-transparent border border-border cursor-pointer transition-colors">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
        </button>
        <div className="flex-1 min-w-0">
          <h1 className="text-[22px] font-bold mb-0.5">{decodeURIComponent(teamName)}</h1>
          <p className="text-[13px] text-text-muted">Verbandsliga Nord · Saison 2025/26</p>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" onClick={() => setTeamEditModal(true)}>Bearbeiten</Button>
          <Button onClick={openAdd}>+ Spielerin melden</Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <div className="bg-s1 border border-border rounded-[10px] p-4 text-center">
          <div className="text-[24px] font-bold">{players.length}</div>
          <div className="text-[11px] text-text-muted font-semibold">Spielerinnen</div>
        </div>
        <div className="bg-s1 border border-border rounded-[10px] p-4 text-center">
          <div className="text-[24px] font-bold">{players.filter(p => p.status === "Aktiv").length}</div>
          <div className="text-[11px] text-text-muted font-semibold">Spielberechtigt</div>
        </div>
        <div className="bg-s1 border border-border rounded-[10px] p-4 text-center">
          <div className="text-[24px] font-bold">8/22</div>
          <div className="text-[11px] text-text-muted font-semibold">Spieltag</div>
        </div>
        <div className="bg-s1 border border-border rounded-[10px] p-4 text-center">
          <div className="text-[24px] font-bold">3.</div>
          <div className="text-[11px] text-text-muted font-semibold">Tabellenplatz</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-5">
        {/* Kader */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="text-xs font-bold text-text-muted uppercase tracking-wider">Kader ({players.length})</div>
            <Button size="sm" onClick={openAdd}>+ Spielerin hinzufügen</Button>
          </div>
          <div className="bg-s1 border border-border rounded-[10px] overflow-hidden">
            <table className="w-full border-collapse text-[13px]">
              <thead>
                <tr>
                  {["#", "Name", "Position", "Status", "Pass-Nr.", ""].map(h => (
                    <th key={h} className="text-[11px] font-semibold text-text-muted uppercase tracking-wide px-3.5 py-2.5 text-left border-b border-border">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {players.map((p, i) => (
                  <tr key={i} className="hover:bg-s2 group">
                    <td className="px-3.5 py-2.5 border-b border-border font-bold text-text-muted">{p.nr}</td>
                    <td className="px-3.5 py-2.5 border-b border-border">
                      <div className="font-semibold">{p.name}</div>
                      {p.geburtsdatum && <div className="text-[10px] text-text-muted">geb. {p.geburtsdatum}</div>}
                    </td>
                    <td className="px-3.5 py-2.5 border-b border-border text-text-dim">{p.position}</td>
                    <td className="px-3.5 py-2.5 border-b border-border">
                      <Badge color={p.status === "Aktiv" ? "green" : p.status === "Verletzt" ? "orange" : p.status === "Gesperrt" ? "red" : "gray"}>{p.status}</Badge>
                    </td>
                    <td className="px-3.5 py-2.5 border-b border-border text-[11px] text-text-muted font-mono">{p.passNr || "–"}</td>
                    <td className="px-3.5 py-2.5 border-b border-border">
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => openEdit(i)} className="bg-transparent border-0 cursor-pointer p-1 rounded hover:bg-s3 transition-colors" title="Bearbeiten">
                          <Icon name="edit-3" size={14} className="text-text-muted" />
                        </button>
                        <button onClick={() => setDeleteConfirm(i)} className="bg-transparent border-0 cursor-pointer p-1 rounded hover:bg-red-dim transition-colors" title="Entfernen">
                          <Icon name="x" size={14} className="text-red" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Rechte Spalte */}
        <div>
          <div className="text-xs font-bold text-text-muted uppercase tracking-wider mb-3">Letzte Spiele</div>
          <div className="space-y-2">
            {teamGames.map((g, i) => (
              <div key={i} className="bg-s1 border border-border rounded-[10px] p-3.5 flex items-center gap-3">
                <div className="text-xs text-text-muted w-[70px]">{g.date}</div>
                <div className="flex-1">
                  <div className="text-[13px] font-semibold">vs. {g.gegner}</div>
                  <div className="text-[11px] text-text-muted">{g.heim ? "Heimspiel" : "Auswärts"}</div>
                </div>
                <div className="text-sm font-bold font-mono">{g.ergebnis}</div>
              </div>
            ))}
          </div>

          <div className="text-xs font-bold text-text-muted uppercase tracking-wider mt-5 mb-3">Team Info</div>
          <div className="bg-s1 border border-border rounded-[10px] p-4 space-y-2.5 text-[13px]">
            {[
              ["Trainer", teamForm.trainer],
              ["Heimhalle", teamForm.halle],
              ["Trainingszeiten", teamForm.training],
              ["Meldung", "Bestätigt"],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between">
                <span className="text-text-muted">{k}</span>
                <span className="font-semibold">{v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Spielerin hinzufügen Modal ── */}
      <Modal open={addModal} onClose={() => setAddModal(false)} title="Spielerin melden">
        <div className="grid grid-cols-2 gap-3.5 mb-3.5">
          <div className="col-span-2"><label className={labelCls}>Name *</label><input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} placeholder="Vor- und Nachname" /></div>
          <div><label className={labelCls}>Trikotnummer *</label><input type="number" min={1} max={99} value={form.nr || ""} onChange={e => setForm(p => ({ ...p, nr: parseInt(e.target.value) || 0 }))} /></div>
          <div><label className={labelCls}>Position *</label>
            <select value={form.position} onChange={e => setForm(p => ({ ...p, position: e.target.value }))}>
              {POSITIONS.map(pos => <option key={pos}>{pos}</option>)}
            </select>
          </div>
          <div><label className={labelCls}>Geburtsdatum</label><input value={form.geburtsdatum} onChange={e => setForm(p => ({ ...p, geburtsdatum: e.target.value }))} placeholder="TT.MM.JJJJ" /></div>
          <div><label className={labelCls}>Pass-Nr.</label><input value={form.passNr} onChange={e => setForm(p => ({ ...p, passNr: e.target.value }))} placeholder="Wird automatisch vergeben" /></div>
        </div>
        <div className="flex gap-2 mt-4">
          <Button variant="ghost" className="flex-1" onClick={() => setAddModal(false)}>Abbrechen</Button>
          <Button className="flex-1" onClick={handleAdd} disabled={!form.name.trim() || !form.nr}>Spielerin melden</Button>
        </div>
      </Modal>

      {/* ── Spielerin bearbeiten Modal ── */}
      <Modal open={editModal} onClose={() => { setEditModal(false); setEditIdx(null); }} title={`${form.name} bearbeiten`}>
        <div className="grid grid-cols-2 gap-3.5 mb-3.5">
          <div className="col-span-2"><label className={labelCls}>Name *</label><input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} /></div>
          <div><label className={labelCls}>Trikotnummer *</label><input type="number" min={1} max={99} value={form.nr || ""} onChange={e => setForm(p => ({ ...p, nr: parseInt(e.target.value) || 0 }))} /></div>
          <div><label className={labelCls}>Position *</label>
            <select value={form.position} onChange={e => setForm(p => ({ ...p, position: e.target.value }))}>
              {POSITIONS.map(pos => <option key={pos}>{pos}</option>)}
            </select>
          </div>
          <div><label className={labelCls}>Geburtsdatum</label><input value={form.geburtsdatum || ""} onChange={e => setForm(p => ({ ...p, geburtsdatum: e.target.value }))} /></div>
          <div><label className={labelCls}>Status</label>
            <select value={form.status} onChange={e => setForm(p => ({ ...p, status: e.target.value }))}>
              {STATUS_OPTS.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
          <div className="col-span-2"><label className={labelCls}>Pass-Nr.</label><input value={form.passNr || ""} onChange={e => setForm(p => ({ ...p, passNr: e.target.value }))} className="!bg-s2" /></div>
        </div>
        <div className="flex gap-2 mt-4">
          <Button variant="ghost" className="flex-1" onClick={() => { setEditModal(false); setEditIdx(null); }}>Abbrechen</Button>
          <Button className="flex-1" onClick={handleEdit} disabled={!form.name.trim() || !form.nr}>Änderungen speichern</Button>
        </div>
      </Modal>

      {/* ── Team bearbeiten Modal ── */}
      <Modal open={teamEditModal} onClose={() => setTeamEditModal(false)} title="Teamdaten bearbeiten">
        <div className="space-y-3.5">
          <div><label className={labelCls}>Trainer</label><input value={teamForm.trainer} onChange={e => setTeamForm(p => ({ ...p, trainer: e.target.value }))} /></div>
          <div><label className={labelCls}>Heimhalle</label>
            <select value={teamForm.halle} onChange={e => setTeamForm(p => ({ ...p, halle: e.target.value }))}>
              <option>Sporthalle Am Maschsee</option><option>IGS-Halle Hannover</option><option>Turnhalle Bothfeld</option><option>Sporthalle Am Anger</option>
            </select>
          </div>
          <div><label className={labelCls}>Trainingszeiten</label><input value={teamForm.training} onChange={e => setTeamForm(p => ({ ...p, training: e.target.value }))} placeholder="z.B. Di & Do 18:00–20:00" /></div>
        </div>
        <div className="flex gap-2 mt-5">
          <Button variant="ghost" className="flex-1" onClick={() => setTeamEditModal(false)}>Abbrechen</Button>
          <Button className="flex-1" onClick={handleTeamSave}>Speichern</Button>
        </div>
      </Modal>

      {/* ── Löschen-Bestätigung ── */}
      {deleteConfirm !== null && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 999 }}>
          <div className="bg-s1 rounded-[14px] p-7 max-w-[400px] w-[90%] animate-slideUp">
            <div className="text-base font-bold mb-2">Spielerin entfernen?</div>
            <div className="text-[13px] text-text-dim mb-4">
              <strong>{players[deleteConfirm]?.name}</strong> (#{players[deleteConfirm]?.nr}) wird aus dem Kader entfernt. Diese Aktion kann nicht rückgängig gemacht werden.
            </div>
            <div className="flex gap-2 justify-end">
              <Button variant="ghost" onClick={() => setDeleteConfirm(null)}>Abbrechen</Button>
              <Button variant="danger" onClick={() => handleDelete(deleteConfirm)}>Entfernen</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [role, setRole] = useState<Role>("staffelleitung");
  const [screen, setScreen] = useState("dashboard");
  const [action, setAction] = useState<string | null>(null);
  const [newModal, setNewModal] = useState(false);
  const [roleModal, setRoleModal] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [accountMenu, setAccountMenu] = useState(false);

  const config = roleConfigs[role];
  // Resolve drill-down screen IDs (team-detail:UUID, match-detail:UUID, ligen:UUID) to their parent
  // so the breadcrumbs lookup uses a clean parent path instead of leaking the raw ID.
  const parentScreen = screen.startsWith("team-detail:") ? "mannschaften"
    : screen.startsWith("match-detail:") ? "live-ticker"
    : screen.startsWith("ligen:") ? "ligen"
    : screen;
  const rawCrumbs = config.breadcrumbs[parentScreen] || config.breadcrumbs[screen] || [config.subtitle || "DVV", parentScreen];

  // Build icon-enriched breadcrumbs (skip first level, only show 2nd + 3rd)
  const screenIcon = config.navSections.flatMap(s => s.items).find(i => i.id === screen)?.icon;
  const sectionIconMap: Record<string, string> = {};
  for (const s of config.navSections) {
    if (s.label) sectionIconMap[s.label] = s.items[0]?.icon || "";
  }
  // Map breadcrumb labels to navigable screen IDs
  const labelToScreen: Record<string, string> = {};
  for (const s of config.navSections) {
    for (const item of s.items) {
      labelToScreen[item.label] = item.id;
    }
  }
  // Also map known section-level labels
  for (const [screenId, crumbs] of Object.entries(config.breadcrumbs)) {
    for (const crumb of crumbs) {
      if (!labelToScreen[crumb]) {
        // Check if this crumb label matches a nav item label
        const found = config.navSections.flatMap(s => s.items).find(i => i.label === crumb);
        if (found) labelToScreen[crumb] = found.id;
      }
    }
  }
  // Direct mappings for common drilldown parents
  labelToScreen["Live-Ticker"] = "live-ticker";
  labelToScreen["Spieltagsübersicht"] = "spieltag";
  labelToScreen["Ligen"] = "liga-uebersicht";

  const crumbsWithIcons = rawCrumbs.slice(1).map((label: string, i: number, arr: string[]) => ({
    label,
    icon: i === arr.length - 1 ? screenIcon : sectionIconMap[label],
    onClick: i < arr.length - 1 && labelToScreen[label] ? () => setScreen(labelToScreen[label]) : undefined,
  }));

  // Map drilldown screens to their parent nav item for sidebar highlighting
  const drilldownParent: Record<string, string> = {
    "match-detail": "live-ticker",
  };
  const allNavIds = new Set(config.navSections.flatMap(s => s.items.map(i => i.id)));
  const sidebarActiveScreen = allNavIds.has(screen)
    ? screen
    : screen.startsWith("team-detail:") ? "mannschaften"
    : screen.startsWith("match-detail:") ? "live-ticker"
    : screen.startsWith("ligen:") ? "ligen"
    : drilldownParent[screen] || screen;

  const switchRole = (r: Role) => {
    setRole(r);
    setScreen(roleConfigs[r].defaultScreen);
    setRoleModal(false);
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* Topbar – responsive */}
      <div className="flex items-center px-3 md:px-6 shrink-0 gap-2 md:gap-4 w-full" style={{ background: "#15153a", height: 76, minHeight: 76 }}>
        {/* Mobile hamburger */}
        <button className="md:hidden p-1.5 bg-transparent border-0 cursor-pointer shrink-0" onClick={() => setMobileNav(true)}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
        </button>

        {/* Left: Profile pill + sidebar toggle — aligned with sidebar width */}
        <div className="hidden md:flex items-center gap-3 shrink-0" style={{ width: sidebarCollapsed ? 84 : 304, minWidth: sidebarCollapsed ? 84 : 304, transition: "width 0.2s, min-width 0.2s" }}>
          <div
            className="flex items-center gap-3 rounded-lg cursor-pointer flex-1 min-w-0"
            style={{ background: "rgba(255,255,255,0.05)", padding: sidebarCollapsed ? "10px" : "10px 16px", justifyContent: sidebarCollapsed ? "center" : "flex-start", transition: "padding 0.2s" }}
            onClick={() => setRoleModal(true)}
          >
            <div className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center shrink-0" style={{ background: "#794dff" }}>
              <span className="text-[11px] font-bold text-white">{config.initials}</span>
            </div>
            {!sidebarCollapsed && (
              <>
                <div className="min-w-0 flex-1">
                  <div className="text-white text-[14px] font-semibold truncate">{config.userName}</div>
                  <div className="text-[#f8f7fb] text-[14px] font-light truncate">{config.label}</div>
                </div>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" className="shrink-0"><polyline points="6 9 12 15 18 9" /></svg>
              </>
            )}
          </div>
          <button
            className="p-1.5 bg-transparent border-0 cursor-pointer hover:bg-white/10 rounded transition-colors shrink-0"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            title={sidebarCollapsed ? "Sidebar einblenden" : "Sidebar ausblenden"}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <path d="M9 3v18" />
              {sidebarCollapsed && <path d="M14 10l3 2-3 2" />}
            </svg>
          </button>
        </div>

        {/* Center: beauOS logo */}
        <div className="flex-1 flex justify-center items-center">
          <img src="/beau-logo.svg" alt="beauOS" className="w-[120px] h-auto object-contain" style={{ filter: "brightness(0) invert(1)" }} />
        </div>

        {/* Right: Search, icons with tooltips, New, avatar */}
        <div className="flex items-center gap-1.5 md:gap-3 shrink-0">
          {/* Search bar - functional */}
          <div className="hidden lg:flex items-center gap-1.5 border border-white/20 rounded-md px-3 h-[38px] focus-within:border-white/40 transition-colors cursor-text" style={{ width: 300 }} onClick={e => { const inp = e.currentTarget.querySelector("input"); inp?.focus(); }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
            <input placeholder="Suchen..." className="!bg-transparent !border-0 !outline-none !text-white !text-[13px] !w-full !h-auto !p-0 placeholder:!text-white/40" style={{ fontFamily: "inherit" }} />
          </div>
          {/* Search icon on mobile */}
          <button className="lg:hidden p-1 bg-transparent border-0 cursor-pointer" title="Suche">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
          </button>
          <div className="hidden md:flex items-center gap-0.5">
            <button className="p-1 bg-transparent border-0 cursor-pointer hover:bg-white/10 rounded transition-colors" title="Darstellung">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5"><circle cx="12" cy="12" r="5" /><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" /></svg>
            </button>
            <button className="p-1 bg-transparent border-0 cursor-pointer hover:bg-white/10 rounded transition-colors relative" title="Benachrichtigungen" onClick={() => setScreen("mail")}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>
              <div style={{ position: "absolute", top: 2, right: 2, width: 7, height: 7, borderRadius: "50%", background: "#ef4444", border: "2px solid #15153a" }} />
            </button>
            <button className="p-1 bg-transparent border-0 cursor-pointer hover:bg-white/10 rounded transition-colors" title="Apps & Schnellzugriff">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5"><circle cx="7" cy="7" r="3" /><circle cx="17" cy="7" r="3" /><circle cx="7" cy="17" r="3" /><circle cx="17" cy="17" r="3" /></svg>
            </button>
          </div>
          <Button size="sm" className="hidden sm:inline-flex" onClick={() => setNewModal(true)}>+ Neu erstellen</Button>
          {/* Account Avatar + Dropdown */}
          <div className="relative">
            <div
              className="w-[38px] h-[38px] rounded-full flex items-center justify-center text-[14px] font-medium text-white cursor-pointer shrink-0 transition-all hover:ring-2 hover:ring-white/20"
              style={{ background: "#794dff" }}
              onClick={() => setAccountMenu(!accountMenu)}
            >
              {config.initials}
            </div>
            {accountMenu && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setAccountMenu(false)} />
                <div className="absolute top-[calc(100%+8px)] right-0 bg-s1 border border-border rounded-xl shadow-lg min-w-[260px] z-50 overflow-hidden animate-fadeIn py-2">
                  {/* Profile */}
                  <div className="flex items-center gap-3 px-4 py-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-[14px] font-semibold text-white shrink-0" style={{ background: "#794dff" }}>
                      {config.initials}
                    </div>
                    <div className="min-w-0">
                      <div className="text-[15px] font-semibold text-text truncate">{config.userName}</div>
                      <div className="text-[13px] text-text-muted truncate">{config.userName.toLowerCase().replace(/\s/g, ".").replace(/[^a-z.]/g, "")}@dvv.de</div>
                    </div>
                  </div>
                  <div className="mx-3 border-t border-border" />
                  {/* Menu Items */}
                  <div className="py-1 px-2">
                    <button onClick={() => { setAccountMenu(false); }} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-[14px] text-text hover:bg-s2 transition-colors cursor-pointer text-left bg-transparent border-none bg-s2">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-text-muted shrink-0"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9"/></svg>
                      Mein Konto
                    </button>
                    <button onClick={() => setAccountMenu(false)} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-[14px] text-text hover:bg-s2 transition-colors cursor-pointer text-left bg-transparent border-none">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-text-muted shrink-0"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
                      Hilfe-Center
                    </button>
                    <button onClick={() => setAccountMenu(false)} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-[14px] text-text hover:bg-s2 transition-colors cursor-pointer text-left bg-transparent border-none">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-text-muted shrink-0"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                      DVV Website
                    </button>
                  </div>
                  <div className="mx-3 border-t border-border" />
                  {/* Sign Out */}
                  <div className="py-1 px-2">
                    <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-[14px] text-red hover:bg-red-dim transition-colors cursor-pointer text-left bg-transparent border-none">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                      Abmelden
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Below topbar: sidebar + content side by side */}
      <div className="flex-1 flex min-h-0 overflow-hidden p-6 gap-0" style={{ background: "#f6f5f9" }}>
        <div className="shrink-0" style={{ width: sidebarCollapsed ? 84 : 276, transition: "width 0.2s" }}>
          <div style={{ borderRadius: 12, overflow: "hidden", height: "100%" }}>
            <Sidebar active={sidebarActiveScreen} onNavigate={setScreen} navSections={config.navSections} mobileOpen={mobileNav} onMobileClose={() => setMobileNav(false)} collapsed={sidebarCollapsed} onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)} />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto px-6 pt-0 pb-0">
          {/* Breadcrumbs */}
          <Breadcrumbs items={screen.startsWith("team-detail:") ? [...crumbsWithIcons, { label: decodeURIComponent(screen.replace("team-detail:", "")), icon: "users" }] : crumbsWithIcons} />
          {screen === "dashboard" && role === "staffelleitung" && <Dashboard onNavigate={setScreen} />}
          {screen === "dashboard" && role === "clubadmin" && <ClubDashboard onNavigate={setScreen} />}
          {screen === "dashboard" && role === "verbandsadmin" && <VerbandDashboard onNavigate={setScreen} />}
          {screen === "dashboard" && role === "socialmedia" && <VerbandDashboard onNavigate={setScreen} />}
          {(screen === "ligen" || screen.startsWith("ligen:")) && <Ligen initialLiga={screen.startsWith("ligen:") ? screen.replace("ligen:", "") : undefined} />}
          {screen === "spieltag" && <Spieltag />}
          {screen === "spielplan" && <Spielplan onNavigate={setScreen} />}
          {screen === "heimspieltermine" && <Heimspieltermine />}
          {(screen === "mannschaft" || screen === "spielermeldung") && <Mannschaft action={action} onActionHandled={() => setAction(null)} />}
          {screen === "mannschaften" && <Mannschaften onNavigate={setScreen} action={action} onActionHandled={() => setAction(null)} />}
          {screen.startsWith("team-detail:") && <TeamDetail teamName={screen.replace("team-detail:", "")} onBack={() => setScreen(role === "clubadmin" ? "mannschaften" : "alle-mannschaften")} />}
          {screen === "alle-ligen" && <AlleLigen onNavigate={setScreen} />}
          {screen === "alle-mannschaften" && <AlleMannschaften onNavigate={setScreen} />}
          {screen === "vereine" && <Vereine onNavigate={setScreen} />}
          {screen === "statistik" && role === "benutzer" && <PlayerDashboardShell />}
          {screen === "statistik" && role === "clubadmin" && <CoachDashboardShell />}
          {screen === "statistik" && role !== "benutzer" && role !== "clubadmin" && <Statistik />}
          {screen === "player-stats" && <PlayerDashboardShell />}
          {screen === "coach-stats" && <CoachDashboardShell />}
          {screen === "veranstaltung" && <Veranstaltung onNavigate={setScreen} />}
          {screen === "veranstaltungen" && <Veranstaltungen onNavigate={setScreen} />}
          {screen === "turnier" && <Turnier />}
          {screen === "rechnungen" && <Rechnungen action={action} onActionHandled={() => setAction(null)} role={role} />}
          {screen === "cms" && <Cms />}
          {screen === "nominierung" && <Nominierung />}
          {screen === "passkontrolle" && <Passkontrolle />}
          {screen === "mail" && <Mail />}
          {screen === "kalender" && <Kalender />}
          {screen === "kontakte" && <Kontakte />}
          {screen === "strafen" && <Strafen />}
          {/* P1: Stammdatenverwaltung */}
          {screen === "organisationen" && <Organisationen />}
          {screen === "personen" && <Personen />}
          {screen === "spielstaetten" && <Spielstaetten />}
          {screen === "rechte-rollen" && <RechteRollen />}
          {screen === "ehrungen" && <Ehrungen />}
          {/* P1: Lizenzwesen */}
          {screen === "lizenz-dashboard" && <LizenzDashboard />}
          {screen === "lizenz-queue" && <LizenzQueue />}
          {screen === "lizenz-config" && <LizenzConfig />}
          {screen === "lizenz-uebersicht-spieler" && <LizenzUebersichtSpieler />}
          {/* P1: Sportlicher Wettbewerb */}
          {screen === "liga-uebersicht" && <LigaUebersicht />}
          {screen === "spielplan-verwaltung" && <SpielplanVerwaltung />}
          {screen === "live-ticker" && <LiveTicker onNavigate={setScreen} />}
          {screen === "beach-turniere" && <BeachTurniere />}
          {screen === "spielanalyse" && <Spielanalyse />}
          {/* P2: Verbandsorganisation */}
          {screen === "finanz-dashboard" && <FinanzDashboard />}
          {screen === "automationen" && <Automationen />}
          {screen === "reporting" && <Reporting />}
          {/* P2: Schiedsrichtereinsatztool */}
          {screen === "sr-ansetzung" && <SrAnsetzung />}
          {screen === "sr-pool" && <SrPool />}
          {screen === "sr-fahrtkosten" && <SrFahrtkosten />}
          {/* P3: Kommunikation, Bildung */}
          {screen === "kommunikation" && <Kommunikation />}
          {screen === "lehrgaenge" && <Lehrgaenge />}
          {/* P4: Sponsoren, Shop */}
          {screen === "sponsoren" && <Sponsoren />}
          {screen === "shop" && <Shop />}
          {/* Verein */}
          {screen === "vereins-mitglieder" && <VereinsMitglieder />}
          {/* Match Detail */}
          {screen === "match-detail" && <MatchDetail />}
          {/* Neue Feature-Screens */}
          {screen === "spielbericht" && <Spielbericht />}
          {screen === "spieler-self-service" && <SpielerSelfService />}
          {screen === "social-briefing" && <SocialBriefing />}
          {screen === "social-review" && <SocialReview />}
          {screen === "matchday-master" && <MatchDayMaster />}
          {screen === "support-center" && <SupportCenter onNavigate={setScreen} />}
          {screen === "dvv-analytics" && <DvvAnalytics />}
          {/* Analytics & KI */}
          {screen === "aeo-analytics" && <AeoAnalytics />}
          {screen === "web-performance" && <WebPerformance />}
          {screen === "staffelplanung" && <Staffelplanung />}
        </div>
      </div>

      {/* Neu erstellen Modal */}
      <Modal open={newModal} onClose={() => setNewModal(false)} title="Neu erstellen">
        <div className="grid grid-cols-2 gap-2.5">
          {config.newModalItems.map((item) => (
            <div
              key={item.nav + item.name}
              className={`bg-s2 border border-border rounded-[10px] p-4 cursor-pointer transition-all hover:bg-s3 hover:-translate-y-px border-l-[3px] ${item.border}`}
              onClick={() => { setScreen(item.nav); setAction(item.action || null); setNewModal(false); }}
            >
              <div className="mb-2 text-text-muted"><Icon name={item.icon} size={22} /></div>
              <div className="text-sm font-bold">{item.name}</div>
              <div className="text-xs text-text-muted">{item.desc}</div>
            </div>
          ))}
        </div>
      </Modal>

      {/* Role Switcher Modal */}
      <Modal open={roleModal} onClose={() => setRoleModal(false)} title="Rolle wechseln">
        <div className="text-xs text-text-muted mb-3">Wähle eine Perspektive für die Demo</div>
        <div className="space-y-2">
          {(Object.keys(roleConfigs) as Role[]).map(r => {
            const rc = roleConfigs[r];
            const isActive = r === role;
            return (
              <div
                key={r}
                className={`flex items-center gap-3 p-3.5 rounded-[10px] border cursor-pointer transition-all ${isActive ? "bg-accent-dim border-accent" : "bg-s2 border-border hover:bg-s3"}`}
                onClick={() => switchRole(r)}
              >
                <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${rc.gradient} flex items-center justify-center text-sm font-bold text-white shrink-0`}>
                  {rc.initials}
                </div>
                <div className="flex-1">
                  <div className="text-sm font-bold">{rc.label}</div>
                  <div className="text-[11px] text-text-muted">{rc.userName} · {rc.subtitle}</div>
                </div>
                {isActive && <span className="text-accent text-xs font-bold">Aktiv</span>}
              </div>
            );
          })}
        </div>
      </Modal>

      {/* Contextual Chat Widget — always visible */}
      <ChatWidget currentScreen={screen} />
    </div>
  );
}
