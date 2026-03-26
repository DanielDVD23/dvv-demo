"use client";

import { useState } from "react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";
import Modal from "@/components/ui/Modal";
import SectionHeader from "@/components/ui/SectionHeader";

interface Termin {
  spieltag: number;
  gegner: string;
  datum: string;
  zeit: string;
  halle: string;
  status: "ok" | "konflikt" | "warte" | "offen";
  abweichung?: string;
}

const termine: Termin[] = [
  { spieltag: 1, gegner: "TV Bützow", datum: "05.10.26", zeit: "16:00", halle: "Sporthalle Am Anger", status: "ok" },
  { spieltag: 2, gegner: "SC Potsdam", datum: "12.10.26", zeit: "16:00", halle: "Sporthalle Am Anger", status: "ok" },
  { spieltag: 3, gegner: "VCO Berlin", datum: "02.11.26", zeit: "–", halle: "–", status: "konflikt", abweichung: "Halle belegt (Stadtmeisterschaft)" },
  { spieltag: 4, gegner: "Schweriner SC", datum: "09.11.26", zeit: "15:00", halle: "Sporthalle Am Anger", status: "warte" },
  { spieltag: 5, gegner: "USV Jena", datum: "23.11.26", zeit: "16:00", halle: "Sporthalle Am Anger", status: "ok" },
  { spieltag: 6, gegner: "VC Olympia", datum: "30.11.26", zeit: "14:00", halle: "Sporthalle Am Anger", status: "ok" },
  { spieltag: 7, gegner: "Stralsunder VV", datum: "07.12.26", zeit: "–", halle: "–", status: "offen" },
  { spieltag: 8, gegner: "1. VC Wismar", datum: "14.12.26", zeit: "16:00", halle: "Sporthalle Am Anger", status: "ok" },
];

const hallenSlots = [
  { zeit: "09:00–11:00", frei: true },
  { zeit: "11:00–13:00", frei: true },
  { zeit: "13:00–15:00", frei: true },
  { zeit: "15:00–17:00", frei: true },
  { zeit: "17:00–19:00", frei: false, belegt: "Handball-Liga" },
  { zeit: "19:00–21:00", frei: false, belegt: "Badminton" },
];

const statusConfig = {
  ok: { badge: "green" as const, label: "Bestätigt", icon: "check" },
  konflikt: { badge: "red" as const, label: "Konflikt", icon: "warning" },
  warte: { badge: "orange" as const, label: "Wartet", icon: "hourglass" },
  offen: { badge: "purple" as const, label: "Offen", icon: "circle" },
};

