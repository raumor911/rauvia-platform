import RouteSEO from '../seo/PageMetadata';
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import FadeInUp from '../components/FadeInUp';

export default function NotFoundPage() {
  return (
    <>
      <RouteSEO path="/404" />
      <section className="min-h-[80vh] flex flex-col items-center justify-center bg-rauvia-bg px-4 py-24 text-center">
        <FadeInUp>
          <div className="max-w-2xl mx-auto">
            <h1 className="text-8xl font-extrabold text-rauvia-navy mb-6">404</h1>
            <h2 className="text-3xl font-bold text-rauvia-navy mb-6 uppercase tracking-wider">
              Sistema No Encontrado
            </h2>
            <p className="text-slate-600 text-lg mb-10 leading-relaxed">
              La capacidad estructural que buscas no está disponible en esta dirección, o ha sido reubicada.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link 
                to="/" 
                className="inline-flex items-center justify-center gap-2 bg-rauvia-navy hover:bg-rauvia-navy-light text-white px-8 py-3 rounded text-sm font-bold tracking-wider transition-colors min-w-[200px]"
              >
                VOLVER AL INICIO
              </Link>
              <Link 
                to="/soluciones" 
                className="inline-flex items-center justify-center gap-2 bg-white border border-slate-200 hover:bg-slate-50 text-rauvia-navy px-8 py-3 rounded text-sm font-bold tracking-wider transition-colors min-w-[200px]"
              >
                VER SOLUCIONES
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </FadeInUp>
      </section>
      
    </>
  );
}
