"use client";

import { useState } from "react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";

interface Spielerin {
  nr: number;
  name: string;
  passNr: string;
  gebdat: string;
  gueltigBis: string;
  status: "gueltig" | "abgelaufen" | "gesperrt" | "unchecked";
  checked: boolean;
  foto?: string;
}

const kader: Spielerin[] = [
  { nr: 1, name: "Lena Weber", passNr: "HVV-2024-12345", gebdat: "12.03.2011", gueltigBis: "30.06.2027", status: "unchecked", checked: false },
  { nr: 3, name: "Anna Koch", passNr: "HVV-2024-12346", gebdat: "05.07.2011", gueltigBis: "30.06.2027", status: "unchecked", checked: false },
  { nr: 5, name: "Sarah Braun", passNr: "HVV-2023-12347", gebdat: "22.11.2010", gueltigBis: "30.09.2026", status: "unchecked", checked: false },
  { nr: 7, name: "Marie Schulz", passNr: "HVV-2024-12348", gebdat: "14.02.2011", gueltigBis: "30.06.2027", status: "unchecked", checked: false },
  { nr: 9, name: "Lisa Fischer", passNr: "HVV-2024-12349", gebdat: "30.08.2011", gueltigBis: "30.06.2027", status: "unchecked", checked: false },
  { nr: 10, name: "Julia Becker", passNr: "HVV-2024-12350", gebdat: "19.01.2012", gueltigBis: "30.06.2027", status: "unchecked", checked: false },
  { nr: 11, name: "Emma Hoffmann", passNr: "HVV-2023-12351", gebdat: "03.06.2011", gueltigBis: "31.08.2026", status: "unchecked", checked: false },
  { nr: 12, name: "Lea Wagner", passNr: "HVV-2024-12352", gebdat: "27.09.2011", gueltigBis: "30.06.2027", status: "unchecked", checked: false },
  { nr: 14, name: "Mia Zimmermann", passNr: "HVV-2022-12353", gebdat: "08.12.2010", gueltigBis: "15.03.2026", status: "unchecked", checked: false },
  { nr: 15, name: "Sophie Krüger", passNr: "HVV-2024-12354", gebdat: "11.04.2011", gueltigBis: "30.06.2027", status: "unchecked", checked: false },
  { nr: 17, name: "Clara Meier", passNr: "HVV-2024-12355", gebdat: "25.10.2011", gueltigBis: "30.06.2027", status: "unchecked", checked: false },
  { nr: 18, name: "Hannah Schröder", passNr: "HVV-2024-12356", gebdat: "16.05.2012", gueltigBis: "30.06.2027", status: "unchecked", checked: false },
];

