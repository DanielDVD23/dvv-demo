"use client";

import { useState } from "react";
import KpiCard from "@/components/ui/KpiCard";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import SectionHeader from "@/components/ui/SectionHeader";
import Icon from "@/components/ui/Icon";

interface VerbandDashboardProps {
  onNavigate: (screen: string) => void;
}

const INIT_TODOS = [
  { id: "vt1", icon: "scale", title: "Berufungsverfahren – TV Hannover vs. Spielausschuss", meta: "Einspruch gegen Ordnungsstrafe · BSO §16.12 · Frist: 5 Tage", priority: "urgent", action: "→ Prüfen", nav: "strafen" },
  { id: "vt2", icon: "scroll", title: "Spielordnungs-Änderung – Antrag Bezirk Hannover", meta: "Änderung §6.10 Meldefrist · Abstimmung erforderlich (BSO §1.2)", priority: "warning", action: "→ Bewerten", nav: "alle-ligen" },
  { id: "vt3", icon: "volleyball", title: "Schiedsrichter-Engpass – Spieltag 9 Bezirksliga", meta: "3 Spiele ohne SR-Zuweisung · BSO §9.2", priority: "warning", action: "→ Zuweisen", nav: "spieltag" },
  { id: "vt4", icon: "coin", title: "3 Vereine haben Beiträge nicht bezahlt", meta: "Gesamtsumme € 2.180 · Mahnverfahren nach BSO §16.5", priority: "info", action: "→ Mahnen", nav: "rechnungen" },
  { id: "vt5", icon: "clipboard", title: "Rahmenspielplan 2026/27 – Entwurf prüfen", meta: "BSO §4.5 · Abstimmung mit Landesverbänden", priority: "info", action: "→ Öffnen", nav: "spieltag" },
];

const ligen = [
  { name: "Verbandsliga Nord Herren", teams: "10", spieltag: "8/22", status: "Laufend", statusColor: "green" as const, probleme: "2 Ergebnisse offen", probColor: "orange" as const },
  { name: "Verbandsliga Nord Damen", teams: "8", spieltag: "8/22", status: "Laufend", statusColor: "green" as const, probleme: "—", probColor: "gray" as const },
  { name: "Bezirksliga Damen Staffel 1", teams: "8", spieltag: "7/22", status: "Laufend", statusColor: "green" as const, probleme: "1 Konflikt", probColor: "red" as const },
  { name: "Bezirksliga Herren Staffel 1", teams: "10", spieltag: "7/22", status: "Laufend", statusColor: "green" as const, probleme: "—", probColor: "gray" as const },
  { name: "Kreisliga Hannover Herren", teams: "12", spieltag: "9/22", status: "Laufend", statusColor: "green" as const, probleme: "SR-Engpass", probColor: "orange" as const },
];

const problemVereine = [
  { name: "SC Paderborn", problem: "Beitrag überfällig (€ 480)", color: "red" as const },
  { name: "VfR Bielefeld", problem: "Spielermeldung unvollständig", color: "orange" as const },
  { name: "SG Münster", problem: "SEPA-Mandat abgelaufen", color: "orange" as const },
];

const priorityBorder = {
  urgent: "border-l-red",
  warning: "border-l-orange",
  info: "border-l-accent",
};

