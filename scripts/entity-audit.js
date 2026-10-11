import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {ENTITIES} from '../src/config/entity.ts';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
let errors=0;
function check(condition,message){console[condition?'log':'error'](`${condition?'PASS':'FAIL'}: ${message}`);if(!condition)errors++;}
function jsonFile(rel){try{return JSON.parse(fs.readFileSync(path.join(root,rel),'utf8'));}catch{check(false,`${rel}: JSON existente y válido`);return {};}}
const {organization,founder,system}=ENTITIES;
check(Boolean(organization.legalName), 'Razón social definida en la fuente canónica');
check(founder.name==='Raúl Antonio Morales Domínguez', 'Nombre completo del fundador en fuente canónica');
check(founder['@id']==='https://rauvia.com.mx/#raul-morales', 'ID estable del fundador');
check(organization['@id']==='https://rauvia.com.mx/#organization','ID estable de la organización');
check(system.name==='AETHRYON', 'Entidad AETHRYON conservada');
const publicOrg=jsonFile('public/llmo/organization.json');
check(publicOrg.legalName===organization.legalName,'Razón social estructurada coherente con la fuente canónica');
check(publicOrg['@id']===organization['@id']&&publicOrg.founder?.['@id']===founder['@id']&&publicOrg.founder?.name===founder.name,'Referencia pública conecta organización y fundador canónicos');
let llms='';try{llms=fs.readFileSync(path.join(root,'public/llms.txt'),'utf8');}catch{check(false,'llms.txt existente');}
check(llms.includes(organization.name)&&llms.includes(founder.name),'llms.txt identifica marca y fundador canónicos');
check(llms.includes('/llmo/organization.json'),'llms.txt enlaza la ficha corporativa estructurada');
check(!llms.includes('agencia de marketing'),'llms.txt mantiene el posicionamiento vigente');
// Verify relationships in rendered data, not a substring in the React source.
let html='';try{html=fs.readFileSync(path.join(root,'dist/nosotros/index.html'),'utf8');}catch{check(false,'Prerender Nosotros disponible; ejecutar build antes del audit');}
const schemas=[...html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map(m=>JSON.parse(m[1]));
const org=schemas.find(s=>s['@type']==='Organization'),person=schemas.find(s=>s['@type']==='Person');
check(org?.['@id']===organization['@id']&&org?.legalName===organization.legalName&&org?.founder?.['@id']===founder['@id'],'Organization prerenderizada enlaza al fundador');
check(person?.['@id']===founder['@id']&&person?.name===founder.name&&person?.worksFor?.['@id']===organization['@id'],'Person prerenderizada enlaza a RAUVIA');
console.log(`Auditoría de entidades: ${errors} errores.`);
process.exitCode=errors?1:0;
