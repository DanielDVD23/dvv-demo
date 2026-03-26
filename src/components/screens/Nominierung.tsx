"use client";

import { useState } from "react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";

interface Spielerin {
  nr: number;
  name: string;
  position: string;
  status: "verfuegbar" | "krank" | "verletzt" | "gesperrt";
  nominiert: boolean;
}

const kader: Spielerin[] = [
  { nr: 1, name: "Lena Weber", position: "Zuspiel", status: "verfuegbar", nominiert: true },
  { nr: 3, name: "Anna Koch", position: "Außen", status: "verfuegbar", nominiert: true },
  { nr: 5, name: "Sarah Braun", position: "Außen", status: "verfuegbar", nominiert: true },
  { nr: 7, name: "Marie Schulz", position: "Mittelblock", status: "krank", nominiert: false },
  { nr: 9, name: "Lisa Fischer", position: "Mittelblock", status: "verfuegbar", nominiert: true },
  { nr: 10, name: "Julia Becker", position: "Diagonal", status: "verfuegbar", nominiert: true },
  { nr: 11, name: "Emma Hoffmann", position: "Libero", status: "verfuegbar", nominiert: true },
  { nr: 12, name: "Lea Wagner", position: "Außen", status: "verfuegbar", nominiert: true },
  { nr: 14, name: "Mia Zimmermann", position: "Mittelblock", status: "verletzt", nominiert: false },
  { nr: 15, name: "Sophie Krüger", position: "Zuspiel", status: "verfuegbar", nominiert: true },
  { nr: 17, name: "Clara Meier", position: "Außen", status: "verfuegbar", nominiert: true },
  { nr: 18, name: "Hannah Schröder", position: "Libero", status: "verfuegbar", nominiert: true },
];

const positionColors: Record<string, string> = {
  "Zuspiel": "bg-blue-dim text-blue",
  "Außen": "bg-green-dim text-green",
  "Mittelblock": "bg-orange-dim text-orange",
  "Diagonal": "bg-accent-dim text-accent",
  "Libero": "bg-red-dim text-red",
};

const statusIcons: Record<string, { icon: string; label: string; color: string }> = {
  "krank": { icon: "thermometer", label: "Krank", color: "text-orange" },
  "verletzt": { icon: "bandage", label: "Verletzt", color: "text-red" },
  "gesperrt": { icon: "ban", label: "Gesperrt", color: "text-red" },
};

