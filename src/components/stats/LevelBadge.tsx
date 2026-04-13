"use client";

import type { LevelTier } from "@/types/stats";

interface LevelBadgeProps {
  level: LevelTier;
  size?: "sm" | "md";
}

const TIER_OPACITY: Record<LevelTier, number> = {
  Top: 1,
  High: 0.78,
  Average: 0.55,
  "Below Avg": 0.4,
  Low: 0.28,
};

export default function LevelBadge({ level, size = "sm" }: LevelBadgeProps) {
  const opacity = TIER_OPACITY[level] ?? 0.55;
  const px = size === "md" ? "px-2.5 py-1 text-[11px]" : "px-1.5 py-0.5 text-[10px]";
  return (
    <span
      className={`inline-flex items-center rounded-full font-bold uppercase tracking-wide ${px}`}
      style={{
        background: `rgba(124,58,237,${opacity * 0.18})`,
        color: opacity >= 0.7 ? "var(--color-accent)" : "var(--color-text-dim)",
      }}
    >
      {level}
    </span>
  );
}
