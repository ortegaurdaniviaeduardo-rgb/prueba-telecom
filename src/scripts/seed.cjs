const fs = require('fs');
const path = require('path');

// CLI Arguments
const [, , email, password] = process.argv;

if (!email || !password) {
  console.error('\x1b[31mError: Faltan credenciales.\x1b[0m');
  console.log('\nUso del script:');
  console.log('  node src/scripts/seed.cjs \x1b[36m<tu_correo> <tu_contraseña>\x1b[0m\n');
  process.exit(1);
}

const API_BASE = 'https://api.flyup.rest/api/v1';
const SLUG_EMPRESA = 'telecom-bl';

// Use process.cwd() which should be the project root when running "node src/scripts/seed.cjs"
// This is more reliable on Windows than __dirname-based paths
const PROJECT_ROOT = process.cwd();

// Mock products data inlined from src/lib/data.ts
const productsToSeed = [
  {
    name: "iPhone 13",
    brand: "Apple",
    category: "iPhone",
    image: "celulares/CELULARES-62-PAG_page-0001.jpg",
    features: ["Pantalla 6.1\"", "Cámara Dual 12MP", "Chip A15 Bionic"],
    isFeatured: true
  },
  {
    name: "iPhone 14",
    brand: "Apple",
    category: "iPhone",
    image: "celulares/CELULARES-62-PAG_page-0002.jpg",
    features: ["Pantalla 6.1\"", "Cámara Dual 12MP", "Chip A15 Bionic"],
    isFeatured: true
  },
  {
    name: "iPhone 15",
    brand: "Apple",
    category: "iPhone",
    image: "celulares/CELULARES-62-PAG_page-0003.jpg",
    features: ["Pantalla 6.1\"", "Cámara 48MP", "Chip A16 Bionic"],
    isFeatured: true
  },
  {
    name: "iPhone 15 Pro",
    brand: "Apple",
    category: "iPhone",
    image: "celulares/CELULARES-62-PAG_page-0004.jpg",
    features: ["Pantalla 6.1\"", "Cámara 48MP", "Chip A17 Pro"],
    isFeatured: true
  },
  {
    name: "iPhone 15 Pro Max",
    brand: "Apple",
    category: "iPhone",
    image: "celulares/CELULARES-62-PAG_page-0005.jpg",
    features: ["Pantalla 6.7\"", "Cámara 48MP", "Chip A17 Pro"],
    isFeatured: true
  },
  {
    name: "iPhone 16",
    brand: "Apple",
    category: "iPhone",
    image: "celulares/CELULARES-62-PAG_page-0006.jpg",
    features: ["Pantalla 6.1\"", "Cámara 48MP", "Chip A18"],
    isFeatured: true
  },
  {
    name: "iPhone 16 Pro",
    brand: "Apple",
    category: "iPhone",
    image: "celulares/CELULARES-62-PAG_page-0007.jpg",
    features: ["Pantalla 6.3\"", "Cámara 48MP", "Chip A18 Pro"],
    isFeatured: false
  },
  {
    name: "iPhone 16 Pro Max",
    brand: "Apple",
    category: "iPhone",
    image: "celulares/CELULARES-62-PAG_page-0008.jpg",
    features: ["Pantalla 6.9\"", "Cámara 48MP", "Chip A18 Pro"],
    isFeatured: false
  },
  {
    name: "Samsung Galaxy S24",
    brand: "Samsung",
    category: "Samsung",
    image: "celulares/CELULARES-62-PAG_page-0009.jpg",
    features: ["Pantalla 6.2\"", "Cámara 50MP", "Galaxy AI"],
    isFeatured: false
  },
  {
    name: "Samsung Galaxy S24 Ultra",
    brand: "Samsung",
    category: "Samsung",
    image: "celulares/CELULARES-62-PAG_page-0010.jpg",
    features: ["Pantalla 6.8\"", "Cámara 200MP", "S Pen incluido"],
    isFeatured: true
  },
  {
    name: "Samsung Galaxy A54",
    brand: "Samsung",
    category: "Samsung",
    image: "celulares/CELULARES-62-PAG_page-0011.jpg",
    features: ["Pantalla 6.4\"", "Cámara 50MP", "Batería 5000mAh"],
    isFeatured: false
  },
  {
    name: "Samsung Galaxy A34",
    brand: "Samsung",
    category: "Samsung",
    image: "celulares/CELULARES-62-PAG_page-0012.jpg",
    features: ["Pantalla 6.6\"", "Cámara 48MP", "Batería 5000mAh"],
    isFeatured: false
  },
  {
    name: "Xiaomi Redmi Note 13 Pro",
    brand: "Xiaomi",
    category: "Xiaomi",
    image: "celulares/CELULARES-62-PAG_page-0013.jpg",
    features: ["Pantalla 6.67\"", "Cámara 200MP", "Batería 5100mAh"],
    isFeatured: false
  },
  {
    name: "Xiaomi 14 Ultra",
    brand: "Xiaomi",
    category: "Xiaomi",
    image: "celulares/CELULARES-62-PAG_page-0014.jpg",
    features: ["Pantalla 6.73\"", "Cámara Leica 50MP", "Snapdragon 8 Gen 3"],
    isFeatured: false
  },
  {
    name: "Motorola Edge 40",
    brand: "Motorola",
    category: "Motorola",
    image: "celulares/CELULARES-62-PAG_page-0015.jpg",
    features: ["Pantalla 6.55\"", "Cámara 50MP", "Carga rápida 68W"],
    isFeatured: false
  },
  {
    name: "Motorola Moto G84",
    brand: "Motorola",
    category: "Motorola",
    image: "celulares/CELULARES-62-PAG_page-0016.jpg",
    features: ["Pantalla 6.55\"", "Cámara 50MP", "Batería 5000mAh"],
    isFeatured: false
  },
  {
    name: "Oppo Reno 11",
    brand: "Oppo",
    category: "Oppo / Infinix",
    image: "celulares/CELULARES-62-PAG_page-0017.jpg",
    features: ["Pantalla 6.7\"", "Cámara 50MP", "Carga rápida 67W"],
    isFeatured: false
  },
  {
    name: "Infinix Note 50 Pro",
    brand: "Infinix",
    category: "Oppo / Infinix",
    image: "celulares/CELULARES-62-PAG_page-0018.jpg",
    features: ["Pantalla 6.78\"", "Cámara 108MP", "8GB RAM"],
    isFeatured: false
  },
  {
    name: "Honor Magic 6 Pro",
    brand: "Honor",
    category: "Honor",
    image: "celulares/CELULARES-62-PAG_page-0019.jpg",
    features: ["Pantalla 6.78\"", "Cámara 50MP", "Snapdragon 8 Gen 3"],
    isFeatured: false
  },
  {
    name: "ZTE Blade A54",
    brand: "ZTE",
    category: "ZTE",
    image: "celulares/CELULARES-62-PAG_page-0020.jpg",
    features: ["Pantalla 6.6\"", "Cámara 13MP", "4GB RAM"],
    isFeatured: false
  }
];

