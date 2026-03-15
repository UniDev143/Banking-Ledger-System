# Banking Ledger System

A full-stack banking-style ledger application with secure authentication, account lifecycle management, atomic transfer handling, and a React dashboard.

## Highlights

- JWT-based auth with httpOnly cookie support (`/api/auth/*`)
- Account auto-creation after registration with joining reward credit
- Ledger-based balance computation (credits - debits)
- Idempotent transfer API using `idempotencyKey` to prevent duplicate processing
- Transaction flow guarded by account state and sufficient-balance checks
- Dashboard modules for transfer, transactions, analytics, and notifications
- Optional email notifications (registration, reward, transaction)

## Tech Stack

### Backend
- Node.js
- Express
- MongoDB + Mongoose
- JWT (`jsonwebtoken`)
- Nodemailer

### Frontend
- React 19 + Vite
- React Router
- Axios
- TailwindCSS

## Project Structure

```text
BACKEND-LEDGER/   # Express + MongoDB API
Frontend/         # React dashboard (Vite)
```

## Prerequisites

- Node.js 18+
- MongoDB instance (local or Atlas)
- npm

## Environment Variables

Create `BACKEND-LEDGER/.env`:

```env
MONGO_URI=mongodb://127.0.0.1:27017/banking-ledger
JWT_SECRET=your_jwt_secret_here
FRONTEND_URL=http://localhost:5173

# Optional email settings
ENABLE_EMAIL_NOTIFICATIONS=false
EMAIL_USER=
EMAIL_APP_PASSWORD=
CLIENT_ID=
CLIENT_SECRET=
REFRESH_TOKEN=
ACCESS_TOKEN=
```

> Email is optional. Keep `ENABLE_EMAIL_NOTIFICATIONS=false` for local dev if you do not configure credentials.

## Installation

From the repository root:

```bash
# Backend dependencies
cd BACKEND-LEDGER
npm install

# Frontend dependencies
cd ../Frontend
npm install
```

## Run Locally

### 1) Start backend (port 3000)

```bash
cd BACKEND-LEDGER
npm run dev
```

### 2) Start frontend (port 5173)

```bash
cd Frontend
npm run dev
```

Open: `http://localhost:5173`

## API Overview

Base URL: `http://localhost:3000`

### Auth
- `POST /api/auth/register` - Register user, issue token cookie, create account, grant reward
- `POST /api/auth/login` - Login and return user/account info
- `POST /api/auth/logout` - Logout user (auth required)
- `GET /api/auth/me` - Current authenticated user

### Account
- `POST /api/account/create` - Create account (auth required)

### Transaction
- `POST /api/transaction` - Create transfer (auth required)
- `GET /api/transaction?page=1&limit=50` - List account transactions + debit/credit totals (auth required)

## Transfer Request Example

```json
{
  "fromAccount": "<senderAccountId>",
  "toAccount": "<receiverAccountId>",
  "amount": 500,
  "idempotencyKey": "a-unique-key-per-request"
}
```

## Core Backend Flow (Transfer)

1. Validate payload (`fromAccount`, `toAccount`, `amount`, `idempotencyKey`)
2. Load both accounts
3. Check existing transaction by idempotency key
4. Ensure both accounts are active
5. Ensure sender has sufficient balance
6. Create transaction + debit/credit ledger entries in a MongoDB session
7. Mark transaction completed and return response

## Frontend Notes

- Auth state and transaction fetching are managed in `Frontend/src/UseContext.jsx`
- Transfer flow with idempotency key generation is in `Frontend/src/pages/dashboard/Transfer.jsx`
- API base URL is currently hardcoded as `http://localhost:3000` in those files

## Scripts

### Backend (`BACKEND-LEDGER/package.json`)
- `npm run dev` - Start with nodemon
- `npm run start` - Start with node

### Frontend (`Frontend/package.json`)
- `npm run dev` - Start Vite dev server
- `npm run build` - Production build
- `npm run preview` - Preview build
- `npm run lint` - Run ESLint

## Known Constraints

- Backend port is fixed to `3000` in `Server.js`
- Frontend API URL is hardcoded in source files (not env-based yet)
- No automated tests configured currently

## Future Improvements

- Move frontend API URL to Vite environment variables
- Add refresh-token/session strategy for longer auth sessions
- Add test coverage for transaction/idempotency flow
- Add Docker setup for one-command local startup
