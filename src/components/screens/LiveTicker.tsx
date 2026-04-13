"use client";

import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Icon from "@/components/ui/Icon";
import Button from "@/components/ui/Button";
import ClubLogo from "@/components/ui/ClubLogo";

interface LiveTickerProps {
  onNavigate?: (screen: string) => void;
}

const MATCHES = [
  {
    heim: "BERLIN RECYCLING Volleys", heimShort: "BRV", gast: "VfB Friedrichshafen", gastShort: "VFB",
    score: { heim: 2, gast: 1 },
    sets: [{ heim: 25, gast: 22 }, { heim: 20, gast: 25 }, { heim: 25, gast: 19 }, { heim: 14, gast: 11 }],
    halle: "Max-Schmeling-Halle, Berlin", zuschauer: 4832, live: true,
    topScorer: { heim: { name: "B. Patch", punkte: 18, initials: "BP" }, gast: { name: "M. Chinenyeze", punkte: 14, initials: "MC" } },
    serie: "1. Bundesliga Männer Playoff",
  },
  {
    heim: "SVG Lüneburg", heimShort: "SVG", gast: "SWD powervolleys Düren", gastShort: "SWD",
    score: { heim: 1, gast: 1 },
    sets: [{ heim: 25, gast: 21 }, { heim: 22, gast: 25 }, { heim: 8, gast: 5 }],
    halle: "Gellersen-Halle, Lüneburg", zuschauer: 1680, live: true,
    topScorer: { heim: { name: "T. Krick", punkte: 12, initials: "TK" }, gast: { name: "T. Strohbach", punkte: 11, initials: "TS" } },
    serie: "1. Bundesliga Männer Playoff",
  },
  {
    heim: "TV Dingolfing", heimShort: "DIN", gast: "NawaRo Straubing", gastShort: "NAW",
    score: { heim: 0, gast: 3 },
    sets: [{ heim: 22, gast: 25 }, { heim: 17, gast: 25 }, { heim: 14, gast: 25 }],
    halle: "Dreifachhalle, Dingolfing", zuschauer: 612, live: false,
    topScorer: { heim: { name: "F. Koob", punkte: 7, initials: "FK" }, gast: { name: "V. Ismaili", punkte: 16, initials: "VI" } },
    serie: "Sparda 2. Liga Pro",
  },
];

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

export default function LiveTicker({ onNavigate }: LiveTickerProps) {
  const mainMatch = MATCHES[0];

  return (
    <div className="animate-fadeIn">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="text-[22px] font-bold mb-1">Live-Ticker</h1>
          <p className="text-[13px] text-text-muted">1. Bundesliga Herren · Spieltag 18</p>
        </div>
        <Badge color="green">
          <span className="w-2 h-2 bg-green rounded-full animate-pulse-live inline-block mr-1" />
          LIVE
        </Badge>
      </div>

      {/* All Matches Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-5">
        {MATCHES.map((m, i) => (
          <Card
            key={i}
            className={`!mb-0 cursor-pointer hover:shadow-md transition-shadow ${i === 0 ? "!border-accent" : ""}`}
            onClick={() => onNavigate?.("match-detail")}
          >
            <div className="flex items-center justify-between mb-2">
              {m.live ? (
                <Badge color="green"><span className="w-1.5 h-1.5 bg-green rounded-full animate-pulse-live inline-block mr-1" />LIVE</Badge>
              ) : (
                <Badge color="gray">{m.startTime}</Badge>
              )}
              <span className="text-[10px] text-text-muted">{m.halle.split(",")[0]}</span>
            </div>
            <div className="flex items-center justify-between text-[14px] font-semibold">
              <span className="truncate flex-1 flex items-center gap-2"><ClubLogo name={m.heim} size={24} />{m.heim}</span>
              <span className="font-mono text-[18px] font-bold px-3">
                {m.live ? `${m.score.heim}:${m.score.gast}` : "vs."}
              </span>
              <span className="truncate flex-1 text-right flex items-center justify-end gap-2">{m.gast}<ClubLogo name={m.gast} size={24} /></span>
            </div>
            {m.sets.length > 0 && (
              <div className="flex justify-center gap-2 mt-2">
                {m.sets.map((s, si) => (
                  <span key={si} className="text-[11px] text-text-muted font-mono">{s.heim}:{s.gast}</span>
                ))}
              </div>
            )}
            {i === 0 && (
              <div className="mt-3 pt-3 border-t border-border text-center">
                <span className="text-[11px] text-accent font-medium">Spiel-Details ansehen</span>
              </div>
            )}
          </Card>
        ))}
      </div>

      {/* Featured Match Detail */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-4">
        {/* Event Feed */}
        <Card className="!mb-0">
          <div className="flex items-center justify-between mb-4">
            <div className="text-xs font-bold text-text-muted uppercase tracking-wider">Ereignis-Feed</div>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => onNavigate?.("match-detail")}
            >
              Spiel-Detail
            </Button>
          </div>
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
              <div className="flex justify-between"><span className="text-text-muted">Halle</span><span>{mainMatch.halle}</span></div>
              <div className="flex justify-between"><span className="text-text-muted">Zuschauer</span><span>{mainMatch.zuschauer.toLocaleString("de-DE")}</span></div>
            </div>
          </Card>

          <Card className="!mb-0">
            <div className="text-xs font-bold text-text-muted uppercase tracking-wider mb-3">Top-Scorer</div>
            <div className="space-y-3">
              {mainMatch.topScorer && (
                <>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-accent-dim flex items-center justify-center text-[10px] font-bold text-accent">{mainMatch.topScorer.heim.initials}</div>
                    <div className="flex-1">
                      <div className="font-semibold text-[13px]">{mainMatch.topScorer.heim.name}</div>
                      <div className="text-[11px] text-text-muted">{mainMatch.heim}</div>
                    </div>
                    <span className="text-[18px] font-bold">{mainMatch.topScorer.heim.punkte}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-dim flex items-center justify-center text-[10px] font-bold text-blue">{mainMatch.topScorer.gast.initials}</div>
                    <div className="flex-1">
                      <div className="font-semibold text-[13px]">{mainMatch.topScorer.gast.name}</div>
                      <div className="text-[11px] text-text-muted">{mainMatch.gast}</div>
                    </div>
                    <span className="text-[18px] font-bold">{mainMatch.topScorer.gast.punkte}</span>
                  </div>
                </>
              )}
            </div>
          </Card>

          <Card className="!mb-0">
            <div className="text-xs font-bold text-text-muted uppercase tracking-wider mb-3">Livestream</div>
            <div className="bg-s2 rounded-[6px] p-4 text-center">
              <Icon name="volleyball" size={24} className="text-text-muted mx-auto mb-2" />
              <div className="text-[13px] font-medium">Sportdeutschland.tv</div>
              <div className="text-[11px] text-text-muted mb-3">Live-Ubertragung aktiv</div>
              <Button size="sm">Stream ansehen</Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
