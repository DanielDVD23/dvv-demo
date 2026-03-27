"use client";

import { useState, useEffect } from "react";
import KpiCard from "@/components/ui/KpiCard";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Modal from "@/components/ui/Modal";
import SectionHeader from "@/components/ui/SectionHeader";
import ExportDropdown from "@/components/ui/ExportDropdown";
import Icon from "@/components/ui/Icon";

const rechnungen = [
  { empfaenger: "TV Hannover", typ: "Ordnungsstrafe", betrag: "€ 75,00", betragRed: true, faellig: "11.03.2026", faelligRed: true, status: "Überfällig", statusColor: "red" as const },
  { empfaenger: "SVC Göttingen", typ: "Liga-Beitrag", betrag: "€ 240,00", faellig: "25.03.2026", faelligOrange: true, status: "Fällig", statusColor: "orange" as const },
  { empfaenger: "MTV Wolfsburg", typ: "Veranstaltung", betrag: "€ 925,00", faellig: "05.04.2026", status: "Offen", statusColor: "blue" as const },
];

const integrations = [
  { name: "DATEV", sub: "Zuletzt sync: heute 08:12 · 34 Buchungen", logo: "D", logoBg: "bg-[#0078d4]", active: true },
  { name: "Lexware", sub: "Verbunden seit Jan. 2025", logo: "L", logoBg: "bg-[#ff6900]", active: true },
  { name: "sevdesk", sub: "Noch nicht verbunden", logo: "s", logoBg: "bg-s3", faded: true },
  { name: "WISO MeinBüro", sub: "Noch nicht verbunden", logo: "W", logoBg: "bg-s3", faded: true },
];

interface LineItem {
  beschreibung: string;
  menge: number;
  einzelpreis: number;
}

