"use client";

import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";

const KPI_SHOP = [
  { label: "Umsatz (Monat)", value: "€ 12.430", icon: "coin", color: "text-green" },
  { label: "Offene Bestellungen", value: "23", icon: "shopping-bag", color: "text-blue" },
  { label: "Retourenquote", value: "4.2%", icon: "refresh", color: "text-orange" },
];

const BESTELLUNGEN = [
  { nr: "SH-2026-0892", kaeufer: "TSV Hannover", produkt: "Trikot-Set Heimspiel", betrag: "€ 1.240", status: "versendet" },
  { nr: "SH-2026-0891", kaeufer: "Grizzlys Giesen", produkt: "Trainingsanzüge (12x)", betrag: "€ 2.880", status: "bezahlt" },
  { nr: "SH-2026-0890", kaeufer: "BR Volleys", produkt: "Bälle Mikasa V200W (24x)", betrag: "€ 1.680", status: "bestellt" },
  { nr: "SH-2026-0889", kaeufer: "SWD Düren", produkt: "Knieschoner (20x)", betrag: "€ 400", status: "zugestellt" },
  { nr: "SH-2026-0888", kaeufer: "TSV Herrsching", produkt: "Trikot-Set Auswärts", betrag: "€ 1.120", status: "retourniert" },
];

const statusColors: Record<string, "blue" | "green" | "orange" | "gray" | "red"> = {
  bestellt: "blue", bezahlt: "green", versendet: "orange", zugestellt: "green", retourniert: "red",
};
const statusLabels: Record<string, string> = {
  bestellt: "Bestellt", bezahlt: "Bezahlt", versendet: "Versendet", zugestellt: "Zugestellt", retourniert: "Retourniert",
};

const GROESSEN_TABELLE = [
  { spieler: "Lena Weber", dvvId: "DVV-2024-0812", trikot: "M", shorts: "M", schuhe: "39", self: true },
  { spieler: "Anna Koch", dvvId: "DVV-2024-0813", trikot: "S", shorts: "S", schuhe: "38", self: true },
  { spieler: "Sarah Braun", dvvId: "DVV-2024-0814", trikot: "L", shorts: "M", schuhe: "40", self: false },
  { spieler: "Marie Schulz", dvvId: "DVV-2024-0815", trikot: "—", shorts: "—", schuhe: "—", self: false },
];

export default function Shop() {
  return (
    <div className="animate-fadeIn">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="text-[22px] font-bold mb-1">Shop & Ausrüstungsverwaltung</h1>
          <p className="text-[13px] text-text-muted">Shopify-Integration & Größenverwaltung</p>
        </div>
        <div className="flex gap-2">
          <Badge color="green"><span className="w-2 h-2 bg-green rounded-full inline-block mr-1" /> Shopify verbunden</Badge>
          <Badge color="green"><span className="w-2 h-2 bg-green rounded-full inline-block mr-1" /> SSO aktiv</Badge>
        </div>
      </div>

      <div className="bg-blue-dim border border-[rgba(37,99,235,0.2)] rounded-[8px] px-4 py-3 mb-5 flex items-center gap-3">
        <Icon name="info" size={18} className="text-blue shrink-0" />
        <span className="text-[13px] text-blue font-medium">Der Bestellprozess wird vollständig in Shopify abgewickelt — hier: Übersicht & Größenverwaltung</span>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-5">
        {KPI_SHOP.map(k => (
          <Card key={k.label} className="!mb-0 !p-4">
            <div className={`w-8 h-8 rounded-lg bg-s2 flex items-center justify-center mb-2`}>
              <Icon name={k.icon} size={16} className={k.color} />
            </div>
            <div className="text-[22px] font-bold">{k.value}</div>
            <div className="text-[11px] text-text-muted font-medium">{k.label}</div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Bestellungen */}
        <Card noPadding className="!mb-0 overflow-hidden">
          <div className="px-5 py-3 border-b border-border">
            <span className="text-xs font-bold text-text-muted uppercase tracking-wider">Bestellungen (aus Shopify)</span>
          </div>
          <table className="w-full border-collapse text-[13px]">
            <thead><tr>
              {["Nr.", "Käufer", "Produkt", "Betrag", "Status"].map(h => (
                <th key={h} className="text-[11px] font-semibold text-text-muted uppercase tracking-wide px-3 py-2.5 text-left border-b border-border">{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {BESTELLUNGEN.map(b => (
                <tr key={b.nr} className="hover:bg-s2 cursor-pointer">
                  <td className="px-3 py-2.5 border-b border-border font-mono text-[11px] text-text-muted">{b.nr}</td>
                  <td className="px-3 py-2.5 border-b border-border font-semibold text-[12px]">{b.kaeufer}</td>
                  <td className="px-3 py-2.5 border-b border-border text-text-dim text-[12px]">{b.produkt}</td>
                  <td className="px-3 py-2.5 border-b border-border font-semibold">{b.betrag}</td>
                  <td className="px-3 py-2.5 border-b border-border"><Badge color={statusColors[b.status]}>{statusLabels[b.status]}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        {/* Größentabelle */}
        <Card noPadding className="!mb-0 overflow-hidden">
          <div className="px-5 py-3 border-b border-border flex items-center justify-between">
            <span className="text-xs font-bold text-text-muted uppercase tracking-wider">Größen (1. Mannschaft)</span>
            <Button size="sm" variant="ghost">Export für Ausrüster</Button>
          </div>
          <table className="w-full border-collapse text-[13px]">
            <thead><tr>
              {["Spieler", "Trikot", "Shorts", "Schuhe", "Self-Service"].map(h => (
                <th key={h} className="text-[11px] font-semibold text-text-muted uppercase tracking-wide px-3 py-2.5 text-left border-b border-border">{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {GROESSEN_TABELLE.map((g, i) => (
                <tr key={i} className="hover:bg-s2">
                  <td className="px-3 py-2.5 border-b border-border">
                    <div className="font-semibold">{g.spieler}</div>
                    <div className="text-[10px] text-text-muted font-mono">{g.dvvId}</div>
                  </td>
                  <td className="px-3 py-2.5 border-b border-border">{g.trikot === "—" ? <Badge color="orange">Fehlt</Badge> : g.trikot}</td>
                  <td className="px-3 py-2.5 border-b border-border">{g.shorts === "—" ? <Badge color="orange">Fehlt</Badge> : g.shorts}</td>
                  <td className="px-3 py-2.5 border-b border-border">{g.schuhe === "—" ? <Badge color="orange">Fehlt</Badge> : g.schuhe}</td>
                  <td className="px-3 py-2.5 border-b border-border">{g.self ? <Badge color="green">Gepflegt</Badge> : <Badge color="gray">Ausstehend</Badge>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    </div>
  );
}
