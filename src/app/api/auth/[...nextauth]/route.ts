export const runtime = "nodejs";
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { db } from '@/db';
import { userContact } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { sendLoginSMS } from '../../../../lib/twilio';

type UserWithPhone = {
  id: string;
  email: string;
  phone: string;
};

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'jsmith@example.com' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        // Determine if input is email or phone
        const input = credentials.email.trim();
        let user = null;
        if (/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(input)) {
          // Looks like an email
          user = db.select().from(userContact).where(eq(userContact.email, input)).get();
        } else {
          // Assume it's a phone number
          user = db.select().from(userContact).where(eq(userContact.phone, input)).get();
        }
        if (user) {
          return { id: String(user.id), email: user.email, phone: user.phone };
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      const u = user as UserWithPhone;
      if (u?.email && u?.phone) {
        await sendLoginSMS(u.email, u.phone);
      }
      return true;
    },
    async session({ session }) {
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.email = (user as UserWithPhone).email;
        (token as unknown as { phone: string }).phone = (user as UserWithPhone).phone;
      }
      return token;
    },
  },
  session: { strategy: 'jwt' },
  pages: {
    signIn: '/auth/signin',
  },
});

export { handler as GET, handler as POST }; 