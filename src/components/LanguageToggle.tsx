"use client";
import { useRouter, usePathname, useParams } from "next/navigation";

export default function LanguageToggle() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const locale = typeof params.locale === "string" ? params.locale : Array.isArray(params.locale) ? params.locale[0] : "en";
  const otherLocale = locale === "en" ? "he" : "en";

  function handleToggle() {
    // Replace the locale segment in the pathname
    const segments = pathname.split("/");
    if (segments[1] === locale) {
      segments[1] = otherLocale;
      router.push(segments.join("/"));
    } else {
      // fallback: just go to the root of the other locale
      router.push(`/${otherLocale}`);
    }
  }

  return (
    <button
      onClick={handleToggle}
      className="fixed top-4 right-4 z-50 bg-white/80 hover:bg-white shadow-lg rounded-full p-1.5 border border-gray-200 flex items-center justify-center transition-all focus-visible:ring-2 focus-visible:ring-green-400"
      aria-label={otherLocale === 'en' ? 'Switch to English' : 'Switch to Hebrew'}
    >
      {otherLocale === 'en' ? (
        // US flag SVG (circular)
        <span className="block w-7 h-7 rounded-full overflow-hidden">
          <svg viewBox="0 0 32 32" width="28" height="28" className="rounded-full">
            <circle cx="16" cy="16" r="16" fill="#fff" />
            <rect width="32" height="32" fill="#b22234" />
            <g fill="#fff">
              <rect y="4.57" width="32" height="3.43" />
              <rect y="11.43" width="32" height="3.43" />
              <rect y="18.29" width="32" height="3.43" />
              <rect y="25.14" width="32" height="3.43" />
            </g>
            <rect width="14.4" height="14.4" fill="#3c3b6e" />
            <g fill="#fff">
              <g id="s">
                <polygon points="1.44,2.16 1.76,3.04 2.72,3.04 1.92,3.6 2.24,4.48 1.44,3.92 0.64,4.48 0.96,3.6 0.16,3.04 1.12,3.04" />
              </g>
              <use href="#s" x="2.88" />
              <use href="#s" x="5.76" />
              <use href="#s" x="8.64" />
              <use href="#s" x="11.52" />
              <use href="#s" y="2.88" x="1.44" />
              <use href="#s" y="2.88" x="4.32" />
              <use href="#s" y="2.88" x="7.2" />
              <use href="#s" y="2.88" x="10.08" />
              <use href="#s" y="5.76" />
              <use href="#s" y="5.76" x="2.88" />
              <use href="#s" y="5.76" x="5.76" />
              <use href="#s" y="5.76" x="8.64" />
              <use href="#s" y="5.76" x="11.52" />
            </g>
          </svg>
        </span>
      ) : (
        // Israel flag SVG (circular)
        <span className="block w-7 h-7 rounded-full overflow-hidden">
          <svg viewBox="0 0 32 32" width="28" height="28" className="rounded-full">
            <circle cx="16" cy="16" r="16" fill="#fff" />
            <rect y="7" width="32" height="4" fill="#0038b8" />
            <rect y="21" width="32" height="4" fill="#0038b8" />
            <polygon points="16,10 19,18 13,18" fill="none" stroke="#0038b8" strokeWidth="1.5" />
            <polygon points="16,20 13,12 19,12" fill="none" stroke="#0038b8" strokeWidth="1.5" />
          </svg>
        </span>
      )}
    </button>
  );
} 