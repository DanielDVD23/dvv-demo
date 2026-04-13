"use client";

import { lookupClubLogo, clubGradient, clubInitials } from "@/lib/clubLogos";

interface ClubLogoProps {
  name: string;
  /** Pixel size (width = height). Default 32. */
  size?: number;
  /** Extra Tailwind classes for the wrapper. */
  className?: string;
  /** When true, render as a square with rounded corners instead of a circle. */
  square?: boolean;
  /** Override the rendered title attribute (tooltip). Defaults to the club name. */
  title?: string;
}

/**
 * Renders a club logo:
 *  - Real PNG from VBL CDN if the club name is in our registry
 *  - Otherwise a deterministic gradient circle with the club's initials
 */
export default function ClubLogo({ name, size = 32, className = "", square = false, title }: ClubLogoProps) {
  const entry = lookupClubLogo(name);
  const radius = square ? "rounded-md" : "rounded-full";
  const dim = { width: size, height: size, minWidth: size, minHeight: size };

  if (entry) {
    return (
      <span
        className={`inline-flex items-center justify-center bg-white border border-border ${radius} overflow-hidden shrink-0 ${className}`}
        style={dim}
        title={title ?? name}
      >
        <img
          src={entry.url}
          alt={name}
          width={size}
          height={size}
          loading="lazy"
          className="object-contain"
          style={{ width: size * 0.85, height: size * 0.85 }}
        />
      </span>
    );
  }

  // Fallback: gradient circle with initials
  const { from, to } = clubGradient(name);
  const initials = clubInitials(name);
  // Scale font to size; cap so very small badges stay legible
  const fontSize = Math.max(9, Math.round(size * 0.36));

  return (
    <span
      className={`inline-flex items-center justify-center text-white font-bold shrink-0 ${radius} ${className}`}
      style={{ ...dim, background: `linear-gradient(135deg, ${from}, ${to})`, fontSize }}
      title={title ?? name}
    >
      {initials}
    </span>
  );
}
