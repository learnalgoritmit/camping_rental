import twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID!;
const authToken = process.env.TWILIO_AUTH_TOKEN!;
const twilioNumber = process.env.TWILIO_PHONE_NUMBER!;
const adminNumber = process.env.ADMIN_PHONE_NUMBER!;

const client = twilio(accountSid, authToken);

export async function sendLoginSMS(email: string, phone: string) {
  if (!adminNumber) return;
  const message = `User logged in: Email: ${email}, Phone: ${phone}`;
  await client.messages.create({
    body: message,
    from: twilioNumber,
    to: adminNumber,
  });
} 