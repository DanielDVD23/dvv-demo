"use client";

import { useState } from "react";

type ViewMode = "Woche" | "Tag" | "Monat";

interface CalendarEvent {
  day: number; // 0=Mo, 1=Di, ... 6=So
  startHour: number;
  startMinute?: number;
  durationRows: number; // in 60px rows
  title: string;
  details: string;
  color: "green" | "purple" | "blue" | "orange";
}

const colorMap = {
  green: {
    bg: "rgba(2,202,75,0.15)",
    border: "#02ca4b",
    text: "#02ca4b",
  },
  purple: {
    bg: "rgba(121,77,255,0.15)",
    border: "#794dff",
    text: "#794dff",
  },
  blue: {
    bg: "rgba(59,130,246,0.15)",
    border: "#3b82f6",
    text: "#3b82f6",
  },
  orange: {
    bg: "rgba(249,115,22,0.15)",
    border: "#f97316",
    text: "#f97316",
  },
};

const events: CalendarEvent[] = [
  {
    day: 0,
    startHour: 11,
    durationRows: 2,
    title: "VBL Nord",
    details: "TSV Hannover vs. MTV Wolfsburg",
    color: "green",
  },
  {
    day: 2,
    startHour: 14,
    durationRows: 2,
    title: "BL Süd",
    details: "SVC Göttingen vs. TV Hildesheim",
    color: "purple",
  },
  {
    day: 3,
    startHour: 9,
    durationRows: 1,
    title: "Staffelsitzung",
    details: "NWVV Online",
    color: "blue",
  },
  {
    day: 3,
    startHour: 11,
    durationRows: 2,
    title: "VBL Nord",
    details: "SC Paderborn vs. VfR Bielefeld",
    color: "green",
  },
  {
    day: 4,
    startHour: 11,
    durationRows: 2,
    title: "VBL Nord",
    details: "USC Braunschweig vs. VC Osnabrück",
    color: "green",
  },
  {
    day: 4,
    startHour: 16,
    durationRows: 2,
    title: "Kreisliga",
    details: "Turnier Vorrunde",
    color: "orange",
  },
  {
    day: 5,
    startHour: 10,
    durationRows: 3,
    title: "BL Süd",
    details: "Spieltag 7 (3 Spiele)",
    color: "purple",
  },
  {
    day: 5,
    startHour: 15,
    durationRows: 2,
    title: "VBL Nord",
    details: "Spieltag 9 (2 Spiele)",
    color: "green",
  },
  {
    day: 6,
    startHour: 10,
    durationRows: 2,
    title: "Jugendliga",
    details: "U18 Turnier",
    color: "blue",
  },
];

const dayLabels = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];
const dayDates = [23, 24, 25, 26, 27, 28, 29];
const hours = Array.from({ length: 12 }, (_, i) => i + 9); // 09:00 – 20:00
const ROW_H = 60;
const TODAY_INDEX = 4; // Fr 27.

interface FilterChip {
  label: string;
  dotColor?: string;
  bgColor?: string;
  active: boolean;
}

const defaultFilters: FilterChip[] = [
  { label: "Alle Ligen", active: false },
  { label: "Verbandsliga Nord", dotColor: "#02ca4b", bgColor: "rgba(2,202,75,0.15)", active: true },
  { label: "Bezirksliga Süd", dotColor: "#794dff", bgColor: "rgba(121,77,255,0.15)", active: true },
  { label: "Kreisliga Hannover", active: false },
  { label: "Jugendliga", active: false },
];

