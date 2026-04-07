"use client";

import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";

const TOP_SCORER = [
  { name: "Benjamin Patch", verein: "BR Volleys", punkte: 312, asse: 42, blocks: 28, saison: "2025/26" },
  { name: "Moritz Karlitzek", verein: "VfB Friedrichshafen", punkte: 287, asse: 35, blocks: 31, saison: "2025/26" },
  { name: "Lukas Kampa", verein: "Grizzlys Giesen", punkte: 245, asse: 28, blocks: 18, saison: "2025/26" },
  { name: "Tim Peter", verein: "Alpenvolleys", punkte: 234, asse: 38, blocks: 22, saison: "2025/26" },
  { name: "Christian Fromm", verein: "BR Volleys", punkte: 218, asse: 25, blocks: 35, saison: "2025/26" },
];

const TEAM_STATS = [
  { team: "BR Volleys", siege: 16, niederlagen: 2, satzquote: "89%", angriff: "52%", block: "14%" },
  { team: "VfB Friedrichshafen", siege: 14, niederlagen: 4, satzquote: "78%", angriff: "48%", block: "12%" },
  { team: "Grizzlys Giesen", siege: 12, niederlagen: 6, satzquote: "67%", angriff: "45%", block: "11%" },
];

export default function Spielanalyse() {
  return (
    <div className="animate-fadeIn">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="text-[22px] font-bold mb-1">Spielanalyse & Statistiken</h1>
          <p className="text-[13px] text-text-muted">1. Bundesliga Männer · Saison 2025/26</p>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost">Vergleichs-Tool</Button>
          <Button variant="ghost"><Icon name="bar-chart" size={14} /> Export</Button>
        </div>
      </div>

      {/* Top Scorer */}
      <Card noPadding className="!mb-5">
        <div className="px-5 py-3 border-b border-border">
          <span className="text-xs font-bold text-text-muted uppercase tracking-wider">Top-Scorer Saison</span>
        </div>
        <table className="w-full border-collapse text-[13px]">
          <thead><tr>
            {["#", "Spieler", "Verein", "Punkte", "Asse", "Blocks"].map(h => (
              <th key={h} className="text-[11px] font-semibold text-text-muted uppercase tracking-wide px-4 py-2.5 text-left border-b border-border">{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {TOP_SCORER.map((s, i) => (
              <tr key={i} className="hover:bg-s2 cursor-pointer">
                <td className="px-4 py-2.5 border-b border-border font-bold text-accent">{i + 1}</td>
                <td className="px-4 py-2.5 border-b border-border font-semibold">{s.name}</td>
                <td className="px-4 py-2.5 border-b border-border text-text-dim">{s.verein}</td>
                <td className="px-4 py-2.5 border-b border-border font-bold text-[16px]">{s.punkte}</td>
                <td className="px-4 py-2.5 border-b border-border">{s.asse}</td>
                <td className="px-4 py-2.5 border-b border-border">{s.blocks}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {/* Team Stats */}
      <Card noPadding className="!mb-0">
        <div className="px-5 py-3 border-b border-border">
          <span className="text-xs font-bold text-text-muted uppercase tracking-wider">Mannschafts-Statistiken</span>
        </div>
        <table className="w-full border-collapse text-[13px]">
          <thead><tr>
            {["Team", "Siege", "Niederlagen", "Satzquote", "Angriffsquote", "Blockquote"].map(h => (
              <th key={h} className="text-[11px] font-semibold text-text-muted uppercase tracking-wide px-4 py-2.5 text-left border-b border-border">{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {TEAM_STATS.map((t, i) => (
              <tr key={i} className="hover:bg-s2 cursor-pointer">
                <td className="px-4 py-2.5 border-b border-border font-semibold">{t.team}</td>
                <td className="px-4 py-2.5 border-b border-border text-green font-semibold">{t.siege}</td>
                <td className="px-4 py-2.5 border-b border-border text-red">{t.niederlagen}</td>
                <td className="px-4 py-2.5 border-b border-border font-semibold">{t.satzquote}</td>
                <td className="px-4 py-2.5 border-b border-border">{t.angriff}</td>
                <td className="px-4 py-2.5 border-b border-border">{t.block}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
