/**
 * HUOKAING THARA BANKING SYSTEM - PRODUCTION JS v1.0
 * Features: Secure QR Generation, Dynamic Summary Box, Modal Management
 */

// --- Constants & State ---
const DUMMY_USER_DATA = {
    accountName: "Thara Huokaing",
    availableBalance: 5420.50,
    currency: "USD"
};

// --- DOM Elements ---
const btnWithdraw = document.getElementById('btnWithdraw');
const qrModal = document.getElementById('qrModal');
const qrcodeContainer = document.getElementById('qrcode');
const summaryBox = document.getElementById('summaryBox');

// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    initializeDashboard();
    setupEventListeners();
});

/**
 * Renders account summaries dynamically into the dashboard grid
 */
function initializeDashboard() {
    if (!summaryBox) return;

    // Convert the summary box container into the standard dashboard grid layout
    summaryBox.className = "dashboard-grid";
    
    summaryBox.innerHTML = `
        <div class="dashboard-card">
            <h3>Account Holder</h3>
            <p style="font-size: 1.25rem; font-weight: 600; margin-top: 0.5rem;">
                ${DUMMY_USER_DATA.accountName}
            </p>
        </div>
        <div class="dashboard-card">
            <h3>Available Balance</h3>
            <p style="font-size: 1.25rem; font-weight: 600; margin-top: 0.5rem; color: var(--primary);">
                $${DUMMY_USER_DATA.availableBalance.toLocaleString(undefined, {minimumFractionDigits: 2})}
            </p>
        </div>
        <div class="dashboard-card">
            <h3>System Status</h3>
            <span id="aiStatusBubble">ONLINE // SECURE</span>
        </div>
    `;
}

/**
 * Binds all user interaction events
 */
function setupEventListeners() {
    if (btnWithdraw) {
        btnWithdraw.addEventListener('click', handleWithdrawalRequest);
    }
}

/**
 * Handles generating the secure QR token and showing the modal
 */
function handleWithdrawalRequest() {
    // Generate a single-use secure mock token string for the ATM to parse
    const txToken = `HTB-WITHDRAW-${crypto.randomUUID ? crypto.randomUUID().slice(0,8) : Math.random().toString(36).substring(2,10).toUpperCase()}-${Date.now()}`;
    
    // Clear any previous QR code rendering
    qrcodeContainer.innerHTML = "";

    try {
        // Fallback checks if using standard open-source library dynamically loaded (e.g., QRCode.js)
        if (typeof QRCode !== 'undefined') {
            new QRCode(qrcodeContainer, {
                text: txToken,
                width: 180,
                height: 180,
                colorDark : "#0f172a", // Match modern dark theme
                colorLight : "#ffffff",
                correctLevel : QRCode.CorrectLevel.H
            });
        } else {
            // Text fallback display if third-party library script isn't appended to the DOM
            qrcodeContainer.innerHTML = `<div style="padding: 20px; border: 2px dashed var(--accent); font-family: monospace; word-break: break-all;">${txToken}</div>`;
        }

        openModal();
    } catch (error) {
        console.error("Failed to generate withdrawal payload:", error);
        alert("Unable to process request. Please try again later.");
    }
}

/**
 * Modal Visibility Controllers
 */
function openModal() {
    if (qrModal) {
        // Compatibility check: handles either native HTML5 <dialog> or standard class-toggled overlays
        if (typeof qrModal.showModal === 'function') {
            qrModal.showModal();
        } else {
            qrModal.classList.remove('hidden');
        }
    }
}

function closeModal() {
    if (qrModal) {
        if (typeof qrModal.close === 'function') {
            qrModal.close();
        } else {
            qrModal.classList.add('hidden');
        }
    }
}

// Expose closeModal globally so inline HTML onclick attributes catch it properly
window.closeModal = closeModal;
