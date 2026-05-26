import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    // Parsing the incoming frontend request body
    const { name, email, phone, company, message } = await request.json();

    // ── 🎯 FIXED FORMSPREE PRODUCTION ROUTER PIPELINE ──
    // यूआरएल को पूरी तरह से ठीक कर दिया गया है
    const response = await fetch('https://formspree.io/f/mwvzrypb', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        "Lead Name": name,
        "Email ID": email,
        "Phone Number": phone,
        "Company Name": company,
        "Message Details": message
      }),
    });

    // If Formspree accepts the data cleanly, return a 200 OK to the browser
    if (response.ok) {
      return NextResponse.json({ success: true }, { status: 200 });
    }
    
    // Handles wrong/unverified form ID response codes from the upstream gateway
    return NextResponse.json({ success: false, message: 'Upstream rejection - Verify Form ID' }, { status: 502 });

  } catch (error) {
    // Catches network timeout errors or general script drops
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
  }
}