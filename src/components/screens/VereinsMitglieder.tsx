"use client";

import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";

const MITGLIEDER = [
  { name: "Lena Weber", dvvId: "DVV-2024-0812", rollen: ["Spielerin"], lizenzen: ["Spieler Halle"], beitragStatus: "bezahlt", letzterLogin: "07.04.2026" },
  { name: "Anna Koch", dvvId: "DVV-2024-0813", rollen: ["Spielerin"], lizenzen: ["Spieler Halle"], beitragStatus: "bezahlt", letzterLogin: "06.04.2026" },
  { name: "Sarah Braun", dvvId: "DVV-2024-0814", rollen: ["Spielerin"], lizenzen: ["Spieler Halle"], beitragStatus: "bezahlt", letzterLogin: "05.04.2026" },
  { name: "Michael Krause", dvvId: "DVV-2018-0567", rollen: ["Trainer"], lizenzen: ["Trainer C"], beitragStatus: "offen", letzterLogin: "01.04.2026" },
  { name: "Lisa Fischer", dvvId: "DVV-2024-0816", rollen: ["Spielerin", "Jugendwartin"], lizenzen: ["Spieler Halle"], beitragStatus: "bezahlt", letzterLogin: "07.04.2026" },
  { name: "Thomas Weber", dvvId: "DVV-2020-0345", rollen: ["Vereinsadmin"], lizenzen: [], beitragStatus: "bezahlt", letzterLogin: "07.04.2026" },
];

const beitragColors: Record<string, "green" | "red"> = { bezahlt: "green", offen: "red" };

export default function VereinsMitglieder() {
  return (
    <div className="animate-fadeIn">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="text-[22px] font-bold mb-1">Vereins-Mitgliederverwaltung</h1>
          <p className="text-[13px] text-text-muted">TSV Hannover · {MITGLIEDER.length} Mitglieder</p>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost">Einladung senden</Button>
          <Button>+ Mitglied hinzufügen</Button>
        </div>
      </div>

      <Card noPadding className="!mb-0">
        <table className="w-full border-collapse text-[13px]">
          <thead><tr>
            {["Name", "DVV-ID", "Rolle(n)", "Lizenzen", "Beitrag", "Letzter Login"].map(h => (
              <th key={h} className="text-[11px] font-semibold text-text-muted uppercase tracking-wide px-4 py-2.5 text-left border-b border-border">{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {MITGLIEDER.map((m, i) => (
              <tr key={i} className="hover:bg-s2 cursor-pointer">
                <td className="px-4 py-2.5 border-b border-border font-semibold">{m.name}</td>
                <td className="px-4 py-2.5 border-b border-border font-mono text-[11px] text-text-muted">{m.dvvId}</td>
                <td className="px-4 py-2.5 border-b border-border"><div className="flex gap-1 flex-wrap">{m.rollen.map(r => <Badge key={r} color="purple">{r}</Badge>)}</div></td>
                <td className="px-4 py-2.5 border-b border-border"><div className="flex gap-1 flex-wrap">{m.lizenzen.length ? m.lizenzen.map(l => <Badge key={l} color="blue">{l}</Badge>) : <span className="text-text-muted">—</span>}</div></td>
                <td className="px-4 py-2.5 border-b border-border"><Badge color={beitragColors[m.beitragStatus]}>{m.beitragStatus === "bezahlt" ? "Bezahlt" : "Offen"}</Badge></td>
                <td className="px-4 py-2.5 border-b border-border text-text-muted text-[12px]">{m.letzterLogin}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
