import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as LucideIcons from 'lucide-react';
import { getConversation } from '../data/agentConvos';
import { getSegment, type Segment } from '../data/segments';
import { useSegment } from '../hooks/useSegment';
import { trackDemoTabChanged, trackWhatsAppClick } from '../utils/analytics';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

type IconProps = { size?: number; strokeWidth?: number; className?: string; style?: React.CSSProperties };

const IconComponents: Record<string, React.ComponentType<IconProps>> = {
  MessageCircle: LucideIcons.MessageCircle,
  Bot: LucideIcons.Bot,
  User: LucideIcons.User,
  CheckCircle2: LucideIcons.CheckCircle2,
  Star: LucideIcons.Star,
  Zap: LucideIcons.Zap,
  Clock: LucideIcons.Clock,
  TrendingUp: LucideIcons.TrendingUp,
  ArrowRight: LucideIcons.ArrowRight,
  Smartphone: LucideIcons.Smartphone,
  Mail: LucideIcons.Mail,
  Phone: LucideIcons.Phone,
  MapPin: LucideIcons.MapPin,
  Lock: LucideIcons.Lock,
  ChevronDown: LucideIcons.ChevronDown,
  DollarSign: LucideIcons.DollarSign,
  Target: LucideIcons.Target,
  Building: LucideIcons.Building,
  Crown: LucideIcons.Crown,
  Key: LucideIcons.Key,
};

interface AgentDemoProps {
  className?: string;
}

