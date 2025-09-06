import SideNav from '@/components/SideNav'
import MainChart from '@/components/finance/mainChart'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'


export default async function InvestmentSimulatorPage() {
  const supabase = await createClient()
  // Auth related logic
  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/auth/signin')
  }

  const user = data.user
  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white">
      <SideNav />
      <header className="bg-[#2a2a2a] border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-semibold">Investment Simulator</h1>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-[#2a2a2a] rounded-xl p-6 border border-gray-700 h-max">
          <MainChart userID={user.id}/>
        </div>
      </main>
      
    </div>
  )
}
