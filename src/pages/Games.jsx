import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Button, Chip, Card, CardContent } from '@heroui/react'

const GAME_TYPES = ['marketing', 'training', 'custom', 'web']
const GAME_ICONS = { marketing: '📣', training: '🎓', custom: '⚔️', web: '🌐' }

const PLATFORMS = [
  { name: 'Web Browser', icon: '🌐', desc: 'Sin descargas, desde cualquier dispositivo' },
  { name: 'Windows / Mac', icon: '💻', desc: 'Ejecutable nativo de alto rendimiento' },
  { name: 'Android / iOS', icon: '📱', desc: 'App Store y Google Play' },
  { name: 'WebGL / Three.js', icon: '🎯', desc: '3D directo en el navegador' },
]

const TECH_STACK = [
  { name: 'Unity', desc: '2D/3D profesional' },
  { name: 'Godot', desc: 'Open source, ligero' },
  { name: 'Phaser.js', desc: 'Juegos 2D web' },
  { name: 'Three.js', desc: '3D en navegador' },
  { name: 'PixiJS', desc: 'Gráficos 2D rápidos' },
  { name: 'WebXR', desc: 'Realidad aumentada' },
]

const PROCESS = [
  { step: '01', title: 'Brief & Concepto', desc: 'Definimos mecánicas, arte y objetivos del juego juntos.' },
  { step: '02', title: 'Prototipo', desc: 'Prototipo jugable en 2-3 semanas para validar la idea.' },
  { step: '03', title: 'Desarrollo', desc: 'Desarrollo completo con iteraciones semanales.' },
  { step: '04', title: 'QA & Publicación', desc: 'Testing exhaustivo y publicación en todas las plataformas.' },
]

export default function Games() {
  const { t } = useTranslation()

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <Chip className="mb-4 bg-orange-500/20 text-orange-300 border border-orange-500/30">🎮 {t('games.badge')}</Chip>
          <h1 className="text-5xl md:text-6xl font-black text-white mb-6">{t('games.title')}</h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">{t('games.subtitle')}</p>
        </div>

        {/* Game Types */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
          {GAME_TYPES.map((key) => (
            <Card key={key} className="border border-orange-500/20 hover:border-orange-500/50 transition-all" style={{ background: 'linear-gradient(135deg, rgba(120,53,15,0.2), rgba(127,29,29,0.2))' }}>
              <CardContent className="p-8">
                <div className="text-4xl mb-4">{GAME_ICONS[key]}</div>
                <h3 className="text-white font-bold text-xl mb-3">{t(`games.types.${key}.title`)}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{t(`games.types.${key}.description`)}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tech Stack */}
        <div className="mb-20">
          <h2 className="text-3xl font-black text-white text-center mb-12">Tecnologías que dominamos</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {TECH_STACK.map(({ name, desc }) => (
              <div key={name} className="bg-white/5 border border-white/10 rounded-xl p-4 text-center hover:scale-105 transition-transform">
                <div className="text-white font-bold mb-1">{name}</div>
                <div className="text-gray-500 text-xs">{desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Platforms */}
        <div className="mb-20">
          <h2 className="text-3xl font-black text-white text-center mb-12">Publicamos en todas las plataformas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PLATFORMS.map(({ name, icon, desc }) => (
              <div key={name} className="glass rounded-2xl p-6 text-center border border-white/10">
                <div className="text-4xl mb-3">{icon}</div>
                <h3 className="text-white font-semibold mb-2">{name}</h3>
                <p className="text-gray-500 text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Process */}
        <div className="mb-20">
          <h2 className="text-3xl font-black text-white text-center mb-12">Nuestro proceso</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {PROCESS.map(({ step, title, desc }) => (
              <div key={step} className="text-center">
                <div className="w-16 h-16 gradient-bg rounded-2xl flex items-center justify-center text-white font-black text-xl mx-auto mb-4">{step}</div>
                <h3 className="text-white font-bold mb-2">{title}</h3>
                <p className="text-gray-500 text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center glass rounded-3xl p-12 border border-orange-500/20" style={{ background: 'linear-gradient(135deg, rgba(120,53,15,0.1), rgba(127,29,29,0.1))' }}>
          <div className="text-5xl mb-6">🚀</div>
          <h2 className="text-3xl font-black text-white mb-4">¿Tienes una idea para un juego entretenido?</h2>
          <p className="text-gray-400 mb-8">De la idea al juego publicado. Te acompañamos en todo el proceso.</p>
          <Link to="/contacto">
            <Button size="lg" className="text-white px-10" style={{ background: '#ea580c' }}>{t('games.cta')}</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
