import { Product } from "@/lib/data";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";
import { Check, ShoppingCart, ShieldCheck } from "lucide-react";
import { useState } from "react";

export function ProductCard({ product }: { product: Product }) {
  const addItem = useCart((state) => state.addItem);
  const [added, setAdded] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault(); // In case it's inside a Link
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <Card className="group relative flex flex-col h-full bg-white rounded-3xl border-0 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_-10px_rgba(0,186,162,0.2)] transition-all duration-500 hover:-translate-y-2 overflow-hidden ring-1 ring-slate-100 hover:ring-[#00BAA2]/30">
      {/* Top Badges */}
      <div className="absolute top-4 left-4 z-10 bg-white/95 backdrop-blur-md text-[#1B1857] text-[10px] font-extrabold px-3 py-1.5 rounded-full shadow-sm uppercase tracking-wider border border-slate-100 flex items-center gap-1">
        <span className="w-1.5 h-1.5 rounded-full bg-[#00BAA2] animate-pulse"></span>
        S/ 0 Inicial
      </div>

      {product.isFeatured && (
        <div className="absolute top-4 right-4 z-10 bg-gradient-to-r from-[#00BAA2] to-[#00A886] text-white text-[10px] font-extrabold px-3 py-1.5 rounded-full shadow-md uppercase tracking-wider">
          Destacado
        </div>
      )}

      {/* Image Area */}
      <div className="relative w-full aspect-[4/5] bg-[#F8FAFC] overflow-hidden p-6 flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/5 z-0"></div>
        <img
          src={product.image}
          alt={product.name}
          className="relative z-10 w-full h-full object-contain transition-transform duration-700 ease-out group-hover:scale-110 drop-shadow-xl"
        />
      </div>

      {/* Content */}
      <CardContent className="flex-1 flex flex-col p-6 pt-5">
        <div className="mb-auto">
          <p className="text-[#00BAA2] text-xs font-bold uppercase tracking-widest mb-1.5">
            {product.brand}
          </p>
          <h3 className="text-xl font-bold text-[#1B1857] leading-tight mb-3 title">
            {product.name}
          </h3>
          <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-4">
            <ShieldCheck className="w-4 h-4 text-[#00BAA2]" />
            <span>Garantía de originalidad</span>
          </div>
        </div>

        {/* Button */}
        <Button
          className={`w-full h-12 rounded-xl text-sm font-bold transition-all duration-300 shadow-md hover:shadow-lg ${
            added 
              ? "bg-[#1B1857] hover:bg-[#1B1857]/90 text-white" 
              : "bg-[#00BAA2] hover:bg-[#00A886] text-white"
          }`}
          onClick={handleAdd}
        >
          {added ? (
            <span className="flex items-center gap-2">
              <Check className="w-5 h-5" /> ¡Agregado!
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <ShoppingCart className="w-5 h-5" /> Lo quiero
            </span>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
