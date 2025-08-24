import SideNav from '@/components/SideNav'

export default function InvestmentSimulatorPage() {
  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white">
      <SideNav />
      <header className="bg-[#2a2a2a] border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-semibold">Investment Simulator</h1>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-[#2a2a2a] rounded-xl p-6 border border-gray-700">
          <p className="text-gray-300">Coming soon…</p>
        </div>
      </main>
    </div>
  )
}
