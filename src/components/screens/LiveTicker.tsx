"use client";

import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Icon from "@/components/ui/Icon";

const MATCH = {
  heim: "BR Volleys",
  gast: "VfB Friedrichshafen",
  score: { heim: 2, gast: 1 },
  sets: [
    { heim: 25, gast: 22 },
    { heim: 20, gast: 25 },
    { heim: 25, gast: 19 },
    { heim: 14, gast: 11 },
  ],
  halle: "Max-Schmeling-Halle, Berlin",
  zuschauer: 4832,
  topScorer: { heim: { name: "B. Patch", punkte: 18 }, gast: { name: "M. Chinenyeze", punkte: 14 } },
};

const EVENTS = [
  { zeit: "4. Satz", minute: "87'", text: "Punkt BR Volleys — Ass von Sergey Grankin", type: "punkt" },
  { zeit: "4. Satz", minute: "86'", text: "Aufschlagfehler VfB Friedrichshafen", type: "fehler" },
  { zeit: "4. Satz", minute: "85'", text: "Timeout VfB Friedrichshafen", type: "timeout" },
  { zeit: "4. Satz", minute: "83'", text: "Punkt BR Volleys — Block von R. Lavia", type: "punkt" },
  { zeit: "3. Satz", minute: "78'", text: "Satz gewonnen: BR Volleys 25:19", type: "satz" },
  { zeit: "3. Satz", minute: "75'", text: "Punkt BR Volleys — Angriff B. Patch", type: "punkt" },
  { zeit: "3. Satz", minute: "72'", text: "Gelbe Karte — M. Chinenyeze (Unsportlichkeit)", type: "karte" },
  { zeit: "2. Satz", minute: "52'", text: "Satz gewonnen: VfB Friedrichshafen 25:20", type: "satz" },
  { zeit: "1. Satz", minute: "28'", text: "Satz gewonnen: BR Volleys 25:22", type: "satz" },
];

const eventIcons: Record<string, { icon: string; color: string }> = {
  punkt: { icon: "volleyball", color: "text-green" },
  fehler: { icon: "alert", color: "text-red" },
  timeout: { icon: "info", color: "text-blue" },
  satz: { icon: "trophy", color: "text-accent" },
  karte: { icon: "alert", color: "text-orange" },
};

export default function LiveTicker() {
  return (
    <div className="animate-fadeIn">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="text-[22px] font-bold mb-1">Live-Ticker</h1>
          <p className="text-[13px] text-text-muted">1. Bundesliga Männer · Spieltag 18</p>
        </div>
        <Badge color="green">
          <span className="w-2 h-2 bg-green rounded-full animate-pulse-live inline-block mr-1" />
          LIVE
        </Badge>
      </div>

      {/* Main Score */}
      <Card className="!mb-5">
        <div className="text-center">
          <div className="flex items-center justify-center gap-8 mb-4">
            <div className="text-center">
              <div className="w-16 h-16 rounded-xl bg-s3 flex items-center justify-center text-[20px] font-bold text-accent mx-auto mb-2">BRV</div>
              <div className="font-bold text-[16px]">{MATCH.heim}</div>
            </div>
            <div>
              <div className="text-[48px] font-bold tracking-tight">
                {MATCH.score.heim} <span className="text-text-muted">:</span> {MATCH.score.gast}
              </div>
              <div className="text-[12px] text-text-muted font-medium">4. Satz · {MATCH.sets[3].heim}:{MATCH.sets[3].gast}</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-xl bg-s3 flex items-center justify-center text-[20px] font-bold text-blue mx-auto mb-2">VFB</div>
              <div className="font-bold text-[16px]">{MATCH.gast}</div>
            </div>
          </div>

          {/* Set scores */}
          <div className="flex justify-center gap-4">
            {MATCH.sets.map((s, i) => (
              <div key={i} className={`px-4 py-2 rounded-[6px] text-[13px] font-mono ${i === 3 ? "bg-accent-dim border border-accent" : "bg-s2"}`}>
                <div className="text-[10px] text-text-muted mb-0.5">{i + 1}. Satz</div>
                <div className="font-bold">{s.heim}:{s.gast}</div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-4">
        {/* Event Feed */}
        <Card className="!mb-0">
          <div className="text-xs font-bold text-text-muted uppercase tracking-wider mb-4">Ereignis-Feed</div>
          <div className="space-y-3">
            {EVENTS.map((e, i) => (
              <div key={i} className="flex items-start gap-3 text-[13px]">
                <div className={`w-7 h-7 rounded-full bg-s2 flex items-center justify-center shrink-0 ${eventIcons[e.type]?.color || "text-text-muted"}`}>
                  <Icon name={eventIcons[e.type]?.icon || "info"} size={14} />
                </div>
                <div className="flex-1">
                  <div>{e.text}</div>
                  <div className="text-[11px] text-text-muted">{e.zeit} · {e.minute}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Side panel */}
        <div className="space-y-4">
          <Card className="!mb-0">
            <div className="text-xs font-bold text-text-muted uppercase tracking-wider mb-3">Spielinfo</div>
            <div className="space-y-2 text-[13px]">
              <div className="flex justify-between"><span className="text-text-muted">Halle</span><span>{MATCH.halle}</span></div>
              <div className="flex justify-between"><span className="text-text-muted">Zuschauer</span><span>{MATCH.zuschauer.toLocaleString("de-DE")}</span></div>
            </div>
          </Card>

          <Card className="!mb-0">
            <div className="text-xs font-bold text-text-muted uppercase tracking-wider mb-3">Top-Scorer</div>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-accent-dim flex items-center justify-center text-[10px] font-bold text-accent">BP</div>
                <div className="flex-1">
                  <div className="font-semibold text-[13px]">{MATCH.topScorer.heim.name}</div>
                  <div className="text-[11px] text-text-muted">{MATCH.heim}</div>
                </div>
                <span className="text-[18px] font-bold">{MATCH.topScorer.heim.punkte}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-dim flex items-center justify-center text-[10px] font-bold text-blue">MC</div>
                <div className="flex-1">
                  <div className="font-semibold text-[13px]">{MATCH.topScorer.gast.name}</div>
                  <div className="text-[11px] text-text-muted">{MATCH.gast}</div>
                </div>
                <span className="text-[18px] font-bold">{MATCH.topScorer.gast.punkte}</span>
              </div>
            </div>
          </Card>

          <Card className="!mb-0">
            <div className="text-xs font-bold text-text-muted uppercase tracking-wider mb-3">Livestream</div>
            <div className="bg-s2 rounded-[6px] p-4 text-center">
              <Icon name="volleyball" size={24} className="text-text-muted mx-auto mb-2" />
              <div className="text-[13px] font-medium">Sportdeutschland.tv</div>
              <div className="text-[11px] text-text-muted mb-3">Live-Übertragung aktiv</div>
              <button className="bg-red text-white px-4 py-2 rounded-[6px] text-[12px] font-medium cursor-pointer border-none">Stream ansehen</button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
