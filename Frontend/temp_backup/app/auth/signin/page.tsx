'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import LoginButton from '@/components/LoginButton'

export default function SignIn() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    // Redirect to home if already authenticated
    if (status === 'authenticated') {
      router.push('/')
    }
  }, [status, router])

  if (status === 'loading') {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-pulse">Loading...</div>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Sign in to ChinnaBit</h1>
        
        <div className="space-y-4">
          <p className="text-center text-gray-600 mb-4">
            Sign in to create and manage your shortened URLs
          </p>
          
          <div className="flex justify-center">
            <LoginButton />
          </div>
        </div>
      </div>
    </div>
  )
}