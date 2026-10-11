import fs from 'fs';
import glob from 'glob';

const pages = glob.sync('src/pages/**/*.tsx');

pages.forEach(page => {
  let code = fs.readFileSync(page, 'utf8');
  
  // Remove Footer imports
  code = code.replace(/import Footer from '[^']+';\n?/g, '');
  code = code.replace(/import Footer from "[^"]+";\n?/g, '');
  
  // Remove Footer components
  code = code.replace(/<Footer[^>]*\/>/g, '');
  
  // Clean up any empty fragments at the end if we just removed Footer
  code = code.replace(/<>\s*<\/>/g, '');
  
  // Check for Navbar imports and usages to remove from Casos pages
  if (page.includes('CasosIndexPage') || page.includes('CasoInfraestructuraB2BPage')) {
    code = code.replace(/import Navbar from '[^']+';\n?/g, '');
    code = code.replace(/import Navbar from "[^"]+";\n?/g, '');
    code = code.replace(/<Navbar[^>]*\/>/g, '');
  }

  fs.writeFileSync(page, code);
});
