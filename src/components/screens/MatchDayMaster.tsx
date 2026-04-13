"use client";

import { useState, useEffect } from "react";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import ClubLogo from "@/components/ui/ClubLogo";

// ============================================================
// MOCK DATA
// ============================================================

const matchData = {
  title: "TSV Blau-Weiss vs. SC Fortuna",
  date: "Sonntag, 12. April 2026 · 14:00",
  venue: "Sportpark Eidelstedt, Platz 2",
};

const nodesData = [
  { id: "p1", type: "player", label: "Max Berger", status: "blocker" as const, reason: "Lizenz abgelaufen seit 03.02.2026", consequence: "Wenn Max spielt, droht dem Verein 200 EUR Strafe und Punktabzug.", remedy: "KI-generierte Erinnerung an Max senden" },
  { id: "p2", type: "player", label: "Jonas Witt", status: "blocker" as const, reason: "Ruhezeit nicht eingehalten (Regel 14.2)", consequence: "Jonas hat gestern gespielt. Einsatz = Wertung als Niederlage.", remedy: "Ersatzspieler aus Kader vorschlagen" },
  { id: "p3", type: "player", label: "Lena Kruger", status: "ok" as const, detail: "Lizenz gültig bis 06/2027" },
  { id: "p4", type: "player", label: "Tim Ackermann", status: "ok" as const, detail: "Spielberechtigt" },
  { id: "p5", type: "player", label: "Sara Moller", status: "pending" as const, detail: "Spielerpass wird geprüft (seit 2 Tagen)" },
  { id: "ref", type: "referee", label: "Schiedsrichter", status: "pending" as const, detail: "Thomas Schulz zugewiesen — Bestätigung ausstehend" },
  { id: "venue", type: "venue", label: "Spielstätte", status: "blocker" as const, reason: "Platzsperrung wegen Starkregen (Bezirksmeldung vom 09.04.)", consequence: "Ohne Ausweichplatz: Spielverlegung nötig. Deadline: Fr 18:00.", remedy: "Ausweichplatz beim Bezirk anfragen" },
];

const streakData = {
  weeks: 5, label: "Perfekter Spielbericht", atRisk: true,
  tasks: [
    { id: "t1", label: "2 Spielerfotos hochladen", done: false },
    { id: "t2", label: "Aufstellung bestätigen", done: false },
    { id: "t3", label: "Schiedsrichter bestätigen", done: true },
    { id: "t4", label: "Spielbericht vorbereiten", done: true },
    { id: "t5", label: "Kader melden", done: true },
  ],
  rewards: [
    { icon: "trophy", label: "Wochenend-Retter!", date: "06.04.2026" },
    { icon: "zap", label: "5-Wochen-Streak!", date: "30.03.2026" },
    { icon: "star", label: "Blitz-Melder (< 1h)", date: "23.03.2026" },
  ],
};

const profileData = {
  name: "Andre Berger", initials: "AB", club: "TSV Blau-Weiss Hamburg",
  role: "Staffelleiter · Jugendkoordinator", tier: 2, tierLabel: "Verified Operator",
  xp: 1450, xpNext: 2000, nextTierLabel: "Regional Lead (Tier 3)",
  nextReq: "Noch 3 datenkomplette Spieltage bis Tier 3", memberSince: "März 2024",
  activity: [
    { pts: 50, label: "Spielbericht 24h vor Deadline eingereicht", date: "06.04.2026" },
    { pts: 100, label: "Frage im Support-Forum beantwortet", date: "02.04.2026" },
    { pts: 25, label: "Kader vollständig vor Frist gemeldet", date: "29.03.2026" },
    { pts: 75, label: "Neuen Verein als Mentor begleitet", date: "15.03.2026" },
    { pts: 10, label: "Profil vollständig ausgefüllt", date: "01.03.2024" },
  ],
  locked: [
    { label: "Erweiterte Liga-Planung", hint: "Schließe 2 weitere Saisons fehlerfrei ab." },
    { label: "Export: Saisonbericht PDF", hint: "Erreiche Tier 3 (Regional Lead)." },
    { label: "Junior-Admin shadowen", hint: "Werde Mentor (Tier 4)." },
  ],
};

