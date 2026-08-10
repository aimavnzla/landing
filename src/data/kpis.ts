export interface KPI {
  id: string;
  label: string;
  value: number;
  suffix: string;
  prefix?: string;
  description: string;
  icon?: string;
  color?: 'purple' | 'emerald' | 'amber' | 'blue' | 'pink';
  animate?: boolean;
}

export const kpis: KPI[] = [
  {
    id: 'ventas_extra',
    label: 'Ventas/arriendos extra por mes',
    value: 2.5,
    suffix: '+',
    description: 'Promedio en inmobiliarias que implementan AIMA',
    icon: 'TrendingUp',
    color: 'purple',
    animate: true,
  },
  {
    id: 'leads_capturados',
    label: 'Leads capturados sin pérdidas',
    value: 100,
    suffix: '%',
    description: 'Omnichannel 24/7: WhatsApp, IG, FB, Webchat',
    icon: 'CheckCircle2',
    color: 'emerald',
    animate: true,
  },
  {
    id: 'tiempo_respuesta',
    label: 'Tiempo de respuesta inicial',
    value: 3,
    suffix: ' seg',
    description: 'Incluso a las 3 a.m., fines de semana y festivos',
    icon: 'Zap',
    color: 'amber',
    animate: true,
  },
  {
    id: 'tiempo_recuperado',
    label: 'Tiempo comercial recuperado',
    value: 70,
    suffix: '%',
    description: 'Agentes dejan de atender curiosos y solo cierran',
    icon: 'Clock',
    color: 'blue',
    animate: true,
  },
  {
    id: 'cac_visible',
    label: 'CAC por lead calificado',
    value: 100,
    suffix: '% visible',
    description: 'Sabes exactamente cuánto cuesta un listo-para-cerrar',
    icon: 'Magnet',
    color: 'pink',
    animate: true,
  },
  {
    id: 'disponibilidad',
    label: 'Tu inmobiliaria nunca cierra',
    value: 24,
    suffix: '/7',
    description: 'IA respondiendo, agendando y nutriendo siempre',
    icon: 'MoonStar',
    color: 'purple',
    animate: false,
  },
];

export const kpiIcons = {
  TrendingUp: 'TrendingUp',
  CheckCircle2: 'CheckCircle2',
  Zap: 'Zap',
  Clock: 'Clock',
  Magnet: 'Magnet',
  MoonStar: 'MoonStar',
};