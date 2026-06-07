import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useLocation,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import libroReclamacionesUrl from "../assets/libro-reclamaciones.jpeg";
import logoFlyUrl from "../assets/logo-fly.svg";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Lovable App" },
      { name: "description", content: "Telecom BL Express offers a premium, high-conversion landing page for acquiring customers for 24-month cell phone credit." },
      { name: "author", content: "Lovable" },
      { property: "og:title", content: "Lovable App" },
      { property: "og:description", content: "Telecom BL Express offers a premium, high-conversion landing page for acquiring customers for 24-month cell phone credit." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@Lovable" },
      { name: "twitter:title", content: "Lovable App" },
      { name: "twitter:description", content: "Telecom BL Express offers a premium, high-conversion landing page for acquiring customers for 24-month cell phone credit." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/3c88c994-99c4-4bcc-b6fc-fcc65b9538c4/id-preview-4649c1bb--6ad28d25-35e5-473c-a52c-f9af9f254361.lovable.app-1780418442603.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/3c88c994-99c4-4bcc-b6fc-fcc65b9538c4/id-preview-4649c1bb--6ad28d25-35e5-473c-a52c-f9af9f254361.lovable.app-1780418442603.png" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Nunito:ital,wght@0,200..1000;1,200..1000&display=swap" },
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

import { ShoppingCart, Phone, ChevronDown, Menu, X, Loader2, Search } from "lucide-react";
import { useCart } from "../hooks/useCart";
import { useState } from "react";
import { useCategoriesQuery, useCompanyQuery } from "../hooks/useApi";
import { motion, AnimatePresence } from "framer-motion";

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <AppLayout />
    </QueryClientProvider>
  );
}

