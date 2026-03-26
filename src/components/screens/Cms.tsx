"use client";

import { useState } from "react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import Modal from "@/components/ui/Modal";
import SectionHeader from "@/components/ui/SectionHeader";

const blocks = [
  { icon: "bar-chart", name: "Liga-Tabelle", desc: "Live-Tabelle aus Ligadaten" },
  { icon: "calendar", name: "Spielplan-Widget", desc: "Nächste Spiele einer Liga" },
  { icon: "newspaper", name: "News-Card", desc: "Verlinkung zu Beiträgen" },
  { icon: "user", name: "Personen-Karte", desc: "Ausschuss, Trainer, Funktionäre" },
  { icon: "calendar", name: "Veranstaltungskalender", desc: "Events des Verbands" },
  { icon: "code", name: "HTML-Block", desc: "Für Fortgeschrittene", faded: true },
];

export default function Cms() {
  const [blockModal, setBlockModal] = useState(false);

  return (
    <div className="animate-fadeIn">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-[22px] font-bold mb-1">CMS & Inhalte</h1>
          <p className="text-[13px] text-text-muted">Block-Editor · KI-Assistent für Content & Social Media</p>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost">Vorschau</Button>
          <Button variant="ghost">Änderungen veröffentlichen v3</Button>
          <Button>Neuen Inhalt erstellen</Button>
        </div>
      </div>

      <div className="grid grid-cols-[1fr_320px] gap-5 min-w-0">
        {/* Editor */}
        <div className="min-w-0">
          {/* KI Panel */}
          <div className="bg-gradient-to-br from-accent-dim to-blue-dim border border-accent/20 rounded-[10px] p-[18px] mb-4">
            <div className="text-[11px] font-bold uppercase tracking-wider text-accent mb-2 flex items-center gap-1.5"><Icon name="sparkle" size={14} /> KI Content-Assistent</div>
            <div className="text-sm font-bold mb-2">Spielbericht automatisch generieren</div>
            <div className="text-xs text-text-dim mb-3">Basierend auf: TSV Hannover vs. SVC Göttingen · 3:1 · Spieltag 8 · 15.03.2026</div>
            <div className="bg-s2 rounded-[6px] p-3 text-xs leading-relaxed text-text-dim mb-3 border-l-2 border-l-accent">
              „Spannendes Duell an der Tabellenspitze: TSV Hannover setzt sich mit 3:1 gegen den Verfolger SVC Göttingen durch und baut die Tabellenführung in der Verbandsliga Nord aus. Die Gastgeber zeigten besonders in den Sätzen 2 und 3 eine starke Aufschlagserie..."
              <div className="text-text-muted mt-1.5 text-[11px]">Generiert · 423 Zeichen · Tonalität: Sachlich</div>
            </div>
            <div className="flex gap-1.5 mb-2.5">
              <Button variant="ghost" size="sm">Sachlich</Button>
              <Button size="sm">Enthusiastisch <Icon name="check" size={12} /></Button>
              <Button variant="ghost" size="sm">Jugendlich</Button>
            </div>
            <div className="flex gap-1.5">
              <Button size="sm"><Icon name="check" size={14} /> In Editor übernehmen</Button>
              <Button variant="ghost" size="sm"><Icon name="smartphone" size={14} /> Social Post generieren</Button>
              <Button variant="ghost" size="sm"><Icon name="refresh" size={14} /> Neu generieren</Button>
            </div>
          </div>

          {/* Block Editor */}
          <div className="bg-s1 border border-border rounded-[10px] p-5 mb-3">
            <div className="flex justify-between items-center mb-3.5">
              <div className="text-[13px] font-bold">Spielbericht Spieltag 8</div>
              <Badge color="orange">Entwurf</Badge>
            </div>

            {/* Block: Hero */}
            <div className="bg-s2 rounded-[6px] p-3 mb-2 border border-border">
              <div className="text-[10px] text-text-muted mb-1 font-semibold uppercase">HERO BLOCK</div>
              <div className="text-[17px] font-bold">TSV Hannover bleibt an der Spitze</div>
              <div className="text-xs text-text-muted">Verbandsliga Nord · Spieltag 8 · 15. März 2026</div>
            </div>

            {/* Block: Text */}
            <div className="bg-s2 rounded-[6px] p-3 mb-2 border border-border">
              <div className="text-[10px] text-text-muted mb-1 font-semibold uppercase">TEXT BLOCK</div>
              <div className="text-[13px] leading-relaxed">Spannendes Duell an der Tabellenspitze: TSV Hannover setzt sich mit 3:1 gegen den Verfolger SVC Göttingen durch...</div>
            </div>

            {/* Add Block */}
            <div
              className="bg-s2 rounded-[6px] p-3 border border-dashed border-accent cursor-pointer hover:bg-accent-dim transition-colors"
              onClick={() => setBlockModal(true)}
            >
              <div className="text-center text-accent text-[13px] font-semibold">+ Block hinzufügen</div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div>
          <SectionHeader title="Block-Bibliothek" />
          {blocks.map((b, i) => (
            <div key={i} className={`border border-dashed border-border rounded-[6px] px-3.5 py-3 mb-2 cursor-pointer transition-all bg-s2 flex items-center gap-2.5 hover:border-accent hover:bg-accent-dim ${b.faded ? "!border-solid opacity-50" : ""}`}>
              <div className="text-xl w-8 text-center"><Icon name={b.icon} size={20} /></div>
              <div className="flex-1">
                <div className="text-[13px] font-semibold">{b.name}</div>
                <div className="text-[11px] text-text-muted">{b.desc}</div>
              </div>
            </div>
          ))}

          {/* Social Media */}
          <SectionHeader title="Social Media Posts" className="mt-4" />
          <div className="bg-s2 rounded-[6px] p-3.5 border border-border">
            <div className="text-[11px] font-bold text-text-muted mb-2">INSTAGRAM POST – GENERIERT</div>
            <div className="text-[13px] leading-normal">Tabellenführer TSV Hannover schlägt SVC Göttingen 3:1 in der Verbandsliga Nord! Spielbericht auf nwvv.de #volleyball #NWVV #Verbandsliga</div>
            <div className="flex gap-1.5 mt-2.5">
              <Button variant="ghost" size="sm"><Icon name="copy" size={14} /> Kopieren</Button>
              <Button size="sm">Teilen</Button>
            </div>
          </div>
        </div>
      </div>

      {/* Block Modal */}
      <Modal open={blockModal} onClose={() => setBlockModal(false)} title="Block hinzufügen">
        {[
          { icon: "bar-chart", name: "Liga-Tabelle", desc: "Live-Tabellendaten" },
          { icon: "calendar", name: "Spielplan-Widget", desc: "Nächste Spiele" },
          { icon: "newspaper", name: "News-Card Reihe", desc: "3 News nebeneinander" },
          { icon: "image", name: "Bild-Block", desc: "Vollbild oder Float" },
          { icon: "user", name: "Personen-Karte", desc: "Ausschuss/Trainer" },
        ].map((b, i) => (
          <div
            key={i}
            className="border border-dashed border-border rounded-[6px] px-3.5 py-3 mb-2 cursor-pointer transition-all bg-s2 flex items-center gap-2.5 hover:border-accent hover:bg-accent-dim"
            onClick={() => setBlockModal(false)}
          >
            <div className="text-xl w-8 text-center"><Icon name={b.icon} size={20} /></div>
            <div className="flex-1"><div className="text-[13px] font-semibold">{b.name}</div><div className="text-[11px] text-text-muted">{b.desc}</div></div>
          </div>
        ))}
      </Modal>
    </div>
  );
}
