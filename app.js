/**
 * HealVoice OPD Kiosk - Application Controller
 * Handles 10-screen kiosk flow, state machine, on-screen keyboards, AI chat, voice synthesis & OCR.
 */

// Global Kiosk State
const kioskState = {
    currentScreen: 'idle',
    language: 'en',
    consentGiven: true,
    patient: {
        name: 'Aarav Sharma',
        phone: '9876543210',
        id: 'PID-9876-5432',
        age: 32,
        gender: 'Male',
        uhid: '2026-98124'
    },
    loginMode: 'phone', // 'phone' or 'abha'
    healthcareSystem: 'allopathic', // 'allopathic' or 'ayush'
    reportedSymptoms: ['Fever (101°F)', 'Body Ache & Chills', 'Mild Cough'],
    tokenNumber: 'T-142',
    assignedDepartment: 'General Medicine OPD',
    assignedRoom: 'Counter 04 (Room 204)',
    assignedDoctor: 'Dr. Priya Menon, MD',
    isListening: true,
    inactivitySeconds: 60
};

// Available Languages
const availableLanguages = [
    { code: 'en', name: 'English', native: 'English', flag: '🇬🇧' },
    { code: 'hi', name: 'Hindi', native: 'हिन्दी', flag: '🇮🇳' },
    { code: 'mr', name: 'Marathi', native: 'मराठी', flag: '🇮🇳' },
    { code: 'ta', name: 'Tamil', native: 'தமிழ்', flag: '🇮🇳' },
    { code: 'te', name: 'Telugu', native: 'తెలుగు', flag: '🇮🇳' },
    { code: 'bn', name: 'Bengali', native: 'বাংলা', flag: '🇮🇳' },
    { code: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ', flag: '🇮🇳' },
    { code: 'gu', name: 'Gujarati', native: 'ગુજરાતી', flag: '🇮🇳' }
];

// Screen Navigation & Step Definitions
const screenSteps = {
    'idle': { title: 'Welcome', progress: 0, showHeader: false },
    'language': { title: 'Step 1 of 5: Select Language', progress: 15, showHeader: true },
    'login': { title: 'Step 2 of 5: Patient Check-In', progress: 30, showHeader: true },
    'home': { title: 'Services Hub', progress: 45, showHeader: true },
    'healthcare-system': { title: 'Step 3 of 5: Healthcare System', progress: 60, showHeader: true },
    'chat': { title: 'Step 4 of 5: AI Clinical Interview', progress: 75, showHeader: true },
    'keyboard': { title: 'Step 4 of 5: Typing Symptom Entry', progress: 75, showHeader: true },
    'voice': { title: 'Step 4 of 5: Voice Symptom Entry', progress: 75, showHeader: true },
    'document-scan': { title: 'Document Scanner', progress: 85, showHeader: true },
    'summary': { title: 'Step 5 of 5: Review & Print Token', progress: 100, showHeader: true }
};

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
    initLanguages();
    startInactivityTimer();
    bindUserActivity();
    navigateTo('idle');
});

// Navigate to Screen
function navigateTo(screenId) {
    kioskState.currentScreen = screenId;
    resetInactivityTimer();

    // Hide all screens
    document.querySelectorAll('.screen-view').forEach(screen => {
        screen.classList.add('hidden');
    });

    // Show target screen
    const targetScreen = document.getElementById(`screen-${screenId}`);
    if (targetScreen) {
        targetScreen.classList.remove('hidden');
    }

    // Update Header & Progress Bar
    const stepConfig = screenSteps[screenId] || { title: 'OPD Kiosk', progress: 50, showHeader: true };
    const globalHeader = document.getElementById('globalHeader');
    const topProgressBar = document.getElementById('topProgressBar');
    const progressFill = document.getElementById('progressFill');
    const stepTitle = document.getElementById('stepTitle');

    if (stepConfig.showHeader) {
        globalHeader.classList.remove('hidden');
        topProgressBar.classList.remove('hidden');
        progressFill.style.width = `${stepConfig.progress}%`;
        stepTitle.textContent = stepConfig.title;
    } else {
        globalHeader.classList.add('hidden');
        topProgressBar.classList.add('hidden');
    }
}

