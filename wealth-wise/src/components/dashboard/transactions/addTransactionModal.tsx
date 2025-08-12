'use client'
import { useState } from 'react'

interface AddTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddTransactionModal({ isOpen, onClose }: AddTransactionModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#2a2a2a] rounded-xl p-6 max-w-md w-full mx-4 border border-gray-700">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-white">Add Transaction</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>

        <form className="space-y-4">
          {/* Transaction Type */}
          <div>
            <label className="block text-white mb-2 text-sm font-medium">
              Transaction Type
            </label>
            <select className="w-full px-3 py-2 bg-[#3a3a3a] border border-gray-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-yellow-400">
              <option value="">Select type</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
              <option value="transfer">Transfer</option>
            </select>
          </div>

          {/* Title */}
          <div>
            <label className="block text-white mb-2 text-sm font-medium">
              Title
            </label>
            <input
              type="text"
              placeholder="e.g. Grocery Shopping"
              className="w-full px-3 py-2 bg-[#3a3a3a] border border-gray-600 rounded text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-white mb-2 text-sm font-medium">
              Description
            </label>
            <input
              type="text"
              placeholder="e.g. Weekly groceries at Walmart"
              className="w-full px-3 py-2 bg-[#3a3a3a] border border-gray-600 rounded text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          {/* Amount */}
          <div>
            <label className="block text-white mb-2 text-sm font-medium">
              Amount
            </label>
            <input
              type="number"
              step="0.01"
              placeholder="0.00"
              className="w-full px-3 py-2 bg-[#3a3a3a] border border-gray-600 rounded text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-white mb-2 text-sm font-medium">
              Category
            </label>
            <select className="w-full px-3 py-2 bg-[#3a3a3a] border border-gray-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-yellow-400">
              <option value="">Select category</option>
              <option value="food">Food & Dining</option>
              <option value="transport">Transportation</option>
              <option value="shopping">Shopping</option>
              <option value="entertainment">Entertainment</option>
              <option value="bills">Bills & Utilities</option>
              <option value="health">Health & Fitness</option>
              <option value="salary">Salary</option>
              <option value="freelance">Freelance</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Account */}
          <div>
            <label className="block text-white mb-2 text-sm font-medium">
              Account
            </label>
            <select className="w-full px-3 py-2 bg-[#3a3a3a] border border-gray-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-yellow-400">
              <option value="">Select account</option>
              <option value="checking">Main Checking</option>
              <option value="savings">Savings Account</option>
              <option value="credit">Credit Card</option>
              <option value="cash">Cash</option>
            </select>
          </div>

          {/* Date */}
          <div>
            <label className="block text-white mb-2 text-sm font-medium">
              Date
            </label>
            <input
              type="date"
              className="w-full px-3 py-2 bg-[#3a3a3a] border border-gray-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          {/* Buttons */}
          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 rounded transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-black py-2 rounded transition-colors font-medium"
            >
              Add Transaction
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}