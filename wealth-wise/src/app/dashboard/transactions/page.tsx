'use client'
import { useState } from 'react'
import {createClient } from '@/utils/supabase/client'

export default async function transactionsPage() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const supabase = createClient()
    
        

    return (
        <div>
        <h1>Transactions</h1>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        </div>
    )
}