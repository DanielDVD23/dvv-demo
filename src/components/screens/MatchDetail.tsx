"use client";

import { useState } from "react";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import ClubLogo from "@/components/ui/ClubLogo";
import { clubColor, clubColorDark } from "@/lib/clubLogos";

// ============================================================
// DATA
// ============================================================

const match = {
  competition: "1. Bundesliga", round: "Viertelfinale · Spiel 1",
  date: "Mi., 8. April, 19:30", venue: "Max-Schmeling-Halle", city: "Berlin",
  referee: "M. Weber / T. Klein", attendance: 4312, capacity: 8500,
  status: "Beendet", duration: "1:52 Std.",
  home: { name: "BR Volleys", short: "BRV" },
  away: { name: "VfB Friedrichshafen", short: "VFB" },
  sets: { home: 3, away: 1 },
  setScores: [{ home: 25, away: 21 }, { home: 23, away: 25 }, { home: 25, away: 19 }, { home: 25, away: 22 }],
};

const allStats = [
  { label: "Sideout-Rate", home: 62, away: 48, fmt: "%", higherBetter: true },
  { label: "Angriffs-Effizienz", home: 52, away: 41, fmt: "%", higherBetter: true },
  { label: "Kills", home: 58, away: 47, higherBetter: true },
  { label: "Aces", home: 7, away: 4, higherBetter: true },
  { label: "Blocks", home: 11, away: 8, higherBetter: true },
  { label: "Digs", home: 34, away: 28, higherBetter: true },
  { label: "Annahme positiv", home: 64, away: 51, fmt: "%", higherBetter: true },
  { label: "Aufschlagfehler", home: 5, away: 9, higherBetter: false },
  { label: "Angriffsfehler", home: 8, away: 14, higherBetter: false },
  { label: "Fehler gesamt", home: 19, away: 26, higherBetter: false },
];

const events = [
  { set: 1, score: "4-1", type: "ace", team: "home", player: "Patch" },
  { set: 1, score: "8-3", type: "block", team: "home", player: "Carle / Patch" },
  { set: 1, score: "14-7", type: "timeout", team: "away" },
  { set: 1, score: "18-10", type: "sub", team: "away", playerIn: "Berger", playerOut: "Todua" },
  { set: 1, score: "20-13", type: "challenge", team: "home", detail: "erfolgreich" },
  { set: 1, score: "24-20", type: "ace", team: "away", player: "Kampa" },
  { set: 2, score: "5-6", type: "timeout", team: "home" },
  { set: 2, score: "11-12", type: "timeout", team: "home" },
  { set: 2, score: "14-14", type: "ace", team: "away", player: "Kampa" },
  { set: 2, score: "17-17", type: "sub", team: "home", playerIn: "Kaliberda", playerOut: "Semeniuk" },
  { set: 2, score: "22-23", type: "timeout", team: "home" },
  { set: 2, score: "23-25", type: "block", team: "away", player: "Steiner / Zenger" },
  { set: 3, score: "4-0", type: "ace", team: "home", player: "Grankin" },
  { set: 3, score: "7-1", type: "ace", team: "home", player: "Patch" },
  { set: 3, score: "12-3", type: "timeout", team: "away" },
  { set: 3, score: "18-6", type: "block", team: "home", player: "Carle" },
  { set: 3, score: "25-19", type: "ace", team: "home", player: "Semeniuk" },
  { set: 4, score: "7-4", type: "block", team: "home", player: "Carle / Grankin" },
  { set: 4, score: "11-6", type: "timeout", team: "away" },
  { set: 4, score: "19-11", type: "sub", team: "home", playerIn: "Kaliberda", playerOut: "Semeniuk" },
  { set: 4, score: "22-14", type: "ace", team: "home", player: "Patch" },
  { set: 4, score: "24-21", type: "challenge", team: "away", detail: "abgelehnt" },
  { set: 4, score: "25-22", type: "matchball", team: "home" },
];

