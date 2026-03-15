const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    fromAccount: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'account',
        required: true,
        index: true
    },
    toAccount: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'account',
        required: true,
        index: true
    },
    status: {
        type: String,
        enum: {
            values: ['pending', 'completed', 'failed' , 'reversed'],
            message: 'Status must be either pending, completed, or failed or reversed',
        },
        default: 'pending'
    },
    amount: {
        type: Number,
        required: true,
        min: [0, 'Amount must be a positive number']
    },
    idempotencyKey: {
        type: String,
        required: true,
        unique: true,
        index: true
    }
}, {
    timestamps: true
});

const transactionModel = mongoose.model('transaction', transactionSchema);

module.exports = transactionModel;