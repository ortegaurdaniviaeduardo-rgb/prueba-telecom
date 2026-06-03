import { createFileRoute } from '@tanstack/react-router';
import { useState, useMemo } from 'react';
import { products, categories } from '@/lib/data';
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
  ArrowUpDown 
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
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(urlCategory || "Todas");
  const [selectedFeatured, setSelectedFeatured] = useState<"all" | "featured">("all");
  const [selectedCamera, setSelectedCamera] = useState<"all" | "basic" | "50mp" | "high">("all");
  const [selectedScreen, setSelectedScreen] = useState<"all" | "small" | "medium" | "large">("all");
  const [sortOrder, setSortOrder] = useState<"recent" | "oldest">("recent");
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const filteredProducts = useMemo(() => {
    let result = products.filter((p) => {
      const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.brand.toLowerCase().includes(search.toLowerCase()) ||
        p.features.some(f => f.toLowerCase().includes(search.toLowerCase()));
      const matchesCategory = selectedCategory === "Todas" || p.category === selectedCategory;
      const matchesFeatured = selectedFeatured === "all" || p.isFeatured;

      // Camera match
      const cameraFeature = p.features.find(f => f.toLowerCase().includes("cámara"));
      let cameraType = "basic";
      if (cameraFeature) {
        if (cameraFeature.includes("50MP")) cameraType = "50mp";
        else if (cameraFeature.includes("108MP") || cameraFeature.includes("200MP")) cameraType = "high";
      }
      const matchesCamera = selectedCamera === "all" || cameraType === selectedCamera;

      // Screen match
      const screenFeature = p.features.find(f => f.toLowerCase().includes("pantalla"));
      let screenSizeGroup = "medium";
      if (screenFeature) {
        const match = screenFeature.match(/(\d+\.?\d*)/);
        if (match) {
          const size = parseFloat(match[1]);
          if (size <= 6.2) screenSizeGroup = "small";
          else if (size >= 6.7) screenSizeGroup = "large";
          else screenSizeGroup = "medium";
        }
      }
      const matchesScreen = selectedScreen === "all" || screenSizeGroup === selectedScreen;

      return matchesSearch && matchesCategory && matchesFeatured && matchesCamera && matchesScreen;
    });

    // Sort by date
    result.sort((a, b) => {
      const dateA = new Date(a.dateAdded).getTime();
      const dateB = new Date(b.dateAdded).getTime();
      return sortOrder === "recent" ? dateB - dateA : dateA - dateB;
    });

    return result;
  }, [search, selectedCategory, selectedFeatured, selectedCamera, selectedScreen, sortOrder]);

  const hasActiveFilters = selectedCategory !== "Todas" || selectedFeatured !== "all" || selectedCamera !== "all" || selectedScreen !== "all" || search !== "";

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
            <div className="flex flex-wrap items-center gap-2.5">
              {/* Dropdown 1: Marca */}
              <div className="relative">
                <button 
                  onClick={() => setOpenDropdown(openDropdown === "brand" ? null : "brand")}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-full border text-sm font-bold transition-all duration-200 ${
                    openDropdown === "brand" || selectedCategory !== "Todas"
                      ? "border-[#00BAA2] bg-[#00BAA2]/5 text-[#00BAA2]"
                      : "border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700"
                  }`}
                >
                  <Smartphone className="w-4 h-4 opacity-80" />
                  <span>{selectedCategory === "Todas" ? "Todas las marcas" : selectedCategory}</span>
                  <ChevronDown className={`w-3.5 h-3.5 opacity-60 transition-transform duration-200 ${openDropdown === "brand" ? "rotate-180" : ""}`} />
                </button>
                {openDropdown === "brand" && (
                  <div className="absolute top-full left-0 mt-2 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 min-w-[200px] z-30 animate-in fade-in slide-in-from-top-2 duration-200">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => {
                          setSelectedCategory(cat);
                          setOpenDropdown(null);
                        }}
                        className={`w-full px-4 py-2.5 text-left text-sm font-semibold transition-colors hover:bg-slate-50 ${
                          selectedCategory === cat ? "text-[#00BAA2] bg-[#00BAA2]/5" : "text-[#1B1857]"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Dropdown 2: Equipos (Featured) */}
              <div className="relative">
                <button 
                  onClick={() => setOpenDropdown(openDropdown === "featured" ? null : "featured")}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-full border text-sm font-bold transition-all duration-200 ${
                    openDropdown === "featured" || selectedFeatured !== "all"
                      ? "border-[#00BAA2] bg-[#00BAA2]/5 text-[#00BAA2]"
                      : "border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700"
                  }`}
                >
                  <Star className="w-4 h-4 opacity-80" />
                  <span>{selectedFeatured === "all" ? "Todos los equipos" : "Equipos destacados"}</span>
                  <ChevronDown className={`w-3.5 h-3.5 opacity-60 transition-transform duration-200 ${openDropdown === "featured" ? "rotate-180" : ""}`} />
                </button>
                {openDropdown === "featured" && (
                  <div className="absolute top-full left-0 mt-2 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 min-w-[200px] z-30 animate-in fade-in slide-in-from-top-2 duration-200">
                    <button
                      onClick={() => {
                        setSelectedFeatured("all");
                        setOpenDropdown(null);
                      }}
                      className={`w-full px-4 py-2.5 text-left text-sm font-semibold transition-colors hover:bg-slate-50 ${
                        selectedFeatured === "all" ? "text-[#00BAA2] bg-[#00BAA2]/5" : "text-[#1B1857]"
                      }`}
                    >
                      Todos los equipos
                    </button>
                    <button
                      onClick={() => {
                        setSelectedFeatured("featured");
                        setOpenDropdown(null);
                      }}
                      className={`w-full px-4 py-2.5 text-left text-sm font-semibold transition-colors hover:bg-slate-50 ${
                        selectedFeatured === "featured" ? "text-[#00BAA2] bg-[#00BAA2]/5" : "text-[#1B1857]"
                      }`}
                    >
                      Equipos destacados
                    </button>
                  </div>
                )}
              </div>

              {/* Dropdown 3: Cámara */}
              <div className="relative">
                <button 
                  onClick={() => setOpenDropdown(openDropdown === "camera" ? null : "camera")}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-full border text-sm font-bold transition-all duration-200 ${
                    openDropdown === "camera" || selectedCamera !== "all"
                      ? "border-[#00BAA2] bg-[#00BAA2]/5 text-[#00BAA2]"
                      : "border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700"
                  }`}
                >
                  <Camera className="w-4 h-4 opacity-80" />
                  <span>
                    {selectedCamera === "all" 
                      ? "Cualquier cámara" 
                      : selectedCamera === "basic" 
                      ? "Cámara 12-48MP" 
                      : selectedCamera === "50mp" 
                      ? "Cámara 50MP" 
                      : "Cámara 108-200MP"}
                  </span>
                  <ChevronDown className={`w-3.5 h-3.5 opacity-60 transition-transform duration-200 ${openDropdown === "camera" ? "rotate-180" : ""}`} />
                </button>
                {openDropdown === "camera" && (
                  <div className="absolute top-full left-0 mt-2 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 min-w-[220px] z-30 animate-in fade-in slide-in-from-top-2 duration-200">
                    <button
                      onClick={() => {
                        setSelectedCamera("all");
                        setOpenDropdown(null);
                      }}
                      className={`w-full px-4 py-2.5 text-left text-sm font-semibold transition-colors hover:bg-slate-50 ${
                        selectedCamera === "all" ? "text-[#00BAA2] bg-[#00BAA2]/5" : "text-[#1B1857]"
                      }`}
                    >
                      Cualquier cámara
                    </button>
                    <button
                      onClick={() => {
                        setSelectedCamera("basic");
                        setOpenDropdown(null);
                      }}
                      className={`w-full px-4 py-2.5 text-left text-sm font-semibold transition-colors hover:bg-slate-50 ${
                        selectedCamera === "basic" ? "text-[#00BAA2] bg-[#00BAA2]/5" : "text-[#1B1857]"
                      }`}
                    >
                      Básica (12MP - 48MP)
                    </button>
                    <button
                      onClick={() => {
                        setSelectedCamera("50mp");
                        setOpenDropdown(null);
                      }}
                      className={`w-full px-4 py-2.5 text-left text-sm font-semibold transition-colors hover:bg-slate-50 ${
                        selectedCamera === "50mp" ? "text-[#00BAA2] bg-[#00BAA2]/5" : "text-[#1B1857]"
                      }`}
                    >
                      Media (50MP)
                    </button>
                    <button
                      onClick={() => {
                        setSelectedCamera("high");
                        setOpenDropdown(null);
                      }}
                      className={`w-full px-4 py-2.5 text-left text-sm font-semibold transition-colors hover:bg-slate-50 ${
                        selectedCamera === "high" ? "text-[#00BAA2] bg-[#00BAA2]/5" : "text-[#1B1857]"
                      }`}
                    >
                      Pro (108MP - 200MP)
                    </button>
                  </div>
                )}
              </div>

              {/* Dropdown 4: Pantalla */}
              <div className="relative">
                <button 
                  onClick={() => setOpenDropdown(openDropdown === "screen" ? null : "screen")}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-full border text-sm font-bold transition-all duration-200 ${
                    openDropdown === "screen" || selectedScreen !== "all"
                      ? "border-[#00BAA2] bg-[#00BAA2]/5 text-[#00BAA2]"
                      : "border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700"
                  }`}
                >
                  <Maximize className="w-4 h-4 opacity-80" />
                  <span>
                    {selectedScreen === "all" 
                      ? "Cualquier pantalla" 
                      : selectedScreen === "small" 
                      ? "Pantalla ≤ 6.2\"" 
                      : selectedScreen === "medium" 
                      ? "Pantalla 6.3\" - 6.6\"" 
                      : "Pantalla ≥ 6.7\""}
                  </span>
                  <ChevronDown className={`w-3.5 h-3.5 opacity-60 transition-transform duration-200 ${openDropdown === "screen" ? "rotate-180" : ""}`} />
                </button>
                {openDropdown === "screen" && (
                  <div className="absolute top-full left-0 mt-2 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 min-w-[240px] z-30 animate-in fade-in slide-in-from-top-2 duration-200">
                    <button
                      onClick={() => {
                        setSelectedScreen("all");
                        setOpenDropdown(null);
                      }}
                      className={`w-full px-4 py-2.5 text-left text-sm font-semibold transition-colors hover:bg-slate-50 ${
                        selectedScreen === "all" ? "text-[#00BAA2] bg-[#00BAA2]/5" : "text-[#1B1857]"
                      }`}
                    >
                      Cualquier pantalla
                    </button>
                    <button
                      onClick={() => {
                        setSelectedScreen("small");
                        setOpenDropdown(null);
                      }}
                      className={`w-full px-4 py-2.5 text-left text-sm font-semibold transition-colors hover:bg-slate-50 ${
                        selectedScreen === "small" ? "text-[#00BAA2] bg-[#00BAA2]/5" : "text-[#1B1857]"
                      }`}
                    >
                      Pequeña (hasta 6.2")
                    </button>
                    <button
                      onClick={() => {
                        setSelectedScreen("medium");
                        setOpenDropdown(null);
                      }}
                      className={`w-full px-4 py-2.5 text-left text-sm font-semibold transition-colors hover:bg-slate-50 ${
                        selectedScreen === "medium" ? "text-[#00BAA2] bg-[#00BAA2]/5" : "text-[#1B1857]"
                      }`}
                    >
                      Mediana (6.3" - 6.6")
                    </button>
                    <button
                      onClick={() => {
                        setSelectedScreen("large");
                        setOpenDropdown(null);
                      }}
                      className={`w-full px-4 py-2.5 text-left text-sm font-semibold transition-colors hover:bg-slate-50 ${
                        selectedScreen === "large" ? "text-[#00BAA2] bg-[#00BAA2]/5" : "text-[#1B1857]"
                      }`}
                    >
                      Grande (6.7" o más)
                    </button>
                  </div>
                )}
              </div>

              {/* Reset active filters */}
              {hasActiveFilters && (
                <button
                  onClick={() => {
                    setSelectedCategory("Todas");
                    setSelectedFeatured("all");
                    setSelectedCamera("all");
                    setSelectedScreen("all");
                    setSearch("");
                  }}
                  className="text-xs font-bold text-red-500 hover:text-red-600 transition-colors flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-50 hover:bg-red-100 ml-1"
                >
                  <FilterX className="w-3.5 h-3.5" />
                  Limpiar
                </button>
              )}
            </div>

            {/* Dropdown 5: Sort */}
            <div className="relative">
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
                setSelectedFeatured("all");
                setSelectedCamera("all");
                setSelectedScreen("all");
              }}
            >
              Ver todos los equipos
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
