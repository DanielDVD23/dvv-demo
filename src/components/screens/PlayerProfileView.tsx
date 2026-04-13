"use client";

import Icon from "@/components/ui/Icon";
import Badge from "@/components/ui/Badge";
import { me, getPlayerProfile } from "@/components/stats/mockData";
import type { PlayerFeature } from "@/types/stats";

const VIEW_BOX_W = 700;
const VIEW_BOX_H = 280;
const MARGIN = { top: 40, right: 20, bottom: 70, left: 40 };
const CHART_W = VIEW_BOX_W - MARGIN.left - MARGIN.right;
const CHART_H = VIEW_BOX_H - MARGIN.top - MARGIN.bottom;
const Y_MIN = -3;
const Y_MAX = 4;
const Y_RANGE = Y_MAX - Y_MIN;

function yScale(v: number): number {
  return MARGIN.top + CHART_H * (1 - (v - Y_MIN) / Y_RANGE);
}

function barColor(feature: PlayerFeature): string {
  if (feature.value >= 0) {
    const intensity = Math.min(1, feature.value / 3);
    const opacity = 0.3 + intensity * 0.6;
    return `rgba(124,58,237,${opacity})`;
  }
  return "rgba(124,58,237,0.35)";
}

export default function PlayerProfileView() {
  const profile = getPlayerProfile(me.playerId, true);
  const features = profile.features;
  const barW = 32;
  const gap = 8;
  const totalBarsW = features.length * barW + (features.length - 1) * gap;
  const startX = MARGIN.left + (CHART_W - totalBarsW) / 2;

  const zeroY = yScale(0);
  const gridLines = [-3, -2, -1, 0, 1, 2, 3, 4];

  // Improving features with value < -0.5
  const improvingNegative = features
    .filter((f) => f.value < -0.5 && f.trend === "improving")
    .sort((a, b) => (b.improvementPct ?? 0) - (a.improvementPct ?? 0))
    .slice(0, 2);

  return (
    <div>
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-5 flex-wrap">
        <div>
          <h2 className="text-[18px] font-bold text-text">Dein Profil</h2>
          <p className="text-[13px] text-text-muted mt-0.5">Stärken & Entwicklungsfelder · Saison 25/26</p>
        </div>
        <Badge color="purple">
          <Icon name="calendar" size={12} />
          Basierend auf {profile.seasonGamesPlayed} Spielen
        </Badge>
      </div>

      {/* SVG Chart */}
      <div className="overflow-x-auto">
        <svg viewBox={`0 0 ${VIEW_BOX_W} ${VIEW_BOX_H}`} className="w-full max-w-[700px]" style={{ fontFamily: "inherit" }}>
          {/* Grid lines */}
          {gridLines.map((v) => {
            const y = yScale(v);
            return (
              <g key={v}>
                <line
                  x1={MARGIN.left}
                  y1={y}
                  x2={VIEW_BOX_W - MARGIN.right}
                  y2={y}
                  stroke={v === 0 ? "rgba(124,58,237,0.3)" : "rgba(100,116,139,0.12)"}
                  strokeWidth={v === 0 ? 1 : 0.5}
                />
                <text x={MARGIN.left - 6} y={y + 3} textAnchor="end" fontSize={9} fill="rgba(100,116,139,0.5)">
                  {v > 0 ? `+${v}` : v}
                </text>
              </g>
            );
          })}

          {/* Bars */}
          {features.map((f, i) => {
            const cx = startX + i * (barW + gap);
            const isPositive = f.value >= 0;
            const barTop = isPositive ? yScale(f.value) : zeroY;
            const barBottom = isPositive ? zeroY : yScale(f.value);
            const barHeight = Math.max(2, barBottom - barTop);

            return (
              <g key={f.key}>
                {/* Bar */}
                <rect
                  x={cx}
                  y={barTop}
                  width={barW}
                  height={barHeight}
                  rx={4}
                  fill={barColor(f)}
                />

                {/* Value label */}
                {isPositive ? (
                  <text
                    x={cx + barW / 2}
                    y={barTop - 6}
                    textAnchor="middle"
                    fontSize={10}
                    fontWeight={600}
                    fill="#7c3aed"
                  >
                    +{f.value.toFixed(1)}
                  </text>
                ) : (
                  <text
                    x={cx + barW / 2}
                    y={barBottom + 12}
                    textAnchor="middle"
                    fontSize={10}
                    fill="rgba(100,116,139,0.5)"
                  >
                    &#9679;
                  </text>
                )}

                {/* Strength badge for value > 2.0 */}
                {f.value > 2.0 && (
                  <g>
                    <rect
                      x={cx + barW / 2 - 18}
                      y={barTop - 24}
                      width={36}
                      height={14}
                      rx={7}
                      fill="#7c3aed"
                    />
                    <text
                      x={cx + barW / 2}
                      y={barTop - 14}
                      textAnchor="middle"
                      fontSize={8}
                      fontWeight={700}
                      fill="white"
                    >
                      Stärke
                    </text>
                  </g>
                )}

                {/* Improving trend icon for negative bars */}
                {!isPositive && f.trend === "improving" && (
                  <g transform={`translate(${cx + barW + 2}, ${barBottom - 6})`} opacity={0.6}>
                    <line x1={3} y1={8} x2={3} y2={0} stroke="#7c3aed" strokeWidth={1.5} />
                    <polyline points="0,4 3,0 6,4" fill="none" stroke="#7c3aed" strokeWidth={1.5} />
                  </g>
                )}

                {/* X-axis label (rotated) */}
                <text
                  x={cx + barW / 2}
                  y={MARGIN.top + CHART_H + 10}
                  textAnchor="start"
                  fontSize={10}
                  fill="rgba(100,116,139,0.7)"
                  transform={`rotate(40, ${cx + barW / 2}, ${MARGIN.top + CHART_H + 10})`}
                >
                  {f.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Entwicklungsfeld Info Box */}
      {improvingNegative.length > 0 && (
        <div
          className="mt-4 rounded-lg px-3 py-3"
          style={{
            background: "var(--color-accent-dim, rgba(124,58,237,0.08))",
            border: "1px solid rgba(124,58,237,0.2)",
          }}
        >
          {improvingNegative.map((f) => (
            <div key={f.key} className="flex items-center gap-2 text-[12px] text-text mb-1 last:mb-0">
              <Icon name="arrow-up" size={13} className="text-accent" />
              <span>
                Positive Entwicklung bei <span className="font-semibold">{f.label}</span>: +{f.improvementPct}% in den letzten 5 Spielen
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Legend */}
      <div className="flex items-center gap-4 mt-4 text-[11px] text-text-muted">
        <span className="flex items-center gap-1.5">
          <span className="inline-block w-3 h-3 rounded-sm" style={{ background: "rgba(124,58,237,0.7)" }} />
          Stärken
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block w-3 h-3 rounded-sm" style={{ background: "rgba(124,58,237,0.35)" }} />
          Entwicklungsfelder
        </span>
      </div>
    </div>
  );
}
