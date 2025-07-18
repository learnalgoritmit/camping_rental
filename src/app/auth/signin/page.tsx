"use client";
import Image from 'next/image';
import { LuPhone, LuMail } from 'react-icons/lu';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Fire and forget the SMS API call, but always redirect
    fetch("/api/send-login-sms", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, phone })
    });
    router.push(`/products`);
  }

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden p-4 bg-background">
      {/* Hero background image with overlay */}
      <div className="absolute inset-0 w-full h-full z-0">
        <Image
          src="/hero.jpeg"
          alt="Family camping in nature"
          fill
          className="w-full h-full object-cover object-center blur-sm"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-sky-200/80 via-green-100/60 to-green-200/80" />
      </div>
      <div className="relative z-10 w-full max-w-md flex flex-col items-center justify-center py-16">
        <form onSubmit={handleSubmit} className="backdrop-blur-md p-8 rounded-2xl shadow-xl w-full flex flex-col gap-6 border border-green-100 bg-transparent">
          <h2 className="text-3xl font-bold text-green-900 text-center mb-2">Hey there! Welcome :)</h2>
          <label className="font-semibold text-green-800">Email</label>
          <div className="relative flex items-center">
            <span className="absolute left-3 text-green-400"><LuMail size={20} /></span>
            <input
              name="email"
              type="email"
              required
              className="border p-3 rounded w-full pl-10 focus:ring-2 focus:ring-green-300 bg-white/20 placeholder:text-green-700"
              placeholder="you@email.com"
              autoComplete="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <label className="font-semibold text-green-800">Phone Number</label>
          <div className="relative flex items-center">
            <span className="absolute left-3 text-green-400"><LuPhone size={20} /></span>
            <input
              name="phone"
              type="tel"
              required
              className="border p-3 rounded w-full pl-10 focus:ring-2 focus:ring-green-300 bg-white/20 placeholder:text-green-700"
              placeholder="050-1234567"
              value={phone}
              onChange={e => setPhone(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="bg-green-700 text-white py-3 rounded-full font-bold text-lg mt-4 shadow hover:bg-green-800 transition"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
} 