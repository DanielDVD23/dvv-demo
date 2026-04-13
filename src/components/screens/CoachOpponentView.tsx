"use client";

import { useState, useMemo } from "react";
import Icon from "@/components/ui/Icon";
import PlayerSelector from "@/components/stats/PlayerSelector";
import {
  ownClub,
  opponentClub,
  ownPlayers,
  allPlayers,
  getPlayerGames,
} from "@/components/stats/mockData";

interface CoachOpponentViewProps {
  matchId: string;
}

type HomeAwayFilter = "all" | "home" | "away";
type RangeFilter = "season" | "last10" | "rueckrunde";

/** X-axis bands for opponent strength. */
const BANDS: { label: string; min: number; max: number; opacity: number }[] = [
  { label: "Low",      min: 0,  max: 20, opacity: 0.04 },
  { label: "Average",  min: 20, max: 40, opacity: 0.08 },
  { label: "Elevated", min: 40, max: 60, opacity: 0.14 },
  { label: "High",     min: 60, max: 80, opacity: 0.22 },
  { label: "Top",      min: 80, max: 100, opacity: 0.32 },
];

export default function CoachOpponentView({ matchId: _matchId }: CoachOpponentViewProps) {
  const [selectedPlayerId, setSelectedPlayerId] = useState(ownPlayers[0].playerId);
  const [haFilter, setHaFilter] = useState<HomeAwayFilter>("all");
  const [rangeFilter, setRangeFilter] = useState<RangeFilter>("season");

  const games = useMemo(
    () => getPlayerGames(selectedPlayerId),
    [selectedPlayerId],
  );

  // Summary counts
  const topCount = games.filter(
    (g) => !g.notPlayed && g.performanceScore >= 80,
  ).length;
  const avgCount = games.filter(
    (g) => !g.notPlayed && g.performanceScore >= 20 && g.performanceScore < 80,
  ).length;
  const lowCount = games.filter(
    (g) => !g.notPlayed && g.performanceScore < 20,
  ).length;

  // SVG scatter plot dimensions
  const svgW = 600;
  const svgH = 320;
  const ml = 45;
  const mr = 20;
  const mt = 20;
  const mb = 40;
  const plotW = svgW - ml - mr;
  const plotH = svgH - mt - mb;

  const xScale = (v: number) => ml + (v / 100) * plotW;
  const yScale = (v: number) => mt + ((100 - v) / 100) * plotH;

  return (
    <div>
      {/* Player Selector */}
      <PlayerSelector
        players={allPlayers.filter((p) => p.isOwnTeam !== false)}
        selectedPlayerId={selectedPlayerId}
        onSelect={setSelectedPlayerId}
        ownClubName={ownClub.name}
        opponentName={opponentClub.name}
        ownTeamOnly
      />

      {/* Header */}
      <div className="mb-4">
        <h3 className="text-[15px] font-bold text-text">
          Spielleistungen nach Gegner-Level
        </h3>
        <p className="text-[12px] text-text-muted mt-0.5">
          Leistungsindex: besser als X% auf dieser Position
        </p>
      </div>

      {/* Summary boxes */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        <div className="bg-accent-dim border border-[rgba(124,58,237,0.2)] rounded-lg px-3.5 py-3 flex items-center gap-3">
          <Icon
            name="arrow-up"
            size={18}
            className="text-accent"
          />
          <div>
            <div className="text-[20px] font-bold text-text tabular-nums">
              {topCount}
            </div>
            <div className="text-[11px] text-text-muted">
              Top Level {">"}80%
            </div>
          </div>
        </div>
        <div
          className="bg-accent-dim border border-[rgba(124,58,237,0.2)] rounded-lg px-3.5 py-3 flex items-center gap-3"
          style={{ opacity: 0.75 }}
        >
          <Icon
            name="circle"
            size={18}
            className="text-accent"

          />
          <div>
            <div className="text-[20px] font-bold text-text tabular-nums">
              {avgCount}
            </div>
            <div className="text-[11px] text-text-muted">Average 20-80%</div>
          </div>
        </div>
        <div
          className="bg-accent-dim border border-[rgba(124,58,237,0.2)] rounded-lg px-3.5 py-3 flex items-center gap-3"
          style={{ opacity: 0.55 }}
        >
          <span style={{ transform: "rotate(180deg)", display: "inline-flex" }}>
            <Icon name="arrow-up" size={18} className="text-accent" />
          </span>
          <div>
            <div className="text-[20px] font-bold text-text tabular-nums">
              {lowCount}
            </div>
            <div className="text-[11px] text-text-muted">
              Low Level {"<"}20%
            </div>
          </div>
        </div>
      </div>

      {/* Filter chips */}
      <div className="flex items-center gap-3 mb-4 flex-wrap">
        <div className="bg-s2 border border-border rounded-[8px] p-[2px] inline-flex gap-0.5">
          {(["all", "home", "away"] as HomeAwayFilter[]).map((f) => (
            <button
              key={f}
              onClick={() => setHaFilter(f)}
              className={`px-3 py-1 rounded-[6px] text-[12px] font-semibold cursor-pointer border-0 transition-colors ${
                haFilter === f
                  ? "bg-accent-dim text-accent"
                  : "text-text-muted hover:text-text"
              }`}
              style={{ fontFamily: "inherit" }}
            >
              {f === "all" ? "Alle" : f === "home" ? "Heim" : "Ausw\u00E4rts"}
            </button>
          ))}
        </div>
        <div className="bg-s2 border border-border rounded-[8px] p-[2px] inline-flex gap-0.5">
          {(["season", "last10", "rueckrunde"] as RangeFilter[]).map((f) => (
            <button
              key={f}
              onClick={() => setRangeFilter(f)}
              className={`px-3 py-1 rounded-[6px] text-[12px] font-semibold cursor-pointer border-0 transition-colors ${
                rangeFilter === f
                  ? "bg-accent-dim text-accent"
                  : "text-text-muted hover:text-text"
              }`}
              style={{ fontFamily: "inherit" }}
            >
              {f === "season"
                ? "Saison"
                : f === "last10"
                  ? "Letzte 10"
                  : "R\u00FCckrunde"}
            </button>
          ))}
        </div>
      </div>

      {/* Scatter plot */}
      <div className="overflow-x-auto">
        <svg
          viewBox={`0 0 ${svgW} ${svgH}`}
          className="w-full"
          style={{ maxWidth: svgW, minWidth: 420 }}
        >
          {/* Background bands */}
          {BANDS.map((band) => (
            <g key={band.label}>
              <rect
                x={xScale(band.min)}
                y={mt}
                width={(band.max - band.min) / 100 * plotW}
                height={plotH}
                fill={`rgba(124,58,237,${band.opacity})`}
              />
              <text
                x={xScale((band.min + band.max) / 2)}
                y={svgH - mb + 28}
                textAnchor="middle"
                fontSize="10"
                fill="var(--color-text-muted)"
                fontWeight="600"
              >
                {band.label}
              </text>
            </g>
          ))}

          {/* Gridlines */}
          {[0, 20, 40, 60, 80, 100].map((v) => (
            <line
              key={`gy-${v}`}
              x1={ml}
              y1={yScale(v)}
              x2={svgW - mr}
              y2={yScale(v)}
              stroke="var(--color-border)"
              strokeWidth="0.5"
              strokeDasharray="4 3"
            />
          ))}
          {[0, 20, 40, 60, 80, 100].map((v) => (
            <line
              key={`gx-${v}`}
              x1={xScale(v)}
              y1={mt}
              x2={xScale(v)}
              y2={mt + plotH}
              stroke="var(--color-border)"
              strokeWidth="0.5"
              strokeDasharray="4 3"
            />
          ))}

          {/* Y-axis labels */}
          {[0, 25, 50, 75, 100].map((v) => (
            <text
              key={`yl-${v}`}
              x={ml - 8}
              y={yScale(v) + 4}
              textAnchor="end"
              fontSize="10"
              fill="var(--color-text-muted)"
            >
              {v}%
            </text>
          ))}

          {/* X-axis label */}
          <text
            x={ml + plotW / 2}
            y={svgH - 4}
            textAnchor="middle"
            fontSize="10"
            fill="var(--color-text-muted)"
          >
            Gegner-St{"\u00E4"}rke
          </text>

          {/* Data points */}
          {games.map((g) => {
            const cx = xScale(g.opponentStrength ?? 50);
            const cy = yScale(g.notPlayed ? 50 : g.performanceScore);

            if (g.notPlayed) {
              return (
                <g key={g.matchId}>
                  <circle
                    cx={cx}
                    cy={cy}
                    r={8}
                    fill="none"
                    stroke="var(--color-accent)"
                    strokeWidth={2}
                    opacity={0.4}
                  />
                  <text
                    x={cx}
                    y={cy - 13}
                    textAnchor="middle"
                    fontSize="9"
                    fill="var(--color-text-dim)"
                  >
                    {g.opponentShort}
                  </text>
                  <text
                    x={cx}
                    y={cy + 20}
                    textAnchor="middle"
                    fontSize="8"
                    fill="var(--color-text-dim)"
                    fontStyle="italic"
                  >
                    Nicht im Einsatz
                  </text>
                </g>
              );
            }

            const opacity = 0.3 + (g.performanceScore / 100) * 0.6;
            return (
              <g key={g.matchId}>
                <circle
                  cx={cx}
                  cy={cy}
                  r={8}
                  fill={`rgba(124,58,237,${opacity})`}
                  stroke="white"
                  strokeWidth={2}
                />
                <text
                  x={cx}
                  y={cy - 13}
                  textAnchor="middle"
                  fontSize="9"
                  fontWeight="600"
                  fill="var(--color-text)"
                >
                  {g.opponentShort}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