export default function Passkontrolle() {
  const [spielerinnen, setSpielerinnen] = useState(kader);
  const [scanInput, setScanInput] = useState("");
  const [lastScanned, setLastScanned] = useState<Spielerin | null>(null);
  const [showResult, setShowResult] = useState(false);

  const checked = spielerinnen.filter(s => s.checked).length;
  const total = spielerinnen.length;
  const issues = spielerinnen.filter(s => s.status === "abgelaufen" || s.status === "gesperrt").length;

  const handleScan = (passNr?: string) => {
    const nr = passNr || scanInput;
    const idx = spielerinnen.findIndex(s => s.passNr === nr || s.name.toLowerCase().includes(nr.toLowerCase()));
    if (idx >= 0) {
      const updated = [...spielerinnen];
      const spielerin = { ...updated[idx] };

      // Check validity
      const gueltigParts = spielerin.gueltigBis.split(".");
      const gueltigDate = new Date(parseInt(gueltigParts[2]), parseInt(gueltigParts[1]) - 1, parseInt(gueltigParts[0]));
      const now = new Date();

      if (gueltigDate < now) {
        spielerin.status = "abgelaufen";
      } else {
        spielerin.status = "gueltig";
      }
      spielerin.checked = true;
      updated[idx] = spielerin;
      setSpielerinnen(updated);
      setLastScanned(spielerin);
      setShowResult(true);
      setScanInput("");

      setTimeout(() => setShowResult(false), 4000);
    }
  };

  const handleQuickCheck = (idx: number) => {
    const updated = [...spielerinnen];
    const spielerin = { ...updated[idx] };
    const gueltigParts = spielerin.gueltigBis.split(".");
    const gueltigDate = new Date(parseInt(gueltigParts[2]), parseInt(gueltigParts[1]) - 1, parseInt(gueltigParts[0]));
    const now = new Date();
    spielerin.status = gueltigDate < now ? "abgelaufen" : "gueltig";
    spielerin.checked = true;
    updated[idx] = spielerin;
    setSpielerinnen(updated);
    setLastScanned(spielerin);
    setShowResult(true);
    setTimeout(() => setShowResult(false), 4000);
  };

  return (
    <div className="animate-fadeIn max-w-[520px] mx-auto">
      {/* Mobile Header */}
      <div className="text-center mb-5">
        <div className="inline-flex items-center gap-2 bg-accent-dim text-accent text-[11px] font-bold px-3 py-1 rounded-full mb-3">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="5" y="2" width="14" height="20" rx="2" /><line x1="12" y1="18" x2="12" y2="18" /></svg>
          Mobile-Ansicht
        </div>
        <h1 className="text-[22px] font-bold mb-1">Passkontrolle</h1>
        <p className="text-[13px] text-text-muted">USC Gießen vs. SC Potsdam · U16w · 12.10.2026</p>
      </div>

      {/* Scan Input */}
      <Card className="!mb-4">
        <div className="flex gap-2 mb-3">
          <div className="flex-1 relative">
            <input
              value={scanInput}
              onChange={(e) => setScanInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleScan()}
              placeholder="Pass-Nr. eingeben oder Name..."
              className="!pr-10"
            />
            <button
              className="absolute right-2 top-1/2 -translate-y-1/2 text-text-muted hover:text-accent"
              onClick={() => handleScan()}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
            </button>
          </div>
          <button className="bg-accent text-white rounded-[6px] px-4 py-2 text-sm font-bold shrink-0 hover:bg-accent-hover transition-colors flex items-center gap-2">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M7 7h3v3H7zM14 7h3v3h-3zM7 14h3v3H7z" /></svg>
            QR
          </button>
        </div>
        <div className="text-[11px] text-text-muted text-center">Pass-Nummer, Name oder QR-Code scannen</div>
      </Card>

      {/* Scan Result Banner */}
      {showResult && lastScanned && (
        <div className={`mb-4 rounded-[10px] p-4 border-2 animate-slideUp ${
          lastScanned.status === "gueltig"
            ? "bg-green-dim border-green"
            : "bg-red-dim border-red"
        }`}>
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold text-white shrink-0 ${
              lastScanned.status === "gueltig" ? "bg-green" : "bg-red"
            }`}>
              {lastScanned.status === "gueltig" ? <Icon name="check" size={14} /> : <Icon name="x" size={14} />}
            </div>
            <div>
              <div className={`text-sm font-bold ${lastScanned.status === "gueltig" ? "text-green" : "text-red"}`}>
                {lastScanned.status === "gueltig" ? "GÜLTIG" : "ABGELAUFEN"}
              </div>
              <div className="text-base font-bold">{lastScanned.name}</div>
              <div className="text-xs text-text-muted">
                #{lastScanned.nr} · Pass: {lastScanned.passNr} · Geb: {lastScanned.gebdat}
              </div>
              <div className="text-xs text-text-muted">
                Gültig bis: <span className={lastScanned.status === "abgelaufen" ? "text-red font-bold" : ""}>{lastScanned.gueltigBis}</span>
              </div>
            </div>
          </div>
          {lastScanned.status === "abgelaufen" && (
            <div className="mt-2 bg-red/10 rounded-[6px] p-2 text-xs text-red font-semibold">
              Pass abgelaufen! Spielerin ist nicht spielberechtigt.
            </div>
          )}
        </div>
      )}

      {/* Progress */}
      <div className="flex items-center gap-3 mb-4">
        <div className="flex-1 bg-s3 rounded-full h-2.5 overflow-hidden">
          <div className="h-full bg-green rounded-full transition-all duration-500" style={{ width: `${(checked / total) * 100}%` }} />
        </div>
        <div className="text-sm font-bold shrink-0">{checked}/{total}</div>
      </div>
      {issues > 0 && (
        <div className="flex items-center gap-2 bg-red-dim border border-[rgba(239,68,68,0.2)] rounded-[6px] px-3 py-2 mb-4 text-[12px] text-red font-semibold">
          <Icon name="warning" size={14} /> {issues} {issues === 1 ? "Problem" : "Probleme"} gefunden
        </div>
      )}

      {/* Spielerinnen-Liste */}
      <div className="space-y-1.5">
        {spielerinnen.map((s, i) => (
          <div
            key={i}
            className={`flex items-center gap-3 px-3.5 py-2.5 rounded-[8px] border transition-all cursor-pointer ${
              s.status === "gueltig"
                ? "bg-green-dim border-[rgba(22,163,74,0.2)]"
                : s.status === "abgelaufen"
                ? "bg-red-dim border-[rgba(239,68,68,0.3)]"
                : "bg-s1 border-border hover:bg-s2"
            }`}
            onClick={() => !s.checked && handleQuickCheck(i)}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
              s.status === "gueltig"
                ? "bg-green text-white"
                : s.status === "abgelaufen"
                ? "bg-red text-white"
                : "bg-s3 text-text-muted"
            }`}>
              {s.status === "gueltig" ? <Icon name="check" size={14} /> : s.status === "abgelaufen" ? <Icon name="x" size={14} /> : s.nr}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[13px] font-semibold truncate">{s.name}</div>
              <div className="text-[11px] text-text-muted">#{s.nr} · {s.passNr}</div>
            </div>
            {s.status === "gueltig" && <Badge color="green">OK</Badge>}
            {s.status === "abgelaufen" && <Badge color="red">Abgelaufen</Badge>}
            {s.status === "unchecked" && (
              <span className="text-[11px] text-text-muted">Tippen zum Prüfen</span>
            )}
          </div>
        ))}
      </div>

      {/* Abschluss */}
      <div className="mt-5 pt-4 border-t border-border">
        <Button className="w-full" disabled={checked < total}>
          {checked < total ? `Kontrolle abschließen (${total - checked} fehlen)` : "Kontrolle abschließen & bestätigen"}
        </Button>
        {checked === total && issues === 0 && (
          <div className="text-center text-xs text-green font-semibold mt-2">Alle Spielerinnen geprüft – keine Beanstandungen</div>
        )}
        {checked === total && issues > 0 && (
          <div className="text-center text-xs text-red font-semibold mt-2">Achtung: {issues} Spielerin(nen) nicht spielberechtigt</div>
        )}
      </div>
    </div>
  );
}
