"use client";

import { useState } from "react";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import HelperTooltip from "@/components/ui/HelperTooltip";

const PLATFORMS = [
  { id: "ig-feed", label: "Instagram Feed", connected: true },
  { id: "ig-story", label: "Instagram Story", connected: true },
  { id: "ig-reels", label: "Instagram Reels", connected: true },
  { id: "tiktok", label: "TikTok", connected: false },
  { id: "facebook", label: "Facebook", connected: true },
];

const CONTENT_TYPES = ["Spielankundigung", "Ergebnis", "Hinter den Kulissen", "Produktkampagne", "Verbandsinfo"];
const AUDIENCES = ["Volleyballfans 18-35", "Breiter Sport", "Jugend", "International"];
const TONES = [
  { id: "emotional", label: "Emotional", icon: "zap" },
  { id: "informativ", label: "Informativ", icon: "info" },
  { id: "humorvoll", label: "Humorvoll", icon: "star" },
  { id: "inspirierend", label: "Inspirierend", icon: "trophy" },
];

const SUGGESTED_TAGS = ["#DVV", "#Volleyball", "#GER", "#NationsLeague", "#TeamDeutschland", "#BeachVolleyball"];
const PRESET_COLORS = [
  { id: "standard", label: "DVV Standard", desc: "Gold / Schwarz", colors: ["#C9A227", "#0A0A0F"] },
  { id: "light", label: "DVV Light", desc: "Weiss / Gold", colors: ["#FFFFFF", "#C9A227"] },
  { id: "custom", label: "Custom", desc: "Eigene Farben", colors: ["#8B5CF6", "#0B0E1A"] },
];

