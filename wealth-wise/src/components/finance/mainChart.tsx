'use client'
import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";
import { Card, CardContent, Typography } from "@mui/material";

import { createClient } from "@/utils/supabase/client";

type RangeKey = '1D' | '5D' | '1M' | '3M' | '6M' | '1Y' | 'ALL'

type Point = { name: string; value: number }

function genSeries(count: number, start: number, step: number, label: (i: number) => string): Point[] {
  const arr: Point[] = []
  for (let i = 0; i < count; i++) {
    arr.push({ name: label(i), value: Math.round(start + i * step) })
  }
  return arr
}



// Static, deterministic datasets per range (no time-based generation)
// Make a hashmap to store the range and their data points, points are stored in an array
// Make dynamic: fetch the data into arrays, depending on granuity
const SERIES: Record<RangeKey, Point[]> = {
  '1D': genSeries(24, 10250, 18, (i) => `H${i + 1}`),
  '5D': genSeries(5, 10100, 95, (i) => `Day ${i + 1}`),
  '1M': genSeries(30, 10000, 22, (i) => `Day ${i + 1}`),
  '3M': genSeries(12, 9800, 60, (i) => `Week ${i + 1}`),
  '6M': genSeries(24, 9500, 55, (i) => `Week ${i + 1}`),
  '1Y': genSeries(12, 9000, 160, (i) => `Month ${i + 1}`),
  'ALL': genSeries(24, 8500, 150, (i) => `Month ${i + 1}`),
}

interface mainChartProps {
  userID: String
}
export default function PortfolioChart(userID : mainChartProps) {
  const [range, setRange] = React.useState<RangeKey>('ALL')
  const chartData = SERIES[range]

  const supabase = createClient()
  const fetchMainGraphData = async (userID: String) => {
    const {data, error} = await supabase
    .from("portfolio_value_timeseries")
    .select('*')
    .eq('user_id', userID)

    if (error) {
      console.log("fetching error")
      return
    }
  }

  return (
    <Card sx={{ bgcolor: "black", color: "white", borderRadius: 3, p: 2 }}>
      <CardContent>
        <Typography variant="h4" gutterBottom>
          $18,355.10
        </Typography>
        <Typography variant="body2" sx={{ color: "limegreen" }}>
          +$1,428.17 (+8.43%) all time →
        </Typography>

        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="10%" stopColor="#00FF00" stopOpacity={0.8} />
                <stop offset="90%" stopColor="#00FF00" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="name" hide />
            <YAxis hide />
            <Tooltip
              contentStyle={{ backgroundColor: "#222", border: "none" }}
              labelStyle={{ color: "lime" }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#00FF00"
              fillOpacity={1}
              fill="url(#colorValue)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>

        {/* Range selector */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 12 }}>
          <div style={{ display: 'flex', gap: 6, padding: 6, borderRadius: 9999, border: '1px solid #374151', background: '#1f2937' }}>
            {(['1D','5D','1M','3M','6M','1Y','ALL'] as RangeKey[]).map((key) => {
              const active = range === key
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setRange(key)}
                  aria-pressed={active}
                  style={{
                    padding: '6px 12px',
                    fontSize: 12,
                    fontWeight: 700,
                    borderRadius: 9999,
                    color: active ? '#fff' : '#d1d5db',
                    background: active ? '#374151' : 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  {key}
                </button>
              )
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
