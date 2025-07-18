import { NextRequest, NextResponse } from 'next/server';
import { sendLoginSMS } from '../../../lib/twilio';

export async function POST(req: NextRequest) {
  const { email, phone } = await req.json();
  if (!email || !phone) {
    return NextResponse.json({ error: 'Email and phone are required.' }, { status: 400 });
  }
  try {
    await sendLoginSMS(email, phone);
    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
} 