import { createFileRoute } from '@tanstack/react-router';
import { ShieldCheck, Clock, ThumbsUp, HeartHandshake, Zap, Sparkles } from 'lucide-react';

export const Route = createFileRoute('/nosotros')({
  component: NosotrosComponent,
})

function NosotrosComponent() {
  return (
    <div className="bg-[#FFFBFB] min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-24 pb-32 bg-[#1B1857] overflow-hidden text-center">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556740758-90de374c12ad?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#1B1857] via-[#1B1857]/80 to-transparent"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00BAA2]/20 text-[#00BAA2] border border-[#00BAA2]/30 text-sm font-bold tracking-widest uppercase mb-6">
            <Sparkles className="w-4 h-4" /> Nuestra Esencia
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 title max-w-4xl mx-auto leading-tight">
            Más que tecnología, <span className="text-[#00BAA2]">conectamos familias.</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto font-light">
            Somos tu aliado de confianza para adquirir la mejor tecnología en cómodas cuotas, con un trato directo, amable y 100% transparente.
          </p>
        </div>
      </section>

      {/* Valores */}
      <section className="py-24 relative -mt-16 z-20">
        <div className="container mx-auto px-4 max-w-[1200px]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-3xl shadow-[0_10px_40px_-10px_rgba(27,24,87,0.08)] border border-slate-100 hover:-translate-y-2 transition-transform duration-300">
              <div className="bg-[#1B1857]/5 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                <ShieldCheck className="w-8 h-8 text-[#1B1857]" />
              </div>
              <h3 className="text-xl font-bold text-[#1B1857] mb-3">Confiabilidad</h3>
              <p className="text-slate-600 leading-relaxed">Equipos 100% originales en caja sellada con garantía y respaldo directo.</p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-[0_10px_40px_-10px_rgba(27,24,87,0.08)] border border-slate-100 hover:-translate-y-2 transition-transform duration-300">
              <div className="bg-[#00BAA2]/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                <HeartHandshake className="w-8 h-8 text-[#00BAA2]" />
              </div>
              <h3 className="text-xl font-bold text-[#1B1857] mb-3">Trato Humano</h3>
              <p className="text-slate-600 leading-relaxed">Atención personalizada, con paciencia y profundo respeto para todos nuestros clientes.</p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-[0_10px_40px_-10px_rgba(27,24,87,0.08)] border border-slate-100 hover:-translate-y-2 transition-transform duration-300">
              <div className="bg-blue-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                <ThumbsUp className="w-8 h-8 text-blue-500" />
              </div>
              <h3 className="text-xl font-bold text-[#1B1857] mb-3">Proceso Sencillo</h3>
              <p className="text-slate-600 leading-relaxed">Olvídate de papeleos complicados y largas filas. Evaluamos tu crédito fácil y rápido.</p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-[0_10px_40px_-10px_rgba(27,24,87,0.08)] border border-slate-100 hover:-translate-y-2 transition-transform duration-300">
              <div className="bg-orange-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                <Zap className="w-8 h-8 text-orange-500" />
              </div>
              <h3 className="text-xl font-bold text-[#1B1857] mb-3">Respuesta Rápida</h3>
              <p className="text-slate-600 leading-relaxed">Contestamos tus mensajes a la brevedad posible vía WhatsApp para no hacerte esperar.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Historia */}
      <section className="py-24 bg-white border-t border-slate-100">
        <div className="container mx-auto px-4 max-w-[1000px]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-tr from-[#1B1857]/10 to-[#00BAA2]/20 rounded-[3rem] transform -rotate-3"></div>
              <img 
                src="https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=800&auto=format&fit=crop" 
                alt="Nuestra historia" 
                className="relative rounded-[2.5rem] shadow-xl object-cover aspect-[4/5]"
              />
            </div>
            
            <div className="space-y-8">
              <div>
                <h2 className="text-sm font-extrabold text-[#00BAA2] tracking-[0.2em] uppercase mb-2">Nuestra Historia</h2>
                <h3 className="text-4xl md:text-5xl font-bold text-[#1B1857] title leading-tight">
                  Un sueño que creció <span className="text-[#00BAA2]">contigo.</span>
                </h3>
              </div>
              
              <div className="space-y-6 text-lg text-slate-600 leading-relaxed font-light">
                <p>
                  Comenzamos con un propósito claro: <strong className="text-[#1B1857] font-semibold">hacer que la tecnología de calidad sea accesible para todos</strong>. Sabemos que no siempre es fácil pagar un equipo al contado, especialmente cuando las grandes tiendas piden requisitos inalcanzables. Por eso diseñamos planes a medida de hasta 24 meses.
                </p>
                <p>
                  Hoy en día, hemos ayudado a miles de familias, jóvenes emprendedores y personas mayores a mantenerse conectados con sus seres queridos mediante videollamadas claras y equipos modernos. 
                </p>
                <p className="text-[#1B1857] font-bold text-xl pt-4 border-t border-slate-100">
                  En Telecom BL, tú eres y siempre serás nuestra prioridad.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
