"use client";

import { useState } from "react";
import KpiCard from "@/components/ui/KpiCard";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import SectionHeader from "@/components/ui/SectionHeader";
import Icon from "@/components/ui/Icon";

interface ClubDashboardProps {
  onNavigate: (screen: string) => void;
}

const INIT_TODOS = [
  { id: "ct1", icon: "clipboard", title: "Spielermeldung ausstehend – Herren 2", meta: "Meldeschluss in 5 Tagen · BSO §6.10", priority: "urgent", action: "→ Melden", nav: "spielermeldung" },
  { id: "ct2", icon: "refresh", title: "Vereinswechsel-Antrag – Lisa Schneider", meta: "Eingang 18.03.2026 · Wartezeit 3 Monate (BSO §8.3)", priority: "warning", action: "→ Prüfen", nav: "spielermeldung" },
  { id: "ct3", icon: "edit-3", title: "Aufstellung fehlt – Spieltag 9 Herren 1", meta: "Spieltag 9 · Frist: 2 Tage vor Spieltag", priority: "warning", action: "→ Aufstellen", nav: "spielplan" },
  { id: "ct4", icon: "coin", title: "Liga-Beitrag Verbandsliga – € 240,00", meta: "Fällig: 25.03.2026 · Noch nicht bezahlt", priority: "info", action: "→ Bezahlen", nav: "rechnungen" },
];

const spiele = [
  { mannschaft: "Herren 1", gegner: "SVC Göttingen", datum: "29.03.2026", halle: "Heimspiel", status: "Aufstellung OK", color: "green" as const },
  { mannschaft: "Damen 1", gegner: "MTV Braunschweig", datum: "29.03.2026", halle: "Auswärts", status: "Aufstellung OK", color: "green" as const },
  { mannschaft: "Herren 2", gegner: "VfR Bielefeld", datum: "30.03.2026", halle: "Heimspiel", status: "Meldung fehlt", color: "red" as const },
];

const mannschaften = [
  { name: "TSV Hannover Herren 1", meta: "Verbandsliga Nord · Spieltag 8/22", borderColor: "border-l-green", badges: [{ text: "Laufend", color: "green" as const }, { text: "Platz 1", color: "purple" as const }] },
  { name: "TSV Hannover Herren 2", meta: "Bezirksliga · Spieltag 7/22", borderColor: "border-l-orange", badges: [{ text: "Laufend", color: "green" as const }, { text: "Meldung fehlt", color: "red" as const }] },
  { name: "TSV Hannover Damen 1", meta: "Verbandsliga Nord · Spieltag 8/22", borderColor: "border-l-accent", badges: [{ text: "Laufend", color: "green" as const }] },
];

const priorityBorder = {
  urgent: "border-l-red",
  warning: "border-l-orange",
  info: "border-l-accent",
};

