export interface Objection {
  id: string;
  question: string;
  answer: string;
  category: 'producto' | 'implementacion' | 'equipo' | 'costos' | 'tecnico';
}

export const objections: Objection[] = [
  {
    id: 'reemplaza_asesores',
    question: '¿AIMA reemplaza a mis asesores?',
    answer: 'No. AIMA **potencia** a tu equipo. Se lleva el 70% del trabajo repetitivo (responder curiosos, calificar, seguir up tibios) para que tus asesores inviertan 100% de su tiempo en lo que genera dinero: cerrar ventas con leads ya calificados y calientes.',
    category: 'equipo',
  },
  {
    id: 'tiempo_implementacion',
    question: '¿Cuánto tarda la implementación?',
    answer: '**2 semanas** en promedio. Semana 1: conectamos tus canales (WhatsApp Business API, Instagram, Facebook), configuramos el agente con tu inventario y criterios de calificación. Semana 2: pruebas con leads reales, ajustes finos y puesta en producción. Sin migraciones de datos complejas ni cambios en tu CRM actual.',
    category: 'implementacion',
  },
  {
    id: 'funciona_con_crm',
    question: '¿Funciona con mi CRM actual?',
    answer: 'Sí. AIMA se integra vía **webhook/API** con tu CRM (HubSpot, Pipedrive, Salesforce, Zoho, Bitrix, custom). El lead calificado llega a tu pipeline con score, ficha completa, conversación y next action sugerida. También funciona standalone si no tienes CRM.',
    category: 'tecnico',
  },
  {
    id: 'lead_quiere_humano',
    question: '¿Y si el lead quiere hablar con humano ya?',
    answer: 'Handoff **instantáneo**. AIMA detecta intención de hablar con asesor (palabras clave, score alto, solicitud explícita) y transfiere en vivo a tu equipo por WhatsApp, llamada o notificación en tu CRM/Slack. El asesor recibe el contexto completo antes de responder.',
    category: 'producto',
  },
  {
    id: 'costo_roi',
    question: '¿Cuánto cuesta y cuál es el ROI?',
    answer: 'Modelo **suscripción mensual + fee por lead calificado** (no por lead crudo). Payback típico <30 días: 2-3 cierres extra/mes cubren ampliamente la inversión. En Luxury: 1 cierre = 6-24 meses de suscripción. Te damos calculadora ROI personalizada en la demo.',
    category: 'costos',
  },
  {
    id: 'datos_privacidad',
    question: '¿Qué pasa con los datos de mis clientes?',
    answer: 'Tus datos **son tuyos**. AIMA no comparte, vende ni usa tus conversaciones para entrenar modelos generales. Cumplimos GDPR y Ley 1581 (Colombia). Hosting en AWS Bogotá/São Paulo. Tienes exportación completa y derecho al olvido en 1 click.',
    category: 'tecnico',
  },
  {
    id: 'personalizacion',
    question: '¿Se adapta a mi forma de vender?',
    answer: '100% configurable. Defines: preguntas de calificación, criterios de score, tonos de voz, horarios, secuencias de follow-up, reglas de handoff, plantillas de respuesta. El agente aprende de tus mejores cierres y mejora solo. No es un bot genérico, es **tu** proceso automatizado.',
    category: 'producto',
  },
  {
    id: 'soporte',
    question: '¿Qué soporte incluye?',
    answer: 'Onboarding dedicado 2 semanas + **Customer Success mensual** (revisión de métricas, optimización de prompts, nuevas integraciones). Soporte técnico por Slack/WhatsApp/email SLA 4h hábiles. No eres un ticket, eres un partner.',
    category: 'implementacion',
  },
];