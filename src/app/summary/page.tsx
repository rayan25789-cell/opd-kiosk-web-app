"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useKiosk } from "@/context/KioskContext";

export default function SummaryPage() {
  const router = useRouter();
  const {
    patient,
    reportedSymptoms,
    healthcareSystem,
    tokenNumber,
    assignedDepartment,
    assignedDoctor,
    setIsPrintModalOpen,
    t,
    goBack,
  } = useKiosk();

  return (
    <section className="absolute inset-0 flex flex-col pt-[120px] pb-[100px] px-8 md:px-margin-edge bg-surface overflow-y-auto">
      <div className="max-w-5xl mx-auto w-full flex-1 flex flex-col justify-between py-6">
        {/* Title */}
        <div className="mb-6">
          <span className="bg-emerald-100 text-emerald-800 px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider inline-block mb-2">
            {t.summary.badge}
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-on-surface mb-2">{t.summary.title}</h2>
          <p className="text-xl text-on-surface-variant">
            {t.summary.subtitle}
          </p>
        </div>

        {/* Summary Stack */}
        <div className="space-y-6 mb-8">
          {/* Patient Card */}
          <div className="bg-surface-container-lowest border-2 border-outline-variant rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center text-2xl font-bold">
                AS
              </div>
              <div>
                <span className="text-xs font-bold uppercase text-outline">{t.summary.patientProfile}</span>
                <h3 className="text-2xl font-bold text-on-surface">{patient.name}</h3>
                <p className="text-sm text-on-surface-variant">
                  Mobile: <strong>+91 {patient.phone}</strong> • Age: {patient.age} • UHID: {patient.uhid}
                </p>
              </div>
            </div>
            <button
              onClick={() => router.push("/login")}
              className="px-5 py-2.5 rounded-full bg-surface-container hover:bg-surface-variant text-primary font-bold text-sm flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-[20px]">edit</span> {t.summary.edit}
            </button>
          </div>

          {/* Symptoms & Healthcare System */}
          <div className="bg-surface-container-lowest border-2 border-outline-variant rounded-2xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-bold uppercase text-outline">
                {t.summary.reportedSymptoms}
              </span>
              <button
                onClick={() => router.push("/interview/chat")}
                className="text-primary text-sm font-bold flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-[18px]">edit</span> {t.summary.modify}
              </button>
            </div>
            <div className="flex flex-wrap gap-3 mb-4">
              {reportedSymptoms.map((sym, idx) => (
                <span
                  key={idx}
                  className="bg-secondary-container text-on-secondary-container px-5 py-2 rounded-full text-base font-semibold flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-[20px]">medical_information</span>
                  {sym}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-3 text-sm text-on-surface-variant">
              <span className="material-symbols-outlined text-primary">verified</span>
              <span>
                {t.summary.healthcareSelection}:{" "}
                <strong className="text-on-surface capitalize">
                  {healthcareSystem === "allopathic" ? "Allopathic (Modern Medicine)" : "AYUSH (Holistic Care)"}
                </strong>
              </span>
            </div>
          </div>

          {/* Assigned Department Badge */}
          <div className="bg-gradient-to-r from-primary-fixed to-surface-container-lowest border-4 border-primary rounded-2xl p-6 shadow-md flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <span className="text-xs font-bold uppercase text-primary tracking-widest">
                {t.summary.recommendedDept}
              </span>
              <h3 className="text-3xl font-bold text-on-surface mt-1">{assignedDepartment}</h3>
              <p className="text-base text-on-surface-variant mt-1">
                Consultant: <strong>{assignedDoctor}</strong> • {t.summary.estimatedWait}
              </p>
            </div>
            <div className="bg-white px-6 py-4 rounded-xl border-2 border-primary text-center">
              <span className="text-xs uppercase text-outline font-bold">{t.summary.tokenNumberLabel}</span>
              <div className="text-4xl font-extrabold text-primary tracking-wider">{tokenNumber}</div>
            </div>
          </div>
        </div>

        {/* Print Button */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-4 border-t-2 border-outline-variant">
          <button
            onClick={goBack}
            className="h-16 px-8 rounded-full bg-surface-container hover:bg-surface-variant text-on-surface text-lg font-bold flex items-center gap-3 w-full sm:w-auto justify-center shadow-sm"
          >
            <span className="material-symbols-outlined text-[28px]">arrow_back</span>
            <span>{t.common.back}</span>
          </button>
          <button
            onClick={() => setIsPrintModalOpen(true)}
            className="h-20 px-14 rounded-full bg-primary hover:bg-primary-container text-white text-2xl font-bold shadow-2xl flex items-center gap-4 active:scale-95 transition-all w-full sm:w-auto justify-center"
          >
            <span className="material-symbols-outlined text-[36px] icon-fill">print</span>
            <span>{t.summary.printSlipBtn}</span>
          </button>
        </div>
      </div>
    </section>
  );
}
