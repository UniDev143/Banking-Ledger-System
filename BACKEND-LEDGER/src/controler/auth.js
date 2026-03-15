const userModel = require('../model/user');
const accountModel = require('../model/account');
const jwt = require('jsonwebtoken');
const emailService = require('../service/email');



async function userRegisterController(req, res, next) {

    const { name, email, password } = req.body;
    const isExists = await userModel.findOne({ email: email });
    if (isExists) {
        return res.status(422).json({
            message: "Email already exists",
            status: "fail"
        });
    }

    try {
        const user = await userModel.create({name, email, password });
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET , { expiresIn: '1h' });
        
        // Set token in httpOnly cookie so JS cannot read or tamper with it
        res.cookie('token', token, { httpOnly: true, sameSite: 'lax' });
        
        // Attach user and token to req for next controller
        req.user = user;
        req.authToken = token;
        
        // Send registration email asynchronously
        emailService.sendRegistrationEmail(user.email, user.name).catch(err => console.error('Email error:', err));
        
        // Pass control to next controller (createAccountController)
        next();
    } catch (error) {
        return res.status(500).json({
            message: "Failed to register user",
            status: "fail"
        });
    }
}

async function userLoginController(req, res) {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email: email }).select('+password')

    if (!user) {
        return res.status(401).json({
            message: "Invalid email or password",
            status: "fail"
        });
    }

    const isValidPassword = await user.comparePassword(password);
    if (!isValidPassword) {
        return res.status(401).json({
            message: "Invalid email or password",
            status: "fail"
        });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET , { expiresIn: '1h' });
    const account = await accountModel.findOne({ user: user._id });
    
    res.cookie('token', token, { httpOnly: true, sameSite: 'lax' })
    res.status(200).json({
       user: {
        _id: user._id,  
        email: user.email,
        name: user.name,
        account_id: account?._id || null,
        status: account?.status || null
       },
       token,
    });
}

async function userLogoutController(req, res) {
    res.clearCookie('token');
    return res.status(200).json({
        message: "Logged out successfully",
        status: "success"
    });
}

async function getMeController(req, res) {
    try {
        const user = req.user;
        const account = await accountModel.findOne({ user: user._id });
        return res.status(200).json({
            user: {
                _id: user._id,
                email: user.email,
                name: user.name,
                account_id: account?._id || null,
                status: account?.status || null
            }
        });
    } catch (error) {
        return res.status(500).json({ message: 'Failed to fetch user', status: 'fail' });
    }
}

module.exports = {
    userRegisterController,
    userLoginController,
    userLogoutController,
    getMeController
}