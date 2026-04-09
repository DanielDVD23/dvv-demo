"use client";

import { useState } from "react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import SectionHeader from "@/components/ui/SectionHeader";

/* ── Types ── */
interface TeamRanking {
  rank: number;
  name: string;
  admin: string;
  score: number;
  streak: number;
  trend: "up" | "down" | "same";
  isOwn?: boolean;
  isRival?: boolean;
}

interface ScoreMetric {
  label: string;
  points: string;
  description: string;
  icon: string;
}

/* ── Mock Data ── */
const RANKINGS: TeamRanking[] = [
  { rank: 1, name: "TSV Hannover", admin: "Stefan Meier", score: 940, streak: 5, trend: "up", isOwn: true },
  { rank: 2, name: "MTV Wolfsburg", admin: "Sabine Lehmann", score: 920, streak: 4, trend: "up" },
  { rank: 3, name: "SVC G\u00F6ttingen", admin: "Petra M\u00FCller", score: 870, streak: 3, trend: "same", isRival: true },
  { rank: 4, name: "TV Hildesheim", admin: "Frank Schneider", score: 810, streak: 2, trend: "down" },
  { rank: 5, name: "SC Paderborn", admin: "Jan Hoffmann", score: 785, streak: 1, trend: "up" },
  { rank: 6, name: "VfR Bielefeld", admin: "Maria Klein", score: 720, streak: 0, trend: "down", isRival: true },
  { rank: 7, name: "SG M\u00FCnster", admin: "Thomas Braun", score: 680, streak: 2, trend: "same" },
  { rank: 8, name: "TSV Osnabr\u00FCck", admin: "Claudia Weber", score: 650, streak: 1, trend: "down" },
  { rank: 9, name: "VfB Oldenburg", admin: "Michael Fischer", score: 590, streak: 0, trend: "same" },
  { rank: 10, name: "SC Braunschweig", admin: "Andrea Koch", score: 520, streak: 0, trend: "down", isRival: true },
];

const SCORE_METRICS: ScoreMetric[] = [
  { label: "Kader 48h vor Anpfiff best\u00E4tigt", points: "+10", description: "Fr\u00FChzeitige Kadermeldung", icon: "check" },
  { label: "Spielbericht ohne Korrektur", points: "+20", description: "Keine Nachbesserung durch Verband", icon: "clipboard" },
  { label: "Compliance Streak Bonus", points: "\u00D72", description: "Multiplikator f\u00FCr laufende Streaks", icon: "flame" },
  { label: "Spielergebnis p\u00FCnktlich gemeldet", points: "+15", description: "Innerhalb von 2h nach Spielende", icon: "target" },
  { label: "Heimspieltermin rechtzeitig", points: "+10", description: "Termin 7 Tage vorher best\u00E4tigt", icon: "calendar" },
  { label: "Mentoring-Aktivit\u00E4t", points: "+25", description: "Hilfe an Tier-1-Vereine", icon: "user" },
];

const SOCIAL_NUDGE = {
  percentage: 85,
  text: "85% der Manager in deinem Bezirk haben ihren Spielbericht f\u00FCr das Wochenende bereits freigegeben.",
  cta: "Du bist auf Platz 1 \u2013 halte die F\u00FChrung!",
};

/* ── Rank Medal ── */
function RankMedal({ rank }: { rank: number }) {
  if (rank === 1)
    return (
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#f59e0b] to-[#d97706] flex items-center justify-center">
        <Icon name="crown" size={14} className="text-white" />
      </div>
    );
  if (rank === 2)
    return (
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#94a3b8] to-[#64748b] flex items-center justify-center">
        <span className="text-[12px] font-bold text-white">2</span>
      </div>
    );
  if (rank === 3)
    return (
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#d97706] to-[#b45309] flex items-center justify-center">
        <span className="text-[12px] font-bold text-white">3</span>
      </div>
    );
  return (
    <div className="w-8 h-8 rounded-full bg-s3 flex items-center justify-center">
      <span className="text-[12px] font-bold text-text-muted">{rank}</span>
    </div>
  );
}

/* ── Trend Indicator ── */
function TrendArrow({ trend }: { trend: "up" | "down" | "same" }) {
  if (trend === "up") return <Icon name="arrow-up" size={14} className="text-green" />;
  if (trend === "down") return <Icon name="arrow-down" size={14} className="text-red" />;
  return <span className="w-3.5 h-0.5 bg-text-muted inline-block rounded" />;
}

