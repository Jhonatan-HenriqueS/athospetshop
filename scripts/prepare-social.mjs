import sharp from 'sharp';
import fs from 'node:fs/promises';

// Compose the existing images and editable typography; do not regenerate the brand.
const svg = Buffer.from(`<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg"><rect width="1200" height="630" fill="#f7efe3"/><ellipse cx="953" cy="452" rx="310" ry="265" fill="#cfa77c"/><ellipse cx="1150" cy="470" rx="215" ry="240" fill="#a96f43"/><text x="76" y="190" font-family="sans-serif" font-size="18" font-weight="700" letter-spacing="2" fill="#84502e">ATHOS · JI-PARANÁ</text><g font-family="sans-serif" font-size="63" font-weight="700" fill="#29221d"><text x="72" y="290">Cuidado de perto</text><text x="72" y="369">para quem é</text><text x="72" y="448" fill="#84502e">família.</text></g><text x="76" y="516" font-family="sans-serif" font-size="19" fill="#6d6259">Centro Veterinário e Pet Shop</text></svg>`);
const pet = await sharp('public/images/pets-hero.webp').resize(590).png().toBuffer();
const logoMask = Buffer.from('<svg width="72" height="72" xmlns="http://www.w3.org/2000/svg"><circle cx="36" cy="36" r="36" fill="white"/></svg>');
const logo = await sharp('public/images/logo-athos.png').resize(72).ensureAlpha().composite([{ input: logoMask, blend: 'dest-in' }]).png().toBuffer();
await sharp(svg).composite([{ input: pet, left: 600, top: 40 }, { input: logo, left: 74, top: 50 }]).png().toFile('public/images/athos-social.png');
const icon = await sharp('app/icon.png').ensureAlpha().png().toBuffer();
const ico = Buffer.alloc(22);
ico.writeUInt16LE(1, 2); ico.writeUInt16LE(1, 4); ico[6] = 128; ico[7] = 128;
ico.writeUInt16LE(1, 10); ico.writeUInt16LE(32, 12); ico.writeUInt32LE(icon.length, 14); ico.writeUInt32LE(22, 18);
await fs.writeFile('app/favicon.ico', Buffer.concat([ico, icon]));
console.log('Social image and original-brand favicon prepared.');
