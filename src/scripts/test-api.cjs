const fs = require('fs');
const path = require('path');

const [, , email, password] = process.argv;

if (!email || !password) {
  console.error('Email and password required');
  process.exit(1);
}

const API_BASE = 'https://api.flyup.rest/api/v1';

async function main() {
  const log = {};
  try {
    // 1. Login
    console.log('Logging in...');
    const loginRes = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        slug: 'telecom-bl',
        correo: email,
        password: password
      })
    });
    const loginData = await loginRes.json();
    log.login = loginData;
    const token = loginData.result?.token;
    
    // 2. Upload image
    console.log('Uploading test image...');
    const imagePath = path.join(__dirname, '../../public/celulares/CELULARES-62-PAG_page-0001.jpg');
    const fileBuffer = fs.readFileSync(imagePath);
    const formData = new FormData();
    const blob = new Blob([fileBuffer], { type: 'image/jpeg' });
    formData.append('files', blob, 'test.jpg');
    
    const uploadRes = await fetch(`${API_BASE}/imagenes/uploads`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData
    });
    const uploadData = await uploadRes.json();
    log.upload = uploadData;
    
    // 3. Get products to link to
    console.log('Fetching products...');
    const prodsRes = await fetch(`${API_BASE}/productos/empresa/telecom-bl`);
    const prodsData = await prodsRes.json();
    log.products = prodsData.result ? prodsData.result.slice(0, 2) : [];
    
    if (prodsData.result && prodsData.result.length > 0) {
      const prodId = prodsData.result[0].id;
      // Handle array or object for uploadData.result
      let imgId = null;
      if (uploadData.result) {
        if (Array.isArray(uploadData.result)) {
          imgId = uploadData.result[0]?.id;
        } else {
          imgId = uploadData.result.id;
        }
      }
      log.resolvedImgId = imgId;
      log.resolvedProdId = prodId;
      
      if (imgId) {
        console.log(`Linking image ${imgId} to product ${prodId}...`);
        const linkRes = await fetch(`${API_BASE}/imagenes/vinculate`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            entidad_id: prodId,
            entidad_tipo: 'producto',
            imagenes_relacionadas: [
              {
                id: imgId,
                orden: 1
              }
            ]
          })
        });
        const linkData = await linkRes.json();
        log.link = linkData;
      } else {
        console.log('No image ID found to link');
      }
    }
    
    fs.writeFileSync('test-log.json', JSON.stringify(log, null, 2));
    console.log('Test completed. Results written to test-log.json');
  } catch (err) {
    log.error = err.message;
    fs.writeFileSync('test-log.json', JSON.stringify(log, null, 2));
    console.error('Test failed:', err);
  }
}
main();