/* ── Head-to-Head Card ── */
function HeadToHead({ own, rival }: { own: TeamRanking; rival: TeamRanking }) {
  const diff = own.score - rival.score;
  const ownPercent = (own.score / (own.score + rival.score)) * 100;

  return (
    <div className="bg-s1 border border-border rounded-[10px] p-4 mb-2">
      <div className="flex items-center justify-between mb-2">
        <div className="text-[13px] font-bold">{own.name}</div>
        <span className="text-[11px] text-text-muted">vs</span>
        <div className="text-[13px] font-bold text-right">{rival.name}</div>
      </div>
      {/* Score bar */}
      <div className="flex h-3 rounded-full overflow-hidden bg-s3 mb-2">
        <div className="bg-accent rounded-l-full transition-all" style={{ width: `${ownPercent}%` }} />
        <div className="bg-orange rounded-r-full transition-all" style={{ width: `${100 - ownPercent}%` }} />
      </div>
      <div className="flex items-center justify-between text-[11px]">
        <span className="font-bold text-accent">{own.score} Pkt.</span>
        <span className={`font-bold ${diff > 0 ? "text-green" : "text-red"}`}>
          {diff > 0 ? "+" : ""}{diff} Vorsprung
        </span>
        <span className="font-bold text-orange">{rival.score} Pkt.</span>
      </div>
    </div>
  );
}

