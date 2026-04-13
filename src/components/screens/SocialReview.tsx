"use client";

import { useState } from "react";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";

const CAMPAIGN = {
  name: "Nations League Heimspiel",
  platforms: ["Instagram Feed", "Instagram Story", "TikTok"],
  tone: "Emotional",
  audience: "Volleyballfans 18-35",
  status: "Generiert",
};

const VARIANTS = [
  { id: 1, label: "Variante 1", style: "Gold/Schwarz" },
  { id: 2, label: "Variante 2", style: "Weiss/Gold" },
  { id: 3, label: "Variante 3", style: "Purple/Schwarz" },
];

const CAPTIONS: Record<string, string> = {
  "Instagram Feed": "Deutschland empfängt Frankreich zum Nations League Showdown! Die Max-Schmeling-Halle wird beben, wenn unsere Jungs um jeden Ball kämpfen. Bist du dabei? Sichere dir jetzt dein Ticket und werde Teil der lautesten Volleyball-Nacht des Jahres!",
  "Instagram Story": "GAMEDAY! Deutschland vs. Frankreich — heute Abend wird es laut in Berlin. Wisch nach oben für Tickets!",
  "TikTok": "POV: Du bist in der Max-Schmeling-Halle wenn Deutschland gegen Frankreich aufschlägt. Heute Abend 19:30 — link in bio für Tickets!",
};

const HASHTAGS_INITIAL = ["#DVV", "#Volleyball", "#GER", "#NationsLeague", "#TeamDeutschland", "#VolleyballDeutschland"];

const TIMING = [
  { platform: "Instagram Feed", date: "Di, 14. Jun", time: "18:30", confidence: 3, label: "Hoch" },
  { platform: "Instagram Story", date: "Di, 14. Jun", time: "07:15", confidence: 4, label: "Sehr hoch" },
  { platform: "TikTok", date: "Mo, 13. Jun", time: "19:30", confidence: 2, label: "Mittel", noAccount: true },
];

