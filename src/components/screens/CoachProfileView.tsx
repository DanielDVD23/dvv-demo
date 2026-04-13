"use client";

import { useState, useMemo } from "react";
import Badge from "@/components/ui/Badge";
import PlayerSelector from "@/components/stats/PlayerSelector";
import {
  ownClub,
  opponentClub,
  allPlayers,
  ownPlayers,
  getPlayerProfile,
} from "@/components/stats/mockData";

interface CoachProfileViewProps {
  matchId: string;
}

export default function CoachProfileView({ matchId: _matchId }: CoachProfileViewProps) {
  const [selectedPlayerId, setSelectedPlayerId] = useState(ownPlayers[0].playerId);

  const profile = useMemo(
    () => getPlayerProfile(selectedPlayerId),
    [selectedPlayerId],
  );

  const features = profile.features;

  // SVG dimensions
  const svgW = 700;
  const svgH = 280;
  const marginLeft = 50;
  const marginRight = 20;
  const marginTop = 20;
  const marginBottom = 70;
  const plotW = svgW - marginLeft - marginRight;
  const plotH = svgH - marginTop - marginBottom;

  const minVal = -3;
  const maxVal = 4;
  const range = maxVal - minVal;
  const zeroY = marginTop + (maxVal / range) * plotH;

  const barW = 32;
  const gap = 8;
  const totalBarsWidth = features.length * barW + (features.length - 1) * gap;
  const startX = marginLeft + (plotW - totalBarsWidth) / 2;

  // Gridline values
  const gridValues = [-3, -2, -1, 0, 1, 2, 3, 4];

  return (
    <div>
      {/* Player Selector */}
      <PlayerSelector
        players={allPlayers}
        selectedPlayerId={selectedPlayerId}
        onSelect={setSelectedPlayerId}
        ownClubName={ownClub.name}
        opponentName={opponentClub.name}
      />

      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-5 flex-wrap">
        <div className="flex items-center gap-3">
          <div>
            <h3 className="text-[15px] font-bold text-text mb-1">
              {profile.name}
            </h3>
            <div className="flex items-center gap-2">
              <Badge color="purple">Rang #{profile.rank}</Badge>
              <Badge color="gray">
                Score: {profile.overallScore.toFixed(1)}
              </Badge>
            </div>
          </div>
        </div>
        <div className="text-[11px] text-text-muted text-right">
          Profil: Gesamt &middot; Liga-Vergleich 1. BL
        </div>
      </div>

      {/* SVG diverging bar chart */}
      <div className="overflow-x-auto">
        <svg
          viewBox={`0 0 ${svgW} ${svgH}`}
          className="w-full"
          style={{ maxWidth: svgW, minWidth: 500 }}
        >
          {/* Gridlines */}
          {gridValues.map((v) => {
            const y = marginTop + ((maxVal - v) / range) * plotH;
            return (
              <g key={v}>
                <line
                  x1={marginLeft}
                  y1={y}
                  x2={svgW - marginRight}
                  y2={y}
                  stroke="var(--color-border)"
                  strokeWidth={v === 0 ? 1.5 : 0.5}
                  strokeDasharray={v === 0 ? "0" : "4 3"}
                />
                <text
                  x={marginLeft - 8}
                  y={y + 4}
                  textAnchor="end"
                  fontSize="10"
                  fill="var(--color-text-muted)"
                >
                  {v > 0 ? `+${v}` : v}
                </text>
              </g>
            );
          })}

          {/* Bars */}
          {features.map((f, i) => {
            const x = startX + i * (barW + gap);
            const isPositive = f.value >= 0;
            const barHeight =
              (Math.abs(f.value) / range) * plotH;
            const barY = isPositive ? zeroY - barHeight : zeroY;

            const fillColor = isPositive
              ? `rgba(124,58,237,${0.3 + (f.value / 3) * 0.6})`
              : `rgba(26,20,64,${0.25 + (Math.abs(f.value) / 3) * 0.45})`;

            const labelText = isPositive
              ? `+${f.value.toFixed(1)}`
              : f.value.toFixed(1);
            const labelY = isPositive ? barY - 6 : barY + barHeight + 14;
            const labelColor = isPositive
              ? "var(--color-accent)"
              : "var(--color-text-dim)";

            return (
              <g key={f.key}>
                <rect
                  x={x}
                  y={barY}
                  width={barW}
                  height={Math.max(2, barHeight)}
                  rx="4"
                  fill={fillColor}
                />
                <text
                  x={x + barW / 2}
                  y={labelY}
                  textAnchor="middle"
                  fontSize="10"
                  fontWeight="600"
                  fill={labelColor}
                >
                  {labelText}
                </text>
                {/* X-axis label */}
                <text
                  x={x + barW / 2}
                  y={svgH - marginBottom + 16}
                  textAnchor="end"
                  fontSize="10"
                  fill="var(--color-text-muted)"
                  transform={`rotate(-40 ${x + barW / 2} ${svgH - marginBottom + 16})`}
                >
                  {f.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-6 justify-center mt-3">
        <div className="flex items-center gap-2">
          <span
            className="w-3 h-3 rounded-sm"
            style={{ background: "rgba(124,58,237,0.6)" }}
          />
          <span className="text-[11px] text-text-muted">
            {"\u00DC"}berdurchschnittlich
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span
            className="w-3 h-3 rounded-sm"
            style={{ background: "rgba(26,20,64,0.45)" }}
          />
          <span className="text-[11px] text-text-muted">
            Unterdurchschnittlich
          </span>
        </div>
      </div>
    </div>
  );
}
