"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useKiosk } from "@/context/KioskContext";

const stepMap: Record<string, { stepNum: number; progress: number; titleKey: string }> = {
  "/language": { stepNum: 1, progress: 20, titleKey: "Select Language" },
  "/login": { stepNum: 2, progress: 40, titleKey: "Patient Check-In" },
  "/home": { stepNum: 3, progress: 50, titleKey: "Services Hub" },
  "/medical-history": { stepNum: 3, progress: 55, titleKey: "Past Medical History" },
  "/healthcare-system": { stepNum: 3, progress: 60, titleKey: "Healthcare System" },
  "/interview/chat": { stepNum: 4, progress: 80, titleKey: "AI Clinical Interview" },
  "/interview/keyboard": { stepNum: 4, progress: 80, titleKey: "Typing Symptom Entry" },
  "/interview/voice": { stepNum: 4, progress: 80, titleKey: "Voice Symptom Entry" },
  "/document-scan": { stepNum: 4, progress: 85, titleKey: "Document Scanner" },
  "/summary": { stepNum: 5, progress: 100, titleKey: "Review & Print Token" },
};

export const TopAppBar: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { t, setIsSosOpen, setIsLanguageModalOpen, goBack } = useKiosk();

  if (pathname === "/") return null;

  const currentStep = stepMap[pathname] || { stepNum: 1, progress: 50, titleKey: "OPD Kiosk Check-In" };

  return (
    <>
      {/* Top 10px progress indicator */}
      <div className="fixed top-0 left-0 w-full h-[10px] bg-surface-container-highest z-[70]">
        <div
          className="h-full bg-primary transition-all duration-500 rounded-r-full"
          style={{ width: `${currentStep.progress}%` }}
        />
      </div>

      <header className="fixed top-[10px] left-0 w-full z-[60] flex justify-between items-center px-4 md:px-margin-edge h-[100px] bg-surface-container-lowest/95 backdrop-blur border-b-2 border-outline-variant">
        <div className="flex items-center gap-3">
          {/* Header Back Button */}
          <button
            onClick={goBack}
            aria-label="Go Back"
            className="w-14 h-14 rounded-full flex items-center justify-center bg-surface-container hover:bg-surface-variant text-on-surface active:scale-95 transition-all shadow-sm"
            title={t.common.back}
          >
            <span className="material-symbols-outlined text-[32px]">arrow_back</span>
          </button>

          <Link href="/home" className="flex items-center gap-3 cursor-pointer">
            <div className="w-12 h-12 rounded-xl bg-primary-fixed flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[32px] icon-fill">medical_services</span>
            </div>
            <div>
              <span className="text-xl md:text-2xl font-bold text-primary tracking-tight">HealVoice</span>
              <span className="text-[10px] md:text-xs uppercase tracking-widest text-on-surface-variant block font-semibold">
                AI OPD Kiosk
              </span>
            </div>
          </Link>
        </div>

        {/* Dynamic Step Badge */}
        <div className="hidden md:flex items-center gap-3 bg-surface-container px-6 py-2.5 rounded-full border border-outline-variant/60">
          <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
          <span className="text-sm font-semibold text-on-surface">
            {t.common.step} {currentStep.stepNum} {t.common.of} 5: {currentStep.titleKey}
          </span>
        </div>

        {/* Navigation Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push("/home")}
            aria-label={t.common.home}
            className="w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-variant active:scale-95 transition-all"
            title={t.common.home}
          >
            <span className="material-symbols-outlined text-[28px] md:text-[32px]">home</span>
          </button>
          <button
            onClick={() => setIsLanguageModalOpen(true)}
            aria-label={t.common.changeLanguage}
            className="w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-variant active:scale-95 transition-all"
            title={t.common.changeLanguage}
          >
            <span className="material-symbols-outlined text-[28px] md:text-[32px]">translate</span>
          </button>
          <button
            onClick={() => setIsSosOpen(true)}
            aria-label={t.common.sos}
            className="h-12 md:h-14 px-4 md:px-6 rounded-full bg-error text-on-error font-bold flex items-center gap-2 hover:bg-red-700 active:scale-95 shadow-md transition-all"
          >
            <span className="material-symbols-outlined text-[24px] md:text-[28px] icon-fill">emergency</span>
            <span className="text-xs md:text-sm uppercase tracking-wider hidden sm:inline">{t.common.sos}</span>
          </button>
        </div>
      </header>
    </>
  );
};