export default function SocialBriefing() {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [contentType, setContentType] = useState("");
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [audience, setAudience] = useState("");
  const [message, setMessage] = useState("");
  const [tone, setTone] = useState("");
  const [cta, setCta] = useState("");
  const [tags, setTags] = useState<string[]>(["#DVV", "#Volleyball"]);
  const [colorPreset, setColorPreset] = useState("standard");
  const [useAiTiming, setUseAiTiming] = useState(true);

  const togglePlatform = (id: string) => {
    setSelectedPlatforms(prev => prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]);
  };

  const removeTag = (tag: string) => setTags(prev => prev.filter(t => t !== tag));
  const addTag = (tag: string) => { if (!tags.includes(tag)) setTags(prev => [...prev, tag]); };

  const step1Complete = name.length > 0 && contentType && selectedPlatforms.length > 0;
  const step2Complete = message.length > 0 && tone;
  const step3Complete = colorPreset !== "";

  const ctaPlaceholders: Record<string, string> = {
    "Spielankundigung": "Jetzt Tickets sichern",
    "Ergebnis": "Highlights ansehen",
    "Hinter den Kulissen": "Mehr erfahren",
    "Produktkampagne": "Jetzt bestellen",
    "Verbandsinfo": "Weiterlesen",
  };

  return (
    <div className="animate-fadeIn">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-[22px] font-bold mb-1">Neues Social Media Briefing</h1>
          <p className="text-[13px] text-text-muted">Erstelle ein Briefing für die KI-gestützte Content-Generierung</p>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost">Als Entwurf speichern</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-5 items-start">
        {/* Form */}
        <div>
          {/* Progress */}
          <div className="flex items-center gap-2 mb-6">
            {[1, 2, 3, 4].map(s => (
              <div key={s} className="flex items-center gap-2 flex-1">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[12px] font-bold shrink-0 ${
                  s < step ? "bg-green text-white" :
                  s === step ? "bg-accent text-white" :
                  "bg-s3 text-text-muted"
                }`}>
                  {s < step ? <Icon name="check" size={14} className="text-white" /> : s}
                </div>
                {s < 4 && <div className={`flex-1 h-0.5 rounded ${s < step ? "bg-green" : "bg-s3"}`} />}
              </div>
            ))}
          </div>

          {/* Step 1: Basis */}
          <Card className="!mb-4">
            <div className="flex items-center gap-2 mb-4">
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold ${step1Complete ? "bg-green text-white" : "bg-accent text-white"}`}>
                {step1Complete ? <Icon name="check" size={12} className="text-white" /> : "1"}
              </span>
              <span className="text-[14px] font-semibold">Basis-Informationen</span>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-[11px] font-semibold text-text-muted uppercase tracking-wide mb-1.5 block">Kampagnenname *</label>
                <input value={name} onChange={e => setName(e.target.value)} placeholder="z.B. Nations League Heimspiel" className="w-full" />
              </div>
              <div>
                <label className="flex items-center gap-1 text-[11px] font-semibold text-text-muted uppercase tracking-wide mb-1.5">Inhaltstyp * <HelperTooltip title="Inhaltstyp" body="Der Inhaltstyp bestimmt Ton, CTA-Vorschläge und die visuelle Vorlage. Wähle z.B. 'Spielankündigung' für ein kommendes Spiel." /></label>
                <select value={contentType} onChange={e => setContentType(e.target.value)} className="w-full">
                  <option value="">Bitte wahlen...</option>
                  {CONTENT_TYPES.map(ct => <option key={ct} value={ct}>{ct}</option>)}
                </select>
              </div>
              <div>
                <label className="text-[11px] font-semibold text-text-muted uppercase tracking-wide mb-1.5 block">Plattformen *</label>
                <div className="flex flex-wrap gap-2">
                  {PLATFORMS.map(p => (
                    <button
                      key={p.id}
                      onClick={() => togglePlatform(p.id)}
                      className={`relative px-3 py-1.5 rounded-md text-[12px] font-medium border transition-colors cursor-pointer ${
                        selectedPlatforms.includes(p.id) ? "bg-accent text-white border-accent" : "bg-transparent text-text-muted border-border hover:border-accent/40"
                      }`}
                    >
                      {p.label}
                      {!p.connected && <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-orange border-2 border-s1" title="Kein Account verbunden" />}
                    </button>
                  ))}
                </div>
                {selectedPlatforms.includes("tiktok") && (
                  <div className="flex items-center gap-1.5 mt-2 text-[11px] text-orange"><Icon name="alert" size={12} /> TikTok: Kein Account verbunden</div>
                )}
              </div>
            </div>
            {!step1Complete && step === 1 && (
              <div className="mt-4"><Button disabled={!step1Complete} onClick={() => setStep(2)}>Weiter</Button></div>
            )}
            {step1Complete && step === 1 && (
              <div className="mt-4"><Button onClick={() => setStep(2)}>Weiter</Button></div>
            )}
          </Card>

          {/* Step 2: Inhalt & Ton */}
          <Card className={`!mb-4 ${step < 2 ? "opacity-50 pointer-events-none" : ""}`}>
            <div className="flex items-center gap-2 mb-4">
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold ${step2Complete ? "bg-green text-white" : step >= 2 ? "bg-accent text-white" : "bg-s3 text-text-muted"}`}>
                {step2Complete ? <Icon name="check" size={12} className="text-white" /> : "2"}
              </span>
              <span className="text-[14px] font-semibold">Inhalt & Ton</span>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-[11px] font-semibold text-text-muted uppercase tracking-wide mb-1.5 block">Zielgruppe</label>
                <select value={audience} onChange={e => setAudience(e.target.value)} className="w-full">
                  <option value="">Bitte wahlen...</option>
                  {AUDIENCES.map(a => <option key={a} value={a}>{a}</option>)}
                </select>
              </div>
              <div>
                <label className="flex items-center gap-1 text-[11px] font-semibold text-text-muted uppercase tracking-wide mb-1.5">Kernbotschaft * <HelperTooltip title="Kernbotschaft" body="Die zentrale Aussage deines Posts. Die KI nutzt sie als Basis für Caption und Grafik-Text. Halte sie kurz und prägnant." /></label>
                <textarea value={message} onChange={e => setMessage(e.target.value.slice(0, 500))} placeholder="Was soll die zentrale Aussage sein?" rows={3} className="w-full" />
                <div className="flex justify-end mt-1">
                  <span className={`text-[11px] font-mono ${message.length > 280 ? "text-red" : message.length > 250 ? "text-orange" : "text-text-muted"}`}>
                    {message.length}/280
                  </span>
                </div>
              </div>
              <div>
                <label className="text-[11px] font-semibold text-text-muted uppercase tracking-wide mb-1.5 block">Ton & Stil *</label>
                <div className="flex gap-2">
                  {TONES.map(t => (
                    <button
                      key={t.id}
                      onClick={() => setTone(t.id)}
                      className={`flex items-center gap-1.5 px-3 py-2 rounded-md text-[12px] font-medium border transition-colors cursor-pointer flex-1 justify-center ${
                        tone === t.id ? "bg-accent text-white border-accent" : "bg-transparent text-text-muted border-border hover:border-accent/40"
                      }`}
                    >
                      <Icon name={t.icon} size={14} /> {t.label}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-[11px] font-semibold text-text-muted uppercase tracking-wide mb-1.5 block">Call-to-Action</label>
                <input value={cta} onChange={e => setCta(e.target.value)} placeholder={ctaPlaceholders[contentType] || "z.B. Jetzt ansehen"} className="w-full" />
                {!cta && message.length > 0 && (
                  <div className="text-[11px] text-orange mt-1 flex items-center gap-1"><Icon name="info" size={12} /> Empfehlung: Ein Call-to-Action erhoht das Engagement um ~35%</div>
                )}
              </div>
              <div>
                <label className="text-[11px] font-semibold text-text-muted uppercase tracking-wide mb-1.5 block">Hashtags</label>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {tags.map(tag => (
                    <span key={tag} className="inline-flex items-center gap-1 px-2 py-1 rounded bg-accent/10 text-accent text-[12px] font-medium">
                      {tag}
                      <button onClick={() => removeTag(tag)} className="hover:text-red transition-colors cursor-pointer bg-transparent border-none text-accent p-0">x</button>
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1">
                  {SUGGESTED_TAGS.filter(t => !tags.includes(t)).map(tag => (
                    <button key={tag} onClick={() => addTag(tag)} className="px-2 py-0.5 rounded text-[11px] text-text-muted border border-border hover:border-accent/40 cursor-pointer bg-transparent transition-colors">+ {tag}</button>
                  ))}
                </div>
              </div>
            </div>
            {step === 2 && (
              <div className="mt-4"><Button disabled={!step2Complete} onClick={() => setStep(3)}>Weiter</Button></div>
            )}
          </Card>

          {/* Step 3: Visuell */}
          <Card className={`!mb-4 ${step < 3 ? "opacity-50 pointer-events-none" : ""}`}>
            <div className="flex items-center gap-2 mb-4">
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold ${step3Complete && step > 3 ? "bg-green text-white" : step >= 3 ? "bg-accent text-white" : "bg-s3 text-text-muted"}`}>3</span>
              <span className="text-[14px] font-semibold">Visuelle Vorgaben</span>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-[11px] font-semibold text-text-muted uppercase tracking-wide mb-1.5 block">Farbschema</label>
                <div className="grid grid-cols-3 gap-3">
                  {PRESET_COLORS.map(pc => (
                    <button
                      key={pc.id}
                      onClick={() => setColorPreset(pc.id)}
                      className={`p-3 rounded-lg border text-center transition-colors cursor-pointer ${
                        colorPreset === pc.id ? "border-accent bg-accent/5" : "border-border hover:border-accent/40 bg-transparent"
                      }`}
                    >
                      <div className="flex justify-center gap-1 mb-2">
                        {pc.colors.map((c, i) => (
                          <div key={i} className="w-6 h-6 rounded-full border border-border" style={{ background: c }} />
                        ))}
                      </div>
                      <div className="text-[12px] font-medium">{pc.label}</div>
                      <div className="text-[10px] text-text-muted">{pc.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-[11px] font-semibold text-text-muted uppercase tracking-wide mb-1.5 block">Bildmaterial</label>
                <div className="flex gap-3">
                  <div className="flex-1 border-2 border-dashed border-border rounded-lg p-4 text-center hover:border-accent/40 transition-colors cursor-pointer">
                    <Icon name="file" size={20} className="text-text-muted mx-auto mb-1" />
                    <div className="text-[12px]">Dateien hochladen</div>
                  </div>
                  <div className="flex-1 border border-border rounded-lg p-4 text-center hover:bg-s2 transition-colors cursor-pointer">
                    <Icon name="layers" size={20} className="text-accent mx-auto mb-1" />
                    <div className="text-[12px]">Aus Mediathek</div>
                  </div>
                </div>
              </div>
            </div>
            {step === 3 && (
              <div className="mt-4"><Button onClick={() => setStep(4)}>Weiter</Button></div>
            )}
          </Card>

          {/* Step 4: Scheduling */}
          <Card className={`!mb-4 ${step < 4 ? "opacity-50 pointer-events-none" : ""}`}>
            <div className="flex items-center gap-2 mb-4">
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold ${step >= 4 ? "bg-accent text-white" : "bg-s3 text-text-muted"}`}>4</span>
              <span className="text-[14px] font-semibold">Zeitplanung</span>
              <Badge color="gray">Optional</Badge>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-s2 mb-3">
              <div>
                <div className="text-[13px] font-medium">KI-Zeitempfehlung nutzen</div>
                <div className="text-[11px] text-text-muted">Optimaler Zeitpunkt basierend auf Account-Performance</div>
              </div>
              <button
                onClick={() => setUseAiTiming(!useAiTiming)}
                className={`w-10 h-6 rounded-full transition-colors cursor-pointer border-none ${useAiTiming ? "bg-accent" : "bg-s3"}`}
              >
                <div className={`w-4 h-4 rounded-full bg-white transition-transform ${useAiTiming ? "translate-x-5" : "translate-x-1"}`} />
              </button>
            </div>

            {!useAiTiming && (
              <div>
                <label className="text-[11px] font-semibold text-text-muted uppercase tracking-wide mb-1.5 block">Veröffentlichungsdatum</label>
                <input type="datetime-local" className="w-full" />
              </div>
            )}
          </Card>

          {/* Submit */}
          <div className="flex gap-3">
            <Button variant="ghost" className="flex-1">Als Entwurf speichern</Button>
            <Button className="flex-1" disabled={!step1Complete || !step2Complete}>
              <Icon name="zap" size={14} className="text-white" /> Briefing absenden & generieren
            </Button>
          </div>
        </div>

        {/* Live Preview */}
        <div className="sticky top-4">
          <div className="text-[11px] font-bold text-text-muted uppercase tracking-wider mb-3">Live-Vorschau</div>
          <Card className="!mb-0 !p-0 overflow-hidden">
            {/* Device frame */}
            <div className="bg-[#0A0A0F] rounded-xl mx-3 mt-3 p-4 aspect-square flex flex-col items-center justify-center text-center relative overflow-hidden">
              {/* Diagonal stripes */}
              <div className="absolute inset-0 opacity-10" style={{ background: "repeating-linear-gradient(45deg, #C9A227, #C9A227 2px, transparent 2px, transparent 20px)" }} />
              <div className="relative z-10">
                {name ? (
                  <>
                    <div className="text-[10px] text-[#C9A227] font-bold tracking-widest mb-2">{contentType || "CONTENT"}</div>
                    <div className="text-[18px] font-bold text-white uppercase tracking-wide mb-2">{name}</div>
                    {tone && <div className="text-[11px] text-white/60 mb-3">Ton: {TONES.find(t => t.id === tone)?.label}</div>}
                    {cta && (
                      <div className="bg-[#C9A227] text-[#0A0A0F] px-3 py-1 rounded text-[11px] font-bold inline-block">{cta}</div>
                    )}
                  </>
                ) : (
                  <div className="text-white/20 text-[13px]">Vorschau wird geladen...</div>
                )}
              </div>
            </div>
            <div className="p-3">
              {message ? (
                <div className="text-[12px] text-text-muted leading-relaxed mb-2">{message.slice(0, 140)}{message.length > 140 ? "..." : ""}</div>
              ) : (
                <div className="text-[12px] text-text-dim">Caption wird aus der Kernbotschaft generiert...</div>
              )}
              {tags.length > 0 && (
                <div className="text-[11px] text-accent">{tags.join(" ")}</div>
              )}
              <div className="flex gap-1.5 mt-3">
                {selectedPlatforms.map(p => (
                  <span key={p} className="text-[9px] px-1.5 py-0.5 rounded bg-s2 text-text-muted">{p.replace("ig-", "IG ").replace("facebook", "FB").replace("tiktok", "TT")}</span>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
