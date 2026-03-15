const accountModel = require('../../../model/account');

async function loadAccounts(fromAccount, toAccount, res) {
    const [fromUserAccount, toUserAccount] = await Promise.all([
        accountModel.findById(fromAccount),
        accountModel.findById(toAccount)
    ]);

    if (!fromUserAccount || !toUserAccount) {
        res.status(404).json({
            message: "FromAccount or ToAccount not found",
            status: "fail"
        });
        return null;
    }

    return {fromUserAccount, toUserAccount};
}

module.exports = loadAccounts;
