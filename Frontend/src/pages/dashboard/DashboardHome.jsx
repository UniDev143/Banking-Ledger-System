import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../UseContext.jsx'
import RequestMoneyPopup from '../../Components/RequestMoneyPopup.jsx'

function DashboardHome() {
  const navigate = useNavigate()
  const {
    totalAmount,
    accountId,
    name,
    transactions,
    transactionsLoading,
    transactionsError,
  } = useAuth()

  const [isBalanceVisible, setIsBalanceVisible] = useState(true)
  const [showRequestMoneyPopup, setShowRequestMoneyPopup] = useState(false)

  const toggleBalanceVisibility = () => {
    setIsBalanceVisible(!isBalanceVisible)
  }

  const handleSendMoney = () => {
    navigate('/dashboard/transfer')
  }

  const handleRequestMoney = () => {
    setShowRequestMoneyPopup(true)
  }

  const closeRequestMoneyPopup = () => {
    setShowRequestMoneyPopup(false)
  }

  const formatCurrency = (value) => {
    const numericValue = Number(value || 0)
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(numericValue)
  }

  const formatDate = (dateValue) => {
    if (!dateValue) return '-'
    const dateObj = new Date(dateValue)
    return dateObj.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }

  const formatTime = (dateValue) => {
    if (!dateValue) return '-'
    const dateObj = new Date(dateValue)
    return dateObj.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const normalizeAccountId = (value) => {
    if (!value) return ''
    if (typeof value === 'string') return value
    if (typeof value === 'object') {
      if (value._id) return String(value._id)
      if (value.$oid) return String(value.$oid)
    }
    return String(value)
  }

  return (
    <div className="p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[#f7ef8a] text-xl">🏛</span>
            <span className="text-white/60 text-sm font-semibold">TEST BANK</span>
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Good Evening, {name || 'User'}</h1>
          <p className="text-white/60">Welcome back to your banking dashboard.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {/* Left Column - Balance & Actions */}
        <div className="space-y-6 ">
          {/* Total Balance Card */}
          <div className="bg-white/10 w-2/5 backdrop-blur-xl border border-white/10 rounded-2xl p-3 shadow-2xl">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-white/80 text-sm font-semibold">Total Balance</h2>
              <div className="flex items-center gap-2">
                <button 
                  onClick={toggleBalanceVisibility}
                  className="text-white/60 hover:text-white transition-colors"
                  aria-label={isBalanceVisible ? 'Hide balance' : 'Show balance'}
                >
                  <span className="text-sm">{isBalanceVisible ? '👁' : '👁‍🗨'}</span>
                </button>
              </div>
            </div>

            <div className="mb-2">
              <h3 className="text-3xl font-bold bg-gradient-to-r from-[#f7ef8a] to-[#d2ac47] bg-clip-text text-transparent mb-2">
                {isBalanceVisible ? formatCurrency(totalAmount) : '***********'}
              </h3>
              <p className="text-white/60 text-sm">{accountId || '-'}</p>
            </div>

            <div className="flex items-center justify-end">
              <span className="text-white/60 text-sm">USD</span>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 w-2/5 gap-2">
            <button 
              onClick={handleSendMoney}
              className="bg-gradient-to-r from-[#f7ef8a] to-[#d2ac47] rounded-sm p-3 flex flex-col items-center justify-center gap-1.5 hover:from-[#fff2a8] hover:to-[#deb85b] transition-all shadow-lg group"
            >
              <span className="text-xl grayscale">📤</span>
              <span className="text-[#1a1a1a] font-semibold text-xs">Send Money</span>
            </button>

            <button 
              onClick={handleRequestMoney}
              className="bg-gradient-to-r from-[#e8dfa5] to-[#c9a655] rounded-sm p-3 flex flex-col items-center justify-center gap-1.5 hover:from-[#f0e7b5] hover:to-[#d4b165] transition-all shadow-lg group"
            >
              <span className="text-xl grayscale">💰</span>
              <span className="text-[#1a1a1a] font-semibold text-xs">Request Money</span>
            </button>
          </div>

          {/* Recent Transactions */}
          <div className="bg-white/10 w-2/4 backdrop-blur-xl border border-white/10 rounded-2xl p-3">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xl font-bold text-white">Recent Transactions</h2>
              <button 
                onClick={() => navigate('/dashboard/transactions')}
                className="text-[#f7ef8a] hover:text-[#d2ac47] text-sm font-semibold flex items-center gap-2"
              >
                View All
                <span>→</span>
              </button>
            </div>

            <div className="space-y-1.5">
              {transactionsLoading && (
                <p className="text-white/60 text-sm">Loading transactions...</p>
              )}

              {!transactionsLoading && transactionsError && (
                <p className="text-red-300 text-sm">{transactionsError}</p>
              )}

              {!transactionsLoading && !transactionsError && transactions.length === 0 && (
                <p className="text-white/60 text-sm">No transactions found.</p>
              )}

              {!transactionsLoading && !transactionsError && transactions.slice(0, 4).map((transaction) => {
                const isDebit = normalizeAccountId(transaction?.fromAccount) === normalizeAccountId(accountId)
                const isCredit = !isDebit

                return (
                  <div
                    key={transaction._id}
                    className="flex items-center justify-between p-2 bg-[#0f2222] border border-white/5 rounded-xl hover:bg-[#152626] transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-[#1a3333] border border-white/10 flex items-center justify-center">
                        <span className={`text-sm ${isCredit ? 'text-green-400' : 'text-red-400'}`}>{isCredit ? '⬇' : '⬆'}</span>
                      </div>
                      <div>
                        <h3 className="text-white font-semibold text-sm">{isCredit ? 'Credit Received' : 'Debit Transfer'}</h3>
                        <p className="text-white/50 text-xs">Status: {transaction.status}</p>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className={`font-bold ${isCredit ? 'text-green-400' : 'text-red-400'}`}>
                        {isCredit ? '+' : '-'}{formatCurrency(transaction.amount)}
                      </p>
                      <p className="text-white/50 text-xs">
                        {formatDate(transaction.createdAt)}
                        <span className="ml-1">{formatTime(transaction.createdAt)}</span>
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

      </div>

      {/* Request Money Popup Component */}
      <RequestMoneyPopup 
        isOpen={showRequestMoneyPopup} 
        onClose={closeRequestMoneyPopup} 
        accountId={accountId}
      />
    </div>
  )
}

export default DashboardHome
