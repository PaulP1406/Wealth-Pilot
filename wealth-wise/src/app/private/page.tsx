import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/utils/supabase/server'

export default async function PrivatePage() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/auth/signin')
  }

  const user = data.user

  const handleSignOut = async () => {
    'use server'
    const supabase = await createClient()
    await supabase.auth.signOut()
    redirect('/')
  }

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white">
      {/* Header */}
      <header className="bg-[#2a2a2a] border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-yellow-400 rounded-lg flex items-center justify-center mr-3">
                <span className="text-black font-bold text-lg">W</span>
              </div>
              <span className="text-xl font-semibold">WealthWise</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-300">Welcome, {user.email}</span>
              <form action={handleSignOut}>
                <button
                  type="submit"
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors text-sm"
                >
                  Sign Out
                </button>
              </form>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
          <p className="text-gray-400">Welcome back! Here's your financial overview.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-[#2a2a2a] rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Balance</p>
                <p className="text-2xl font-bold text-white">$12,459.32</p>
              </div>
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                <span className="text-green-400 text-xl">💰</span>
              </div>
            </div>
            <p className="text-green-400 text-sm mt-2">+12.5% from last month</p>
          </div>

          <div className="bg-[#2a2a2a] rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Monthly Savings</p>
                <p className="text-2xl font-bold text-white">$2,340.00</p>
              </div>
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <span className="text-blue-400 text-xl">📈</span>
              </div>
            </div>
            <p className="text-blue-400 text-sm mt-2">Goal: $3,000</p>
          </div>

          <div className="bg-[#2a2a2a] rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Investments</p>
                <p className="text-2xl font-bold text-white">$8,920.15</p>
              </div>
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <span className="text-purple-400 text-xl">📊</span>
              </div>
            </div>
            <p className="text-purple-400 text-sm mt-2">+8.2% this week</p>
          </div>

          <div className="bg-[#2a2a2a] rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Expenses</p>
                <p className="text-2xl font-bold text-white">$1,829.45</p>
              </div>
              <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center">
                <span className="text-red-400 text-xl">💳</span>
              </div>
            </div>
            <p className="text-red-400 text-sm mt-2">This month</p>
          </div>
        </div>

        {/* Recent Activity & Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activity */}
          <div className="bg-[#2a2a2a] rounded-xl p-6 border border-gray-700">
            <h2 className="text-xl font-semibold mb-4 text-yellow-400">Recent Activity</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-gray-700 last:border-b-0">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-green-500/20 rounded-lg fl7ex items-center justify-center mr-3">
                    <span className="text-green-400">+</span>
                  </div>
                  <div>
                    <p className="text-white font-medium">Salary Deposit</p>
                    <p className="text-gray-400 text-sm">Today, 2:30 PM</p>
                  </div>
                </div>
                <span className="text-green-400 font-semibold">+$4,200.00</span>
              </div>

              <div className="flex items-center justify-between py-3 border-b border-gray-700 last:border-b-0">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-red-400">-</span>
                  </div>
                  <div>
                    <p className="text-white font-medium">Grocery Shopping</p>
                    <p className="text-gray-400 text-sm">Yesterday, 6:45 PM</p>
                  </div>
                </div>
                <span className="text-red-400 font-semibold">-$127.50</span>
              </div>

              <div className="flex items-center justify-between py-3">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-blue-400">↗</span>
                  </div>
                  <div>
                    <p className="text-white font-medium">Investment Return</p>
                    <p className="text-gray-400 text-sm">2 days ago</p>
                  </div>
                </div>
                <span className="text-blue-400 font-semibold">+$89.32</span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-[#2a2a2a] rounded-xl p-6 border border-gray-700">
            <h2 className="text-xl font-semibold mb-4 text-yellow-400">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-4">
              <button className="bg-yellow-400 text-black font-semibold py-4 px-4 rounded-lg hover:bg-yellow-500 transition-colors text-center">
                <div className="text-xl mb-1">+</div>
                Add Transaction
              </button>
              
              <button className="bg-[#3a3a3a] border border-gray-600 text-white font-semibold py-4 px-4 rounded-lg hover:bg-[#4a4a4a] transition-colors text-center">
                <div className="text-xl mb-1">🎯</div>
                Set Goal
              </button>
              
              <button className="bg-[#3a3a3a] border border-gray-600 text-white font-semibold py-4 px-4 rounded-lg hover:bg-[#4a4a4a] transition-colors text-center">
                <div className="text-xl mb-1">📊</div>
                View Reports
              </button>
              
              <button className="bg-[#3a3a3a] border border-gray-600 text-white font-semibold py-4 px-4 rounded-lg hover:bg-[#4a4a4a] transition-colors text-center">
                <div className="text-xl mb-1">⚙️</div>
                Settings
              </button>
            </div>
          </div>
        </div>

        {/* User Account Info */}
        <div className="mt-8 bg-[#2a2a2a] rounded-xl p-6 border border-gray-700">
          <h2 className="text-xl font-semibold mb-4 text-yellow-400">Account Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <span className="text-gray-400 font-medium">Email:</span>
              <span className="ml-2 text-white">{user.email}</span>
            </div>
            <div>
              <span className="text-gray-400 font-medium">User ID:</span>
              <span className="ml-2 text-white font-mono text-sm bg-[#3a3a3a] px-2 py-1 rounded">
                {user.id}
              </span>
            </div>
            <div>
              <span className="text-gray-400 font-medium">Account Created:</span>
              <span className="ml-2 text-white">
                {new Date(user.created_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
            </div>
            <div>
              <span className="text-gray-400 font-medium">Account Status:</span>
              <span className="ml-2 text-green-400 font-semibold">Active</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}