const fs = require('fs');
const h = fs.readFileSync('dist/index.html', 'utf8');
console.log('slides:', (h.match(/class="hero-slide/g) || []).length);
console.log('dots:', (h.match(/hero-dot /g) || []).length);
console.log('slider-js:', h.includes('heroSlider'));
console.log('socials:', h.includes('facebook.com/vandotecnv') && h.includes('instagram.com/vandotec_nv') && h.includes('linkedin.com/company/vandotec-nv'));
console.log('toTop:', h.includes('id="toTop"'));
console.log('slide-fotos:', ['hero-pmo.jpg', 'over-ons.jpg', 'gebouw-poperinge.jpg'].map((f) => h.includes(f)).join(','));
