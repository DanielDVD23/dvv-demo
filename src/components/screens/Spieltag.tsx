"use client";

import { useState } from "react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";
import Modal from "@/components/ui/Modal";

const spiele = [
  { teams: "TSV Hannover vs. SVC Göttingen", date: "Sa, 12.04.2026 · 14:00 Uhr · Sporthalle TSV, Eilenriede", status: "confirmed" as const, label: "Bestätigt" },
  { teams: "MTV Wolfsburg vs. VfR Bielefeld", date: "Termin vorgeschlagen: Sa, 12.04.2026 · 16:00 Uhr · Wartet auf Gastteam-Bestätigung", status: "proposed" as const, label: "Vorgeschlagen" },
  { teams: "SVC Göttingen vs. MTV Braunschweig", date: "Konflikt: Beide Teams uneinig · Staffelleitung muss entscheiden", status: "conflict" as const, label: "Konflikt" },
  { teams: "TSV Hildesheim vs. SC Osnabrück", date: "Noch kein Heimspieltermin gemeldet · Frist: 05.04.2026", status: "open" as const, label: "Offen" },
];

const statusConfig = {
  confirmed: { icon: <Icon name="check" size={14} />, iconBg: "bg-green-dim text-green", badgeColor: "green" as const, border: "border-l-green" },
  proposed: { icon: "!", iconBg: "bg-orange-dim text-orange", badgeColor: "orange" as const, border: "border-l-orange" },
  conflict: { icon: <Icon name="warning" size={14} />, iconBg: "bg-red-dim text-red", badgeColor: "red" as const, border: "border-l-red" },
  open: { icon: "○", iconBg: "bg-accent-dim text-accent", badgeColor: "purple" as const, border: "border-l-accent" },
};

