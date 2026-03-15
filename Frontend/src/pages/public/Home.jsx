function Home() {
  return (
    <div className="w-full">
      {/* Hero Banner */}
      <section className="relative w-full h-[500px] md:h-[600px] overflow-hidden">
        <img 
          src="./src/assets/banner.png" 
          alt="Smart Banking for Your Future" 
          className="w-full h-full object-cover"
        />
      </section>

      {/* Value Propositions */}
      <section className="py-20 px-8 bg-[#f5f1e8]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-[#0f2e2e]">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <article className="bg-white p-8 rounded-2xl border border-[#e5e5e5] shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all text-center">
              <div className="text-5xl mb-4">🔒</div>
              <h3 className="text-2xl font-bold text-[#0f2e2e] mb-4">Bank-Grade Security</h3>
              <p className="text-gray-600 leading-relaxed">
                Encryption, multi-factor authentication, and audit-trail logging
                protect every transaction.
              </p>
            </article>
            <article className="bg-white p-8 rounded-2xl border border-[#e5e5e5] shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all text-center">
              <div className="text-5xl mb-4">⚡</div>
              <h3 className="text-2xl font-bold text-[#0f2e2e] mb-4">Lightning Fast</h3>
              <p className="text-gray-600 leading-relaxed">
                Instant transfers and real-time balance updates keep you in
                complete control.
              </p>
            </article>
            <article className="bg-white p-8 rounded-2xl border border-[#e5e5e5] shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all text-center">
              <div className="text-5xl mb-4">✨</div>
              <h3 className="text-2xl font-bold text-[#0f2e2e] mb-4">100% Transparent</h3>
              <p className="text-gray-600 leading-relaxed">
                Full ledger visibility, no hidden fees, straightforward pricing
                you can trust.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-[#0f2e2e]">Premium Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-bold text-[#123c3c] mb-3">Multi-Account Management</h3>
                <p className="text-gray-600 leading-relaxed">
                  Manage multiple accounts and easily switch between them with a
                  single tap.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#123c3c] mb-3">Smart Budgeting Tools</h3>
                <p className="text-gray-600 leading-relaxed">
                  AI-powered insights help you categorize spending and forecast
                  trends.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#123c3c] mb-3">Scheduled Transfers</h3>
                <p className="text-gray-600 leading-relaxed">
                  Set up recurring transfers and automate your financial planning.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#123c3c] mb-3">24/7 Concierge Support</h3>
                <p className="text-gray-600 leading-relaxed">
                  Chat, email, or phone support whenever you need assistance.
                </p>
              </div>
            </div>
            <div className="flex justify-center">
              
                <img
                  src="./src/assets/Mobile.jpg"
                  alt="TEST BANK mobile dashboard"
                  className="w-full h-full rounded-[50px] object-cover"
                />
              
            </div>
          </div>
        </div>
      </section>

      {/* Security Highlight */}
      <section className="py-20 px-8 bg-gradient-to-b from-[#f5f1e8] to-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-[#0f2e2e]">Security You Can Trust</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl border border-[#e5e5e5] shadow-lg">
              <h4 className="text-[#0f2e2e] font-bold mb-3">End-to-End Encryption</h4>
              <p className="text-gray-600 text-sm leading-relaxed">All data encrypted in transit and at rest with AES-256.</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-[#e5e5e5] shadow-lg">
              <h4 className="text-[#0f2e2e] font-bold mb-3">Multi-Layer Authentication</h4>
              <p className="text-gray-600 text-sm leading-relaxed">2FA, biometric, and device verification for every login.</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-[#e5e5e5] shadow-lg">
              <h4 className="text-[#0f2e2e] font-bold mb-3">Compliance Certified</h4>
              <p className="text-gray-600 text-sm leading-relaxed">PCI-DSS, ISO 27001, and SOC 2 Type II compliant.</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-[#e5e5e5] shadow-lg">
              <h4 className="text-[#0f2e2e] font-bold mb-3">Real-Time Monitoring</h4>
              <p className="text-gray-600 text-sm leading-relaxed">Fraud detection and anomaly detection 24/7.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-8 bg-[#f5f1e8]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-[#0f2e2e]">Trusted by Thousands</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <article className="bg-white p-8 rounded-2xl border border-[#e5e5e5] shadow-lg">
              <div className="bg-gradient-to-r from-[#f7ef8a] to-[#d2ac47] bg-clip-text text-transparent text-lg mb-4 tracking-wider">★★★★★</div>
              <p className="text-gray-700 leading-relaxed mb-6 italic">
                "Finally, a banking app that feels premium and secure. The
                interface is clean and intuitive."
              </p>
              <div>
                <strong className="text-[#0f2e2e]">Sarah Mitchell</strong>
                <p className="text-gray-500 text-sm m-0">Product Manager</p>
              </div>
            </article>
            <article className="bg-white p-8 rounded-2xl border border-[#e5e5e5] shadow-lg">
              <div className="bg-gradient-to-r from-[#f7ef8a] to-[#d2ac47] bg-clip-text text-transparent text-lg mb-4 tracking-wider">★★★★★</div>
              <p className="text-gray-700 leading-relaxed mb-6 italic">
                "I switched from my traditional bank. The real-time insights
                and fast transfers are game-changing."
              </p>
              <div>
                <strong className="text-[#0f2e2e]">Marcus Johnson</strong>
                <p className="text-gray-500 text-sm m-0">Entrepreneur</p>
              </div>
            </article>
            <article className="bg-white p-8 rounded-2xl border border-[#e5e5e5] shadow-lg">
              <div className="bg-gradient-to-r from-[#f7ef8a] to-[#d2ac47] bg-clip-text text-transparent text-lg mb-4 tracking-wider">★★★★★</div>
              <p className="text-gray-700 leading-relaxed mb-6 italic">
                "The security features give me peace of mind. Support is always
                helpful when I need it."
              </p>
              <div>
                <strong className="text-[#0f2e2e]">Emily Rodriguez</strong>
                <p className="text-gray-500 text-sm m-0">Investor</p>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* About Section Preview */}
      <section className="py-16 px-8 bg-white text-center">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-[#0f2e2e] mb-4">About TEST BANK</h2>
          <p className="text-gray-600 text-lg mb-8 leading-relaxed">
            We believe banking should be simple, secure, and transparent. Our
            mission is to empower individuals and businesses with financial
            tools that work for them, not against them.
          </p>
          <a href="/about" className="inline-block px-6 py-3 rounded-full font-medium bg-gradient-to-r from-[#f7ef8a] to-[#d2ac47] text-[#1a1a1a] no-underline hover:from-[#f4e4b7] hover:to-[#c5b088] transition-all hover:-translate-y-0.5">
            Learn Our Story
          </a>
        </div>
      </section>

      {/* Contact Section Preview */}
      <section className="py-16 px-8 bg-[#f5f1e8] text-center">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-[#0f2e2e] mb-4">Get in Touch</h2>
          <p className="text-gray-600 text-lg mb-8 leading-relaxed">
            Have questions? Our support team is here to help. Reach out anytime.
          </p>
          <a href="/contact" className="inline-block px-6 py-3 rounded-full font-medium bg-gradient-to-r from-[#f7ef8a] to-[#d2ac47] text-[#1a1a1a] no-underline hover:from-[#f4e4b7] hover:to-[#c5b088] transition-all hover:-translate-y-0.5">
            Contact Support
          </a>
        </div>
      </section>
    </div>
  )
}

export default Home
