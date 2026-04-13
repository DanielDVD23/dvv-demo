"use client";

import { useState, useMemo } from "react";
import Icon from "@/components/ui/Icon";
import { zonesData, ownClub, opponentClub } from "@/components/stats/mockData";
import type { ActionType, ZoneData } from "@/types/stats";

interface CoachZonesViewProps {
  matchId: string;
}

/** Zone layout for a volleyball court (viewBox 360x500).
 *  Front row: Z4 left, Z3 mid, Z2 right.
 *  Back row:  Z5 left, Z6 mid, Z1 right. */
const ZONES: { key: keyof ZoneData; label: string; x: number; y: number; w: number; h: number; row: "front" | "back" }[] = [
  { key: "z4", label: "Z4", x: 20,  y: 30,  w: 100, h: 190, row: "front" },
  { key: "z3", label: "Z3", x: 130, y: 30,  w: 100, h: 190, row: "front" },
  { key: "z2", label: "Z2", x: 240, y: 30,  w: 100, h: 190, row: "front" },
  { key: "z5", label: "Z5", x: 20,  y: 280, w: 100, h: 190, row: "back" },
  { key: "z6", label: "Z6", x: 130, y: 280, w: 100, h: 190, row: "back" },
  { key: "z1", label: "Z1", x: 240, y: 280, w: 100, h: 190, row: "back" },
];

function Court({
  data,
  actionType,
  teamName,
  compact,
}: {
  data: ZoneData;
  actionType: ActionType["id"];
  teamName: string;
  compact?: boolean;
}) {
  const values = ZONES.map((z) => data[z.key]);
  const maxValue = Math.max(...values, 1);
  const isBlock = actionType === "block";

  const w = compact ? 280 : 360;
  const vb = `0 0 360 500`;

  return (
    <div className={compact ? "w-full max-w-[280px]" : "w-full max-w-[360px]"}>
      <svg viewBox={vb} className="w-full" style={{ maxWidth: w }}>
        {/* Court outline */}
        <rect
          x="10"
          y="10"
          width="340"
          height="480"
          rx="8"
          fill="rgba(124,58,237,0.06)"
          stroke="rgba(124,58,237,0.25)"
          strokeWidth="1.5"
        />

        {/* Net line */}
        <line
          x1="10"
          y1="250"
          x2="350"
          y2="250"
          stroke="rgba(124,58,237,0.5)"
          strokeWidth="2"
          strokeDasharray="6 4"
        />
        <text
          x="180"
          y="265"
          textAnchor="middle"
          fontSize="10"
          fill="rgba(124,58,237,0.6)"
          fontWeight="600"
        >
          NETZ
        </text>

        {/* Zones */}
        {ZONES.map((zone) => {
          const val = data[zone.key];
          const dimmed = isBlock && zone.row === "back";
          const opacity = dimmed ? 0.04 : 0.12 + (val / maxValue) * 0.7;
          return (
            <g key={zone.key}>
              <rect
                x={zone.x}
                y={zone.y}
                width={zone.w}
                height={zone.h}
                rx="4"
                fill={`rgba(124,58,237,${opacity})`}
                stroke="rgba(124,58,237,0.15)"
                strokeWidth="1"
              />
              <text
                x={zone.x + zone.w / 2}
                y={zone.y + zone.h / 2 - 4}
                textAnchor="middle"
                fontSize="22"
                fontWeight="bold"
                fill={dimmed ? "rgba(124,58,237,0.2)" : "var(--color-text)"}
              >
                {dimmed ? "-" : val}
              </text>
              <text
                x={zone.x + zone.w / 2}
                y={zone.y + zone.h / 2 + 14}
                textAnchor="middle"
                fontSize="9"
                fill="var(--color-text-muted)"
              >
                {zone.label}
              </text>
            </g>
          );
        })}

        {/* Pipe indicator */}
        {actionType === "attack" && data.pipe > 0 && (
          <g>
            <rect
              x="152"
              y="234"
              width="56"
              height="22"
              rx="11"
              fill="var(--color-accent)"
            />
            <text
              x="180"
              y="249"
              textAnchor="middle"
              fontSize="11"
              fontWeight="bold"
              fill="white"
            >
              Pipe: {data.pipe}
            </text>
          </g>
        )}
      </svg>
      <div className="text-center mt-1">
        <span className="text-[11px] text-text-muted">
          {teamName} &middot; Angriffsrichtung{" "}
          <span style={{ fontSize: 13 }}>{"\u2191"}</span>
        </span>
      </div>
    </div>
  );
}

