"use client";

import { Fragment, useState } from "react";
import Badge from "@/components/ui/Badge";
import SectionHeader from "@/components/ui/SectionHeader";
import Icon from "@/components/ui/Icon";
import ClubLogo from "@/components/ui/ClubLogo";

const tabs = ["Sanktionen", "Aufschlag", "Spieler-Statistik", "Satz-Statistik"];

const sanktionenData = [
  { team: "TSV Hannover", verwarnung: 5, bestrafung: 2, hinausstellung: 1, disqualifikation: 0, gesamt: 8, players: [{ name: "M. Schmidt", verwarnung: 2, bestrafung: 1, hinausstellung: 1 }, { name: "T. Weber", verwarnung: 1, bestrafung: 1, hinausstellung: 0 }, { name: "K. Braun", verwarnung: 2, bestrafung: 0, hinausstellung: 0 }] },
  { team: "SVC Göttingen", verwarnung: 8, bestrafung: 3, hinausstellung: 2, disqualifikation: 1, gesamt: 14, players: [{ name: "J. Fischer", verwarnung: 3, bestrafung: 1, hinausstellung: 1 }, { name: "L. Meyer", verwarnung: 3, bestrafung: 1, hinausstellung: 1 }, { name: "P. Schulz", verwarnung: 2, bestrafung: 1, hinausstellung: 0 }] },
  { team: "MTV Wolfsburg", verwarnung: 3, bestrafung: 1, hinausstellung: 0, disqualifikation: 0, gesamt: 4, players: [{ name: "A. Koch", verwarnung: 2, bestrafung: 0, hinausstellung: 0 }, { name: "S. Bauer", verwarnung: 1, bestrafung: 1, hinausstellung: 0 }] },
  { team: "SC Paderborn", verwarnung: 6, bestrafung: 2, hinausstellung: 1, disqualifikation: 0, gesamt: 9, players: [{ name: "D. Richter", verwarnung: 2, bestrafung: 1, hinausstellung: 1 }, { name: "N. Hartmann", verwarnung: 2, bestrafung: 1, hinausstellung: 0 }, { name: "F. Klein", verwarnung: 2, bestrafung: 0, hinausstellung: 0 }] },
  { team: "TV Hildesheim", verwarnung: 4, bestrafung: 0, hinausstellung: 0, disqualifikation: 0, gesamt: 4, players: [{ name: "R. Wagner", verwarnung: 2, bestrafung: 0, hinausstellung: 0 }, { name: "C. Becker", verwarnung: 2, bestrafung: 0, hinausstellung: 0 }] },
];

const aufschlagData = [
  { team: "TSV Hannover", asse: 42, fehler: 28, quote: "60%", pktProSatz: "1.8" },
  { team: "SVC Göttingen", asse: 38, fehler: 31, quote: "55%", pktProSatz: "1.5" },
  { team: "MTV Wolfsburg", asse: 29, fehler: 22, quote: "57%", pktProSatz: "1.3" },
  { team: "SC Paderborn", asse: 35, fehler: 26, quote: "57%", pktProSatz: "1.4" },
  { team: "TV Hildesheim", asse: 22, fehler: 30, quote: "42%", pktProSatz: "0.9" },
  { team: "VfR Bielefeld", asse: 26, fehler: 24, quote: "52%", pktProSatz: "1.1" },
];

const spielerStats = [
  { rang: 1, name: "M. Schmidt", team: "TSV Hannover", punkte: 186, spiele: 8, avg: "23.3" },
  { rang: 2, name: "J. Fischer", team: "SVC Göttingen", punkte: 174, spiele: 8, avg: "21.8" },
  { rang: 3, name: "A. Koch", team: "MTV Wolfsburg", punkte: 162, spiele: 7, avg: "23.1" },
  { rang: 4, name: "D. Richter", team: "SC Paderborn", punkte: 155, spiele: 8, avg: "19.4" },
  { rang: 5, name: "L. Meyer", team: "SVC Göttingen", punkte: 148, spiele: 8, avg: "18.5" },
  { rang: 6, name: "T. Weber", team: "TSV Hannover", punkte: 141, spiele: 7, avg: "20.1" },
  { rang: 7, name: "S. Bauer", team: "MTV Wolfsburg", punkte: 134, spiele: 8, avg: "16.8" },
  { rang: 8, name: "R. Wagner", team: "TV Hildesheim", punkte: 128, spiele: 8, avg: "16.0" },
];

