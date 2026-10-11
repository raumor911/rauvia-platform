# Ontología del Knowledge Graph V74

Ontología propia de RAUVIA, no Schema.org/JSON-LD. Un nodo representa un concepto, no una ocurrencia observada. Identificadores conceptuales estables e independientes de las URLs. `canonical` pertenece sólo al Asset o Content que representa esa página; `Source.url` es una cita y puede apuntar a esa misma URL.

Tipos y campos específicos: `src/knowledge/types.ts`. Cada nodo contiene significado, razón editorial, status, evidenceState, visibilidad, aprobación, fuentes y referencias de assets.

## Relaciones cerradas y tipadas

| Relation | From | To |
| --- | --- | --- |
| belongsToVertical | Intent; Case; UseCase | Vertical |
| targetsICP | Intent | ICP |
| expressesProblem | Intent; UseCase; PracticeArea | Problem |
| affectedByRestriction | Problem | Restriction |
| createsCapabilityGap | Restriction | CapabilityGap |
| requiresCapability | Problem; CapabilityGap; UseCase | Capability |
| analyzedBy | Problem; Signal | System |
| evaluatedBy | Restriction; Opportunity; CapabilityGap | System |
| possibleIntervention | Capability; Problem | System; Method; Offering |
| mayLeadTo | System; Priority | ActionRoute; Method |
| offeredBy | Offering | Organization |
| usedBy | Method | Organization |
| representedBy | Organization; Person; Credential; PracticeArea; CareerEvidence; WebSite; Vertical; ICP; Intent; Problem; Restriction; CapabilityGap; Capability; System; Method; Offering; UseCase; Case; Signal; Opportunity; Priority; ActionRoute; Concept; TopicTerritory | Asset |
| coversIntent | Asset; Content | Intent |
| explainsProblem | Asset; Content | Problem |
| supportsCapability | Asset; Content; System; Method; Offering; PracticeArea | Capability |
| demonstratedBy | Capability | Case; UseCase |
| containsClaim | Organization; Person; Credential; System; Method; Case; Content | Claim |
| supportedBy | Organization; Person; Credential; PracticeArea; CareerEvidence; WebSite; Vertical; ICP; Intent; Problem; Restriction; CapabilityGap; Capability; System; Method; Offering; Asset; Content; UseCase; Case; Claim; Signal; Opportunity; Priority; ActionRoute; Concept; TopicTerritory | Source |
| derivedFrom | Content | Source |
| analyzes | System | Signal; Problem |
| evaluates | System | Restriction; Opportunity; CapabilityGap |
| identifies | System | Priority |
| produces | System | ActionRoute |
| developedBy | System | Organization |
| foundedBy | Organization | Person |
| publishes | Organization | WebSite; Asset; Content |
| partOf | Asset; Content | WebSite |
| belongsToTerritory | Intent | TopicTerritory |
| aboutEntity | Intent | Organization; Person; WebSite; System; Method; Concept |
| practicesIn | Person | PracticeArea |
| practicesThrough | Person | Organization |
| hasCareerEvidence | Person; PracticeArea | CareerEvidence |
| evidencedByContent | PracticeArea | Content |
| hasCredential | Person | Credential |
| worksFor | Person | Organization |
| authoredBy | Content | Person |
| operatesInContext | Method | Concept; Priority |

`relatedTo`, `guaranteedSolution`, `createdBy` y `author` no son relaciones aceptadas. `possibleIntervention` y `mayLeadTo` Ruta 90 requieren condición de prioridad y capacidad de ejecución. AETHRYON produce una ruta de acción; no desemboca obligatoriamente en Ruta 90. El vínculo de automatización requiere proceso, responsables y reglas definidos. Las relaciones `supportedBy` institucionales son referencias editoriales, no validaciones externas.
