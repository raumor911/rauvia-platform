import React from 'react';
import {ArrowRight, Check, Info} from 'lucide-react';
import {trayectoriaCatalog} from '../data/trayectoriaCatalog';

const money = (amount:number) => new Intl.NumberFormat('es-MX', {
  style:'currency', currency:'MXN', maximumFractionDigits:0
}).format(amount);

function consultation(message:string) {
  return 'https://wa.me/525586494076?text=' + encodeURIComponent(message);
}

export default function TrayectoriaCatalog() {
  const catalog = trayectoriaCatalog;
  return <section id="planes" aria-labelledby="trayectoria-planes-title" className="rv-s bg-slate-50 border-y border-slate-200 py-20 md:py-28 scroll-mt-24">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <span className="rv-s-eyebrow">Modalidades de acompañamiento</span>
      <h2 id="trayectoria-planes-title" className="rv-s-title rv-s-title-md">Planes y suscripciones RAUVIA Trayectoria</h2>
      <p className="rv-s-lead">Desde una presencia digital inicial hasta actualizaciones periódicas. Elige la modalidad que corresponda a la frecuencia con la que cambia tu información.</p>
      <div role="note" className="pr-caveat pr-caveat-amber">
        <span className="pr-caveat-ico" aria-hidden="true"><Info className="w-5 h-5"/></span>
        <p><strong>Tarifario histórico de referencia.</strong> {catalog.disclaimer}</p>
      </div>

      <ul className="pr-plans grid" aria-label="Planes de RAUVIA Trayectoria">
        {catalog.plans.map(plan=><li key={plan.id} className="pr-plan">
          <h3 className="pr-plan-name">{plan.name}</h3>
          <p className="pr-plan-sum">{plan.summary}</p>
          <div className="pr-plan-price">
            <strong>{money(plan.monthly_price)}</strong>
            <span>{plan.monthly_price===0?'Sin mensualidad':'MXN por mes'}</span>
          </div>
          <ul className="pr-plan-list">
            {plan.includes.map(feature=><li key={feature}><span className="pr-plan-check" aria-hidden="true"><Check size={14}/></span><span>{feature}</span></li>)}
          </ul>
          <p className="pr-plan-cond">{plan.conditions}</p>
          <a className="rv-pkg-btn rv-pkg-btn-outline pr-plan-btn" href={consultation('Hola RAUVIA, quisiera confirmar vigencia y condiciones del plan '+plan.name+'.')}>
            <span>Consultar este plan</span><ArrowRight size={16} className="rv-pkg-arrow" aria-hidden="true"/>
          </a>
        </li>)}
      </ul>
      <p className="pr-fine">Los cambios incluidos en planes mensuales no se acumulan. La contratación está sujeta a confirmación de disponibilidad, alcance y precio final.</p>

      <div className="pr-block" id="cambios">
        <span className="rv-s-eyebrow">Actualizaciones bajo demanda</span>
        <h2 className="rv-s-title rv-s-title-md">Precios por tipo de cambio</h2>
        <p className="rv-s-lead">También puedes solicitar una modificación individual sin contratar una suscripción. Clasificamos cada solicitud antes de cotizar.</p>
        <ul className="pr-changes grid" aria-label="Tipos de cambio individuales">
          {catalog.change_types.map((change,i)=><li key={change.id} className="pr-change">
            <span className="pr-change-lvl" aria-hidden="true">{'●'.repeat(i+1)}</span>
            <h3>{change.name}</h3>
            <p>{change.description}</p>
            <div className="pr-change-price"><span>{change.id==='mayor'?'Desde':'Precio'}</span><strong>{money(change.price_from)}</strong></div>
            <a href={consultation('Hola RAUVIA, quiero confirmar el precio y alcance de un cambio '+change.name+'.')}>Solicitar cotización <ArrowRight size={14} aria-hidden="true"/></a>
          </li>)}
        </ul>
        <p className="pr-fine">{catalog.change_tax_note}</p>
      </div>

      <div className="pr-policy">
        <h3>Condiciones a considerar</h3>
        <ul>
          {catalog.policy.map(point=><li key={point}><span className="pr-plan-check" aria-hidden="true"><Check size={14}/></span><span>{point}</span></li>)}
        </ul>
      </div>
    </div>
  </section>;
}