const pointFlow: Record<number, number[][]> = {
  1: [[1,0],[1,1],[2,1],[3,1],[4,1],[4,2],[5,2],[6,2],[6,3],[7,3],[8,3],[8,4],[9,4],[9,5],[10,5],[10,6],[11,6],[12,6],[12,7],[13,7],[14,7],[14,8],[15,8],[15,9],[16,9],[16,10],[17,10],[18,10],[18,11],[19,11],[20,11],[20,12],[20,13],[21,13],[21,14],[22,14],[22,15],[23,15],[23,16],[24,16],[24,17],[24,18],[24,19],[24,20],[25,20],[25,21]],
  2: [[0,1],[1,1],[1,2],[2,2],[3,2],[3,3],[4,3],[4,4],[5,4],[5,5],[5,6],[6,6],[7,6],[7,7],[8,7],[8,8],[9,8],[9,9],[10,9],[10,10],[11,10],[11,11],[11,12],[12,12],[13,12],[13,13],[14,13],[14,14],[15,14],[15,15],[16,15],[16,16],[17,16],[17,17],[18,17],[18,18],[19,18],[19,19],[20,19],[20,20],[21,20],[21,21],[22,21],[22,22],[22,23],[23,23],[23,24],[23,25]],
  3: [[1,0],[2,0],[3,0],[4,0],[4,1],[5,1],[6,1],[7,1],[7,2],[8,2],[9,2],[9,3],[10,3],[11,3],[12,3],[12,4],[13,4],[14,4],[15,4],[15,5],[16,5],[17,5],[18,5],[18,6],[19,6],[19,7],[20,7],[20,8],[21,8],[21,9],[22,9],[22,10],[23,10],[23,11],[24,11],[24,12],[24,13],[24,14],[24,15],[25,15],[25,16],[25,17],[25,18],[25,19]],
  4: [[1,0],[1,1],[2,1],[3,1],[3,2],[4,2],[5,2],[5,3],[6,3],[7,3],[7,4],[8,4],[9,4],[9,5],[10,5],[11,5],[11,6],[12,6],[12,7],[13,7],[14,7],[14,8],[15,8],[16,8],[16,9],[17,9],[17,10],[18,10],[19,10],[19,11],[20,11],[20,12],[21,12],[21,13],[22,13],[22,14],[23,14],[23,15],[24,15],[24,16],[24,17],[24,18],[25,18],[25,19],[25,20],[25,21],[25,22]],
};

const players = {
  home: {
    coach: "Cedric Enard",
    starting: [
      { num: 18, name: "Patch", pos: "AA", zone: 4, pts: 22, eff: 58, rating: 8.7 },
      { num: 7, name: "Carle", pos: "MB", zone: 3, pts: 14, eff: 61, rating: 8.2 },
      { num: 11, name: "Grankin", pos: "Z", zone: 2, pts: 5, eff: null, rating: 7.8 },
      { num: 6, name: "Semeniuk", pos: "AA", zone: 1, pts: 12, eff: 45, rating: 7.4 },
      { num: 22, name: "Reichert", pos: "MB", zone: 6, pts: 8, eff: 50, rating: 7.1 },
      { num: 4, name: "Schulz", pos: "DA", zone: 5, pts: 2, eff: 33, rating: 6.6 },
    ],
    libero: { num: 9, name: "Colito", pos: "L", rating: 7.6 },
    bench: [
      { num: 3, name: "Kaliberda", pos: "AA", rating: 6.9, subIn: "S2 17:17" },
      { num: 14, name: "Bohme", pos: "Z", rating: null },
    ],
  },
  away: {
    coach: "Michael Warm",
    starting: [
      { num: 14, name: "Kampa", pos: "AA", zone: 4, pts: 16, eff: 44, rating: 7.5 },
      { num: 8, name: "Steiner", pos: "MB", zone: 3, pts: 10, eff: 52, rating: 7.2 },
      { num: 5, name: "Zenger", pos: "Z", zone: 2, pts: 4, eff: null, rating: 6.5 },
      { num: 2, name: "Todua", pos: "AA", zone: 1, pts: 11, eff: 38, rating: 6.8 },
      { num: 12, name: "Fischer", pos: "MB", zone: 6, pts: 5, eff: 42, rating: 6.3 },
      { num: 10, name: "Braun", pos: "DA", zone: 5, pts: 3, eff: 31, rating: 5.9 },
    ],
    libero: { num: 1, name: "Fuerst", pos: "L", rating: 7.0 },
    bench: [
      { num: 15, name: "Berger", pos: "AA", rating: 5.6, subIn: "S1 18:10" },
      { num: 20, name: "Hartmann", pos: "Z", rating: null },
    ],
  },
};

