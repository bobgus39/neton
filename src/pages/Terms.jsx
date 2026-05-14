import { useTranslation } from 'react-i18next'

export default function Terms() {
  const { i18n } = useTranslation()
  const isEn = i18n.language === 'en'

  const sections = isEn ? [
    { title: 'Acceptance', body: 'By accessing and using this website you accept these Terms of Service in full. If you disagree with any part of these terms, please do not use the site.' },
    { title: 'Services', body: 'neton offers web development, database design, AI integrations, custom video-game development, SEO, and e-commerce solutions. Specific scope, deliverables, deadlines, and pricing are agreed in a written proposal or contract signed before work begins.' },
    { title: 'Quotes and Pricing', body: 'Prices shown on this website are indicative starting points and do not constitute a binding offer. A formal quote is provided after an initial consultation. All prices are in EUR and exclude applicable taxes (VAT at the current Spanish rate).' },
    { title: 'Payment Terms', body: 'Unless otherwise agreed in writing, projects require a 50% deposit before work commences and the remaining balance upon delivery. Monthly maintenance fees are billed at the start of each billing period.' },
    { title: 'Intellectual Property', body: 'Upon receipt of full payment, the client receives full ownership of the custom deliverables (code, designs, assets) produced for their project. neton retains the right to display the work in its portfolio unless the client requests otherwise in writing.' },
    { title: 'Client Responsibilities', body: 'The client is responsible for providing accurate content, timely feedback, and any third-party credentials or assets required to complete the project. Delays caused by the client may affect delivery timelines and may incur additional charges.' },
    { title: 'Limitation of Liability', body: 'neton is not liable for any indirect, incidental, or consequential damages arising from the use of our services or deliverables. Our maximum liability is limited to the amount paid for the specific service in question.' },
    { title: 'Governing Law', body: 'These terms are governed by the laws of Spain. Any disputes shall be resolved in the courts of the jurisdiction where neton is registered, unless mandatory consumer protection law provides otherwise.' },
    { title: 'Changes to These Terms', body: 'We reserve the right to modify these terms at any time. Continued use of our services after any changes constitutes acceptance of the new terms.' },
  ] : [
    { title: 'Aceptación', body: 'Al acceder y utilizar este sitio web, acepta íntegramente estas Condiciones de Servicio. Si no está de acuerdo con alguna parte, le rogamos que no utilice el sitio.' },
    { title: 'Servicios', body: 'neton ofrece desarrollo web, diseño de bases de datos, integraciones de IA, desarrollo de videojuegos a medida, SEO y soluciones de comercio electrónico. El alcance específico, entregables, plazos y precios se acuerdan en una propuesta escrita o contrato firmado antes de comenzar el trabajo.' },
    { title: 'Presupuestos y precios', body: 'Los precios mostrados en este sitio son orientativos y no constituyen una oferta vinculante. Se facilita un presupuesto formal tras una consulta inicial. Todos los precios están en EUR y no incluyen los impuestos aplicables (IVA al tipo español vigente).' },
    { title: 'Condiciones de pago', body: 'Salvo acuerdo escrito en contrario, los proyectos requieren un depósito del 50 % antes del inicio y el saldo restante a la entrega. Las cuotas de mantenimiento mensual se facturan al inicio de cada período de facturación.' },
    { title: 'Propiedad intelectual', body: 'Tras la recepción del pago completo, el cliente obtiene la plena titularidad de los entregables personalizados (código, diseños, activos) producidos para su proyecto. neton se reserva el derecho a mostrar el trabajo en su portfolio salvo que el cliente lo solicite por escrito.' },
    { title: 'Responsabilidades del cliente', body: 'El cliente es responsable de proporcionar contenidos precisos, feedback en tiempo y cualquier credencial o activo de terceros necesario para completar el proyecto. Los retrasos imputables al cliente pueden afectar a los plazos de entrega y generar cargos adicionales.' },
    { title: 'Limitación de responsabilidad', body: 'neton no es responsable de daños indirectos, incidentales o consecuentes derivados del uso de nuestros servicios o entregables. Nuestra responsabilidad máxima se limita al importe abonado por el servicio concreto en cuestión.' },
    { title: 'Legislación aplicable', body: 'Estas condiciones se rigen por la legislación española. Cualquier disputa se resolverá ante los tribunales de la jurisdicción donde esté registrada neton, salvo que la normativa de protección al consumidor aplicable disponga otra cosa.' },
    { title: 'Modificaciones', body: 'Nos reservamos el derecho de modificar estas condiciones en cualquier momento. El uso continuado de nuestros servicios tras cualquier cambio implica la aceptación de las nuevas condiciones.' },
  ]

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-3xl mx-auto px-6">
        <h1 className="text-4xl font-black text-white mb-2">{isEn ? 'Terms of Service' : 'Términos de Servicio'}</h1>
        <p className="text-gray-500 text-sm mb-12">{isEn ? 'Last updated: May 2025' : 'Última actualización: mayo de 2025'}</p>

        <div className="space-y-10">
          {sections.map(({ title, body }) => (
            <div key={title}>
              <h2 className="text-lg font-bold text-white mb-2">{title}</h2>
              <p className="text-gray-400 leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
