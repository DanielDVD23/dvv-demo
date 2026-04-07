"use client";

import { useState } from "react";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";

const KPI = [
  { label: "Aktive Lizenzen", value: "42.847", change: "+312", color: "text-green", icon: "check" },
  { label: "Neu beantragt", value: "128", change: "diese Woche", color: "text-blue", icon: "clipboard" },
  { label: "Ablaufend (30 Tage)", value: "847", change: "Erinnerung?", color: "text-orange", icon: "alert" },
  { label: "Gesperrt", value: "23", change: "3 neu", color: "text-red", icon: "shield" },
];

const LANES = [
  { type: "Spieler (Halle)", aktiv: 28430, gesamt: 31200, color: "bg-blue" },
  { type: "Spieler (Beach)", aktiv: 4210, gesamt: 5100, color: "bg-orange" },
  { type: "Schiedsrichter", aktiv: 3840, gesamt: 4200, color: "bg-green" },
  { type: "Trainer", aktiv: 6367, gesamt: 7500, color: "bg-accent" },
];

const PENDING = [
  { name: "Jonas Becker", typ: "Spieler Halle Jugend", verein: "TSV Herrsching", datum: "02.04.2026", tage: 5, prio: "normal" },
  { name: "Laura Heinz", typ: "Trainer C-Lizenz", verein: "SWD Düren", datum: "28.03.2026", tage: 10, prio: "hoch" },
  { name: "Markus Wolf", typ: "Schiedsrichter", verein: "DVV", datum: "25.03.2026", tage: 13, prio: "ueberfaellig" },
  { name: "Sophie Klein", typ: "Spieler Beach", verein: "Beach Berlin", datum: "01.04.2026", tage: 6, prio: "normal" },
  { name: "Tim Fischer", typ: "Spieler Halle Senioren", verein: "Grizzlys Giesen", datum: "30.03.2026", tage: 8, prio: "hoch" },
  { name: "Pia Wagner", typ: "Trainer B-Lizenz", verein: "TSV Hannover", datum: "04.04.2026", tage: 3, prio: "normal" },
];

const prioColors: Record<string, "green" | "orange" | "red"> = { normal: "green", hoch: "orange", ueberfaellig: "red" };

export default function LizenzDashboard() {
  const [selectedLane, setSelectedLane] = useState("");

  return (
    <div className="animate-fadeIn">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="text-[22px] font-bold mb-1">Lizenz-Dashboard</h1>
          <p className="text-[13px] text-text-muted">Übersicht aller Lizenzvorgänge im DVV</p>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost"><Icon name="bar-chart" size={14} /> DOSB-LiMS Export</Button>
          <Button>Massenfreigabe</Button>
        </div>
      </div>

      {/* Alert Banner */}
      <div className="bg-orange-dim border border-[rgba(217,119,6,0.2)] rounded-[8px] px-4 py-3 mb-5 flex items-center gap-3">
        <Icon name="alert" size={18} className="text-orange shrink-0" />
        <span className="text-[13px] text-orange font-medium">847 Lizenzen laufen in den nächsten 30 Tagen ab — Erinnerung versenden?</span>
        <Button size="sm" variant="warning" className="ml-auto">Erinnerung senden</Button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
        {KPI.map(k => (
          <Card key={k.label} className="!mb-0 !p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className={`w-8 h-8 rounded-lg bg-s2 flex items-center justify-center`}>
                <Icon name={k.icon} size={16} className={k.color} />
              </div>
            </div>
            <div className="text-[24px] font-bold">{k.value}</div>
            <div className="text-[11px] text-text-muted font-medium">{k.label}</div>
            <div className={`text-[11px] ${k.color} font-medium mt-1`}>{k.change}</div>
          </Card>
        ))}
      </div>

      {/* Swim Lanes */}
      <Card className="!mb-5">
        <div className="text-xs font-bold text-text-muted uppercase tracking-wider mb-4">Lizenz-Typen Übersicht</div>
        <div className="space-y-4">
          {LANES.map(l => (
            <div key={l.type} className="flex items-center gap-4">
              <div className="w-36 text-[13px] font-medium shrink-0">{l.type}</div>
              <div className="flex-1 h-6 bg-s2 rounded-full overflow-hidden relative">
                <div
                  className={`h-full ${l.color} rounded-full transition-all`}
                  style={{ width: `${(l.aktiv / l.gesamt) * 100}%` }}
                />
              </div>
              <div className="text-[12px] text-text-dim w-28 text-right">
                <span className="font-semibold">{l.aktiv.toLocaleString("de-DE")}</span>
                <span className="text-text-muted"> / {l.gesamt.toLocaleString("de-DE")}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Pending Applications */}
      <Card noPadding>
        <div className="px-5 py-3 border-b border-border flex items-center justify-between">
          <span className="text-xs font-bold text-text-muted uppercase tracking-wider">Ausstehende Anträge ({PENDING.length})</span>
          <Button size="sm" variant="ghost">Alle anzeigen</Button>
        </div>
        <table className="w-full border-collapse text-[13px]">
          <thead>
            <tr>
              {["Antragsteller", "Lizenztyp", "Verein", "Eingangsdatum", "Wartezeit", "Priorität", ""].map(h => (
                <th key={h} className="text-[11px] font-semibold text-text-muted uppercase tracking-wide px-4 py-2.5 text-left border-b border-border">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {PENDING.map((a, i) => (
              <tr key={i} className="hover:bg-s2">
                <td className="px-4 py-2.5 border-b border-border font-semibold">{a.name}</td>
                <td className="px-4 py-2.5 border-b border-border text-text-dim">{a.typ}</td>
                <td className="px-4 py-2.5 border-b border-border text-text-dim">{a.verein}</td>
                <td className="px-4 py-2.5 border-b border-border text-text-muted text-[12px]">{a.datum}</td>
                <td className="px-4 py-2.5 border-b border-border">
                  <span className={a.tage > 10 ? "text-red font-semibold" : a.tage > 7 ? "text-orange" : "text-text-dim"}>{a.tage} Tage</span>
                </td>
                <td className="px-4 py-2.5 border-b border-border">
                  <Badge color={prioColors[a.prio]}>{a.prio === "ueberfaellig" ? "Überfällig" : a.prio.charAt(0).toUpperCase() + a.prio.slice(1)}</Badge>
                </td>
                <td className="px-4 py-2.5 border-b border-border">
                  <div className="flex gap-1">
                    <Button size="sm">Prüfen</Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
