"use client";

import { useState, useRef, useEffect } from "react";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";

// Context-aware suggestions based on current screen
const SCREEN_SUGGESTIONS: Record<string, { greeting: string; actions: string[] }> = {
  dashboard: {
    greeting: "Du bist auf dem Dashboard. Wie kann ich dir helfen?",
    actions: ["Was bedeuten die KPI-Zahlen?", "Wie bearbeite ich ein To-Do?", "Wo finde ich offene Aufgaben?"],
  },
  "liga-uebersicht": {
    greeting: "Du bist in der Ligen-Übersicht. Ich helfe dir gerne weiter.",
    actions: ["Wie erstelle ich eine neue Liga?", "Tabelle erklären", "Spielplan anlegen"],
  },
  spieltag: {
    greeting: "Du bist in der Spieltagsübersicht.",
    actions: ["Ergebnis erfassen", "Spieltag verlegen", "Schiedsrichter zuweisen"],
  },
  "live-ticker": {
    greeting: "Du schaust den Live-Ticker. Brauchst du Hilfe?",
    actions: ["Wie öffne ich Spiel-Details?", "Ergebnis korrigieren", "Spielbericht erstellen"],
  },
  "match-detail": {
    greeting: "Du siehst ein Spiel-Detail.",
    actions: ["Statistiken erklären", "Aufstellung ändern", "Spielbericht ausfüllen"],
  },
  "matchday-master": {
    greeting: "Du bist im MatchDay Master — dem Spieltag-Check.",
    actions: ["Was ist ein Blocker?", "Wie löse ich ein Problem?", "Erinnerung senden"],
  },
  organisationen: {
    greeting: "Du bist in den Organisationen.",
    actions: ["Neuen Bezirk anlegen", "Struktur erklären", "Verein zuordnen"],
  },
  personen: {
    greeting: "Du verwaltest Personen.",
    actions: ["Person anlegen", "Lizenzstatus prüfen", "Rolle zuweisen"],
  },
  spielstaetten: {
    greeting: "Du bist bei den Spielstätten.",
    actions: ["Neue Spielstätte anlegen", "Was bedeutet 'gesperrt'?", "Kapazität ändern"],
  },
  vereine: {
    greeting: "Du bist in der Vereinsübersicht.",
    actions: ["Verein anlegen", "Mannschaft melden", "Beitragsstatus prüfen"],
  },
  "rechte-rollen": {
    greeting: "Du bist bei Rechte & Rollen.",
    actions: ["Neue Rolle erstellen", "Berechtigungen erklären", "Rolle zuweisen"],
  },
  "lizenz-dashboard": {
    greeting: "Du bist im Lizenz-Dashboard.",
    actions: ["Lizenzantrag bearbeiten", "Was bedeutet 'ablaufend'?", "Lizenztypen erklären"],
  },
  "lizenz-queue": {
    greeting: "Du bist in der Bearbeitungsqueue.",
    actions: ["Antrag freigeben", "Dokument nachfordern", "Antrag ablehnen"],
  },
  "finanz-dashboard": {
    greeting: "Du bist im Finanz-Dashboard.",
    actions: ["DATEV-Export erstellen", "SEPA-Mandat einrichten", "Offene Forderungen erklären"],
  },
  rechnungen: {
    greeting: "Du bist bei den Rechnungen.",
    actions: ["Rechnung erstellen", "Mahnung senden", "SEPA-Export"],
  },
  "social-briefing": {
    greeting: "Du erstellst ein Social Media Briefing.",
    actions: ["Was ist der Inhaltstyp?", "Wie funktioniert die KI-Generierung?", "Hashtag-Tipps"],
  },
  "social-review": {
    greeting: "Du prüfst generierten Content.",
    actions: ["Variante wechseln", "Caption bearbeiten", "Zeitempfehlung erklären"],
  },
  "spieler-self-service": {
    greeting: "Du bist in deinem Spieler-Portal.",
    actions: ["Lizenz verlängern", "Passfoto hochladen", "Veranstaltung anmelden"],
  },
  spielbericht: {
    greeting: "Du füllst einen Spielbericht aus.",
    actions: ["Unterschrift erklärt", "Ergebnis korrigieren", "Spielbericht senden"],
  },
  "support-center": {
    greeting: "Du bist im Hilfe-Center.",
    actions: ["Artikel suchen", "Einführung starten", "Support-Ticket erstellen"],
  },
};

const DEFAULT_SUGGESTIONS = {
  greeting: "Hallo! Wie kann ich dir helfen?",
  actions: ["Wo finde ich Hilfe?", "Häufige Fragen", "Support-Ticket erstellen"],
};

