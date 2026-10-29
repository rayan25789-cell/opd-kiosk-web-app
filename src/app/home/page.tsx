"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useKiosk } from "@/context/KioskContext";

export default function HomePage() {
  const router = useRouter();
  const { patient, t, goBack } = useKiosk();

  return (
    <section className="absolute inset-0 flex flex-col pt-[120px] pb-[100px] px-8 md:px-margin-edge bg-gradient-to-b from-[#e8f1f9] to-surface overflow-y-auto">
      <div className="max-w-6xl mx-auto w-full flex-1 flex flex-col justify-between py-6">
        {/* Patient Greeting */}
        <div className="text-center mb-8">
          <span className="inline-block bg-primary-fixed text-primary px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider mb-3">
            {t.home.welcomeBadge}
          </span>
          <h2 className="text-4xl md:text-6xl font-bold text-on-surface mb-3">
            {t.home.welcomeGreeting}, {patient.name.split(" ")[0]}
          </h2>
          <p className="text-xl md:text-2xl text-on-surface-variant">
            {t.home.subtitle}
          </p>
        </div>

        {/* 4 Bento Grid Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Option 1: AI Assistant Triage */}
          <button
            onClick={() => router.push("/healthcare-system")}
            className="kiosk-btn group bg-surface-container-lowest hover:border-primary border-4 border-primary/20 rounded-3xl p-6 flex flex-col items-center text-center shadow-lg hover:shadow-2xl transition-all"
          >
            <div className="w-24 h-24 rounded-full bg-primary-fixed group-hover:scale-110 flex items-center justify-center text-primary mb-5 transition-transform">
              <span className="material-symbols-outlined text-[54px] icon-fill">neurology</span>
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-on-surface mb-2">{t.home.aiDoctorTitle}</h3>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              {t.home.aiDoctorDesc}
            </p>
            <span className="mt-4 inline-flex items-center gap-2 text-primary font-bold text-base group-hover:translate-x-1 transition-transform">
              {t.home.aiDoctorAction} <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
            </span>
          </button>

          {/* Option 2: Past Medical History (NEW) */}
          <button
            onClick={() => router.push("/medical-history")}
            className="kiosk-btn group bg-surface-container-lowest hover:border-amber-500 border-4 border-amber-500/20 rounded-3xl p-6 flex flex-col items-center text-center shadow-lg hover:shadow-2xl transition-all relative overflow-hidden"
          >
            <div className="w-24 h-24 rounded-full bg-amber-100 group-hover:scale-110 flex items-center justify-center text-amber-800 mb-5 transition-transform">
              <span className="material-symbols-outlined text-[54px] icon-fill">clinical_notes</span>
            </div>
            <div className="flex items-center gap-1.5 mb-1">
              <span className="bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase">
                5 Past Visits
              </span>
              <span className="bg-blue-100 text-blue-900 px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase">
                BP & Sugar
              </span>
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-on-surface mb-2">Past Medical History</h3>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              View prior hospital diagnoses, Hypertension (BP), Pre-Diabetes sugar status & past prescriptions.
            </p>
            <span className="mt-4 inline-flex items-center gap-2 text-amber-800 font-bold text-base group-hover:translate-x-1 transition-transform">
              View Medical History <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
            </span>
          </button>

          {/* Option 3: Scan Documents */}
          <button
            onClick={() => router.push("/document-scan")}
            className="kiosk-btn group bg-surface-container-lowest hover:border-secondary border-4 border-outline-variant/60 rounded-3xl p-6 flex flex-col items-center text-center shadow-md hover:shadow-2xl transition-all"
          >
            <div className="w-24 h-24 rounded-full bg-secondary-fixed group-hover:scale-110 flex items-center justify-center text-secondary mb-5 transition-transform">
              <span className="material-symbols-outlined text-[54px] icon-fill">document_scanner</span>
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-on-surface mb-2">{t.home.scanTitle}</h3>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              {t.home.scanDesc}
            </p>
            <span className="mt-4 inline-flex items-center gap-2 text-secondary font-bold text-base group-hover:translate-x-1 transition-transform">
              {t.home.scanAction} <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
            </span>
          </button>

          {/* Option 4: Choose Healthcare System */}
          <button
            onClick={() => router.push("/healthcare-system")}
            className="kiosk-btn group bg-surface-container-lowest hover:border-outline border-4 border-outline-variant/60 rounded-3xl p-6 flex flex-col items-center text-center shadow-md hover:shadow-2xl transition-all"
          >
            <div className="w-24 h-24 rounded-full bg-surface-container group-hover:scale-110 flex items-center justify-center text-on-surface-variant mb-5 transition-transform">
              <span className="material-symbols-outlined text-[54px]">medication</span>
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-on-surface mb-2">{t.home.systemsTitle}</h3>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              {t.home.systemsDesc}
            </p>
            <span className="mt-4 inline-flex items-center gap-2 text-on-surface font-bold text-base group-hover:translate-x-1 transition-transform">
              {t.home.systemsAction} <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
            </span>
          </button>
        </div>

        {/* Quick Review Card */}
        <div className="bg-surface-container-lowest border-2 border-outline-variant rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <span className="material-symbols-outlined text-[28px]">receipt_long</span>
            </div>
            <div>
              <span className="text-xs uppercase font-bold text-outline">{t.home.tokenNotice}</span>
              <h4 className="text-lg font-bold text-on-surface">{t.home.viewToken}</h4>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={goBack}
              className="h-12 px-6 rounded-full bg-surface-container hover:bg-surface-variant font-bold text-on-surface flex items-center gap-2 transition-colors shadow-sm"
            >
              <span className="material-symbols-outlined text-[20px]">arrow_back</span>
              <span>{t.common.back}</span>
            </button>
            <button
              onClick={() => router.push("/summary")}
              className="h-12 px-6 rounded-full bg-primary hover:bg-primary-container text-white font-bold flex items-center gap-2 transition-colors shadow-sm"
            >
              <span>{t.home.viewToken}</span>
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
