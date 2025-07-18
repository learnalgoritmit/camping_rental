"use client";
import BookingForm from "@/components/BookingForm";
import BackgroundWrapper from "@/components/BackgroundWrapper";
import { useParams } from "next/navigation";

export default function LocaleBookingPage() {
  const params = useParams();
  const locale = params.locale || "en";
  return (
    <BackgroundWrapper>
      <BookingForm />
    </BackgroundWrapper>
  );
} 