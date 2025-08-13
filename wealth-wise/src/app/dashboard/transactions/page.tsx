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
    type: string
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
        const { data, error: transactionsError } = await supabase
            .from('transactions')
            .select('*')
            .eq('user_id', userId)

        if (transactionsError) {
            console.error('Error fetching transactions:', {
                message: transactionsError.message,
                details: (transactionsError as any).details,
                hint: (transactionsError as any).hint,
                code: (transactionsError as any).code,
            })
            setLoading(false)
            return
        }

        // Map DB rows to the UI shape expected by TransactionsTable
        const mapped = (data || []).map((row: any) => ({
            id: row.id,
            user_id: row.user_id,
            title: row.title ?? row.name ?? 'Untitled',
            subTitle: row.subTitle ?? row.description ?? '',
            type: row.type ?? 'expense',
            amount: Number(row.amount ?? 0),
            amountColor: row.amountColor ?? (row.type === 'income' ? 'green' : 'red'), // if income the green, otherwise red, if the data is not in the payload
            date: row.date ?? '',
            category: row.category ?? row.categoryName ?? '',
            categoryID: row.categoryID ?? '',
            categoryColor: row.categoryColor ?? (row.type === 'income' ? 'green' : 'red'),
            categoryName: row.categoryName ?? row.category ?? '',
            accountID: row.accountID ?? '',
            accountName: row.accountName ?? row.account ?? '',
        })) as unknown as Transaction[]

        setTransactionsData(mapped)
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
            <TransactionsHeader userID={user?.id ?? ''} />

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

                <TransactionsTable transactions={transactionsData} userID={user?.id ?? ''} />
            </main>
        </div>
    )
}