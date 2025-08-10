'use client'
import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import TransactionsHeader from '@/components/dashboard/transactions/TransactionsHeader'
import TransactionsFilters from '@/components/dashboard/transactions/TransactionsFilters'
import TransactionsSummary from '@/components/dashboard/transactions/TransactionsSummary'
import TransactionsTable from '@/components/dashboard/transactions/TransactionsTable'

export default function TransactionsPage() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [filterType, setFilterType] = useState('all')
    const [sortBy, setSortBy] = useState('date')
    const [searchTerm, setSearchTerm] = useState('')
    const [dateRange, setDateRange] = useState('all')

    const supabase = createClient()

    return (
        <div className="min-h-screen bg-[#1a1a1a] text-white">
            <TransactionsHeader />
            
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <TransactionsFilters 
                    filterType={filterType}
                    setFilterType={setFilterType}
                    sortBy={sortBy}
                    setSortBy={setSortBy}
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    dateRange={dateRange}
                    setDateRange={setDateRange}
                />
                
                <TransactionsSummary />
                
                <TransactionsTable />
            </main>
        </div>
    )
}