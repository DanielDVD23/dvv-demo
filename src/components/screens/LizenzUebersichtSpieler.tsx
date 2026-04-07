"use client";

import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";

const MEINE_LIZENZEN = [
  { typ: "Spieler Halle Senioren", saison: "2025/26", ablaufdatum: "30.06.2026", status: "aktiv", antragsnr: "LA-2025-4521" },
  { typ: "Spieler Beach", saison: "2025/26", ablaufdatum: "31.12.2025", status: "abgelaufen", antragsnr: "LA-2025-2109" },
];

const statusColors: Record<string, "green" | "orange" | "red" | "gray"> = { aktiv: "green", abgelaufen: "red", beantragt: "orange", storniert: "gray" };

export default function LizenzUebersichtSpieler() {
  return (
    <div className="animate-fadeIn">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="text-[22px] font-bold mb-1">Meine Lizenzen</h1>
          <p className="text-[13px] text-text-muted">Lena Weber · DVV-2024-0812</p>
        </div>
        <Button>+ Neue Lizenz beantragen</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
        {MEINE_LIZENZEN.map((l, i) => (
          <Card key={i} borderColor={l.status === "aktiv" ? "border-l-green" : "border-l-red"} className="!mb-0">
            <div className="flex items-start justify-between mb-3">
              <Badge color={statusColors[l.status]}>{l.status.charAt(0).toUpperCase() + l.status.slice(1)}</Badge>
              {l.status === "aktiv" && (
                <div className="w-16 h-16 bg-s2 rounded-lg flex items-center justify-center">
                  <div className="text-center"><div className="text-[8px] text-text-muted">QR</div><div className="w-10 h-10 bg-s3 rounded" /></div>
                </div>
              )}
            </div>
            <h3 className="font-bold text-[16px] mb-1">{l.typ}</h3>
            <div className="space-y-2 text-[12px] mt-3">
              <div className="flex justify-between"><span className="text-text-muted">Saison</span><span>{l.saison}</span></div>
              <div className="flex justify-between"><span className="text-text-muted">Ablaufdatum</span><span className={l.status === "abgelaufen" ? "text-red font-semibold" : ""}>{l.ablaufdatum}</span></div>
              <div className="flex justify-between"><span className="text-text-muted">Antragsnummer</span><span className="font-mono text-[11px]">{l.antragsnr}</span></div>
            </div>
            <div className="mt-3 flex gap-2">
              {l.status === "aktiv" && <Button size="sm" variant="ghost">PDF herunterladen</Button>}
              {l.status === "abgelaufen" && <Button size="sm">Verlängern</Button>}
            </div>
          </Card>
        ))}
      </div>

      {/* Digital License Card */}
      <Card className="!mb-0">
        <div className="text-xs font-bold text-text-muted uppercase tracking-wider mb-3">Digitaler Lizenzausweis</div>
        <div className="bg-s2 rounded-[8px] p-6 flex items-center gap-6">
          <div className="w-20 h-20 bg-s3 rounded-lg flex items-center justify-center">
            <div className="text-center"><div className="text-[8px] text-text-muted">QR-Code</div><div className="w-14 h-14 bg-accent-dim rounded mt-1" /></div>
          </div>
          <div>
            <div className="font-bold text-[16px]">Lena Weber</div>
            <div className="text-[12px] text-text-muted font-mono">DVV-2024-0812</div>
            <div className="flex gap-2 mt-2">
              <Badge color="green">Spieler Halle Senioren</Badge>
              <Badge color="blue">gültig bis 30.06.2026</Badge>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
