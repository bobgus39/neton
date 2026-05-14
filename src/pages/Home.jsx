import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Button, Card, Chip } from '@heroui/react'

const SERVICES = ['web', 'database', 'ai', 'games', 'seo', 'ecommerce']

const SERVICE_ICONS = {
  web: '🌐',
  database: '🗄️',
  ai: '🤖',
  games: '🎮',
  seo: '📈',
  ecommerce: '🛒',
}

const STATS = [
  { value: '150+', key: 'projects' },
  { value: '80+', key: 'clients' },
  { value: '8+', key: 'years' },
  { value: '99.9%', key: 'uptime' },
]

const PORTFOLIO_ITEMS = [
  { id: 1, title: 'Tienda Online Premium', category: 'ecommerce', img: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80', tech: ['React', 'Node.js', 'MySQL'] },
  { id: 2, title: 'App Web IA Generativa', category: 'ai', img: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80', tech: ['Python', 'ComfyUI', 'React'] },
  { id: 3, title: 'Videojuego Corporativo', category: 'game', img: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&q=80', tech: ['Unity', 'C#', 'WebGL'] },
]

export default function Home() {
  const { t } = useTranslation()

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at top, #3730a3 0%, transparent 60%)', opacity: 0.4 }} />

        <div className="relative z-10 text-center max-w-5xl mx-auto px-6">
          <Chip className="mb-6 bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
            ✦ {t('hero.badge')}
          </Chip>

          <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight tracking-tight text-white">
            {t('hero.title')}{' '}
            <span className="gradient-text">{t('hero.titleHighlight')}</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            {t('hero.subtitle')}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/servicios">
              <Button size="lg" className="gradient-bg text-white font-semibold px-8">
                {t('hero.cta')}
              </Button>
            </Link>
            <Link to="/portfolio">
              <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/5">
                {t('hero.ctaSecondary')}
              </Button>
            </Link>
          </div>

          <div className="mt-16 flex items-center justify-center gap-2 text-gray-500 text-sm animate-bounce">
            <span>{t('hero.scrollDown')}</span>
            <span>↓</span>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-6 border-y border-white/5">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map(({ value, key }) => (
            <div key={key} className="text-center">
              <div className="text-4xl font-black gradient-text mb-2">{value}</div>
              <div className="text-gray-500 text-sm">{t(`stats.${key}`)}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="section-padding max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">{t('services.title')}</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">{t('services.subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((key) => (
            <Card key={key} className="bg-white/5 border border-white/10 hover:border-indigo-500/40 transition-all duration-300 group">
              <Card.Content className="p-6">
                <div className="text-3xl mb-4">{SERVICE_ICONS[key]}</div>
                <h3 className="text-white font-bold text-lg mb-2 group-hover:text-indigo-300 transition-colors">
                  {t(`services.${key}.title`)}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">{t(`services.${key}.description`)}</p>
                <Link to="/servicios" className="inline-block mt-4 text-indigo-400 text-sm hover:text-indigo-300 transition-colors">
                  {t('services.learnMore')} →
                </Link>
              </Card.Content>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/servicios">
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/5">
              {t('services.allServices')}
            </Button>
          </Link>
        </div>
      </section>

      {/* Innovation Teaser */}
      <section className="section-padding bg-gradient-to-b from-transparent via-indigo-950/20 to-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Chip className="mb-4 bg-purple-500/20 text-purple-300 border border-purple-500/30">
                ✦ {t('innovation.badge')}
              </Chip>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6">{t('innovation.title')}</h2>
              <p className="text-gray-400 mb-8 leading-relaxed">{t('innovation.subtitle')}</p>
              <Link to="/innovacion">
                <Button className="gradient-bg text-white">{t('services.learnMore')} →</Button>
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {['comfyui', 'generative', 'automation', 'realtime'].map((key) => (
                <div key={key} className="glass rounded-xl p-4 border border-white/10">
                  <h4 className="text-white font-semibold text-sm mb-2">{t(`innovation.${key}.title`)}</h4>
                  <p className="text-gray-500 text-xs leading-relaxed">{t(`innovation.${key}.description`)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Preview */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">{t('portfolio.title')}</h2>
            <p className="text-gray-400">{t('portfolio.subtitle')}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PORTFOLIO_ITEMS.map(({ id, title, img, tech }) => (
              <div key={id} className="group relative overflow-hidden rounded-2xl border border-white/10 hover:border-indigo-500/40 transition-all">
                <img src={img} alt={title} className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="text-white font-bold mb-2">{title}</h3>
                  <div className="flex gap-2 flex-wrap">
                    {tech.map((t) => (
                      <span key={t} className="text-xs bg-indigo-500/20 text-indigo-300 px-2 py-1 rounded-full border border-indigo-500/30">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/portfolio">
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/5">{t('portfolio.viewAll')}</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding px-6">
        <div className="max-w-4xl mx-auto text-center glass rounded-3xl p-16 border border-white/10">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">{t('home.cta.title')}</h2>
          <p className="text-gray-400 mb-10 text-lg">{t('home.cta.subtitle')}</p>
          <Link to="/contacto">
            <Button size="lg" className="gradient-bg text-white font-semibold px-10">{t('contact.badge')} →</Button>
          </Link>
        </div>
      </section>
    </>
  )
}
