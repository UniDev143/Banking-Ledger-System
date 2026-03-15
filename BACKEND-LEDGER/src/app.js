const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRoutes = require('./route/auth');
const accountRoutes = require('./route/account');
const transactionRoutes = require('./route/transaction');

const app = express();

const allowedOrigin = process.env.FRONTEND_URL || 'http://localhost:5173';

app.use(express.json());
app.use(cors({
	origin: allowedOrigin,
	credentials: true,
}));
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/account", accountRoutes);
app.use("/api/transaction", transactionRoutes); 

module.exports = app;