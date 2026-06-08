export type Product = {
  id: string;
  name: string;
  brand: string;
  category: string;
  image: string;
  images?: string[];   // All product images (for gallery)
  slug?: string;       // URL-friendly identifier
  features: string[];
  isFeatured: boolean;
  dateAdded: string; // ISO date string for filtering
};

export type Testimonial = {
  id: string | number;
  name: string;
  text: string;
  image: string;
  rating: number;
};

export const products: Product[] = [
  {
    id: "p1",
    name: "iPhone 13",
    brand: "Apple",
    category: "iPhone",
    image: "/celulares/CELULARES-62-PAG_page-0001.jpg",
    features: ["Pantalla 6.1\"", "Cámara Dual 12MP", "Chip A15 Bionic"],
    isFeatured: true,
    dateAdded: "2026-06-01",
  },
  {
    id: "p2",
    name: "iPhone 14",
    brand: "Apple",
    category: "iPhone",
    image: "/celulares/CELULARES-62-PAG_page-0002.jpg",
    features: ["Pantalla 6.1\"", "Cámara Dual 12MP", "Chip A15 Bionic"],
    isFeatured: true,
    dateAdded: "2026-06-01",
  },
  {
    id: "p3",
    name: "iPhone 15",
    brand: "Apple",
    category: "iPhone",
    image: "/celulares/CELULARES-62-PAG_page-0003.jpg",
    features: ["Pantalla 6.1\"", "Cámara 48MP", "Chip A16 Bionic"],
    isFeatured: true,
    dateAdded: "2026-05-28",
  },
  {
    id: "p4",
    name: "iPhone 15 Pro",
    brand: "Apple",
    category: "iPhone",
    image: "/celulares/CELULARES-62-PAG_page-0004.jpg",
    features: ["Pantalla 6.1\"", "Cámara 48MP", "Chip A17 Pro"],
    isFeatured: true,
    dateAdded: "2026-05-25",
  },
  {
    id: "p5",
    name: "iPhone 15 Pro Max",
    brand: "Apple",
    category: "iPhone",
    image: "/celulares/CELULARES-62-PAG_page-0005.jpg",
    features: ["Pantalla 6.7\"", "Cámara 48MP", "Chip A17 Pro"],
    isFeatured: true,
    dateAdded: "2026-05-20",
  },
  {
    id: "p6",
    name: "iPhone 16",
    brand: "Apple",
    category: "iPhone",
    image: "/celulares/CELULARES-62-PAG_page-0006.jpg",
    features: ["Pantalla 6.1\"", "Cámara 48MP", "Chip A18"],
    isFeatured: true,
    dateAdded: "2026-06-02",
  },
  {
    id: "p7",
    name: "iPhone 16 Pro",
    brand: "Apple",
    category: "iPhone",
    image: "/celulares/CELULARES-62-PAG_page-0007.jpg",
    features: ["Pantalla 6.3\"", "Cámara 48MP", "Chip A18 Pro"],
    isFeatured: false,
    dateAdded: "2026-06-02",
  },
  {
    id: "p8",
    name: "iPhone 16 Pro Max",
    brand: "Apple",
    category: "iPhone",
    image: "/celulares/CELULARES-62-PAG_page-0008.jpg",
    features: ["Pantalla 6.9\"", "Cámara 48MP", "Chip A18 Pro"],
    isFeatured: false,
    dateAdded: "2026-06-02",
  },
  {
    id: "p9",
    name: "Samsung Galaxy S24",
    brand: "Samsung",
    category: "Samsung",
    image: "/celulares/CELULARES-62-PAG_page-0009.jpg",
    features: ["Pantalla 6.2\"", "Cámara 50MP", "Galaxy AI"],
    isFeatured: false,
    dateAdded: "2026-05-15",
  },
  {
    id: "p10",
    name: "Samsung Galaxy S24 Ultra",
    brand: "Samsung",
    category: "Samsung",
    image: "/celulares/CELULARES-62-PAG_page-0010.jpg",
    features: ["Pantalla 6.8\"", "Cámara 200MP", "S Pen incluido"],
    isFeatured: true,
    dateAdded: "2026-05-10",
  },
  {
    id: "p11",
    name: "Samsung Galaxy A54",
    brand: "Samsung",
    category: "Samsung",
    image: "/celulares/CELULARES-62-PAG_page-0011.jpg",
    features: ["Pantalla 6.4\"", "Cámara 50MP", "Batería 5000mAh"],
    isFeatured: false,
    dateAdded: "2026-05-08",
  },
  {
    id: "p12",
    name: "Samsung Galaxy A34",
    brand: "Samsung",
    category: "Samsung",
    image: "/celulares/CELULARES-62-PAG_page-0012.jpg",
    features: ["Pantalla 6.6\"", "Cámara 48MP", "Batería 5000mAh"],
    isFeatured: false,
    dateAdded: "2026-05-05",
  },
  {
    id: "p13",
    name: "Xiaomi Redmi Note 13 Pro",
    brand: "Xiaomi",
    category: "Xiaomi",
    image: "/celulares/CELULARES-62-PAG_page-0013.jpg",
    features: ["Pantalla 6.67\"", "Cámara 200MP", "Batería 5100mAh"],
    isFeatured: false,
    dateAdded: "2026-04-28",
  },
  {
    id: "p14",
    name: "Xiaomi 14 Ultra",
    brand: "Xiaomi",
    category: "Xiaomi",
    image: "/celulares/CELULARES-62-PAG_page-0014.jpg",
    features: ["Pantalla 6.73\"", "Cámara Leica 50MP", "Snapdragon 8 Gen 3"],
    isFeatured: false,
    dateAdded: "2026-04-20",
  },
  {
    id: "p15",
    name: "Motorola Edge 40",
    brand: "Motorola",
    category: "Motorola",
    image: "/celulares/CELULARES-62-PAG_page-0015.jpg",
    features: ["Pantalla 6.55\"", "Cámara 50MP", "Carga rápida 68W"],
    isFeatured: false,
    dateAdded: "2026-04-15",
  },
  {
    id: "p16",
    name: "Motorola Moto G84",
    brand: "Motorola",
    category: "Motorola",
    image: "/celulares/CELULARES-62-PAG_page-0016.jpg",
    features: ["Pantalla 6.55\"", "Cámara 50MP", "Batería 5000mAh"],
    isFeatured: false,
    dateAdded: "2026-04-10",
  },
  {
    id: "p17",
    name: "Oppo Reno 11",
    brand: "Oppo",
    category: "Oppo / Infinix",
    image: "/celulares/CELULARES-62-PAG_page-0017.jpg",
    features: ["Pantalla 6.7\"", "Cámara 50MP", "Carga rápida 67W"],
    isFeatured: false,
    dateAdded: "2026-04-05",
  },
  {
    id: "p18",
    name: "Infinix Note 50 Pro",
    brand: "Infinix",
    category: "Oppo / Infinix",
    image: "/celulares/CELULARES-62-PAG_page-0018.jpg",
    features: ["Pantalla 6.78\"", "Cámara 108MP", "8GB RAM"],
    isFeatured: false,
    dateAdded: "2026-03-28",
  },
  {
    id: "p19",
    name: "Honor Magic 6 Pro",
    brand: "Honor",
    category: "Honor",
    image: "/celulares/CELULARES-62-PAG_page-0019.jpg",
    features: ["Pantalla 6.78\"", "Cámara 50MP", "Snapdragon 8 Gen 3"],
    isFeatured: false,
    dateAdded: "2026-03-20",
  },
  {
    id: "p20",
    name: "ZTE Blade A54",
    brand: "ZTE",
    category: "ZTE",
    image: "/celulares/CELULARES-62-PAG_page-0020.jpg",
    features: ["Pantalla 6.6\"", "Cámara 13MP", "4GB RAM"],
    isFeatured: false,
    dateAdded: "2026-03-15",
  },
];

