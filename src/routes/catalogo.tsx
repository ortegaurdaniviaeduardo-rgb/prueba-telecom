import { createFileRoute } from '@tanstack/react-router';
import { useState, useMemo } from 'react';
import { useProductsQuery, useCategoriesQuery } from '@/hooks/useApi';
import { ProductCard } from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { 
  Search, 
  ChevronDown, 
  FilterX, 
  Smartphone, 
  Star, 
  Camera, 
  Maximize, 
  ArrowUpDown,
  Loader2
} from 'lucide-react';

export const Route = createFileRoute('/catalogo')({
  component: CatalogoComponent,
  validateSearch: (search: Record<string, unknown>) => {
    return {
      category: search.category as string | undefined,
    }
  }
})

function CatalogoComponent() {
  const { category: urlCategory } = Route.useSearch();
  const { data: apiProducts = [], isLoading: isLoadingProducts } = useProductsQuery();
  const { data: categories = [] } = useCategoriesQuery();

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(urlCategory || "Todas");
  const [sortOrder, setSortOrder] = useState<"recent" | "oldest">("recent");
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const filteredProducts = useMemo(() => {
    let result = apiProducts.filter((p) => {
      const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.brand.toLowerCase().includes(search.toLowerCase()) ||
        p.features.some(f => f.toLowerCase().includes(search.toLowerCase()));
      const matchesCategory = selectedCategory === "Todas" || p.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });

    // Sort by date
    result.sort((a, b) => {
      const dateA = new Date(a.dateAdded).getTime();
      const dateB = new Date(b.dateAdded).getTime();
      return sortOrder === "recent" ? dateB - dateA : dateA - dateB;
    });

    return result;
  }, [apiProducts, search, selectedCategory, sortOrder]);

  const hasActiveFilters = selectedCategory !== "Todas" || search !== "";

  return (
    <div className="bg-[#FFFBFB] min-h-screen">
      {/* Header */}
      <div className="bg-[#1B1857] pt-20 pb-28 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1B1857] via-[#25226D] to-[#00A886]/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 title">Nuestro Catálogo</h1>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto font-light">
            Encuentra el celular perfecto para ti y llévatelo a crédito sin cuota inicial. Evaluación rápida y 100% online.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-[1400px] -mt-12 relative z-20">
        {/* Click-away backdrop overlay */}
        {openDropdown && (
          <div 
            className="fixed inset-0 z-20 cursor-default" 
            onClick={() => setOpenDropdown(null)}
          />
        )}

        {/* Search Bar + Filters Card */}
        <div className="bg-white p-4 md:p-6 rounded-3xl shadow-[0_15px_50px_-15px_rgba(27,24,87,0.08)] border border-slate-100/80 space-y-5">
          {/* Search Input */}
          <div className="relative w-full">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 h-6 w-6" />
            <input
              type="text"
              placeholder="Buscar por modelo, marca o característica (ej. iPhone 15, 8GB RAM...)"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-14 h-16 text-lg w-full rounded-full border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-[#00BAA2] focus:ring-4 focus:ring-[#00BAA2]/10 transition-all duration-300 outline-none text-[#1B1857] shadow-sm font-medium"
            />
          </div>

          {/* Filters Row */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-slate-100">
            {/* Brand Pills */}
            <div className="flex flex-wrap items-center gap-2 flex-1 min-w-0">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2.5 rounded-full text-sm font-bold transition-all duration-200 ${
                    selectedCategory === cat
                      ? "bg-[#00BAA2] text-white shadow-md shadow-[#00BAA2]/20 border border-transparent"
                      : "border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700"
                  }`}
                >
                  {cat === "Todas" ? "Todas las marcas" : cat}
                </button>
              ))}
            </div>

            {/* Date Sort Dropdown */}
            <div className="relative shrink-0">
              <button 
                onClick={() => setOpenDropdown(openDropdown === "sort" ? null : "sort")}
                className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-[#1B1857] text-sm font-bold transition-all shadow-sm"
              >
                <ArrowUpDown className="w-4 h-4 text-[#00BAA2]" />
                <span>{sortOrder === "recent" ? "Recientes primero" : "Antiguos primero"}</span>
                <ChevronDown className={`w-3.5 h-3.5 opacity-60 transition-transform duration-200 ${openDropdown === "sort" ? "rotate-180" : ""}`} />
              </button>
              {openDropdown === "sort" && (
                <div className="absolute top-full right-0 mt-2 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 min-w-[180px] z-30 animate-in fade-in slide-in-from-top-2 duration-200">
                  <button
                    onClick={() => {
                      setSortOrder("recent");
                      setOpenDropdown(null);
                    }}
                    className={`w-full px-4 py-2.5 text-left text-sm font-semibold transition-colors hover:bg-slate-50 ${
                      sortOrder === "recent" ? "text-[#00BAA2] bg-[#00BAA2]/5" : "text-[#1B1857]"
                    }`}
                  >
                    Recientes primero
                  </button>
                  <button
                    onClick={() => {
                      setSortOrder("oldest");
                      setOpenDropdown(null);
                    }}
                    className={`w-full px-4 py-2.5 text-left text-sm font-semibold transition-colors hover:bg-slate-50 ${
                      sortOrder === "oldest" ? "text-[#00BAA2] bg-[#00BAA2]/5" : "text-[#1B1857]"
                    }`}
                  >
                    Antiguos primero
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Results Counter / Title */}
        <div className="mt-12 mb-8 flex items-center justify-between bg-white px-6 py-4 rounded-2xl shadow-[0_4px_20px_-4px_rgba(27,24,87,0.03)] border border-slate-100/50">
          <p className="text-slate-500 font-medium">
            Mostrando <span className="text-[#1B1857] text-lg font-bold mx-1">{filteredProducts.length}</span> resultados
          </p>
        </div>

        {/* Products Grid */}
        {isLoadingProducts ? (
          <div className="flex justify-center items-center py-32 bg-white rounded-3xl border border-slate-100/80 shadow-sm mb-20">
            <Loader2 className="w-12 h-12 text-[#00BAA2] animate-spin" />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-20">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-32 bg-white rounded-3xl border border-dashed border-slate-200 mt-6 mb-20">
                <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="w-10 h-10 text-slate-300" />
                </div>
                <h2 className="text-2xl font-bold text-[#1B1857] mb-2">No encontramos celulares</h2>
                <p className="text-slate-500 max-w-md mx-auto">
                  No hay resultados para "{search}" con los filtros seleccionados. Intenta con otros términos o limpia los filtros.
                </p>
                <Button 
                  className="mt-8 bg-[#00BAA2] hover:bg-[#00A886] text-white rounded-xl h-12 px-6"
                  onClick={() => {
                    setSearch("");
                    setSelectedCategory("Todas");
                  }}
                >
                  Ver todos los equipos
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
