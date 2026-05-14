import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAuth } from '../../context/AuthContext'
import axios from 'axios'

const STATUS_COLORS = {
  pending: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
  read: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  replied: 'bg-green-500/20 text-green-300 border-green-500/30',
}

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

export default function AdminMessages() {
  const { t } = useTranslation()
  const { logout } = useAuth()
  const navigate = useNavigate()
  const [messages, setMessages] = useState([])
  const [selected, setSelected] = useState(null)
  const [filter, setFilter] = useState('all')

  const load = () => axios.get('/api/contacts').then(({ data }) => setMessages(data.contacts || [])).catch(() => {})

  useEffect(() => { load() }, [])

  const updateStatus = async (id, status) => {
    await axios.patch(`/api/contacts/${id}/status`, { status })
    load()
    if (selected?.id === id) setSelected((s) => ({ ...s, status }))
  }

  const remove = async (id) => {
    if (!window.confirm('¿Eliminar este mensaje?')) return
    await axios.delete(`/api/contacts/${id}`)
    setSelected(null)
    load()
  }

  const filtered = filter === 'all' ? messages : messages.filter((m) => m.status === filter)

  return (
    <div className="min-h-screen bg-gray-950 flex">
      <AdminSidebar t={t} logout={logout} navigate={navigate} />

      <main className="flex-1 p-8 flex gap-6 overflow-hidden">
        <div className="w-80 flex-shrink-0 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-black text-white">{t('admin.messages')}</h1>
          </div>
          <div className="flex gap-1 mb-4 flex-wrap">
            {['all', 'pending', 'read', 'replied'].map((f) => (
              <button key={f} onClick={() => setFilter(f)} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${filter === f ? 'gradient-bg text-white' : 'bg-white/5 text-gray-400 hover:text-white'}`}>{f}</button>
            ))}
          </div>
          <div className="space-y-2 overflow-y-auto">
            {filtered.map((msg) => (
              <div key={msg.id} onClick={() => setSelected(msg)} className={`p-4 rounded-xl border cursor-pointer transition-all ${selected?.id === msg.id ? 'border-indigo-500/50 bg-indigo-500/10' : 'border-white/10 bg-white/5 hover:border-white/20'}`}>
                <div className="flex items-start justify-between mb-1">
                  <span className="text-white text-sm font-medium truncate">{msg.name}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full border flex-shrink-0 ml-2 ${STATUS_COLORS[msg.status]}`}>{msg.status}</span>
                </div>
                <div className="text-gray-500 text-xs truncate">{msg.email}</div>
                <div className="text-gray-400 text-xs mt-1 line-clamp-1">{msg.message}</div>
              </div>
            ))}
            {filtered.length === 0 && <div className="text-center text-gray-500 py-10 text-sm">No hay mensajes</div>}
          </div>
        </div>

        <div className="flex-1 min-w-0">
          {selected ? (
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
              <div className="flex items-start justify-between mb-6 gap-4">
                <div>
                  <h2 className="text-2xl font-black text-white">{selected.name}</h2>
                  <div className="text-gray-500 text-sm mt-1">{selected.email}{selected.phone && ` · ${selected.phone}`}</div>
                  {selected.service_interest && (
                    <span className="mt-2 inline-block text-xs bg-indigo-500/20 text-indigo-300 px-2 py-1 rounded-full">{selected.service_interest}</span>
                  )}
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  {['pending', 'read', 'replied'].map((s) => (
                    <button key={s} onClick={() => updateStatus(selected.id, s)} className={`text-xs px-3 py-1.5 rounded-lg border transition-all ${selected.status === s ? STATUS_COLORS[s] + ' font-bold' : 'border-white/10 text-gray-500 hover:text-white'}`}>{s}</button>
                  ))}
                </div>
              </div>
              <div className="bg-white/5 rounded-xl p-6 mb-6">
                <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">{selected.message}</p>
              </div>
              <div className="flex gap-3">
                <a href={`mailto:${selected.email}`} className="flex-1 gradient-bg text-white py-3 px-5 rounded-xl text-center font-medium text-sm hover:opacity-90 transition-opacity">
                  ✉️ Responder por email
                </a>
                <button onClick={() => remove(selected.id)} className="px-5 py-3 rounded-xl text-red-400 bg-red-500/10 hover:bg-red-500/20 text-sm transition-colors">
                  Eliminar
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-600">
              Selecciona un mensaje para verlo
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
