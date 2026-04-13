"use client";

import { useState } from "react";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";

const MODELS = ["Alle", "ChatGPT", "Gemini", "Claude", "Perplexity"];

const KPIS = [
  { label: "Markeneinfluss-Score", value: "2.14", sub: "Gewichteter Gesamt-Score", trend: "+0.31", up: true },
  { label: "Positive Erwähnungen", value: "82%", sub: "1.847 von 2.253 Erwähnungen", trend: "+4%", up: true },
  { label: "Zitierungen (Marke)", value: "41%", sub: "DVV URLs in markenbezogenen Antworten", trend: "+7%", up: true },
  { label: "Sichtbarkeit", value: "94%", sub: "In relevanten KI-Prompts präsent", trend: "+2%", up: true },
];

const SENTIMENT_TOPICS = [
  { topic: "Volleyball Bundesliga", pos: 88, neu: 10, neg: 2 },
  { topic: "Hallenbelegung & Spielbetrieb", pos: 72, neu: 22, neg: 6 },
  { topic: "Jugendförderung", pos: 91, neu: 8, neg: 1 },
  { topic: "Beach-Volleyball Events", pos: 85, neu: 12, neg: 3 },
  { topic: "Vereinswechsel / Spielerpass", pos: 58, neu: 30, neg: 12 },
  { topic: "Schiedsrichterwesen", pos: 65, neu: 27, neg: 8 },
  { topic: "Trainer-Lizenzierung", pos: 77, neu: 19, neg: 4 },
];

const PROMPTS = [
  { prompt: "Wie melde ich mein Team für die Bundesliga an?", visibility: 100, sentiment: "green", brands: ["DVV", "VOLLEYBALL-BUNDESLIGA"], theme: "Spielbetrieb" },
  { prompt: "Was sind die besten Volleyball-Vereine in Deutschland?", visibility: 100, sentiment: "green", brands: ["VFB FRIEDRICHSHAFEN", "BR VOLLEYS"], theme: "Vereine" },
  { prompt: "Wo finde ich Beach-Volleyball Turniere?", visibility: 97, sentiment: "green", brands: ["DVV", "GERMAN BEACH TOUR"], theme: "Beach" },
  { prompt: "Wie bekomme ich einen Spielerpass?", visibility: 94, sentiment: "orange", brands: ["SAMS", "DVV"], theme: "Verwaltung" },
  { prompt: "Volleyball Schiedsrichter werden", visibility: 91, sentiment: "green", brands: ["DVV", "VSR"], theme: "Schiedsrichter" },
  { prompt: "Volleyball Jugendtraining Übungen", visibility: 88, sentiment: "green", brands: ["DVV", "VOLLEY-ACADEMY"], theme: "Jugend" },
];

const DOMAINS = [
  { domain: "volleyball-verband.de", share: 32, highlight: true },
  { domain: "volleyball-bundesliga.de", share: 18 },
  { domain: "sams-server.de", share: 12 },
  { domain: "dvv-ligen.de", share: 9 },
  { domain: "reddit.com", share: 7 },
  { domain: "volleybox.net", share: 6 },
  { domain: "wikipedia.org", share: 5 },
  { domain: "beach-volleyball.de", share: 4 },
];

const sentimentLabel: Record<string, string> = { green: "Positiv", orange: "Neutral", red: "Negativ" };

