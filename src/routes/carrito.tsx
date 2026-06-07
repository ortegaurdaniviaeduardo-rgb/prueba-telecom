import { createFileRoute, Link } from '@tanstack/react-router';
import { useCart } from '@/hooks/useCart';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Trash2, ArrowLeft, Plus, Minus, CheckCircle2 } from 'lucide-react';
import { useCompanyQuery } from '@/hooks/useApi';
import { useState } from 'react';
import { lookupDni } from '@/lib/api/dni.functions';
import { toast } from 'sonner';

export const Route = createFileRoute('/carrito')({
  component: CarritoComponent,
})

function CarritoComponent() {
  const { items, removeItem, updateQuantity, clearCart, getItemsCount } = useCart();
  const itemsCount = getItemsCount();
  const { data: company } = useCompanyQuery();

  const [clientDni, setClientDni] = useState("");
  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [isSearchingDni, setIsSearchingDni] = useState(false);

  const handleDniChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").substring(0, 8);
    setClientDni(value);
    
    if (value.length === 8) {
      setIsSearchingDni(true);
      try {
        const result = await lookupDni({ data: { dni: value } });
        if (result.success && result.name) {
          setClientName(result.name);
          toast.success(
            result.source === "mock" 
              ? "DNI encontrado (Prueba)" 
              : result.source === "simulation" 
              ? "DNI validado (Simulado)" 
              : "DNI encontrado"
          );
        } else if (result.error) {
          toast.error(result.error);
        }
      } catch (error) {
        console.error(error);
        toast.error("Error al consultar el DNI.");
      } finally {
        setIsSearchingDni(false);
      }
    }
  };

  const handleWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    
    const rawPhone = company?.whatsapp || company?.celular || "900276190";
    const formattedPhone = rawPhone.replace(/\D/g, "");
    const phoneNumber = formattedPhone.length === 9 && formattedPhone.startsWith("9") 
      ? `51${formattedPhone}` 
      : formattedPhone;

    const brandName = company?.nombre_marca || "Telecom BL";

    let message = `Hola ${brandName}, me interesan estos equipos a crédito:\n\n`;
    items.forEach(item => {
      message += `- ${item.quantity}x ${item.name} (${item.brand})\n`;
    });
    
    message += `\n*Datos del Cliente:*\n`;
    message += `- DNI: ${clientDni}\n`;
    message += `- Nombres y Apellidos: ${clientName}\n`;
    message += `- N° Celular: ${clientPhone}\n\n`;
    
    message += "Por favor, indíquenme los requisitos para la evaluación de crédito.";

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
                <form onSubmit={handleWhatsApp} className="space-y-6">
                  <h2 className="text-2xl font-bold mb-6 title">Resumen de Evaluación</h2>

                  {/* Input fields for client details */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-white/70 uppercase tracking-wider mb-2">DNI (Perú)</label>
                      <div className="relative">
                        <input 
                          type="text" 
                          placeholder="Ej. 12345678"
                          className="w-full h-12 pl-4 pr-10 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-[#00BAA2] focus:ring-2 focus:ring-[#00BAA2]/20 transition-all font-medium text-sm"
                          value={clientDni}
                          onChange={handleDniChange}
                          maxLength={8}
                          required
                        />
                        {isSearchingDni && (
                          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center">
                            <div className="w-5 h-5 border-2 border-[#00BAA2] border-t-transparent rounded-full animate-spin"></div>
                          </div>
                        )}
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-white/70 uppercase tracking-wider mb-2">Nombres y Apellidos</label>
                      <input 
                        type="text" 
                        placeholder="Ej. Juan Pérez"
                        className="w-full h-12 px-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-[#00BAA2] focus:ring-2 focus:ring-[#00BAA2]/20 transition-all font-medium text-sm"
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-white/70 uppercase tracking-wider mb-2">N° Celular</label>
                      <input 
                        type="tel" 
                        placeholder="Ej. 987654321"
                        className="w-full h-12 px-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-[#00BAA2] focus:ring-2 focus:ring-[#00BAA2]/20 transition-all font-medium text-sm"
                        value={clientPhone}
                        onChange={(e) => setClientPhone(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-4 text-lg font-light pt-2">
                    <div className="flex justify-between items-center bg-white/5 p-4 rounded-2xl border border-white/10">
                      <span className="text-white/80 text-sm">Equipos seleccionados:</span>
                      <span className="font-bold text-2xl text-[#00BAA2]">{itemsCount}</span>
                    </div>
                    <div className="flex justify-between items-center bg-white/5 p-4 rounded-2xl border border-white/10">
                      <span className="text-white/80 text-sm">Costo de evaluación:</span>
                      <span className="font-bold text-xl text-[#00BAA2]">Gratis</span>
                    </div>
                    
                    <div className="pt-2 px-1">
                      <p className="text-[11px] text-white/50 leading-relaxed">
                        * El plazo y aprobación del crédito están sujetos a la evaluación crediticia que realizaremos por WhatsApp.
                      </p>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-[#1B1857] h-16 text-lg font-extrabold shadow-[0_4px_20px_rgba(37,211,102,0.3)] hover:shadow-[0_8px_30px_rgba(37,211,102,0.4)] transition-all rounded-2xl hover:-translate-y-1 flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <svg viewBox="0 0 24 24" className="w-6 h-6 mr-1 fill-current" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    Solicitar Crédito Ahora
                  </Button>
                </form>

                <div className="mt-6 text-center">
                  <button onClick={clearCart} className="text-white/40 hover:text-white/80 text-sm font-medium transition-colors underline underline-offset-4 cursor-pointer">
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
