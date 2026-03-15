import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import axios from 'axios'

const AuthContext =
	globalThis.__bankingLedgerAuthContext || createContext(null)

if (!globalThis.__bankingLedgerAuthContext) {
	globalThis.__bankingLedgerAuthContext = AuthContext
}

const API_BASE_URL = 'http://localhost:3000'

const normalizeAccountId = (value) => {
	if (!value) return ''
	if (typeof value === 'string') return value
	if (typeof value === 'object') {
		if (value._id) return String(value._id)
		if (value.$oid) return String(value.$oid)
	}
	return String(value)
}

const formatCurrency = (value = 0) => `$${Number(value || 0).toLocaleString()}`

const formatRelativeTime = (dateValue) => {
	if (!dateValue) return 'just now'

	const now = Date.now()
	const time = new Date(dateValue).getTime()
	const diffMs = Math.max(now - time, 0)
	const minute = 60 * 1000
	const hour = 60 * minute
	const day = 24 * hour

	if (diffMs < minute) return 'just now'
	if (diffMs < hour) return `${Math.floor(diffMs / minute)} minutes ago`
	if (diffMs < day) return `${Math.floor(diffMs / hour)} hours ago`
	return `${Math.floor(diffMs / day)} days ago`
}

export function AuthProvider({ children }) {
	const [user, setUser] = useState(null)
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [accountId, setAccountId] = useState('')
	const [status, setStatus] = useState('')
	const [isAuthenticated, setIsAuthenticated] = useState(false)
	const [authLoading, setAuthLoading] = useState(true)
	const [transactions, setTransactions] = useState([])
	const [totalDebit, setTotalDebit] = useState(0)
	const [totalCredit, setTotalCredit] = useState(0)
	const [transactionPagination, setTransactionPagination] = useState(null)
	const [transactionsLoading, setTransactionsLoading] = useState(false)
	const [transactionsError, setTransactionsError] = useState('')
	const [lastSeenNotificationAt, setLastSeenNotificationAt] = useState(null)

	useEffect(() => {
		if (!accountId) {
			setLastSeenNotificationAt(null)
			return
		}
		const storedValue = localStorage.getItem(`last_seen_notification_at_${accountId}`)
		setLastSeenNotificationAt(storedValue || null)
	}, [accountId])

	const clearAuthState = () => {
		setUser(null)
		setName('')
		setEmail('')
		setAccountId('')
		setStatus('')
		setIsAuthenticated(false)
		resetTransactions()
	}

	const applyUser = (responseUser) => {
		setUser(responseUser)
		setName(responseUser?.name || '')
		setEmail(responseUser?.email || '')
		setAccountId(responseUser?.account_id || '')
		setStatus(responseUser?.status || '')
		setIsAuthenticated(true)
	}

	// On app load, verify auth by calling /me with the httpOnly cookie
	useEffect(() => {
		axios.get(`${API_BASE_URL}/api/auth/me`, { withCredentials: true })
			.then((response) => {
				applyUser(response?.data?.user || null)
			})
			.catch(() => {
				clearAuthState()
			})
			.finally(() => {
				setAuthLoading(false)
			})
	}, [])

	const resetTransactions = () => {
		setTransactions([])
		setTotalDebit(0)
		setTotalCredit(0)
		setTransactionPagination(null)
		setTransactionsError('')
	}

	const fetchTransactions = async (options = {}) => {
		const { page = 1, limit = 50 } = options

		setTransactionsLoading(true)
		setTransactionsError('')

		try {
			const response = await axios.get(`${API_BASE_URL}/api/transaction`, {
				params: { page, limit },
				withCredentials: true,
			})

			const responseData = response?.data || {}
			setTransactions(responseData.transactions || [])
			setTotalDebit(responseData.totaldebit || 0)
			setTotalCredit(responseData.totalcredit || 0)
			setTransactionPagination(responseData.pagination || null)

			return responseData
		} catch (error) {
			// Cookie invalid or expired — clear session so ProtectedRoute redirects to login
			if (error?.response?.status === 401 || error?.response?.status === 403) {
				clearAuthState()
				return null
			}
			setTransactionsError(error?.response?.data?.message || 'Failed to load transactions')
			throw error
		} finally {
			setTransactionsLoading(false)
		}
	}

	useEffect(() => {
		if (!isAuthenticated) {
			resetTransactions()
			return
		}
		fetchTransactions().catch(() => {})
	}, [isAuthenticated])

	const paymentNotifications = useMemo(() => {
		const currentAccountId = normalizeAccountId(accountId)

		return transactions
			.filter((transaction) => normalizeAccountId(transaction?.fromAccount) !== currentAccountId)
			.map((transaction) => ({
				id: transaction._id,
				icon: '💰',
				title: 'Payment Received',
				message: `You received ${formatCurrency(transaction.amount)}`,
				time: formatRelativeTime(transaction.createdAt),
				createdAt: transaction.createdAt,
			}))
			.sort((first, second) => new Date(second.createdAt || 0) - new Date(first.createdAt || 0))
	}, [transactions, accountId])

	const notificationCount = paymentNotifications.length

	const hasUnreadNotifications = useMemo(() => {
		if (paymentNotifications.length === 0) return false
		if (!lastSeenNotificationAt) return true

		const lastSeenTime = new Date(lastSeenNotificationAt).getTime()
		if (Number.isNaN(lastSeenTime)) return true

		return paymentNotifications.some((notification) => {
			const notificationTime = new Date(notification.createdAt || 0).getTime()
			return notificationTime > lastSeenTime
		})
	}, [paymentNotifications, lastSeenNotificationAt])

	const markNotificationsVisited = useCallback(() => {
		const visitedAt = new Date().toISOString()
		setLastSeenNotificationAt(visitedAt)
		if (accountId) {
			localStorage.setItem(`last_seen_notification_at_${accountId}`, visitedAt)
		}
	}, [accountId])

	const login = async ({ email, password }) => {
		const response = await axios.post(
			`${API_BASE_URL}/api/auth/login`,
			{ email, password },
			{ withCredentials: true },
		)

		const responseUser = response?.data?.user || null
		applyUser(responseUser)
		await fetchTransactions()
		return response.data
	}

	const register = async ({ name, email, password }) => {
		const response = await axios.post(
			`${API_BASE_URL}/api/auth/register`,
			{ name, email, password },
			{ withCredentials: true },
		)

		const responseUser = response?.data?.user || null
		applyUser(responseUser)
		await fetchTransactions()
		return response.data
	}

	const logout = async () => {
		try {
			await axios.post(`${API_BASE_URL}/api/auth/logout`, {}, { withCredentials: true })
		} catch (error) {
			console.error('Logout API call failed:', error)
		} finally {
			const currentAccountId = accountId
			clearAuthState()
			setLastSeenNotificationAt(null)
			if (currentAccountId) {
				localStorage.removeItem(`last_seen_notification_at_${currentAccountId}`)
			}
		}
	}

	const totalAmount = totalCredit - totalDebit

	const value = useMemo(
		() => ({
			user,
			name,
			email,
			accountId,
			status,
			transactions,
			totalDebit,
			totalCredit,
			totalAmount,
			transactionPagination,
			transactionsLoading,
			transactionsError,
			paymentNotifications,
			notificationCount,
			hasUnreadNotifications,
			markNotificationsVisited,
			isAuthenticated,
			authLoading,
			fetchTransactions,
			login,
			register,
			logout,
		}),
		[
			user,
			name,
			email,
			accountId,
			status,
			transactions,
			totalDebit,
			totalCredit,
			totalAmount,
			transactionPagination,
			transactionsLoading,
			transactionsError,
			paymentNotifications,
			notificationCount,
			hasUnreadNotifications,
			markNotificationsVisited,
			isAuthenticated,
			authLoading,
		],
	)

	return <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
}

export function useAuth() {
	const context = useContext(AuthContext)
	if (!context) {
		throw new Error('useAuth must be used within AuthProvider')
	}

	return context
}
