export const funnelStages = [
  {
    id: 'captar',
    label: 'CAPTAR',
    icon: 'MessageCircle',
    description: 'Omnichannel: WhatsApp, Instagram, Facebook Messenger, Webchat',
    kpi: {
      label: 'Leads capturados',
      value: '100%',
      detail: 'Cero leads perdidos',
    },
    aiAction: 'Respuesta instantánea 24/7 en todos los canales',
    teamAction: 'Ninguna — AIMA lo hace todo',
  },
  {
    id: 'calificar',
    label: 'CALIFICAR',
    icon: 'Bot',
    description: 'IA pregunta: presupuesto, timeline, zona, motivación → Score 0-100',
    kpi: {
      label: 'Leads calificados',
      value: '>40%',
      detail: 'De los que llegan, listos para vender',
    },
    aiAction: 'Precalificación automática con 5-7 preguntas clave',
    teamAction: 'Recibe lead con score, ficha completa y next action',
  },
  {
    id: 'nutrir',
    label: 'NUTRIR',
    icon: 'Repeat',
    description: 'Follow-up multi-canal en el momento justo (día 1, 3, 7, 14, 30...)',
    kpi: {
      label: 'Reactivación fríos',
      value: '35%+',
      detail: 'Leads tibios que vuelven a calentarse',
    },
    aiAction: 'Secuencias adaptativas según score y comportamiento',
    teamAction: 'Notificación cuando lead está listo para cerrar',
  },
  {
    id: 'cerrar',
    label: 'CERRAR',
    icon: 'TrendingUp',
    description: 'Asesor recibe lead caliente + conversación completa + acción sugerida',
    kpi: {
      label: 'Ventas extra/mes',
      value: '2-3',
      detail: 'Sin más equipo ni más ads',
    },
    aiAction: 'Handoff inteligente con resumen ejecutivo',
    teamAction: 'Enfoca 100% en cerrar, no en calificar',
  },
];

export const funnelFlow = [
  { from: 'captar', to: 'calificar', label: '100% leads →' },
  { from: 'calificar', to: 'nutrir', label: '>40% calificados →' },
  { from: 'nutrir', to: 'cerrar', label: '35% reactivan →' },
];