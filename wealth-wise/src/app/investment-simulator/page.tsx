'use client'
import SideNav from '@/components/SideNav'
import MainChart from '@/components/finance/mainChart'
import StockSearchModal from '@/components/stocks/StockSearchModal'
import Watchlist from '@/components/stocks/Watchlist'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'



export default function InvestmentSimulatorPageWrapper() {
  // Client-only wrapper for hooks
  return <InvestmentSimulatorPage />
}

function InvestmentSimulatorPage() {
  const [showSearch, setShowSearch] = useState(false)
  const router = useRouter()
  // Auth logic (move to client for hooks)
  // You may want to refactor this for SSR/CSR split
  // For now, skip auth for demo
  const user = { id: 'demo-user-id' } // Replace with real user logic

  function handleSelectStock(symbol: string, name: string) {
    setShowSearch(false)
    router.push(`/investment-simulator/stock/${symbol}`)
  }

  function handleWatchlistSelect(symbol: string) {
    router.push(`/investment-simulator/stock/${symbol}`)
  }

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white">
      <SideNav />
      <header className="bg-[#2a2a2a] border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-semibold">Investment Simulator</h1>
            <button
              onClick={() => setShowSearch(true)}
              style={{ padding: '8px 16px', background: '#00FF00', color: '#222', borderRadius: 8, fontWeight: 700 }}
            >
              Search Stocks/ETFs
            </button>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-[#2a2a2a] rounded-xl p-6 border border-gray-700 h-max">
          <MainChart userID={user.id}/>
        </div>
        <div className="mt-8">
          <Watchlist onSelect={handleWatchlistSelect} />
        </div>
      </main>
      {showSearch && (
        <StockSearchModal
          onSelect={handleSelectStock}
          onClose={() => setShowSearch(false)}
        />
      )}
    </div>
  )
}
