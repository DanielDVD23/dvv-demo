"use client";

import { useState, useEffect } from "react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";
import Modal from "@/components/ui/Modal";
import SectionHeader from "@/components/ui/SectionHeader";
import ClubLogo from "@/components/ui/ClubLogo";

interface Spielerin {
  name: string;
  passNr: string;
  gebdat: string;
  gueltigBis: string;
  passOk: boolean;
  passWarning?: string;
}

const meldungen = [
  { mann: "Damen 1", verein: "TSV Hannover", liga: "Verbandsliga", aufstieg: true, status: "Bestätigt", statusColor: "green" as const },
  { mann: "Herren 2", verein: "SVC Göttingen", liga: "Bezirksliga", aufstieg: false, status: "In Prüfung", statusColor: "orange" as const },
  { mann: "Damen 1", verein: "SVC Wolfsburg", liga: "Bezirksliga", aufstieg: true, status: "Eingereicht", statusColor: "blue" as const, canReview: true },
  { mann: "Herren 1", verein: "TV Hildesheim", liga: "–", aufstieg: false, status: "Nicht gemeldet", statusColor: "red" as const, faded: true },
];

const kaderListe: Spielerin[] = [
  { name: "Lena Weber", passNr: "12345", gebdat: "12.03.2011", gueltigBis: "30.06.2027", passOk: true },
  { name: "Anna Koch", passNr: "12346", gebdat: "05.07.2011", gueltigBis: "30.06.2027", passOk: true },
  { name: "Sarah Braun", passNr: "12347", gebdat: "22.11.2010", gueltigBis: "30.09.2026", passOk: false, passWarning: "Pass läuft am 30.09.26 ab" },
  { name: "Marie Schulz", passNr: "12348", gebdat: "14.02.2011", gueltigBis: "30.06.2027", passOk: true },
  { name: "Lisa Fischer", passNr: "12349", gebdat: "30.08.2011", gueltigBis: "30.06.2027", passOk: true },
  { name: "Julia Becker", passNr: "12350", gebdat: "19.01.2012", gueltigBis: "30.06.2027", passOk: true },
  { name: "Emma Hoffmann", passNr: "12351", gebdat: "03.06.2011", gueltigBis: "31.08.2026", passOk: false, passWarning: "Pass läuft am 31.08.26 ab" },
  { name: "Lea Wagner", passNr: "12352", gebdat: "27.09.2011", gueltigBis: "30.06.2027", passOk: true },
  { name: "Sophie Krüger", passNr: "12354", gebdat: "11.04.2011", gueltigBis: "30.06.2027", passOk: true },
  { name: "Hannah Meyer", passNr: "12355", gebdat: "08.12.2011", gueltigBis: "30.06.2027", passOk: true },
  { name: "Mia Richter", passNr: "12356", gebdat: "15.05.2012", gueltigBis: "30.06.2027", passOk: true },
  { name: "Clara Schmidt", passNr: "12357", gebdat: "21.07.2011", gueltigBis: "28.02.2026", passOk: false, passWarning: "Pass abgelaufen am 28.02.26" },
  { name: "Nele Hartmann", passNr: "12358", gebdat: "02.09.2011", gueltigBis: "30.06.2027", passOk: true },
  { name: "Finja Peters", passNr: "12359", gebdat: "18.03.2012", gueltigBis: "30.06.2027", passOk: true },
];

