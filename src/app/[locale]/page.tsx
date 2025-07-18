"use client";
import { useState } from "react";
import LandingForm from "@/components/LandingForm";
import BackgroundWrapper from "@/components/BackgroundWrapper";
import { useParams } from "next/navigation";

export default function LocaleHomePage() {
  const [showForm, setShowForm] = useState(false);
  const params = useParams();
  const locale = params.locale || "en";

  return (
    <BackgroundWrapper>
      <div className="w-full max-w-2xl flex flex-col items-center justify-center gap-8 py-20">
        {!showForm ? (
          <>
            <h1 className="text-4xl md:text-5xl font-extrabold text-green-900 drop-shadow-lg text-center mb-6">
              {locale === "he" ? "ברוכים הבאים ל-CampEasy ישראל" : "Welcome to CampEasy Israel"}
            </h1>
            <p className="text-lg md:text-xl text-green-800 text-center mb-8 max-w-xl">
              {locale === "he"
                ? "גלו את הדרך הקלה ביותר להזמין את חווית הקמפינג הבאה שלכם. אוהלים ואביזרים איכותיים, וחוויה חלקה מחכים לכם!"
                : "Discover the easiest way to book your next camping adventure. High-quality tents, accessories, and a seamless experience await!"}
            </p>
            <button
              className="bg-green-700 text-white font-bold py-4 px-10 rounded-full text-xl shadow-lg hover:bg-green-800 transition-colors focus:outline-none focus:ring-2 focus:ring-green-400"
              onClick={() => setShowForm(true)}
            >
              {locale === "he" ? "התחל הזמנה" : "Start Booking"}
            </button>
          </>
        ) : (
          <LandingForm />
        )}
      </div>
    </BackgroundWrapper>
  );
} 