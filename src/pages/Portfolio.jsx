import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Button, Chip } from '@heroui/react'

const THUMB = (url) => `https://image.thum.io/get/width/800/crop/500/${url}`

const PROJECTS = [
  { id: 1,  title: 'ElectroShop Premium',          category: 'ecommerce', img: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=800&q=80', tech: ['React', 'Node.js', 'MySQL', 'Stripe'] },
  { id: 2,  title: 'ArtGen Studio',                category: 'ai',       img: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80', tech: ['Python', 'ComfyUI', 'React', 'FastAPI'] },
  { id: 3,  title: 'DragonQuest Corp',             category: 'game',     img: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&q=80', tech: ['Unity', 'C#', 'WebGL', 'PHP'] },
  { id: 4,  title: 'RestaurantePro',               category: 'web',      img: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80', tech: ['React', 'Node.js', 'MySQL'] },
  { id: 5,  title: 'FashionAI Catalog',            category: 'ai',       img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80', tech: ['ComfyUI', 'Python', 'React', 'PostgreSQL'] },
  { id: 6,  title: 'MindRunner Game',              category: 'game',     img: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80', tech: ['Phaser.js', 'Node.js', 'Socket.io'] },
  { id: 7,  title: 'Clínica MediConnect',          category: 'web',      img: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80', tech: ['React', 'Node.js', 'MySQL', 'Twilio'] },
  { id: 8,  title: 'SuperMarket Live',             category: 'ecommerce', img: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&q=80', tech: ['Next.js', 'PostgreSQL', 'Redis', 'Stripe'] },
  { id: 9,  title: 'Fisioterapia Armero',          category: 'web', img: THUMB('https://bobgus39.github.io/armeroFront/'),      tech: ['HTML', 'CSS', 'JavaScript'], url: 'https://bobgus39.github.io/armeroFront/' },
  { id: 10, title: 'Clínica Goleta Dental',        category: 'web', img: THUMB('https://bobgus39.github.io/goleta-dental/'),    tech: ['HTML', 'CSS', 'JavaScript'], url: 'https://bobgus39.github.io/goleta-dental/' },
  { id: 11, title: 'Imtemedic',                    category: 'web', img: THUMB('https://bobgus39.github.io/imtemedic/'),        tech: ['HTML', 'CSS', 'JavaScript'], url: 'https://bobgus39.github.io/imtemedic/' },
  { id: 12, title: 'Clínicas Armónico',            category: 'web', img: THUMB('https://bobgus39.github.io/armonico/'),         tech: ['HTML', 'CSS', 'JavaScript'], url: 'https://bobgus39.github.io/armonico/' },
  { id: 13, title: 'PodologíaCPIP',                category: 'web', img: THUMB('https://bobgus39.github.io/cpipFront/'),        tech: ['HTML', 'CSS', 'JavaScript'], url: 'https://bobgus39.github.io/cpipFront/' },
  { id: 14, title: 'Clínica Mar Mediterráneo',     category: 'web', img: THUMB('https://bobgus39.github.io/MarMediterraneo/'),  tech: ['HTML', 'CSS', 'JavaScript'], url: 'https://bobgus39.github.io/MarMediterraneo/' },
  { id: 15, title: 'Centro Médico Conde Lumiares', category: 'web', img: THUMB('https://bobgus39.github.io/condeLumiares2/'),   tech: ['HTML', 'CSS', 'JavaScript'], url: 'https://bobgus39.github.io/condeLumiares2/' },
]

const FILTERS = ['all', 'web', 'ecommerce', 'game', 'ai']

export default function Portfolio() {
  const { t } = useTranslation()
  const [active, setActive] = useState('all')

  const filtered = active === 'all' ? PROJECTS : PROJECTS.filter((p) => p.category === active)

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <Chip className="mb-4 bg-indigo-500/20 text-indigo-300 border border-indigo-500/30" variant="bordered">
            Portfolio
          </Chip>
          <h1 className="text-5xl md:text-6xl font-black text-white mb-6">
            {t('portfolio.title')}
          </h1>
          <p className="text-gray-400 text-lg">{t('portfolio.subtitle')}</p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 justify-center mb-12">
          {FILTERS.map((filter) => (
            <button
              key={filter}
              onClick={() => setActive(filter)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                active === filter
                  ? 'gradient-bg text-white'
                  : 'bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10'
              }`}
            >
              {t(`portfolio.filters.${filter}`)}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map(({ id, title, img, tech, category, url }) => {
            const projectDescs = t('portfolio.projects', { returnObjects: true })
            const desc = projectDescs.find((p) => p.id === id)?.desc || ''
            const Wrapper = url ? 'a' : 'div'
            const wrapperProps = url ? { href: url, target: '_blank', rel: 'noopener noreferrer' } : {}
            return (
            <Wrapper
              key={id}
              {...wrapperProps}
              className="group relative overflow-hidden rounded-2xl border border-white/10 hover:border-indigo-500/40 transition-all duration-300 hover:scale-[1.02] block"
            >
              <img src={img} alt={title} className="w-full h-52 object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <span className="text-xs text-indigo-400 font-medium uppercase tracking-wider">
                  {t(`portfolio.filters.${category}`)}
                </span>
                <h3 className="text-white font-bold mt-1 mb-2">{title}</h3>
                <p className="text-gray-400 text-xs mb-3 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">
                  {desc}
                </p>
                <div className="flex gap-1.5 flex-wrap">
                  {tech.map((t) => (
                    <span key={t} className="text-xs bg-white/10 text-white/70 px-2 py-0.5 rounded">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </Wrapper>
          )})}
        </div>

        <div className="mt-16 text-center glass rounded-3xl p-12 border border-white/10">
          <h2 className="text-3xl font-black text-white mb-4">{t('portfolio.cta.title')}</h2>
          <p className="text-gray-400 mb-8">{t('portfolio.cta.subtitle')}</p>
          <Link to="/contacto">
            <Button size="lg" className="gradient-bg text-white border-0 px-10">{t('portfolio.cta.button')}</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
