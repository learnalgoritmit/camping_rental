import Image from "next/image";
import React from "react";

interface BackgroundWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export default function BackgroundWrapper({ children, className = "" }: BackgroundWrapperProps) {
  return (
    <div className={`relative min-h-screen flex flex-col items-center justify-center overflow-hidden p-4 bg-background ${className}`}>
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
      <div className="relative z-10 w-full flex flex-col items-center justify-center">
        {children}
      </div>
    </div>
  );
} 