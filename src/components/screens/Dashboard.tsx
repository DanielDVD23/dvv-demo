"use client";

import { useState } from "react";
import KpiCard from "@/components/ui/KpiCard";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import SectionHeader from "@/components/ui/SectionHeader";
import Icon from "@/components/ui/Icon";

interface DashboardProps {
  onNavigate: (screen: string) => void;
}

const INIT_TODOS = [
  { id: "t1", icon: "coin", title: "Ordnungsstrafe ausstehend – TV Hannover", meta: "Fällig seit 3 Tagen · Verbandsliga Nord", priority: "urgent", action: "→ Öffnen", nav: "rechnungen" },
  { id: "t2", icon: "warning", title: "Verlegungskonflikt – SVC Göttingen vs. MTV Braunschweig", meta: "Staffelleitung muss entscheiden · Frist: morgen", priority: "urgent", action: "→ Entscheiden", nav: "spieltag" },
  { id: "t3", icon: "clipboard", title: "5 Spielergebnisse noch nicht bestätigt", meta: "Spieltag 8 · Letztes Wochenende", priority: "warning", action: "→ Bestätigen", nav: "spieltag" },
  { id: "t4", icon: "volleyball", title: "Heimspieltermin fehlt – TSV Hildesheim", meta: "Spieltag 9 · Noch kein Termin gemeldet", priority: "info", action: "→ Anmahnen", nav: "heimspieltermine" },
  { id: "t5", icon: "edit-3", title: "Neue Mannschaftsmeldung eingegangen", meta: "SVC Wolfsburg – Damen Bezirksliga", priority: "info", action: "→ Prüfen", nav: "mannschaft" },
];

const results = [
  { heim: "TSV Hannover", gast: "SVC Göttingen", ergebnis: "3:1", status: "Bestätigt", color: "green" as const },
  { heim: "MTV Wolfsburg", gast: "TV Hildesheim", ergebnis: "0:3", status: "Bestätigt", color: "green" as const },
  { heim: "SC Paderborn", gast: "TSV Osnabrück", ergebnis: "3:2", status: "Ausstehend", color: "orange" as const },
  { heim: "VfR Bielefeld", gast: "SG Münster", ergebnis: "—:—", status: "Fehlt", color: "red" as const },
];

const ligen = [
  { name: "Verbandsliga Nord Herren", meta: "10 Mannschaften · Spieltag 8/22", borderColor: "border-l-green", badges: [{ text: "Laufend", color: "green" as const }, { text: "2 Ergebnisse offen", color: "orange" as const }] },
  { name: "Bezirksliga Damen Staffel 1", meta: "8 Mannschaften · Spieltag 7/22", borderColor: "border-l-orange", badges: [{ text: "Laufend", color: "green" as const }, { text: "1 Konflikt", color: "red" as const }] },
  { name: "Kreisliga Herren Hannover", meta: "12 Mannschaften · Spieltag 9/22", borderColor: "border-l-accent", badges: [{ text: "Laufend", color: "green" as const }] },
];

const priorityBorder = {
  urgent: "border-l-red",
  warning: "border-l-orange",
  info: "border-l-accent",
};

