import { useState } from 'react'

function RequestMoneyPopup({ isOpen, onClose, accountId }) {
  const [copyConfirmation, setCopyConfirmation] = useState(false)

  const handleCopyAccountId = () => {
    if (accountId) {
      navigator.clipboard.writeText(accountId)
      setCopyConfirmation(true)
      setTimeout(() => setCopyConfirmation(false), 2000)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-[#0f2222] border border-white/10 rounded-2xl p-6 max-w-md w-full shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white">Request Money</h2>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white text-2xl"
          >
            ✕
          </button>
        </div>

        <div className="mb-4">
          <p className="text-white/60 text-sm mb-3">Share your account ID with others to receive money.</p>

          <div className="bg-[#152626] border border-white/10 rounded-lg p-4 mb-4">
            <p className="text-white/60 text-xs mb-2">Your Account ID:</p>
            <div className="flex items-center gap-2">
              <p className="text-white font-mono text-sm break-all flex-1">{accountId || '-'}</p>
              <button
                onClick={handleCopyAccountId}
                className="text-[#f7ef8a] hover:text-white transition-colors shrink-0"
                title="Copy account ID"
              >
                {copyConfirmation ? '✓' : '📋'}
              </button>
            </div>
          </div>

          {copyConfirmation && (
            <p className="text-green-400 text-xs mb-3">Account ID copied to clipboard!</p>
          )}

          <div className="bg-white/5 border border-white/10 rounded-lg p-3">
            <p className="text-white/60 text-xs leading-relaxed">
              <span className="font-semibold text-white">How to use:</span> Give your account ID to anyone who wants to send you money. They can paste it when making a transfer to your account.
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full bg-gradient-to-r from-[#f7ef8a] to-[#d2ac47] text-[#1a1a1a] font-semibold py-2 rounded-lg hover:from-[#fff2a8] hover:to-[#deb85b] transition-all"
        >
          Done
        </button>
      </div>
    </div>
  )
}

export default RequestMoneyPopup
