"use client";

import { useState } from "react";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import KpiCard from "@/components/ui/KpiCard";

const KPIS = [
  { label: "Registrierte Spieler", value: "14.823", sub: "Saison 2025/26", color: "purple" as const, icon: "users", trend: "+12%" },
  { label: "Aktive Vereine", value: "1.247", sub: "+38 neue diese Saison", color: "green" as const, icon: "building" },
  { label: "Gültige Lizenzen", value: "82%", sub: "12.104 von 14.823", color: "green" as const, icon: "shield-check" },
  { label: "Veranstaltungen", value: "34/48", sub: "34 durchgeführt, 14 geplant", color: "purple" as const, icon: "calendar" },
  { label: "Social Media Reichweite", value: "2.4M", sub: "Kumuliert IG + TT + FB", color: "blue" as const, icon: "trending-up" },
];

const MONTHS = ["Sep", "Okt", "Nov", "Dez", "Jan", "Feb", "Mar", "Apr"];
const MEMBERS_CURRENT = [13200, 13450, 13800, 14100, 14300, 14500, 14650, 14823];
const MEMBERS_PREV = [12100, 12250, 12400, 12600, 12750, 12900, 13000, 13100];

const LICENSE_DATA = MONTHS.map((_, i) => ({
  aktiv: 75 + Math.floor(Math.random() * 10),
  ausstehend: 10 + Math.floor(Math.random() * 5),
  abgelaufen: 5 + Math.floor(Math.random() * 5),
}));

const VEREINE_RANKING = [
  { rang: 1, name: "BR Volleys Berlin", mitglieder: 487, lizenzQuote: 98, beitragsQuote: 100, events: 12 },
  { rang: 2, name: "VfB Friedrichshafen", mitglieder: 412, lizenzQuote: 96, beitragsQuote: 98, events: 11 },
  { rang: 3, name: "SWD powervolleys Duren", mitglieder: 356, lizenzQuote: 95, beitragsQuote: 95, events: 10 },
  { rang: 4, name: "SVG Luneburg", mitglieder: 298, lizenzQuote: 94, beitragsQuote: 92, events: 9 },
  { rang: 5, name: "Grizzlys Giesen", mitglieder: 276, lizenzQuote: 93, beitragsQuote: 90, events: 8 },
  { rang: 6, name: "TSV Herrsching", mitglieder: 245, lizenzQuote: 91, beitragsQuote: 88, events: 7 },
  { rang: 7, name: "United Volleys Frankfurt", mitglieder: 234, lizenzQuote: 90, beitragsQuote: 85, events: 8 },
  { rang: 8, name: "TSV Blau-Weiss Berlin", mitglieder: 218, lizenzQuote: 89, beitragsQuote: 82, events: 6 },
  { rang: 9, name: "Alpenvolleys Haching", mitglieder: 205, lizenzQuote: 88, beitragsQuote: 80, events: 5 },
  { rang: 10, name: "VC Wiesbaden", mitglieder: 192, lizenzQuote: 86, beitragsQuote: 78, events: 7 },
];

const SM_CAMPAIGNS = [
  { name: "Nations League Heimspiel", platform: "IG Feed", impressions: "847K", engagement: "6.2%", clicks: "12.4K", top: true },
  { name: "Beach-Tour Timmendorf", platform: "IG Reels", impressions: "623K", engagement: "8.1%", clicks: "8.7K", top: false },
  { name: "Bundesliga Saisonstart", platform: "TikTok", impressions: "512K", engagement: "4.8%", clicks: "5.2K", top: false },
  { name: "Jugendcamp Anmeldung", platform: "IG Story", impressions: "234K", engagement: "3.4%", clicks: "4.1K", top: false },
  { name: "SR-Lehrgang Aufruf", platform: "Facebook", impressions: "156K", engagement: "2.1%", clicks: "2.8K", top: false },
];

const rankBadge = (r: number) => {
  if (r === 1) return <span className="text-[11px] font-bold px-1.5 py-0.5 rounded bg-[#C9A227]/15 text-[#C9A227] border border-[#C9A227]/20">1.</span>;
  if (r === 2) return <span className="text-[11px] font-bold px-1.5 py-0.5 rounded bg-s3 text-text-muted border border-border">2.</span>;
  if (r === 3) return <span className="text-[11px] font-bold px-1.5 py-0.5 rounded bg-orange-dim text-orange border border-orange/20">3.</span>;
  return <span className="text-[11px] text-text-muted">{r}.</span>;
};

