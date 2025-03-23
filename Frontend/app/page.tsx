'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import URLShortener from '../components/URLShortener'
import LoginButton from '../components/LoginButton'

export default function Home() {
  const { data: session, status } = useSession()
  const [shortUrl, setShortUrl] = useState<string | null>(null)

  return (
    <div className="flex flex-col items-center justify-center gap-8 py-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">ChinnaBit URL Shortener</h1>
        <p className="text-xl text-gray-600 max-w-2xl">
          Make your long URLs short and easy to share
        </p>
      </div>

      {status === 'loading' ? (
        <div className="animate-pulse text-center">Loading...</div>
      ) : session ? (
        <div className="w-full max-w-md">
          <URLShortener onShorten={(url) => setShortUrl(url)} />
          
          {shortUrl && (
            <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded">
              <h3 className="text-lg font-medium text-green-800 mb-2">URL Generated!</h3>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={`http://cibit.duckdns.org/${shortUrl}`}
                  readOnly
                  className="input-field text-sm bg-white"
                />
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(`http://cibit.duckdns.org/${shortUrl}`)
                    alert('Copied to clipboard!')
                  }}
                  className="btn-secondary text-sm"
                >
                  Copy
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center p-8 bg-gray-50 rounded-lg shadow-sm flex flex-col items-center justify-center">
          <h2 className="text-xl font-semibold mb-4">Sign in to Create Short URLs</h2>
          <p className="text-gray-600 mb-6">
            Create an account or sign in to start shortening your URLs
          </p>
          <LoginButton />
        </div>
      )}
    </div>
  )
}