export default function Rechnungen({ action, onActionHandled }: { action?: string | null; onActionHandled?: () => void } = {}) {
  const [strafeModal, setStrafeModal] = useState(false);
  const [strafeBetrag, setStrafeBetrag] = useState("");
  const [neueRechnungModal, setNeueRechnungModal] = useState(false);
  const [rechnungStep, setRechnungStep] = useState(1);
  const [lineItems, setLineItems] = useState<LineItem[]>([
    { beschreibung: "Liga-Beitrag Saison 2025/26", menge: 1, einzelpreis: 240 },
  ]);
  const [ustSatz, setUstSatz] = useState(19);

  useEffect(() => {
    if (action === "open-strafe") {
      const t = setTimeout(() => { setStrafeModal(true); onActionHandled?.(); }, 50);
      return () => clearTimeout(t);
    }
    if (action === "open-neue-rechnung") {
      const t = setTimeout(() => { setNeueRechnungModal(true); setRechnungStep(1); onActionHandled?.(); }, 50);
      return () => clearTimeout(t);
    }
  }, [action, onActionHandled]);

  const netto = lineItems.reduce((s, l) => s + l.menge * l.einzelpreis, 0);
  const ust = Math.round(netto * ustSatz / 100);
  const brutto = netto + ust;

  const addLineItem = () => setLineItems([...lineItems, { beschreibung: "", menge: 1, einzelpreis: 0 }]);
  const removeLineItem = (idx: number) => setLineItems(lineItems.filter((_, i) => i !== idx));
  const updateLineItem = (idx: number, field: keyof LineItem, value: string | number) => {
    const updated = [...lineItems];
    updated[idx] = { ...updated[idx], [field]: value };
    setLineItems(updated);
  };

  const rechnungSteps = ["Empfänger", "Posten", "Zahlung", "Vorschau"];

  return (
    <div className="animate-fadeIn">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-[22px] font-bold mb-1">Rechnungsübersicht</h1>
          <p className="text-[13px] text-text-muted">Finanzen auf einen Blick · Buchhaltungsanbindung</p>
        </div>
        <ExportDropdown formats={["CSV", "PDF", "DATEV"]} />
      </div>

      {/* KPIs + SEPA-Warnung */}
      <div className="grid grid-cols-2 xl:grid-cols-5 gap-4 mb-5">
        <KpiCard label="Offene Rechnungen" value="€ 1.240" sub="3 Rechnungen ausstehend" color="red" />
        <KpiCard label="Offene Strafen" value="€ 180" sub="2 Ordnungsstrafen" color="orange" />
        <KpiCard label="Bezahlt (Saison)" value="€ 12.440" sub="34 Rechnungen beglichen" color="green" />
        <KpiCard label="SEPA-Mandate" value="18" sub="aktiv · 2 laufen bald ab" color="purple" />
        <div className="bg-s1 border-2 border-orange/30 rounded-[10px] p-4 flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 rounded-full bg-orange animate-pulse shrink-0" />
            <div className="text-[11px] font-bold text-orange uppercase tracking-wide">SEPA-Mandat läuft ab</div>
          </div>
          <div className="text-[13px] font-bold">TSV Osnabrück</div>
          <div className="text-[11px] text-text-muted mb-2">Ablauf in 28 Tagen</div>
          <Button variant="ghost" size="sm" className="!w-fit">Verlängerung anfordern</Button>
        </div>
      </div>

      {/* Rechnungsliste */}
      <SectionHeader title="Offene Rechnungen" right={
        <div className="flex gap-2 items-center">
          <select className="!w-[140px] text-xs"><option>Alle Typen</option><option>Liga-Beiträge</option><option>Strafen</option></select>
          <Button onClick={() => setStrafeModal(true)}>+ Strafbescheid</Button>
          <Button onClick={() => { setNeueRechnungModal(true); setRechnungStep(1); }}>+ Neue Rechnung</Button>
        </div>
      } />
      <Card noPadding className="overflow-hidden mb-6">
        <table className="w-full border-collapse text-[13px]">
          <thead>
            <tr>
              {["Empfänger", "Typ", "Betrag", "Fällig", "Status", ""].map(h => (
                <th key={h} className="text-[11px] font-semibold text-text-muted uppercase tracking-wide px-3.5 py-2.5 text-left border-b border-border">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rechnungen.map((r, i) => (
              <tr key={i} className="hover:bg-s2">
                <td className="px-3.5 py-3 border-b border-border"><strong>{r.empfaenger}</strong></td>
                <td className="px-3.5 py-3 border-b border-border"><span className="text-[11px] text-text-muted bg-s2 px-2 py-0.5 rounded">{r.typ}</span></td>
                <td className={`px-3.5 py-3 border-b border-border font-bold ${r.betragRed ? "text-red" : ""}`}>{r.betrag}</td>
                <td className={`px-3.5 py-3 border-b border-border ${r.faelligRed ? "text-red" : r.faelligOrange ? "text-orange" : ""}`}>{r.faellig}</td>
                <td className="px-3.5 py-3 border-b border-border"><Badge color={r.statusColor}>{r.status}</Badge></td>
                <td className="px-3.5 py-3 border-b border-border"><Button variant="ghost" size="sm">Details</Button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {/* Ordnungsstrafen Flow */}
      <SectionHeader title="Ordnungsstrafen" />
      <Card className="!py-3.5 !px-5 mb-6">
        <div className="flex items-center gap-3 text-[13px] text-text-muted">
          <Badge color="purple">1</Badge> <span>Verein & Tatbestand aus Katalog wählen</span>
          <span className="text-border text-lg">→</span>
          <Badge color="purple">2</Badge> <span>Betrag auto-berechnet</span>
          <span className="text-border text-lg">→</span>
          <Badge color="purple">3</Badge> <span>Bescheid generieren & versenden</span>
        </div>
      </Card>

      {/* Buchhaltungsanbindung – unter Ordnungsstrafen, Cards nebeneinander */}
      <SectionHeader title="Buchhaltungsanbindung" right={<span className="text-[11px] text-text-muted">Offene Schnittstelle für weitere Systeme</span>} />
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-3">
        {integrations.map((int, i) => (
          <Card key={i} className={`!p-4 ${int.faded ? "opacity-50" : ""}`}>
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-extrabold text-white shrink-0 ${int.logoBg}`}>{int.logo}</div>
              <div className="flex-1 min-w-0">
                <div className="text-[14px] font-bold">{int.name}</div>
                <div className="text-[11px] text-text-muted truncate">{int.sub}</div>
              </div>
            </div>
            {int.active ? <Badge color="green">Verbunden</Badge> : <Button variant="ghost" size="sm">Verbinden</Button>}
          </Card>
        ))}
      </div>

      {/* Strafe Modal */}
      <Modal open={strafeModal} onClose={() => setStrafeModal(false)} title="Strafbescheid ausstellen">
        <div className="mb-3.5"><div className="text-xs font-semibold text-text-dim mb-1.5">Verein *</div>
          <select><option>Verein wählen…</option><option>TV Hannover</option><option>SVC Göttingen</option><option>MTV Wolfsburg</option></select>
        </div>
        <div className="mb-3.5"><div className="text-xs font-semibold text-text-dim mb-1.5">Tatbestand aus Katalog *</div>
          <select onChange={(e) => setStrafeBetrag(e.target.value ? `€ ${e.target.value},00` : "")}>
            <option value="">Tatbestand wählen…</option>
            <option value="75">Nicht-Antritt (§ 14.1) – € 75,00</option>
            <option value="50">Verspätete Meldung (§ 8.3) – € 50,00</option>
            <option value="30">Formfehler Spielbericht (§ 12.2) – € 30,00</option>
            <option value="150">Unsportliches Verhalten (§ 16.1) – € 150,00</option>
          </select>
        </div>
        <div className="mb-3.5"><div className="text-xs font-semibold text-text-dim mb-1.5">Betrag (auto-berechnet)</div>
          <input value={strafeBetrag} readOnly placeholder="Wird nach Tatbestand-Auswahl befüllt" className={strafeBetrag ? "!border-green" : ""} />
        </div>
        <div className="mb-3.5"><div className="text-xs font-semibold text-text-dim mb-1.5">Begründung / Aktennotiz</div><textarea rows={3} placeholder="Sachverhalt kurz beschreiben…" /></div>
        <div className="flex gap-2">
          <Button variant="ghost" className="flex-1" onClick={() => setStrafeModal(false)}>Abbrechen</Button>
          <Button className="flex-1" onClick={() => setStrafeModal(false)}>Strafbescheid generieren & senden</Button>
        </div>
      </Modal>

      {/* Neue Rechnung Modal */}
      <Modal open={neueRechnungModal} onClose={() => setNeueRechnungModal(false)} title="Neue Rechnung erstellen" large>
        {/* Step Indicator */}
        <div className="flex items-center gap-1 mb-5">
          {rechnungSteps.map((s, i) => {
            const step = i + 1;
            return (
              <div key={i} className={`flex-1 text-center text-[11px] font-semibold py-2 rounded-[4px] ${step === rechnungStep ? "bg-accent text-white" : step < rechnungStep ? "bg-green-dim text-green" : "bg-s2 text-text-muted"}`}>
                {step < rechnungStep ? <><Icon name="check" size={10} />{" "}</> : ""}{s}
              </div>
            );
          })}
        </div>

        {/* Step 1: Empfänger */}
        {rechnungStep === 1 && (
          <div>
            <div className="mb-3.5"><div className="text-xs font-semibold text-text-dim mb-1.5">Empfänger (Verein) *</div>
              <select><option>Verein wählen…</option><option>TSV Hannover</option><option>SVC Göttingen</option><option>MTV Wolfsburg</option><option>VfR Bielefeld</option><option>SC Osnabrück</option></select>
            </div>
            <div className="grid grid-cols-2 gap-3.5 mb-3.5">
              <div><div className="text-xs font-semibold text-text-dim mb-1.5">Rechnungstyp *</div>
                <select><option>Liga-Beitrag</option><option>Ordnungsstrafe</option><option>Veranstaltungsgebühr</option><option>Sonstiges</option></select>
              </div>
              <div><div className="text-xs font-semibold text-text-dim mb-1.5">Rechnungsnummer</div>
                <input value="RE-2026-0425" readOnly className="!bg-s2" />
              </div>
            </div>
            <div className="flex gap-2 justify-end mt-4">
              <Button variant="ghost" onClick={() => setNeueRechnungModal(false)}>Abbrechen</Button>
              <Button onClick={() => setRechnungStep(2)}>Weiter: Posten →</Button>
            </div>
          </div>
        )}

        {/* Step 2: Rechnungsposten */}
        {rechnungStep === 2 && (
          <div>
            <div className="text-xs font-bold text-text-dim mb-3 uppercase tracking-wide">Rechnungsposten</div>
            <div className="border border-border rounded-[10px] overflow-hidden mb-3">
              <table className="w-full border-collapse text-[13px]">
                <thead>
                  <tr className="bg-s2">
                    {["Beschreibung", "Menge", "Einzelpreis", "Gesamt", ""].map(h => (
                      <th key={h} className="text-[10px] font-semibold text-text-muted uppercase tracking-wide px-3 py-2 text-left">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {lineItems.map((item, i) => (
                    <tr key={i}>
                      <td className="px-2 py-1.5 border-t border-border">
                        <input value={item.beschreibung} onChange={e => updateLineItem(i, "beschreibung", e.target.value)} placeholder="Beschreibung…" className="!text-xs !py-1.5" />
                      </td>
                      <td className="px-2 py-1.5 border-t border-border w-[80px]">
                        <input type="number" value={item.menge} onChange={e => updateLineItem(i, "menge", parseInt(e.target.value) || 0)} className="!text-xs !py-1.5 text-center" />
                      </td>
                      <td className="px-2 py-1.5 border-t border-border w-[120px]">
                        <input type="number" value={item.einzelpreis} onChange={e => updateLineItem(i, "einzelpreis", parseFloat(e.target.value) || 0)} className="!text-xs !py-1.5 text-right" />
                      </td>
                      <td className="px-3 py-1.5 border-t border-border font-bold text-right w-[100px]">
                        € {(item.menge * item.einzelpreis).toFixed(2)}
                      </td>
                      <td className="px-2 py-1.5 border-t border-border w-[40px]">
                        {lineItems.length > 1 && (
                          <button className="text-red hover:text-red/70 text-xs" onClick={() => removeLineItem(i)}><Icon name="x" size={12} /></button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Button variant="ghost" size="sm" onClick={addLineItem}>+ Position hinzufügen</Button>
            <div className="mt-3 pt-3 border-t border-border text-right">
              <div className="text-xs text-text-muted">Zwischensumme</div>
              <div className="text-lg font-bold">€ {netto.toFixed(2)}</div>
            </div>
            <div className="flex gap-2 justify-end mt-4">
              <Button variant="ghost" onClick={() => setRechnungStep(1)}>← Zurück</Button>
              <Button onClick={() => setRechnungStep(3)}>Weiter: Zahlung →</Button>
            </div>
          </div>
        )}

        {/* Step 3: Zahlungsdetails */}
        {rechnungStep === 3 && (
          <div>
            <div className="grid grid-cols-2 gap-3.5 mb-3.5">
              <div><div className="text-xs font-semibold text-text-dim mb-1.5">Fälligkeitsdatum *</div>
                <input type="date" defaultValue="2026-04-15" />
              </div>
              <div><div className="text-xs font-semibold text-text-dim mb-1.5">Zahlungsmethode</div>
                <select><option>Banküberweisung</option><option>SEPA-Lastschrift</option><option>Bar</option></select>
              </div>
            </div>
            <div className="mb-3.5">
              <div className="text-xs font-semibold text-text-dim mb-1.5">USt-Satz</div>
              <select value={ustSatz} onChange={e => setUstSatz(parseInt(e.target.value))}>
                <option value={19}>19% MwSt.</option>
                <option value={7}>7% MwSt.</option>
                <option value={0}>0% (steuerfrei)</option>
              </select>
            </div>
            <div className="bg-s2 rounded-[10px] p-4 mt-4">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div><div className="text-[10px] font-semibold text-text-dim">Netto</div><div className="text-base font-bold">€ {netto.toFixed(2)}</div></div>
                <div><div className="text-[10px] font-semibold text-text-dim">USt ({ustSatz}%)</div><div className="text-base font-bold">€ {ust.toFixed(2)}</div></div>
                <div><div className="text-[10px] font-semibold text-text-dim">Brutto</div><div className="text-lg font-bold text-accent">€ {brutto.toFixed(2)}</div></div>
              </div>
            </div>
            <div className="flex gap-2 justify-end mt-4">
              <Button variant="ghost" onClick={() => setRechnungStep(2)}>← Zurück</Button>
              <Button onClick={() => setRechnungStep(4)}>Weiter: Vorschau →</Button>
            </div>
          </div>
        )}

        {/* Step 4: Vorschau */}
        {rechnungStep === 4 && (
          <div>
            <div className="bg-s2 rounded-[10px] p-5 mb-4">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="text-[10px] font-semibold text-text-dim">RECHNUNG</div>
                  <div className="text-lg font-bold">RE-2026-0425</div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] font-semibold text-text-dim">EMPFÄNGER</div>
                  <div className="text-sm font-bold">TSV Hannover</div>
                </div>
              </div>

              <div className="border border-border rounded-[8px] overflow-hidden mb-4">
                <table className="w-full border-collapse text-[13px]">
                  <thead><tr className="bg-s3">
                    {["Beschreibung", "Menge", "Einzelpreis", "Gesamt"].map(h => (
                      <th key={h} className="text-[10px] font-semibold text-text-dim uppercase px-3 py-2 text-left">{h}</th>
                    ))}
                  </tr></thead>
                  <tbody>
                    {lineItems.map((item, i) => (
                      <tr key={i}>
                        <td className="px-3 py-2 border-t border-border">{item.beschreibung || "–"}</td>
                        <td className="px-3 py-2 border-t border-border">{item.menge}</td>
                        <td className="px-3 py-2 border-t border-border">€ {item.einzelpreis.toFixed(2)}</td>
                        <td className="px-3 py-2 border-t border-border font-bold">€ {(item.menge * item.einzelpreis).toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="grid grid-cols-3 gap-4 text-right">
                <div /><div />
                <div className="space-y-1">
                  <div className="flex justify-between text-xs"><span className="text-text-muted">Netto</span><span>€ {netto.toFixed(2)}</span></div>
                  <div className="flex justify-between text-xs"><span className="text-text-muted">USt ({ustSatz}%)</span><span>€ {ust.toFixed(2)}</span></div>
                  <div className="flex justify-between text-sm font-bold border-t border-border pt-1"><span>Brutto</span><span className="text-accent">€ {brutto.toFixed(2)}</span></div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-blue-dim border border-[rgba(37,99,235,0.2)] rounded-[6px] px-4 py-2.5 mb-4 text-[13px] text-blue">
              Rechnung wird per E-Mail an den Verein gesendet und im System hinterlegt.
            </div>

            <div className="flex gap-2 justify-end">
              <Button variant="ghost" onClick={() => setRechnungStep(3)}>← Zurück</Button>
              <Button variant="ghost" onClick={() => setNeueRechnungModal(false)}>Entwurf speichern</Button>
              <Button variant="success" onClick={() => setNeueRechnungModal(false)}>Rechnung senden</Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
