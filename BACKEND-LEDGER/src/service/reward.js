const transationModel = require('../model/transaction');
const ledgerModel = require('../model/ledger');
const emailService = require('./email');

// System reward account ID - always sends rewards
const SYSTEM_REWARD_ACCOUNT = '000000000000000000000000';

async function grantJoiningReward(user, account, session) {
    const rewardAmount = Math.floor(Math.random() * 81) + 20;

    const rewardTransaction = (await transationModel.create([{
        fromAccount: SYSTEM_REWARD_ACCOUNT,
        toAccount: account._id,
        amount: rewardAmount,
        idempotencyKey: `reward-${account._id}-${Date.now()}`,
        status: 'completed'
    }], {session}))[0];

    await ledgerModel.create([{
        account: account._id,
        amount: rewardAmount,
        type: 'credit',
        transaction: rewardTransaction._id
    }], {session});

    await emailService.sendRewardEmail(
        user.email,
        user.name,
        rewardAmount,
        account._id
    );

    return rewardAmount;
}

module.exports = {
    grantJoiningReward
};