const leaderboardData = [
  { rank: 1, club: "FC Elmshorn", score: 2840, streak: 12 },
  { rank: 2, club: "SV Blankenese", score: 2710, streak: 8 },
  { rank: 3, club: "TSV Blau-Weiss Hamburg", score: 2650, streak: 5, isUser: true },
  { rank: 4, club: "SC Victoria", score: 2480, streak: 4 },
  { rank: 5, club: "Hamburger SV III", score: 2310, streak: 3 },
  { rank: 6, club: "Eimsbutteler TV", score: 2100, streak: 2 },
  { rank: 7, club: "TuS Berne", score: 1820, streak: 0 },
  { rank: 8, club: "SC Sternschanze", score: 1650, streak: 0 },
];

const socialNudge = "85% der Staffelleiter in deinem Bezirk haben ihren Spielbericht bereits freigegeben. Du bist auf Platz 3 — schliesse jetzt ab!";

const TIERS = ["Rookie", "Verified Operator", "Regional Lead", "Mentor", "Federation Advisor"];

// ============================================================
// HELPERS
// ============================================================

const statusColor = { ok: "green", pending: "orange", blocker: "red" } as const;
const statusIcon = { ok: "check", pending: "clock", blocker: "alert" } as const;
const statusLabel = { ok: "Bestätigt", pending: "Ausstehend", blocker: "Blocker" } as const;

// ============================================================
// SCREEN 1: MATCH DAY GRAPH
// ============================================================

