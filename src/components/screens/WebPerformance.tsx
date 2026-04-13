"use client";

import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";

const KPIS = [
  { label: "Total Visits", value: "247.849", trend: "+93,67%", up: true, sub: "vs. Vormonat" },
  { label: "Monthly Unique Visitors", value: "34.667", trend: null, up: true, sub: "Deduplizierte Audience: 30.378" },
  { label: "Pages / Visit", value: "4,17", trend: null, up: true, sub: "Visit Duration: 00:02:03" },
  { label: "Bounce Rate", value: "47,78%", trend: null, up: false, sub: "Industry Rank: #47" },
];

const CHANNELS = [
  { name: "Organic", pct: 62.37, color: "bg-green" },
  { name: "Direct", pct: 33.19, color: "bg-accent" },
  { name: "Referral", pct: 2.47, color: "bg-blue" },
  { name: "Social", pct: 1.68, color: "bg-[#ec4899]" },
  { name: "Paid", pct: 0.01, color: "bg-orange" },
  { name: "Email", pct: 0.01, color: "bg-text-muted" },
];

const RANKINGS_DATA = [
  { rank: 1, domain: "volleybox.net", share: 6.10, indRank: "#420" },
  { rank: 2, domain: "volleyball-bundesliga.de", share: 5.58, indRank: "#514" },
  { rank: 3, domain: "sams-server.de", share: 5.44, indRank: "#528" },
  { rank: 4, domain: "women.volleyballworld.com", share: 4.47, indRank: "#573" },
  { rank: 5, domain: "dvv-ligen.de", share: 3.82, indRank: "#590" },
  { rank: 6, domain: "volleyball-verband.de", share: 3.37, indRank: "#603", highlight: true },
  { rank: 7, domain: "volleyballdirekt.de", share: 3.43, indRank: "#782" },
  { rank: 8, domain: "sams-score.de", share: 3.30, indRank: "#907" },
];

const maxShare = Math.max(...RANKINGS_DATA.map(r => r.share));

