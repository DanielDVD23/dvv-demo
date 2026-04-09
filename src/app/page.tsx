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
import AlleLigen from "@/components/screens/AlleLigen";
import AlleMannschaften from "@/components/screens/AlleMannschaften";
import Vereine from "@/components/screens/Vereine";
import Veranstaltungen from "@/components/screens/Veranstaltungen";
import Kontakte from "@/components/screens/Kontakte";
import Kalender from "@/components/screens/Kalender";
import Strafen from "@/components/screens/Strafen";
import Mail from "@/components/screens/Mail";
import Spielplan from "@/components/screens/Spielplan";
import KnowledgeBase from "@/components/screens/KnowledgeBase";
import ChatWidget from "@/components/ChatWidget";
import GuidedTour from "@/components/GuidedTour";
import HelperTooltip from "@/components/ui/HelperTooltip";
import Icon from "@/components/ui/Icon";
import Badge from "@/components/ui/Badge";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { roleConfigs } from "@/config/roles";
import type { Role } from "@/types/roles";
import tooltipContent from "@/data/tooltipContent.json";

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
          <div><label className={labelCls}>Trikotnummer * <HelperTooltip content={tooltipContent.screens.mannschaft.trikotnummer} /></label><input type="number" min={1} max={99} value={form.nr || ""} onChange={e => setForm(p => ({ ...p, nr: parseInt(e.target.value) || 0 }))} /></div>
          <div><label className={labelCls}>Position * <HelperTooltip content={tooltipContent.screens.mannschaft.position} /></label>
            <select value={form.position} onChange={e => setForm(p => ({ ...p, position: e.target.value }))}>
              {POSITIONS.map(pos => <option key={pos}>{pos}</option>)}
            </select>
          </div>
          <div><label className={labelCls}>Geburtsdatum <HelperTooltip content={tooltipContent.screens.mannschaft.geburtsdatum} /></label><input value={form.geburtsdatum} onChange={e => setForm(p => ({ ...p, geburtsdatum: e.target.value }))} placeholder="TT.MM.JJJJ" /></div>
          <div><label className={labelCls}>Pass-Nr. <HelperTooltip content={tooltipContent.screens.mannschaft.passNr} /></label><input value={form.passNr} onChange={e => setForm(p => ({ ...p, passNr: e.target.value }))} placeholder="Wird automatisch vergeben" /></div>
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
          <div><label className={labelCls}>Trikotnummer * <HelperTooltip content={tooltipContent.screens.mannschaft.trikotnummer} /></label><input type="number" min={1} max={99} value={form.nr || ""} onChange={e => setForm(p => ({ ...p, nr: parseInt(e.target.value) || 0 }))} /></div>
          <div><label className={labelCls}>Position * <HelperTooltip content={tooltipContent.screens.mannschaft.position} /></label>
            <select value={form.position} onChange={e => setForm(p => ({ ...p, position: e.target.value }))}>
              {POSITIONS.map(pos => <option key={pos}>{pos}</option>)}
            </select>
          </div>
          <div><label className={labelCls}>Geburtsdatum <HelperTooltip content={tooltipContent.screens.mannschaft.geburtsdatum} /></label><input value={form.geburtsdatum || ""} onChange={e => setForm(p => ({ ...p, geburtsdatum: e.target.value }))} /></div>
          <div><label className={labelCls}>Status <HelperTooltip content={tooltipContent.screens.mannschaft.status} /></label>
            <select value={form.status} onChange={e => setForm(p => ({ ...p, status: e.target.value }))}>
              {STATUS_OPTS.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
          <div className="col-span-2"><label className={labelCls}>Pass-Nr. <HelperTooltip content={tooltipContent.screens.mannschaft.passNr} /></label><input value={form.passNr || ""} onChange={e => setForm(p => ({ ...p, passNr: e.target.value }))} className="!bg-s2" /></div>
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
  const [tourActive, setTourActive] = useState(false);
  const [onboardingCompleted, setOnboardingCompleted] = useState<Record<Role, boolean>>({
    staffelleitung: false,
    clubadmin: false,
    verbandsadmin: false,
  });

  const config = roleConfigs[role];
  const crumbs = config.breadcrumbs[screen] || ["NWVV", screen];

  const switchRole = (r: Role) => {
    setRole(r);
    setScreen(roleConfigs[r].defaultScreen);
    setRoleModal(false);
    // Auto-start tour for new role if not completed
    if (!onboardingCompleted[r]) {
      setTimeout(() => setTourActive(true), 500);
    }
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* Topbar – responsive */}
      <div className="flex items-center px-3 md:px-6 shrink-0 gap-2 md:gap-4 w-full" style={{ background: "#15153a", height: 56, minHeight: 56 }}>
        {/* Mobile hamburger */}
        <button className="md:hidden p-1.5 bg-transparent border-0 cursor-pointer shrink-0" onClick={() => setMobileNav(true)}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
        </button>

        {/* Left: Profile pill – matches sidebar width (240px / 60px) */}
        <div
          className="hidden md:flex items-center gap-3 px-4 py-1.5 rounded-lg cursor-pointer shrink-0 box-border"
          style={{ background: "rgba(255,255,255,0.05)", width: 240, minWidth: 240 }}
          onClick={() => setRoleModal(true)}
        >
          <div className={`w-7 h-7 rounded-full bg-gradient-to-br ${config.gradient} flex items-center justify-center text-[10px] font-bold text-white shrink-0`}>{config.initials}</div>
          <div className="min-w-0 flex-1">
            <div className="text-white text-[13px] font-semibold truncate">{config.userName}</div>
            <div className="text-[#f8f7fb] text-[12px] font-light truncate">{config.label}</div>
          </div>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" className="shrink-0"><polyline points="6 9 12 15 18 9" /></svg>
        </div>

        {/* Center: beauOS logo */}
        <div className="flex-1 flex justify-center items-center">
          <img src="/beau-logo.svg" alt="beauOS" className="w-[120px] h-auto object-contain" style={{ filter: "brightness(0) invert(1)" }} />
        </div>

        {/* Right: Search, icons with tooltips, New, avatar */}
        <div className="flex items-center gap-1.5 md:gap-3 shrink-0">
          {/* Search bar - functional */}
          <div className="hidden lg:flex items-center gap-1.5 border border-white/20 rounded-md px-3 h-[34px] focus-within:border-white/40 transition-colors cursor-text" style={{ width: 200 }} onClick={e => { const inp = e.currentTarget.querySelector("input"); inp?.focus(); }}>
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
          <Button size="sm" className="hidden sm:inline-flex" onClick={() => setNewModal(true)} data-tour="new-button">+ Neu erstellen</Button>
          <div
            className="w-[32px] h-[32px] rounded-full flex items-center justify-center text-[12px] font-medium text-white cursor-pointer shrink-0"
            style={{ background: "#794dff" }}
            onClick={() => setRoleModal(true)}
            title="Rolle wechseln"
            data-tour="role-switcher"
          >
            {config.initials}
          </div>
        </div>
      </div>

      {/* Below topbar: sidebar + content side by side */}
      <div className="flex-1 flex min-h-0 overflow-hidden">
        <div data-tour="sidebar">
          <Sidebar active={screen} onNavigate={setScreen} navSections={config.navSections} mobileOpen={mobileNav} onMobileClose={() => setMobileNav(false)} />
        </div>
        <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-bg">
          {/* Breadcrumbs */}
          <Breadcrumbs items={screen.startsWith("team-detail:") ? [...(crumbs || ["NWVV"]), "Alle Mannschaften", decodeURIComponent(screen.replace("team-detail:", ""))] : crumbs} onNavigate={setScreen} />
          <div data-tour="dashboard">
          {screen === "dashboard" && role === "staffelleitung" && <Dashboard onNavigate={setScreen} />}
          {screen === "dashboard" && role === "clubadmin" && <ClubDashboard onNavigate={setScreen} />}
          {screen === "dashboard" && role === "verbandsadmin" && <VerbandDashboard onNavigate={setScreen} />}
          </div>
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
          {screen === "statistik" && <Statistik />}
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
          {screen === "knowledge-base" && <KnowledgeBase role={role} onNavigate={setScreen} />}
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

      {/* Chat Widget (replaces HelpPanel) */}
      <ChatWidget
        userRole={role}
        currentScreen={screen}
        onNavigate={setScreen}
        onStartTour={() => setTourActive(true)}
      />

      {/* Guided Tour Overlay */}
      <GuidedTour
        role={role}
        active={tourActive}
        onComplete={() => {
          setTourActive(false);
          setOnboardingCompleted((prev) => ({ ...prev, [role]: true }));
        }}
        onDismiss={() => {
          setTourActive(false);
          setOnboardingCompleted((prev) => ({ ...prev, [role]: true }));
        }}
      />
    </div>
  );
}
