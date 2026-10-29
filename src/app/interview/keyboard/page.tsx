"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useKiosk } from "@/context/KioskContext";

export default function KeyboardInterviewPage() {
  const router = useRouter();
  const { addChatMessage, addSymptom, t, goBack } = useKiosk();
  const [typedBuffer, setTypedBuffer] = useState("Fever, Cough, Headache");

  const keyPress = (char: string) => {
    setTypedBuffer((prev) => prev + char);
  };

  const keyBackspace = () => {
    setTypedBuffer((prev) => prev.slice(0, -1));
  };

  const keyClear = () => {
    setTypedBuffer("");
  };

  const keySubmit = () => {
    if (typedBuffer.trim()) {
      addChatMessage("user", typedBuffer.trim());
      addSymptom(typedBuffer.trim());
    }
    router.push("/interview/chat");
  };

  // Support physical laptop/desktop keyboard input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if modifier keys like Ctrl/Alt/Meta are pressed
      if (e.ctrlKey || e.altKey || e.metaKey) return;

      if (e.key === "Backspace") {
        e.preventDefault();
        keyBackspace();
      } else if (e.key === "Enter") {
        e.preventDefault();
        keySubmit();
      } else if (e.key === "Escape") {
        e.preventDefault();
        keyClear();
      } else if (e.key.length === 1) {
        // Printable character typed on physical keyboard
        keyPress(e.key);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [typedBuffer]);

  return (
    <div className="flex-1 flex flex-col justify-between overflow-hidden">
      {/* Display Card - Editable and click-focusable */}
      <div className="bg-surface-container-lowest border-4 border-primary rounded-2xl p-6 shadow-md mb-4 flex flex-col justify-between shrink-0">
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs font-bold uppercase tracking-wider text-primary">
            {t.interview.notesTitle}
          </span>
          <span className="text-xs text-secondary font-semibold bg-secondary-fixed/50 px-3 py-1 rounded-full">
            Laptop & Touch Keyboard Enabled
          </span>
        </div>
        <textarea
          rows={2}
          value={typedBuffer}
          onChange={(e) => setTypedBuffer(e.target.value)}
          placeholder={t.interview.notesEmpty}
          className="text-2xl md:text-3xl font-medium text-on-surface tracking-normal w-full bg-transparent border-none outline-none resize-none my-2"
          autoFocus
        />
        <div className="flex justify-between items-center text-xs text-outline">
          <span>Type directly with your laptop keyboard or tap the keys below</span>
          <span>{typedBuffer.length} characters</span>
        </div>
      </div>

      {/* On-screen Touch Keyboard */}
      <div className="bg-surface-container-lowest border-2 border-outline-variant rounded-3xl p-5 shadow-lg mb-4 flex flex-col gap-2.5">
        {/* Row 1: Numbers */}
        <div className="flex gap-2 justify-center">
          {["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"].map((k) => (
            <button
              key={k}
              onClick={() => keyPress(k)}
              className="kiosk-btn h-14 flex-1 bg-surface-container-low hover:bg-surface-container rounded-xl font-bold text-xl text-on-surface"
            >
              {k}
            </button>
          ))}
        </div>

        {/* Row 2: QWERTY */}
        <div className="flex gap-2 justify-center">
          {["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"].map((k) => (
            <button
              key={k}
              onClick={() => keyPress(k)}
              className="kiosk-btn h-14 flex-1 bg-surface-container-low hover:bg-surface-container rounded-xl font-bold text-xl text-on-surface"
            >
              {k}
            </button>
          ))}
        </div>

        {/* Row 3: ASDF */}
        <div className="flex gap-2 justify-center px-4">
          {["A", "S", "D", "F", "G", "H", "J", "K", "L"].map((k) => (
            <button
              key={k}
              onClick={() => keyPress(k)}
              className="kiosk-btn h-14 flex-1 bg-surface-container-low hover:bg-surface-container rounded-xl font-bold text-xl text-on-surface"
            >
              {k}
            </button>
          ))}
        </div>

        {/* Row 4: ZXCV + Backspace */}
        <div className="flex gap-2 justify-center">
          {["Z", "X", "C", "V", "B", "N", "M"].map((k) => (
            <button
              key={k}
              onClick={() => keyPress(k)}
              className="kiosk-btn h-14 flex-1 bg-surface-container-low hover:bg-surface-container rounded-xl font-bold text-xl text-on-surface"
            >
              {k}
            </button>
          ))}
          <button
            onClick={keyBackspace}
            className="kiosk-btn h-14 flex-1 bg-error/10 hover:bg-error/20 text-error rounded-xl font-bold text-lg flex items-center justify-center transition-colors"
          >
            <span className="material-symbols-outlined text-[28px]">backspace</span>
          </button>
        </div>

        {/* Row 5: Space, Clear, Submit */}
        <div className="flex gap-2 justify-center">
          <button
            onClick={keyClear}
            className="kiosk-btn h-14 px-6 bg-surface-container hover:bg-surface-variant rounded-xl font-bold text-sm text-on-surface"
          >
            {t.interview.clearAll}
          </button>
          <button
            onClick={() => keyPress(" ")}
            className="kiosk-btn h-14 flex-[3] bg-surface-container-low hover:bg-surface-container rounded-xl font-bold text-base tracking-widest uppercase text-on-surface"
          >
            {t.interview.space}
          </button>
          <button
            onClick={keySubmit}
            className="kiosk-btn h-14 px-8 bg-primary hover:bg-primary-container text-white rounded-xl font-bold text-base flex items-center gap-2 shadow-md"
          >
            <span>{t.interview.addToTriage}</span>
            <span className="material-symbols-outlined">check</span>
          </button>
        </div>
      </div>

      {/* Footer Nav */}
      <div className="flex items-center justify-between pt-2 shrink-0">
        <button
          onClick={goBack}
          className="h-14 px-8 rounded-full bg-surface-container hover:bg-surface-variant text-on-surface font-bold flex items-center gap-2 shadow-sm"
        >
          <span className="material-symbols-outlined">arrow_back</span>
          <span>{t.common.back}</span>
        </button>
        <button
          onClick={() => router.push("/summary")}
          className="h-14 px-10 rounded-full bg-primary hover:bg-primary-container text-white font-bold flex items-center gap-3 shadow-md"
        >
          <span>{t.common.continue}</span>
          <span className="material-symbols-outlined">arrow_forward</span>
        </button>
      </div>
    </div>
  );
}
