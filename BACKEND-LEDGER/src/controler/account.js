const accountModel = require('../model/account');
const mongoose = require('mongoose');
const rewardService = require('../service/reward');

async function createAccountController(req, res) {
    const user = req.user;
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const newAccount = (await accountModel.create([{
            user: user._id,
            account_type: 'savings'
        }], {session}))[0];

        const rewardAmount = await rewardService.grantJoiningReward(user, newAccount, session);

        await session.commitTransaction();
        session.endSession();

        // If called from registration, send combined response
        if (req.authToken) {
            return res.status(201).json({
                message: "Registration successful",
                status: "success",
                user: {
                    _id: user._id,  
                    email: user.email,
                    name: user.name,
                    account_id: newAccount._id,
                    status: newAccount.status
                },
                account: newAccount,
                reward: rewardAmount,
                token: req.authToken
            });
        }
        
        // Normal account creation response
        res.status(201).json({
            message: "Account created successfully",
            status: "success",
            data: newAccount,
            reward: rewardAmount
        });
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        res.status(500).json({
            message: "Failed to create account",
            status: "fail"
        });
    }

}

module.exports = {
    createAccountController
}