export function AgentDemo({ className = '' }: AgentDemoProps) {
  const { segment, setSegment } = useSegment();
  const [activeTab, setActiveTab] = useState<Segment>(segment);
  const [showSidebar, setShowSidebar] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);

  // Sync activeTab with segment from hook
  useEffect(() => {
    setActiveTab(segment);
  }, [segment]);

  useEffect(() => {
    setSegment(activeTab);
    trackDemoTabChanged(activeTab, ['tradicional', 'luxury', 'admin'].indexOf(activeTab));
  }, [activeTab, setSegment]);

  const conversation = getConversation(activeTab);
  const segmentData = getSegment(activeTab);

  if (!conversation) return null;

  // Animate messages on mount
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.demo-message', {
        y: 20,
        opacity: 0,
        duration: 0.4,
        ease: 'power2.out',
        stagger: 0.08,
      });
    }, containerRef);
    return () => ctx.revert();
  }, [conversation.messages]);

  const scrollToBottom = () => {
    chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversation.messages]);

  const formatTime = (ts: string) => ts;

  return (
    <section
      ref={containerRef}
      id="agente-demo"
      className={`relative scroll-mt-24 py-16 sm:py-20 ${className}`}
      data-reveal
    >
      {/* Background glow based on segment */}
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(ellipse at center, ${segmentData.color.glow} 0%, transparent 70%)`,
        }}
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center mb-12">
          <span className="inline-flex items-center gap-2 rounded-full border border-aima-purple/30 bg-aima-purple/10 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-aima-purple-light">
            Agente IA en acción
          </span>
          <h2 className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl">
            Mira cómo AIMA vende por ti
            <br className="hidden sm:block" />
            <span className="text-aima-gradient">en tu segmento</span>
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-white/60">
            Conversaciones reales. Cada segmento tiene su lógica, tono y objetivos. Cambia la pestaña para ver la diferencia.
          </p>
        </div>

        {/* Segment Tabs */}
        <div className="relative mx-auto max-w-4xl mb-8" data-reveal>
          <div className="flex items-center justify-center gap-1.5 sm:gap-2 bg-white/5 rounded-2xl p-1.5" role="tablist">
            {(['tradicional', 'luxury', 'admin'] as Segment[]).map((seg) => {
              const segData = getSegment(seg);
              const isActive = activeTab === seg;
              const IconComponent = IconComponents[segData.icon] ?? LucideIcons.Tag;

              return (
                <button
                  key={seg}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`panel-${seg}`}
                  id={`tab-${seg}`}
                  onClick={() => setActiveTab(seg)}
                  className={`relative flex flex-1 min-w-0 flex-col items-center gap-1.5 rounded-xl px-2 sm:px-5 py-3 sm:py-4 transition-all duration-300 ${
                    isActive
                      ? 'bg-aima-purple/20 shadow-[0_8px_30px_rgba(123,63,228,0.3)]'
                      : 'hover:bg-white/5 text-white/70'
                  }`}
                  style={{
                    borderColor: isActive ? segData.color.primary : 'transparent',
                  }}
                >
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <IconComponent size={20} strokeWidth={2} style={{ color: isActive ? segData.color.primary : undefined }} className={!isActive ? 'text-white/50' : ''} />
                    <span className="font-medium text-sm whitespace-nowrap">{segData.label}</span>
                  </div>
                  <span className="text-xs text-white/40 truncate max-w-full">{segData.tagline}</span>
                  {isActive && (
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 h-2 w-2 rounded-full" style={{ backgroundColor: segData.color.primary }} />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Demo Area */}
        <div className="relative grid lg:grid-cols-[1fr_320px] gap-6">
          {/* Chat Window */}
          <div className="relative double-bezel overflow-hidden flex flex-col h-[520px] lg:h-[600px]">
            {/* Chat Header */}
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4 bg-white/5">
              <div className="flex items-center gap-3">
                <div className="relative flex h-10 w-10 items-center justify-center rounded-full" style={{ backgroundColor: `${segmentData.color.primary}33` }}>
                  <span className="text-sm font-bold" style={{ color: segmentData.color.primary }}>
                    {conversation.leadProfile.avatar}
                  </span>
                  <span className="absolute bottom-0 right-0 flex h-3 w-3 items-center justify-center rounded-full bg-emerald-400 border-2 border-aima-950" />
                </div>
                <div>
                  <p className="font-medium text-white">{conversation.leadProfile.name}</p>
                  <p className="text-xs text-white/50 flex items-center gap-1">
                    <IconComponents.MapPin size={10} />
                    {conversation.leadProfile.location}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-white/50">
                <span className="flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-emerald-400">
                  <IconComponents.CheckCircle2 size={10} />
                  Online
                </span>
              </div>
            </div>

            {/* Messages */}
            <div
              ref={chatRef}
              className="flex-1 overflow-y-auto p-5 space-y-4"
              role="log"
              aria-live="polite"
              aria-label={`Conversación demo ${segmentData.label}`}
            >
              {conversation.messages.map((msg, idx) => (
                <div
                  key={msg.id}
                  className={`demo-message flex ${msg.from === 'lead' ? 'justify-start' : msg.from === 'aima' ? 'justify-start' : 'justify-end'}`}
                  data-sender={msg.from}
                >
                  <div
                    className={`max-w-[75%] rounded-2xl px-4 py-3 ${
                      msg.from === 'lead'
                        ? 'rounded-tl-md bg-aima-700 text-white/85'
                        : msg.from === 'aima'
                        ? 'rounded-tr-md bg-gradient-to-br from-aima-purple to-aima-purple-dark text-white shadow-[0_8px_25px_rgba(123,63,228,0.3)]'
                        : 'rounded-tr-md bg-emerald-500/20 text-emerald-100 border border-emerald-500/30'
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{msg.text}</p>
                    {msg.metadata?.score && (
                      <div className="mt-2 flex items-center gap-2 text-xs text-aima-purple-light">
                        <IconComponents.Star size={12} className="text-current" />
                        <span>Score: {msg.metadata.score}/100</span>
                        {msg.metadata.tags && (
                          <>
                            <span className="px-1.5 py-0.5 rounded bg-aima-purple/30 text-[10px] uppercase">IA</span>
                            {msg.metadata.tags.slice(0, 2).map((tag) => (
                              <span key={tag} className="px-1.5 py-0.5 rounded bg-white/10 text-[10px]">
                                {tag}
                              </span>
                            ))}
                          </>
                        )}
                      </div>
                    )}
                    <div className="mt-1.5 flex items-center justify-end gap-1 text-[11px] text-white/40">
                      <span>{formatTime(msg.timestamp)}</span>
                      {msg.from === 'aima' && <IconComponents.CheckCircle2 size={10} className="text-aima-purple-light" />}
                    </div>
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              <div className="flex justify-start">
                <div className="flex items-center gap-1.5 rounded-2xl rounded-tl-md bg-aima-700 px-4 py-3">
                  <span className="flex h-4 w-4 animate-bounce [animation-delay:-0.3s] rounded-full bg-white/40" />
                  <span className="flex h-4 w-4 animate-bounce rounded-full bg-white/40" />
                  <span className="flex h-4 w-4 animate-bounce [animation-delay:0.3s] rounded-full bg-white/40" />
                </div>
              </div>
            </div>

            {/* Chat Input (disabled in demo) */}
            <div className="border-t border-white/10 px-4 py-3 bg-white/5">
              <div className="flex items-center gap-2 text-sm text-white/40">
                <IconComponents.Lock size={14} />
                <span>Demo interactiva — Cambia de pestaña para ver otros segmentos</span>
              </div>
            </div>
          </div>

          {/* Sidebar: What the advisor sees */}
          <aside className="relative double-bezel p-5 lg:p-6 overflow-y-auto h-[520px] lg:h-[600px]">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-semibold text-white flex items-center gap-2">
                <IconComponents.User size={18} className="text-emerald-400" />
                Lo que ve tu asesor
              </h3>
              <button
                onClick={() => setShowSidebar(!showSidebar)}
                className="lg:hidden p-1 rounded-lg hover:bg-white/5 text-white/60"
                aria-label="Toggle sidebar"
              >
                <IconComponents.ChevronDown size={18} className={showSidebar ? 'rotate-180' : ''} />
              </button>
            </div>

            <div className={`space-y-4 ${!showSidebar ? 'lg:block hidden' : 'block'}`}>
              {/* Lead Score Card */}
              <div className="relative rounded-xl p-4" style={{ background: `linear-gradient(135deg, ${segmentData.color.primary}22 0%, ${segmentData.color.secondary}11 100%)`, border: `1px solid ${segmentData.color.primary}40` }}>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-medium uppercase tracking-[0.1em] text-white/60">Lead Score</span>
                  <div className="text-3xl font-bold" style={{ color: segmentData.color.primary }}>
                    {conversation.outcome.score}/100
                  </div>
                </div>
                <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${conversation.outcome.score}%`, backgroundColor: segmentData.color.primary }}
                  />
                </div>
                <p className="mt-2 text-xs text-white/50">
                  {conversation.outcome.status === 'hot' && '🔥 Caliente — Listo para cerrar'}
                  {conversation.outcome.status === 'warm' && '🌡️ Tibio — En nurture'}
                  {conversation.outcome.status === 'cold' && '❄️ Frío — Requiere reactivación'}
                </p>
              </div>

              {/* Lead Profile */}
              <div className="space-y-3">
                <h4 className="text-xs font-medium uppercase tracking-[0.1em] text-white/40">Perfil del lead</h4>
                <div className="grid gap-2 sm:grid-cols-2">
                  <ProfileItem label="Presupuesto" value={conversation.leadProfile.budget} icon={IconComponents.DollarSign} />
                  <ProfileItem label="Timeline" value={conversation.leadProfile.timeline} icon={IconComponents.Clock} />
                  <ProfileItem label="Intención" value={conversation.leadProfile.intent} icon={IconComponents.Target} />
                  <ProfileItem label="Ubicación" value={conversation.leadProfile.location} icon={IconComponents.MapPin} />
                </div>
              </div>

              {/* Tags */}
              <div>
                <h4 className="text-xs font-medium uppercase tracking-[0.1em] text-white/40 mb-2">Etiquetas IA</h4>
                <div className="flex flex-wrap gap-2">
                  {conversation.messages.find(m => m.metadata?.tags)?.metadata?.tags?.map((tag) => (
                    <span key={tag} className="px-2 py-1 rounded-full text-xs bg-aima-purple/20 text-aima-purple-light border border-aima-purple/30">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Next Action */}
              <div className="rounded-xl p-4 bg-emerald-500/10 border border-emerald-500/20">
                <h4 className="text-xs font-medium uppercase tracking-[0.1em] text-emerald-400 mb-2 flex items-center gap-1">
                  <IconComponents.Zap size={12} />
                  Próxima acción
                </h4>
                <p className="text-sm text-white/80">{conversation.outcome.nextAction}</p>
              </div>

              {/* Estimated Value */}
              <div className="rounded-xl p-4 bg-amber-500/10 border border-amber-500/20">
                <h4 className="text-xs font-medium uppercase tracking-[0.1em] text-amber-400 mb-2 flex items-center gap-1">
                  <IconComponents.TrendingUp size={12} />
                  Valor estimado
                </h4>
                <p className="text-lg font-bold text-amber-400">{conversation.outcome.estimatedValue}</p>
              </div>

              {/* Handoff Button */}
              <button
                onClick={() => trackWhatsAppClick(activeTab, 'final_cta')}
                className="w-full mt-4 flex items-center justify-center gap-2 rounded-xl bg-aima-purple px-4 py-3 text-sm font-semibold text-white hover:bg-aima-purple-light transition-colors"
              >
                <IconComponents.ArrowRight size={16} />
                Transferir a asesor ahora
              </button>
            </div>
          </aside>
        </div>

        {/* Mobile: Segment selector */}
        <div className="lg:hidden mt-6" data-reveal>
          <label className="block text-sm text-white/50 mb-2">Ver demo para:</label>
          <select
            value={activeTab}
            onChange={(e) => setActiveTab(e.target.value as Segment)}
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white focus:outline-none focus:border-aima-purple/50"
          >
            {(['tradicional', 'luxury', 'admin'] as Segment[]).map((seg) => {
              const segData = getSegment(seg);
              return <option key={seg} value={seg}>{segData.label}</option>;
            })}
          </select>
        </div>
      </div>
    </section>
  );
}

function ProfileItem({ label, value, icon: IconComponent }: { label: string; value: string; icon: React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }> }) {
  return (
    <div className="flex items-start gap-2 text-sm min-w-0">
      <IconComponent size={14} className="text-white/40 shrink-0 mt-0.5" />
      <div className="min-w-0">
        <p className="text-[11px] text-white/40">{label}</p>
        <p className="font-medium text-white leading-snug">{value}</p>
      </div>
    </div>
  );
}