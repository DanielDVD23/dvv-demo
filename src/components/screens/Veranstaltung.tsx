"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Icon from "@/components/ui/Icon";

type EventType = "" | "lehrgang" | "turnier" | "kader" | "versammlung";
type LehrgangArt = "" | "ausbildung" | "fortbildung";

const typeCards = [
  { id: "lehrgang" as const, icon: "graduation-cap", name: "Lehrgang", desc: "Aus- oder Fortbildung mit Lizenzierung", color: "border-l-accent" },
  { id: "turnier" as const, icon: "trophy", name: "Turnier / Meisterschaft", desc: "Wettkampf mit Spielplan & Ergebnissen", color: "border-l-orange" },
  { id: "kader" as const, icon: "zap", name: "Kadermaßnahme", desc: "Sichtung, Training, Teambuilding", color: "border-l-blue" },
  { id: "versammlung" as const, icon: "clipboard", name: "Versammlung / Meeting", desc: "Verbandstag, Gremien, Sitzung", color: "border-l-green" },
];

export default function Veranstaltung() {
  const [eventType, setEventType] = useState<EventType>("");
  const [lehrgangArt, setLehrgangArt] = useState<LehrgangArt>("");
  const [currentStep, setCurrentStep] = useState(0); // 0 = type selection
  const [buchhaltungOpen, setBuchhaltungOpen] = useState(false);
  const [abrechnungenOpen, setAbrechnungenOpen] = useState(false);
  const [weitereOpen, setWeitereOpen] = useState(false);

  const steps = eventType === "lehrgang"
    ? ["Typ wählen", "Lehrgangsart", "Grunddaten", "Ort & Zeit", "Lizenzierung", "Konfiguration", "Vorschau"]
    : eventType === "turnier"
    ? ["Typ wählen", "Grunddaten", "Ort & Zeit", "Konfiguration", "Vorschau"]
    : ["Typ wählen", "Grunddaten", "Ort & Zeit", "Konfiguration", "Vorschau"];

  const maxStep = steps.length;

  const resetToTypeSelect = () => {
    setEventType("");
    setLehrgangArt("");
    setCurrentStep(0);
  };

  const getStepContent = () => {
    // Step 0: Type Selection
    if (currentStep === 0) {
      return (
        <div>
          <Card>
            <div className="text-sm font-bold mb-1">Was für eine Veranstaltung?</div>
            <div className="text-xs text-text-muted mb-4">Die Auswahl bestimmt, welche Felder dir angezeigt werden.</div>
            <div className="grid grid-cols-2 gap-3">
              {typeCards.map(t => (
                <div
                  key={t.id}
                  className={`border border-border rounded-[10px] p-4 cursor-pointer transition-all hover:bg-s3 hover:-translate-y-px border-l-[3px] ${t.color} ${eventType === t.id ? "bg-accent-dim !border-accent ring-2 ring-accent/20" : "bg-s2"}`}
                  onClick={() => setEventType(t.id)}
                >
                  <div className="text-2xl mb-2"><Icon name={t.icon} size={20} /></div>
                  <div className="text-sm font-bold">{t.name}</div>
                  <div className="text-[11px] text-text-muted mt-0.5">{t.desc}</div>
                  {eventType === t.id && (
                    <div className="mt-2 text-[11px] font-bold text-accent flex items-center gap-1">Ausgewählt <Icon name="check" size={12} /></div>
                  )}
                </div>
              ))}
            </div>
          </Card>
          <div className="flex gap-2.5 justify-end mt-6 pt-4 border-t border-border">
            <Button disabled={!eventType} onClick={() => setCurrentStep(1)}>Weiter →</Button>
          </div>
        </div>
      );
    }

    // Lehrgang: Step 1 = Lehrgangsart
    if (eventType === "lehrgang" && currentStep === 1) {
      return (
        <div>
          <Card>
            <div className="text-sm font-bold mb-1">Lehrgangsart</div>
            <div className="text-xs text-text-muted mb-4">Bestimmt die Lizenzierungsoptionen in einem späteren Schritt.</div>
            <div className="grid grid-cols-2 gap-4">
              <div
                className={`border-2 rounded-[10px] p-5 cursor-pointer transition-all ${lehrgangArt === "ausbildung" ? "border-orange bg-orange-dim" : "border-border bg-s2 hover:bg-s3"}`}
                onClick={() => setLehrgangArt("ausbildung")}
              >
                <div className="text-xl mb-2 w-10 h-10 rounded-full bg-orange-dim flex items-center justify-center"><Icon name="graduation-cap" size={20} /></div>
                <div className="text-sm font-bold text-orange">Ausbildung</div>
                <div className="text-[11px] text-text-muted mt-1">Stellt <strong>neue</strong> Lizenzen aus nach erfolgreichem Abschluss</div>
                {lehrgangArt === "ausbildung" && (
                  <div className="mt-3 bg-orange/10 rounded-[6px] p-2 text-[11px] text-orange font-semibold">
                    <Icon name="check" size={12} /> &quot;Mit Prüfung&quot; wird automatisch aktiviert<br />
                    <Icon name="check" size={12} /> Lizenztyp-Auswahl wird eingeblendet
                  </div>
                )}
              </div>
              <div
                className={`border-2 rounded-[10px] p-5 cursor-pointer transition-all ${lehrgangArt === "fortbildung" ? "border-blue bg-blue-dim" : "border-border bg-s2 hover:bg-s3"}`}
                onClick={() => setLehrgangArt("fortbildung")}
              >
                <div className="text-xl mb-2 w-10 h-10 rounded-full bg-blue-dim flex items-center justify-center"><Icon name="refresh" size={20} /></div>
                <div className="text-sm font-bold text-blue">Fortbildung</div>
                <div className="text-[11px] text-text-muted mt-1"><strong>Verlängert</strong> bestehende Lizenzen durch Unterrichtseinheiten</div>
                {lehrgangArt === "fortbildung" && (
                  <div className="mt-3 bg-blue/10 rounded-[6px] p-2 text-[11px] text-blue font-semibold">
                    <Icon name="check" size={12} /> Unterrichtseinheiten werden abgefragt<br />
                    <Icon name="check" size={12} /> Lizenztyp-Auswahl wird eingeblendet
                  </div>
                )}
              </div>
            </div>
          </Card>
          <div className="flex gap-2.5 justify-end mt-6 pt-4 border-t border-border">
            <Button variant="ghost" onClick={() => setCurrentStep(0)}>← Zurück</Button>
            <Button disabled={!lehrgangArt} onClick={() => setCurrentStep(2)}>Weiter →</Button>
          </div>
        </div>
      );
    }

    // Grunddaten step
    const grunddatenStep = eventType === "lehrgang" ? 2 : 1;
    if (currentStep === grunddatenStep) {
      return (
        <div>
          {/* Notification for lehrgang */}
          {eventType === "lehrgang" && (
            <div className="flex items-center gap-2 bg-green-dim border border-[rgba(34,197,94,0.3)] rounded-[6px] px-4 py-2.5 mb-4 text-[13px] text-green">
              <Icon name="check" size={12} /> {lehrgangArt === "ausbildung" ? "Ausbildungslehrgang" : "Fortbildungslehrgang"} – passende Felder wurden vorausgewählt.
            </div>
          )}
          <Card>
            <div className="text-sm font-bold mb-4">Grunddaten</div>
            <div className="mb-3.5">
              <div className="text-xs font-semibold text-text-dim mb-1.5">Name der Veranstaltung *</div>
              <input defaultValue={eventType === "lehrgang" ? "C-Trainer Lehrgang 2026" : eventType === "turnier" ? "Bezirksmeisterschaft U16w" : ""} placeholder="z.B. Verbandsturnier Sommer 2026" />
            </div>
            <div className="grid grid-cols-2 gap-3.5 mb-3.5">
              <div>
                <div className="text-xs font-semibold text-text-dim mb-1.5">Veranstaltungstyp</div>
                <input value={typeCards.find(t => t.id === eventType)?.name || ""} readOnly className="!bg-s2" />
              </div>
              <div>
                <div className="text-xs font-semibold text-text-dim mb-1.5">Zielgruppe *</div>
                <select defaultValue={eventType === "lehrgang" ? "trainer" : ""}>
                  <option value="">Alle Mitglieder</option>
                  <option value="trainer">Trainer</option>
                  <option value="sr">Schiedsrichter</option>
                  <option value="spieler">Spieler/Kader</option>
                  <option value="funktionaer">Funktionäre</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3.5 mb-3.5">
              <div>
                <div className="text-xs font-semibold text-text-dim mb-1.5">Sichtbarkeit</div>
                <select>
                  <option>Öffentlich (Homepage + Mitgliederbereich)</option>
                  <option>Nur Mitglieder</option>
                  <option>Geschlossen (nur per Einladung)</option>
                </select>
              </div>
              <div>
                <div className="text-xs font-semibold text-text-dim mb-1.5">Meldefrist</div>
                <input type="date" defaultValue="2026-07-01" />
              </div>
            </div>
            <div>
              <div className="text-xs font-semibold text-text-dim mb-1.5">Beschreibung</div>
              <textarea rows={3} placeholder="Worum geht es bei dieser Veranstaltung?" />
            </div>
          </Card>
          <div className="flex gap-2.5 justify-end mt-6 pt-4 border-t border-border">
            <Button variant="ghost" onClick={() => setCurrentStep(currentStep - 1)}>← Zurück</Button>
            <Button variant="ghost">Entwurf speichern</Button>
            <Button onClick={() => setCurrentStep(currentStep + 1)}>Weiter →</Button>
          </div>
        </div>
      );
    }

    // Ort & Zeit step
    const ortStep = eventType === "lehrgang" ? 3 : 2;
    if (currentStep === ortStep) {
      return (
        <div>
          <Card>
            <div className="text-sm font-bold mb-4">Ort & Zeitraum</div>
            <div className="grid grid-cols-2 gap-3.5 mb-3.5">
              <div><div className="text-xs font-semibold text-text-dim mb-1.5">Startdatum *</div><input type="date" defaultValue="2026-07-15" /></div>
              <div><div className="text-xs font-semibold text-text-dim mb-1.5">Enddatum *</div><input type="date" defaultValue="2026-07-17" /></div>
            </div>
            <div className="grid grid-cols-2 gap-3.5 mb-3.5">
              <div><div className="text-xs font-semibold text-text-dim mb-1.5">Startzeit</div><input type="time" defaultValue="09:00" /></div>
              <div><div className="text-xs font-semibold text-text-dim mb-1.5">Endzeit</div><input type="time" defaultValue="18:00" /></div>
            </div>
            <div className="mb-3.5">
              <div className="text-xs font-semibold text-text-dim mb-1.5">Veranstaltungsort *</div>
              <input defaultValue="Sportanlage TSV Hannover, Eilenriede 42" />
            </div>
            <div className="grid grid-cols-2 gap-3.5">
              <div>
                <div className="text-xs font-semibold text-text-dim mb-1.5">Max. Teilnehmerzahl</div>
                <input type="number" defaultValue="48" />
                <div className="text-[11px] text-text-muted mt-1">Bei Überschreitung wird die Warteliste aktiviert.</div>
              </div>
              <div>
                <div className="text-xs font-semibold text-text-dim mb-1.5">Teilnahmegebühr (€)</div>
                <input type="number" placeholder="0,00" defaultValue={eventType === "lehrgang" ? "180" : ""} />
              </div>
            </div>
          </Card>
          <div className="flex gap-2.5 justify-end mt-6 pt-4 border-t border-border">
            <Button variant="ghost" onClick={() => setCurrentStep(currentStep - 1)}>← Zurück</Button>
            <Button variant="ghost">Entwurf speichern</Button>
            <Button onClick={() => setCurrentStep(currentStep + 1)}>Weiter →</Button>
          </div>
        </div>
      );
    }

    // Lizenzierung step (only for lehrgang)
    if (eventType === "lehrgang" && currentStep === 4) {
      return (
        <div>
          <Card>
            <div className="flex items-center gap-2 mb-4">
              <div className="text-sm font-bold">Lizenzierung</div>
              {lehrgangArt === "ausbildung" ? (
                <Badge color="orange">Ausbildung → stellt aus</Badge>
              ) : (
                <Badge color="blue">Fortbildung → verlängert</Badge>
              )}
            </div>

            {lehrgangArt === "ausbildung" && (
              <>
                <div className="flex items-center gap-2 bg-green-dim border border-[rgba(34,197,94,0.3)] rounded-[6px] px-4 py-2.5 mb-4 text-[13px] text-green">
                  <Icon name="check" size={12} /> &quot;Mit Prüfung&quot; ist automatisch aktiviert – Lizenzen werden nach bestandener Prüfung ausgestellt.
                </div>
                <div className="mb-3.5">
                  <div className="text-xs font-semibold text-text-dim mb-1.5">Auszustellender Lizenztyp *</div>
                  <select>
                    <option>C-Trainer Volleyball (DVV)</option>
                    <option>B-Trainer Volleyball (DVV)</option>
                    <option>A-Trainer Volleyball (DVV)</option>
                    <option>Schiedsrichter Regional</option>
                    <option>Schiedsrichter National</option>
                  </select>
                </div>
                <div className="mb-3.5">
                  <div className="text-xs font-semibold text-text-dim mb-1.5">Voraussetzung</div>
                  <select>
                    <option>Keine Voraussetzung</option>
                    <option>C-Trainer-Lizenz erforderlich</option>
                    <option>B-Trainer-Lizenz erforderlich</option>
                  </select>
                </div>
                <div className="flex items-center justify-between py-3 border-t border-border">
                  <div>
                    <div className="text-[13.5px] font-semibold">Alte Lizenz automatisch deaktivieren</div>
                    <div className="text-[11px] text-text-muted">Bei Aufstieg (z.B. C→B) wird die alte Lizenz deaktiviert</div>
                  </div>
                  <label className="relative w-11 h-6 shrink-0">
                    <input type="checkbox" defaultChecked className="opacity-0 w-0 h-0 peer" />
                    <span className="absolute inset-0 bg-s3 rounded-full cursor-pointer transition-colors peer-checked:bg-accent before:content-[''] before:absolute before:h-[18px] before:w-[18px] before:left-[3px] before:top-[3px] before:bg-text-muted before:rounded-full before:transition-transform peer-checked:before:translate-x-5 peer-checked:before:bg-white" />
                  </label>
                </div>
              </>
            )}

            {lehrgangArt === "fortbildung" && (
              <>
                <div className="mb-3.5">
                  <div className="text-xs font-semibold text-text-dim mb-1.5">Zu verlängernder Lizenztyp *</div>
                  <select>
                    <option>C-Trainer Volleyball (DVV)</option>
                    <option>B-Trainer Volleyball (DVV)</option>
                    <option>Schiedsrichter Regional</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-3.5 mb-3.5">
                  <div>
                    <div className="text-xs font-semibold text-text-dim mb-1.5">Unterrichtseinheiten (UE) *</div>
                    <input type="number" defaultValue="16" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-text-dim mb-1.5">Verlängerung um</div>
                    <select>
                      <option>1 Jahr</option>
                      <option>2 Jahre</option>
                      <option>4 Jahre</option>
                    </select>
                  </div>
                </div>
                <div className="flex items-center justify-between py-3 border-t border-border">
                  <div>
                    <div className="text-[13.5px] font-semibold">Abgelaufene Lizenzen zulassen</div>
                    <div className="text-[11px] text-text-muted">Teilnehmer mit bereits abgelaufener Lizenz dürfen teilnehmen</div>
                  </div>
                  <label className="relative w-11 h-6 shrink-0">
                    <input type="checkbox" className="opacity-0 w-0 h-0 peer" />
                    <span className="absolute inset-0 bg-s3 rounded-full cursor-pointer transition-colors peer-checked:bg-accent before:content-[''] before:absolute before:h-[18px] before:w-[18px] before:left-[3px] before:top-[3px] before:bg-text-muted before:rounded-full before:transition-transform peer-checked:before:translate-x-5 peer-checked:before:bg-white" />
                  </label>
                </div>
              </>
            )}
          </Card>
          <div className="flex gap-2.5 justify-end mt-6 pt-4 border-t border-border">
            <Button variant="ghost" onClick={() => setCurrentStep(3)}>← Zurück</Button>
            <Button variant="ghost">Entwurf speichern</Button>
            <Button onClick={() => setCurrentStep(5)}>Weiter →</Button>
          </div>
        </div>
      );
    }

    // Konfiguration step
    const konfigStep = eventType === "lehrgang" ? 5 : 3;
    if (currentStep === konfigStep) {
      return (
        <div>
          <Card className="!mb-3">
            <div className="text-sm font-bold mb-1">Erweiterte Konfiguration</div>
            <div className="text-xs text-text-muted mb-4">Nur bei Bedarf anpassen – Smart Defaults sind voreingestellt</div>

            {/* Buchhaltung */}
            <div className="border border-border rounded-[10px] overflow-hidden mb-2.5">
              <div className="flex items-center gap-2.5 py-3.5 px-4 bg-s2 cursor-pointer hover:bg-s3" onClick={() => setBuchhaltungOpen(!buchhaltungOpen)}>
                <span className="text-sm font-semibold flex-1">Buchhaltung & Zahlung</span>
                <span className="text-[11px] text-green flex items-center gap-0.5"><Icon name="check" size={12} /> Preis gesetzt</span>
                <svg className={`transition-transform ${buchhaltungOpen ? "rotate-180" : ""}`} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9" /></svg>
              </div>
              {buchhaltungOpen && (
                <div className="p-4 bg-s1">
                  <div className="grid grid-cols-2 gap-3.5 mb-3">
                    <div>
                      <div className="text-xs font-semibold text-text-dim mb-1.5">Zahlungsmethode</div>
                      <select><option>Banküberweisung</option><option>SEPA-Lastschrift</option><option>Bar</option></select>
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-text-dim mb-1.5">USt-Satz</div>
                      <select><option>19% MwSt.</option><option>7% MwSt.</option><option>0% (steuerfrei)</option></select>
                    </div>
                  </div>
                  {[
                    { title: "Rechnungen automatisch ausstellen", sub: "Nach Anmeldung wird automatisch eine Rechnung generiert", checked: true },
                    { title: "DATEV-Export aktivieren", sub: "Transaktionen werden für DATEV-Export vorbereitet", checked: false },
                  ].map((t, i) => (
                    <div key={i} className="flex items-center justify-between py-3 border-b border-border last:border-b-0">
                      <div><div className="text-[13.5px] font-semibold">{t.title}</div><div className="text-[11px] text-text-muted mt-0.5">{t.sub}</div></div>
                      <label className="relative w-11 h-6 shrink-0">
                        <input type="checkbox" defaultChecked={t.checked} className="opacity-0 w-0 h-0 peer" />
                        <span className="absolute inset-0 bg-s3 rounded-full cursor-pointer transition-colors peer-checked:bg-accent before:content-[''] before:absolute before:h-[18px] before:w-[18px] before:left-[3px] before:top-[3px] before:bg-text-muted before:rounded-full before:transition-transform peer-checked:before:translate-x-5 peer-checked:before:bg-white" />
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Abrechnungen */}
            <div className="border border-border rounded-[10px] overflow-hidden mb-2.5">
              <div className="flex items-center gap-2.5 py-3.5 px-4 bg-s2 cursor-pointer hover:bg-s3" onClick={() => setAbrechnungenOpen(!abrechnungenOpen)}>
                <span className="text-sm font-semibold flex-1">Anmeldung & Warteliste</span>
                <span className="text-[11px] text-text-muted">Smart Defaults aktiv</span>
                <svg className={`transition-transform ${abrechnungenOpen ? "rotate-180" : ""}`} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9" /></svg>
              </div>
              {abrechnungenOpen && (
                <div className="p-4 bg-s1">
                  {[
                    { title: "Warteliste aktivieren", sub: "Anmeldungen über Kapazität werden auf Warteliste gesetzt", checked: true },
                    { title: "Anmeldebestätigung per E-Mail", sub: "Teilnehmer erhalten sofort eine Bestätigung", checked: true },
                    { title: "Nachmeldung nach Frist erlauben", sub: "Bei freien Plätzen können sich Teilnehmer nachträglich anmelden", checked: false },
                  ].map((t, i) => (
                    <div key={i} className="flex items-center justify-between py-3 border-b border-border last:border-b-0">
                      <div><div className="text-[13.5px] font-semibold">{t.title}</div><div className="text-[11px] text-text-muted mt-0.5">{t.sub}</div></div>
                      <label className="relative w-11 h-6 shrink-0">
                        <input type="checkbox" defaultChecked={t.checked} className="opacity-0 w-0 h-0 peer" />
                        <span className="absolute inset-0 bg-s3 rounded-full cursor-pointer transition-colors peer-checked:bg-accent before:content-[''] before:absolute before:h-[18px] before:w-[18px] before:left-[3px] before:top-[3px] before:bg-text-muted before:rounded-full before:transition-transform peer-checked:before:translate-x-5 peer-checked:before:bg-white" />
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Weitere */}
            <div className="border border-border rounded-[10px] overflow-hidden">
              <div className="flex items-center gap-2.5 py-3.5 px-4 bg-s2 cursor-pointer hover:bg-s3" onClick={() => setWeitereOpen(!weitereOpen)}>
                <span className="text-sm font-semibold flex-1">Fragebogen & Anhänge</span>
                <span className="text-[11px] text-text-muted">Optional</span>
                <svg className={`transition-transform ${weitereOpen ? "rotate-180" : ""}`} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9" /></svg>
              </div>
              {weitereOpen && (
                <div className="p-4 bg-s1">
                  <div className="text-xs text-text-muted mb-3">Zusätzliche Fragen bei Anmeldung und Dokumente für Teilnehmer.</div>
                  <Button variant="ghost" size="sm">+ Frage hinzufügen</Button>
                  <div className="border-t border-border mt-3 pt-3">
                    <Button variant="ghost" size="sm">+ Anhang hochladen</Button>
                  </div>
                </div>
              )}
            </div>
          </Card>
          <div className="flex gap-2.5 justify-end mt-6 pt-4 border-t border-border">
            <Button variant="ghost" onClick={() => setCurrentStep(currentStep - 1)}>← Zurück</Button>
            <Button variant="ghost">Entwurf speichern</Button>
            <Button onClick={() => setCurrentStep(currentStep + 1)}>Weiter →</Button>
          </div>
        </div>
      );
    }

    // Vorschau step (last step)
    const vorschauStep = maxStep - 1;
    if (currentStep === vorschauStep) {
      const typeLabel = typeCards.find(t => t.id === eventType)?.name || "";
      return (
        <div>
          <Card>
            <div className="text-sm font-bold mb-4">Vorschau & Veröffentlichen</div>
            <div className="bg-s2 rounded-[10px] p-5 mb-4">
              <div className="text-lg font-bold mb-1">
                {eventType === "lehrgang" ? "C-Trainer Lehrgang 2026" : eventType === "turnier" ? "Bezirksmeisterschaft U16w" : "Neue Veranstaltung"}
              </div>
              <div className="text-[13px] text-text-muted mb-3">15.–17. Juli 2026 · Sportanlage TSV Hannover</div>
              <div className="flex gap-2 flex-wrap">
                <Badge color="purple">{typeLabel}</Badge>
                <Badge color="blue">Max. 48 Plätze</Badge>
                {eventType === "lehrgang" && lehrgangArt === "ausbildung" && <Badge color="orange">Ausbildung · Mit Prüfung</Badge>}
                {eventType === "lehrgang" && lehrgangArt === "fortbildung" && <Badge color="blue">Fortbildung · 16 UE</Badge>}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-4">
              <div><div className="text-xs font-semibold text-text-dim mb-1">Datum</div><div className="text-[13px]">15.–17. Juli 2026</div></div>
              <div><div className="text-xs font-semibold text-text-dim mb-1">Ort</div><div className="text-[13px]">TSV Hannover</div></div>
              <div><div className="text-xs font-semibold text-text-dim mb-1">Gebühr</div><div className="text-[13px]">{eventType === "lehrgang" ? "€ 180,00" : "€ 0,00"}</div></div>
            </div>

            {eventType === "lehrgang" && (
              <div className="bg-s2 rounded-[6px] p-3 mb-4">
                <div className="text-xs font-bold mb-2">Lizenzierung</div>
                <div className="text-[13px]">
                  {lehrgangArt === "ausbildung" ? "C-Trainer Volleyball (DVV) · Prüfung erforderlich" : "C-Trainer Volleyball (DVV) · 16 UE · Verlängerung um 2 Jahre"}
                </div>
              </div>
            )}

            <div className="mb-3.5">
              <div className="text-xs font-semibold text-text-dim mb-1.5">Veröffentlichen am</div>
              <input type="date" defaultValue="2026-04-01" />
            </div>
          </Card>
          <div className="flex gap-2.5 justify-end mt-6 pt-4 border-t border-border">
            <Button variant="ghost" onClick={() => setCurrentStep(currentStep - 1)}>← Zurück</Button>
            <Button variant="ghost">Als Entwurf speichern</Button>
            <Button>Veröffentlichen</Button>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="animate-fadeIn">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-[22px] font-bold mb-1">Veranstaltung erstellen</h1>
          <p className="text-[13px] text-text-muted">Geführter Prozess · Typbasierte Formulare · Smart Defaults</p>
        </div>
        {eventType && (
          <button onClick={resetToTypeSelect} className="text-xs text-accent hover:underline cursor-pointer">Typ ändern</button>
        )}
      </div>

      {/* Wizard Steps */}
      {eventType && (
        <div className="flex items-center mb-7 bg-s1 border border-border rounded-[10px] overflow-hidden">
          {steps.map((step, i) => {
            const isDone = i < currentStep;
            const isActive = i === currentStep;
            return (
              <div
                key={i}
                className={`flex-1 flex items-center gap-2 py-3 px-3 text-xs font-semibold cursor-pointer transition-all ${i < steps.length - 1 ? "border-r border-border" : ""} ${
                  isActive ? "bg-accent-dim text-accent" : isDone ? "text-green" : "text-text-muted"
                }`}
                onClick={() => isDone && setCurrentStep(i)}
              >
                <div className={`w-[22px] h-[22px] rounded-full shrink-0 flex items-center justify-center text-[11px] font-bold ${
                  isActive ? "bg-accent text-white" : isDone ? "bg-green text-white" : "bg-s3 text-text-muted"
                }`}>
                  {isDone ? <Icon name="check" size={12} /> : i + 1}
                </div>
                <span className="truncate">{step}</span>
              </div>
            );
          })}
        </div>
      )}

      {getStepContent()}
    </div>
  );
}
