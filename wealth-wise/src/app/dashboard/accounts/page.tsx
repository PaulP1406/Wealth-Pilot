'use client'
import { createClient } from '@/utils/supabase/client'
import { redirect } from 'next/navigation'
import { use, useEffect, useState } from 'react'

// Components
import { AccountTable } from '@/components/dashboard/accounts/account_table'
import { EmptyAccountsState } from '@/components/dashboard/accounts/empty_state'
import { AccountHeader } from '@/components/dashboard/accounts/header'
import { SummaryCards } from '@/components/dashboard/accounts/summary_cards'
import { UserInfoCard } from '@/components/dashboard/accounts/user_info'

export default async function AccountManagementPage() {
    const [loading, setLoading] = useState(false)
    const supabase = createClient()

    let user = null

    useEffect(() => {
        const fetchUser = async () => {
        const { data, error } = await supabase.auth.getUser()
        if (error || !data?.user) {
            redirect('/auth/signin')
        }
            user = data.user
        }
        const fetchData = async () => {
        setLoading(true)
        const { data, error } = await supabase
            .from('accounts')
            .select('*')
        if (error) {
            console.error('Error fetching accounts:', error)
        }
        setLoading(false)
        }
        fetchData()
        fetchUser()
    }, [supabase])
    
    return (
        <div>
        <h1>Account Management</h1>
        {loading && <p>Loading...</p>}
        </div>
    )
}