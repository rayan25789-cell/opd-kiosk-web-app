# Vision AI Document Scanner Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a complete, high-accuracy Vision AI document scanner in the HealVoice OPD Kiosk that captures or uploads prescriptions/reports, extracts clinical data (diagnosis, medications, department) via Gemini Vision API or built-in medical fallbacks, and syncs the findings into the patient's OPD token summary.

**Architecture:** 
1. Client-side camera pipeline using `navigator.mediaDevices.getUserMedia` with fallback drag-and-drop file upload.
2. Vision AI engine calling Google's Gemini 1.5 Flash Vision API (`generateContent`) using JSON response schema for structured clinical entity extraction.
3. High-fidelity medical fallback parser with 3 pre-built realistic Indian clinical prescriptions for offline / demo mode.
4. Reactive state updater in `app.js` syncing extracted symptoms, medications, and clinical departments directly into `kioskState` and the final OPD Summary printout.

**Tech Stack:** HTML5 (`<video>`, `<canvas>`, `<input type="file">`), Tailwind CSS, Vanilla JavaScript (`app.js`, FileReader, Fetch API), Google Gemini Vision API.

**Spec:** Vision AI Kiosk Scanner with Live Camera, File Upload, Instant Medical Prescriptions, and OPD Summary Integration.

## Global Constraints
- Must run cleanly in standard web browsers without requiring a backend server.
- Must gracefully handle camera permission denials (fallback to file upload / sample prescriptions).
- Must preserve existing Tailwind design system, typography (Sora font), Material Symbols, and kiosk styling.
- Extracted symptoms and recommended departments must automatically reflect in `kioskState` and the final Summary screen (`screen-summary`).

## Review Focus
1. Camera access denied or unavailable: Must smoothly switch to file drag-and-drop upload and sample document buttons.
2. Invalid or missing Gemini API key: Must inform user and cleanly fall back to high-fidelity clinical demo extraction without breaking the kiosk flow.
3. Multi-page or low-light documents: Visual guide overlay and clear status indicator ("Capturing...", "Analyzing with Vision AI...", "Extraction Complete").
4. State synchronization: Confirming scan must add extracted symptoms to `kioskState.reportedSymptoms` and set `kioskState.assignedDepartment` appropriately.
5. Navigation cleanup: When navigating away from `screen-document-scan`, camera streams (`MediaStreamTrack.stop()`) must be properly released to avoid leaving the webcam active.

---

### Task 1: UI Viewport & Controls in `index.html`
**Files:**
- Modify: `c:/Users/cbs/Downloads/Heal_Voice-main/Heal_Voice-main/index.html`

- [x] Add `<video id="scannerVideo">` and `<canvas id="scannerCanvas">` to `#screen-document-scan`.
- [x] Add camera controls: "Start Camera", "Capture Snapshot", "Upload Image", and "Retake".
- [x] Add drag-and-drop file upload zone with hidden `<input type="file" id="scanFileInput" accept="image/*,.pdf">`.
- [x] Add 3 quick-select sample prescription buttons (Pediatric Fever Rx, Cardiology Followup, Ortho Slip).
- [x] Add Vision AI API Key configuration toggle button and modal input.
- [x] Upgrade Extracted Medical History card to display dynamic fields: Document Type, Patient Details, Clinical Findings / Diagnosis, Extracted Medications table (Name, Dosage, Frequency), and Recommended Department.

---

### Task 2: Core Scanner Controller & Vision AI Engine in `app.js`
**Files:**
- Modify: `c:/Users/cbs/Downloads/Heal_Voice-main/Heal_Voice-main/app.js`

- [x] Implement `initDocumentScanner()`: request webcam stream with fallback handling.
- [x] Implement `stopDocumentScanner()`: stop active media tracks when navigating to another screen.
- [x] Implement `captureDocumentSnapshot()`: freeze video frame to canvas, convert to base64 image data.
- [x] Implement `handleScanFileUpload(event)`: convert uploaded file to base64 preview.
- [x] Implement `analyzeDocumentWithVisionAI(base64Data)`: call Gemini 1.5 Flash API with prompt requesting structured medical JSON.
- [x] Implement `loadSamplePrescription(sampleId)`: provide 3 rich medical sample presets with pre-computed Vision AI analyses.
- [x] Implement `renderExtractedMedicalData(data)`: populate the UI results card with extracted clinical entities.
- [x] Implement `confirmDocumentScan()`: update `kioskState.reportedSymptoms`, `kioskState.assignedDepartment`, and navigate to `summary`.

---

### Task 3: Mirror UI in Standalone `screens/document_scan.html`
**Files:**
- Modify: `c:/Users/cbs/Downloads/Heal_Voice-main/Heal_Voice-main/screens/document_scan.html`

- [x] Ensure `screens/document_scan.html` reflects the live camera viewport, capture controls, sample prescription selector, and results panel for consistency across mockups and the integrated app.

---

### Task 4: Verification & End-to-End Testing
- [x] Verify file upload with a test prescription image.
- [x] Verify sample prescription extraction and UI rendering.
- [x] Verify that clicking "Confirm & Attach" updates `kioskState` and displays the scanned symptoms and assigned department on the Summary screen.
- [x] Verify camera track cleanup on screen transition.
