'use client'
import { createClient } from '@/utils/supabase/client'
import { use, useEffect, useState } from 'react'

export default async function AccountManagementPage() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const supabase = createClient()

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const { data, error } = await supabase
        .from('accounts')
        .select('*')
      if (error) {
        setError(error.message)
      }
      setLoading(false)
    }
    fetchData()
  }, [supabase])

  return (
    <div>
      <h1>Account Management</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
    </div>
  )
}