// Language Handling
function initLanguages() {
    const grid = document.getElementById('languageGrid');
    const modalGrid = document.getElementById('langModalGrid');
    if (!grid || !modalGrid) return;

    grid.innerHTML = '';
    modalGrid.innerHTML = '';

    availableLanguages.forEach(lang => {
        const isSelected = kioskState.language === lang.code;

        // Main Screen Language Card
        const card = document.createElement('button');
        card.className = `kiosk-btn relative bg-surface-container-lowest border-4 ${
            isSelected ? 'border-primary shadow-lg scale-[1.02]' : 'border-outline-variant hover:border-primary'
        } rounded-2xl p-6 flex flex-col items-center justify-center gap-3 transition-all`;
        card.onclick = () => selectLanguage(lang.code);
        card.innerHTML = `
            ${isSelected ? '<div class="absolute top-3 right-3 bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold"><span class="material-symbols-outlined text-[20px] icon-fill">check</span></div>' : ''}
            <div class="text-4xl mb-1">${lang.flag}</div>
            <div class="text-2xl font-bold text-on-surface">${lang.native}</div>
            <div class="text-sm font-semibold text-on-surface-variant">${lang.name}</div>
        `;
        grid.appendChild(card);

        // Modal Language Pill
        const modalBtn = document.createElement('button');
        modalBtn.className = `p-4 rounded-xl border-2 flex items-center gap-3 ${
            isSelected ? 'border-primary bg-primary-fixed/20 text-primary font-bold' : 'border-outline-variant hover:border-primary text-on-surface font-semibold'
        }`;
        modalBtn.onclick = () => {
            selectLanguage(lang.code);
            closeLanguageModal();
        };
        modalBtn.innerHTML = `
            <span class="text-2xl">${lang.flag}</span>
            <div class="text-left">
                <div class="font-bold text-base">${lang.native}</div>
                <div class="text-xs text-outline">${lang.name}</div>
            </div>
        `;
        modalGrid.appendChild(modalBtn);
    });
}

function selectLanguage(langCode) {
    kioskState.language = langCode;
    initLanguages();
}

function confirmLanguageSelection() {
    const consent = document.getElementById('consentCheck');
    if (consent && !consent.checked) {
        alert('Please accept the privacy consent to proceed.');
        return;
    }
    navigateTo('login');
}

// Login & Keypad Handling
function setLoginMode(mode) {
    kioskState.loginMode = mode;
    const tabPhone = document.getElementById('tabPhone');
    const tabAbha = document.getElementById('tabAbha');
    const inputLabel = document.getElementById('loginInputLabel');
    const inputIcon = document.getElementById('loginInputIcon');
    const inputField = document.getElementById('patientInputField');

    if (mode === 'phone') {
        tabPhone.className = 'flex-1 py-4 text-center rounded-xl font-bold text-lg bg-surface-container-lowest text-primary shadow-sm transition-all';
        tabAbha.className = 'flex-1 py-4 text-center rounded-xl font-bold text-lg text-on-surface-variant hover:text-on-surface transition-all';
        inputLabel.textContent = 'Enter 10-Digit Mobile Number';
        inputIcon.textContent = 'call';
        inputField.value = kioskState.patient.phone;
    } else {
        tabAbha.className = 'flex-1 py-4 text-center rounded-xl font-bold text-lg bg-surface-container-lowest text-primary shadow-sm transition-all';
        tabPhone.className = 'flex-1 py-4 text-center rounded-xl font-bold text-lg text-on-surface-variant hover:text-on-surface transition-all';
        inputLabel.textContent = 'Enter 14-Digit ABHA / UHID';
        inputIcon.textContent = 'badge';
        inputField.value = '91-2026-9812-40';
    }
}

function appendNum(digit) {
    const field = document.getElementById('patientInputField');
    if (!field) return;
    if (field.value.length < 14) {
        field.value += digit;
    }
}

function backspaceNum() {
    const field = document.getElementById('patientInputField');
    if (!field) return;
    field.value = field.value.slice(0, -1);
}

function clearNum() {
    const field = document.getElementById('patientInputField');
    if (field) field.value = '';
}

function setGuestPatient() {
    kioskState.patient.name = 'New Patient';
    kioskState.patient.phone = '9800011223';
    kioskState.patient.id = 'PID-' + Math.floor(1000 + Math.random() * 9000) + '-0001';
    confirmLogin();
}

