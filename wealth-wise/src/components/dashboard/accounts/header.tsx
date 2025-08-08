interface AccountHeaderProps {
  balance: string;
}

export function AccountHeader({balance}: AccountHeaderProps) {
  return (
    <header className="bg-[#2a2a2a] border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-2 text-gray-300 hover:text-white">
              <span>←</span>
              <span>Back to Dashboard</span>
            </button>
            <div className="w-px h-6 bg-gray-600"></div>
            <h1 className="text-xl font-semibold">Account Management</h1>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-gray-300">Total: {balance}</span>
            <button className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded-lg transition-colors text-sm font-medium">
              Add Account
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}