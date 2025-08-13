'use client'
import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { createClient } from '@/utils/supabase/client'

interface TransactionsHeaderProps {
  userID: string;
}

interface Account {
  id: string;
  name: string;
  balance: string;
}

export default function TransactionsHeader({ userID }: TransactionsHeaderProps) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)

    // Transactions account data
    const [accounts, setAccounts] =  useState<Account[]>([])

    // Adding transactions state
    const [transactionAddingName, setTransactionAddingName] = useState('');
    const [transactionAddingAmount, setTransactionAddingAmount] = useState('');
    const [transactionDescription, setTransactionDescription] = useState('');
    const [transactionType, setTransactionType] = useState('');
    const [transactionCategory, setTransactionCategory] = useState('');
    const [transactionAccount, setTransactionAccount] = useState('');
    const [transactionAccountID, setTransactionAccountID] = useState('');
    const [transactionDate, setTransactionDate] = useState('');

    const supabase = createClient()

    const fetchAccountData = async () => {
        const { data, error } = await supabase
            .from('accounts')
            .select('*')
            .eq('user_id', userID)

        if (error) {
            console.error('Error fetching account data:', error)
            return
        }
        setAccounts(data || [])
    }

    const handleAddTransaction = async () => {
        // Basic validation and guards
        if (!userID) {
            alert('You must be signed in before adding a transaction.');
            return
        }
        if (!transactionType || !transactionAddingName || !transactionAddingAmount || !transactionCategory || !transactionAccount || !transactionDate) {
            alert('Please fill in all fields (Type, Title, Amount, Category, Account, Date).');
            return
        }

        // Prepare payload using conservative, likely schema-safe column names
        const payload: Record<string, any> = {
            user_id: userID,
            title: transactionAddingName,
            subTitle: transactionDescription,
            type: transactionType,
            amount: Number(transactionAddingAmount),
            categoryName: transactionCategory,
            accountName: transactionAccount,
            date: transactionDate,
        }

        const { error } = await supabase
            .from('transactions')
            .insert(payload)

        if (error) {
            // Surface detailed error info to help diagnose 400s (bad column names, constraints, RLS, etc.)
            console.error('Error adding transaction:', {
                message: error.message,
                details: (error as any).details,
                hint: (error as any).hint,
                code: (error as any).code,
                payload,
            })
            alert(`Failed to add transaction: ${error.message}`)
            return
        }

        // Reset form and close dropdown on success
        setTransactionType('')
        setTransactionAddingName('')
        setTransactionDescription('')
        setTransactionAddingAmount('')
        setTransactionCategory('')
        setTransactionAccount('')
        setTransactionAccountID('')
        setTransactionDate('')
        setIsDropdownOpen(false)
    }

    const handleUpdateAccount = async () => {
        const { data: accountData, error: fetchError } = await supabase
            .from('accounts')
            .select('balance')
            .eq('user_id', userID)
            .eq('id', transactionAccountID)
            .single()
        
        if (fetchError) {
            console.error('Error fetching current account balance:', fetchError)
            return
        }

        // Calculate new balance based on transaction type
        const currentBalance = Number(accountData.balance)
        const transactionAmount = Number(transactionAddingAmount)
        let newBalance = currentBalance

        if (transactionType === 'income') {
            newBalance = currentBalance + transactionAmount
        } else if (transactionType === 'expense') {
            newBalance = currentBalance - transactionAmount
        // implement transfer after

        // Update the account with the new balance
        const { data, error } = await supabase
            .from('accounts')
            .update({
                balance: newBalance
            })
            .eq('user_id', userID)
            .eq('id', transactionAccountID)
        
        if (error) {
            console.error('Error updating account balance:', error)
            console.log('userID:', userID)
            console.log('transactionAccountID:', transactionAccountID)
            console.log('currentBalance:', currentBalance)
            console.log('transactionAmount:', transactionAmount)
            console.log('newBalance:', newBalance)
            return
        }
        
        console.log('Account balance updated successfully:', currentBalance, '→', newBalance)
    }
    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    // Fetch accounts when userID becomes available
    useEffect(() => {
        if (!userID) return
        fetchAccountData()
    }, [userID])

    // Optionally refresh accounts when opening the dropdown
    useEffect(() => {
        if (isDropdownOpen && userID) {
            fetchAccountData()
        }
    }, [isDropdownOpen, userID])
    
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
                        {/* Add Transaction Dropdown */}
                        <div className="relative" ref={dropdownRef}>
                            <button 
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium flex items-center space-x-2"
                            >
                                <span>+ Add Transaction</span>
                                <span className={`transform transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}>
                                    ▼
                                </span>
                            </button>

                            {/* Dropdown Form */}
                            {isDropdownOpen && (
                                <div className="absolute right-0 top-12 w-80 bg-[#2a2a2a] border border-gray-700 rounded-xl shadow-lg z-50 p-4">
                                    <form className="space-y-3" onSubmit={(e) => {
                                        e.preventDefault();
                                        handleAddTransaction();
                                        handleUpdateAccount();
                                    }}>
                                        <div>
                                            <label className="block text-white mb-1 text-xs font-medium">Type</label>
                                            <select 
                                                className="w-full px-2 py-1.5 bg-[#3a3a3a] border border-gray-600 rounded text-white text-sm focus:outline-none focus:ring-1 focus:ring-yellow-400"
                                                onChange={(e) => setTransactionType(e.target.value)}
                                                value={transactionType}
                                            >
                                                <option value="">Select type</option>
                                                <option value="income">Income</option>
                                                <option value="expense">Expense</option>
                                                <option value="transfer">Transfer</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-white mb-1 text-xs font-medium">Title</label>
                                            <input
                                                type="text"
                                                placeholder="e.g. Grocery Shopping"
                                                className="w-full px-2 py-1.5 bg-[#3a3a3a] border border-gray-600 rounded text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-1 focus:ring-yellow-400"
                                                onChange={(e) => setTransactionAddingName(e.target.value)}
                                                value={transactionAddingName}
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-white mb-1 text-xs font-medium">Description</label>
                                            <input
                                                type="text"
                                                placeholder="e.g. Weekly groceries"
                                                className="w-full px-2 py-1.5 bg-[#3a3a3a] border border-gray-600 rounded text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-1 focus:ring-yellow-400"
                                                onChange={(e) => setTransactionDescription(e.target.value)}
                                                value={transactionDescription}
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-white mb-1 text-xs font-medium">Amount</label>
                                            <input
                                                type="number"
                                                step="0.01"
                                                placeholder="0.00"
                                                className="w-full px-2 py-1.5 bg-[#3a3a3a] border border-gray-600 rounded text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-1 focus:ring-yellow-400"
                                                onChange={(e) => setTransactionAddingAmount(e.target.value)}
                                                value={transactionAddingAmount}
                                            />
                                        </div>

                                        <div className="grid grid-cols-2 gap-2">
                                            <div>
                                                <label className="block text-white mb-1 text-xs font-medium">Category</label>
                                                <select 
                                                    className="w-full px-2 py-1.5 bg-[#3a3a3a] border border-gray-600 rounded text-white text-sm focus:outline-none focus:ring-1 focus:ring-yellow-400"
                                                    onChange={(e) => setTransactionCategory(e.target.value)}
                                                    value={transactionCategory}
                                                >
                                                    <option value="">Select</option>
                                                    <option value="food">Food</option>
                                                    <option value="transport">Transport</option>
                                                    <option value="shopping">Shopping</option>
                                                    <option value="bills">Bills</option>
                                                    <option value="salary">Salary</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-white mb-1 text-xs font-medium">Account</label>
                                                <select
                                                    className="w-full px-2 py-1.5 bg-[#3a3a3a] border border-gray-600 rounded text-white text-sm focus:outline-none focus:ring-1 focus:ring-yellow-400"
                                                    onChange={(e) => {
                                                        const selectedAccount = accounts.find(acct => acct.id === e.target.value);
                                                        if (selectedAccount) {
                                                            setTransactionAccount(selectedAccount.name);
                                                            setTransactionAccountID(selectedAccount.id);
                                                        } else {
                                                            setTransactionAccount('');
                                                            setTransactionAccountID('');
                                                        }
                                                    }}
                                                    value={transactionAccountID}
                                                >
                                                    <option value="">Select</option>
                                                    {accounts.map((acct) => (
                                                        <option key={acct.id} value={acct.id}>
                                                            {acct.name}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-white mb-1 text-xs font-medium">Date</label>
                                            <input
                                                type="date"
                                                className="w-full px-2 py-1.5 bg-[#3a3a3a] border border-gray-600 rounded text-white text-sm focus:outline-none focus:ring-1 focus:ring-yellow-400"
                                                onChange={(e) => setTransactionDate(e.target.value)}
                                                value={transactionDate}
                                            />
                                        </div>

                                        <div className="flex space-x-2 pt-2">
                                            <button
                                                type="button"
                                                onClick={() => setIsDropdownOpen(false)}
                                                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-1.5 rounded text-sm transition-colors"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                type="submit"
                                                className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-black py-1.5 rounded text-sm transition-colors font-medium"
                                            >
                                                Add
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            )}
                        </div>

                        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium">
                            Export CSV
                        </button>
                    </div>
                </div>
            </div>
        </header>
    )
}