function TransferConfirmation({ 
  isOpen, 
  onClose, 
  onConfirm, 
  accountId, 
  name, 
  recipientAccountId, 
  amount, 
  isSubmitting 
}) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-[#0f2222] border border-white/10 rounded-2xl p-6 max-w-md w-full shadow-2xl">
        <h2 className="text-xl font-bold text-white mb-4">Confirm Transfer</h2>
        
        <div className="space-y-3 mb-6">
          <div className="bg-[#152626] border border-white/10 rounded-lg p-3">
            <p className="text-white/60 text-xs mb-1">From Account</p>
            <p className="text-white font-mono text-sm">{accountId}</p>
            <p className="text-white/80 text-sm">{name}</p>
          </div>

          <div className="bg-[#152626] border border-white/10 rounded-lg p-3">
            <p className="text-white/60 text-xs mb-1">To Account</p>
            <p className="text-white font-mono text-sm">{recipientAccountId}</p>
          </div>
          
          <div className="bg-[#152626] border border-white/10 rounded-lg p-3">
            <p className="text-white/60 text-xs mb-1">Amount</p>
            <p className="text-white text-2xl font-bold">${Number(amount).toFixed(2)}</p>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onConfirm}
            disabled={isSubmitting}
            className="flex-1 bg-gradient-to-r from-[#f7ef8a] to-[#d2ac47] text-[#1a1a1a] font-semibold py-3 rounded-lg hover:from-[#fff2a8] hover:to-[#deb85b] transition-all disabled:opacity-50"
          >
            {isSubmitting ? 'Processing...' : 'Confirm'}
          </button>
          <button
            onClick={onClose}
            disabled={isSubmitting}
            className="px-6 bg-white/5 border border-white/10 text-white font-semibold py-3 rounded-lg hover:bg-white/10 transition-all"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export default TransferConfirmation