// Bot response logic
function getBotReply(text: string): string {
  const lower = text.toLowerCase();
  if (lower.includes("turnier")) return "Um ein Turnier zu erstellen, gehe zu Spielbetrieb → Beach-Turniere und klicke auf '+ Neues Turnier'.";
  if (lower.includes("spielbericht")) return "Den Spielbericht findest du unter Spielbetrieb → Spielbericht. Nach dem Spiel füllst du dort Ergebnisse, Ereignisse und Unterschriften aus.";
  if (lower.includes("lizenz")) return "Lizenzen verwaltest du unter Stammdaten → Spieler-Portal (als Spieler) oder Lizenzwesen → Lizenz-Dashboard (als Admin).";
  if (lower.includes("kpi") || lower.includes("kennzahl")) return "Die KPI-Karten zeigen die wichtigsten Kennzahlen deines Verbands. Klicke auf eine Karte, um direkt zum Detailbereich zu gelangen.";
  if (lower.includes("ticket") || lower.includes("support") || lower.includes("mensch") || lower.includes("hilfe von")) return "Ich erstelle ein Support-Ticket für dich. Dein Gesprächsverlauf wird automatisch angehängt.\n\nTicket #DVV-2026-0847 erstellt. Unser Team meldet sich innerhalb von 24 Stunden.";
  if (lower.includes("blocker") || lower.includes("problem")) return "Blocker sind Abhängigkeiten, die vor dem Spieltag gelöst werden müssen — z.B. abgelaufene Lizenzen oder gesperrte Spielstätten. Klicke auf einen Blocker für die Lösung.";
  if (lower.includes("export") || lower.includes("datev")) return "Export-Funktionen findest du in den jeweiligen Bereichen: DATEV unter Finanzen, CSV/PDF über die Export-Buttons in Listen und Tabellen.";
  if (lower.includes("mannschaft") || lower.includes("melden")) return "Mannschaften meldest du unter Mein Verein → Meine Mannschaften. Achte auf die Meldefristen — du findest sie im Dashboard.";
  if (lower.includes("passwort")) return "Dein Passwort kannst du über 'Mein Konto' (Avatar oben rechts) ändern. Bei Problemen wende dich an deinen Verbandsadmin.";
  return "Lass mich nachschauen... Für diese Frage empfehle ich dir einen Blick ins Hilfe-Center. Dort findest du ausführliche Artikel zu allen Themen.\n\nOder soll ich ein Support-Ticket erstellen?";
}

interface ChatWidgetProps {
  currentScreen: string;
}

export default function ChatWidget({ currentScreen }: ChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: "bot" | "user"; text: string }[]>([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const prevScreen = useRef(currentScreen);

  const ctx = SCREEN_SUGGESTIONS[currentScreen] || DEFAULT_SUGGESTIONS;

  // Reset greeting when screen changes
  useEffect(() => {
    if (currentScreen !== prevScreen.current) {
      prevScreen.current = currentScreen;
      if (isOpen) {
        setMessages(prev => [...prev, { role: "bot", text: ctx.greeting }]);
      }
    }
  }, [currentScreen, isOpen, ctx.greeting]);

  // Auto-scroll
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  const open = () => {
    if (messages.length === 0) {
      setMessages([{ role: "bot", text: ctx.greeting }]);
    }
    setIsOpen(true);
  };

  const send = (text: string) => {
    if (!text.trim()) return;
    setMessages(prev => [...prev, { role: "user", text }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages(prev => [...prev, { role: "bot", text: getBotReply(text) }]);
    }, 800 + Math.random() * 600);
  };

  return (
    <>
      {/* FAB */}
      {!isOpen && (
        <button
          onClick={open}
          className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-accent hover:bg-accent-hover shadow-lg flex items-center justify-center cursor-pointer border-none transition-all hover:scale-105 group"
          aria-label="Hilfe öffnen"
        >
          <Icon name="info" size={24} className="text-white" />
          {/* Hint label */}
          <span className="absolute right-full mr-3 px-3 py-1.5 bg-s1 border border-border rounded-lg shadow-md text-[12px] font-medium text-text whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
            Hilfe & KI-Assistent
          </span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[380px] rounded-2xl bg-s1 border border-border shadow-2xl overflow-hidden flex flex-col animate-fadeIn" style={{ height: 520 }}>
          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-border shrink-0">
            <div className="w-8 h-8 rounded-full bg-accent/15 flex items-center justify-center">
              <Icon name="zap" size={16} className="text-accent" />
            </div>
            <div className="flex-1">
              <div className="text-[14px] font-semibold">beauOS Assistent</div>
              <div className="text-[11px] text-green flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green" /> Online
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="w-7 h-7 rounded-md hover:bg-s2 flex items-center justify-center cursor-pointer bg-transparent border-none transition-colors" aria-label="Schließen">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[85%] px-3 py-2 rounded-lg text-[13px] leading-relaxed whitespace-pre-line ${
                  m.role === "user" ? "bg-accent/15 text-text" : "bg-s2 text-text"
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {typing && (
              <div className="flex justify-start">
                <div className="bg-s2 px-3 py-2 rounded-lg">
                  <span className="inline-flex gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-text-muted animate-pulse" />
                    <span className="w-1.5 h-1.5 rounded-full bg-text-muted animate-pulse" style={{ animationDelay: "0.15s" }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-text-muted animate-pulse" style={{ animationDelay: "0.3s" }} />
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Context Suggestions */}
          <div className="px-3 pb-2 flex flex-wrap gap-1.5 shrink-0">
            {ctx.actions.map(a => (
              <button
                key={a}
                onClick={() => send(a)}
                className="px-2.5 py-1 rounded-md text-[11px] font-medium border border-border text-text-muted hover:border-accent/40 hover:text-accent cursor-pointer bg-transparent transition-colors"
              >
                {a}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="flex gap-2 p-3 border-t border-border shrink-0">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && send(input)}
              placeholder="Frag mich etwas..."
              className="flex-1 !text-[13px] !h-[36px]"
            />
            <button
              onClick={() => send(input)}
              disabled={!input.trim()}
              className="px-3 py-1.5 rounded-[8px] text-[13px] font-medium text-white bg-accent hover:bg-accent-hover transition-colors cursor-pointer border-none disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Senden
            </button>
          </div>
        </div>
      )}
    </>
  );
}
