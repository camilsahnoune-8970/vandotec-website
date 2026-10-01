const fs = require('fs');
const c = fs.readFileSync('dist/contact/index.html', 'utf8');
console.log('kaarten:', (c.match(/class="subject-card"/g) || []).length);
console.log('data-subjects:', ['offerte', 'interventie', 'onderhoud'].map((v) => c.includes('data-subject="' + v + '"')).join(','));
console.log('donkere zone:', c.includes('contact-dark'));
console.log('kaart-js:', c.includes('subject-card') && c.includes('scrollIntoView'));
const opts = ['offerte', 'interventie', 'onderhoud'].map((v) => c.includes('value="' + v + '"'));
console.log('select-opties matchen kaarten:', opts.join(','));
