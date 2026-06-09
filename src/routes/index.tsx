import * as React from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import { useProductsQuery, useAnnouncementsQuery, useTestimonialsQuery } from '@/hooks/useApi';
import { ProductCard } from '@/components/ProductCard';
import { TestimonialCard } from '@/components/TestimonialCard';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from '@/components/ui/carousel';
import { ArrowRight, ShieldCheck, Zap, Handshake, Loader2, MapPin } from 'lucide-react';

export const Route = createFileRoute('/')({
  component: Index,
  head: () => ({
    meta: [
      { title: 'Telecom BL | Celulares al crédito sin inicial en Lima' },
      { name: 'description', content: 'Renueva tu celular con Telecom BL: crédito rápido, fácil y sin cuota inicial. Equipos originales con garantía y atención por WhatsApp en Lima.' },
      { name: 'keywords', content: 'celulares al crédito, celulares sin inicial, crédito celular Lima, financiamiento celulares, Telecom BL, smartphones a plazos' },
      { name: 'robots', content: 'index, follow' },
      { property: 'og:title', content: 'Telecom BL | Celulares al crédito sin inicial en Lima' },
      { property: 'og:description', content: 'Crédito rápido, fácil y 100% transparente para renovar tu celular. Sin cuota inicial, equipos originales y atención por WhatsApp.' },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: 'https://telecombl.com/' },
      { property: 'og:locale', content: 'es_PE' },
      { property: 'og:site_name', content: 'Telecom BL' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'Telecom BL | Celulares al crédito sin inicial' },
      { name: 'twitter:description', content: 'Renueva tu celular con crédito rápido, fácil y sin inicial. Equipos originales con garantía.' },
    ],
    links: [
      { rel: 'canonical', href: 'https://telecombl.com/' },
    ],
    scripts: [
      {
        type: 'application/ld+json',
        children: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Store',
          name: 'Telecom BL',
          description: 'Venta y financiamiento de celulares sin cuota inicial en Lima, Perú.',
          url: 'https://telecombl.com/',
          areaServed: 'Lima, Perú',
          priceRange: '$$',
          telephone: '+51',
          department: [
            { '@type': 'Store', name: 'Sede Chorrillos', url: 'https://maps.app.goo.gl/SbnZTUNKL5M4VaJY7' },
            { '@type': 'Store', name: 'Sede Atocongo', url: 'https://maps.app.goo.gl/De4gKw8caJT5n2Xc7' },
            { '@type': 'Store', name: 'Sede Villa María 1', url: 'https://maps.app.goo.gl/3qxJ9cCpcADPwxUr8' },
            { '@type': 'Store', name: 'Sede Villa María 2', url: 'https://maps.app.goo.gl/eDawTsHzeQvuNr3o9' },
            { '@type': 'Store', name: 'Sede Villa El Salvador', url: 'https://maps.app.goo.gl/ykikv8oXtfKZigKG7' },
          ],
        }),
      },
    ],
  }),
})

