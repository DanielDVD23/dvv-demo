"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";

const faqData: Record<string, { q: string; a: string }[]> = {
  Spielbetrieb: [
    { q: "Wie lege ich einen neuen Spieltag an?", a: "Navigiere zu Spieltagsplanung und klicke auf '+ Neuer Spieltag'. Wähle die Liga und das Datum aus. Die Paarungen werden automatisch aus dem Nummernspielplan generiert." },
    { q: "Was passiert bei einem Verlegungskonflikt?", a: "Wenn beide Teams sich nicht einigen können, wird der Konflikt an die Staffelleitung eskaliert. Du findest offene Konflikte im Dashboard unter 'Meine To-Dos'." },
    { q: "Wie bestätige ich Spielergebnisse?", a: "Gehe zu Spieltagsplanung → Ergebnisse. Beide Teams müssen das Ergebnis bestätigen. Bei Abweichungen wird der Staffelleiter benachrichtigt." },
    { q: "Kann ich Heimspieltermine nachträglich ändern?", a: "Ja, solange der Spielplan nicht fixiert ist. Gehe zu Heimspieltermine und klicke auf 'Ändern' beim gewünschten Spieltag." },
    { q: "Was bedeutet 'Automatische Wertung'?", a: "Bei Nicht-Antritt eines Teams wird das Spiel automatisch mit 0:3 / 0:75 Punkten für das anwesende Team gewertet." },
  ],
  Finanzen: [
    { q: "Wie erstelle ich eine neue Rechnung?", a: "Gehe zu Rechnungen und klicke '+ Neue Rechnung'. Der Assistent führt dich durch: Empfänger, Posten, Zahlungsdetails, Vorschau." },
    { q: "Welche Buchhaltungssysteme werden unterstützt?", a: "DATEV und Lexware sind nativ integriert. Über die offene API-Schnittstelle können weitere Systeme wie sevdesk oder WISO MeinBüro angebunden werden." },
    { q: "Wie funktioniert der SEPA-Lastschrifteinzug?", a: "Vereine müssen ein gültiges SEPA-Mandat hinterlegen. Rechnungen mit Lastschrift werden automatisch zum Fälligkeitsdatum eingezogen." },
    { q: "Kann ich Strafbescheide stornieren?", a: "Ja. Offene Strafen können direkt storniert werden. Bereits abgerechnete Strafen erzeugen beim nächsten Rechnungslauf automatisch eine Gutschrift." },
    { q: "Wie exportiere ich Daten für DATEV?", a: "Klicke auf den Export-Button auf der Rechnungsseite und wähle 'DATEV-Export'. Die Datei enthält Buchungsstapel im DATEV-kompatiblen Format." },
  ],
  Veranstaltungen: [
    { q: "Wie erstelle ich einen Lehrgang?", a: "Unter Veranstaltungen → Neue Veranstaltung → Typ 'Lehrgang' wählen. Der Wizard führt dich durch alle Schritte inkl. Lizenzierung." },
    { q: "Was ist der Unterschied zwischen Aus- und Fortbildung?", a: "Ausbildung stellt neue Lizenzen aus (z.B. C-Trainer). Fortbildung verlängert bestehende Lizenzen durch Unterrichtseinheiten." },
    { q: "Können Teilnehmer sich selbst anmelden?", a: "Ja, bei öffentlichen Veranstaltungen. Geschlossene Veranstaltungen sind nur per Einladung zugänglich." },
    { q: "Was passiert bei Überbuchung?", a: "Wenn die Warteliste aktiviert ist, werden Anmeldungen über der Kapazitätsgrenze automatisch auf die Warteliste gesetzt." },
    { q: "Wie stelle ich Lizenzen nach einem Lehrgang aus?", a: "Bei Ausbildungslehrgängen mit aktiviertem 'Mit Prüfung' werden Lizenzen nach bestandener Prüfung automatisch ausgestellt." },
  ],
  Mannschaftsmeldung: [
    { q: "Bis wann muss die Mannschaftsmeldung erfolgen?", a: "Die Frist wird vom Verband festgelegt und ist im Dashboard als Countdown sichtbar. Nach Ablauf sind keine Meldungen mehr möglich." },
    { q: "Wie viele Spieler brauche ich mindestens?", a: "Die Mindest- und Höchstzahl variiert je nach Wettbewerb. Bei U16 sind es min. 7, max. 14 Spielerinnen." },
    { q: "Was passiert bei abgelaufenen Spielerpässen?", a: "Spielerinnen mit abgelaufenem Pass werden im Kader mit einer Warnung markiert. Die Meldung kann trotzdem eingereicht werden, der Pass muss aber vor Spielbeginn verlängert werden." },
    { q: "Kann ich die Ligapräferenz nachträglich ändern?", a: "Solange die Meldung noch nicht bestätigt wurde, kannst du sie bearbeiten. Nach Bestätigung muss die Staffelleitung kontaktiert werden." },
    { q: "Wie funktioniert die Aufstiegsbereitschaft?", a: "Bei der Mannschaftsmeldung kann die Aufstiegsbereitschaft erklärt werden. Bei Tabellenplatz 1 wird dann die Aufstiegsberechtigung geprüft (Hallengröße, SR-Lizenzen)." },
  ],
};

