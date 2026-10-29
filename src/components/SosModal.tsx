"use client";

import React from "react";
import { useKiosk } from "@/context/KioskContext";

export const SosModal: React.FC = () => {
  const { isSosOpen, setIsSosOpen } = useKiosk();

  if (!isSosOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex items-center justify-center p-6">
      <div className="bg-surface-container-lowest max-w-lg w-full rounded-3xl p-8 border-4 border-error shadow-2xl text-center">
        <div className="w-24 h-24 rounded-full bg-error text-white flex items-center justify-center mx-auto mb-6 active-ring">
          <span className="material-symbols-outlined text-[64px] icon-fill">emergency</span>
        </div>
        <h3 className="text-3xl font-bold text-error mb-2">Hospital Staff Alerted!</h3>
        <p className="text-lg text-on-surface mb-6">
          An OPD nurse or staff member has been notified and is dispatched to assist you at Kiosk #102.
        </p>
        <div className="bg-surface-container p-4 rounded-2xl mb-6 text-sm text-on-surface-variant font-medium">
          If this is an acute cardiac or trauma emergency, please proceed directly to the Emergency Room (ER) Ground Floor Block A.
        </div>
        <button
          onClick={() => setIsSosOpen(false)}
          className="h-16 w-full rounded-full bg-on-surface hover:bg-black text-white font-bold text-lg transition-colors"
        >
          Dismiss / I am okay now
        </button>
      </div>
    </div>
  );
};

