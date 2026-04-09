"use client";

import { useState } from "react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import SectionHeader from "@/components/ui/SectionHeader";

/* ── Types ── */
interface Tier {
  level: number;
  name: string;
  icon: string;
  color: string;
  minPoints: number;
}

interface ActivityEntry {
  id: string;
  text: string;
  points: number;
  date: string;
  icon: string;
}

interface LockedFeature {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockText: string;
  requiredTier: number;
}

/* ── Mock Data ── */
const TIERS: Tier[] = [
  { level: 1, name: "Rookie Operator", icon: "shield", color: "#94a3b8", minPoints: 0 },
  { level: 2, name: "Verified Operator", icon: "shield-check", color: "#94a3b8", minPoints: 200 },
  { level: 3, name: "Regional Lead", icon: "award", color: "#f59e0b", minPoints: 500 },
  { level: 4, name: "Mentor", icon: "crown", color: "#f59e0b", minPoints: 1000 },
  { level: 5, name: "Master Admin", icon: "star", color: "#7c3aed", minPoints: 2000 },
];

const CURRENT_TIER = 2;
const CURRENT_POINTS = 380;
const NEXT_TIER = TIERS[CURRENT_TIER]; // Tier 3

const ACTIVITY_FEED: ActivityEntry[] = [
  { id: "a1", text: "Spielbericht 24h vor Deadline eingereicht", points: 50, date: "Heute", icon: "clipboard" },
  { id: "a2", text: "Kader 48h vor Anpfiff best\u00E4tigt", points: 30, date: "Gestern", icon: "check" },
  { id: "a3", text: "Frage im Support-Forum eines Nachbarvereins beantwortet", points: 100, date: "05.04.2026", icon: "message-circle" },
  { id: "a4", text: "Spielergebnisse ohne Korrektur eingereicht", points: 40, date: "03.04.2026", icon: "target" },
  { id: "a5", text: "5-Wochen Compliance Streak erreicht", points: 75, date: "01.04.2026", icon: "flame" },
  { id: "a6", text: "Neue Mannschaft fehlerfrei gemeldet", points: 60, date: "28.03.2026", icon: "user" },
  { id: "a7", text: "Verlegungsantrag korrekt bearbeitet", points: 25, date: "25.03.2026", icon: "calendar" },
];

const LOCKED_FEATURES: LockedFeature[] = [
  {
    id: "f1",
    name: "Erweiterte Liga-Planung",
    description: "Saisonplanung mit KI-Unterst\u00FCtzung und Terminoptimierung",
    icon: "calendar",
    unlockText: "Schalte diese Funktion frei, indem du 2 weitere Saisons fehlerfrei abschlie\u00DFt oder dich als Mentor f\u00FCr 2 neue Vereine zur Verf\u00FCgung stellst.",
    requiredTier: 3,
  },
  {
    id: "f2",
    name: "Automatische Spielberichte",
    description: "KI generiert komplette Spielberichte aus Ergebnisdaten",
    icon: "sparkle",
    unlockText: "Erreiche Tier 3 (Regional Lead) um diese Funktion freizuschalten.",
    requiredTier: 3,
  },
  {
    id: "f3",
    name: "Junior-Admin Shadowen",
    description: "Read-only Zugriff auf Anf\u00E4nger-Dashboards f\u00FCr Live-Hilfestellung",
    icon: "eye",
    unlockText: "Werde Mentor (Tier 4) um Anf\u00E4ngern live zu helfen.",
    requiredTier: 4,
  },
  {
    id: "f4",
    name: "Verbands-Analytik",
    description: "Erweiterte Statistiken und Benchmarks \u00FCber alle Vereine",
    icon: "bar-chart",
    unlockText: "Erreiche Master Admin (Tier 5) f\u00FCr vollen Analytik-Zugriff.",
    requiredTier: 5,
  },
];

const MENTORED_CLUBS = [
  { name: "SVC G\u00F6ttingen", admin: "Petra M\u00FCller", tier: 1, status: "Aktiv" },
  { name: "TV Hildesheim", admin: "Frank Schneider", tier: 1, status: "Anfrage" },
];

