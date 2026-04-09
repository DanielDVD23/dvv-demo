"use client";

import { useState, useRef, useEffect } from "react";
import type { Role } from "@/types/roles";
import { roleConfigs } from "@/config/roles";
import { kbArticles } from "@/data/knowledgeBase";
import Button from "@/components/ui/Button";

interface ChatMessage {
  id: number;
  role: "user" | "assistant" | "system";
  text: string;
  articleLink?: string;
}

interface ChatWidgetProps {
  userRole: Role;
  currentScreen: string;
  onNavigate: (screen: string) => void;
  onStartTour: () => void;
}

const screenLabels: Record<string, string> = {
  dashboard: "Dashboard",
  spieltag: "Ligenübersicht",
  ligen: "Meine Ligen",
  mannschaft: "Mannschaften meiner Ligen",
  mannschaften: "Meine Mannschaften",
  heimspieltermine: "Heimspieltermine",
  spielplan: "Spielplan",
  rechnungen: "Rechnungen",
  strafen: "Strafbescheide",
  veranstaltungen: "Veranstaltungen",
  statistik: "Statistiken",
  "alle-ligen": "Alle Ligen",
  "alle-mannschaften": "Alle Mannschaften",
  vereine: "Vereine",
  kalender: "Kalender",
  kontakte: "Kontakte",
  mail: "Mail",
  "knowledge-base": "Wissensdatenbank",
};

const suggestedQuestions: Record<Role, string[]> = {
  staffelleitung: [
    "Wie erstelle ich einen Spieltag?",
    "Wie bestätige ich Ergebnisse?",
    "Was tun bei Verlegungskonflikten?",
    "Guided Tour starten",
  ],
  clubadmin: [
    "Wie erstelle ich einen Kader?",
    "Wie melde ich eine Spielerin?",
    "Passwort vergessen?",
    "Guided Tour starten",
  ],
  verbandsadmin: [
    "Wie erstelle ich eine Rechnung?",
    "Wie lege ich einen Lehrgang an?",
    "Trainer-Lizenzen hochladen?",
    "Guided Tour starten",
  ],
};

