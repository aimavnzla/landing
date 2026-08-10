export interface ChannelSource {
  icon: string;
  label: string;
}

export interface FunnelTier {
  id: 'tofu' | 'mofu' | 'bofu';
  label: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  stat: { value: string; label: string };
  examples: string[];
}

/**
 * Fuentes que ya generan leads (tu embudo de marketing).
 * AIMA se conecta a todas: cada una es una puerta de entrada al sistema.
 */
export const channelSources: ChannelSource[] = [
  { icon: 'Instagram', label: 'Instagram' },
  { icon: 'Facebook', label: 'Facebook' },
  { icon: 'Chrome', label: 'Google Ads' },
  { icon: 'Globe', label: 'Web / Landing' },
  { icon: 'MessageCircle', label: 'WhatsApp' },
  { icon: 'Share2', label: 'Referidos' },
  { icon: 'Mail', label: 'Email' },
  { icon: 'Search', label: 'Portales' },
];

/**
 * Embudo de marketing clásico (TOFU → MOFU → BOFU):
 * de dónde salen los leads y qué hace cada lead en cada etapa.
 */
export const marketingFunnel: FunnelTier[] = [
  {
    id: 'tofu',
    label: 'TOFU',
    name: 'Alto volumen',
    description:
      'Tus ads y redes generan cientos de leads: quien llena el formulario, comenta un post o entra a la web.',
    icon: 'Megaphone',
    color: '#8a5fd4',
    stat: { value: '1,000+', label: 'leads brutos/mes' },
    examples: ['Llena un formulario', 'Escribe por DM', 'Entra a la web'],
  },
  {
    id: 'mofu',
    label: 'MOFU',
    name: 'Interés real',
    description:
      'El lead muestra intención: pide información, ve fichas, menciona presupuesto o timeline.',
    icon: 'Heart',
    color: '#d4a85f',
    stat: { value: '~40%', label: 'llegan con intención real' },
    examples: ['Pregunta disponibilidad', 'Pide la ficha', 'Menciona presupuesto'],
  },
  {
    id: 'bofu',
    label: 'BOFU',
    name: 'Listo para decidir',
    description:
      'El lead caliente: agenda visita, compara opciones y necesita cerrar pronto.',
    icon: 'Target',
    color: '#4fd48a',
    stat: { value: '<10%', label: 'listos para cerrar' },
    examples: ['Agenda una visita', 'Compara 2-3 opciones', 'Pregunta financiación'],
  },
];
