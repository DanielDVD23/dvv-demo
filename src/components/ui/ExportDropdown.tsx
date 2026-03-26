"use client";

import { useState, useRef, useEffect } from "react";
import Button from "./Button";

interface ExportDropdownProps {
  formats?: string[];
}

export default function ExportDropdown({ formats = ["CSV", "PDF"] }: ExportDropdownProps) {
  const [open, setOpen] = useState(false);
  const [exported, setExported] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    if (open) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  const handleExport = (format: string) => {
    setExported(format);
    setOpen(false);
    setTimeout(() => setExported(""), 2500);
  };

  return (
    <div className="relative" ref={ref}>
      <Button variant="ghost" size="sm" onClick={() => setOpen(!open)}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
        Export
      </Button>
      {open && (
        <div className="absolute top-[calc(100%+4px)] right-0 bg-s1 border border-border rounded-[10px] shadow-lg p-1.5 min-w-[160px] z-50 animate-fadeIn">
          {formats.map(f => (
            <div
              key={f}
              className="px-3 py-2 text-[13px] font-medium text-text-dim rounded-[6px] cursor-pointer hover:bg-s2 hover:text-text transition-colors"
              onClick={() => handleExport(f)}
            >
              {f === "DATEV" ? "DATEV-Export" : f === "CSV" ? "CSV-Download" : "PDF-Download"}
            </div>
          ))}
        </div>
      )}
      {exported && (
        <div className="absolute top-[calc(100%+4px)] right-0 bg-green-dim border border-[rgba(22,163,74,0.3)] text-green text-xs font-semibold px-3 py-2 rounded-[6px] z-50 animate-fadeIn whitespace-nowrap">
          {exported}-Export gestartet
        </div>
      )}
    </div>
  );
}
