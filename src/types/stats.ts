// Volleyball statistics types — shared across Player and Coach dashboards.
// Modeled on DVV/FIVB KPIs; structures intentionally match the prompt spec.

export type Position = "Außenangreifer" | "Zuspieler" | "Mittelblocker" | "Diagonal" | "Libero";

export interface PlayerRef {
  playerId: string;
  name: string;
  number: number;
  position: Position;
  isOwnTeam?: boolean;
}

// ── KPI tables ─────────────────────────────────────────────

export interface PlayerKPI {
  label: string;
  subLabel: string;
  matchAbsolute: number | string;
  matchPercentile: number;          // 0-100
  seasonAbsolute?: number | string;
  seasonPercentile?: number;
  trend?: {
    direction: "up" | "down" | "stable";
    changePercent: number;
    last5Values: number[];
  };
}

// ── Z-Score profile ────────────────────────────────────────

export interface PlayerFeature {
  key: string;
  label: string;
  value: number;                    // z-score, -3..+4
  trend?: "improving" | "declining" | "stable";
  improvementPct?: number;
}

export interface PlayerProfile {
  playerId: string;
  name: string;
  rank: number;
  overallScore: number;
  features: PlayerFeature[];
  seasonGamesPlayed: number;
  lastUpdated: string;
}

// ── Field zones (heatmap) ──────────────────────────────────

export interface ZoneData {
  z1: number; z2: number; z3: number;
  z4: number; z5: number; z6: number;
  pipe: number;
}

export interface ActionType {
  id: "attack" | "serve" | "reception" | "block";
  label: string;
}

export interface ZonesViewData {
  matchId: string;
  homeTeam: { name: string; short: string };
  awayTeam: { name: string; short: string };
  actionTypes: ActionType[];
  data: Record<string, { home: ZoneData; away: ZoneData }>;
}

// ── Season metrics (4 cards) ───────────────────────────────

export type LevelTier = "Top" | "High" | "Average" | "Below Avg" | "Low";

export interface SeasonMetric {
  id: string;
  title: string;
  subtitle: string;
  iconName: string;                 // Lucide icon name
  teamValue: number;
  teamRank: number;
  teamLevel: LevelTier;
  opponentAvgValue: number;
  opponentRank: number;
  opponentLevel: LevelTier;
  trendLast5?: number[];
}

export interface SeasonViewData {
  clubName: string;
  clubShort: string;
  season: string;
  matchdays: number;
  totalTeams: number;
  metrics: SeasonMetric[];
  leagueTeams: { short: string; name: string }[];
}

// ── Game performance (scatter / line) ──────────────────────

export interface GamePerformance {
  matchId: string;
  matchDate: string;
  matchday?: number;
  opponentShort: string;
  opponentName: string;
  opponentStrength?: number;        // 0-100, used by Coach scatter
  performanceScore: number;         // 0-100
  impectScore?: number;
  result: "W" | "L";
  setResult: string;                // "3:1"
  highlightStat?: { label: string; value: string };
  notPlayed?: boolean;
}

// ── Match selector (Coach shell) ───────────────────────────

export interface MatchSummary {
  matchId: string;
  date: string;
  matchday: number;
  homeTeam: { name: string; short: string; isOwnClub: boolean };
  awayTeam: { name: string; short: string; isOwnClub: boolean };
  score?: { home: number; away: number };
  sets?: string[];
  isLive?: boolean;
}
