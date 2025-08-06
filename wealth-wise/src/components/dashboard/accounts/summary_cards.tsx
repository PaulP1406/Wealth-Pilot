interface BalanceCardProps {
  balance?: string;
  accounts?: Array<{
    name: string;
    balance: string;
    account: string;
    active: boolean;
  }>;
}
export function SummaryCards({ balance, accounts }: BalanceCardProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-[#2a2a2a] rounded-xl p-6 border border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm">Total Accounts</p>
            <p className="text-2xl font-bold text-white">{accounts?.length || 0}</p>
          </div>
          <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
            <span className="text-yellow-400 text-xl">🏦</span>
          </div>
        </div>
      </div>

      <div className="bg-[#2a2a2a] rounded-xl p-6 border border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm">Total Balance</p>
            <p className="text-2xl font-bold text-white">{balance}</p>
          </div>
          <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
            <span className="text-green-400 text-xl">💰</span>
          </div>
        </div>
      </div>

      <div className="bg-[#2a2a2a] rounded-xl p-6 border border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm">Average Balance</p>
            <p className="text-2xl font-bold text-white">$11,603.30</p>
          </div>
          <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
            <span className="text-blue-400 text-xl">📊</span>
          </div>
        </div>
      </div>
    </div>
  )
}