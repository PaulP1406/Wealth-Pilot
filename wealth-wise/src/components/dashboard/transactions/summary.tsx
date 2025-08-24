'use client'
import { createClient } from '@/utils/supabase/client'
import { useEffect, useState } from 'react'

interface TransactionsSummaryProps {
    userID: string | undefined
}

export default function TransactionsSummary({ userID }: TransactionsSummaryProps) {
    const [totalIncome, setTotalIncome] = useState(0)
    const [totalExpenses, setTotalExpenses] = useState(0)
    const [netFlow, setNetFlow] = useState(0)
    const [transactionCount, setTransactionCount] = useState(0)

    const supabase = createClient()
    useEffect(() => {
        if (userID) {
            fetchAccountInsights(userID)
        }
    }, [userID])

    const fetchAccountInsights = async (userID: string) => {
        const { data: accountsData, error: accountError } = await supabase
            .from('transactions')
            .select('*')
            .eq('user_id', userID)
        if (accountError) {
            console.error('Error fetching account data:', accountError)
            return <div>Error loading account data</div>
        }
        console.log('transactions', accountsData)
        const totalIncome = accountsData.filter(tx => tx.type === 'income').reduce((sum, tx) => sum + Number(tx.amount ?? 0), 0);
        const totalExpenses = accountsData.filter(tx => tx.type === 'expense').reduce((sum, tx) => sum + Number(tx.amount ?? 0), 0);
        const netFlow = totalIncome - totalExpenses;
        const transactionCount = accountsData.length;

        setTotalIncome(totalIncome);
        setTotalExpenses(totalExpenses);
        setNetFlow(netFlow);
        setTransactionCount(transactionCount);
    }
    const summaryData = [
        {
            title: "Total Income",
            amount: `$${totalIncome.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
            color: "green",
            icon: "📈"
        },
        {
            title: "Total Expenses",
            amount: `$${totalExpenses.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
            color: "red",
            icon: "📉"
        },
        {
            title: "Net Flow",
            amount: `$${netFlow.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
            color: "yellow",
            icon: "💰"
        },
        {
            title: "Transactions",
            amount: `${transactionCount}`,
            color: "blue",
            icon: "📊"
        }
    ]

    const getColorClasses = (color: string) => {
        const colors = {
            green: "text-green-400 bg-green-500/20",
            red: "text-red-400 bg-red-500/20",
            yellow: "text-yellow-400 bg-yellow-500/20",
            blue: "text-blue-400 bg-blue-500/20"
        }
        return colors[color as keyof typeof colors]
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {summaryData.map((item, index) => (
                <div key={index} className="bg-[#2a2a2a] rounded-xl p-6 border border-gray-700">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-400 text-sm">{item.title}</p>
                            <p className={`text-2xl font-bold ${item.color === 'blue' ? 'text-white' : getColorClasses(item.color).split(' ')[0]}`}>
                                {item.amount}
                            </p>
                        </div>
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getColorClasses(item.color).split(' ')[1]}`}>
                            <span className={`text-xl ${getColorClasses(item.color).split(' ')[0]}`}>
                                {item.icon}
                            </span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}