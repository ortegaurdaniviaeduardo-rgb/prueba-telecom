const fs = require('fs');
const path = require('path');

// CLI Arguments
const [, , email, password] = process.argv;

if (!email || !password) {
  console.error('\x1b[31mError: Faltan credenciales.\x1b[0m');
  console.log('\nUso del script:');
  console.log('  node src/scripts/seed-nuevo.cjs \x1b[36m<tu_correo> <tu_contraseña>\x1b[0m\n');
  process.exit(1);
}

const API_BASE = 'https://api.flyup.rest/api/v1';
const SLUG_EMPRESA = 'telecom-bl';
const PROJECT_ROOT = process.cwd();

// Mock products data inlined from src/lib/data.ts, mapped to celulares-nuevo
const productsToSeed = [
  {
    name: "iPhone 13",
    brand: "Apple",
    category: "iPhone",
    image: "celulares-nuevo/CELULARES-62-PAG_page-0001.jpg",
    features: ["Pantalla 6.1\"", "Cámara Dual 12MP", "Chip A15 Bionic"],
    isFeatured: true
  },
  {
    name: "iPhone 14",
    brand: "Apple",
    category: "iPhone",
    image: "celulares-nuevo/CELULARES-62-PAG_page-0002.jpg",
    features: ["Pantalla 6.1\"", "Cámara Dual 12MP", "Chip A15 Bionic"],
    isFeatured: true
  },
  {
    name: "iPhone 15",
    brand: "Apple",
    category: "iPhone",
    image: "celulares-nuevo/CELULARES-62-PAG_page-0003.jpg",
    features: ["Pantalla 6.1\"", "Cámara 48MP", "Chip A16 Bionic"],
    isFeatured: true
  },
  {
    name: "iPhone 15 Pro",
    brand: "Apple",
    category: "iPhone",
    image: "celulares-nuevo/CELULARES-62-PAG_page-0004.jpg",
    features: ["Pantalla 6.1\"", "Cámara 48MP", "Chip A17 Pro"],
    isFeatured: true
  },
  {
    name: "iPhone 15 Pro Max",
    brand: "Apple",
    category: "iPhone",
    image: "celulares-nuevo/CELULARES-62-PAG_page-0005.jpg",
    features: ["Pantalla 6.7\"", "Cámara 48MP", "Chip A17 Pro"],
    isFeatured: true
  },
  {
    name: "iPhone 16",
    brand: "Apple",
    category: "iPhone",
    image: "celulares-nuevo/CELULARES-62-PAG_page-0006.jpg",
    features: ["Pantalla 6.1\"", "Cámara 48MP", "Chip A18"],
    isFeatured: true
  },
  {
    name: "iPhone 16 Pro",
    brand: "Apple",
    category: "iPhone",
    image: "celulares-nuevo/CELULARES-62-PAG_page-0007.jpg",
    features: ["Pantalla 6.3\"", "Cámara 48MP", "Chip A18 Pro"],
    isFeatured: false
  },
  {
    name: "iPhone 16 Pro Max",
    brand: "Apple",
    category: "iPhone",
    image: "celulares-nuevo/CELULARES-62-PAG_page-0008.jpg",
    features: ["Pantalla 6.9\"", "Cámara 48MP", "Chip A18 Pro"],
    isFeatured: false
  },
  {
    name: "Samsung Galaxy S24",
    brand: "Samsung",
    category: "Samsung",
    image: "celulares-nuevo/CELULARES-62-PAG_page-0009.jpg",
    features: ["Pantalla 6.2\"", "Cámara 50MP", "Galaxy AI"],
    isFeatured: false
  },
  {
    name: "Samsung Galaxy S24 Ultra",
    brand: "Samsung",
    category: "Samsung",
    image: "celulares-nuevo/CELULARES-62-PAG_page-0010.jpg",
    features: ["Pantalla 6.8\"", "Cámara 200MP", "S Pen incluido"],
    isFeatured: true
  },
  {
    name: "Samsung Galaxy A54",
    brand: "Samsung",
    category: "Samsung",
    image: "celulares-nuevo/CELULARES-62-PAG_page-0011.jpg",
    features: ["Pantalla 6.4\"", "Cámara 50MP", "Batería 5000mAh"],
    isFeatured: false
  },
  {
    name: "Samsung Galaxy A34",
    brand: "Samsung",
    category: "Samsung",
    image: "celulares-nuevo/CELULARES-62-PAG_page-0012.jpg",
    features: ["Pantalla 6.6\"", "Cámara 48MP", "Batería 5000mAh"],
    isFeatured: false
  },
  {
    name: "Xiaomi Redmi Note 13 Pro",
    brand: "Xiaomi",
    category: "Xiaomi",
    image: "celulares-nuevo/CELULARES-62-PAG_page-0013.jpg",
    features: ["Pantalla 6.67\"", "Cámara 200MP", "Batería 5100mAh"],
    isFeatured: false
  },
  {
    name: "Xiaomi 14 Ultra",
    brand: "Xiaomi",
    category: "Xiaomi",
    image: "celulares-nuevo/CELULARES-62-PAG_page-0014.jpg",
    features: ["Pantalla 6.73\"", "Cámara Leica 50MP", "Snapdragon 8 Gen 3"],
    isFeatured: false
  },
  {
    name: "Motorola Edge 40",
    brand: "Motorola",
    category: "Motorola",
    image: "celulares-nuevo/CELULARES-62-PAG_page-0015.jpg",
    features: ["Pantalla 6.55\"", "Cámara 50MP", "Carga rápida 68W"],
    isFeatured: false
  },
  {
    name: "Motorola Moto G84",
    brand: "Motorola",
    category: "Motorola",
    image: "celulares-nuevo/CELULARES-62-PAG_page-0016.jpg",
    features: ["Pantalla 6.55\"", "Cámara 50MP", "Batería 5000mAh"],
    isFeatured: false
  },
  {
    name: "Oppo Reno 11",
    brand: "Oppo",
    category: "Oppo / Infinix",
    image: "celulares-nuevo/CELULARES-62-PAG_page-0017.jpg",
    features: ["Pantalla 6.7\"", "Cámara 50MP", "Carga rápida 67W"],
    isFeatured: false
  },
  {
    name: "Infinix Note 50 Pro",
    brand: "Infinix",
    category: "Oppo / Infinix",
    image: "celulares-nuevo/CELULARES-62-PAG_page-0018.jpg",
    features: ["Pantalla 6.78\"", "Cámara 108MP", "8GB RAM"],
    isFeatured: false
  },
  {
    name: "Honor Magic 6 Pro",
    brand: "Honor",
    category: "Honor",
    image: "celulares-nuevo/CELULARES-62-PAG_page-0019.jpg",
    features: ["Pantalla 6.78\"", "Cámara 50MP", "Snapdragon 8 Gen 3"],
    isFeatured: false
  },
  {
    name: "ZTE Blade A54",
    brand: "ZTE",
    category: "ZTE",
    image: "celulares-nuevo/CELULARES-62-PAG_page-0020.jpg",
    features: ["Pantalla 6.6\"", "Cámara 13MP", "4GB RAM"],
    isFeatured: false
  }
];

