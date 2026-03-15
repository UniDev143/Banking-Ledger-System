import { useState } from 'react'
import { Link, useLocation, Outlet, useNavigate } from 'react-router-dom'
import logo from '../assets/logo.png'
import dashboardBg from '../assets/LoginBG.png'
import { useAuth } from '../UseContext.jsx'
import Chat from '../Components/Chat.jsx'

function DashboardLayout() {
  const [isChatOpen, setIsChatOpen] = useState(false)

  const location = useLocation()
  const navigate = useNavigate()
  const { user, logout, notificationCount, hasUnreadNotifications } = useAuth()

  const handleOpenChat = () => {
    setIsChatOpen(!isChatOpen)
  }

  const isActive = (path) => location.pathname === path

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: '◫' },
    { path: '/dashboard/transfer', label: 'Transfer', icon: '⇄' },
    { path: '/dashboard/transactions', label: 'Transactions', icon: '▤' },
    { path: '/dashboard/analytics', label: 'Analytics', icon: '◬' },
    { path: '/dashboard/notifications', label: 'Notifications', icon: '◉' },
  ]

  return (
    <div
      className="flex h-screen bg-cover bg-center bg-no-repeat overflow-hidden"
      style={{ backgroundImage: `url(${dashboardBg})` }}
    >
      {/* Sidebar */}
      <aside className="w-64 bg-white/5 backdrop-blur-xl border-r border-white/10 flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-white/10 flex justify-center">
          <img src={logo} alt="Test Bank" className="w-12 h-12 brightness-150 sepia" />
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all no-underline ${
                isActive(item.path)
                  ? 'bg-gradient-to-r from-[#f7ef8a]/25 to-[#d2ac47]/20 border border-[#f7ef8a]/30 text-white font-semibold backdrop-blur-sm'
                  : 'text-white hover:bg-white/5'
              }`}
            >
              <span className="text-xl text-[#f7ef8a]">{item.icon}</span>
              <span className="text-white">{item.label}</span>
              {item.path === '/dashboard/notifications' && notificationCount > 0 && hasUnreadNotifications && (
                <span className="ml-auto w-3 h-3 rounded-full bg-red-500"></span>
              )}
            </Link>
          ))}
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-4 px-4 py-3 bg-transparent rounded-xl">
            <div className="w-15 h-15 shrink-0 rounded-full bg-gradient-to-r from-[#f7ef8a] to-[#d2ac47] flex items-center justify-center text-[#1a1a1a] font-bold">
              {user?.name?.[0]?.toUpperCase() || 'A'}
            </div>
            <div className="flex-1 min-w-0  flex flex-col justify-center gap-1">
              <p className="text-white mx-2.5 font-extrabold text-2xl leading-5 truncate">{user?.name || 'User'}</p>
              <button 
                onClick={handleLogout}
                className="w-fit text-xs leading-4 text-white/60 hover:text-[#f7ef8a] transition-colors mt-0.5"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto hide-scrollbar">
        <Outlet />
      </main>

      <button
        type="button"
        onClick={handleOpenChat}
        aria-label="Open chat"
        className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-gradient-to-r from-[#f7ef8a] to-[#d2ac47] text-[#1a1a1a] text-xl shadow-xl flex items-center justify-center hover:brightness-105 transition-all z-50"
      >
        💬
      </button>

      {/* Chat Component */}
      <Chat isOpen={isChatOpen} onClose={handleOpenChat} />
    </div>
  )
}

export default DashboardLayout