const satzStats = [
  { team: "TSV Hannover", gewonnen: 22, verloren: 8, quote: "2.75", punkte: 21 },
  { team: "SVC Göttingen", gewonnen: 20, verloren: 10, quote: "2.00", punkte: 18 },
  { team: "SC Paderborn", gewonnen: 17, verloren: 13, quote: "1.31", punkte: 15 },
  { team: "MTV Wolfsburg", gewonnen: 15, verloren: 14, quote: "1.07", punkte: 13 },
  { team: "TV Hildesheim", gewonnen: 12, verloren: 16, quote: "0.75", punkte: 10 },
  { team: "VfR Bielefeld", gewonnen: 10, verloren: 19, quote: "0.53", punkte: 7 },
  { team: "SG Münster", gewonnen: 8, verloren: 21, quote: "0.38", punkte: 4 },
];

export default function Statistik() {
  const [activeTab, setActiveTab] = useState(0);
  const [liga, setLiga] = useState("Verbandsliga Nord Herren");
  const [expandedTeam, setExpandedTeam] = useState<number | null>(null);

  return (
    <div className="animate-fadeIn">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-[22px] font-bold mb-1">Statistiken</h1>
          <p className="text-[13px] text-text-muted">Sanktionen, Aufschlag & Spieler-Statistiken auf Liga- und Teamebene</p>
        </div>
        <select className="!w-[260px] text-xs" value={liga} onChange={(e) => setLiga(e.target.value)}>
          <option>Verbandsliga Nord Herren</option>
          <option>Verbandsliga Nord Damen</option>
          <option>Bezirksliga Damen Staffel 1</option>
          <option>Kreisliga Hannover Herren</option>
        </select>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-s1 border border-border rounded-[10px] p-1 mb-5">
        {tabs.map((tab, i) => (
          <button
            key={tab}
            className={`flex-1 py-2 px-3 rounded-[8px] text-xs font-semibold cursor-pointer transition-all ${
              activeTab === i ? "bg-accent text-white" : "text-text-muted hover:bg-s2 hover:text-text"
            }`}
            onClick={() => setActiveTab(i)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Sanktionen Tab */}
      {activeTab === 0 && (
        <div>
          <SectionHeader title="Sanktionen-Statistik" right={<Badge color="gray">{liga}</Badge>} />
          <div className="flex gap-3 mb-4">
            <div className="bg-s1 border border-border rounded-[10px] px-4 py-3 flex items-center gap-2">
              <div className="w-5 h-7 rounded-sm bg-[#facc15]" />
              <div>
                <div className="text-[18px] font-bold">{sanktionenData.reduce((s, t) => s + t.verwarnung, 0)}</div>
                <div className="text-[10px] text-text-muted">Verwarnungen</div>
              </div>
            </div>
            <div className="bg-s1 border border-border rounded-[10px] px-4 py-3 flex items-center gap-2">
              <div className="w-5 h-7 rounded-sm bg-red" />
              <div>
                <div className="text-[18px] font-bold">{sanktionenData.reduce((s, t) => s + t.bestrafung, 0)}</div>
                <div className="text-[10px] text-text-muted">Bestrafungen</div>
              </div>
            </div>
            <div className="bg-s1 border border-border rounded-[10px] px-4 py-3 flex items-center gap-2">
              <div className="w-5 h-7 rounded-sm bg-[#dc2626]" />
              <div>
                <div className="text-[18px] font-bold">{sanktionenData.reduce((s, t) => s + t.hinausstellung, 0)}</div>
                <div className="text-[10px] text-text-muted">Hinausstellungen</div>
              </div>
            </div>
            <div className="bg-s1 border border-border rounded-[10px] px-4 py-3 flex items-center gap-2">
              <div className="w-5 h-7 rounded-sm bg-[#991b1b]" />
              <div>
                <div className="text-[18px] font-bold">{sanktionenData.reduce((s, t) => s + t.disqualifikation, 0)}</div>
                <div className="text-[10px] text-text-muted">Disqualifikationen</div>
              </div>
            </div>
          </div>
          <div className="bg-s1 border border-border rounded-[10px] overflow-hidden">
            <table className="w-full border-collapse text-[13px]">
              <thead>
                <tr>
                  {["Team", "Verwarnung", "Bestrafung", "Hinausstellung", "Disqualifikation", "Gesamt", ""].map((h) => (
                    <th key={h} className="text-[11px] font-semibold text-text-muted uppercase tracking-wide px-3.5 py-2.5 text-left border-b border-border">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sanktionenData.map((t, i) => (
                  <Fragment key={i}>
                    <tr className="hover:bg-s2 cursor-pointer" onClick={() => setExpandedTeam(expandedTeam === i ? null : i)}>
                      <td className="px-3.5 py-3 border-b border-border font-semibold"><span className="flex items-center gap-2"><ClubLogo name={t.team} size={22} />{t.team}</span></td>
                      <td className="px-3.5 py-3 border-b border-border">
                        <span className="inline-flex items-center gap-1"><span className="w-3 h-4 rounded-sm bg-[#facc15] inline-block" /> {t.verwarnung}</span>
                      </td>
                      <td className="px-3.5 py-3 border-b border-border">
                        <span className="inline-flex items-center gap-1"><span className="w-3 h-4 rounded-sm bg-red inline-block" /> {t.bestrafung}</span>
                      </td>
                      <td className="px-3.5 py-3 border-b border-border">
                        <span className="inline-flex items-center gap-1"><span className="w-3 h-4 rounded-sm bg-[#dc2626] inline-block" /> {t.hinausstellung}</span>
                      </td>
                      <td className="px-3.5 py-3 border-b border-border">
                        <span className="inline-flex items-center gap-1"><span className="w-3 h-4 rounded-sm bg-[#991b1b] inline-block" /> {t.disqualifikation}</span>
                      </td>
                      <td className="px-3.5 py-3 border-b border-border font-bold">{t.gesamt}</td>
                      <td className="px-3.5 py-3 border-b border-border text-text-muted text-xs">{expandedTeam === i ? "Zuklappen" : "Details"}</td>
                    </tr>
                    {expandedTeam === i && t.players.map((p, j) => (
                      <tr key={`${i}-${j}`} className="bg-s2">
                        <td className="px-3.5 py-2 border-b border-border text-xs pl-8 text-text-dim">{p.name}</td>
                        <td className="px-3.5 py-2 border-b border-border text-xs">{p.verwarnung}</td>
                        <td className="px-3.5 py-2 border-b border-border text-xs">{p.bestrafung}</td>
                        <td className="px-3.5 py-2 border-b border-border text-xs">{p.hinausstellung}</td>
                        <td className="px-3.5 py-2 border-b border-border" />
                        <td className="px-3.5 py-2 border-b border-border text-xs">{p.verwarnung + p.bestrafung + p.hinausstellung}</td>
                        <td className="px-3.5 py-2 border-b border-border" />
                      </tr>
                    ))}
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Aufschlag Tab */}
      {activeTab === 1 && (
        <div>
          <SectionHeader title="Aufschlag-Statistik" right={<Badge color="gray">{liga}</Badge>} />
          <div className="bg-s1 border border-border rounded-[10px] overflow-hidden">
            <table className="w-full border-collapse text-[13px]">
              <thead>
                <tr>
                  {["Team", "Asse", "Fehler", "Ass-Quote", "Pkt/Satz"].map((h) => (
                    <th key={h} className="text-[11px] font-semibold text-text-muted uppercase tracking-wide px-3.5 py-2.5 text-left border-b border-border">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {aufschlagData.sort((a, b) => b.asse - a.asse).map((t, i) => (
                  <tr key={i} className="hover:bg-s2">
                    <td className="px-3.5 py-3 border-b border-border font-semibold"><span className="flex items-center gap-2"><ClubLogo name={t.team} size={22} />{t.team}</span></td>
                    <td className="px-3.5 py-3 border-b border-border text-green font-semibold">{t.asse}</td>
                    <td className="px-3.5 py-3 border-b border-border text-red font-semibold">{t.fehler}</td>
                    <td className="px-3.5 py-3 border-b border-border font-bold">{t.quote}</td>
                    <td className="px-3.5 py-3 border-b border-border font-bold text-accent">{t.pktProSatz}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Spieler-Statistik Tab */}
      {activeTab === 2 && (
        <div>
          <SectionHeader title="Top-Scorer" right={<Badge color="gray">{liga}</Badge>} />
          <div className="bg-s1 border border-border rounded-[10px] overflow-hidden">
            <table className="w-full border-collapse text-[13px]">
              <thead>
                <tr>
                  {["#", "Spieler", "Team", "Punkte", "Spiele", "Schnitt"].map((h) => (
                    <th key={h} className="text-[11px] font-semibold text-text-muted uppercase tracking-wide px-3.5 py-2.5 text-left border-b border-border">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {spielerStats.map((p, i) => (
                  <tr key={i} className={`hover:bg-s2 ${i < 3 ? "font-semibold" : ""}`}>
                    <td className="px-3.5 py-3 border-b border-border">
                      <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-[11px] font-bold ${
                        i === 0 ? "bg-[#facc15]/20 text-[#ca8a04]" : i === 1 ? "bg-text-muted/10 text-text-muted" : i === 2 ? "bg-orange-dim text-orange" : "text-text-muted"
                      }`}>{p.rang}</span>
                    </td>
                    <td className="px-3.5 py-3 border-b border-border font-semibold">{p.name}</td>
                    <td className="px-3.5 py-3 border-b border-border text-text-dim"><span className="flex items-center gap-2"><ClubLogo name={p.team} size={22} />{p.team}</span></td>
                    <td className="px-3.5 py-3 border-b border-border font-bold text-accent">{p.punkte}</td>
                    <td className="px-3.5 py-3 border-b border-border">{p.spiele}</td>
                    <td className="px-3.5 py-3 border-b border-border">{p.avg}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Satz-Statistik Tab */}
      {activeTab === 3 && (
        <div>
          <SectionHeader title="Satz-Quotient" right={<Badge color="gray">{liga}</Badge>} />
          <div className="bg-s1 border border-border rounded-[10px] overflow-hidden">
            <table className="w-full border-collapse text-[13px]">
              <thead>
                <tr>
                  {["#", "Team", "Gewonnen", "Verloren", "Quotient", "Punkte"].map((h) => (
                    <th key={h} className="text-[11px] font-semibold text-text-muted uppercase tracking-wide px-3.5 py-2.5 text-left border-b border-border">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {satzStats.map((t, i) => (
                  <tr key={i} className={`hover:bg-s2 ${i === 0 ? "font-semibold" : ""}`}>
                    <td className="px-3.5 py-3 border-b border-border text-text-muted">{i + 1}</td>
                    <td className="px-3.5 py-3 border-b border-border font-semibold"><span className="flex items-center gap-2"><ClubLogo name={t.team} size={22} />{t.team}</span></td>
                    <td className="px-3.5 py-3 border-b border-border text-green">{t.gewonnen}</td>
                    <td className="px-3.5 py-3 border-b border-border text-red">{t.verloren}</td>
                    <td className="px-3.5 py-3 border-b border-border font-bold">{t.quote}</td>
                    <td className="px-3.5 py-3 border-b border-border font-bold text-accent">{t.punkte}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
