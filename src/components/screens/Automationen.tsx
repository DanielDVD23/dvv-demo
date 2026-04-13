"use client";

import { useState } from "react";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";

interface Automation {
  id: string;
  name: string;
  trigger: string;
  letzterLauf: string;
  aktiv: boolean;
  icon: string;
  betroffene?: string;
}

const AUTOMATIONEN: Automation[] = [
  { id: "A-001", name: "Dubletten-Prüfung bei Neuregistrierung", trigger: "Neue Person registriert", letzterLauf: "07.04.2026 09:12", aktiv: true, icon: "users", betroffene: "3 Funde heute" },
  { id: "A-002", name: "Strafbescheid aus Spielkarten", trigger: "Rote Karte im Spielbericht", letzterLauf: "06.04.2026 21:30", aktiv: true, icon: "alert", betroffene: "1 Bescheid generiert" },
  { id: "A-003", name: "Zahlungserinnerung (14/7/1 Tag)", trigger: "Rechnungsfälligkeit", letzterLauf: "07.04.2026 06:00", aktiv: true, icon: "mail", betroffene: "12 Erinnerungen versendet" },
  { id: "A-004", name: "Lizenz-Ablauf-Erinnerung", trigger: "Lizenzablauf in 30/14/7 Tagen", letzterLauf: "07.04.2026 06:00", aktiv: true, icon: "clipboard", betroffene: "47 Erinnerungen" },
  { id: "A-005", name: "Saisonmeldung-Frist-Erinnerung", trigger: "Meldefrist in 14/7/1 Tagen", letzterLauf: "01.04.2026 06:00", aktiv: false, icon: "calendar", betroffene: "Saison abgeschlossen" },
  { id: "A-006", name: "Automatischer DOSB-LiMS-Export", trigger: "Lizenz freigegeben", letzterLauf: "06.04.2026 15:45", aktiv: true, icon: "refresh", betroffene: "8 Exporte" },
];

const PROTOKOLL = [
  { zeit: "07.04.2026 09:12", automation: "Dubletten-Prüfung", aktion: "Prüfung durchgeführt", betroffene: "1 Person", ergebnis: "success" },
  { zeit: "07.04.2026 06:00", automation: "Zahlungserinnerung", aktion: "12 E-Mails versendet", betroffene: "12 Vereine", ergebnis: "success" },
  { zeit: "07.04.2026 06:00", automation: "Lizenz-Ablauf-Erinnerung", aktion: "47 E-Mails versendet", betroffene: "47 Personen", ergebnis: "success" },
  { zeit: "06.04.2026 21:30", automation: "Strafbescheid", aktion: "Bescheid generiert", betroffene: "1 Spieler", ergebnis: "success" },
  { zeit: "06.04.2026 15:45", automation: "DOSB-LiMS-Export", aktion: "8 Lizenzen exportiert", betroffene: "8 Personen", ergebnis: "success" },
  { zeit: "05.04.2026 06:00", automation: "Zahlungserinnerung", aktion: "Versand fehlgeschlagen", betroffene: "1 Verein", ergebnis: "error" },
];

export default function Automationen() {
  const [selectedAutomation, setSelectedAutomation] = useState<Automation | null>(null);

  return (
    <div className="animate-fadeIn">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="text-[22px] font-bold mb-1">Automationen</h1>
          <p className="text-[13px] text-text-muted">{AUTOMATIONEN.filter(a => a.aktiv).length} aktive Automationen</p>
        </div>
        <Button>+ Neue Automation</Button>
      </div>

      {/* Automation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-5">
        {AUTOMATIONEN.map(a => (
          <Card key={a.id} borderColor={a.aktiv ? "border-l-green" : "border-l-gray"} className={`!mb-0 cursor-pointer hover:shadow-md transition-shadow ${selectedAutomation?.id === a.id ? "ring-2 ring-accent" : ""}`}>
            <div onClick={() => setSelectedAutomation(a)}>
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-lg bg-s2 flex items-center justify-center">
                  <Icon name={a.icon} size={20} className={a.aktiv ? "text-accent" : "text-text-muted"} />
                </div>
                <div className={`w-10 h-5 rounded-full relative cursor-pointer ${a.aktiv ? "bg-green" : "bg-[#d1d5db]"}`}>
                  <div className={`w-4 h-4 rounded-full bg-white absolute top-0.5 transition-all ${a.aktiv ? "right-0.5" : "left-0.5"}`} />
                </div>
              </div>
              <h3 className="font-bold text-[13px] mb-1">{a.name}</h3>
              <div className="text-[11px] text-text-muted mb-2">Trigger: {a.trigger}</div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-text-dim">Letzter Lauf: {a.letzterLauf.split(" ")[1]}</span>
                {a.betroffene && <Badge color={a.aktiv ? "green" : "gray"}>{a.betroffene}</Badge>}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Execution Log */}
      <Card noPadding>
        <div className="px-5 py-3 border-b border-border flex items-center justify-between">
          <span className="text-xs font-bold text-text-muted uppercase tracking-wider">Ausführungsprotokoll</span>
        </div>
        <table className="w-full border-collapse text-[13px]">
          <thead><tr>
            {["Zeitstempel", "Automation", "Aktion", "Betroffene", "Ergebnis"].map(h => (
              <th key={h} className="text-[11px] font-semibold text-text-muted uppercase tracking-wide px-4 py-2.5 text-left border-b border-border">{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {PROTOKOLL.map((p, i) => (
              <tr key={i} className="hover:bg-s2">
                <td className="px-4 py-2.5 border-b border-border text-text-muted text-[12px]">{p.zeit}</td>
                <td className="px-4 py-2.5 border-b border-border font-medium">{p.automation}</td>
                <td className="px-4 py-2.5 border-b border-border text-text-dim">{p.aktion}</td>
                <td className="px-4 py-2.5 border-b border-border text-text-dim">{p.betroffene}</td>
                <td className="px-4 py-2.5 border-b border-border">
                  <Badge color={p.ergebnis === "success" ? "green" : "red"}>
                    {p.ergebnis === "success" ? "Erfolgreich" : "Fehler"}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
