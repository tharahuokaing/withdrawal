/**
 * HUOKAING THARA - Withdrawal Module
 * Handles the logic for debiting funds and recording the transaction in the ledger.
 */

(() => {
    "use strict";

    const WithdrawalHandler = {
        /**
         * Processes a withdrawal request.
         * @param {string} amount - The amount to withdraw.
         */
        processWithdrawal: function(amount) {
            const numericAmount = parseFloat(amount);

            // 1. Validation
            if (isNaN(numericAmount) || numericAmount <= 0) {
                alert("Invalid transaction: Please enter a positive numerical amount.");
                return;
            }

            // 2. Prepare Debit Data
            // We format the volume as a negative value to represent a debit
            const newEntry = {
                id: "WDR-" + Math.floor(Math.random() * 10000),
                tier: "Account Holder",
                route: "Debit/Withdrawal",
                volume: `-$${numericAmount.toLocaleString(undefined, {minimumFractionDigits: 2})}`,
                status: "Success"
            };

            // 3. Update Audit Vault via LedgerEngine
            if (window.LedgerEngine) {
                window.LedgerEngine.addEntry(newEntry);
                console.log(`[WITHDRAWAL]: Successfully debited $${numericAmount}.`);
            } else {
                console.error("[ERROR]: LedgerEngine not found. Ensure ledger.js is loaded.");
            }
        }
    };

    // Expose to window so it can be called from index.html buttons
    window.WithdrawalHandler = WithdrawalHandler;
})();
