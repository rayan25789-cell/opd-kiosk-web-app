"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { translations, LanguageCode, Translations } from "@/lib/translations";

export interface Patient {
  name: string;
  phone: string;
  id: string;
  age: number;
  gender: string;
  uhid: string;
}

export interface ChatMessage {
  id: string;
  sender: "ai" | "user";
  text: string;
  time: string;
}

interface KioskContextType {
  patient: Patient;
  setPatient: React.Dispatch<React.SetStateAction<Patient>>;
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: Translations;
  healthcareSystem: "allopathic" | "ayush";
  setHealthcareSystem: (sys: "allopathic" | "ayush") => void;
  reportedSymptoms: string[];
  addSymptom: (symptom: string) => void;
  chatMessages: ChatMessage[];
  addChatMessage: (sender: "ai" | "user", text: string) => void;
  tokenNumber: string;
  assignedDepartment: string;
  assignedDoctor: string;
  isSosOpen: boolean;
  setIsSosOpen: (open: boolean) => void;
  isLanguageModalOpen: boolean;
  setIsLanguageModalOpen: (open: boolean) => void;
  isPrintModalOpen: boolean;
  setIsPrintModalOpen: (open: boolean) => void;
  inactivitySeconds: number;
  resetInactivityTimer: () => void;
  goBack: () => void;
}

const prevRouteMap: Record<string, string> = {
  "/language": "/",
  "/login": "/language",
  "/home": "/login",
  "/healthcare-system": "/home",
  "/interview/chat": "/healthcare-system",
  "/interview/keyboard": "/interview/chat",
  "/interview/voice": "/interview/chat",
  "/document-scan": "/home",
  "/summary": "/interview/chat",
};

const KioskContext = createContext<KioskContextType | undefined>(undefined);

export const KioskProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();

  // Load persisted language from localStorage if available
  const [language, setLanguageState] = useState<LanguageCode>("en");

  useEffect(() => {
    try {
      const savedLang = localStorage.getItem("healvoice_lang") as LanguageCode;
      if (savedLang && translations[savedLang]) {
        setLanguageState(savedLang);
      }
    } catch {
      // localStorage may fail in private mode
    }
  }, []);

  const setLanguage = (lang: LanguageCode) => {
    setLanguageState(lang);
    try {
      localStorage.setItem("healvoice_lang", lang);
    } catch {
      // ignore
    }
  };

  const t = translations[language] || translations.en;

  const [patient, setPatient] = useState<Patient>({
    name: "Aarav Sharma",
    phone: "9876543210",
    id: "PID-9876-5432",
    age: 32,
    gender: "Male",
    uhid: "2026-98124",
  });

  const [healthcareSystem, setHealthcareSystem] = useState<"allopathic" | "ayush">("allopathic");
  const [reportedSymptoms, setReportedSymptoms] = useState<string[]>([
    "High Fever (101°F)",
    "Body Ache & Chills",
    "Mild Dry Cough",
  ]);

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      sender: "ai",
      text: "Namaste Aarav. I am your AI Health Assistant. Please tell me what primary discomfort or symptoms you are experiencing today.",
      time: "10:00 AM",
    },
    {
      id: "2",
      sender: "user",
      text: "I have had a high fever and mild cough for the past 2 days with body ache.",
      time: "10:01 AM",
    },
    {
      id: "3",
      sender: "ai",
      text: "Thank you for sharing. Have you noticed any breathing difficulty, chills, or headache along with this fever?",
      time: "10:01 AM",
    },
  ]);

  const [isSosOpen, setIsSosOpen] = useState(false);
  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);
  const [inactivitySeconds, setInactivitySeconds] = useState(60);

  const tokenNumber = "T-142";
  const assignedDepartment =
    healthcareSystem === "allopathic"
      ? "General Medicine OPD (Room 204)"
      : "Ayurveda Holistic Care OPD (Room 108)";
  const assignedDoctor =
    healthcareSystem === "allopathic"
      ? "Dr. Priya Menon, MD"
      : "Dr. S. K. Shastri, BAMS";

  const addSymptom = (symptom: string) => {
    if (!reportedSymptoms.includes(symptom)) {
      setReportedSymptoms((prev) => [...prev, symptom]);
    }
  };

  const addChatMessage = (sender: "ai" | "user", text: string) => {
    const newMsg: ChatMessage = {
      id: Date.now().toString(),
      sender,
      text,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setChatMessages((prev) => [...prev, newMsg]);

    if (sender === "user") {
      setTimeout(() => {
        const replies = [
          `I have added "${text}" to your triage note. Based on your symptoms, I recommend consultation with ${assignedDepartment}.`,
          `Understood. I have recorded this symptom for the consulting physician.`,
          `Noted. Your vitals and case file are synced for OPD queue allocation.`,
        ];
        const randomReply = replies[Math.floor(Math.random() * replies.length)];
        setChatMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            sender: "ai",
            text: randomReply,
            time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          },
        ]);
      }, 700);
    }
  };

  const resetInactivityTimer = () => {
    setInactivitySeconds(60);
  };

  const goBack = () => {
    const prev = prevRouteMap[pathname];
    if (prev) {
      router.push(prev);
    } else {
      router.back();
    }
  };

  useEffect(() => {
    const handleActivity = () => {
      resetInactivityTimer();
    };

    window.addEventListener("mousedown", handleActivity, { passive: true });
    window.addEventListener("mousemove", handleActivity, { passive: true });
    window.addEventListener("keydown", handleActivity, { passive: true });
    window.addEventListener("touchstart", handleActivity, { passive: true });

    const interval = setInterval(() => {
      setInactivitySeconds((prev) => {
        if (prev <= 1) {
          if (pathname !== "/") {
            router.push("/");
          }
          return 60;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      window.removeEventListener("mousedown", handleActivity);
      window.removeEventListener("mousemove", handleActivity);
      window.removeEventListener("keydown", handleActivity);
      window.removeEventListener("touchstart", handleActivity);
      clearInterval(interval);
    };
  }, [pathname, router]);

  return (
    <KioskContext.Provider
      value={{
        patient,
        setPatient,
        language,
        setLanguage,
        t,
        healthcareSystem,
        setHealthcareSystem,
        reportedSymptoms,
        addSymptom,
        chatMessages,
        addChatMessage,
        tokenNumber,
        assignedDepartment,
        assignedDoctor,
        isSosOpen,
        setIsSosOpen,
        isLanguageModalOpen,
        setIsLanguageModalOpen,
        isPrintModalOpen,
        setIsPrintModalOpen,
        inactivitySeconds,
        resetInactivityTimer,
        goBack,
      }}
    >
      {children}
    </KioskContext.Provider>
  );
};

export const useKiosk = () => {
  const context = useContext(KioskContext);
  if (!context) {
    throw new Error("useKiosk must be used within a KioskProvider");
  }
  return context;
};
