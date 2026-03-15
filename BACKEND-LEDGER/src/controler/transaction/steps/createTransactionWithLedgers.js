const mongoose = require('mongoose');
const transationModel = require('../../../model/transaction');
const ledgerModel = require('../../../model/ledger');

async function createTransactionWithLedgers({fromAccount, toAccount, amount, idempotencyKey}) {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const transaction = (await transationModel.create([{
            fromAccount,
            toAccount,
            amount,
            idempotencyKey,
            status: 'pending'
        }], {session}))[0];

        await ledgerModel.create([{
            account: fromAccount,
            amount: amount,
            type: 'debit',
            transaction: transaction._id
        }], {session});

        await ledgerModel.create([{
            account: toAccount,
            amount: amount,
            type: 'credit',
            transaction: transaction._id
        }], {session});

        transaction.status = 'completed';
        await transaction.save({session});
        await session.commitTransaction();
        return transaction;
    } catch (error) {
        await session.abortTransaction();
        throw error;
    } finally {
        session.endSession();
    }
}

module.exports = createTransactionWithLedgers;
