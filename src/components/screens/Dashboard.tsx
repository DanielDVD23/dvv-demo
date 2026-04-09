"use client";

import { useState, useCallback } from "react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import SectionHeader from "@/components/ui/SectionHeader";
import Icon from "@/components/ui/Icon";
import ComplianceStreak from "@/components/screens/ComplianceStreak";

interface DashboardProps {
  onNavigate: (screen: string) => void;
}

/* ── Graph Node Types ── */
type NodeStatus = "ok" | "pending" | "blocker";

interface GraphNode {
  id: string;
  label: string;
  sublabel: string;
  icon: string;
  status: NodeStatus;
  x: number;
  y: number;
}

interface GraphEdge {
  from: string;
  to: string;
  status: NodeStatus;
  blockerLabel?: string;
  blockerDetail?: string;
  remedy?: { label: string; action: string };
}

/* ── Mock Data ── */
const MATCH_NODE: GraphNode = {
  id: "match",
  label: "Sonntag 14:00",
  sublabel: "vs. Team Rock-Star",
  icon: "volleyball",
  status: "ok",
  x: 400,
  y: 220,
};

const INITIAL_NODES: GraphNode[] = [
  { id: "player-lena", label: "Lena Weber", sublabel: "Zuspielerin · #1", icon: "user", status: "ok", x: 120, y: 80 },
  { id: "player-max", label: "Max Berger", sublabel: "Außenangreifer · #8", icon: "user", status: "blocker", x: 120, y: 220 },
  { id: "player-sarah", label: "Sarah Braun", sublabel: "Mittelblockerin · #5", icon: "user", status: "ok", x: 120, y: 360 },
  { id: "referee", label: "Thomas Klein", sublabel: "Schiedsrichter", icon: "whistle", status: "pending", x: 680, y: 80 },
  { id: "venue", label: "Sporthalle Am Maschsee", sublabel: "Spielstätte bestätigt", icon: "map-pin", status: "ok", x: 680, y: 360 },
];

const INITIAL_EDGES: GraphEdge[] = [
  { from: "player-lena", to: "match", status: "ok" },
  {
    from: "player-max",
    to: "match",
    status: "blocker",
    blockerLabel: "Lizenz abgelaufen",
    blockerDetail: "Wenn Max spielt, droht dem Verein 200\u20AC Strafe und Punktabzug.",
    remedy: { label: "KI-generierte WhatsApp-Erinnerung an Max senden", action: "send-reminder" },
  },
  { from: "player-sarah", to: "match", status: "ok" },
  {
    from: "match",
    to: "referee",
    status: "pending",
    blockerLabel: "Best\u00E4tigung ausstehend",
    blockerDetail: "Der Schiedsrichter ist zugewiesen, hat aber noch nicht best\u00E4tigt.",
    remedy: { label: "Erinnerung an Schiedsrichter senden", action: "send-ref-reminder" },
  },
  { from: "match", to: "venue", status: "ok" },
];

/* ── Connector SVG helpers ── */
function getEdgePath(from: GraphNode, to: GraphNode): string {
  const fx = from.x + 80;
  const fy = from.y + 30;
  const tx = to.x;
  const ty = to.y + 30;
  const mx = (fx + tx) / 2;
  return `M ${fx} ${fy} C ${mx} ${fy}, ${mx} ${ty}, ${tx} ${ty}`;
}

