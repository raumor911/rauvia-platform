// Approved identity data. Academic statements remain first-party/editorial.
// Completion and public use are approved by the holder in V75; CV is a contextual projection.
export const PERSON_ID = 'person:raul-morales';
export const PERSONAL_SITE = 'https://raulmorales.com.mx/';
export const PERSONAL_BIO = 'https://raulmorales.com.mx/raul-morales/';
export const PUBLIC_CV = 'https://raulmorales.com.mx/mi-cv/';
export const ACADEMIC_LIMIT = 'Credencial declarada mediante una fuente biográfica de primera parte; no constituye verificación independiente por parte de la institución educativa.';
export const PUBLIC_PERSON_CREDENTIALS = [
 {key:'raul-doctor-administracion-negocios',name:'Doctor en Administración de Negocios',credentialCategory:'Doctorado',text:'Raúl Antonio Morales Domínguez cuenta con un Doctorado en Administración de Negocios.',sourceId:'source:raul-editorial-declaration',publicApproved:true},
 {key:'raul-maestria-direccion-organizaciones',name:'Maestría en Dirección de Organizaciones',credentialCategory:'Maestría',text:'Raúl Antonio Morales Domínguez cuenta con una Maestría en Dirección de Organizaciones.',sourceId:'source:raul-public-cv',publicApproved:true},
 {key:'raul-ingenieria-quimica-metalurgica',name:'Ingeniería Química Metalúrgica',credentialCategory:'Título profesional / Ingeniería',text:'Raúl Antonio Morales Domínguez cuenta con formación profesional en Ingeniería Química Metalúrgica.',sourceId:'source:raul-public-cv',publicApproved:true}
] as const;
// This exact pre-existing profile is linked by the public biography and CV.
export const PERSON_SAME_AS = [PERSONAL_SITE,'https://www.linkedin.com/in/raumor/'];

export const PERSON_PUBLIC_ALIASES = ['Raúl Morales','Dr. Raúl Morales','Raúl Morales, DBA','Raúl Morales, MDO','Ing. Raúl Morales','Raúl Morales, IQM','RAUMOR'];
export const PERSON_IDENTITY_SURFACES = ['https://rauvia.com.mx/#raul-morales',PERSONAL_SITE,'https://www.linkedin.com/in/raumor/','https://rauvia.com.mx/nosotros/'];
