"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useKiosk } from "@/context/KioskContext";

export default function HealthcareSystemPage() {
  const router = useRouter();
  const { healthcareSystem, setHealthcareSystem, t, goBack } = useKiosk();

  const handleSelect = (sys: "allopathic" | "ayush") => {
    setHealthcareSystem(sys);
    setTimeout(() => {
      router.push("/interview/chat");
    }, 200);
  };

  return (
    <section className="absolute inset-0 flex flex-col pt-[120px] pb-[100px] px-8 md:px-margin-edge bg-surface overflow-y-auto">
      <div className="max-w-6xl mx-auto w-full flex-1 flex flex-col justify-between py-6">
        {/* Title */}
        <div className="mb-6">
          <h2 className="text-3xl md:text-5xl font-bold text-on-surface mb-2">{t.healthcare.title}</h2>
          <p className="text-xl text-on-surface-variant">{t.healthcare.subtitle}</p>
        </div>

        {/* Two Big Comparison Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Modern Allopathy */}
          <div
            onClick={() => handleSelect("allopathic")}
            className={`kiosk-btn cursor-pointer bg-surface-container-lowest border-4 ${
              healthcareSystem === "allopathic" ? "border-primary shadow-xl scale-[1.01]" : "border-outline-variant hover:border-primary"
            } rounded-3xl p-8 flex flex-col justify-between shadow-lg relative overflow-hidden group`}
          >
            {healthcareSystem === "allopathic" && (
              <div className="absolute top-4 right-4 bg-primary text-white rounded-full w-10 h-10 flex items-center justify-center">
                <span className="material-symbols-outlined text-[28px] icon-fill">check</span>
              </div>
            )}
            <div>
              <div className="w-20 h-20 rounded-2xl bg-primary-fixed text-primary flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-[48px] icon-fill">stethoscope</span>
              </div>
              <span className="text-xs uppercase tracking-widest text-primary font-bold">{t.healthcare.allopathicBadge}</span>
              <h3 className="text-3xl font-bold text-on-surface mt-1 mb-3">{t.healthcare.allopathicTitle}</h3>
              <p className="text-on-surface-variant text-base leading-relaxed mb-6">
                {t.healthcare.allopathicDesc}
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="bg-surface-container text-on-surface px-3 py-1.5 rounded-lg text-sm font-semibold">General Medicine</span>
                <span className="bg-surface-container text-on-surface px-3 py-1.5 rounded-lg text-sm font-semibold">Cardiology</span>
                <span className="bg-surface-container text-on-surface px-3 py-1.5 rounded-lg text-sm font-semibold">Orthopedics</span>
              </div>
            </div>
            <div className="h-16 rounded-xl bg-primary text-white font-bold text-lg flex items-center justify-center gap-3">
              <span>{t.healthcare.allopathicAction}</span>
              <span className="material-symbols-outlined">arrow_forward</span>
            </div>
          </div>

          {/* Traditional AYUSH */}
          <div
            onClick={() => handleSelect("ayush")}
            className={`kiosk-btn cursor-pointer bg-surface-container-lowest border-4 ${
              healthcareSystem === "ayush" ? "border-secondary shadow-xl scale-[1.01]" : "border-outline-variant hover:border-secondary"
            } rounded-3xl p-8 flex flex-col justify-between shadow-md relative overflow-hidden group`}
          >
            {healthcareSystem === "ayush" && (
              <div className="absolute top-4 right-4 bg-secondary text-white rounded-full w-10 h-10 flex items-center justify-center">
                <span className="material-symbols-outlined text-[28px] icon-fill">check</span>
              </div>
            )}
            <div>
              <div className="w-20 h-20 rounded-2xl bg-secondary-fixed text-secondary flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-[48px] icon-fill">spa</span>
              </div>
              <span className="text-xs uppercase tracking-widest text-secondary font-bold">{t.healthcare.ayushBadge}</span>
              <h3 className="text-3xl font-bold text-on-surface mt-1 mb-3">{t.healthcare.ayushTitle}</h3>
              <p className="text-on-surface-variant text-base leading-relaxed mb-6">
                {t.healthcare.ayushDesc}
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="bg-surface-container text-on-surface px-3 py-1.5 rounded-lg text-sm font-semibold">Ayurveda</span>
                <span className="bg-surface-container text-on-surface px-3 py-1.5 rounded-lg text-sm font-semibold">Homeopathy</span>
                <span className="bg-surface-container text-on-surface px-3 py-1.5 rounded-lg text-sm font-semibold">Yoga & Naturopathy</span>
              </div>
            </div>
            <div className="h-16 rounded-xl bg-secondary text-white font-bold text-lg flex items-center justify-center gap-3">
              <span>{t.healthcare.ayushAction}</span>
              <span className="material-symbols-outlined">arrow_forward</span>
            </div>
          </div>
        </div>

        {/* Footer Nav */}
        <div className="flex items-center justify-between gap-6 pt-4 border-t-2 border-outline-variant">
          <button
            onClick={goBack}
            className="h-16 px-8 rounded-full bg-surface-container hover:bg-surface-variant text-on-surface text-lg font-bold flex items-center gap-3 active:scale-95 transition-all shadow-sm"
          >
            <span className="material-symbols-outlined text-[28px]">arrow_back</span>
            <span>{t.common.back}</span>
          </button>
          <button
            onClick={() => router.push("/interview/chat")}
            className="h-16 px-12 rounded-full bg-primary hover:bg-primary-container text-white text-xl font-bold shadow-lg flex items-center gap-3 active:scale-95 transition-all"
          >
            <span>{t.healthcare.proceedTriage}</span>
            <span className="material-symbols-outlined text-[32px]">arrow_forward</span>
          </button>
        </div>
      </div>
    </section>
  );
}
