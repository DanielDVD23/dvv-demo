"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import type { Role } from "@/types/roles";
import { tours, type TourStep } from "@/data/onboardingTours";
import Button from "@/components/ui/Button";

interface GuidedTourProps {
  role: Role;
  active: boolean;
  onComplete: () => void;
  onDismiss: () => void;
}

interface HighlightRect {
  top: number;
  left: number;
  width: number;
  height: number;
}

export default function GuidedTour({ role, active, onComplete, onDismiss }: GuidedTourProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [highlight, setHighlight] = useState<HighlightRect | null>(null);
  const [cardPosition, setCardPosition] = useState<{ top: number; left: number }>({ top: 0, left: 0 });
  const [visible, setVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const tour = tours[role];
  const steps = tour.steps;
  const step = steps[currentStep];

  const positionCard = useCallback((targetRect: HighlightRect, stepDef: TourStep) => {
    const padding = 16;
    const cardWidth = 340;
    const cardHeight = 180;

    let top = 0;
    let left = 0;

    switch (stepDef.position) {
      case "bottom":
        top = targetRect.top + targetRect.height + padding;
        left = targetRect.left + targetRect.width / 2 - cardWidth / 2;
        break;
      case "top":
        top = targetRect.top - cardHeight - padding;
        left = targetRect.left + targetRect.width / 2 - cardWidth / 2;
        break;
      case "right":
        top = targetRect.top + targetRect.height / 2 - cardHeight / 2;
        left = targetRect.left + targetRect.width + padding;
        break;
      case "left":
        top = targetRect.top + targetRect.height / 2 - cardHeight / 2;
        left = targetRect.left - cardWidth - padding;
        break;
    }

    // Clamp to viewport
    left = Math.max(16, Math.min(left, window.innerWidth - cardWidth - 16));
    top = Math.max(16, Math.min(top, window.innerHeight - cardHeight - 16));

    setCardPosition({ top, left });
  }, []);

  const updateHighlight = useCallback(() => {
    if (!active || !step) return;

    const el = document.querySelector(step.targetSelector);
    if (el) {
      const rect = el.getBoundingClientRect();
      const padding = 8;
      const highlightRect = {
        top: rect.top - padding,
        left: rect.left - padding,
        width: rect.width + padding * 2,
        height: rect.height + padding * 2,
      };
      setHighlight(highlightRect);
      positionCard(highlightRect, step);
    } else {
      // Fallback: center the card
      setHighlight(null);
      setCardPosition({
        top: window.innerHeight / 2 - 90,
        left: window.innerWidth / 2 - 170,
      });
    }
  }, [active, step, positionCard]);

  useEffect(() => {
    if (active) {
      setCurrentStep(0);
      setVisible(true);
      // Small delay to let DOM settle
      const timer = setTimeout(updateHighlight, 100);
      return () => clearTimeout(timer);
    } else {
      setVisible(false);
    }
  }, [active]);

  useEffect(() => {
    if (active && visible) {
      updateHighlight();

      const handleResize = () => updateHighlight();
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, [active, visible, currentStep, updateHighlight]);

  function handleNext() {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      handleComplete();
    }
  }

  function handlePrev() {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  }

  function handleComplete() {
    setVisible(false);
    onComplete();
  }

  function handleDismiss() {
    setVisible(false);
    onDismiss();
  }

  if (!active || !visible) return null;

  return (
    <div className="fixed inset-0 z-[2000]" style={{ pointerEvents: "auto" }}>
      {/* Dark overlay with hole */}
      <svg className="absolute inset-0 w-full h-full" style={{ pointerEvents: "none" }}>
        <defs>
          <mask id="tour-mask">
            <rect x="0" y="0" width="100%" height="100%" fill="white" />
            {highlight && (
              <rect
                x={highlight.left}
                y={highlight.top}
                width={highlight.width}
                height={highlight.height}
                rx="10"
                fill="black"
              />
            )}
          </mask>
        </defs>
        <rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          fill="rgba(0,0,0,0.6)"
          mask="url(#tour-mask)"
        />
      </svg>

      {/* Highlight border glow */}
      {highlight && (
        <div
          className="absolute rounded-[10px] pointer-events-none"
          style={{
            top: highlight.top,
            left: highlight.left,
            width: highlight.width,
            height: highlight.height,
            boxShadow: "0 0 0 3px rgba(124, 58, 237, 0.5), 0 0 20px rgba(124, 58, 237, 0.3)",
            transition: "all 0.3s ease",
          }}
        />
      )}

      {/* Clickable overlay to allow clicking highlighted element */}
      <div
        className="absolute inset-0"
        style={{ pointerEvents: "auto" }}
        onClick={(e) => {
          // Allow clicking the highlighted element, dismiss otherwise
          if (highlight) {
            const { clientX, clientY } = e;
            const inHighlight =
              clientX >= highlight.left &&
              clientX <= highlight.left + highlight.width &&
              clientY >= highlight.top &&
              clientY <= highlight.top + highlight.height;
            if (!inHighlight) {
              // Don't dismiss on click outside - just prevent default
              e.stopPropagation();
            }
          }
        }}
      />

      {/* Step Card */}
      <div
        ref={cardRef}
        className="absolute bg-s1 border border-border rounded-2xl shadow-2xl overflow-hidden"
        style={{
          top: cardPosition.top,
          left: cardPosition.left,
          width: 340,
          zIndex: 2001,
          pointerEvents: "auto",
          animation: "slideUp .25s ease",
          transition: "top 0.3s ease, left 0.3s ease",
        }}
      >
        {/* Card Header */}
        <div className="px-5 pt-4 pb-0">
          <div className="flex items-center justify-between mb-1">
            <div className="text-[10px] font-semibold text-accent uppercase tracking-wide">
              {tour.title}
            </div>
            <button
              className="bg-transparent border-0 text-text-muted hover:text-text cursor-pointer p-0.5"
              onClick={handleDismiss}
              title="Tour beenden"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
            </button>
          </div>
        </div>

        {/* Card Content */}
        <div className="px-5 py-3">
          <div className="text-[15px] font-bold mb-1.5">{step.title}</div>
          <div className="text-[13px] text-text-dim leading-relaxed">{step.description}</div>
        </div>

        {/* Card Footer */}
        <div className="px-5 py-3 flex items-center justify-between border-t border-border bg-s2">
          {/* Progress */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-text-muted font-medium">
              Schritt {currentStep + 1} von {steps.length}
            </span>
            <div className="flex gap-1">
              {steps.map((_, i) => (
                <div
                  key={i}
                  className={`w-1.5 h-1.5 rounded-full transition-colors ${
                    i === currentStep ? "bg-accent" : i < currentStep ? "bg-accent/40" : "bg-border"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex gap-1.5">
            {currentStep > 0 && (
              <Button variant="ghost" size="sm" onClick={handlePrev}>
                Zur\u00fcck
              </Button>
            )}
            <Button size="sm" onClick={handleNext}>
              {currentStep < steps.length - 1 ? "Weiter" : "Fertig"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