function EdgeLine({
  edge,
  nodes,
  onHover,
  onClick,
}: {
  edge: GraphEdge;
  nodes: GraphNode[];
  onHover: (e: GraphEdge | null, pos?: { x: number; y: number }) => void;
  onClick: (e: GraphEdge) => void;
}) {
  const from = nodes.find((n) => n.id === edge.from) || MATCH_NODE;
  const to = nodes.find((n) => n.id === edge.to) || MATCH_NODE;
  const fromNode = edge.from === "match" ? MATCH_NODE : from;
  const toNode = edge.to === "match" ? MATCH_NODE : to;
  const path = getEdgePath(fromNode, toNode);

  const strokeColor =
    edge.status === "ok" ? "#16a34a" : edge.status === "blocker" ? "#ff2d55" : "#94a3b8";
  const strokeDash = edge.status === "pending" ? "6 4" : "none";
  const strokeWidth = edge.status === "blocker" ? 3 : 2;

  return (
    <g>
      {/* Invisible wider path for easier hover/click */}
      <path
        d={path}
        fill="none"
        stroke="transparent"
        strokeWidth={20}
        className="cursor-pointer"
        onMouseEnter={(ev) => onHover(edge, { x: ev.clientX, y: ev.clientY })}
        onMouseLeave={() => onHover(null)}
        onClick={() => onClick(edge)}
      />
      <path
        d={path}
        fill="none"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeDasharray={strokeDash}
        strokeLinecap="round"
        className={`pointer-events-none transition-all ${edge.status === "pending" ? "animate-dash" : ""}`}
        style={edge.status === "blocker" ? { filter: "drop-shadow(0 0 6px rgba(255,45,85,0.4))" } : undefined}
      />
      {/* Blocker icon on red edges */}
      {edge.status === "blocker" && (
        <g>
          <circle
            cx={(fromNode.x + 80 + (edge.to === "match" ? MATCH_NODE.x : toNode.x)) / 2}
            cy={(fromNode.y + 30 + (edge.to === "match" ? MATCH_NODE.y : toNode.y) + 30) / 2}
            r={12}
            fill="#ff2d55"
            className="animate-pulse-glow"
          />
          <text
            x={(fromNode.x + 80 + (edge.to === "match" ? MATCH_NODE.x : toNode.x)) / 2}
            y={(fromNode.y + 30 + (edge.to === "match" ? MATCH_NODE.y : toNode.y) + 30) / 2 + 4}
            textAnchor="middle"
            fill="white"
            fontSize={14}
            fontWeight="bold"
          >
            !
          </text>
        </g>
      )}
    </g>
  );
}

/* ── Graph Node Component ── */
function GraphNodeCard({ node, onClick }: { node: GraphNode; onClick?: () => void }) {
  const borderColor =
    node.status === "ok"
      ? "border-green"
      : node.status === "blocker"
        ? "border-[#ff2d55]"
        : "border-[#94a3b8]";
  const bgColor =
    node.status === "ok"
      ? "bg-green-dim"
      : node.status === "blocker"
        ? "bg-[rgba(255,45,85,0.08)]"
        : "bg-s2";
  const glowClass = node.status === "blocker" ? "animate-pulse-glow" : "";

  return (
    <div
      className={`absolute w-[160px] rounded-[12px] border-2 ${borderColor} ${bgColor} ${glowClass} p-3 cursor-pointer transition-all hover:scale-105 hover:shadow-lg`}
      style={{ left: node.x, top: node.y }}
      onClick={onClick}
    >
      <div className="flex items-center gap-2 mb-1">
        <Icon
          name={node.icon}
          size={16}
          className={
            node.status === "ok"
              ? "text-green"
              : node.status === "blocker"
                ? "text-[#ff2d55]"
                : "text-text-muted"
          }
        />
        <span className="text-[12px] font-bold truncate">{node.label}</span>
      </div>
      <div className="text-[10px] text-text-muted truncate">{node.sublabel}</div>
      {node.status === "ok" && (
        <div className="mt-1.5">
          <Badge color="green">Validiert</Badge>
        </div>
      )}
      {node.status === "blocker" && (
        <div className="mt-1.5">
          <Badge color="red">Blocker</Badge>
        </div>
      )}
      {node.status === "pending" && (
        <div className="mt-1.5">
          <Badge color="gray">Ausstehend</Badge>
        </div>
      )}
    </div>
  );
}

