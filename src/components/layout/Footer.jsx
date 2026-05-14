import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { FaXTwitter, FaInstagram, FaTiktok, FaThreads } from 'react-icons/fa6'

const SERVICES_LINKS = [
  { key: 'web', href: '/servicios' },
  { key: 'database', href: '/servicios' },
  { key: 'ai', href: '/innovacion' },
  { key: 'games', href: '/videojuegos' },
]

const NAV_LINKS = [
  { key: 'home', href: '/' },
  { key: 'portfolio', href: '/portfolio' },
  { key: 'innovation', href: '/innovacion' },
  { key: 'contact', href: '/contacto' },
]

export default function Footer() {
  const { t } = useTranslation()
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-white/10 bg-gray-950">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <img src="/neton-logo.svg" alt="neton" className="w-8 h-8" />
              <span className="text-white font-bold text-lg">neton</span>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
              {t('footer.description')}
            </p>
            <div className="flex gap-4 mt-6">
              {[
                { icon: FaXTwitter, href: 'https://x.com/netonAigency', label: 'X' },
                { icon: FaInstagram, href: 'https://www.instagram.com/netonaigency/', label: 'Instagram' },
                { icon: FaTiktok, href: 'https://www.tiktok.com/@netonaigency', label: 'TikTok' },
                { icon: FaThreads, href: 'https://www.threads.com/@netonaigency', label: 'Threads' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              {t('footer.links')}
            </h4>
            <ul className="space-y-3">
              {NAV_LINKS.map(({ key, href }) => (
                <li key={key}>
                  <Link to={href} className="text-gray-500 hover:text-white text-sm transition-colors">
                    {t(`nav.${key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              {t('footer.services')}
            </h4>
            <ul className="space-y-3">
              {SERVICES_LINKS.map(({ key, href }) => (
                <li key={key}>
                  <Link to={href} className="text-gray-500 hover:text-white text-sm transition-colors">
                    {t(`services.${key}.title`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-sm">
            © {year} neton. {t('footer.rights')}
          </p>
          <div className="flex gap-6">
            <Link to="/privacidad" className="text-gray-600 hover:text-gray-400 text-sm transition-colors">
              {t('footer.privacy')}
            </Link>
            <Link to="/terminos" className="text-gray-600 hover:text-gray-400 text-sm transition-colors">
              {t('footer.terms')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
