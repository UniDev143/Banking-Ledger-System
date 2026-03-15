const accountModel = require('../../../model/account');

async function resolveAccountIds(user, accountId, res) {
    if (accountId) {
        const account = await accountModel.findOne({
            _id: accountId,
            user: user._id
        }).select('_id');

        if (!account) {
            res.status(404).json({
                message: "Account not found",
                status: "fail"
            });
            return null;
        }

        return [account._id];
    }

    const accounts = await accountModel.find({user: user._id}).select('_id');
    return accounts.map((account) => account._id);
}

module.exports = resolveAccountIds;