/* ── Match Center Node ── */
function MatchCenterNode({ node, blockerCount }: { node: GraphNode; blockerCount: number }) {
  return (
    <div
      className="absolute w-[180px] rounded-[16px] border-2 border-accent bg-gradient-to-br from-accent-dim to-s1 p-4 text-center shadow-md"
      style={{ left: node.x, top: node.y }}
    >
      <div className="w-10 h-10 rounded-full bg-accent mx-auto mb-2 flex items-center justify-center">
        <Icon name="volleyball" size={20} className="text-white" />
      </div>
      <div className="text-[13px] font-bold">{node.label}</div>
      <div className="text-[11px] text-text-muted mb-2">{node.sublabel}</div>
      {blockerCount > 0 ? (
        <Badge color="red">{blockerCount} Blocker</Badge>
      ) : (
        <Badge color="green">Spielbereit</Badge>
      )}
    </div>
  );
}

/* ── Remedy Drawer ── */
function RemedyDrawer({
  edge,
  onClose,
  onResolve,
}: {
  edge: GraphEdge;
  onClose: () => void;
  onResolve: (edgeFrom: string) => void;
}) {
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSend = () => {
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSent(true);
      setTimeout(() => onResolve(edge.from), 1200);
    }, 1500);
  };

  return (
    <div className="fixed top-0 right-0 h-full w-[400px] max-w-[90vw] bg-s1 border-l border-border shadow-2xl z-[500] animate-slideInRight flex flex-col">
      <div className="flex items-center justify-between p-5 border-b border-border">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[rgba(255,45,85,0.1)] flex items-center justify-center">
            <Icon name="alert" size={16} className="text-[#ff2d55]" />
          </div>
          <div>
            <div className="text-[14px] font-bold">Blocker beheben</div>
            <div className="text-[11px] text-text-muted">One-Click Fix</div>
          </div>
        </div>
        <button
          onClick={onClose}
          className="w-7 h-7 rounded-[6px] bg-s2 border border-border flex items-center justify-center cursor-pointer hover:bg-s3 transition-colors"
        >
          <Icon name="x" size={14} className="text-text-muted" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-5">
        {/* Blocker info */}
        <div className="bg-[rgba(255,45,85,0.06)] border border-[rgba(255,45,85,0.2)] rounded-[10px] p-4 mb-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-[#ff2d55]" />
            <span className="text-[13px] font-bold text-[#ff2d55]">{edge.blockerLabel}</span>
          </div>
          <p className="text-[12px] text-text-dim leading-relaxed">{edge.blockerDetail}</p>
        </div>

        {/* Consequence */}
        <div className="mb-4">
          <div className="text-[11px] font-bold text-text-muted uppercase tracking-wider mb-2">Konsequenz</div>
          <div className="bg-s2 border border-border rounded-[10px] p-3">
            <div className="flex items-start gap-2">
              <Icon name="alert" size={14} className="text-orange mt-0.5" />
              <div className="text-[12px] text-text-dim leading-relaxed">
                Regelversto\u00DF gem\u00E4\u00DF BSO \u00A714.2 \u2013 Einsatz ohne g\u00FCltige Lizenz kann zu Geldstrafe und Punktabzug f\u00FChren.
              </div>
            </div>
          </div>
        </div>

        {/* Tooltip-style rule explanation */}
        <div className="bg-accent-dim border border-accent/20 rounded-[10px] p-3 mb-4">
          <div className="flex items-start gap-2">
            <Icon name="info" size={14} className="text-accent mt-0.5" />
            <div className="text-[12px] text-text-dim leading-relaxed">
              <strong>Regel 14.2:</strong> Dieser Spieler braucht eine g\u00FCltige Lizenz. Die alte Lizenz ist am 01.04.2026 abgelaufen.
            </div>
          </div>
        </div>

        {/* Remedy action */}
        <div className="text-[11px] font-bold text-text-muted uppercase tracking-wider mb-2">Sofortl\u00F6sung</div>
        <div className="bg-s1 border border-border rounded-[10px] p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-green-dim flex items-center justify-center shrink-0">
              <Icon name="send" size={18} className="text-green" />
            </div>
            <div>
              <div className="text-[13px] font-bold">{edge.remedy?.label}</div>
              <div className="text-[11px] text-text-muted">Automatisch generierte Nachricht</div>
            </div>
          </div>

          {sent ? (
            <div className="bg-green-dim border border-[rgba(22,163,74,0.2)] rounded-[8px] p-3 flex items-center gap-2 animate-fadeIn">
              <Icon name="check" size={16} className="text-green" />
              <span className="text-[13px] font-semibold text-green">Nachricht gesendet! Blocker wird aufgel\u00F6st...</span>
            </div>
          ) : (
            <Button className="w-full" onClick={handleSend} disabled={sending}>
              {sending ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Wird gesendet...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Icon name="send" size={14} className="text-white" /> Jetzt senden
                </span>
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Clean State (All Green) ── */
function CleanState({ matchCount }: { matchCount: number }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 animate-shield">
      <div className="w-24 h-24 rounded-full bg-green-dim border-2 border-green flex items-center justify-center mb-4">
        <Icon name="shield-check" size={44} className="text-green" />
      </div>
      <div className="text-[20px] font-bold mb-1">Alles bereit!</div>
      <div className="text-[13px] text-text-muted mb-3">Keine offenen Blocker f\u00FCr diesen Spieltag</div>
      <div className="flex items-center gap-2">
        <Badge color="green">{matchCount} Matches Protected</Badge>
        <Badge color="green">0 Blocker</Badge>
      </div>
    </div>
  );
}

/* ── Edge Tooltip ── */
function EdgeTooltip({ edge, pos }: { edge: GraphEdge; pos: { x: number; y: number } }) {
  if (!edge.blockerDetail) return null;
  return (
    <div
      className="fixed z-[600] bg-[#1e1b4b] text-white rounded-[10px] p-3 max-w-[280px] shadow-xl pointer-events-none animate-fadeIn"
      style={{ left: pos.x + 12, top: pos.y - 10 }}
    >
      <div className="text-[12px] font-semibold mb-1">{edge.blockerLabel}</div>
      <div className="text-[11px] text-white/80 leading-relaxed">{edge.blockerDetail}</div>
    </div>
  );
}

/* ── Main Dashboard ── */
export default function Dashboard({ onNavigate }: DashboardProps) {
  const [nodes, setNodes] = useState(INITIAL_NODES);
  const [edges, setEdges] = useState(INITIAL_EDGES);
  const [hoveredEdge, setHoveredEdge] = useState<GraphEdge | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const [drawerEdge, setDrawerEdge] = useState<GraphEdge | null>(null);

  const blockerCount = edges.filter((e) => e.status === "blocker").length;
  const pendingCount = edges.filter((e) => e.status === "pending").length;
  const allClear = blockerCount === 0 && pendingCount === 0;

  const handleEdgeHover = useCallback((e: GraphEdge | null, pos?: { x: number; y: number }) => {
    setHoveredEdge(e);
    if (pos) setTooltipPos(pos);
  }, []);

  const handleEdgeClick = useCallback((e: GraphEdge) => {
    if (e.status === "blocker" || e.status === "pending") {
      setDrawerEdge(e);
    }
  }, []);

  const handleResolve = useCallback(
    (fromId: string) => {
      setEdges((prev) => prev.map((e) => (e.from === fromId ? { ...e, status: "ok" as NodeStatus } : e)));
      setNodes((prev) =>
        prev.map((n) => (n.id === fromId ? { ...n, status: "ok" as NodeStatus } : n))
      );
      setDrawerEdge(null);
    },
    []
  );

  return (
    <div className="animate-fadeIn">
      {/* Header */}
      <div className="flex justify-between items-start mb-5 flex-wrap gap-3">
        <div>
          <h1 className="text-[22px] font-bold mb-1">Bereit f\u00FCr den Anpfiff?</h1>
          <p className="text-[13px] text-text-muted">
            Staffelleiter \u00B7 NWVV Volleyball \u00B7 Saison 2025/26
          </p>
        </div>
        <div className="flex items-center gap-3">
          {/* Status summary pills */}
          {blockerCount > 0 && (
            <div className="flex items-center gap-1.5 bg-[rgba(255,45,85,0.08)] border border-[rgba(255,45,85,0.2)] rounded-full px-3 py-1.5">
              <span className="w-2 h-2 rounded-full bg-[#ff2d55] animate-pulse" />
              <span className="text-[12px] font-semibold text-[#ff2d55]">{blockerCount} Critical</span>
            </div>
          )}
          {pendingCount > 0 && (
            <div className="flex items-center gap-1.5 bg-[rgba(148,163,184,0.1)] border border-[rgba(148,163,184,0.2)] rounded-full px-3 py-1.5">
              <span className="w-2 h-2 rounded-full bg-[#94a3b8]" />
              <span className="text-[12px] font-semibold text-text-muted">{pendingCount} Ausstehend</span>
            </div>
          )}
          {allClear && (
            <div className="flex items-center gap-1.5 bg-green-dim border border-[rgba(22,163,74,0.2)] rounded-full px-3 py-1.5">
              <Icon name="shield-check" size={14} className="text-green" />
              <span className="text-[12px] font-semibold text-green">Alles bereit</span>
            </div>
          )}
        </div>
      </div>

      {/* Compliance Streak Widget */}
      <ComplianceStreak />

      {/* Operational Graph */}
      <SectionHeader
        title="Operational Graph \u2013 N\u00E4chstes Match"
        right={
          <div className="flex items-center gap-3 text-[11px]">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-0.5 bg-green inline-block rounded" /> Validiert
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-0.5 bg-[#94a3b8] inline-block rounded border-dashed" style={{ borderTop: "2px dashed #94a3b8", height: 0 }} /> Ausstehend
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-0.5 bg-[#ff2d55] inline-block rounded" /> Blocker
            </span>
          </div>
        }
        className="mt-4"
      />

      {allClear ? (
        <CleanState matchCount={12} />
      ) : (
        <div className="bg-s1 border border-border rounded-[14px] p-4 relative overflow-hidden" style={{ minHeight: 460 }}>
          {/* SVG Connectors */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ zIndex: 1 }}
          >
            {edges.map((edge, i) => (
              <EdgeLine
                key={i}
                edge={edge}
                nodes={[...nodes, MATCH_NODE]}
                onHover={handleEdgeHover}
                onClick={handleEdgeClick}
              />
            ))}
          </svg>

          {/* Nodes */}
          <div className="relative" style={{ zIndex: 2, height: 440 }}>
            {/* Secondary Nodes */}
            {nodes.map((node) => (
              <GraphNodeCard key={node.id} node={node} onClick={() => {
                const edge = edges.find(e => e.from === node.id || e.to === node.id);
                if (edge && edge.status !== "ok") handleEdgeClick(edge);
              }} />
            ))}

            {/* Center Match Node */}
            <MatchCenterNode node={MATCH_NODE} blockerCount={blockerCount} />
          </div>

          {/* Edge Tooltip */}
          {hoveredEdge && hoveredEdge.blockerDetail && (
            <EdgeTooltip edge={hoveredEdge} pos={tooltipPos} />
          )}
        </div>
      )}

      {/* Drawer */}
      {drawerEdge && (
        <>
          <div className="fixed inset-0 bg-black/30 z-[499]" onClick={() => setDrawerEdge(null)} />
          <RemedyDrawer edge={drawerEdge} onClose={() => setDrawerEdge(null)} onResolve={handleResolve} />
        </>
      )}
    </div>
  );
}
