"use client";

import { useState } from "react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Modal from "@/components/ui/Modal";
import KpiCard from "@/components/ui/KpiCard";
import SectionHeader from "@/components/ui/SectionHeader";
import ExportDropdown from "@/components/ui/ExportDropdown";
import ClubLogo from "@/components/ui/ClubLogo";

interface Verein {
  name: string;
  vereinsNr: string;
  bezirk: string;
  mannschaften: number;
  mitglieder: number;
  status: "Aktiv" | "Inaktiv";
  anschrift: string;
  kontaktEmail: string;
  kontaktTel: string;
  teams: { name: string; liga: string; status: string }[];
  rechnungen: { nr: string; typ: string; betrag: string; status: string }[];
  funktionaere: { name: string; rolle: string; email: string }[];
  strafen: { datum: string; tatbestand: string; betrag: string; status: string }[];
}

const vereine: Verein[] = [
  { name: "BERLIN RECYCLING Volleys", vereinsNr: "NWVV-0012", bezirk: "Hannover", mannschaften: 4, mitglieder: 285, status: "Aktiv", anschrift: "Eilenriede 42, 30169 Hannover", kontaktEmail: "info@br-volleys.de", kontaktTel: "0511 / 12345",
    teams: [{ name: "Damen 1", liga: "Verbandsliga Nord", status: "Bestätigt" }, { name: "Herren 1", liga: "Verbandsliga Nord", status: "Bestätigt" }, { name: "Damen 2", liga: "Bezirksliga", status: "Bestätigt" }, { name: "Herren 2", liga: "Kreisliga", status: "Gemeldet" }],
    rechnungen: [{ nr: "RE-2026-0412", typ: "Liga-Beitrag", betrag: "€ 890", status: "Bezahlt" }, { nr: "RE-2026-0398", typ: "Veranstaltung", betrag: "€ 350", status: "Offen" }],
    funktionaere: [{ name: "Thomas Weber", rolle: "1. Vorsitzender", email: "weber@br-volleys.de" }, { name: "Martina Schulz", rolle: "Geschäftsführerin", email: "schulz@br-volleys.de" }, { name: "Klaus Fischer", rolle: "Jugendwart", email: "fischer@br-volleys.de" }],
    strafen: [{ datum: "12.01.2026", tatbestand: "Verspätete Meldung (§ 8.3)", betrag: "€ 50", status: "Bezahlt" }] },
  { name: "SSC Palmberg Schwerin", vereinsNr: "NWVV-0034", bezirk: "Hannover", mannschaften: 3, mitglieder: 180, status: "Aktiv", anschrift: "Sporthalle Süd, 37075 Göttingen", kontaktEmail: "kontakt@ssc-schwerin.de", kontaktTel: "0551 / 67890",
    teams: [{ name: "Damen 1", liga: "Bezirksliga", status: "Bestätigt" }, { name: "Herren 2", liga: "Bezirksliga", status: "In Prüfung" }],
    rechnungen: [{ nr: "RE-2026-0399", typ: "Liga-Beitrag", betrag: "€ 240", status: "Fällig" }],
    funktionaere: [{ name: "Anna Becker", rolle: "1. Vorsitzende", email: "becker@ssc-schwerin.de" }],
    strafen: [] },
  { name: "VfB Friedrichshafen", vereinsNr: "NWVV-0056", bezirk: "Braunschweig", mannschaften: 2, mitglieder: 145, status: "Aktiv", anschrift: "Haupthalle, 38440 Wolfsburg", kontaktEmail: "info@vfb-friedrichshafen.de", kontaktTel: "05361 / 11111",
    teams: [{ name: "Herren 1", liga: "Verbandsliga Nord", status: "Bestätigt" }],
    rechnungen: [{ nr: "RE-2026-0401", typ: "Veranstaltung", betrag: "€ 925", status: "Offen" }],
    funktionaere: [{ name: "Peter Müller", rolle: "1. Vorsitzender", email: "mueller@vfb-friedrichshafen.de" }],
    strafen: [{ datum: "05.02.2026", tatbestand: "Nicht-Antritt (§ 14.1)", betrag: "€ 75", status: "Offen" }] },
  { name: "Allianz MTV Stuttgart", vereinsNr: "NWVV-0078", bezirk: "Weser-Ems", mannschaften: 2, mitglieder: 120, status: "Aktiv", anschrift: "Am Sportpark 1, 33602 Bielefeld", kontaktEmail: "info@allianz-mtv-stuttgart.de", kontaktTel: "0521 / 22222",
    teams: [{ name: "Damen 1", liga: "Verbandsliga Süd", status: "Bestätigt" }],
    rechnungen: [], funktionaere: [{ name: "Sabine Lang", rolle: "1. Vorsitzende", email: "lang@allianz-mtv-stuttgart.de" }], strafen: [] },
  { name: "Rote Raben Vilsbiburg", vereinsNr: "NWVV-0089", bezirk: "Braunschweig", mannschaften: 1, mitglieder: 95, status: "Aktiv", anschrift: "Nebenplatz 3, 38440 Wolfsburg", kontaktEmail: "info@rote-raben.de", kontaktTel: "05361 / 33333",
    teams: [{ name: "Damen 1", liga: "Bezirksliga", status: "Gemeldet" }],
    rechnungen: [{ nr: "RE-2026-0410", typ: "Liga-Beitrag", betrag: "€ 180", status: "Offen" }],
    funktionaere: [{ name: "Martin Koch", rolle: "1. Vorsitzender", email: "koch@rote-raben.de" }], strafen: [] },
  { name: "NawaRo Straubing", vereinsNr: "NWVV-0091", bezirk: "Hannover", mannschaften: 1, mitglieder: 68, status: "Aktiv", anschrift: "Turnhalle Süd, 31134 Hildesheim", kontaktEmail: "info@nawaro-straubing.de", kontaktTel: "05121 / 44444",
    teams: [{ name: "Herren 1", liga: "Kreisliga", status: "Abgelehnt" }],
    rechnungen: [], funktionaere: [{ name: "Hans Meier", rolle: "1. Vorsitzender", email: "meier@nawaro-straubing.de" }], strafen: [] },
  { name: "SWD powervolleys Düren", vereinsNr: "NWVV-0102", bezirk: "Braunschweig", mannschaften: 2, mitglieder: 155, status: "Aktiv", anschrift: "Hauptsporthalle, 38100 Braunschweig", kontaktEmail: "info@powervolleys.de", kontaktTel: "0531 / 55555",
    teams: [{ name: "Herren 1", liga: "Bezirksliga Braunschweig", status: "In Prüfung" }],
    rechnungen: [{ nr: "RE-2026-0415", typ: "Liga-Beitrag", betrag: "€ 240", status: "Bezahlt" }],
    funktionaere: [{ name: "Uwe Schmidt", rolle: "1. Vorsitzender", email: "schmidt@powervolleys.de" }], strafen: [] },
  { name: "VfL Oythe", vereinsNr: "NWVV-0115", bezirk: "Weser-Ems", mannschaften: 1, mitglieder: 82, status: "Aktiv", anschrift: "Halle Nord, 49074 Osnabrück", kontaktEmail: "info@vfl-oythe.de", kontaktTel: "0541 / 66666",
    teams: [{ name: "Herren 1", liga: "Kreisliga", status: "Gemeldet" }],
    rechnungen: [], funktionaere: [{ name: "Petra Wagner", rolle: "1. Vorsitzende", email: "wagner@vfl-oythe.de" }], strafen: [] },
  { name: "TV Rottenburg", vereinsNr: "NWVV-0128", bezirk: "Hannover", mannschaften: 1, mitglieder: 72, status: "Aktiv", anschrift: "Sporthalle Ost, 37073 Göttingen", kontaktEmail: "info@tv-rottenburg.de", kontaktTel: "0551 / 77777",
    teams: [{ name: "Mixed 1", liga: "Kreisliga Göttingen", status: "Bestätigt" }],
    rechnungen: [], funktionaere: [{ name: "Karl Braun", rolle: "1. Vorsitzender", email: "braun@tv-rottenburg.de" }], strafen: [] },
  { name: "USC Münster", vereinsNr: "NWVV-0140", bezirk: "Weser-Ems", mannschaften: 1, mitglieder: 110, status: "Aktiv", anschrift: "Ahorn-Sportpark, 33098 Paderborn", kontaktEmail: "info@usc-muenster.de", kontaktTel: "05251 / 88888",
    teams: [{ name: "Damen 1", liga: "Verbandsliga Süd", status: "Bestätigt" }],
    rechnungen: [{ nr: "RE-2026-0420", typ: "Liga-Beitrag", betrag: "€ 420", status: "Bezahlt" }],
    funktionaere: [{ name: "Eva Richter", rolle: "1. Vorsitzende", email: "richter@usc-muenster.de" }], strafen: [] },
  { name: "SVG Lüneburg", vereinsNr: "NWVV-0155", bezirk: "Hannover", mannschaften: 0, mitglieder: 45, status: "Inaktiv", anschrift: "Ilmenau-Halle, 21335 Lüneburg", kontaktEmail: "info@svg-lueneburg.de", kontaktTel: "04131 / 99999",
    teams: [], rechnungen: [], funktionaere: [{ name: "Dirk Vogel", rolle: "1. Vorsitzender", email: "vogel@svg-lueneburg.de" }], strafen: [] },
];

