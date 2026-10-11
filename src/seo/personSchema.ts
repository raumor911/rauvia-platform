import {ENTITIES} from '../config/entity.ts';
import {PUBLIC_PERSON_CREDENTIALS,PERSON_PUBLIC_ALIASES,PUBLIC_CV} from '../config/personKnowledge.ts';
// Pure structured-data generator: no page, component, rendering or DOM access.
export function personSchema(){
 return {'@context':'https://schema.org','@type':'Person',...ENTITIES.founder,
  alternateName:[...PERSON_PUBLIC_ALIASES],
  worksFor:{'@id':ENTITIES.organization['@id']},
  hasCredential:PUBLIC_PERSON_CREDENTIALS.filter(c=>c.publicApproved).map(c=>({
   '@id':ENTITIES.founder['@id']+'-credential-'+c.key.replace(/^raul-/,''),
   '@type':'EducationalOccupationalCredential',name:c.name,credentialCategory:c.credentialCategory,
   ...(c.sourceId==='source:raul-public-cv'?{citation:PUBLIC_CV}:{})
  }))};
}
