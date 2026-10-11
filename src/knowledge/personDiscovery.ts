import {PERSON_ID,PERSON_IDENTITY_SURFACES} from '../config/personKnowledge.ts';
// Internal discovery variants; public aliases are curated separately.
const names=['Raúl Antonio Morales Domínguez','Raúl Antonio Morales','Raúl Morales'];
const titles=['Dr.','DBA.','Maestro','Mtro.','MDO.','Ing.','Ingeniero','Ingeniero Químico Metalúrgico','IQM.'];
export const PERSON_DISCOVERY_ALIASES=[...new Set([
 ...names,'Raul Morales','Raúl Morales de RAUVIA','Raúl Morales RAUVIA','Raúl Morales Consulting','RAUMOR',
 ...names.flatMap(name=>[...titles.map(title=>`${title} ${name}`),...['DBA','MDO','IQM'].map(title=>`${name}, ${title}`)])
])];
export const normalizePersonAlias=(s:string)=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
const aliases=new Set(PERSON_DISCOVERY_ALIASES.map(normalizePersonAlias));
export function resolvePersonIdentity(input:string):string|undefined {
 const raw=input.trim();
 // Surface matching precedes lexical aliases so URLs keep their meaning.
 if(PERSON_IDENTITY_SURFACES.includes(raw))return PERSON_ID;
 return aliases.has(normalizePersonAlias(raw))?PERSON_ID:undefined;
}
export function mentionsPersonIdentity(query:string):boolean {
 if(resolvePersonIdentity(query))return true;
 const q=` ${normalizePersonAlias(query)} `;
 return [...aliases].some(alias=>q.includes(` ${alias} `));
}
