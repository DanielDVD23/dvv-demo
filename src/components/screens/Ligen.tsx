"use client";

import { useState } from "react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";

const standings = [
  { pl: 1, team: "TSV Hannover", sp: 8, g: 7, v: 1, saetze: "22:7", punkte: 21, highlight: true },
  { pl: 2, team: "SVC Göttingen", sp: 8, g: 6, v: 2, saetze: "19:9", punkte: 18 },
  { pl: 3, team: "MTV Wolfsburg", sp: 7, g: 5, v: 2, saetze: "17:8", punkte: 17 },
  { pl: 4, team: "VfR Bielefeld", sp: 8, g: 4, v: 4, saetze: "13:14", punkte: 12 },
  { pl: 9, team: "SC Osnabrück", sp: 8, g: 1, v: 7, saetze: "6:22", punkte: 3, danger: true },
  { pl: 10, team: "TV Hildesheim", sp: 8, g: 0, v: 8, saetze: "2:24", punkte: 0, danger: true },
];

const ligaIds = ["vbl-nord-herren", "bl-damen-1", "kl-herren-hannover"];

export default function Ligen({ initialLiga }: { initialLiga?: string } = {}) {
  const [activeLiga, setActiveLiga] = useState(initialLiga ? Math.max(0, ligaIds.indexOf(initialLiga)) : 0);
  const [accordionOpen, setAccordionOpen] = useState(false);

  return (
    <div className="animate-fadeIn">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-[22px] font-bold mb-1">Meine Ligen</h1>
          <p className="text-[13px] text-text-muted">3 gepinnte Ligen · Schnellzugriff ohne Hierarchie</p>
        </div>
        <div className="flex gap-2 items-center">
          <input className="!w-[200px]" placeholder="Liga suchen…" />
          <Button>+ Liga pinnen</Button>
        </div>
      </div>

      {/* Schnellwechsler */}
      <div className="flex gap-2 mb-5 items-center">
        <span className="text-xs text-text-muted font-semibold">Schnellwechsel:</span>
        {["Verbandsliga Nord", "Bezirksliga Damen", "Kreisliga Hannover"].map((name, i) => (
          <Button key={i} variant={activeLiga === i ? "primary" : "ghost"} size="sm" onClick={() => setActiveLiga(i)}>
            {name}
          </Button>
        ))}
      </div>

      {/* Liga Detail */}
      <Card borderColor="border-l-green">
        <div className="flex justify-between items-start mb-3.5">
          <div>
            <div className="text-base font-bold">Verbandsliga Nord Herren</div>
            <div className="text-xs text-text-muted">NWVV › Herren › Verbandsligen › Nord · Saison 2025/26</div>
          </div>
          <div className="flex gap-2">
            <Badge color="green">Laufend</Badge>
            <Button variant="ghost" size="sm">Liga bearbeiten</Button>
          </div>
        </div>

        {/* Mini Stats */}
        <div className="grid grid-cols-4 gap-4 mb-4">
          {[
            { val: "10", label: "Mannschaften" },
            { val: "2", label: "Ergebnisse offen", color: "text-orange" },
            { val: "8", label: "Spieltag aktuell" },
            { val: "95%", label: "Termine bestätigt", color: "text-green" },
          ].map((s, i) => (
            <div key={i} className="bg-s2 rounded-[6px] p-3 text-center">
              <div className={`text-[22px] font-bold ${s.color || ""}`}>{s.val}</div>
              <div className="text-[11px] text-text-muted">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Table */}
        <table className="w-full border-collapse text-[13px]">
          <thead>
            <tr>
              {["Pl.", "Mannschaft", "Sp", "G", "V", "Sätze", "Punkte"].map(h => (
                <th key={h} className="text-[11px] font-semibold text-text-muted uppercase tracking-wide px-3.5 py-2.5 text-left border-b border-border">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {standings.map((row) => (
              <tr key={row.pl} className={row.highlight ? "bg-[rgba(34,197,94,0.05)]" : row.danger ? "bg-[rgba(239,68,68,0.04)]" : ""}>
                <td className="px-3.5 py-3 border-b border-border"><strong>{row.pl}</strong></td>
                <td className="px-3.5 py-3 border-b border-border">{row.team}</td>
                <td className="px-3.5 py-3 border-b border-border">{row.sp}</td>
                <td className="px-3.5 py-3 border-b border-border">{row.g}</td>
                <td className="px-3.5 py-3 border-b border-border">{row.v}</td>
                <td className="px-3.5 py-3 border-b border-border">{row.saetze}</td>
                <td className={`px-3.5 py-3 border-b border-border font-bold ${row.highlight ? "text-green" : row.danger ? "text-red" : ""}`}>{row.punkte}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {/* Accordion */}
      <div className="border border-border rounded-[10px] overflow-hidden">
        <div
          className="flex items-center gap-2.5 py-3.5 px-4 bg-s2 cursor-pointer hover:bg-s3 transition-colors"
          onClick={() => setAccordionOpen(!accordionOpen)}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 7h18M3 12h18M3 17h18" /></svg>
          <span className="text-sm font-semibold flex-1">Verbandsstruktur durchsuchen</span>
          <span className="text-[11px] text-text-muted">NWVV → Staffeln → Ligen</span>
          <svg className={`transition-transform ${accordionOpen ? "rotate-180" : ""}`} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9" /></svg>
        </div>
        {accordionOpen && (
          <div className="p-4 bg-s1">
            <div className="text-text-muted text-[13px] py-2">
              Hier: NWVV → Herren → Verbandsligen → Nord / Süd / Ost / West → einzelne Liga<br />
              <em className="text-[11px]">Tiefe Navigation nur bei Bedarf – deine gepinnten Ligen sind immer oben erreichbar.</em>
            </div>
            <div className="flex gap-2 flex-wrap mt-2.5 items-center">
              <span className="text-[11px] text-text-muted bg-s2 px-2 py-0.5 rounded">NWVV</span>
              <span>›</span>
              <span className="text-[11px] text-text-muted bg-s2 px-2 py-0.5 rounded">Herren</span>
              <span>›</span>
              <span className="text-[11px] text-text-muted bg-s2 px-2 py-0.5 rounded">Verbandsligen</span>
              <span>›</span>
              <span className="text-[11px] text-accent bg-s2 px-2 py-0.5 rounded border border-accent inline-flex items-center gap-1">Nord <Icon name="check" size={12} /></span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
