"use client";

import { useState } from "react";
import Icon from "@/components/ui/Icon";
import { me } from "@/components/stats/mockData";
import PlayerKPIView from "@/components/screens/PlayerKPIView";
import PlayerProfileView from "@/components/screens/PlayerProfileView";
import PlayerGamesView from "@/components/screens/PlayerGamesView";

type TabId = "kpi" | "profile" | "games";

interface PlayerDashboardShellProps {
  initialTab?: TabId;
}

const tabs: { id: TabId; label: string; icon: string }[] = [
  { id: "kpi", label: "Meine KPIs", icon: "bar-chart" },
  { id: "profile", label: "Mein Profil", icon: "user" },
  { id: "games", label: "Meine Spiele", icon: "zap" },
];

export default function PlayerDashboardShell({ initialTab = "kpi" }: PlayerDashboardShellProps) {
  const [activeTab, setActiveTab] = useState<TabId>(initialTab);

  const lastName = me.name.split(" ").slice(-1)[0];

  return (
    <div className="min-h-screen bg-bg">
      {/* Header */}
      <div className="px-6 pt-6 pb-4">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <div className="w-2 h-7 rounded-sm bg-accent" />
            <div>
              <h1 className="text-[22px] font-bold text-text leading-tight">Meine Statistiken</h1>
              <p className="text-[13px] text-text-muted mt-0.5">
                {me.firstName} {lastName} · #{me.number} · {me.position}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-s1 border border-border rounded-lg px-3.5 py-2 text-[12px] text-text-dim">
            <Icon name="shield" size={14} className="text-accent" />
            <span className="font-semibold text-text">{me.clubName}</span>
            <span className="text-text-muted">·</span>
            <span>{me.leagueName}</span>
            <span className="text-text-muted">·</span>
            <span>Spieltag {me.currentMatchday}</span>
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
          {activeTab === "kpi" && <PlayerKPIView />}
          {activeTab === "profile" && <PlayerProfileView />}
          {activeTab === "games" && <PlayerGamesView />}
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 pb-6">
        <div className="flex items-center justify-between text-[11px] text-text-dim">
          <span>beauOS · Deine persönliche Leistungsübersicht</span>
          <span className="flex items-center gap-1">
            <Icon name="clock" size={12} />
            Letztes Update: 13. April 2026
          </span>
        </div>
      </div>
    </div>
  );
}
