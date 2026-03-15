function ensureAccountsActive(fromUserAccount, toUserAccount, res) {
    if (fromUserAccount.status !== 'active' || toUserAccount.status !== 'active') {
        res.status(400).json({
            message: "FromAccount or ToAccount is not active",
            status: "fail"
        });
        return false;
    }

    return true;
}

module.exports = ensureAccountsActive;
