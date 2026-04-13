"use client";

import { useState, useRef, useEffect } from "react";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";

// ============================================================
// MOCK DATA
// ============================================================

const KB_CATEGORIES = [
  { id: "admin", icon: "shield", title: "Für Verbands-Admins", desc: "Verwaltung, Konfiguration, Berichte", articles: 24, role: "verbandsadmin" },
  { id: "staffel", icon: "layers", title: "Für Staffelleiter", desc: "Spielbetrieb, Ergebnisse, Mannschaften", articles: 18, role: "staffelleitung" },
  { id: "club", icon: "building", title: "Für Vereins-Admins", desc: "Mitglieder, Teams, Finanzen", articles: 15, role: "clubadmin" },
  { id: "allgemein", icon: "info", title: "Allgemein", desc: "Profil, Passwort, Navigation, Erste Schritte", articles: 12, role: null },
];

const KB_ARTICLES = [
  { id: "turnier-erstellen", cat: "admin", title: "Turnier erstellen", snippet: "Schritt-fur-Schritt Anleitung zum Erstellen eines neuen Turniers inkl. GPS-Kategorien und Teilnehmerlimits.", tags: ["Turnier", "GPS"] },
  { id: "spielbericht", cat: "staffel", title: "Spielbericht ausfüllen", snippet: "So füllst du einen Spielbericht korrekt aus — inkl. Unterschriften und Sonderfälle.", tags: ["Spielbericht", "Spieltag"] },
  { id: "lizenz-verlaengern", cat: "allgemein", title: "Lizenz verlängern", snippet: "Deine Lizenz lauft ab? So verlängerst du sie rechtzeitig und vermeidest Sperren.", tags: ["Lizenz", "Verlängerung"] },
  { id: "mannschaft-melden", cat: "club", title: "Mannschaft melden", snippet: "Melde deine Mannschaft für die neue Saison an — Fristen, Kader und Voraussetzungen.", tags: ["Meldung", "Mannschaft", "Saison"] },
  { id: "sepa-einrichten", cat: "club", title: "SEPA-Mandat einrichten", snippet: "Richte SEPA-Lastschrift für Vereinsbeitrage ein und verwalte Mandate.", tags: ["SEPA", "Finanzen"] },
  { id: "sr-einsatzplan", cat: "staffel", title: "SR-Einsatzplan verstehen", snippet: "Wie die automatische Schiedsrichter-Ansetzung funktioniert und wie du eingreifst.", tags: ["Schiedsrichter", "Einsatzplan"] },
  { id: "passwort-reset", cat: "allgemein", title: "Passwort zurücksetzen", snippet: "Passwort vergessen? So setzt du es zurück — per E-Mail oder über deinen Verbandsadmin.", tags: ["Passwort", "Login"] },
  { id: "datev-export", cat: "admin", title: "DATEV-Export", snippet: "Exportiere Buchungsdaten im DATEV-Format für deinen Steuerberater.", tags: ["DATEV", "Export", "Finanzen"] },
  { id: "rechte-rollen", cat: "admin", title: "Rechte & Rollen verwalten", snippet: "Verstehe das Berechtigungskonzept und weise Rollen zu.", tags: ["Rechte", "Rollen", "ReBAC"] },
  { id: "ergebnis-erfassen", cat: "staffel", title: "Ergebnisse erfassen", snippet: "Ergebnisse nach dem Spieltag erfassen, bestätigen und freigeben.", tags: ["Ergebnis", "Spieltag"] },
];

const CHAT_MESSAGES_INIT = [
  { role: "bot" as const, text: "Hallo! Ich bin der beauOS Assistent. Wie kann ich dir helfen?" },
];

const SUGGESTED_ACTIONS = [
  "Wie erstelle ich ein Turnier?",
  "Spielbericht ausfüllen",
  "Lizenz verlängern",
  "Support-Ticket erstellen",
];

