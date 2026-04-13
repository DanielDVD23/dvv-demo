// Mock dataset for the Volleyball statistics dashboards.
// Centered on BERLIN RECYCLING Volleys (Coach role: Thomas Weber, "TSV Hannover" in roles.ts).
// We use BR Volleys here because it has a real logo and brand colour in our registry.

import type {
  PlayerRef,
  PlayerKPI,
  PlayerProfile,
  ZonesViewData,
  SeasonViewData,
  GamePerformance,
  MatchSummary,
} from "@/types/stats";

// ── Roster: own team + a sample opponent ───────────────────

export const ownClub = { id: "brv", name: "BERLIN RECYCLING Volleys", short: "BRV" };
export const opponentClub = { id: "vfb", name: "VfB Friedrichshafen", short: "VFB" };

export const ownPlayers: PlayerRef[] = [
  { playerId: "brv-18", name: "Patch", number: 18, position: "Außenangreifer", isOwnTeam: true },
  { playerId: "brv-7",  name: "Carle", number: 7,  position: "Mittelblocker", isOwnTeam: true },
  { playerId: "brv-11", name: "Grankin", number: 11, position: "Zuspieler",  isOwnTeam: true },
  { playerId: "brv-6",  name: "Semeniuk", number: 6, position: "Außenangreifer", isOwnTeam: true },
  { playerId: "brv-22", name: "Reichert", number: 22, position: "Mittelblocker", isOwnTeam: true },
  { playerId: "brv-4",  name: "Schulz", number: 4, position: "Diagonal", isOwnTeam: true },
  { playerId: "brv-9",  name: "Colito", number: 9, position: "Libero", isOwnTeam: true },
  { playerId: "brv-3",  name: "Kaliberda", number: 3, position: "Außenangreifer", isOwnTeam: true },
];

export const opponentPlayers: PlayerRef[] = [
  { playerId: "vfb-14", name: "Kampa", number: 14, position: "Außenangreifer", isOwnTeam: false },
  { playerId: "vfb-8",  name: "Steiner", number: 8, position: "Mittelblocker", isOwnTeam: false },
  { playerId: "vfb-5",  name: "Zenger", number: 5, position: "Zuspieler", isOwnTeam: false },
  { playerId: "vfb-2",  name: "Todua", number: 2, position: "Außenangreifer", isOwnTeam: false },
  { playerId: "vfb-12", name: "Fischer", number: 12, position: "Mittelblocker", isOwnTeam: false },
  { playerId: "vfb-10", name: "Braun", number: 10, position: "Diagonal", isOwnTeam: false },
  { playerId: "vfb-1",  name: "Fuerst", number: 1, position: "Libero", isOwnTeam: false },
];

export const allPlayers = [...ownPlayers, ...opponentPlayers];

// ── Player profile (own user for the Player dashboard) ─────

export const me = {
  playerId: "brv-18",
  name: "Brandon Patch",
  firstName: "Brandon",
  number: 18,
  position: "Außenangreifer" as const,
  clubName: ownClub.name,
  leagueName: "1. Bundesliga 25/26",
  currentMatchday: 18,
};

// ── Per-player KPI tables (match + season) ─────────────────