function confirmLogin() {
    const field = document.getElementById('patientInputField');
    if (field && field.value.trim().length > 0) {
        kioskState.patient.phone = field.value.trim();
    }
    document.getElementById('homePatientGreeting').textContent = `Welcome, ${kioskState.patient.name.split(' ')[0]}`;
    document.getElementById('summaryPatientName').textContent = kioskState.patient.name;
    document.getElementById('summaryPatientPhone').textContent = kioskState.patient.phone;
    document.getElementById('slipPatientName').textContent = kioskState.patient.name;
    navigateTo('home');
}

// Healthcare System Selection (Allopathic vs AYUSH)
function selectHealthcareSystem(system) {
    kioskState.healthcareSystem = system;
    const cardAllopathy = document.getElementById('cardAllopathy');
    const cardAyush = document.getElementById('cardAyush');
    const badgeAllopathy = document.getElementById('badgeAllopathy');
    const badgeAyush = document.getElementById('badgeAyush');
    const summarySystemText = document.getElementById('summarySystemText');
    const slipDepartment = document.getElementById('slipDepartment');

    if (system === 'allopathic') {
        cardAllopathy.classList.replace('border-outline-variant', 'border-primary');
        cardAyush.classList.replace('border-secondary', 'border-outline-variant');
        badgeAllopathy.classList.remove('hidden');
        badgeAyush.classList.add('hidden');
        summarySystemText.textContent = 'Allopathic (General Medicine OPD)';
        slipDepartment.textContent = 'General Medicine OPD (Room 204)';
        kioskState.assignedDepartment = 'General Medicine OPD';
        kioskState.assignedDoctor = 'Dr. Priya Menon, MD';
    } else {
        cardAyush.classList.replace('border-outline-variant', 'border-secondary');
        cardAllopathy.classList.replace('border-primary', 'border-outline-variant');
        badgeAyush.classList.remove('hidden');
        badgeAllopathy.classList.add('hidden');
        summarySystemText.textContent = 'AYUSH (Ayurveda & Integrative Medicine)';
        slipDepartment.textContent = 'Ayurveda Holistic Care OPD (Room 108)';
        kioskState.assignedDepartment = 'Ayurvedic OPD';
        kioskState.assignedDoctor = 'Dr. S. K. Shastri, BAMS';
    }

    setTimeout(() => {
        navigateTo('chat');
    }, 250);
}

// AI Chat Interaction Simulation
function sendChatMessage() {
    const input = document.getElementById('chatInputText');
    if (!input || !input.value.trim()) return;

    const text = input.value.trim();
    input.value = '';
    appendChatMessage('user', text);

    // Simulated AI response
    setTimeout(() => {
        const replies = [
            `I have noted your report: "${text}". Based on this, I recommend a consultation with our ${kioskState.assignedDepartment}. Would you like to review and print your token?`,
            `Understood. I am adding this to your clinical triage notes for Dr. Menon. Are there any other symptoms you would like to mention?`,
            `Recorded. Your vital parameters and triage summary are being synthesized for the consultation queue.`
        ];
        const randomReply = replies[Math.floor(Math.random() * replies.length)];
        appendChatMessage('ai', randomReply);
    }, 700);
}

function sendQuickReply(replyText) {
    appendChatMessage('user', replyText);
    setTimeout(() => {
        appendChatMessage('ai', `Thank you. I have added "${replyText}" to your reported complaints.`);
    }, 600);
}

function appendChatMessage(sender, text) {
    const container = document.getElementById('chatMessages');
    if (!container) return;

    const msgDiv = document.createElement('div');
    if (sender === 'user') {
        msgDiv.className = 'flex items-start justify-end gap-4 max-w-3xl ml-auto';
        msgDiv.innerHTML = `
            <div class="bg-primary text-white p-5 rounded-2xl rounded-tr-none shadow-md">
                <p class="text-lg leading-relaxed">${escapeHtml(text)}</p>
                <span class="text-xs text-primary-fixed-dim block mt-2 text-right">You • Just now</span>
            </div>
        `;
    } else {
        msgDiv.className = 'flex items-start gap-4 max-w-3xl';
        msgDiv.innerHTML = `
            <div class="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center shrink-0 mt-1">
                <span class="material-symbols-outlined text-[24px]">local_hospital</span>
            </div>
            <div class="bg-surface-container-lowest border-2 border-outline-variant p-5 rounded-2xl rounded-tl-none shadow-sm">
                <p class="text-lg text-on-surface leading-relaxed">${escapeHtml(text)}</p>
                <span class="text-xs text-outline block mt-2 font-medium">AI Triage Bot • Just now</span>
            </div>
        `;
    }

    container.appendChild(msgDiv);
    container.scrollTop = container.scrollHeight;
}

