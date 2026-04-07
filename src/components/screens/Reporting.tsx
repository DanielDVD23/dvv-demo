"use client";

import { useState } from "react";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";

const REPORTS = [
  { name: "Mitgliederentwicklung", kategorie: "Mitglieder", letzterExport: "01.04.2026", format: "PDF", icon: "users" },
  { name: "Lizenzquoten pro Verband", kategorie: "Lizenzen", letzterExport: "28.03.2026", format: "Excel", icon: "clipboard" },
  { name: "Vereinsübersicht nach Bundesland", kategorie: "Mitglieder", letzterExport: "15.03.2026", format: "CSV", icon: "building" },
  { name: "Spielbilanz Saison", kategorie: "Spielbetrieb", letzterExport: "07.04.2026", format: "PDF", icon: "volleyball" },
  { name: "Finanzübersicht Quartal", kategorie: "Finanzen", letzterExport: "01.04.2026", format: "Excel", icon: "coin" },
  { name: "Schiedsrichter-Einsatzstatistik", kategorie: "Spielbetrieb", letzterExport: "05.04.2026", format: "PDF", icon: "whistle" },
];

const kategorieColors: Record<string, "purple" | "blue" | "green" | "orange"> = {
  Mitglieder: "purple", Lizenzen: "blue", Spielbetrieb: "green", Finanzen: "orange",
};

export default function Reporting() {
  const [filterKategorie, setFilterKategorie] = useState("");

  const filtered = REPORTS.filter(r => !filterKategorie || r.kategorie === filterKategorie);

  return (
    <div className="animate-fadeIn">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="text-[22px] font-bold mb-1">Reporting & Dashboards</h1>
          <p className="text-[13px] text-text-muted">Standard-Reports und BI-Funktionalität</p>
        </div>
        <Button>+ Report erstellen</Button>
      </div>

      <Card className="!mb-4 !p-3">
        <div className="flex gap-3 flex-wrap">
          <input className="!w-64" placeholder="Report suchen..." />
          <select className="!w-44" value={filterKategorie} onChange={(e) => setFilterKategorie(e.target.value)}>
            <option value="">Alle Kategorien</option>
            <option value="Mitglieder">Mitglieder</option>
            <option value="Lizenzen">Lizenzen</option>
            <option value="Spielbetrieb">Spielbetrieb</option>
            <option value="Finanzen">Finanzen</option>
          </select>
        </div>
      </Card>

      {/* Report Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-5">
        {filtered.map(r => (
          <Card key={r.name} className="!mb-0 cursor-pointer hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 rounded-lg bg-s2 flex items-center justify-center">
                <Icon name={r.icon} size={20} className="text-accent" />
              </div>
              <Badge color={kategorieColors[r.kategorie]}>{r.kategorie}</Badge>
            </div>
            <h3 className="font-bold text-[14px] mb-1">{r.name}</h3>
            <div className="text-[11px] text-text-muted mb-3">Letzter Export: {r.letzterExport}</div>
            <div className="flex gap-2">
              <Button size="sm" variant="ghost">CSV</Button>
              <Button size="sm" variant="ghost">Excel</Button>
              <Button size="sm" variant="ghost">PDF</Button>
              <Button size="sm">Ausführen</Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Report Builder Preview */}
      <Card>
        <div className="text-xs font-bold text-text-muted uppercase tracking-wider mb-4">Report-Builder</div>
        <div className="bg-s2 rounded-[8px] p-8 text-center">
          <Icon name="bar-chart" size={32} className="text-text-muted mx-auto mb-3" />
          <div className="text-[14px] font-semibold mb-1">Eigenen Report erstellen</div>
          <div className="text-[12px] text-text-muted mb-4">Felder aus dem Datenkatalog per Drag&Drop zusammenstellen</div>
          <Button>Report-Builder öffnen</Button>
        </div>
      </Card>
    </div>
  );
}
