import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../auth/[...nextauth]/route'

export async function POST(req: NextRequest) {
  // Check authentication
  const session = await getServerSession(authOptions)
  
  if (!session) {
    return NextResponse.json(
      { error: 'You must be signed in to shorten URLs' },
      { status: 401 }
    )
  }

  try {
    const body = await req.json()
    
    if (!body.original_url) {
      return NextResponse.json(
        { error: 'Original URL is required' },
        { status: 400 }
      )
    }

    // Forward the request to the backend API
    const response = await fetch('http://localhost:8000/shorten', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        original_url: body.original_url,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      return NextResponse.json(
        { error: errorData.detail || 'Failed to create short URL' },
        { status: response.status }
      )
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error shortening URL:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}