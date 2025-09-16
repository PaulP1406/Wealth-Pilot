import React, { useState } from "react";

interface AddToSimulatorModalProps {
  symbol: string;
  name: string;
  onSubmit: (shares: number, price: number) => void;
  onClose: () => void;
}

export default function AddToSimulatorModal({ symbol, name, onSubmit, onClose }: AddToSimulatorModalProps) {
  const [shares, setShares] = useState(1);
  const [price, setPrice] = useState(0);
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (shares <= 0 || price <= 0) {
      setError("Shares and price must be positive numbers.");
      return;
    }
    setError("");
    onSubmit(shares, price);
  }

  return (
    <div style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", background: "rgba(0,0,0,0.85)", zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <form onSubmit={handleSubmit} style={{ maxWidth: 400, width: '100%', background: "#18181b", borderRadius: 16, padding: 32, boxShadow: '0 4px 32px #000', color: '#fafafa' }}>
        <h2 style={{ color: '#fafafa', fontWeight: 700, fontSize: 22, marginBottom: 16 }}>Add {symbol} to Simulator</h2>
        <div style={{ marginBottom: 16 }}>
          <label>Shares</label>
          <input type="number" min={1} step={1} value={shares} onChange={e => setShares(Number(e.target.value))} style={{ width: '100%', padding: 10, borderRadius: 8, background: '#23232a', color: '#fafafa', border: '1px solid #333', fontSize: 16, marginTop: 4 }} />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label>Price per Share</label>
          <input type="number" min={0.01} step={0.01} value={price} onChange={e => setPrice(Number(e.target.value))} style={{ width: '100%', padding: 10, borderRadius: 8, background: '#23232a', color: '#fafafa', border: '1px solid #333', fontSize: 16, marginTop: 4 }} />
        </div>
        {error && <div style={{ color: '#ff5555', marginBottom: 10, fontWeight: 500 }}>{error}</div>}
        <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
          <button type="submit" style={{ padding: '10px 18px', borderRadius: 8, background: '#00FF00', color: '#222', fontWeight: 700, border: 'none', fontSize: 16, cursor: 'pointer' }}>Add</button>
          <button type="button" onClick={onClose} style={{ padding: '10px 18px', borderRadius: 8, background: '#222', color: '#fafafa', fontWeight: 700, border: 'none', fontSize: 16, cursor: 'pointer' }}>Cancel</button>
        </div>
      </form>
    </div>
  );
}
