"use client";

import { useState } from "react";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";

interface Team { city: string; lat: number; lng: number; teams: number; }
interface Staffel { name: string; color: string; colorBg: string; teams: Team[]; avgDist: number; spieltage: number; }

const STAFFELN: Staffel[] = [
  {
    name: "Staffel Nord", color: "#3B82F6", colorBg: "rgba(59,130,246,0.12)",
    teams: [
      { city: "Hamburg", lat: 53.55, lng: 10.0, teams: 4 },
      { city: "Berlin", lat: 52.52, lng: 13.4, teams: 3 },
      { city: "Syke", lat: 52.9, lng: 8.8, teams: 1 },
      { city: "Espelkamp", lat: 52.4, lng: 8.6, teams: 1 },
    ],
    avgDist: 187, spieltage: 6,
  },
  {
    name: "Staffel West", color: "#F59E0B", colorBg: "rgba(245,158,11,0.12)",
    teams: [
      { city: "Köln", lat: 50.94, lng: 6.96, teams: 2 },
      { city: "Wuppertal", lat: 51.26, lng: 7.17, teams: 1 },
      { city: "Tönisvorst", lat: 51.32, lng: 6.49, teams: 1 },
      { city: "Frankfurt", lat: 50.11, lng: 8.68, teams: 3 },
      { city: "Ludwigshafen", lat: 49.47, lng: 8.44, teams: 1 },
    ],
    avgDist: 142, spieltage: 8,
  },
  {
    name: "Staffel Süd", color: "#10B981", colorBg: "rgba(16,185,129,0.12)",
    teams: [
      { city: "München", lat: 48.14, lng: 11.58, teams: 3 },
      { city: "Nandlstadt", lat: 48.54, lng: 11.83, teams: 1 },
      { city: "Fürth", lat: 49.48, lng: 10.99, teams: 1 },
      { city: "Weiden", lat: 49.68, lng: 12.16, teams: 1 },
    ],
    avgDist: 128, spieltage: 6,
  },
];

const KPIS = [
  { label: "Ø Reisedistanz Reduktion", value: "-34%", color: "text-green" },
  { label: "CO₂-Einsparung", value: "~2,1t", color: "text-green" },
  { label: "Fairness-Score", value: "92/100", color: "text-accent" },
  { label: "Optimierungszeit", value: "< 3 Sek.", color: "text-blue" },
];

function toX(lng: number) { return ((lng - 5) / 10) * 100; }
function toY(lat: number) { return ((54.5 - lat) / 8) * 100; }

