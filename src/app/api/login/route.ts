import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { userContact } from '@/db/schema';
import { eq, or } from 'drizzle-orm';
import { sendLoginSMS } from '@/lib/twilio';

function withCORS(response: Response) {
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'POST,OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type');
  return response;
}

export async function POST(req: NextRequest) {
  const { email, phone } = await req.json();
  if (!email || !phone) {
    return withCORS(NextResponse.json({ error: 'Email and phone are required.' }, { status: 400 }));
  }
  try {
    // Check if user already exists by email or phone
    let contact = db.select().from(userContact)
      .where(or(eq(userContact.email, email), eq(userContact.phone, phone)))
      .get();
    if (!contact) {
      // Create new user if not found
      contact = db.insert(userContact).values({ email, phone }).returning().get();
    }
    // Always trigger SMS
    await sendLoginSMS(contact.email, contact.phone);
    return withCORS(NextResponse.json(contact, { status: 200 }));
  } catch (error: unknown) {
    return withCORS(NextResponse.json({ error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 }));
  }
}

export async function OPTIONS() {
  return withCORS(new NextResponse(null, { status: 204 }));
} 