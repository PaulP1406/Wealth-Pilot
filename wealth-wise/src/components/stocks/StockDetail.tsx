'use client'
import React, { useEffect, useState } from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

interface StockDetailProps {
  symbol: string;
}

interface Quote {
  symbol: string;
  shortName: string;
  longName?: string;
  regularMarketPrice: number;
  regularMarketChangePercent: number;
  currency: string;
}

interface ChartPoint {
  date: string;
  price: number;
}

export default function StockDetail({ symbol }: StockDetailProps) {
  const [info, setInfo] = useState<Quote | null>(null);
  const [chart, setChart] = useState<ChartPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [watching, setWatching] = useState(false);

  // Fetch stock info
  useEffect(() => {
    async function fetchInfo() {
      setLoading(true);
      try {
        const res = await fetch(`https://query1.finance.yahoo.com/v7/finance/quote?symbols=${symbol}`);
        const data = await res.json();
        const q = data.quoteResponse?.result?.[0];
        if (q) {
          setInfo({
            symbol: q.symbol,
            shortName: q.shortName || q.symbol,
            longName: q.longName,
            regularMarketPrice: q.regularMarketPrice,
            regularMarketChangePercent: q.regularMarketChangePercent,
            currency: q.currency,
          });
        }
      } catch {}
      setLoading(false);
    }
    fetchInfo();
  }, [symbol]);

  // Fetch chart data (6 months)
  useEffect(() => {
    async function fetchChart() {
      try {
        const res = await fetch(`https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?range=6mo&interval=1d`);
        const data = await res.json();
        const timestamps = data.chart?.result?.[0]?.timestamp || [];
        const prices = data.chart?.result?.[0]?.indicators?.quote?.[0]?.close || [];
        const points: ChartPoint[] = timestamps.map((t: number, i: number) => ({
          date: new Date(t * 1000).toLocaleDateString(),
          price: prices[i],
  })).filter((p: ChartPoint) => p.price != null);
        setChart(points);
      } catch {}
    }
    fetchChart();
  }, [symbol]);

  // Watchlist logic
  useEffect(() => {
    const raw = localStorage.getItem("watchlist");
    if (raw) {
      const arr = JSON.parse(raw);
      setWatching(arr.some((i: any) => i.symbol === symbol));
    }
  }, [symbol]);

  function addToWatchlist() {
    const raw = localStorage.getItem("watchlist");
    let arr = raw ? JSON.parse(raw) : [];
    if (!arr.some((i: any) => i.symbol === symbol)) {
      arr.push({ symbol, name: info?.shortName || symbol });
      localStorage.setItem("watchlist", JSON.stringify(arr));
      setWatching(true);
    }
  }

  function removeFromWatchlist() {
    const raw = localStorage.getItem("watchlist");
    let arr = raw ? JSON.parse(raw) : [];
    arr = arr.filter((i: any) => i.symbol !== symbol);
    localStorage.setItem("watchlist", JSON.stringify(arr));
    setWatching(false);
  }

  function importToSimulator() {
    // Placeholder: you can wire this to your simulator logic
    alert(`Imported ${symbol} to simulator!`);
  }

  function buyStock() {
    alert(`Buy ${symbol} (not implemented)`);
  }

  function sellStock() {
    alert(`Sell ${symbol} (not implemented)`);
  }

  return (
    <div style={{ width: '100vw', minHeight: '100vh', background: '#18181b', color: '#fafafa', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', paddingTop: 48, paddingBottom: 48 }}>
      <div style={{ width: '100%', maxWidth: 1100, background: '#18181b', borderRadius: 24, padding: 56, boxShadow: '0 4px 32px #000', color: '#fafafa', margin: '0 auto' }}>
      {loading ? <div style={{ color: '#aaa', textAlign: 'center', fontSize: 28, marginTop: 80 }}>Loading...</div> : (
        <>
          <h2 style={{ fontWeight: 700, fontSize: 44, marginBottom: 16, color: '#fafafa', textAlign: 'center' }}>
            {info?.shortName || symbol} <span style={{ color: '#00FF00', fontWeight: 400, fontSize: 32 }}>{symbol}</span>
          </h2>
          <div style={{ fontSize: 54, fontWeight: 700, marginBottom: 10, color: '#fafafa', textAlign: 'center' }}>
            {info?.regularMarketPrice != null ? `${info.regularMarketPrice} ${info.currency}` : "N/A"}
          </div>
          <div style={{ color: (info?.regularMarketChangePercent ?? 0) > 0 ? "#00FF00" : "#ff5555", fontWeight: 600, fontSize: 32, marginBottom: 32, textAlign: 'center' }}>
            {info?.regularMarketChangePercent != null ? `${info.regularMarketChangePercent.toFixed(2)}%` : ""}
          </div>
          <div style={{ margin: "48px 0", background: '#111', borderRadius: 24, padding: 32, boxShadow: '0 2px 16px #000', width: '100%' }}>
            <ResponsiveContainer width="100%" height={420}>
              <AreaChart data={chart} margin={{ top: 32, right: 48, left: 0, bottom: 0 }} style={{ background: '#111', borderRadius: 24 }}>
                <defs>
                  <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="10%" stopColor="#00FF00" stopOpacity={0.7} />
                    <stop offset="90%" stopColor="#00FF00" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" tick={{ fill: '#aaa', fontSize: 18 }} axisLine={{ stroke: '#333' }} tickLine={false} minTickGap={32} />
                <YAxis tick={{ fill: '#aaa', fontSize: 18 }} axisLine={{ stroke: '#333' }} tickLine={false} width={80} domain={['auto', 'auto']} />
                <Tooltip contentStyle={{ backgroundColor: "#222", border: "none", color: '#fafafa', borderRadius: 12, fontSize: 18 }} labelStyle={{ color: "#00FF00", fontSize: 18 }} itemStyle={{ color: '#fafafa', fontSize: 18 }} />
                <Area type="monotone" dataKey="price" stroke="#00FF00" fillOpacity={1} fill="url(#colorPrice)" strokeWidth={5} dot={false} activeDot={{ r: 8, fill: '#00FF00', stroke: '#fff', strokeWidth: 3 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div style={{ display: "flex", gap: 32, marginBottom: 32, flexWrap: 'wrap', justifyContent: 'center' }}>
            <button onClick={buyStock} style={{ padding: "18px 36px", background: '#00FF00', color: '#18181b', borderRadius: 12, fontWeight: 700, border: 'none', fontSize: 24, cursor: 'pointer' }}>Buy</button>
            <button onClick={sellStock} style={{ padding: "18px 36px", background: '#ff5555', color: '#fafafa', borderRadius: 12, fontWeight: 700, border: 'none', fontSize: 24, cursor: 'pointer' }}>Sell</button>
            <button onClick={importToSimulator} style={{ padding: "18px 36px", background: '#23232a', color: '#fafafa', borderRadius: 12, fontWeight: 700, fontSize: 24, cursor: 'pointer', border: '1px solid #333' }}>Add to Simulator</button>
            {watching ? (
              <button onClick={removeFromWatchlist} style={{ padding: "18px 36px", background: '#222', color: "#ff5555", borderRadius: 12, fontWeight: 700, fontSize: 24, cursor: 'pointer', border: '1px solid #333' }}>Remove from Watchlist</button>
            ) : (
              <button onClick={addToWatchlist} style={{ padding: "18px 36px", background: '#222', color: "#00FF00", borderRadius: 12, fontWeight: 700, fontSize: 24, cursor: 'pointer', border: '1px solid #333' }}>Add to Watchlist</button>
            )}
          </div>
        </>
      )}
      </div>
    </div>
  );
}
