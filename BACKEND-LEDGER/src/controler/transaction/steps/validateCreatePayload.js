function validateCreatePayload(body, res) {
    const {fromAccount, toAccount, amount, idempotencyKey} = body || {};

    if (!fromAccount || !toAccount || !amount || !idempotencyKey) {
        res.status(400).json({
            message: "FromAccount, ToAccount, Amount and IdempotencyKey are required",
            status: "fail"
        });
        return null;
    }

    return {fromAccount, toAccount, amount, idempotencyKey};
}

module.exports = validateCreatePayload;
