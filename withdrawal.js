/* =========================================================
   HUOKAING THARA BANKING SYSTEM - WITHDRAWAL & QR PARSER
========================================================= */

(() => {
    "use strict";

    /**
     * Get URL query parameter helper
     */
    function getQueryParam(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }

    document.addEventListener("DOMContentLoaded", () => {
        const amountInput = document.getElementById("transferAmountInput");
        const recipientDisplay = document.getElementById("recipientNameDisplay");
        const noticeBox = document.getElementById("qrNoticeBox");
        const withdrawalForm = document.getElementById("withdrawalForm");

        // Capture incoming parameters (either qr_data from scanner or asset from crypto sell button)
        const qrData = getQueryParam("qr_data");
        const assetSymbol = getQueryParam("asset");

        if (qrData) {
            noticeBox.textContent = `✔ Verified QR Payload: ${decodeURIComponent(qrData)}`;
            noticeBox.style.color = "#22c55e";
            noticeBox.style.borderColor = "rgba(34, 197, 94, 0.3)";
            noticeBox.style.background = "rgba(34, 197, 94, 0.1)";
            
            // Mock pre-filled amount based on QR decode
            if (amountInput) amountInput.value = "25.00";
        } else if (assetSymbol) {
            noticeBox.textContent = `✔ Crypto Liquidation Asset Loaded: ${assetSymbol.toUpperCase()}`;
            noticeBox.style.color = "#f0b90b";
            noticeBox.style.borderColor = "rgba(240, 185, 11, 0.3)";
            noticeBox.style.background = "rgba(240, 185, 11, 0.1)";

            if (recipientDisplay) {
                recipientDisplay.value = `Crypto Exchange Gateway (${assetSymbol.toUpperCase()})`;
            }
        } else {
            noticeBox.textContent = "⚠️ Manual withdrawal mode active. Enter transfer details below.";
        }

        // Handle form submission confirmation
        if (withdrawalForm) {
            withdrawalForm.addEventListener("submit", (e) => {
                e.preventDefault();
                const amount = amountInput.value;

                if (!amount || amount <= 0) {
                    alert("Please enter a valid transfer amount.");
                    return;
                }

                alert(`Successfully processed withdrawal of $${amount}! Transfer complete.`);
                window.location.href = "https://tharahuokaing.github.io/bank2/";
            });
        }
    });

})();
