'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'


interface AddAccountFormProps {
  userId: string;
  onClose: () => void;
}

export default function AddAccountForm({ userId, onClose }: AddAccountFormProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const formData = new FormData(e.currentTarget)
    const supabase = createClient()

    const { error } = await supabase
        .from('accounts')
        .insert({
            user_id: userId,
            name: formData.get('name') as string,
            balance: Number(formData.get('balance')),
        }
        )

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      onClose() // Close the modal
      router.refresh() // Refresh the page to show new data
    }
  }

  return (
    <div>
      {error && (
        <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-2 rounded mb-4 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-white mb-2 text-sm font-medium">Account Name</label>
          <input
            type="text"
            name="name"
            required
            className="w-full px-3 py-2 bg-[#3a3a3a] border border-gray-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
            placeholder="e.g. Main Checking"
          />
        </div>

        <div>
          <label className="block text-white mb-2 text-sm font-medium">Account Number</label>
          <input
            type="text"
            name="account"
            className="w-full px-3 py-2 bg-[#3a3a3a] border border-gray-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
            placeholder="e.g. 1234"
          />
        </div>

        <div>
          <label className="block text-white mb-2 text-sm font-medium">Initial Balance</label>
          <input
            type="number"
            name="balance"
            step="0.01"
            required
            className="w-full px-3 py-2 bg-[#3a3a3a] border border-gray-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
            placeholder="0.00"
          />
        </div>

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
            disabled={loading}
            className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-black py-2 rounded transition-colors disabled:opacity-50"
          >
            {loading ? 'Adding...' : 'Add Account'}
          </button>
        </div>
      </form>
    </div>
  )
}