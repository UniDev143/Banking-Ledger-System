import { Link, useLocation } from 'react-router-dom'

function Navbar() {
  const location = useLocation()
  const isActive = (path) => location.pathname === path

  return (
    <nav className="sticky top-0 z-100 bg-[#152222] text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2 font-semibold text-lg no-underline" title="TEST BANK">
            <img src="./src/assets/logo.png" alt="TEST BANK" className="w-40 h-16 p-0.1 rounded-lg" />
          </Link>
          <ul className="flex list-none gap-6 m-0 p-0">
            <li>
              <Link 
                to="/" 
                className={`no-underline text-sm transition-all ${
                  isActive('/') 
                    ? 'bg-gradient-to-r from-[#f7ef8a] to-[#d2ac47] text-[#1a1a1a] px-4 py-2 rounded-full font-medium' 
                    : 'text-white opacity-85 hover:opacity-100'
                }`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link 
                to="/about" 
                className={`no-underline text-sm transition-all ${
                  isActive('/about') 
                    ? 'bg-gradient-to-r from-[#f7ef8a] to-[#d2ac47] text-[#1a1a1a] px-4 py-2 rounded-full font-medium' 
                    : 'text-white opacity-85 hover:opacity-100'
                }`}
              >
                About Us
              </Link>
            </li>
            <li>
              <Link 
                to="/contact" 
                className={`no-underline text-sm transition-all ${
                  isActive('/contact') 
                    ? 'bg-gradient-to-r from-[#f7ef8a] to-[#d2ac47] text-[#1a1a1a] px-4 py-2 rounded-full font-medium' 
                    : 'text-white opacity-85 hover:opacity-100'
                }`}
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <Link to="/login" className="bg-gradient-to-r from-[#f7ef8a] to-[#d2ac47] text-[#1a1a1a] px-5 py-2 rounded-full font-medium no-underline transition-all hover:from-[#f4e4b7] hover:to-[#c5b088]">
          Login
        </Link>
      </div>
    </nav>
  )
}

export default Navbar