// Simple pattern-matching for demo bot responses
function generateBotResponse(
  input: string,
  role: Role,
  screen: string
): { text: string; articleLink?: string } {
  const lower = input.toLowerCase();

  // Tour trigger
  if (lower.includes("tour") || lower.includes("guided") || lower.includes("onboarding")) {
    return {
      text: "Ich starte die Guided Tour für dich! Du wirst Schritt für Schritt durch die wichtigsten Funktionen geführt.",
    };
  }

  // Password
  if (lower.includes("passwort") || lower.includes("password") || lower.includes("login") || lower.includes("zugang")) {
    return {
      text: 'Zum Zurücksetzen deines Passworts klicke auf der Login-Seite auf "Passwort vergessen?" und gib deine E-Mail-Adresse ein. Du erhältst einen Reset-Link (gültig 24h). Wenn du keinen Zugang zur E-Mail hast, kontaktiere deinen Verbandsadmin.',
      articleLink: "passwort-zuruecksetzen",
    };
  }

  // Spieltag
  if (lower.includes("spieltag") || lower.includes("paarung")) {
    return {
      text: 'Navigiere zu Spielbetrieb → Ligenübersicht und klicke auf "+ Neuer Spieltag". Wähle die Liga und das Datum aus – die Paarungen werden automatisch generiert.',
      articleLink: "spieltag-anlegen",
    };
  }

  // Ergebnis
  if (lower.includes("ergebnis") || lower.includes("bestätig")) {
    return {
      text: "Beide Teams müssen das Ergebnis unabhängig bestätigen. Bei Abweichungen wird der Staffelleiter automatisch benachrichtigt.",
      articleLink: "ergebnis-bestaetigen",
    };
  }

  // Kader / Mannschaft
  if (lower.includes("kader") || lower.includes("mannschaft") || lower.includes("meldung")) {
    return {
      text: 'Gehe zu Mein Verein → Meine Mannschaften und klicke auf "+ Neue Mannschaft". Fülle Ligapräferenz, Trainer und Heimhalle aus und melde mindestens die Mindestanzahl Spielerinnen.',
      articleLink: "mannschaftsmeldung",
    };
  }

  // Spielerin
  if (lower.includes("spielerin") || lower.includes("melden") || lower.includes("spieler")) {
    return {
      text: 'Öffne die gewünschte Mannschaft und klicke auf "+ Spielerin melden". Gib Name, Trikotnummer und Position ein – die Pass-Nummer wird automatisch vergeben.',
      articleLink: "spielerin-melden",
    };
  }

  // Rechnung
  if (lower.includes("rechnung") || lower.includes("invoice") || lower.includes("sepa")) {
    return {
      text: 'Gehe zu Finanzen → Rechnungen und klicke auf "+ Neue Rechnung". Der Assistent führt dich durch: Empfänger, Posten, Zahlungsdetails, Vorschau.',
      articleLink: "rechnung-erstellen",
    };
  }

  // Strafe
  if (lower.includes("strafe") || lower.includes("ordnung") || lower.includes("einspruch")) {
    return {
      text: "Strafbescheide werden unter Finanzen & Ordnung erstellt. Einspruch ist innerhalb von 7 Tagen möglich. Offene Strafen können direkt storniert werden.",
      articleLink: "strafe-erstellen",
    };
  }

  // Verlegung
  if (lower.includes("verlegung") || lower.includes("termin") || lower.includes("verschieb")) {
    return {
      text: "Klicke beim gewünschten Spiel auf \"Verlegung beantragen\" und schlage einen neuen Termin vor. Das Gegner-Team wird automatisch benachrichtigt.",
      articleLink: "verlegung-beantragen",
    };
  }

  // DATEV
  if (lower.includes("datev") || lower.includes("export") || lower.includes("buchhaltung")) {
    return {
      text: "Klicke auf der Rechnungsseite auf den Export-Button und wähle 'DATEV-Export'. Die Datei enthält Buchungsstapel im DATEV-kompatiblen Format.",
      articleLink: "datev-export",
    };
  }

  // Lehrgang / Veranstaltung
  if (lower.includes("lehrgang") || lower.includes("fortbildung") || lower.includes("lizenz") || lower.includes("veranstaltung")) {
    return {
      text: "Unter Veranstaltungen → Neue Veranstaltung wählst du den Typ (Lehrgang/Fortbildung). Der Wizard führt dich durch alle Schritte inkl. Lizenzierung.",
      articleLink: "lehrgang-erstellen",
    };
  }

  // Vereinswechsel
  if (lower.includes("wechsel") || lower.includes("transfer")) {
    return {
      text: "Vereinswechsel können unter Mein Verein beantragt werden. Die Wechselperioden sind 01.07.–30.09. und 01.01.–31.01. Außerhalb nur mit Sondergenehmigung.",
      articleLink: "vereinswechsel",
    };
  }

  // Rolle
  if (lower.includes("rolle") || lower.includes("berechtigung") || lower.includes("zugriff")) {
    return {
      text: "Klicke oben links auf dein Profil, um zwischen Rollen zu wechseln. Jede Rolle hat eigene Berechtigungen und eine angepasste Navigation.",
      articleLink: "rolle-wechseln",
    };
  }

  // Wissensdatenbank
  if (lower.includes("wiki") || lower.includes("wissensdatenbank") || lower.includes("knowledge") || lower.includes("hilfe") || lower.includes("artikel")) {
    return {
      text: "Die Wissensdatenbank findest du in der Navigation. Dort sind alle Artikel nach Kategorien und Rollen sortiert – mit Volltextsuche.",
    };
  }

  // Context-aware fallback based on current screen
  const screenName = screenLabels[screen] || screen;
  const relevantArticles = kbArticles.filter(
    (a) => a.roles.includes(role) && (a.tags.some((t) => lower.includes(t)) || a.category === screen)
  );

  if (relevantArticles.length > 0) {
    const article = relevantArticles[0];
    return {
      text: `Zum Thema "${article.title}": ${article.summary}`,
      articleLink: article.id,
    };
  }

  return {
    text: `Ich konnte keine passende Antwort finden. Du befindest dich gerade im Bereich "${screenName}". Möchtest du ein Support-Ticket erstellen, oder soll ich in der Wissensdatenbank suchen?`,
  };
}

