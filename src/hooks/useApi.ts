import { useQuery } from '@tanstack/react-query';
import { Product, products as mockProducts, Testimonial, testimonials as mockTestimonials } from '@/lib/data';

const API_BASE = 'https://api.flyup.rest/api/v1';

// URL de Google Sheet publicada en la Web en formato CSV
// El cliente final puede reemplazar este enlace con su propia hoja publicada
export const GOOGLE_SHEETS_TESTIMONIALS_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vT5K76D0R3k-9S5XvEsz1T3ZgZkZ-T0XvEsz1T3ZgZkZ-T0XvEsz1T3ZgZ/pub?output=csv';

// Función robusta para parsear archivos CSV respetando comillas y saltos de línea
function parseCSV(text: string): string[][] {
  const lines: string[][] = [];
  let row: string[] = [];
  let inQuotes = false;
  let currentVal = '';

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const nextChar = text[i + 1];

    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        currentVal += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      row.push(currentVal.trim());
      currentVal = '';
    } else if ((char === '\r' || char === '\n') && !inQuotes) {
      if (char === '\r' && nextChar === '\n') {
        i++;
      }
      row.push(currentVal.trim());
      if (row.length > 0) {
        lines.push(row);
      }
      row = [];
      currentVal = '';
    } else {
      currentVal += char;
    }
  }
  if (currentVal || row.length > 0) {
    row.push(currentVal.trim());
    lines.push(row);
  }
  return lines;
}


// API Response Types
export interface ApiCompany {
  id: string;
  nombre_legal: string;
  nombre_marca: string;
  descripcion: string;
  numero_documento: string;
  slug: string;
  correo: string;
  celular: string;
  whatsapp: string;
  direccion: string;
  estado: boolean;
  link_facebook: string | null;
  link_tiktok: string | null;
  imagen_relacionada: {
    url: string;
  } | null;
}

export interface ApiAnnouncement {
  id: string;
  titulo: string;
  estado: boolean;
  imagen_relacionada: {
    url: string;
  } | null;
}

export interface ApiCategory {
  id: string;
  nombre: string;
  slug: string;
}

export interface ApiProductImage {
  id: string;
  url: string;
}

export interface ApiProduct {
  id: string;
  nombre: string;
  descripcion: string;
  slug: string;
  destacado: boolean;
  precio: number;
  categoria: ApiCategory;
  imagenes_relacionadas: ApiProductImage[];
  atributos: { nombre: string; valor: string }[];
  created_at: string;
}

// React Query Hooks
export function useCompanyQuery() {
  return useQuery<ApiCompany>({
    queryKey: ['api-company'],
    queryFn: async () => {
      const res = await fetch(`${API_BASE}/empresas/slug/telecom-bl`);
      if (!res.ok) throw new Error('Failed to fetch company details');
      const data = await res.json();
      return data.result;
    },
    staleTime: 1000 * 60 * 10, // Cache for 10 minutes
  });
}

export function useAnnouncementsQuery() {
  return useQuery<string[]>({
    queryKey: ['api-announcements'],
    queryFn: async () => {
      const res = await fetch(`${API_BASE}/anuncios/empresa/telecom-bl`);
      if (!res.ok) throw new Error('Failed to fetch announcements');
      const data = await res.json();
      const list: ApiAnnouncement[] = data.result || [];
      const urls = list
        .filter(a => a.estado && a.imagen_relacionada?.url)
        .map(a => a.imagen_relacionada!.url);
      
      // Fallback in case S3 bucket doesn't return urls or list is empty
      if (urls.length === 0) {
        return [
          "/portadas-catalogos/PORTADAS-Y-EQUIPO-MAS-VENDIDOS_page-0001.jpg",
          "/portadas-catalogos/PORTADAS-Y-EQUIPO-MAS-VENDIDOS_page-0002.jpg",
          "/portadas-catalogos/PORTADAS-Y-EQUIPO-MAS-VENDIDOS_page-0003.jpg",
          "/portadas-catalogos/PORTADAS-Y-EQUIPO-MAS-VENDIDOS_page-0004.jpg",
          "/portadas-catalogos/PORTADAS-Y-EQUIPO-MAS-VENDIDOS_page-0005.jpg",
        ];
      }
      return urls;
    },
    staleTime: 1000 * 60 * 10,
  });
}

