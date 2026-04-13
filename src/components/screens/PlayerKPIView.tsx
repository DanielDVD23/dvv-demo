"use client";

import { useState } from "react";
import Icon from "@/components/ui/Icon";
import PercentileBar from "@/components/stats/PercentileBar";
import MatchContextBar from "@/components/stats/MatchContextBar";
import EmptyStateStats from "@/components/stats/EmptyStateStats";
import { me, getPlayerKPIs } from "@/components/stats/mockData";

const matchdays = [
  { id: "st18", label: "ST 18 – VfB Friedrichshafen" },
  { id: "st17", label: "ST 17 – SVG Lüneburg" },
  { id: "st16", label: "ST 16 – SWD Düren" },
  { id: "st15", label: "ST 15 – TSV Herrsching" },
  { id: "st14", label: "ST 14 – TV Bühl" },
  { id: "avg", label: "Saison-Ø" },
];

export default function PlayerKPIView() {
  const [selectedMatchday, setSelectedMatchday] = useState("st18");
  const [showEmpty] = useState(false);

  const kpis = getPlayerKPIs(me.playerId, { withTrend: true });

  if (showEmpty) {
    return (
      <EmptyStateStats
        icon="info"
        title="Du warst in diesem Spiel nicht im Einsatz."
        description="Wähle einen anderen Spieltag, um deine Statistiken zu sehen."
      />
    );
  }

  return (
    <div>
      {/* Match context bar */}
      <MatchContextBar
        date="11. April 2026"
        opponent="VfB Friedrichshafen"
        result="3:1"
        matchdays={matchdays}
        selectedMatchdayId={selectedMatchday}
        onChangeMatchday={setSelectedMatchday}
      />

      {/* KPI Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-border">
              <th className="text-[11px] font-semibold text-text-muted uppercase tracking-wide py-2 pr-4">KPI</th>
              <th className="text-[11px] font-semibold text-text-muted uppercase tracking-wide py-2 pr-4 text-right">Wert</th>
              <th className="text-[11px] font-semibold text-text-muted uppercase tracking-wide py-2 pr-4" style={{ minWidth: 200 }}>Einordnung</th>
              <th className="text-[11px] font-semibold text-text-muted uppercase tracking-wide py-2 text-center" style={{ minWidth: 60 }}>Trend</th>
            </tr>
          </thead>
          <tbody>
            {kpis.map((kpi, i) => {
              const trend = kpi.trend;
              const isLow = kpi.matchPercentile < 30;
              const showHint = trend?.direction === "up" && isLow;

              return (
                <tr key={i} className="border-b border-border/50 last:border-b-0">
                  <td className="py-2.5 pr-4">
                    <div className="text-[13px] font-semibold text-text">{kpi.label}</div>
                    <div className="text-[11px] text-text-dim">{kpi.subLabel}</div>
                  </td>
                  <td className="py-2.5 pr-4 text-right">
                    <span className="text-[13px] font-bold text-text tabular-nums">{kpi.matchAbsolute}</span>
                  </td>
                  <td className="py-2.5 pr-4">
                    <PercentileBar value={kpi.matchPercentile} positiveFraming showLabel />
                    {showHint && trend && (
                      <div className="flex items-center gap-1 mt-1 text-[11px] text-accent">
                        <Icon name="arrow-up" size={11} className="text-accent" />
                        <span>Du hast dich um {trend.changePercent}% verbessert — weiter so!</span>
                      </div>
                    )}
                  </td>
                  <td className="py-2.5 text-center">
                    {trend && (
                      <div className="flex items-center justify-center">
                        {trend.direction === "up" && (
                          <Icon name="arrow-up" size={16} className="text-accent" />
                        )}
                        {trend.direction === "down" && (
                          <span className="inline-flex items-center justify-center text-text-muted" style={{ transform: "rotate(180deg)" }}>
                            <Icon name="arrow-up" size={16} />
                          </span>
                        )}
                        {trend.direction === "stable" && (
                          <span className="inline-block w-2 h-2 rounded-full bg-text-muted" />
                        )}
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Footer info bar */}
      <div className="mt-4 bg-accent-dim rounded-lg px-3.5 py-2.5 flex items-center gap-2 text-[11px] text-text-dim">
        <Icon name="info" size={13} className="text-accent shrink-0" />
        <span>
          Deine Leistung im Vergleich zu allen {me.position} der Liga · Letztes Spiel: 11. April 2026
        </span>
      </div>
    </div>
  );
}
