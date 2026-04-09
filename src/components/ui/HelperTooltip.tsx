"use client";

import { useState, useRef, useEffect } from "react";

interface HelperTooltipProps {
  content: string;
  position?: "top" | "bottom" | "left" | "right";
  children?: React.ReactNode;
}

export default function HelperTooltip({ content, position = "top", children }: HelperTooltipProps) {
  const [visible, setVisible] = useState(false);
  const [actualPos, setActualPos] = useState(position);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (visible && tooltipRef.current && triggerRef.current) {
      const rect = tooltipRef.current.getBoundingClientRect();
      const triggerRect = triggerRef.current.getBoundingClientRect();

      // Auto-flip if tooltip goes out of viewport
      if (position === "top" && rect.top < 8) setActualPos("bottom");
      else if (position === "bottom" && rect.bottom > window.innerHeight - 8) setActualPos("top");
      else if (position === "left" && rect.left < 8) setActualPos("right");
      else if (position === "right" && triggerRect.right + rect.width > window.innerWidth - 8) setActualPos("left");
      else setActualPos(position);
    }
  }, [visible, position]);

  const positionClasses: Record<string, string> = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  };

  const arrowClasses: Record<string, string> = {
    top: "top-full left-1/2 -translate-x-1/2 border-l-transparent border-r-transparent border-b-transparent border-t-[#1e293b]",
    bottom: "bottom-full left-1/2 -translate-x-1/2 border-l-transparent border-r-transparent border-t-transparent border-b-[#1e293b]",
    left: "left-full top-1/2 -translate-y-1/2 border-t-transparent border-b-transparent border-r-transparent border-l-[#1e293b]",
    right: "right-full top-1/2 -translate-y-1/2 border-t-transparent border-b-transparent border-l-transparent border-r-[#1e293b]",
  };

  return (
    <span
      ref={triggerRef}
      className="relative inline-flex items-center"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onFocus={() => setVisible(true)}
      onBlur={() => setVisible(false)}
      tabIndex={0}
    >
      {children || (
        <span className="inline-flex items-center justify-center w-4 h-4 rounded-full border border-border text-text-muted hover:text-accent hover:border-accent transition-colors cursor-help">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <circle cx="12" cy="12" r="10" />
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
            <circle cx="12" cy="17" r="0.5" fill="currentColor" />
          </svg>
        </span>
      )}

      {visible && (
        <div
          ref={tooltipRef}
          className={`absolute z-[1100] ${positionClasses[actualPos]}`}
          style={{ animation: "fadeIn .15s ease" }}
        >
          <div className="bg-[#1e293b] text-white text-[12px] leading-relaxed rounded-md px-3 py-2 max-w-[260px] shadow-lg">
            {content}
          </div>
          <div className={`absolute w-0 h-0 border-[5px] ${arrowClasses[actualPos]}`} />
        </div>
      )}
    </span>
  );
}
