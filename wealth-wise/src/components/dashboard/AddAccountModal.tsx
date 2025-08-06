'use client'

import { useRouter } from 'next/navigation'
import Overlay from '@/components/reusable/overlay'
import AddAccountForm from '@/components/dashboard/add_account'

interface AddAccountModalProps {
  isOpen: boolean;
  userId: string;
}

export default function AddAccountModal({ isOpen, userId }: AddAccountModalProps) {
  const router = useRouter()

  const handleClose = () => {
    router.push('/dashboard')
  }

  return (
    <Overlay isOpen={isOpen} onClose={handleClose}>
      <AddAccountForm userId={userId} onClose={handleClose} />
    </Overlay>
  )
}