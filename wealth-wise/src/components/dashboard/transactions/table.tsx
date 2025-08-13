'use client'
import { createClient } from "@/utils/supabase/client"
import { useState, useEffect } from "react"

interface TransactionProps {
    transactions: {
        id: string
        user_id: string
        title: string
        subTitle: string
        type: string
        amount: number
        amountColor: string
        date: string
        categoryName: string
        categoryID: string
        categoryColor: string
        accountID: string
        accountName: string
    }[],
    userID: string
}


interface Account {
  id: string;
  name: string;
  balance: string;
}

export default function TransactionsTable({ transactions, userID }: TransactionProps) {
    const [accounts, setAccounts] = useState<Account[]>([])
    // Local copy so we can optimistically update edited rows without forcing parent to refetch
    const [localTransactions, setLocalTransactions] = useState(transactions)
    const [editingTransaction, setEditingTransaction] = useState<null | {
        id: string;
        index: number;
        title: string;
        subTitle: string;
        amount: number;
        categoryName: string;
        accountName: string;
        date: string;
        amountColor: string;
        categoryColor: string;
        type: string;
    }>(null)
    const supabase = createClient()
    const sampleTransactions = [
        {
            date: "Dec 15, 2024",
            title: "Salary Payment",
            subtitle: "Monthly salary",
            category: "Income",
            categoryColor: "green",
            account: "Main Checking",
            amount: "+$5,200.00",
            amountColor: "green",
            icon: "💼"
        }
    ]

    const getCategoryColorClasses = (color: string) => {
        const colors = {
            green: "bg-green-500/20 text-green-400",
            red: "bg-red-500/20 text-red-400",
            blue: "bg-blue-500/20 text-blue-400"
        }
        return colors[color as keyof typeof colors]
    }

    const getAmountColorClasses = (color: string) => {
        const colors = {
            green: "text-green-400",
            red: "text-red-400"
        }
        return colors[color as keyof typeof colors]
    }
    
    // Account fetching and transaction updates logic
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
    const handleEditTransaction = (t: typeof localTransactions[number], index: number) => {
        setEditingTransaction({
            id: t.id,
            index,
            title: t.title,
            subTitle: t.subTitle,
            amount: t.amount,
            categoryName: t.categoryName,
            accountName: t.accountName,
            date: t.date,
            amountColor: t.amountColor,
            categoryColor: t.categoryColor,
            type: t.type,
        })
    }

    const handleCancelEdit = () => setEditingTransaction(null)

    const handleSaveTransaction = async () => {
        if (!editingTransaction) return
        const { id, title, subTitle, amount, categoryName, accountName, date } = editingTransaction
        // Basic validation
        if (!title || !amount || !categoryName || !accountName || !date) {
            alert('Please fill in all required fields (title, amount, category, account, date).')
            return
        }
        const payload: Record<string, any> = {
            title,
            subTitle,
            amount,
            categoryName,
            accountName,
            date,
        }
        const { error } = await supabase
            .from('transactions')
            .update(payload)
            .eq('user_id', userID)
            .eq('id', id)

        if (error) {
            console.error('Error updating transaction:', {
                message: error.message,
                details: (error as any).details,
                hint: (error as any).hint,
                code: (error as any).code,
                payload,
            })
            alert('Failed to update transaction: ' + error.message)
            return
        }

        // Optimistic local update
        setLocalTransactions(prev => prev.map((t, i) => i === editingTransaction.index ? {
            ...t,
            title,
            subTitle,
            amount,
            categoryName,
            accountName,
            date,
        } : t))
        setEditingTransaction(null)
    }

    // Sync local copy when parent prop changes (e.g., refetch in parent)
    useEffect(() => {
        setLocalTransactions(transactions)
    }, [transactions])

    useEffect(() => {
        if (userID) fetchAccountData()
    }, [userID])

    // If entering edit mode and accounts not loaded yet, fetch them
    useEffect(() => {
        if (editingTransaction && accounts.length === 0 && userID) fetchAccountData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [editingTransaction])

    const handleUpdateAccount = async () => {
        if (!editingTransaction || !userID) return

        const { id, accountName } = editingTransaction
        const currentAccount = accounts.find(acc => acc.name === accountName)

        if (!currentAccount) {
            alert('Selected account not found.')
            return
        }

        const currentBalance = Number(currentAccount.balance)
        const newBalance = currentBalance + editingTransaction.amount

        const { error } = await supabase
            .from('accounts')
            .update({ balance: newBalance })
            .eq('id', currentAccount.id)
            .eq('user_id', userID)

        if (error) {
            console.error('Error updating account balance:', error)
            alert('Failed to update account balance: ' + error.message)
            return
        }

        // Update local accounts state
        setAccounts(prev => prev.map(acc => acc.id === currentAccount.id ? { ...acc, balance: String(newBalance) } : acc))
    }
    return (
        <div className="bg-[#2a2a2a] rounded-xl border border-gray-700 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-700">
                <h2 className="text-xl font-semibold text-white">Recent Transactions</h2>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-[#1a1a1a]">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Date
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Description
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Category
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Account
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Amount
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                        {localTransactions.map((transaction, index) => {
                            const isEditing = editingTransaction?.index === index
                            return (
                                <tr key={transaction.id || index} className="hover:bg-[#3a3a3a] transition-colors">
                                    {/* Date */}
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                        {isEditing ? (
                                            <input
                                                type="date"
                                                className="bg-[#3a3a3a] border border-gray-600 rounded px-2 py-1 text-white text-xs focus:outline-none focus:ring-1 focus:ring-yellow-400"
                                                value={editingTransaction?.date || ''}
                                                onChange={(e) => setEditingTransaction(prev => prev ? { ...prev, date: e.target.value } : prev)}
                                            />
                                        ) : (
                                            transaction.date
                                        )}
                                    </td>
                                    {/* Description (title + subtitle) */}
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className={`w-8 h-8 ${getCategoryColorClasses(transaction.categoryColor).split(' ')[0]} rounded-lg flex items-center justify-center mr-3`}>
                                                <span className={`text-sm ${getCategoryColorClasses(transaction.categoryColor).split(' ')[1]}`}>
                                                    🚗
                                                </span>
                                            </div>
                                            <div className="space-y-1">
                                                {isEditing ? (
                                                    <>
                                                        <input
                                                            type="text"
                                                            className="bg-[#3a3a3a] border border-gray-600 rounded px-2 py-1 text-white text-xs w-44 focus:outline-none focus:ring-1 focus:ring-yellow-400"
                                                            value={editingTransaction?.title || ''}
                                                            placeholder="Title"
                                                            onChange={(e) => setEditingTransaction(prev => prev ? { ...prev, title: e.target.value } : prev)}
                                                        />
                                                        <input
                                                            type="text"
                                                            className="bg-[#3a3a3a] border border-gray-600 rounded px-2 py-1 text-white text-xs w-44 focus:outline-none focus:ring-1 focus:ring-yellow-400"
                                                            value={editingTransaction?.subTitle || ''}
                                                            placeholder="Subtitle"
                                                            onChange={(e) => setEditingTransaction(prev => prev ? { ...prev, subTitle: e.target.value } : prev)}
                                                        />
                                                    </>
                                                ) : (
                                                    <>
                                                        <div className="text-sm font-medium text-white">{transaction.title}</div>
                                                        <div className="text-sm text-gray-400">{transaction.subTitle}</div>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </td>
                                    {/* Category */}
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                className="bg-[#3a3a3a] border border-gray-600 rounded px-2 py-1 text-white text-xs w-32 focus:outline-none focus:ring-1 focus:ring-yellow-400"
                                                value={editingTransaction?.categoryName || ''}
                                                placeholder="Category"
                                                onChange={(e) => setEditingTransaction(prev => prev ? { ...prev, categoryName: e.target.value } : prev)}
                                            />
                                        ) : (
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColorClasses(transaction.categoryColor)}`}>
                                                {transaction.categoryName}
                                            </span>
                                        )}
                                    </td>
                                    {/* Account */}
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                        {isEditing ? (
                                            <select
                                                className="bg-[#3a3a3a] border border-gray-600 rounded px-2 py-1 text-white text-xs focus:outline-none focus:ring-1 focus:ring-yellow-400"
                                                value={editingTransaction?.accountName || ''}
                                                onChange={(e) => setEditingTransaction(prev => prev ? { ...prev, accountName: e.target.value } : prev)}
                                            >
                                                <option value="" disabled>Select account</option>
                                                {accounts.map(acc => (
                                                    <option key={acc.id} value={acc.name}>{acc.name}</option>
                                                ))}
                                            </select>
                                        ) : (
                                            transaction.accountName
                                        )}
                                    </td>
                                    {/* Amount */}
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        {isEditing ? (
                                            <input
                                                type="number"
                                                step="0.01"
                                                className="bg-[#3a3a3a] border border-gray-600 rounded px-2 py-1 text-white text-xs w-24 focus:outline-none focus:ring-1 focus:ring-yellow-400"
                                                value={editingTransaction?.amount ?? 0}
                                                onChange={(e) => setEditingTransaction(prev => prev ? { ...prev, amount: Number(e.target.value) } : prev)}
                                            />
                                        ) : (
                                            <span className={getAmountColorClasses(transaction.amountColor)}>
                                                {transaction.amount}
                                            </span>
                                        )}
                                    </td>
                                    {/* Actions */}
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <div className="flex space-x-2">
                                            {isEditing ? (
                                                <>
                                                    <button
                                                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-xs transition-colors"
                                                        onClick={() => {
                                                            handleSaveTransaction()
                                                            handleUpdateAccount()
                                                        }}
                                                    >
                                                        Save
                                                    </button>
                                                    <button
                                                        className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded text-xs transition-colors"
                                                        onClick={handleCancelEdit}
                                                    >
                                                        Cancel
                                                    </button>
                                                </>
                                            ) : (
                                                <>
                                                    <button
                                                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs transition-colors"
                                                        onClick={() => handleEditTransaction(transaction, index)}
                                                    >
                                                        Edit
                                                    </button>
                                                    <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs transition-colors">
                                                        Delete
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="px-6 py-4 border-t border-gray-700 flex items-center justify-between">
                <div className="text-sm text-gray-400">
                    Showing 1 to 10 of 127 transactions
                </div>
                <div className="flex space-x-2">
                    <button className="px-3 py-1 bg-[#3a3a3a] hover:bg-[#4a4a4a] text-white rounded text-sm transition-colors">
                        Previous
                    </button>
                    <button className="px-3 py-1 bg-yellow-500 text-black rounded text-sm">
                        1
                    </button>
                    <button className="px-3 py-1 bg-[#3a3a3a] hover:bg-[#4a4a4a] text-white rounded text-sm transition-colors">
                        2
                    </button>
                    <button className="px-3 py-1 bg-[#3a3a3a] hover:bg-[#4a4a4a] text-white rounded text-sm transition-colors">
                        3
                    </button>
                    <button className="px-3 py-1 bg-[#3a3a3a] hover:bg-[#4a4a4a] text-white rounded text-sm transition-colors">
                        Next
                    </button>
                </div>
            </div>
        </div>
    )
}