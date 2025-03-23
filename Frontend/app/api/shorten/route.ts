import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    // Debugging: Check if body is received
    const rawBody = await req.text();
    console.log("Received raw body:", rawBody);

    // Parse JSON manually
    let body;
    try {
      body = JSON.parse(rawBody);
    } catch (parseError) {
      console.error("JSON parsing error:", parseError);
      return NextResponse.json(
        { error: "Invalid JSON format" },
        { status: 400 }
      );
    }

    if (!body.original_url) {
      return NextResponse.json(
        { error: "Original URL is required" },
        { status: 400 }
      );
    }

    console.log(`Attempting to shorten URL: ${body.original_url}`);

    // Forward request to FastAPI backend
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/shorten`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ original_url: body.original_url }),
    });

    console.log(`Backend response status: ${response.status}`);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Backend error: ${response.status} - ${errorText}`);
      return NextResponse.json(
        { error: `Backend error: ${response.status} - ${errorText || "No details available"}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log(`Successfully shortened URL: ${data.short_url}`);

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}