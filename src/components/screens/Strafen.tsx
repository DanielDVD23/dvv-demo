"use client";

import { useState } from "react";
import Badge from "@/components/ui/Badge";
import Icon from "@/components/ui/Icon";

const strafen = [
  { id: "ST-2026-001", datum: "12.03.2026", verein: "TV Hannover", grund: "Nichtantritt Verbandsliga Spieltag 7", paragraph: "BSO §17.3", betrag: "150,00", status: "Offen" },
  { id: "ST-2026-002", datum: "05.03.2026", verein: "SVC Göttingen", grund: "Ergebnis nicht fristgerecht gemeldet", paragraph: "BSO §12.4", betrag: "50,00", status: "Bezahlt" },
  { id: "ST-2026-003", datum: "20.02.2026", verein: "MTV Braunschweig", grund: "Spielbericht nicht eingereicht", paragraph: "BSO §11.2", betrag: "75,00", status: "Bezahlt" },
  { id: "ST-2026-004", datum: "18.03.2026", verein: "VfR Bielefeld", grund: "Unsportliches Verhalten Zuschauer", paragraph: "BSO §17.5", betrag: "200,00", status: "Einspruch" },
];

const statusColor: Record<string, "red" | "green" | "orange" | "gray"> = { Offen: "red", Bezahlt: "green", Einspruch: "orange" };

export default function Strafen() {
  const [filter, setFilter] = useState("");

  const filtered = strafen.filter(s => {
    if (!filter) return true;
    return s.status === filter;
  });

  return (
    <div className="animate-fadeIn">
      <div className="mb-6">
        <h1 className="text-[22px] font-bold mb-1">Meine Strafbescheide</h1>
        <p className="text-[13px] text-text-muted">Übersicht der von Ihnen ausgestellten Ordnungsstrafen</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
        <div className="bg-s1 border border-border rounded-[10px] p-4">
          <div className="text-[10px] font-semibold text-text-muted uppercase tracking-wide">Gesamt</div>
          <div className="text-[22px] font-bold mt-1">{strafen.length}</div>
        </div>
        <div className="bg-s1 border border-border rounded-[10px] p-4">
          <div className="text-[10px] font-semibold text-text-muted uppercase tracking-wide">Offen</div>
          <div className="text-[22px] font-bold text-red mt-1">{strafen.filter(s => s.status === "Offen").length}</div>
        </div>
        <div className="bg-s1 border border-border rounded-[10px] p-4">
          <div className="text-[10px] font-semibold text-text-muted uppercase tracking-wide">Einsprüche</div>
          <div className="text-[22px] font-bold text-orange mt-1">{strafen.filter(s => s.status === "Einspruch").length}</div>
        </div>
        <div className="bg-s1 border border-border rounded-[10px] p-4">
          <div className="text-[10px] font-semibold text-text-muted uppercase tracking-wide">Bezahlt</div>
          <div className="text-[22px] font-bold text-green mt-1">{strafen.filter(s => s.status === "Bezahlt").length}</div>
        </div>
      </div>

      {/* Filter */}
      <div className="flex gap-2 mb-4">
        {["", "Offen", "Einspruch", "Bezahlt"].map(f => (
          <button key={f} onClick={() => setFilter(f)} className={`px-3 py-1.5 rounded-full text-[11px] font-semibold border cursor-pointer transition-all ${filter === f ? "bg-accent text-white border-accent" : "bg-s1 text-text-dim border-border hover:bg-s2"}`}>
            {f || "Alle"}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-s1 border border-border rounded-[10px] overflow-hidden">
        <table className="w-full border-collapse text-[13px]">
          <thead>
            <tr>
              <th className="text-[11px] font-semibold text-text-muted uppercase tracking-wide px-3.5 py-2.5 text-left border-b border-border">Nr.</th>
              <th className="text-[11px] font-semibold text-text-muted uppercase tracking-wide px-3.5 py-2.5 text-left border-b border-border">Datum</th>
              <th className="text-[11px] font-semibold text-text-muted uppercase tracking-wide px-3.5 py-2.5 text-left border-b border-border">Verein</th>
              <th className="text-[11px] font-semibold text-text-muted uppercase tracking-wide px-3.5 py-2.5 text-left border-b border-border">Grund</th>
              <th className="text-[11px] font-semibold text-text-muted uppercase tracking-wide px-3.5 py-2.5 text-left border-b border-border">§</th>
              <th className="text-[11px] font-semibold text-text-muted uppercase tracking-wide px-3.5 py-2.5 text-left border-b border-border">Betrag</th>
              <th className="text-[11px] font-semibold text-text-muted uppercase tracking-wide px-3.5 py-2.5 text-left border-b border-border">Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((s, i) => (
              <tr key={i} className="hover:bg-s2">
                <td className="px-3.5 py-3 border-b border-border font-mono text-[11px] font-semibold">{s.id}</td>
                <td className="px-3.5 py-3 border-b border-border">{s.datum}</td>
                <td className="px-3.5 py-3 border-b border-border font-semibold">{s.verein}</td>
                <td className="px-3.5 py-3 border-b border-border text-text-dim text-[12px]">{s.grund}</td>
                <td className="px-3.5 py-3 border-b border-border text-[11px] text-text-muted">{s.paragraph}</td>
                <td className="px-3.5 py-3 border-b border-border font-bold">€ {s.betrag}</td>
                <td className="px-3.5 py-3 border-b border-border"><Badge color={statusColor[s.status] || "gray"}>{s.status}</Badge></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
