# HealVoice 2.0 - AI OPD Kiosk Platform

HealVoice is a self-service AI-assisted Outpatient Department (OPD) registration, clinical symptom triage, and consultation token kiosk built for high-throughput healthcare environments.

## Features

- **Attract / Idle Screen (`/`):** Touch-to-start with pulsing voice orb and hospital lobby instructions.
- **Language & Consent (`/language`):** 8 Indian languages (English, Hindi, Marathi, Tamil, Telugu, Bengali, Kannada, Gujarati) with persistent selection throughout the portal and privacy consent.
- **Patient Check-In (`/login`):** Mobile number or 14-digit ABHA/UHID entry via interactive on-screen touch keypad and physical keyboard.
- **Kiosk Services Hub (`/home`):** Bento dashboard for AI Triage, Past Medical History, Document Scan, and Healthcare System selection.
- **Past Medical History (`/medical-history`):**
  - Total diagnostic visits counter (5 recorded hospital visits)
  - Major chronic conditions (Hypertension / High BP status & medication, Pre-Diabetes / Sugar tracking)
  - Drug allergies, past surgeries, and complete chronological consultation timeline
  - One-click sync to attach medical history to today's AI triage
- **Healthcare System (`/healthcare-system`):** Evidence-based Allopathic medicine vs. Traditional AYUSH (Ayurveda, Yoga, Homeopathy) department routing.
- **AI Symptom Triage (`/interview/*`):**
  - **Chat (`/interview/chat`):** Conversational AI doctor interview with quick suggested symptom chips.
  - **On-Screen Keyboard (`/interview/keyboard`):** Touch QWERTY keyboard with full physical laptop keyboard binding.
  - **Voice Mode (`/interview/voice`):** Pulsating audio waves with speech-to-text transcript visualization.
- **Optical Document Scanner (`/document-scan`):** Viewport with laser scan animation and OCR medical history extraction.
- **Review & Print Token (`/summary`):** Complete patient details, recommended OPD department & consulting physician, and printable consultation slip modal (`window.print()`).
- **Global Kiosk Features:**
  - Emergency SOS / Hospital Staff call modal
  - Persistent 60-second inactivity auto-reset timer
  - Navigation header with multi-level back button on every screen
  - Fullscreen Kiosk Mode toggle

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS (Clinical Clarity Design System)
- **Typography:** Google Fonts (Sora) & Google Material Symbols Outlined
- **State Management:** React Context with `localStorage` persistence

## Getting Started

### Prerequisites

- Node.js 18+ (tested on Node.js 25)
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/TheSohal/Heal_Voice.git
cd Heal_Voice

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

## License

MIT
