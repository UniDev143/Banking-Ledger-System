import { useEffect, useState } from 'react'
import { useAuth } from '../../UseContext.jsx'

const formatCurrency = (value = 0) => `$${Number(value || 0).toLocaleString()}`

const formatDate = (value) => {
  if (!value) return '--'
  return new Date(value).toLocaleDateString()
}

const formatTime = (value) => {
  if (!value) return '--'
  return new Date(value).toLocaleTimeString()
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

const ITEMS_PER_PAGE = 6

function Transactions() {
  const { transactions, transactionsLoading, transactionsError, accountId } = useAuth()
  const [transactionTypeFilter, setTransactionTypeFilter] = useState('all')
  const [dateRangeFilter, setDateRangeFilter] = useState('last30days')
  const [currentPage, setCurrentPage] = useState(1)

  const now = new Date()
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const startOfThisMonth = new Date(now.getFullYear(), now.getMonth(), 1)
  const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1)

  const filteredTransactions = transactions.filter((transaction) => {
    const isDebit = normalizeAccountId(transaction?.fromAccount) === normalizeAccountId(accountId)
    const createdAt = transaction?.createdAt ? new Date(transaction.createdAt) : null

    if (dateRangeFilter === 'last7days') {
      const sevenDaysAgo = new Date(startOfToday)
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
      if (!createdAt || createdAt < sevenDaysAgo) {
        return false
      }
    }

    if (dateRangeFilter === 'last30days') {
      const thirtyDaysAgo = new Date(startOfToday)
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
      if (!createdAt || createdAt < thirtyDaysAgo) {
        return false
      }
    }

    if (dateRangeFilter === 'thisMonth') {
      if (!createdAt || createdAt < startOfThisMonth) {
        return false
      }
    }

    if (dateRangeFilter === 'lastMonth') {
      if (!createdAt || createdAt < startOfLastMonth || createdAt >= startOfThisMonth) {
        return false
      }
    }

    if (transactionTypeFilter === 'received') {
      return !isDebit
    }

    if (transactionTypeFilter === 'sent') {
      return isDebit
    }

    return true
  })

  const totalPages = Math.max(1, Math.ceil(filteredTransactions.length / ITEMS_PER_PAGE))
  const shouldShowPagination = filteredTransactions.length > ITEMS_PER_PAGE
  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  )

  useEffect(() => {
    setCurrentPage(1)
  }, [transactionTypeFilter, dateRangeFilter])

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages)
    }
  }, [currentPage, totalPages])

  const goToPreviousPage = () => {
    setCurrentPage((previousPage) => Math.max(1, previousPage - 1))
  }

  const goToNextPage = () => {
    setCurrentPage((previousPage) => Math.min(totalPages, previousPage + 1))
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">All Transactions</h1>
        <p className="text-white/60">View and manage your transaction history.</p>
      </div>

      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <select
          value={transactionTypeFilter}
          onChange={(event) => setTransactionTypeFilter(event.target.value)}
          className="bg-[#1a2f2f] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#f7ef8a]/50"
        >
          <option value="all">All Types</option>
          <option value="received">Received</option>
          <option value="sent">Sent</option>
        </select>

        <select
          value={dateRangeFilter}
          onChange={(event) => setDateRangeFilter(event.target.value)}
          className="bg-[#1a2f2f] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#f7ef8a]/50"
        >
          <option value="last30days">Last 30 Days</option>
          <option value="last7days">Last 7 Days</option>
          <option value="thisMonth">This Month</option>
          <option value="lastMonth">Last Month</option>
        </select>

      </div>

      {/* Transactions List */}
      <div className="bg-[#1a2f2f] border border-white/10 rounded-3xl p-6">
        <div className="space-y-3">
          {transactionsLoading && (
            <p className="text-white/60 text-sm">Loading transactions...</p>
          )}

          {!transactionsLoading && transactionsError && (
            <p className="text-red-300 text-sm">{transactionsError}</p>
          )}

          {!transactionsLoading && !transactionsError && filteredTransactions.length === 0 && (
            <p className="text-white/60 text-sm">No transactions found.</p>
          )}

          {!transactionsLoading && !transactionsError && paginatedTransactions.map((transaction) => {
            const isDebit = normalizeAccountId(transaction?.fromAccount) === normalizeAccountId(accountId)
            const isCredit = !isDebit

            return (
              <div
                key={transaction._id}
                className="flex items-center justify-between p-4 bg-[#0f2222] border border-white/5 rounded-2xl hover:bg-[#152626] transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-[#1a3333] border border-white/10 flex items-center justify-center">
                    <span className={`text-2xl ${isCredit ? 'text-green-400' : 'text-red-400'}`}>{isCredit ? '⬇' : '⬆'}</span>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">{isCredit ? 'Credit Transaction' : 'Debit Transaction'}</h3>
                    <p className="text-white/50 text-sm">Status: {transaction.status}</p>
                  </div>
                </div>

                <div className="text-right">
                  <p className={`font-bold text-lg ${isCredit ? 'text-green-400' : 'text-red-400'}`}>
                    {isCredit ? '+' : '-'}{formatCurrency(transaction.amount)}
                  </p>
                  <p className="text-white/50 text-sm">
                    {formatDate(transaction.createdAt)} • {formatTime(transaction.createdAt)}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Pagination */}
        {shouldShowPagination && (
          <div className="flex items-center justify-center gap-2 mt-6 pt-6 border-t border-white/5">
            <button
              onClick={goToPreviousPage}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <button
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Transactions
