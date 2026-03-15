import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import loginBg from '../../assets/LoginBG.png'
import loginSide from '../../assets/LoginBG.png'
import { useAuth } from '../../UseContext.jsx'

function Signup() {
  const navigate = useNavigate()
  const { register } = useAuth()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    setErrorMessage('')

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.')
      return
    }

    try {
      setIsLoading(true)
      await register({ name, email, password })
      navigate('/dashboard')
    } catch (error) {
      setErrorMessage(error?.response?.data?.message || 'Registration failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div
          className="min-h-screen w-full bg-cover bg-center text-white"
          style={{ backgroundImage: `url(${loginBg})` }}
        >
          <div className="min-h-screen w-full bg-black/50 backdrop-blur-sm">
            <div className="mx-auto px-6 py-14">
              <div className="relative mx-auto w-[80%] max-w-6xl">
            <img
              src={loginSide}
              alt="Secure banking"
              className="w-full h-[560px] rounded-3xl shadow-2xl object-cover"
            />

            <section className="mt-8 lg:mt-0 lg:absolute lg:left-6 lg:top-1/2 lg:-translate-y-1/2 w-full lg:max-w-md bg-[#0f1f1f]/90 border border-white/10 rounded-3xl p-6 shadow-2xl">
              <div className="flex items-center bg-[#162626] rounded-full p-1 mb-4">
                <Link
                  to="/login"
                  className="flex-1 px-4 py-2 rounded-full text-sm font-semibold text-center text-white/70 no-underline hover:text-white"
                >
                  Login
                </Link>
                <button className="flex-1 px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-[#f7ef8a] to-[#d2ac47] text-[#1a1a1a]">
                  Sign Up
                </button>
              </div>

              <form className="space-y-3" onSubmit={handleSubmit}>
                <label className="block text-sm text-white/80">
                  Full Name
                  <div className="mt-1 flex items-center gap-3 bg-[#1d3333] border border-white/10 rounded-xl px-4 py-2.5">
                    <span className="text-white/60">👤</span>
                    <input
                      type="text"
                      placeholder="Your full name"
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      required
                      className="w-full bg-transparent outline-none text-white placeholder:text-white/40"
                    />
                  </div>
                </label>

                <label className="block text-sm text-white/80">
                  Email Address
                  <div className="mt-1 flex items-center gap-3 bg-[#1d3333] border border-white/10 rounded-xl px-4 py-2.5">
                    <span className="text-white/60">✉</span>
                    <input
                      type="email"
                      placeholder="name@email.com"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      required
                      className="w-full bg-transparent outline-none text-white placeholder:text-white/40"
                    />
                  </div>
                </label>

                <label className="block text-sm text-white/80">
                  Password
                  <div className="mt-1 flex items-center gap-3 bg-[#1d3333] border border-white/10 rounded-xl px-4 py-2.5">
                    <span className="text-white/60">🔒</span>
                    <input
                      type="password"
                      placeholder="Create password"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      required
                      className="w-full bg-transparent outline-none text-white placeholder:text-white/40"
                    />
                  </div>
                </label>

                <label className="block text-sm text-white/80">
                  Confirm Password
                  <div className="mt-1 flex items-center gap-3 bg-[#1d3333] border border-white/10 rounded-xl px-4 py-2.5">
                    <span className="text-white/60">🔒</span>
                    <input
                      type="password"
                      placeholder="Repeat password"
                      value={confirmPassword}
                      onChange={(event) => setConfirmPassword(event.target.value)}
                      required
                      className="w-full bg-transparent outline-none text-white placeholder:text-white/40"
                    />
                  </div>
                </label>

                <label className="flex items-start gap-2 text-sm text-white/80">
                  <input type="checkbox" className="mt-1 accent-[#f7ef8a]" />
                  I agree to the Terms of Service and Privacy Policy.
                </label>

                {errorMessage ? (
                  <p className="text-sm text-red-300 bg-red-500/10 border border-red-300/30 rounded-xl px-3 py-2">
                    {errorMessage}
                  </p>
                ) : null}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 rounded-xl font-semibold text-[#1a1a1a] bg-gradient-to-r from-[#f7ef8a] to-[#d2ac47] shadow-lg hover:from-[#fff2a8] hover:to-[#deb85b] transition-all"
                >
                  {isLoading ? 'Creating Account...' : 'Create Account'}
                </button>

                <p className="text-center text-sm text-white/70 mt-4">
                  Already have an account?{' '}
                  <Link to="/login" className="text-[#f7ef8a] no-underline hover:text-[#d2ac47]">
                    Login
                  </Link>
                </p>
              </form>
          </section>
        </div>
      </div>
      </div>
    </div>
  )
}

export default Signup