export default function Nominierung() {
  const [spielerinnen, setSpielerinnen] = useState(kader);
  const [submitted, setSubmitted] = useState(false);

  const nominiert = spielerinnen.filter(s => s.nominiert).length;
  const verfuegbar = spielerinnen.filter(s => s.status === "verfuegbar").length;
  const minNom = 6;
  const maxNom = 14;

  const toggleNominierung = (idx: number) => {
    if (submitted) return;
    const updated = [...spielerinnen];
    const s = { ...updated[idx] };
    if (s.status !== "verfuegbar") return;
    s.nominiert = !s.nominiert;
    updated[idx] = s;
    setSpielerinnen(updated);
  };

  // Group by position
  const positions = ["Zuspiel", "Außen", "Mittelblock", "Diagonal", "Libero"];
  const grouped = positions.map(pos => ({
    position: pos,
    spielerinnen: spielerinnen.map((s, i) => ({ ...s, idx: i })).filter(s => s.position === pos),
  }));

  return (
    <div className="animate-fadeIn max-w-[520px] mx-auto">
      {/* Mobile Header */}
      <div className="text-center mb-5">
        <div className="inline-flex items-center gap-2 bg-accent-dim text-accent text-[11px] font-bold px-3 py-1 rounded-full mb-3">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="5" y="2" width="14" height="20" rx="2" /><line x1="12" y1="18" x2="12" y2="18" /></svg>
          Mobile-Ansicht
        </div>
        <h1 className="text-[22px] font-bold mb-1">Spieltagsnominierung</h1>
        <p className="text-[13px] text-text-muted">Spieltag 5 · vs. SC Potsdam</p>
      </div>

      {/* Match Info */}
      <Card className="!mb-4 !py-3">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[11px] text-text-muted font-semibold uppercase">U16w · Verbandsliga</div>
            <div className="text-base font-bold mt-0.5">USC Gießen vs. SC Potsdam</div>
          </div>
          <div className="text-right">
            <div className="text-[11px] text-text-muted">Sa, 12.10.2026</div>
            <div className="text-base font-bold">16:00</div>
          </div>
        </div>
        <div className="flex items-center gap-1.5 mt-2 text-[11px] text-text-muted">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
          Sporthalle Am Anger, Gießen
        </div>
      </Card>

      {/* Status */}
      <div className="flex gap-3 mb-4">
        <div className={`flex-1 rounded-[8px] p-3 text-center border ${nominiert >= minNom ? "bg-green-dim border-[rgba(22,163,74,0.2)]" : "bg-red-dim border-[rgba(239,68,68,0.2)]"}`}>
          <div className={`text-[22px] font-bold leading-none ${nominiert >= minNom ? "text-green" : "text-red"}`}>{nominiert}</div>
          <div className="text-[10px] text-text-muted font-semibold mt-0.5">Nominiert</div>
        </div>
        <div className="flex-1 bg-s2 rounded-[8px] p-3 text-center border border-border">
          <div className="text-[22px] font-bold leading-none">{verfuegbar}</div>
          <div className="text-[10px] text-text-muted font-semibold mt-0.5">Verfügbar</div>
        </div>
        <div className="flex-1 bg-s2 rounded-[8px] p-3 text-center border border-border">
          <div className="text-[22px] font-bold leading-none text-text-muted">{spielerinnen.length - verfuegbar}</div>
          <div className="text-[10px] text-text-muted font-semibold mt-0.5">Ausfälle</div>
        </div>
      </div>

      <div className="text-[11px] text-text-muted mb-4 text-center">
        Min. {minNom} · Max. {maxNom} Spielerinnen · Tippe zum Nominieren/Entfernen
      </div>

      {submitted && (
        <div className="bg-green-dim border-2 border-green rounded-[10px] p-4 mb-4 text-center animate-slideUp">
          <div className="text-lg font-bold text-green mb-1">Nominierung eingereicht</div>
          <div className="text-xs text-text-muted">{nominiert} Spielerinnen nominiert · Bestätigung per E-Mail</div>
        </div>
      )}

      {/* Kader nach Position */}
      {grouped.map(group => (
        <div key={group.position} className="mb-3">
          <div className="flex items-center gap-2 mb-1.5">
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${positionColors[group.position]}`}>{group.position}</span>
            <span className="text-[11px] text-text-muted">{group.spielerinnen.filter(s => s.nominiert).length}/{group.spielerinnen.length}</span>
          </div>
          <div className="space-y-1">
            {group.spielerinnen.map(s => {
              const unavailable = s.status !== "verfuegbar";
              const si = statusIcons[s.status];
              return (
                <div
                  key={s.nr}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-[8px] border transition-all ${
                    unavailable
                      ? "bg-s2 border-border opacity-50"
                      : s.nominiert
                      ? "bg-green-dim border-[rgba(22,163,74,0.25)] cursor-pointer hover:border-green"
                      : "bg-s1 border-border cursor-pointer hover:bg-s2"
                  } ${submitted ? "pointer-events-none" : ""}`}
                  onClick={() => toggleNominierung(s.idx)}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                    unavailable
                      ? "bg-s3 text-text-muted"
                      : s.nominiert
                      ? "bg-green text-white"
                      : "bg-s3 text-text-dim"
                  }`}>
                    {unavailable ? "–" : s.nominiert ? <Icon name="check" size={12} /> : s.nr}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className={`text-[13px] font-semibold ${unavailable ? "line-through" : ""}`}>
                      #{s.nr} {s.name}
                    </div>
                    {unavailable && si && (
                      <div className={`text-[11px] ${si.color} flex items-center gap-1`}><Icon name={si.icon} size={14} /> {si.label}</div>
                    )}
                  </div>
                  {!unavailable && s.nominiert && <Badge color="green">Nominiert</Badge>}
                  {!unavailable && !s.nominiert && <span className="text-[11px] text-text-muted">Tippen</span>}
                </div>
              );
            })}
          </div>
        </div>
      ))}

      {/* Submit */}
      <div className="mt-5 pt-4 border-t border-border">
        {!submitted ? (
          <Button
            className="w-full"
            disabled={nominiert < minNom}
            onClick={() => setSubmitted(true)}
          >
            {nominiert < minNom
              ? `Nominierung abschicken (min. ${minNom - nominiert} mehr)`
              : `Nominierung abschicken (${nominiert} Spielerinnen)`
            }
          </Button>
        ) : (
          <Button variant="ghost" className="w-full" onClick={() => setSubmitted(false)}>
            Nominierung bearbeiten
          </Button>
        )}
      </div>
    </div>
  );
}
