"use client";

import { useState, useEffect, useCallback } from "react";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import Icon from "@/components/ui/Icon";

/* ── Confetti Effect ── */
function ConfettiOverlay({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2000);
    return () => clearTimeout(t);
  }, [onDone]);

  const colors = ["#7c3aed", "#16a34a", "#f59e0b", "#ef4444", "#2563eb", "#ff2d55"];
  const pieces = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    color: colors[Math.floor(Math.random() * colors.length)],
    delay: Math.random() * 0.5,
    size: 6 + Math.random() * 6,
    rotation: Math.random() * 360,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-[800]">
      {pieces.map((p) => (
        <div
          key={p.id}
          className="absolute animate-confetti"
          style={{
            left: `${p.x}%`,
            top: -10,
            width: p.size,
            height: p.size,
            background: p.color,
            borderRadius: p.size > 9 ? "50%" : "1px",
            animationDelay: `${p.delay}s`,
            transform: `rotate(${p.rotation}deg)`,
          }}
        />
      ))}
    </div>
  );
}

/* ── Micro-Sprint Wizard ── */
interface SprintStep {
  id: number;
  label: string;
  sublabel: string;
  icon: string;
  completed: boolean;
}

const INITIAL_STEPS: SprintStep[] = [
  { id: 1, label: "Spieler-Foto aktualisieren", sublabel: "Max Berger \u2013 Passfoto hochladen", icon: "camera", completed: false },
  { id: 2, label: "Lizenz verl\u00E4ngern", sublabel: "Antrag automatisch generiert", icon: "clipboard", completed: false },
  { id: 3, label: "Best\u00E4tigung senden", sublabel: "An Staffelleitung weiterleiten", icon: "send", completed: false },
];

