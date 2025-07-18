"use client";
import { useState, useEffect, useMemo } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { useSpring, animated } from "@react-spring/web";
import { useRouter } from "next/navigation";
import { useOrder } from '../context/OrderContext';
import { useTranslations } from 'next-intl';

export default function BookingForm() {
  // Set default date range: tomorrow night for one night
  const now = useMemo(() => new Date(), []);
  const tomorrow = useMemo(() => new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 18, 0, 0, 0), [now]);
  const dayAfterTomorrow = useMemo(() => new Date(now.getFullYear(), now.getMonth(), now.getDate() + 2, 9, 0, 0, 0), [now]);
  const [dateRange, setDateRange] = useState<{ startDate: Date | null; endDate: Date | null }>({
    startDate: tomorrow,
    endDate: dayAfterTomorrow
  });
  const [people, setPeople] = useState(1);
  const [touched, setTouched] = useState({ date: false, people: false });

  const peopleValid = people >= 1 && people <= 20;
  const dateValid = dateRange.startDate && dateRange.endDate && dateRange.endDate >= dateRange.startDate;

  const router = useRouter();
  // const locale = typeof params.locale === "string" ? params.locale : Array.isArray(params.locale) ? params.locale[0] : "en";

  const { setDates, order } = useOrder();
  const t = useTranslations();

  // Initialize state from context
  useEffect(() => {
    if (order?.dates) {
      setDateRange({
        startDate: order.dates.startDate || tomorrow,
        endDate: order.dates.endDate || dayAfterTomorrow
      });
      setPeople(order.dates.people || 1);
    }
  }, [order?.dates, setDateRange, dayAfterTomorrow, tomorrow]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ date: true, people: true });
    if (dateValid && peopleValid) {
      setDates({ startDate: dateRange.startDate, endDate: dateRange.endDate, people });
      router.push(`/products`);
    }
  };

  const fadeInUp1 = useSpring({ from: { opacity: 0, y: 20 }, to: { opacity: 1, y: 0 }, delay: 100 });
  const fadeInUp2 = useSpring({ from: { opacity: 0, y: 20 }, to: { opacity: 1, y: 0 }, delay: 200 });
  const fadeInUp3 = useSpring({ from: { opacity: 0, y: 20 }, to: { opacity: 1, y: 0 }, delay: 300 });

  return (
    <form className="flex flex-col gap-6 w-full max-w-md mx-auto" autoComplete="off" noValidate onSubmit={handleSubmit}>
      <animated.div style={fadeInUp1} className="flex flex-col gap-2">
        <Label className="font-medium text-gray-800">{t('label.dateRange')}</Label>
        <div className="flex gap-2">
          <Input
            type="date"
            value={dateRange.startDate ? dateRange.startDate.toISOString().slice(0, 10) : ""}
            min={tomorrow.toISOString().slice(0, 10)}
            onChange={e => {
              setTouched(t => ({ ...t, date: true }));
              setDateRange(r => ({ ...r, startDate: e.target.value ? new Date(e.target.value) : null }));
            }}
            className="w-full"
          />
          <span className="self-center">{t('label.to')}</span>
          <Input
            type="date"
            value={dateRange.endDate ? dateRange.endDate.toISOString().slice(0, 10) : ""}
            min={dateRange.startDate ? dateRange.startDate.toISOString().slice(0, 10) : tomorrow.toISOString().slice(0, 10)}
            onChange={e => {
              setTouched(t => ({ ...t, date: true }));
              setDateRange(r => ({ ...r, endDate: e.target.value ? new Date(e.target.value) : null }));
            }}
            className="w-full"
          />
        </div>
        {touched.date && !dateValid && (
          <animated.span id="date-error" className="text-red-500 text-xs mt-1">
            {t('error.invalidDateRange')}
          </animated.span>
        )}
      </animated.div>
      <animated.div style={fadeInUp2} className="flex flex-col gap-2">
        <Label htmlFor="people" className="font-medium text-gray-800">{t('label.adults')}</Label>
        <Input
          id="people"
          type="number"
          min={1}
          max={20}
          value={people}
          onChange={e => setPeople(Number(e.target.value))}
          onBlur={() => setTouched(t => ({ ...t, people: true }))}
          aria-invalid={touched.people && !peopleValid}
          aria-describedby="people-error"
          required
          className={
            touched.people && !peopleValid
              ? "border-red-400 focus-visible:ring-red-300"
              : ""
          }
        />
        {touched.people && !peopleValid && (
          <animated.span id="people-error" className="text-red-500 text-xs mt-1">
            {t('error.minAdults')}
          </animated.span>
        )}
      </animated.div>
      <animated.div style={fadeInUp3} className="w-full">
        <Button type="submit" className="w-full text-lg py-3 flex justify-center items-center gap-2 transition-transform active:scale-95 focus-visible:ring-4 focus-visible:ring-green-300" aria-label="Book your tent" disabled={!(dateValid && peopleValid)}>
          {t('button.next')}
        </Button>
      </animated.div>
    </form>
  );
} 