const insights = [
  { team: "home", text: "BR Volleys haben in dieser Saison alle 7 Heimspiele gewonnen." },
  { team: "home", text: "Patch hat in den letzten 3 Spielen 64 Punkte erzielt." },
  { team: "away", text: "VfB Friedrichshafen hat auswärts nur 2 von 7 Spielen gewonnen." },
  { team: "home", text: "BR Volleys hatten in Satz 3 eine Effizienz von 68%." },
];

const recentForm = {
  home: [{ vs: "Luneburg", score: "3-0", won: true },{ vs: "Duren", score: "3-1", won: true },{ vs: "Friedrichshafen", score: "2-3", won: false },{ vs: "Herrsching", score: "3-0", won: true },{ vs: "Frankfurt", score: "3-1", won: true }],
  away: [{ vs: "Duren", score: "3-2", won: true },{ vs: "BR Volleys", score: "3-2", won: true },{ vs: "Giesen", score: "1-3", won: false },{ vs: "Luneburg", score: "3-1", won: true },{ vs: "Herrsching", score: "2-3", won: false }],
};

// ============================================================
// HELPERS
// ============================================================

function ratingBadge(r: number | null) {
  if (r === null) return "bg-s2 text-text-muted border-border";
  if (r >= 8.0) return "bg-green-dim text-green border-green/30";
  if (r >= 7.0) return "bg-green-dim text-green border-green/20";
  if (r >= 6.0) return "bg-orange-dim text-orange border-orange/20";
  if (r >= 5.0) return "bg-orange-dim text-orange border-orange/30";
  return "bg-red-dim text-red border-red/30";
}

function eventLabel(e: typeof events[0]) {
  switch (e.type) {
    case "ace": return `Ass ${e.player}`;
    case "block": return `Block ${e.player}`;
    case "timeout": return "Timeout";
    case "sub": return `${e.playerIn} f. ${e.playerOut}`;
    case "challenge": return `Challenge ${e.detail}`;
    case "matchball": return "Matchball!";
    default: return e.type;
  }
}

const eventIcons: Record<string, string> = {
  ace: "target", block: "shield-check", timeout: "clock", sub: "refresh",
  challenge: "search", matchball: "trophy",
};

// ============================================================
// SUB COMPONENTS
// ============================================================

