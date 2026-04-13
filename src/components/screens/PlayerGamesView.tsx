"use client";

import { useState, useCallback } from "react";
import Icon from "@/components/ui/Icon";
import { me, getPlayerGames } from "@/components/stats/mockData";
import type { GamePerformance } from "@/types/stats";

const VIEW_BOX_W = 700;
const VIEW_BOX_H = 260;
const MARGIN = { top: 30, right: 50, bottom: 40, left: 40 };
const CHART_W = VIEW_BOX_W - MARGIN.left - MARGIN.right;
const CHART_H = VIEW_BOX_H - MARGIN.top - MARGIN.bottom;

function xScale(i: number, count: number): number {
  return MARGIN.left + (i / Math.max(1, count - 1)) * CHART_W;
}

function yScale(v: number): number {
  return MARGIN.top + CHART_H * (1 - v / 100);
}

export default function PlayerGamesView() {
  const games = getPlayerGames(me.playerId);
  const [tooltip, setTooltip] = useState<{ game: GamePerformance; x: number; y: number } | null>(null);

  const playedGames = games.filter((g) => !g.notPlayed);
  const strongGames = playedGames.filter((g) => g.performanceScore >= 70).length;
  const avgScore = playedGames.length > 0
    ? Math.round(playedGames.reduce((s, g) => s + g.performanceScore, 0) / playedGames.length)
    : 0;

  // Find highest score
  const maxGame = playedGames.reduce<GamePerformance | null>(
    (best, g) => (!best || g.performanceScore > best.performanceScore ? g : best),
    null
  );

  // Build line path segments (skip notPlayed)
  const buildPath = useCallback(() => {
    const segments: string[] = [];
    const dashedSegments: { x1: number; y1: number; x2: number; y2: number }[] = [];
    let lastPlayed: { x: number; y: number } | null = null;

    games.forEach((g, i) => {
      const cx = xScale(i, games.length);
      const cy = g.notPlayed ? yScale(0) : yScale(g.performanceScore);

      if (g.notPlayed) {
        // Close current path, mark dashed
        if (lastPlayed) {
          const nextPlayed = games.slice(i + 1).find((ng) => !ng.notPlayed);
          if (nextPlayed) {
            const ni = games.indexOf(nextPlayed);
            const nx = xScale(ni, games.length);
            const ny = yScale(nextPlayed.performanceScore);
            dashedSegments.push({ x1: lastPlayed.x, y1: lastPlayed.y, x2: nx, y2: ny });
          }
        }
        lastPlayed = null;
      } else {
        if (lastPlayed) {
          segments.push(`L${cx},${cy}`);
        } else {
          segments.push(`M${cx},${cy}`);
        }
        lastPlayed = { x: cx, y: cy };
      }
    });

    return { solidPath: segments.join(" "), dashedSegments };
  }, [games]);

  const { solidPath, dashedSegments } = buildPath();

  const handlePointEnter = (game: GamePerformance, x: number, y: number) => {
    setTooltip({ game, x, y });
  };

  const handlePointLeave = () => {
    setTooltip(null);
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-5">
        <h2 className="text-[18px] font-bold text-text">Deine Spiele</h2>
        <p className="text-[13px] text-text-muted mt-0.5">Leistungsverlauf Saison 25/26</p>
      </div>

      {/* Summary boxes */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        <div className="bg-accent-dim rounded-lg px-4 py-3">
          <div className="flex items-center gap-2 mb-1">
            <Icon name="check" size={16} className="text-accent" />
            <span className="text-[15px] font-bold text-text">{strongGames}</span>
          </div>
          <div className="text-[12px] font-semibold text-text">Starke Spiele</div>
          <div className="text-[11px] text-text-muted">Leistung über 70%</div>
        </div>
        <div className="bg-accent-dim rounded-lg px-4 py-3">
          <div className="flex items-center gap-2 mb-1">
            <Icon name="bar-chart" size={16} className="text-accent" />
            <span className="text-[15px] font-bold text-text">{avgScore}%</span>
          </div>
          <div className="text-[12px] font-semibold text-text">Saison-Durchschnitt</div>
          <div className="text-[11px] text-text-muted">Ø Leistungsindex</div>
        </div>
      </div>

      {/* SVG Line Chart */}
      <div className="relative overflow-x-auto">
        <svg viewBox={`0 0 ${VIEW_BOX_W} ${VIEW_BOX_H}`} className="w-full max-w-[700px]" style={{ fontFamily: "inherit" }}>
          {/* Background bands */}
          <rect x={MARGIN.left} y={yScale(100)} width={CHART_W} height={yScale(70) - yScale(100)} fill="rgba(124,58,237,0.16)" />
          <rect x={MARGIN.left} y={yScale(70)} width={CHART_W} height={yScale(30) - yScale(70)} fill="rgba(124,58,237,0.08)" />
          <rect x={MARGIN.left} y={yScale(30)} width={CHART_W} height={yScale(0) - yScale(30)} fill="rgba(124,58,237,0.04)" />

          {/* Y-axis labels */}
          {[0, 25, 50, 75, 100].map((v) => (
            <g key={v}>
              <line
                x1={MARGIN.left}
                y1={yScale(v)}
                x2={VIEW_BOX_W - MARGIN.right}
                y2={yScale(v)}
                stroke="rgba(100,116,139,0.12)"
                strokeWidth={0.5}
              />
              <text x={MARGIN.left - 6} y={yScale(v) + 3} textAnchor="end" fontSize={9} fill="rgba(100,116,139,0.5)">
                {v}
              </text>
            </g>
          ))}

          {/* Average dashed line */}
          <line
            x1={MARGIN.left}
            y1={yScale(avgScore)}
            x2={VIEW_BOX_W - MARGIN.right}
            y2={yScale(avgScore)}
            stroke="rgba(124,58,237,0.4)"
            strokeWidth={1}
            strokeDasharray="4 3"
          />
          <text
            x={VIEW_BOX_W - MARGIN.right + 4}
            y={yScale(avgScore) + 3}
            fontSize={9}
            fontWeight={600}
            fill="#7c3aed"
          >
            Ø {avgScore}%
          </text>

          {/* Dashed segments for not-played gaps */}
          {dashedSegments.map((seg, i) => (
            <line
              key={`dash-${i}`}
              x1={seg.x1}
              y1={seg.y1}
              x2={seg.x2}
              y2={seg.y2}
              stroke="rgba(124,58,237,0.3)"
              strokeWidth={2}
              strokeDasharray="4 3"
            />
          ))}

          {/* Solid line */}
          <path d={solidPath} fill="none" stroke="#7c3aed" strokeWidth={2} />

          {/* Data points + labels */}
          {games.map((g, i) => {
            const cx = xScale(i, games.length);
            const cy = g.notPlayed ? yScale(0) : yScale(g.performanceScore);

            return (
              <g key={g.matchId}>
                {/* X-axis label */}
                <text
                  x={cx}
                  y={VIEW_BOX_H - MARGIN.bottom + 18}
                  textAnchor="middle"
                  fontSize={9}
                  fill="rgba(100,116,139,0.6)"
                >
                  {g.matchDate}
                </text>

                {g.notPlayed ? (
                  /* Not played marker */
                  <text
                    x={cx}
                    y={yScale(50)}
                    textAnchor="middle"
                    fontSize={8}
                    fill="rgba(100,116,139,0.5)"
                  >
                    Nicht im Einsatz
                  </text>
                ) : (
                  <>
                    {/* Point */}
                    <circle
                      cx={cx}
                      cy={cy}
                      r={6}
                      fill={`rgba(124,58,237,${0.3 + (g.performanceScore / 100) * 0.7})`}
                      stroke="white"
                      strokeWidth={1.5}
                      onMouseEnter={() => handlePointEnter(g, cx, cy)}
                      onMouseLeave={handlePointLeave}
                      style={{ cursor: "pointer" }}
                    />

                    {/* Star on highest */}
                    {maxGame && g.matchId === maxGame.matchId && (
                      <g transform={`translate(${cx - 6}, ${cy - 20})`}>
                        <polygon
                          points="6,0 7.5,4 12,4.5 8.5,7.5 9.5,12 6,9.5 2.5,12 3.5,7.5 0,4.5 4.5,4"
                          fill="#7c3aed"
                          stroke="none"
                        />
                      </g>
                    )}
                  </>
                )}
              </g>
            );
          })}
        </svg>

        {/* Tooltip */}
        {tooltip && (
          <div
            className="absolute bg-s1 border border-border rounded-lg shadow-md px-3 py-2 text-[12px] pointer-events-none z-10"
            style={{
              left: `${(tooltip.x / VIEW_BOX_W) * 100}%`,
              top: `${(tooltip.y / VIEW_BOX_H) * 100 - 16}%`,
              transform: "translate(-50%, -100%)",
            }}
          >
            <div className="font-semibold text-text">
              {tooltip.game.matchDate} vs. {tooltip.game.opponentName}
            </div>
            <div className="text-text-muted">
              {tooltip.game.result === "W" ? "Sieg" : "Niederlage"} ({tooltip.game.setResult})
            </div>
            {tooltip.game.highlightStat && (
              <div className="text-accent italic mt-0.5">{tooltip.game.highlightStat.value}</div>
            )}
          </div>
        )}
      </div>

      {/* Last 5 games card list */}
      <div className="mt-5">
        <h3 className="text-[13px] font-bold text-text mb-2">Letzte 5 Spiele</h3>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {games
            .filter((g) => !g.notPlayed)
            .slice(-5)
            .reverse()
            .map((g) => (
              <div
                key={g.matchId}
                className="shrink-0 bg-s1 border border-border rounded-lg px-3 py-2.5"
                style={{ minWidth: 140 }}
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="text-[13px] font-bold text-text">{g.opponentShort}</span>
                  <span
                    className="inline-flex items-center justify-center rounded px-1.5 py-0.5 text-[10px] font-bold text-white"
                    style={{
                      background: g.result === "W" ? "#7c3aed" : "var(--color-topbar, #1e1b4b)",
                    }}
                  >
                    {g.result}
                  </span>
                </div>
                <div className="text-[11px] text-text-dim mb-1">{g.matchDate}</div>
                {g.highlightStat && (
                  <div className="text-[11px] text-text-muted italic mb-1">{g.highlightStat.value}</div>
                )}
                <div className="flex items-center gap-1.5">
                  <div className="h-1.5 rounded-full" style={{ width: 40, background: "rgba(124,58,237,0.15)" }}>
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${g.performanceScore}%`,
                        background: `rgba(124,58,237,${0.3 + (g.performanceScore / 100) * 0.7})`,
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
