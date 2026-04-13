"use client";

import { useState, useMemo } from "react";
import Icon from "@/components/ui/Icon";
import PercentileBar from "@/components/stats/PercentileBar";
import PlayerSelector from "@/components/stats/PlayerSelector";
import {
  ownClub,
  opponentClub,
  allPlayers,
  ownPlayers,
  getPlayerKPIs,
} from "@/components/stats/mockData";

interface CoachKPIViewProps {
  matchId: string;
}

export default function CoachKPIView({ matchId: _matchId }: CoachKPIViewProps) {
  const [selectedPlayerId, setSelectedPlayerId] = useState(ownPlayers[0].playerId);
  const [saisonToggle, setSaisonToggle] = useState(false);

  const kpis = useMemo(
    () => getPlayerKPIs(selectedPlayerId, { withSeason: saisonToggle }),
    [selectedPlayerId, saisonToggle],
  );

  const selectedPlayer = allPlayers.find((p) => p.playerId === selectedPlayerId);

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

      {/* Toggle */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[15px] font-bold text-text">
          KPI-Tabelle: {selectedPlayer?.name ?? ""}
        </h3>
        <button
          onClick={() => setSaisonToggle((v) => !v)}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[12px] font-semibold cursor-pointer border transition-colors ${
            saisonToggle
              ? "bg-accent-dim text-accent border-accent"
              : "bg-s1 text-text-muted border-border hover:bg-s2"
          }`}
          style={{ fontFamily: "inherit" }}
        >
          <Icon name="activity" size={13} />
          Saison-{"\u00D8"} anzeigen
        </button>
      </div>

      {/* KPI Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-border">
              <th className="text-[11px] font-semibold text-text-muted uppercase tracking-wide py-2 pr-4">
                KPI
              </th>
              <th className="text-[11px] font-semibold text-text-muted uppercase tracking-wide py-2 pr-4 text-right">
                Absolut (Spiel)
              </th>
              <th
                className="text-[11px] font-semibold text-text-muted uppercase tracking-wide py-2 pr-4"
                style={{ minWidth: 180 }}
              >
                Besser als (Spiel)
              </th>
              {saisonToggle && (
                <>
                  <th className="text-[11px] font-semibold text-text-muted uppercase tracking-wide py-2 pr-4 text-right">
                    Absolut (Saison-{"\u00D8"})
                  </th>
                  <th
                    className="text-[11px] font-semibold text-text-muted uppercase tracking-wide py-2"
                    style={{ minWidth: 180 }}
                  >
                    Besser als (Saison-{"\u00D8"})
                  </th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {kpis.map((kpi, i) => (
              <tr
                key={i}
                className={`border-b border-border/50 last:border-b-0 ${
                  i % 2 === 1 ? "bg-s2" : ""
                }`}
              >
                <td className="py-2.5 pr-4">
                  <div className="text-[13px] font-semibold text-text">
                    {kpi.label}
                  </div>
                  <div className="text-[11px] text-text-dim">{kpi.subLabel}</div>
                </td>
                <td className="py-2.5 pr-4 text-right">
                  <span className="text-[13px] font-bold text-text tabular-nums">
                    {kpi.matchAbsolute}
                  </span>
                </td>
                <td className="py-2.5 pr-4">
                  <PercentileBar value={kpi.matchPercentile} showLabel />
                </td>
                {saisonToggle && (
                  <>
                    <td className="py-2.5 pr-4 text-right">
                      <span className="text-[13px] font-bold text-text tabular-nums">
                        {kpi.seasonAbsolute ?? "-"}
                      </span>
                    </td>
                    <td className="py-2.5">
                      <PercentileBar
                        value={kpi.seasonPercentile ?? 0}
                        showLabel
                      />
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer info */}
      <div className="mt-4 bg-accent-dim rounded-lg px-3.5 py-2.5 flex items-center gap-2 text-[11px] text-text-dim">
        <Icon name="info" size={13} className="text-accent shrink-0" />
        <span>
          Vergleichsbasis: 1. Bundesliga 25/26 &middot;{" "}
          {selectedPlayer?.position ?? "Position"} &middot; Stichtag: 11. April
          2026
        </span>
      </div>
    </div>
  );
}
