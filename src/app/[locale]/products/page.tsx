"use client";
import BackgroundWrapper from "@/components/BackgroundWrapper";
import { useParams } from "next/navigation";

export default function LocaleProductsPage() {
  const params = useParams();
  const locale = params.locale || "en";
  return (
    <BackgroundWrapper>
      <div className="text-center py-20">
        <h1 className="text-3xl font-bold">{locale === "he" ? "מוצרים" : "Products"}</h1>
      </div>
    </BackgroundWrapper>
  );
} 