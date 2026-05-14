import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Button } from '@heroui/react'
import { useAuth } from '../../context/AuthContext'
import axios from 'axios'

function AdminSidebar({ t, logout, navigate }) {
  return (
    <aside className="w-64 bg-gray-900 border-r border-white/10 min-h-screen flex flex-col flex-shrink-0">
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <img src="/neton-logo.svg" alt="neton" className="w-8 h-8" />
          <span className="text-white font-bold">neton Admin</span>
        </div>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {[
          { label: t('admin.dashboard'), href: '/admin', icon: '📊' },
          { label: t('admin.projects'), href: '/admin/proyectos', icon: '🗂️' },
          { label: t('admin.messages'), href: '/admin/mensajes', icon: '✉️' },
        ].map(({ label, href, icon }) => (
          <Link key={href} to={href} className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-colors text-sm">
            <span>{icon}</span>{label}
          </Link>
        ))}
      </nav>
      <div className="p-4 border-t border-white/10">
        <button onClick={() => { logout(); navigate('/admin/login') }} className="w-full text-gray-400 hover:text-white text-sm py-2 px-4 rounded-xl hover:bg-white/5 transition-colors text-left">
          {t('admin.logout')}
        </button>
      </div>
    </aside>
  )
}

export default function AdminDashboard() {
  const { t } = useTranslation()
  const { logout } = useAuth()
  const navigate = useNavigate()
  const [stats, setStats] = useState({ projects: 0, messages: 0, pending: 0 })
  const [recentMessages, setRecentMessages] = useState([])

  useEffect(() => {
    axios.get('/api/admin/stats').then(({ data }) => setStats(data)).catch(() => {})
    axios.get('/api/contacts?limit=5').then(({ data }) => setRecentMessages(data.contacts || [])).catch(() => {})
  }, [])

  const STAT_CARDS = [
    { label: t('admin.totalProjects'), value: stats.projects, icon: '🗂️', gradient: 'from-blue-500/20 to-indigo-500/20', border: 'border-blue-500/30' },
    { label: t('admin.pendingMessages'), value: stats.pending, icon: '✉️', gradient: 'from-orange-500/20 to-red-500/20', border: 'border-orange-500/30' },
    { label: t('admin.totalClients'), value: stats.messages, icon: '👥', gradient: 'from-green-500/20 to-emerald-500/20', border: 'border-green-500/30' },
  ]

  return (
    <div className="min-h-screen bg-gray-950 flex">
      <AdminSidebar t={t} logout={logout} navigate={navigate} />
      <main className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-black text-white">{t('admin.dashboard')}</h1>
          <p className="text-gray-500 mt-1">Resumen general de neton</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {STAT_CARDS.map(({ label, value, icon, gradient, border }) => (
            <div key={label} className={`bg-gradient-to-br ${gradient} border ${border} rounded-2xl p-6`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">{label}</p>
                  <p className="text-4xl font-black text-white mt-1">{value}</p>
                </div>
                <div className="text-4xl">{icon}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h2 className="text-white font-bold mb-4">{t('admin.recentMessages')}</h2>
            {recentMessages.length === 0 ? (
              <p className="text-gray-500 text-sm">No hay mensajes todavía.</p>
            ) : (
              <div className="space-y-3">
                {recentMessages.map((msg) => (
                  <div key={msg.id} className="flex items-start justify-between gap-4 p-3 bg-white/5 rounded-xl">
                    <div className="min-w-0">
                      <div className="text-white text-sm font-medium">{msg.name}</div>
                      <div className="text-gray-500 text-xs">{msg.email}</div>
                      <div className="text-gray-400 text-xs mt-1 truncate">{msg.message}</div>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full flex-shrink-0 ${msg.status === 'pending' ? 'bg-orange-500/20 text-orange-300' : 'bg-green-500/20 text-green-300'}`}>
                      {msg.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
            <Link to="/admin/mensajes" className="block mt-4 text-indigo-400 text-sm hover:text-indigo-300">Ver todos →</Link>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h2 className="text-white font-bold mb-4">Acciones rápidas</h2>
            <div className="space-y-3">
              <Link to="/admin/proyectos" className="flex items-center gap-3 p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-xl hover:bg-indigo-500/20 transition-colors">
                <span className="text-xl">➕</span>
                <span className="text-white text-sm">{t('admin.newProject')}</span>
              </Link>
              <Link to="/" target="_blank" className="flex items-center gap-3 p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors">
                <span className="text-xl">🌐</span>
                <span className="text-white text-sm">Ver sitio web</span>
              </Link>
              <Link to="/admin/mensajes" className="flex items-center gap-3 p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors">
                <span className="text-xl">✉️</span>
                <span className="text-white text-sm">Gestionar mensajes</span>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
