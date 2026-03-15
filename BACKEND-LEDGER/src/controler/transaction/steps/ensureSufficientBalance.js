async function ensureSufficientBalance(fromUserAccount, amount, res) {
    const balance = await fromUserAccount.getBalance();

    if (balance < amount) {
        res.status(400).json({
            message: "Insufficient balance in FromAccount",
            status: "fail"
        });
        return false;
    }

    return true;
}

module.exports = ensureSufficientBalance;
