import { useRef } from 'react'

function TransferReceipt({ 
  isOpen, 
  onClose, 
  transactionData,
  accountId,
  amount 
}) {
  const receiptRef = useRef(null)

  const handleShare = async () => {
    if (!receiptRef.current) return

    try {
      // Dynamically import html2canvas
      const html2canvas = (await import('html2canvas')).default
      
      const canvas = await html2canvas(receiptRef.current, {
        backgroundColor: '#0f2222',
        scale: 2,
        logging: false,
      })

      // Convert canvas to blob
      const blob = await new Promise((resolve) => {
        canvas.toBlob(resolve, 'image/png')
      })

      if (!blob) {
        throw new Error('Failed to generate receipt image')
      }

      // Try to use Web Share API with image file (works on supported mobile browsers).
      if (navigator.share && navigator.canShare) {
        const file = new File([blob], 'receipt.png', { type: 'image/png' })
        const shareData = {
          files: [file],
          title: 'Transaction Receipt',
        }

        if (navigator.canShare(shareData)) {
          await navigator.share(shareData)
          return
        }
      }

      // Fallback: force PNG download if direct file sharing isn't available.
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `receipt-${transactionData.transactionId}.png`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Error generating receipt image:', error)
      alert('Unable to share directly. Receipt image download has started or your browser blocked sharing.')
    }
  }

  if (!isOpen || !transactionData) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-[#0f2222] border border-white/10 rounded-2xl p-6 max-w-md w-full shadow-2xl">
        <div ref={receiptRef} className="bg-[#0f2222] p-6 rounded-xl">
        <div className="text-center mb-4">
          <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
            <span className="text-3xl">✓</span>
          </div>
          <h2 className="text-2xl font-bold text-white">Transfer Successful!</h2>
        </div>

        <div className="space-y-2 mb-6 bg-[#152626] border border-white/10 rounded-lg p-4">
          <div className="flex justify-between py-2 border-b border-white/10">
            <span className="text-white/60 text-sm">Transaction ID</span>
            <span className="text-white text-sm font-mono">{transactionData.transactionId?.slice(0, 12)}...</span>
          </div>
          <div className="flex justify-between py-2 border-b border-white/10">
            <span className="text-white/60 text-sm">From</span>
            <span className="text-white text-sm">{transactionData.senderName}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-white/10">
            <span className="text-white/60 text-sm">From Account</span>
            <span className="text-white text-sm font-mono">{accountId?.slice(0, 12)}...</span>
          </div>
          <div className="flex justify-between py-2 border-b border-white/10">
            <span className="text-white/60 text-sm">To Account</span>
            <span className="text-white text-sm font-mono">{transactionData.recipientId?.slice(0, 12)}...</span>
          </div>
          <div className="flex justify-between py-2 border-b border-white/10">
            <span className="text-white/60 text-sm">Amount</span>
            <span className="text-green-400 text-lg font-bold">${Number(amount).toFixed(2)}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-white/10">
            <span className="text-white/60 text-sm">Date</span>
            <span className="text-white text-sm">{transactionData.date}</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-white/60 text-sm">Time</span>
            <span className="text-white text-sm">{transactionData.time}</span>
          </div>
        </div>
        </div>

        <div className="flex gap-3 mt-4">
          <button
            onClick={handleShare}
            className="flex-1 bg-green-600 text-white font-semibold py-3 rounded-lg hover:bg-green-700 transition-all flex items-center justify-center gap-2"
          >
            <span>📱</span>
            Share Receipt
          </button>
          <button
            onClick={onClose}
            className="px-6 bg-gradient-to-r from-[#f7ef8a] to-[#d2ac47] text-[#1a1a1a] font-semibold py-3 rounded-lg hover:from-[#fff2a8] hover:to-[#deb85b] transition-all"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  )
}

export default TransferReceipt
