import React, { useState } from "react";

interface StockSearchModalProps {
  onSelect: (symbol: string, name: string) => void;
  onClose: () => void;
}

export default function StockSearchModal({ onSelect, onClose }: StockSearchModalProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Array<{ symbol: string; name: string }>>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  // Yahoo Finance unofficial search API (no key required)
  async function searchStocks(q: string) {
    setLoading(true);
    setResults([]);
    setError("");
    try {
  const res = await fetch(`https://corsproxy.io/?https://query1.finance.yahoo.com/v1/finance/search?q=${encodeURIComponent(q)}`);
      if (!res.ok) throw new Error("Network error");
      const data = await res.json();
      const found = (data.quotes || []).map((item: any) => ({
        symbol: item.symbol,
        name: item.shortname || item.longname || item.symbol,
      }));
      setResults(found);
      if (found.length === 0) setError("No results found.");
    } catch (e) {
      setResults([]);
      setError("Search failed. Please try again.");
    }
    setLoading(false);
  }

  return (
    <div style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", background: "rgba(0,0,0,0.85)", zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ maxWidth: 400, width: '100%', background: "#18181b", borderRadius: 16, padding: 28, boxShadow: '0 4px 32px #000', color: '#fafafa' }}>
        <h2 style={{ color: '#fafafa', fontWeight: 700, fontSize: 22, marginBottom: 16 }}>Search Stocks/ETFs</h2>
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Type symbol or name..."
          style={{ width: "100%", padding: 10, marginBottom: 14, borderRadius: 8, background: '#23232a', color: '#fafafa', border: '1px solid #333', fontSize: 16 }}
        />
        <button
          onClick={() => searchStocks(query)}
          disabled={!query.trim() || loading}
          style={{ padding: "10px 18px", marginBottom: 16, borderRadius: 8, background: loading ? '#222' : '#00FF00', color: loading ? '#aaa' : '#222', fontWeight: 700, border: 'none', fontSize: 16, cursor: loading ? 'not-allowed' : 'pointer' }}
        >
          {loading ? "Searching..." : "Search"}
        </button>
        {error && <div style={{ color: '#ff5555', marginBottom: 10, fontWeight: 500 }}>{error}</div>}
        <ul style={{ listStyle: "none", padding: 0, marginBottom: 8 }}>
          {results.map(r => (
            <li key={r.symbol} style={{ marginBottom: 8 }}>
              <button
                style={{ width: "100%", textAlign: "left", padding: 10, borderRadius: 8, border: "1px solid #333", background: '#23232a', color: '#fafafa', fontSize: 15, fontWeight: 500, cursor: 'pointer', transition: 'background 0.2s' }}
                onClick={() => onSelect(r.symbol, r.name)}
                onMouseOver={e => (e.currentTarget.style.background = '#28282f')}
                onMouseOut={e => (e.currentTarget.style.background = '#23232a')}
              >
                <b style={{ color: '#00FF00' }}>{r.symbol}</b> — {r.name}
              </button>
            </li>
          ))}
        </ul>
        <button onClick={onClose} style={{ marginTop: 18, padding: '10px 18px', borderRadius: 8, background: '#222', color: '#fafafa', fontWeight: 700, border: 'none', fontSize: 16, cursor: 'pointer' }}>Close</button>
      </div>
    </div>
  );
}
