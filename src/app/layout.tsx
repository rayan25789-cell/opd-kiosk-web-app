import type { Metadata } from "next";
import "./globals.css";
import { KioskProvider } from "@/context/KioskContext";
import { TopAppBar } from "@/components/TopAppBar";
import { BottomFooter } from "@/components/BottomFooter";
import { SosModal } from "@/components/SosModal";
import { LanguageModal } from "@/components/LanguageModal";
import { PrintSlipModal } from "@/components/PrintSlipModal";

export const metadata: Metadata = {
  title: "HealVoice - AI OPD Kiosk Platform",
  description: "Next.js Self-Service AI OPD Registration & Clinical Triage Kiosk",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="light">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-background text-on-background h-screen w-screen overflow-hidden flex flex-col font-sans select-none antialiased">
        <KioskProvider>
          <TopAppBar />
          <main className="flex-1 w-full h-full relative overflow-hidden">{children}</main>
          <BottomFooter />
          <SosModal />
          <LanguageModal />
          <PrintSlipModal />
        </KioskProvider>
      </body>
    </html>
  );
}

