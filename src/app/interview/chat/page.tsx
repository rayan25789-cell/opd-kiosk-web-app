"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useKiosk } from "@/context/KioskContext";

export default function ChatInterviewPage() {
  const router = useRouter();
  const { chatMessages, addChatMessage, addSymptom, t, goBack } = useKiosk();
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  const handleSend = () => {
    if (!inputText.trim()) return;
    addChatMessage("user", inputText.trim());
    addSymptom(inputText.trim());
    setInputText("");
  };

  const handleQuickReply = (text: string) => {
    addChatMessage("user", text);
    addSymptom(text);
  };

  return (
    <div className="flex-1 flex flex-col justify-between overflow-hidden">
      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto pr-2 flex flex-col gap-4 mb-4">
        {chatMessages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-4 max-w-3xl ${
              msg.sender === "user" ? "justify-end ml-auto" : ""
            }`}
          >
            {msg.sender === "ai" && (
              <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center shrink-0 mt-1">
                <span className="material-symbols-outlined text-[24px]">local_hospital</span>
              </div>
            )}
            <div
              className={`p-5 rounded-2xl shadow-sm ${
                msg.sender === "user"
                  ? "bg-primary text-white rounded-tr-none shadow-md"
                  : "bg-surface-container-lowest border-2 border-outline-variant text-on-surface rounded-tl-none"
              }`}
            >
              <p className="text-lg leading-relaxed">{msg.text}</p>
              <span
                className={`text-xs block mt-2 ${
                  msg.sender === "user" ? "text-primary-fixed-dim text-right" : "text-outline"
                }`}
              >
                {msg.sender === "user" ? "You" : "AI Triage Bot"} • {msg.time}
              </span>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Reply Chips */}
      <div className="flex flex-wrap items-center gap-3 mb-4 shrink-0">
        <span className="text-xs uppercase font-bold text-outline">{t.interview.quickRepliesLabel}</span>
        {[
          "Mild headache with chills",
          "No breathing difficulty",
          "Sore throat & fatigue",
          "Stomach pain after eating",
        ].map((chip) => (
          <button
            key={chip}
            onClick={() => handleQuickReply(chip)}
            className="bg-surface-container hover:bg-primary hover:text-white px-4 py-2 rounded-full text-sm font-semibold border border-outline-variant transition-all"
          >
            {chip}
          </button>
        ))}
      </div>

      {/* Input Strip */}
      <div className="flex items-center gap-3 bg-surface-container-lowest border-2 border-outline-variant rounded-2xl p-3 shadow-md mb-2 shrink-0">
        <button
          onClick={() => router.push("/interview/voice")}
          className="w-14 h-14 rounded-xl bg-secondary-container text-secondary flex items-center justify-center hover:bg-secondary hover:text-white transition-all"
          title="Speak"
        >
          <span className="material-symbols-outlined text-[32px]">mic</span>
        </button>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSend();
          }}
          placeholder={t.interview.inputPlaceholder}
          className="flex-1 text-lg font-medium bg-transparent border-none outline-none px-2 text-on-surface"
        />
        <button
          onClick={handleSend}
          className="h-14 px-8 rounded-xl bg-primary hover:bg-primary-container text-white font-bold flex items-center gap-2 shadow-md"
        >
          <span>{t.interview.send}</span>
          <span className="material-symbols-outlined text-[24px]">send</span>
        </button>
      </div>

      {/* Footer Nav Controls */}
      <div className="flex items-center justify-between pt-2 shrink-0">
        <button
          onClick={goBack}
          className="h-14 px-6 rounded-full bg-surface-container hover:bg-surface-variant text-on-surface font-bold flex items-center gap-2 shadow-sm"
        >
          <span className="material-symbols-outlined">arrow_back</span>
          <span>{t.common.back}</span>
        </button>
        <button
          onClick={() => router.push("/summary")}
          className="h-14 px-8 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold flex items-center gap-3 shadow-md transition-colors"
        >
          <span>{t.interview.completeReview}</span>
          <span className="material-symbols-outlined">check_circle</span>
        </button>
      </div>
    </div>
  );
}
