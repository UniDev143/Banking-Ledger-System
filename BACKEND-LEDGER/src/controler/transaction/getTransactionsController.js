const transationModel = require('../../model/transaction');
const resolveAccountIds = require('./steps/resolveAccountIds');

async function getTransactionsController(req, res) {
    try {
        const user = req.user;
        if (!user || !user._id) {
            return res.status(401).json({
                message: "Unauthorized",
                status: "fail"
            });
        }

        const page = Math.max(parseInt(req.query.page || "1", 10), 1);
        const limit = Math.min(Math.max(parseInt(req.query.limit || "50", 10), 1), 200);
        const skip = (page - 1) * limit;

        const accountIds = await resolveAccountIds(user, req.query.accountId, res);
        if (!accountIds) {
            return;
        }

        if (accountIds.length === 0) {
            return res.status(200).json({
                message: "No accounts found",
                status: "success",
                transactions: [],
                totaldebit: 0,
                totalcredit: 0,
                pagination: {page, limit, total: 0}
            });
        }

        const query = {
            status: 'completed',
            $or: [
                {fromAccount: {$in: accountIds}},
                {toAccount: {$in: accountIds}}
            ]
        };

        const [transactions, total, allTransactions] = await Promise.all([
            transationModel.find(query)
                .sort({createdAt: -1})
                .skip(skip)
                .limit(limit)
                .lean(),
            transationModel.countDocuments(query),
            transationModel.find(query).lean()
        ]);

        const userAccountIdSet = new Set(accountIds.map((id) => id.toString()));

        // Calculate total debit and credit
        let totaldebit = 0;
        let totalcredit = 0;

        allTransactions.forEach(transaction => {
            // Check if this account is the sender (debit)
            if (userAccountIdSet.has(transaction.fromAccount.toString())) {
                totaldebit += transaction.amount;
            }
            // Check if this account is the receiver (credit)
            if (userAccountIdSet.has(transaction.toAccount.toString())) {
                totalcredit += transaction.amount;
            }
        });

        return res.status(200).json({
            message: "Transactions fetched successfully",
            status: "success",
            transactions,
            totaldebit,
            totalcredit,
            pagination: {page, limit, total}
        });
    } catch (error) {
        return res.status(500).json({
            message: "Failed to fetch transactions",
            status: "fail"
        });
    }
}

module.exports = getTransactionsController;