export default function ClubDashboard({ onNavigate }: ClubDashboardProps) {
  const [todos, setTodos] = useState(INIT_TODOS.map(t => ({ ...t, done: false })));
  const openTodos = todos.filter(t => !t.done);
  const handleTodo = (id: string) => { const todo = todos.find(t => t.id === id); if (!todo) return; setTodos(p => p.map(t => t.id === id ? { ...t, done: true } : t)); if (todo.nav) onNavigate(todo.nav); };

  return (
    <div className="animate-fadeIn">
      {/* Header with countdown */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-[22px] font-bold mb-1">Guten Morgen, Thomas</h1>
          <p className="text-[13px] text-text-muted">Vereinsadmin · TSV Hannover · Saison 2025/26</p>
        </div>
        <div className="text-right">
          <div className="text-[11px] text-text-muted">Meldeschluss Spieler</div>
          <div className="flex gap-2 items-center justify-end mt-1">
            <div className="text-center bg-orange-dim border border-orange/20 rounded-[6px] px-3 py-2">
              <div className="text-[22px] font-bold leading-none text-orange">5</div>
              <div className="text-[10px] text-text-muted font-semibold">Tage</div>
            </div>
            <div className="text-center bg-s3 rounded-[6px] px-3 py-2">
              <div className="text-[22px] font-bold leading-none">11</div>
              <div className="text-[10px] text-text-muted font-semibold">Std</div>
            </div>
            <div className="text-center bg-s3 rounded-[6px] px-3 py-2">
              <div className="text-[22px] font-bold leading-none">22</div>
              <div className="text-[10px] text-text-muted font-semibold">Min</div>
            </div>
          </div>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-5">
        <KpiCard label="Gemeldete Spieler" value="42" sub="3 Meldungen ausstehend" color="green" onClick={() => onNavigate("spielermeldung")} />
        <KpiCard label="Nächste Spiele" value="3" sub="in den nächsten 14 Tagen" color="purple" onClick={() => onNavigate("spielplan")} />
        <KpiCard label="Offene Gebühren" value="€ 480" sub="2 Rechnungen offen" color="orange" onClick={() => onNavigate("rechnungen")} />
        <KpiCard label="Aktive Teams" value="6" sub="4 Herren · 2 Damen" color="green" onClick={() => onNavigate("mannschaften")} />
      </div>

      <div className="grid grid-cols-[1fr_340px] gap-5 min-w-0">
        {/* Left: Todos + Upcoming */}
        <div className="min-w-0">
          <SectionHeader title="Meine To-Dos" right={<Badge color={openTodos.length > 0 ? "red" : "green"}>{openTodos.length} offen</Badge>} />
          {todos.map((todo) => (
            <div
              key={todo.id}
              className={`flex items-center gap-3 py-[11px] px-3.5 rounded-[6px] border-l-[3px] ${todo.done ? "border-l-green bg-green-dim opacity-60" : `${priorityBorder[todo.priority as keyof typeof priorityBorder]} bg-s2`} mb-2 cursor-pointer hover:bg-s3 transition-all`}
              onClick={() => !todo.done && handleTodo(todo.id)}
            >
              {todo.done ? <div className="w-6 h-6 rounded-full bg-green flex items-center justify-center shrink-0"><Icon name="check" size={12} className="text-white" /></div> : <Icon name={todo.icon} size={16} className="w-6 text-center text-text-muted" />}
              <div className="flex-1">
                <div className={`text-[13px] font-semibold mb-0.5 ${todo.done ? "line-through text-text-muted" : ""}`}>{todo.title}</div>
                <div className="text-[11px] text-text-muted">{todo.meta}</div>
              </div>
              {todo.done ? <Badge color="green">Erledigt</Badge> : <span className="text-[11px] text-accent font-semibold whitespace-nowrap">{todo.action}</span>}
            </div>
          ))}

          {/* Upcoming Games */}
          <SectionHeader title="Nächste Spiele" right={<Badge color="gray">3 Spiele</Badge>} className="mt-5" />
          <div className="bg-s1 border border-border rounded-[10px] overflow-hidden">
            <table className="w-full border-collapse text-[13px]">
              <thead>
                <tr>
                  <th className="text-[11px] font-semibold text-text-muted uppercase tracking-wide px-3.5 py-2.5 text-left border-b border-border">Mannschaft</th>
                  <th className="text-[11px] font-semibold text-text-muted uppercase tracking-wide px-3.5 py-2.5 text-left border-b border-border">Gegner</th>
                  <th className="text-[11px] font-semibold text-text-muted uppercase tracking-wide px-3.5 py-2.5 text-left border-b border-border">Datum</th>
                  <th className="text-[11px] font-semibold text-text-muted uppercase tracking-wide px-3.5 py-2.5 text-left border-b border-border">Ort</th>
                  <th className="text-[11px] font-semibold text-text-muted uppercase tracking-wide px-3.5 py-2.5 text-left border-b border-border">Status</th>
                </tr>
              </thead>
              <tbody>
                {spiele.map((s, i) => (
                  <tr key={i} className="hover:bg-s2">
                    <td className="px-3.5 py-3 border-b border-border font-semibold">{s.mannschaft}</td>
                    <td className="px-3.5 py-3 border-b border-border">{s.gegner}</td>
                    <td className="px-3.5 py-3 border-b border-border">{s.datum}</td>
                    <td className="px-3.5 py-3 border-b border-border">{s.halle}</td>
                    <td className="px-3.5 py-3 border-b border-border"><Badge color={s.color}>{s.status}</Badge></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right: Teams + AI */}
        <div>
          <SectionHeader title="Meine Mannschaften" right={<Button variant="ghost" size="sm">Alle 6</Button>} />
          {mannschaften.map((team, i) => (
            <div
              key={i}
              className={`bg-s2 border border-border rounded-[10px] p-4 cursor-pointer transition-all hover:bg-s3 hover:-translate-y-px border-l-[3px] ${team.borderColor} ${i > 0 ? "mt-2" : ""}`}
              onClick={() => onNavigate("mannschaften")}
            >
              <div className="text-sm font-bold mb-1">{team.name}</div>
              <div className="text-xs text-text-muted mb-2.5">{team.meta}</div>
              <div className="flex gap-1.5 flex-wrap">
                {team.badges.map((b, j) => <Badge key={j} color={b.color}>{b.text}</Badge>)}
              </div>
            </div>
          ))}
          <Button variant="ghost" className="w-full mt-2 text-xs" onClick={() => onNavigate("mannschaften")}>
            Alle 6 Mannschaften anzeigen →
          </Button>

          {/* AI Panel */}
          <div className="mt-4 bg-gradient-to-br from-accent-dim to-blue-dim border border-accent/20 rounded-[10px] p-[18px]">
            <div className="text-[11px] font-bold uppercase tracking-wider text-accent mb-2 flex items-center gap-1.5"><Icon name="sparkle" size={14} /> KI-Assistent</div>
            <div className="text-[13px] font-semibold mb-1.5">Aufstellungs-Vorschlag</div>
            <div className="text-xs text-text-muted mb-2.5">Basierend auf Verfügbarkeiten: Optimale Aufstellung für Herren 1 vs. SVC Göttingen am 29.03.</div>
            <Button size="sm" onClick={() => onNavigate("spielplan")}>Aufstellung ansehen</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
