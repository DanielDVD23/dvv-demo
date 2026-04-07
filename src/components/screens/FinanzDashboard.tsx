"use client";

import { useState } from "react";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";

const KPI = [
  { label: "Offene Forderungen", value: "€ 284.320", color: "text-blue", icon: "coin" },
  { label: "Eingegangen (Monat)", value: "€ 1.247.890", color: "text-green", icon: "check" },
  { label: "SEPA-Mandate aktiv", value: "3.847", color: "text-accent", icon: "file" },
  { label: "Überfällig", value: "€ 42.180", color: "text-red", icon: "alert" },
];

const RECHNUNGEN = [
  { nr: "RE-2026-0892", empfaenger: "TSV Hannover", betrag: 1250, faellig: "15.04.2026", art: "SEPA", status: "offen" },
  { nr: "RE-2026-0891", empfaenger: "SWD Düren", betrag: 2400, faellig: "10.04.2026", art: "Überweisung", status: "offen" },
  { nr: "RE-2026-0887", empfaenger: "Grizzlys Giesen", betrag: 890, faellig: "05.04.2026", art: "SEPA", status: "ueberfaellig" },
  { nr: "RE-2026-0885", empfaenger: "BR Volleys", betrag: 4500, faellig: "01.04.2026", art: "SEPA", status: "bezahlt" },
  { nr: "RE-2026-0880", empfaenger: "TSV Herrsching", betrag: 1100, faellig: "28.03.2026", art: "PayPal", status: "bezahlt" },
  { nr: "RE-2026-0878", empfaenger: "Alpenvolleys Haching", betrag: 780, faellig: "25.03.2026", art: "SEPA", status: "storniert" },
];

const BUCHUNGEN = [
  { zeit: "vor 2 Min.", text: "TSV Herrsching — €1.100 eingegangen", color: "text-green" },
  { zeit: "vor 15 Min.", text: "BR Volleys — €4.500 eingegangen", color: "text-green" },
  { zeit: "vor 1 Std.", text: "SEPA-Lastschrift SWD Düren gescheitert", color: "text-red" },
  { zeit: "vor 3 Std.", text: "Mahnung an Grizzlys Giesen versendet", color: "text-orange" },
];

const statusColors: Record<string, "green" | "blue" | "red" | "gray"> = { bezahlt: "green", offen: "blue", ueberfaellig: "red", storniert: "gray" };
const statusLabels: Record<string, string> = { bezahlt: "Bezahlt", offen: "Offen", ueberfaellig: "Überfällig", storniert: "Storniert" };

export default function FinanzDashboard() {
  const [showDatev, setShowDatev] = useState(false);

  return (
    <div className="animate-fadeIn">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="text-[22px] font-bold mb-1">Finanz-Dashboard</h1>
          <p className="text-[13px] text-text-muted">Buchhaltung & Forderungsmanagement</p>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" onClick={() => setShowDatev(!showDatev)}>DATEV Export</Button>
          <Button variant="ghost">SEPA-XML Export</Button>
          <Button>+ Rechnung erstellen</Button>
        </div>
      </div>

      {showDatev && (
        <Card className="!mb-4 border-l-4 border-l-accent">
          <div className="text-xs font-bold text-text-muted uppercase tracking-wider mb-3">DATEV Export</div>
          <div className="grid grid-cols-3 gap-3">
            <div><label className="text-[11px] font-semibold text-text-dim uppercase tracking-wide mb-1.5 block">Format</label><select><option>DATEV CSV</option><option>DATEV XML</option></select></div>
            <div><label className="text-[11px] font-semibold text-text-dim uppercase tracking-wide mb-1.5 block">Von</label><input type="date" /></div>
            <div><label className="text-[11px] font-semibold text-text-dim uppercase tracking-wide mb-1.5 block">Bis</label><input type="date" /></div>
          </div>
          <div className="flex justify-end gap-2 mt-3"><Button variant="ghost" onClick={() => setShowDatev(false)}>Abbrechen</Button><Button>Export starten</Button></div>
        </Card>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
        {KPI.map(k => (
          <Card key={k.label} className="!mb-0 !p-4">
            <div className={`w-8 h-8 rounded-lg bg-s2 flex items-center justify-center mb-2`}>
              <Icon name={k.icon} size={16} className={k.color} />
            </div>
            <div className="text-[22px] font-bold">{k.value}</div>
            <div className="text-[11px] text-text-muted font-medium">{k.label}</div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-4">
        <Card noPadding className="!mb-0">
          <div className="px-5 py-3 border-b border-border flex items-center justify-between">
            <span className="text-xs font-bold text-text-muted uppercase tracking-wider">Offene Rechnungen</span>
            <div className="flex gap-2">
              <Button size="sm" variant="ghost">Mahnungen senden</Button>
              <Button size="sm" variant="ghost">SEPA generieren</Button>
            </div>
          </div>
          <table className="w-full border-collapse text-[13px]">
            <thead><tr>
              {["Nr.", "Empfänger", "Betrag", "Fällig", "Zahlungsart", "Status"].map(h => (
                <th key={h} className="text-[11px] font-semibold text-text-muted uppercase tracking-wide px-4 py-2.5 text-left border-b border-border">{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {RECHNUNGEN.map(r => (
                <tr key={r.nr} className={`hover:bg-s2 cursor-pointer ${r.status === "ueberfaellig" ? "status-bar-red" : ""}`}>
                  <td className="px-4 py-2.5 border-b border-border font-mono text-[11px] text-text-muted">{r.nr}</td>
                  <td className="px-4 py-2.5 border-b border-border font-semibold">{r.empfaenger}</td>
                  <td className="px-4 py-2.5 border-b border-border font-semibold">€ {r.betrag.toLocaleString("de-DE")}</td>
                  <td className="px-4 py-2.5 border-b border-border text-text-muted text-[12px]">{r.faellig}</td>
                  <td className="px-4 py-2.5 border-b border-border text-text-dim">{r.art}</td>
                  <td className="px-4 py-2.5 border-b border-border"><Badge color={statusColors[r.status]}>{statusLabels[r.status]}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        <Card className="!mb-0">
          <div className="text-xs font-bold text-text-muted uppercase tracking-wider mb-4">Zahlungseingänge</div>
          <div className="space-y-3">
            {BUCHUNGEN.map((b, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${b.color.replace("text-", "bg-")}`} />
                <div>
                  <div className={`text-[13px] ${b.color}`}>{b.text}</div>
                  <div className="text-[11px] text-text-muted">{b.zeit}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
