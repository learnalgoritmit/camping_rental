"use client";
import { useOrder } from "@/context/OrderContext";
import Image from "next/image";
import { useTranslations } from 'next-intl';
import { LuArrowLeft, LuShoppingCart, LuPlus, LuCheck, LuImage, LuStar } from 'react-icons/lu';
import Link from "next/link";
import React, { useState, useEffect } from "react";
import BackgroundWrapper from "@/components/BackgroundWrapper";
import { useParams } from "next/navigation";

export default function LocaleProductsPage() {
  const params = useParams();
  const locale = params.locale || "en";
  // The rest of your products page logic goes here, using locale if needed
  // For now, just render the BackgroundWrapper as a placeholder
  return (
    <BackgroundWrapper>
      {/* TODO: Copy the full products page content here and use locale as needed */}
      <div className="text-center py-20">
        <h1 className="text-3xl font-bold">{locale === "he" ? "מוצרים" : "Products"}</h1>
        {/* Add the rest of your products UI here */}
      </div>
    </BackgroundWrapper>
  );
} 