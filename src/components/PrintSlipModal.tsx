"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useKiosk } from "@/context/KioskContext";

export const PrintSlipModal: React.FC = () => {
  const router = useRouter();
  const { isPrintModalOpen, setIsPrintModalOpen, patient, tokenNumber, assignedDepartment, assignedDoctor, reportedSymptoms } = useKiosk();

  if (!isPrintModalOpen) return null;

  const handleFinish = () => {
    setIsPrintModalOpen(false);
    router.push("/");
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex items-center justify-center p-6">
      <div
        id="printTicketArea"
        className="bg-white text-black max-w-md w-full rounded-2xl p-8 border-2 border-gray-300 shadow-2xl relative text-left"
      >
        <div className="text-center border-b-2 border-dashed border-gray-400 pb-4 mb-4">
          <h2 className="text-2xl font-bold tracking-tight">CITY CARE MEMORIAL HOSPITAL</h2>
          <p className="text-xs text-gray-600">OPD CONSULTATION TOKEN SLIP</p>
          <div className="mt-3 inline-block bg-black text-white px-6 py-2 rounded-lg text-3xl font-extrabold tracking-widest">
            TOKEN # {tokenNumber}
          </div>
        </div>

        <div className="text-sm space-y-2 mb-6">
          <div className="flex justify-between">
            <span className="text-gray-600">Date & Time:</span>
            <span className="font-bold">29-Oct-2026, 10:20 AM</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Patient Name:</span>
            <span className="font-bold">{patient.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Patient ID:</span>
            <span className="font-bold">{patient.id}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Assigned Department:</span>
            <span className="font-bold text-blue-800">{assignedDepartment}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Consultant:</span>
            <span className="font-bold">{assignedDoctor}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Reported Symptoms:</span>
            <span className="font-bold">{reportedSymptoms.join(", ")}</span>
          </div>
        </div>

        <div className="text-center border-t-2 border-dashed border-gray-400 pt-4">
          <div className="w-32 h-32 mx-auto bg-gray-100 border-2 border-gray-300 flex items-center justify-center text-xs font-mono text-gray-500 mb-2">
            [ QR TOKEN CODE ]
          </div>
          <p className="text-xs text-gray-500">Please wait at Waiting Lounge B until Token {tokenNumber} is called.</p>
        </div>

        <div className="mt-6 flex gap-3 print:hidden">
          <button
            onClick={() => window.print()}
            className="flex-1 py-3 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-xl text-center transition-colors"
          >
            Print Now
          </button>
          <button
            onClick={handleFinish}
            className="flex-1 py-3 bg-gray-200 hover:bg-gray-300 text-black font-bold rounded-xl text-center transition-colors"
          >
            Done / Exit
          </button>
        </div>
      </div>
    </div>
  );
};