const TOUR_STEPS = [
  {
    icon: "home", title: "Willkommen bei beauOS",
    body: "Schön, dass du da bist! In dieser kurzen Einführung zeigen wir dir die wichtigsten Bereiche — Schritt für Schritt.",
    tip: "Du findest diese Einführung jederzeit unter Hilfe & Support.",
    nav: null, menuPath: null, screenshot: null,
  },
  {
    icon: "grid", title: "Dein Dashboard — alles auf einen Blick",
    body: "Das Dashboard zeigt dir sofort, was heute wichtig ist: offene Aufgaben, anstehende Spieltage und die wichtigsten Kennzahlen.",
    tip: "Die KPI-Karten oben sind klickbar — sie führen dich direkt zum jeweiligen Bereich.",
    nav: "dashboard",
    menuPath: [{ label: "Dashboard", icon: "grid", active: true }],
    screenshot: { title: "Dashboard", items: ["KPI-Karten (Ligen, Vereine, Spieler, Einnahmen)", "Meine To-Dos mit Fristen", "Finanzübersicht mit Saldo", "Vereine mit offenen Problemen"] },
  },
  {
    icon: "volleyball", title: "Spielbetrieb — Ligen, Ergebnisse & Live",
    body: "Der zentrale Bereich für den laufenden Spielbetrieb: Ligen verwalten, Spielpläne erstellen, Ergebnisse erfassen und den Live-Ticker verfolgen.",
    tip: "Neu: Der MatchDay Master prüft automatisch, ob alles für den nächsten Spieltag bereit ist.",
    nav: "liga-uebersicht",
    menuPath: [
      { label: "Spielbetrieb", icon: null, section: true },
      { label: "Ligen", icon: "layers" },
      { label: "Spieltagsübersicht", icon: "scan" },
      { label: "Live-Ticker", icon: "volleyball" },
      { label: "MatchDay Master", icon: "shield-check", highlight: true },
    ],
    screenshot: { title: "Spielbetrieb", items: ["Ligen & Staffeln mit Tabellen", "Spieltagsübersicht mit Ergebnissen", "Live-Ticker mit Echtzeit-Daten", "MatchDay Master: Abhängigkeits-Check"] },
  },
  {
    icon: "org-tree", title: "Stammdaten — Vereine, Personen, Spielstätten",
    body: "Verwalte alle Organisationen, Personen und Spielstätten deines Verbands. Über das Spieler-Portal können Spieler ihre Daten selbst pflegen.",
    tip: "Tipp: Änderungen in den Stammdaten wirken sich direkt auf Spielbetrieb und Lizenzwesen aus.",
    nav: "organisationen",
    menuPath: [
      { label: "Stammdaten", icon: null, section: true },
      { label: "Organisationen", icon: "org-tree" },
      { label: "Personen", icon: "users" },
      { label: "Vereine", icon: "building" },
      { label: "Spieler-Portal", icon: "user", highlight: true },
    ],
    screenshot: { title: "Stammdaten", items: ["Organisationsstruktur (Verband → Bezirk → Verein)", "Personenverwaltung mit Lizenzstatus", "Spielstätten mit Geo-Daten", "Spieler-Portal für Self-Service"] },
  },
  {
    icon: "info", title: "Hilfe ist immer in der Nähe",
    body: "Du bist nie allein! Drei Wege zur Hilfe: das Hilfe-Center für ausführliche Artikel, der KI-Assistent für schnelle Antworten, und Info-Icons direkt neben Formularfeldern.",
    tip: "Achte auf die kleinen Info-Icons neben Feldern — sie erklären Fachbegriffe wie GPS-Kategorie oder Lizenzstufe in einfacher Sprache.",
    nav: "support-center",
    menuPath: [
      { label: "Hilfe & Support", icon: "info", active: true },
    ],
    screenshot: { title: "Hilfe & Support", items: ["Hilfe-Center mit Suchfunktion", "KI-Assistent für Sofort-Antworten", "Einführung (diese Tour)", "Kontext-Hilfe: Info-Icons in Formularen"] },
  },
];