export function getPlayerKPIs(playerId: string, opts: { withTrend?: boolean; withSeason?: boolean } = {}): PlayerKPI[] {
  // Deterministic but varied per player.
  const seed = hash(playerId);
  const r = (i: number, base = 50, spread = 50) => Math.max(0, Math.min(100, Math.round(base + ((seed + i * 113) % 100) - 50 + spread * 0.1 * Math.sin(i + seed))));

  const isLibero = playerId.endsWith("-9") || playerId.endsWith("-1");

  const baseRows: { label: string; sub: string; matchAbs: number | string }[] = isLibero
    ? [
        { label: "Annahme positiv",   sub: "Reception positive %", matchAbs: "76%" },
        { label: "Annahme perfekt",   sub: "Reception perfect %",  matchAbs: "52%" },
        { label: "Digs",              sub: "Digs",                 matchAbs: 14 },
        { label: "Abwehraktionen",    sub: "Defensive actions",    matchAbs: 22 },
        { label: "Aufschlag-Asse",    sub: "Service aces",         matchAbs: 1 },
        { label: "Aufschlagfehler",   sub: "Service errors",       matchAbs: 2 },
      ]
    : [
        { label: "Punkte gesamt",     sub: "Total points",         matchAbs: 22 },
        { label: "Angriffe gesamt",   sub: "Total attacks",        matchAbs: 38 },
        { label: "Angriff Erfolgsquote", sub: "Attack efficiency",  matchAbs: "52.6%" },
        { label: "Kills",             sub: "Kill attacks",         matchAbs: 18 },
        { label: "Angriffsfehler",    sub: "Attack errors",        matchAbs: 4 },
        { label: "Aufschlag-Asse",    sub: "Service aces",         matchAbs: 5 },
        { label: "Aufschlagfehler",   sub: "Service errors",       matchAbs: 3 },
        { label: "Annahme positiv",   sub: "Reception positive %", matchAbs: "64%" },
        { label: "Blocks",            sub: "Block points",         matchAbs: 2 },
        { label: "Digs",              sub: "Digs",                 matchAbs: 7 },
      ];

  return baseRows.map((row, i): PlayerKPI => {
    const matchPct = r(i + 1);
    const seasonPct = Math.max(5, Math.min(95, Math.round(matchPct * 0.7 + 30 + ((seed >> 4) % 20) - 10)));
    const trendDir: "up" | "down" | "stable" = i % 3 === 0 ? "up" : i % 5 === 0 ? "down" : matchPct > 70 ? "up" : "stable";
    return {
      label: row.label,
      subLabel: row.sub,
      matchAbsolute: row.matchAbs,
      matchPercentile: matchPct,
      seasonAbsolute: opts.withSeason ? row.matchAbs : undefined,
      seasonPercentile: opts.withSeason ? seasonPct : undefined,
      trend: opts.withTrend ? {
        direction: trendDir,
        changePercent: trendDir === "stable" ? 0 : Math.round(((seed + i) % 25) + 2),
        last5Values: Array.from({ length: 5 }, (_, k) => Math.max(5, Math.min(95, matchPct + ((k - 2) * 6) + ((seed + k * 17) % 10) - 5))),
      } : undefined,
    };
  });
}

// ── Z-score profile ────────────────────────────────────────

export function getPlayerProfile(playerId: string, positiveBias = false): PlayerProfile {
  const seed = hash(playerId);
  const features = [
    { key: "serve",        label: "Aufschlag" },
    { key: "attack",       label: "Angriff" },
    { key: "block",        label: "Block-Timing" },
    { key: "reception",    label: "Annahme" },
    { key: "set",          label: "Zuspiel" },
    { key: "defense",      label: "Feldabwehr" },
    { key: "consistency",  label: "Konstanz" },
    { key: "crunch",       label: "Crunch Time" },
    { key: "efficiency",   label: "Effizienz" },
    { key: "speed",        label: "Schnelligkeit" },
  ].map((f, i) => {
    const raw = Math.sin(seed + i * 1.7) * 2.5 + (positiveBias ? 0.6 : 0);
    const value = Math.round(raw * 10) / 10;
    const trend: "improving" | "declining" | "stable" = value < -0.4 && (seed + i) % 2 === 0 ? "improving" : value > 1.5 ? "stable" : (seed + i) % 3 === 0 ? "declining" : "stable";
    return {
      key: f.key,
      label: f.label,
      value,
      trend,
      improvementPct: trend === "improving" ? 8 + ((seed + i * 3) % 18) : undefined,
    };
  });
  const overall = features.reduce((s, f) => s + f.value, 0) / features.length;
  return {
    playerId,
    name: allPlayers.find(p => p.playerId === playerId)?.name ?? playerId,
    rank: 3 + (seed % 9),
    overallScore: Math.round((overall + 2) * 25) / 10,    // -2..+4 → ~0..15
    features,
    seasonGamesPlayed: 14 + (seed % 6),
    lastUpdated: "12. April 2026",
  };
}