export default function ChatWidget({ userRole, currentScreen, onNavigate, onStartTour }: ChatWidgetProps) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [ticketMode, setTicketMode] = useState(false);
  const [ticketData, setTicketData] = useState({ betreff: "", beschreibung: "" });
  const [ticketSent, setTicketSent] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const msgCounter = useRef(0);

  const config = roleConfigs[userRole];
  const screenLabel = screenLabels[currentScreen] || currentScreen;

  // Generate greeting on open
  useEffect(() => {
    if (open && messages.length === 0) {
      const greeting = getGreeting();
      setMessages([{ id: ++msgCounter.current, role: "assistant", text: greeting }]);
    }
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function getGreeting(): string {
    const name = config.userName.split(" ")[0];
    const greetings: Record<string, string> = {
      dashboard: `Hallo ${name}, willkommen im Dashboard! Ich kann dir bei deinen offenen To-Dos helfen oder Fragen zum System beantworten.`,
      spieltag: `Hallo ${name}, du bist gerade in der Ligenübersicht. Soll ich dir zeigen, wie man Spieltage verwaltet?`,
      rechnungen: `Hallo ${name}, du bist im Rechnungsbereich. Brauchst du Hilfe beim Erstellen einer Rechnung oder beim DATEV-Export?`,
      mannschaften: `Hallo ${name}, du bist bei deinen Mannschaften. Soll ich dir helfen, eine Mannschaftsmeldung durchzuführen?`,
      mannschaft: `Hallo ${name}, du bist im Kader-Bereich. Ich kann dir bei Spielermeldungen und Kaderverwaltung helfen.`,
      strafen: `Hallo ${name}, du bist bei den Strafbescheiden. Soll ich dir erklären, wie Einsprüche funktionieren?`,
      veranstaltungen: `Hallo ${name}, du bist im Veranstaltungsbereich. Soll ich dir zeigen, wie man Lehrgänge oder Turniere erstellt?`,
      heimspieltermine: `Hallo ${name}, du bist bei den Heimspielterminen. Brauchst du Hilfe bei der Hallenplanung?`,
    };
    return greetings[currentScreen] || `Hallo ${name}, du bist gerade im Bereich "${screenLabel}". Wie kann ich dir helfen?`;
  }

  function handleSend() {
    const trimmed = input.trim();
    if (!trimmed) return;

    // Add user message
    const userMsg: ChatMessage = { id: ++msgCounter.current, role: "user", text: trimmed };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Check for tour trigger
    const isTourRequest = trimmed.toLowerCase().includes("tour") || trimmed.toLowerCase().includes("guided");

    // Simulate bot thinking
    setTimeout(() => {
      const response = generateBotResponse(trimmed, userRole, currentScreen);
      const botMsg: ChatMessage = {
        id: ++msgCounter.current,
        role: "assistant",
        text: response.text,
        articleLink: response.articleLink,
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);

      if (isTourRequest) {
        setTimeout(() => {
          setOpen(false);
          onStartTour();
        }, 1000);
      }
    }, 600 + Math.random() * 800);
  }

  function handleSuggestion(q: string) {
    setInput(q);
    // Auto-send
    const userMsg: ChatMessage = { id: ++msgCounter.current, role: "user", text: q };
    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    const isTourRequest = q.toLowerCase().includes("tour");

    setTimeout(() => {
      const response = generateBotResponse(q, userRole, currentScreen);
      const botMsg: ChatMessage = {
        id: ++msgCounter.current,
        role: "assistant",
        text: response.text,
        articleLink: response.articleLink,
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
      setInput("");

      if (isTourRequest) {
        setTimeout(() => {
          setOpen(false);
          onStartTour();
        }, 1000);
      }
    }, 600 + Math.random() * 800);
  }

  function handleTicketSubmit() {
    if (!ticketData.betreff.trim()) return;
    const nr = `#T-2026-${String(Math.floor(Math.random() * 900) + 100)}`;
    setTicketSent(true);
    setTicketMode(false);

    const ticketMsg: ChatMessage = {
      id: ++msgCounter.current,
      role: "assistant",
      text: `Ticket ${nr} wurde erstellt. Betreff: "${ticketData.betreff}". Wir melden uns innerhalb von 24 Stunden. Debug-Log wurde automatisch angehängt (Rolle: ${config.label}, Screen: ${screenLabel}).`,
    };
    setMessages((prev) => [...prev, ticketMsg]);
    setTicketData({ betreff: "", beschreibung: "" });
    setTimeout(() => setTicketSent(false), 3000);
  }

  function handleArticleClick(articleId: string) {
    onNavigate("knowledge-base");
    setOpen(false);
  }

  return (
    <>
      {/* FAB */}
      <div className="fixed bottom-6 right-6 z-[998] group">
        <button
          className="w-14 h-14 rounded-full bg-accent text-white flex items-center justify-center hover:bg-accent-hover transition-all hover:scale-105 cursor-pointer border-0"
          style={{ boxShadow: "0 4px 20px rgba(124,58,237,0.4)" }}
          onClick={() => setOpen(!open)}
          data-tour="help-button"
        >
          {open ? (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              <circle cx="12" cy="10" r="0.5" fill="currentColor" />
              <circle cx="8" cy="10" r="0.5" fill="currentColor" />
              <circle cx="16" cy="10" r="0.5" fill="currentColor" />
            </svg>
          )}
        </button>
        {/* Hover label */}
        {!open && (
          <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            <div className="bg-[#1e293b] text-white text-xs font-medium px-3 py-1.5 rounded-md whitespace-nowrap shadow-lg">
              KI-Assistent Online
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-green ml-1.5 align-middle" />
            </div>
          </div>
        )}
      </div>

      {/* Chat Window */}
      {open && (
        <div
          className="fixed bottom-24 right-6 z-[997] w-[380px] max-h-[560px] bg-s1 border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          style={{ animation: "slideUp .25s ease" }}
        >
          {/* Header */}
          <div className="px-4 py-3 shrink-0" style={{ background: "linear-gradient(135deg, #7c3aed, #6d28d9)" }}>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-white text-sm font-bold">beauOS Assistent</div>
                <div className="text-white/70 text-[11px] flex items-center gap-1.5">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-green" />
                  Online · {config.label}
                </div>
              </div>
              <button
                className="bg-white/10 border-0 text-white/70 hover:text-white w-7 h-7 rounded-lg cursor-pointer flex items-center justify-center transition-colors"
                onClick={() => setOpen(false)}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-0" style={{ maxHeight: 340 }}>
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[85%] rounded-xl px-3.5 py-2.5 text-[13px] leading-relaxed ${
                    msg.role === "user"
                      ? "bg-accent text-white rounded-br-sm"
                      : "bg-s2 border border-border text-text rounded-bl-sm"
                  }`}
                >
                  {msg.text}
                  {msg.articleLink && (
                    <button
                      className="mt-2 flex items-center gap-1.5 text-[11px] font-semibold text-accent hover:underline cursor-pointer bg-transparent border-0 p-0"
                      onClick={() => handleArticleClick(msg.articleLink!)}
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></svg>
                      In Wissensdatenbank lesen
                    </button>
                  )}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-s2 border border-border rounded-xl rounded-bl-sm px-4 py-3">
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 bg-text-muted rounded-full" style={{ animation: "fadeIn .5s ease infinite alternate" }} />
                    <span className="w-1.5 h-1.5 bg-text-muted rounded-full" style={{ animation: "fadeIn .5s ease .15s infinite alternate" }} />
                    <span className="w-1.5 h-1.5 bg-text-muted rounded-full" style={{ animation: "fadeIn .5s ease .3s infinite alternate" }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Actions */}
          {messages.length <= 1 && !isTyping && (
            <div className="px-4 pb-2 flex flex-wrap gap-1.5">
              {suggestedQuestions[userRole].map((q) => (
                <button
                  key={q}
                  className="bg-accent-dim text-accent text-[11px] font-medium px-2.5 py-1.5 rounded-full border border-accent/20 cursor-pointer hover:bg-accent hover:text-white transition-colors"
                  onClick={() => handleSuggestion(q)}
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Ticket creation inline */}
          {ticketMode && (
            <div className="px-4 pb-3 space-y-2 border-t border-border pt-3">
              <div className="text-xs font-bold">Support-Ticket erstellen</div>
              <input
                value={ticketData.betreff}
                onChange={(e) => setTicketData((p) => ({ ...p, betreff: e.target.value }))}
                placeholder="Betreff"
                className="!text-[12px]"
              />
              <textarea
                rows={2}
                value={ticketData.beschreibung}
                onChange={(e) => setTicketData((p) => ({ ...p, beschreibung: e.target.value }))}
                placeholder="Beschreibung (optional)"
                className="!text-[12px]"
                style={{ height: "auto", minHeight: 48, padding: "6px 10px" }}
              />
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" className="flex-1" onClick={() => setTicketMode(false)}>Abbrechen</Button>
                <Button size="sm" className="flex-1" disabled={!ticketData.betreff.trim()} onClick={handleTicketSubmit}>Senden</Button>
              </div>
            </div>
          )}

          {/* Input */}
          <div className="px-4 py-3 border-t border-border shrink-0">
            <div className="flex gap-2">
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Frage stellen..."
                className="!text-[13px] flex-1"
              />
              <button
                className="w-9 h-9 rounded-lg bg-accent text-white flex items-center justify-center cursor-pointer border-0 hover:bg-accent-hover transition-colors shrink-0 disabled:opacity-40"
                onClick={handleSend}
                disabled={!input.trim()}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>
              </button>
            </div>
            {!ticketMode && (
              <button
                className="mt-2 text-[11px] text-text-muted hover:text-accent cursor-pointer bg-transparent border-0 p-0 transition-colors"
                onClick={() => setTicketMode(true)}
              >
                Nicht gefunden? Ticket erstellen
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}
