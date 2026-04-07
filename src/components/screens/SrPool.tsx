"use client";

import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";

const SR_LIST = [
  { name: "Felix Schmidt", qualifikation: "Bundesliga", ort: "Berlin", einsaetze: 18, status: "aktiv", belastung: 85 },
  { name: "Anna Berger", qualifikation: "Bundesliga", ort: "Hannover", einsaetze: 15, status: "aktiv", belastung: 71 },
  { name: "Peter Wagner", qualifikation: "Regionalliga", ort: "Hannover", einsaetze: 12, status: "aktiv", belastung: 57 },
  { name: "Maria Keller", qualifikation: "Bundesliga", ort: "München", einsaetze: 16, status: "aktiv", belastung: 76 },
  { name: "Thomas Braun", qualifikation: "Regionalliga", ort: "Köln", einsaetze: 8, status: "aktiv", belastung: 38 },
  { name: "Sandra Fischer", qualifikation: "Landesliga", ort: "Hamburg", einsaetze: 6, status: "aktiv", belastung: 29 },
  { name: "Jens Müller", qualifikation: "Bundesliga", ort: "Frankfurt", einsaetze: 14, status: "lizenz-abgelaufen", belastung: 0 },
  { name: "Karin Weber", qualifikation: "Landesliga", ort: "Stuttgart", einsaetze: 10, status: "aktiv", belastung: 48 },
];

const qualColors: Record<string, "purple" | "blue" | "green"> = { Bundesliga: "purple", Regionalliga: "blue", Landesliga: "green" };

export default function SrPool() {
  return (
    <div className="animate-fadeIn">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="text-[22px] font-bold mb-1">SR-Pool Verwaltung</h1>
          <p className="text-[13px] text-text-muted">{SR_LIST.filter(s => s.status === "aktiv").length} aktive Schiedsrichter</p>
        </div>
        <Button variant="ghost"><Icon name="map" size={14} /> Geo-Heatmap</Button>
      </div>

      {SR_LIST.some(s => s.status === "lizenz-abgelaufen") && (
        <div className="bg-red-dim border border-[rgba(239,68,68,0.2)] rounded-[8px] px-4 py-3 mb-4 flex items-center gap-3">
          <Icon name="alert" size={18} className="text-red shrink-0" />
          <span className="text-[13px] text-red font-medium">{SR_LIST.filter(s => s.status === "lizenz-abgelaufen").length} SR-Lizenz(en) abgelaufen — automatisch aus Pool entfernt</span>
        </div>
      )}

      <Card noPadding className="!mb-0">
        <table className="w-full border-collapse text-[13px]">
          <thead><tr>
            {["Name", "Qualifikation", "Heimatort", "Einsätze (Saison)", "Belastung", "Status"].map(h => (
              <th key={h} className="text-[11px] font-semibold text-text-muted uppercase tracking-wide px-4 py-2.5 text-left border-b border-border">{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {SR_LIST.map((sr, i) => (
              <tr key={i} className={`hover:bg-s2 ${sr.status === "lizenz-abgelaufen" ? "opacity-50" : ""}`}>
                <td className="px-4 py-2.5 border-b border-border font-semibold">{sr.name}</td>
                <td className="px-4 py-2.5 border-b border-border"><Badge color={qualColors[sr.qualifikation]}>{sr.qualifikation}</Badge></td>
                <td className="px-4 py-2.5 border-b border-border text-text-dim">{sr.ort}</td>
                <td className="px-4 py-2.5 border-b border-border">{sr.einsaetze}</td>
                <td className="px-4 py-2.5 border-b border-border">
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-2 bg-s2 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${sr.belastung > 75 ? "bg-red" : sr.belastung > 50 ? "bg-orange" : "bg-green"}`} style={{ width: `${sr.belastung}%` }} />
                    </div>
                    <span className="text-[11px] text-text-muted">{sr.belastung}%</span>
                  </div>
                </td>
                <td className="px-4 py-2.5 border-b border-border">
                  <Badge color={sr.status === "aktiv" ? "green" : "red"}>{sr.status === "aktiv" ? "Aktiv" : "Lizenz abgelaufen"}</Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
