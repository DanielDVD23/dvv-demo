"use client";

import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";

const ABRECHNUNGEN = [
  { sr: "Felix Schmidt", einsatz: "BR Volleys vs. VfB", datum: "05.04.2026", km: 24, betrag: "€ 7,20", status: "freigegeben" },
  { sr: "Anna Berger", einsatz: "Grizzlys vs. Herrsching", datum: "05.04.2026", km: 90, betrag: "€ 27,00", status: "ausstehend" },
  { sr: "Peter Wagner", einsatz: "TSV Hannover vs. SC Paderborn", datum: "29.03.2026", km: 16, betrag: "€ 4,80", status: "freigegeben" },
  { sr: "Maria Keller", einsatz: "Alpenvolleys vs. Düren", datum: "29.03.2026", km: 145, betrag: "€ 43,50", status: "ausstehend" },
  { sr: "Thomas Braun", einsatz: "VfR Bielefeld vs. MTV", datum: "22.03.2026", km: 130, betrag: "€ 39,00", status: "freigegeben" },
];

const statusColors: Record<string, "green" | "orange"> = { freigegeben: "green", ausstehend: "orange" };

export default function SrFahrtkosten() {
  return (
    <div className="animate-fadeIn">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="text-[22px] font-bold mb-1">Fahrtkosten-Abrechnung</h1>
          <p className="text-[13px] text-text-muted">Pauschale: € 0,30/km</p>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost">SEPA-Gutschrift exportieren</Button>
          <Button variant="ghost"><Icon name="file" size={14} /> PDF Export</Button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-5">
        <Card className="!mb-0 !p-4"><div className="text-[22px] font-bold">€ 121,50</div><div className="text-[11px] text-text-muted">Gesamt (Monat)</div></Card>
        <Card className="!mb-0 !p-4"><div className="text-[22px] font-bold">3</div><div className="text-[11px] text-text-muted">Freigegeben</div></Card>
        <Card className="!mb-0 !p-4"><div className="text-[22px] font-bold text-orange">2</div><div className="text-[11px] text-text-muted">Ausstehend</div></Card>
      </div>

      <Card noPadding className="!mb-0">
        <table className="w-full border-collapse text-[13px]">
          <thead><tr>
            {["Schiedsrichter", "Einsatz", "Datum", "km", "Betrag", "Status", ""].map(h => (
              <th key={h} className="text-[11px] font-semibold text-text-muted uppercase tracking-wide px-4 py-2.5 text-left border-b border-border">{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {ABRECHNUNGEN.map((a, i) => (
              <tr key={i} className="hover:bg-s2">
                <td className="px-4 py-2.5 border-b border-border font-semibold">{a.sr}</td>
                <td className="px-4 py-2.5 border-b border-border text-text-dim">{a.einsatz}</td>
                <td className="px-4 py-2.5 border-b border-border text-text-muted text-[12px]">{a.datum}</td>
                <td className="px-4 py-2.5 border-b border-border">{a.km}</td>
                <td className="px-4 py-2.5 border-b border-border font-semibold">{a.betrag}</td>
                <td className="px-4 py-2.5 border-b border-border"><Badge color={statusColors[a.status]}>{a.status === "freigegeben" ? "Freigegeben" : "Ausstehend"}</Badge></td>
                <td className="px-4 py-2.5 border-b border-border">
                  {a.status === "ausstehend" && <Button size="sm">Freigeben</Button>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
