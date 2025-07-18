import CheckoutSummary from "@/components/CheckoutSummary";
import BackgroundWrapper from "@/components/BackgroundWrapper";
import { useParams } from "next/navigation";

export default function LocaleCheckoutPage() {
  const params = useParams();
  const locale = params.locale || "en";
  return (
    <BackgroundWrapper>
      <CheckoutSummary />
    </BackgroundWrapper>
  );
} 