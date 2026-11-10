import React from 'react';
import {ArrowRight, Check} from 'lucide-react';
import {trayectoriaCatalog} from '../data/trayectoriaCatalog';

const money = (amount:number) => new Intl.NumberFormat('es-MX', {
  style:'currency', currency:'MXN', maximumFractionDigits:0
}).format(amount);

function consultation(message:string) {
  return 'https://wa.me/525586494076?text=' + encodeURIComponent(message);
}

export default function TrayectoriaCatalog() {
  const catalog = trayectoriaCatalog;
  return <section id="planes" aria-labelledby="trayectoria-planes-title" className="bg-white py-16 md:py-24 scroll-mt-24">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <p className="text-xs font-bold uppercase tracking-widest text-rauvia-blue mb-3">Modalidades de acompañamiento</p>
      <h2 id="trayectoria-planes-title" className="text-3xl md:text-4xl font-extrabold tracking-tight text-rauvia-navy mb-4">Planes y suscripciones RAUVIA Trayectoria</h2>
      <p className="text-lg text-slate-700 max-w-3xl mb-6">Desde una presencia digital inicial hasta actualizaciones periódicas. Elige la modalidad que corresponda a la frecuencia con la que cambia tu información.</p>
      <div role="note" className="border-l-4 border-amber-500 bg-amber-50 text-amber-950 p-5 mb-8 text-sm leading-relaxed">
        <strong>Tarifario histórico de referencia.</strong> {catalog.disclaimer}
      </div>
      <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm" tabIndex={0} role="region" aria-label="Tabla comparativa de planes de RAUVIA Trayectoria">
        <table className="w-full min-w-[720px] border-collapse text-left">
          <caption className="sr-only">Planes de presencia digital y suscripciones mensuales, precios históricos en pesos mexicanos</caption>
          <thead className="bg-rauvia-navy text-white">
            <tr>
              <th scope="col" className="px-5 py-4 text-sm">Plan</th>
              <th scope="col" className="px-5 py-4 text-sm">Precio de referencia</th>
              <th scope="col" className="px-5 py-4 text-sm">Qué incluye</th>
              <th scope="col" className="px-5 py-4 text-sm">Consultar</th>
            </tr>
          </thead>
          <tbody>
            {catalog.plans.map((plan,i)=><tr key={plan.id} className={i%2===0?'bg-white':'bg-slate-50'}>
              <th scope="row" className="px-5 py-5 align-top border-t border-slate-200">
                <span className="block text-lg font-bold text-rauvia-navy">{plan.name}</span>
                <span className="block text-sm text-slate-600 mt-2 max-w-xs font-normal">{plan.summary}</span>
              </th>
              <td className="px-5 py-5 align-top border-t border-slate-200 whitespace-nowrap">
                <strong className="text-xl text-rauvia-navy">{money(plan.monthly_price)}</strong>
                <span className="block text-xs text-slate-600 mt-1">{plan.monthly_price===0?'Sin mensualidad':'por mes'}</span>
              </td>
              <td className="px-5 py-5 align-top border-t border-slate-200">
                <ul className="space-y-2 text-sm text-slate-700">
                  {plan.includes.map(feature=><li key={feature} className="flex gap-2 items-start"><Check size={16} className="text-rauvia-blue shrink-0 mt-0.5" aria-hidden="true"/><span>{feature}</span></li>)}
                </ul>
                <p className="text-xs text-slate-600 mt-3">{plan.conditions}</p>
              </td>
              <td className="px-5 py-5 align-top border-t border-slate-200">
                <a className="inline-flex items-center justify-center gap-2 min-h-11 rounded-md border border-rauvia-blue px-4 py-2 text-sm font-bold text-rauvia-navy hover:bg-blue-50 focus-visible:outline-2 focus-visible:outline-offset-2" href={consultation('Hola RAUVIA, quisiera confirmar vigencia y condiciones del plan '+plan.name+'.')}>
                  Consultar <ArrowRight size={16} aria-hidden="true"/>
                </a>
              </td>
            </tr>)}
          </tbody>
        </table>
      </div>
      <p className="mt-4 text-sm text-slate-600">Los cambios incluidos en planes mensuales no se acumulan. La contratación está sujeta a confirmación de disponibilidad, alcance y precio final.</p>

      <div className="mt-16" id="cambios">
        <p className="text-xs font-bold uppercase tracking-widest text-rauvia-blue mb-3">Actualizaciones bajo demanda</p>
        <h2 className="text-2xl md:text-3xl font-bold text-rauvia-navy mb-4">Precios por tipo de cambio</h2>
        <p className="text-slate-700 mb-7 max-w-3xl">También puedes solicitar una modificación individual sin contratar una suscripción. Clasificamos cada solicitud antes de cotizar.</p>
        <div className="overflow-x-auto rounded-xl border border-slate-200" tabIndex={0} role="region" aria-label="Tabla de cambios individuales RAUVIA">
          <table className="w-full min-w-[650px] border-collapse text-left">
            <caption className="sr-only">Cambios Micro, Pequeño, Mediano y Mayor y sus precios históricos de referencia</caption>
            <thead className="bg-slate-100 text-rauvia-navy">
              <tr><th scope="col" className="px-5 py-4">Cambio</th><th scope="col" className="px-5 py-4">Alcance</th><th scope="col" className="px-5 py-4">Precio de referencia</th><th scope="col" className="px-5 py-4">Consultar</th></tr>
            </thead>
            <tbody>{catalog.change_types.map((change,i)=><tr key={change.id} className={i%2===0?'bg-white':'bg-slate-50'}>
              <th scope="row" className="px-5 py-5 align-top border-t border-slate-200 font-bold">{change.name}</th>
              <td className="px-5 py-5 align-top border-t border-slate-200 text-sm text-slate-700">{change.description}</td>
              <td className="px-5 py-5 align-top border-t border-slate-200 font-bold whitespace-nowrap">{change.id==='mayor'?'Desde ':''}{money(change.price_from)}</td>
              <td className="px-5 py-5 align-top border-t border-slate-200">
                <a className="inline-flex min-h-11 items-center font-bold text-sm text-rauvia-blue underline underline-offset-4" href={consultation('Hola RAUVIA, quiero confirmar el precio y alcance de un cambio '+change.name+'.')}>Solicitar cotización</a>
              </td>
            </tr>)}</tbody>
          </table>
        </div>
        <p className="text-sm text-slate-600 mt-4">{catalog.change_tax_note}</p>
      </div>

      <div className="mt-12 rounded-xl bg-slate-50 border border-slate-200 px-6 py-7">
        <h3 className="font-bold text-lg text-rauvia-navy mb-3">Condiciones a considerar</h3>
        <ul className="list-disc pl-5 space-y-2 text-slate-700 text-sm">
          {catalog.policy.map(point=><li key={point}>{point}</li>)}
        </ul>
      </div>
    </div>
  </section>;
}
