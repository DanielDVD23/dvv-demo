"use client";

import Icon from "@/components/ui/Icon";
import Badge from "@/components/ui/Badge";
import ClubLogo from "@/components/ui/ClubLogo";
import LevelBadge from "@/components/stats/LevelBadge";
import { seasonViewData, ownClub } from "@/components/stats/mockData";

const LEVEL_OPACITY: Record<string, number> = {
  Top: 1,
  High: 0.78,
  Average: 0.55,
  "Below Avg": 0.4,
  Low: 0.28,
};

export default function CoachSeasonView() {
  const {
    season,
    matchdays,
    metrics,
    leagueTeams,
    totalTeams,
    clubShort,
  } = seasonViewData;

  return (
    <div>
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-5 flex-wrap">
        <div>
          <h3 className="text-[15px] font-bold text-text">Saison-Analyse</h3>
          <p className="text-[12px] text-text-muted mt-0.5">
            Wie ist die Gesamtleistung?
          </p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <Badge color="purple">1. Bundesliga</Badge>
          <Badge color="gray">
            <span className="flex items-center gap-1">
              <Icon name="calendar" size={11} />
              Saison {season}
            </span>
          </Badge>
          <Badge color="gray">
            <span className="flex items-center gap-1">
              <Icon name="settings" size={11} />
              {matchdays} Spieltage
            </span>
          </Badge>
        </div>
      </div>

      {/* Team Ribbon */}
      <div className="flex gap-3 overflow-x-auto pb-3 mb-5">
        {leagueTeams.map((team) => {
          const isOwn = team.short === clubShort;
          return (
            <div
              key={team.short}
              className={`shrink-0 flex flex-col items-center gap-1.5 px-2 py-1.5 rounded-lg transition-opacity ${
                isOwn ? "border-2 border-accent opacity-100" : "border-2 border-transparent opacity-60"
              }`}
            >
              <ClubLogo name={team.name} size={36} />
              <span className="text-[10px] font-semibold text-text-muted">
                {team.short}
              </span>
            </div>
          );
        })}
      </div>

      {/* Metric Cards Grid */}
      <div
        className="grid gap-4"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}
      >
        {metrics.map((m) => {
          const teamProgress =
            ((totalTeams - m.teamRank) / totalTeams) * 100;
          const oppProgress =
            ((totalTeams - m.opponentRank) / totalTeams) * 100;
          const teamOpacity = LEVEL_OPACITY[m.teamLevel] ?? 0.55;
          const sparkline = m.trendLast5;

          return (
            <div
              key={m.id}
              className="bg-s1 border border-border rounded-[10px] overflow-hidden"
            >
              {/* Card header */}
              <div className="bg-accent-dim px-3.5 py-2.5 flex items-center gap-2">
                <Icon
                  name={m.iconName}
                  size={15}
                  className="text-accent"
                />
                <div>
                  <div className="text-[13px] font-bold text-text">
                    {m.title}
                  </div>
                  <div className="text-[10px] text-text-muted">
                    {m.subtitle}
                  </div>
                </div>
              </div>

              {/* Team section */}
              <div className="px-3.5 py-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[24px] font-bold text-text tabular-nums">
                      {m.teamValue}
                    </span>
                    <ClubLogo name={ownClub.name} size={32} />
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <LevelBadge level={m.teamLevel} />
                    <span className="text-[10px] text-text-muted">
                      Rang {m.teamRank} / {totalTeams}
                    </span>
                  </div>
                </div>
                {/* Progress bar */}
                <div className="h-1.5 rounded-full bg-s3 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${Math.max(3, teamProgress)}%`,
                      background: `rgba(124,58,237,${teamOpacity})`,
                    }}
                  />
                </div>
              </div>

              {/* Opponent section */}
              <div className="bg-s2 px-3.5 py-3 border-t border-border">
                <div className="text-[9px] uppercase tracking-wide font-semibold text-text-muted mb-1.5">
                  Gegner-{"\u00D8"} gegen {clubShort}
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[20px] font-bold text-text-dim tabular-nums">
                    {m.opponentAvgValue}
                  </span>
                  <div className="flex flex-col items-end gap-1">
                    <LevelBadge level={m.opponentLevel} />
                    <span className="text-[10px] text-text-muted">
                      Rang {m.opponentRank} / {totalTeams}
                    </span>
                  </div>
                </div>
                <div className="h-1.5 rounded-full bg-s3 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${Math.max(3, oppProgress)}%`,
                      background: "rgba(26,20,64,0.5)",
                    }}
                  />
                </div>
              </div>

              {/* Optional sparkline */}
              {sparkline && sparkline.length > 1 && (
                <div className="px-3.5 py-2 border-t border-border">
                  <svg
                    viewBox={`0 0 ${(sparkline.length - 1) * 20} 40`}
                    className="w-full"
                    style={{ height: 40 }}
                  >
                    {(() => {
                      const min = Math.min(...sparkline);
                      const max = Math.max(...sparkline);
                      const r = max - min || 1;
                      const points = sparkline
                        .map(
                          (v, i) =>
                            `${i * 20},${40 - ((v - min) / r) * 36 - 2}`,
                        )
                        .join(" ");
                      return (
                        <polyline
                          points={points}
                          fill="none"
                          stroke="var(--color-accent)"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      );
                    })()}
                  </svg>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
