import { useState, useRef, useEffect } from 'react'

function Chat({ isOpen, onClose }) {
  const [chatMessages, setChatMessages] = useState([
    { id: 1, type: 'bot', text: 'Hello! How can I help you today?' },
  ])
  const [chatInput, setChatInput] = useState('')
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [chatMessages])

  const handleSendMessage = () => {
    if (chatInput.trim() === '') return

    const userMessage = { id: Date.now(), type: 'user', text: chatInput }
    setChatMessages([...chatMessages, userMessage])
    setChatInput('')

    // Simulate bot response
    setTimeout(() => {
      const botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        text: 'Thank you for your message. Our support team will get back to you soon.',
      }
      setChatMessages((prev) => [...prev, botMessage])
    }, 500)
  }

  if (!isOpen) return null

  return (
    <div className="fixed bottom-24 right-6 w-96 h-96 bg-[#0f2222] border border-white/10 rounded-2xl shadow-2xl flex flex-col z-50">
      {/* Chat Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/10">
        <h3 className="text-white font-semibold">Support Chat</h3>
        <button
          onClick={onClose}
          className="text-white/60 hover:text-white text-xl"
        >
          ✕
        </button>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 hide-scrollbar">
        {chatMessages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs px-3 py-2 rounded-lg ${
                message.type === 'user'
                  ? 'bg-gradient-to-r from-[#f7ef8a] to-[#d2ac47] text-[#1a1a1a]'
                  : 'bg-white/10 text-white'
              }`}
            >
              <p className="text-sm">{message.text}</p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Chat Input */}
      <div className="p-4 border-t border-white/10">
        <div className="flex gap-2">
          <input
            type="text"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Type a message..."
            className="flex-1 bg-white/10 border border-white/10 rounded-lg px-3 py-2 text-white text-sm placeholder-white/40 focus:outline-none focus:border-[#f7ef8a]/50"
          />
          <button
            onClick={handleSendMessage}
            className="bg-gradient-to-r from-[#f7ef8a] to-[#d2ac47] text-[#1a1a1a] rounded-lg px-4 py-2 font-semibold text-sm hover:from-[#fff2a8] hover:to-[#deb85b] transition-all"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  )
}


export default Chat
