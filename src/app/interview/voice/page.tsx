"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useKiosk } from "@/context/KioskContext";

export default function VoiceInterviewPage() {
  const router = useRouter();
  const { addChatMessage, addSymptom, t, goBack } = useKiosk();
  const [isListening, setIsListening] = useState(true);
  const [transcript] = useState(
    "Doctor, I have had a continuous fever for two days with severe body ache and mild dry cough."
  );

  const toggleListening = () => {
    setIsListening((prev) => !prev);
  };

  const handleSaveAndReview = () => {
    addChatMessage("user", transcript);
    addSymptom("Fever & Severe Body Ache");
    router.push("/summary");
  };

  return (
    <div className="flex-1 flex flex-col justify-between items-center py-4 text-center overflow-hidden">
      {/* Status Header */}
      <div className="shrink-0">
        <span className="bg-secondary-fixed text-on-secondary-fixed px-6 py-2 rounded-full text-base font-bold inline-flex items-center gap-2">
          <span className={`w-3 h-3 rounded-full bg-secondary ${isListening ? "animate-ping" : ""}`} />
          <span>{isListening ? t.interview.listening : t.interview.paused}</span>
        </span>
        <h2 className="text-3xl md:text-5xl font-bold text-on-surface mt-3 mb-1">{t.interview.speakFreely}</h2>
        <p className="text-base text-on-surface-variant">{t.interview.speakSub}</p>
      </div>

      {/* Central Pulsating Voice Orb */}
      <div className="relative my-6 flex items-center justify-center shrink-0">
        {isListening && (
          <>
            <div className="w-64 h-64 rounded-full border-4 border-secondary/20 voice-wave absolute" />
            <div
              className="w-52 h-52 rounded-full border-4 border-secondary/40 voice-wave absolute"
              style={{ animationDelay: "0.6s" }}
            />
          </>
        )}
        <div
          onClick={toggleListening}
          className="cursor-pointer relative z-10 w-40 h-40 rounded-full bg-gradient-to-tr from-secondary to-[#8cf3f3] text-white flex flex-col items-center justify-center shadow-2xl active-ring active:scale-95 transition-all"
        >
          <span className="material-symbols-outlined text-[64px] icon-fill">
            {isListening ? "mic" : "mic_off"}
          </span>
          <span className="text-xs uppercase font-bold tracking-widest mt-1">
            {isListening ? "Listening" : "Paused"}
          </span>
        </div>
      </div>

      {/* Spoken Live Transcript Box */}
      <div className="w-full max-w-3xl bg-surface-container-lowest border-2 border-outline-variant rounded-3xl p-6 shadow-md mb-4 text-left shrink-0">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold uppercase tracking-wider text-secondary">
            Speech-to-Text Recognition
          </span>
          <span className="text-xs text-outline">{t.interview.confidence}</span>
        </div>
        <p className="text-xl md:text-2xl font-semibold text-on-surface leading-relaxed">
          &quot;{transcript}&quot;
        </p>
      </div>

      {/* Mode Switcher and Continue buttons */}
      <div className="flex flex-wrap items-center justify-center gap-4 w-full shrink-0">
        <button
          onClick={goBack}
          className="h-16 px-8 rounded-full bg-surface-container hover:bg-surface-variant text-on-surface font-bold text-lg flex items-center gap-2 shadow-sm"
        >
          <span className="material-symbols-outlined text-[28px]">arrow_back</span>
          <span>{t.common.back}</span>
        </button>
        <button
          onClick={() => router.push("/interview/chat")}
          className="h-16 px-8 rounded-full bg-surface-container hover:bg-surface-variant text-on-surface font-bold text-lg flex items-center gap-2"
        >
          <span className="material-symbols-outlined text-[28px]">chat</span>
          <span>{t.interview.switchChat}</span>
        </button>
        <button
          onClick={() => router.push("/interview/keyboard")}
          className="h-16 px-8 rounded-full bg-surface-container hover:bg-surface-variant text-on-surface font-bold text-lg flex items-center gap-2"
        >
          <span className="material-symbols-outlined text-[28px]">keyboard</span>
          <span>{t.interview.useKeyboard}</span>
        </button>
        <button
          onClick={handleSaveAndReview}
          className="h-16 px-12 rounded-full bg-primary hover:bg-primary-container text-white font-bold text-xl shadow-lg flex items-center gap-3"
        >
          <span>{t.interview.saveReview}</span>
          <span className="material-symbols-outlined text-[32px]">arrow_forward</span>
        </button>
      </div>
    </div>
  );
}
