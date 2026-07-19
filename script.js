// Function to initiate withdrawal and generate QR
async function generateWithdrawalQR() {
    try {
        // 1. Dynamic Input (Replacing the hardcoded 500)
        const amountInput = document.getElementById("inputAmount");
        const amount = amountInput ? parseFloat(amountInput.value) : 500;

        if (isNaN(amount) || amount <= 0) {
            alert("Please enter a valid amount.");
            return;
        }

        // 2. Generate unique transaction tracking
        const transactionId = crypto.randomUUID();
        
        // 3. Create payload
        const qrData = JSON.stringify({
            type: "WITHDRAWAL",
            id: transactionId,
            amount: amount,
            timestamp: Date.now()
        });

        // 4. Clear and Render QR Code
        const qrContainer = document.getElementById("qrcode");
        if (!qrContainer) throw new Error("QR container element not found");
        
        qrContainer.innerHTML = "";
        
        // Ensure QRCode library is available globally
        if (typeof QRCode === "undefined") {
            throw new Error("QRCode library is not loaded");
        }

        new QRCode(qrContainer, {
            text: qrData,
            width: 256,
            height: 256
        });

        // 5. Show Modal
        const modal = document.getElementById("qrModal");
        if (modal) {
            modal.classList.remove("hidden");
        }

    } catch (error) {
        console.error("Failed to generate withdrawal QR:", error);
    }
}

// Event Listener Configuration
const withdrawBtn = document.getElementById("btnWithdraw");
if (withdrawBtn) {
    withdrawBtn.addEventListener("click", generateWithdrawalQR);
}
