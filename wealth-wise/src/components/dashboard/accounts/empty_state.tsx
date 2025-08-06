export function EmptyAccountsState() {
  return (
    <div className="bg-[#2a2a2a] rounded-xl border border-gray-700 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-700">
        <h2 className="text-xl font-semibold text-white">Your Accounts</h2>
      </div>
      
      <div className="px-6 py-12 text-center">
        <div className="w-16 h-16 bg-gray-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-gray-400 text-2xl">🏦</span>
        </div>
        <h3 className="text-lg font-medium text-white mb-2">No accounts found</h3>
        <p className="text-gray-400 mb-4">Get started by adding your first account</p>
        <button className="bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-2 rounded-lg transition-colors font-medium">
          Add Your First Account
        </button>
      </div>
    </div>
  )
}