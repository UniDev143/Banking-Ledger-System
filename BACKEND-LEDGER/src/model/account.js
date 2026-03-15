const mongoose = require('mongoose');
const ledgerModel = require('./ledger');

const accountSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
        index: true
    },
    account_type:{
        type: String,
        required: [true, 'Account type is required'],
        enum: {
            values: ['savings', 'current', 'bussiness'],
            message: 'Account type must be either savings, current, or business',
        }
},
    status: {
        type: String,
        enum: {
            values: ['active', 'frozen', 'closed'],
            message: 'Status must be either active, frozen, or closed',
        },
            default: 'active'
        
        },
        currency: { 
            type: String,
            required: [true, 'Currency is required'],
            default: 'PKR',
        }
},{
        timestamps: true
    });

    accountSchema.index({ user: 1 , status: 1 });

    accountSchema.methods.getBalance = async function() {
        const balanceData = await ledgerModel.aggregate([
            {$match: {account: this._id}},
            {
                $group: {
                    _id: null,
                    totalDebit: {
                        $sum: {
                            $cond: [
                                {$eq: ['$type', 'debit']},
                                '$amount',
                                0
                            ]
                        }
                    },
                    totalCredit: {
                        $sum: {
                            $cond: [
                                {$eq: ['$type', 'credit']},
                                '$amount',
                                0
                            ]
                        }
                    }
                }
            },
            {
                $project: {
                    _id: 0,
                    balance: {$subtract: ['$totalCredit', '$totalDebit']}
                }
            }
            
        ])

        if(balanceData.length === 0) {
            return 0;
        }
        return balanceData[0].balance;
    }


    const accountModel = mongoose.model('account', accountSchema);

    module.exports = accountModel;