export const categories = ["Todas", "iPhone", "Samsung", "Xiaomi", "Motorola", "Oppo / Infinix", "Honor", "ZTE"];

export const heroSlides = [
  "/portadas-catalogos/PORTADAS-Y-EQUIPO-MAS-VENDIDOS_page-0001.jpg",
  "/portadas-catalogos/PORTADAS-Y-EQUIPO-MAS-VENDIDOS_page-0002.jpg",
  "/portadas-catalogos/PORTADAS-Y-EQUIPO-MAS-VENDIDOS_page-0003.jpg",
  "/portadas-catalogos/PORTADAS-Y-EQUIPO-MAS-VENDIDOS_page-0004.jpg",
  "/portadas-catalogos/PORTADAS-Y-EQUIPO-MAS-VENDIDOS_page-0005.jpg",
];

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Felipe Caballero",
    text: "Excelente servicio, me dieron mi celular el mismo día.",
    rating: 5,
    image: "/clientes/WhatsApp-Image-2026-05-31-at-10.49.54-AM-(1).jpeg"
  },
  {
    id: 2,
    name: "Diana Gonzales",
    text: "Muy buena atención y el crédito fue súper rápido.",
    rating: 5,
    image: "/clientes/WhatsApp-Image-2026-05-31-at-10.49.52-AM.jpeg"
  },
  {
    id: 3,
    name: "Roberto Santillan",
    text: "Equipos 100% recomendados, sin mucho trámite.",
    rating: 4,
    image: "/clientes/WhatsApp-Image-2026-05-31-at-10.49.54-AM.jpeg"
  },

  {
    id: 5,
    name: "María López",
    text: "Pensé que sería difícil sacar a crédito, pero fue muy rápido.",
    rating: 5,
    image: "/clientes/WhatsApp-Image-2026-05-31-at-10.49.55-AM-(1).jpeg"
  },
  {
    id: 6,
    name: "Lucía Torres",
    text: "Súper recomendado, me dieron facilidad de cuotas y un excelente celular.",
    rating: 5,
    image: "/clientes/WhatsApp-Image-2026-05-31-at-10.49.53-AM-(1).jpeg"
  },
  {
    id: 7,
    name: "Miguel Angel",
    text: "Rápido y confiable. El trato por WhatsApp fue muy amable y directo.",
    rating: 5,
    image: "/clientes/WhatsApp-Image-2026-05-31-at-10.49.53-AM-(2).jpeg"
  },
  {
    id: 8,
    name: "Elena Rodríguez",
    text: "Excelente atención. Mi equipo llegó en perfectas condiciones y sellado.",
    rating: 5,
    image: "/clientes/WhatsApp-Image-2026-05-31-at-10.49.54-AM-(2).jpeg"
  },
  {
    id: 9,
    name: "José Luis",
    text: "La mejor opción para sacar celular a crédito. Todo fue transparente.",
    rating: 4,
    image: "/clientes/WhatsApp-Image-2026-05-31-at-10.49.54-AM-(3).jpeg"
  },
  {
    id: 10,
    name: "Patricia Rivas",
    text: "Muy contenta con mi compra, el proceso fue súper sencillo.",
    rating: 5,
    image: "/clientes/WhatsApp-Image-2026-05-31-at-10.49.55-AM.jpeg"
  }
];