function StatBars({ data, showLink }: { data: typeof allStats; showLink?: boolean }) {
  const homeColor = clubColor(match.home.name);
  const awayColor = clubColor(match.away.name);
  return (
    <Card className="!mb-4">
      <div className="flex items-center justify-between mb-4">
        <span className="text-[11px] font-bold text-text-muted uppercase tracking-wider">Statistiken</span>
        <div className="flex items-center gap-6 text-[12px] font-semibold">
          <span className="flex items-center gap-1.5" style={{ color: homeColor }}><ClubLogo name={match.home.name} size={16} />{match.home.short}</span>
          <span className="flex items-center gap-1.5" style={{ color: awayColor }}>{match.away.short}<ClubLogo name={match.away.name} size={16} /></span>
        </div>
      </div>
      <div className="space-y-4">
        {data.map(s => {
          const total = s.home + s.away || 1;
          const homePct = (s.home / total) * 100;
          const awayPct = (s.away / total) * 100;
          const homeBetter = s.higherBetter ? s.home >= s.away : s.home <= s.away;
          return (
            <div key={s.label}>
              <div className="flex items-center justify-between text-[13px] mb-1.5">
                <span className="font-semibold" style={{ color: homeBetter ? homeColor : undefined }}>{s.home}{s.fmt || ""}</span>
                <span className="text-text-muted text-[12px]">{s.label}</span>
                <span className="font-semibold" style={{ color: !homeBetter ? awayColor : undefined }}>{s.away}{s.fmt || ""}</span>
              </div>
              <div className="flex gap-[3px]">
                <div className="h-[6px] rounded-full flex-1 bg-s3 overflow-hidden flex justify-end">
                  <div className="h-full rounded-full" style={{ width: homePct + "%", background: homeBetter ? homeColor : homeColor + "40" }} />
                </div>
                <div className="h-[6px] rounded-full flex-1 bg-s3 overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: awayPct + "%", background: !homeBetter ? awayColor : awayColor + "40" }} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {showLink && (
        <div className="mt-4 text-center">
          <span className="text-[13px] font-medium text-accent cursor-pointer hover:underline">Alle Statistiken anzeigen</span>
        </div>
      )}
    </Card>
  );
}

function EventsTimeline({ filterSet, maxEvents }: { filterSet?: number; maxEvents?: number }) {
  let filtered = filterSet ? events.filter(e => e.set === filterSet) : events;
  if (maxEvents) filtered = filtered.slice(0, maxEvents);
  const sets = [...new Set(filtered.map(e => e.set))];

  if (filtered.length === 0) {
    return <Card className="!mb-4 text-center !py-12"><div className="text-text-muted text-[13px]">Keine Ereignisse in diesem Satz</div></Card>;
  }

  return (
    <Card className="!mb-4">
      <div className="text-[11px] font-bold text-text-muted uppercase tracking-wider mb-4">Ereignisse</div>
      {sets.map(setNum => (
        <div key={setNum}>
          <div className="flex items-center gap-3 my-3">
            <div className="flex-1 h-px bg-border" />
            <span className="text-[10px] font-bold text-text-muted tracking-widest uppercase">Satz {setNum}</span>
            <div className="flex-1 h-px bg-border" />
          </div>
          {filtered.filter(e => e.set === setNum).map((e, i) => (
            <div key={i} className="flex items-center gap-3 py-2">
              <div className="flex-1 text-right">
                {e.team === "home" && <span className="text-[13px] font-medium" style={{ color: clubColor(match.home.name) }}>{eventLabel(e)}</span>}
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <Icon name={eventIcons[e.type] || "info"} size={14} className="text-text-muted" />
                <span className="font-mono text-[11px] bg-s2 rounded px-1.5 py-0.5 text-text-muted">{e.score}</span>
              </div>
              <div className="flex-1">
                {e.team === "away" && <span className="text-[13px] font-medium" style={{ color: clubColor(match.away.name) }}>{eventLabel(e)}</span>}
              </div>
            </div>
          ))}
        </div>
      ))}
    </Card>
  );
}

function SetPointFlowChart({ setNum }: { setNum: number }) {
  const data = pointFlow[setNum];
  if (!data) return null;
  const maxPts = Math.max(...data.flat()) + 2;
  const w = 560, h = 200, pad = 30;
  const sx = (i: number) => pad + (i / (data.length - 1)) * (w - pad * 2);
  const sy = (v: number) => h - pad - (v / maxPts) * (h - pad * 2);
  const homeLine = data.map((d, i) => `${sx(i)},${sy(d[0])}`).join(" ");
  const awayLine = data.map((d, i) => `${sx(i)},${sy(d[1])}`).join(" ");
  const homeColor = clubColor(match.home.name);
  const awayColor = clubColor(match.away.name);

  return (
    <Card className="!mb-4">
      <div className="text-[11px] font-bold text-text-muted uppercase tracking-wider mb-3">Punktverlauf Satz {setNum}</div>
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full">
        {Array.from({ length: Math.ceil(maxPts / 5) + 1 }).map((_, i) => {
          const v = i * 5; if (v > maxPts) return null;
          return <g key={v}><line x1={pad} y1={sy(v)} x2={w - pad} y2={sy(v)} stroke="#e8e5f0" strokeWidth="0.5" /><text x={pad - 8} y={sy(v) + 4} textAnchor="end" fontSize="9" fill="#94a3b8" fontFamily="monospace">{v}</text></g>;
        })}
        <polyline points={homeLine} fill="none" stroke={homeColor} strokeWidth="2" />
        <polyline points={awayLine} fill="none" stroke={awayColor} strokeWidth="2" />
        <circle cx={sx(data.length - 1)} cy={sy(data[data.length - 1][0])} r="4" fill={homeColor} />
        <circle cx={sx(data.length - 1)} cy={sy(data[data.length - 1][1])} r="4" fill={awayColor} />
        <text x={sx(data.length - 1) + 10} y={sy(data[data.length - 1][0]) + 4} fontSize="11" fontWeight="bold" fill={homeColor}>{data[data.length - 1][0]}</text>
        <text x={sx(data.length - 1) + 10} y={sy(data[data.length - 1][1]) + 4} fontSize="11" fontWeight="bold" fill={awayColor}>{data[data.length - 1][1]}</text>
      </svg>
      <div className="flex justify-center gap-6 mt-2 text-[11px] text-text-muted">
        <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 rounded" style={{ background: homeColor }} /> {match.home.short}</span>
        <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 rounded" style={{ background: awayColor }} /> {match.away.short}</span>
      </div>
    </Card>
  );
}

function CourtView({ team, side, color }: { team: typeof players.home; side: "home" | "away"; color: string }) {
  void side;
  const zones: Record<number, string> = { 4: "left-[18%] top-[28%]", 3: "left-[50%] top-[28%]", 2: "left-[82%] top-[28%]", 1: "left-[82%] top-[72%]", 6: "left-[50%] top-[72%]", 5: "left-[18%] top-[72%]" };
  return (
    <div>
      <div
        className="relative rounded-lg border-2 min-h-[220px]"
        style={{ borderColor: color + "33", background: color + "12" }}
      >
        <div className="absolute left-0 right-0 top-1/2 flex items-center px-4">
          <div className="flex-1 border-t-2 border-dashed" style={{ borderColor: color + "26" }} />
          <span className="px-2 text-[9px] font-bold tracking-widest text-text-dim">NETZ</span>
          <div className="flex-1 border-t-2 border-dashed" style={{ borderColor: color + "26" }} />
        </div>
        {team.starting.map(p => (
          <div key={p.num} className={`absolute -translate-x-1/2 -translate-y-1/2 text-center ${zones[p.zone]}`}>
            <div className={`inline-block text-[11px] font-bold px-1.5 py-0.5 rounded border mb-0.5 ${ratingBadge(p.rating)}`}>{p.rating?.toFixed(1) ?? "-"}</div>
            <div className="text-[11px] font-semibold text-text">#{p.num} {p.name}</div>
            <div className="text-[9px] font-medium text-text-muted">{p.pos}</div>
          </div>
        ))}
      </div>
      {team.libero && (
        <div className="flex items-center gap-2 mt-2 px-3 py-1.5 bg-s2 rounded-md text-[12px]">
          <Icon name="shield" size={12} className="text-text-muted" />
          <span className="text-text-muted">Libero</span>
          <span className="font-semibold">#{team.libero.num} {team.libero.name}</span>
          <span className={`ml-auto text-[11px] font-bold px-1.5 py-0.5 rounded border ${ratingBadge(team.libero.rating)}`}>{team.libero.rating?.toFixed(1) ?? "-"}</span>
        </div>
      )}
    </div>
  );
}

// ============================================================
// MAIN
// ============================================================

export default function MatchDetail() {
  const [tab, setTab] = useState("fakten");
  const [tickerSet, setTickerSet] = useState(0);

  const tabs = [
    { id: "fakten", label: "Fakten", icon: "info" },
    { id: "ticker", label: "Ticker", icon: "volleyball" },
    { id: "aufstellung", label: "Aufstellung", icon: "users" },
    { id: "statistiken", label: "Statistiken", icon: "bar-chart" },
    { id: "h2h", label: "Head-to-Head", icon: "layers" },
  ];

  const attendancePct = Math.round((match.attendance / match.capacity) * 100);
  const homeColor = clubColor(match.home.name);
  const awayColor = clubColor(match.away.name);
  const homeColorDark = clubColorDark(match.home.name);
  const awayColorDark = clubColorDark(match.away.name);

  return (
    <div className="animate-fadeIn">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-2">
        <div>
          <h1 className="text-[22px] font-bold mb-1 flex items-center gap-2 flex-wrap">
            <ClubLogo name={match.home.name} size={26} />
            {match.home.name}
            <span className="text-text-muted font-normal mx-1">vs.</span>
            <ClubLogo name={match.away.name} size={26} />
            {match.away.name}
          </h1>
          <p className="text-[13px] text-text-muted">{match.competition} · {match.round} · {match.date}</p>
        </div>
        <div className="flex gap-2">
          <Badge color="green">{match.status}</Badge>
          <Button variant="ghost"><Icon name="bar-chart" size={14} /> Statistiken</Button>
        </div>
      </div>

      {/* Score Card — dark base with subtle brand-color accents at the edges */}
      <Card className="!mb-4 !p-0 overflow-hidden" borderColor="border-l-accent">
        <div
          className="text-white p-5"
          style={{ background: `linear-gradient(95deg, ${homeColor} 0%, ${homeColorDark} 18%, #15153a 42%, #15153a 58%, ${awayColorDark} 82%, ${awayColor} 100%)` }}
        >
          <div className="flex items-center justify-center gap-8">
            <div className="text-right flex-1 flex items-center justify-end gap-3">
              <div>
                <div className="text-[18px] font-bold">{match.home.name}</div>
                <div className="text-[12px] opacity-60">{match.home.short}</div>
              </div>
              <ClubLogo name={match.home.name} size={56} />
            </div>
            <div className="text-center">
              <div className="text-[42px] font-extrabold tracking-tight leading-none">{match.sets.home} : {match.sets.away}</div>
              <div className="text-[11px] opacity-50 mt-1">{match.duration}</div>
            </div>
            <div className="text-left flex-1 flex items-center gap-3">
              <ClubLogo name={match.away.name} size={56} />
              <div>
                <div className="text-[18px] font-bold">{match.away.name}</div>
                <div className="text-[12px] opacity-60">{match.away.short}</div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center gap-2 mt-4">
            {match.setScores.map((s, i) => (
              <div key={i} className="bg-white/[0.12] rounded-lg px-3 py-1.5 border border-white/10 text-[13px] font-semibold text-center">
                <div className="text-[10px] opacity-50 mb-0.5">S{i + 1}</div>
                <span className={s.home > s.away ? "opacity-100" : "opacity-40"}>{s.home}</span>
                <span className="opacity-40 mx-1">:</span>
                <span className={s.away > s.home ? "opacity-100" : "opacity-40"}>{s.away}</span>
              </div>
            ))}
          </div>
        </div>
        {/* Meta row */}
        <div className="flex items-center justify-center gap-5 px-5 py-3 bg-s2 text-[12px] text-text-muted">
          <span className="flex items-center gap-1"><Icon name="calendar" size={13} /> {match.date}</span>
          <span className="flex items-center gap-1"><Icon name="map" size={13} /> {match.venue}, {match.city}</span>
          <span className="flex items-center gap-1"><Icon name="users" size={13} /> {match.referee}</span>
          <span className="flex items-center gap-1"><Icon name="users" size={13} /> {match.attendance.toLocaleString("de-DE")} / {match.capacity.toLocaleString("de-DE")}</span>
        </div>
      </Card>

      {/* Tab Bar — underline style with icons */}
      <Card className="!mb-4 !p-0 !py-0 overflow-hidden">
        <div className="flex border-b-0">
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 px-5 py-3.5 text-[13px] font-medium transition-colors cursor-pointer border-b-2 ${
                tab === t.id
                  ? "text-accent border-accent bg-accent-dim"
                  : "text-text-muted border-transparent hover:text-text hover:bg-s2"
              }`}
            >
              <Icon name={t.icon} size={15} />
              {t.label}
            </button>
          ))}
        </div>
      </Card>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-4 items-start">
        {/* Main */}
        <div>
          {tab === "fakten" && (
            <>
              <StatBars data={allStats.slice(0, 4)} showLink />
              <EventsTimeline maxEvents={12} />
            </>
          )}
          {tab === "ticker" && (
            <>
              {/* Set filter — segmented control */}
              <div className="inline-flex bg-s2 rounded-lg p-1 mb-4">
                <button
                  onClick={() => setTickerSet(0)}
                  className={`px-3.5 py-1.5 rounded-md text-[12px] font-medium transition-all cursor-pointer ${
                    tickerSet === 0 ? "bg-white text-text shadow-sm" : "text-text-muted hover:text-text"
                  }`}
                >
                  Alle Satze
                </button>
                {match.setScores.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => setTickerSet(i + 1)}
                    className={`px-3.5 py-1.5 rounded-md text-[12px] font-medium transition-all cursor-pointer ${
                      tickerSet === i + 1 ? "bg-white text-text shadow-sm" : "text-text-muted hover:text-text"
                    }`}
                  >
                    S{i + 1} <span className="text-[10px] text-text-dim ml-0.5">{s.home}:{s.away}</span>
                  </button>
                ))}
              </div>
              {tickerSet > 0 && <SetPointFlowChart setNum={tickerSet} />}
              <EventsTimeline filterSet={tickerSet || undefined} />
            </>
          )}
          {tab === "aufstellung" && (
            <>
              <Card className="!mb-4">
                <div className="flex items-center justify-between text-[13px]">
                  <span className="font-semibold flex items-center gap-2" style={{ color: homeColor }}><ClubLogo name={match.home.name} size={20} />Trainer: {players.home.coach}</span>
                  <span className="font-semibold flex items-center gap-2" style={{ color: awayColor }}>Trainer: {players.away.coach}<ClubLogo name={match.away.name} size={20} /></span>
                </div>
              </Card>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <div className="text-[12px] font-bold mb-2 flex items-center gap-2" style={{ color: homeColor }}>
                    <ClubLogo name={match.home.name} size={20} />{match.home.name}
                  </div>
                  <CourtView team={players.home} side="home" color={homeColor} />
                </div>
                <div>
                  <div className="text-[12px] font-bold mb-2 flex items-center gap-2" style={{ color: awayColor }}>
                    <ClubLogo name={match.away.name} size={20} />{match.away.name}
                  </div>
                  <CourtView team={players.away} side="away" color={awayColor} />
                </div>
              </div>
              <Card className="!mb-4">
                <div className="text-[11px] font-bold text-text-muted uppercase tracking-wider mb-3">Ersatzspieler</div>
                <div className="grid grid-cols-2 gap-4">
                  {[players.home.bench, players.away.bench].map((bench, bi) => (
                    <div key={bi} className="space-y-2">
                      {bench.map(p => (
                        <div key={p.num} className="flex items-center gap-2 text-[12px]">
                          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${ratingBadge(p.rating)}`}>{p.rating?.toFixed(1) ?? "-"}</span>
                          <span className="font-medium">#{p.num} {p.name}</span>
                          <span className="text-text-muted">{p.pos}</span>
                          {p.subIn && <span className="ml-auto text-[10px] text-text-muted">{p.subIn}</span>}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </Card>
            </>
          )}
          {tab === "statistiken" && (
            <>
              <div className="flex items-center gap-4 mb-4 text-[14px] font-bold">
                <span className="flex items-center gap-2" style={{ color: homeColor }}><ClubLogo name={match.home.name} size={22} />{match.home.name}</span>
                <span className="text-text-muted">vs.</span>
                <span className="flex items-center gap-2" style={{ color: awayColor }}><ClubLogo name={match.away.name} size={22} />{match.away.name}</span>
              </div>
              <StatBars data={allStats} />
            </>
          )}
          {tab === "h2h" && (
            <>
              <Card className="!mb-4">
                <div className="text-[11px] font-bold text-text-muted uppercase tracking-wider mb-4">Letzte Spiele</div>
                <div className="grid grid-cols-2 gap-6">
                  {(["home", "away"] as const).map(side => {
                    const sideColor = clubColor(match[side].name);
                    return (
                      <div key={side}>
                        <div className="text-[13px] font-bold mb-3 flex items-center gap-2" style={{ color: sideColor }}>
                          <ClubLogo name={match[side].name} size={20} />{match[side].name}
                        </div>
                        <div className="space-y-2">
                          {recentForm[side].map((g, i) => (
                            <div key={i} className="flex items-center justify-between bg-s2 rounded-lg px-3 py-2 text-[13px]">
                              <span className="flex items-center gap-2"><ClubLogo name={g.vs} size={18} />vs. {g.vs}</span>
                              <span className={`font-mono font-bold px-2 py-0.5 rounded text-[12px] ${g.won ? "bg-accent-dim text-accent" : "bg-red-dim text-red"}`}>{g.score}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Card>
            </>
          )}
        </div>

        {/* Sidebar */}
        <div>
          {/* Venue */}
          <Card className="!mb-4">
            <div className="flex items-center gap-2 text-[14px] font-semibold mb-2">
              <Icon name="map" size={16} className="text-text-muted" />
              {match.venue}
            </div>
            <div className="text-[12px] text-text-muted mb-3">{match.city}, Deutschland</div>
            <div className="space-y-2 text-[12px]">
              <div className="flex justify-between"><span className="text-text-muted">Kapazität</span><span className="font-medium">{match.capacity.toLocaleString("de-DE")}</span></div>
              <div className="flex justify-between"><span className="text-text-muted">Zuschauer</span><span className="font-medium">{match.attendance.toLocaleString("de-DE")}</span></div>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-1.5 rounded-full bg-s3 overflow-hidden">
                  <div className={`h-full rounded-full ${attendancePct > 80 ? "bg-accent" : attendancePct > 50 ? "bg-orange" : "bg-red"}`} style={{ width: attendancePct + "%" }} />
                </div>
                <span className="text-[11px] font-medium text-text-muted">{attendancePct}%</span>
              </div>
            </div>
          </Card>

          {/* Competition */}
          <Card className="!mb-4">
            <div className="flex items-center gap-2 text-[13px]">
              <Icon name="volleyball" size={16} className="text-accent" />
              <span className="font-semibold">{match.competition}</span>
            </div>
            <div className="text-[12px] text-text-muted mt-1">{match.round}</div>
          </Card>

          {/* Insights */}
          <Card className="!mb-4">
            <div className="text-[11px] font-bold text-text-muted uppercase tracking-wider mb-3">Erkenntnisse</div>
            <div className="space-y-3">
              {insights.map((ins, i) => {
                const insColor = ins.team === "home" ? homeColor : awayColor;
                const teamName = ins.team === "home" ? match.home.name : match.away.name;
                return (
                  <div
                    key={i}
                    className="pl-3 text-[13px] leading-relaxed text-text border-l-[3px] flex items-start gap-2"
                    style={{ borderLeftColor: insColor }}
                  >
                    <ClubLogo name={teamName} size={18} className="mt-0.5" />
                    <span className="flex-1">{ins.text}</span>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