export default function Dashboard({ onNavigate }: DashboardProps) {
  const [todos, setTodos] = useState(INIT_TODOS.map(t => ({ ...t, done: false })));
  const openTodos = todos.filter(t => !t.done);

  const handleTodo = (id: string) => {
    const todo = todos.find(t => t.id === id);
    if (!todo) return;
    setTodos(p => p.map(t => t.id === id ? { ...t, done: true } : t));
    if (todo.nav) onNavigate(todo.nav);
  };

  return (
    <div className="animate-fadeIn">
      {/* Header with countdown */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-[22px] font-bold mb-1">Guten Morgen, Stefan</h1>
          <p className="text-[13px] text-text-muted">Staffelleiter · NWVV Volleyball · Saison 2025/26</p>
        </div>
        <div className="text-right">
          <div className="text-[11px] text-text-muted">Meldeschluss Sommer</div>
          <div className="flex gap-2 items-center justify-end mt-1">
            <div className="text-center bg-orange-dim border border-[rgba(245,158,11,0.2)] rounded-[6px] px-3 py-2">
              <div className="text-[22px] font-bold leading-none text-orange">12</div>
              <div className="text-[10px] text-text-muted font-semibold">Tage</div>
            </div>
            <div className="text-center bg-s3 rounded-[6px] px-3 py-2">
              <div className="text-[22px] font-bold leading-none">04</div>
              <div className="text-[10px] text-text-muted font-semibold">Std</div>
            </div>
            <div className="text-center bg-s3 rounded-[6px] px-3 py-2">
              <div className="text-[22px] font-bold leading-none">37</div>
              <div className="text-[10px] text-text-muted font-semibold">Min</div>
            </div>
          </div>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-5">
        <KpiCard label="Offene Rechnungen" value="3" sub="€ 1.240 ausstehend" color="red" onClick={() => onNavigate("rechnungen")} />
        <KpiCard label="Spieltagsplanung" value="2" sub="Verlegungsanträge offen" color="orange" onClick={() => onNavigate("spieltag")} />
        <KpiCard label="Ergebnisse" value="5" sub="zu bestätigen" color="purple" onClick={() => onNavigate("spieltag")} />
        <KpiCard label="Meldungen" value="18" sub="Mannschaften gemeldet" color="green" onClick={() => onNavigate("mannschaft")} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-5 min-w-0">
        {/* Left: Todos + Results */}
        <div className="min-w-0">
          <SectionHeader title="Meine To-Dos" right={<Badge color={openTodos.length > 0 ? "red" : "green"}>{openTodos.length} offen</Badge>} />
          {todos.map((todo) => (
            <div
              key={todo.id}
              className={`flex items-center gap-3 py-[11px] px-3.5 rounded-[6px] border-l-[3px] ${todo.done ? "border-l-green" : priorityBorder[todo.priority as keyof typeof priorityBorder]} ${todo.done ? "bg-green-dim opacity-60" : "bg-s2"} mb-2 cursor-pointer hover:bg-s3 transition-all`}
              onClick={() => !todo.done && handleTodo(todo.id)}
            >
              {todo.done ? (
                <div className="w-6 h-6 rounded-full bg-green flex items-center justify-center shrink-0"><Icon name="check" size={12} className="text-white" /></div>
              ) : (
                <Icon name={todo.icon} size={16} className="w-6 text-center text-text-muted" />
              )}
              <div className="flex-1">
                <div className={`text-[13px] font-semibold mb-0.5 ${todo.done ? "line-through text-text-muted" : ""}`}>{todo.title}</div>
                <div className="text-[11px] text-text-muted">{todo.meta}</div>
              </div>
              {todo.done ? (
                <Badge color="green">Erledigt</Badge>
              ) : (
                <span className="text-[11px] text-accent font-semibold whitespace-nowrap">{todo.action}</span>
              )}
            </div>
          ))}

          {/* Last Weekend */}
          <SectionHeader title="Letztes Wochenende (Spieltag 8)" right={<Badge color="gray">12 Spiele</Badge>} className="mt-5" />
          <div className="bg-s1 border border-border rounded-[10px] overflow-hidden">
            <table className="w-full border-collapse text-[13px]">
              <thead>
                <tr>
                  <th className="text-[11px] font-semibold text-text-muted uppercase tracking-wide px-3.5 py-2.5 text-left border-b border-border">Heim</th>
                  <th className="text-[11px] font-semibold text-text-muted uppercase tracking-wide px-3.5 py-2.5 text-left border-b border-border">Gast</th>
                  <th className="text-[11px] font-semibold text-text-muted uppercase tracking-wide px-3.5 py-2.5 text-left border-b border-border">Ergebnis</th>
                  <th className="text-[11px] font-semibold text-text-muted uppercase tracking-wide px-3.5 py-2.5 text-left border-b border-border">Status</th>
                </tr>
              </thead>
              <tbody>
                {results.map((r, i) => (
                  <tr key={i} className="hover:bg-s2">
                    <td className="px-3.5 py-3 border-b border-border">{r.heim}</td>
                    <td className="px-3.5 py-3 border-b border-border">{r.gast}</td>
                    <td className="px-3.5 py-3 border-b border-border font-bold">{r.ergebnis}</td>
                    <td className="px-3.5 py-3 border-b border-border"><Badge color={r.color}>{r.status}</Badge></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right: Ligen + AI */}
        <div>
          <SectionHeader title="Meine Ligen" right={<Button variant="ghost" size="sm">+ Liga</Button>} />
          {ligen.map((liga, i) => (
            <div
              key={i}
              className={`bg-s2 border border-border rounded-[10px] p-4 cursor-pointer transition-all hover:bg-s3 hover:-translate-y-px border-l-[3px] ${liga.borderColor} ${i > 0 ? "mt-2" : ""}`}
              onClick={() => onNavigate("ligen")}
            >
              <div className="text-sm font-bold mb-1">{liga.name}</div>
              <div className="text-xs text-text-muted mb-2.5">{liga.meta}</div>
              <div className="flex gap-1.5 flex-wrap">
                {liga.badges.map((b, j) => <Badge key={j} color={b.color}>{b.text}</Badge>)}
              </div>
            </div>
          ))}
          <Button variant="ghost" className="w-full mt-2 text-xs" onClick={() => onNavigate("ligen")}>
            Alle 3 Ligen anzeigen →
          </Button>

          {/* AI Panel */}
          <div className="mt-4 bg-gradient-to-br from-accent-dim to-blue-dim border border-accent/20 rounded-[10px] p-[18px]">
            <div className="text-[11px] font-bold uppercase tracking-wider text-accent mb-2 flex items-center gap-1.5"><Icon name="sparkle" size={14} /> KI-Assistent</div>
            <div className="text-[13px] font-semibold mb-1.5">Spielbericht verfügbar</div>
            <div className="text-xs text-text-muted mb-2.5">TSV Hannover vs. SVC Göttingen (3:1) wurde gespielt. Soll ein Spielbericht erstellt werden?</div>
            <Button size="sm" onClick={() => onNavigate("cms")}>Bericht generieren</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