export default function AeoAnalytics() {
  const [activeModel, setActiveModel] = useState("Alle");

  return (
    <div className="animate-fadeIn">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="text-[22px] font-bold mb-1">AI Engine Optimization</h1>
          <p className="text-[13px] text-text-muted">Wie KI-Modelle über den DVV und Volleyball sprechen · Jan–Mär 2026</p>
        </div>
        <Button variant="ghost"><Icon name="bar-chart" size={14} /> Export</Button>
      </div>

      {/* Model Filter */}
      <Card className="!mb-4 !p-3">
        <div className="flex gap-2 flex-wrap items-center">
          {MODELS.map(m => (
            <button
              key={m}
              onClick={() => setActiveModel(m)}
              className={`px-4 py-1.5 rounded-md text-[13px] font-medium border transition-colors cursor-pointer ${
                activeModel === m
                  ? "bg-accent text-white border-accent"
                  : "bg-transparent text-text-muted border-border hover:border-accent/40"
              }`}
            >
              {m}
            </button>
          ))}
          <span className="ml-auto text-[12px] text-text-muted">Zeitraum: Q1 2026</span>
        </div>
      </Card>

      {/* KPIs */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 mb-4">
        {KPIS.map(k => (
          <Card key={k.label} className="!mb-0">
            <div className="text-[11px] font-semibold text-text-muted uppercase tracking-wide mb-1">{k.label}</div>
            <div className="text-[28px] font-bold text-accent leading-none mb-1">{k.value}</div>
            <div className="text-[12px] text-text-muted mb-1">{k.sub}</div>
            <div className={`text-[12px] font-medium ${k.up ? "text-green" : "text-red"}`}>{k.trend} vs. Vorquartal</div>
          </Card>
        ))}
      </div>

      {/* Sentiment by Topics */}
      <Card className="!mb-4">
        <div className="text-[11px] font-bold text-text-muted uppercase tracking-wider mb-4">Sentiment nach Themen</div>
        <table className="w-full text-[13px]">
          <thead>
            <tr className="text-left text-[11px] text-text-muted uppercase tracking-wide">
              <th className="pb-3 font-semibold">Thema</th>
              <th className="pb-3 font-semibold w-[300px]">Verteilung</th>
              <th className="pb-3 font-semibold text-right w-[50px]">Pos</th>
              <th className="pb-3 font-semibold text-right w-[50px]">Neu</th>
              <th className="pb-3 font-semibold text-right w-[50px]">Neg</th>
            </tr>
          </thead>
          <tbody>
            {SENTIMENT_TOPICS.map(t => (
              <tr key={t.topic} className="border-t border-border">
                <td className="py-2.5 font-medium">{t.topic}</td>
                <td className="py-2.5">
                  <div className="flex h-[18px] rounded-full overflow-hidden">
                    <div style={{ width: t.pos + "%" }} className="bg-green" />
                    <div style={{ width: t.neu + "%" }} className="bg-orange" />
                    <div style={{ width: t.neg + "%" }} className="bg-red" />
                  </div>
                </td>
                <td className="py-2.5 text-right text-green font-medium">{t.pos}%</td>
                <td className="py-2.5 text-right text-orange font-medium">{t.neu}%</td>
                <td className="py-2.5 text-right text-red font-medium">{t.neg}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {/* Prompt Tracking */}
      <Card className="!mb-4 !p-0 overflow-hidden">
        <div className="px-5 py-4">
          <div className="text-[11px] font-bold text-text-muted uppercase tracking-wider">Prompt-Tracking</div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-[13px] min-w-[800px]">
            <thead>
              <tr className="text-left text-[11px] text-text-muted uppercase tracking-wide border-t border-border bg-s2">
                <th className="px-5 py-3 font-semibold">Prompt</th>
                <th className="px-5 py-3 font-semibold w-[120px]">Sichtbarkeit</th>
                <th className="px-5 py-3 font-semibold w-[90px]">Sentiment</th>
                <th className="px-5 py-3 font-semibold">Top-Marken</th>
                <th className="px-5 py-3 font-semibold w-[110px]">Thema</th>
              </tr>
            </thead>
            <tbody>
              {PROMPTS.map((p, i) => (
                <tr key={i} className="border-t border-border hover:bg-s2/50 transition-colors">
                  <td className="px-5 py-3 max-w-[300px] truncate" title={p.prompt}>{p.prompt}</td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-[6px] bg-s3 rounded-full overflow-hidden">
                        <div className="h-full bg-accent rounded-full" style={{ width: p.visibility + "%" }} />
                      </div>
                      <span className="text-[11px] text-text-muted w-[32px] text-right">{p.visibility}%</span>
                    </div>
                  </td>
                  <td className="px-5 py-3"><Badge color={p.sentiment as "green" | "orange" | "red"}>{sentimentLabel[p.sentiment]}</Badge></td>
                  <td className="px-5 py-3">
                    <div className="flex gap-1 flex-wrap">
                      {p.brands.map(b => <Badge key={b} color="purple">{b}</Badge>)}
                    </div>
                  </td>
                  <td className="px-5 py-3"><Badge color="blue">{p.theme}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Top Cited Domains */}
      <Card>
        <div className="text-[11px] font-bold text-text-muted uppercase tracking-wider mb-4">Top zitierte Domains</div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {DOMAINS.map(d => (
            <div
              key={d.domain}
              className={`rounded-[8px] p-3 border transition-colors ${
                d.highlight ? "border-accent bg-accent-dim" : "border-border bg-s2"
              }`}
            >
              <div className="text-[13px] font-semibold truncate" title={d.domain}>{d.domain}</div>
              <div className={`text-[22px] font-bold ${d.highlight ? "text-accent" : "text-text"}`}>{d.share}%</div>
              <div className="h-[4px] bg-s3 rounded-full mt-1 overflow-hidden">
                <div className={`h-full rounded-full ${d.highlight ? "bg-accent" : "bg-text-muted"}`} style={{ width: (d.share / 32) * 100 + "%" }} />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
