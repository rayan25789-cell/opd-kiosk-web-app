"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useKiosk } from "@/context/KioskContext";

interface PastVisit {
  id: string;
  visitNumber: number;
  date: string;
  department: string;
  doctor: string;
  diagnosis: string;
  vitals: {
    bp: string;
    sugar: string;
    pulse: string;
    temp: string;
  };
  medications: string[];
  notes: string;
}

const pastVisitsData: PastVisit[] = [
  {
    id: "v-5",
    visitNumber: 5,
    date: "25-Oct-2026",
    department: "General Medicine OPD",
    doctor: "Dr. R. Sen, MD",
    diagnosis: "Acute Upper Respiratory Tract Infection (URTI) with seasonal fever",
    vitals: {
      bp: "132/86 mmHg",
      sugar: "114 mg/dL",
      pulse: "78 bpm",
      temp: "100.8°F",
    },
    medications: ["Paracetamol 650mg TDS", "Cetirizine 10mg OD", "Vitamin C 500mg"],
    notes: "Patient reported acute throat irritation and moderate fever for 3 days. Chest clear on auscultation.",
  },
  {
    id: "v-4",
    visitNumber: 4,
    date: "14-Aug-2026",
    department: "Endocrinology & Lifestyle OPD",
    doctor: "Dr. Priya Menon, MD",
    diagnosis: "Quarterly Review: Essential Hypertension & Impaired Fasting Glucose (Pre-Diabetes)",
    vitals: {
      bp: "138/88 mmHg",
      sugar: "118 mg/dL (HbA1c: 6.2%)",
      pulse: "74 bpm",
      temp: "98.4°F",
    },
    medications: ["Telmisartan 40mg OD", "Dietary low-glycemic counseling"],
    notes: "Blood pressure moderately controlled. Advised 30 mins brisk walking daily and reduction in refined carbs.",
  },
  {
    id: "v-3",
    visitNumber: 3,
    date: "02-Jan-2026",
    department: "Gastroenterology OPD",
    doctor: "Dr. V. Verma, MD, DM",
    diagnosis: "Acute Viral Gastroenteritis with Mild Dehydration",
    vitals: {
      bp: "124/80 mmHg",
      sugar: "98 mg/dL",
      pulse: "82 bpm",
      temp: "99.1°F",
    },
    medications: ["ORS sachets", "Probiotic capsules BD", "Ondansetron 4mg SOS"],
    notes: "Foodborne stomach upset. Successfully rehydrated. Full recovery noted at follow-up.",
  },
  {
    id: "v-2",
    visitNumber: 2,
    date: "18-Jul-2025",
    department: "Orthopedics & Trauma OPD",
    doctor: "Dr. M. Iyer, MS (Ortho)",
    diagnosis: "Grade 1 Right Lateral Ankle Ligament Sprain",
    vitals: {
      bp: "126/82 mmHg",
      sugar: "104 mg/dL",
      pulse: "76 bpm",
      temp: "98.6°F",
    },
    medications: ["Aceclofenac + Paracetamol BD", "Crepe bandage compression"],
    notes: "X-ray confirmed no fracture. Advised RICE protocol for 10 days.",
  },
  {
    id: "v-1",
    visitNumber: 1,
    date: "10-Feb-2025",
    department: "Preventive Health & Executive OPD",
    doctor: "Dr. A. Bannerjee, MBBS",
    diagnosis: "Comprehensive Annual Master Health Checkup - Baseline Screening",
    vitals: {
      bp: "140/90 mmHg (Initial finding)",
      sugar: "122 mg/dL",
      pulse: "72 bpm",
      temp: "98.6°F",
    },
    medications: ["Lifestyle modification guidelines", "Home BP diary log"],
    notes: "First hospital enrollment. Detected borderline elevated blood pressure and pre-diabetic fasting sugar.",
  },
];

