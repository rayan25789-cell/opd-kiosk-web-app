"use client";

import React from "react";
import { useKiosk } from "@/context/KioskContext";
import { LanguageCode } from "@/lib/translations";

const languages: { code: LanguageCode; name: string; native: string; badge: string }[] = [
  { code: "en", name: "English", native: "English", badge: "EN" },
  { code: "hi", name: "Hindi", native: "हिन्दी", badge: "HI" },
  { code: "mr", name: "Marathi", native: "मराठी", badge: "MR" },
  { code: "ta", name: "Tamil", native: "தமிழ்", badge: "TA" },
  { code: "te", name: "Telugu", native: "తెలుగు", badge: "TE" },
  { code: "bn", name: "Bengali", native: "বাংলা", badge: "BN" },
  { code: "kn", name: "Kannada", native: "ಕನ್ನಡ", badge: "KN" },
  { code: "gu", name: "Gujarati", native: "ગુજરાતી", badge: "GU" },
];

export const LanguageModal: React.FC = () => {
  const { isLanguageModalOpen, setIsLanguageModalOpen, language, setLanguage, t } = useKiosk();

  if (!isLanguageModalOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-6">
      <div className="bg-surface-container-lowest max-w-2xl w-full rounded-3xl p-8 border-2 border-outline-variant shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-2xl font-bold text-on-surface">{t.common.changeLanguage}</h3>
            <p className="text-sm text-on-surface-variant">Choose language for voice and screen display</p>
          </div>
          <button
            onClick={() => setIsLanguageModalOpen(false)}
            className="w-12 h-12 rounded-full hover:bg-surface-variant flex items-center justify-center text-on-surface"
          >
            <span className="material-symbols-outlined text-[28px]">close</span>
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          {languages.map((lang) => {
            const isSelected = language === lang.code;
            return (
              <button
                key={lang.code}
                onClick={() => {
                  setLanguage(lang.code);
                  setIsLanguageModalOpen(false);
                }}
                className={`p-4 rounded-xl border-2 flex items-center gap-3 transition-all ${
                  isSelected
                    ? "border-primary bg-primary-fixed/20 text-primary font-bold shadow-sm"
                    : "border-outline-variant hover:border-primary text-on-surface font-semibold"
                }`}
              >
                <span className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center font-bold text-xs text-primary">
                  {lang.badge}
                </span>
                <div className="text-left">
                  <div className="font-bold text-base">{lang.native}</div>
                  <div className="text-xs text-outline">{lang.name}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