export default function Staffelplanung() {
  const [selected, setSelected] = useState<number | null>(null);
  const [mode, setMode] = useState<"ki" | "manual">("ki");

  const handleRecalc = () => {
    if (mode === "manual") {
      if (confirm("Manuelle Anpassungen werden überschrieben. Fortfahren?")) {
        setMode("ki");
      }
    }
  };

  return (
    <div className="animate-fadeIn">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-accent/30 bg-accent-dim text-accent text-[13px] font-medium">
            <span>🏐</span> 2. Bundesliga Damen Ü35 <span className="opacity-50">▾</span>
          </div>
          <Badge color={mode === "ki" ? "purple" : "orange"}>{mode === "ki" ? "KI-OPTIMIERT" : "MANUELL ANGEPASST"}</Badge>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" onClick={() => setMode("manual")}>Manuell anpassen</Button>
          <Button onClick={handleRecalc}>✨ Neu berechnen</Button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 mb-4">
        {KPIS.map(k => (
          <Card key={k.label} className="!mb-0 text-center">
            <div className="text-[11px] font-semibold text-text-muted uppercase tracking-wide mb-2">{k.label}</div>
            <div className={`text-[28px] font-bold leading-none ${k.color}`}>{k.value}</div>
          </Card>
        ))}
      </div>

      {/* Map */}
      <Card className="!mb-4 !p-0 overflow-hidden">
        <div className="px-5 py-3 border-b border-border">
          <div className="text-[14px] font-semibold">Staffelverteilung Karte</div>
          <div className="text-[12px] text-text-muted">Geografische Verteilung der Teams nach Staffel-Zuordnung</div>
        </div>
        <div className="relative h-[380px] overflow-hidden" style={{ background: "linear-gradient(135deg, #f0eef8 0%, #e8e5f0 50%, #f0eef8 100%)" }}>
          {/* Grid overlay */}
          <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.08 }}>
            {Array.from({ length: 20 }).map((_, i) => (
              <line key={"h" + i} x1="0" y1={i * 5 + "%"} x2="100%" y2={i * 5 + "%"} stroke="#7c3aed" strokeWidth="0.5" />
            ))}
            {Array.from({ length: 20 }).map((_, i) => (
              <line key={"v" + i} x1={i * 5 + "%"} y1="0" x2={i * 5 + "%"} y2="100%" stroke="#7c3aed" strokeWidth="0.5" />
            ))}
          </svg>

          {/* Cluster ellipses */}
          {STAFFELN.map((s, i) => {
            const avgLat = s.teams.reduce((a, t) => a + t.lat, 0) / s.teams.length;
            const avgLng = s.teams.reduce((a, t) => a + t.lng, 0) / s.teams.length;
            const spreadLat = Math.max(...s.teams.map(t => Math.abs(t.lat - avgLat))) + 0.8;
            const spreadLng = Math.max(...s.teams.map(t => Math.abs(t.lng - avgLng))) + 1.2;
            const isSelected = selected === i;
            return (
              <div
                key={s.name}
                onClick={() => setSelected(isSelected ? null : i)}
                className="absolute cursor-pointer transition-all duration-300"
                style={{
                  left: toX(avgLng) + "%", top: toY(avgLat) + "%",
                  width: spreadLng * 10 + "%", height: spreadLat * 12 + "%",
                  transform: "translate(-50%, -50%)",
                  borderRadius: "50%",
                  background: isSelected ? s.colorBg : s.color + "08",
                  border: `2px ${isSelected ? "solid" : "dashed"} ${s.color}`,
                  opacity: selected === null || isSelected ? 1 : 0.3,
                }}
              />
            );
          })}

          {/* City dots */}
          {STAFFELN.map((s, si) =>
            s.teams.map((t) => {
              const size = 6 + t.teams * 4;
              const isSelected = selected === si;
              return (
                <div
                  key={t.city}
                  className="absolute transition-all duration-300"
                  style={{
                    left: toX(t.lng) + "%", top: toY(t.lat) + "%",
                    transform: "translate(-50%, -50%)",
                    opacity: selected === null || isSelected ? 1 : 0.25,
                  }}
                >
                  <div
                    style={{
                      width: size, height: size, borderRadius: "50%",
                      background: s.color, boxShadow: `0 0 ${size}px ${s.color}60`,
                    }}
                  />
                  <div className="absolute top-full mt-1 left-1/2 -translate-x-1/2 text-[10px] font-medium text-text whitespace-nowrap">
                    {t.city}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </Card>

      {/* Staffel Detail Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
        {STAFFELN.map((s, i) => {
          const isSelected = selected === i;
          return (
            <Card
              key={s.name}
              className={`!mb-0 cursor-pointer transition-all ${isSelected ? "!border-2" : ""}`}
              borderColor={isSelected ? `border-l-[${s.color}]` : undefined}
              onClick={() => setSelected(isSelected ? null : i)}
            >
              <div className="flex items-center justify-between mb-3" style={isSelected ? { borderColor: s.color } : {}}>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ background: s.color }} />
                  <span className="font-semibold text-[14px]">{s.name}</span>
                </div>
                <span className="text-[12px] text-text-muted">{s.teams.length} Standorte</span>
              </div>
              <div className="space-y-1.5 mb-3">
                {s.teams.map(t => (
                  <div key={t.city} className="flex items-center justify-between text-[13px]">
                    <span className="text-text-muted">{t.city}</span>
                    <span className="font-medium">{t.teams} {t.teams === 1 ? "Team" : "Teams"}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-border pt-3 flex items-center justify-between text-[12px]">
                <span>Ø Distanz: <strong style={{ color: s.color }}>{s.avgDist} km</strong></span>
                <span className="text-text-muted">{s.spieltage} Spieltage</span>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Algorithm Explanation */}
      <Card className="!mb-0" borderColor="border-l-accent">
        <div className="flex gap-4">
          <div className="text-[24px] shrink-0">🤖</div>
          <div>
            <div className="font-semibold text-[14px] mb-1">KI-Optimierungslogik</div>
            <p className="text-[13px] text-text-muted mb-3">
              Der Algorithmus kombiniert k-Means-Clustering (geografisch) mit Constraint-Satisfaction für Liga-Regeln: min. 4 Teams pro Staffel, max. Reisedistanz-Varianz von 20%, gleichmäßige Teamstärke-Verteilung basierend auf GPS-Kategorien, und Berücksichtigung von Hallenkapazitäten und Spieltag-Konflikten.
            </p>
            <div className="flex gap-2 flex-wrap">
              <Badge color="purple">k-Means Cluster</Badge>
              <Badge color="green">Constraint Satisfaction</Badge>
              <Badge color="orange">GPS-Kategorien</Badge>
              <Badge color="blue">Reiseoptimierung</Badge>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
