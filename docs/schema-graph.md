# Grafo de Datos Estructurados (JSON-LD)

## Nodos Principales y sus `@id` Estables

| Entidad | `@id` Estable | Tipo Schema |
| --- | --- | --- |
| RAUVIA | `https://rauvia.com.mx/#organization` | `Organization` |
| Sitio Web RAUVIA | `https://rauvia.com.mx/#website` | `WebSite` |
| Página Nosotros | `https://rauvia.com.mx/nosotros/#webpage` | `AboutPage` |
| Página Soluciones | `https://rauvia.com.mx/soluciones/#webpage` | `CollectionPage` |
| AETHRYON (Página) | `https://rauvia.com.mx/aethryon/#webpage` | `WebPage` |
| AETHRYON (Sistema) | `https://rauvia.com.mx/aethryon/#entity` | `Thing` |

## Diseño del Grafo

- La `Organization` tiene la propiedad `founder` de tipo `Person` (Raúl Morales).
- Todas las páginas (`WebPage`, `AboutPage`, `CollectionPage`) vinculan su propiedad `publisher` a `https://rauvia.com.mx/#organization`.
- La página `/aethryon` define su `mainEntity` apuntando a la entidad `Thing` que representa al sistema AETHRYON.
- Esto consolida el grafo de conocimientos sin duplicaciones de organizaciones.
