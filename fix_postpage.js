import fs from 'fs';

let code = fs.readFileSync('src/pages/PostPage.tsx', 'utf8');

const targetContent = `<article className="pt-32 pb-24 px-4 bg-rauvia-bg min-h-screen">        <div className="max-w-3xl mx-auto">`;

const replacementContent = `<article className="pt-32 pb-24 px-4 bg-rauvia-bg min-h-screen">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            <div className="lg:col-span-8">`;

code = code.replace(targetContent, replacementContent);

// Move the closing tags
code = code.replace(
  `          </FadeInUp>        </div>      </article>`,
  `          </FadeInUp>
            </div>
            {/* SIDEBAR CONTEXTUAL (RAIL) */}
            <aside className="lg:col-span-4 hidden lg:block">
              <div className="sticky top-32 bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-rauvia-navy-dark rounded-lg mb-4 flex items-center justify-center">
                    <svg className="w-6 h-6 text-rauvia-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path></svg>
                  </div>
                  <h3 className="text-sm font-bold tracking-widest text-slate-400 uppercase mb-4">¿Necesitas acelerar este proceso?</h3>
                  <p className="text-sm text-slate-600 mb-6 leading-relaxed">
                    AETHRYON es nuestro sistema de análisis que identifica restricciones operativas y diseña rutas de ejecución.
                  </p>
                  <Link to="/aethryon" className="block w-full bg-rauvia-navy text-white text-center py-3 rounded-lg text-sm font-bold hover:bg-rauvia-blue transition-colors">
                    Conocer AETHRYON
                  </Link>
              </div>
            </aside>
          </div>
        </div>
      </article>`
);

fs.writeFileSync('src/pages/PostPage.tsx', code);
