"use client";

import { useState } from "react";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";

const KAMPAGNEN = [
  { name: "Saisonstart-Rundschreiben", empfaenger: 847, status: "versendet", datum: "01.04.2026", oeffnungsrate: "68%" },
  { name: "Lizenz-Ablauf-Erinnerung", empfaenger: 234, status: "geplant", datum: "10.04.2026", oeffnungsrate: "—" },
  { name: "SR-Lehrgang Einladung", empfaenger: 45, status: "entwurf", datum: "—", oeffnungsrate: "—" },
  { name: "Meldefrist-Erinnerung NRW", empfaenger: 1250, status: "versendet", datum: "28.03.2026", oeffnungsrate: "72%" },
];

const TEMPLATES = [
  { name: "Saisonstart", kategorie: "Allgemein", icon: "calendar" },
  { name: "Fristenerinnerung", kategorie: "Verwaltung", icon: "alert" },
  { name: "Ergebnismitteilung", kategorie: "Spielbetrieb", icon: "trophy" },
  { name: "Einladung Lehrgang", kategorie: "Bildung", icon: "graduation-cap" },
  { name: "Pressemitteilung", kategorie: "Presse", icon: "newspaper" },
];

const statusColors: Record<string, "green" | "blue" | "gray"> = { versendet: "green", geplant: "blue", entwurf: "gray" };

export default function Kommunikation() {
  const [activeTab, setActiveTab] = useState<"hub" | "rundschreiben" | "messenger">("hub");

  return (
    <div className="animate-fadeIn">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="text-[22px] font-bold mb-1">Kommunikation</h1>
          <p className="text-[13px] text-text-muted">Massen-Kommunikation, Messenger & CMS</p>
        </div>
        <Button>+ Rundschreiben erstellen</Button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-5 bg-s2 rounded-[8px] p-1 w-fit border border-border">
        {[{ id: "hub", label: "Hub" }, { id: "rundschreiben", label: "Rundschreiben" }, { id: "messenger", label: "Messenger" }].map(t => (
          <button key={t.id} className={`px-4 py-2 rounded-[6px] text-[13px] font-medium cursor-pointer ${activeTab === t.id ? "bg-accent text-white" : "text-text-muted"}`} onClick={() => setActiveTab(t.id as typeof activeTab)}>{t.label}</button>
        ))}
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
        <Card className="!mb-0 !p-4"><div className="text-[22px] font-bold">3</div><div className="text-[11px] text-text-muted">Aktive Kampagnen</div></Card>
        <Card className="!mb-0 !p-4"><div className="text-[22px] font-bold">2.376</div><div className="text-[11px] text-text-muted">Versendet (7 Tage)</div></Card>
        <Card className="!mb-0 !p-4"><div className="text-[22px] font-bold">12</div><div className="text-[11px] text-text-muted">Offene Aufgaben</div></Card>
        <Card className="!mb-0 !p-4"><div className="text-[22px] font-bold">8</div><div className="text-[11px] text-text-muted">Ungelesene Chats</div></Card>
      </div>

      {/* Kanal-Status */}
      <Card className="!mb-5 !p-3">
        <div className="flex gap-4 text-[12px]">
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-green" /> E-Mail</span>
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-green" /> Messenger</span>
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-orange" /> SMS (optional)</span>
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-green" /> Push Notification</span>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-4">
        {/* Campaigns */}
        <Card noPadding className="!mb-0">
          <div className="px-5 py-3 border-b border-border">
            <span className="text-xs font-bold text-text-muted uppercase tracking-wider">Kampagnen</span>
          </div>
          <table className="w-full border-collapse text-[13px]">
            <thead><tr>
              {["Name", "Empfänger", "Datum", "Öffnungsrate", "Status"].map(h => (
                <th key={h} className="text-[11px] font-semibold text-text-muted uppercase tracking-wide px-4 py-2.5 text-left border-b border-border">{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {KAMPAGNEN.map((k, i) => (
                <tr key={i} className="hover:bg-s2 cursor-pointer">
                  <td className="px-4 py-2.5 border-b border-border font-semibold">{k.name}</td>
                  <td className="px-4 py-2.5 border-b border-border">{k.empfaenger.toLocaleString("de-DE")}</td>
                  <td className="px-4 py-2.5 border-b border-border text-text-muted text-[12px]">{k.datum}</td>
                  <td className="px-4 py-2.5 border-b border-border font-medium">{k.oeffnungsrate}</td>
                  <td className="px-4 py-2.5 border-b border-border"><Badge color={statusColors[k.status]}>{k.status.charAt(0).toUpperCase() + k.status.slice(1)}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        {/* Templates */}
        <Card className="!mb-0">
          <div className="text-xs font-bold text-text-muted uppercase tracking-wider mb-3">Vorlagen</div>
          <div className="space-y-2">
            {TEMPLATES.map((t, i) => (
              <div key={i} className="flex items-center gap-3 p-2 rounded-[6px] hover:bg-s2 cursor-pointer">
                <div className="w-8 h-8 rounded-lg bg-s2 flex items-center justify-center">
                  <Icon name={t.icon} size={16} className="text-accent" />
                </div>
                <div>
                  <div className="font-semibold text-[13px]">{t.name}</div>
                  <div className="text-[11px] text-text-muted">{t.kategorie}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
