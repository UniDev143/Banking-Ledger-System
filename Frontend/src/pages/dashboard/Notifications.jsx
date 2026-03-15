import { useEffect } from 'react'
import { useAuth } from '../../UseContext.jsx'

function Notifications() {
  const {
    paymentNotifications,
    transactionsLoading,
    transactionsError,
    markNotificationsVisited,
  } = useAuth()

  useEffect(() => {
    markNotificationsVisited()
  }, [markNotificationsVisited])

  const renderNotificationCard = (notification) => (
    <div
      key={notification.id}
      className="flex items-start gap-4 p-6 rounded-2xl border transition-all cursor-pointer bg-[#1a2f2f] border-white/5 hover:bg-[#1f3434]"
    >
      <div className="w-12 h-12 rounded-full bg-[#0f2222] border border-white/10 flex items-center justify-center shrink-0">
        <span className="text-2xl">{notification.icon}</span>
      </div>

      <div className="flex-1">
        <div className="flex items-start justify-between mb-1">
          <h3 className="text-white font-semibold">{notification.title}</h3>
        </div>
        <p className="text-white/70 text-sm mb-2">{notification.message}</p>
        <p className="text-white/50 text-xs">{notification.time}</p>
      </div>
    </div>
  )

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Notifications</h1>
          <p className="text-white/60">Stay updated with your account activities.</p>
        </div>
        
      </div>

      {transactionsLoading && (
        <p className="text-white/60 text-sm">Loading notifications...</p>
      )}

      {!transactionsLoading && transactionsError && (
        <p className="text-red-300 text-sm">{transactionsError}</p>
      )}

      {!transactionsLoading && !transactionsError && (
        <div className="bg-[#1a2f2f] border border-white/10 rounded-3xl p-6">
          <h2 className="text-xl font-bold text-white mb-4">Notifications</h2>
          <div className="grid gap-4">
            {paymentNotifications.length === 0 && (
              <p className="text-white/60 text-sm">No notifications here yet.</p>
            )}
            {paymentNotifications.map((notification) => renderNotificationCard(notification))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Notifications