/* ── Main AdminLeague ── */
export default function AdminLeague({ onNavigate }: { onNavigate: (screen: string) => void }) {
  const [showMetrics, setShowMetrics] = useState(false);
  const ownTeam = RANKINGS.find((r) => r.isOwn)!;
  const rivals = RANKINGS.filter((r) => r.isRival);

  return (
    <div className="animate-fadeIn">
      {/* Header */}
      <div className="flex justify-between items-start mb-5 flex-wrap gap-3">
        <div>
          <h1 className="text-[22px] font-bold mb-1">Admin League</h1>
          <p className="text-[13px] text-text-muted">Rankings & Social Benchmarks \u00B7 Bezirk Hannover</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={() => setShowMetrics(!showMetrics)}>
            <Icon name="info" size={14} /> Punktesystem
          </Button>
        </div>
      </div>

      {/* Social Proof Nudge Banner */}
      <div className="bg-gradient-to-r from-accent-dim via-s1 to-green-dim border border-accent/20 rounded-[14px] p-4 mb-5 flex items-center gap-4 flex-wrap">
        <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center shrink-0">
          <Icon name="trending-up" size={22} className="text-white" />
        </div>
        <div className="flex-1 min-w-[200px]">
          <div className="text-[13px] font-bold mb-0.5">{SOCIAL_NUDGE.text}</div>
          <div className="text-[12px] text-accent font-semibold">{SOCIAL_NUDGE.cta}</div>
        </div>
        {/* Progress ring */}
        <div className="relative shrink-0">
          <svg width={56} height={56} className="transform -rotate-90">
            <circle cx={28} cy={28} r={22} fill="none" stroke="#e8e5f0" strokeWidth={5} />
            <circle
              cx={28}
              cy={28}
              r={22}
              fill="none"
              stroke="#7c3aed"
              strokeWidth={5}
              strokeLinecap="round"
              strokeDasharray={2 * Math.PI * 22}
              strokeDashoffset={2 * Math.PI * 22 * (1 - SOCIAL_NUDGE.percentage / 100)}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-[13px] font-bold">{SOCIAL_NUDGE.percentage}%</span>
          </div>
        </div>
      </div>

      {/* Score Metrics Panel (toggle) */}
      {showMetrics && (
        <div className="bg-s1 border border-border rounded-[14px] p-5 mb-5 animate-fadeIn">
          <SectionHeader title="Admin-Score Punktesystem" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {SCORE_METRICS.map((m, i) => (
              <div key={i} className="flex items-start gap-3 bg-s2 rounded-[10px] p-3">
                <div className="w-8 h-8 rounded-full bg-accent-dim flex items-center justify-center shrink-0">
                  <Icon name={m.icon} size={14} className="text-accent" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[13px] font-bold">{m.label}</span>
                    <span className="text-[12px] font-bold text-green bg-green-dim rounded-full px-2 py-0.5">{m.points}</span>
                  </div>
                  <div className="text-[11px] text-text-muted">{m.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-5">
        {/* Left: Leaderboard */}
        <div>
          <SectionHeader
            title="Top Organized Teams"
            right={<Badge color="purple">Bezirk Hannover</Badge>}
          />
          <div className="bg-s1 border border-border rounded-[14px] overflow-hidden">
            <table className="w-full border-collapse text-[13px]">
              <thead>
                <tr>
                  <th className="text-[11px] font-semibold text-text-muted uppercase tracking-wide px-4 py-3 text-left border-b border-border w-[50px]">#</th>
                  <th className="text-[11px] font-semibold text-text-muted uppercase tracking-wide px-4 py-3 text-left border-b border-border">Team</th>
                  <th className="text-[11px] font-semibold text-text-muted uppercase tracking-wide px-4 py-3 text-left border-b border-border">Score</th>
                  <th className="text-[11px] font-semibold text-text-muted uppercase tracking-wide px-4 py-3 text-left border-b border-border">Streak</th>
                  <th className="text-[11px] font-semibold text-text-muted uppercase tracking-wide px-4 py-3 text-left border-b border-border w-[40px]">Trend</th>
                </tr>
              </thead>
              <tbody>
                {RANKINGS.map((team) => (
                  <tr
                    key={team.rank}
                    className={`transition-colors ${
                      team.isOwn
                        ? "bg-accent-dim"
                        : team.isRival
                          ? "bg-orange-dim"
                          : "hover:bg-s2"
                    }`}
                  >
                    <td className="px-4 py-3 border-b border-border">
                      <RankMedal rank={team.rank} />
                    </td>
                    <td className="px-4 py-3 border-b border-border">
                      <div className="flex items-center gap-2">
                        <div>
                          <div className="font-semibold flex items-center gap-1.5">
                            {team.name}
                            {team.isOwn && <Badge color="purple">Du</Badge>}
                            {team.isRival && (
                              <span className="text-[10px] font-bold text-orange bg-orange-dim rounded-full px-1.5 py-0.5">Rivale</span>
                            )}
                          </div>
                          <div className="text-[11px] text-text-muted">{team.admin}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 border-b border-border">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[15px]">{team.score}</span>
                        <div className="w-16 h-1.5 bg-s3 rounded-full overflow-hidden">
                          <div className="h-full bg-accent rounded-full" style={{ width: `${(team.score / 1000) * 100}%` }} />
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 border-b border-border">
                      {team.streak > 0 ? (
                        <div className="flex items-center gap-1">
                          <Icon name="flame" size={14} className="text-orange" />
                          <span className="font-semibold">{team.streak}w</span>
                        </div>
                      ) : (
                        <span className="text-text-muted">\u2013</span>
                      )}
                    </td>
                    <td className="px-4 py-3 border-b border-border">
                      <TrendArrow trend={team.trend} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right: Rivals + Your Stats */}
        <div>
          {/* Your Position */}
          <SectionHeader title="Deine Position" />
          <div className="bg-gradient-to-br from-accent-dim to-s1 border border-accent/20 rounded-[14px] p-5 mb-4 text-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#f59e0b] to-[#d97706] flex items-center justify-center mx-auto mb-3">
              <Icon name="crown" size={28} className="text-white" />
            </div>
            <div className="text-[28px] font-bold">#{ownTeam.rank}</div>
            <div className="text-[13px] text-text-muted mb-3">{ownTeam.name} \u00B7 {ownTeam.score} Punkte</div>
            <div className="flex justify-center gap-2 flex-wrap">
              <Badge color="green">
                <Icon name="flame" size={12} /> {ownTeam.streak}w Streak
              </Badge>
              <Badge color="purple">
                <Icon name="trending-up" size={12} /> Aufsteigend
              </Badge>
            </div>
          </div>

          {/* Rivals Head-to-Head */}
          <SectionHeader
            title="Derby-Rivalen"
            right={<Badge color="orange">{rivals.length} markiert</Badge>}
          />
          {rivals.map((rival) => (
            <HeadToHead key={rival.rank} own={ownTeam} rival={rival} />
          ))}

          <div className="text-[11px] text-text-muted text-center mt-2 mb-4">
            Du kannst bis zu 3 Vereine als Derby-Rivalen markieren
          </div>

          {/* Quick Stats */}
          <SectionHeader title="Diese Woche" />
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-s1 border border-border rounded-[10px] p-3 text-center">
              <div className="text-[18px] font-bold text-green">+120</div>
              <div className="text-[10px] text-text-muted font-semibold">Punkte diese Woche</div>
            </div>
            <div className="bg-s1 border border-border rounded-[10px] p-3 text-center">
              <div className="text-[18px] font-bold text-accent">3</div>
              <div className="text-[10px] text-text-muted font-semibold">Aufgaben erledigt</div>
            </div>
            <div className="bg-s1 border border-border rounded-[10px] p-3 text-center">
              <div className="text-[18px] font-bold">0</div>
              <div className="text-[10px] text-text-muted font-semibold">Korrekturen</div>
            </div>
            <div className="bg-s1 border border-border rounded-[10px] p-3 text-center">
              <div className="text-[18px] font-bold text-orange">+2</div>
              <div className="text-[10px] text-text-muted font-semibold">Pl\u00E4tze gestiegen</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
