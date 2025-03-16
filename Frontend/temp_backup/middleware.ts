import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Skip for Next.js specific paths and API routes
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/auth') ||
    pathname === '/' ||
    pathname === '/favicon.ico'
  ) {
    return NextResponse.next()
  }
  
  // Extract short URL code from the pathname (it's the entire pathname)
  const shortCode = pathname.slice(1) // Remove leading "/"
  
  if (shortCode) {
    // Check if there's a corresponding original URL in the backend
    try {
      // Redirect to the original URL
      return NextResponse.redirect(`http://localhost:8000/${shortCode}`)
    } catch (error) {
      console.error('Error redirecting:', error)
      // Let Next.js handle it - it will show a 404 if no route matches
      return NextResponse.next()
    }
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}