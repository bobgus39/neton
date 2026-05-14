import { useTranslation } from 'react-i18next'

export default function LanguageSwitcher() {
  const { i18n } = useTranslation()
  const current = i18n.language

  const toggle = (lang) => {
    i18n.changeLanguage(lang)
    localStorage.setItem('lang', lang)
  }

  return (
    <div className="flex items-center gap-1 bg-white/5 rounded-lg p-1 border border-white/10">
      {['es', 'en'].map((lang) => (
        <button
          key={lang}
          onClick={() => toggle(lang)}
          className={`px-2.5 py-1 rounded text-xs font-medium uppercase transition-all ${
            current === lang
              ? 'bg-indigo-600 text-white'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          {lang}
        </button>
      ))}
    </div>
  )
}
