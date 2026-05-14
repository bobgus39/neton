import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Button, Chip, Card, CardContent } from '@heroui/react'

const FEATURES = [
  { key: 'comfyui', icon: '🎨', capabilities: ['Generación de imágenes SD', 'Upscaling con IA', 'Generación de vídeo IA', 'Pipelines personalizados', 'API de integración web', 'Batch processing'] },
  { key: 'generative', icon: '💬', capabilities: ['Chatbots GPT-4 / Claude', 'Asistentes de ventas IA', 'FAQ automático', 'Traducción en tiempo real', 'Análisis de sentimientos', 'Personalización de contenido'] },
  { key: 'automation', icon: '⚡', capabilities: ['Workflows n8n custom', 'Procesamiento IA de forms', 'Informes automáticos', 'Sincronización de datos', 'Notificaciones inteligentes', 'CRM automatizado'] },
  { key: 'realtime', icon: '🔴', capabilities: ['WebSockets en tiempo real', 'Dashboards live', 'Chat en vivo', 'Notificaciones push', 'Stock en tiempo real', 'Monitorización en directo'] },
]

const CASE_STUDIES = [
  { title: 'Generador de Catálogos IA', desc: 'Sistema de fichas de producto con imágenes IA para una tienda de moda.', tags: ['ComfyUI', 'SD', 'React'], result: '+340% velocidad publicación' },
  { title: 'Asistente Virtual 24/7', desc: 'Chatbot inteligente para clínica que gestiona citas y seguimiento.', tags: ['Claude API', 'WhatsApp'], result: '-60% carga en recepción' },
  { title: 'Dashboard de Ventas Live', desc: 'Panel en tiempo real con análisis predictivo para cadena de restaurantes.', tags: ['WebSockets', 'React', 'PostgreSQL'], result: '+25% decisiones data-driven' },
]

export default function Innovation() {
  const { t } = useTranslation()

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <Chip className="mb-4 bg-purple-500/20 text-purple-300 border border-purple-500/30">✦ {t('innovation.badge')}</Chip>
          <h1 className="text-5xl md:text-6xl font-black text-white mb-6">{t('innovation.title')}</h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">{t('innovation.subtitle')}</p>
        </div>

        {/* ComfyUI Highlight */}
        <div className="mb-20 glass rounded-3xl p-10 border border-purple-500/20" style={{ background: 'linear-gradient(135deg, rgba(88,28,135,0.2), rgba(49,46,129,0.2))' }}>
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <div className="text-5xl mb-4">🎨</div>
              <h2 className="text-3xl font-black text-white mb-4">ComfyUI Integration</h2>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Integramos flujos de trabajo avanzados de ComfyUI directamente en tu web. Desde generadores de imágenes de producto hasta herramientas creativas para tus usuarios, todo conectado con tu base de datos.
              </p>
              <Link to="/contacto">
                <Button className="bg-purple-600 text-white" style={{ background: '#7c3aed' }}>Solicitar demo</Button>
              </Link>
            </div>
            <div className="space-y-3">
              {[
                { step: '1', label: 'Usuario sube imagen o texto', border: 'border-purple-500/30' },
                { step: '2', label: 'ComfyUI procesa con IA', border: 'border-indigo-500/30' },
                { step: '3', label: 'Resultado guardado en tu DB', border: 'border-blue-500/30' },
                { step: '4', label: 'Integración automática en tu web', border: 'border-cyan-500/30' },
              ].map(({ step, label, border }) => (
                <div key={step} className={`flex items-center gap-4 p-4 rounded-xl border ${border} bg-white/5`}>
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">{step}</div>
                  <span className="text-gray-300 text-sm">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {FEATURES.map(({ key, icon, capabilities }) => (
            <Card key={key} className="bg-white/5 border border-white/10 hover:border-purple-500/30 transition-all">
              <CardContent className="p-8">
                <div className="text-3xl mb-4">{icon}</div>
                <h3 className="text-white font-bold text-xl mb-2">{t(`innovation.${key}.title`)}</h3>
                <p className="text-gray-500 text-sm mb-6">{t(`innovation.${key}.description`)}</p>
                <ul className="grid grid-cols-2 gap-2">
                  {capabilities.map((cap) => (
                    <li key={cap} className="flex items-start gap-2 text-xs text-gray-400">
                      <span className="text-purple-400 mt-0.5">•</span> {cap}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Case Studies */}
        <div className="mb-20">
          <h2 className="text-3xl font-black text-white text-center mb-12">Casos de éxito</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CASE_STUDIES.map(({ title, desc, tags, result }) => (
              <div key={title} className="glass rounded-2xl p-6 border border-white/10">
                <h3 className="text-white font-bold mb-3">{title}</h3>
                <p className="text-gray-500 text-sm mb-4 leading-relaxed">{desc}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {tags.map((tag) => (
                    <span key={tag} className="text-xs bg-indigo-500/20 text-indigo-300 px-2 py-1 rounded-full border border-indigo-500/30">{tag}</span>
                  ))}
                </div>
                <div className="text-green-400 font-bold text-sm">📊 {result}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center glass rounded-3xl p-12 border border-purple-500/20">
          <h2 className="text-3xl font-black text-white mb-4">Transforma tu web con IA</h2>
          <p className="text-gray-400 mb-8">Lleva tu negocio a la vanguardia tecnológica con soluciones de IA a medida.</p>
          <Link to="/contacto">
            <Button size="lg" className="text-white px-10" style={{ background: '#7c3aed' }}>Hablar con un experto</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
