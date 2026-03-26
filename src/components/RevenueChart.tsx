"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { monat: "Jan", einnahmen: 4200, ausgaben: 2800 },
  { monat: "Feb", einnahmen: 3800, ausgaben: 3100 },
  { monat: "Mär", einnahmen: 5100, ausgaben: 2900 },
  { monat: "Apr", einnahmen: 4600, ausgaben: 3200 },
  { monat: "Mai", einnahmen: 5400, ausgaben: 3600 },
  { monat: "Jun", einnahmen: 4900, ausgaben: 3400 },
  { monat: "Jul", einnahmen: 3200, ausgaben: 2100 },
  { monat: "Aug", einnahmen: 3600, ausgaben: 2400 },
  { monat: "Sep", einnahmen: 5800, ausgaben: 3800 },
  { monat: "Okt", einnahmen: 6200, ausgaben: 4100 },
  { monat: "Nov", einnahmen: 5500, ausgaben: 3700 },
  { monat: "Dez", einnahmen: 7100, ausgaben: 4500 },
];

export default function RevenueChart() {
  return (
    <div className="bg-card-bg rounded-xl border border-card-border p-6">
      <h3 className="text-lg font-semibold text-foreground mb-1">Finanzen</h3>
      <p className="text-sm text-gray-500 mb-6">Einnahmen vs. Ausgaben (2025)</p>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="monat" tick={{ fontSize: 12 }} stroke="#94a3b8" />
            <YAxis tick={{ fontSize: 12 }} stroke="#94a3b8" tickFormatter={(v) => `${v}€`} />
            <Tooltip
              formatter={(value: any) => `${Number(value).toLocaleString("de-DE")} €`}
              contentStyle={{
                borderRadius: "8px",
                border: "1px solid #e2e8f0",
                boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)",
              }}
            />
            <Bar dataKey="einnahmen" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Einnahmen" />
            <Bar dataKey="ausgaben" fill="#f59e0b" radius={[4, 4, 0, 0]} name="Ausgaben" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