export default function SocialReview() {
  const [activePlatform, setActivePlatform] = useState("Instagram Feed");
  const [activeVariant, setActiveVariant] = useState(1);
  const [caption, setCaption] = useState(CAPTIONS["Instagram Feed"]);
  const [hashtags, setHashtags] = useState(HASHTAGS_INITIAL);
  const [status, setStatus] = useState(CAMPAIGN.status);

  const switchPlatform = (p: string) => {
    setActivePlatform(p);
    setCaption(CAPTIONS[p] || "");
  };

  const removeHashtag = (tag: string) => setHashtags(prev => prev.filter(t => t !== tag));
  const charLimit = activePlatform === "TikTok" ? 300 : 2200;

  return (
    <div className="animate-fadeIn">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-[22px] font-bold mb-1">Content Review & Export</h1>
          <p className="text-[13px] text-text-muted">{CAMPAIGN.name}</p>
        </div>
        <div className="flex gap-2 items-center">
          <Badge color={status === "Generiert" ? "purple" : status === "Freigegeben" ? "green" : "orange"}>{status}</Badge>
          <Button variant="ghost" onClick={() => setStatus("In Review")}>Freigabe anfordern</Button>
          <Button variant="ghost"><Icon name="calendar" size={14} /> Scheduling</Button>
        </div>
      </div>

      <div className="grid grid-cols-[220px_1fr_300px] gap-4 items-start">
        {/* LEFT: Briefing Recap */}
        <div>
          <Card className="!mb-0">
            <div className="text-[11px] font-bold text-text-muted uppercase tracking-wider mb-3">Briefing</div>
            <div className="space-y-3 text-[13px]">
              <div>
                <div className="text-[11px] text-text-muted">Kampagne</div>
                <div className="font-medium">{CAMPAIGN.name}</div>
              </div>
              <div>
                <div className="text-[11px] text-text-muted">Plattformen</div>
                <div className="flex flex-wrap gap-1 mt-1">
                  {CAMPAIGN.platforms.map(p => <Badge key={p} color="purple">{p.replace("Instagram ", "IG ")}</Badge>)}
                </div>
              </div>
              <div>
                <div className="text-[11px] text-text-muted">Ton</div>
                <div className="font-medium">{CAMPAIGN.tone}</div>
              </div>
              <div>
                <div className="text-[11px] text-text-muted">Zielgruppe</div>
                <div className="font-medium">{CAMPAIGN.audience}</div>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-border">
              <span className="text-[12px] text-accent cursor-pointer hover:underline">Briefing bearbeiten</span>
            </div>
          </Card>
        </div>

        {/* CENTER: Content Preview */}
        <div>
          {/* Platform Tabs */}
          <Card className="!mb-4 !p-0">
            <div className="flex">
              {CAMPAIGN.platforms.map(p => (
                <button
                  key={p}
                  onClick={() => switchPlatform(p)}
                  className={`flex-1 py-3 text-[13px] font-medium border-b-2 transition-colors cursor-pointer ${
                    activePlatform === p ? "text-accent border-accent bg-accent-dim" : "text-text-muted border-transparent hover:bg-s2"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </Card>

          {/* Device Frame Preview */}
          <Card className="!mb-4 !p-0 overflow-hidden">
            <div className={`mx-4 mt-4 rounded-xl overflow-hidden ${activePlatform.includes("Story") || activePlatform === "TikTok" ? "aspect-[9/16] max-h-[400px]" : "aspect-square"}`}>
              <div className="w-full h-full bg-[#0A0A0F] flex flex-col items-center justify-center text-center relative overflow-hidden p-6">
                {/* Decorative stripes */}
                <div className="absolute inset-0 opacity-10" style={{ background: "repeating-linear-gradient(45deg, #C9A227, #C9A227 2px, transparent 2px, transparent 20px)" }} />
                {/* DVV Logo placeholder */}
                <div className="absolute top-4 left-4 w-8 h-8 rounded bg-[#C9A227]/20 flex items-center justify-center">
                  <span className="text-[8px] font-bold text-[#C9A227]">DVV</span>
                </div>
                <div className="relative z-10">
                  <div className="text-[10px] text-[#C9A227] font-bold tracking-[3px] mb-3">LANDERSPIEL</div>
                  <div className="text-[24px] font-extrabold text-white uppercase tracking-wide mb-2">Deutschland<br/>vs. Frankreich</div>
                  <div className="text-[12px] text-white/60 mb-4">14. Juni 2026 · Stuttgart</div>
                  <div className="bg-[#C9A227] text-[#0A0A0F] px-4 py-1.5 rounded text-[12px] font-bold inline-block">Jetzt Tickets sichern</div>
                </div>
              </div>
            </div>

            {/* Caption */}
            <div className="p-4">
              <div className="text-[13px] leading-relaxed mb-3">{caption}</div>
              <div className="flex flex-wrap gap-1.5">
                {hashtags.map(tag => (
                  <span key={tag} className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-accent/10 text-accent text-[12px]">
                    {tag}
                    <button onClick={() => removeHashtag(tag)} className="hover:text-red transition-colors cursor-pointer bg-transparent border-none text-accent/60 p-0 text-[10px]">x</button>
                  </span>
                ))}
              </div>
            </div>
          </Card>

          {/* Timing Recommendations */}
          <Card className="!mb-0">
            <div className="text-[11px] font-bold text-text-muted uppercase tracking-wider mb-3">Zeitempfehlung</div>
            <div className="space-y-2">
              {TIMING.map(t => (
                <div key={t.platform} className="flex items-center gap-3 text-[13px] py-2 border-b border-border last:border-0">
                  <span className="font-medium w-[130px] shrink-0">{t.platform}</span>
                  <span className="text-text-muted">{t.date} · {t.time}</span>
                  <div className="flex gap-0.5 ml-auto mr-3">
                    {[1, 2, 3, 4].map(i => (
                      <span key={i} className={`w-2 h-2 rounded-full ${i <= t.confidence ? "bg-[#C9A227]" : "bg-s3"}`} />
                    ))}
                  </div>
                  <span className="text-[11px] text-text-muted w-[70px]">{t.label}</span>
                </div>
              ))}
            </div>
            <div className="flex gap-2 mt-4">
              <Button size="sm" disabled>Jetzt posten</Button>
              <Button size="sm">Empfehlung ubernehmen</Button>
              <Button size="sm" variant="ghost">Manuell anpassen</Button>
            </div>
          </Card>
        </div>

        {/* RIGHT: Variants & Editing */}
        <div>
          {/* Variants */}
          <Card className="!mb-4">
            <div className="text-[11px] font-bold text-text-muted uppercase tracking-wider mb-3">Varianten</div>
            <div className="space-y-2">
              {VARIANTS.map(v => (
                <button
                  key={v.id}
                  onClick={() => setActiveVariant(v.id)}
                  className={`w-full flex items-center gap-3 p-2 rounded-lg border transition-colors cursor-pointer text-left ${
                    activeVariant === v.id ? "border-accent bg-accent-dim" : "border-border hover:border-accent/30 bg-transparent"
                  }`}
                >
                  <div className="w-12 h-12 rounded bg-s3 flex items-center justify-center text-[14px] font-bold text-text-muted shrink-0">{v.id}</div>
                  <div>
                    <div className="text-[13px] font-medium">{v.label}</div>
                    <div className="text-[11px] text-text-muted">{v.style}</div>
                  </div>
                </button>
              ))}
            </div>
          </Card>

          {/* Inline Edit */}
          <Card className="!mb-4">
            <div className="text-[11px] font-bold text-text-muted uppercase tracking-wider mb-3">Caption bearbeiten</div>
            <textarea
              value={caption}
              onChange={e => setCaption(e.target.value)}
              rows={5}
              className="w-full text-[13px]"
            />
            <div className="flex items-center justify-between mt-2">
              <div className="h-1 flex-1 bg-s3 rounded-full overflow-hidden mr-3">
                <div className={`h-full rounded-full ${caption.length > charLimit ? "bg-red" : "bg-accent"}`} style={{ width: Math.min((caption.length / charLimit) * 100, 100) + "%" }} />
              </div>
              <span className={`text-[11px] font-mono ${caption.length > charLimit ? "text-red" : "text-text-muted"}`}>{caption.length}/{charLimit}</span>
            </div>
            <div className="flex gap-2 mt-3">
              <Button size="sm" variant="ghost"><Icon name="refresh" size={12} /> Text neu</Button>
              <Button size="sm" variant="ghost"><Icon name="zap" size={12} /> Alles neu</Button>
            </div>
          </Card>

          {/* Export */}
          <Card className="!mb-0">
            <div className="text-[11px] font-bold text-text-muted uppercase tracking-wider mb-3">Export</div>
            <div className="space-y-2">
              <Button variant="ghost" className="w-full justify-center"><Icon name="file" size={14} /> PNG + Text exportieren</Button>
              <Button variant="ghost" className="w-full justify-center"><Icon name="layers" size={14} /> Alle als ZIP</Button>
              <Button className="w-full justify-center"><Icon name="check" size={14} /> In Freigabe senden</Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