export default function MedicalHistoryPage() {
  const router = useRouter();
  const { patient, t, goBack, addSymptom } = useKiosk();
  const [selectedTab, setSelectedTab] = useState<"summary" | "timeline" | "chronic">("summary");
  const [attachedToVisit, setAttachedToVisit] = useState(false);

  const handleAttachToTriage = () => {
    addSymptom("History of Hypertension (BP)");
    addSymptom("Pre-Diabetes (Sugar Monitoring)");
    setAttachedToVisit(true);
  };

  return (
    <section className="absolute inset-0 flex flex-col pt-[120px] pb-[100px] px-8 md:px-margin-edge bg-surface overflow-y-auto">
      <div className="max-w-6xl mx-auto w-full flex-1 flex flex-col justify-between py-6">
        {/* Header Strip */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="bg-primary-fixed text-primary px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
                EMR File #{patient.uhid}
              </span>
              <span className="bg-emerald-100 text-emerald-800 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
                5 Total Hospital Visits
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-on-surface">Past Medical History</h2>
            <p className="text-xl text-on-surface-variant">
              Comprehensive hospital diagnosis history, chronic indicators, and prior consultations
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleAttachToTriage}
              className={`h-14 px-6 rounded-2xl font-bold text-base flex items-center gap-2 shadow-md transition-all ${
                attachedToVisit
                  ? "bg-emerald-600 text-white"
                  : "bg-primary hover:bg-primary-container text-white"
              }`}
            >
              <span className="material-symbols-outlined text-[24px]">
                {attachedToVisit ? "check_circle" : "note_add"}
              </span>
              <span>{attachedToVisit ? "Attached to Today's Visit!" : "Attach History to Triage"}</span>
            </button>
          </div>
        </div>

        {/* View Mode Tabs */}
        <div className="flex bg-surface-container p-2 rounded-2xl border border-outline-variant mb-6">
          <button
            onClick={() => setSelectedTab("summary")}
            className={`flex-1 py-3 text-center rounded-xl font-bold text-base transition-all ${
              selectedTab === "summary"
                ? "bg-surface-container-lowest text-primary shadow-sm"
                : "text-on-surface-variant hover:text-on-surface"
            }`}
          >
            Major Chronic Conditions (BP, Sugar, Allergies)
          </button>
          <button
            onClick={() => setSelectedTab("timeline")}
            className={`flex-1 py-3 text-center rounded-xl font-bold text-base transition-all ${
              selectedTab === "timeline"
                ? "bg-surface-container-lowest text-primary shadow-sm"
                : "text-on-surface-variant hover:text-on-surface"
            }`}
          >
            Chronological Visits Timeline (5 Records)
          </button>
        </div>

        {/* TAB 1: MAJOR CHRONIC STATUS & HEALTH CARDS */}
        {selectedTab === "summary" && (
          <div className="space-y-6 mb-8">
            {/* 2 Big Status Cards: Hypertension + Sugar/Diabetes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Hypertension (High BP) Status Card */}
              <div className="bg-surface-container-lowest border-4 border-amber-500/40 rounded-3xl p-6 shadow-md relative overflow-hidden">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center">
                      <span className="material-symbols-outlined text-[36px] icon-fill">favorite</span>
                    </div>
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-amber-700">
                        Cardiovascular Indicator
                      </span>
                      <h3 className="text-2xl font-bold text-on-surface">Hypertension (High BP)</h3>
                    </div>
                  </div>
                  <span className="bg-amber-100 text-amber-900 border border-amber-300 px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider">
                    DIAGNOSED • CONTROLLED
                  </span>
                </div>

                <div className="space-y-3 bg-surface-container/60 p-4 rounded-2xl">
                  <div className="flex justify-between text-sm">
                    <span className="text-on-surface-variant">Condition Stage:</span>
                    <strong className="text-on-surface">Stage 1 Essential Hypertension</strong>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-on-surface-variant">Current Medication:</span>
                    <strong className="text-on-surface">Telmisartan 40mg (1 tablet OD morning)</strong>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-on-surface-variant">Latest Recorded BP:</span>
                    <strong className="text-primary font-bold text-base">132 / 86 mmHg (Normal-Controlled)</strong>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-on-surface-variant">Diagnosis Date:</span>
                    <span className="text-on-surface font-semibold">Feb 2025 (Under care for 1.8 years)</span>
                  </div>
                </div>
              </div>

              {/* Diabetes / Sugar Patient Status Card */}
              <div className="bg-surface-container-lowest border-4 border-blue-500/40 rounded-3xl p-6 shadow-md relative overflow-hidden">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 rounded-2xl bg-blue-100 text-blue-800 flex items-center justify-center">
                      <span className="material-symbols-outlined text-[36px] icon-fill">bloodtype</span>
                    </div>
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-blue-700">
                        Metabolic Indicator
                      </span>
                      <h3 className="text-2xl font-bold text-on-surface">Blood Sugar / Diabetes</h3>
                    </div>
                  </div>
                  <span className="bg-blue-100 text-blue-900 border border-blue-300 px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider">
                    PRE-DIABETIC (MONITORED)
                  </span>
                </div>

                <div className="space-y-3 bg-surface-container/60 p-4 rounded-2xl">
                  <div className="flex justify-between text-sm">
                    <span className="text-on-surface-variant">Clinical Status:</span>
                    <strong className="text-on-surface">Impaired Fasting Glucose (Non-Insulin)</strong>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-on-surface-variant">Recent HbA1c Level:</span>
                    <strong className="text-primary font-bold text-base">6.2% (Target &lt; 5.7%)</strong>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-on-surface-variant">Fasting Blood Sugar:</span>
                    <strong className="text-on-surface">114 mg/dL (Pre-diabetic range 100-125)</strong>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-on-surface-variant">Management Protocol:</span>
                    <span className="text-on-surface font-semibold">Dietary carbohydrate restriction & exercise</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Other Key Health Factors (Allergies, Surgeries, Organ function) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Allergies Card */}
              <div className="bg-surface-container-lowest border-2 border-outline-variant rounded-2xl p-5 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <span className="material-symbols-outlined text-error text-[28px]">warning</span>
                  <h4 className="font-bold text-lg text-on-surface">Known Drug Allergies</h4>
                </div>
                <div className="space-y-2">
                  <span className="inline-block bg-error/10 text-error px-3 py-1 rounded-lg text-xs font-bold mr-2">
                    Penicillin (Causes Rash/Anaphylaxis)
                  </span>
                  <span className="inline-block bg-error/10 text-error px-3 py-1 rounded-lg text-xs font-bold">
                    Sulfa Drugs (Mild Intolerance)
                  </span>
                </div>
              </div>

              {/* Past Surgical History */}
              <div className="bg-surface-container-lowest border-2 border-outline-variant rounded-2xl p-5 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <span className="material-symbols-outlined text-primary text-[28px]">healing</span>
                  <h4 className="font-bold text-lg text-on-surface">Past Surgeries & Procedures</h4>
                </div>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  <strong>Laparoscopic Appendectomy (2021):</strong> Fully recovered, no abdominal complications.
                </p>
              </div>

              {/* Respiratory & Immunizations */}
              <div className="bg-surface-container-lowest border-2 border-outline-variant rounded-2xl p-5 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <span className="material-symbols-outlined text-secondary text-[28px]">pulmonology</span>
                  <h4 className="font-bold text-lg text-on-surface">Respiratory Profile</h4>
                </div>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  Seasonal bronchial allergy in winter. Non-smoker. Completed COVID-19 and Annual Flu vaccines.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: CHRONOLOGICAL VISITS TIMELINE */}
        {selectedTab === "timeline" && (
          <div className="space-y-4 mb-8">
            {pastVisitsData.map((visit) => (
              <div
                key={visit.id}
                className="bg-surface-container-lowest border-2 border-outline-variant rounded-2xl p-6 shadow-sm hover:border-primary transition-all"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-3 border-b border-outline-variant/60 pb-3">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm">
                      #{visit.visitNumber}
                    </span>
                    <div>
                      <h4 className="text-lg font-bold text-on-surface">{visit.diagnosis}</h4>
                      <span className="text-xs text-outline">
                        {visit.department} • Consultant: {visit.doctor}
                      </span>
                    </div>
                  </div>
                  <span className="bg-surface-container px-4 py-1.5 rounded-full text-xs font-bold text-on-surface">
                    {visit.date}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-surface-container/50 p-3 rounded-xl mb-3 text-xs">
                  <div>
                    <span className="text-outline block">Blood Pressure:</span>
                    <strong className="text-on-surface">{visit.vitals.bp}</strong>
                  </div>
                  <div>
                    <span className="text-outline block">Blood Sugar:</span>
                    <strong className="text-on-surface">{visit.vitals.sugar}</strong>
                  </div>
                  <div>
                    <span className="text-outline block">Pulse Rate:</span>
                    <strong className="text-on-surface">{visit.vitals.pulse}</strong>
                  </div>
                  <div>
                    <span className="text-outline block">Body Temp:</span>
                    <strong className="text-on-surface">{visit.vitals.temp}</strong>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-xs">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-outline">Prescribed:</span>
                    {visit.medications.map((med, i) => (
                      <span key={i} className="bg-secondary-fixed/40 text-on-secondary-fixed px-2.5 py-1 rounded-md font-semibold">
                        {med}
                      </span>
                    ))}
                  </div>
                  <span className="text-outline italic">{visit.notes}</span>
                </div>
              </div>
            ))}
          </div>
        )}

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
            onClick={() => router.push("/healthcare-system")}
            className="h-16 px-12 rounded-full bg-primary hover:bg-primary-container text-white text-xl font-bold shadow-lg flex items-center gap-3 active:scale-95 transition-all"
          >
            <span>Proceed to OPD Consultation</span>
            <span className="material-symbols-outlined text-[32px]">arrow_forward</span>
          </button>
        </div>
      </div>
    </section>
  );
}