// ── Field zones ────────────────────────────────────────────

export const zonesData: ZonesViewData = {
  matchId: "match-2026-04-11-brv-vfb",
  homeTeam: { name: ownClub.name, short: ownClub.short },
  awayTeam: { name: opponentClub.name, short: opponentClub.short },
  actionTypes: [
    { id: "attack",    label: "Angriffe" },
    { id: "serve",     label: "Aufschläge" },
    { id: "reception", label: "Annahme" },
    { id: "block",     label: "Blocks" },
  ],
  data: {
    attack: {
      home: { z1: 9, z2: 18, z3: 14, z4: 22, z5: 6, z6: 4, pipe: 7 },
      away: { z1: 7, z2: 14, z3: 11, z4: 19, z5: 5, z6: 3, pipe: 4 },
    },
    serve: {
      home: { z1: 12, z2: 5, z3: 4, z4: 6, z5: 11, z6: 16, pipe: 0 },
      away: { z1: 14, z2: 6, z3: 5, z4: 7, z5: 9, z6: 14, pipe: 0 },
    },
    reception: {
      home: { z1: 14, z2: 2, z3: 1, z4: 3, z5: 11, z6: 22, pipe: 0 },
      away: { z1: 12, z2: 1, z3: 2, z4: 2, z5: 13, z6: 18, pipe: 0 },
    },
    block: {
      home: { z1: 0, z2: 4, z3: 6, z4: 3, z5: 0, z6: 0, pipe: 0 },
      away: { z1: 0, z2: 2, z3: 5, z4: 3, z5: 0, z6: 0, pipe: 0 },
    },
  },
};

// ── Season metrics ─────────────────────────────────────────

export const seasonViewData: SeasonViewData = {
  clubName: ownClub.name,
  clubShort: ownClub.short,
  season: "25/26",
  matchdays: 18,
  totalTeams: 12,
  metrics: [
    { id: "attack-eff", title: "Angriff Effizienz", subtitle: "Kill-%", iconName: "target",
      teamValue: 52.4, teamRank: 2, teamLevel: "High",
      opponentAvgValue: 41.8, opponentRank: 7, opponentLevel: "Average",
      trendLast5: [48, 50, 49, 53, 52] },
    { id: "serve-pressure", title: "Aufschlag Druck", subtitle: "Ace-Quote", iconName: "zap",
      teamValue: 8.6, teamRank: 1, teamLevel: "Top",
      opponentAvgValue: 5.2, opponentRank: 9, opponentLevel: "Below Avg",
      trendLast5: [7, 8, 9, 9, 9] },
    { id: "block-success", title: "Block-Erfolg", subtitle: "Block Kill %", iconName: "shield-check",
      teamValue: 21.3, teamRank: 3, teamLevel: "High",
      opponentAvgValue: 16.1, opponentRank: 8, opponentLevel: "Average",
      trendLast5: [19, 20, 22, 21, 22] },
    { id: "reception", title: "Annahme Qualität", subtitle: "Reception %", iconName: "activity",
      teamValue: 64.1, teamRank: 4, teamLevel: "High",
      opponentAvgValue: 58.6, opponentRank: 6, opponentLevel: "Average",
      trendLast5: [62, 63, 65, 64, 64] },
  ],
  leagueTeams: [
    { short: "BRV", name: ownClub.name },
    { short: "VFB", name: "VfB Friedrichshafen" },
    { short: "SVG", name: "SVG Lüneburg" },
    { short: "DUE", name: "SWD powervolleys Düren" },
    { short: "GIE", name: "Helios Grizzlys Giesen" },
    { short: "HER", name: "TSV Herrsching" },
    { short: "FRA", name: "United Volleys Frankfurt" },
    { short: "BUE", name: "TV Bühl" },
    { short: "FRE", name: "FT 1844 Freiburg" },
    { short: "WUP", name: "Wuppertal Volleyball" },
    { short: "DAC", name: "ASV Dachau" },
    { short: "HAC", name: "TSV Haching München" },
  ],
};

