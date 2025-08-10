interface TransactionsFiltersProps {
    filterType: string;
    setFilterType: (value: string) => void;
    sortBy: string;
    setSortBy: (value: string) => void;
    searchTerm: string;
    setSearchTerm: (value: string) => void;
    dateRange: string;
    setDateRange: (value: string) => void;
}

export default function TransactionsFilters({
    filterType,
    setFilterType,
    sortBy,
    setSortBy,
    searchTerm,
    setSearchTerm,
    dateRange,
    setDateRange
}: TransactionsFiltersProps) {
    return (
        <div className="bg-[#2a2a2a] rounded-xl p-6 border border-gray-700 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                    <label className="block text-sm text-gray-400 mb-2">Search</label>
                    <input
                        type="text"
                        placeholder="Search transactions..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full px-3 py-2 bg-[#3a3a3a] border border-gray-600 rounded text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    />
                </div>
                <div>
                    <label className="block text-sm text-gray-400 mb-2">Type</label>
                    <select 
                        value={filterType} 
                        onChange={(e) => setFilterType(e.target.value)}
                        className="w-full px-3 py-2 bg-[#3a3a3a] border border-gray-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    >
                        <option value="all">All Types</option>
                        <option value="income">Income</option>
                        <option value="expense">Expense</option>
                        <option value="transfer">Transfer</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm text-gray-400 mb-2">Date Range</label>
                    <select 
                        value={dateRange}
                        onChange={(e) => setDateRange(e.target.value)}
                        className="w-full px-3 py-2 bg-[#3a3a3a] border border-gray-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    >
                        <option value="all">All Time</option>
                        <option value="today">Today</option>
                        <option value="week">This Week</option>
                        <option value="month">This Month</option>
                        <option value="year">This Year</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm text-gray-400 mb-2">Sort By</label>
                    <select 
                        value={sortBy} 
                        onChange={(e) => setSortBy(e.target.value)}
                        className="w-full px-3 py-2 bg-[#3a3a3a] border border-gray-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    >
                        <option value="date">Date</option>
                        <option value="amount">Amount</option>
                        <option value="type">Type</option>
                    </select>
                </div>
            </div>
        </div>
    )
}