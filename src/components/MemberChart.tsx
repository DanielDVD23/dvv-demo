"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { monat: "Jan", mitglieder: 245 },
  { monat: "Feb", mitglieder: 258 },
  { monat: "Mär", mitglieder: 270 },
  { monat: "Apr", mitglieder: 285 },
  { monat: "Mai", mitglieder: 292 },
  { monat: "Jun", mitglieder: 305 },
  { monat: "Jul", mitglieder: 312 },
  { monat: "Aug", mitglieder: 308 },
  { monat: "Sep", mitglieder: 320 },
  { monat: "Okt", mitglieder: 335 },
  { monat: "Nov", mitglieder: 342 },
  { monat: "Dez", mitglieder: 356 },
];

export default function MemberChart() {
  return (
    <div className="bg-card-bg rounded-xl border border-card-border p-6">
      <h3 className="text-lg font-semibold text-foreground mb-1">Mitgliederentwicklung</h3>
      <p className="text-sm text-gray-500 mb-6">Mitgliederzahl pro Monat (2025)</p>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorMitglieder" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="monat" tick={{ fontSize: 12 }} stroke="#94a3b8" />
            <YAxis tick={{ fontSize: 12 }} stroke="#94a3b8" />
            <Tooltip
              contentStyle={{
                borderRadius: "8px",
                border: "1px solid #e2e8f0",
                boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)",
              }}
            />
            <Area
              type="monotone"
              dataKey="mitglieder"
              stroke="#3b82f6"
              strokeWidth={2}
              fill="url(#colorMitglieder)"
              name="Mitglieder"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
