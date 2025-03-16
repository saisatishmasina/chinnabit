import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { headers } from 'next/headers'

export async function POST(req: NextRequest) {
  // Skip authentication check for now - we'll implement this later
  // const session = await getServerSession()
  
  // if (!session) {
  //   return NextResponse.json(
  //     { error: 'You must be signed in to shorten URLs' },
  //     { status: 401 }
  //   )
  // }

  try {
    const body = await req.json()
    
    if (!body.original_url) {
      return NextResponse.json(
        { error: 'Original URL is required' },
        { status: 400 }
      )
    }

    // Forward the request to the backend API
    const backendUrl = 'http://127.0.0.1:8000';
    console.log(`Sending request to backend: ${backendUrl}/shorten`);
    
    const response = await fetch(`${backendUrl}/shorten`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        original_url: body.original_url,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ detail: 'Failed to parse error response' }));
      console.error('Backend error response:', errorData);
      return NextResponse.json(
        { error: errorData.detail || 'Failed to create short URL' },
        { status: response.status }
      )
    }

    const data = await response.json();
    console.log('Received data from backend:', data);
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error shortening URL:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}