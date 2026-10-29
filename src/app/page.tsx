"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useKiosk } from "@/context/KioskContext";

export default function IdlePage() {
  const router = useRouter();
  const { t, setIsSosOpen } = useKiosk();

  return (
    <section className="absolute inset-0 flex flex-col justify-between p-8 md:p-margin-edge bg-gradient-to-br from-[#f0f7ff] via-surface to-[#e8f1f9] z-10">
      {/* Top hospital header */}
      <div className="flex justify-between items-center w-full">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center text-white shadow-lg">
            <span className="material-symbols-outlined text-[44px] icon-fill">local_hospital</span>
          </div>
          <div>
            <h1 className="text-2xl md:text-4xl font-bold text-primary">{t.idle.hospitalName}</h1>
            <p className="text-on-surface-variant text-sm md:text-base font-semibold">{t.idle.kioskSubtitle}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 bg-surface-container-lowest px-6 py-3 rounded-full border-2 border-outline-variant shadow-sm">
          <span className="w-3 h-3 rounded-full bg-emerald-500 animate-ping"></span>
          <span className="text-sm font-bold text-on-surface">{t.common.kioskActive}</span>
        </div>
      </div>

      {/* Central Attract Touch Hero */}
      <div className="flex-1 flex flex-col items-center justify-center text-center my-6">
        <div
          onClick={() => router.push("/language")}
          className="relative cursor-pointer group mb-8"
        >
          <div className="w-56 h-56 rounded-full bg-primary/10 absolute -inset-4 blur-2xl group-hover:bg-primary/20 transition-all"></div>
          <div className="w-48 h-48 rounded-full bg-gradient-to-tr from-primary to-primary-container text-white flex flex-col items-center justify-center shadow-2xl active-ring group-hover:scale-105 transition-transform">
            <span className="material-symbols-outlined text-[72px] icon-fill animate-bounce">touch_app</span>
            <span className="text-lg font-bold uppercase tracking-wider mt-2">Touch Here</span>
          </div>
        </div>

        <h2 className="text-4xl md:text-6xl font-bold text-on-surface mb-4 tracking-tight">
          {t.idle.welcome}
        </h2>
        <p className="text-xl md:text-2xl text-on-surface-variant max-w-3xl mb-8">
          {t.idle.description}
        </p>

        {/* Multi-lingual tags */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
          <span className="bg-surface-container-lowest px-5 py-2.5 rounded-full border-2 border-outline-variant text-base font-bold shadow-sm">English</span>
          <span className="bg-surface-container-lowest px-5 py-2.5 rounded-full border-2 border-outline-variant text-base font-bold shadow-sm">हिन्दी</span>
          <span className="bg-surface-container-lowest px-5 py-2.5 rounded-full border-2 border-outline-variant text-base font-bold shadow-sm">मराठी</span>
          <span className="bg-surface-container-lowest px-5 py-2.5 rounded-full border-2 border-outline-variant text-base font-bold shadow-sm">தமிழ்</span>
          <span className="bg-surface-container-lowest px-5 py-2.5 rounded-full border-2 border-outline-variant text-base font-bold shadow-sm">తెలుగు</span>
          <span className="bg-surface-container-lowest px-5 py-2.5 rounded-full border-2 border-outline-variant text-base font-bold shadow-sm">বাংলা</span>
          <span className="bg-surface-container-lowest px-5 py-2.5 rounded-full border-2 border-outline-variant text-base font-bold shadow-sm">ಕನ್ನಡ</span>
          <span className="bg-surface-container-lowest px-5 py-2.5 rounded-full border-2 border-outline-variant text-base font-bold shadow-sm">ગુજરાતી</span>
        </div>

        <button
          onClick={() => router.push("/language")}
          className="h-20 px-12 bg-primary hover:bg-primary-container text-white rounded-full text-2xl font-bold shadow-xl flex items-center gap-4 active:scale-95 transition-all"
        >
          <span>{t.idle.touchToStart}</span>
          <span className="material-symbols-outlined text-[36px]">arrow_forward</span>
        </button>
      </div>

      {/* Bottom Assist Strip */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-surface-container-lowest p-6 rounded-2xl border-2 border-outline-variant shadow-sm">
        <div className="flex items-center gap-4">
          <span className="material-symbols-outlined text-primary text-[36px]">record_voice_over</span>
          <span className="text-base text-on-surface-variant font-medium">
            {t.idle.voiceEnabled}
          </span>
        </div>
        <button
          onClick={() => setIsSosOpen(true)}
          className="h-14 px-8 rounded-full bg-error/10 text-error font-bold flex items-center gap-2 hover:bg-error hover:text-white transition-all"
        >
          <span className="material-symbols-outlined text-[28px] icon-fill">support_agent</span>
          <span>{t.idle.staffHelp}</span>
        </button>
      </div>
    </section>
  );
}
