"use client";

import { useState, useMemo } from "react";
import type { PlayerRef } from "@/types/stats";
import Icon from "@/components/ui/Icon";

interface PlayerSelectorProps {
  players: PlayerRef[];
  selectedPlayerId: string;
  onSelect: (id: string) => void;
  ownClubName: string;
  opponentName: string;
  /** Hide the opponent tab (used in PlayerKPI / Coach Opponent view). */
  ownTeamOnly?: boolean;
}

export default function PlayerSelector({
  players,
  selectedPlayerId,
  onSelect,
  ownClubName,
  opponentName,
  ownTeamOnly,
}: PlayerSelectorProps) {
  const [tab, setTab] = useState<"own" | "opp">("own");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const wantOwn = tab === "own" || ownTeamOnly;
    const list = players.filter(p => (wantOwn ? p.isOwnTeam !== false : p.isOwnTeam === false));
    if (!search.trim()) return list;
    const q = search.toLowerCase();
    return list.filter(p => p.name.toLowerCase().includes(q) || String(p.number).includes(q));
  }, [players, tab, search, ownTeamOnly]);

  return (
    <div className="mb-4">
      {!ownTeamOnly && (
        <div className="flex gap-1 mb-3">
          <button
            onClick={() => setTab("own")}
            className={`px-3 py-1.5 rounded-md text-[12px] font-semibold cursor-pointer border-0 transition-colors ${tab === "own" ? "bg-accent-dim text-accent" : "bg-transparent text-text-muted hover:bg-s2"}`}
            style={{ fontFamily: "inherit" }}
          >
            {ownClubName}
          </button>
          <button
            onClick={() => setTab("opp")}
            className={`px-3 py-1.5 rounded-md text-[12px] font-semibold cursor-pointer border-0 transition-colors ${tab === "opp" ? "bg-accent-dim text-accent" : "bg-transparent text-text-muted hover:bg-s2"}`}
            style={{ fontFamily: "inherit" }}
          >
            {opponentName}
          </button>
        </div>
      )}
      <div className="flex items-center gap-2 mb-2">
        <div className="relative flex-1 max-w-[200px]">
          <Icon name="search" size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-text-muted" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Spieler suchen…"
            className="!pl-7 !py-1 !text-[12px] w-full"
          />
        </div>
      </div>
      <div className="flex gap-1.5 overflow-x-auto pb-1">
        {filtered.map(p => {
          const active = p.playerId === selectedPlayerId;
          const isOwn = p.isOwnTeam !== false;
          return (
            <button
              key={p.playerId}
              onClick={() => onSelect(p.playerId)}
              className={`shrink-0 flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[12px] cursor-pointer border transition-all ${active ? "border-accent bg-accent-dim font-bold" : "border-border bg-s1 text-text-muted hover:bg-s2"}`}
              style={{ fontFamily: "inherit" }}
            >
              <span
                className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold text-white shrink-0"
                style={{ background: isOwn ? "var(--color-accent)" : "var(--color-topbar)" }}
              >
                {p.number}
              </span>
              <span className="whitespace-nowrap">{p.name}</span>
            </button>
          );
        })}
        {filtered.length === 0 && (
          <span className="text-[12px] text-text-muted py-2">Keine Spieler gefunden.</span>
        )}
      </div>
    </div>
  );
}
