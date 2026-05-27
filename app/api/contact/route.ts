import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    // Parsing the incoming frontend request body
    const { name, email, phone, company, message } = await request.json();

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

    if (response.ok) {
      return NextResponse.json({ success: true }, { status: 200 });
    }
    
    return NextResponse.json({ success: false, message: 'Upstream rejection - Verify Form ID' }, { status: 502 });

  } catch (error) {
  
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
  }
}
