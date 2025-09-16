import React from "react";
import StockDetail from "../../../../components/stocks/StockDetail"

export default function StockPage({ params }: { params: { symbol: string } }) {
  return <StockDetail symbol={params.symbol} />;
}
