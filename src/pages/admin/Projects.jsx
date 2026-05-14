import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Button } from '@heroui/react'
import { useAuth } from '../../context/AuthContext'
import axios from 'axios'

const CATEGORIES = ['web', 'ecommerce', 'game', 'ai']
const inputClass = 'w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-indigo-500/60 transition-colors'
const labelClass = 'block text-gray-400 text-sm mb-1.5'

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

const EMPTY_FORM = { title_es: '', title_en: '', description_es: '', description_en: '', category: 'web', image_url: '', technologies: '', url: '' }

export default function AdminProjects() {
  const { t } = useTranslation()
  const { logout } = useAuth()
  const navigate = useNavigate()
  const [projects, setProjects] = useState([])
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(EMPTY_FORM)
  const [modalOpen, setModalOpen] = useState(false)

  const load = () => axios.get('/api/projects').then(({ data }) => setProjects(data.projects || [])).catch(() => {})

  useEffect(() => { load() }, [])

  const openNew = () => { setEditing(null); setForm(EMPTY_FORM); setModalOpen(true) }
  const openEdit = (p) => { setEditing(p); setForm({ ...p, technologies: Array.isArray(p.technologies) ? p.technologies.join(', ') : (p.technologies || '') }); setModalOpen(true) }

  const save = async () => {
    const payload = { ...form, technologies: form.technologies.split(',').map((s) => s.trim()).filter(Boolean) }
    if (editing) { await axios.put(`/api/projects/${editing.id}`, payload) }
    else { await axios.post('/api/projects', payload) }
    setModalOpen(false)
    load()
  }

  const remove = async (id) => {
    if (!window.confirm('¿Eliminar este proyecto?')) return
    await axios.delete(`/api/projects/${id}`)
    load()
  }

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }))

  return (
    <div className="min-h-screen bg-gray-950 flex">
      <AdminSidebar t={t} logout={logout} navigate={navigate} />

      <main className="flex-1 p-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-black text-white">{t('admin.projects')}</h1>
          <button onClick={openNew} className="gradient-bg text-white px-5 py-2.5 rounded-xl font-medium text-sm hover:opacity-90 transition-opacity">
            + {t('admin.newProject')}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {projects.map((p) => (
            <div key={p.id} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
              {p.image_url && <img src={p.image_url} alt={p.title_es} className="w-full h-40 object-cover" />}
              <div className="p-5">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-white font-bold">{p.title_es}</h3>
                  <span className="text-xs bg-indigo-500/20 text-indigo-300 px-2 py-1 rounded-full ml-2 flex-shrink-0">{p.category}</span>
                </div>
                <p className="text-gray-500 text-sm mb-4 line-clamp-2">{p.description_es}</p>
                <div className="flex gap-2">
                  <button onClick={() => openEdit(p)} className="text-sm text-gray-300 bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg transition-colors">Editar</button>
                  <button onClick={() => remove(p.id)} className="text-sm text-red-400 bg-red-500/10 hover:bg-red-500/20 px-3 py-1.5 rounded-lg transition-colors">Eliminar</button>
                </div>
              </div>
            </div>
          ))}
          {projects.length === 0 && (
            <div className="col-span-3 text-center text-gray-500 py-20">No hay proyectos todavía.</div>
          )}
        </div>
      </main>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-gray-900 border border-white/10 rounded-2xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-black text-white mb-6">{editing ? 'Editar proyecto' : 'Nuevo proyecto'}</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><label className={labelClass}>Título (ES)</label><input className={inputClass} value={form.title_es} onChange={(e) => set('title_es', e.target.value)} /></div>
                <div><label className={labelClass}>Title (EN)</label><input className={inputClass} value={form.title_en} onChange={(e) => set('title_en', e.target.value)} /></div>
              </div>
              <div><label className={labelClass}>Descripción (ES)</label><textarea rows={3} className={`${inputClass} resize-none`} value={form.description_es} onChange={(e) => set('description_es', e.target.value)} /></div>
              <div><label className={labelClass}>Description (EN)</label><textarea rows={3} className={`${inputClass} resize-none`} value={form.description_en} onChange={(e) => set('description_en', e.target.value)} /></div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Categoría</label>
                  <select className={inputClass} value={form.category} onChange={(e) => set('category', e.target.value)}>
                    {CATEGORIES.map((c) => <option key={c} value={c} className="bg-gray-900">{c}</option>)}
                  </select>
                </div>
                <div><label className={labelClass}>Tecnologías (coma)</label><input className={inputClass} value={form.technologies} onChange={(e) => set('technologies', e.target.value)} placeholder="React, Node.js, MySQL" /></div>
              </div>
              <div><label className={labelClass}>URL de imagen</label><input className={inputClass} value={form.image_url} onChange={(e) => set('image_url', e.target.value)} /></div>
              <div><label className={labelClass}>URL del proyecto</label><input className={inputClass} value={form.url} onChange={(e) => set('url', e.target.value)} /></div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setModalOpen(false)} className="px-5 py-2.5 rounded-xl text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 text-sm transition-colors">Cancelar</button>
              <button onClick={save} className="gradient-bg text-white px-5 py-2.5 rounded-xl font-medium text-sm hover:opacity-90 transition-opacity">Guardar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
