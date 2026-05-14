import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Button } from '@heroui/react'
import LanguageSwitcher from '../ui/LanguageSwitcher'

const LINKS = [
  { key: 'home', href: '/' },
  { key: 'services', href: '/servicios' },
  { key: 'portfolio', href: '/portfolio' },
  { key: 'innovation', href: '/innovacion' },
  { key: 'games', href: '/videojuegos' },
]

export default function Navbar() {
  const { t } = useTranslation()
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setMenuOpen(false), [location.pathname])

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-gray-950/95 backdrop-blur-md border-b border-white/10 shadow-lg' : 'bg-transparent'}`}>
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <img src="/neton-logo.svg" alt="neton" className="w-8 h-8" />
          <span className="text-white font-bold text-lg tracking-tight group-hover:text-indigo-400 transition-colors">
            neton
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {LINKS.map(({ key, href }) => (
            <Link
              key={key}
              to={href}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                location.pathname === href
                  ? 'text-indigo-400 bg-indigo-500/10'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {t(`nav.${key}`)}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <LanguageSwitcher />
          <Link to="/contacto">
            <Button size="sm" className="gradient-bg text-white font-medium border-0">
              {t('nav.contact')}
            </Button>
          </Link>
        </div>

        <button
          className="md:hidden text-gray-400 hover:text-white p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <div className={`w-6 h-0.5 bg-current transition-all ${menuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
          <div className={`w-6 h-0.5 bg-current my-1.5 transition-all ${menuOpen ? 'opacity-0' : ''}`} />
          <div className={`w-6 h-0.5 bg-current transition-all ${menuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
        </button>
      </nav>

      {menuOpen && (
        <div className="md:hidden bg-gray-950/98 border-t border-white/10 px-6 py-4 space-y-2">
          {LINKS.map(({ key, href }) => (
            <Link
              key={key}
              to={href}
              className="block px-4 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
            >
              {t(`nav.${key}`)}
            </Link>
          ))}
          <Link
            to="/contacto"
            className="block px-4 py-3 rounded-lg gradient-bg text-white text-center font-medium mt-4"
          >
            {t('nav.contact')}
          </Link>
          <div className="pt-2">
            <LanguageSwitcher />
          </div>
        </div>
      )}
    </header>
  )
}