export default function Spieltag() {
  const [konfliktModal, setKonfliktModal] = useState(false);
  const [verlegungModal, setVerlegungModal] = useState(false);

  return (
    <div className="animate-fadeIn">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-[22px] font-bold mb-1">Spieltagsplanung</h1>
          <p className="text-[13px] text-text-muted">Self-Service Heimspieltermine · Integrierter Verlegungsworkflow</p>
        </div>
        <div className="flex gap-2">
          <select className="w-[180px]"><option>Verbandsliga Nord</option><option>Bezirksliga Damen</option><option>Kreisliga Hannover</option></select>
          <select className="w-[140px]"><option>Spieltag 9</option><option>Spieltag 10</option></select>
        </div>
      </div>

      {/* Warning */}
      <div className="flex items-center gap-2 bg-orange-dim border border-[rgba(245,158,11,0.3)] rounded-[6px] px-4 py-2.5 mb-4 text-[13px] text-orange">
        <Icon name="warning" size={14} /> 1 Verlegungskonflikt erfordert deine Entscheidung als Staffelleiter – Frist läuft morgen ab.
      </div>

      {/* Status Legend */}
      <div className="flex gap-2 mb-4 flex-wrap">
        <Badge color="green">● Bestätigt</Badge>
        <Badge color="orange">● Termin vorgeschlagen</Badge>
        <Badge color="purple">● Kein Termin</Badge>
        <Badge color="red">● Konflikt – Staffelleitung</Badge>
      </div>

      {/* Spielliste */}
      {spiele.map((spiel, i) => {
        const cfg = statusConfig[spiel.status];
        return (
          <div
            key={i}
            className={`bg-s2 border border-border rounded-[6px] px-4 py-3 mb-2 flex items-center gap-3.5 border-l-[3px] ${cfg.border} cursor-pointer hover:bg-s3 transition-colors`}
            onClick={() => {
              if (spiel.status === "conflict") setKonfliktModal(true);
              if (spiel.status === "proposed") setVerlegungModal(true);
            }}
          >
            <div className={`text-[11px] px-1.5 py-0.5 rounded ${cfg.iconBg} shrink-0`}>{cfg.icon}</div>
            <div className="flex-1">
              <div className="text-[13.5px] font-bold mb-0.5">{spiel.teams}</div>
              <div className={`text-[11px] text-text-muted ${spiel.status === "conflict" ? "!text-red" : ""}`}>{spiel.date}</div>
            </div>
            <Badge color={cfg.badgeColor}>{spiel.label}</Badge>
            {spiel.status === "conflict" && <Button variant="danger" size="sm">Entscheiden →</Button>}
            {spiel.status === "proposed" && <Button variant="ghost" size="sm">Details</Button>}
            {spiel.status === "open" && <Button variant="ghost" size="sm">Anmahnen</Button>}
          </div>
        );
      })}

      {/* Workflow */}
      <Card className="mt-5">
        <div className="text-sm font-bold mb-3">Verlegungsworkflow</div>
        <div className="flex items-center">
          {["Heimteam meldet Termin", "Gastteam prüft", "Bestätigung / Gegenvorschlag", "Staffelleitung entscheidet", "Automatische Wertung"].map((step, i) => (
            <div
              key={i}
              className={`flex-1 text-center text-[11px] font-semibold py-2 px-1 relative ${
                i < 2 ? "bg-green-dim text-green" : i === 2 ? "bg-accent-dim text-accent" : "bg-s2 text-text-muted"
              }`}
            >
              {step}
            </div>
          ))}
        </div>
        <div className="text-xs text-text-muted mt-2">Bei Nicht-Einigung: Staffelleitung entscheidet. Kein Antritt = 0:3 / 0:75 Wertung automatisch.</div>
      </Card>

      {/* Konflikt Modal */}
      <Modal open={konfliktModal} onClose={() => setKonfliktModal(false)} title={<span className="flex items-center gap-1.5"><Icon name="warning" size={16} /> Verlegungskonflikt entscheiden</span>}>
        <div className="bg-red-dim border border-[rgba(239,68,68,0.2)] rounded-[6px] p-3 mb-4 text-[13px] text-red">
          Beide Teams sind sich nicht einig. Als Staffelleiter musst du entscheiden.
        </div>
        <div className="text-sm font-bold mb-3">SVC Göttingen vs. MTV Braunschweig</div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <Card borderColor="border-l-accent" className="!p-3.5 !mb-0">
            <div className="text-[11px] font-bold text-accent mb-1.5">SVC GÖTTINGEN (Heim)</div>
            <div className="text-[13px] font-semibold">Sa, 19.04. · 14:00</div>
            <div className="text-xs text-text-muted">Sporthalle Göttingen Süd</div>
            <div className="text-[11px] text-text-muted mt-1.5">Begründung: „Halle nur an diesem Termin verfügbar"</div>
          </Card>
          <Card borderColor="border-l-orange" className="!p-3.5 !mb-0">
            <div className="text-[11px] font-bold text-orange mb-1.5">MTV BRAUNSCHWEIG (Gast)</div>
            <div className="text-[13px] font-semibold">Sa, 26.04. · 15:00</div>
            <div className="text-xs text-text-muted">–</div>
            <div className="text-[11px] text-text-muted mt-1.5">Begründung: „Auswärtsspiel kollidiert mit eigenem Heimspiel"</div>
          </Card>
        </div>
        <div className="mb-3.5">
          <div className="text-xs font-semibold text-text-dim mb-1.5">Deine Entscheidung – Begründung (Pflicht)</div>
          <textarea rows={3} placeholder="z.B. Termin 19.04. wird festgesetzt, da Hallenverfügbarkeit des Heimteams Vorrang hat…" />
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" className="flex-1" onClick={() => setKonfliktModal(false)}>Abbrechen</Button>
          <Button className="flex-1" onClick={() => setKonfliktModal(false)}>Termin 19.04. festsetzen</Button>
          <Button variant="ghost" className="flex-1" onClick={() => setKonfliktModal(false)}>Termin 26.04. festsetzen</Button>
        </div>
        <div className="mt-3 text-[11px] text-text-muted bg-s2 p-2 rounded">
          Beide Teams werden automatisch benachrichtigt. Bei Nicht-Antritt gilt: 0:3 / 0:75.
        </div>
      </Modal>

      {/* Verlegung Modal */}
      <Modal open={verlegungModal} onClose={() => setVerlegungModal(false)} title="Verlegungsantrag">
        <div className="text-sm font-bold mb-1">MTV Wolfsburg vs. VfR Bielefeld</div>
        <div className="text-xs text-text-muted mb-3.5">Verbandsliga Nord · Spieltag 9</div>
        <div className="flex items-center mb-4">
          {["Heimteam schlägt vor", "Gastteam bestätigt?", "Bestätigt", "Staffelleitung"].map((s, i) => (
            <div key={i} className={`flex-1 text-center text-[10px] font-semibold py-2 ${i === 0 ? "bg-green-dim text-green" : i === 1 ? "bg-accent-dim text-accent" : "bg-s2 text-text-muted"}`}>
              {s}
            </div>
          ))}
        </div>
        <Card borderColor="border-l-orange" className="!mb-3 !p-3.5">
          <div className="text-[11px] font-bold text-orange mb-1">VORGESCHLAGENER TERMIN</div>
          <div className="text-sm font-bold">Sa, 12. April 2026 · 16:00 Uhr</div>
          <div className="text-xs text-text-muted">Sporthalle MTV Wolfsburg, Haupthalle</div>
        </Card>
        <div className="mb-3">
          <div className="text-xs font-semibold text-text-dim mb-1.5">Gegenvorschlag (optional)</div>
          <input type="date" placeholder="Anderen Termin vorschlagen" />
        </div>
        <div className="flex gap-2">
          <Button variant="success" className="flex-1" onClick={() => setVerlegungModal(false)}><Icon name="check" size={14} /> Termin bestätigen</Button>
          <Button variant="ghost" className="flex-1" onClick={() => setVerlegungModal(false)}>Gegenvorschlag senden</Button>
          <Button variant="danger" className="flex-1" onClick={() => setVerlegungModal(false)}>Ablehnen</Button>
        </div>
      </Modal>
    </div>
  );
}