function AppLayout() {
  const { data: company } = useCompanyQuery();
  const { data: categories = [] } = useCategoriesQuery();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const items = useCart((state) => state.items);
  const itemsCount = items ? items.reduce((sum: number, item: any) => sum + item.quantity, 0) : useCart((state: any) => state.getItemsCount?.() || 0);
  const location = useLocation();

  const isHeaderTransparent = location.pathname === '/' && !scrolled && !isMobileMenuOpen;

  const rawPhone = company?.whatsapp || company?.celular || "900276190";
  const formattedPhone = rawPhone.replace(/\D/g, "");
  const whatsappNumber = formattedPhone.length === 9 && formattedPhone.startsWith("9") 
    ? `51${formattedPhone}` 
    : formattedPhone;

  const brandName = company?.nombre_marca || "Telecom BL";
  const legalName = company?.nombre_legal || "TELECOMUNICACIONES PERU B.L.";
  const logoUrl = company?.imagen_relacionada?.url || "/logo.png";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const timer = setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [location.hash, location.pathname]);

  const navLinks = [
    { name: 'Inicio', path: '/' },
    { name: 'Catálogo', path: '/catalogo', hasDropdown: true },
    { name: 'Clientes', path: '/', hash: 'clientes' },
    { name: 'Nosotros', path: '/nosotros' }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFBFB] text-slate-800 font-sans">
      {/* Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, type: 'spring', stiffness: 100 }}
        className={`z-50 w-full transition-all duration-300 ${
          location.pathname === '/' ? 'fixed' : 'sticky'
        } top-0 ${
          scrolled || isMobileMenuOpen
            ? 'bg-[#1B1857]/95 backdrop-blur-md shadow-2xl py-2'
            : location.pathname === '/'
            ? 'bg-[#1B1857] md:bg-transparent py-2 md:py-4'
            : 'bg-[#1B1857] py-2 md:py-4'
        }`}
      >
        <div className="container mx-auto px-4 lg:px-8 grid grid-cols-3 md:flex items-center justify-between">
          {/* Mobile Menu Trigger (Left on Mobile) */}
          <div className="flex md:hidden justify-start">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white/90 hover:text-white p-2 transition-colors"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>

          {/* Logo (Center on Mobile, Left on Desktop) */}
          <div className="col-start-2 col-span-1 flex justify-center md:block md:col-auto z-50">
            <Link to="/" className="flex relative group">
              <img 
                src={logoUrl} 
                alt={brandName} 
                className="h-12 xs:h-14 sm:h-16 md:h-20 w-auto object-contain transition-transform duration-300 group-hover:scale-105" 
              />
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = link.hash
                ? location.pathname === link.path && location.hash === `#${link.hash}`
                : location.pathname === link.path && !location.hash;
              return (
                <div key={link.name} className="relative group px-2 py-1">
                  <Link
                    to={link.path}
                    hash={link.hash}
                    className={`relative z-10 px-4 py-2 font-semibold text-sm transition-colors duration-300 flex items-center gap-1 ${
                      isActive ? 'text-white' : 'text-white/70 hover:text-white'
                    }`}
                  >
                    {link.name}
                    {link.hasDropdown && <ChevronDown className="w-3.5 h-3.5 opacity-70 group-hover:rotate-180 transition-transform duration-300" />}
                    
                    {isActive && (
                      <motion.div
                        layoutId="navbar-indicator"
                        className="absolute inset-0 bg-white/10 rounded-full -z-10"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </Link>
                  
                  {link.hasDropdown && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300 z-50">
                      <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-2 min-w-[200px] flex flex-col relative before:absolute before:-top-2 before:left-1/2 before:-translate-x-1/2 before:border-8 before:border-transparent before:border-b-white">
                        <Link to="/catalogo" className="px-4 py-2.5 text-sm font-bold text-[#1B1857] hover:bg-slate-50 rounded-xl transition-colors">Ver todo el catálogo</Link>
                        <div className="h-px bg-slate-100 my-1 mx-2"></div>
                        {categories.filter(c => c !== "Todas").map(cat => (
                          <Link 
                            key={cat}
                            to="/catalogo" 
                            search={{ category: cat }}
                            className="px-4 py-2.5 text-sm font-medium text-slate-600 hover:text-[#00BAA2] hover:bg-[#00BAA2]/5 rounded-xl transition-colors"
                          >
                            {cat}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Mobile Search & Cart Actions (Right on Mobile) */}
          <div className="flex md:hidden items-center gap-1.5 justify-end">
            <Link to="/catalogo" className="p-2.5 text-white/90 hover:text-white transition-colors hover:bg-white/10 rounded-full">
              <Search className="w-6 h-6" />
            </Link>
            <Link to="/carrito" className="relative p-2.5 text-white/90 hover:text-white transition-colors hover:bg-white/10 rounded-full group">
              <ShoppingCart className="w-6 h-6" />
              <AnimatePresence>
                {itemsCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-1.5 -right-1.5 bg-[#00BAA2] text-white text-[10px] font-extrabold w-5.5 h-5.5 rounded-full flex items-center justify-center border-2 border-[#1B1857] shadow-lg"
                  >
                    {itemsCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          </div>

          {/* Desktop Right Action Area */}
          <div className="hidden md:flex items-center gap-4">
            <Link to="/carrito" className="relative p-2.5 text-white/80 hover:text-white transition-colors hover:bg-white/10 rounded-full group">
              <ShoppingCart className="w-6 h-6" />
              <AnimatePresence>
                {itemsCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-1.5 -right-1.5 bg-[#00BAA2] text-white text-[10px] font-extrabold w-5.5 h-5.5 rounded-full flex items-center justify-center border-2 border-[#1B1857] shadow-lg"
                  >
                    {itemsCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          </div>
        </div>

        {/* Mobile Subheader Menu Bar */}
        <div className="md:hidden bg-[#13113C]/95 backdrop-blur-md border-t border-white/5 py-2.5 overflow-x-auto no-scrollbar scroll-smooth">
          <div className="flex items-center gap-2 px-4 w-max mx-auto">
            {navLinks.map((link) => {
              const isActive = link.hash
                ? location.pathname === link.path && location.hash === `#${link.hash}`
                : location.pathname === link.path && !location.hash;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  hash={link.hash}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 border ${
                    isActive
                      ? 'bg-[#00BAA2] text-white border-[#00BAA2] shadow-lg shadow-[#00BAA2]/25'
                      : 'bg-white/5 text-white/80 border-white/10 hover:bg-white/10'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Mobile Menu Panel */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-[#1B1857] border-t border-white/5"
            >
              <div className="container mx-auto px-4 py-6 space-y-4">
                {navLinks.map((link) => (
                  <div key={link.name} className="space-y-2">
                    <Link
                      to={link.path}
                      hash={link.hash}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block py-2 text-white/80 hover:text-white font-bold text-lg"
                    >
                      {link.name}
                    </Link>
                    {link.hasDropdown && (
                      <div className="pl-4 grid grid-cols-2 gap-2 pb-2">
                        {categories.filter(c => c !== "Todas").map(cat => (
                          <Link
                            key={cat}
                            to="/catalogo"
                            search={{ category: cat }}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="text-white/60 hover:text-[#00BAA2] text-sm py-1.5 font-medium"
                          >
                            {cat}
                          </Link>
                        ))}
                        <Link
                          to="/catalogo"
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="text-[#00BAA2] hover:text-white text-sm py-1.5 font-bold col-span-2"
                        >
                          Ver todo el catálogo →
                        </Link>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="flex-1 flex flex-col"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="bg-[#1B1857] pt-20 pb-10 border-t border-white/5 mt-auto relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#00BAA2]/30 to-transparent"></div>
        <div className="absolute -top-[300px] -right-[300px] w-[600px] h-[600px] bg-[#00BAA2]/5 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="space-y-6">
              <div className="inline-block transition-transform hover:scale-105 duration-300">
                <img src={logoUrl} alt={brandName} className="h-16 md:h-24 w-auto object-contain" />
              </div>
              <p className="text-white/60 leading-relaxed max-w-sm text-sm">
                Tu mejor opción para renovar tu equipo. Te ofrecemos crédito rápido, fácil, sin inicial y 100% transparente para que estés siempre conectado.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-bold text-white mb-6">Navegación</h4>
              <ul className="space-y-3 text-sm">
                <li><Link to="/" className="text-white/70 hover:text-[#00BAA2] transition-colors flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-[#00BAA2]"></div> Inicio</Link></li>
                <li><Link to="/catalogo" className="text-white/70 hover:text-[#00BAA2] transition-colors flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-[#00BAA2]"></div> Catálogo de Equipos</Link></li>
                <li><Link to="/" hash="clientes" className="text-white/70 hover:text-[#00BAA2] transition-colors flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-[#00BAA2]"></div> Clientes</Link></li>
                <li><Link to="/nosotros" className="text-white/70 hover:text-[#00BAA2] transition-colors flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-[#00BAA2]"></div> Sobre Nosotros</Link></li>
                <li><Link to="/carrito" className="text-white/70 hover:text-[#00BAA2] transition-colors flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-[#00BAA2]"></div> Tu Carrito</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold text-white mb-6">Legal</h4>
              <ul className="space-y-3 text-sm mb-6">
                <li><a href="#" className="text-white/70 hover:text-[#00BAA2] transition-colors flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-[#00BAA2]"></div> Términos y Condiciones</a></li>
                <li><a href="#" className="text-white/70 hover:text-[#00BAA2] transition-colors flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-[#00BAA2]"></div> Políticas de Privacidad</a></li>
              </ul>
              <Link to="/libro-reclamaciones" className="inline-block hover:opacity-90 transition-opacity bg-white p-2 rounded-2xl shadow-md">
                <img src={libroReclamacionesUrl} alt="Libro de Reclamaciones" className="h-10 w-auto object-contain" />
              </Link>
            </div>
            
            <div>
              <h4 className="text-lg font-bold text-white mb-6">Contacto</h4>
              <ul className="space-y-4 text-sm text-white/70">
                <li className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-[#00BAA2] shrink-0" />
                  <span>Lunes a Sábado<br/>9:00 AM - 6:00 PM</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#25D366] flex items-center justify-center shrink-0 mt-0.5">
                    <svg viewBox="0 0 24 24" className="w-3 h-3 text-white fill-current" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                  </div>
                  <span>Evaluación vía WhatsApp<br/>Respuesta en minutos</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-white/10 flex flex-col items-center gap-4">
            <p className="text-white/50 text-xs">&copy; {new Date().getFullYear()} {legalName}. Todos los derechos reservados.</p>
            <div className="flex items-center gap-1.5 text-white/40 text-xs mt-2">
              <span>Desarrollado por</span>
              <a href="https://flyup.rest" target="_blank" rel="noopener noreferrer" className="hover:opacity-85 transition-opacity">
                <img src={logoFlyUrl} alt="Fly" className="h-5 w-auto object-contain inline-block ml-1 bg-white/10 px-1 py-0.5 rounded" />
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a
        href={`https://wa.me/${whatsappNumber}?text=Hola,%20quisiera%20más%20información%20sobre%20los%20celulares%20a%20crédito.`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-[#25D366] hover:bg-[#20bd5a] text-white p-4 rounded-full shadow-[0_8px_30px_rgb(37,211,102,0.4)] transition-all duration-300 hover:scale-110 hover:-translate-y-1 z-50 flex items-center justify-center group"
        aria-label="Contactar por WhatsApp"
      >
        <svg viewBox="0 0 24 24" className="w-7 h-7 fill-current group-hover:animate-pulse" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
        <span className="absolute right-full mr-4 bg-white text-[#1B1857] text-sm font-bold py-2 px-4 rounded-2xl shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          ¡Escríbenos para tu crédito!
        </span>
      </a>
    </div>
  );
}
