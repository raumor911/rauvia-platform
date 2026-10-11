import {readFileSync} from 'node:fs';
import {base,type CredentialNode,type ClaimNode,type SourceNode,type AuthorshipEvidence} from './types.ts';
import {PERSON_ID,PERSONAL_SITE,PERSONAL_BIO,PUBLIC_CV,PUBLIC_PERSON_CREDENTIALS,ACADEMIC_LIMIT} from '../config/personKnowledge.ts';
export const PERSON_CREDENTIALS = PUBLIC_PERSON_CREDENTIALS;
export interface AuthorshipSnapshot {
 snapshotDate:string;postsEndpoint:string;
 authors:{id:number;name:string;slug:string;profileUrl:string}[];
 posts:{id:number;slug:string;authorId:number;metadataUrl:string}[];
}
export const authorshipSnapshot:AuthorshipSnapshot=JSON.parse(readFileSync(new URL('../../data/knowledge/wp-authorship-snapshot.json',import.meta.url),'utf8'));
const normalized=(s:string)=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim();
export function editorialAuthorship(id:number,slug:string,snapshot:AuthorshipSnapshot=authorshipSnapshot):AuthorshipEvidence[] {
 const post=snapshot.posts.find(p=>p.id===id&&p.slug===slug);
 if(!post||post.metadataUrl!==`https://blog.rauvia.com.mx/wp-json/wp/v2/posts/${id}`)return [];
 const author=snapshot.authors.find(a=>a.id===post.authorId);
 // Explicit editorial identity resolution, not an assumption from publisher,
 // account number, ownership of WordPress, or topic of an article.
 if(!author||normalized(author.name)!=='raul morales'||author.slug!=='raulmorales'||author.profileUrl!=='https://blog.rauvia.com.mx/author/raulmorales/')return [];
 return [{personId:PERSON_ID,authorId:author.id,authorName:author.name,metadataUrl:post.metadataUrl,profileUrl:author.profileUrl,snapshotDate:snapshot.snapshotDate,sourceRefs:[`source:wp-${id}`,'source:wp-author-raul']}];
}
export const personSources:SourceNode[]=[
 {...base('Source','source:raul-personal-site','Raúl Morales: sitio personal',[],'Biografía pública que identifica al fundador de RAUVIA; declaración de primera parte.'),url:PERSONAL_SITE,citationUrls:[PERSONAL_BIO],kind:'first_party_publication',verification:'published_self_report',publisher:PERSON_ID,snapshotDate:'2026-10-07'},
 {...base('Source','source:raul-public-cv','Raúl Morales: CV público',[],'CV público contextual: respalda trayectoria y nombres de formación incluidos; una omisión no determina el estado del perfil biográfico completo.'),url:PUBLIC_CV,kind:'first_party_publication',verification:'published_self_report',publisher:PERSON_ID,snapshotDate:'2026-10-07'},
 {...base('Source','source:wp-author-raul','WordPress: autor Raul Morales',[],'Identidad editorial pública; no equivale a corroboración externa del contenido.'),url:'https://blog.rauvia.com.mx/author/raulmorales/',citationUrls:['https://blog.rauvia.com.mx/wp-json/wp/v2/users/1'],kind:'wordpress_metadata',verification:'editorial_snapshot',publisher:'org:rauvia',snapshotDate:authorshipSnapshot.snapshotDate},
 {...base('Source','source:raul-editorial-declaration','Biografía aprobada por el titular',[],'El titular aprueba la publicación de los tres grados concluidos en V75. Declaración biográfica de primera parte, sin atribuir el doctorado al CV ni a una corroboración institucional.'),publication:{approved:true,basis:'editorial_model'},kind:'approved_declaration',declarationScope:'biography',verification:'editorial_snapshot',publisher:PERSON_ID,snapshotDate:'2026-10-07'}
];
export const credentials:CredentialNode[]=PERSON_CREDENTIALS.map(c=>({
 ...base('Credential','credential:'+c.key,c.name,[],ACADEMIC_LIMIT,!c.publicApproved),status:'completed',credentialKind:'academicCredential',publication:{approved:true,basis:'editorial_model'},sources:[...new Set([c.sourceId,'source:raul-editorial-declaration'])],
 name:c.name,credentialCategory:c.credentialCategory,claimRefs:['claim:'+c.key],attributionLimit:ACADEMIC_LIMIT
}));
export const academicClaims:ClaimNode[]=PERSON_CREDENTIALS.map(c=>({
 ...base('Claim','claim:'+c.key,c.name,[],c.text,!c.publicApproved),status:'supported',publication:{approved:c.publicApproved,basis:'editorial_model'},sources:[...new Set([c.sourceId,'source:raul-editorial-declaration'])],
 text:c.text,claimType:'factual',supportedBy:[...new Set([c.sourceId,'source:raul-editorial-declaration'])],scope:'Formación académica declarada; no acredita expertise ni resultados.',
 period:'Declaración biográfica; fecha de titulación no incorporada.',attributionLimit:ACADEMIC_LIMIT,
 causalStatus:'not_applicable',guaranteesResults:false
}));
