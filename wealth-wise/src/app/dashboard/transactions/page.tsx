'use client'
import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import TransactionsHeader from '@/components/dashboard/transactions/header'
import TransactionsFilters from '@/components/dashboard/transactions/filters'
import TransactionsSummary from '@/components/dashboard/transactions/summary'
import TransactionsTable from '@/components/dashboard/transactions/table'
import { differenceInCalendarDays, startOfWeek, startOfMonth, startOfYear } from 'date-fns'

import { redirect } from 'next/navigation'
import { useEffect } from 'react'
import type { User } from '@supabase/supabase-js'
import { i } from 'framer-motion/client'

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
    icon: string
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
            icon: row.icon ?? '💰',
        })) as unknown as Transaction[]

        setTransactionsData(mapped)
        setLoading(false)
    }

    const handleFetchTransactions = () => {
        if (!user?.id) return
        fetchTransactionsData(user.id)
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

    // Delete transaction function
    const deleteTransaction = async (transactionId: string) => {        
        if (!user?.id) return;        
        setLoading(true);
        
        // Fetch transaction details including which account it belongs to
        const { data: transactionData, error: fetchError } = await supabase
            .from('transactions')
            .select('type, amount, account_id, accountName')
            .eq('id', transactionId)
            .single();
            
        if (fetchError) {
            console.error('Error fetching transaction details:', fetchError);
            setLoading(false);
            return;
        }

        const { type: transactionType, amount: transactionAmount, account_id: accountID, accountName } = transactionData;
        console.log("Transaction Type:", transactionType);
        console.log("Transaction Amount:", transactionAmount);
        console.log("Account ID:", accountID);
        console.log("Account Name:", accountName);

        // Update the specific account balance
        if (transactionType && transactionAmount && (accountID || accountName)) {
            let accountQuery = supabase
                .from('accounts')
                .select('id, balance')
                .eq('user_id', user.id);
            
            // Use accountID if available, otherwise fall back to accountName
            if (accountID) {
                accountQuery = accountQuery.eq('id', accountID);
            } else if (accountName) {
                accountQuery = accountQuery.eq('name', accountName);
            }
            
            const { data: accountData, error: accountError } = await accountQuery.single();
            
            if (accountError) {
                console.error('Error fetching account balance:', accountError);
            } else if (accountData) {
                let newBalance: number;
                
                if (transactionType === 'expense') {
                    // Deleting an expense gives money back to the account
                    newBalance = (accountData.balance ?? 0) + transactionAmount;
                } else if (transactionType === 'income') {
                    // Deleting income removes money from the account
                    newBalance = (accountData.balance ?? 0) - transactionAmount;
                } else {
                    // Handle other transaction types if needed
                    newBalance = accountData.balance ?? 0;
                }
                
                const { error: updateError } = await supabase
                    .from('accounts')
                    .update({ balance: newBalance })
                    .eq('id', accountData.id)
                    .eq('user_id', user.id);
                    
                if (updateError) {
                    console.error('Error updating account balance:', updateError);
                } else {
                    console.log(`Account balance updated: ${accountData.balance} → ${newBalance}`);
                }
            }
        }

        // deleting transaction
        const { error } = await supabase
            .from('transactions')
            .delete()
            .eq('id', transactionId)
            .eq('user_id', user.id);
        if (error) {
            console.error('Error deleting transaction:', error);
            alert('Failed to delete transaction: ' + error.message);
        } else {
            console.log('Transaction deleted successfully');
            // Optimistically remove from local state
            setTransactionsData(prev => prev.filter(transaction => transaction.id !== transactionId));
        }
        
        // Always refetch to ensure data consistency
        await fetchTransactionsData(user.id);
        setLoading(false);
    }

    // Derived filtered / searched / sorted list (client side)
    const filteredTransactions = (() => {
        let list = [...transactionsData]

        // Search (case-insensitive across title, subtitle, category, account)
        if (searchTerm.trim()) {
            const q = searchTerm.trim().toLowerCase()
            list = list.filter(t => (
                t.title?.toLowerCase().includes(q) ||
                t.subTitle?.toLowerCase().includes(q) ||
                t.categoryName?.toLowerCase().includes(q) ||
                t.accountName?.toLowerCase().includes(q)
            ))
        }

        // Type filter
        if (filterType !== 'all') {
            list = list.filter(t => t.type === filterType)
        }

        // Date range filter (expects ISO or yyyy-mm-dd in t.date)
        if (dateRange !== 'all') {
            const now = new Date()
            list = list.filter(t => {
                if (!t.date) return false
                const d = new Date(t.date)
                switch (dateRange) {
                    case 'today':
                        return differenceInCalendarDays(now, d) === 0
                    case 'week': {
                        const weekStart = startOfWeek(now, { weekStartsOn: 1 })
                        return d >= weekStart
                    }
                    case 'month': {
                        const monthStart = startOfMonth(now)
                        return d >= monthStart
                    }
                    case 'year': {
                        const yearStart = startOfYear(now)
                        return d >= yearStart
                    }
                    default:
                        return true
                }
            })
        }

        // Sorting
        list.sort((a, b) => {
            switch (sortBy) {
                case 'amount':
                    return b.amount - a.amount
                case 'type':
                    return a.type.localeCompare(b.type)
                case 'date':
                default:
                    // Newest first
                    return new Date(b.date).getTime() - new Date(a.date).getTime()
            }
        })
        return list
    })()

    return (
        <div className="min-h-screen bg-[#1a1a1a] text-white">
            <TransactionsHeader userID={user?.id ?? ''} onFetchTransactions={handleFetchTransactions} />

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

                <TransactionsSummary userID={user?.id ?? ''} />

                <TransactionsTable 
                    transactions={filteredTransactions} 
                    userID={user?.id ?? ''} 
                    onDeleteTransaction={deleteTransaction}
                    onTransactionUpdated={handleFetchTransactions}
                />
            </main>
        </div>
    )
}