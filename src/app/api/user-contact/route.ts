export const runtime = "nodejs";
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { userContact } from '@/db/schema';
import { eq, or, desc } from 'drizzle-orm';

function withCORS(response: Response) {
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
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
    const contact = db.select().from(userContact)
      .where(or(eq(userContact.email, email), eq(userContact.phone, phone)))
      .get();
    if (contact) {
      // User already exists, return success
      return withCORS(NextResponse.json(contact, { status: 200 }));
    }
    // Create new user if not found
    const inserted = db.insert(userContact).values({ email, phone }).returning().get();
    return withCORS(NextResponse.json(inserted, { status: 201 }));
  } catch (error: unknown) {
    return withCORS(NextResponse.json({ error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 }));
  }
}

export async function GET() {
  try {
    const contacts = db.select().from(userContact).orderBy(desc(userContact.createdAt)).all();
    return withCORS(NextResponse.json(contacts));
  } catch (error: unknown) {
    return withCORS(NextResponse.json({ error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 }));
  }
}

export async function OPTIONS() {
  return withCORS(new NextResponse(null, { status: 204 }));
} 