export default function DvvAnalytics() {
  const [tab, setTab] = useState("vereine");
  const [saison, setSaison] = useState("2025/26");

  const tabs = [
    { id: "vereine", label: "Vereins-Ranking", icon: "building" },
    { id: "social", label: "Social Media", icon: "megaphone" },
    { id: "finanzen", label: "Finanzen", icon: "coin" },
  ];

  // SVG Chart helpers
  const chartW = 500, chartH = 160, pad = 40;
  const maxMember = Math.max(...MEMBERS_CURRENT) + 500;
  const minMember = Math.min(...MEMBERS_PREV) - 500;
  const sx = (i: number) => pad + (i / (MONTHS.length - 1)) * (chartW - pad * 2);
  const sy = (v: number) => chartH - pad - ((v - minMember) / (maxMember - minMember)) * (chartH - pad * 2);

  const currentLine = MEMBERS_CURRENT.map((v, i) => `${sx(i)},${sy(v)}`).join(" ");
  const prevLine = MEMBERS_PREV.map((v, i) => `${sx(i)},${sy(v)}`).join(" ");

  return (
    <div className="animate-fadeIn">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-[22px] font-bold mb-1">DVV Dashboard</h1>
          <p className="text-[13px] text-text-muted">Saison {saison} · Verbandsweite Auswertungen</p>
        </div>
        <div className="flex gap-2">
          <select value={saison} onChange={e => setSaison(e.target.value)} className="!w-32">
            <option value="2025/26">2025/26</option>
            <option value="2024/25">2024/25</option>
          </select>
          <Button variant="ghost"><Icon name="file" size={14} /> PDF Export</Button>
          <Button variant="ghost"><Icon name="bar-chart" size={14} /> CSV Export</Button>
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-2 xl:grid-cols-5 gap-3 mb-5">
        {KPIS.map(k => (
          <KpiCard key={k.label} label={k.label} value={k.value} sub={k.sub} color={k.color} icon={k.icon} />
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-5">
        {/* Members Trend */}
        <Card className="!mb-0">
          <div className="flex items-center justify-between mb-4">
            <div className="text-[11px] font-bold text-text-muted uppercase tracking-wider">Mitglieder-Entwicklung</div>
            <div className="flex gap-3 text-[11px]">
              <span className="flex items-center gap-1"><span className="w-3 h-0.5 rounded bg-accent" /> 2025/26</span>
              <span className="flex items-center gap-1"><span className="w-3 h-0.5 rounded bg-text-muted" style={{ opacity: 0.3 }} /> 2024/25</span>
            </div>
          </div>
          <svg viewBox={`0 0 ${chartW} ${chartH}`} className="w-full">
            {/* Grid */}
            {[12000, 13000, 14000, 15000].map(v => (
              <g key={v}>
                <line x1={pad} y1={sy(v)} x2={chartW - pad} y2={sy(v)} stroke="#e8e5f0" strokeWidth="0.5" strokeDasharray="4" />
                <text x={pad - 6} y={sy(v) + 4} textAnchor="end" fontSize="9" fill="#94a3b8" fontFamily="monospace">{(v / 1000).toFixed(0)}k</text>
              </g>
            ))}
            {MONTHS.map((m, i) => (
              <text key={m} x={sx(i)} y={chartH - 8} textAnchor="middle" fontSize="9" fill="#94a3b8">{m}</text>
            ))}
            <polyline points={prevLine} fill="none" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4" opacity="0.3" />
            <polyline points={currentLine} fill="none" stroke="#7c3aed" strokeWidth="2" />
            {MEMBERS_CURRENT.map((v, i) => (
              <circle key={i} cx={sx(i)} cy={sy(v)} r="3" fill="#7c3aed" />
            ))}
          </svg>
        </Card>

        {/* License Status Stacked Bars */}
        <Card className="!mb-0">
          <div className="flex items-center justify-between mb-4">
            <div className="text-[11px] font-bold text-text-muted uppercase tracking-wider">Lizenzen nach Status</div>
            <div className="flex gap-3 text-[11px]">
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm bg-green" /> Aktiv</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm bg-orange" /> Ausstehend</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm bg-red" /> Abgelaufen</span>
            </div>
          </div>
          <div className="flex items-end gap-2 h-[120px]">
            {LICENSE_DATA.map((d, i) => {
              const total = d.aktiv + d.ausstehend + d.abgelaufen;
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-0.5">
                  <div className="w-full flex flex-col gap-[1px]" style={{ height: 100 }}>
                    <div className="bg-green rounded-t" style={{ height: (d.aktiv / total) * 100 + "%" }} />
                    <div className="bg-orange" style={{ height: (d.ausstehend / total) * 100 + "%" }} />
                    <div className="bg-red rounded-b" style={{ height: (d.abgelaufen / total) * 100 + "%" }} />
                  </div>
                  <span className="text-[9px] text-text-muted">{MONTHS[i]}</span>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      {/* Tab Section */}
      <Card className="!mb-0 !p-0 overflow-hidden">
        <div className="flex border-b border-border">
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 px-5 py-3.5 text-[13px] font-medium border-b-2 transition-colors cursor-pointer ${
                tab === t.id ? "text-accent border-accent bg-accent-dim" : "text-text-muted border-transparent hover:bg-s2"
              }`}
            >
              <Icon name={t.icon} size={15} /> {t.label}
            </button>
          ))}
        </div>

        <div className="p-5">
          {tab === "vereine" && (
            <div className="overflow-x-auto">
              <table className="w-full text-[13px]">
                <thead>
                  <tr className="text-left text-[11px] text-text-muted uppercase tracking-wide">
                    <th className="pb-3 font-semibold w-[40px]">#</th>
                    <th className="pb-3 font-semibold">Verein</th>
                    <th className="pb-3 font-semibold text-right">Mitglieder</th>
                    <th className="pb-3 font-semibold text-right">Lizenzquote</th>
                    <th className="pb-3 font-semibold text-right">Beitragsquote</th>
                    <th className="pb-3 font-semibold text-right">Events</th>
                  </tr>
                </thead>
                <tbody>
                  {VEREINE_RANKING.map(v => (
                    <tr key={v.rang} className="border-t border-border hover:bg-s2/50 transition-colors">
                      <td className="py-3">{rankBadge(v.rang)}</td>
                      <td className="py-3 font-medium">{v.name}</td>
                      <td className="py-3 text-right">{v.mitglieder}</td>
                      <td className="py-3 text-right">
                        <span className={v.lizenzQuote >= 95 ? "text-green" : v.lizenzQuote >= 90 ? "text-text" : "text-orange"}>{v.lizenzQuote}%</span>
                      </td>
                      <td className="py-3 text-right">
                        <span className={v.beitragsQuote >= 95 ? "text-green" : v.beitragsQuote >= 85 ? "text-text" : "text-red"}>{v.beitragsQuote}%</span>
                      </td>
                      <td className="py-3 text-right">{v.events}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {tab === "social" && (
            <>
              <div className="bg-accent-dim border border-accent/20 rounded-[8px] px-4 py-2.5 mb-4 text-[12px] text-accent flex items-center gap-2">
                <Icon name="zap" size={14} /> Analytics-Feedback-Loop: Diese Daten verbessern zukünftige KI-Empfehlungen
              </div>
              <table className="w-full text-[13px]">
                <thead>
                  <tr className="text-left text-[11px] text-text-muted uppercase tracking-wide">
                    <th className="pb-3 font-semibold">Kampagne</th>
                    <th className="pb-3 font-semibold">Plattform</th>
                    <th className="pb-3 font-semibold text-right">Impressions</th>
                    <th className="pb-3 font-semibold text-right">Engagement</th>
                    <th className="pb-3 font-semibold text-right">Clicks</th>
                    <th className="pb-3 font-semibold w-[60px]"></th>
                  </tr>
                </thead>
                <tbody>
                  {SM_CAMPAIGNS.map((c, i) => (
                    <tr key={i} className="border-t border-border hover:bg-s2/50 transition-colors">
                      <td className="py-3 font-medium">{c.name}</td>
                      <td className="py-3"><Badge color="purple">{c.platform}</Badge></td>
                      <td className="py-3 text-right">{c.impressions}</td>
                      <td className="py-3 text-right font-semibold">{c.engagement}</td>
                      <td className="py-3 text-right">{c.clicks}</td>
                      <td className="py-3 text-right">{c.top && <Badge color="orange">Top</Badge>}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}

          {tab === "finanzen" && (
            <div>
              <div className="grid grid-cols-3 gap-4 mb-5">
                <Card className="!mb-0 text-center">
                  <div className="text-[11px] text-text-muted uppercase tracking-wide mb-1">Soll</div>
                  <div className="text-[24px] font-bold text-text">648.000 EUR</div>
                </Card>
                <Card className="!mb-0 text-center">
                  <div className="text-[11px] text-text-muted uppercase tracking-wide mb-1">Ist</div>
                  <div className="text-[24px] font-bold text-green">598.400 EUR</div>
                </Card>
                <Card className="!mb-0 text-center">
                  <div className="text-[11px] text-text-muted uppercase tracking-wide mb-1">Offene Forderungen</div>
                  <div className="text-[24px] font-bold text-red">49.600 EUR</div>
                  <div className="text-[12px] text-text-muted">38 Vereine</div>
                </Card>
              </div>
              <div className="text-center">
                <Button><Icon name="file" size={14} /> DATEV Export</Button>
              </div>
              <div className="mt-4 text-[11px] text-text-muted text-center">Stand: 10.04.2026 — Saison lauft noch, Daten nicht final.</div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
