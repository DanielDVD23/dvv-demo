"use client";

import { useState } from "react";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

const einsaetze = [
  { spielerin: "Lena Weber", current: 14, prev: 18, gesamt: 32, punkte: 48, meldungen: 3 },
  { spielerin: "Anna Koch", current: 12, prev: 16, gesamt: 28, punkte: 35, meldungen: 3 },
  { spielerin: "Sarah Braun", current: 13, prev: 15, gesamt: 28, punkte: 42, meldungen: 3 },
  { spielerin: "Marie Schulz", current: 8, prev: 14, gesamt: 22, punkte: 18, meldungen: 2 },
  { spielerin: "Lisa Fischer", current: 14, prev: 17, gesamt: 31, punkte: 52, meldungen: 3 },
  { spielerin: "Julia Becker", current: 11, prev: 12, gesamt: 23, punkte: 29, meldungen: 3 },
  { spielerin: "Emma Hoffmann", current: 14, prev: 16, gesamt: 30, punkte: 0, meldungen: 3 },
  { spielerin: "Lea Wagner", current: 10, prev: 9, gesamt: 19, punkte: 22, meldungen: 2 },
  { spielerin: "Sophie Krüger", current: 9, prev: 0, gesamt: 9, punkte: 14, meldungen: 1 },
];

export default function EinsatzListe() {
  const [activeSeason, setActiveSeason] = useState<"current" | "prev">("current");

  const totalCurrent = einsaetze.reduce((s, e) => s + e.current, 0);
  const avg = Math.round(totalCurrent / einsaetze.length);
  const topPlayer = einsaetze.reduce((a, b) => a.current > b.current ? a : b);

  return (
    <div>
      {/* KPIs */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="bg-accent-dim border border-[rgba(124,58,237,0.15)] rounded-[8px] p-3 text-center">
          <div className="text-[20px] font-bold text-accent">{totalCurrent}</div>
          <div className="text-[10px] text-text-muted font-semibold">Gesamteinsätze</div>
        </div>
        <div className="bg-s2 border border-border rounded-[8px] p-3 text-center">
          <div className="text-[20px] font-bold">{avg}</div>
          <div className="text-[10px] text-text-muted font-semibold">Durchschnitt</div>
        </div>
        <div className="bg-green-dim border border-[rgba(22,163,74,0.15)] rounded-[8px] p-3 text-center">
          <div className="text-[13px] font-bold text-green">{topPlayer.spielerin}</div>
          <div className="text-[10px] text-text-muted font-semibold">Aktivste ({topPlayer.current} Einsätze)</div>
        </div>
      </div>

      {/* Season Toggle */}
      <div className="flex gap-1.5 mb-3">
        <Button size="sm" variant={activeSeason === "current" ? "primary" : "ghost"} onClick={() => setActiveSeason("current")}>2025/26</Button>
        <Button size="sm" variant={activeSeason === "prev" ? "primary" : "ghost"} onClick={() => setActiveSeason("prev")}>2024/25</Button>
      </div>

      {/* Table */}
      <div className="border border-border rounded-[8px] overflow-hidden">
        <table className="w-full border-collapse text-[13px]">
          <thead>
            <tr className="bg-s2">
              {["Spielerin", "Einsätze", "Vorsaison", "Gesamt", "Punkte", "Meldungen"].map(h => (
                <th key={h} className="text-[10px] font-semibold text-text-muted uppercase tracking-wide px-3 py-2 text-left">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {einsaetze.map((e, i) => (
              <tr key={i} className="hover:bg-s2">
                <td className="px-3 py-2 border-t border-border font-semibold">{e.spielerin}</td>
                <td className="px-3 py-2 border-t border-border font-bold text-accent">{activeSeason === "current" ? e.current : e.prev}</td>
                <td className="px-3 py-2 border-t border-border text-text-muted">{activeSeason === "current" ? e.prev : "–"}</td>
                <td className="px-3 py-2 border-t border-border font-bold">{e.gesamt}</td>
                <td className="px-3 py-2 border-t border-border">{e.punkte}</td>
                <td className="px-3 py-2 border-t border-border"><Badge color="purple">{e.meldungen}</Badge></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
