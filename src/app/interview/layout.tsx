"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useKiosk } from "@/context/KioskContext";

export default function InterviewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { t } = useKiosk();

  return (
    <div className="absolute inset-0 flex flex-col pt-[120px] pb-[100px] px-8 md:px-margin-edge bg-surface overflow-hidden">
      <div className="max-w-6xl mx-auto w-full flex-1 flex flex-col justify-between py-4 h-full">
        {/* Interview Top Switcher Strip */}
        <div className="flex items-center justify-between bg-surface-container-lowest p-4 rounded-2xl border-2 border-outline-variant shadow-sm mb-4 shrink-0">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-primary-fixed text-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-[36px] icon-fill">smart_toy</span>
            </div>
            <div>
              <h3 className="text-xl font-bold text-on-surface">{t.interview.assistantTitle}</h3>
              <p className="text-xs text-on-surface-variant font-semibold">
                {t.interview.assistantSub}
              </p>
            </div>
          </div>

          {/* Mode Tabs */}
          <div className="flex items-center gap-2 bg-surface-container p-1.5 rounded-full border border-outline-variant">
            <Link
              href="/interview/chat"
              className={`px-5 py-2 rounded-full text-sm font-bold flex items-center gap-2 transition-all ${
                pathname === "/interview/chat"
                  ? "bg-primary text-white shadow-sm"
                  : "text-on-surface-variant hover:text-on-surface"
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">chat</span>
              <span>{t.interview.tabChat}</span>
            </Link>
            <Link
              href="/interview/voice"
              className={`px-5 py-2 rounded-full text-sm font-bold flex items-center gap-2 transition-all ${
                pathname === "/interview/voice"
                  ? "bg-secondary text-white shadow-sm"
                  : "text-on-surface-variant hover:text-on-surface"
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">mic</span>
              <span>{t.interview.tabVoice}</span>
            </Link>
            <Link
              href="/interview/keyboard"
              className={`px-5 py-2 rounded-full text-sm font-bold flex items-center gap-2 transition-all ${
                pathname === "/interview/keyboard"
                  ? "bg-primary text-white shadow-sm"
                  : "text-on-surface-variant hover:text-on-surface"
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">keyboard</span>
              <span>{t.interview.tabKeyboard}</span>
            </Link>
          </div>
        </div>

        {/* View Content */}
        <div className="flex-1 overflow-hidden flex flex-col">{children}</div>
      </div>
    </div>
  );
}
