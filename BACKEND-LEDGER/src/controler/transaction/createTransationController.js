const validateCreatePayload = require('./steps/validateCreatePayload');
const loadAccounts = require('./steps/loadAccounts');
const checkIdempotency = require('./steps/checkIdempotency');
const ensureAccountsActive = require('./steps/ensureAccountsActive');
const ensureSufficientBalance = require('./steps/ensureSufficientBalance');
const createTransactionWithLedgers = require('./steps/createTransactionWithLedgers');
const sendTransactionEmail = require('./steps/sendTransactionEmail');

async function createTransationController(req, res) {
    try {
        const payload = validateCreatePayload(req.body, res);
        if (!payload) {
            return;
        }

        const {fromAccount, toAccount, amount, idempotencyKey} = payload;

        const accounts = await loadAccounts(fromAccount, toAccount, res);
        if (!accounts) {
            return;
        }

        const {fromUserAccount, toUserAccount} = accounts;

        const idempotencyResult = await checkIdempotency(idempotencyKey, res);
        if (idempotencyResult.halted) {
            return;
        }

        const accountsActive = ensureAccountsActive(fromUserAccount, toUserAccount, res);
        if (!accountsActive) {
            return;
        }

        const hasBalance = await ensureSufficientBalance(fromUserAccount, amount, res);
        if (!hasBalance) {
            return;
        }

        const transaction = await createTransactionWithLedgers({
            fromAccount,
            toAccount,
            amount,
            idempotencyKey
        });

        await sendTransactionEmail(req.user, amount, fromUserAccount._id, toUserAccount._id);

        return res.status(201).json({
            message: "Transaction completed successfully",
            status: "success",
            transaction
        });
    } catch (error) {
        return res.status(500).json({
            message: "Transaction failed",
            status: "fail"
        });
    }
}

module.exports = createTransationController;
