interface BalanceCardProps {
  balance: string;
  accounts: Array<{
    name: string;
    balance: string;
    account: string;
    active: boolean;
  }>;
}

export function BalanceCard({ balance, accounts }: BalanceCardProps) {
  return (
    <div className="bg-[#2a2a2a] rounded-xl p-6 border border-[#3a3a3a] h-fit">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-white">Your capital</h3>
        <button className="text-yellow-400 text-sm hover:text-yellow-300 transition-colors">
          This month
        </button>
      </div>
      
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span className="text-gray-400 text-sm">Balance</span>
        </div>
        <div className="text-4xl font-bold text-white mb-4">{balance}</div>
      </div>
      
      <div className="mb-6">
        <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
          <span>All accounts</span>
          <span>3/3 selected</span>
        </div>
        
        <div className="space-y-3">
          {accounts.map((account, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-[#3a3a3a] rounded-lg">
              <div className="flex items-center space-x-3">
                <div className={`w-4 h-4 rounded-full ${account.active ? 'bg-green-500' : 'bg-gray-500'}`}></div>
                <div>
                  <div className="text-white font-medium text-sm">{account.name}</div>
                  <div className="text-xs text-gray-400">{account.account}</div>
                </div>
              </div>
              <div className="text-white font-semibold text-sm">{account.balance}</div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Monthly Goal Section */}
      <div className="border-t border-[#3a3a3a] pt-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-lg font-semibold text-white">Monthly goal</h4>
          <button className="text-yellow-400 text-sm hover:text-yellow-300 transition-colors">
            Edit goal
          </button>
        </div>
        <div className="text-2xl font-bold text-white mb-3">52% /$56,000</div>
        <div className="w-full bg-[#1a1a1a] rounded-full h-2 mb-3">
          <div className="bg-yellow-400 h-2 rounded-full" style={{ width: '52%' }}></div>
        </div>
        <div className="text-sm text-gray-400">Forecasted capital is $39,968.60</div>
      </div>
    </div>
  );
}