export default function WebPerformance() {
  return (
    <div className="animate-fadeIn">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="text-[22px] font-bold mb-1">Website Performance & Rankings</h1>
          <p className="text-[13px] text-text-muted">Traffic-Analyse und Position im Volleyball-Ökosystem</p>
        </div>
        <Button variant="ghost"><Icon name="bar-chart" size={14} /> Export</Button>
      </div>

      {/* Website Selector */}
      <Card className="!mb-4 !p-3">
        <div className="flex gap-3 flex-wrap items-center">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-accent/30 bg-accent-dim text-accent text-[13px] font-medium">
            <span>🏐</span> volleyball-verband.de <span className="opacity-50">▾</span>
          </div>
          <span className="text-[12px] text-text-muted">Jan 2026 – Mär 2026</span>
          <span className="text-[12px] text-text-muted">🇩🇪 Deutschland</span>
        </div>
      </Card>

      {/* KPIs */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 mb-4">
        {KPIS.map(k => (
          <Card key={k.label} className="!mb-0">
            <div className="text-[11px] font-semibold text-text-muted uppercase tracking-wide mb-1">{k.label}</div>
            <div className="flex items-baseline gap-2">
              <span className="text-[28px] font-bold text-text leading-none">{k.value}</span>
              {k.trend && <span className={`text-[13px] font-medium ${k.up ? "text-green" : "text-red"}`}>{k.trend}</span>}
            </div>
            <div className="text-[12px] text-text-muted mt-1">{k.sub}</div>
          </Card>
        ))}
      </div>

      {/* Device + Rankings Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
        {/* Device Distribution */}
        <Card className="!mb-0">
          <div className="text-[11px] font-bold text-text-muted uppercase tracking-wider mb-4">Geräteverteilung</div>
          <div className="flex items-center gap-6">
            {/* Donut SVG */}
            <svg width="120" height="120" viewBox="0 0 120 120" className="shrink-0">
              <circle cx="60" cy="60" r="50" fill="none" stroke="#e8e5f0" strokeWidth="16" />
              <circle cx="60" cy="60" r="50" fill="none" stroke="#8B5CF6" strokeWidth="16"
                strokeDasharray={`${66.11 * 3.14} ${100 * 3.14}`}
                strokeDashoffset="0" transform="rotate(-90 60 60)" strokeLinecap="round" />
              <circle cx="60" cy="60" r="50" fill="none" stroke="#2563eb" strokeWidth="16"
                strokeDasharray={`${33.89 * 3.14} ${100 * 3.14}`}
                strokeDashoffset={`${-66.11 * 3.14}`} transform="rotate(-90 60 60)" strokeLinecap="round" />
              <text x="60" y="56" textAnchor="middle" className="text-[18px] font-bold fill-text">66%</text>
              <text x="60" y="72" textAnchor="middle" className="text-[10px] fill-text-muted">Mobile</text>
            </svg>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm bg-[#8B5CF6]" />
                <span className="text-[13px]">Mobile Web</span>
                <span className="text-[13px] font-bold ml-auto">66,11%</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm bg-[#2563eb]" />
                <span className="text-[13px]">Desktop</span>
                <span className="text-[13px] font-bold ml-auto">33,89%</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Rankings */}
        <Card className="!mb-0">
          <div className="text-[11px] font-bold text-text-muted uppercase tracking-wider mb-4">Rankings</div>
          <div className="space-y-4">
            {[
              { label: "Global Rank", value: "#262.175" },
              { label: "Country Rank 🇩🇪", value: "#14.529" },
              { label: "Industry Rank (Volleyball)", value: "#47" },
            ].map(r => (
              <div key={r.label} className="flex items-center justify-between">
                <span className="text-[13px] text-text-muted">{r.label}</span>
                <span className="text-[20px] font-bold text-text">{r.value}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Channels Overview */}
      <Card className="!mb-4">
        <div className="text-[11px] font-bold text-text-muted uppercase tracking-wider mb-4">Traffic-Kanäle</div>
        <div className="space-y-3">
          {CHANNELS.map(c => (
            <div key={c.name} className="flex items-center gap-3">
              <span className="text-[13px] w-[80px] shrink-0">{c.name}</span>
              <div className="flex-1 h-[20px] bg-s2 rounded-full overflow-hidden">
                <div className={`h-full ${c.color} rounded-full`} style={{ width: Math.max((c.pct / 62.37) * 100, 1) + "%", minWidth: c.pct < 1 ? 4 : undefined }} />
              </div>
              <span className="text-[13px] font-medium w-[60px] text-right">{c.pct.toFixed(2)}%</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Industry Rankings Table */}
      <Card className="!mb-0 !p-0 overflow-hidden">
        <div className="px-5 py-4">
          <div className="text-[11px] font-bold text-text-muted uppercase tracking-wider">Industry Rankings – Volleyball</div>
        </div>
        <table className="w-full text-[13px]">
          <thead>
            <tr className="text-left text-[11px] text-text-muted uppercase tracking-wide border-t border-border bg-s2">
              <th className="px-5 py-3 font-semibold w-[40px]">#</th>
              <th className="px-5 py-3 font-semibold">Domain</th>
              <th className="px-5 py-3 font-semibold w-[200px]">Traffic Share</th>
              <th className="px-5 py-3 font-semibold text-right w-[100px]">Ind. Rank</th>
            </tr>
          </thead>
          <tbody>
            {RANKINGS_DATA.map(r => (
              <tr key={r.rank} className={`border-t border-border ${r.highlight ? "bg-accent-dim border-l-[3px] border-l-accent font-bold" : "hover:bg-s2/50"} transition-colors`}>
                <td className="px-5 py-3 text-text-muted">{r.rank}</td>
                <td className="px-5 py-3 max-w-[200px] truncate" title={r.domain}>
                  {r.highlight && <span className="text-accent mr-1">●</span>}
                  {r.domain}
                </td>
                <td className="px-5 py-3">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-[6px] bg-s3 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${r.highlight ? "bg-accent" : "bg-text-muted/40"}`} style={{ width: (r.share / maxShare) * 100 + "%" }} />
                    </div>
                    <span className="text-[11px] w-[40px] text-right">{r.share.toFixed(2)}%</span>
                  </div>
                </td>
                <td className="px-5 py-3 text-right text-text-muted">{r.indRank}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