export default function Heimspieltermine() {
  const [konfliktModal, setKonfliktModal] = useState(false);
  const [selectedTermin, setSelectedTermin] = useState<Termin | null>(null);
  const [vorschlagDatum, setVorschlagDatum] = useState("08.11.26");
  const [vorschlagZeit, setVorschlagZeit] = useState("15:00");

  const confirmed = termine.filter(t => t.status === "ok").length;
  const pending = termine.filter(t => t.status === "warte").length;
  const conflicts = termine.filter(t => t.status === "konflikt").length;
  const open = termine.filter(t => t.status === "offen").length;

  return (
    <div className="animate-fadeIn">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-[22px] font-bold mb-1">Heimspieltermine melden</h1>
          <p className="text-[13px] text-text-muted">Self-Service · Hallenverfügbarkeit · In-App-Genehmigung</p>
        </div>
        <div className="flex gap-2">
          <select className="w-[200px]">
            <option>USC Gießen Damen 1</option>
            <option>USC Gießen Damen 2</option>
            <option>USC Gießen Herren 1</option>
          </select>
          <select className="w-[140px]">
            <option>Saison 2026/27</option>
            <option>Saison 2025/26</option>
          </select>
        </div>
      </div>

      {/* Genehmigungsstatus – neutral cards, minimal color */}
      <div className="grid grid-cols-4 gap-3 mb-5">
        {[
          { value: confirmed, label: "Bestätigt", dot: "#16a34a" },
          { value: pending, label: "Warten auf Staffelleiter", dot: "#d97706" },
          { value: conflicts, label: "Konflikte", dot: "#ef4444" },
          { value: open, label: "Noch offen", dot: "#94a3b8" },
        ].map((card, i) => (
          <div key={i} className="bg-white border border-border rounded-[10px] p-3.5 text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: card.dot, flexShrink: 0 }} />
              <div className="text-[26px] font-bold leading-none">{card.value}</div>
            </div>
            <div className="text-[11px] text-text-muted font-semibold">{card.label}</div>
          </div>
        ))}
      </div>

      {/* Info Banner – neutral */}
      <div className="flex items-center gap-2 bg-s2 border border-border rounded-[6px] px-4 py-2.5 mb-4 text-[13px] text-text-dim">
        <Icon name="info" size={14} />
        Termine innerhalb ±1 Tag des Spielplans werden automatisch genehmigt. Größere Abweichungen erfordern Staffelleiter-Freigabe.
      </div>

      {/* Termin-Tabelle */}
      <SectionHeader title="Spieltermine Hinrunde 2026/27" right={
        <div className="flex gap-3 text-[11px] text-text-muted font-medium">
          <span className="flex items-center gap-1"><span style={{ width: 6, height: 6, borderRadius: "50%", background: "#16a34a", display: "inline-block" }} /> {confirmed} OK</span>
          <span className="flex items-center gap-1"><span style={{ width: 6, height: 6, borderRadius: "50%", background: "#d97706", display: "inline-block" }} /> {pending} wartend</span>
          <span className="flex items-center gap-1"><span style={{ width: 6, height: 6, borderRadius: "50%", background: "#ef4444", display: "inline-block" }} /> {conflicts} Konflikt</span>
          <span className="flex items-center gap-1"><span style={{ width: 6, height: 6, borderRadius: "50%", background: "#94a3b8", display: "inline-block" }} /> {open} offen</span>
        </div>
      } />
      <Card noPadding className="overflow-hidden">
        <table className="w-full border-collapse text-[13px]">
          <thead>
            <tr>
              {["ST", "Gegner", "Datum", "Uhrzeit", "Halle", "Status", ""].map(h => (
                <th key={h} className="text-[11px] font-semibold text-text-muted uppercase tracking-wide px-3.5 py-2.5 text-left border-b border-border">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {termine.map((t, i) => {
              const cfg = statusConfig[t.status];
              return (
                <tr key={i} className={`hover:bg-s2 transition-colors ${t.status === "konflikt" ? "bg-s2" : ""}`}>
                  <td className="px-3.5 py-3 border-b border-border font-bold text-text-muted">{t.spieltag}</td>
                  <td className="px-3.5 py-3 border-b border-border font-semibold">{t.gegner}</td>
                  <td className="px-3.5 py-3 border-b border-border">
                    {t.datum}
                    {t.abweichung && <div className="text-[10px] text-red mt-0.5">{t.abweichung}</div>}
                  </td>
                  <td className="px-3.5 py-3 border-b border-border">{t.zeit}</td>
                  <td className="px-3.5 py-3 border-b border-border text-text-dim">{t.halle}</td>
                  <td className="px-3.5 py-3 border-b border-border">
                    <Badge color={cfg.badge}><Icon name={cfg.icon} size={12} /> {cfg.label}</Badge>
                  </td>
                  <td className="px-3.5 py-3 border-b border-border">
                    {t.status === "konflikt" && (
                      <Button variant="danger" size="sm" onClick={() => { setSelectedTermin(t); setKonfliktModal(true); }}>Termin vorschlagen</Button>
                    )}
                    {t.status === "offen" && (
                      <Button size="sm" onClick={() => { setSelectedTermin(t); setKonfliktModal(true); }}>Termin melden</Button>
                    )}
                    {t.status === "warte" && (
                      <Button variant="ghost" size="sm">Details</Button>
                    )}
                    {t.status === "ok" && (
                      <Button variant="ghost" size="sm">Ändern</Button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>

      {/* Fortschritt */}
      <Card className="mt-5">
        <div className="flex justify-between items-center mb-2">
          <div className="text-sm font-bold">Gesamtfortschritt</div>
          <div className="text-sm font-bold text-accent">{Math.round((confirmed / termine.length) * 100)}%</div>
        </div>
        <div className="bg-s3 rounded-full h-2.5 overflow-hidden flex">
          <div className="h-full bg-accent transition-all" style={{ width: `${(confirmed / termine.length) * 100}%`, opacity: 0.9 }} />
          <div className="h-full transition-all" style={{ width: `${(pending / termine.length) * 100}%`, background: "#d4d0e0" }} />
          <div className="h-full transition-all" style={{ width: `${((conflicts + open) / termine.length) * 100}%`, background: "#e8e5f0" }} />
        </div>
        <div className="flex gap-4 mt-2 text-[11px] text-text-muted">
          <span>Bestätigt: {confirmed}/{termine.length}</span>
          <span>Wartend: {pending}/{termine.length}</span>
          <span>Offen/Konflikt: {conflicts + open}/{termine.length}</span>
        </div>
      </Card>

      <div className="flex gap-2.5 justify-end mt-5">
        <Button variant="ghost">Entwurf speichern</Button>
        <Button disabled={conflicts > 0 || open > 0}>Alle Termine einreichen</Button>
      </div>

      {/* Termin-Vorschlag Modal */}
      <Modal open={konfliktModal} onClose={() => setKonfliktModal(false)} title={selectedTermin?.status === "offen" ? "Heimspieltermin melden" : "Alternativtermin vorschlagen"} large>
        {selectedTermin && (
          <div>
            <div className="bg-s2 rounded-[6px] p-3 mb-4">
              <div className="text-sm font-bold">Spieltag {selectedTermin.spieltag}: vs. {selectedTermin.gegner}</div>
              <div className="text-xs text-text-muted mt-0.5">
                Grunddatum lt. Spielplan: {selectedTermin.datum}
                {selectedTermin.abweichung && <span className="text-red ml-2">· {selectedTermin.abweichung}</span>}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-5">
              {/* Linke Spalte: Terminvorschlag */}
              <div>
                <div className="text-xs font-bold text-text-dim mb-3 uppercase tracking-wide">Neuer Termin</div>
                <div className="mb-3">
                  <div className="text-xs font-semibold text-text-dim mb-1.5">Datum *</div>
                  <input defaultValue="2026-11-08" type="date" onChange={(e) => {
                    const d = e.target.value.split("-");
                    if (d.length === 3) setVorschlagDatum(`${d[2]}.${d[1]}.${d[0].slice(2)}`);
                  }} />
                </div>
                <div className="mb-3">
                  <div className="text-xs font-semibold text-text-dim mb-1.5">Uhrzeit *</div>
                  <input type="time" defaultValue="15:00" onChange={(e) => setVorschlagZeit(e.target.value)} />
                </div>
                <div className="mb-3">
                  <div className="text-xs font-semibold text-text-dim mb-1.5">Halle *</div>
                  <select>
                    <option>Sporthalle Am Anger</option>
                    <option>Großsporthalle Gießen-West</option>
                    <option>Uni-Sporthalle Kugelberg</option>
                  </select>
                </div>
                <div className="mb-3">
                  <div className="text-xs font-semibold text-text-dim mb-1.5">Begründung</div>
                  <textarea rows={2} placeholder="z.B. Halle am Grunddatum belegt durch..." defaultValue={selectedTermin.abweichung || ""} />
                </div>

                <div className="bg-s2 rounded-[6px] p-3 mt-3">
                  <div className="text-xs font-bold mb-1.5">Vorschau</div>
                  <div className="text-sm font-bold">{vorschlagDatum} · {vorschlagZeit} Uhr</div>
                  <div className="text-xs text-text-muted">Sporthalle Am Anger</div>
                  <div className="flex items-center gap-1.5 mt-2">
                    <Badge color="orange">Abweichung &gt; 1 Tag</Badge>
                    <span className="text-[10px] text-text-muted">→ Staffelleiter-Freigabe nötig</span>
                  </div>
                </div>
              </div>

              {/* Rechte Spalte: Hallenverfügbarkeit */}
              <div>
                <div className="text-xs font-bold text-text-dim mb-3 uppercase tracking-wide">Hallenverfügbarkeit · {vorschlagDatum}</div>
                <div className="text-xs text-text-muted mb-2">Sporthalle Am Anger</div>
                <div className="space-y-1.5">
                  {hallenSlots.map((slot, i) => (
                    <div key={i} className={`flex items-center gap-2.5 px-3 py-2 rounded-[6px] text-xs font-medium ${
                      slot.frei
                        ? "bg-green-dim border border-[rgba(22,163,74,0.15)] text-green cursor-pointer hover:border-green"
                        : "bg-red-dim border border-[rgba(239,68,68,0.15)] text-red"
                    }`}>
                      <span className="font-semibold w-24">{slot.zeit}</span>
                      {slot.frei ? (
                        <span>Frei</span>
                      ) : (
                        <span>Belegt · {slot.belegt}</span>
                      )}
                      {slot.frei && slot.zeit === "15:00–17:00" && (
                        <span className="ml-auto bg-green text-white px-2 py-0.5 rounded text-[10px] font-bold">Gewählt</span>
                      )}
                    </div>
                  ))}
                </div>

                <div className="mt-4 bg-accent-dim border border-[rgba(124,58,237,0.15)] rounded-[6px] p-3">
                  <div className="text-xs font-bold text-accent mb-1">Auch verfügbar:</div>
                  <div className="text-[11px] text-text-dim">
                    Großsporthalle Gießen-West: 14:00–20:00 frei<br />
                    Uni-Sporthalle Kugelberg: 10:00–14:00 frei
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-2 mt-5 pt-4 border-t border-border">
              <Button variant="ghost" onClick={() => setKonfliktModal(false)}>Abbrechen</Button>
              <div className="flex-1" />
              <Button onClick={() => setKonfliktModal(false)}>Vorschlag an Staffelleiter senden</Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
