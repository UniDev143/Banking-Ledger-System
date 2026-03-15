const {Router} = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const createTransationController = require('../controler/transaction/createTransationController');
const getTransactionsController = require('../controler/transaction/getTransactionsController');


const transactionRouter = Router();







transactionRouter.get('/', authMiddleware.authMiddleware , getTransactionsController);
transactionRouter.post('/', authMiddleware.authMiddleware , createTransationController);




module.exports = transactionRouter;