// Helper to normalize and check string matching
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

// Generate slug for strings
function slugify(text) {
  return text.toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

async function main() {
  try {
    console.log('\x1b[36m=== INICIANDO SUBIDA AUTOMÁTICA DE DATOS A FLYUP ===\x1b[0m\n');
    console.log(`📂 Directorio del proyecto: ${PROJECT_ROOT}`);

    // Verify images folder exists
    const celularesDir = path.join(PROJECT_ROOT, 'public', 'celulares');
    if (!fs.existsSync(celularesDir)) {
      throw new Error(`No se encontró la carpeta de imágenes: ${celularesDir}`);
    }
    console.log(`✔ Carpeta de imágenes encontrada: ${celularesDir}\n`);

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
    console.log('📁 Obteniendo categorías existentes...');
    const catsRes = await fetch(`${API_BASE}/categorias/empresa/${SLUG_EMPRESA}`);
    if (!catsRes.ok) throw new Error('No se pudieron obtener las categorías.');
    const catsData = await catsRes.json();
    let existingCategories = catsData.result || [];
    console.log(`✔ Se encontraron ${existingCategories.length} categorías en el panel.`);

    // 3. Fetch existing products to avoid duplicates
    console.log('📱 Obteniendo productos existentes...');
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
        console.log(`✔ Categoría mapeada: "${prod.category}" -> "${match.nombre}" (ID: ${match.id})`);
      } else {
        console.log(`➕ Creando nueva categoría: "${prod.category}"...`);
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

        if (!newCatRes.ok) {
          const errText = await newCatRes.text();
          console.error(`\x1b[31m✘ Error al crear categoría "${prod.category}": ${errText}\x1b[0m`);
          continue;
        }

        const newCatData = await newCatRes.json();
        const newCatId = newCatData.result?.id;
        categoryMap[prod.category] = newCatId;
        console.log(`\x1b[32m✔ Categoría creada: "${prod.category}" (ID: ${newCatId})\x1b[0m`);
        
        existingCategories.push({
          id: newCatId,
          nombre: prod.category,
          slug: slugify(prod.category)
        });
      }
    }
    console.log('');

    // 5. Seed products
    for (const prod of productsToSeed) {
      // Match by lowercase name
      const apiProd = existingProducts.find(
        p => p.nombre.toLowerCase().trim() === prod.name.toLowerCase().trim()
      );
      
      let productId = apiProd?.id;
      const hasImage = apiProd && apiProd.imagenes_relacionadas && apiProd.imagenes_relacionadas.length > 0;

      if (hasImage) {
        console.log(`⏭ Saltando "${prod.name}" (ya tiene imagen vinculada)`);
        continue;
      }

      console.log(`📦 Procesando "${prod.name}"...`);

      // Resolve category ID
      const categoryId = categoryMap[prod.category];
      if (!categoryId) {
        console.error(`\x1b[31m✘ Error: No se encontró categoría para "${prod.name}". Saltando.\x1b[0m`);
        continue;
      }

      // If product does not exist, create it first
      if (!apiProd) {
        try {
          console.log(`  ➕ Creando producto en catálogo...`);
          const prodPayload = {
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
          };

          const prodRes = await fetch(`${API_BASE}/productos`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(prodPayload)
          });

          if (!prodRes.ok) {
            const errText = await prodRes.text();
            throw new Error(`Error al crear producto: ${errText}`);
          }

          const prodData = await prodRes.json();
          productId = prodData.result?.id;
          console.log(`  ✔ Producto creado con ID: ${productId}`);
        } catch (prodError) {
          console.error(`  \x1b[31m✘ Error al crear producto "${prod.name}": ${prodError.message}\x1b[0m`);
          continue;
        }
      } else {
        console.log(`  ℹ El producto ya existe (ID: ${productId}), procediendo a subir y vincular su imagen.`);
      }

      // Upload and link image
      if (productId) {
        let uploadedImageId = null;
        // Build path from project root
        const localImagePath = path.join(PROJECT_ROOT, 'public', prod.image);
        console.log(`  📁 Buscando imagen en: ${localImagePath}`);

        if (fs.existsSync(localImagePath)) {
          try {
            console.log(`  🖼 Subiendo imagen: ${prod.image}...`);
            const fileBuffer = fs.readFileSync(localImagePath);
            const fileName = path.basename(localImagePath);
            
            const formData = new FormData();
            const blob = new Blob([fileBuffer], { type: 'image/jpeg' });
            formData.append('files', blob, fileName);
            
            const uploadRes = await fetch(`${API_BASE}/imagenes/uploads`, {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${token}`
              },
              body: formData
            });

            if (!uploadRes.ok) {
              const errText = await uploadRes.text();
              throw new Error(`Error en subida de imagen: ${errText}`);
            }

            const uploadData = await uploadRes.json();
            console.log(`  📤 Respuesta de upload:`, JSON.stringify(uploadData).substring(0, 200));
            uploadedImageId = Array.isArray(uploadData.result) ? uploadData.result[0]?.id : uploadData.result?.id;
            console.log(`  ✔ Imagen subida con ID: ${uploadedImageId}`);
          } catch (imgError) {
            console.error(`  \x1b[31m✘ Error al subir imagen para "${prod.name}": ${imgError.message}\x1b[0m`);
          }
        } else {
          console.error(`  \x1b[31m✘ Archivo NO encontrado: ${localImagePath}\x1b[0m`);
        }

        // Link image to product
        if (uploadedImageId) {
          try {
            console.log(`  🔗 Vinculando imagen ${uploadedImageId} al producto ${productId}...`);
            const linkPayload = {
              entidad_id: productId,
              entidad_tipo: 'producto',
              imagenes_relacionadas: [
                {
                  id: uploadedImageId,
                  orden: 1
                }
              ]
            };
            console.log(`  📤 Payload vinculate:`, JSON.stringify(linkPayload));
            
            const linkRes = await fetch(`${API_BASE}/imagenes/vinculate`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              },
              body: JSON.stringify(linkPayload)
            });

            const linkText = await linkRes.text();
            if (!linkRes.ok) {
              console.error(`  \x1b[31m✘ Error al vincular imagen (${linkRes.status}): ${linkText}\x1b[0m`);
            } else {
              console.log(`  \x1b[32m✔ Imagen vinculada correctamente! Respuesta: ${linkText.substring(0, 150)}\x1b[0m`);
            }
          } catch (linkErr) {
            console.error(`  \x1b[31m✘ Excepción al vincular imagen: ${linkErr.message}\x1b[0m`);
          }
        }
      }
      console.log(`\x1b[32m✔ Procesado: "${prod.name}"\x1b[0m\n`);
    }

    console.log('\n\x1b[32;1m=== PROCESO DE SUBIDA COMPLETADO ===\x1b[0m');
  } catch (error) {
    console.error('\n\x1b[31;1m✘ ERROR GENERAL:\x1b[0m', error.message);
    process.exit(1);
  }
}

main();
