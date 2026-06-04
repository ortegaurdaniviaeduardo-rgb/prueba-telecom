import { createFileRoute, Link, notFound } from '@tanstack/react-router';
import { useProductsQuery, useProductBySlugQuery, useCompanyQuery } from '@/hooks/useApi';
import { useCart } from '@/hooks/useCart';
import { Product } from '@/lib/data';
import {
  ChevronRight,
  ShieldCheck,
  MessageCircle,
  Star,
  CheckCircle2,
  ChevronLeft,
  ChevronRight as ChevronRightIcon,
  Smartphone,
  Zap,
  Package,
  Share2,
  ArrowLeft,
  Check,
  ShoppingCart,
} from 'lucide-react';
import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/ProductCard';

export const Route = createFileRoute('/producto/$slug')({
  component: ProductoDetalle,
});

function ProductoDetalle() {
  const { slug } = Route.useParams();
  const { data: allProducts = [], isLoading: isLoadingAll } = useProductsQuery();
  const { data: company } = useCompanyQuery();

  const rawPhone = company?.whatsapp || company?.celular || '900276190';
  const formattedPhone = rawPhone.replace(/\D/g, '');
  const whatsappNumber =
    formattedPhone.length === 9 && formattedPhone.startsWith('9')
      ? `51${formattedPhone}`
      : formattedPhone;

  // Find the product in the cached list first (instant), then fallback to API
  const product: Product | undefined = useMemo(
    () =>
      allProducts.find(
        (p) =>
          ((p as any).slug || p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')) === slug
      ),
    [allProducts, slug]
  );

  // Extra images
  const images: string[] = useMemo(() => {
    const extraImages: string[] = (product as any)?.images || [];
    const main = product?.image || '';
    if (extraImages.length > 0) return extraImages;
    return main ? [main] : [];
  }, [product]);

  const [activeImage, setActiveImage] = useState(0);

  const addItem = useCart((state) => state.addItem);
  const [addedToCart, setAddedToCart] = useState(false);

  const handleAddToCart = () => {
    if (product) {
      addItem(product);
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 2000);
    }
  };

  // Related products (same category, max 4, excluding current)
  const related = useMemo(
    () =>
      allProducts
        .filter(
          (p) =>
            p.category === product?.category &&
            ((p as any).slug || p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')) !== slug
        )
        .slice(0, 4),
    [allProducts, product, slug]
  );

  const whatsappMessage = product
    ? `Hola, estoy interesado en el *${product.name}* que vi en su catálogo. ¿Podrían darme más información sobre precios y cuotas? 📱`
    : '';
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: product?.name,
        text: `¡Mira este celular! ${product?.name}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  if (isLoadingAll) {
    return (
      <div className="min-h-screen bg-[#FFFBFB] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#00BAA2] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-500 font-medium">Cargando producto...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#FFFBFB] flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Smartphone className="w-12 h-12 text-slate-300" />
          </div>
          <h1 className="text-3xl font-bold text-[#1B1857] mb-3">Producto no encontrado</h1>
          <p className="text-slate-500 mb-8">
            Este producto ya no está disponible o el enlace es incorrecto.
          </p>
          <Link
            to="/catalogo"
            className="inline-flex items-center gap-2 bg-[#00BAA2] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#00A886] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Ver catálogo completo
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FFFBFB] min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-slate-100 py-3 px-4">
        <div className="container mx-auto max-w-6xl">
          <nav className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
            <Link to="/" className="hover:text-[#00BAA2] transition-colors">
              Inicio
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link to="/catalogo" className="hover:text-[#00BAA2] transition-colors">
              Catálogo
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-[#1B1857] font-semibold truncate max-w-[180px]">
              {product.name}
            </span>
          </nav>
        </div>
      </div>

      {/* Main Product Section */}
      <div className="container mx-auto max-w-6xl px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* === LEFT: Image Gallery === */}
          <div className="space-y-4">
            {/* Main image */}
            <div className="relative bg-white rounded-3xl overflow-hidden shadow-[0_20px_60px_-15px_rgba(27,24,87,0.1)] ring-1 ring-slate-100 aspect-square flex items-center justify-center p-2">
              {/* Featured badge */}
              {product.isFeatured && (
                <div className="absolute top-5 left-5 z-10 bg-gradient-to-r from-[#00BAA2] to-[#00A886] text-white text-xs font-extrabold px-3 py-1.5 rounded-full shadow-md uppercase tracking-wider flex items-center gap-1">
                  <Star className="w-3 h-3" />
                  Destacado
                </div>
              )}

              {/* Share button */}
              <button
                onClick={handleShare}
                className="absolute top-5 right-5 z-10 bg-white/90 backdrop-blur-sm p-2.5 rounded-full shadow-md hover:shadow-lg transition-all hover:bg-[#00BAA2] hover:text-white text-slate-500 group"
              >
                <Share2 className="w-4 h-4" />
              </button>

              <AnimatePresence mode="wait">
                <motion.img
                  key={activeImage}
                  src={images[activeImage] || product.image}
                  alt={product.name}
                  className="w-full h-full object-contain drop-shadow-2xl"
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.3 }}
                />
              </AnimatePresence>

              {/* Nav arrows */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={() => setActiveImage((i) => (i - 1 + images.length) % images.length)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-md hover:shadow-lg transition-all text-slate-700 hover:text-[#00BAA2]"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setActiveImage((i) => (i + 1) % images.length)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-md hover:shadow-lg transition-all text-slate-700 hover:text-[#00BAA2]"
                  >
                    <ChevronRightIcon className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="flex gap-3 justify-center flex-wrap">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-200 bg-white p-1.5 shadow-sm ${
                      i === activeImage
                        ? 'border-[#00BAA2] shadow-[0_0_0_3px_rgba(0,186,162,0.15)]'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-contain" />
                  </button>
                ))}
              </div>
            )}

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: ShieldCheck, label: 'Garantía original', sub: '100% auténtico' },
                { icon: Zap, label: 'Evaluación rápida', sub: 'Respuesta inmediata' },
                { icon: Package, label: 'Sin cuota inicial', sub: 'Crédito al instante' },
              ].map(({ icon: Icon, label, sub }) => (
                <div
                  key={label}
                  className="bg-white rounded-2xl p-4 text-center shadow-sm ring-1 ring-slate-100"
                >
                  <Icon className="w-6 h-6 text-[#00BAA2] mx-auto mb-2" />
                  <p className="text-xs font-bold text-[#1B1857] leading-tight">{label}</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">{sub}</p>
                </div>
              ))}
            </div>
          </div>

          {/* === RIGHT: Product Info === */}
          <div className="flex flex-col gap-6">
            {/* Brand + Title */}
            <div>
              <p className="text-[#00BAA2] text-sm font-extrabold uppercase tracking-widest mb-2">
                {product.brand}
              </p>
              <h1 className="text-4xl font-bold text-[#1B1857] leading-tight title mb-4">
                {product.name}
              </h1>

              {/* Price badge */}
              <div className="inline-flex items-center gap-3 bg-gradient-to-r from-[#1B1857] to-[#25226D] text-white px-5 py-3 rounded-2xl shadow-lg">
                <span className="text-sm font-semibold text-white/70">Desde</span>
                <span className="text-2xl font-black">S/ 0</span>
                <span className="text-sm font-semibold text-white/70">inicial</span>
              </div>
            </div>

            {/* Features / Specs */}
            {product.features && product.features.length > 0 && (
              <div className="bg-white rounded-2xl p-6 shadow-sm ring-1 ring-slate-100 space-y-3">
                <h2 className="text-sm font-extrabold text-[#1B1857] uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-[#00BAA2]" />
                  Características
                </h2>
                <div className="space-y-2.5">
                  {product.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-[#00BAA2] flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-slate-700 font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Credit Info */}
            <div className="bg-gradient-to-br from-[#F0FDF9] to-[#E6FBF6] rounded-2xl p-5 border border-[#00BAA2]/20">
              <h3 className="font-extrabold text-[#1B1857] mb-3 text-sm uppercase tracking-wide">
                💳 ¿Cómo obtenerlo?
              </h3>
              <div className="space-y-2 text-sm text-slate-700">
                {[
                  'Escríbenos por WhatsApp para evaluación gratuita',
                  'Sin cuota inicial — acceso a crédito inmediato',
                  'Cuotas mensuales cómodas hasta 24 meses',
                  'Entrega en Lima y provincias',
                ].map((step, i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-[#00BAA2] text-white text-[10px] font-black flex items-center justify-center flex-shrink-0">
                      {i + 1}
                    </span>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col gap-4 mt-4">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full"
              >
                <Button className="w-full h-16 rounded-2xl bg-[#25D366] hover:bg-[#20BE5A] text-white font-extrabold text-base shadow-[0_8px_30px_-5px_rgba(37,211,102,0.5)] hover:shadow-[0_12px_40px_-5px_rgba(37,211,102,0.6)] transition-all duration-300 flex items-center justify-center gap-3">
                  <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  ¡Lo quiero! Consultar ahora
                </Button>
              </a>

              {/* Grid with Add to Cart & Back to Catalog */}
              <div className="grid grid-cols-2 gap-4">
                <Button
                  onClick={handleAddToCart}
                  className={`h-12 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${
                    addedToCart
                      ? 'bg-[#1B1857] hover:bg-[#1B1857]/90 text-white'
                      : 'bg-[#00BAA2] hover:bg-[#00A886] text-white shadow-md hover:shadow-lg'
                  }`}
                >
                  {addedToCart ? (
                    <>
                      <Check className="w-4 h-4 animate-bounce" />
                      ¡Agregado!
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-4 h-4" />
                      Añadir al carrito
                    </>
                  )}
                </Button>

                <Link to="/catalogo" className="block w-full">
                  <Button
                    variant="outline"
                    className="w-full h-12 rounded-xl border-slate-200 text-slate-600 hover:border-[#1B1857] hover:text-[#1B1857] font-semibold flex items-center justify-center gap-2 transition-all"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Volver al catálogo
                  </Button>
                </Link>
              </div>
            </div>

            {/* WhatsApp guarantee note */}
            <p className="text-center text-xs text-slate-400 -mt-1">
              🔒 Evaluación gratuita · Sin compromisos · Respuesta en minutos
            </p>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <div className="bg-white border-t border-slate-100 py-16 mt-4">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="mb-10">
              <p className="text-[#00BAA2] text-xs font-extrabold uppercase tracking-widest mb-2">
                También te puede gustar
              </p>
              <h2 className="text-3xl font-bold text-[#1B1857] title">
                Más equipos {product.brand}
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
