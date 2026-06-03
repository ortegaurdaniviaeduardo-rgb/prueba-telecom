import { createFileRoute, Link } from '@tanstack/react-router';
import { useCart } from '@/hooks/useCart';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Trash2, Phone, ArrowLeft, Plus, Minus, CheckCircle2 } from 'lucide-react';

export const Route = createFileRoute('/carrito')({
  component: CarritoComponent,
})

function CarritoComponent() {
  const { items, removeItem, updateQuantity, clearCart, getItemsCount } = useCart();
  const itemsCount = getItemsCount();

  const handleWhatsApp = () => {
    const phoneNumber = "51999999999"; // TODO: Update with real phone

    let message = "Hola Telecom BL, me interesan estos equipos a crédito:\n\n";
    items.forEach(item => {
      message += `- ${item.quantity}x ${item.name} (${item.brand})\n`;
    });
    message += "\nPor favor, indíquenme los requisitos para la evaluación de crédito.";

    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  if (items.length === 0) {
    return (
      <div className="bg-[#FFFBFB] min-h-screen pt-24 pb-32 flex items-center justify-center">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <div className="bg-white p-12 rounded-[3rem] shadow-[0_10px_40px_-10px_rgba(27,24,87,0.08)] border border-slate-100 relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-[#00BAA2] to-[#00A886]"></div>
            <div className="bg-slate-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8">
              <svg className="w-12 h-12 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold mb-4 text-[#1B1857] title">Tu carrito está vacío</h1>
            <p className="text-slate-500 mb-8 text-lg font-light">Aún no has seleccionado ningún celular. Visita nuestro catálogo para ver los mejores equipos y llevártelos a crédito.</p>
            <Link to="/catalogo">
              <Button size="lg" className="h-14 px-8 text-lg rounded-2xl bg-[#00BAA2] hover:bg-[#00A886] text-white font-bold transition-all shadow-md hover:shadow-xl hover:-translate-y-1">
                Ir al Catálogo de Equipos
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FFFBFB] min-h-screen py-16">
      <div className="container mx-auto px-4 max-w-[1200px]">
        <div className="flex items-center gap-3 mb-10">
          <Link to="/catalogo" className="text-slate-400 hover:text-[#00BAA2] transition-colors p-2 -ml-2 rounded-xl hover:bg-[#00BAA2]/10">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-3xl md:text-5xl font-bold text-[#1B1857] title tracking-tight">Tu Carrito de Compras</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 space-y-6">
            {items.map((item) => (
              <Card key={item.id} className="overflow-hidden bg-white rounded-3xl border border-slate-100 shadow-[0_4px_20px_-4px_rgba(27,24,87,0.05)] hover:shadow-lg transition-shadow">
                <CardContent className="p-4 sm:p-6 flex flex-col sm:flex-row items-center gap-6 relative">
                  <div className="bg-[#F8FAFC] p-4 rounded-2xl shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 sm:w-32 sm:h-32 object-contain mix-blend-multiply"
                    />
                  </div>
                  
                  <div className="flex-1 text-center sm:text-left">
                    <p className="text-xs font-bold text-[#00BAA2] uppercase tracking-widest mb-1">{item.brand}</p>
                    <h3 className="text-2xl font-bold text-[#1B1857] mb-2">{item.name}</h3>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-700 rounded-lg text-sm font-medium">
                      <CheckCircle2 className="w-4 h-4" /> Disponible a crédito
                    </div>
                  </div>

                  <div className="flex flex-row sm:flex-col items-center gap-6 sm:gap-4 w-full sm:w-auto justify-between sm:justify-center pt-4 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                    <div className="flex items-center gap-3 bg-slate-50 rounded-2xl p-1.5 border border-slate-100 shadow-inner">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-2 hover:bg-white rounded-xl transition-all shadow-sm border border-transparent hover:border-slate-200 text-slate-600 hover:text-red-500 disabled:opacity-50"
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="font-bold w-6 text-center text-[#1B1857]">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-2 hover:bg-white rounded-xl transition-all shadow-sm border border-transparent hover:border-slate-200 text-slate-600 hover:text-[#00BAA2]"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl"
                      onClick={() => removeItem(item.id)}
                    >
                      <Trash2 className="w-5 h-5" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-28 border-0 shadow-[0_10px_40px_-10px_rgba(27,24,87,0.1)] rounded-3xl overflow-hidden bg-[#1B1857] text-white">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556740758-90de374c12ad?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-[0.03]"></div>
              
              <CardContent className="p-8 relative z-10">
                <h2 className="text-2xl font-bold mb-8 title">Resumen de Evaluación</h2>

                <div className="space-y-4 mb-8 text-lg font-light">
                  <div className="flex justify-between items-center bg-white/5 p-4 rounded-2xl border border-white/10">
                    <span className="text-white/80">Equipos seleccionados:</span>
                    <span className="font-bold text-2xl text-[#00BAA2]">{itemsCount}</span>
                  </div>
                  <div className="flex justify-between items-center bg-white/5 p-4 rounded-2xl border border-white/10">
                    <span className="text-white/80">Costo de evaluación:</span>
                    <span className="font-bold text-xl text-[#00BAA2]">Gratis</span>
                  </div>
                  
                  <div className="pt-4 px-2">
                    <p className="text-sm text-white/50 leading-relaxed">
                      * El plazo y aprobación del crédito están sujetos a la evaluación crediticia que realizaremos por WhatsApp.
                    </p>
                  </div>
                </div>

                <Button
                  onClick={handleWhatsApp}
                  className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-[#1B1857] h-16 text-lg font-extrabold shadow-[0_4px_20px_rgba(37,211,102,0.3)] hover:shadow-[0_8px_30px_rgba(37,211,102,0.4)] transition-all rounded-2xl hover:-translate-y-1"
                >
                  <Phone className="w-6 h-6 mr-3 fill-current" />
                  Solicitar Crédito Ahora
                </Button>

                <div className="mt-6 text-center">
                  <button onClick={clearCart} className="text-white/40 hover:text-white/80 text-sm font-medium transition-colors underline underline-offset-4">
                    Vaciar carrito
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