const statusBadge = { "Aktiv": "green" as const, "Inaktiv": "gray" as const };
const rechnungStatusColor: Record<string, "green" | "orange" | "red" | "blue"> = { "Bezahlt": "green", "Offen": "blue", "Fällig": "orange", "Überfällig": "red" };
const teamStatusColor: Record<string, "green" | "orange" | "blue" | "red"> = { "Bestätigt": "green", "In Prüfung": "orange", "Gemeldet": "blue", "Abgelehnt": "red" };

export default function Vereine({ onNavigate }: { onNavigate: (screen: string) => void }) {
  const [search, setSearch] = useState("");
  const [filterBezirk, setFilterBezirk] = useState("Alle");
  const [filterStatus, setFilterStatus] = useState("Alle");
  const [selectedVerein, setSelectedVerein] = useState<Verein | null>(null);
  const [activeTab, setActiveTab] = useState<"mannschaften" | "rechnungen" | "funktionaere" | "strafen">("mannschaften");

  const bezirke = [...new Set(vereine.map(v => v.bezirk))];

  const filtered = vereine.filter(v => {
    if (search && !v.name.toLowerCase().includes(search.toLowerCase()) && !v.vereinsNr.toLowerCase().includes(search.toLowerCase())) return false;
    if (filterBezirk !== "Alle" && v.bezirk !== filterBezirk) return false;
    if (filterStatus !== "Alle" && v.status !== filterStatus) return false;
    return true;
  });

  const totalActive = vereine.filter(v => v.status === "Aktiv").length;
  const totalMitglieder = vereine.reduce((s, v) => s + v.mitglieder, 0);
  const avgMitglieder = Math.round(totalMitglieder / vereine.length);

  return (
    <div className="animate-fadeIn">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-[22px] font-bold mb-1">Vereine</h1>
          <p className="text-[13px] text-text-muted">Vereinsverwaltung · Übersicht aller gemeldeten Vereine</p>
        </div>
        <ExportDropdown formats={["CSV", "PDF", "DATEV"]} />
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-5">
        <KpiCard label="Gesamt Vereine" value={String(vereine.length)} sub="Im NWVV gemeldet" color="purple" />
        <KpiCard label="Aktive Vereine" value={String(totalActive)} sub={`${vereine.length - totalActive} inaktiv`} color="green" />
        <KpiCard label="Neue (Saison)" value="2" sub="Seit Saisonbeginn beigetreten" color="orange" />
        <KpiCard label="Avg. Mitglieder" value={String(avgMitglieder)} sub={`${totalMitglieder} Mitglieder gesamt`} color="red" />
      </div>

      {/* Filters */}
      <div className="flex gap-2 items-center mb-5 flex-wrap">
        <div className="relative flex-1 max-w-[240px]">
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Verein oder Nr. suchen..." className="!pl-9" />
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
        </div>
        <select className="w-[160px]" value={filterBezirk} onChange={e => setFilterBezirk(e.target.value)}>
          <option value="Alle">Alle Bezirke</option>
          {bezirke.map(b => <option key={b}>{b}</option>)}
        </select>
        <select className="w-[130px]" value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
          <option value="Alle">Alle Status</option>
          <option>Aktiv</option>
          <option>Inaktiv</option>
        </select>
        {(search || filterBezirk !== "Alle" || filterStatus !== "Alle") && (
          <Button variant="ghost" size="sm" onClick={() => { setSearch(""); setFilterBezirk("Alle"); setFilterStatus("Alle"); }}>Zurücksetzen</Button>
        )}
      </div>

      {/* Table */}
      <Card noPadding className="overflow-hidden">
        <table className="w-full border-collapse text-[13px]">
          <thead>
            <tr>
              {["Verein", "Vereins-Nr.", "Bezirk", "Mannschaften", "Mitglieder", "Status", ""].map(h => (
                <th key={h} className="text-[11px] font-semibold text-text-muted uppercase tracking-wide px-3.5 py-2.5 text-left border-b border-border">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((v, i) => (
              <tr key={i} className="hover:bg-s2 cursor-pointer transition-colors" onClick={() => { setSelectedVerein(v); setActiveTab("mannschaften"); }}>
                <td className="px-3.5 py-3 border-b border-border font-semibold">
                  <div className="flex items-center gap-2.5">
                    <ClubLogo name={v.name} size={28} />
                    {v.name}
                  </div>
                </td>
                <td className="px-3.5 py-3 border-b border-border text-text-muted">{v.vereinsNr}</td>
                <td className="px-3.5 py-3 border-b border-border">{v.bezirk}</td>
                <td className="px-3.5 py-3 border-b border-border font-bold">{v.mannschaften}</td>
                <td className="px-3.5 py-3 border-b border-border">{v.mitglieder}</td>
                <td className="px-3.5 py-3 border-b border-border"><Badge color={statusBadge[v.status]}>{v.status}</Badge></td>
                <td className="px-3.5 py-3 border-b border-border"><Button variant="ghost" size="sm">Details</Button></td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={7} className="px-3.5 py-8 text-center text-text-muted">Keine Vereine gefunden.</td></tr>
            )}
          </tbody>
        </table>
      </Card>

      {/* Detail Modal */}
      <Modal open={!!selectedVerein} onClose={() => setSelectedVerein(null)} title={selectedVerein ? <span className="flex items-center gap-2.5"><ClubLogo name={selectedVerein.name} size={28} />{selectedVerein.name}</span> : ""} large>
        {selectedVerein && (
          <div>
            {/* Club Header */}
            <div className="bg-s2 rounded-[10px] p-4 mb-4">
              <div className="grid grid-cols-3 gap-4 mb-2">
                <div><div className="text-[10px] font-semibold text-text-dim">Vereins-Nr.</div><div className="text-sm font-bold">{selectedVerein.vereinsNr}</div></div>
                <div><div className="text-[10px] font-semibold text-text-dim">Bezirk</div><div className="text-sm font-bold">{selectedVerein.bezirk}</div></div>
                <div><div className="text-[10px] font-semibold text-text-dim">Status</div><Badge color={statusBadge[selectedVerein.status]}>{selectedVerein.status}</Badge></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><div className="text-[10px] font-semibold text-text-dim">Anschrift</div><div className="text-xs">{selectedVerein.anschrift}</div></div>
                <div><div className="text-[10px] font-semibold text-text-dim">Kontakt</div><div className="text-xs">{selectedVerein.kontaktEmail} · {selectedVerein.kontaktTel}</div></div>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-1.5 mb-4">
              {([["mannschaften", "Mannschaften"], ["rechnungen", "Rechnungen"], ["funktionaere", "Funktionäre"], ["strafen", "Strafen"]] as const).map(([id, label]) => (
                <Button key={id} size="sm" variant={activeTab === id ? "primary" : "ghost"} onClick={() => setActiveTab(id)}>
                  {label}
                  {id === "strafen" && selectedVerein.strafen.length > 0 && (
                    <span className="ml-1 bg-red text-white text-[9px] font-bold px-1 rounded-full">{selectedVerein.strafen.length}</span>
                  )}
                </Button>
              ))}
            </div>

            {/* Mannschaften Tab */}
            {activeTab === "mannschaften" && (
              <div>
                {selectedVerein.teams.length === 0 ? (
                  <div className="text-center py-6 text-text-muted text-sm">Keine Mannschaften gemeldet.</div>
                ) : (
                  <div className="space-y-1.5">
                    {selectedVerein.teams.map((t, i) => (
                      <div key={i} className="flex items-center gap-3 px-3.5 py-2.5 bg-s2 rounded-[8px]">
                        <div className="flex-1"><div className="text-[13px] font-semibold">{t.name}</div><div className="text-[11px] text-text-muted">{t.liga}</div></div>
                        <Badge color={teamStatusColor[t.status] || "gray"}>{t.status}</Badge>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Rechnungen Tab */}
            {activeTab === "rechnungen" && (
              <div>
                {selectedVerein.rechnungen.length === 0 ? (
                  <div className="text-center py-6 text-text-muted text-sm">Keine offenen Rechnungen.</div>
                ) : (
                  <div className="border border-border rounded-[8px] overflow-hidden">
                    <table className="w-full border-collapse text-[13px]">
                      <thead><tr className="bg-s2">
                        {["Rechnungs-Nr.", "Typ", "Betrag", "Status"].map(h => (
                          <th key={h} className="text-[10px] font-semibold text-text-muted uppercase tracking-wide px-3 py-2 text-left">{h}</th>
                        ))}
                      </tr></thead>
                      <tbody>
                        {selectedVerein.rechnungen.map((r, i) => (
                          <tr key={i} className="hover:bg-s2">
                            <td className="px-3 py-2 border-t border-border font-medium">{r.nr}</td>
                            <td className="px-3 py-2 border-t border-border text-text-muted">{r.typ}</td>
                            <td className="px-3 py-2 border-t border-border font-bold">{r.betrag}</td>
                            <td className="px-3 py-2 border-t border-border"><Badge color={rechnungStatusColor[r.status] || "gray"}>{r.status}</Badge></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {/* Funktionäre Tab */}
            {activeTab === "funktionaere" && (
              <div className="space-y-1.5">
                {selectedVerein.funktionaere.map((f, i) => (
                  <div key={i} className="flex items-center gap-3 px-3.5 py-2.5 bg-s2 rounded-[8px]">
                    <div className="w-8 h-8 rounded-full bg-accent-dim flex items-center justify-center text-xs font-bold text-accent shrink-0">
                      {f.name.split(" ").map(n => n[0]).join("")}
                    </div>
                    <div className="flex-1">
                      <div className="text-[13px] font-semibold">{f.name}</div>
                      <div className="text-[11px] text-text-muted">{f.rolle} · {f.email}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Strafen Tab */}
            {activeTab === "strafen" && (
              <div>
                {selectedVerein.strafen.length === 0 ? (
                  <div className="text-center py-6 text-text-muted text-sm">Keine Ordnungsstrafen.</div>
                ) : (
                  <div className="border border-border rounded-[8px] overflow-hidden">
                    <table className="w-full border-collapse text-[13px]">
                      <thead><tr className="bg-s2">
                        {["Datum", "Tatbestand", "Betrag", "Status"].map(h => (
                          <th key={h} className="text-[10px] font-semibold text-text-muted uppercase tracking-wide px-3 py-2 text-left">{h}</th>
                        ))}
                      </tr></thead>
                      <tbody>
                        {selectedVerein.strafen.map((s, i) => (
                          <tr key={i} className="hover:bg-s2">
                            <td className="px-3 py-2 border-t border-border">{s.datum}</td>
                            <td className="px-3 py-2 border-t border-border font-medium">{s.tatbestand}</td>
                            <td className="px-3 py-2 border-t border-border font-bold text-red">{s.betrag}</td>
                            <td className="px-3 py-2 border-t border-border"><Badge color={s.status === "Bezahlt" ? "green" : "red"}>{s.status}</Badge></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
}
