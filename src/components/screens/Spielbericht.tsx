"use client";

import { useState } from "react";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import ClubLogo from "@/components/ui/ClubLogo";

const MATCH = {
  competition: "1. Bundesliga", round: "Viertelfinale · Spiel 1",
  date: "Mi., 8. April, 19:30", venue: "Max-Schmeling-Halle, Berlin",
  home: { name: "BR Volleys", short: "BRV" },
  away: { name: "VfB Friedrichshafen", short: "VFB" },
  sets: { home: 3, away: 1 },
  setScores: [{ home: 25, away: 21 }, { home: 23, away: 25 }, { home: 25, away: 19 }, { home: 25, away: 22 }],
  referee1: "M. Weber", referee2: "T. Klein", scorer: "A. Muller",
  coachHome: "Cedric Enard", coachAway: "Michael Warm",
};

const LINEUP_HOME = [
  { num: 18, name: "B. Patch", pos: "AA", zone: 4, confirmed: true },
  { num: 7, name: "T. Carle", pos: "MB", zone: 3, confirmed: true },
  { num: 11, name: "S. Grankin", pos: "Z", zone: 2, confirmed: true },
  { num: 6, name: "K. Semeniuk", pos: "AA", zone: 1, confirmed: true },
  { num: 22, name: "J. Reichert", pos: "MB", zone: 6, confirmed: true },
  { num: 4, name: "M. Schulz", pos: "DA", zone: 5, confirmed: true },
  { num: 9, name: "L. Colito", pos: "L", zone: 0, confirmed: true },
];

const LINEUP_AWAY = [
  { num: 14, name: "M. Kampa", pos: "AA", zone: 4, confirmed: true },
  { num: 8, name: "L. Steiner", pos: "MB", zone: 3, confirmed: true },
  { num: 5, name: "T. Zenger", pos: "Z", zone: 2, confirmed: true },
  { num: 2, name: "G. Todua", pos: "AA", zone: 1, confirmed: true },
  { num: 12, name: "P. Fischer", pos: "MB", zone: 6, confirmed: true },
  { num: 10, name: "S. Braun", pos: "DA", zone: 5, confirmed: true },
  { num: 1, name: "D. Fuerst", pos: "L", zone: 0, confirmed: true },
];

const EVENTS_LOG = [
  { set: 1, time: "0:42", type: "ace", team: "home", player: "Patch", score: "4-1" },
  { set: 1, time: "3:18", type: "block", team: "home", player: "Carle/Patch", score: "8-3" },
  { set: 1, time: "8:12", type: "timeout", team: "away", score: "14-7" },
  { set: 1, time: "12:05", type: "sub", team: "away", player: "Berger f. Todua", score: "18-10" },
  { set: 2, time: "2:30", type: "timeout", team: "home", score: "5-6" },
  { set: 2, time: "8:45", type: "ace", team: "away", player: "Kampa", score: "14-14" },
  { set: 2, time: "14:20", type: "block", team: "away", player: "Steiner/Zenger", score: "23-25" },
  { set: 3, time: "1:05", type: "ace", team: "home", player: "Grankin", score: "4-0" },
  { set: 3, time: "11:30", type: "block", team: "home", player: "Carle", score: "18-6" },
  { set: 3, time: "15:22", type: "ace", team: "home", player: "Semeniuk", score: "25-19" },
  { set: 4, time: "3:10", type: "block", team: "home", player: "Carle/Grankin", score: "7-4" },
  { set: 4, time: "12:50", type: "ace", team: "home", player: "Patch", score: "22-14" },
  { set: 4, time: "15:40", type: "challenge", team: "away", player: "abgelehnt", score: "24-21" },
  { set: 4, time: "16:02", type: "matchball", team: "home", score: "25-22" },
];

const SIGNATURES = [
  { role: "1. Schiedsrichter", name: "M. Weber", status: "signed" as const },
  { role: "2. Schiedsrichter", name: "T. Klein", status: "signed" as const },
  { role: "Schreiber", name: "A. Muller", status: "signed" as const },
  { role: "Trainer Heim", name: "C. Enard", status: "pending" as const },
  { role: "Trainer Gast", name: "M. Warm", status: "pending" as const },
];

const eventTypeLabels: Record<string, string> = {
  ace: "Ass", block: "Block", timeout: "Timeout", sub: "Wechsel", challenge: "Challenge", matchball: "Matchball",
};

const eventTypeIcons: Record<string, string> = {
  ace: "target", block: "shield", timeout: "clock", sub: "refresh", challenge: "search", matchball: "trophy",
};

type Step = "aufstellung" | "ergebnis" | "ereignisse" | "signatur";

