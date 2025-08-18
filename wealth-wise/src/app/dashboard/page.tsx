import Link from 'next/link'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { BalanceCard } from '@/components/dashboard/balance_card'
import { UpcomingPaymentsCard } from '@/components/dashboard/upcoming_payments'
import { ExpensesCard } from '@/components/dashboard/expenses_chart'
import { RecentTransactionsCard } from '@/components/dashboard/recent_transactions'

// overlay components
import AddAccountModal from '@/components/dashboard/AddAccountModal'

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

export default async function DashBoard(
  { searchParams }: { searchParams: { modal?: string } }
) {
  const supabase = await createClient()

  // Auth related logic
  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/auth/signin')
  }

  const user = data.user
  // Await searchParams before using its properties
  const params = await searchParams;
  const isAccountModalOpen = params.modal === 'add-account'; // check if the overlay should be open based on URL

  const handleSignOut = async () => {
    'use server'
    const supabase = await createClient()
    await supabase.auth.signOut()
    redirect('/')
  }

  // Accounts data fetching
  const { data: accountsData, error: accountError } = await supabase
    .from('accounts')
    .select('*')
    .eq('user_id', user.id)
  if (accountError) {
    console.error('Error fetching account data:', accountError)
    return <div>Error loading account data</div>
  }
  console.log('User ID:', user.id);
  console.log('Accounts Data:', accountsData);
  

  const totalBalance = accountsData.reduce(
  (sum, account) => sum + Number(account.balance ?? 0),
    0
  );

  const balanceString = `$${totalBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  const accounts = accountsData?.map(account => ({
    name: account.name,
    balance: `$${Number(account.balance).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
    account: account.account ?? '', 
    active: true
  })) ?? [];

  // Transactions data fetching
  const { data: transactionsData, error: transactionsError } = await supabase
    .from('transactions')
    .select('*')
    .eq('user_id', user.id)
    .limit(5)
  if (transactionsError) {
    console.error('Error fetching transactions data:', transactionsError)
    return <div>Error loading transactions data</div>
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
        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Balance */}
          <div className="lg:col-span-2">
            <BalanceCard balance={balanceString} accounts={accounts} />
          </div>

          {/* Right Column - Payments and Expenses */}
          <div className="space-y-6">
            <UpcomingPaymentsCard 
              name="Henry Rogers"
              account="5995 VISA"
              amount="$1,200.00"
              type="unregular payment"
            />
            <ExpensesCard />
            <RecentTransactionsCard transactions={transactionsData} />
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
          </div>
        </div>
      </main>
      <AddAccountModal isOpen={isAccountModalOpen} userId={user.id} />
    </div>
  )
}

