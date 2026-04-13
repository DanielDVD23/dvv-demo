"use client";

import { useState } from "react";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import HelperTooltip from "@/components/ui/HelperTooltip";

const PROFILE = {
  name: "Max Keller",
  initials: "MK",
  verein: "TSV Blau-Weiss Berlin",
  lizenzStatus: "aktiv" as const,
  lizenzTyp: "Halle",
  lizenzNr: "DVV-2026-48291",
  gueltigBis: "30.06.2026",
  verbrauchPct: 78,
  tageBisAblauf: 48,
  fotoVorhanden: true,
  beachLizenz: null as null | { status: string; fotoFehlt: boolean },
};

PROFILE.beachLizenz = { status: "abgelaufen", fotoFehlt: true };

const EVENTS = [
  { id: "e1", title: "Schiedsrichter-Lehrgang C", date: "22.06.2026", ort: "Berlin", status: "bestaetigt" as const, angemeldet: true },
  { id: "e2", title: "Beach-Volleyball Camp", date: "05.07.2026", ort: "Timmendorfer Strand", status: "warteliste" as const, angemeldet: true },
  { id: "e3", title: "Trainer-Fortbildung B", date: "19.07.2026", ort: "Stuttgart", status: "offen" as const, angemeldet: false },
  { id: "e4", title: "DVV Beach-Tour Turnier", date: "02.08.2026", ort: "Düsseldorf", status: "offen" as const, angemeldet: false },
];

const statusColors: Record<string, "green" | "orange" | "gray"> = { bestaetigt: "green", warteliste: "orange", offen: "gray" };
const statusLabels: Record<string, string> = { bestaetigt: "Bestätigt", warteliste: "Warteliste", offen: "Offen" };