function MatchDayGraph({ cleanState }: { cleanState: boolean }) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const nodes = cleanState ? nodesData.map(n => ({ ...n, status: "ok" as const })) : nodesData;
  const blockers = nodes.filter(n => n.status === "blocker");
  const pending = nodes.filter(n => n.status === "pending");
  const ok = nodes.filter(n => n.status === "ok");
  const total = nodes.length;
  const readyPct = Math.round((ok.length / total) * 100);

  const typeLabel: Record<string, string> = { player: "Spieler", referee: "Schiedsrichter", venue: "Spielstätte" };
  const sorted = [...blockers, ...pending, ...ok];

  return (
    <div>
      {/* Match Info + Progress */}
      <Card className="!mb-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="text-[16px] font-bold flex items-center gap-2"><ClubLogo name="TSV Blau-Weiss" size={24} />{matchData.title}<ClubLogo name="SC Fortuna" size={24} /></div>
            <div className="text-[12px] text-text-muted">{matchData.date} · {matchData.venue}</div>
          </div>
          <span className="text-[13px] font-medium text-text-muted">{ok.length} / {total} bereit</span>
        </div>
        <div className="h-1.5 bg-s3 rounded-full overflow-hidden">
          <div className="h-full rounded-full bg-accent transition-all duration-700" style={{ width: readyPct + "%" }} />
        </div>
      </Card>

      {/* Clean State */}
      {cleanState && (
        <Card className="!mb-4 text-center !py-8">
          <Icon name="check" size={28} className="text-green mx-auto mb-2" />
          <div className="text-[15px] font-semibold mb-1">Alles bereit</div>
          <div className="text-[12px] text-text-muted">Alle Abhängigkeiten sind erfüllt.</div>
        </Card>
      )}

      {/* Blocker hint */}
      {!cleanState && blockers.length > 0 && (
        <div className="text-[12px] text-text-muted mb-3">{blockers.length} {blockers.length === 1 ? "offenes Problem" : "offene Probleme"} vor Spielbeginn losen</div>
      )}

      {/* List */}
      <div className="space-y-1.5">
        {sorted.map(node => {
          const isExpanded = expandedId === node.id;
          const isBlocker = node.status === "blocker";
          const isPending = node.status === "pending";

          return (
            <div
              key={node.id}
              className="bg-s1 border border-border rounded-[8px] overflow-hidden"
            >
              <div
                className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-s2 transition-colors"
                onClick={() => setExpandedId(isExpanded ? null : node.id)}
              >
                {/* Minimal status dot */}
                <span className={`w-2 h-2 rounded-full shrink-0 ${
                  isBlocker ? "bg-red" : isPending ? "bg-orange" : "bg-green"
                }`} />

                <span className="text-[13px] font-medium flex-1 truncate">{node.label}</span>
                <span className="text-[11px] text-text-muted">{typeLabel[node.type]}</span>

                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`text-text-dim shrink-0 transition-transform ${isExpanded ? "rotate-180" : ""}`}><polyline points="6 9 12 15 18 9"/></svg>
              </div>

              {isExpanded && (
                <div className="px-4 pb-3 border-t border-border pt-3 text-[13px]">
                  <div className="text-text-muted mb-2">
                    {isBlocker ? node.reason : node.detail}
                  </div>
                  {isBlocker && node.consequence && (
                    <div className="text-[12px] text-text-muted mb-3 pl-3 border-l-2 border-red/30">
                      {node.consequence}
                    </div>
                  )}
                  {isBlocker && <Button size="sm">{node.remedy}</Button>}
                  {isPending && <Button size="sm" variant="ghost">Erinnerung senden</Button>}
                  {node.status === "ok" && <span className="text-[12px] text-text-muted">Keine Aktion erforderlich.</span>}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ============================================================
// SCREEN 2: COMPLIANCE STREAK
// ============================================================

function ComplianceStreak({ allComplete }: { allComplete: boolean }) {
  const [tasks, setTasks] = useState(streakData.tasks);
  const [wizardStep, setWizardStep] = useState(0);
  const [showWizard, setShowWizard] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const doneTasks = allComplete ? tasks.length : tasks.filter(t => t.done).length;
  const totalTasks = tasks.length;
  const pct = (doneTasks / totalTasks) * 100;

  const toggleTask = (id: string) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  const startWizard = () => { setShowWizard(true); setWizardStep(1); };
  const nextWizardStep = () => {
    if (wizardStep < 3) setWizardStep(wizardStep + 1);
    else {
      setShowWizard(false);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
  };

  return (
    <div>
      <h2 className="text-[18px] font-bold mb-4">Compliance Streak</h2>

      {/* Streak Counter */}
      <Card className="!mb-4" borderColor={streakData.atRisk && !allComplete ? "border-l-orange" : "border-l-green"}>
        <div className="flex items-center gap-4">
          <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-[24px] font-bold ${streakData.atRisk && !allComplete ? "bg-orange/15 text-orange" : "bg-green/15 text-green"}`}>
            <Icon name="zap" size={28} />
          </div>
          <div className="flex-1">
            <div className="text-[16px] font-bold">{streakData.weeks}-Wochen-Streak: {streakData.label}</div>
            <div className="text-[13px] text-text-muted">
              {allComplete ? "Alles erledigt. Du bist vorbereitet!" : `Andre, deine Streak ist in Gefahr! Noch ${totalTasks - doneTasks} Aufgaben offen.`}
            </div>
          </div>
          <div className="text-[28px] font-bold text-accent">{streakData.weeks}</div>
        </div>
      </Card>

      {/* Nudge Card */}
      {!allComplete && (
        <Card className="!mb-4">
          <div className="flex items-center justify-between mb-3">
            <div className="text-[11px] font-bold text-text-muted uppercase tracking-wider">Offene Aufgaben</div>
            <span className="text-[12px] font-medium text-accent">{doneTasks} von {totalTasks} erledigt</span>
          </div>
          <div className="h-2 bg-s3 rounded-full overflow-hidden mb-4">
            <div className="h-full rounded-full bg-accent transition-all duration-600" style={{ width: pct + "%" }} />
          </div>
          <div className="space-y-2 mb-4">
            {tasks.map(t => (
              <div key={t.id} onClick={() => toggleTask(t.id)} className="flex items-center gap-3 p-2 rounded-lg hover:bg-s2 cursor-pointer transition-colors">
                <div className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-colors ${t.done ? "bg-green border-green" : "border-border"}`}>
                  {t.done && <Icon name="check" size={12} className="text-white" />}
                </div>
                <span className={`text-[13px] ${t.done ? "line-through text-text-muted" : ""}`}>{t.label}</span>
              </div>
            ))}
          </div>
          <Button onClick={startWizard} className="w-full">Jetzt abschließen</Button>
        </Card>
      )}

      {/* Wizard Modal */}
      {showWizard && (
        <Card className="!mb-4" borderColor="border-l-accent">
          <div className="flex items-center gap-2 mb-4">
            {[1, 2, 3].map(s => (
              <div key={s} className={`flex-1 h-1.5 rounded-full ${s <= wizardStep ? "bg-accent" : "bg-s3"}`} />
            ))}
          </div>
          <div className="text-[15px] font-bold mb-2">
            {wizardStep === 1 && "Schritt 1: Spielerfotos hochladen"}
            {wizardStep === 2 && "Schritt 2: Aufstellung bestätigen"}
            {wizardStep === 3 && "Schritt 3: Abschließen"}
          </div>
          <div className="text-[13px] text-text-muted mb-4">
            {wizardStep === 1 && "Lade die fehlenden 2 Spielerfotos hoch."}
            {wizardStep === 2 && "Bestätige die Aufstellung für den Spieltag."}
            {wizardStep === 3 && "Prüfe alles und sende den Spielbericht ab."}
          </div>
          <div className="border-2 border-dashed border-border rounded-lg p-8 text-center mb-4">
            <Icon name={wizardStep === 1 ? "camera" : wizardStep === 2 ? "users" : "check"} size={24} className="text-text-muted mx-auto mb-2" />
            <div className="text-[12px] text-text-muted">{wizardStep === 1 ? "Fotos hier ablegen" : wizardStep === 2 ? "Aufstellung anzeigen" : "Spielbericht senden"}</div>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" onClick={() => setShowWizard(false)} className="flex-1">Abbrechen</Button>
            <Button onClick={nextWizardStep} className="flex-1">{wizardStep === 3 ? "Fertig!" : "Weiter"}</Button>
          </div>
        </Card>
      )}

      {/* Confetti / Celebration */}
      {showConfetti && (
        <Card className="!mb-4 text-center" borderColor="border-l-green">
          <div className="py-4">
            <div className="text-[24px] mb-2"><Icon name="trophy" size={32} className="text-green mx-auto" /></div>
            <div className="text-[16px] font-bold text-green">Wochenend-Retter!</div>
            <div className="text-[13px] text-text-muted">Streak gesichert. Weiter so!</div>
          </div>
        </Card>
      )}

      {/* Rewards */}
      <Card className="!mb-0">
        <div className="text-[11px] font-bold text-text-muted uppercase tracking-wider mb-3">Erhaltene Auszeichnungen</div>
        <div className="flex gap-3 overflow-x-auto pb-1">
          {streakData.rewards.map((r, i) => (
            <div key={i} className={`shrink-0 p-3 rounded-lg border text-center min-w-[120px] ${i === 0 ? "border-accent bg-accent-dim" : "border-border"}`}>
              <Icon name={r.icon} size={20} className={`mx-auto mb-1 ${i === 0 ? "text-accent" : "text-text-muted"}`} />
              <div className="text-[12px] font-medium">{r.label}</div>
              <div className="text-[10px] text-text-muted">{r.date}</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

// ============================================================
// SCREEN 3: MENTOR PROFILE
// ============================================================

function MentorProfile({ tierOverride }: { tierOverride?: number }) {
  const tier = tierOverride ?? profileData.tier;
  const xpPct = (profileData.xp / profileData.xpNext) * 100;

  return (
    <div>
      <h2 className="text-[18px] font-bold mb-4">Mentor-Profil</h2>

      {/* Profile Header */}
      <Card className="!mb-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent to-[#6D28D9] flex items-center justify-center text-[20px] font-bold text-white">{profileData.initials}</div>
          <div className="flex-1">
            <div className="text-[18px] font-bold">{profileData.name}</div>
            <div className="text-[13px] text-text-muted">{profileData.club}</div>
            <div className="text-[12px] text-text-muted">{profileData.role}</div>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 rounded-xl bg-accent/15 flex items-center justify-center mb-1">
              <Icon name="shield" size={24} className="text-accent" />
            </div>
            <div className="text-[11px] font-bold text-accent">Tier {tier}</div>
            <div className="text-[10px] text-text-muted">{TIERS[tier - 1]}</div>
          </div>
        </div>
      </Card>

      {/* XP Progress */}
      <Card className="!mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-bold text-text-muted uppercase tracking-wider">Fortschritt</span>
          <span className="text-[12px] font-medium text-accent">{profileData.xp} / {profileData.xpNext} XP</span>
        </div>
        <div className="relative h-3 bg-s3 rounded-full overflow-hidden mb-3">
          <div className="h-full rounded-full bg-accent transition-all duration-700" style={{ width: xpPct + "%" }} />
        </div>
        {/* Tier markers */}
        <div className="flex items-center justify-between mb-3">
          {TIERS.map((t, i) => (
            <div key={t} className={`text-center ${i + 1 <= tier ? "text-accent" : "text-text-dim"}`}>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold mx-auto mb-0.5 ${i + 1 <= tier ? "bg-accent text-white" : i + 1 === tier + 1 ? "border-2 border-accent/30 text-accent" : "bg-s3 text-text-muted"}`}>{i + 1}</div>
              <div className="text-[9px]">{t.split(" ")[0]}</div>
            </div>
          ))}
        </div>
        <div className="text-[12px] text-text-muted">{profileData.nextReq}</div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Activity Feed */}
        <Card className="!mb-0">
          <div className="text-[11px] font-bold text-text-muted uppercase tracking-wider mb-3">Aktivitäten</div>
          <div className="space-y-3">
            {profileData.activity.map((a, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="px-2 py-0.5 rounded bg-green/15 text-green text-[11px] font-bold shrink-0">+{a.pts}</span>
                <div className="flex-1">
                  <div className="text-[13px]">{a.label}</div>
                  <div className="text-[11px] text-text-muted">{a.date}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Locked Features */}
        <Card className="!mb-0">
          <div className="text-[11px] font-bold text-text-muted uppercase tracking-wider mb-3">Gesperrte Features</div>
          <div className="space-y-3">
            {profileData.locked.map((f, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-s2 opacity-60 group hover:opacity-80 transition-opacity">
                <Icon name="shield" size={18} className="text-text-muted" />
                <div className="flex-1">
                  <div className="text-[13px] font-medium">{f.label}</div>
                  <div className="text-[11px] text-text-muted">{f.hint}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

// ============================================================
// SCREEN 4: ADMIN LEAGUE
// ============================================================

function AdminLeague() {
  return (
    <div>
      <h2 className="text-[18px] font-bold mb-4">Admin-Liga</h2>

      {/* Social Nudge */}
      <Card className="!mb-4" borderColor="border-l-accent">
        <div className="flex items-center gap-3">
          <Icon name="users" size={20} className="text-accent shrink-0" />
          <div className="flex-1">
            <div className="text-[13px]">{socialNudge}</div>
          </div>
          <Button size="sm">Abschließen</Button>
        </div>
      </Card>

      {/* Leaderboard */}
      <Card className="!mb-4 !p-0 overflow-hidden">
        <div className="px-5 py-4">
          <div className="text-[11px] font-bold text-text-muted uppercase tracking-wider">Bezirksrangliste · Verwaltungs-Score</div>
        </div>
        <table className="w-full text-[13px]">
          <thead>
            <tr className="text-left text-[11px] text-text-muted uppercase tracking-wide border-t border-border bg-s2">
              <th className="px-5 py-3 font-semibold w-[50px]">#</th>
              <th className="px-5 py-3 font-semibold">Verein</th>
              <th className="px-5 py-3 font-semibold text-right">Score</th>
              <th className="px-5 py-3 font-semibold text-right">Streak</th>
            </tr>
          </thead>
          <tbody>
            {leaderboardData.map(r => (
              <tr key={r.rank} className={`border-t border-border ${r.isUser ? "bg-accent-dim border-l-[3px] border-l-accent" : "hover:bg-s2/50"} transition-colors`}>
                <td className="px-5 py-3">
                  {r.rank <= 3 ? (
                    <span className={`text-[14px] font-bold ${r.rank === 1 ? "text-[#C9A227]" : r.rank === 2 ? "text-text-muted" : "text-orange"}`}>
                      {r.rank === 1 ? "1." : r.rank === 2 ? "2." : "3."}
                    </span>
                  ) : <span className="text-text-muted">{r.rank}.</span>}
                </td>
                <td className="px-5 py-3 font-medium">
                  <span className="flex items-center gap-2">
                    <ClubLogo name={r.club} size={22} />
                    {r.isUser && <span className="text-accent mr-1">*</span>}
                    {r.club}
                  </span>
                </td>
                <td className="px-5 py-3 text-right font-bold">{r.score.toLocaleString("de-DE")}</td>
                <td className="px-5 py-3 text-right">
                  {r.streak > 0 ? (
                    <span className="inline-flex items-center gap-1 text-orange">
                      <Icon name="zap" size={12} /> {r.streak}
                    </span>
                  ) : <span className="text-text-muted">-</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {/* Scoring Info */}
      <Card className="!mb-0">
        <div className="text-[11px] font-bold text-text-muted uppercase tracking-wider mb-3">So werden Punkte vergeben</div>
        <div className="grid grid-cols-2 gap-3 text-[12px]">
          <div className="flex items-center gap-2"><Badge color="green">+10</Badge> Kader 48h vor Spieltag gemeldet</div>
          <div className="flex items-center gap-2"><Badge color="green">+20</Badge> Fehlerfreier Spielbericht</div>
          <div className="flex items-center gap-2"><Badge color="green">+50</Badge> Alles vor Deadline erledigt</div>
          <div className="flex items-center gap-2"><Badge color="purple">x1.5</Badge> Streak-Multiplikator (5+ Wochen)</div>
        </div>
      </Card>
    </div>
  );
}

// ============================================================
// MAIN COMPONENT
// ============================================================

export default function MatchDayMaster() {
  const [tab, setTab] = useState("graph");
  const [cleanState, setCleanState] = useState(false);
  const [allComplete, setAllComplete] = useState(false);
  const [tierOverride, setTierOverride] = useState<number | undefined>(undefined);

  const tabs = [
    { id: "graph", label: "Spieltag-Check", icon: "shield" },
    { id: "streak", label: "Streak & Aufgaben", icon: "zap" },
    { id: "profile", label: "Mentor-Profil", icon: "user" },
    { id: "league", label: "Admin-Liga", icon: "trophy" },
  ];

  return (
    <div className="animate-fadeIn">
      <div className="mb-4">
        <h1 className="text-[22px] font-bold mb-1">Spieltag-Vorbereitung</h1>
        <p className="text-[13px] text-text-muted">Offene Aufgaben, Compliance und Spieltag-Status</p>
      </div>

      {/* Tab Bar */}
      <Card className="!mb-4 !p-0">
        <div className="flex">
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex-1 flex items-center justify-center gap-2 py-3.5 text-[13px] font-medium border-b-2 transition-colors cursor-pointer ${
                tab === t.id ? "text-accent border-accent bg-accent-dim" : "text-text-muted border-transparent hover:bg-s2"
              }`}
            >
              <Icon name={t.icon} size={15} /> {t.label}
            </button>
          ))}
        </div>
      </Card>

      {/* Content */}
      {tab === "graph" && <MatchDayGraph cleanState={cleanState} />}
      {tab === "streak" && <ComplianceStreak allComplete={allComplete} />}
      {tab === "profile" && <MentorProfile tierOverride={tierOverride} />}
      {tab === "league" && <AdminLeague />}

    </div>
  );
}
