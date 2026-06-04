import { createFileRoute, Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Send, CheckCircle2, ShieldAlert } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export const Route = createFileRoute('/libro-reclamaciones')({
  component: LibroReclamacionesComponent,
});

function LibroReclamacionesComponent() {
  const [formData, setFormData] = useState({
    nombre: '',
    tipoDoc: 'DNI',
    numDoc: '',
    telefono: '',
    correo: '',
    direccion: '',
    tipoReclamo: 'Reclamación', // Reclamación (disconformidad relacionada a bienes) o Queja (malestar o descontento respecto a la atención)
    detalle: '',
    pedido: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Reclamación enviada:', formData);
    
    // Simulate successful submission
    setSubmitted(true);
    toast.success('Tu reclamo/queja ha sido registrado exitosamente.');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-[#FFFBFB] min-h-screen py-16">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="flex items-center gap-3 mb-8">
          <Link to="/" className="text-slate-400 hover:text-[#00BAA2] transition-colors p-2 -ml-2 rounded-xl hover:bg-[#00BAA2]/10">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-3xl font-bold text-[#1B1857] title tracking-tight">Libro de Reclamaciones</h1>
        </div>

        {submitted ? (
          <Card className="border-0 shadow-[0_15px_50px_-15px_rgba(27,24,87,0.08)] rounded-3xl overflow-hidden bg-white text-center p-10">
            <CardContent className="space-y-6">
              <div className="bg-green-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-12 h-12 text-[#00BAA2]" />
              </div>
              <h2 className="text-2xl font-bold text-[#1B1857]">¡Registro Exitoso!</h2>
              <p className="text-slate-600 max-w-md mx-auto leading-relaxed">
                Tu solicitud ha sido registrada bajo la ley de protección al consumidor de INDECOPI. Evaluaremos tu caso a la brevedad y te responderemos en un plazo máximo de 15 días hábiles.
              </p>
              <div className="pt-6">
                <Link to="/">
                  <Button className="bg-[#00BAA2] hover:bg-[#00A886] text-white rounded-xl px-8 h-12 font-bold shadow-md">
                    Volver al Inicio
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="border-0 shadow-[0_15px_50px_-15px_rgba(27,24,87,0.08)] rounded-3xl overflow-hidden bg-white">
            <div className="bg-[#1B1857] text-white p-6 md:p-8 flex items-center gap-4 border-b border-slate-100">
              <ShieldAlert className="w-10 h-10 text-[#00BAA2] shrink-0" />
              <div>
                <h2 className="text-xl font-bold">Libro de Reclamaciones Digital</h2>
                <p className="text-xs text-white/70 mt-1 leading-relaxed">
                  Conforme a lo establecido en el Código de Protección y Defensa del Consumidor de la República del Perú.
                </p>
              </div>
            </div>

            <CardContent className="p-6 md:p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* 1. Datos del Consumidor */}
                <div>
                  <h3 className="text-sm font-extrabold text-[#1B1857] uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">
                    1. Identificación del Consumidor Reclamante
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nombres y Apellidos</label>
                      <input 
                        type="text" 
                        name="nombre"
                        required
                        value={formData.nombre}
                        onChange={handleChange}
                        className="w-full h-12 px-4 rounded-xl border border-slate-200 focus:outline-none focus:border-[#00BAA2] focus:ring-4 focus:ring-[#00BAA2]/10 transition-all font-medium text-sm text-[#1B1857]"
                        placeholder="Ingresa tus nombres completos"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tipo de Documento</label>
                      <select 
                        name="tipoDoc"
                        value={formData.tipoDoc}
                        onChange={handleChange}
                        className="w-full h-12 px-4 rounded-xl border border-slate-200 focus:outline-none focus:border-[#00BAA2] focus:ring-4 focus:ring-[#00BAA2]/10 transition-all font-medium text-sm text-[#1B1857]"
                      >
                        <option value="DNI">DNI (Perú)</option>
                        <option value="RUC">RUC</option>
                        <option value="CE">Carnet de Extranjería</option>
                        <option value="Pasaporte">Pasaporte</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Número de Documento</label>
                      <input 
                        type="text" 
                        name="numDoc"
                        required
                        value={formData.numDoc}
                        onChange={handleChange}
                        className="w-full h-12 px-4 rounded-xl border border-slate-200 focus:outline-none focus:border-[#00BAA2] focus:ring-4 focus:ring-[#00BAA2]/10 transition-all font-medium text-sm text-[#1B1857]"
                        placeholder="Número de documento"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Teléfono / Celular</label>
                      <input 
                        type="tel" 
                        name="telefono"
                        required
                        value={formData.telefono}
                        onChange={handleChange}
                        className="w-full h-12 px-4 rounded-xl border border-slate-200 focus:outline-none focus:border-[#00BAA2] focus:ring-4 focus:ring-[#00BAA2]/10 transition-all font-medium text-sm text-[#1B1857]"
                        placeholder="Ej. 987654321"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Correo Electrónico</label>
                      <input 
                        type="email" 
                        name="correo"
                        required
                        value={formData.correo}
                        onChange={handleChange}
                        className="w-full h-12 px-4 rounded-xl border border-slate-200 focus:outline-none focus:border-[#00BAA2] focus:ring-4 focus:ring-[#00BAA2]/10 transition-all font-medium text-sm text-[#1B1857]"
                        placeholder="ejemplo@correo.com"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Domicilio / Dirección</label>
                      <input 
                        type="text" 
                        name="direccion"
                        required
                        value={formData.direccion}
                        onChange={handleChange}
                        className="w-full h-12 px-4 rounded-xl border border-slate-200 focus:outline-none focus:border-[#00BAA2] focus:ring-4 focus:ring-[#00BAA2]/10 transition-all font-medium text-sm text-[#1B1857]"
                        placeholder="Dirección completa, Distrito, Provincia"
                      />
                    </div>
                  </div>
                </div>

                {/* 2. Detalle del Reclamo */}
                <div>
                  <h3 className="text-sm font-extrabold text-[#1B1857] uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">
                    2. Detalle de la Reclamación
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tipo de Incidencia</label>
                      <div className="flex gap-6 mt-1">
                        <label className="flex items-center gap-2 text-sm font-medium text-[#1B1857] cursor-pointer">
                          <input 
                            type="radio" 
                            name="tipoReclamo" 
                            value="Reclamación"
                            checked={formData.tipoReclamo === 'Reclamación'}
                            onChange={handleChange}
                            className="w-4 h-4 text-[#00BAA2] focus:ring-[#00BAA2]"
                          />
                          <span><strong>Reclamación:</strong> Disconformidad relacionada a los bienes o productos.</span>
                        </label>
                      </div>
                      <div className="flex gap-6 mt-3">
                        <label className="flex items-center gap-2 text-sm font-medium text-[#1B1857] cursor-pointer">
                          <input 
                            type="radio" 
                            name="tipoReclamo" 
                            value="Queja"
                            checked={formData.tipoReclamo === 'Queja'}
                            onChange={handleChange}
                            className="w-4 h-4 text-[#00BAA2] focus:ring-[#00BAA2]"
                          />
                          <span><strong>Queja:</strong> Disconformidad no relacionada a bienes, sino al servicio o atención.</span>
                        </label>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Detalle del Reclamo o Queja</label>
                      <textarea 
                        name="detalle"
                        required
                        rows={4}
                        value={formData.detalle}
                        onChange={handleChange}
                        className="w-full p-4 rounded-xl border border-slate-200 focus:outline-none focus:border-[#00BAA2] focus:ring-4 focus:ring-[#00BAA2]/10 transition-all font-medium text-sm text-[#1B1857]"
                        placeholder="Describe detalladamente lo ocurrido..."
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Pedido / Solicitud concreta del cliente</label>
                      <textarea 
                        name="pedido"
                        required
                        rows={3}
                        value={formData.pedido}
                        onChange={handleChange}
                        className="w-full p-4 rounded-xl border border-slate-200 focus:outline-none focus:border-[#00BAA2] focus:ring-4 focus:ring-[#00BAA2]/10 transition-all font-medium text-sm text-[#1B1857]"
                        placeholder="¿Qué solución concreta esperas de nuestra parte?"
                      />
                    </div>
                  </div>
                </div>

                {/* Submit button */}
                <div className="pt-4">
                  <Button 
                    type="submit"
                    className="w-full h-14 bg-[#00BAA2] hover:bg-[#00A886] text-white rounded-xl font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-5 h-5" />
                    Enviar Reclamación
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
