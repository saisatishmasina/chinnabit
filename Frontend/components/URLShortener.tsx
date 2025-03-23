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
      console.log("Submitting URL for shortening:", originalUrl);
      
      // Using API route to proxy the request
      const response = await fetch('/api/shorten', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          original_url: originalUrl
        }),
      });
      
      console.log("API response status:", response.status);
      const data = await response.json();
      console.log("API response data:", data);
      
      if (response.ok && data.short_url) {
        console.log("Successfully shortened URL:", data.short_url);
        onShorten(data.short_url);
        setOriginalUrl('');
      } else {
        console.error("Error response:", data);
        setError(data.error || 'Failed to create short URL');
      }
    } catch (err: any) {
      console.error('Error shortening URL:', err);
      setError(`Failed to create short URL: ${err.message || 'Unknown error'}`);
    } finally {
      setIsLoading(false);
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