export default function SpielerSelfService() {
  const [evts, setEvts] = useState(EVENTS);
  const [uploading, setUploading] = useState(false);

  const toggleAnmeldung = (id: string) => {
    setEvts(prev => prev.map(e => e.id === id ? { ...e, angemeldet: !e.angemeldet, status: !e.angemeldet ? "bestaetigt" as const : "offen" as const } : e));
  };

  return (
    <div className="animate-fadeIn">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-[22px] font-bold mb-1">Mein Profil</h1>
          <p className="text-[13px] text-text-muted">Lizenzen, Veranstaltungen & Anmeldungen</p>
        </div>
        <Button variant="ghost"><Icon name="settings" size={14} /> Einstellungen</Button>
      </div>

      {/* Warning Banner */}
      {PROFILE.beachLizenz?.status === "abgelaufen" && (
        <div className="bg-red-dim border border-red/20 rounded-[8px] px-4 py-3 mb-4 flex items-center gap-3">
          <Icon name="alert" size={18} className="text-red shrink-0" />
          <div className="flex-1">
            <div className="text-[13px] font-semibold text-red">Beach-Lizenz abgelaufen</div>
            <div className="text-[12px] text-text-muted">Deine Anmeldung zum Beach-Volleyball Camp ist gefährdet.</div>
          </div>
          <Button size="sm">Erneuern</Button>
        </div>
      )}

      {/* Profile Header */}
      <Card className="!mb-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent to-[#6D28D9] flex items-center justify-center text-[20px] font-bold text-white shrink-0">
            {PROFILE.initials}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[18px] font-bold">{PROFILE.name}</div>
            <div className="text-[13px] text-text-muted">{PROFILE.verein}</div>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-dim border border-green/20">
            <Icon name="check" size={14} className="text-green" />
            <span className="text-[12px] font-semibold text-green">Lizenz Aktiv</span>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-4 items-start">
        <div>
          {/* Lizenz-Sektion */}
          <Card className="!mb-4">
            <div className="flex items-center gap-1.5 mb-4">
              <span className="text-[11px] font-bold text-text-muted uppercase tracking-wider">Aktuelle Lizenz</span>
              <HelperTooltip title="Spielerlizenz" body="Deine Lizenz berechtigt dich am offiziellen Spielbetrieb teilzunehmen. Ohne gültige Lizenz drohen dem Verein Strafen." learnMore="/hilfe/lizenzen" />
            </div>
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div>
                <div className="flex items-center gap-1 text-[11px] text-text-muted mb-1">Lizenztyp <HelperTooltip title="Lizenztyp" body="Halle = Indoor-Volleyball. Beach = Beach-Volleyball. Du kannst mehrere Lizenzen gleichzeitig besitzen." /></div>
                <div className="text-[14px] font-semibold">{PROFILE.lizenzTyp}</div>
              </div>
              <div>
                <div className="text-[11px] text-text-muted mb-1">Lizenznummer</div>
                <div className="text-[14px] font-medium font-mono">{PROFILE.lizenzNr}</div>
              </div>
              <div>
                <div className="text-[11px] text-text-muted mb-1">Gültig bis</div>
                <div className="text-[14px] font-semibold">{PROFILE.gueltigBis}</div>
              </div>
            </div>

            {/* Progress */}
            <div className="mb-4">
              <div className="flex items-center justify-between text-[12px] mb-1.5">
                <span className="text-text-muted">Gültigkeitszeitraum</span>
                <span className="font-medium">{PROFILE.verbrauchPct}% verbraucht</span>
              </div>
              <div className="h-2 bg-s3 rounded-full overflow-hidden">
                <div className={`h-full rounded-full transition-all ${PROFILE.verbrauchPct > 80 ? "bg-orange" : "bg-accent"}`} style={{ width: PROFILE.verbrauchPct + "%" }} />
              </div>
            </div>

            {/* Foto Upload */}
            <div className="border-2 border-dashed border-border rounded-lg p-6 text-center mb-4 hover:border-accent/40 transition-colors cursor-pointer" onDragOver={e => e.preventDefault()}>
              <Icon name="camera" size={24} className="text-text-muted mx-auto mb-2" />
              <div className="text-[13px] font-medium">Passfoto hochladen oder Kamera nutzen</div>
              <div className="text-[11px] text-text-muted mt-1">JPG oder PNG, max. 5 MB</div>
            </div>

            {PROFILE.tageBisAblauf < 60 && (
              <Button className="w-full">Lizenz verlängern</Button>
            )}
          </Card>

          {/* Beach-Lizenz */}
          {PROFILE.beachLizenz && (
            <Card className="!mb-4" borderColor="border-l-red">
              <div className="flex items-center justify-between mb-2">
                <div className="text-[11px] font-bold text-text-muted uppercase tracking-wider">Beach-Lizenz</div>
                <Badge color="red">Abgelaufen</Badge>
              </div>
              <div className="text-[13px] text-text-muted mb-3">Deine Beach-Lizenz ist abgelaufen. Erneuere sie, um an Beach-Turnieren teilnehmen zu können.</div>
              {PROFILE.beachLizenz.fotoFehlt && (
                <div className="flex items-center gap-2 text-[12px] text-orange mb-3">
                  <Icon name="alert" size={14} /> Passfoto fehlt für die Erneuerung
                </div>
              )}
              <Button size="sm">Beach-Lizenz erneuern</Button>
            </Card>
          )}

          {/* Veranstaltungen */}
          <Card className="!mb-4">
            <div className="flex items-center justify-between mb-4">
              <div className="text-[11px] font-bold text-text-muted uppercase tracking-wider">Anstehende Veranstaltungen & Lehrgänge</div>
              <Button size="sm" variant="ghost"><Icon name="calendar" size={13} /> Alle exportieren</Button>
            </div>
            <div className="space-y-3">
              {evts.map(e => (
                <div key={e.id} className="flex items-center gap-3 p-3 rounded-lg bg-s2 hover:bg-s3 transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                    <Icon name="calendar-star" size={18} className="text-accent" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[14px] font-medium truncate">{e.title}</div>
                    <div className="text-[12px] text-text-muted">{e.date} · {e.ort}</div>
                  </div>
                  <Badge color={statusColors[e.status]}>{statusLabels[e.status]}</Badge>
                  <div className="flex gap-1.5">
                    <Button size="sm" variant={e.angemeldet ? "ghost" : "primary"} onClick={() => toggleAnmeldung(e.id)}>
                      {e.angemeldet ? "Abmelden" : "Anmelden"}
                    </Button>
                    <button className="p-1.5 rounded-md hover:bg-s3 transition-colors cursor-pointer bg-transparent border-none" title="Kalender-Export (.ics)">
                      <Icon name="calendar" size={14} className="text-text-muted" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Sidebar: Action Cards */}
        <div>
          <div className="text-[11px] font-bold text-text-muted uppercase tracking-wider mb-3">Offene Aktionen</div>

          <Card className="!mb-3" borderColor="border-l-orange">
            <div className="flex items-center gap-2 mb-1">
              <Icon name="clock" size={16} className="text-orange" />
              <span className="text-[13px] font-semibold">Lizenz lauft in {PROFILE.tageBisAblauf} Tagen ab</span>
            </div>
            <div className="text-[12px] text-text-muted mb-3">Verlängere rechtzeitig, um deinen Spielbetrieb nicht zu unterbrechen.</div>
            <Button size="sm">Verlängern</Button>
          </Card>

          <Card className="!mb-3" borderColor="border-l-blue">
            <div className="flex items-center gap-2 mb-1">
              <Icon name="calendar-star" size={16} className="text-blue" />
              <span className="text-[13px] font-semibold">Neue Veranstaltung verfügbar</span>
            </div>
            <div className="text-[12px] text-text-muted mb-3">DVV Beach-Tour Turnier in Düsseldorf — 02.08.2026</div>
            <Button size="sm" variant="ghost">Ansehen</Button>
          </Card>

          <Card className="!mb-3" borderColor="border-l-red">
            <div className="flex items-center gap-2 mb-1">
              <Icon name="alert" size={16} className="text-red" />
              <span className="text-[13px] font-semibold">Beach-Lizenz: Foto fehlt</span>
            </div>
            <div className="text-[12px] text-text-muted mb-3">Lade ein aktuelles Passfoto hoch, um deine Beach-Lizenz zu erneuern.</div>
            <Button size="sm" variant="ghost">Hochladen</Button>
          </Card>

          {/* Meine Teams */}
          <Card className="!mb-3">
            <div className="text-[11px] font-bold text-text-muted uppercase tracking-wider mb-3">Meine Mannschaften</div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-[13px]">
                <span className="w-2 h-2 rounded-full bg-accent" />
                <span className="font-medium">Herren 1. Bundesliga</span>
                <span className="text-text-muted ml-auto">Kader</span>
              </div>
              <div className="flex items-center gap-2 text-[13px]">
                <span className="w-2 h-2 rounded-full bg-blue" />
                <span className="font-medium">Mixed Beach</span>
                <span className="text-text-muted ml-auto">Kader</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
