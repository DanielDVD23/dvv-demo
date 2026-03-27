"use client";

import { useState } from "react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import Modal from "@/components/ui/Modal";

interface MailItem {
  sender: string;
  email: string;
  time: string;
  timeLabel: string;
  subject: string;
  preview: string;
  tag: { text: string; color: "red" | "orange" | "purple" | "green" } | null;
  unread: boolean;
  initials: string;
}

const mails: MailItem[] = [
  { sender: "NWVV Spielausschuss", email: "spielausschuss@nwvv.de", time: "10:24", timeLabel: "Heute, 10:24", subject: "Spielplan Änderung – Spieltag 9", preview: "Der Spieltag 9 der Verbandsliga Nord wird aufgrund von Hallenprob...", tag: { text: "Dringend", color: "red" }, unread: true, initials: "NS" },
  { sender: "TSV Hannover", email: "verwaltung@tsv-hannover.de", time: "09:15", timeLabel: "Heute, 09:15", subject: "Verlegungsantrag Heimspiel 22.03.", preview: "Hiermit beantragen wir die Verlegung unseres Heimspiels am 22.03...", tag: { text: "Antrag", color: "orange" }, unread: true, initials: "TH" },
  { sender: "MTV Wolfsburg", email: "info@mtv-wolfsburg.de", time: "Gestern", timeLabel: "Gestern, 16:42", subject: "Ergebnis Spieltag 8 – Bestätigung", preview: "Wir bestätigen das Ergebnis 3:1 gegen SC Paderborn vom Spieltag 8...", tag: null, unread: false, initials: "MW" },
  { sender: "VfR Bielefeld", email: "damen@vfr-bielefeld.de", time: "Gestern", timeLabel: "Gestern, 14:08", subject: "Mannschaftsmeldung Damen II", preview: "Anbei die aktualisierte Mannschaftsmeldung für die Rückrunde. Bitt...", tag: { text: "Meldung", color: "purple" }, unread: true, initials: "VB" },
  { sender: "SC Paderborn", email: "volleyball@sc-paderborn.de", time: "Mo", timeLabel: "Mo, 11:30", subject: "Anfrage: Schiedsrichter-Verfügbarkeit", preview: "Für den Spieltag 10 am 05.04. benötigen wir noch einen SR. Können...", tag: null, unread: false, initials: "SP" },
  { sender: "SVC Göttingen", email: "vorstand@svc-goettingen.de", time: "Mo", timeLabel: "Mo, 09:05", subject: "Hallenbelegung Winterpause", preview: "Die Sporthalle steht ab Januar nur eingeschränkt zur Verfügung...", tag: null, unread: false, initials: "SG" },
  { sender: "NWVV Finanzen", email: "finanzen@nwvv.de", time: "Fr", timeLabel: "Fr, 08:15", subject: "Rechnung #2026-042 – Strafgebühr", preview: "Die Strafgebühr für Ordnungswidrigkeit BSO §17 wurde fällig gest...", tag: { text: "Rechnung", color: "green" }, unread: false, initials: "NF" },
];

const tabs = [
  { id: "alle", label: "Alle", count: 12 },
  { id: "ungelesen", label: "Ungelesen", count: 4 },
  { id: "markiert", label: "Markiert", count: 2 },
];

const empfaengerOptionen = [
  "Alle Vereinsadmins", "Alle Staffelleiter", "Alle Trainer", "Alle Schiedsrichter",
  "TSV Hannover", "MTV Wolfsburg", "SVC Göttingen", "SC Paderborn", "VfR Bielefeld",
  "Verbandsliga Nord – Alle", "Bezirksliga Süd – Alle",
];

const labelCls = "text-[11px] font-semibold text-text-dim uppercase tracking-wide mb-1.5 block";

