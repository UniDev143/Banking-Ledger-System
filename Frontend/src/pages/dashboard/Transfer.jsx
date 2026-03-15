import { useState } from 'react'
import axios from 'axios'
import { useAuth } from '../../UseContext.jsx'
import TransferConfirmation from '../../Components/TransferConfirmation.jsx'
import TransferReceipt from '../../Components/TransferReceipt.jsx'

const API_BASE_URL = 'http://localhost:3000'

const generateIdempotencyKey = () => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID()
  }

  return `tx-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`
}

function Transfer() {
  const { accountId, totalAmount, name, token, fetchTransactions } = useAuth()
  const [sendAmount, setSendAmount] = useState('')
  const [recipientAccountId, setRecipientAccountId] = useState('')
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [showReceipt, setShowReceipt] = useState(false)
  const [transactionData, setTransactionData] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const numericSendAmount = Number(sendAmount || 0)
  const hasExceededBalance = numericSendAmount > Number(totalAmount || 0)

  const handleTransferClick = (e) => {
    e.preventDefault()
    if (!recipientAccountId || !sendAmount || numericSendAmount <= 0) {
      setError('Please fill in all required fields')
      return
    }
    setError('')
    setShowConfirmation(true)
  }

  const handleConfirmTransfer = async () => {
    setIsSubmitting(true)
    setError('')

    try {
      const payload = {
        fromAccount: accountId,
        toAccount: recipientAccountId,
        amount: numericSendAmount,
        idempotencyKey: generateIdempotencyKey(),
      }

      const response = await axios.post(
        `${API_BASE_URL}/api/transaction`,
        payload,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )

      const responseTransaction = response?.data?.transaction

      setTransactionData({
        senderName: name,
        recipientId: recipientAccountId,
        transactionId: responseTransaction?._id || `TXN${Date.now()}`,
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
        status: responseTransaction?.status || 'success'
      })

      await fetchTransactions(token)
      setShowConfirmation(false)
      setShowReceipt(true)
    } catch (requestError) {
      setError(requestError?.response?.data?.message || 'Transaction failed')
      setShowConfirmation(false)
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetForm = () => {
    setSendAmount('')
    setRecipientAccountId('')
    setShowReceipt(false)
    setShowConfirmation(false)
    setTransactionData(null)
    setError('')
  }

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-2">Transfer Money</h1>
        <p className="text-white/60 mb-8">Send money to anyone, anywhere.</p>

        <div className="bg-[#1a2f2f] border border-white/10 rounded-3xl p-8">
          {error && (
            <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-300 text-sm">
              {error}
            </div>
          )}
          
          <form className="space-y-6" onSubmit={handleTransferClick}>
            <div className="grid grid-cols-2 gap-6">
              <label className="block">
                <span className="text-white/80 text-sm font-semibold mb-2 block">From Account</span>
                <input
                  type="text"
                  value={accountId || ''}
                  readOnly
                  placeholder="No account found"
                  className="w-full bg-[#0f2222]/70 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:outline-none"
                />
              </label>

              <label className="block">
                <span className="text-white/80 text-sm font-semibold mb-2 block">Transfer Type</span>
                <input
                  type="text"
                  value="Internal Transfer"
                  readOnly
                  className="w-full bg-[#0f2222]/70 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none"
                />
              </label>
            </div>

            <label className="block">
              <span className="text-white/80 text-sm font-semibold mb-2 block">Recipient Account Number</span>
              <input
                type="text"
                value={recipientAccountId}
                onChange={(e) => setRecipientAccountId(e.target.value)}
                placeholder="Enter account number"
                className="w-full bg-[#0f2222] border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-[#f7ef8a]/50"
              />
            </label>

            <label className="block">
              <span className="text-white/80 text-sm font-semibold mb-2 block">Amount</span>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 text-xl">$</span>
                <input
                  type="number"
                  value={sendAmount}
                  onChange={(e) => setSendAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full bg-[#0f2222] border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-[#f7ef8a]/50"
                />
              </div>
              {hasExceededBalance && (
                <p className="mt-2 text-sm text-red-300">
                  Warning: Sending amount cannot be greater than your available balance.
                </p>
              )}
            </label>

            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={hasExceededBalance}
                className={`flex-1 py-4 rounded-xl font-semibold text-[#1a1a1a] bg-gradient-to-r from-[#f7ef8a] to-[#d2ac47] shadow-lg transition-all ${
                  hasExceededBalance
                    ? 'opacity-50 cursor-not-allowed'
                    : 'hover:from-[#fff2a8] hover:to-[#deb85b]'
                }`}
              >
                Transfer Now
              </button>
            </div>
          </form>
        </div>

        {/* Confirmation Modal */}
        <TransferConfirmation
          isOpen={showConfirmation}
          onClose={() => setShowConfirmation(false)}
          onConfirm={handleConfirmTransfer}
          accountId={accountId}
          name={name}
          recipientAccountId={recipientAccountId}
          amount={numericSendAmount}
          isSubmitting={isSubmitting}
        />

        {/* Receipt Modal */}
        <TransferReceipt
          isOpen={showReceipt}
          onClose={resetForm}
          transactionData={transactionData}
          accountId={accountId}
          amount={numericSendAmount}
        />
      </div>
    </div>
  )
}

export default Transfer