function getCategoryMatch(existingCats, targetName) {
  const norm = targetName.toLowerCase().trim();
  return existingCats.find(c => {
    const cName = c.nombre.toLowerCase().trim();
    return cName === norm || 
           cName === norm + 's' || 
           cName + 's' === norm || 
           cName.includes(norm) || 
           norm.includes(cName);
  });
}

function slugify(text) {
  return text.toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

async function main() {
  try {
    console.log('\x1b[36m=== INICIANDO SUBIDA DE IMÁGENES CUADRADAS (500x500) A FLYUP ===\x1b[0m\n');
    console.log(`📂 Directorio del proyecto: ${PROJECT_ROOT}`);

    const celularesDir = path.join(PROJECT_ROOT, 'public', 'celulares-nuevo');
    if (!fs.existsSync(celularesDir)) {
      throw new Error(`No se encontró la carpeta de imágenes cuadradas: ${celularesDir}`);
    }
    console.log(`✔ Carpeta de imágenes cuadradas encontrada: ${celularesDir}\n`);

    // 1. Login
    console.log('🔐 Iniciando sesión...');
    const loginRes = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        slug: SLUG_EMPRESA,
        correo: email,
        password: password
      })
    });

    if (!loginRes.ok) {
      const errText = await loginRes.text();
      throw new Error(`Error de autenticación: ${errText}`);
    }

    const loginData = await loginRes.json();
    const token = loginData.result?.token;
    if (!token) throw new Error('No se recibió token de acceso en el login.');
    console.log('\x1b[32m✔ Sesión iniciada con éxito!\x1b[0m\n');

    // 2. Fetch existing categories
    console.log('📁 Obteniendo categorías...');
    const catsRes = await fetch(`${API_BASE}/categorias/empresa/${SLUG_EMPRESA}`);
    if (!catsRes.ok) throw new Error('No se pudieron obtener las categorías.');
    const catsData = await catsRes.json();
    let existingCategories = catsData.result || [];

    // 3. Fetch existing products
    console.log('Obteniendo productos del panel...');
    const prodsRes = await fetch(`${API_BASE}/productos/empresa/${SLUG_EMPRESA}`);
    if (!prodsRes.ok) throw new Error('No se pudieron obtener los productos actuales.');
    const prodsData = await prodsRes.json();
    const existingProducts = prodsData.result || [];
    console.log(`✔ Se encontraron ${existingProducts.length} productos en el panel.\n`);

    // 4. Ensure all categories exist
    const categoryMap = {};
    for (const prod of productsToSeed) {
      if (categoryMap[prod.category]) continue;
      const match = getCategoryMatch(existingCategories, prod.category);
      if (match) {
        categoryMap[prod.category] = match.id;
      } else {
        console.log(`➕ Creando categoría: "${prod.category}"...`);
        const newCatRes = await fetch(`${API_BASE}/categorias`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            nombre: prod.category,
            slug: slugify(prod.category),
            descripcion: null,
            estado: true
          })
        });

        if (newCatRes.ok) {
          const newCatData = await newCatRes.json();
          const newCatId = newCatData.result?.id;
          categoryMap[prod.category] = newCatId;
          existingCategories.push({ id: newCatId, nombre: prod.category, slug: slugify(prod.category) });
        }
      }
    }

    // 5. Seed products & upload new square images
    for (const prod of productsToSeed) {
      const apiProd = existingProducts.find(
        p => p.nombre.toLowerCase().trim() === prod.name.toLowerCase().trim()
      );
      
      let productId = apiProd?.id;
      console.log(`📦 Procesando "${prod.name}"...`);

      // If product does not exist, create it
      if (!apiProd) {
        try {
          console.log(`  ➕ Creando producto: ${prod.name}...`);
          const categoryId = categoryMap[prod.category];
          const prodRes = await fetch(`${API_BASE}/productos`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
              nombre: prod.name,
              descripcion: prod.features.join(', '),
              sku: null,
              slug: slugify(prod.name),
              destacado: prod.isFeatured,
              precio: 0,
              precio_costo: null,
              precio_falso: null,
              estado: true,
              estado_tienda: true,
              categoria_id: categoryId,
              marca_id: null,
              tipo_producto: 'basico'
            })
          });

          if (prodRes.ok) {
            const prodData = await prodRes.json();
            productId = prodData.result?.id;
          }
        } catch (err) {
          console.error(`  ✘ Error creando producto: ${err.message}`);
          continue;
        }
      }

      if (productId) {
        const localImagePath = path.join(PROJECT_ROOT, 'public', prod.image);
        if (fs.existsSync(localImagePath)) {
          try {
            console.log(`  🖼 Subiendo imagen cuadrada: ${prod.image}...`);
            const fileBuffer = fs.readFileSync(localImagePath);
            const fileName = path.basename(localImagePath);
            
            const formData = new FormData();
            const blob = new Blob([fileBuffer], { type: 'image/jpeg' });
            formData.append('files', blob, fileName);
            
            const uploadRes = await fetch(`${API_BASE}/imagenes/uploads`, {
              method: 'POST',
              headers: { 'Authorization': `Bearer ${token}` },
              body: formData
            });

            if (uploadRes.ok) {
              const uploadData = await uploadRes.json();
              const uploadedImageId = Array.isArray(uploadData.result) ? uploadData.result[0]?.id : uploadData.result?.id;
              
              if (uploadedImageId) {
                console.log(`  🔗 Vinculando imagen cuadrada ID ${uploadedImageId} a producto ID ${productId}...`);
                const linkRes = await fetch(`${API_BASE}/imagenes/vinculate`, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                  },
                  body: JSON.stringify({
                    entidad_id: productId,
                    entidad_tipo: 'producto',
                    imagenes_relacionadas: [
                      {
                        id: uploadedImageId,
                        orden: 1
                      }
                    ]
                  })
                });

                if (linkRes.ok) {
                  console.log(`  \x1b[32m✔ Imagen cuadrada vinculada con éxito!\x1b[0m`);
                } else {
                  console.error(`  ✘ Error al vincular imagen.`);
                }
              }
            }
          } catch (err) {
            console.error(`  ✘ Error subiendo imagen: ${err.message}`);
          }
        } else {
          console.error(`  ✘ Archivo no encontrado: ${localImagePath}`);
        }
      }
      console.log('');
    }

    console.log('\n\x1b[32;1m=== PROCESO COMPLETADO EXITOSAMENTE ===\x1b[0m');
  } catch (error) {
    console.error('\n\x1b[31;1m✘ ERROR GENERAL:\x1b[0m', error.message);
    process.exit(1);
  }
}

main();
