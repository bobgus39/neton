import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'
import { Button, Chip } from '@heroui/react'
import axios from 'axios'

const SERVICES = ['web', 'database', 'ai', 'games', 'seo', 'ecommerce']

const INFO_ITEMS = [
  { icon: '📧', key: 'email' },
  { icon: '📞', key: 'phone' },
  { icon: '📍', key: 'location' },
]

const inputClass = 'w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-indigo-500/60 transition-colors placeholder:text-gray-600'
const inputErrorClass = 'w-full bg-white/5 border border-red-500/50 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-red-500/70 transition-colors placeholder:text-gray-600'
const labelClass = 'block text-gray-400 text-sm mb-1.5 ml-0.5'

function FieldError({ message }) {
  if (!message) return null
  return <p className="text-red-400 text-xs mt-1.5 ml-0.5">{message}</p>
}

export default function Contact() {
  const { t } = useTranslation()
  const { register, handleSubmit, reset, formState: { errors } } = useForm()
  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(false)

  const onSubmit = async (data) => {
    setLoading(true)
    setStatus(null)
    try {
      await axios.post('/api/contacts', data)
      setStatus('success')
      reset()
    } catch {
      setStatus('error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <Chip className="mb-4 bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">✉️ {t('contact.badge')}</Chip>
          <h1 className="text-5xl md:text-6xl font-black text-white mb-6">{t('contact.title')}</h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">{t('contact.subtitle')}</p>
        </div>

        <div className="grid md:grid-cols-5 gap-12">
          <div className="md:col-span-3">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>{t('contact.form.name')}</label>
                  <input
                    className={errors.name ? inputErrorClass : inputClass}
                    placeholder="Juan García"
                    {...register('name', { required: t('contact.form.errors.nameRequired') })}
                  />
                  <FieldError message={errors.name?.message} />
                </div>
                <div>
                  <label className={labelClass}>{t('contact.form.email')}</label>
                  <input
                    className={errors.email ? inputErrorClass : inputClass}
                    type="email"
                    placeholder="juan@empresa.com"
                    {...register('email', {
                      required: t('contact.form.errors.emailRequired'),
                      pattern: { value: /^\S+@\S+\.\S+$/, message: t('contact.form.errors.emailInvalid') },
                    })}
                  />
                  <FieldError message={errors.email?.message} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>{t('contact.form.phone')}</label>
                  <input className={inputClass} placeholder="+34 600 000 000" {...register('phone')} />
                </div>
                <div>
                  <label className={labelClass}>{t('contact.form.service')}</label>
                  <select className={inputClass} {...register('service')}>
                    <option value="" className="bg-gray-900">{t('contact.form.selectService')}</option>
                    {SERVICES.map((s) => (
                      <option key={s} value={s} className="bg-gray-900">{t(`services.${s}.title`)}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className={labelClass}>{t('contact.form.message')}</label>
                <textarea
                  rows={6}
                  className={`${inputClass} resize-none`}
                  placeholder={t('contact.form.messagePlaceholder')}
                  {...register('message')}
                />
              </div>

              {status === 'success' && (
                <div className="bg-green-500/20 border border-green-500/30 text-green-300 rounded-xl p-4 text-sm">
                  ✅ {t('contact.form.success')}
                </div>
              )}
              {status === 'error' && (
                <div className="bg-red-500/20 border border-red-500/30 text-red-300 rounded-xl p-4 text-sm">
                  ❌ {t('contact.form.error')}
                </div>
              )}

              <button
                type="submit"
                className="w-full gradient-bg text-white font-semibold py-3.5 rounded-xl hover:opacity-90 transition-opacity cursor-pointer"
              >
                {loading ? t('contact.form.submitting') : t('contact.form.submit')}
              </button>
            </form>
          </div>

          <div className="md:col-span-2 space-y-6">
            {INFO_ITEMS.map(({ icon, key }) => (
              <div key={key} className="glass rounded-2xl p-6 border border-white/10">
                <div className="text-2xl mb-3">{icon}</div>
                <div className="text-white font-medium">{t(`contact.info.${key}`)}</div>
              </div>
            ))}
            <div className="glass rounded-2xl p-6 border border-white/10">
              <h3 className="text-white font-bold mb-4">{t('contact.hours.title')}</h3>
              <div className="space-y-2 text-sm text-gray-400">
                <div className="flex justify-between"><span>{t('contact.hours.weekdays')}</span><span className="text-white">9:00 - 18:00</span></div>
                <div className="flex justify-between"><span>{t('contact.hours.saturday')}</span><span className="text-white">10:00 - 14:00</span></div>
                <div className="flex justify-between"><span>{t('contact.hours.sunday')}</span><span className="text-gray-600">{t('contact.hours.closed')}</span></div>
              </div>
            </div>
            <div className="glass rounded-2xl p-6 border border-indigo-500/20 bg-indigo-500/5">
              <div className="text-2xl mb-3">⚡</div>
              <h3 className="text-white font-bold mb-2">{t('contact.response.title')}</h3>
              <p className="text-gray-400 text-sm">{t('contact.response.text')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
