"use client";

import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";

const EHRUNGEN = [
  { person: "Dr. Thomas Müller", ehrung: "Goldene Ehrennadel", stufe: "Gold", jahr: 2026, status: "ausstehend", verein: "SWD powervolleys Düren" },
  { person: "Ingrid Hoffmann", ehrung: "Silberne Ehrennadel", stufe: "Silber", jahr: 2026, status: "bestaetigt", verein: "DVV" },
  { person: "Michael Krause", ehrung: "Ehrenbrief", stufe: "Bronze", jahr: 2025, status: "verliehen", verein: "Grizzlys Giesen" },
  { person: "Petra Schmidt", ehrung: "Goldene Ehrennadel", stufe: "Gold", jahr: 2025, status: "verliehen", verein: "BR Volleys" },
  { person: "Stefan Meier", ehrung: "Silberne Ehrennadel", stufe: "Silber", jahr: 2026, status: "ausstehend", verein: "DVV" },
];

const statusColors: Record<string, "orange" | "green" | "blue"> = { ausstehend: "orange", bestaetigt: "green", verliehen: "blue" };

export default function Ehrungen() {
  return (
    <div className="animate-fadeIn">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="text-[22px] font-bold mb-1">Ehrungen</h1>
          <p className="text-[13px] text-text-muted">Ehrungsvorgänge & Verleihungen</p>
        </div>
        <Button>+ Ehrung beantragen</Button>
      </div>

      <Card noPadding className="!mb-0">
        <table className="w-full border-collapse text-[13px]">
          <thead><tr>
            {["Person", "Verein", "Ehrung", "Stufe", "Jahr", "Status", ""].map(h => (
              <th key={h} className="text-[11px] font-semibold text-text-muted uppercase tracking-wide px-4 py-2.5 text-left border-b border-border">{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {EHRUNGEN.map((e, i) => (
              <tr key={i} className={`hover:bg-s2 ${e.status === "ausstehend" ? "status-bar-orange" : e.status === "bestaetigt" ? "status-bar-green" : "status-bar-blue"}`}>
                <td className="px-4 py-2.5 border-b border-border font-semibold">{e.person}</td>
                <td className="px-4 py-2.5 border-b border-border text-text-dim">{e.verein}</td>
                <td className="px-4 py-2.5 border-b border-border">{e.ehrung}</td>
                <td className="px-4 py-2.5 border-b border-border"><Badge color={e.stufe === "Gold" ? "orange" : e.stufe === "Silber" ? "gray" : "purple"}>{e.stufe}</Badge></td>
                <td className="px-4 py-2.5 border-b border-border">{e.jahr}</td>
                <td className="px-4 py-2.5 border-b border-border"><Badge color={statusColors[e.status]}>{e.status.charAt(0).toUpperCase() + e.status.slice(1)}</Badge></td>
                <td className="px-4 py-2.5 border-b border-border">
                  {e.status === "ausstehend" && <Button size="sm">Freigabe</Button>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
