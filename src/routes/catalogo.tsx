import { createFileRoute } from '@tanstack/react-router';
import { useState, useMemo } from 'react';
import { products, categories } from '@/lib/data';
import { ProductCard } from '@/components/ProductCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, SlidersHorizontal, Calendar, ChevronDown, FilterX } from 'lucide-react';

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
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(urlCategory || "Todas");
  const [sortOrder, setSortOrder] = useState<"recent" | "oldest">("recent");
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = useMemo(() => {
    let result = products.filter((p) => {
      const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.brand.toLowerCase().includes(search.toLowerCase());
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
  }, [search, selectedCategory, sortOrder]);

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
        {/* Search Bar + Date Filter */}
        <div className="bg-white p-4 md:p-6 rounded-3xl shadow-[0_10px_40px_-10px_rgba(27,24,87,0.1)] border border-slate-100 flex flex-col lg:flex-row gap-4 items-center">
          {/* Search */}
          <div className="relative flex-1 w-full">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 h-6 w-6" />
            <Input
              type="text"
              placeholder="Buscar por modelo o marca (ej. iPhone 15, Samsung...)"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-14 h-16 text-lg w-full rounded-2xl border-2 border-slate-100 bg-slate-50 focus-visible:bg-white focus-visible:ring-0 focus-visible:border-[#00BAA2] transition-colors shadow-inner"
            />
          </div>

          {/* Date Sort */}
          <div className="relative w-full lg:w-auto shrink-0">
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as "recent" | "oldest")}
              className="appearance-none h-16 pl-14 pr-12 rounded-2xl border-2 border-slate-100 bg-slate-50 hover:bg-slate-100 focus:bg-white text-[#1B1857] text-base font-bold cursor-pointer w-full focus:border-[#00BAA2] focus:outline-none transition-colors shadow-sm"
            >
              <option value="recent">Lo más nuevo</option>
              <option value="oldest">Lo más antiguo</option>
            </select>
            <Calendar className="absolute left-5 top-1/2 -translate-y-1/2 text-[#00BAA2] h-6 w-6 pointer-events-none" />
            <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5 pointer-events-none" />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 mt-12 mb-20">
          {/* Sidebar / Category Filters */}
          <aside className="lg:w-72 shrink-0">
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 sticky top-28">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-[#1B1857] flex items-center gap-2">
                  <SlidersHorizontal className="w-5 h-5 text-[#00BAA2]" /> Filtros
                </h3>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden p-2 text-slate-400 hover:text-[#00BAA2] transition-colors rounded-xl bg-slate-50"
                >
                  <ChevronDown className={`w-5 h-5 transition-transform ${showFilters ? "rotate-180" : ""}`} />
                </button>
              </div>

              <div className={`flex-col gap-2 ${showFilters ? "flex" : "hidden lg:flex"}`}>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl text-left transition-all font-medium ${
                      selectedCategory === cat
                        ? "bg-[#00BAA2] text-white shadow-md shadow-[#00BAA2]/20"
                        : "text-slate-600 hover:bg-[#00BAA2]/10 hover:text-[#00A886]"
                    }`}
                  >
                    <span>{cat}</span>
                    {selectedCategory === cat && cat !== "Todas" && (
                      <span className="text-white flex items-center justify-center">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="mb-8 flex items-center justify-between bg-white px-6 py-4 rounded-2xl shadow-[0_4px_20px_-4px_rgba(27,24,87,0.03)] border border-slate-50">
              <p className="text-slate-500 font-medium">
                Mostrando <span className="text-[#1B1857] text-lg font-bold mx-1">{filteredProducts.length}</span> resultados
              </p>
              {selectedCategory !== "Todas" && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setSelectedCategory("Todas")}
                  className="text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <FilterX className="w-4 h-4 mr-2" /> Limpiar filtros
                </Button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-32 bg-white rounded-3xl border border-dashed border-slate-200 mt-6">
                <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="w-10 h-10 text-slate-300" />
                </div>
                <h2 className="text-2xl font-bold text-[#1B1857] mb-2">No encontramos celulares</h2>
                <p className="text-slate-500 max-w-md mx-auto">
                  No hay resultados para "{search}" en la categoría {selectedCategory}. Intenta con otro término o limpia los filtros.
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
          </div>
        </div>
      </div>
    </div>
  )
}
