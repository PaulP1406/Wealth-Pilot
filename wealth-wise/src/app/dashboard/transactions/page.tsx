'use client'
import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import TransactionsHeader from '@/components/dashboard/transactions/header'
import TransactionsFilters from '@/components/dashboard/transactions/filters'
import TransactionsSummary from '@/components/dashboard/transactions/summary'
import TransactionsTable from '@/components/dashboard/transactions/table'

import { redirect } from 'next/navigation'
import { useEffect } from 'react'
import type { User } from '@supabase/supabase-js'

interface Transaction {
    id: string
    user_id: string
    title: string
    subTitle: string
    amount: number
    amountColor: string
    date: string
    category: string
    categoryID: string
    categoryColor: string
    categoryName: string
    accountID: string
    accountName: string
}
export default function TransactionsPage() {
    const [user, setUser] = useState<User | undefined>()
    const [transactionsData, setTransactionsData] = useState<Transaction[]>([])

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [filterType, setFilterType] = useState('all')
    const [sortBy, setSortBy] = useState('date')
    const [searchTerm, setSearchTerm] = useState('')
    const [dateRange, setDateRange] = useState('all')

    const supabase = createClient()
    const fetchTransactionsData = async (userId: string) => {
        setLoading(true)
        // fetches all transactions
        const { data, error: transactionsError } = await supabase
            .from('transactions')
            .select('*')
            .eq('user_id', userId)
        if (transactionsError) {
            console.error('Error fetching transactions:', transactionsError)
        }
        setTransactionsData(data || []) // if data if not empty array
        setLoading(false)
    }
     useEffect(() => {
            // configure auth first
            const fetchData = async () => {
                const { data: userData, error } = await supabase.auth.getUser()
                if (error || !userData?.user) {
                    redirect('/auth/signin')
                    return
                }
                setUser(userData.user)
                await fetchTransactionsData(userData.user.id)
            }
            fetchData()        
    }, [supabase])

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

                <TransactionsTable transactions={transactionsData} />
            </main>
        </div>
    )
}