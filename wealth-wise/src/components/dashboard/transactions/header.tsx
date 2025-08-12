'use client'
import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { createClient } from '@/utils/supabase/client'

interface TransactionsHeaderProps {
  userID: string;
}

export default function TransactionsHeader({ userID }: TransactionsHeaderProps) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)
    
    // Adding transactions state
    const [transactionAddingName, setTransactionAddingName] = useState('');
    const [transactionAddingAmount, setTransactionAddingAmount] = useState('');
    const [transactionDescription, setTransactionDescription] = useState('');
    const [transactionType, setTransactionType] = useState('');
    const [transactionCategory, setTransactionCategory] = useState('');
    const [transactionAccount, setTransactionAccount] = useState('');
    const [transactionDate, setTransactionDate] = useState('');

    const supabase = createClient()


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
                                    <form className="space-y-3">
                                        <div>
                                            <label className="block text-white mb-1 text-xs font-medium">Type</label>
                                            <select className="w-full px-2 py-1.5 bg-[#3a3a3a] border border-gray-600 rounded text-white text-sm focus:outline-none focus:ring-1 focus:ring-yellow-400">
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
                                                <select className="w-full px-2 py-1.5 bg-[#3a3a3a] border border-gray-600 rounded text-white text-sm focus:outline-none focus:ring-1 focus:ring-yellow-400">
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
                                                <select className="w-full px-2 py-1.5 bg-[#3a3a3a] border border-gray-600 rounded text-white text-sm focus:outline-none focus:ring-1 focus:ring-yellow-400">
                                                    <option value="">Select</option>
                                                    <option value="checking">Checking</option>
                                                    <option value="savings">Savings</option>
                                                    <option value="credit">Credit</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-white mb-1 text-xs font-medium">Date</label>
                                            <input
                                                type="date"
                                                className="w-full px-2 py-1.5 bg-[#3a3a3a] border border-gray-600 rounded text-white text-sm focus:outline-none focus:ring-1 focus:ring-yellow-400"
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