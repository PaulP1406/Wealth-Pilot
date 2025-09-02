"use client"
import * as React from 'react'
import { LineChart } from '@mui/x-charts/LineChart'

// Simple currency formatter (USD)
const fmtUSD = (v: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(v)

// Currency with cents (for headline balance)
const fmtUSD2 = (v: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(v)

// Build daily sample time-series points (last ~400 days) with gentle upward trend and some steps
function buildSampleData() {
  const days = 400
  const msInDay = 24 * 60 * 60 * 1000
  const now = Date.now()
  const x: Date[] = []
  const y: number[] = []
  let value = 10000
  for (let i = days - 1; i >= 0; i--) {
    const t = new Date(now - i * msInDay)
    // simulate drift + small noise
    const drift = 8 + (i % 10 === 0 ? 40 : 0) // occasional small steps
    const noise = (i % 3 === 0 ? 6 : -3)
    value = Math.max(0, value + drift + noise)
    x.push(t)
    y.push(Math.round(value))
  }
  return { x, y }
}

type RangeKey = '1D' | '5D' | '1M' | '3M' | '6M' | '1Y' | 'ALL'

const RANGE_TO_DAYS: Record<Exclude<RangeKey, 'ALL'>, number> = {
  '1D': 1,
  '5D': 5,
  '1M': 30,
  '3M': 90,
  '6M': 180,
  '1Y': 365,
}

export default function BasicLineChart() {
  const { x, y } = React.useMemo(buildSampleData, [])
  const [range, setRange] = React.useState<RangeKey>('ALL')
  const containerRef = React.useRef<HTMLDivElement>(null)
  const [dims, setDims] = React.useState({ width: 0, height: 480 })

  const { xRange, yRange } = React.useMemo(() => {
    if (range === 'ALL') return { xRange: x, yRange: y }
    const days = RANGE_TO_DAYS[range]
    const cutoff = Date.now() - days * 24 * 60 * 60 * 1000
    let startIdx = 0
    for (let i = 0; i < x.length; i++) {
      if (x[i].getTime() >= cutoff) { startIdx = i; break }
    }
    return { xRange: x.slice(startIdx), yRange: y.slice(startIdx) }
  }, [x, y, range])

  const current = React.useMemo(() => (yRange.length ? yRange[yRange.length - 1] : 0), [yRange])

  // Measure container and update chart size
  React.useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const update = () => setDims({ width: el.clientWidth, height: el.clientHeight })
    update()
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(update) : null
    ro?.observe(el)
    window.addEventListener('resize', update)
    return () => {
      ro?.disconnect()
      window.removeEventListener('resize', update)
    }
  }, [])

  return (
    <>
    <div ref={containerRef} className="relative w-full h-[520px] md:h-[600px]">
        {/* Top-left total balance */}
        <div className="absolute left-0 top-0 z-10 px-2 py-1 pointer-events-none">
          <div className="text-3xl font-extrabold text-white tracking-tight">{fmtUSD2(current)}</div>
        </div>

        <LineChart
          width={Math.max(320, dims.width)}
          height={Math.max(320, dims.height)}
          // Time on X axis
          xAxis={[
            {
              data: xRange,
              scaleType: 'time',
              label: 'Time',
              valueFormatter: (d: Date | number): string =>
                d instanceof Date ? d.toLocaleDateString(undefined, { month: 'short', year: '2-digit' }) : String(d),
            },
          ]}
          // Dollars on Y axis
          yAxis={[
            {
              label: 'Portfolio Value (USD)',
              valueFormatter: (v: number | null): string => (v == null ? '' : fmtUSD(Number(v))),
            },
          ]}
          series={[
            {
              data: yRange,
              label: 'Portfolio',
              color: '#16a34a', // green-600
              area: true,
              showMark: false,
              curve: 'monotoneX',
            valueFormatter: (v: number | null): string => (v == null ? '' : fmtUSD(Number(v))),
            },
          ]}
          sx={{
          // Hide axes and grid for a clean, focused price chart look
          '& .MuiChartsAxis-root': { display: 'none' },
          '& .MuiChartsGrid-root': { display: 'none' },
          // Line: brighter green with a subtle glow and rounded joins
          '& .MuiLineElement-root': {
            stroke: '#22c55e', // green-500
            strokeWidth: 2.25,
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
            filter:
              'drop-shadow(0 0 4px rgba(34,197,94,0.8)) drop-shadow(0 0 10px rgba(34,197,94,0.35))',
          },
          // Area fill: soft green fade like portfolio apps
          '& .MuiAreaElement-root': {
            fill: '#22c55e',
            fillOpacity: 0.14,
          },
            }}
      />
      </div>

      {/* Range selector */}
      <div className="mt-4 flex w-full justify-center">
        <div className="flex items-center gap-1 rounded-full border border-gray-700 bg-[#2a2a2a] px-1 py-1 shadow-inner">
          {(['1D','5D','1M','3M','6M','1Y','ALL'] as RangeKey[]).map((key) => {
            const active = range === key
            return (
              <button
                key={key}
                type="button"
                onClick={() => setRange(key)}
                aria-pressed={active}
                className={
                  `px-3 py-1.5 text-sm font-semibold rounded-full transition-colors ` +
                  (active
                    ? 'bg-[#3b3b3b] text-white shadow'
                    : 'text-gray-300 hover:text-white hover:bg-[#343434]')
                }
              >
                {key}
              </button>
            )
          })}
        </div>
      </div>
    </>
  )
}