export default function Mannschaft({ action, onActionHandled }: { action?: string | null; onActionHandled?: () => void } = {}) {
  const [meldungModal, setMeldungModal] = useState(false);
  const [neueMeldungModal, setNeueMeldungModal] = useState(false);
  const [kader, setKader] = useState<Spielerin[]>(kaderListe);
  const [meldungStep, setMeldungStep] = useState(1);
  const [renewModal, setRenewModal] = useState<number | null>(null);
  const [renewStep, setRenewStep] = useState(1);

  const handleRenew = (idx: number) => { setRenewModal(idx); setRenewStep(1); };
  const confirmRenew = () => {
    if (renewModal !== null) {
      setKader(prev => prev.map((s, i) => i === renewModal ? { ...s, passOk: true, passWarning: undefined, gueltigBis: "30.06.2028" } : s));
    }
    setRenewModal(null);
  };

  useEffect(() => {
    if (action === "open-neue-meldung") {
      // Small delay to ensure component is fully mounted
      const t = setTimeout(() => { setNeueMeldungModal(true); setMeldungStep(1); onActionHandled?.(); }, 50);
      return () => clearTimeout(t);
    }
  }, [action, onActionHandled]);

  const kaderOk = kader.filter(s => s.passOk).length;
  const kaderWarning = kader.filter(s => !s.passOk).length;

  const removeFromKader = (idx: number) => {
    setKader(prev => prev.filter((_, i) => i !== idx));
  };

  return (
    <div className="animate-fadeIn">
      <div className="mb-6">
        <h1 className="text-[22px] font-bold mb-1">Mannschaftsmeldung</h1>
        <p className="text-[13px] text-text-muted">Geführter Meldeprozess · Inline-Kader · Passprüfung · Fristen-Tracking</p>
      </div>

      {/* Frist Widget */}
      <Card borderColor="border-l-orange" className="!mb-5">
        <div className="flex justify-between items-center">
          <div>
            <div className="text-sm font-bold text-orange">Meldeschluss Ligabetrieb 2026/27</div>
            <div className="text-xs text-text-muted mt-0.5">Freitag, 30. Mai 2026 · 23:59 Uhr</div>
          </div>
          <div className="flex gap-2 items-center">
            <div className="text-center bg-orange-dim border border-[rgba(245,158,11,0.3)] rounded-[6px] px-3 py-2">
              <div className="text-[22px] font-bold leading-none text-orange">72</div>
              <div className="text-[10px] text-text-muted font-semibold">Tage</div>
            </div>
            <div className="text-center bg-s3 rounded-[6px] px-3 py-2">
              <div className="text-[22px] font-bold leading-none">14</div>
              <div className="text-[10px] text-text-muted font-semibold">Std</div>
            </div>
            <div className="text-center bg-s3 rounded-[6px] px-3 py-2">
              <div className="text-[22px] font-bold leading-none">22</div>
              <div className="text-[10px] text-text-muted font-semibold">Min</div>
            </div>
          </div>
        </div>
        <div className="bg-s3 rounded h-1.5 overflow-hidden mt-3">
          <div className="h-full bg-orange rounded w-[35%]" />
        </div>
        <div className="text-[11px] text-text-muted mt-1">18 von 22 erwarteten Meldungen eingegangen (82%)</div>
      </Card>

      <div className="grid grid-cols-[1fr_360px] gap-5 min-w-0">
        {/* Meldungen Liste */}
        <div className="min-w-0">
          <SectionHeader title="Eingegangene Meldungen" right={<Button size="sm" onClick={() => { setNeueMeldungModal(true); setMeldungStep(1); }}>+ Neue Meldung</Button>} />
          <Card noPadding className="overflow-hidden">
            <table className="w-full border-collapse text-[13px]">
              <thead>
                <tr>
                  {["Mannschaft", "Verein", "Liga-Wunsch", "Aufstieg", "Status", ""].map(h => (
                    <th key={h} className="text-[11px] font-semibold text-text-muted uppercase tracking-wide px-3.5 py-2.5 text-left border-b border-border">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {meldungen.map((m, i) => (
                  <tr key={i} className={m.faded ? "opacity-50" : ""}>
                    <td className="px-3.5 py-3 border-b border-border"><strong>{m.mann}</strong></td>
                    <td className="px-3.5 py-3 border-b border-border"><span className="flex items-center gap-2"><ClubLogo name={m.verein} size={22} />{m.verein}</span></td>
                    <td className="px-3.5 py-3 border-b border-border">{m.liga}</td>
                    <td className="px-3.5 py-3 border-b border-border">
                      {m.liga !== "–" && <Badge color={m.aufstieg ? "green" : "gray"}>{m.aufstieg ? "Ja" : "Nein"}</Badge>}
                    </td>
                    <td className="px-3.5 py-3 border-b border-border"><Badge color={m.statusColor}>{m.status}</Badge></td>
                    <td className="px-3.5 py-3 border-b border-border">
                      {m.canReview ? (
                        <Button size="sm" onClick={() => setMeldungModal(true)}>Prüfen →</Button>
                      ) : m.faded ? (
                        <Button variant="ghost" size="sm">Anmahnen</Button>
                      ) : (
                        <Button variant="ghost" size="sm">Details</Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </div>

        {/* Status + Kommunikation */}
        <div>
          <div className="text-sm font-bold mb-3">Bearbeitungsstand: SVC Wolfsburg</div>
          <div className="flex flex-col gap-1.5 mb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-2 h-2 rounded-full bg-green shrink-0" />
              <div className="text-xs"><strong>Eingereicht</strong> – 14.03.2026 · 11:32 Uhr</div>
            </div>
            <div className="w-px h-3.5 bg-border ml-[3px]" />
            <div className="flex items-center gap-2.5">
              <div className="w-2 h-2 rounded-full bg-orange shrink-0" />
              <div className="text-xs"><strong className="text-orange">In Prüfung</strong> – jetzt</div>
            </div>
            <div className="w-px h-3.5 bg-border ml-[3px]" />
            <div className="flex items-center gap-2.5">
              <div className="w-2 h-2 rounded-full bg-s3 shrink-0" />
              <div className="text-xs text-text-muted">Bestätigt / Rückfrage</div>
            </div>
          </div>

          <div className="text-sm font-bold mb-2">Kommunikations-Log</div>
          <div className="bg-s2 rounded-[6px] p-3">
            <div className="text-xs text-text-muted mb-2">Alle Nachrichten · Kein E-Mail-Postfach nötig</div>
            <div className="p-2 bg-s3 rounded-[6px] mb-1.5 text-xs">
              <div className="font-semibold text-accent">SVC Wolfsburg</div>
              <div>&quot;Meldung Damen 1 für Bezirksliga. Spielerinnen-Liste folgt.&quot;</div>
              <div className="text-[10px] text-text-muted mt-0.5">14.03.2026 · 11:32</div>
            </div>
            <input placeholder="Antwort schreiben…" className="mt-1.5" />
            <Button size="sm" className="mt-2">Senden</Button>
          </div>

          <Card borderColor="border-l-accent" className="!mt-3">
            <div className="text-xs font-bold mb-1.5">Aufstiegsbereitschaft</div>
            <div className="text-xs text-text-muted mb-2">SVC Wolfsburg Damen 1 hat <strong className="text-green">Aufstiegsbereitschaft erklärt.</strong></div>
            <div className="text-[11px] bg-accent-dim rounded p-2 text-text-dim">Bei Aufstieg werden Voraussetzungen (Hallengröße, SR-Lizenzen) geprüft.</div>
          </Card>
        </div>
      </div>

      {/* Prüfen Modal */}
      <Modal open={meldungModal} onClose={() => setMeldungModal(false)} title="Mannschaftsmeldung prüfen" large>
        <div className="grid grid-cols-2 gap-5">
          <div>
            <div className="text-xs font-bold text-text-dim mb-3 uppercase tracking-wide">Meldedaten</div>
            <div className="grid gap-2 mb-4">
              {[
                ["Verein", "SVC Wolfsburg"],
                ["Mannschaft", "Damen 1"],
                ["Liga-Wunsch", "Bezirksliga Damen"],
              ].map(([l, v]) => (
                <div key={l} className="flex justify-between"><span className="text-xs font-semibold text-text-dim">{l}</span><strong className="text-[13px]">{v}</strong></div>
              ))}
              <div className="flex justify-between"><span className="text-xs font-semibold text-text-dim">Aufstiegsbereitschaft</span><Badge color="green">Ja</Badge></div>
            </div>
            <div className="mb-3">
              <div className="text-xs font-semibold text-text-dim mb-1.5">Anmerkungen des Vereins</div>
              <div className="bg-s2 rounded-[6px] p-2.5 text-xs text-text-dim">&quot;Wir möchten idealerweise in der Bezirksliga Hannover spielen.&quot;</div>
            </div>
            <div className="mb-3">
              <div className="text-xs font-semibold text-text-dim mb-1.5">Interne Notiz</div>
              <textarea rows={2} placeholder="Nur intern sichtbar…" />
            </div>
          </div>
          <div>
            <div className="text-xs font-bold text-text-dim mb-3 uppercase tracking-wide">Gemeldeter Kader (9 Spielerinnen)</div>
            <div className="flex gap-2 mb-2">
              <Badge color="green">{kaderOk} OK</Badge>
              {kaderWarning > 0 && <Badge color="orange">{kaderWarning} Warnung</Badge>}
            </div>
            <div className="space-y-1 max-h-[300px] overflow-y-auto">
              {kader.map((s, i) => (
                <div key={i} className={`flex items-center gap-2 px-2.5 py-2 rounded-[6px] text-xs ${s.passOk ? "bg-s2" : "bg-orange-dim border border-[rgba(217,119,6,0.2)]"}`}>
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${s.passOk ? "bg-green text-white" : "bg-orange text-white"}`}>
                    {s.passOk ? <Icon name="check" size={12} /> : "!"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold truncate">{s.name}</div>
                    <div className="text-[10px] text-text-muted">Pass: {s.passNr} · Geb: {s.gebdat}</div>
                    {s.passWarning && <div className="text-[10px] text-orange font-semibold">{s.passWarning} – <span className="underline cursor-pointer hover:text-red" onClick={(e) => { e.stopPropagation(); handleRenew(kader.indexOf(s)); }}>verlängern</span></div>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex gap-2 mt-5 pt-4 border-t border-border">
          <Button variant="danger" size="sm">Rückfrage stellen</Button>
          <div className="flex-1" />
          <Button variant="ghost" onClick={() => setMeldungModal(false)}>Abbrechen</Button>
          <Button variant="success" onClick={() => setMeldungModal(false)}>Meldung bestätigen</Button>
        </div>
      </Modal>

      {/* Neue Meldung Modal (Vereinssicht) */}
      <Modal open={neueMeldungModal} onClose={() => { setNeueMeldungModal(false); setMeldungStep(1); }} title="Neue Mannschaftsmeldung" large>
        {/* Step Indicator */}
        <div className="flex items-center gap-1 mb-5">
          {["Mannschaft", "Kader", "Liga & Spielbetrieb", "Prüfen"].map((s, i) => {
            const step = i + 1;
            return (
              <div key={i} className={`flex-1 text-center text-[11px] font-semibold py-2 rounded-[4px] ${step === meldungStep ? "bg-accent text-white" : step < meldungStep ? "bg-green-dim text-green" : "bg-s2 text-text-muted"}`}>
                {step < meldungStep ? <><Icon name="check" size={12} />{" "}</> : ""}{s}
              </div>
            );
          })}
        </div>

        {/* Step 1: Mannschaft */}
        {meldungStep === 1 && (
          <div>
            <div className="text-xs font-bold text-text-dim mb-3 uppercase tracking-wide">Schritt 1: Mannschaft</div>
            <div className="grid grid-cols-2 gap-3.5 mb-3.5">
              <div><div className="text-xs font-semibold text-text-dim mb-1.5">Wettbewerb *</div>
                <select><option>U16w – Deutsche Meisterschaft DM (2026/27)</option><option>Verbandsliga Damen</option></select>
              </div>
              <div><div className="text-xs font-semibold text-text-dim mb-1.5">Mannschaftsname *</div><input defaultValue="USC Gießen" /></div>
            </div>
            <div className="grid grid-cols-2 gap-3.5 mb-3.5">
              <div><div className="text-xs font-semibold text-text-dim mb-1.5">Verantwortliche/r *</div>
                <select><option>Maria Müller</option><option>Klaus Schmidt</option></select>
              </div>
              <div><div className="text-xs font-semibold text-text-dim mb-1.5">Stellvertretung</div>
                <select><option>Klaus Schmidt</option><option>Maria Müller</option></select>
              </div>
            </div>
            <div className="flex gap-2 justify-end mt-4">
              <Button variant="ghost" onClick={() => setNeueMeldungModal(false)}>Abbrechen</Button>
              <Button onClick={() => setMeldungStep(2)}>Weiter: Kader →</Button>
            </div>
          </div>
        )}

        {/* Step 2: Kader */}
        {meldungStep === 2 && (
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="text-xs font-bold text-text-dim uppercase tracking-wide">Schritt 2: Kader zusammenstellen</div>
              <div className="flex gap-2">
                <Badge color={kader.length >= 7 ? "green" : "red"}>{kader.length}/14 Spielerinnen</Badge>
                {kaderWarning > 0 && <Badge color="orange">{kaderWarning} Pass-Warnungen</Badge>}
              </div>
            </div>

            <div className="flex items-center gap-2 bg-blue-dim border border-[rgba(37,99,235,0.2)] rounded-[6px] px-3 py-2 mb-3 text-[12px] text-blue">
              Min. 7, Max. 14 Spielerinnen · Alter U16 (Stichtag: 01.01.2011) · Gültiger Spielerpass erforderlich
            </div>

            {/* Add player */}
            <div className="flex gap-2 mb-3">
              <select className="flex-1">
                <option>Spielerin aus Vereinsbestand hinzufügen...</option>
                <option>Mia Zimmermann (12353 · 08.12.2010)</option>
                <option>Hannah Schröder (12356 · 16.05.2012)</option>
                <option>Clara Meier (12355 · 25.10.2011)</option>
              </select>
              <Button size="sm">+ Hinzufügen</Button>
            </div>

            {/* Kader Table */}
            <div className="border border-border rounded-[10px] overflow-hidden">
              <table className="w-full border-collapse text-[13px]">
                <thead>
                  <tr className="bg-s2">
                    {["#", "Name", "Pass-Nr.", "Geb.datum", "Pass gültig bis", "Status", ""].map(h => (
                      <th key={h} className="text-[10px] font-semibold text-text-muted uppercase tracking-wide px-3 py-2 text-left">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {kader.map((s, i) => (
                    <tr key={i} className={`${!s.passOk ? "bg-orange-dim" : ""} hover:bg-s2`}>
                      <td className="px-3 py-2 border-t border-border text-text-muted font-bold">{i + 1}</td>
                      <td className="px-3 py-2 border-t border-border font-semibold">{s.name}</td>
                      <td className="px-3 py-2 border-t border-border text-text-muted">{s.passNr}</td>
                      <td className="px-3 py-2 border-t border-border">{s.gebdat}</td>
                      <td className="px-3 py-2 border-t border-border">{s.gueltigBis}</td>
                      <td className="px-3 py-2 border-t border-border">
                        {s.passOk ? (
                          <Badge color="green">OK</Badge>
                        ) : (
                          <div>
                            <Badge color="orange">Warnung</Badge>
                            <div className="text-[10px] text-orange mt-0.5">{s.passWarning}</div>
                          </div>
                        )}
                      </td>
                      <td className="px-3 py-2 border-t border-border">
                        <button className="text-red hover:text-red/70 text-xs" onClick={() => removeFromKader(i)}>Entfernen</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex gap-2 justify-end mt-4">
              <Button variant="ghost" onClick={() => setMeldungStep(1)}>← Zurück</Button>
              <Button onClick={() => setMeldungStep(3)} disabled={kader.length < 7}>Weiter: Liga & Spielbetrieb →</Button>
            </div>
          </div>
        )}

        {/* Step 3: Liga & Spielbetrieb */}
        {meldungStep === 3 && (
          <div>
            <div className="text-xs font-bold text-text-dim mb-3 uppercase tracking-wide">Schritt 3: Liga & Spielbetrieb</div>
            <div className="grid grid-cols-2 gap-3.5 mb-3.5">
              <div>
                <div className="text-xs font-semibold text-text-dim mb-1.5">Wunschstaffel</div>
                <div className="flex gap-2">
                  {["Nord", "Süd", "Egal"].map(s => (
                    <label key={s} className="flex items-center gap-1.5 text-[13px] cursor-pointer">
                      <input type="radio" name="staffel" defaultChecked={s === "Nord"} className="w-auto accent-accent" />
                      {s}
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-xs font-semibold text-text-dim mb-1.5">Spielklasse</div>
                <select><option>Verbandsliga</option><option>Bezirksliga</option><option>Kreisliga</option></select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3.5 mb-3.5">
              <div>
                <div className="text-xs font-semibold text-text-dim mb-1.5">Trikotsatz 1</div>
                <select><option>Blau / Weiß</option><option>Weiß / Blau</option><option>Rot / Schwarz</option></select>
              </div>
              <div>
                <div className="text-xs font-semibold text-text-dim mb-1.5">Trikotsatz 2</div>
                <select><option>Weiß / Blau</option><option>Blau / Weiß</option><option>Schwarz / Rot</option></select>
              </div>
            </div>
            <div className="mb-3.5">
              <div className="text-xs font-semibold text-text-dim mb-1.5">Heimspielhalle</div>
              <select><option>Sporthalle Am Anger, Gießen</option><option>Großsporthalle Gießen-West</option></select>
            </div>
            <div className="flex items-center justify-between py-3 border-t border-border mb-3">
              <div>
                <div className="text-[13.5px] font-semibold">Aufstiegsbereitschaft erklären</div>
                <div className="text-[11px] text-text-muted">Bei Tabellenplatz 1 kann die Mannschaft aufsteigen</div>
              </div>
              <label className="relative w-11 h-6 shrink-0">
                <input type="checkbox" className="opacity-0 w-0 h-0 peer" />
                <span className="absolute inset-0 bg-s3 rounded-full cursor-pointer transition-colors peer-checked:bg-accent before:content-[''] before:absolute before:h-[18px] before:w-[18px] before:left-[3px] before:top-[3px] before:bg-text-muted before:rounded-full before:transition-transform peer-checked:before:translate-x-5 peer-checked:before:bg-white" />
              </label>
            </div>
            <div className="mb-3">
              <div className="text-xs font-semibold text-text-dim mb-1.5">Anmerkungen</div>
              <textarea rows={2} placeholder="Optional: Besondere Wünsche, Hinweise..." />
            </div>
            <div className="flex gap-2 justify-end mt-4">
              <Button variant="ghost" onClick={() => setMeldungStep(2)}>← Zurück</Button>
              <Button onClick={() => setMeldungStep(4)}>Weiter: Prüfen →</Button>
            </div>
          </div>
        )}

        {/* Step 4: Prüfen & Absenden */}
        {meldungStep === 4 && (
          <div>
            <div className="text-xs font-bold text-text-dim mb-3 uppercase tracking-wide">Schritt 4: Zusammenfassung</div>
            <div className="bg-s2 rounded-[10px] p-4 mb-4">
              <div className="text-base font-bold mb-1">USC Gießen</div>
              <div className="text-[13px] text-text-muted">U16w – Deutsche Meisterschaft DM (2026/27)</div>
              <div className="flex gap-2 mt-2">
                <Badge color="purple">Verbandsliga Nord</Badge>
                <Badge color="blue">{kader.length} Spielerinnen</Badge>
                {kaderWarning > 0 && <Badge color="orange">{kaderWarning} Pass-Warnungen</Badge>}
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3 mb-4">
              <div><div className="text-[10px] font-semibold text-text-dim">Verantwortlich</div><div className="text-xs font-bold">Maria Müller</div></div>
              <div><div className="text-[10px] font-semibold text-text-dim">Trikotsatz 1</div><div className="text-xs font-bold">Blau / Weiß</div></div>
              <div><div className="text-[10px] font-semibold text-text-dim">Heimhalle</div><div className="text-xs font-bold">Sporthalle Am Anger</div></div>
            </div>

            <div className="text-xs font-bold mb-2">Kader ({kader.length} Spielerinnen)</div>
            <div className="grid grid-cols-3 gap-1 mb-4">
              {kader.map((s, i) => (
                <div key={i} className={`text-[11px] px-2 py-1.5 rounded ${s.passOk ? "bg-green-dim" : "bg-orange-dim"}`}>
                  {s.passOk ? <Icon name="check" size={12} /> : <Icon name="warning" size={12} />} {s.name}
                </div>
              ))}
            </div>

            {kaderWarning > 0 && (
              <div className="flex items-center gap-2 bg-orange-dim border border-[rgba(217,119,6,0.2)] rounded-[6px] px-3 py-2 mb-4 text-[12px] text-orange font-semibold">
                <Icon name="warning" size={12} /> {kaderWarning} Spielerinnen mit bald ablaufendem Pass – Verlängerung empfohlen
              </div>
            )}

            <div className="flex gap-2 justify-end mt-4">
              <Button variant="ghost" onClick={() => setMeldungStep(3)}>← Zurück</Button>
              <Button variant="ghost">Entwurf speichern</Button>
              <Button variant="success" onClick={() => setNeueMeldungModal(false)}>Meldung absenden</Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Pass-Verlängerung Modal */}
      <Modal open={renewModal !== null} onClose={() => setRenewModal(null)} title="Pass verlängern">
        {renewModal !== null && kader[renewModal] && (
          <>
            {renewStep === 1 && (
              <div>
                <div className="bg-orange-dim border border-orange/20 rounded-[8px] p-3.5 mb-4">
                  <div className="text-[13px] font-bold text-orange mb-1">Pass abgelaufen / läuft ab</div>
                  <div className="text-xs text-text-dim">{kader[renewModal].name} (#{kader[renewModal].passNr}) – gültig bis {kader[renewModal].gueltigBis}</div>
                </div>
                <div className="text-[13px] mb-3">Verlängerung beantragen für:</div>
                <div className="bg-s2 border border-border rounded-[8px] p-3.5 mb-4">
                  <div className="font-semibold text-sm">{kader[renewModal].name}</div>
                  <div className="text-xs text-text-muted mt-1">Pass-Nr: {kader[renewModal].passNr} · Geb: {kader[renewModal].gebdat}</div>
                </div>
                <div className="space-y-2 mb-4">
                  <label className="text-[11px] font-semibold text-text-dim uppercase tracking-wide block">Neues Gültigkeitsdatum</label>
                  <input defaultValue="30.06.2028" className="text-sm" />
                </div>
                <div className="space-y-2 mb-4">
                  <label className="text-[11px] font-semibold text-text-dim uppercase tracking-wide block">Passfoto aktualisieren?</label>
                  <div className="flex gap-3">
                    <label className="flex items-center gap-2 text-sm cursor-pointer"><input type="radio" name="foto" defaultChecked /> Bestehendes verwenden</label>
                    <label className="flex items-center gap-2 text-sm cursor-pointer"><input type="radio" name="foto" /> Neues Foto hochladen</label>
                  </div>
                </div>
                <div className="flex gap-2 justify-end">
                  <Button variant="ghost" onClick={() => setRenewModal(null)}>Abbrechen</Button>
                  <Button onClick={() => setRenewStep(2)}>Verlängerung prüfen</Button>
                </div>
              </div>
            )}
            {renewStep === 2 && (
              <div>
                <div className="bg-green-dim border border-green/20 rounded-[8px] p-3.5 mb-4">
                  <div className="text-[13px] font-bold text-green mb-1">Prüfung erfolgreich</div>
                  <div className="text-xs text-text-dim">Alle Voraussetzungen für die Passverlängerung sind erfüllt.</div>
                </div>
                <div className="space-y-2 text-[13px] mb-4">
                  <div className="flex justify-between py-1.5 border-b border-border"><span className="text-text-muted">Spielerin</span><span className="font-semibold">{kader[renewModal].name}</span></div>
                  <div className="flex justify-between py-1.5 border-b border-border"><span className="text-text-muted">Pass-Nr.</span><span className="font-semibold">{kader[renewModal].passNr}</span></div>
                  <div className="flex justify-between py-1.5 border-b border-border"><span className="text-text-muted">Bisherig gültig</span><span className="font-semibold text-red">{kader[renewModal].gueltigBis}</span></div>
                  <div className="flex justify-between py-1.5 border-b border-border"><span className="text-text-muted">Neu gültig bis</span><span className="font-semibold text-green">30.06.2028</span></div>
                  <div className="flex justify-between py-1.5"><span className="text-text-muted">Gebühr</span><span className="font-semibold">€ 15,00</span></div>
                </div>
                <div className="flex gap-2 justify-end">
                  <Button variant="ghost" onClick={() => setRenewStep(1)}>← Zurück</Button>
                  <Button variant="success" onClick={confirmRenew}>Pass verlängern & bestätigen</Button>
                </div>
              </div>
            )}
          </>
        )}
      </Modal>
    </div>
  );
}
