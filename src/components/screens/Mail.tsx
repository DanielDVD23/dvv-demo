"use client";

import { useState } from "react";

const mails = [
  {
    sender: "NWVV Spielausschuss",
    email: "spielausschuss@nwvv.de",
    time: "10:24",
    timeLabel: "Heute, 10:24",
    subject: "Spielplan Änderung – Spieltag 9",
    preview: "Sehr geehrte Staffelleitungen, aufgrund der kurzfristigen Sperrung der Maschseehalle müssen zwei Partien des 9. Spieltags verlegt werden...",
    tag: { text: "Dringend", color: "#ef4444" },
    unread: true,
    initials: "NS",
  },
  {
    sender: "TSV Hannover",
    email: "verwaltung@tsv-hannover.de",
    time: "09:15",
    timeLabel: "Heute, 09:15",
    subject: "Verlegungsantrag Heimspiel 22.03.",
    preview: "Hiermit beantragen wir die Verlegung unseres Heimspiels am 22.03. gegen MTV Wolfsburg auf den 29.03...",
    tag: { text: "Antrag", color: "#d97706" },
    unread: true,
    initials: "TH",
  },
  {
    sender: "MTV Wolfsburg",
    email: "info@mtv-wolfsburg.de",
    time: "Gestern",
    timeLabel: "Gestern, 16:42",
    subject: "Ergebnis Spieltag 8 – Bestätigung",
    preview: "Wir bestätigen das Ergebnis des Spieltags 8: MTV Wolfsburg – SC Paderborn 3:1 (25:20, 23:25, 25:18, 25:22)...",
    tag: null,
    unread: false,
    initials: "MW",
  },
  {
    sender: "VfR Bielefeld",
    email: "damen@vfr-bielefeld.de",
    time: "Gestern",
    timeLabel: "Gestern, 14:08",
    subject: "Mannschaftsmeldung Damen II",
    preview: "Anbei die aktualisierte Mannschaftsmeldung unserer Damen II für die Rückrunde der Bezirksliga...",
    tag: { text: "Meldung", color: "#7c3aed" },
    unread: true,
    initials: "VB",
  },
  {
    sender: "SC Paderborn",
    email: "volleyball@sc-paderborn.de",
    time: "Mo",
    timeLabel: "Mo, 11:30",
    subject: "Anfrage: Schiedsrichter-Verfügbarkeit",
    preview: "Könnten Sie uns mitteilen, ob für unser Heimspiel am 05.04. ein Schiedsrichter zur Verfügung steht...",
    tag: null,
    unread: false,
    initials: "SP",
  },
  {
    sender: "SVC Göttingen",
    email: "vorstand@svc-goettingen.de",
    time: "Mo",
    timeLabel: "Mo, 09:05",
    subject: "Hallenbelegung Winterpause",
    preview: "Bezüglich der Hallenbelegung während der Winterpause möchten wir folgende Trainingszeiten anmelden...",
    tag: null,
    unread: false,
    initials: "SG",
  },
  {
    sender: "NWVV Finanzen",
    email: "finanzen@nwvv.de",
    time: "Fr",
    timeLabel: "Fr, 08:15",
    subject: "Rechnung #2026-042 – Strafgebühr",
    preview: "Im Anhang finden Sie die Rechnung #2026-042 über eine Strafgebühr in Höhe von 150,00 € für den Nichtantritt...",
    tag: { text: "Rechnung", color: "#16a34a" },
    unread: false,
    initials: "NF",
  },
];

const tabs = [
  { id: "alle", label: "Alle", count: 12 },
  { id: "ungelesen", label: "Ungelesen", count: 4 },
  { id: "markiert", label: "Markiert", count: 2 },
];

function getTagBg(color: string) {
  if (color === "#ef4444") return "rgba(239,68,68,0.08)";
  if (color === "#d97706") return "rgba(217,119,6,0.08)";
  if (color === "#7c3aed") return "rgba(124,58,237,0.08)";
  if (color === "#16a34a") return "rgba(22,163,106,0.08)";
  return "rgba(0,0,0,0.05)";
}

const empfaengerOptionen = [
  "Alle Vereinsadmins", "Alle Staffelleiter", "Alle Trainer", "Alle Schiedsrichter",
  "TSV Hannover", "MTV Wolfsburg", "SVC Göttingen", "SC Paderborn", "VfR Bielefeld",
  "Verbandsliga Nord – Alle", "Bezirksliga Süd – Alle",
];

