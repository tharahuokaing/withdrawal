// Function to initiate withdrawal and generate QR
async function generateWithdrawalQR() {
    const amount = 500; // In a real app, prompt user for input
    const transactionId = crypto.randomUUID();
    
    // Create a payload that the ATM will verify
    const qrData = JSON.stringify({
        type: "WITHDRAWAL",
        id: transactionId,
        amount: amount,
        timestamp: Date.now()
    });

    // Assume qrcode.js is loaded
    document.getElementById("qrcode").innerHTML = "";
    new QRCode(document.getElementById("qrcode"), {
        text: qrData,
        width: 256,
        height: 256
    });

    document.getElementById("qrModal").classList.remove("hidden");
}

document.getElementById("btnWithdraw").addEventListener("click", generateWithdrawalQR);
