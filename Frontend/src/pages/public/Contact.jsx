import { useState } from 'react'

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    setFormData({ name: '', email: '', message: '' })
    alert('Thank you for your message. We will get back to you soon!')
  }

  return (
    <div className="w-full">
      {/* Hero */}
      <section className="bg-gradient-to-r from-[#0f2e2e] to-[#123c3c] text-white py-16 px-8 text-center">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl font-bold mb-4">Get in Touch</h1>
          <p className="text-lg opacity-90">
            Have questions? We're here to help. Reach out anytime and we'll get
            back to you quickly.
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-20 px-8 bg-[#f5f1e8]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <article className="bg-white p-8 rounded-2xl border border-[#e5e5e5] shadow-lg text-center">
              <div className="text-5xl mb-4">📧</div>
              <h3 className="text-xl font-bold text-[#0f2e2e] mb-3">Email</h3>
              <p className="text-[#0f2e2e] font-bold mb-2">
                <a href="mailto:support@bankingledger.com" className="no-underline text-inherit hover:opacity-70 transition-opacity">
                  support@bankingledger.com
                </a>
              </p>
              <p className="text-gray-500 text-sm">Response within 2 hours</p>
            </article>
            <article className="bg-white p-8 rounded-2xl border border-[#e5e5e5] shadow-lg text-center">
              <div className="text-5xl mb-4">💬</div>
              <h3 className="text-xl font-bold text-[#0f2e2e] mb-3">Live Chat</h3>
              <p className="text-gray-600 mb-2">Available 24/7 on our platform</p>
              <p className="text-gray-500 text-sm">Instant answers to your questions</p>
            </article>
            <article className="bg-white p-8 rounded-2xl border border-[#e5e5e5] shadow-lg text-center">
              <div className="text-5xl mb-4">📞</div>
              <h3 className="text-xl font-bold text-[#0f2e2e] mb-3">Phone</h3>
              <p className="text-[#0f2e2e] font-bold mb-2">
                <a href="tel:+1-800-BANKING" className="no-underline text-inherit hover:opacity-70 transition-opacity">
                  +1-800-BANKING
                </a>
              </p>
              <p className="text-gray-500 text-sm">9 AM - 9 PM, Mon - Fri</p>
            </article>
          </div>
        </div>
      </section>

      {/* Contact Form & Chat */}
      <section className="py-20 px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Form */}
            <div>
              <h2 className="text-2xl font-bold text-[#0f2e2e] mt-0 mb-8">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex flex-col">
                  <label htmlFor="name" className="mb-2 text-[#1a1a1a] font-medium">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className="px-4 py-3 border border-[#e5e5e5] rounded-lg font-inherit transition-all focus:outline-none focus:border-[#d6c3a1] focus:ring focus:ring-[#d6c3a1] focus:ring-opacity-20"
                    required
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="email" className="mb-2 text-[#1a1a1a] font-medium">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                    className="px-4 py-3 border border-[#e5e5e5] rounded-lg font-inherit transition-all focus:outline-none focus:border-[#d6c3a1] focus:ring focus:ring-[#d6c3a1] focus:ring-opacity-20"
                    required
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="message" className="mb-2 text-[#1a1a1a] font-medium">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us how we can help..."
                    rows={5}
                    className="px-4 py-3 border border-[#e5e5e5] rounded-lg font-inherit transition-all focus:outline-none focus:border-[#d6c3a1] focus:ring focus:ring-[#d6c3a1] focus:ring-opacity-20 resize-vertical"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full px-6 py-3 rounded-full font-medium bg-gradient-to-r from-[#f7ef8a] to-[#d2ac47] text-[#1a1a1a] hover:from-[#f4e4b7] hover:to-[#c5b088] transition-all hover:-translate-y-0.5"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Chat Mock */}
            <div>
              <h2 className="text-2xl font-bold text-[#0f2e2e] mt-0 mb-8">Chat Support</h2>
              <div className="bg-[#f9f9f9] border border-[#e5e5e5] rounded-2xl p-6 h-80 overflow-y-auto flex flex-col space-y-4 mb-4">
                <div className="flex flex-col">
                  <div className="bg-[#0f2e2e] text-white rounded-lg px-4 py-2 max-w-xs mr-auto">Hello! 👋 How can we help you today?</div>
                  <span className="text-xs text-gray-500 mt-1 ml-1">Just now</span>
                </div>
                <div className="flex flex-col items-end">
                  <div className="bg-gradient-to-r from-[#f7ef8a] to-[#d2ac47] text-[#1a1a1a] rounded-lg px-4 py-2 max-w-xs ml-auto">I have a question about account security.</div>
                  <span className="text-xs text-gray-500 mt-1 mr-1">2 mins ago</span>
                </div>
                <div className="flex flex-col">
                  <div className="bg-[#0f2e2e] text-white rounded-lg px-4 py-2 max-w-xs mr-auto">
                    Great! I'd be happy to help. Our team uses military-grade
                    encryption and 2FA...
                  </div>
                  <span className="text-xs text-gray-500 mt-1 ml-1">1 min ago</span>
                </div>
              </div>
              <div className="border border-[#e5e5e5] rounded-lg p-3 flex gap-2">
                <input
                  type="text"
                  placeholder="Type your message here..."
                  disabled
                  className="flex-1 px-3 py-2 border border-[#e5e5e5] rounded font-inherit opacity-50 cursor-not-allowed"
                />
                <button disabled className="px-4 py-2 bg-gradient-to-r from-[#f7ef8a] to-[#d2ac47] text-[#1a1a1a] rounded font-medium opacity-50 cursor-not-allowed">
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-8 bg-[#f5f1e8]">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-[#0f2e2e]">Frequently Asked Questions</h2>
          <div className="space-y-2">
            <details className="bg-white border border-[#e5e5e5] rounded-lg overflow-hidden">
              <summary className="px-6 py-4 cursor-pointer font-semibold text-[#0f2e2e] hover:bg-gradient-to-r from-[#d6c3a1] from-opacity-10 transition-colors">How secure is my account?</summary>
              <p className="px-6 py-4 text-gray-600 border-t border-[#e5e5e5]">
                Your account is protected by bank-grade encryption, multi-factor
                authentication, and 24/7 monitoring for fraud detection.
              </p>
            </details>
            <details className="bg-white border border-[#e5e5e5] rounded-lg overflow-hidden">
              <summary className="px-6 py-4 cursor-pointer font-semibold text-[#0f2e2e] hover:bg-gradient-to-r from-[#d6c3a1] from-opacity-10 transition-colors">What are your fees?</summary>
              <p className="px-6 py-4 text-gray-600 border-t border-[#e5e5e5]">
                We believe in transparency. No hidden fees. Standard transfer fee
                is 0.5%, and all pricing is clearly listed.
              </p>
            </details>
            <details className="bg-white border border-[#e5e5e5] rounded-lg overflow-hidden">
              <summary className="px-6 py-4 cursor-pointer font-semibold text-[#0f2e2e] hover:bg-gradient-to-r from-[#d6c3a1] from-opacity-10 transition-colors">How long do transfers take?</summary>
              <p className="px-6 py-4 text-gray-600 border-t border-[#e5e5e5]">
                Most domestic transfers complete instantly. International transfers
                typically take 1-3 business days.
              </p>
            </details>
            <details className="bg-white border border-[#e5e5e5] rounded-lg overflow-hidden">
              <summary className="px-6 py-4 cursor-pointer font-semibold text-[#0f2e2e] hover:bg-gradient-to-r from-[#d6c3a1] from-opacity-10 transition-colors">Is my data private?</summary>
              <p className="px-6 py-4 text-gray-600 border-t border-[#e5e5e5]">
                Absolutely. We comply with GDPR and never sell your data. You have
                full control over your information.
              </p>
            </details>
            <details className="bg-white border border-[#e5e5e5] rounded-lg overflow-hidden">
              <summary className="px-6 py-4 cursor-pointer font-semibold text-[#0f2e2e] hover:bg-gradient-to-r from-[#d6c3a1] from-opacity-10 transition-colors">Can I use the app on multiple devices?</summary>
              <p className="px-6 py-4 text-gray-600 border-t border-[#e5e5e5]">
                Yes! Access your account from anywhere using our web or mobile app.
                Sync is instant across devices.
              </p>
            </details>
            <details className="bg-white border border-[#e5e5e5] rounded-lg overflow-hidden">
              <summary className="px-6 py-4 cursor-pointer font-semibold text-[#0f2e2e] hover:bg-gradient-to-r from-[#d6c3a1] from-opacity-10 transition-colors">What happens if I forget my password?</summary>
              <p className="px-6 py-4 text-gray-600 border-t border-[#e5e5e5]">
                You can reset your password via email or use our account recovery
                options with verified security questions.
              </p>
            </details>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact
