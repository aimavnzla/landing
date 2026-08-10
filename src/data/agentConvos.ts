export interface Message {
  id: string;
  from: 'lead' | 'aima' | 'advisor';
  text: string;
  timestamp: string;
  metadata?: {
    score?: number;
    tags?: string[];
    intent?: string;
  };
}

export interface Conversation {
  segment: 'tradicional' | 'luxury' | 'admin';
  leadProfile: {
    name: string;
    avatar: string;
    location: string;
    budget: string;
    timeline: string;
    intent: string;
  };
  messages: Message[];
  outcome: {
    score: number;
    status: 'hot' | 'warm' | 'cold';
    nextAction: string;
    estimatedValue: string;
  };
}

export const agentConversations: Conversation[] = [
  {
    segment: 'tradicional',
    leadProfile: {
      name: 'Carlos M.',
      avatar: 'CM',
      location: 'Bogotá, Chapinero',
      budget: '$250K USD',
      timeline: '2-3 semanas',
      intent: 'Compra apartamento 2-3 hab para inversión',
    },
    messages: [
      {
        id: '1',
        from: 'lead',
        text: 'Hola, vi el anuncio del apto en Chapinero. ¿Tienen disponibilidad para visita esta semana?',
        timestamp: '10:23',
      },
      {
        id: '2',
        from: 'aima',
        text: '¡Hola Carlos! Claro que sí. Tenemos 3 opciones en Chapinero que encajan en tu rango. Para agendar la visita y enviarte fichas completas, ¿me confirmas tu presupuesto aproximado y si es para vivir o inversión?',
        timestamp: '10:23',
      },
      {
        id: '3',
        from: 'lead',
        text: 'Es para inversión, presupuesto $250-280K. Quiero algo que rente bien.',
        timestamp: '10:25',
      },
      {
        id: '4',
        from: 'aima',
        text: 'Perfecto. Con $250-280K en Chapinero, los de 2 hab + estudio rentan $1.2-1.4M/mes (rendimiento ~6.5%). Te envío 3 fichas con fotos, planos y proyección de renta. ¿Qué día te viene bien para visitar? Tengo huecos miércoles tarde o jueves mañana.',
        timestamp: '10:26',
        metadata: { score: 85, tags: ['inversionista', 'presupuesto_confirmado', 'timeline_corto'], intent: 'compra_inversion' },
      },
      {
        id: '5',
        from: 'lead',
        text: 'Jueves 10am me va perfecto. Enviame las fichas por WhatsApp.',
        timestamp: '10:27',
      },
      {
        id: '6',
        from: 'aima',
        text: '¡Listo! Te las envío ahora mismo. Tu asesor Andrés te llamará a las 9:30am para confirmar y llevar llaves. ¿Algo más que necesites antes de la visita?',
        timestamp: '10:27',
      },
    ],
    outcome: {
      score: 85,
      status: 'hot',
      nextAction: 'Visita agendada jueves 10am con Andrés. Enviar recordatorio miércoles 6pm.',
      estimatedValue: '$250K-280K | Comisión ~$7.5K',
    },
  },
  {
    segment: 'luxury',
    leadProfile: {
      name: 'Alejandra R.',
      avatar: 'AR',
      location: 'Cartagena, Bocagrande',
      budget: '$1.8M USD',
      timeline: '6-8 meses',
      intent: 'Casa de playa uso familiar + renta vacacional premium',
    },
    messages: [
      {
        id: '1',
        from: 'lead',
        text: 'Buenas tardes. Busco una propiedad exclusiva en Cartagena, zona Bocagrande o Castillogrande. Uso familiar y renta vacacional alto nivel.',
        timestamp: '14:12',
      },
      {
        id: '2',
        from: 'aima',
        text: 'Buenas tardes, Alejandra. Entiendo que buscas exclusividad, ubicación premium y potencial de renta vacacional de lujo. En Bocagrande/Castillogrande tenemos acceso a 4 propiedades off-market (no publicadas en portales) desde $1.5M. ¿Te interesa que te envíe un dossier confidencial con renders, historia del edificio y proyección de renta premium?',
        timestamp: '14:12',
      },
      {
        id: '3',
        from: 'lead',
        text: 'Suena interesante. Pero necesito discreción total. Mi asesor actual no sabe que miro otras opciones.',
        timestamp: '14:15',
      },
      {
        id: '4',
        from: 'aima',
        text: 'Absolutamente. Todo lo que compartimos queda entre tú y AIMA. Tu información nunca sale de este chat sin tu autorización. El dossier es solo para tu revisión privada. ¿Te lo envío ahora o prefieres una videollamada breve para que te explique el inventario off-market antes?',
        timestamp: '14:15',
        metadata: { score: 72, tags: ['luxury', 'discrecion', 'off_market', 'long_nurture'], intent: 'compra_familiar_renta' },
      },
      {
        id: '5',
        from: 'lead',
        text: 'Envíamelo por este medio. Lo reviso con calma este fin de semana.',
        timestamp: '14:17',
      },
      {
        id: '6',
        from: 'aima',
        text: 'Enviado. Incluye: 4 propiedades off-market, comparativa de rentabilidad histórica Airbnb Premium, y contacto directo con mi colega senior María (15 años en luxury Cartagena) para cuando quieras agendar visita privada. Estaré atenta a tus dudas.',
        timestamp: '14:18',
      },
    ],
    outcome: {
      score: 72,
      status: 'warm',
      nextAction: 'Follow-up lunes: "¿Qué te pareció el dossier?" → Videollamada con María si interés. Secuencia nurture 30/60/90 días.',
      estimatedValue: '$1.8M | Comisión ~$54K | LTV 10x',
    },
  },
  {
    segment: 'admin',
    leadProfile: {
      name: 'Roberto L.',
      avatar: 'RL',
      location: 'Medellín, El Poblado',
      budget: '$1.800 USD/mes (renta objetivo)',
      timeline: 'Inmediato',
      intent: 'Poner en renta su apartamento 1 hab amoblado, gestión full',
    },
    messages: [
      {
        id: '1',
        from: 'lead',
        text: 'Tengo un apto 1 hab amoblado en El Poblado. Quiero rentarlo pero no tengo tiempo para gestionar huéspedes, limpieza, mantenimiento. ¿Cómo funciona su servicio?',
        timestamp: '09:45',
      },
      {
        id: '2',
        from: 'aima',
        text: '¡Hola Roberto! Nosotros hacemos gestión full: marketing profesional (fotos, video, listing en 15+ canales), screening de huéspedes, check-in/out 24/7, limpieza, mantenimiento, cobros y reporte mensual. Tú solo recibes el pago. ¿Sabes cuál es la renta mensual objetivo?',
        timestamp: '09:45',
      },
      {
        id: '3',
        from: 'lead',
        text: 'Espero unos $1.800 USD/mes. El apto está impecable, reformado hace 6 meses.',
        timestamp: '09:47',
      },
      {
        id: '4',
        from: 'aima',
        text: 'Con reforma reciente en El Poblado, $1.800 es muy realista (ocupación objetivo 85%+). Nuestro fee es 18% de renta bruta + IVA, sin costos ocultos. Incluye: seguro de daños hasta $5K, garantía de pago (cobramos nosotros), y tú apruebas cada huésped. ¿Te parece bien agendar visita técnica gratis para fotos y checklist esta semana?',
        timestamp: '09:48',
        metadata: { score: 90, tags: ['propietario', 'gestion_full', 'rentabilidad_clara', 'listo_para_empezar'], intent: 'admin_propiedad' },
      },
      {
        id: '5',
        from: 'lead',
        text: 'Sí, agenden. Miércoles en la tarde estoy libre.',
        timestamp: '09:50',
      },
      {
        id: '6',
        from: 'aima',
        text: 'Perfecto. Miércoles 3pm visita técnica con nuestro fotógrafo + checklist. El viernes subimos a canales y el lunes ya puedes tener primeros huéspedes. Te envío confirmación y contrato digital para firmar desde el celular.',
        timestamp: '09:51',
      },
    ],
    outcome: {
      score: 90,
      status: 'hot',
      nextAction: 'Visita técnica miércoles 3pm → Onboarding viernes → Primer huésped lunes.',
      estimatedValue: '$1.8K/mes | Fee $324/mes | ROI positivo mes 1',
    },
  },
];

export function getConversation(segment: 'tradicional' | 'luxury' | 'admin'): Conversation | undefined {
  return agentConversations.find(c => c.segment === segment);
}