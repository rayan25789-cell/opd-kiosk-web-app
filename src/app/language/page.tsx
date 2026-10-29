"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useKiosk } from "@/context/KioskContext";
import { LanguageCode } from "@/lib/translations";

const languageList: { code: LanguageCode; name: string; native: string; badge: string }[] = [
  { code: "en", name: "English", native: "English", badge: "EN" },
  { code: "hi", name: "Hindi", native: "हिन्दी", badge: "HI" },
  { code: "mr", name: "Marathi", native: "मराठी", badge: "MR" },
  { code: "ta", name: "Tamil", native: "தமிழ்", badge: "TA" },
  { code: "te", name: "Telugu", native: "తెలుగు", badge: "TE" },
  { code: "bn", name: "Bengali", native: "বাংলা", badge: "BN" },
  { code: "kn", name: "Kannada", native: "ಕನ್ನಡ", badge: "KN" },
  { code: "gu", name: "Gujarati", native: "ગુજરાતી", badge: "GU" },
];

export default function LanguagePage() {
  const router = useRouter();
  const { language, setLanguage, t, goBack } = useKiosk();
  const [consent, setConsent] = useState(true);

  const handleSelectLanguage = (code: LanguageCode) => {
    setLanguage(code);
  };

  const handleContinue = () => {
    if (!consent) {
      alert("Please accept the data privacy consent to continue.");
      return;
    }
    router.push("/login");
  };

  return (
    <section className="absolute inset-0 flex flex-col pt-[120px] pb-[100px] px-8 md:px-margin-edge bg-surface overflow-y-auto">
      <div className="max-w-6xl mx-auto w-full flex-1 flex flex-col justify-between py-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold text-on-surface mb-2">{t.language.title}</h2>
            <p className="text-xl text-on-surface-variant">{t.language.subtitle}</p>
          </div>
          <div className="flex items-center gap-3 bg-secondary-fixed/50 text-on-secondary-fixed px-5 py-3 rounded-full border border-secondary">
            <span className="material-symbols-outlined text-secondary text-[32px] icon-fill">volume_up</span>
            <span className="font-bold text-sm">{t.language.voiceGuidanceActive}</span>
          </div>
        </div>

        {/* Language Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          {languageList.map((lang) => {
            const isSelected = language === lang.code;
            return (
              <button
                key={lang.code}
                onClick={() => handleSelectLanguage(lang.code)}
                className={`kiosk-btn relative bg-surface-container-lowest border-4 ${
                  isSelected
                    ? "border-primary shadow-xl scale-[1.02]"
                    : "border-outline-variant hover:border-primary"
                } rounded-2xl p-6 flex flex-col items-center justify-center gap-3 transition-all`}
              >
                {isSelected && (
                  <div className="absolute top-3 right-3 bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold shadow-md">
                    <span className="material-symbols-outlined text-[20px] icon-fill">check</span>
                  </div>
                )}
                <div
                  className={`w-14 h-14 rounded-full flex items-center justify-center font-bold text-lg mb-1 ${
                    isSelected ? "bg-primary text-white" : "bg-surface-container text-on-surface"
                  }`}
                >
                  {lang.badge}
                </div>
                <div className="text-2xl md:text-3xl font-bold text-on-surface">{lang.native}</div>
                <div className="text-sm font-semibold text-on-surface-variant">{lang.name}</div>
              </button>
            );
          })}
        </div>

        {/* Privacy Consent Card */}
        <div className="bg-surface-container-lowest border-2 border-outline-variant rounded-2xl p-6 mb-8 shadow-sm">
          <label className="flex items-start gap-4 cursor-pointer">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="w-8 h-8 text-primary rounded-lg border-2 border-outline mt-1 cursor-pointer"
            />
            <div>
              <span className="text-lg font-bold text-on-surface block">
                {t.language.consentTitle}
              </span>
              <span className="text-sm text-on-surface-variant leading-relaxed block mt-1">
                {t.language.consentDesc}
              </span>
            </div>
          </label>
        </div>

        {/* Nav Controls */}
        <div className="flex items-center justify-between gap-6 pt-4 border-t-2 border-outline-variant">
          <button
            onClick={goBack}
            className="h-16 px-8 rounded-full bg-surface-container hover:bg-surface-variant text-on-surface text-lg font-bold flex items-center gap-3 active:scale-95 transition-all shadow-sm"
          >
            <span className="material-symbols-outlined text-[28px]">arrow_back</span>
            <span>{t.common.back}</span>
          </button>
          <button
            onClick={handleContinue}
            className="h-16 px-12 rounded-full bg-primary hover:bg-primary-container text-white text-xl font-bold shadow-lg flex items-center gap-3 active:scale-95 transition-all"
          >
            <span>{t.common.continue}</span>
            <span className="material-symbols-outlined text-[32px]">arrow_forward</span>
          </button>
        </div>
      </div>
    </section>
  );
}