export default function HelpPanel() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [ticketSent, setTicketSent] = useState(false);
  const [ticketForm, setTicketForm] = useState(false);
  const [ticketData, setTicketData] = useState({ betreff: "", kategorie: "Spielbetrieb", beschreibung: "" });
  const [ticketNr, setTicketNr] = useState("");

  const categories = Object.keys(faqData);

  const filteredFaqs = activeCategory
    ? faqData[activeCategory].filter(f => !search || f.q.toLowerCase().includes(search.toLowerCase()) || f.a.toLowerCase().includes(search.toLowerCase()))
    : search
    ? categories.flatMap(cat => faqData[cat].filter(f => f.q.toLowerCase().includes(search.toLowerCase()) || f.a.toLowerCase().includes(search.toLowerCase())).map(f => ({ ...f, cat })))
    : [];

  return (
    <>
      {/* Floating Button */}
      <button
        className="fixed bottom-6 right-6 z-[998] w-14 h-14 rounded-full bg-accent text-white flex items-center justify-center hover:bg-accent-hover transition-all hover:scale-105 cursor-pointer border-0"
        style={{ boxShadow: "0 4px 20px rgba(124,58,237,0.4)" }}
        onClick={() => setOpen(!open)}
        title="Hilfe & FAQ"
      >
        {open ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><circle cx="12" cy="17" r="0.5" fill="currentColor" /></svg>
        )}
      </button>

      {/* Slide-in Panel */}
      {open && (
        <div className="fixed right-0 top-0 h-screen w-[400px] bg-s1 border-l border-border shadow-2xl z-[997] flex flex-col animate-fadeIn">
          {/* Header */}
          <div className="px-5 py-4 border-b border-border shrink-0">
            <div className="text-base font-bold mb-0.5">Hilfe & FAQ</div>
            <div className="text-xs text-text-muted">Finde Antworten oder erstelle ein Ticket</div>
          </div>

          {/* Search */}
          <div className="px-5 py-3 border-b border-border shrink-0">
            <div className="relative">
              <input
                value={search}
                onChange={e => { setSearch(e.target.value); setActiveCategory(null); setExpandedFaq(null); }}
                placeholder="FAQ durchsuchen..."
                className="!pl-9"
              />
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-5">
            {!activeCategory && !search && (
              <>
                <div className="text-xs font-semibold text-text-muted uppercase tracking-wide mb-3">Kategorien</div>
                <div className="grid grid-cols-2 gap-2">
                  {categories.map(cat => (
                    <div
                      key={cat}
                      className="bg-s2 border border-border rounded-[10px] p-3.5 cursor-pointer hover:bg-s3 hover:-translate-y-px transition-all"
                      onClick={() => { setActiveCategory(cat); setExpandedFaq(null); }}
                    >
                      <div className="text-sm font-bold mb-0.5">{cat}</div>
                      <div className="text-[11px] text-text-muted">{faqData[cat].length} Artikel</div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {activeCategory && !search && (
              <>
                <button
                  className="flex items-center gap-1.5 text-xs text-accent font-semibold mb-3 cursor-pointer hover:underline"
                  onClick={() => { setActiveCategory(null); setExpandedFaq(null); }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>
                  Zurück
                </button>
                <div className="text-sm font-bold mb-3">{activeCategory}</div>
                <div className="space-y-1.5">
                  {faqData[activeCategory].map((faq, i) => (
                    <div key={i} className="border border-border rounded-[8px] overflow-hidden">
                      <div
                        className="flex items-center gap-2 px-3.5 py-3 cursor-pointer hover:bg-s2 transition-colors"
                        onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                      >
                        <svg className={`shrink-0 transition-transform ${expandedFaq === i ? "rotate-90" : ""}`} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
                        <span className="text-[13px] font-medium">{faq.q}</span>
                      </div>
                      {expandedFaq === i && (
                        <div className="px-3.5 pb-3 pt-0 text-xs text-text-dim leading-relaxed border-t border-border bg-s2 py-3">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </>
            )}

            {search && (
              <>
                <div className="text-xs text-text-muted mb-3">{filteredFaqs.length} Ergebnis{filteredFaqs.length !== 1 ? "se" : ""} für &quot;{search}&quot;</div>
                {filteredFaqs.length === 0 && (
                  <div className="text-center py-8 text-text-muted text-sm">Keine Ergebnisse gefunden.</div>
                )}
                <div className="space-y-1.5">
                  {filteredFaqs.map((faq, i) => (
                    <div key={i} className="border border-border rounded-[8px] overflow-hidden">
                      <div
                        className="flex items-center gap-2 px-3.5 py-3 cursor-pointer hover:bg-s2 transition-colors"
                        onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                      >
                        <svg className={`shrink-0 transition-transform ${expandedFaq === i ? "rotate-90" : ""}`} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
                        <div>
                          {"cat" in faq && <div className="text-[10px] text-accent font-semibold mb-0.5">{(faq as { cat: string }).cat}</div>}
                          <span className="text-[13px] font-medium">{faq.q}</span>
                        </div>
                      </div>
                      {expandedFaq === i && (
                        <div className="px-3.5 pb-3 pt-0 text-xs text-text-dim leading-relaxed border-t border-border bg-s2 py-3">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Footer: Ticket Form or Button */}
          <div className="px-5 py-4 border-t border-border shrink-0">
            {ticketSent ? (
              <div className="bg-green-dim border border-[rgba(22,163,74,0.3)] rounded-[8px] px-4 py-3 text-center">
                <div className="text-[13px] text-green font-bold mb-1">Ticket {ticketNr} erstellt</div>
                <div className="text-[11px] text-text-muted">Wir melden uns innerhalb von 24 Stunden.</div>
              </div>
            ) : ticketForm ? (
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-bold">Ticket erstellen</div>
                  <button onClick={() => setTicketForm(false)} className="bg-transparent border-0 cursor-pointer text-text-muted hover:text-text">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                  </button>
                </div>
                <div>
                  <div className="text-[11px] font-semibold text-text-dim mb-1">Betreff *</div>
                  <input value={ticketData.betreff} onChange={e => setTicketData(p => ({ ...p, betreff: e.target.value }))} placeholder="Kurze Beschreibung des Problems" />
                </div>
                <div>
                  <div className="text-[11px] font-semibold text-text-dim mb-1">Kategorie</div>
                  <select value={ticketData.kategorie} onChange={e => setTicketData(p => ({ ...p, kategorie: e.target.value }))}>
                    <option>Spielbetrieb</option><option>Finanzen</option><option>Mannschaftsmeldung</option><option>Veranstaltungen</option><option>Technisches Problem</option><option>Sonstiges</option>
                  </select>
                </div>
                <div>
                  <div className="text-[11px] font-semibold text-text-dim mb-1">Beschreibung</div>
                  <textarea rows={3} value={ticketData.beschreibung} onChange={e => setTicketData(p => ({ ...p, beschreibung: e.target.value }))} placeholder="Was ist passiert? Was hast du erwartet?" style={{ height: "auto", padding: "9px 12px", minHeight: 72 }} />
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" className="flex-1" onClick={() => setTicketForm(false)}>Abbrechen</Button>
                  <Button className="flex-1" disabled={!ticketData.betreff.trim()} onClick={() => {
                    const nr = `#T-2026-${String(Math.floor(Math.random() * 900) + 100)}`;
                    setTicketNr(nr);
                    setTicketSent(true);
                    setTicketForm(false);
                    setTicketData({ betreff: "", kategorie: "Spielbetrieb", beschreibung: "" });
                    setTimeout(() => setTicketSent(false), 5000);
                  }}>Ticket senden</Button>
                </div>
              </div>
            ) : (
              <Button variant="ghost" className="w-full justify-center" onClick={() => setTicketForm(true)}>
                Ticket erstellen
              </Button>
            )}
          </div>
        </div>
      )}
    </>
  );
}
