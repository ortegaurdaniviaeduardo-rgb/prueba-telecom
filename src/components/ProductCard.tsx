import { Product } from "@/lib/data";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Eye, ShoppingCart } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function ProductCard({ product }: { product: Product }) {
  const slug = (product as any).slug || product.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');

  return (
    <Link to="/producto/$slug" params={{ slug }} className="block no-underline h-full">
      <Card className="group relative flex flex-col h-full bg-white rounded-3xl border-0 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_-10px_rgba(0,186,162,0.2)] transition-all duration-500 hover:-translate-y-2 overflow-hidden ring-1 ring-slate-100 hover:ring-[#00BAA2]/30 cursor-pointer">
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
        <div className="relative w-full aspect-square bg-[#F8FAFC] overflow-hidden p-6 flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/5 z-0"></div>
          
          {/* Main Image */}
          <img
            src={product.image}
            alt={product.name}
            className={`relative z-10 w-full h-full object-contain transition-all duration-700 ease-out drop-shadow-xl ${
              product.images && product.images.length > 1
                ? "group-hover:opacity-0 group-hover:scale-95"
                : "group-hover:scale-110"
            }`}
          />

          {/* Secondary Image (Hover State) */}
          {product.images && product.images.length > 1 && (
            <img
              src={product.images[1]}
              alt={`${product.name} - vista alterna`}
              className="absolute inset-0 z-15 w-full h-full object-contain p-6 opacity-0 group-hover:opacity-100 transition-all duration-700 ease-out scale-95 group-hover:scale-105 drop-shadow-xl"
            />
          )}

          {/* Hover overlay (Only shown if there is 1 image) */}
          {(!product.images || product.images.length <= 1) && (
            <div className="absolute inset-0 bg-[#1B1857]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 flex items-center justify-center">
              <div className="bg-white/95 backdrop-blur-sm rounded-full px-5 py-2.5 flex items-center gap-2 text-[#1B1857] font-bold text-sm shadow-lg transform translate-y-3 group-hover:translate-y-0 transition-transform duration-300">
                <Eye className="w-4 h-4" />
                Ver detalles
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        <CardContent className="flex-1 flex flex-col p-6 pt-5 pb-4">
          <div className="mb-auto">
            <p className="text-[#00BAA2] text-xs font-bold uppercase tracking-widest mb-1.5">
              {product.brand}
            </p>
            <h3 className="text-xl font-bold text-[#1B1857] leading-tight mb-3 title">
              {product.name}
            </h3>
            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <ShieldCheck className="w-4 h-4 text-[#00BAA2]" />
              <span>Garantía de originalidad</span>
            </div>
          </div>
        </CardContent>

        {/* Button inside the Link (fully clickable as part of card link) */}
        <div className="px-6 pb-6 pt-0 mt-auto">
          <Button
            className="w-full h-12 rounded-xl text-sm font-bold transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2 bg-[#00BAA2] hover:bg-[#00A886] text-white cursor-pointer"
            asChild={false}
          >
            <div className="flex items-center justify-center gap-2 w-full h-full">
              <ShoppingCart className="w-4 h-4" />
              <span>Añadir al carrito</span>
            </div>
          </Button>
        </div>
      </Card>
    </Link>
  );
}
