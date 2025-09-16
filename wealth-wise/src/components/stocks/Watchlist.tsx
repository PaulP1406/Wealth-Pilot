import React, { useEffect, useState } from "react";

interface WatchlistItem {
  symbol: string;
  name: string;
}

export default function Watchlist({ onSelect }: { onSelect: (symbol: string) => void }) {
  const [items, setItems] = useState<WatchlistItem[]>([]);

  useEffect(() => {
    const raw = localStorage.getItem("watchlist");
    if (raw) setItems(JSON.parse(raw));
  }, []);

  function remove(symbol: string) {
    const updated = items.filter(i => i.symbol !== symbol);
    setItems(updated);
    localStorage.setItem("watchlist", JSON.stringify(updated));
  }

  return (
    <div style={{ margin: "24px 0" }}>
      <h3>Your Watchlist</h3>
      {items.length === 0 ? <div>No stocks/ETFs added.</div> : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {items.map(i => (
            <li key={i.symbol} style={{ marginBottom: 8 }}>
              <button onClick={() => onSelect(i.symbol)} style={{ marginRight: 8 }}>{i.symbol}</button>
              <span>{i.name}</span>
              <button onClick={() => remove(i.symbol)} style={{ marginLeft: 16, color: "red" }}>Remove</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
