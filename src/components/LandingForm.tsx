"use client";
import { useState, useEffect } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { motion } from "framer-motion";
import { LuPhone, LuMail } from "react-icons/lu";
import { useRouter, useParams } from "next/navigation";
import { useOrder } from '../context/OrderContext';
import { useTranslations } from 'next-intl';

export default function LandingForm({ onValidityChange }: { onValidityChange?: (valid: boolean) => void } = {}) {
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [touched, setTouched] = useState({ phone: false, email: false });
  const [apiError, setApiError] = useState<string | null>(null);
  const router = useRouter();
  const params = useParams();
  const locale = typeof params.locale === "string" ? params.locale : Array.isArray(params.locale) ? params.locale[0] : "en";
  const { setUser, order } = useOrder();
  const t = useTranslations();

  // Initialize state from context
  useEffect(() => {
    if (order?.user) {
      setPhone(order.user.phone || "");
      setEmail(order.user.email || "");
    }
  }, [order?.user]);

  const phoneValid = /^05\d{8}$/.test(phone);
  const emailValid = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
  const formValid = phoneValid && emailValid;

  // Notify parent of validity change
  useEffect(() => {
    if (onValidityChange) onValidityChange(formValid);
  }, [formValid, onValidityChange]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (formValid) {
      setApiError(null);
      try {
        const res = await fetch('/api/user-contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ phone, email })
        });
        if (!res.ok) {
          const data = await res.json();
          setApiError(data.error || 'Failed to save contact.');
          return;
        }
        setUser({ phone, email });
        // Send SMS notification
        await fetch('/api/send-login-sms', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ phone, email })
        });
        router.push(`/booking`);
      } catch {
        setApiError('Network error. Please try again.');
      }
    }
  }

  return (
    <form className="flex flex-col gap-6 w-full max-w-md mx-auto" autoComplete="off" noValidate onSubmit={handleSubmit}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="flex flex-col gap-2">
        <Label htmlFor="phone" className="font-medium text-gray-800 flex items-center gap-2">
          <LuPhone className="inline-block" /> {t('label.phone')}
        </Label>
        <div className="relative flex items-center">
          <span className="absolute left-3 text-gray-400"><LuPhone size={18} /></span>
          <Input
            id="phone"
            type="tel"
            placeholder={t('placeholder.phone')}
            value={phone}
            onChange={e => setPhone(e.target.value)}
            onBlur={() => setTouched(t => ({ ...t, phone: true }))}
            aria-invalid={touched.phone && !phoneValid}
            aria-describedby="phone-error"
            required
            className={
              (touched.phone && !phoneValid
                ? "border-red-400 focus-visible:ring-red-300 "
                : "") + " pl-10"
            }
          />
        </div>
        {touched.phone && !phoneValid && (
          <motion.span id="phone-error" className="text-red-500 text-xs mt-1" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {t('error.invalidPhone')}
          </motion.span>
        )}
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="flex flex-col gap-2">
        <Label htmlFor="email" className="font-medium text-gray-800 flex items-center gap-2">
          <LuMail className="inline-block" /> {t('label.email')}
        </Label>
        <div className="relative flex items-center">
          <span className="absolute left-3 text-gray-400"><LuMail size={18} /></span>
          <Input
            id="email"
            type="email"
            placeholder={t('placeholder.email')}
            value={email}
            onChange={e => setEmail(e.target.value)}
            onBlur={() => setTouched(t => ({ ...t, email: true }))}
            aria-invalid={touched.email && !emailValid}
            aria-describedby="email-error"
            required
            className={
              (touched.email && !emailValid
                ? "border-red-400 focus-visible:ring-red-300 "
                : "") + " pl-10"
            }
          />
        </div>
        {touched.email && !emailValid && (
          <motion.span id="email-error" className="text-red-500 text-xs mt-1" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {t('error.invalidEmail')}
          </motion.span>
        )}
      </motion.div>
      <button
        type="submit"
        disabled={!formValid}
        className="mt-4 py-3 px-6 rounded bg-green-700 text-white font-bold text-lg shadow hover:bg-green-800 transition disabled:bg-gray-300 disabled:text-gray-500"
      >
        {t('button.next')}
      </button>
      {apiError && <div className="text-red-500 text-sm mt-2">{apiError}</div>}
    </form>
  );
}