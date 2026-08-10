export type Segment = 'tradicional' | 'luxury' | 'admin';

export interface SegmentData {
  id: Segment;
  label: string;
  tagline: string;
  icon: string;
  ticket: string;
  decisionTime: string;
  volume: string;
  kpi: string;
  channels: string[];
  objections: string[];
  roi: string;
  agentPersona: string;
  color: {
    primary: string;
    secondary: string;
    glow: string;
  };
}

export const segments: Record<Segment, SegmentData> = {
  tradicional: {
    id: 'tradicional',
    label: 'Inmobiliaria Tradicional',
    tagline: 'Volumen y velocidad',
    icon: 'Building',
    ticket: '$80K – $400K USD',
    decisionTime: '2 – 8 semanas',
    volume: 'Alto (100+ leads/mes)',
    kpi: '2-3 ventas/arriendos extra por mes',
    channels: ['WhatsApp', 'Instagram', 'Facebook Messenger'],
    objections: [
      'Muy caro',
      'Todavía estoy mirando',
      'Necesito hablar con mi pareja',
      'Vi otra más barata',
    ],
    roi: 'Payback en <30 días. CAC por lead calificado visible desde día 1.',
    agentPersona: 'Responde rápido, filtra curiosos, agenda visitas, sigue up hasta cerrar.',
    color: {
      primary: '#8a5fd4',
      secondary: '#7b3fe4',
      glow: 'rgba(123, 63, 228, 0.4)',
    },
  },
  luxury: {
    id: 'luxury',
    label: 'Inmobiliaria Luxury / High-Ticket',
    tagline: 'Valor y relación long-term',
    icon: 'Crown',
    ticket: '$500K – $5M+ USD',
    decisionTime: '3 – 12 meses',
    volume: 'Bajo (10-30 leads/mes) alto valor',
    kpi: '1 cierre = 6-12 meses de fees equivalentes',
    channels: ['WhatsApp', 'Email', 'Llamadas', 'Portal exclusivo'],
    objections: [
      'Necesito exclusividad y discreción',
      'Quiero ver solo propiedades off-market',
      'Mi asesor de confianza me lleva años',
      'El proceso debe ser impecable',
    ],
    roi: 'Un cierre cubre 12-24 meses de suscripción. LTV 10x CAC.',
    agentPersona: 'Nutre largo plazo, contenido experto, alertas off-market, handoff white-glove.',
    color: {
      primary: '#d4a85f',
      secondary: '#c4964a',
      glow: 'rgba(212, 168, 95, 0.4)',
    },
  },
  admin: {
    id: 'admin',
    label: 'Administración de Propiedades / Co-hosting',
    tagline: 'Rentabilidad y ocupación',
    icon: 'Key',
    ticket: '$500 – $3K USD/mes (renta)',
    decisionTime: '1 – 4 semanas',
    volume: 'Medio (30-80 leads/mes)',
    kpi: '+15% ocupación | -40% tiempo gestión',
    channels: ['WhatsApp', 'Email', 'Portal propietarios'],
    objections: [
      '¿Garantizan ocupación?',
      '¿Cuánto me cobran de comisión?',
      'Yo lo manejo mejor',
      'Miedo a daños / impagos',
    ],
    roi: 'Gestión full por % renta. ROI positivo desde mes 1.',
    agentPersona: 'Califica huéspedes, coordina check-in/out, maintenance, reporting mensual.',
    color: {
      primary: '#4fd48a',
      secondary: '#3fc47a',
      glow: 'rgba(79, 212, 138, 0.4)',
    },
  },
};

export const defaultSegment: Segment = 'tradicional';

export function getSegment(id: Segment): SegmentData {
  return segments[id];
}

export function getAllSegments(): SegmentData[] {
  return Object.values(segments);
}