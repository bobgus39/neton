import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Button } from '@heroui/react'
import { useAuth } from '../../context/AuthContext'

const inputClass = 'w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-indigo-500/60 transition-colors'
const labelClass = 'block text-gray-400 text-sm mb-1.5'

export default function AdminLogin() {
  const { t } = useTranslation()
  const { login } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(email, password)
      navigate('/admin')
    } catch {
      setError(t('admin.login.error'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 gradient-bg rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-black text-2xl">AD</span>
          </div>
          <h1 className="text-3xl font-black text-white">{t('admin.login.title')}</h1>
        </div>

        <form onSubmit={handleSubmit} className="glass rounded-2xl p-8 border border-white/10 space-y-5">
          <div>
            <label className={labelClass}>{t('admin.login.email')}</label>
            <input type="email" className={inputClass} value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div>
            <label className={labelClass}>{t('admin.login.password')}</label>
            <input type="password" className={inputClass} value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>

          {error && (
            <div className="bg-red-500/20 border border-red-500/30 text-red-300 rounded-xl p-3 text-sm">{error}</div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full gradient-bg text-white font-semibold py-3.5 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-60"
          >
            {loading ? '...' : t('admin.login.submit')}
          </button>
        </form>
      </div>
    </div>
  )
}
