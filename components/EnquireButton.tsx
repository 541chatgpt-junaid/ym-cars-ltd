"use client";

import type { PrefillDetail } from "./BookingForm";

export default function EnquireButton({
  detail,
  children,
  className = "btn btn--blue btn--sm",
}: {
  detail: PrefillDetail;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => {
        window.dispatchEvent(new CustomEvent("ym:prefill", { detail }));
        document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
      }}
    >
      {children}
    </button>
  );
}
