"use client";

import { useState, useRef, useEffect } from "react";
import Icon from "@/components/ui/Icon";

interface HelperTooltipProps {
  title: string;
  body: string;
  learnMore?: string;
}

export default function HelperTooltip({ title, body, learnMore }: HelperTooltipProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const escHandler = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("mousedown", handler);
    document.addEventListener("keydown", escHandler);
    return () => { document.removeEventListener("mousedown", handler); document.removeEventListener("keydown", escHandler); };
  }, [open]);

  return (
    <div className="relative inline-flex" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="w-4 h-4 flex items-center justify-center cursor-pointer bg-transparent border-none p-0"
        aria-label={`Hilfe: ${title}`}
        title={title}
      >
        <Icon name="info" size={14} className={`transition-colors ${open ? "text-accent" : "text-text-dim hover:text-accent"}`} />
      </button>
      {open && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-30 animate-fadeIn">
          <div className="bg-[#1e1b4b] text-white rounded-lg shadow-lg px-3.5 py-3 w-[260px]">
            <div className="text-[12px] font-semibold mb-1">{title}</div>
            <div className="text-[12px] opacity-75 leading-relaxed">{body}</div>
            {learnMore && (
              <div className="mt-2 text-[11px] text-accent cursor-pointer hover:underline">Mehr erfahren</div>
            )}
          </div>
          <div className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 bg-[#1e1b4b] rotate-45 -mt-1" />
        </div>
      )}
    </div>
  );
}