const labelCls = "text-[11px] font-semibold text-[#64748b] uppercase tracking-wide mb-1.5 block";

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
    <div className="animate-fadeIn flex h-[calc(100vh-80px)] relative">
      {/* Success toast */}
      {successMsg && (
        <div className="fixed top-4 right-4 z-[999] bg-[#22c55e] text-white px-5 py-3 rounded-[10px] text-[13px] font-semibold shadow-lg flex items-center gap-2" style={{ animation: "slideUp 0.3s ease" }}>
          ✓ {successMsg}
        </div>
      )}

      {/* Compose Modal */}
      {composeOpen && (
        <div className="fixed inset-0 bg-black/60 z-[1000] flex items-center justify-center" onClick={() => setComposeOpen(false)}>
          <div className="bg-white rounded-[14px] p-7 w-[560px] max-w-[95vw] max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()} style={{ animation: "slideUp 0.2s ease" }}>
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-[17px] font-bold" style={{ color: "#1e1b4b" }}>Neue Nachricht</h3>
              <button className="w-7 h-7 rounded-[6px] flex items-center justify-center cursor-pointer" style={{ backgroundColor: "#f1f5f9", border: "1px solid #e2e8f0" }} onClick={() => setComposeOpen(false)}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className={labelCls}>Empfänger *</label>
                <select value={composeForm.empfaenger} onChange={e => setComposeForm({ ...composeForm, empfaenger: e.target.value })} style={{ width: "100%", height: 38, borderRadius: 8, border: "1px solid #e2e8f0", padding: "0 12px", fontSize: 13, fontFamily: "inherit" }}>
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
                <input value={composeForm.betreff} onChange={e => setComposeForm({ ...composeForm, betreff: e.target.value })} placeholder="Betreff eingeben..." style={{ width: "100%", height: 38, borderRadius: 8, border: "1px solid #e2e8f0", padding: "0 12px", fontSize: 13, fontFamily: "inherit" }} />
              </div>
              <div>
                <label className={labelCls}>Nachricht</label>
                <textarea value={composeForm.nachricht} onChange={e => setComposeForm({ ...composeForm, nachricht: e.target.value })} placeholder="Nachricht verfassen..." rows={8} style={{ width: "100%", borderRadius: 8, border: "1px solid #e2e8f0", padding: "12px", fontSize: 13, fontFamily: "inherit", resize: "vertical" }} />
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={() => setComposeOpen(false)} className="flex-1 h-9 rounded-[6px] text-[13px] font-medium cursor-pointer" style={{ border: "1px solid #e2e8f0", background: "white", color: "#475569", fontFamily: "inherit" }}>Abbrechen</button>
                <button onClick={handleSend} disabled={!composeForm.empfaenger || !composeForm.betreff.trim()} className="flex-1 h-9 rounded-[6px] text-[13px] font-medium text-white cursor-pointer border-none" style={{ backgroundColor: !composeForm.empfaenger || !composeForm.betreff.trim() ? "#c4b5fd" : "#7c3aed", fontFamily: "inherit" }}>Nachricht senden</button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Left Panel - Mail List */}
      <div className="w-[380px] shrink-0 border-r border-border bg-s1 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-4 pt-4 pb-3">
          <h2 style={{ fontSize: 18, fontWeight: 700, color: "#1e1b4b" }}>Posteingang</h2>
          <button
            className="flex items-center gap-1 px-3 text-white text-[12px] font-medium rounded-[6px] cursor-pointer border-none"
            style={{ backgroundColor: "#7c3aed", height: 28, fontFamily: "inherit" }}
            onClick={() => setComposeOpen(true)}
          >
            + Neue Nachricht
          </button>
        </div>

        {/* Search */}
        <div className="px-4 pb-3">
          <input
            type="text"
            placeholder="Nachrichten durchsuchen..."
            className="w-full px-3 text-[13px] rounded-[6px] outline-none"
            style={{
              backgroundColor: "#f8f7fc",
              border: "1px solid #e8e5f0",
              height: 36,
            }}
          />
        </div>

        {/* Tabs */}
        <div className="flex px-4 gap-4" style={{ borderBottom: "1px solid #e8e5f0" }}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="flex items-center gap-1.5 pb-2 text-[13px] relative"
              style={{
                fontWeight: activeTab === tab.id ? 600 : 400,
                color: activeTab === tab.id ? "#1e1b4b" : "#94a3b8",
                borderBottom: activeTab === tab.id ? "2px solid #7c3aed" : "2px solid transparent",
                marginBottom: -1,
              }}
            >
              {tab.label}
              <span
                className="text-[11px] px-1.5 py-0.5 rounded-full font-medium"
                style={{
                  backgroundColor: activeTab === tab.id ? "rgba(124,58,237,0.1)" : "rgba(148,163,184,0.12)",
                  color: activeTab === tab.id ? "#7c3aed" : "#94a3b8",
                }}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Mail List */}
        <div className="flex-1 overflow-y-auto">
          {mails.map((mail, i) => (
            <div
              key={i}
              onClick={() => setSelectedMail(i)}
              className="px-4 py-3 cursor-pointer"
              style={{
                backgroundColor: selectedMail === i ? "rgba(124,58,237,0.06)" : "transparent",
                borderLeft: selectedMail === i ? "3px solid #7c3aed" : "3px solid transparent",
                borderBottom: "1px solid #e8e5f0",
              }}
            >
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  {mail.unread && (
                    <div
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ backgroundColor: "#7c3aed" }}
                    />
                  )}
                  <span
                    className="text-[13px]"
                    style={{
                      fontWeight: mail.unread ? 600 : 400,
                      color: "#1e1b4b",
                    }}
                  >
                    {mail.sender}
                  </span>
                </div>
                <span className="text-[11px] text-text-muted shrink-0">{mail.time}</span>
              </div>
              <div
                className="text-[13px] mb-1 truncate"
                style={{
                  fontWeight: mail.unread ? 600 : 500,
                  color: "#1e1b4b",
                  paddingLeft: mail.unread ? 16 : 0,
                }}
              >
                {mail.subject}
              </div>
              <div
                className="text-[12px] text-text-muted truncate"
                style={{ paddingLeft: mail.unread ? 16 : 0 }}
              >
                {mail.preview}
              </div>
              {mail.tag && (
                <div style={{ paddingLeft: mail.unread ? 16 : 0 }} className="mt-1.5">
                  <span
                    className="text-[11px] font-medium px-2 py-0.5 rounded-full"
                    style={{
                      backgroundColor: getTagBg(mail.tag.color),
                      color: mail.tag.color,
                    }}
                  >
                    {mail.tag.text}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Right Panel - Mail Detail */}
      <div className="flex-1 flex flex-col bg-s1 overflow-y-auto">
        {/* Detail Header */}
        <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: "1px solid #e8e5f0" }}>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: "#1e1b4b" }}>{selected.subject}</h1>
          <div className="flex items-center gap-2">
            {["Antworten", "Weiterleiten", "Archivieren"].map((action) => (
              <button
                key={action}
                className="px-3 text-[12px] rounded-[6px]"
                style={{
                  height: 28,
                  border: "1px solid #e8e5f0",
                  color: "#475569",
                  backgroundColor: "white",
                }}
              >
                {action}
              </button>
            ))}
          </div>
        </div>

        {/* Sender Info */}
        <div className="flex items-start gap-3 px-6 py-4" style={{ borderBottom: "1px solid #e8e5f0" }}>
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-white text-[13px] font-bold shrink-0"
            style={{ backgroundColor: "#7c3aed" }}
          >
            {selected.initials}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-[14px] font-semibold" style={{ color: "#1e1b4b" }}>
                {selected.sender}
              </span>
              {selected.tag && selected.tag.color === "#ef4444" && (
                <span
                  className="text-[11px] font-medium px-2 py-0.5 rounded-full"
                  style={{
                    backgroundColor: "rgba(239,68,68,0.08)",
                    color: "#ef4444",
                  }}
                >
                  {selected.tag.text}
                </span>
              )}
            </div>
            <div className="text-[12px]" style={{ color: "#94a3b8" }}>
              {selected.email} &middot; {selected.timeLabel}
            </div>
          </div>
        </div>

        {/* Email Body */}
        <div className="px-6 py-5 flex-1">
          <div className="text-[14px] leading-relaxed" style={{ color: "#334155" }}>
            <p className="mb-4">Sehr geehrte Staffelleitungen,</p>
            <p className="mb-4">
              aufgrund der kurzfristigen Sperrung der Maschseehalle durch die Stadt Hannover
              (Brandschutzprüfung, voraussichtlich bis 05.04.) müssen zwei Partien des 9. Spieltags
              der Verbandsliga Nord verlegt werden.
            </p>
            <p className="mb-3 font-semibold">Betroffene Spiele:</p>
            <ul className="list-disc pl-5 mb-4 space-y-1.5">
              <li>TSV Hannover – MTV Wolfsburg (urspr. 29.03., 16:00 Uhr, Maschseehalle)</li>
              <li>SC Paderborn – VfR Bielefeld (urspr. 29.03., 18:00 Uhr, Maschseehalle)</li>
            </ul>
            <p className="mb-4">
              Wir bitten die betroffenen Vereine, bis spätestens <strong>Freitag, 28.03.</strong> einen
              Ausweichtermin und eine Ersatzhalle über das DVV-Admin-Portal zu melden. Sollte bis
              dahin keine Rückmeldung erfolgen, wird der Spielausschuss ersatzweise Termine und
              Hallen zuweisen.
            </p>
            <p className="mb-4">
              Alle weiteren Partien des 9. Spieltags finden wie geplant statt. Der aktualisierte
              Spielplan wird nach Bestätigung der Nachholtermine im Portal veröffentlicht.
            </p>
            <p className="mb-1">Mit freundlichen Grüßen</p>
            <p className="font-semibold">NWVV Spielausschuss</p>
          </div>
        </div>

        {/* Divider */}
        <div style={{ borderTop: "1px solid #e8e5f0" }} />

        {/* Reply Box */}
        <div className="px-6 py-4">
          <div
            className="rounded-[10px] p-4"
            style={{ border: "1px solid #e8e5f0", backgroundColor: "white" }}
          >
            <textarea
              placeholder="Antwort verfassen..."
              className="w-full text-[13px] resize-none outline-none mb-3"
              rows={3}
              style={{ color: "#334155" }}
            />
            <div className="flex justify-end">
              <button
                className="px-5 text-white text-[13px] font-medium rounded-[6px]"
                style={{ backgroundColor: "#7c3aed", height: 36 }}
              >
                Senden
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
