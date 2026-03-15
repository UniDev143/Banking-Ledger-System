import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import './App.css'
import Navbar from './Components/pubilcPage/Navbar.jsx'
import Footer from './Components/pubilcPage/Footer.jsx'
import ScrollToTop from './Components/pubilcPage/ScrollToTop.jsx'
import Home from './pages/public/Home.jsx'
import About from './pages/public/About.jsx'
import Contact from './pages/public/Contact.jsx'
import Login from './pages/auth/Login.jsx'
import Signup from './pages/auth/Signup.jsx'
import DashboardLayout from './layouts/DashboardLayout.jsx'
import DashboardHome from './pages/dashboard/DashboardHome.jsx'
import Transfer from './pages/dashboard/Transfer.jsx'
import Transactions from './pages/dashboard/Transactions.jsx'
import Analytics from './pages/dashboard/Analytics.jsx'
import Notifications from './pages/dashboard/Notifications.jsx'
import { useAuth } from './UseContext.jsx'

function ProtectedRoute({ children }) {
  const { isAuthenticated, authLoading } = useAuth()
  if (authLoading) return null
  return isAuthenticated ? children : <Navigate to="/login" replace />
}


function App() {
  const location = useLocation()
  const hideChrome = location.pathname === '/login' || 
                     location.pathname === '/signup' || 
                     location.pathname.startsWith('/dashboard')

  return (
    <div className="app-layout">
      <ScrollToTop />
      {!hideChrome && <Navbar />}
      <main className="app-main">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Dashboard Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<DashboardHome />} />
            <Route path="transfer" element={<Transfer />} />
            <Route path="transactions" element={<Transactions />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="notifications" element={<Notifications />} />
          </Route>

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      {!hideChrome && <Footer />}
    </div>
  )
}

export default App
