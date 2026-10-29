"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface DevScreenBarProps {
  onClose: () => void;
}

const routes = [
  { path: "/", label: "1. Idle Attract" },
  { path: "/language", label: "2. Language & Consent" },
  { path: "/login", label: "3. Check-In & Numpad" },
  { path: "/home", label: "4. Home Bento Hub" },
  { path: "/medical-history", label: "5. Past Medical History" },
  { path: "/healthcare-system", label: "6. Allopathy / AYUSH" },
  { path: "/interview/chat", label: "7. AI Interview Chat" },
  { path: "/interview/keyboard", label: "8. Touch Keyboard" },
  { path: "/interview/voice", label: "9. Voice Listening" },
  { path: "/document-scan", label: "10. Document Scan" },
  { path: "/summary", label: "11. Summary & Token" },
];

export const DevScreenBar: React.FC<DevScreenBarProps> = ({ onClose }) => {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-[80] bg-on-surface/95 text-white backdrop-blur-md px-6 py-3 rounded-full shadow-2xl border border-white/20 flex items-center gap-2 overflow-x-auto max-w-[95vw]">
      <span className="text-xs font-bold uppercase tracking-wider text-secondary-fixed shrink-0">
        Routes:
      </span>
      {routes.map((r) => {
        const isActive = pathname === r.path;
        return (
          <Link
            key={r.path}
            href={r.path}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold shrink-0 transition-all ${
              isActive
                ? "bg-primary text-white shadow-md font-bold"
                : "bg-white/10 hover:bg-white/25 text-white/90"
            }`}
          >
            {r.label}
          </Link>
        );
      })}
      <button
        onClick={onClose}
        className="w-7 h-7 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center shrink-0 ml-1"
      >
        <span className="material-symbols-outlined text-[18px]">close</span>
      </button>
    </div>
  );
};
