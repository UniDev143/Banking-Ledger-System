const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const accountController = require('../controler/account');

const router = express.Router();



router.post('/create', authMiddleware.authMiddleware , accountController.createAccountController); 






module.exports = router;