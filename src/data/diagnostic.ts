export interface DiagnosticItem {
  id: string;
  title: string;
  stat: string;
  statLabel: string;
  description: string;
  icon: string;
  color: 'purple' | 'red' | 'amber' | 'blue';
}

export const diagnosticItems: DiagnosticItem[] = [
  {
    id: 'sin_filtro',
    title: 'Sin filtro previo',
    stat: '70%',
    statLabel: 'del tiempo comercial se va en curiosos sin presupuesto real',
    description: 'Tus agentes atienden por igual a quien compra y a quien solo pregunta. No hay triage automático antes de que un humano invierta su tiempo.',
    icon: 'Filter',
    color: 'red',
  },
  {
    id: 'tiempo_mal_invertido',
    title: 'Tiempo mal invertido',
    stat: '2-8 sem',
    statLabel: 'de decisión promedio mientras el lead caliente se enfría',
    description: 'Mientras un agente conversa con un curioso, un comprador real con urgencia y presupuesto ya está firmando con la competencia.',
    icon: 'Clock',
    color: 'amber',
  },
  {
    id: 'seguimiento_inconsistente',
    title: 'Seguimiento inconsistente',
    stat: '0%',
    statLabel: 'follow-up nocturno y festivos. Tibios se enfrían en 48h',
    description: 'Nadie retoma el contacto a tiempo. Los leads que no cierran en la primera conversación se pierden en el limbo sin nurture sistemático.',
    icon: 'Repeat',
    color: 'blue',
  },
  {
    id: 'cero_visibilidad_costo',
    title: 'Cero visibilidad de costo',
    stat: '?',
    statLabel: 'No sabes cuánto cuesta realmente un lead listo para cerrar',
    description: 'Inviertes en ads, portales, referidos... pero no tienes trazabilidad completa desde clic hasta comisión. CAC por lead calificado = desconocido.',
    icon: 'Magnet',
    color: 'purple',
  },
];