// ── Per-game performance (line chart for Player, scatter for Coach) ──

export function getPlayerGames(playerId: string): GamePerformance[] {
  const opponents = ["VFB", "SVG", "DUE", "GIE", "HER", "FRA", "BUE", "FRE", "WUP", "DAC", "HAC"];
  const seed = hash(playerId);
  return opponents.map((opp, i): GamePerformance => {
    const score = Math.max(15, Math.min(96, Math.round(55 + 30 * Math.sin(seed + i * 0.9) + ((seed + i * 11) % 14) - 7)));
    const opponentStrength = Math.max(20, Math.min(95, 80 - i * 5 + ((seed + i) % 18) - 9));
    const won = score > 55 && (seed + i) % 3 !== 0;
    const setNum = won ? `3:${(seed + i) % 3}` : `${(seed + i) % 3}:3`;
    const notPlayed = i === 4 && playerId === "brv-3";
    return {
      matchId: `m-${i + 1}`,
      matchDate: `ST${i + 1}`,
      matchday: i + 1,
      opponentShort: opp,
      opponentName: seasonViewData.leagueTeams.find(t => t.short === opp)?.name ?? opp,
      opponentStrength,
      performanceScore: notPlayed ? 0 : score,
      impectScore: notPlayed ? 0 : score - 4,
      result: won ? "W" : "L",
      setResult: setNum,
      highlightStat: i % 3 === 0 ? { label: "Meiste Asse", value: `${3 + (i % 4)} Asse` } : undefined,
      notPlayed,
    };
  });
}

// ── Coach match selector ───────────────────────────────────

export const coachMatches: MatchSummary[] = [
  { matchId: "m-18", date: "Sa. 11.04.", matchday: 18,
    homeTeam: { name: ownClub.name, short: ownClub.short, isOwnClub: true },
    awayTeam: { name: opponentClub.name, short: opponentClub.short, isOwnClub: false },
    score: { home: 3, away: 1 }, sets: ["25:22", "20:25", "25:19", "25:22"] },
  { matchId: "m-17", date: "Mi. 08.04.", matchday: 17,
    homeTeam: { name: "SVG Lüneburg", short: "SVG", isOwnClub: false },
    awayTeam: { name: ownClub.name, short: ownClub.short, isOwnClub: true },
    score: { home: 1, away: 3 }, sets: ["21:25", "25:23", "20:25", "18:25"] },
  { matchId: "m-16", date: "Sa. 04.04.", matchday: 16,
    homeTeam: { name: ownClub.name, short: ownClub.short, isOwnClub: true },
    awayTeam: { name: "SWD powervolleys Düren", short: "DUE", isOwnClub: false },
    score: { home: 3, away: 0 }, sets: ["25:18", "25:21", "25:19"] },
  { matchId: "m-15", date: "Mi. 01.04.", matchday: 15,
    homeTeam: { name: "TSV Herrsching", short: "HER", isOwnClub: false },
    awayTeam: { name: ownClub.name, short: ownClub.short, isOwnClub: true },
    score: { home: 2, away: 3 }, sets: ["19:25", "25:22", "25:23", "21:25", "12:15"] },
  { matchId: "m-14", date: "Sa. 28.03.", matchday: 14,
    homeTeam: { name: ownClub.name, short: ownClub.short, isOwnClub: true },
    awayTeam: { name: "TV Bühl", short: "BUE", isOwnClub: false },
    score: { home: 3, away: 2 }, sets: ["25:23", "23:25", "25:21", "21:25", "15:11"] },
];

// ── Helpers ────────────────────────────────────────────────

function hash(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}