function Index() {
  const { data: apiProducts = [], isLoading: isLoadingProducts } = useProductsQuery();
  const { data: heroSlides = [], isLoading: isLoadingSlides } = useAnnouncementsQuery();
  const { data: testimonials = [] } = useTestimonialsQuery();


  const featuredProducts = React.useMemo(() => {
    return apiProducts.filter(p => p.isFeatured).slice(0, 8);
  }, [apiProducts]);

  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <div className="flex flex-col bg-[#FFFBFB]">
      <h1 className="sr-only">Telecom BL — Celulares al crédito sin cuota inicial en Lima</h1>
      {/* 1. PORTADA: Carrusel de imágenes de portada */}
      <section className="w-full aspect-video relative overflow-hidden bg-[#1B1857]">
        {isLoadingSlides ? (
          <div className="w-full h-full bg-slate-800/10 flex items-center justify-center">
            <Loader2 className="w-12 h-12 text-[#00BAA2] animate-spin" />
          </div>
        ) : (
          <Carousel className="w-full h-full relative" opts={{ loop: true }}>
            <CarouselContent className="h-full ml-0">
              {heroSlides.map((slide, index) => (
                <CarouselItem key={index} className="h-full pl-0">
                  <div className="relative w-full h-full overflow-hidden bg-[#1B1857]">
                    {/* Blurred background fallback for non-square images */}
                    <img 
                      src={slide} 
                      className="absolute inset-0 w-full h-full object-cover blur-3xl opacity-50 scale-125 z-0" 
                      alt="" 
                      aria-hidden="true" 
                    />
                    <img
                      src={slide}
                      alt={`Portada promocional ${index + 1}`}
                      className="relative w-full h-full object-cover object-center z-10"
                    />
                    {/* Shadow overlay to ensure text legibility */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/45 pointer-events-none z-20" />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-4 bg-white/20 hover:bg-white/95 text-white hover:text-[#1B1857] border-0 w-12 h-12 shadow-lg backdrop-blur-md transition-all z-20" />
            <CarouselNext className="right-4 bg-white/20 hover:bg-white/95 text-white hover:text-[#1B1857] border-0 w-12 h-12 shadow-lg backdrop-blur-md transition-all z-20" />
          </Carousel>
        )}
      </section>

      {/* 2. CATÁLOGO DESTACADOS */}
      <section className="py-24 relative overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#1B1857 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-sm font-extrabold text-[#00BAA2] tracking-[0.2em] uppercase mb-3">Top Ventas</h2>
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1B1857] mb-6 title">Celulares Más Vendidos</h3>
            <p className="text-lg text-slate-600">
              Descubre los equipos favoritos de nuestros clientes este mes. 
              <br className="hidden md:block" />Fináncialos hoy mismo sin cuota inicial.
            </p>
          </div>

          {isLoadingProducts ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="w-10 h-10 text-[#00BAA2] animate-spin" />
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          <div className="text-center mt-16">
            <Link to="/catalogo">
              <Button size="lg" className="h-16 px-10 text-lg font-bold bg-white text-[#1B1857] border-2 border-[#1B1857] hover:bg-[#1B1857] hover:text-white transition-all duration-300 rounded-2xl shadow-md hover:shadow-xl group">
                Explorar todo el catálogo 
                <ArrowRight className="ml-3 w-6 h-6 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 3. NOSOTROS (Resumen) */}
      <section className="py-24 bg-[#1B1857] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1B1857] via-[#25226D] to-[#00A886]/30"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-sm font-extrabold text-[#00BAA2] tracking-[0.2em] uppercase">Por qué elegirnos</h2>
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight title">
                Tu crédito rápido, fácil y <span className="text-[#00BAA2]">transparente.</span>
              </h3>
              <p className="text-lg text-white/80 leading-relaxed font-light">
                Sabemos que renovar tu equipo puede ser un reto. Por eso, en <span className="font-bold text-white">Telecom BL</span> hemos diseñado un proceso directo, pensado para ti y sin letras pequeñas.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
                <div className="bg-white/5 backdrop-blur-sm p-6 rounded-3xl border border-white/10 hover:bg-white/10 transition-colors">
                  <div className="bg-[#00BAA2]/20 w-12 h-12 rounded-2xl flex items-center justify-center mb-4">
                    <Handshake className="w-6 h-6 text-[#00BAA2]" />
                  </div>
                  <h4 className="text-lg font-bold mb-2">Trato Humano</h4>
                  <p className="text-sm text-white/70">Atención personalizada con paciencia para resolver todas tus dudas.</p>
                </div>
                <div className="bg-white/5 backdrop-blur-sm p-6 rounded-3xl border border-white/10 hover:bg-white/10 transition-colors">
                  <div className="bg-[#00BAA2]/20 w-12 h-12 rounded-2xl flex items-center justify-center mb-4">
                    <Zap className="w-6 h-6 text-[#00BAA2]" />
                  </div>
                  <h4 className="text-lg font-bold mb-2">Evaluación Rápida</h4>
                  <p className="text-sm text-white/70">Todo el proceso se realiza por WhatsApp, sin salir de casa.</p>
                </div>
              </div>

              <div className="pt-4">
                <Link to="/nosotros">
                  <Button variant="link" className="text-[#00BAA2] hover:text-white text-lg p-0 font-bold group">
                    Conoce más sobre nuestra historia 
                    <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-[#00BAA2] to-[#00A886] rounded-[2.5rem] transform rotate-3 opacity-50 blur-lg"></div>
              <img
                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=800&auto=format&fit=crop"
                alt="Atención al cliente"
                className="relative rounded-[2rem] shadow-2xl object-cover aspect-square md:aspect-[4/3]"
              />
              
              {/* Floating Badge */}
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-3xl shadow-2xl flex items-center gap-4 animate-bounce hover:animate-none">
                <div className="bg-[#25D366]/20 p-3 rounded-full">
                  <ShieldCheck className="w-8 h-8 text-[#25D366]" />
                </div>
                <div>
                  <p className="text-[#1B1857] font-bold text-lg">100% Garantía</p>
                  <p className="text-slate-500 text-sm">Equipos Originales</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. TESTIMONIOS */}
      <section id="clientes" className="py-24 bg-[#FFF5EF]">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto mb-10">
            <h3 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-[#1B1857] mb-8 title leading-tight">
              Ellos ya estrenaron <span className="text-[#FF7043]">su nuevo celular</span>
            </h3>
            
            <Link to="/catalogo">
              <Button className="bg-[#FF7043] hover:bg-[#FF5722] text-white rounded-full px-8 h-12 text-lg font-bold shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                Ver Catálogo
              </Button>
            </Link>
          </div>

          <div className="max-w-6xl mx-auto px-4">
            <Carousel
              setApi={setApi}
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full relative px-4 md:px-10"
            >
              <CarouselContent className="-ml-4">
                {testimonials.map((testimonial) => (
                  <CarouselItem key={testimonial.id} className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
                    <div className="p-2 h-full">
                      <TestimonialCard testimonial={testimonial} />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-0 md:-left-4 bg-white/90 hover:bg-[#FF7043] text-[#1B1857] hover:text-white border border-slate-200 w-10 h-10 md:w-12 md:h-12 shadow-md transition-all duration-300" />
              <CarouselNext className="right-0 md:-right-4 bg-white/90 hover:bg-[#FF7043] text-[#1B1857] hover:text-white border border-slate-200 w-10 h-10 md:w-12 md:h-12 shadow-md transition-all duration-300" />
            </Carousel>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-3 mt-10">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => api?.scrollTo(i)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  current === i ? "bg-[#FF7043] scale-110" : "bg-[#FF7043]/30 hover:bg-[#FF7043]/50"
                }`}
                aria-label={`Ir al testimonio ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 5. NUESTRAS SEDES */}
      <section id="sedes" className="py-24 bg-white relative overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#00BAA2]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#1B1857]/5 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h3 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-[#1B1857] mb-6 title leading-tight">
              Visita nuestras <span className="text-[#00BAA2]">Sedes</span>
            </h3>
            <p className="text-slate-600 text-lg">
              Ven y conoce todos nuestros equipos en persona. Te esperamos con la mejor atención.
            </p>
          </div>

          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Sede Chorrillos",
                link: "https://maps.app.goo.gl/SbnZTUNKL5M4VaJY7",
                image: "/sedes/CHORRILLOS.jpeg"
              },
              {
                name: "Sede Atocongo",
                link: "https://maps.app.goo.gl/De4gKw8caJT5n2Xc7",
                image: "/sedes/SEDE-ATOCONGO.jpeg"
              },
              {
                name: "Villa María 1",
                link: "https://maps.app.goo.gl/3qxJ9cCpcADPwxUr8",
                image: "/sedes/SEDE-VILLA-MARIA-1.jpeg"
              },
              {
                name: "Villa María 2",
                link: "https://maps.app.goo.gl/eDawTsHzeQvuNr3o9",
                image: "/sedes/VILLA-MARIA-2.jpeg"
              },
              {
                name: "Sede Villa El Salvador",
                link: "https://maps.app.goo.gl/ykikv8oXtfKZigKG7",
                image: "/sedes/JOSE-OLAYA.jpeg"
              }
            ].map((sede, index) => (
              <a 
                href={sede.link}
                target="_blank"
                rel="noopener noreferrer"
                key={index} 
                className="group cursor-pointer bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-slate-100 flex flex-col"
              >
                <div className="relative h-56 bg-slate-100 overflow-hidden">
                  <img 
                    src={sede.image} 
                    alt={sede.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                </div>
                <div className="p-8 flex-1 flex flex-col justify-center items-center text-center">
                  <h4 className="text-xl font-bold text-[#1B1857] mb-4 group-hover:text-[#00BAA2] transition-colors">
                    {sede.name}
                  </h4>
                  <div 
                    className="inline-flex items-center gap-2 bg-[#1B1857] text-white px-6 py-3 rounded-xl font-medium group-hover:bg-[#00BAA2] transition-colors shadow-md group-hover:shadow-lg w-full justify-center"
                  >
                    <MapPin className="w-5 h-5" />
                    Ver en Google Maps
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
