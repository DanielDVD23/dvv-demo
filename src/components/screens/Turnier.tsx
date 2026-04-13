"use client";

import { useState } from "react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";
import SectionHeader from "@/components/ui/SectionHeader";
import ClubLogo from "@/components/ui/ClubLogo";

/* ── Heatmap data (Step 3) ── */
const heatmapData = [
  { label: "Feld 1", cells: [["light","G1"],["light","G3"],["medium","G5"],["medium","G7"],["free","—"],["medium","QF1"],["heavy","SF1"],["heavy","Finale"],["free","—"],["free","—"]] },
  { label: "Feld 2", cells: [["light","G2"],["light","G4"],["medium","G6"],["medium","G8"],["free","—"],["medium","QF2"],["heavy","SF2"],["light","Pl.3"],["free","—"],["free","—"]] },
  { label: "Feld 3", cells: [["light","G9"],["light","G11"],["medium","G13"],["medium","G15"],["free","—"],["medium","QF3"],["free","—"],["free","—"],["free","—"],["free","—"]] },
  { label: "Feld 4", cells: [["light","G10"],["light","G12"],["medium","G14"],["medium","G16"],["free","—"],["medium","QF4"],["free","—"],["full","FREI"],["free","—"],["free","—"]] },
];
const cellColors: Record<string, string> = {
  free: "bg-[rgba(34,197,94,0.15)]", light: "bg-[rgba(34,197,94,0.4)]",
  medium: "bg-[rgba(245,158,11,0.5)]", heavy: "bg-[rgba(239,68,68,0.5)]", full: "bg-[rgba(239,68,68,0.8)]",
};
const brackets = [
  { name: "Gruppenphase + KO", desc: "4 Gruppen à 4 Teams → Viertelfinale → Halbfinale → Finale", spiele: "28", dauer: "7h", auslastung: "68%", recommended: true },
  { name: "Reines KO-System", desc: "16er KO-Runde mit Trostrunde (Jeder spielt mind. 2×)", spiele: "22", dauer: "5.5h", auslastung: "55%" },
  { name: "Round Robin", desc: "Jeder gegen jeden, Platzierung nach Punkten · nur für kleine Gruppen", spiele: "120", dauer: "18h", auslastung: "–", warning: true },
];
const times = ["08:00","09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00"];

/* ── Available teams pool (Step 4) ── */
const teamPool = [
  { name: "TSV Hannover", bezirk: "Hannover", liga: "Verbandsliga" },
  { name: "SVC Göttingen", bezirk: "Göttingen", liga: "Verbandsliga" },
  { name: "MTV Wolfsburg", bezirk: "Braunschweig", liga: "Verbandsliga" },
  { name: "VfR Bielefeld", bezirk: "OWL", liga: "Verbandsliga" },
  { name: "SC Paderborn", bezirk: "OWL", liga: "Verbandsliga" },
  { name: "TV Hildesheim", bezirk: "Hannover", liga: "Bezirksliga" },
  { name: "SC Osnabrück", bezirk: "Osnabrück", liga: "Bezirksliga" },
  { name: "MTV Braunschweig", bezirk: "Braunschweig", liga: "Bezirksliga" },
  { name: "TuS Göttingen", bezirk: "Göttingen", liga: "Kreisliga" },
  { name: "SG Münster", bezirk: "Münster", liga: "Bezirksliga" },
  { name: "TSV Hildesheim", bezirk: "Hannover", liga: "Bezirksliga" },
  { name: "Schweriner SC", bezirk: "Schwerin", liga: "Verbandsliga" },
  { name: "TV Büttow", bezirk: "Rostock", liga: "Bezirksliga" },
  { name: "VCO Berlin", bezirk: "Berlin", liga: "Verbandsliga" },
  { name: "USV Jena", bezirk: "Jena", liga: "Verbandsliga" },
  { name: "VC Olympia", bezirk: "Leipzig", liga: "Bezirksliga" },
];

const STEPS = ["Grunddaten", "Felder & Slots", "Turnierbaum", "Teilnehmer", "Vorschau"];

