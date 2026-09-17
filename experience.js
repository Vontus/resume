// experience.js — knowledge base of everything Alberto has done, by company.
//
// This is a superset of data.js: it holds bullets, stack items and raw
// facts that don't fit the public one-page CV but may be worth pulling
// into a CV tailored for a specific job application. It is NOT consumed by
// index.html or scripts/build_cv.py — reference material only, read by
// whoever (human or Claude) is putting together a tailored CV.
//
// See CLAUDE.md in this repo for the workflow this file is meant to
// support, and the ground rules for adding to it (verified facts only).
//
// Each bullet has a short, informal `tags` list — plain hints for
// scanning, not a taxonomy to match algorithmically against a job posting.
// `notes` holds facts that haven't been phrased as a resume bullet yet.

const EXPERIENCE = {
  en: [
    {
      company: "Quadrant Travel Technologies",
      dates: "Jun 2023 — Present",
      remote: true,
      project: "Customer-facing SaaS for travel agents and tour operators, focused on trip documentation and booking flows.",
      bullets: [
        {
          text: "Started on the backoffice side before taking sole ownership of the trip documentation frontend — combined ongoing refactoring, maintenance, and feature delivery with a modernization driven by AI-assisted workflows, with no significant regressions.",
          tags: ["ownership", "ai-workflow", "frontend"]
        },
        {
          text: "Pulled the normalization logic out of the views into a dedicated domain layer — consolidating two inconsistent APIs and flattening 18 service variants into a single ViewModel.",
          tags: ["domain-modeling", "api", "refactor"]
        },
        {
          text: "Introduced visual regression testing from scratch (44 Playwright/Storybook specs in Docker); grew unit tests from 9 Jest specs to 115 Vitest specs / 842 tests, reaching 88.9% line / 90.4% branch coverage.",
          tags: ["testing", "quality", "observability"]
        },
        {
          text: "Wrote 23 internal documents — conventions, data contracts, and refactoring protocols — that serve as the repo's living documentation and permanent grounding for AI-assisted work, through the modernization and beyond.",
          tags: ["documentation", "ai-workflow"]
        },
        {
          text: "Used TanStack Query as more than a fetching layer — invalidated queries by query key after mutations to keep data consistent, and leaned on the query cache itself as a lightweight shared-state layer across components instead of introducing a separate client-state store.",
          tags: ["frontend", "caching", "state-management", "react-query"],
          confirmed: "2026-09-16 — touched cache staleness config directly (exact staleTime/gcTime values not recalled); invalidated via query keys after mutations; used the query cache as a de facto shared-state layer in place of a dedicated client-state store."
        }
      ],
      stack: ["React", "Next.js", "TypeScript", "TanStack Query", "Tailwind", "Figma", "Storybook", "Jest/Vitest", "Testing Library", "Playwright", "GitLab CI"],
      integrations: ["Smartvel", "Google Maps", "Notion API", "GrowthBook", "Sentry"],
      notes: "Figma used as a consumer — coordinating closely with designers on handoff, not producing designs himself. TanStack (React) Query is the data-fetching layer used to call the backend (confirmed 2026-09-16)."
    },
    {
      company: "Realizon · Consultation marketplace for Bauer Media",
      dates: "Nov 2022 — Mar 2023",
      remote: true,
      project: "Platform orchestrating dual-party telephony sessions with presence detection and per-minute billing — connecting consumers with paid advisors and metering session duration end-to-end.",
      bullets: [],
      stack: ["Node.js", "TypeScript", "Cloudflare Workers", "Cloudflare KV/DO", "Jest", "React", "Zod", "Zustand", "Tailwind"],
      integrations: ["Twilio", "PayPal", "Sendinblue", "Cloudflare", "Datadog"],
      notes: "Short stint (4 months). No detailed bullets recorded yet — revisit with Alberto if a specific application would benefit from something concrete here (e.g. anything about the per-minute billing/metering logic or the presence detection)."
    },
    {
      company: "Interacso · PROCEED for Tecnatom",
      dates: "Mar 2020 — Nov 2022",
      remote: true,
      project: "Mission-critical digitisation platform replacing paper inspection rounds at nuclear power plants with interactive tablet forms. Tech-led a team of three.",
      bullets: [
        {
          text: "Pivoted the platform's data layer from NoSQL to a relational schema (MSSQL) early in the project and designed it from scratch — driven by the client's need for the stronger data guarantees a relational model gives safety-critical inspection records.",
          tags: ["database", "schema-design", "relational", "mssql"],
          confirmed: "2026-09-14 — schema designed from scratch before any live data existed (not a data migration); MSSQL was the client's specific requirement for stronger data guarantees; Alberto designed it solo."
        },
        {
          text: "Designed an offline-first architecture (Dexie + deferred sync) and a Redis-backed real-time collaboration layer that scales across backend instances — a direct response to intermittent connectivity inside nuclear plants.",
          tags: ["backend", "architecture", "realtime", "offline-first"],
          confirmed: "2026-09-16 — end-to-end feature: multiple inspectors editing the same document simultaneously, possibly connected to different backend pod instances. Alberto owned the MSSQL schema, the backend architecture, and the React/Next.js frontend for this himself (design/Figma was the one piece handed to him by a designer, not owned). Redis served two roles: holding each open user session's in-memory state, and pub/sub messaging to sync state across backend instances. His manager's default suggestion for the cross-pod messaging was RabbitMQ; Alberto pushed back and used Redis instead — already running it, and its pub/sub covered what was needed without standing up a separate broker."
        },
        {
          text: "Added a dedicated event-log table capturing every action taken in the app, giving a full audit trail of who did what and when — an indispensable requirement for this class of project (nuclear power plant inspections).",
          tags: ["audit", "compliance", "database", "event-log"],
          confirmed: "2026-09-16 — a specific DB table logged every event/action in the app; this was an indispensable requirement for this type of project (regulatory compliance for nuclear plants); the specific overseeing body isn't recalled, so don't name one."
        },
        {
          text: "Contributed to a Microsoft Word plugin that exports inspector templates to HTML with embedded inputs, bridging the client's existing authoring workflow with a digital pipeline feeding tablet form-filling and downstream analytics — a colleague owned and drove this tool day to day; Alberto stepped in as the developer a couple of times during that colleague's absences, gaining hands-on experience building and maintaining it.",
          tags: ["integration", "tooling"],
          confirmed: "2026-09-16 — a colleague was the primary/owning developer on this plugin; Alberto covered development a couple of times during that colleague's vacations, so has real hands-on build/maintenance experience but did not originate or own it end-to-end. Earlier phrasing ('Built a Microsoft Word plugin...') overstated his ownership and has been corrected."
        }
      ],
      stack: ["Node.js", "Next.js", "TypeScript", "React", "Redux", "Webpack", "Figma", "MongoDB", "MSSQL"],
      integrations: [],
      notes: "Figma used as a consumer, same as Quadrant. Tech lead of a team of three."
    },
    {
      company: "LynxView · PLM for Mustang",
      dates: "Jun 2018 — Mar 2020",
      remote: false,
      project: "Product Lifecycle Management platform used by Mustang's design teams to manage footwear, bag and accessory collections. First professional role.",
      bullets: [
        {
          text: "Designed the PostgreSQL schema and wrote versioned, rollback-capable migrations for a new NestJS/TypeORM/GraphQL service, evolving it against live production data; chose TypeORM for its native TypeScript integration.",
          tags: ["database", "schema-design", "migrations", "postgresql", "typeorm", "nestjs", "graphql"],
          confirmed: "2026-09-14 — new service built with TypeORM from day one; Alberto personally designed the schema and wrote/ran the versioned, rollback-capable migrations against live production data; chose TypeORM over Sequelize for its TypeScript/GraphQL fit."
        }
      ],
      stack: ["Node.js", "TypeScript", "NestJS", "TypeORM", "GraphQL", "Vue", "PostgreSQL"],
      integrations: [],
      notes: "A second project at LynxView (the company name field bundles the Mustang PLM project, but this was separate): a PWA for utility technicians reading water meters in a town — installable from the browser onto tablets, same core stack (NestJS, GraphQL, Vue, TypeScript, TypeORM) (confirmed 2026-09-16 — his specific role/contributions on this one not yet detailed; ask Alberto if a future application needs specifics). This LynxView stint predates Vue 3 (released Sep 2020) — the Vue experience here is Vue 2, not Vue 3/Composition API (confirmed 2026-09-17 — do not describe this as Vue 3 experience). Since moving to React professionally (Quadrant), Alberto has kept up with Vue 3 on his own time — followed its updates as a hobby, and 2 days before this note passed a technical interview covering Vue 3/Composition API (confirmed 2026-09-17). Frame as self-directed/hobby familiarity with Vue 3, distinct from — and not a substitute for — the professional Vue 2 experience above; never state or imply paid Vue 3 work."
    }
  ],

  es: [
    {
      company: "Quadrant Travel Technologies",
      dates: "Jun 2023 — Actualidad",
      remote: true,
      project: "SaaS para agentes de viajes y tour operadores, enfocado en documentación digital de los servicios contratados y flujos de reserva.",
      bullets: [
        {
          text: "Trabajé en el backoffice antes de hacerme cargo en solitario del frontend de documentación digital — he combinado refactorización, mantenimiento y entrega continua de features con una modernización apoyada en IA, sin regresiones relevantes.",
          tags: ["ownership", "ai-workflow", "frontend"]
        },
        {
          text: "Extraje la lógica de normalización dispersa en las vistas a una capa de dominio centralizada — unificando dos APIs inconsistentes y aplanando 18 variantes de servicio en un único ViewModel.",
          tags: ["domain-modeling", "api", "refactor"]
        },
        {
          text: "Introduje testing de regresión visual desde cero (44 specs Playwright/Storybook en Docker); los tests unitarios pasaron de 9 specs Jest a 115 Vitest / 842 tests, con 88,9% de líneas y 90,4% de ramas.",
          tags: ["testing", "quality", "observability"]
        },
        {
          text: "Redacté 23 documentos internos — convenciones, contratos de datos y protocolos de refactor — que sirven como documentación viva del repo y contexto permanente para trabajo asistido por IA, tanto durante la modernización como en el desarrollo continuo.",
          tags: ["documentation", "ai-workflow"]
        },
        {
          text: "Usé TanStack Query como algo más que una capa de fetching — invalidé queries por query key tras las mutaciones para mantener los datos consistentes, y usé la propia caché de queries como una capa ligera de estado compartido entre componentes en lugar de introducir un store de estado cliente aparte.",
          tags: ["frontend", "caching", "state-management", "react-query"],
          confirmed: "2026-09-16 — tocó configuración de caducidad de caché directamente (no recuerda los valores exactos de staleTime/gcTime); invalidaba vía query keys tras mutaciones; usaba la caché de queries como capa de estado compartido de facto en lugar de un store de estado cliente dedicado."
        }
      ],
      stack: ["React", "Next.js", "TypeScript", "TanStack Query", "Tailwind", "Figma", "Storybook", "Jest/Vitest", "Testing Library", "Playwright", "GitLab CI"],
      integrations: ["Smartvel", "Google Maps", "Notion API", "GrowthBook", "Sentry"],
      notes: "Figma usado como consumidor — coordinación estrecha con diseñadores en el handoff, no produce los diseños él mismo. TanStack (React) Query es la capa de data-fetching usada para llamar al backend (confirmado 2026-09-16)."
    },
    {
      company: "Realizon · Marketplace de consultas para Bauer Media",
      dates: "Nov 2022 — Mar 2023",
      remote: true,
      project: "Plataforma que orquesta sesiones de telefonía bilateral con detección de presencia y facturación por minuto — conectando consumidores con asesores remunerados y midiendo la duración end-to-end.",
      bullets: [],
      stack: ["Node.js", "TypeScript", "Cloudflare Workers", "Cloudflare KV/DO", "Jest", "React", "Zod", "Zustand", "Tailwind"],
      integrations: ["Twilio", "PayPal", "Sendinblue", "Cloudflare", "Datadog"],
      notes: "Puesto corto (4 meses). Sin bullets detallados todavía — revisar con Alberto si alguna aplicación concreta se beneficiaría de algo específico aquí (p. ej. la lógica de facturación por minuto o la detección de presencia)."
    },
    {
      company: "Interacso · PROCEED para Tecnatom",
      dates: "Mar 2020 — Nov 2022",
      remote: true,
      project: "Plataforma crítica de digitalización que sustituye las rondas de inspección en papel en centrales nucleares por formularios interactivos en tablet. Tech lead de un equipo de tres.",
      bullets: [
        {
          text: "Pivoté la capa de datos de la plataforma, de NoSQL a un esquema relacional (MSSQL), al inicio del proyecto, y lo diseñé desde cero — por la necesidad del cliente de las garantías de datos más sólidas que ofrece un modelo relacional para registros de inspección críticos para la seguridad.",
          tags: ["database", "schema-design", "relational", "mssql"],
          confirmed: "2026-09-14 — esquema diseñado desde cero antes de que existieran datos reales (no hubo migración de datos); MSSQL fue petición explícita del cliente por mayores garantías de datos; lo diseñó Alberto en solitario."
        },
        {
          text: "Diseñé una arquitectura offline-first (Dexie + sincronización diferida) y una capa de colaboración en tiempo real con Redis que escala entre instancias del backend — respuesta a la conectividad intermitente en centrales nucleares.",
          tags: ["backend", "architecture", "realtime", "offline-first"],
          confirmed: "2026-09-16 — feature end-to-end: varios inspectores editando el mismo documento a la vez, posiblemente conectados a distintos pods de backend. Alberto fue el dueño del esquema MSSQL, la arquitectura de backend y el frontend React/Next.js de esta funcionalidad (el diseño/Figma sí lo recibía de un diseñador, no lo producía él). Redis cumplía dos funciones: guardar el estado en memoria de cada sesión de usuario abierta, y la mensajería pub/sub para sincronizar estado entre instancias del backend. Su jefe proponía por defecto RabbitMQ para la mensajería entre pods; Alberto lo rebatió y usó Redis — ya lo tenían corriendo, y su pub/sub cubría lo necesario sin montar un broker aparte."
        },
        {
          text: "Añadí una tabla de log de eventos dedicada que registraba cada acción realizada en la aplicación, dando un rastro de auditoría completo de quién hizo qué y cuándo — requisito indispensable para este tipo de proyecto (inspecciones en centrales nucleares).",
          tags: ["audit", "compliance", "database", "event-log"],
          confirmed: "2026-09-16 — una tabla específica en la BBDD registraba cada evento/acción de la app; era un requisito indispensable para este tipo de proyecto (cumplimiento normativo en centrales nucleares); no se recuerda el organismo concreto que lo vigilaba, así que no se debe nombrar ninguno."
        },
        {
          text: "Colaboré en un plugin de Microsoft Word que exporta plantillas de inspectores a HTML con inputs embebidos, conectando el flujo de autoría del cliente con un pipeline digital que alimenta el rellenado en tablet y la analítica posterior — un compañero era el dueño de esta herramienta y la llevaba día a día; Alberto tomó el relevo como desarrollador en un par de ocasiones durante sus ausencias, ganando experiencia práctica construyéndola y manteniéndola.",
          tags: ["integration", "tooling"],
          confirmed: "2026-09-16 — un compañero era el desarrollador principal/dueño de este plugin; Alberto cubrió el desarrollo un par de veces durante las vacaciones de ese compañero, por lo que tiene experiencia práctica real de construcción/mantenimiento pero no lo originó ni fue el dueño end-to-end. La redacción anterior ('Desarrollé un plugin...') sobrestimaba su propiedad y ha sido corregida."
        }
      ],
      stack: ["Node.js", "Next.js", "TypeScript", "React", "Redux", "Webpack", "Figma", "MongoDB", "MSSQL"],
      integrations: [],
      notes: "Figma usado como consumidor, igual que en Quadrant. Tech lead de un equipo de tres."
    },
    {
      company: "LynxView · PLM para Mustang",
      dates: "Jun 2018 — Mar 2020",
      remote: false,
      project: "Plataforma de Product Lifecycle Management para los equipos de diseño de Mustang en colecciones de calzado, bolsos y accesorios. Primer puesto profesional.",
      bullets: [
        {
          text: "Diseñé el esquema de PostgreSQL y escribí las migraciones versionadas, con soporte de rollback, de un nuevo servicio NestJS/TypeORM/GraphQL, evolucionándolo sobre datos ya en producción; elegí TypeORM por su integración nativa con TypeScript.",
          tags: ["database", "schema-design", "migrations", "postgresql", "typeorm", "nestjs", "graphql"],
          confirmed: "2026-09-14 — servicio nuevo construido con TypeORM desde el principio; Alberto diseñó el esquema y escribió/ejecutó él mismo las migraciones versionadas con rollback sobre datos ya en producción; eligió TypeORM sobre Sequelize por su encaje con TypeScript/GraphQL."
        }
      ],
      stack: ["Node.js", "TypeScript", "NestJS", "TypeORM", "GraphQL", "Vue", "PostgreSQL"],
      integrations: [],
      notes: "Hubo un segundo proyecto en LynxView (el campo de empresa agrupa el proyecto PLM de Mustang, pero este era distinto): una PWA para técnicos que toman lecturas de contadores de agua en un pueblo — instalable desde el navegador en tablets, mismo stack base (NestJS, GraphQL, Vue, TypeScript, TypeORM) (confirmado 2026-09-16 — su rol/aportación concreta en este todavía no está detallada; preguntar a Alberto si una futura aplicación necesita algo más específico). Este puesto en LynxView es anterior a Vue 3 (publicado en sep. 2020) — la experiencia con Vue aquí es Vue 2, no Vue 3/Composition API (confirmado 2026-09-17 — no describir esto como experiencia en Vue 3). Desde que pasó a trabajar profesionalmente con React (Quadrant), Alberto se ha mantenido al día con Vue 3 por su cuenta — como hobby, siguiendo sus actualizaciones, y 2 días antes de esta nota superó una entrevista técnica que cubría Vue 3/Composition API (confirmado 2026-09-17). Presentarlo como familiaridad autodidacta/hobby con Vue 3, distinta de —y no un sustituto de— la experiencia profesional en Vue 2 de arriba; nunca afirmar ni insinuar trabajo remunerado en Vue 3."
    }
  ]
};
