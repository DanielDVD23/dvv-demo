"use client";

import { useState } from "react";
import Badge from "@/components/ui/Badge";
import Icon from "@/components/ui/Icon";

const kw14 = [
  { tag: "Mo 31.03.", spiele: [] },
  { tag: "Di 01.04.", spiele: [{ zeit: "19:30", heim: "TSV Hannover Herren 2", gast: "VfR Bielefeld", liga: "Bezirksliga", halle: "Sporthalle Am Maschsee", typ: "Heimspiel" }] },
  { tag: "Mi 02.04.", spiele: [{ zeit: "18:00", heim: "TSV Hannover Damen 1", gast: "—", liga: "Verbandsliga", halle: "IGS-Halle", typ: "Training" }] },
  { tag: "Do 03.04.", spiele: [] },
  { tag: "Fr 04.04.", spiele: [{ zeit: "20:00", heim: "TSV Hannover Herren 1", gast: "SC Paderborn", liga: "Verbandsliga Nord", halle: "Sporthalle Am Maschsee", typ: "Heimspiel" }] },
  { tag: "Sa 05.04.", spiele: [
    { zeit: "14:00", heim: "TSV Hannover Damen 1", gast: "MTV Braunschweig", liga: "Verbandsliga Nord", halle: "—", typ: "Auswärts" },
    { zeit: "16:00", heim: "TSV Hannover Herren 2", gast: "SG Münster", liga: "Bezirksliga", halle: "—", typ: "Auswärts" },
  ] },
  { tag: "So 06.04.", spiele: [{ zeit: "11:00", heim: "TSV Hannover Jugend", gast: "SVC Göttingen U18", liga: "Jugend-BL", halle: "Turnhalle Bothfeld", typ: "Heimspiel" }] },
];

const kw15 = [
  { tag: "Mo 07.04.", spiele: [] },
  { tag: "Di 08.04.", spiele: [] },
  { tag: "Mi 09.04.", spiele: [{ zeit: "19:00", heim: "TSV Hannover Herren 1", gast: "SVC Göttingen", liga: "Verbandsliga Nord", halle: "Sporthalle Am Maschsee", typ: "Heimspiel" }] },
  { tag: "Do 10.04.", spiele: [{ zeit: "18:00", heim: "TSV Hannover Damen 1", gast: "—", liga: "Verbandsliga", halle: "IGS-Halle", typ: "Training" }] },
  { tag: "Fr 11.04.", spiele: [] },
  { tag: "Sa 12.04.", spiele: [
    { zeit: "15:00", heim: "TSV Hannover Herren 1", gast: "MTV Wolfsburg", liga: "Verbandsliga Nord", halle: "—", typ: "Auswärts" },
    { zeit: "14:00", heim: "TSV Hannover Damen 1", gast: "TV Hildesheim", liga: "Verbandsliga Nord", halle: "Sporthalle Am Maschsee", typ: "Heimspiel" },
  ] },
  { tag: "So 13.04.", spiele: [] },
];

const weeks: Record<string, typeof kw14> = { "KW 14 (31.03. – 06.04.)": kw14, "KW 15 (07.04. – 13.04.)": kw15 };

const typColor: Record<string, "green" | "blue" | "gray" | "orange"> = { Heimspiel: "green", Auswärts: "blue", Training: "gray" };

export default function Kalender() {
  const [activeWeek, setActiveWeek] = useState(Object.keys(weeks)[0]);
  const data = weeks[activeWeek];

  const totalSpiele = data.reduce((s, d) => s + d.spiele.filter(sp => sp.typ !== "Training").length, 0);
  const heimspiele = data.reduce((s, d) => s + d.spiele.filter(sp => sp.typ === "Heimspiel").length, 0);

  return (
    <div className="animate-fadeIn">
      <div className="flex justify-between items-start mb-6 flex-wrap gap-3">
        <div>
          <h1 className="text-[22px] font-bold mb-1">Vereinskalender</h1>
          <p className="text-[13px] text-text-muted">Spiele und Termine nach Kalenderwoche</p>
        </div>
        <select value={activeWeek} onChange={e => setActiveWeek(e.target.value)} className="!h-[36px] !text-[12px] !w-auto">
          {Object.keys(weeks).map(w => <option key={w} value={w}>{w}</option>)}
        </select>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        <div className="bg-s1 border border-border rounded-[10px] p-4">
          <div className="text-[10px] font-semibold text-text-muted uppercase tracking-wide">Spiele</div>
          <div className="text-[22px] font-bold text-accent mt-1">{totalSpiele}</div>
        </div>
        <div className="bg-s1 border border-border rounded-[10px] p-4">
          <div className="text-[10px] font-semibold text-text-muted uppercase tracking-wide">Heimspiele</div>
          <div className="text-[22px] font-bold text-green mt-1">{heimspiele}</div>
        </div>
        <div className="bg-s1 border border-border rounded-[10px] p-4">
          <div className="text-[10px] font-semibold text-text-muted uppercase tracking-wide">Auswärts</div>
          <div className="text-[22px] font-bold text-blue mt-1">{totalSpiele - heimspiele}</div>
        </div>
      </div>

      {/* Day cards */}
      <div className="space-y-2">
        {data.map((day, i) => (
          <div key={i} className={`bg-s1 border border-border rounded-[10px] overflow-hidden ${day.spiele.length === 0 ? "opacity-50" : ""}`}>
            <div className="flex items-center gap-3 px-4 py-3 border-b border-border bg-s2">
              <Icon name="calendar" size={14} className="text-text-muted" />
              <span className="text-[13px] font-bold">{day.tag}</span>
              {day.spiele.length > 0 && <Badge color="purple">{day.spiele.length} {day.spiele.length === 1 ? "Termin" : "Termine"}</Badge>}
              {day.spiele.length === 0 && <span className="text-[11px] text-text-muted">Keine Termine</span>}
            </div>
            {day.spiele.length > 0 && (
              <div className="divide-y divide-border">
                {day.spiele.map((sp, j) => (
                  <div key={j} className="flex items-center gap-4 px-4 py-3 hover:bg-s2 transition-colors">
                    <span className="text-[13px] font-bold text-accent w-[50px] shrink-0">{sp.zeit}</span>
                    <div className="flex-1 min-w-0">
                      <div className="text-[13px] font-semibold truncate">
                        {sp.typ === "Training" ? sp.heim : `${sp.heim} vs. ${sp.gast}`}
                      </div>
                      <div className="text-[11px] text-text-muted">{sp.liga} · {sp.halle}</div>
                    </div>
                    <Badge color={typColor[sp.typ] || "gray"}>{sp.typ}</Badge>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