export default function Turnier() {
  const [step, setStep] = useState(0);
  const [selectedBracket, setSelectedBracket] = useState(0);

  // Step 1: Grunddaten
  const [form, setForm] = useState({
    name: "", datum: "", datumBis: "", ort: "", maxTeams: 16, geschlecht: "Herren", altersklasse: "Erwachsene", beschreibung: "",
  });

  // Step 2: Felder & Slots
  const [felder, setFelder] = useState(4);
  const [startzeit, setStartzeit] = useState("08:00");
  const [endzeit, setEndzeit] = useState("18:00");
  const [spieldauer, setSpieldauer] = useState(25);
  const [pauseMin, setPauseMin] = useState(5);

  // Step 4: Teilnehmer
  const [selectedTeams, setSelectedTeams] = useState<string[]>([]);

  // Step 5: Vorschau & Veröffentlichung
  const [veroeffentlichenAm, setVeroeffentlichenAm] = useState("");
  const [emailBenachrichtigung, setEmailBenachrichtigung] = useState(true);
  const [spielplanPdf, setSpielplanPdf] = useState(true);
  const [published, setPublished] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const toggleTeam = (name: string) => {
    setSelectedTeams(p => p.includes(name) ? p.filter(t => t !== name) : p.length < form.maxTeams ? [...p, name] : p);
  };

  const canNext = () => {
    if (step === 0) return form.name.trim() && form.datum && form.ort.trim();
    if (step === 1) return felder >= 1 && spieldauer >= 10;
    if (step === 2) return true;
    if (step === 3) return selectedTeams.length >= 4;
    return true;
  };

  const inputCls = "!w-full";
  const labelCls = "text-[11px] font-semibold text-text-dim uppercase tracking-wide mb-1.5 block";

  return (
    <div className="animate-fadeIn">
      <div className="mb-6">
        <h1 className="text-[22px] font-bold mb-1">Turnier erstellen</h1>
        <p className="text-[13px] text-text-muted">Automatisierte Turnierbaum-Vorschläge mit Feldauslastungsanalyse</p>
      </div>

      {/* ── Wizard Step Indicator ── */}
      <div className="flex items-center mb-7 bg-s1 border border-border rounded-[10px] overflow-hidden">
        {STEPS.map((s, i) => {
          const isDone = i < step;
          const isActive = i === step;
          return (
            <div
              key={i}
              className={`flex-1 flex items-center gap-2 py-3 px-4 text-xs font-semibold cursor-pointer transition-colors ${i < 4 ? "border-r border-border" : ""} ${
                isActive ? "bg-accent-dim text-accent" : isDone ? "text-green" : "text-text-muted"
              }`}
              onClick={() => { if (isDone) setStep(i); }}
            >
              <div className={`w-[22px] h-[22px] rounded-full shrink-0 flex items-center justify-center text-[11px] font-bold ${
                isActive ? "bg-accent text-white" : isDone ? "bg-green text-white" : "bg-s3 text-text-muted"
              }`}>
                {isDone ? <Icon name="check" size={12} /> : i + 1}
              </div>
              <span className="hidden sm:inline">{s}</span>
            </div>
          );
        })}
      </div>

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/* STEP 1: Grunddaten                                                */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      {step === 0 && (
        <Card>
          <div className="text-base font-bold mb-4">Grunddaten</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="md:col-span-2">
              <label className={labelCls}>Turniername *</label>
              <input className={inputCls} value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} placeholder="z.B. NWVV Bezirkspokal 2026" />
            </div>
            <div>
              <label className={labelCls}>Startdatum *</label>
              <input type="date" className={inputCls} value={form.datum} onChange={e => setForm(p => ({ ...p, datum: e.target.value }))} />
            </div>
            <div>
              <label className={labelCls}>Enddatum (optional)</label>
              <input type="date" className={inputCls} value={form.datumBis} onChange={e => setForm(p => ({ ...p, datumBis: e.target.value }))} />
            </div>
            <div className="md:col-span-2">
              <label className={labelCls}>Veranstaltungsort *</label>
              <input className={inputCls} value={form.ort} onChange={e => setForm(p => ({ ...p, ort: e.target.value }))} placeholder="z.B. Sporthalle Am Maschsee, Hannover" />
            </div>
            <div>
              <label className={labelCls}>Geschlecht</label>
              <select className={inputCls} value={form.geschlecht} onChange={e => setForm(p => ({ ...p, geschlecht: e.target.value }))}>
                <option>Herren</option><option>Damen</option><option>Mixed</option>
              </select>
            </div>
            <div>
              <label className={labelCls}>Altersklasse</label>
              <select className={inputCls} value={form.altersklasse} onChange={e => setForm(p => ({ ...p, altersklasse: e.target.value }))}>
                <option>Erwachsene</option><option>U20</option><option>U18</option><option>U16</option><option>Senioren</option>
              </select>
            </div>
            <div>
              <label className={labelCls}>Max. Teilnehmer</label>
              <input type="number" min={4} max={32} className={inputCls} value={form.maxTeams} onChange={e => setForm(p => ({ ...p, maxTeams: parseInt(e.target.value) || 16 }))} />
            </div>
            <div>
              <label className={labelCls}>Beschreibung</label>
              <input className={inputCls} value={form.beschreibung} onChange={e => setForm(p => ({ ...p, beschreibung: e.target.value }))} placeholder="Optionale Beschreibung..." />
            </div>
          </div>
        </Card>
      )}

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/* STEP 2: Felder & Slots                                            */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      {step === 1 && (
        <Card>
          <div className="text-base font-bold mb-4">Felder & Zeitslots</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
            <div>
              <label className={labelCls}>Anzahl Spielfelder</label>
              <input type="number" min={1} max={8} className={inputCls} value={felder} onChange={e => setFelder(parseInt(e.target.value) || 1)} />
            </div>
            <div>
              <label className={labelCls}>Spieldauer (Minuten)</label>
              <input type="number" min={10} max={90} className={inputCls} value={spieldauer} onChange={e => setSpieldauer(parseInt(e.target.value) || 25)} />
            </div>
            <div>
              <label className={labelCls}>Startzeit</label>
              <input type="time" className={inputCls} value={startzeit} onChange={e => setStartzeit(e.target.value)} />
            </div>
            <div>
              <label className={labelCls}>Endzeit</label>
              <input type="time" className={inputCls} value={endzeit} onChange={e => setEndzeit(e.target.value)} />
            </div>
            <div>
              <label className={labelCls}>Pause zwischen Spielen (Min.)</label>
              <input type="number" min={0} max={30} className={inputCls} value={pauseMin} onChange={e => setPauseMin(parseInt(e.target.value) || 0)} />
            </div>
          </div>

          {/* Preview summary */}
          <div className="bg-s2 rounded-[10px] p-4">
            <div className="text-xs font-bold text-text-dim uppercase tracking-wide mb-3">Vorschau Kapazität</div>
            <div className="grid grid-cols-4 gap-4 text-center">
              <div><div className="text-[20px] font-bold">{felder}</div><div className="text-[11px] text-text-muted">Felder</div></div>
              <div><div className="text-[20px] font-bold">{spieldauer} Min</div><div className="text-[11px] text-text-muted">pro Spiel</div></div>
              <div><div className="text-[20px] font-bold">{Math.floor(((parseInt(endzeit.replace(":",".")) - parseInt(startzeit.replace(":",".")))*60) / (spieldauer + pauseMin)) * felder || "–"}</div><div className="text-[11px] text-text-muted">Max. Spiele</div></div>
              <div><div className="text-[20px] font-bold">{startzeit}–{endzeit}</div><div className="text-[11px] text-text-muted">Zeitraum</div></div>
            </div>
          </div>
        </Card>
      )}

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/* STEP 3: Turnierbaum (existing heatmap + KI suggestions)           */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      {step === 2 && (
        <>
          <Card className="!mb-4">
            <div className="flex justify-between items-center mb-4">
              <div>
                <div className="text-sm font-bold">Feldauslastungs-Heatmap</div>
                <div className="text-xs text-text-muted">{felder} Felder · {form.datum ? new Date(form.datum).toLocaleDateString("de-DE", { weekday: "short" }) : "Sa"} {startzeit}–{endzeit} · {form.maxTeams} Teams · Nummernspielplan</div>
              </div>
              <div className="flex gap-1.5 items-center text-[11px]">
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 bg-[rgba(34,197,94,0.4)] rounded-sm inline-block" /> Frei</span>
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 bg-[rgba(245,158,11,0.5)] rounded-sm inline-block" /> Belegt</span>
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 bg-[rgba(239,68,68,0.8)] rounded-sm inline-block" /> Überlast</span>
              </div>
            </div>
            <div className="flex gap-1 pl-[68px] mb-1">
              {times.map(t => <div key={t} className="flex-1 text-[10px] text-text-muted text-center">{t}</div>)}
            </div>
            {heatmapData.map((row, i) => (
              <div key={i} className="flex gap-1 items-center mb-1">
                <div className="text-[11px] text-text-muted w-[60px] shrink-0 text-right pr-2">{row.label}</div>
                {row.cells.map(([level, label], j) => (
                  <div key={j} className={`flex-1 h-[34px] rounded cursor-pointer transition-all hover:scale-105 flex items-center justify-center text-[10px] font-semibold text-text/70 ${cellColors[level]}`}>
                    {label}
                  </div>
                ))}
              </div>
            ))}
            <div className="mt-3 flex gap-2 flex-wrap">
              <Badge color="orange"><Icon name="warning" size={12} /> 14:00–15:00: Feld 1 & 2 simultan SF – Schiedsrichter knapp</Badge>
              <Badge color="green">Gesamtauslastung: 68% optimal</Badge>
            </div>
          </Card>

          <SectionHeader title="KI-Vorschläge Turnierbaum" right={<Badge color="purple"><Icon name="sparkle" size={12} /> 3 Varianten generiert</Badge>} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {brackets.map((b, i) => (
              <div
                key={i}
                className={`bg-s2 border-2 rounded-[10px] p-4 cursor-pointer transition-all hover:border-accent hover:bg-accent-dim ${
                  selectedBracket === i ? "border-accent bg-accent-dim" : "border-border"
                }`}
                onClick={() => setSelectedBracket(i)}
              >
                <div className="flex justify-between items-start">
                  <div className="text-[15px] font-bold">{b.name}</div>
                  {b.recommended && <Badge color="green">Empfohlen</Badge>}
                </div>
                <div className="text-xs text-text-muted mt-1">{b.desc}</div>
                <div className="flex gap-3 text-xs text-text-muted mt-2.5">
                  <div className="flex flex-col gap-px"><strong className={`text-base font-bold ${b.warning ? "text-red" : "text-text"}`}>{b.spiele}</strong><span>Spiele</span></div>
                  <div className="flex flex-col gap-px"><strong className={`text-base font-bold ${b.warning ? "text-red" : "text-text"}`}>{b.dauer}</strong><span>Dauer</span></div>
                  <div className="flex flex-col gap-px"><strong className="text-base font-bold text-text">{b.auslastung}</strong><span>{b.warning ? "nicht möglich" : "Auslastung"}</span></div>
                </div>
                {b.warning && <div className="mt-2"><Badge color="red"><Icon name="warning" size={12} /> Zeitrahmen überschritten</Badge></div>}
              </div>
            ))}
          </div>
        </>
      )}

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/* STEP 4: Teilnehmer                                                */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      {step === 3 && (
        <div className="grid grid-cols-1 md:grid-cols-[1fr_320px] gap-5">
          <Card>
            <div className="flex justify-between items-center mb-4">
              <div>
                <div className="text-base font-bold">Teilnehmer auswählen</div>
                <div className="text-xs text-text-muted">Min. 4 · Max. {form.maxTeams} Teams</div>
              </div>
              <Badge color={selectedTeams.length >= 4 ? "green" : "orange"}>{selectedTeams.length}/{form.maxTeams} gewählt</Badge>
            </div>

            <div className="space-y-1.5">
              {teamPool.map(t => {
                const isSelected = selectedTeams.includes(t.name);
                const isFull = !isSelected && selectedTeams.length >= form.maxTeams;
                return (
                  <div
                    key={t.name}
                    className={`flex items-center gap-3 p-3 rounded-[8px] border cursor-pointer transition-all ${
                      isSelected ? "bg-accent-dim border-accent" : isFull ? "bg-s2 border-border opacity-40 cursor-not-allowed" : "bg-s1 border-border hover:bg-s2"
                    }`}
                    onClick={() => !isFull && toggleTeam(t.name)}
                  >
                    <div className={`w-5 h-5 rounded flex items-center justify-center shrink-0 ${
                      isSelected ? "bg-accent" : "border border-border bg-white"
                    }`}>
                      {isSelected && <Icon name="check" size={12} className="text-white" />}
                    </div>
                    <ClubLogo name={t.name} size={24} />
                    <div className="flex-1">
                      <div className="text-[13px] font-semibold">{t.name}</div>
                      <div className="text-[11px] text-text-muted">{t.bezirk} · {t.liga}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Selected teams summary */}
          <div>
            <Card>
              <div className="text-sm font-bold mb-3">Gesetzte Teams</div>
              {selectedTeams.length === 0 ? (
                <div className="text-xs text-text-muted py-4 text-center">Noch keine Teams gewählt</div>
              ) : (
                <div className="space-y-1">
                  {selectedTeams.map((name, i) => (
                    <div key={name} className="flex items-center gap-2 text-[13px] py-1.5 px-2 bg-s2 rounded">
                      <span className="text-[11px] text-text-muted font-bold w-5">{i + 1}.</span>
                      <ClubLogo name={name} size={20} />
                      <span className="font-medium flex-1">{name}</span>
                      <button onClick={() => toggleTeam(name)} className="bg-transparent border-0 cursor-pointer text-text-muted hover:text-red transition-colors">
                        <Icon name="x" size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </Card>

            {selectedTeams.length >= 4 && (
              <Card className="!mt-3">
                <div className="text-sm font-bold mb-2">Gruppenvorschau</div>
                <div className="text-xs text-text-muted mb-3">Basierend auf "{brackets[selectedBracket].name}"</div>
                {selectedBracket === 0 && selectedTeams.length >= 8 ? (
                  <div className="grid grid-cols-2 gap-2">
                    {[0, 1, 2, 3].map(g => (
                      <div key={g} className="bg-s2 rounded-[6px] p-2">
                        <div className="text-[10px] font-bold text-text-dim uppercase mb-1">Gruppe {String.fromCharCode(65 + g)}</div>
                        {selectedTeams.slice(g * Math.ceil(selectedTeams.length / 4), (g + 1) * Math.ceil(selectedTeams.length / 4)).map(t => (
                          <div key={t} className="text-[11px] py-0.5">{t}</div>
                        ))}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-xs text-text-muted">
                    {selectedBracket === 0 ? `Mindestens 8 Teams für Gruppenphase (aktuell: ${selectedTeams.length})` : `${selectedTeams.length} Teams im ${brackets[selectedBracket].name}`}
                  </div>
                )}
              </Card>
            )}
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/* STEP 5: Vorschau & Veröffentlichung                               */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      {step === 4 && !published && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-[1fr_340px] gap-5">
            <Card>
              <div className="text-base font-bold mb-4">Turniervorschau</div>

              {/* Summary box */}
              <div className="bg-s2 rounded-[10px] p-5 mb-5">
                <div className="text-lg font-bold mb-1">{form.name || "Turnier"}</div>
                <div className="flex gap-2 flex-wrap mb-3">
                  <Badge color="purple">{form.geschlecht}</Badge>
                  <Badge color="blue">{form.altersklasse}</Badge>
                  <Badge color="green">{brackets[selectedBracket].name}</Badge>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-[13px]">
                  {[
                    ["Datum", form.datum ? new Date(form.datum).toLocaleDateString("de-DE") : "—"],
                    ["Ort", form.ort || "—"],
                    ["Felder", String(felder)],
                    ["Zeitraum", `${startzeit}–${endzeit}`],
                    ["Spielmodus", brackets[selectedBracket].name],
                    ["Spiele", brackets[selectedBracket].spiele],
                    ["Dauer", brackets[selectedBracket].dauer],
                    ["Auslastung", brackets[selectedBracket].auslastung],
                    ["Teams", `${selectedTeams.length}/${form.maxTeams}`],
                    ["Spieldauer", `${spieldauer} Min`],
                    ["Pause", `${pauseMin} Min`],
                    ["Geschlecht", form.geschlecht],
                  ].map(([k, v]) => (
                    <div key={k}>
                      <div className="text-[11px] text-text-muted font-semibold uppercase tracking-wide">{k}</div>
                      <div className="font-bold mt-0.5">{v}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Teams list */}
              <div className="text-xs font-bold text-text-dim uppercase tracking-wide mb-2">Teilnehmende Teams ({selectedTeams.length})</div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-5">
                {selectedTeams.map((t, i) => (
                  <div key={t} className="text-[12px] bg-s2 rounded-[6px] px-3 py-2 flex items-center gap-2">
                    <span className="text-text-muted font-bold">{i + 1}.</span>
                    <span className="font-medium">{t}</span>
                  </div>
                ))}
              </div>

              {/* Spielplan preview (generated bracket) */}
              {selectedBracket === 0 && selectedTeams.length >= 8 && (
                <>
                  <div className="text-xs font-bold text-text-dim uppercase tracking-wide mb-2">Gruppenphase</div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
                    {[0, 1, 2, 3].map(g => {
                      const groupTeams = selectedTeams.slice(g * Math.ceil(selectedTeams.length / 4), (g + 1) * Math.ceil(selectedTeams.length / 4));
                      return (
                        <div key={g} className="bg-s2 border border-border rounded-[8px] p-3">
                          <div className="text-[11px] font-bold text-accent uppercase mb-2">Gruppe {String.fromCharCode(65 + g)}</div>
                          {groupTeams.map((t, ti) => (
                            <div key={t} className="text-[12px] py-1 border-b border-border last:border-0 flex items-center gap-2">
                              <span className="text-text-muted text-[10px] font-bold w-3">{ti + 1}</span>
                              <span className="font-medium">{t}</span>
                            </div>
                          ))}
                          <div className="text-[10px] text-text-muted mt-2">{groupTeams.length * (groupTeams.length - 1) / 2} Spiele</div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="text-xs font-bold text-text-dim uppercase tracking-wide mb-2">KO-Phase</div>
                  <div className="flex gap-3 items-center mb-5 overflow-x-auto pb-2">
                    {["Viertelfinale", "Halbfinale", "Finale"].map((phase, pi) => (
                      <div key={phase} className="flex items-center gap-3">
                        <div className="bg-s2 border border-border rounded-[8px] p-3 min-w-[120px]">
                          <div className="text-[10px] font-bold text-text-dim uppercase mb-1.5">{phase}</div>
                          {Array.from({ length: pi === 0 ? 4 : pi === 1 ? 2 : 1 }).map((_, si) => (
                            <div key={si} className="text-[11px] py-1 border-b border-border last:border-0 text-text-muted">
                              {pi === 2 ? "Sieger HF1 vs. HF2" : pi === 1 ? `Sieger VF${si * 2 + 1} vs. VF${si * 2 + 2}` : `${String.fromCharCode(65 + si)}1 vs. ${String.fromCharCode(65 + (si < 2 ? si + 2 : si - 2))}2`}
                            </div>
                          ))}
                        </div>
                        {pi < 2 && <span className="text-text-muted text-lg">→</span>}
                      </div>
                    ))}
                  </div>
                </>
              )}
            </Card>

            {/* Right sidebar: Veröffentlichungs-Optionen */}
            <div className="space-y-4">
              <Card>
                <div className="text-sm font-bold mb-3">Veröffentlichung</div>
                <div className="mb-3">
                  <label className="text-[11px] font-semibold text-text-dim uppercase tracking-wide mb-1.5 block">Veröffentlichen am</label>
                  <input type="date" className="!w-full" value={veroeffentlichenAm} onChange={e => setVeroeffentlichenAm(e.target.value)} />
                  <div className="text-[11px] text-text-muted mt-1">Leer = sofort veröffentlichen</div>
                </div>

                <div className="space-y-2.5 mb-4">
                  <div
                    className="flex items-center gap-2.5 cursor-pointer"
                    onClick={() => setEmailBenachrichtigung(!emailBenachrichtigung)}
                  >
                    <div className={`w-5 h-5 rounded flex items-center justify-center shrink-0 ${emailBenachrichtigung ? "bg-accent" : "border border-border bg-white"}`}>
                      {emailBenachrichtigung && <Icon name="check" size={12} className="text-white" />}
                    </div>
                    <div>
                      <div className="text-[13px] font-medium">E-Mail an Vereine</div>
                      <div className="text-[11px] text-text-muted">Einladung + Spielplan an alle {selectedTeams.length} Teams</div>
                    </div>
                  </div>

                  <div
                    className="flex items-center gap-2.5 cursor-pointer"
                    onClick={() => setSpielplanPdf(!spielplanPdf)}
                  >
                    <div className={`w-5 h-5 rounded flex items-center justify-center shrink-0 ${spielplanPdf ? "bg-accent" : "border border-border bg-white"}`}>
                      {spielplanPdf && <Icon name="check" size={12} className="text-white" />}
                    </div>
                    <div>
                      <div className="text-[13px] font-medium">Spielplan als PDF</div>
                      <div className="text-[11px] text-text-muted">Automatisch generieren und anhängen</div>
                    </div>
                  </div>
                </div>
              </Card>

              <Card>
                <div className="text-sm font-bold mb-3">Checkliste</div>
                <div className="space-y-2">
                  {[
                    { label: "Grunddaten vollständig", ok: !!(form.name && form.datum && form.ort) },
                    { label: "Felder & Slots konfiguriert", ok: felder >= 1 },
                    { label: "Turniermodus gewählt", ok: true },
                    { label: `Min. 4 Teams gewählt (${selectedTeams.length})`, ok: selectedTeams.length >= 4 },
                    { label: "Kein Zeitkonflikt", ok: selectedBracket !== 2 },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-[12px]">
                      <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${item.ok ? "bg-green" : "bg-orange"}`}>
                        <Icon name={item.ok ? "check" : "warning"} size={10} className="text-white" />
                      </div>
                      <span className={item.ok ? "" : "text-orange font-medium"}>{item.label}</span>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Info banner */}
              <div className="bg-accent-dim border border-accent/20 rounded-[8px] p-3.5 text-[12px] text-accent flex items-start gap-2">
                <Icon name="info" size={16} className="shrink-0 mt-0.5" />
                <div>
                  <strong>Nach Veröffentlichung:</strong> Vereine werden per E-Mail benachrichtigt.
                  Der Spielplan kann danach noch manuell angepasst werden.
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/* SUCCESS STATE                                                      */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      {published && (
        <div className="animate-fadeIn">
          <Card className="!text-center !py-12">
            <div className="w-16 h-16 rounded-full bg-green-dim mx-auto mb-4 flex items-center justify-center">
              <Icon name="check" size={32} className="text-green" />
            </div>
            <div className="text-xl font-bold mb-2">Turnier veröffentlicht!</div>
            <div className="text-[13px] text-text-muted mb-6 max-w-md mx-auto">
              „{form.name}" wurde erfolgreich {veroeffentlichenAm ? `für den ${new Date(veroeffentlichenAm).toLocaleDateString("de-DE")} geplant` : "veröffentlicht"}.
              {emailBenachrichtigung && ` ${selectedTeams.length} Vereine wurden per E-Mail benachrichtigt.`}
              {spielplanPdf && " Der Spielplan wurde als PDF generiert."}
            </div>

            {/* Summary cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-2xl mx-auto mb-8">
              <div className="bg-s2 rounded-[10px] p-4">
                <div className="text-[22px] font-bold">{selectedTeams.length}</div>
                <div className="text-[11px] text-text-muted">Teams</div>
              </div>
              <div className="bg-s2 rounded-[10px] p-4">
                <div className="text-[22px] font-bold">{brackets[selectedBracket].spiele}</div>
                <div className="text-[11px] text-text-muted">Spiele</div>
              </div>
              <div className="bg-s2 rounded-[10px] p-4">
                <div className="text-[22px] font-bold">{felder}</div>
                <div className="text-[11px] text-text-muted">Felder</div>
              </div>
              <div className="bg-s2 rounded-[10px] p-4">
                <div className="text-[22px] font-bold">{brackets[selectedBracket].dauer}</div>
                <div className="text-[11px] text-text-muted">Dauer</div>
              </div>
            </div>

            {/* Nächste Schritte */}
            <div className="text-left max-w-lg mx-auto">
              <div className="text-xs font-bold text-text-dim uppercase tracking-wide mb-3">Nächste Schritte</div>
              <div className="space-y-2.5">
                {[
                  { icon: "mail", text: "E-Mail-Einladungen versendet", sub: `An ${selectedTeams.length} Vereine`, done: emailBenachrichtigung },
                  { icon: "file-text", text: "Spielplan generiert", sub: spielplanPdf ? "PDF verfügbar zum Download" : "Kein PDF erstellt", done: spielplanPdf },
                  { icon: "calendar", text: "Spieltage erstellen", sub: "Termine in den Kalender übernehmen", done: false },
                  { icon: "users", text: "Schiedsrichter zuweisen", sub: `Für ${brackets[selectedBracket].spiele} Spiele`, done: false },
                ].map((item, i) => (
                  <div key={i} className={`flex items-center gap-3 p-3 rounded-[8px] border ${item.done ? "bg-green-dim border-green/20" : "bg-s2 border-border"}`}>
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${item.done ? "bg-green" : "bg-s3"}`}>
                      <Icon name={item.done ? "check" : item.icon} size={14} className={item.done ? "text-white" : "text-text-muted"} />
                    </div>
                    <div className="flex-1">
                      <div className={`text-[13px] font-semibold ${item.done ? "line-through text-text-muted" : ""}`}>{item.text}</div>
                      <div className="text-[11px] text-text-muted">{item.sub}</div>
                    </div>
                    {!item.done && <Button variant="ghost" size="sm">Öffnen</Button>}
                    {item.done && <Badge color="green">Erledigt</Badge>}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-3 justify-center mt-8">
              <Button variant="ghost" onClick={() => { setPublished(false); setStep(0); setForm({ name: "", datum: "", datumBis: "", ort: "", maxTeams: 16, geschlecht: "Herren", altersklasse: "Erwachsene", beschreibung: "" }); setSelectedTeams([]); setSelectedBracket(0); }}>
                Neues Turnier erstellen
              </Button>
              <Button>Zum Turnier →</Button>
            </div>
          </Card>
        </div>
      )}

      {/* ── Bestätigungsdialog ── */}
      {confirmOpen && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 999 }}>
          <div className="bg-s1 rounded-[14px] p-7 max-w-[440px] w-[90%] animate-slideUp">
            <div className="text-base font-bold mb-2">Turnier veröffentlichen?</div>
            <div className="text-[13px] text-text-dim leading-relaxed mb-4">
              „{form.name}" mit {selectedTeams.length} Teams wird {veroeffentlichenAm ? `am ${new Date(veroeffentlichenAm).toLocaleDateString("de-DE")} veröffentlicht` : "sofort veröffentlicht"}.
              {emailBenachrichtigung && " Alle Vereine erhalten eine E-Mail-Einladung."}
            </div>

            <div className="bg-s2 rounded-[8px] p-3 mb-4 text-[12px]">
              <div className="grid grid-cols-2 gap-2">
                <div><span className="text-text-muted">Modus:</span> <strong>{brackets[selectedBracket].name}</strong></div>
                <div><span className="text-text-muted">Spiele:</span> <strong>{brackets[selectedBracket].spiele}</strong></div>
                <div><span className="text-text-muted">Teams:</span> <strong>{selectedTeams.length}</strong></div>
                <div><span className="text-text-muted">Dauer:</span> <strong>{brackets[selectedBracket].dauer}</strong></div>
              </div>
            </div>

            {selectedBracket === 2 && (
              <div className="bg-red-dim border border-red/20 rounded-[8px] p-3 mb-4 text-[12px] text-red flex items-start gap-2">
                <Icon name="warning" size={14} className="shrink-0 mt-0.5" />
                <span><strong>Warnung:</strong> Round Robin überschreitet den Zeitrahmen. Bitte prüfen Sie den Modus.</span>
              </div>
            )}

            <div className="flex gap-2 justify-end">
              <Button variant="ghost" onClick={() => setConfirmOpen(false)}>Abbrechen</Button>
              <Button onClick={() => { setConfirmOpen(false); setPublished(true); }}>
                {veroeffentlichenAm ? "Planen" : "Jetzt veröffentlichen"}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ── Navigation Buttons ── */}
      {!published && (
        <div className="flex gap-2.5 justify-end mt-5 pt-4 border-t border-border">
          {step > 0 && <Button variant="ghost" onClick={() => setStep(step - 1)}>← Zurück</Button>}
          <Button variant="ghost">Entwurf speichern</Button>
          {step < 4 ? (
            <Button onClick={() => setStep(step + 1)} disabled={!canNext()}>
              {step === 2 ? `${brackets[selectedBracket].name} übernehmen →` : "Weiter →"}
            </Button>
          ) : (
            <Button onClick={() => setConfirmOpen(true)} disabled={selectedTeams.length < 4}>Turnier veröffentlichen</Button>
          )}
        </div>
      )}
    </div>
  );
}
