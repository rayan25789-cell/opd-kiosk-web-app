"use client";

import React, { useState } from "react";
import { useKiosk } from "@/context/KioskContext";
import { DevScreenBar } from "./DevScreenBar";

export const BottomFooter: React.FC = () => {
  const { inactivitySeconds, t } = useKiosk();
  const [showDevBar, setShowDevBar] = useState(false);

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  return (
    <>
      <footer className="fixed bottom-0 left-0 w-full z-[60] bg-surface-container-lowest border-t-2 border-outline-variant px-6 md:px-margin-edge py-3 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-on-surface-variant">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-secondary text-[24px]">lock</span>
          <span>
            Hospital Safe Touch Console • {t.common.sessionClears}{" "}
            <strong className="text-primary font-bold">{inactivitySeconds}</strong>s
          </span>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowDevBar(!showDevBar)}
            className="text-primary font-bold hover:underline flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-[18px]">view_carousel</span>
            <span>{t.common.allRoutes}</span>
          </button>
          <span className="text-outline">|</span>
          <button
            onClick={toggleFullScreen}
            className="hover:text-on-surface flex items-center gap-1 font-semibold"
          >
            <span className="material-symbols-outlined text-[18px]">fullscreen</span>
            <span>{t.common.kioskMode}</span>
          </button>
        </div>
      </footer>

      {showDevBar && <DevScreenBar onClose={() => setShowDevBar(false)} />}
    </>
  );
};
