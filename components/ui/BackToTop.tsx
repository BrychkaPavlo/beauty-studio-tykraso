"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      onClick={() =>
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        })
      }
      className={`fixed bottom-8 right-8 z-50 rounded-full bg-[var(--accent)] p-4 text-white shadow-xl transition-all ${
        visible
          ? "opacity-100 translate-y-0"
          : "pointer-events-none translate-y-5 opacity-0"
      }`}
      aria-label="Повернутися нагору"
    >
      <ArrowUp size={22} />
    </button>
  );
}