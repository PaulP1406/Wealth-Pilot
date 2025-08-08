'use client'
import { createClient } from '@/utils/supabase/client'
import { redirect } from 'next/navigation'
import { use, useEffect, useState } from 'react'
import type { User } from '@supabase/supabase-js'

// Components
import { AccountTable } from '@/components/dashboard/accounts/account_table'
import { EmptyAccountsState } from '@/components/dashboard/accounts/empty_state'
import { AccountHeader } from '@/components/dashboard/accounts/header'
import { SummaryCards } from '@/components/dashboard/accounts/summary_cards'
import { UserInfoCard } from '@/components/dashboard/accounts/user_info'

type Account = {
    id: string;
    name: string;
    balance: number;
    account?: string;
};

export default function AccountManagementPage() {
    const [loading, setLoading] = useState(false)
    

    const [user, setUser] = useState<User | undefined>()
    const [accountsData, setAccountsData] = useState<Account[]>([])
    const supabase = createClient()

    useEffect(() => {
        const fetchData = async () => {
            const { data: userData, error } = await supabase.auth.getUser()
            if (error || !userData?.user) {
                redirect('/auth/signin')
                return
            }
            setUser(userData.user)            
            setLoading(true)        
            const { data, error: accountsError } = await supabase
                .from('accounts')
                .select('*')
                .eq('user_id', userData.user.id)
            if (accountsError) {
                console.error('Error fetching accounts:', accountsError)
            }            
            setAccountsData(data || []) // if data if not empty array
            setLoading(false)
        }
        fetchData()        
    }, [supabase])

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

    const accountsExist = accounts.length || 0;
    
    const deleteAccount = async (accountId: string) => {
        if (!user?.id) return;
        setLoading(true);
        const { error } = await supabase
            .from('accounts')
            .delete()
            .eq('name', accountId)
            .eq('user_id', user.id);
        if (error) {
            console.error('Error deleting account:', error);
        } else {
            setAccountsData(accountsData.filter(account => account.id !== accountId));
        }
        console.log('im here')
        setLoading(false);
    }
    return (
        <div className="min-h-screen bg-[#1a1a1a] text-white">
        <AccountHeader balance={balanceString} />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <SummaryCards balance={balanceString} accounts={accounts} />
            <AccountTable balance={balanceString} accounts={accounts} onDeleteAccount={deleteAccount} />
            {/* Or use <EmptyAccountsState /> if no accounts */}
            <UserInfoCard />
        </main>
    </div>
    )
}