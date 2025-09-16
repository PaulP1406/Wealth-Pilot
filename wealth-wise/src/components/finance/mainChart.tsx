'use client'
import React from "react";
import { XAxis, YAxis, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";
import { Card, CardContent, Typography } from "@mui/material";

import { createClient } from "@/utils/supabase/client";

type RangeKey = '1D' | '5D' | '1M' | '3M' | '6M' | '1Y' | 'ALL'
type PvtsRow = { ts: string; total_value: number; granularity: '1h' | '1d' };

type Point = { name: string; value: number }
interface mainChartProps {
  userID: string
}

export default function PortfolioChart(props: mainChartProps) {
  const [range, setRange] = React.useState<RangeKey>('ALL')
  const supabase = createClient()

  // Per-range series (state so they persist across renders)
  const [oneDay, setOneDay] = React.useState<Point[]>([])
  const [fiveDay, setFiveDay] = React.useState<Point[]>([])
  const [oneMonth, setOneMonth] = React.useState<Point[]>([])
  const [threeMonth, setThreeMonth] = React.useState<Point[]>([])
  const [sixMonth, setSixMonth] = React.useState<Point[]>([])
  const [oneYear, setOneYear] = React.useState<Point[]>([])
  const [allTime, setAllTime] = React.useState<Point[]>([])

  const toPoint = (r: PvtsRow): Point => {
    const d = new Date(r.ts)
    const name = r.granularity === '1h'
      ? d.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })
      : d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
    return { name, value: Number(r.total_value) }
  }

  const fetchMainGraphData = async (userId: string) => {
    const { data: mainGraphData, error } = await supabase
      .from('portfolio_value_timeseries')
      .select('ts,total_value,granularity')
      .eq('user_id', userId)
      .in('granularity', ['1h','1d'])
      .order('ts', { ascending: true })

    if (error) {
      console.error('fetching error', error)
      return
    }

    const rows = (Array.isArray(mainGraphData) ? mainGraphData : []) as PvtsRow[]
    rows.sort((a, b) => new Date(a.ts).getTime() - new Date(b.ts).getTime())

    const now = Date.now()
    const day = 24 * 60 * 60 * 1000
    const cutoff1D  = now - 1 * day
    const cutoff5D  = now - 5 * day
    const cutoff1M  = now - 30 * day
    const cutoff3M  = now - 90 * day
    const cutoff6M  = now - 180 * day
    const cutoff1Y  = now - 365 * day

    const oneDayArr: Point[] = []
    const fiveDayArr: Point[] = []
    const oneMonthArr: Point[] = []
    const threeMonthArr: Point[] = []
    const sixMonthArr: Point[] = []
    const oneYearArr: Point[] = []
    const allTimeArr: Point[] = []

    for (const r of rows) {
      const t = new Date(r.ts).getTime()
      const p = toPoint(r)
      allTimeArr.push(p)
      if (r.granularity === '1h') {
        if (t >= cutoff1D) oneDayArr.push(p)
        if (t >= cutoff5D) fiveDayArr.push(p)
      } else {
        if (t >= cutoff1M) oneMonthArr.push(p)
        if (t >= cutoff3M) threeMonthArr.push(p)
        if (t >= cutoff6M) sixMonthArr.push(p)
        if (t >= cutoff1Y) oneYearArr.push(p)
      }
    }

    setOneDay(oneDayArr)
    setFiveDay(fiveDayArr)
    setOneMonth(oneMonthArr)
    setThreeMonth(threeMonthArr)
    setSixMonth(sixMonthArr)
    setOneYear(oneYearArr)
    setAllTime(allTimeArr)
  }

  React.useEffect(() => {
    if (!props.userID) return
    fetchMainGraphData(props.userID)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.userID])

  // Choose data for current range; no default data
  const chartData: Point[] = React.useMemo(() => {
    let selected: Point[]
    switch (range) {
      case '1D': selected = oneDay; break
      case '5D': selected = fiveDay; break
      case '1M': selected = oneMonth; break
      case '3M': selected = threeMonth; break
      case '6M': selected = sixMonth; break
      case '1Y': selected = oneYear; break
      case 'ALL':
      default:   selected = allTime; break
    }
    return selected
  }, [range, oneDay, fiveDay, oneMonth, threeMonth, sixMonth, oneYear, allTime])

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
