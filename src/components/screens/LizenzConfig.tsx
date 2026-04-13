"use client";

import { useState } from "react";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";

const LIZENZTYPEN = [
  { name: "Spieler Halle Senioren", kategorie: "Spieler", gueltigkeit: "1 Saison", preis: "€ 35", aktive: 18200, altersklassen: "Senioren" },
  { name: "Spieler Halle Jugend", kategorie: "Spieler", gueltigkeit: "1 Saison", preis: "€ 20", aktive: 10230, altersklassen: "U14–U20" },
  { name: "Spieler Beach", kategorie: "Spieler", gueltigkeit: "1 Saison", preis: "€ 45", aktive: 4210, altersklassen: "Alle" },
  { name: "Trainer C-Lizenz", kategorie: "Trainer", gueltigkeit: "4 Jahre", preis: "€ 380", aktive: 3200, altersklassen: "—" },
  { name: "Trainer B-Lizenz", kategorie: "Trainer", gueltigkeit: "4 Jahre", preis: "€ 520", aktive: 1850, altersklassen: "—" },
  { name: "Trainer A-Lizenz", kategorie: "Trainer", gueltigkeit: "4 Jahre", preis: "€ 850", aktive: 420, altersklassen: "—" },
  { name: "Schiedsrichter Regional", kategorie: "Schiedsrichter", gueltigkeit: "2 Jahre", preis: "€ 80", aktive: 2400, altersklassen: "—" },
  { name: "Schiedsrichter Bundesliga", kategorie: "Schiedsrichter", gueltigkeit: "1 Jahr", preis: "€ 0", aktive: 48, altersklassen: "—" },
];

const katColors: Record<string, "blue" | "green" | "orange"> = { Spieler: "blue", Trainer: "green", Schiedsrichter: "orange" };

export default function LizenzConfig() {
  const [selectedTyp, setSelectedTyp] = useState<string | null>(null);

  return (
    <div className="animate-fadeIn">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="text-[22px] font-bold mb-1">Lizenztyp-Konfiguration</h1>
          <p className="text-[13px] text-text-muted">{LIZENZTYPEN.length} Lizenztypen konfiguriert</p>
        </div>
        <Button>+ Neuer Lizenztyp</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-4">
        <Card noPadding className="!mb-0">
          <table className="w-full border-collapse text-[13px]">
            <thead><tr>
              {["Name", "Kategorie", "Gültigkeit", "Preis", "Aktive Lizenzen", "Altersklassen"].map(h => (
                <th key={h} className="text-[11px] font-semibold text-text-muted uppercase tracking-wide px-4 py-2.5 text-left border-b border-border">{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {LIZENZTYPEN.map((t, i) => (
                <tr key={i} className={`hover:bg-s2 cursor-pointer ${selectedTyp === t.name ? "bg-accent-dim" : ""}`} onClick={() => setSelectedTyp(t.name)}>
                  <td className="px-4 py-2.5 border-b border-border font-semibold">{t.name}</td>
                  <td className="px-4 py-2.5 border-b border-border"><Badge color={katColors[t.kategorie]}>{t.kategorie}</Badge></td>
                  <td className="px-4 py-2.5 border-b border-border text-text-dim">{t.gueltigkeit}</td>
                  <td className="px-4 py-2.5 border-b border-border font-semibold">{t.preis}</td>
                  <td className="px-4 py-2.5 border-b border-border">{t.aktive.toLocaleString("de-DE")}</td>
                  <td className="px-4 py-2.5 border-b border-border text-text-muted">{t.altersklassen}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        <Card className="!mb-0">
          {selectedTyp ? (
            <div className="animate-fadeIn">
              <h3 className="font-bold text-[16px] mb-4">{selectedTyp}</h3>
              <div className="space-y-3">
                <div><label className="text-[11px] font-semibold text-text-dim uppercase tracking-wide mb-1.5 block">Name</label><input defaultValue={selectedTyp} /></div>
                <div><label className="text-[11px] font-semibold text-text-dim uppercase tracking-wide mb-1.5 block">Kategorie</label><select><option>Spieler</option><option>Trainer</option><option>Schiedsrichter</option></select></div>
                <div><label className="text-[11px] font-semibold text-text-dim uppercase tracking-wide mb-1.5 block">Gültigkeitsdauer</label><input defaultValue="1 Saison" /></div>
                <div><label className="text-[11px] font-semibold text-text-dim uppercase tracking-wide mb-1.5 block">Preis</label><input defaultValue="€ 35" /></div>
                <div><label className="text-[11px] font-semibold text-text-dim uppercase tracking-wide mb-1.5 block">DOSB-LiMS Mapping</label><input placeholder="LiMS Kennung..." /></div>
                <div className="flex gap-2 pt-2">
                  <Button>Speichern</Button>
                  <Button variant="ghost">Abbrechen</Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <Icon name="settings" size={24} className="text-text-muted mx-auto mb-3" />
              <div className="text-sm font-semibold">Lizenztyp auswählen</div>
              <div className="text-xs text-text-muted mt-1">Klicken Sie auf einen Typ zum Bearbeiten</div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