export default function Spielbericht() {
  const [activeStep, setActiveStep] = useState<Step>("signatur");
  const [signatures, setSignatures] = useState(SIGNATURES);
  const [signing, setSigning] = useState<number | null>(null);

  const steps: { id: Step; label: string; icon: string }[] = [
    { id: "aufstellung", label: "Aufstellung", icon: "users" },
    { id: "ergebnis", label: "Ergebnis", icon: "volleyball" },
    { id: "ereignisse", label: "Ereignisse", icon: "list" },
    { id: "signatur", label: "Signatur", icon: "edit" },
  ];

  const currentIdx = steps.findIndex(s => s.id === activeStep);
  const signedCount = signatures.filter(s => s.status === "signed").length;

  const handleSign = (idx: number) => {
    setSigning(idx);
  };

  const confirmSign = () => {
    if (signing === null) return;
    setSignatures(prev => prev.map((s, i) => i === signing ? { ...s, status: "signed" as const } : s));
    setSigning(null);
  };

  return (
    <div className="animate-fadeIn">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h1 className="text-[22px] font-bold mb-1">Spielbericht</h1>
          <p className="text-[13px] text-text-muted">{MATCH.competition} · {MATCH.round}</p>
        </div>
        <div className="flex gap-2">
          <Badge color={signedCount === 5 ? "green" : "orange"}>{signedCount}/5 Unterschriften</Badge>
          <Button variant="ghost"><Icon name="file" size={14} /> PDF</Button>
        </div>
      </div>

      {/* Score Header */}
      <Card className="!mb-4 !p-0 overflow-hidden" borderColor="border-l-accent">
        <div className="bg-accent text-white p-4">
          <div className="flex items-center justify-center gap-6">
            <div className="text-right flex-1 flex items-center justify-end gap-3">
              <div className="text-[16px] font-bold">{MATCH.home.name}</div>
              <ClubLogo name={MATCH.home.name} size={48} />
            </div>
            <div className="text-[36px] font-extrabold tracking-tight leading-none">{MATCH.sets.home} : {MATCH.sets.away}</div>
            <div className="text-left flex-1 flex items-center gap-3">
              <ClubLogo name={MATCH.away.name} size={48} />
              <div className="text-[16px] font-bold">{MATCH.away.name}</div>
            </div>
          </div>
          <div className="flex items-center justify-center gap-2 mt-2">
            {MATCH.setScores.map((s, i) => (
              <span key={i} className="text-[12px] bg-white/10 rounded px-2 py-0.5">S{i + 1}: {s.home}:{s.away}</span>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-center gap-5 px-4 py-2 bg-s2 text-[11px] text-text-muted">
          <span>{MATCH.date}</span>
          <span>{MATCH.venue}</span>
          <span>SR: {MATCH.referee1} / {MATCH.referee2}</span>
        </div>
      </Card>

      {/* Step Navigation */}
      <Card className="!mb-4 !p-0">
        <div className="flex">
          {steps.map((step, i) => {
            const isDone = i < currentIdx;
            const isActive = step.id === activeStep;
            return (
              <button
                key={step.id}
                onClick={() => setActiveStep(step.id)}
                className={`flex-1 flex items-center justify-center gap-2 py-3 text-[12px] font-medium border-b-2 transition-colors cursor-pointer ${
                  isActive ? "text-accent border-accent bg-accent-dim" :
                  isDone ? "text-green border-green/30" :
                  "text-text-muted border-transparent hover:bg-s2"
                }`}
              >
                {isDone ? (
                  <span className="w-5 h-5 rounded-full bg-green flex items-center justify-center">
                    <Icon name="check" size={12} className="text-white" />
                  </span>
                ) : (
                  <Icon name={step.icon} size={14} />
                )}
                {step.label}
              </button>
            );
          })}
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-4 items-start">
        {/* Main Content */}
        <div>
          {/* AUFSTELLUNG */}
          {activeStep === "aufstellung" && (
            <div className="grid grid-cols-2 gap-4">
              {([{ team: MATCH.home, lineup: LINEUP_HOME, color: "blue" }, { team: MATCH.away, lineup: LINEUP_AWAY, color: "red" }] as const).map(({ team, lineup, color }) => (
                <Card key={team.short} className="!mb-0">
                  <div className={`text-[13px] font-bold mb-3 text-${color} flex items-center gap-2`}><ClubLogo name={team.name} size={22} />{team.name}</div>
                  <div className="space-y-2">
                    {lineup.map(p => (
                      <div key={p.num} className="flex items-center gap-3 text-[13px]">
                        <span className="w-7 h-7 rounded-full bg-accent/10 flex items-center justify-center text-[11px] font-bold text-accent">{p.num}</span>
                        <span className="font-medium flex-1">{p.name}</span>
                        <Badge color={p.pos === "L" ? "orange" : "purple"}>{p.pos}</Badge>
                        {p.confirmed && <span className="w-4 h-4 rounded-full bg-green flex items-center justify-center"><Icon name="check" size={10} className="text-white" /></span>}
                      </div>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          )}

          {/* ERGEBNIS */}
          {activeStep === "ergebnis" && (
            <Card className="!mb-0">
              <div className="text-[11px] font-bold text-text-muted uppercase tracking-wider mb-4">Satzergebnisse</div>
              <table className="w-full text-[13px]">
                <thead>
                  <tr className="text-left text-[11px] text-text-muted uppercase tracking-wide">
                    <th className="pb-3 font-semibold">Satz</th>
                    <th className="pb-3 font-semibold text-blue">{MATCH.home.short}</th>
                    <th className="pb-3 font-semibold text-red">{MATCH.away.short}</th>
                    <th className="pb-3 font-semibold">Dauer</th>
                    <th className="pb-3 font-semibold">Gewinner</th>
                  </tr>
                </thead>
                <tbody>
                  {MATCH.setScores.map((s, i) => (
                    <tr key={i} className="border-t border-border">
                      <td className="py-3 font-medium">{i + 1}. Satz</td>
                      <td className={`py-3 font-bold ${s.home > s.away ? "text-blue" : ""}`}>{s.home}</td>
                      <td className={`py-3 font-bold ${s.away > s.home ? "text-red" : ""}`}>{s.away}</td>
                      <td className="py-3 text-text-muted">{22 + i * 2} Min.</td>
                      <td className="py-3"><Badge color={s.home > s.away ? "blue" : "red"}>{s.home > s.away ? MATCH.home.short : MATCH.away.short}</Badge></td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="border-t-2 border-border font-bold">
                    <td className="py-3">Gesamt</td>
                    <td className="py-3 text-blue">{MATCH.sets.home}</td>
                    <td className="py-3 text-red">{MATCH.sets.away}</td>
                    <td className="py-3 text-text-muted">1:52</td>
                    <td className="py-3"><Badge color="green">{MATCH.home.short}</Badge></td>
                  </tr>
                </tfoot>
              </table>
            </Card>
          )}

          {/* EREIGNISSE */}
          {activeStep === "ereignisse" && (
            <Card className="!mb-0">
              <div className="text-[11px] font-bold text-text-muted uppercase tracking-wider mb-4">Spielereignisse ({EVENTS_LOG.length})</div>
              {[1, 2, 3, 4].map(setNum => {
                const setEvents = EVENTS_LOG.filter(e => e.set === setNum);
                if (setEvents.length === 0) return null;
                return (
                  <div key={setNum}>
                    <div className="flex items-center gap-3 my-3">
                      <div className="flex-1 h-px bg-border" />
                      <span className="text-[10px] font-bold text-text-muted tracking-widest uppercase">Satz {setNum} — {MATCH.setScores[setNum - 1].home}:{MATCH.setScores[setNum - 1].away}</span>
                      <div className="flex-1 h-px bg-border" />
                    </div>
                    {setEvents.map((e, i) => (
                      <div key={i} className="flex items-center gap-3 py-2">
                        <span className="text-[11px] text-text-muted font-mono w-[40px] text-right shrink-0">{e.time}</span>
                        <span className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${e.team === "home" ? "bg-blue/10 text-blue" : "bg-red/10 text-red"}`}>
                          <Icon name={eventTypeIcons[e.type] || "info"} size={12} />
                        </span>
                        <span className="font-mono text-[11px] bg-s2 rounded px-1.5 py-0.5 text-text-muted shrink-0">{e.score}</span>
                        <span className="text-[13px]">
                          <span className="font-medium">{eventTypeLabels[e.type]}</span>
                          {e.player && <span className="text-text-muted"> — {e.player}</span>}
                        </span>
                        <Badge color={e.team === "home" ? "blue" : "red"}>{e.team === "home" ? MATCH.home.short : MATCH.away.short}</Badge>
                      </div>
                    ))}
                  </div>
                );
              })}
            </Card>
          )}

          {/* SIGNATUR */}
          {activeStep === "signatur" && (
            <>
              <Card className="!mb-4">
                <div className="flex items-center gap-2 mb-4">
                  <Icon name="edit" size={16} className="text-accent" />
                  <span className="text-[14px] font-semibold">Unterschriften</span>
                  <span className="ml-auto text-[12px] text-text-muted">{signedCount} von {signatures.length}</span>
                </div>
                <div className="space-y-0">
                  {signatures.map((sig, i) => (
                    <div key={i} className={`flex items-center justify-between py-3 ${i > 0 ? "border-t border-border" : ""}`}>
                      <div>
                        <div className="text-[12px] text-text-muted">{sig.role}</div>
                        <div className="text-[14px] font-medium">{sig.name}</div>
                      </div>
                      {sig.status === "signed" ? (
                        <Badge color="green">Unterschrieben</Badge>
                      ) : signing === i ? (
                        <div className="flex gap-2">
                          <Button size="sm" variant="ghost" onClick={() => setSigning(null)}>Abbrechen</Button>
                          <Button size="sm" onClick={confirmSign}>Bestatigen</Button>
                        </div>
                      ) : (
                        <Button size="sm" variant="ghost" onClick={() => handleSign(i)}>Unterschreiben</Button>
                      )}
                    </div>
                  ))}
                </div>
              </Card>

              {/* Active Signing Pad */}
              {signing !== null && (
                <Card className="!mb-4" borderColor="border-l-accent">
                  <div className="text-[14px] font-semibold mb-1">{signatures[signing].role} unterschreiben</div>
                  <div className="text-[12px] text-text-muted mb-3">{signatures[signing].name}</div>
                  <div className="border-2 border-dashed border-border rounded-lg h-[140px] flex flex-col items-center justify-center gap-2">
                    <Icon name="edit" size={24} className="text-text-dim" />
                    <span className="text-[13px] text-text-muted">Hier unterschreiben</span>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <Button variant="ghost" className="flex-1" onClick={() => setSigning(null)}>Löschen</Button>
                    <Button className="flex-1" onClick={confirmSign}>Unterschrift bestätigen</Button>
                  </div>
                </Card>
              )}

              {/* Submit */}
              {signedCount === signatures.length && (
                <button className="w-full py-3.5 rounded-lg bg-green text-white font-bold text-[15px] flex items-center justify-center gap-2 cursor-pointer border-none">
                  <Icon name="check" size={18} className="text-white" />
                  Spielbericht abschließen & senden
                </button>
              )}
            </>
          )}
        </div>

        {/* Sidebar */}
        <div>
          <Card className="!mb-4">
            <div className="text-[11px] font-bold text-text-muted uppercase tracking-wider mb-3">Spielinfo</div>
            <div className="space-y-2 text-[12px]">
              <div className="flex justify-between"><span className="text-text-muted">Wettbewerb</span><span>{MATCH.competition}</span></div>
              <div className="flex justify-between"><span className="text-text-muted">Runde</span><span>{MATCH.round}</span></div>
              <div className="flex justify-between"><span className="text-text-muted">Datum</span><span>{MATCH.date}</span></div>
              <div className="flex justify-between"><span className="text-text-muted">Halle</span><span>{MATCH.venue}</span></div>
              <div className="flex justify-between"><span className="text-text-muted">1. SR</span><span>{MATCH.referee1}</span></div>
              <div className="flex justify-between"><span className="text-text-muted">2. SR</span><span>{MATCH.referee2}</span></div>
              <div className="flex justify-between"><span className="text-text-muted">Schreiber</span><span>{MATCH.scorer}</span></div>
            </div>
          </Card>

          <Card className="!mb-4">
            <div className="text-[11px] font-bold text-text-muted uppercase tracking-wider mb-3">Status</div>
            <div className="space-y-2">
              {steps.map((step, i) => {
                const isDone = i < currentIdx;
                const isActive = step.id === activeStep;
                return (
                  <div key={step.id} className="flex items-center gap-2 text-[13px]">
                    {isDone ? (
                      <span className="w-5 h-5 rounded-full bg-green flex items-center justify-center shrink-0"><Icon name="check" size={11} className="text-white" /></span>
                    ) : isActive ? (
                      <span className="w-5 h-5 rounded-full bg-accent flex items-center justify-center shrink-0"><span className="w-2 h-2 rounded-full bg-white" /></span>
                    ) : (
                      <span className="w-5 h-5 rounded-full border-2 border-border shrink-0" />
                    )}
                    <span className={isDone ? "text-green" : isActive ? "text-accent font-medium" : "text-text-muted"}>{step.label}</span>
                  </div>
                );
              })}
            </div>
          </Card>

          <Card className="!mb-4">
            <div className="text-[11px] font-bold text-text-muted uppercase tracking-wider mb-3">Trainer</div>
            <div className="space-y-2 text-[13px]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue" />
                <span className="text-text-muted">Heim:</span>
                <span className="font-medium">{MATCH.coachHome}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red" />
                <span className="text-text-muted">Gast:</span>
                <span className="font-medium">{MATCH.coachAway}</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
