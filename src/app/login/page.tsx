"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useKiosk } from "@/context/KioskContext";

export default function LoginPage() {
  const router = useRouter();
  const { patient, setPatient, t, goBack } = useKiosk();
  const [loginMode, setLoginMode] = useState<"phone" | "abha">("phone");
  const [inputValue, setInputValue] = useState(patient.phone);

  const appendDigit = (digit: string) => {
    if (inputValue.length < 14) {
      setInputValue((prev) => prev + digit);
    }
  };

  const backspace = () => {
    setInputValue((prev) => prev.slice(0, -1));
  };

  const clear = () => {
    setInputValue("");
  };

  const handleModeChange = (mode: "phone" | "abha") => {
    setLoginMode(mode);
    setInputValue(mode === "phone" ? patient.phone : "91-2026-9812-40");
  };

  const handleGuest = () => {
    setPatient({
      name: "New Patient",
      phone: "9800011223",
      id: `PID-${Math.floor(1000 + Math.random() * 9000)}-0001`,
      age: 30,
      gender: "Other",
      uhid: "2026-NEW01",
    });
    router.push("/home");
  };

  const handleVerify = () => {
    if (inputValue.trim()) {
      setPatient((prev) => ({ ...prev, phone: inputValue.trim() }));
    }
    router.push("/home");
  };

  // Support physical laptop keyboard (0-9, Backspace, Enter)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.altKey || e.metaKey) return;

      if (e.key >= "0" && e.key <= "9") {
        appendDigit(e.key);
      } else if (e.key === "Backspace") {
        e.preventDefault();
        backspace();
      } else if (e.key === "Enter") {
        e.preventDefault();
        handleVerify();
      } else if (e.key === "Escape") {
        e.preventDefault();
        clear();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [inputValue]);

  return (
    <section className="absolute inset-0 flex flex-col pt-[120px] pb-[100px] px-8 md:px-margin-edge bg-surface overflow-y-auto">
      <div className="max-w-6xl mx-auto w-full flex-1 flex flex-col justify-between py-6">
        {/* Title */}
        <div className="mb-6">
          <h2 className="text-3xl md:text-5xl font-bold text-on-surface mb-2">{t.login.title}</h2>
          <p className="text-xl text-on-surface-variant">{t.login.subtitle}</p>
        </div>

        {/* Input + Numpad Container */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start mb-6">
          {/* Left Column: Input and Patient Card */}
          <div className="md:col-span-6 flex flex-col gap-6">
            {/* Mode Selector Tabs */}
            <div className="flex bg-surface-container p-2 rounded-2xl border border-outline-variant">
              <button
                onClick={() => handleModeChange("phone")}
                className={`flex-1 py-4 text-center rounded-xl font-bold text-lg transition-all ${
                  loginMode === "phone"
                    ? "bg-surface-container-lowest text-primary shadow-sm"
                    : "text-on-surface-variant hover:text-on-surface"
                }`}
              >
                {t.login.mobileTab}
              </button>
              <button
                onClick={() => handleModeChange("abha")}
                className={`flex-1 py-4 text-center rounded-xl font-bold text-lg transition-all ${
                  loginMode === "abha"
                    ? "bg-surface-container-lowest text-primary shadow-sm"
                    : "text-on-surface-variant hover:text-on-surface"
                }`}
              >
                {t.login.abhaTab}
              </button>
            </div>

            {/* Display Input Field */}
            <div className="bg-surface-container-lowest border-4 border-primary rounded-2xl p-6 shadow-md">
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-bold uppercase tracking-wider text-outline block">
                  {loginMode === "phone" ? t.login.phoneLabel : t.login.abhaLabel}
                </label>
                <span className="text-xs text-secondary font-semibold bg-secondary-fixed/50 px-2.5 py-0.5 rounded-full">
                  Laptop Keys Enabled
                </span>
              </div>
              <div className="flex items-center gap-4">
                <span className="material-symbols-outlined text-primary text-[40px]">
                  {loginMode === "phone" ? "call" : "badge"}
                </span>
                <input
                  type="text"
                  placeholder="Enter number..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value.replace(/\D/g, "").slice(0, 14))}
                  className="w-full text-3xl md:text-4xl font-bold text-on-surface bg-transparent border-none outline-none tracking-wider"
                />
              </div>
            </div>

            {/* Verified Patient Card */}
            <div className="bg-secondary-container/40 border-2 border-secondary/30 rounded-2xl p-6 flex items-center gap-5">
              <div className="w-16 h-16 rounded-full bg-secondary text-white flex items-center justify-center font-bold text-2xl">
                AS
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-secondary">
                  {t.login.verifiedRecord}
                </span>
                <h3 className="text-2xl font-bold text-on-surface">{patient.name}</h3>
                <p className="text-sm text-on-surface-variant">
                  Age: {patient.age} • Gender: {patient.gender} • UHID: {patient.uhid}
                </p>
              </div>
            </div>

            {/* Quick Guest Button */}
            <button
              onClick={handleGuest}
              className="p-4 rounded-xl border-2 border-dashed border-outline-variant hover:border-primary text-center font-bold text-primary transition-all"
            >
              {t.login.newRegistration}
            </button>
          </div>

          {/* Right Column: Touch Numeric Keypad */}
          <div className="md:col-span-6 bg-surface-container-lowest border-2 border-outline-variant rounded-3xl p-6 shadow-md">
            <div className="grid grid-cols-3 gap-4">
              {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map((num) => (
                <button
                  key={num}
                  onClick={() => appendDigit(num)}
                  className="kiosk-btn h-20 bg-surface-container-low hover:bg-surface-container rounded-2xl text-3xl font-bold text-on-surface flex items-center justify-center shadow-sm"
                >
                  {num}
                </button>
              ))}
              <button
                onClick={clear}
                className="kiosk-btn h-20 bg-error/10 hover:bg-error/20 text-error rounded-2xl text-xl font-bold flex items-center justify-center shadow-sm"
              >
                {t.login.clear}
              </button>
              <button
                onClick={() => appendDigit("0")}
                className="kiosk-btn h-20 bg-surface-container-low hover:bg-surface-container rounded-2xl text-3xl font-bold text-on-surface flex items-center justify-center shadow-sm"
              >
                0
              </button>
              <button
                onClick={backspace}
                className="kiosk-btn h-20 bg-surface-container hover:bg-surface-variant text-on-surface rounded-2xl text-xl font-bold flex items-center justify-center shadow-sm"
              >
                <span className="material-symbols-outlined text-[36px]">backspace</span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="flex items-center justify-between gap-6 pt-4 border-t-2 border-outline-variant">
          <button
            onClick={goBack}
            className="h-16 px-8 rounded-full bg-surface-container hover:bg-surface-variant text-on-surface text-lg font-bold flex items-center gap-3 active:scale-95 transition-all shadow-sm"
          >
            <span className="material-symbols-outlined text-[28px]">arrow_back</span>
            <span>{t.common.back}</span>
          </button>
          <button
            onClick={handleVerify}
            className="h-16 px-12 rounded-full bg-primary hover:bg-primary-container text-white text-xl font-bold shadow-lg flex items-center gap-3 active:scale-95 transition-all"
          >
            <span>{t.login.verifyProceed}</span>
            <span className="material-symbols-outlined text-[32px]">arrow_forward</span>
          </button>
        </div>
      </div>
    </section>
  );
}
