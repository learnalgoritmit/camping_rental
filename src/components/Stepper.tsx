"use client";
import { LuCalendar, LuTent, LuReceipt, LuArrowLeft } from "react-icons/lu";
import React from "react";
import { useTranslations } from 'next-intl';

export default function Stepper({ current, onBack }: { current: number; onBack?: () => void }) {
  const t = useTranslations();
  const steps = [
    { icon: LuCalendar, label: t('step.contact') },
    { icon: LuTent, label: t('step.tent') },
    { icon: LuReceipt, label: t('step.summary') },
  ];
  return (
    <div className="relative w-full max-w-2xl mx-auto">
      {/* Back arrow, top-left, only if onBack is provided */}
      {onBack && (
        <button
          onClick={onBack}
          aria-label="Go back"
          className="absolute left-0 top-0 p-2 rounded-full hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-400 z-20"
          type="button"
        >
          <LuArrowLeft size={28} className="text-green-800" />
        </button>
      )}
      <nav className="flex items-center justify-center gap-4 mb-6 select-none pt-2">
        {steps.map((step, idx) => (
          <li key={idx} className={`flex flex-col items-center flex-1 ${idx < steps.length - 1 ? 'mr-2' : ''}`}>
            <div className={`rounded-full p-2 ${idx === current ? 'bg-green-700 text-white' : 'bg-gray-200 text-gray-500'}`}>
              <step.icon size={24} />
            </div>
            <span className={`mt-2 text-xs font-medium ${idx === current ? 'text-green-700' : 'text-gray-500'}`}>{step.label}</span>
          </li>
        ))}
      </nav>
    </div>
  );
} 