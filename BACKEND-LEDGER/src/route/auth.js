const express = require('express');
const authController = require('../controler/auth');
const authMiddleware = require('../middleware/authMiddleware');
const accountController = require('../controler/account');
const router = express.Router();



router.post('/register', authController.userRegisterController, accountController.createAccountController);

router.post('/login',authController.userLoginController);

router.post('/logout', authMiddleware.authMiddleware, authController.userLogoutController);

router.get('/me', authMiddleware.authMiddleware, authController.getMeController);







module.exports = router;