export default function Mail() {
  const [selectedMail, setSelectedMail] = useState(0);
  const [activeTab, setActiveTab] = useState("alle");
  const [composeOpen, setComposeOpen] = useState(false);
  const [composeForm, setComposeForm] = useState({ empfaenger: "", betreff: "", nachricht: "" });
  const [successMsg, setSuccessMsg] = useState("");

  const selected = mails[selectedMail];

  const handleSend = () => {
    if (!composeForm.empfaenger || !composeForm.betreff.trim()) return;
    setComposeOpen(false);
    setComposeForm({ empfaenger: "", betreff: "", nachricht: "" });
    setSuccessMsg("Nachricht wurde gesendet.");
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  return (
    <div className="animate-fadeIn">
      {/* Success toast */}
      {successMsg && (
        <div className="fixed top-4 right-4 z-[999] bg-green text-white px-5 py-3 rounded-[10px] text-[13px] font-semibold shadow-lg animate-slideUp flex items-center gap-2">
          <Icon name="check" size={16} /> {successMsg}
        </div>
      )}

      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-[22px] font-bold mb-1">Posteingang</h1>
          <p className="text-[13px] text-text-muted">{mails.filter(m => m.unread).length} ungelesen · {mails.length} Nachrichten</p>
        </div>
        <Button onClick={() => setComposeOpen(true)}>+ Neue Nachricht</Button>
      </div>

      {/* Two-panel layout */}
      <div className="flex gap-5" style={{ minHeight: "calc(100vh - 200px)" }}>
        {/* Left: Mail List */}
        <div className="w-[380px] shrink-0 bg-s1 border border-border rounded-[12px] overflow-hidden flex flex-col">
          {/* Search */}
          <div className="p-3">
            <div className="relative">
              <input placeholder="Nachrichten durchsuchen..." className="!pl-9" style={{ width: "100%", height: 36 }} />
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex px-3 border-b border-border">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 pb-2.5 px-3 text-[13px] cursor-pointer bg-transparent border-none font-[inherit] ${activeTab === tab.id ? "font-semibold text-accent" : "text-text-muted"}`}
                style={{ borderBottom: activeTab === tab.id ? "2px solid var(--color-accent, #7c3aed)" : "2px solid transparent", marginBottom: -1 }}
              >
                {tab.label}
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-semibold ${activeTab === tab.id ? "bg-accent-dim text-accent" : "bg-s3 text-text-muted"}`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          {/* Mail items */}
          <div className="flex-1 overflow-y-auto">
            {mails.map((mail, i) => (
              <div
                key={i}
                onClick={() => setSelectedMail(i)}
                className={`px-4 py-3 cursor-pointer border-b border-border transition-colors ${selectedMail === i ? "bg-accent-dim border-l-[3px] border-l-accent" : "hover:bg-s2 border-l-[3px] border-l-transparent"}`}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    {mail.unread && <div className="w-2 h-2 rounded-full bg-accent shrink-0" />}
                    <span className={`text-[13px] ${mail.unread ? "font-semibold" : ""}`}>{mail.sender}</span>
                  </div>
                  <span className="text-[11px] text-text-muted shrink-0">{mail.time}</span>
                </div>
                <div className={`text-[13px] mb-1 truncate ${mail.unread ? "font-semibold" : "font-medium"}`} style={{ paddingLeft: mail.unread ? 16 : 0 }}>
                  {mail.subject}
                </div>
                <div className="text-[12px] text-text-muted truncate" style={{ paddingLeft: mail.unread ? 16 : 0 }}>
                  {mail.preview}
                </div>
                {mail.tag && (
                  <div style={{ paddingLeft: mail.unread ? 16 : 0 }} className="mt-1.5">
                    <Badge color={mail.tag.color}>{mail.tag.text}</Badge>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right: Mail Detail */}
        <div className="flex-1 bg-s1 border border-border rounded-[12px] overflow-hidden flex flex-col min-w-0">
          {/* Detail Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-border">
            <h2 className="text-[18px] font-bold truncate">{selected.subject}</h2>
            <div className="flex items-center gap-2 shrink-0">
              <Button variant="ghost" size="sm">Antworten</Button>
              <Button variant="ghost" size="sm">Weiterleiten</Button>
              <Button variant="ghost" size="sm">Archivieren</Button>
            </div>
          </div>

          {/* Sender Info */}
          <div className="flex items-start gap-3 px-6 py-4 border-b border-border">
            <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-white text-[13px] font-bold shrink-0">
              {selected.initials}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[14px] font-semibold">{selected.sender}</span>
                {selected.tag && selected.tag.color === "red" && (
                  <Badge color="red">{selected.tag.text}</Badge>
                )}
              </div>
              <div className="text-[12px] text-text-muted">{selected.email} · {selected.timeLabel}</div>
            </div>
          </div>

          {/* Email Body */}
          <div className="px-6 py-5 flex-1 overflow-y-auto">
            <div className="text-[14px] leading-relaxed text-text-dim">
              <p className="mb-4">Sehr geehrte Staffelleitungen,</p>
              <p className="mb-4">
                hiermit informieren wir Sie über eine notwendige Änderung im Spielplan der Verbandsliga Nord für Spieltag 9 (geplant: 29.03.2026).
              </p>
              <p className="mb-4">
                Aufgrund der eingeschränkten Hallenverfügbarkeit in Hannover (Maschseehalle ist wegen Sanierungsarbeiten bis 15.04. gesperrt) müssen folgende Partien verlegt werden:
              </p>
              <p className="mb-1 font-semibold">• TSV Hannover vs. SVC Göttingen → Neuer Termin: 05.04.2026, Ersatzhalle IGS Roderbruch</p>
              <p className="mb-4 font-semibold">• USC Braunschweig vs. MTV Wolfsburg → Termin bestätigt, keine Änderung</p>
              <p className="mb-4">
                Bitte bestätigen Sie die Verlegung bis spätestens 25.03.2026 über das beauOS-System unter Spieltagsplanung → Verlegungen.
              </p>
              <p className="mb-4">Bei Rückfragen wenden Sie sich bitte an den Spielausschuss.</p>
              <p className="mb-1">Mit sportlichen Grüßen,</p>
              <p className="font-semibold">NWVV Spielausschuss</p>
            </div>
          </div>

          {/* Reply Box */}
          <div className="px-6 py-4 border-t border-border">
            <div className="bg-s2 border border-border rounded-[10px] p-4">
              <textarea placeholder="Antwort verfassen..." className="w-full text-[13px] resize-none bg-transparent border-none outline-none mb-3" rows={3} />
              <div className="flex justify-end">
                <Button>Senden</Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Compose Modal */}
      <Modal open={composeOpen} onClose={() => setComposeOpen(false)} title="Neue Nachricht" large>
        <div className="space-y-4">
          <div>
            <label className={labelCls}>Empfänger *</label>
            <select value={composeForm.empfaenger} onChange={e => setComposeForm({ ...composeForm, empfaenger: e.target.value })} style={{ width: "100%" }}>
              <option value="">Empfänger auswählen...</option>
              <optgroup label="Gruppen">
                {empfaengerOptionen.filter(e => e.startsWith("Alle") || e.includes("–")).map(e => <option key={e} value={e}>{e}</option>)}
              </optgroup>
              <optgroup label="Vereine">
                {empfaengerOptionen.filter(e => !e.startsWith("Alle") && !e.includes("–")).map(e => <option key={e} value={e}>{e}</option>)}
              </optgroup>
            </select>
          </div>
          <div>
            <label className={labelCls}>Betreff *</label>
            <input value={composeForm.betreff} onChange={e => setComposeForm({ ...composeForm, betreff: e.target.value })} placeholder="Betreff eingeben..." style={{ width: "100%" }} />
          </div>
          <div>
            <label className={labelCls}>Nachricht</label>
            <textarea value={composeForm.nachricht} onChange={e => setComposeForm({ ...composeForm, nachricht: e.target.value })} placeholder="Nachricht verfassen..." rows={8} style={{ width: "100%" }} />
          </div>
          <div className="flex gap-3 pt-3">
            <Button variant="ghost" className="flex-1" onClick={() => setComposeOpen(false)}>Abbrechen</Button>
            <Button className="flex-1" onClick={handleSend} disabled={!composeForm.empfaenger || !composeForm.betreff.trim()}>Nachricht senden</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
