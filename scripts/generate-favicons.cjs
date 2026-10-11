// Development-only utility. Uses the supplied sharp installation; no runtime dependency.
// SHARP_MODULE=/absolute/path/to/sharp node scripts/generate-favicons.cjs
const fs = require('node:fs');
const sharp = require(process.env.SHARP_MODULE || 'sharp');
(async () => {
  for (const [name,size] of [['favicon-48x48.png',48],['favicon-96x96.png',96],['apple-touch-icon.png',180]]) {
    await sharp('public/favicon.svg').resize(size,size).png().toFile('public/'+name);
  }
  const sizes=[16,32,48];
  const images=await Promise.all(sizes.map(size=>sharp('public/favicon.svg').resize(size,size).png().toBuffer()));
  const header=Buffer.alloc(6+16*sizes.length);header.writeUInt16LE(1,2);header.writeUInt16LE(sizes.length,4);
  let offset=header.length;
  sizes.forEach((size,i)=>{const n=6+i*16;header[n]=size;header[n+1]=size;header.writeUInt16LE(1,n+4);header.writeUInt16LE(32,n+6);header.writeUInt32LE(images[i].length,n+8);header.writeUInt32LE(offset,n+12);offset+=images[i].length;});
  fs.writeFileSync('public/favicon.ico',Buffer.concat([header,...images]));
})();
