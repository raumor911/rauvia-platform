import React from 'react';
import {safeJson} from '../seo/buildMetaTags';
import { ENTITIES } from '../config/entity';

interface JsonLdProps {
  data?: object;
  type?: 'Organization' | 'WebSite' | 'Person' | 'System' | 'WebPage';
  url?: string;
}

const JsonLd: React.FC<JsonLdProps> = ({ data, type, url }) => {
  let finalData: object | null = null;
  
  if (data) {
    finalData = data;
  } else if (type === 'Organization') {
    finalData = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": ENTITIES.organization["@id"],
      "name": ENTITIES.organization.name,
      "legalName": ENTITIES.organization.legalName,
      "url": ENTITIES.organization.url,
      "logo": ENTITIES.organization.logo,
      "description": ENTITIES.organization.description,
      "sameAs": ENTITIES.organization.sameAs,
      "founder": {
        "@type": "Person",
        "@id": ENTITIES.founder["@id"]
      }
    };
  } else if (type === 'Person') {
    finalData = {
      "@context": "https://schema.org",
      "@type": "Person",
      "@id": ENTITIES.founder["@id"],
      "name": ENTITIES.founder.name,
      "jobTitle": ENTITIES.founder.jobTitle,
      "url": ENTITIES.founder.url,
      "sameAs": ENTITIES.founder.sameAs,
      "worksFor": {
        "@id": ENTITIES.organization["@id"]
      }
    };
  } else if (type === 'WebSite') {
    finalData = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": ENTITIES.website["@id"],
      "name": ENTITIES.website.name,
      "url": ENTITIES.website.url,
      "publisher": {
        "@id": ENTITIES.organization["@id"]
      }
    };
  } else if (type === 'System') {
     finalData = {
      "@context": "https://schema.org",
      "@type": "DefinedTerm",
      "@id": ENTITIES.system["@id"],
      "name": ENTITIES.system.name,
      "description": ENTITIES.system.description
    };
  }

  if (!finalData) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: safeJson(finalData) }}
    />
  );
};

export default JsonLd;