export default function Kalender() {
  const [view, setView] = useState<ViewMode>("Woche");
  const [filters, setFilters] = useState<FilterChip[]>(defaultFilters);

  const toggleFilter = (idx: number) => {
    setFilters((prev) =>
      prev.map((f, i) => (i === idx ? { ...f, active: !f.active } : f))
    );
  };

  return (
    <div className="animate-fadeIn">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h1 style={{ fontSize: 22, fontWeight: 700, color: "#3f404d" }}>
          Spielplan
        </h1>
        <div className="flex items-center gap-1">
          {(["Woche", "Tag", "Monat"] as ViewMode[]).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              style={{
                fontSize: 12,
                fontWeight: 600,
                padding: "6px 14px",
                borderRadius: 6,
                border: v === view ? "none" : "1px solid #e2e8f0",
                background: v === view ? "#794dff" : "#fff",
                color: v === view ? "#fff" : "#3f404d",
                cursor: "pointer",
              }}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      {/* Navigation + Filters */}
      <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <button
            style={{
              width: 28,
              height: 28,
              borderRadius: 6,
              background: "#794dff",
              color: "#fff",
              border: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              fontSize: 14,
              fontWeight: 700,
            }}
          >
            &lt;
          </button>
          <button
            style={{
              width: 28,
              height: 28,
              borderRadius: 6,
              background: "#794dff",
              color: "#fff",
              border: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              fontSize: 14,
              fontWeight: 700,
            }}
          >
            &gt;
          </button>
          <div
            style={{
              background: "rgba(121,77,255,0.08)",
              color: "#794dff",
              fontWeight: 600,
              fontSize: 13,
              padding: "6px 14px",
              borderRadius: 6,
            }}
          >
            KW 13 &middot; 23. &ndash; 29. M&auml;rz 2026
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <span style={{ fontSize: 12, color: "#94a3b8", fontWeight: 500 }}>
            Filter:
          </span>
          {filters.map((f, i) => (
            <button
              key={f.label}
              onClick={() => toggleFilter(i)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                fontSize: 11,
                fontWeight: 500,
                padding: "5px 12px",
                borderRadius: 999,
                border: f.active ? "none" : "1px solid #e2e8f0",
                background: f.active && f.bgColor ? f.bgColor : "#fff",
                color: f.active && f.dotColor ? f.dotColor : "#3f404d",
                cursor: "pointer",
              }}
            >
              {f.dotColor && (
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: f.dotColor,
                    flexShrink: 0,
                  }}
                />
              )}
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Calendar grid */}
      <div
        className="bg-s1 border border-border rounded-[10px] overflow-hidden"
        style={{ display: "flex", flexDirection: "column" }}
      >
        {/* Day header row */}
        <div style={{ display: "flex", borderBottom: "1px solid #e2e8f0" }}>
          {/* Time column spacer */}
          <div
            style={{
              width: 56,
              minWidth: 56,
              height: 44,
              borderRight: "1px solid #e2e8f0",
            }}
          />
          {dayLabels.map((label, i) => (
            <div
              key={label}
              style={{
                flex: 1,
                height: 44,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 13,
                fontWeight: i === TODAY_INDEX ? 700 : 500,
                color: i === TODAY_INDEX ? "#794dff" : "#3f404d",
                background:
                  i === TODAY_INDEX ? "rgba(121,77,255,0.08)" : "transparent",
                borderRight: i < 6 ? "1px solid #e2e8f0" : "none",
              }}
            >
              {label} {dayDates[i]}.
            </div>
          ))}
        </div>

        {/* Scrollable body */}
        <div style={{ overflowY: "auto", maxHeight: "calc(100vh - 240px)" }}>
          <div style={{ display: "flex", position: "relative" }}>
            {/* Time labels column */}
            <div
              style={{
                width: 56,
                minWidth: 56,
                borderRight: "1px solid #e2e8f0",
              }}
            >
              {hours.map((h) => (
                <div
                  key={h}
                  style={{
                    height: ROW_H,
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "flex-end",
                    paddingRight: 8,
                    paddingTop: 4,
                    fontSize: 11,
                    color: "#94a3b8",
                    borderBottom: "1px solid #e2e8f0",
                    boxSizing: "border-box",
                  }}
                >
                  {String(h).padStart(2, "0")}:00
                </div>
              ))}
            </div>

            {/* Day columns */}
            {dayLabels.map((_, dayIdx) => {
              const dayEvents = events.filter((e) => e.day === dayIdx);
              return (
                <div
                  key={dayIdx}
                  style={{
                    flex: 1,
                    position: "relative",
                    background:
                      dayIdx === TODAY_INDEX
                        ? "rgba(121,77,255,0.03)"
                        : "transparent",
                    borderRight: dayIdx < 6 ? "1px solid #e2e8f0" : "none",
                  }}
                >
                  {/* Row grid lines */}
                  {hours.map((h) => (
                    <div
                      key={h}
                      style={{
                        height: ROW_H,
                        borderBottom: "1px solid #e2e8f0",
                        boxSizing: "border-box",
                      }}
                    />
                  ))}

                  {/* Events */}
                  {dayEvents.map((ev, ei) => {
                    const topOffset = (ev.startHour - 9) * ROW_H + (ev.startMinute || 0);
                    const height = ev.durationRows * ROW_H - 4;
                    const c = colorMap[ev.color];
                    return (
                      <div
                        key={ei}
                        style={{
                          position: "absolute",
                          top: topOffset + 2,
                          left: 3,
                          right: 3,
                          height,
                          background: c.bg,
                          borderLeft: `3px solid ${c.border}`,
                          borderRadius: 6,
                          paddingTop: 6,
                          paddingLeft: 8,
                          paddingRight: 8,
                          overflow: "hidden",
                          cursor: "pointer",
                        }}
                      >
                        <div
                          style={{
                            fontSize: 10,
                            fontWeight: 600,
                            color: c.text,
                            lineHeight: "14px",
                          }}
                        >
                          {ev.title}
                        </div>
                        <div
                          style={{
                            fontSize: 10,
                            color: "#3f404d",
                            lineHeight: "14px",
                            marginTop: 2,
                          }}
                        >
                          {ev.details}
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
