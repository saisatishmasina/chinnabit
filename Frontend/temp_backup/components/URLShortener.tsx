'use client'

import { useState } from 'react'
import axios from 'axios'

interface URLShortenerProps {
  onShorten: (shortUrl: string) => void
}

export default function URLShortener({ onShorten }: URLShortenerProps) {
  const [originalUrl, setOriginalUrl] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!originalUrl) {
      setError('Please enter a URL')
      return
    }

    // Basic URL validation
    try {
      new URL(originalUrl)
    } catch (err) {
      setError('Please enter a valid URL')
      return
    }

    setError(null)
    setIsLoading(true)

    try {
      const response = await axios.post('/api/shorten', {
        original_url: originalUrl
      })
      
      if (response.data && response.data.short_url) {
        onShorten(response.data.short_url)
        setOriginalUrl('')
      } else {
        setError('Failed to create short URL')
      }
    } catch (err) {
      console.error('Error shortening URL:', err)
      setError('Failed to create short URL')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-1">
            Enter a long URL
          </label>
          <input
            type="text"
            id="url"
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
            placeholder="https://example.com/very/long/url"
            className="input-field"
            disabled={isLoading}
          />
          {error && (
            <p className="mt-1 text-sm text-red-600">
              {error}
            </p>
          )}
        </div>
        
        <button
          type="submit"
          className="btn-primary w-full"
          disabled={isLoading}
        >
          {isLoading ? 'Shortening...' : 'Shorten URL'}
        </button>
      </form>
    </div>
  )
}