export function useProductsQuery() {
  return useQuery<Product[]>({
    queryKey: ['api-products'],
    queryFn: async () => {
      const res = await fetch(`${API_BASE}/productos/empresa/telecom-bl`);
      if (!res.ok) throw new Error('Failed to fetch products');
      const data = await res.json();
      const rawProducts: ApiProduct[] = data.result || [];
      
      const apiMappedProducts = rawProducts
        .filter(p => p.nombre) // Safety filter
        .map(p => {
          const brandName = p.categoria?.nombre || 'General';
          const imageUrl = p.imagenes_relacionadas?.[0]?.url || '/placeholder.jpg';
          const descriptionText = p.descripcion || 'Evaluación al instante por WhatsApp';
          
          // Parse basic features from description or populate standard mocks
          const features = descriptionText
            ? [descriptionText]
            : ["Evaluación rápida", "Garantía de originalidad"];

          return {
            id: p.id,
            name: p.nombre,
            brand: brandName,
            category: brandName,
            image: imageUrl,
            images: p.imagenes_relacionadas?.map(img => img.url) || [imageUrl],
            features: features,
            isFeatured: !!p.destacado,
            slug: p.slug || p.nombre.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
            dateAdded: p.created_at || new Date().toISOString()
          };
        });

      const apiProductsNormalizedNames = new Set(
        apiMappedProducts.map(p => p.name.trim().toLowerCase())
      );
      
      const filteredMockProducts = mockProducts.filter(
        mp => !apiProductsNormalizedNames.has(mp.name.trim().toLowerCase())
      );

      return [...apiMappedProducts, ...filteredMockProducts];
    },
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });
}

export function useCategoriesQuery() {
  return useQuery<string[]>({
    queryKey: ['api-categories'],
    queryFn: async () => {
      const res = await fetch(`${API_BASE}/categorias/empresa/telecom-bl`);
      if (!res.ok) throw new Error('Failed to fetch categories');
      const data = await res.json();
      const apiCategories: ApiCategory[] = data.result || [];
      const apiCategoryNames = apiCategories.map(c => c.nombre);
      
      // Merge with mock categories to ensure offline mock products still work
      const mockCategories = ["iPhone", "Samsung", "Xiaomi", "Motorola", "Oppo / Infinix", "Honor", "ZTE"];
      
      // Filter mock categories that have equivalent names in API to avoid duplicates
      const normalizedApiNames = new Set(apiCategoryNames.map(name => name.toLowerCase().trim()));
      
      const uniqueMockCats = mockCategories.filter(mockCat => {
        const lowerMock = mockCat.toLowerCase().trim();
        if (lowerMock === 'iphone' && (normalizedApiNames.has('iphones') || normalizedApiNames.has('iphone'))) return false;
        if (lowerMock === 'samsung' && (normalizedApiNames.has('samsungs') || normalizedApiNames.has('samsung'))) return false;
        return !normalizedApiNames.has(lowerMock);
      });
      
      const allCats = [...apiCategoryNames, ...uniqueMockCats];
      return ['Todas', ...allCats];
    },
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });
}

export function useProductBySlugQuery(slug: string) {
  return useQuery<ApiProduct | null>({
    queryKey: ['api-product-slug', slug],
    queryFn: async () => {
      const res = await fetch(`${API_BASE}/productos/slug/${slug}`);
      if (!res.ok) return null;
      const data = await res.json();
      return data.result || null;
    },
    staleTime: 1000 * 60 * 5,
    enabled: !!slug,
  });
}

export interface GoogleSheetTestimonial extends Testimonial {
  active: boolean;
}

export function useTestimonialsQuery() {
  return useQuery<Testimonial[]>({
    queryKey: ['api-testimonials'],
    queryFn: async () => {
      try {
        const res = await fetch(GOOGLE_SHEETS_TESTIMONIALS_URL);
        if (!res.ok) throw new Error('Failed to load testimonials from sheet');
        const csvText = await res.text();
        const rows = parseCSV(csvText);
        
        // Debe haber al menos una fila de datos además del encabezado
        if (rows.length <= 1) {
          return mockTestimonials;
        }

        // Saltamos la fila 0 (encabezado)
        const mappedList: GoogleSheetTestimonial[] = rows.slice(1).map((row, index) => {
          const name = row[1] || 'Cliente Satisfecho';
          const text = row[2] || '';
          const image = row[3] || '/placeholder.jpg';
          const rating = parseInt(row[4], 10) || 5;
          const activeVal = (row[5] || 'true').toLowerCase().trim();
          
          // Consideramos inactivo solo si es explícitamente no, false, inactivo o 0
          const active = !['no', 'false', '0', 'inactivo'].includes(activeVal);

          return {
            id: row[0] || `sheet-${index}`,
            name,
            text,
            image,
            rating: Math.min(5, Math.max(1, rating)),
            active
          };
        });

        // Filtrar solo los activos
        const activeTestimonials = mappedList.filter(t => t.active);
        
        return activeTestimonials.length > 0 ? activeTestimonials : mockTestimonials;
      } catch (error) {
        console.error('Error fetching testimonials from Google Sheets, using fallback mock data:', error);
        return mockTestimonials;
      }
    },
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });
}