export default function VerbandDashboard({ onNavigate }: VerbandDashboardProps) {
  const [todos, setTodos] = useState(INIT_TODOS.map(t => ({ ...t, done: false })));
  const openTodos = todos.filter(t => !t.done);
  const handleTodo = (id: string) => { const todo = todos.find(t => t.id === id); if (!todo) return; setTodos(p => p.map(t => t.id === id ? { ...t, done: true } : t)); if (todo.nav) onNavigate(todo.nav); };
  return (
    <div className="animate-fadeIn">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-[22px] font-bold mb-1">Guten Morgen, Dr. Meier</h1>
          <p className="text-[13px] text-text-muted">Verbandsadmin · NWVV · Saison 2025/26</p>
        </div>
        <div className="text-right">
          <div className="text-[11px] text-text-muted">Rahmenspielplan 26/27</div>
          <div className="flex gap-2 items-center justify-end mt-1">
            <div className="text-center bg-blue-dim border border-blue/20 rounded-[6px] px-3 py-2">
              <div className="text-[22px] font-bold leading-none text-blue">28</div>
              <div className="text-[10px] text-text-muted font-semibold">Tage</div>
            </div>
            <div className="text-center bg-s3 rounded-[6px] px-3 py-2">
              <div className="text-[22px] font-bold leading-none">09</div>
              <div className="text-[10px] text-text-muted font-semibold">Std</div>
            </div>
            <div className="text-center bg-s3 rounded-[6px] px-3 py-2">
              <div className="text-[22px] font-bold leading-none">15</div>
              <div className="text-[10px] text-text-muted font-semibold">Min</div>
            </div>
          </div>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-5">
        <KpiCard label="Aktive Ligen" value="24" sub="6 Verband · 12 Bezirk · 6 Kreis" color="purple" onClick={() => onNavigate("ligen")} />
        <KpiCard label="Aktive Vereine" value="186" sub="+12 zur Vorsaison" color="green" onClick={() => onNavigate("alle-ligen")} />
        <KpiCard label="Gemeldete Spieler" value="4.218" sub="2.340 Herren · 1.878 Damen" color="purple" onClick={() => onNavigate("mannschaft")} />
        <KpiCard label="Einnahmen (Saison)" value="€ 84.5k" sub="€ 12.4k ausstehend" color="orange" onClick={() => onNavigate("rechnungen")} />
      </div>

      <div className="grid grid-cols-[1fr_340px] gap-5 min-w-0">
        {/* Left: Todos + Liga Overview */}
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

          {/* Liga Overview Table */}
          <SectionHeader title="Liga-Übersicht" right={<Badge color="gray">24 Ligen</Badge>} className="mt-5" />
          <div className="bg-s1 border border-border rounded-[10px] overflow-hidden">
            <table className="w-full border-collapse text-[13px]">
              <thead>
                <tr>
                  <th className="text-[11px] font-semibold text-text-muted uppercase tracking-wide px-3.5 py-2.5 text-left border-b border-border">Liga</th>
                  <th className="text-[11px] font-semibold text-text-muted uppercase tracking-wide px-3.5 py-2.5 text-left border-b border-border">Teams</th>
                  <th className="text-[11px] font-semibold text-text-muted uppercase tracking-wide px-3.5 py-2.5 text-left border-b border-border">Spieltag</th>
                  <th className="text-[11px] font-semibold text-text-muted uppercase tracking-wide px-3.5 py-2.5 text-left border-b border-border">Status</th>
                  <th className="text-[11px] font-semibold text-text-muted uppercase tracking-wide px-3.5 py-2.5 text-left border-b border-border">Probleme</th>
                </tr>
              </thead>
              <tbody>
                {ligen.map((l, i) => (
                  <tr key={i} className="hover:bg-s2 cursor-pointer" onClick={() => onNavigate("ligen")}>
                    <td className="px-3.5 py-3 border-b border-border font-semibold">{l.name}</td>
                    <td className="px-3.5 py-3 border-b border-border">{l.teams}</td>
                    <td className="px-3.5 py-3 border-b border-border">{l.spieltag}</td>
                    <td className="px-3.5 py-3 border-b border-border"><Badge color={l.statusColor}>{l.status}</Badge></td>
                    <td className="px-3.5 py-3 border-b border-border"><Badge color={l.probColor}>{l.probleme}</Badge></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right: Finances + Problem clubs + AI */}
        <div>
          <SectionHeader title="Finanzübersicht" />
          <div className="bg-s1 border border-border rounded-[10px] p-4 mb-3">
            <div className="flex justify-between items-center mb-3">
              <div className="text-xs text-text-muted">Einnahmen (Saison)</div>
              <div className="text-[15px] font-bold text-green">€ 84.520</div>
            </div>
            <div className="flex justify-between items-center mb-3">
              <div className="text-xs text-text-muted">Ausgaben (Saison)</div>
              <div className="text-[15px] font-bold text-red">€ 61.340</div>
            </div>
            <div className="border-t border-border pt-3 flex justify-between items-center">
              <div className="text-xs font-semibold">Saldo</div>
              <div className="text-[15px] font-bold text-green">+ € 23.180</div>
            </div>
            <div className="mt-3 flex gap-2">
              <Badge color="orange">€ 12.4k ausstehend</Badge>
              <Badge color="red">3 überfällig</Badge>
            </div>
          </div>

          <SectionHeader title="Vereine mit Problemen" className="mt-3" />
          {problemVereine.map((v, i) => (
            <div key={i} className="bg-s2 border border-border rounded-[6px] px-3.5 py-3 mb-2 flex items-center gap-3">
              <div className="flex-1">
                <div className="text-[13px] font-semibold">{v.name}</div>
                <div className="text-[11px] text-text-muted">{v.problem}</div>
              </div>
              <Badge color={v.color}>Aktion</Badge>
            </div>
          ))}

          {/* AI Panel */}
          <div className="mt-4 bg-gradient-to-br from-accent-dim to-blue-dim border border-accent/20 rounded-[10px] p-[18px]">
            <div className="text-[11px] font-bold uppercase tracking-wider text-accent mb-2 flex items-center gap-1.5"><Icon name="sparkle" size={14} /> KI-Assistent</div>
            <div className="text-[13px] font-semibold mb-1.5">Saisonplanung 2026/27</div>
            <div className="text-xs text-text-muted mb-2.5">Vorschlag für Rahmenspielplan basierend auf Hallenverfügbarkeit und Mannschaftsmeldungen.</div>
            <Button size="sm">Entwurf ansehen</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