export default function CoachZonesView({ matchId: _matchId }: CoachZonesViewProps) {
  const [actionType, setActionType] = useState<ActionType["id"]>("attack");
  const [teamSide, setTeamSide] = useState<"home" | "away">("home");
  const [compareMode, setCompareMode] = useState(false);

  const actionData = zonesData.data[actionType];
  const currentData = actionData ? actionData[teamSide] : zonesData.data.attack.home;
  const otherSide = teamSide === "home" ? "away" : "home";
  const otherData = actionData ? actionData[otherSide] : zonesData.data.attack.away;

  const teamName =
    teamSide === "home" ? zonesData.homeTeam.name : zonesData.awayTeam.name;
  const otherTeamName =
    otherSide === "home" ? zonesData.homeTeam.name : zonesData.awayTeam.name;

  // Gradient bar colors
  const gradStops = useMemo(
    () => [
      { offset: "0%", color: "rgba(124,58,237,0.2)" },
      { offset: "100%", color: "rgba(124,58,237,1)" },
    ],
    [],
  );

  return (
    <div>
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-4 flex-wrap">
        <div>
          <h3 className="text-[15px] font-bold text-text">
            Feldzonen-Analyse
          </h3>
          <p className="text-[12px] text-text-muted mt-0.5">
            Verteilung der Aktionen pro Zone
          </p>
        </div>
        <div className="flex items-center gap-2">
          {/* Team toggle */}
          <div className="bg-s2 border border-border rounded-[8px] p-[2px] inline-flex">
            <button
              onClick={() => setTeamSide("home")}
              className={`px-3 py-1 rounded-[6px] text-[12px] font-semibold cursor-pointer border-0 transition-colors ${
                teamSide === "home"
                  ? "bg-accent-dim text-accent"
                  : "text-text-muted hover:text-text"
              }`}
              style={{ fontFamily: "inherit" }}
            >
              {zonesData.homeTeam.short}
            </button>
            <button
              onClick={() => setTeamSide("away")}
              className={`px-3 py-1 rounded-[6px] text-[12px] font-semibold cursor-pointer border-0 transition-colors ${
                teamSide === "away"
                  ? "bg-accent-dim text-accent"
                  : "text-text-muted hover:text-text"
              }`}
              style={{ fontFamily: "inherit" }}
            >
              {zonesData.awayTeam.short}
            </button>
          </div>
        </div>
      </div>

      {/* Action-type segmented control */}
      <div className="flex items-center gap-2 mb-5 flex-wrap">
        <div className="bg-s2 border border-border rounded-[8px] p-[2px] inline-flex gap-0.5">
          {zonesData.actionTypes.map((at) => (
            <button
              key={at.id}
              onClick={() => setActionType(at.id)}
              className={`px-3 py-1.5 rounded-[6px] text-[12px] font-semibold cursor-pointer border-0 transition-colors ${
                actionType === at.id
                  ? "bg-accent-dim text-accent"
                  : "text-text-muted hover:text-text"
              }`}
              style={{ fontFamily: "inherit" }}
            >
              {at.label}
            </button>
          ))}
        </div>

        <button
          onClick={() => setCompareMode((v) => !v)}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[12px] font-semibold cursor-pointer border transition-colors ${
            compareMode
              ? "bg-accent-dim text-accent border-accent"
              : "bg-s1 text-text-muted border-border hover:bg-s2"
          }`}
          style={{ fontFamily: "inherit" }}
        >
          <Icon name="arrow-right" size={13} />
          Vergleich
        </button>
      </div>

      {/* Court(s) */}
      {compareMode ? (
        <div className="flex gap-6 flex-wrap justify-center">
          <Court
            data={currentData}
            actionType={actionType}
            teamName={teamName}
            compact
          />
          <Court
            data={otherData}
            actionType={actionType}
            teamName={otherTeamName}
            compact
          />
        </div>
      ) : (
        <div className="flex justify-center">
          <Court
            data={currentData}
            actionType={actionType}
            teamName={teamName}
          />
        </div>
      )}

      {/* Legend */}
      <div className="flex items-center justify-center gap-3 mt-4">
        <span className="text-[11px] text-text-muted">Wenig</span>
        <svg width="120" height="10">
          <defs>
            <linearGradient id="zone-grad">
              {gradStops.map((s) => (
                <stop key={s.offset} offset={s.offset} stopColor={s.color} />
              ))}
            </linearGradient>
          </defs>
          <rect width="120" height="10" rx="5" fill="url(#zone-grad)" />
        </svg>
        <span className="text-[11px] text-text-muted">Viel</span>
      </div>
    </div>
  );
}
