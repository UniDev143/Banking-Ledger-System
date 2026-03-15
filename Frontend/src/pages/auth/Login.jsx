import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import loginBg from '../../assets/LoginBG.png'
import loginSide from '../../assets/LoginBG.png'
import { useAuth } from '../../UseContext.jsx'

function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    setErrorMessage('')

    try {
      setIsLoading(true)
      await login({ email, password })
      navigate('/dashboard')
    } catch (error) {
      setErrorMessage(error?.response?.data?.message || 'Login failed. Please try again.')
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

           <section className="mt-8 lg:mt-0 lg:absolute lg:left-6 lg:top-1/2 lg:-translate-y-1/2 w-full lg:max-w-md bg-[#0f1f1f]/90 border border-white/10 rounded-3xl p-8 shadow-2xl">
              <div className="flex items-center bg-[#162626] rounded-full p-1 mb-6">
                <button className="flex-1 px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-[#f7ef8a] to-[#d2ac47] text-[#1a1a1a]">
                  Login
                </button>
                <Link
                  to="/signup"
                  className="flex-1 px-4 py-2 rounded-full text-sm font-semibold text-center text-white/70 no-underline hover:text-white"
                >
                  Sign Up
                </Link>
              </div>

              <form className="space-y-4" onSubmit={handleSubmit}>
                <label className="block text-sm text-white/80">
                  Email or Account Number
                  <div className="mt-2 flex items-center gap-3 bg-[#1d3333] border border-white/10 rounded-xl px-4 py-3">
                    <span className="text-white/60">✉</span>
                    <input
                      type="text"
                      placeholder="Email or Account Number"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      required
                      className="w-full bg-transparent outline-none text-white placeholder:text-white/40"
                    />
                  </div>
                </label>

                <label className="block text-sm text-white/80">
                  <div className="flex items-center justify-between">
                    <span>Password</span>
                    <Link to="/forgot" className="text-xs text-[#f7ef8a] no-underline hover:text-[#d2ac47]">
                      Forgot?
                    </Link>
                  </div>
                  <div className="mt-2 flex items-center gap-3 bg-[#1d3333] border border-white/10 rounded-xl px-4 py-3">
                    <span className="text-white/60">🔒</span>
                    <input
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      required
                      className="w-full bg-transparent outline-none text-white placeholder:text-white/40"
                    />
                  </div>
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
                  {isLoading ? 'Logging in...' : 'Login'}
                </button>

                <p className="text-center text-sm text-white/70 mt-6">
                  Don&apos;t have an account?{' '}
                  <Link to="/signup" className="text-[#f7ef8a] no-underline hover:text-[#d2ac47]">
                    Sign up
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

export default Login
