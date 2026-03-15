const transationModel = require('../../../model/transaction');

async function checkIdempotency(idempotencyKey, res) {
    const existing = await transationModel.findOne({idempotencyKey});

    if (!existing) {
        return {halted: false};
    }

    if (existing.status === 'completed') {
        res.status(200).json({
            message: "Transaction already completed",
            status: "success",
            transaction: existing
        });
        return {halted: true};
    }

    if (existing.status === 'pending') {
        res.status(200).json({
            message: "Transaction is still pending"
        });
        return {halted: true};
    }

    if (existing.status === 'failed') {
        res.status(200).json({
            message: "Transaction already failed"
        });
        return {halted: true};
    }

    if (existing.status === 'reversed') {
        res.status(200).json({
            message: "Transaction already reversed"
        });
        return {halted: true};
    }

    res.status(200).json({
        message: "Transaction already exists"
    });
    return {halted: true};
}

module.exports = checkIdempotency;