/* ── Tier Badge Component ── */
function TierBadge({ tier }: { tier: Tier }) {
  const bgMap: Record<number, string> = {
    1: "bg-[rgba(148,163,184,0.1)] border-[rgba(148,163,184,0.3)]",
    2: "bg-[rgba(148,163,184,0.1)] border-[rgba(148,163,184,0.3)]",
    3: "bg-gold-dim border-[rgba(245,158,11,0.3)]",
    4: "bg-gold-dim border-[rgba(245,158,11,0.3)]",
    5: "bg-accent-dim border-accent/30",
  };

  const textMap: Record<number, string> = {
    1: "text-[#94a3b8]",
    2: "text-[#64748b]",
    3: "text-[#f59e0b]",
    4: "text-[#d97706]",
    5: "text-accent",
  };

  return (
    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border-2 ${bgMap[tier.level]} ${textMap[tier.level]}`}>
      <Icon name={tier.icon} size={18} />
      <span className="text-[13px] font-bold">{tier.name} \u2013 Tier {tier.level}</span>
    </div>
  );
}

/* ── Progress Ring Component ── */
function ProgressRing({ progress, size = 120 }: { progress: number; size?: number }) {
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <svg width={size} height={size} className="transform -rotate-90">
      <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#e8e5f0" strokeWidth={strokeWidth} />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="#7c3aed"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        className="transition-all duration-1000 ease-out"
      />
    </svg>
  );
}

/* ── Main MentorProfile ── */
export default function MentorProfile() {
  const [hoveredFeature, setHoveredFeature] = useState<string | null>(null);

  const currentTier = TIERS[CURRENT_TIER - 1];
  const nextTier = NEXT_TIER;
  const progressToNext = ((CURRENT_POINTS - currentTier.minPoints) / (nextTier.minPoints - currentTier.minPoints)) * 100;
  const pointsNeeded = nextTier.minPoints - CURRENT_POINTS;
  const totalPoints = ACTIVITY_FEED.reduce((s, a) => s + a.points, 0);

  return (
    <div className="animate-fadeIn">
      {/* Header */}
      <h1 className="text-[22px] font-bold mb-1">Mein Profil</h1>
      <p className="text-[13px] text-text-muted mb-6">United Sports-ID \u00B7 Dein Status & Karrierepfad</p>

      {/* Profile Card */}
      <div className="bg-s1 border border-border rounded-[14px] p-6 mb-5">
        <div className="flex items-start gap-6 flex-wrap">
          {/* Avatar + Ring */}
          <div className="relative shrink-0">
            <ProgressRing progress={progressToNext} size={120} />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[88px] h-[88px] rounded-full bg-gradient-to-br from-accent to-[#6D28D9] flex items-center justify-center">
                <span className="text-[28px] font-bold text-white">SM</span>
              </div>
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 min-w-[200px]">
            <div className="text-[20px] font-bold mb-1">Stefan Meier</div>
            <div className="text-[13px] text-text-muted mb-3">Staffelleiter \u00B7 NWVV Volleyball \u00B7 Seit 2023</div>

            {/* Tier Badge */}
            <TierBadge tier={currentTier} />

            {/* Progress to next tier */}
            <div className="mt-4">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px] font-bold text-text-muted uppercase tracking-wider">Fortschritt zu Tier {nextTier.level}</span>
                <span className="text-[11px] font-semibold text-accent">{CURRENT_POINTS}/{nextTier.minPoints} Punkte</span>
              </div>
              <div className="w-full h-3 bg-s3 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-accent to-[#6D28D9] rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${progressToNext}%` }}
                />
              </div>
              <div className="text-[11px] text-text-muted mt-1">
                Noch <strong className="text-text">{pointsNeeded} Punkte</strong> und <strong className="text-text">3 datenkomplette Spieltage</strong> bis zum &ldquo;{nextTier.name}&rdquo; (Tier {nextTier.level})
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-3 shrink-0">
            <div className="bg-s2 rounded-[10px] p-3 text-center min-w-[100px]">
              <div className="text-[20px] font-bold text-accent">{totalPoints}</div>
              <div className="text-[10px] text-text-muted font-semibold">Punkte gesamt</div>
            </div>
            <div className="bg-s2 rounded-[10px] p-3 text-center min-w-[100px]">
              <div className="text-[20px] font-bold text-green">5</div>
              <div className="text-[10px] text-text-muted font-semibold">Wochen-Streak</div>
            </div>
            <div className="bg-s2 rounded-[10px] p-3 text-center min-w-[100px]">
              <div className="text-[20px] font-bold">12</div>
              <div className="text-[10px] text-text-muted font-semibold">Spieltage</div>
            </div>
            <div className="bg-s2 rounded-[10px] p-3 text-center min-w-[100px]">
              <div className="text-[20px] font-bold text-orange">2</div>
              <div className="text-[10px] text-text-muted font-semibold">Mentoring</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-5">
        {/* Left: Activity Feed + Features */}
        <div>
          {/* Activity Feed */}
          <SectionHeader
            title="Aktivit\u00E4ten & Punkte"
            right={<Badge color="purple">{ACTIVITY_FEED.length} Eintr\u00E4ge</Badge>}
          />
          <div className="space-y-2 mb-6">
            {ACTIVITY_FEED.map((entry) => (
              <div key={entry.id} className="flex items-center gap-3 bg-s1 border border-border rounded-[10px] p-3.5 hover:bg-s2 transition-colors">
                <div className="w-9 h-9 rounded-full bg-accent-dim flex items-center justify-center shrink-0">
                  <Icon name={entry.icon} size={16} className="text-accent" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[13px] font-semibold">{entry.text}</div>
                  <div className="text-[11px] text-text-muted">{entry.date}</div>
                </div>
                <div className="flex items-center gap-1 bg-green-dim rounded-full px-2.5 py-1 shrink-0">
                  <Icon name="trending-up" size={12} className="text-green" />
                  <span className="text-[12px] font-bold text-green">+{entry.points}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Feature Gating */}
          <SectionHeader
            title="Freischaltbare Funktionen"
            right={<Badge color="gray">{LOCKED_FEATURES.filter(f => f.requiredTier > CURRENT_TIER).length} gesperrt</Badge>}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {LOCKED_FEATURES.map((feature) => {
              const locked = feature.requiredTier > CURRENT_TIER;
              return (
                <div
                  key={feature.id}
                  className={`relative bg-s1 border border-border rounded-[10px] p-4 transition-all ${
                    locked ? "opacity-60" : "hover:bg-s2 cursor-pointer"
                  }`}
                  onMouseEnter={() => locked && setHoveredFeature(feature.id)}
                  onMouseLeave={() => setHoveredFeature(null)}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-[10px] flex items-center justify-center shrink-0 ${locked ? "bg-[rgba(100,116,139,0.1)]" : "bg-accent-dim"}`}>
                      {locked ? (
                        <Icon name="lock" size={18} className="text-text-muted" />
                      ) : (
                        <Icon name={feature.icon} size={18} className="text-accent" />
                      )}
                    </div>
                    <div>
                      <div className={`text-[13px] font-bold mb-0.5 ${locked ? "text-text-muted" : ""}`}>{feature.name}</div>
                      <div className="text-[11px] text-text-muted">{feature.description}</div>
                      {locked && (
                        <div className="mt-1.5">
                          <Badge color="gray">Tier {feature.requiredTier} erforderlich</Badge>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Tooltip on hover */}
                  {hoveredFeature === feature.id && (
                    <div className="absolute left-0 right-0 -bottom-2 translate-y-full bg-[#1e1b4b] text-white rounded-[10px] p-3 shadow-xl z-50 animate-fadeIn">
                      <div className="text-[11px] leading-relaxed">{feature.unlockText}</div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Tier Roadmap + Mentoring */}
        <div>
          {/* Tier Roadmap */}
          <SectionHeader title="Karrierepfad" />
          <div className="bg-s1 border border-border rounded-[10px] p-4 mb-4">
            {TIERS.map((tier, i) => {
              const isActive = tier.level === CURRENT_TIER;
              const isPast = tier.level < CURRENT_TIER;
              const isFuture = tier.level > CURRENT_TIER;

              return (
                <div key={tier.level} className="flex items-center gap-3 relative">
                  {/* Vertical line */}
                  {i < TIERS.length - 1 && (
                    <div
                      className="absolute left-[17px] top-[36px] w-0.5 h-[calc(100%-8px)]"
                      style={{ background: isPast || isActive ? "#7c3aed" : "#e8e5f0" }}
                    />
                  )}

                  <div className={`relative z-10 w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${
                    isActive
                      ? "bg-accent text-white"
                      : isPast
                        ? "bg-accent-dim text-accent"
                        : "bg-s3 text-text-muted"
                  }`}>
                    <Icon name={tier.icon} size={16} />
                  </div>

                  <div className={`flex-1 py-3 ${isFuture ? "opacity-50" : ""}`}>
                    <div className="flex items-center gap-2">
                      <span className={`text-[13px] font-bold ${isActive ? "text-accent" : ""}`}>{tier.name}</span>
                      {isActive && <Badge color="purple">Aktuell</Badge>}
                      {isPast && <Icon name="check" size={12} className="text-green" />}
                    </div>
                    <div className="text-[11px] text-text-muted">{tier.minPoints}+ Punkte \u00B7 Tier {tier.level}</div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mentoring Section */}
          <SectionHeader title="Mentoring" right={<Badge color="gray">Tier 4</Badge>} />
          <div className="bg-s1 border border-border rounded-[10px] p-4">
            {CURRENT_TIER >= 4 ? (
              <>
                <div className="text-[13px] text-text-dim mb-3">Du kannst Anf\u00E4ngern (Tier 1) helfen, indem du deren Dashboard read-only einsehen kannst.</div>
                {MENTORED_CLUBS.map((club, i) => (
                  <div key={i} className="flex items-center gap-3 bg-s2 rounded-[8px] p-3 mb-2">
                    <div className="w-8 h-8 rounded-full bg-green-dim flex items-center justify-center">
                      <Icon name="user" size={14} className="text-green" />
                    </div>
                    <div className="flex-1">
                      <div className="text-[13px] font-semibold">{club.name}</div>
                      <div className="text-[11px] text-text-muted">{club.admin} \u00B7 Tier {club.tier}</div>
                    </div>
                    <Button size="sm" variant="ghost">Shadowen</Button>
                  </div>
                ))}
                <Button size="sm" className="w-full mt-2">
                  <Icon name="eye" size={14} className="text-white" /> Junior-Admin shadowen
                </Button>
              </>
            ) : (
              <div className="text-center py-4">
                <div className="w-12 h-12 rounded-full bg-s3 flex items-center justify-center mx-auto mb-3">
                  <Icon name="lock" size={20} className="text-text-muted" />
                </div>
                <div className="text-[13px] font-semibold text-text-muted mb-1">Mentoring ab Tier 4</div>
                <div className="text-[11px] text-text-muted leading-relaxed">
                  Erreiche den Mentor-Status, um Anf\u00E4ngern live im Dashboard zu helfen und zus\u00E4tzliche Punkte zu sammeln.
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