// ============================================================
// TABS
// ============================================================

type SupportTab = "kb" | "chat" | "tour" | "tooltips";

// ============================================================
// KNOWLEDGE BASE
// ============================================================

function KnowledgeBase() {
  const [search, setSearch] = useState("");
  const [selectedArticle, setSelectedArticle] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<Record<string, boolean | null>>({});

  const filtered = search.length > 1
    ? KB_ARTICLES.filter(a => a.title.toLowerCase().includes(search.toLowerCase()) || a.snippet.toLowerCase().includes(search.toLowerCase()) || a.tags.some(t => t.toLowerCase().includes(search.toLowerCase())))
    : [];

  const article = KB_ARTICLES.find(a => a.id === selectedArticle);

  if (article) {
    return (
      <div>
        <button onClick={() => setSelectedArticle(null)} className="flex items-center gap-1 text-[13px] text-accent mb-4 cursor-pointer bg-transparent border-none hover:underline">
          <Icon name="chevron-left" size={14} /> Zurück zur Übersicht
        </button>
        <Card className="!mb-4">
          <div className="flex items-center gap-2 text-[11px] text-text-muted mb-3">
            <span>Hilfe</span>
            <span className="text-text-dim">/</span>
            <span>{KB_CATEGORIES.find(c => c.id === article.cat)?.title}</span>
            <span className="text-text-dim">/</span>
            <span className="text-text">{article.title}</span>
          </div>
          <h2 className="text-[20px] font-bold mb-3">{article.title}</h2>
          <div className="text-[14px] text-text-muted leading-relaxed mb-4">{article.snippet}</div>
          <div className="text-[14px] leading-relaxed space-y-3">
            <p>Dies ist eine detaillierte Anleitung zu diesem Thema. In einem echten System wurde hier Markdown-Content aus dem CMS gerendert werden.</p>
            <p>Der Artikel wurde zuletzt am 05.04.2026 aktualisiert und ist für die Saison 2025/26 gültig.</p>
          </div>
          <div className="flex gap-1.5 mt-4">
            {article.tags.map(t => <Badge key={t} color="purple">{t}</Badge>)}
          </div>
        </Card>

        {/* Feedback */}
        <Card className="!mb-4">
          {feedback[article.id] === undefined || feedback[article.id] === null ? (
            <div className="text-center">
              <div className="text-[14px] font-medium mb-3">Hat dieser Artikel geholfen?</div>
              <div className="flex gap-2 justify-center">
                <Button size="sm" variant="ghost" onClick={() => setFeedback(prev => ({ ...prev, [article.id]: true }))}>Ja, danke!</Button>
                <Button size="sm" variant="ghost" onClick={() => setFeedback(prev => ({ ...prev, [article.id]: false }))}>Nein, leider nicht</Button>
              </div>
            </div>
          ) : (
            <div className="text-center text-[13px] text-text-muted">
              {feedback[article.id] ? "Danke für dein Feedback!" : "Danke — wir verbessern diesen Artikel."}
            </div>
          )}
        </Card>

        {/* Related */}
        <Card className="!mb-0">
          <div className="text-[11px] font-bold text-text-muted uppercase tracking-wider mb-3">Ähnliche Artikel</div>
          <div className="space-y-2">
            {KB_ARTICLES.filter(a => a.cat === article.cat && a.id !== article.id).slice(0, 3).map(a => (
              <div key={a.id} onClick={() => setSelectedArticle(a.id)} className="flex items-center gap-2 p-2 rounded-lg hover:bg-s2 cursor-pointer transition-colors text-[13px]">
                <Icon name="file" size={14} className="text-text-muted shrink-0" />
                <span>{a.title}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div>
      {/* Search */}
      <div className="relative mb-5">
        <Icon name="search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" />
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Artikel suchen... (z.B. Spielbericht, Lizenz, SEPA)"
          className="w-full !pl-9"
        />
        {search.length > 1 && (
          <Card className="absolute top-full left-0 right-0 mt-1 !mb-0 !p-2 z-30 shadow-lg max-h-[300px] overflow-y-auto">
            {filtered.length > 0 ? filtered.map(a => (
              <div key={a.id} onClick={() => { setSelectedArticle(a.id); setSearch(""); }} className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-s2 cursor-pointer transition-colors">
                <Icon name="file" size={14} className="text-text-muted shrink-0 mt-0.5" />
                <div>
                  <div className="text-[13px] font-medium">{a.title}</div>
                  <div className="text-[11px] text-text-muted line-clamp-1">{a.snippet}</div>
                </div>
              </div>
            )) : (
              <div className="p-4 text-center text-[13px] text-text-muted">
                Kein Ergebnis. Möchtest du den KI-Assistenten fragen?
              </div>
            )}
          </Card>
        )}
      </div>

      {/* Categories */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        {KB_CATEGORIES.map(cat => (
          <Card key={cat.id} className="!mb-0 cursor-pointer hover:border-accent/30 transition-colors" onClick={() => {}}>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                <Icon name={cat.icon} size={20} className="text-accent" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[14px] font-semibold mb-0.5">{cat.title}</div>
                <div className="text-[12px] text-text-muted">{cat.desc}</div>
                <div className="text-[11px] text-text-dim mt-1">{cat.articles} Artikel</div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Popular Articles */}
      <div className="text-[11px] font-bold text-text-muted uppercase tracking-wider mb-3">Beliebte Artikel</div>
      <div className="space-y-1.5">
        {KB_ARTICLES.slice(0, 6).map(a => (
          <div key={a.id} onClick={() => setSelectedArticle(a.id)} className="flex items-center gap-3 p-3 bg-s1 border border-border rounded-[8px] hover:bg-s2 cursor-pointer transition-colors">
            <Icon name="file" size={14} className="text-text-muted shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="text-[13px] font-medium truncate">{a.title}</div>
              <div className="text-[11px] text-text-muted truncate">{a.snippet}</div>
            </div>
            <span className="text-[10px] text-text-dim px-1.5 py-0.5 rounded bg-s2 shrink-0">{KB_CATEGORIES.find(c => c.id === a.cat)?.title?.replace("Für ", "")}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================
// CHATBOT
// ============================================================

function Chatbot() {
  const [messages, setMessages] = useState(CHAT_MESSAGES_INIT);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  const send = (text: string) => {
    if (!text.trim()) return;
    setMessages(prev => [...prev, { role: "user", text }]);
    setInput("");
    setTyping(true);

    setTimeout(() => {
      setTyping(false);
      let reply = "Ich habe deine Frage verstanden. Lass mich in der Wissensdatenbank nachschauen...";

      if (text.toLowerCase().includes("turnier")) {
        reply = "Um ein Turnier zu erstellen, gehe zu Spielbetrieb > Beach-Turniere und klicke auf '+ Neues Turnier'. Dort kannst du alle Details wie GPS-Kategorie, Teilnehmerlimit und Zeitplan festlegen.";
      } else if (text.toLowerCase().includes("spielbericht")) {
        reply = "Den Spielbericht findest du unter Spielbetrieb > Spielbericht. Nach dem Spiel füllst du dort Ergebnisse, Ereignisse und Unterschriften aus.";
      } else if (text.toLowerCase().includes("lizenz")) {
        reply = "Deine Lizenzen findest du unter Stammdaten > Spieler-Portal. Dort kannst du den Status einsehen und eine Verlängerung beantragen.";
      } else if (text.toLowerCase().includes("ticket") || text.toLowerCase().includes("support") || text.toLowerCase().includes("mensch")) {
        reply = "Ich erstelle ein Support-Ticket für dich. Dein Gesprachsverlauf wird automatisch angehangt.\n\nTicket #DVV-2026-0847 wurde erstellt. Unser Team meldet sich innerhalb von 24 Stunden.";
      }

      setMessages(prev => [...prev, { role: "bot", text: reply }]);
    }, 1200);
  };

  return (
    <div>
      <Card className="!mb-0 !p-0 overflow-hidden">
        {/* Header */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
          <div className="w-8 h-8 rounded-full bg-accent/15 flex items-center justify-center">
            <Icon name="zap" size={16} className="text-accent" />
          </div>
          <div className="flex-1">
            <div className="text-[14px] font-semibold">beauOS Assistent</div>
            <div className="text-[11px] text-green flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-green" /> Online</div>
          </div>
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="h-[400px] overflow-y-auto p-4 space-y-3">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[80%] px-3 py-2 rounded-lg text-[13px] leading-relaxed whitespace-pre-line ${
                m.role === "user" ? "bg-accent/15 text-text" : "bg-s2 text-text"
              }`}>
                {m.text}
              </div>
            </div>
          ))}
          {typing && (
            <div className="flex justify-start">
              <div className="bg-s2 px-3 py-2 rounded-lg text-[13px] text-text-muted">
                <span className="inline-flex gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-text-muted animate-pulse" />
                  <span className="w-1.5 h-1.5 rounded-full bg-text-muted animate-pulse" style={{ animationDelay: "0.2s" }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-text-muted animate-pulse" style={{ animationDelay: "0.4s" }} />
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Suggested Actions */}
        <div className="px-4 pb-2 flex flex-wrap gap-1.5">
          {SUGGESTED_ACTIONS.map(a => (
            <button key={a} onClick={() => send(a)} className="px-2.5 py-1 rounded-md text-[11px] font-medium border border-border text-text-muted hover:border-accent/40 hover:text-accent cursor-pointer bg-transparent transition-colors">
              {a}
            </button>
          ))}
        </div>

        {/* Input */}
        <div className="flex gap-2 p-3 border-t border-border">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && send(input)}
            placeholder="Frag mich etwas..."
            className="flex-1 !text-[13px]"
          />
          <Button size="sm" onClick={() => send(input)} disabled={!input.trim()}>Senden</Button>
        </div>
      </Card>
    </div>
  );
}

// ============================================================
// ONBOARDING TOUR
// ============================================================

function OnboardingTour({ onNavigate }: { onNavigate?: (screen: string) => void }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const total = TOUR_STEPS.length;

  if (completed) {
    return (
      <div>
        <Card className="!mb-4 text-center !py-8">
          <Icon name="check" size={28} className="text-green mx-auto mb-3" />
          <div className="text-[18px] font-bold mb-2">Du bist startklar!</div>
          <div className="text-[14px] text-text-muted leading-relaxed mb-1">Du kennst jetzt die wichtigsten Bereiche von beauOS.</div>
          <div className="text-[13px] text-text-muted mb-5">Bei Fragen stehen dir das Hilfe-Center und der KI-Assistent jederzeit zur Verfügung.</div>
          <div className="flex gap-2 justify-center">
            <Button variant="ghost" onClick={() => { setCompleted(false); setCurrentStep(0); }}>Nochmal ansehen</Button>
            <Button onClick={() => onNavigate?.("dashboard")}>Zum Dashboard</Button>
          </div>
        </Card>

        {/* Quick links nach Abschluss */}
        <div className="text-[11px] font-bold text-text-muted uppercase tracking-wider mb-3">Das könnte dich als Nächstes interessieren</div>
        <div className="grid grid-cols-2 gap-3">
          {[
            { icon: "volleyball", label: "Ersten Spieltag anlegen", screen: "liga-uebersicht" },
            { icon: "users", label: "Mannschaft melden", screen: "mannschaften" },
            { icon: "shield", label: "Lizenzen prüfen", screen: "lizenz-dashboard" },
            { icon: "mail", label: "Rundschreiben senden", screen: "kommunikation" },
          ].map(q => (
            <Card key={q.label} className="!mb-0 cursor-pointer hover:border-accent/30 transition-colors" onClick={() => onNavigate?.(q.screen)}>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                  <Icon name={q.icon} size={18} className="text-accent" />
                </div>
                <span className="text-[13px] font-medium">{q.label}</span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (dismissed) {
    return (
      <Card className="!mb-0">
        <div className="flex items-center gap-4 py-2">
          <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
            <Icon name="layers" size={20} className="text-accent" />
          </div>
          <div className="flex-1">
            <div className="text-[14px] font-semibold">Einführung fortsetzen?</div>
            <div className="text-[13px] text-text-muted">Du bist bei Schritt {currentStep + 1} von {total} stehen geblieben.</div>
          </div>
          <Button size="sm" onClick={() => setDismissed(false)}>Weitermachen</Button>
        </div>
      </Card>
    );
  }

  const step = TOUR_STEPS[currentStep];
  const prev = () => setCurrentStep(Math.max(0, currentStep - 1));
  const next = () => { if (currentStep < total - 1) setCurrentStep(currentStep + 1); else setCompleted(true); };

  return (
    <div>
      {/* Step indicators — clickable */}
      <div className="flex gap-3 mb-5">
        {TOUR_STEPS.map((s, i) => (
          <div
            key={i}
            onClick={() => i <= currentStep && setCurrentStep(i)}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-[12px] transition-colors ${
              i === currentStep ? "bg-accent-dim border border-accent/20 text-accent font-medium" :
              i < currentStep ? "bg-s2 text-text-muted cursor-pointer hover:bg-s3" :
              "bg-s2 text-text-dim"
            }`}
          >
            {i < currentStep ? (
              <Icon name="check" size={14} className="text-green" />
            ) : (
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${i === currentStep ? "bg-accent text-white" : "bg-s3 text-text-muted"}`}>{i + 1}</span>
            )}
            <span className="hidden md:inline">{s.title.split("—")[0].trim()}</span>
          </div>
        ))}
      </div>

      {/* Main step content */}
      <Card className="!mb-4">
        <div className="flex items-start gap-4 mb-4">
          <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0 mt-0.5">
            <Icon name={step.icon} size={24} className="text-accent" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[12px] text-text-muted mb-1">Schritt {currentStep + 1} von {total}</div>
            <div className="text-[18px] font-bold mb-2">{step.title}</div>
            <div className="text-[14px] text-text-muted leading-relaxed">{step.body}</div>
          </div>
        </div>

        {/* Menu path preview — shows WHERE in the sidebar this lives */}
        {step.menuPath && (
          <div className="mb-4">
            <div className="text-[11px] text-text-dim uppercase tracking-wider mb-2">So findest du es in der Navigation</div>
            <div className="bg-s2 rounded-lg p-3 border border-border">
              <div className="space-y-0.5">
                {step.menuPath.map((item: { label: string; icon?: string | null; section?: boolean; active?: boolean; highlight?: boolean }, idx: number) => (
                  <div
                    key={idx}
                    className={`flex items-center gap-2 px-2 py-1.5 rounded-md text-[13px] ${
                      item.section ? "text-text-dim text-[11px] uppercase tracking-wider pt-2 pb-1" :
                      item.active || item.highlight ? "bg-accent/10 text-accent font-medium" :
                      "text-text-muted"
                    }`}
                  >
                    {item.icon && <Icon name={item.icon} size={15} className={item.active || item.highlight ? "text-accent" : "text-text-dim"} />}
                    {!item.icon && !item.section && <span className="w-[15px]" />}
                    <span>{item.label}</span>
                    {item.highlight && <Badge color="purple">Neu</Badge>}
                    {item.active && (
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="ml-auto text-accent"><polyline points="9 18 15 12 9 6"/></svg>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Screenshot / content preview — shows WHAT you'll find there */}
        {step.screenshot && (
          <div className="mb-4">
            <div className="text-[11px] text-text-dim uppercase tracking-wider mb-2">Das findest du hier</div>
            <div className="bg-s2 rounded-lg p-3 border border-border">
              <div className="text-[13px] font-medium mb-2">{step.screenshot.title}</div>
              <div className="space-y-1.5">
                {step.screenshot.items.map((item: string, idx: number) => (
                  <div key={idx} className="flex items-center gap-2 text-[12px] text-text-muted">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent/50 shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tip */}
        {step.tip && (
          <div className="flex items-start gap-2 p-3 rounded-lg bg-accent/5 border border-accent/10">
            <Icon name="zap" size={14} className="text-accent shrink-0 mt-0.5" />
            <div className="text-[13px] text-text-muted">{step.tip}</div>
          </div>
        )}

        {/* Navigation link */}
        {step.nav && onNavigate && (
          <button
            onClick={() => onNavigate(step.nav!)}
            className="flex items-center gap-2 mt-3 text-[13px] text-accent font-medium cursor-pointer bg-transparent border-none hover:underline p-0"
          >
            Diesen Bereich jetzt öffnen
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
        )}

        {/* Actions */}
        <div className="flex items-center gap-2 mt-5 pt-4 border-t border-border">
          {currentStep > 0 && (
            <button onClick={prev} className="px-4 py-2 rounded-[8px] text-[13px] font-medium text-text-muted hover:bg-s2 transition-colors cursor-pointer bg-transparent border border-border max-w-[260px]">Zurück</button>
          )}
          <div className="flex-1" />
          <button onClick={() => setDismissed(true)} className="px-4 py-2 rounded-[8px] text-[13px] font-medium text-text-muted hover:bg-s2 transition-colors cursor-pointer bg-transparent border border-border max-w-[260px]">Später fortsetzen</button>
          <button onClick={next} className="px-5 py-2 rounded-[8px] text-[13px] font-medium text-white bg-accent hover:bg-accent-hover transition-colors cursor-pointer border-none max-w-[260px]">
            {currentStep === total - 1 ? "Abschließen" : "Weiter"}
          </button>
        </div>
      </Card>
    </div>
  );
}

// ============================================================
// TOOLTIP DEMO
// ============================================================

function TooltipDemo() {
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);
  const [highlightMode, setHighlightMode] = useState(false);

  const tooltips = [
    { key: "tournament.gpsCategory", field: "GPS-Kategorie", title: "GPS-Kategorie", body: "Die GPS-Kategorie bestimmt die maximale Punktzahl der Spieler, die an diesem Turnier teilnehmen durfen.", link: true },
    { key: "license.trainerLevel", field: "Trainer-Lizenzstufe", title: "Trainer-Lizenzstufe", body: "Wahle die Lizenzstufe gemäß der Ausbildungsordnung deines Verbandes." },
    { key: "team.playerCount", field: "Kadergröße", title: "Kadergröße", body: "Die maximale Anzahl der Spieler, die für eine Mannschaft gemeldet werden können. Abhängig von der Spielklasse." },
    { key: "match.referee", field: "Schiedsrichter", title: "Schiedsrichter-Zuweisung", body: "Schiedsrichter werden automatisch basierend auf Verfügbarkeit und Qualifikation zugewiesen. Du kannst die Zuweisung manuell überschreiben." },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="text-[14px] font-semibold mb-1">Kontextuelle Hilfe-Tooltips</div>
          <div className="text-[12px] text-text-muted">Info-Icons neben Formularfeldern erklaren Fachbegriffe direkt im Kontext.</div>
        </div>
        <label className="flex items-center gap-2 text-[12px] cursor-pointer">
          <input type="checkbox" checked={highlightMode} onChange={() => setHighlightMode(!highlightMode)} className="accent-accent" />
          Alle Hilfen anzeigen
        </label>
      </div>

      <Card className="!mb-4">
        <div className="text-[11px] font-bold text-text-muted uppercase tracking-wider mb-4">Formular-Beispiel</div>
        <div className="space-y-4">
          {tooltips.map(t => (
            <div key={t.key}>
              <div className="flex items-center gap-1.5 mb-1.5">
                <label className="text-[12px] font-medium">{t.field}</label>
                <div className="relative">
                  <button
                    onClick={() => setActiveTooltip(activeTooltip === t.key ? null : t.key)}
                    className={`w-4 h-4 rounded-full flex items-center justify-center cursor-pointer bg-transparent border-none transition-all ${
                      highlightMode ? "ring-2 ring-accent/40" : ""
                    }`}
                    title="Hilfe anzeigen"
                  >
                    <Icon name="info" size={14} className={`${activeTooltip === t.key ? "text-accent" : "text-text-dim"} hover:text-accent transition-colors`} />
                  </button>
                  {activeTooltip === t.key && (
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-[#1e1b4b] text-white rounded-lg shadow-lg px-3 py-2.5 z-20 w-[260px]">
                      <div className="text-[12px] font-semibold mb-1">{t.title}</div>
                      <div className="text-[12px] opacity-80 leading-relaxed">{t.body}</div>
                      {t.link && (
                        <div className="mt-2 text-[11px] text-accent cursor-pointer hover:underline">Mehr erfahren</div>
                      )}
                      <div className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 bg-[#1e1b4b] rotate-45 -mt-1" />
                    </div>
                  )}
                </div>
              </div>
              <select className="w-full"><option>Bitte wahlen...</option></select>
            </div>
          ))}
        </div>
      </Card>

      <Card className="!mb-0">
        <div className="text-[11px] font-bold text-text-muted uppercase tracking-wider mb-3">So funktioniert es</div>
        <div className="space-y-2 text-[13px] text-text-muted">
          <div className="flex items-start gap-2"><Icon name="info" size={14} className="text-accent shrink-0 mt-0.5" /> Klicke auf das Info-Icon neben einem Feld für eine kurze Erklärung.</div>
          <div className="flex items-start gap-2"><Icon name="search" size={14} className="text-accent shrink-0 mt-0.5" /> "Alle Hilfen anzeigen" hebt alle verfügbaren Tooltips hervor.</div>
          <div className="flex items-start gap-2"><Icon name="file" size={14} className="text-accent shrink-0 mt-0.5" /> "Mehr erfahren" fuhrt zu einem ausfuhrlichen Hilfe-Artikel.</div>
        </div>
      </Card>
    </div>
  );
}

// ============================================================
// MAIN COMPONENT
// ============================================================

interface SupportCenterProps {
  onNavigate?: (screen: string) => void;
}

export default function SupportCenter({ onNavigate }: SupportCenterProps) {
  const [tab, setTab] = useState<SupportTab>("kb");

  const tabs = [
    { id: "kb" as const, label: "Hilfe-Center", icon: "file" },
    { id: "tour" as const, label: "Einführung", icon: "layers" },
    { id: "tooltips" as const, label: "Kontext-Hilfe", icon: "info" },
  ];

  return (
    <div className="animate-fadeIn">
      <div className="mb-4">
        <h1 className="text-[22px] font-bold mb-1">Hilfe & Support</h1>
        <p className="text-[13px] text-text-muted">Artikel, KI-Assistent, Einführung und kontextuelle Hilfe</p>
      </div>

      {/* Tabs */}
      <Card className="!mb-4 !p-0">
        <div className="flex">
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex-1 flex items-center justify-center gap-2 py-3.5 text-[13px] font-medium border-b-2 transition-colors cursor-pointer ${
                tab === t.id ? "text-accent border-accent bg-accent-dim" : "text-text-muted border-transparent hover:bg-s2"
              }`}
            >
              <Icon name={t.icon} size={15} /> {t.label}
            </button>
          ))}
        </div>
      </Card>

      {tab === "kb" && <KnowledgeBase />}
      {tab === "tour" && <OnboardingTour onNavigate={onNavigate} />}
      {tab === "tooltips" && <TooltipDemo />}
    </div>
  );
}
