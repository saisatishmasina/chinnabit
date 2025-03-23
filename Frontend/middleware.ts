import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const { pathname, host } = request.nextUrl;
  
  console.log(`🔍 Middleware processing: ${pathname}`);

  // Skip middleware for Next.js static assets, API routes, and home
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/auth') ||
    pathname === '/' ||
    pathname === '/favicon.ico'
  ) {
    console.log(`✅ Bypassing middleware for: ${pathname}`);
    return NextResponse.next();
  }

  // Extract the short code from the URL
  const shortCode = pathname.slice(1); // Remove leading "/"
  
  // Define your actual backend API URL that resolves short links
  const backendAPI = `${process.env.BACKEND_URL}/${shortCode}`;

  try {
    // Fetch the actual redirect URL from the backend
    const res = await fetch(backendAPI);
    if (!res.ok) {
      console.error(`❌ Backend returned error for: ${shortCode}`);
      return NextResponse.redirect('/');
    }

    // Get raw text before parsing
    const text = await res.text();
    console.log("Raw API Response:", text);

    try {
      const data = JSON.parse(text); // Manually parse JSON
      console.log("Parsed JSON:", data);
      
      const originalUrl = data.original_url; // Use correct key
      console.log("Extracted Original URL:", originalUrl);
      
      if (!originalUrl) {
        console.error(`⚠️ No destination found for: ${shortCode}`);
        return NextResponse.redirect('/');
      }

      return NextResponse.redirect(originalUrl);
    } catch (error) {
      console.error("❌ JSON Parsing Error:", error);
      return NextResponse.redirect('/');
    }

  }catch(error: any){
    console.error(`❌ Error fetching backend URL: ${error.message}`);
    return NextResponse.redirect('/');
  }
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};