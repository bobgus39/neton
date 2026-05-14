import { useTranslation } from 'react-i18next'

export default function Privacy() {
  const { i18n } = useTranslation()
  const isEn = i18n.language === 'en'

  const sections = isEn ? [
    { title: 'Data Controller', body: 'neton is responsible for processing the personal data collected through this website.' },
    { title: 'Data We Collect', body: 'We collect the information you voluntarily provide via the contact form: name, email address, phone number (optional), and message content. We do not collect data through cookies or tracking technologies beyond basic analytics.' },
    { title: 'Purpose of Processing', body: 'Your data is used solely to respond to your enquiry, send you a quote, or provide the service you requested. We do not use your data for automated profiling or marketing without your explicit consent.' },
    { title: 'Legal Basis', body: 'Processing is based on your consent (Article 6(1)(a) GDPR) given when you submit the contact form, or on the performance of a contract (Article 6(1)(b) GDPR) when you engage our services.' },
    { title: 'Data Retention', body: 'Contact enquiries are kept for a maximum of 2 years from the date of receipt, or for the duration of the professional relationship. Billing records are kept for 5 years in compliance with Spanish tax law.' },
    { title: 'Your Rights', body: 'You have the right to access, rectify, erase, restrict processing, and port your data. You may also object to processing or withdraw consent at any time by contacting us at the email listed on the contact page.' },
    { title: 'Data Transfers', body: 'We do not transfer your personal data to third countries. Our servers are located within the European Union.' },
    { title: 'Changes to This Policy', body: 'We may update this policy occasionally. The current version is always available on this page with the date of last update.' },
  ] : [
    { title: 'Responsable del tratamiento', body: 'neton es el responsable del tratamiento de los datos personales recogidos a través de este sitio web.' },
    { title: 'Datos que recogemos', body: 'Recogemos la información que usted facilita voluntariamente a través del formulario de contacto: nombre, correo electrónico, teléfono (opcional) y contenido del mensaje. No recogemos datos mediante cookies de rastreo ni tecnologías similares más allá de analítica básica.' },
    { title: 'Finalidad del tratamiento', body: 'Sus datos se utilizan exclusivamente para responder a su consulta, enviarle un presupuesto o prestarle el servicio solicitado. No los usamos para elaborar perfiles automatizados ni para marketing sin su consentimiento explícito.' },
    { title: 'Base jurídica', body: 'El tratamiento se basa en su consentimiento (Art. 6.1.a RGPD) otorgado al enviar el formulario de contacto, o en la ejecución de un contrato (Art. 6.1.b RGPD) cuando contrata nuestros servicios.' },
    { title: 'Conservación de los datos', body: 'Las consultas de contacto se conservan un máximo de 2 años desde la fecha de recepción, o durante la vigencia de la relación profesional. Los registros de facturación se conservan 5 años conforme a la normativa fiscal española.' },
    { title: 'Sus derechos', body: 'Tiene derecho a acceder, rectificar, suprimir, limitar el tratamiento y portar sus datos. También puede oponerse al tratamiento o retirar su consentimiento en cualquier momento contactando con nosotros en el correo que figura en la página de contacto.' },
    { title: 'Transferencias internacionales', body: 'No transferimos sus datos personales a terceros países. Nuestros servidores están ubicados dentro de la Unión Europea.' },
    { title: 'Cambios en esta política', body: 'Podemos actualizar esta política ocasionalmente. La versión vigente estará siempre disponible en esta página con la fecha de última actualización.' },
  ]

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-3xl mx-auto px-6">
        <h1 className="text-4xl font-black text-white mb-2">{isEn ? 'Privacy Policy' : 'Política de Privacidad'}</h1>
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
