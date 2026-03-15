const emailService = require('../../../service/email');

async function sendTransactionEmail(user, amount, fromAccountId, toAccountId) {
    if (!user || !user.email || !user.name) {
        return;
    }

    await emailService.sendTransactionEmail(
        user.email,
        user.name,
        amount,
        fromAccountId,
        toAccountId
    );
}

module.exports = sendTransactionEmail;
