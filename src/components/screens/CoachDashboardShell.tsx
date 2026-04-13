"use client";

import { useState, useMemo } from "react";
import Icon from "@/components/ui/Icon";
import { ownClub, coachMatches } from "@/components/stats/mockData";
import CoachKPIView from "@/components/screens/CoachKPIView";
import CoachZonesView from "@/components/screens/CoachZonesView";
import CoachProfileView from "@/components/screens/CoachProfileView";
import CoachSeasonView from "@/components/screens/CoachSeasonView";
import CoachOpponentView from "@/components/screens/CoachOpponentView";

type TabId = "kpi" | "zones" | "profile" | "season" | "opponent";

interface CoachDashboardShellProps {
  initialTab?: TabId;
  initialMatchId?: string;
}

const tabs: { id: TabId; label: string; icon: string }[] = [
  { id: "kpi", label: "Spieler KPIs", icon: "bar-chart" },
  { id: "zones", label: "Feldzonen", icon: "grid" },
  { id: "profile", label: "Spielerprofil", icon: "user" },
  { id: "season", label: "Saison", icon: "trophy" },
  { id: "opponent", label: "Gegner-Level", icon: "zap" },
];

const SEASON_AVG_ID = "__season_avg__";

export default function CoachDashboardShell({
  initialTab = "kpi",
  initialMatchId,
}: CoachDashboardShellProps) {
  const [activeTab, setActiveTab] = useState<TabId>(initialTab);
  const [selectedMatchId, setSelectedMatchId] = useState(
    initialMatchId ?? coachMatches[0]?.matchId ?? SEASON_AVG_ID,
  );
  const [selectorOpen, setSelectorOpen] = useState(false);

  const currentIdx = useMemo(
    () => coachMatches.findIndex((m) => m.matchId === selectedMatchId),
    [selectedMatchId],
  );
  const currentMatch = currentIdx >= 0 ? coachMatches[currentIdx] : null;
  const isSeasonAvg = selectedMatchId === SEASON_AVG_ID;
  const isLive = currentMatch?.isLive ?? false;

  const stepMatch = (dir: -1 | 1) => {
    if (isSeasonAvg) {
      if (dir === -1) setSelectedMatchId(coachMatches[coachMatches.length - 1].matchId);
      else setSelectedMatchId(coachMatches[0].matchId);
      return;
    }
    const next = currentIdx - dir; // matches ordered newest-first
    if (next >= 0 && next < coachMatches.length) {
      setSelectedMatchId(coachMatches[next].matchId);
    } else if (dir === 1 && currentIdx === 0) {
      setSelectedMatchId(SEASON_AVG_ID);
    } else if (dir === -1 && currentIdx === coachMatches.length - 1) {
      setSelectedMatchId(SEASON_AVG_ID);
    }
  };

  const matchLabel = currentMatch
    ? `${currentMatch.homeTeam.short} ${currentMatch.score?.home ?? "-"}:${currentMatch.score?.away ?? "-"} ${currentMatch.awayTeam.short}`
    : "Saison-\u00D8";
  const matchSub = currentMatch
    ? `${currentMatch.date} \u00B7 ${currentMatch.matchday}. Spieltag`
    : "Durchschnitt aller Spieltage";

  return (
    <div className="min-h-screen bg-bg">
      {/* Header */}
      <div className="px-6 pt-6 pb-4">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <div className="w-2 h-7 rounded-sm bg-accent" />
            <div>
              <h1 className="text-[22px] font-bold text-text leading-tight">
                Volleyball Statistiken
              </h1>
              <p className="text-[13px] text-text-muted mt-0.5">
                {ownClub.name} &middot; 1. Bundesliga 25/26
              </p>
            </div>
          </div>

          {/* Match Selector */}
          <div className="relative flex items-center gap-1">
            <button
              onClick={() => stepMatch(-1)}
              className="w-8 h-8 flex items-center justify-center rounded-md bg-s1 border border-border text-text-muted hover:text-text cursor-pointer transition-colors"
              style={{ fontFamily: "inherit" }}
              aria-label="Vorheriges Spiel"
            >
              <Icon name="chevron-left" size={16} />
            </button>

            <button
              onClick={() => setSelectorOpen((o) => !o)}
              className="bg-s1 border border-border rounded-lg px-3.5 py-2 text-left cursor-pointer hover:bg-s2 transition-colors shadow-sm"
              style={{ fontFamily: "inherit", minWidth: 200 }}
            >
              <div className="text-[13px] font-bold text-text tabular-nums">
                {matchLabel}
              </div>
              <div className="text-[11px] text-text-muted mt-0.5">
                {matchSub}
              </div>
            </button>

            <button
              onClick={() => stepMatch(1)}
              className="w-8 h-8 flex items-center justify-center rounded-md bg-s1 border border-border text-text-muted hover:text-text cursor-pointer transition-colors"
              style={{ fontFamily: "inherit" }}
              aria-label="Naechstes Spiel"
            >
              <Icon name="chevron-right" size={16} />
            </button>

            {/* Dropdown */}
            {selectorOpen && (
              <div className="absolute right-0 top-full mt-1 z-50 w-[280px] bg-s1 border border-border rounded-lg shadow-lg overflow-hidden">
                <button
                  onClick={() => {
                    setSelectedMatchId(SEASON_AVG_ID);
                    setSelectorOpen(false);
                  }}
                  className={`w-full text-left px-3.5 py-2.5 text-[12px] cursor-pointer border-0 transition-colors ${
                    isSeasonAvg
                      ? "bg-accent-dim text-accent font-bold"
                      : "text-text-muted hover:bg-s2"
                  }`}
                  style={{ fontFamily: "inherit" }}
                >
                  Saison-{"\u00D8"}
                </button>
                {coachMatches.map((m) => (
                  <button
                    key={m.matchId}
                    onClick={() => {
                      setSelectedMatchId(m.matchId);
                      setSelectorOpen(false);
                    }}
                    className={`w-full text-left px-3.5 py-2.5 border-0 cursor-pointer transition-colors ${
                      selectedMatchId === m.matchId
                        ? "bg-accent-dim text-accent font-bold"
                        : "text-text hover:bg-s2"
                    }`}
                    style={{ fontFamily: "inherit" }}
                  >
                    <div className="text-[12px] font-semibold tabular-nums">
                      {m.homeTeam.short} {m.score?.home ?? "-"}:{m.score?.away ?? "-"}{" "}
                      {m.awayTeam.short}
                    </div>
                    <div className="text-[11px] text-text-muted">
                      {m.date} &middot; {m.matchday}. Spieltag
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-6 mb-4">
        <div className="bg-s1 border border-border rounded-[10px] p-[3px] inline-flex gap-0.5">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-[8px] text-[13px] transition-colors cursor-pointer border-0 ${
                activeTab === tab.id
                  ? "bg-accent-dim text-accent font-bold"
                  : "text-text-muted hover:text-text"
              }`}
              style={{ fontFamily: "inherit" }}
            >
              <Icon name={tab.icon} size={14} />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content area */}
      <div className="px-6 pb-6">
        <div className="bg-s1 rounded-[12px] p-6 shadow-sm border border-border">
          {activeTab === "kpi" && <CoachKPIView matchId={selectedMatchId} />}
          {activeTab === "zones" && <CoachZonesView matchId={selectedMatchId} />}
          {activeTab === "profile" && <CoachProfileView matchId={selectedMatchId} />}
          {activeTab === "season" && <CoachSeasonView />}
          {activeTab === "opponent" && <CoachOpponentView matchId={selectedMatchId} />}
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 pb-6">
        <div className="flex items-center justify-between text-[11px] text-text-dim">
          <span>beauOS &middot; Datenquelle: VBL / SAMS</span>
          {isLive && (
            <span className="flex items-center gap-1.5">
              <span
                className="w-2 h-2 rounded-full bg-accent"
                style={{ animation: "pulse 2s infinite" }}
              />
              <span className="font-semibold text-accent">Live</span>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
