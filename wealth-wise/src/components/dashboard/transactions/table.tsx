'use client'
import { createClient } from "@/utils/supabase/client"
import { useState, useEffect } from "react"

interface TransactionProps {
    transactions: {
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
        accountID: string
        accountName: string
    }[]
}
export default function TransactionsTable({ transactions }: TransactionProps) {
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
        },
        {
            date: "Dec 14, 2024",
            title: "Restaurant",
            subtitle: "Dinner with friends",
            category: "Food & Dining",
            categoryColor: "red",
            account: "Credit Card",
            amount: "-$87.50",
            amountColor: "red",
            icon: "🍔"
        },
        {
            date: "Dec 13, 2024",
            title: "Gas Station",
            subtitle: "Weekly fuel",
            category: "Transportation",
            categoryColor: "blue",
            account: "Debit Card",
            amount: "-$45.00",
            amountColor: "red",
            icon: "🚗"
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
                        {transactions.map((transaction, index) => (
                            <tr key={index} className="hover:bg-[#3a3a3a] transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                    {transaction.date}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        {/* <div className={`w-8 h-8 ${getCategoryColorClasses(transaction.categoryColor).split(' ')[0]} rounded-lg flex items-center justify-center mr-3`}>
                                            <span className={`text-sm ${getCategoryColorClasses(transaction.categoryColor).split(' ')[1]}`}>
                                                {transaction.icon}
                                            </span>
                                        </div> */}
                                        <div>
                                            <div className="text-sm font-medium text-white">{transaction.title}</div>
                                            {/* <div className="text-sm text-gray-400">{transaction.subtitle}</div> */}
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium`}>
                                        {transaction.category}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                    {transaction.accountName}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <span >
                                        {transaction.amount}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    <div className="flex space-x-2">
                                        <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs transition-colors">
                                            Edit
                                        </button>
                                        <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs transition-colors">
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {sampleTransactions.map((transaction, index) => (
                            <tr key={index} className="hover:bg-[#3a3a3a] transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                    {transaction.date}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className={`w-8 h-8 ${getCategoryColorClasses(transaction.categoryColor).split(' ')[0]} rounded-lg flex items-center justify-center mr-3`}>
                                            <span className={`text-sm ${getCategoryColorClasses(transaction.categoryColor).split(' ')[1]}`}>
                                                {transaction.icon}
                                            </span>
                                        </div>
                                        <div>
                                            <div className="text-sm font-medium text-white">{transaction.title}</div>
                                            <div className="text-sm text-gray-400">{transaction.subtitle}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColorClasses(transaction.categoryColor)}`}>
                                        {transaction.category}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                    {transaction.account}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <span className={getAmountColorClasses(transaction.amountColor)}>
                                        {transaction.amount}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    <div className="flex space-x-2">
                                        <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs transition-colors">
                                            Edit
                                        </button>
                                        <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs transition-colors">
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
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