"use client";
import { useRouter } from "next/navigation";
import LandingForm from "@/components/LandingForm";
import BackgroundWrapper from "@/components/BackgroundWrapper";

export default function HomePage() {
  // const [showForm, setShowForm] = useState(false);
  const router = useRouter();

  return (
    <BackgroundWrapper>
      <div className="w-full max-w-2xl flex flex-col items-center justify-center gap-8 py-20">
        <>
          <h1 className="text-4xl md:text-5xl font-extrabold text-green-900 drop-shadow-lg text-center mb-6">
            Welcome to CampEasy Israel
          </h1>
          <p className="text-lg md:text-xl text-green-800 text-center mb-8 max-w-xl">
            Discover the easiest way to book your next camping adventure. High-quality tents, accessories, and a seamless experience await!
          </p>
          <button
            className="bg-green-700 text-white font-bold py-4 px-10 rounded-full text-xl shadow-lg hover:bg-green-800 transition-colors focus:outline-none focus:ring-2 focus:ring-green-400"
            onClick={() => router.push("/login")}
          >
            Start Booking
          </button>
        </>
      </div>
    </BackgroundWrapper>
  );
} 