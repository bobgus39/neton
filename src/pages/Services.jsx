import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Button, Chip } from '@heroui/react'

const SERVICES_DETAIL = [
  {
    key: 'web',
    icon: '🌐',
    featureKeys: ['responsive', 'seo', 'cms', 'payments', 'maintenanceFree', 'support'],
    price: 'Desde 200€',
    priceEn: 'From €200',
    maintenance: '30€/mes',
    maintenanceEn: '€30/month',
    gradient: 'from-blue-500/20 to-indigo-500/20',
    border: 'border-blue-500/30',
  },
  {
    key: 'database',
    icon: '🗄️',
    featureKeys: ['mysql', 'nosql', 'queryOpt', 'backups', 'maintenanceFree', 'monitoring'],
    price: 'Desde 100€',
    priceEn: 'From €100',
    maintenance: '30€/mes',
    maintenanceEn: '€30/month',
    gradient: 'from-green-500/20 to-emerald-500/20',
    border: 'border-green-500/30',
  },
  {
    key: 'ai',
    icon: '🤖',
    featureKeys: ['comfyui', 'imageGen', 'chatbot', 'analytics', 'maintenanceFree', 'api'],
    price: 'Desde 300€',
    priceEn: 'From €300',
    maintenance: '30€/mes',
    maintenanceEn: '€30/month',
    gradient: 'from-purple-500/20 to-violet-500/20',
    border: 'border-purple-500/30',
  },
  {
    key: 'games',
    icon: '🎮',
    featureKeys: ['game2d3d', 'webgl', 'multiplayer', 'monetization', 'maintenanceFree', 'multiplatform'],
    price: 'Desde 625€',
    priceEn: 'From €625',
    maintenance: '30€/mes',
    maintenanceEn: '€30/month',
    gradient: 'from-orange-500/20 to-red-500/20',
    border: 'border-orange-500/30',
  },
  {
    key: 'seo',
    icon: '📈',
    featureKeys: ['audit', 'keywords', 'linkbuilding', 'content', 'ads', 'reports'],
    price: 'Desde 50€/mes',
    priceEn: 'From €50/month',
    gradient: 'from-cyan-500/20 to-blue-500/20',
    border: 'border-cyan-500/30',
  },
  {
    key: 'ecommerce',
    icon: '🛒',
    featureKeys: ['platform', 'gateways', 'inventory', 'shipping', 'maintenanceFree', 'mobileApp'],
    price: 'Desde 375€',
    priceEn: 'From €375',
    maintenance: '30€/mes',
    maintenanceEn: '€30/month',
    gradient: 'from-yellow-500/20 to-orange-500/20',
    border: 'border-yellow-500/30',
  },
]

export default function Services() {
  const { t, i18n } = useTranslation()
  const isEn = i18n.language === 'en'

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <Chip className="mb-4 bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
            {t('services.title')}
          </Chip>
          <h1 className="text-5xl md:text-6xl font-black text-white mb-6">{t('services.title')}</h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">{t('services.subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {SERVICES_DETAIL.map(({ key, icon, gradient, border, featureKeys, price, priceEn, maintenance, maintenanceEn }) => (
            <div key={key} className={`bg-gradient-to-br ${gradient} border ${border} rounded-2xl p-8 hover:scale-[1.02] transition-all duration-300 flex flex-col`}>
              <div className="text-4xl mb-5">{icon}</div>
              <h3 className="text-white font-bold text-2xl mb-3">{t(`services.${key}.title`)}</h3>
              <p className="text-gray-400 text-sm mb-6 leading-relaxed">{t(`services.${key}.description`)}</p>
              <ul className="space-y-2 mb-8 flex-1">
                {featureKeys.map((fk) => (
                  <li key={fk} className="flex items-center gap-2 text-sm text-gray-300">
                    <span className="text-green-400">✓</span>
                    {t(`services.features.${fk}`)}
                  </li>
                ))}
              </ul>
              <div className="border-t border-white/10 pt-5">
                <div className="flex items-end justify-between">
                  <div>
                    <div className="text-white font-black text-2xl">
                      {isEn ? priceEn : price}
                    </div>
                    {maintenance && (
                      <div className="text-gray-400 text-xs mt-1">
                        + <span className="text-indigo-300 font-semibold">
                          {isEn ? maintenanceEn : maintenance}
                        </span>{' '}
                        {t('services.maintenanceLabel')}{' '}
                        <span className="text-green-400">{t('services.maintenanceFree')}</span>
                      </div>
                    )}
                  </div>
                  <Link to="/contacto">
                    <Button size="sm" className="gradient-bg text-white">
                      {t('services.consult')}
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 glass rounded-3xl p-12 text-center border border-white/10">
          <h2 className="text-3xl font-black text-white mb-4">{t('services.customTitle')}</h2>
          <p className="text-gray-400 mb-8">{t('services.customDesc')}</p>
          <Link to="/contacto">
            <Button size="lg" className="gradient-bg text-white px-10">
              {t('services.customCta')}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
