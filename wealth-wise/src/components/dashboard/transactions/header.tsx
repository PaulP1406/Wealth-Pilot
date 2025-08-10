import Link from 'next/link'

export default function TransactionsHeader() {
    return (
        <header className="bg-[#2a2a2a] border-b border-gray-700">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center space-x-4">
                        <Link 
                            href="/dashboard"
                            className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
                        >
                            <span>←</span>
                            <span>Back to Dashboard</span>
                        </Link>
                        <div className="w-px h-6 bg-gray-600"></div>
                        <h1 className="text-xl font-semibold">Transactions</h1>
                    </div>
                    <div className="flex items-center space-x-4">
                        <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium">
                            + Add Transaction
                        </button>
                        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium">
                            Export CSV
                        </button>
                    </div>
                </div>
            </div>
        </header>
    )
}