// On-screen Keyboard Handling
let keyboardBuffer = 'Fever, Cough, Headache';

function keyPress(char) {
    keyboardBuffer += char;
    updateKeyboardDisplay();
}

function keyBackspace() {
    keyboardBuffer = keyboardBuffer.slice(0, -1);
    updateKeyboardDisplay();
}

function keyClear() {
    keyboardBuffer = '';
    updateKeyboardDisplay();
}

function updateKeyboardDisplay() {
    const display = document.getElementById('keyboardTextDisplay');
    if (display) {
        display.textContent = keyboardBuffer || '(Empty - tap keys to type)';
    }
}

function keySubmit() {
    if (keyboardBuffer.trim()) {
        appendChatMessage('user', keyboardBuffer);
    }
    navigateTo('chat');
}

// Voice Mode Handling
function toggleVoiceListening() {
    kioskState.isListening = !kioskState.isListening;
    const orbIcon = document.getElementById('voiceOrbIcon');
    const orbLabel = document.getElementById('voiceOrbLabel');
    const statusBadge = document.getElementById('voiceStatusBadge');

    if (kioskState.isListening) {
        orbIcon.textContent = 'mic';
        orbLabel.textContent = 'Listening';
        statusBadge.textContent = 'AI Doctor Listening...';
    } else {
        orbIcon.textContent = 'mic_off';
        orbLabel.textContent = 'Paused';
        statusBadge.textContent = 'Microphone Paused';
    }
}

// Document Scan Simulation
function rescanDocument() {
    alert('Align document inside guidelines on glass. Scanning again...');
}

function confirmDocumentScan() {
    alert('Document successfully attached to your OPD visit file!');
    navigateTo('summary');
}

// Print OPD Slip Simulation
function printOPDSlip() {
    document.getElementById('printModal').classList.remove('hidden');
}

function finishAndResetKiosk() {
    document.getElementById('printModal').classList.add('hidden');
    navigateTo('idle');
}

// SOS Alert Modal
function openSosModal() {
    document.getElementById('sosModal').classList.remove('hidden');
}

function closeSosModal() {
    document.getElementById('sosModal').classList.add('hidden');
}

// Language Switcher Modal
function openLanguageModal() {
    document.getElementById('langModal').classList.remove('hidden');
}

function closeLanguageModal() {
    document.getElementById('langModal').classList.add('hidden');
}

// Inactivity Auto-Reset Timer
let inactivityTimerInterval = null;

function startInactivityTimer() {
    kioskState.inactivitySeconds = 60;
    if (inactivityTimerInterval) clearInterval(inactivityTimerInterval);

    inactivityTimerInterval = setInterval(() => {
        kioskState.inactivitySeconds--;
        const timerEl = document.getElementById('sessionCountdown');
        if (timerEl) {
            timerEl.textContent = kioskState.inactivitySeconds;
        }

        if (kioskState.inactivitySeconds <= 0) {
            resetInactivityTimer();
            if (kioskState.currentScreen !== 'idle') {
                navigateTo('idle');
            }
        }
    }, 1000);
}

function resetInactivityTimer() {
    kioskState.inactivitySeconds = 60;
    const timerEl = document.getElementById('sessionCountdown');
    if (timerEl) timerEl.textContent = '60';
}

function bindUserActivity() {
    ['mousedown', 'mousemove', 'keydown', 'touchstart', 'scroll'].forEach(evt => {
        window.addEventListener(evt, resetInactivityTimer, { passive: true });
    });
}

// Dev Screen Bar & Kiosk Fullscreen
function toggleDevBar() {
    const bar = document.getElementById('devScreenBar');
    if (bar) bar.classList.toggle('hidden');
}

function toggleFullScreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(() => {});
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

