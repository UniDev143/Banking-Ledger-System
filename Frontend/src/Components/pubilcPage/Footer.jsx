function Footer() {
  return (
    <footer className="bg-[#152222] text-white py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8">
        <div>
          <h4 className="0 bg-clip-text text-transparent text-sm font-semibold uppercase tracking-wider mb-4 mt-0">TEST BANK</h4>
          <p className="m-0 opacity-80 text-sm leading-relaxed">Premium banking made simple and secure.</p>
        </div>
        <div>
          <h4 className="bg-gradient-to-r from-[#f7ef8a] to-[#d2ac47] bg-clip-text text-transparent text-sm font-semibold uppercase tracking-wider mb-4 mt-0">Quick Links</h4>
          <ul className="list-none p-0 m-0 space-y-2">
            <li>
              <a href="/" className="text-white opacity-80 no-underline text-sm transition-opacity hover:opacity-100">
                Home
              </a>
            </li>
            <li>
              <a href="/about" className="text-white opacity-80 no-underline text-sm transition-opacity hover:opacity-100">
                About Us
              </a>
            </li>
            <li>
              <a href="/contact" className="text-white opacity-80 no-underline text-sm transition-opacity hover:opacity-100">
                Contact
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="bg-gradient-to-r from-[#f7ef8a] to-[#d2ac47] bg-clip-text text-transparent text-sm font-semibold uppercase tracking-wider mb-4 mt-0">Legal</h4>
          <ul className="list-none p-0 m-0 space-y-2">
            <li>
              <a href="/" className="text-white opacity-80 no-underline text-sm transition-opacity hover:opacity-100">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="/" className="text-white opacity-80 no-underline text-sm transition-opacity hover:opacity-100">
                Terms of Service
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white border-opacity-10 max-w-7xl mx-auto px-8 pt-6 text-center text-xs opacity-70">
        <p>&copy; 2026 Banking Ledger System. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