function MicroSprintWizard({ onComplete }: { onComplete: () => void }) {
  const [steps, setSteps] = useState(INITIAL_STEPS);
  const completed = steps.filter((s) => s.completed).length;
  const progress = (completed / steps.length) * 100;
  const allDone = completed === steps.length;

  const handleStep = (id: number) => {
    setSteps((prev) => prev.map((s) => (s.id === id ? { ...s, completed: true } : s)));
  };

  useEffect(() => {
    if (allDone) {
      const t = setTimeout(onComplete, 600);
      return () => clearTimeout(t);
    }
  }, [allDone, onComplete]);

  return (
    <div className="mt-3">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[11px] font-bold text-text-muted uppercase tracking-wider">Micro-Sprint</span>
        <span className="text-[11px] font-semibold text-accent">{completed}/{steps.length} erledigt</span>
      </div>

      {/* Progress bar */}
      <div className="w-full h-2 bg-s3 rounded-full overflow-hidden mb-3">
        <div
          className="h-full bg-gradient-to-r from-accent to-green rounded-full transition-all duration-500 ease-out animate-progress"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Steps */}
      <div className="space-y-2">
        {steps.map((step) => (
          <div
            key={step.id}
            className={`flex items-center gap-3 p-3 rounded-[8px] border transition-all ${
              step.completed
                ? "bg-green-dim border-[rgba(22,163,74,0.2)] opacity-70"
                : "bg-s1 border-border cursor-pointer hover:bg-s2"
            }`}
            onClick={() => !step.completed && handleStep(step.id)}
          >
            {step.completed ? (
              <div className="w-7 h-7 rounded-full bg-green flex items-center justify-center shrink-0">
                <Icon name="check" size={14} className="text-white" />
              </div>
            ) : (
              <div className="w-7 h-7 rounded-full bg-accent-dim flex items-center justify-center shrink-0">
                <Icon name={step.icon} size={14} className="text-accent" />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <div className={`text-[13px] font-semibold ${step.completed ? "line-through text-text-muted" : ""}`}>
                {step.label}
              </div>
              <div className="text-[11px] text-text-muted">{step.sublabel}</div>
            </div>
            {!step.completed && (
              <span className="text-[11px] text-accent font-semibold whitespace-nowrap">Klick zum Erledigen</span>
            )}
          </div>
        ))}
      </div>

      {allDone && (
        <div className="mt-3 bg-green-dim border border-[rgba(22,163,74,0.2)] rounded-[10px] p-3 flex items-center gap-2 animate-fadeIn text-center justify-center">
          <Icon name="check" size={16} className="text-green" />
          <span className="text-[13px] font-bold text-green">Sprint abgeschlossen!</span>
        </div>
      )}
    </div>
  );
}

/* ── Main ComplianceStreak Widget ── */
export default function ComplianceStreak() {
  const [streakCount] = useState(5);
  const [showWizard, setShowWizard] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [badgeEarned, setBadgeEarned] = useState(false);

  const handleSprintComplete = useCallback(() => {
    setShowConfetti(true);
    setBadgeEarned(true);
  }, []);

  if (dismissed && !showConfetti) return null;

  return (
    <>
      {showConfetti && <ConfettiOverlay onDone={() => setShowConfetti(false)} />}

      <div className="bg-gradient-to-r from-accent-dim via-s1 to-blue-dim border border-accent/20 rounded-[14px] p-5 mb-5 relative overflow-hidden">
        {/* Dismiss button */}
        <button
          className="absolute top-3 right-3 w-6 h-6 rounded-full bg-s2 border border-border flex items-center justify-center cursor-pointer hover:bg-s3 transition-colors z-10"
          onClick={() => setDismissed(true)}
        >
          <Icon name="x" size={10} className="text-text-muted" />
        </button>

        <div className="flex items-start gap-4 flex-wrap">
          {/* Streak Counter */}
          <div className="flex flex-col items-center shrink-0">
            <div className="relative">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-orange to-[#f59e0b] flex items-center justify-center animate-flame">
                <Icon name="flame" size={28} className="text-white" />
              </div>
              <div className="absolute -bottom-1 -right-1 bg-white border-2 border-orange rounded-full w-6 h-6 flex items-center justify-center">
                <span className="text-[11px] font-bold text-orange">{streakCount}</span>
              </div>
            </div>
            <div className="text-[10px] font-bold text-orange mt-1.5 uppercase tracking-wider">Wochen-Streak</div>
          </div>

          {/* Nudge Message */}
          <div className="flex-1 min-w-[200px]">
            <div className="flex items-center gap-2 mb-1.5">
              <Icon name="sparkle" size={16} className="text-accent" />
              <span className="text-[11px] font-bold text-accent uppercase tracking-wider">KI-Assistent</span>
            </div>
            <div className="text-[14px] font-bold mb-1">
              Andr\u00E9, deine {streakCount}-Wochen &ldquo;Perfekter Spielbericht&rdquo;-Streak ist in Gefahr!
            </div>
            <p className="text-[12px] text-text-dim leading-relaxed mb-2">
              Lade nur noch 2 Spieler-Bilder hoch, um an der Spitze der Bezirksliga zu bleiben. Dein Team ist fast perfekt vorbereitet.
            </p>

            {!showWizard && !badgeEarned && (
              <div className="flex items-center gap-2">
                <Button size="sm" onClick={() => setShowWizard(true)}>
                  Sprint starten
                </Button>
                <span className="text-[11px] text-text-muted">~2 Min \u00B7 3 Schritte</span>
              </div>
            )}

            {badgeEarned && (
              <div className="flex items-center gap-3 mt-2 animate-fadeIn">
                <div className="flex items-center gap-2 bg-green-dim border border-[rgba(22,163,74,0.2)] rounded-full px-3 py-1.5">
                  <Icon name="award" size={14} className="text-green" />
                  <span className="text-[12px] font-bold text-green">Wochenend-Retter!</span>
                </div>
                <div className="flex items-center gap-2 bg-gold-dim border border-[rgba(245,158,11,0.2)] rounded-full px-3 py-1.5">
                  <Icon name="flame" size={14} className="text-[#f59e0b]" />
                  <span className="text-[12px] font-bold text-[#f59e0b]">Streak: {streakCount + 1} Wochen</span>
                </div>
              </div>
            )}

            {showWizard && !badgeEarned && <MicroSprintWizard onComplete={handleSprintComplete} />}
          </div>
        </div>
      </div>
    </>
  );
}
