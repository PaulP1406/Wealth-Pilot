'use client'
import { useState } from "react"

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

interface ExpensesCardProps {
  transactions: Transaction[]
}
export function ExpensesCard({ transactions }: ExpensesCardProps) {
  // Derived metrics from incoming transactions
  const expenseTransactions = (transactions || []).filter(
    (t) => (t.type || '').toLowerCase() === 'expense'
  )

  // 1) Total amount of expenses
  const totalExpenses = expenseTransactions.reduce(
    (sum, t) => sum + Number(t.amount || 0),
    0
  )

  // 2) Expenses per category (sum amounts grouped by categoryName)
  const expensesByCategoryMap: Record<string, number> = {}
  for (const t of expenseTransactions) {
    const key = t.categoryName || 'Uncategorized'
    expensesByCategoryMap[key] = (expensesByCategoryMap[key] || 0) + Number(t.amount || 0)
  }

  const expensesByCategory = Object.entries(expensesByCategoryMap)
    .map(([category, total]) => ({ category, total }))
    .sort((a, b) => b.total - a.total)

  // Optional: percentages for a chart legend
  const expensesWithPercent = expensesByCategory.map((item) => ({
    ...item,
    percentage: totalExpenses > 0 ? (item.total / totalExpenses) * 100 : 0,
  }))

  // Color palette for legend items
  const colorPalette = ['#fbbf24', '#10b981', '#8b5cf6', '#ef4444', '#06b6d4', '#eab308', '#22c55e', '#f43f5e', '#6366f1', '#475569']
  const chartExpenses = expensesWithPercent.length
    ? expensesWithPercent.map((e, idx) => ({
        category: e.category,
        percentage: Math.round(e.percentage),
        color: colorPalette[idx % colorPalette.length],
      }))
    : [
        { category: 'Rent', percentage: 43, color: '#fbbf24' },
        { category: 'Food', percentage: 12, color: '#10b981' },
        { category: 'Entertainment', percentage: 8, color: '#8b5cf6' },
        { category: 'Other', percentage: 37, color: '#6b7280' },
      ]

  return (
    <div className="bg-[#2a2a2a] rounded-xl p-6 border border-[#3a3a3a] h-fit">
      <h3 className="text-xl font-semibold text-white mb-6">Expenses</h3>
      
      {/* Pie Chart Placeholder - You can integrate with a chart library */}
      <div className="flex items-center justify-center mb-6">
        <div className="relative w-32 h-32">
          <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
            <circle
              cx="60"
              cy="60"
              r="50"
              fill="none"
              stroke="#1a1a1a"
              strokeWidth="20"
            />
            {/* Rent - 43% */}
            <circle
              cx="60"
              cy="60"
              r="50"
              fill="none"
              stroke="#fbbf24"
              strokeWidth="20"
              strokeDasharray={`${43 * 3.14} ${(100 - 43) * 3.14}`}
              strokeDashoffset="0"
            />
            {/* Food - 12% */}
            <circle
              cx="60"
              cy="60"
              r="50"
              fill="none"
              stroke="#10b981"
              strokeWidth="20"
              strokeDasharray={`${12 * 3.14} ${(100 - 12) * 3.14}`}
              strokeDashoffset={`-${43 * 3.14}`}
            />
          </svg>
        </div>
      </div>
      
      {/* Legend */}
      <div className="space-y-3">
  {chartExpenses.map((expense, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: expense.color }}
              ></div>
              <span className="text-gray-300 text-sm">{expense.category}</span>
            </div>
            <span className="text-white font-semibold text-sm">{expense.percentage}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}