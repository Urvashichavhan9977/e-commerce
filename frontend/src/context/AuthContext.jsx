import { createContext, useContext, useEffect, useState } from 'react'
import { authApi } from '../api/authApi'
import { getToken, setToken } from '../api/client'

const AuthContext = createContext(null)

function readUser() {
  try {
    const raw = localStorage.getItem('amrita_user')
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(readUser)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) localStorage.setItem('amrita_user', JSON.stringify(user))
    else localStorage.removeItem('amrita_user')
  }, [user])

  // On first load, if a real backend token exists, confirm it's still
  // valid and refresh the profile (keeps role correct after a refresh).
  useEffect(() => {
    const token = getToken()
    if (!token) {
      setLoading(false)
      return
    }
    authApi
      .me()
      .then((res) => setUser(res.user))
      .catch(() => {
        setToken(null)
        setUser(null)
      })
      .finally(() => setLoading(false))
  }, [])

  // Demo-only login used by the OTP tab and the signup "verify email"
  // step, neither of which the backend supports yet. Kept as-is so those
  // flows keep working; it does NOT talk to the backend or set a token.
  const login = ({ name, email }) => {
    setUser({ name: name || email.split('@')[0], email, role: 'user' })
  }

  // Real, password-based login against the backend. Works for every
  // role (user/admin/superadmin) — the resolved role is returned so the
  // caller (LoginPage) can decide where to redirect.
  const loginWithPassword = async (email, password) => {
    const res = await authApi.login(email, password)
    setToken(res.token)
    setUser(res.user)
    return res
  }

  const loginWithOtp = async (email, otp) => {
    const res = await authApi.verifyOtp(email, otp)
    setToken(res.token)
    setUser(res.user)
    return res
  }

  const logout = async () => {
    if (getToken()) {
      try {
        await authApi.logout()
      } catch {
        // Even if the network call fails, clear the local session.
      }
    }
    setToken(null)
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{ user, loading, login, loginWithPassword, loginWithOtp, logout, isAuthenticated: !!user }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
