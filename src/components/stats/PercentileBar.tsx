"use client";

interface PercentileBarProps {
  value: number;            // 0-100
  showLabel?: boolean;
  /** Force a custom label (overrides numeric percentage). */
  label?: string;
  /** When true (Player view), low values show a soft "Entwicklungsfeld" framing. */
  positiveFraming?: boolean;
}

/** Purple-monochrom percentile bar.
 *  ≥80 → accent · 60-79 → 75% accent · 40-59 → 55% accent · <40 → 35% accent.
 *  In Player mode (`positiveFraming`), values <30 always render with the lightest tier
 *  and label "Entwicklungsfeld" instead of a number. */
export default function PercentileBar({ value, showLabel = true, label, positiveFraming }: PercentileBarProps) {
  const v = Math.max(0, Math.min(100, value));
  const tier = v >= 80 ? 1 : v >= 60 ? 0.75 : v >= 40 ? 0.55 : 0.35;
  const isLow = positiveFraming && v < 30;
  const opacity = isLow ? 0.35 : tier;
  const minWidth = 3;
  const renderedLabel = label ?? (isLow ? "Entwicklungsfeld" : `${Math.round(v)}%`);

  return (
    <div className="flex items-center gap-2.5 min-w-[140px]">
      <div className="flex-1 h-1.5 rounded-full bg-s3 overflow-hidden">
        <div
          className="h-full rounded-full transition-all"
          style={{ width: `${Math.max(minWidth, v)}%`, background: `rgba(124,58,237,${opacity})` }}
        />
      </div>
      {showLabel && (
        <span
          className={`text-[11px] tabular-nums shrink-0 ${isLow ? "text-text-muted italic" : v >= 70 ? "text-accent font-semibold" : "text-text-muted"}`}
          style={{ minWidth: 64, textAlign: "right" }}
        >
          {renderedLabel}
        </span>
      )}
    </div>
  );
}
