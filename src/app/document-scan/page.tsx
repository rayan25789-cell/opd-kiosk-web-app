"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useKiosk } from "@/context/KioskContext";

export default function DocumentScanPage() {
  const router = useRouter();
  const { t, goBack } = useKiosk();

  const handleRescan = () => {
    alert("Place document inside scanner guide. Re-scanning...");
  };

  const handleConfirm = () => {
    alert("Document successfully attached to your clinical record!");
    router.push("/summary");
  };

  return (
    <section className="absolute inset-0 flex flex-col pt-[120px] pb-[100px] px-8 md:px-margin-edge bg-surface overflow-y-auto">
      <div className="max-w-6xl mx-auto w-full flex-1 flex flex-col justify-between py-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-6">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold text-on-surface mb-2">{t.scan.title}</h2>
            <p className="text-xl text-on-surface-variant">
              {t.scan.subtitle}
            </p>
          </div>
          <div className="flex items-center gap-3 bg-primary-fixed/50 text-primary px-5 py-2.5 rounded-full border border-primary">
            <span className="material-symbols-outlined text-[28px] icon-fill">document_scanner</span>
            <span className="font-bold text-sm">{t.scan.ocrEngine}</span>
          </div>
        </div>

        {/* Scanning Viewport */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch mb-6">
          {/* Laser Scanner Viewport */}
          <div className="md:col-span-7 bg-surface-container-highest border-4 border-dashed border-outline rounded-3xl p-6 relative overflow-hidden flex flex-col items-center justify-center min-h-[380px] shadow-inner">
            {/* Animated Laser Scan Line */}
            <div className="laser-scan" />

            {/* Mock Medical Document inside */}
            <div className="w-full max-w-md bg-white border-2 border-outline-variant rounded-xl p-6 shadow-xl relative z-10 text-on-surface">
              <div className="flex justify-between items-center border-b pb-3 mb-3">
                <div>
                  <h4 className="font-bold text-primary text-lg">Apollo Clinic Report</h4>
                  <span className="text-xs text-outline">Date: 25-Oct-2026 • Dr. R. Sen</span>
                </div>
                <span className="material-symbols-outlined text-secondary text-[36px]">receipt</span>
              </div>
              <div className="text-xs space-y-2 text-on-surface-variant">
                <p>
                  <strong>Patient:</strong> Aarav Sharma (32 / M)
                </p>
                <p>
                  <strong>Diagnosis:</strong> Acute Upper Respiratory Tract Infection (URTI)
                </p>
                <p>
                  <strong>Prescription:</strong> Paracetamol 650mg, Cetirizine 10mg
                </p>
                <p>
                  <strong>Follow-up:</strong> Review after 4 days if temperature persists
                </p>
              </div>
              <div className="mt-4 pt-3 border-t flex justify-between items-center text-xs text-emerald-600 font-bold">
                <span>OCR Status: 100% Extracted</span>
                <span className="material-symbols-outlined text-[20px]">check_circle</span>
              </div>
            </div>

            {/* Corner Alignment Guides */}
            <div className="absolute top-4 left-4 w-8 h-8 border-t-4 border-l-4 border-primary" />
            <div className="absolute top-4 right-4 w-8 h-8 border-t-4 border-r-4 border-primary" />
            <div className="absolute bottom-4 left-4 w-8 h-8 border-b-4 border-l-4 border-primary" />
            <div className="absolute bottom-4 right-4 w-8 h-8 border-b-4 border-r-4 border-primary" />
          </div>

          {/* Right Column: AI Extraction Summary */}
          <div className="md:col-span-5 bg-surface-container-lowest border-2 border-outline-variant rounded-3xl p-6 flex flex-col justify-between shadow-md">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-secondary">
                AI Document Analysis
              </span>
              <h3 className="text-2xl font-bold text-on-surface mt-1 mb-4">{t.scan.extractedTitle}</h3>

              <div className="space-y-4">
                <div className="bg-surface-container p-4 rounded-xl">
                  <span className="text-xs text-outline block">{t.scan.docType}</span>
                  <span className="text-lg font-bold text-on-surface">Previous OPD Prescription</span>
                </div>
                <div className="bg-surface-container p-4 rounded-xl">
                  <span className="text-xs text-outline block">{t.scan.pastFindings}</span>
                  <span className="text-base font-semibold text-on-surface">
                    Acute URTI, Seasonal Bronchial Allergy
                  </span>
                </div>
                <div className="bg-surface-container p-4 rounded-xl">
                  <span className="text-xs text-outline block">Attached to Today&apos;s Visit</span>
                  <span className="text-base font-semibold text-emerald-700 flex items-center gap-2">
                    <span className="material-symbols-outlined text-[20px]">task_alt</span>
                    {t.scan.synced}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={handleRescan}
                className="flex-1 py-4 bg-surface-container hover:bg-surface-variant text-on-surface font-bold rounded-xl text-center shadow-sm"
              >
                {t.scan.rescan}
              </button>
              <button
                onClick={handleConfirm}
                className="flex-1 py-4 bg-secondary hover:bg-secondary-container text-white hover:text-on-secondary-container font-bold rounded-xl text-center shadow-md"
              >
                {t.scan.confirmAttach}
              </button>
            </div>
          </div>
        </div>

        {/* Footer Nav */}
        <div className="flex items-center justify-between gap-6 pt-4 border-t-2 border-outline-variant">
          <button
            onClick={goBack}
            className="h-16 px-8 rounded-full bg-surface-container hover:bg-surface-variant text-on-surface text-lg font-bold flex items-center gap-3 shadow-sm"
          >
            <span className="material-symbols-outlined text-[28px]">arrow_back</span>
            <span>{t.common.back}</span>
          </button>
          <button
            onClick={() => router.push("/summary")}
            className="h-16 px-12 rounded-full bg-primary hover:bg-primary-container text-white text-xl font-bold shadow-lg flex items-center gap-3"
          >
            <span>{t.scan.proceedFinal}</span>
            <span className="material-symbols-outlined text-[32px]">arrow_forward</span>
          </button>
        </div>
      </div>
    </section>
  );
}
