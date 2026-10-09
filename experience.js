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

// Confirmed gaps — things Alberto has NOT worked with. Don't put them on a
// CV, and don't re-ask unless he brings news:
//
//   AWS: no design, configuration or deployment experience — he has never
//   built on S3, Lambda, ECS/EKS, RDS, SQS or Cognito (confirmed
//   2026-09-22). One correction (2026-10-09): Quadrant did run on AWS, on
//   multi-instance pods, and Alberto connected to those pods to read debug
//   logs. So he has user-level, read-only contact with a cluster running on
//   AWS, nothing more; deployment was owned by a devops team. He does not
//   know whether it was EKS or ECS — do not state either. Say "pods" only
//   if ready to answer "EKS or ECS?", since "pods" is Kubernetes vocabulary.
//   The rest of his cloud/infra experience is Cloudflare (Workers,
//   KV/Durable Objects), Docker, GitLab CI and Redis.

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
          tags: ["ownership", "ai-workflow", "frontend"],
          confirmed: "2026-10-09 — \"no significant regressions\" is a claim, and on its own it reads as unfalsifiable; what defends it is the method, so lead with that. (1) The product's behaviour was never specified by the business — the project started on the fly — so Alberto reconstructed the business rules from old Jira issues, where the decisions did exist but had never been carried over to the Notion the team worked from. (2) Visual regression testing went in BEFORE the refactor, as a baseline: every change had to be explicitly approved or reverted. (3) A battery of bookings, both real ones in the test database and mocks in the frontend project, covered the different service variants, used for the visual regression runs and for checking the data by hand. Bugs that appeared afterwards were cases the business had never defined, or backend faults. On a CV, write the method, not the claim."
        },
        {
          text: "Pulled the normalization logic out of the views into a dedicated domain layer — consolidating two inconsistent APIs and flattening 18 service variants into a single ViewModel.",
          tags: ["domain-modeling", "api", "refactor"],
          confirmed: "2026-10-09 — the dedicated layer this bullet describes lived in the Next.js BFF (API routes), i.e. server-side: the logic was moved out of the client views into it. So this is backend work, not a frontend-only refactor — earlier tailored CVs framed it as a frontend domain layer, which undersold it."
        },
        {
          text: "Worked on the product's server side as a BFF in Next.js API routes: a single public endpoint over backend APIs that stayed private, co-located with them so internal calls were cheap, curating and normalizing data from the two APIs and third-party services (Smartvel) before it reached the frontend.",
          tags: ["backend", "bff", "next", "api", "integration"],
          confirmed: "2026-10-09 — the trip documentation product was not frontend-only: Alberto worked on Next.js API routes acting as a BFF, calling both backend APIs and external services such as Smartvel, curating/normalizing the data before serving it to the frontend. Only API routes/route handlers — NOT server actions, server-side data fetching or middleware; don't claim those. Sole ownership is confirmed for the frontend, not for the BFF, so write \"worked on\" for this one. WHY the BFF existed, in the order that actually convinces (confirmed 2026-10-09): (1) security perimeter — all of Quadrant was internal except the digital documentation, so the BFF exposed one public endpoint and the backend APIs were never reachable from the network; (2) it ran in the same network as the backend, so internal calls were cheap and the browser made a single round trip; (3) only then, normalization of two APIs mid-migration plus Smartvel. The second API existed because backend was migrating the data there; backend was more loaded than frontend, so the BFF let the frontend already consume the single API of the future. Caching: the data changed rarely, so responses were cached for one minute with Next's unstable_cache (next/cache, NOT React), a TTL agreed with the business and surfaced to the travel agent, who told the customer to check the site \"in about a minute\". Cache key was the booking UUID; the documentation site was public and that UUID was the capability, so caching by it exposed nothing new. KNOWN GAP, do not volunteer but be ready: it ran on multi-instance pods and unstable_cache is per-instance by default, so two pods could serve different versions within that minute and a reload could appear to go backwards. A shared cacheHandler (Redis) or sticky sessions would fix it; Alberto did not know this at the time."
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
        },
        {
          text: "Combined CSS Modules with Tailwind — module files built with Tailwind's @apply directive rather than plain CSS.",
          tags: ["css", "styling", "css-modules", "tailwind"],
          confirmed: "2026-09-17 — Quadrant's frontend used CSS Modules (styles.module.css imported and used as styles.button) together with Tailwind, not before it — the module files themselves were written using Tailwind's @apply directive rather than hand-written CSS."
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
      bullets: [
        {
          text: "Worked on a plain React SPA — no meta-framework — as the platform ran at the edge on Cloudflare Workers, where Next.js wasn't an option.",
          tags: ["frontend", "react", "edge", "cloudflare-workers"],
          confirmed: "2026-09-22 — the Realizon frontend was React with nothing on top of it (no Next.js); the reason was that the platform ran at the edge on Cloudflare Workers, which ruled Next out. This is the one place in his history with professional React-without-Next experience. His individual scope within the frontend isn't detailed (4-month stint) — the bullet deliberately says \"worked on\", not \"owned\"."
        }
      ],
      stack: ["Node.js", "TypeScript", "Cloudflare Workers", "Cloudflare KV/DO", "Jest", "React", "Zod", "Zustand", "Tailwind"],
      integrations: ["Twilio", "PayPal", "Sendinblue", "Cloudflare", "Datadog"],
      notes: "Short stint (4 months). THE TWILIO INTEGRATION WAS HIS, and it is the one concrete thing he built here (confirmed 2026-10-09): given the advisor's and the customer's phone numbers it drove the whole call — dialling the advisor FIRST so the customer was never called with nobody there, waiting on each party to answer, limiting call duration by the customer's remaining balance, playing audio warnings of time left, and detecting when either party hung up. Webhook handling was idempotent in practice without being called that: the call's state was persisted and any event that did not fit the current state (e.g. \"call ended\" when it already had) was logged as a warning and ignored. Timeouts at every step cancelled a call stuck in any phase. The customer never waited blind: they started the call from the web and saw live status (connecting to advisor / connecting to you / in progress / finished). Use the word \"idempotent\" and \"state machine\" for this — he was doing both. Not recalled, do not claim: the exact moment the balance was charged (possibly a pre-authorization/hold, but he does not remember), and the mechanism that closed the call on time (most likely Durable Object alarms — plausible but UNCONFIRMED, so do not assert it). The balance limit was computed once at the start of the call. The Cloudflare KV vs Durable Objects design was inherited, decided before he arrived: he cannot defend what lived in each or where the billing source of truth was, so either prepare it or drop KV/DO from the stack line. The observability tool was Datadog; \"Watchdog\" is Datadog\'s anomaly detection feature, not where the warnings went — do not mix them up. Asked again 2026-09-22 about the backend (per-minute billing/metering, presence detection, the Twilio/PayPal integrations): he does not recall the specifics. Do not invent bullets there, and do not offer him candidate phrasings to confirm — that invites suggestion rather than memory. The project line and the stack carry this entry on their own; only add a backend bullet if he later comes back with something concrete he could defend in an interview."
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
          modes: "2026-10-09 — the platform had two modes, and the distinction answers most questions about it. ORDINARY round: single-owner. One inspector starts as many documents as they want, nobody else touches them, and the data is uploaded when they are back in coverage — not even while connected mid-round. So sync conflicts cannot happen by design; there is nothing to merge. SHARED mode: always requires a live connection. On a failed request or a disconnect event the form is locked and the user is notified; it becomes editable again only after a successful check that the server is reachable. Event timestamps always come from the server, when the change arrives. Trading availability for consistency here was deliberate.",
          confirmed: "2026-09-16 — end-to-end feature: multiple inspectors editing the same document simultaneously, possibly connected to different backend pod instances. Alberto owned the MSSQL schema, the backend architecture, and the React/Next.js frontend for this himself (design/Figma was the one piece handed to him by a designer, not owned). Redis served two roles: holding each open user session's in-memory state, and pub/sub messaging to sync state across backend instances. His manager's default suggestion for the cross-pod messaging was RabbitMQ; Alberto pushed back and used Redis instead — already running it, and its pub/sub covered what was needed without standing up a separate broker."
        },
        {
          text: "Added a dedicated event-log table for the collaborative inspection mode, recording which user filled in which field and when — the traceability the project needed wherever several inspectors worked on the same document.",
          tags: ["audit", "compliance", "database", "event-log"],
          confirmed: "2026-10-09 — CORRECTS the 2026-09-16 phrasing ('every action taken in the app'), which was overstated and would not survive questioning. The event log existed for the shared/collaborative mode only. Ordinary rounds are single-owner: one inspector owns the inspection, works offline, and the whole thing is uploaded as a single object on returning to coverage — no event log there, because the 'who' is never in doubt. In shared mode the timestamp came from the server, when the change arrived. The regulation did not require a per-reading timestamp in individual rounds. Never write 'every action in the app' again; scope it to the collaborative mode."
        },
        {
          text: "Contributed to a Microsoft Word plugin that exports inspector templates to HTML with embedded inputs, bridging the client's existing authoring workflow with a digital pipeline feeding tablet form-filling and downstream analytics — a colleague owned and drove this tool day to day; Alberto stepped in as the developer a couple of times during that colleague's absences, gaining hands-on experience building and maintaining it.",
          tags: ["integration", "tooling"],
          confirmed: "2026-09-16 — a colleague was the primary/owning developer on this plugin; Alberto covered development a couple of times during that colleague's vacations, so has real hands-on build/maintenance experience but did not originate or own it end-to-end. Earlier phrasing ('Built a Microsoft Word plugin...') overstated his ownership and has been corrected."
        },
        {
          text: "Used styled-components in internal side projects built during pauses in the main Tecnatom project.",
          tags: ["css", "styling", "styled-components", "side-project"],
          confirmed: "2026-09-17 — this was side-project work, not part of the Tecnatom/PROCEED production codebase; used during periods when the main project was paused. Used transient props (the `$` prefix, e.g. `$primary`) to pass styling-only props without forwarding them as DOM attributes on native elements. Specifics of what was built with it not yet detailed — ask Alberto if a future application needs more concrete examples (e.g. theming, extending components)."
        }
      ],
      stack: ["Node.js", "Next.js", "TypeScript", "React", "Redux", "Webpack", "Figma", "MongoDB", "MSSQL", "styled-components (side projects)"],
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
          tags: ["ownership", "ai-workflow", "frontend"],
          confirmed: "2026-10-09 — \"sin regresiones relevantes\" es una afirmación y por sí sola suena irrefutable; lo que la defiende es el método, así que hay que empezar por ahí. (1) El comportamiento del producto nunca estuvo definido por negocio — el proyecto arrancó sobre la marcha —, así que Alberto reconstruyó las reglas de negocio a partir de issues antiguas de Jira, donde las decisiones sí estaban pero nunca se habían trasladado al Notion con el que trabajaba el equipo. (2) Los tests de regresión visual entraron ANTES del refactor, como línea base: cada cambio había que aceptarlo explícitamente o revertirlo. (3) Una batería de reservas, reales en la base de datos de pruebas y mocks en el proyecto de frontend, cubría las distintas variantes de servicio, y se usaba tanto para los tests de regresión visual como para comprobar los datos a mano. Los bugs posteriores fueron casuísticas que negocio no había definido nunca, o fallos de backend. En un CV, escribir el método, no la afirmación."
        },
        {
          text: "Extraje la lógica de normalización dispersa en las vistas a una capa de dominio centralizada — unificando dos APIs inconsistentes y aplanando 18 variantes de servicio en un único ViewModel.",
          tags: ["domain-modeling", "api", "refactor"],
          confirmed: "2026-10-09 — la capa que describe este bullet vivía en el BFF de Next (API routes), es decir en servidor: la lógica se sacó de las vistas de cliente hacia allí. Por tanto es trabajo de backend, no un refactor solo de frontend — los CV tailored anteriores lo presentaban como capa de dominio en frontend, lo que lo infravaloraba."
        },
        {
          text: "Trabajé el lado servidor del producto como un BFF en API routes de Next: un único endpoint público por delante de unas APIs de backend que seguían siendo privadas, desplegado en su misma red para que las llamadas internas fueran baratas, curando y normalizando los datos de las dos APIs y de servicios de terceros (Smartvel) antes de que llegaran al frontend.",
          tags: ["backend", "bff", "next", "api", "integration"],
          confirmed: "2026-10-09 — el producto de documentación digital no era solo frontend: Alberto trabajó en API routes de Next que hacían de BFF, llamando tanto a las dos APIs del backend como a servicios externos tipo Smartvel, curando/normalizando los datos antes de servirlos al frontend. Solo API routes/route handlers — NO server actions, ni data fetching en servidor, ni middleware; no atribuirle eso. La propiedad en solitario está confirmada para el frontend, no para el BFF, así que escribir \"trabajé en\" y no \"fui dueño de\". POR QUÉ existía el BFF, en el orden que de verdad convence (confirmado 2026-10-09): (1) perímetro de seguridad — todo Quadrant era interno salvo la documentación digital, así que el BFF exponía un único endpoint público y las APIs de backend no eran accesibles desde la red; (2) corría en la misma red que el backend, así que las llamadas internas eran baratas y el navegador hacía un solo viaje; (3) solo después, la normalización de dos APIs en plena migración más Smartvel. La segunda API existía porque backend estaba migrando los datos allí; backend tenía más carga que frontend, así que el BFF permitió que el frontend ya consumiera la API única del futuro. Caché: los datos cambiaban poco, así que las respuestas se cacheaban un minuto con unstable_cache de Next (next/cache, NO de React), un TTL pactado con negocio y comunicado al asesor, que avisaba al cliente de consultar la web \"en aproximadamente un minuto\". La clave de caché era el UUID de la reserva; la web de documentación era pública y ese UUID era la credencial de acceso, así que cachear por él no exponía nada nuevo. HUECO CONOCIDO, no sacarlo pero llevarlo preparado: corría en pods multi-instancia y unstable_cache es por instancia por defecto, así que dos pods podían servir versiones distintas dentro de ese minuto y una recarga podía parecer que retrocede. Un cacheHandler compartido (Redis) o sticky sessions lo arreglan; Alberto no lo sabía entonces."
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
        },
        {
          text: "Combinó CSS Modules con Tailwind — los ficheros de módulo se escribían con la directiva @apply de Tailwind en lugar de CSS a mano.",
          tags: ["css", "styling", "css-modules", "tailwind"],
          confirmed: "2026-09-17 — el frontend de Quadrant usaba CSS Modules (styles.module.css importado y usado como styles.button) junto con Tailwind, no antes — los propios ficheros de módulo se escribían con la directiva @apply de Tailwind en vez de CSS escrito a mano."
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
      bullets: [
        {
          text: "Trabajé en una SPA de React sin meta-framework — la plataforma corría en el edge sobre Cloudflare Workers, donde Next.js no era una opción.",
          tags: ["frontend", "react", "edge", "cloudflare-workers"],
          confirmed: "2026-09-22 — el frontend de Realizon era React sin nada por encima (sin Next.js); el motivo era que la plataforma corría en el edge sobre Cloudflare Workers, lo que descartaba Next. Es el único sitio de su historial con experiencia profesional de React sin Next. Su aportación individual dentro del frontend no está detallada (puesto de 4 meses) — el bullet dice \"trabajé en\" a propósito, no \"fui dueño de\"."
        }
      ],
      stack: ["Node.js", "TypeScript", "Cloudflare Workers", "Cloudflare KV/DO", "Jest", "React", "Zod", "Zustand", "Tailwind"],
      integrations: ["Twilio", "PayPal", "Sendinblue", "Cloudflare", "Datadog"],
      notes: "Puesto corto (4 meses). LA INTEGRACIÓN CON TWILIO ERA SUYA, y es lo único concreto que construyó aquí (confirmado 2026-10-09): a partir de los teléfonos del asesor y del cliente gobernaba la llamada entera — marcando PRIMERO al asesor para no llamar nunca al cliente sin nadie al otro lado, esperando a que cada parte contestara, limitando la duración según el saldo restante del cliente, lanzando avisos sonoros del tiempo que quedaba y detectando cuándo colgaba cualquiera de los dos. El manejo de webhooks era idempotente de hecho sin llamarlo así: el estado de la llamada se persistía y cualquier evento que no encajaba con el estado actual (p. ej. \"llamada colgada\" cuando ya había terminado) se registraba como warning y se ignoraba. Había timeouts en cada paso para cancelar una llamada atascada en cualquier fase. El cliente nunca esperaba a ciegas: iniciaba la llamada desde la web y veía el estado en vivo (conectando con el asesor / conectando contigo / en curso / finalizada). Usar las palabras \"idempotente\" y \"máquina de estados\" al contarlo — es exactamente lo que había. No lo recuerda, no afirmarlo: el momento exacto en que se descontaba el saldo (quizá una preautorización/retención, pero no lo recuerda), y el mecanismo que cerraba la llamada a tiempo (probablemente alarms de Durable Objects — plausible pero SIN CONFIRMAR, así que no darlo por hecho). El límite por saldo se calculaba una vez al inicio de la llamada. El diseño de Cloudflare KV frente a Durable Objects venía dado, decidido antes de que él llegara: no puede defender qué vivía en cada uno ni dónde estaba la fuente de verdad de la facturación, así que o lo prepara o quita KV/DO de la línea de stack. La herramienta de observabilidad era Datadog; \"Watchdog\" es la función de detección de anomalías de Datadog, no el sitio donde iban los warnings — no confundirlos. Preguntado de nuevo el 2026-09-22 por el backend (facturación por minuto, detección de presencia, integraciones con Twilio/PayPal): no recuerda los detalles. No inventar bullets ahí, y no ofrecerle redacciones candidatas para que las confirme — eso provoca sugestión en lugar de memoria. La línea de proyecto y el stack sostienen esta entrada por sí solos; añadir un bullet de backend solo si más adelante vuelve con algo concreto que pueda defender en una entrevista."
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
          modes: "2026-10-09 — la plataforma tenía dos modos, y la distinción responde a casi todo lo que se pregunta sobre ella. Ronda ORDINARIA: dueño único. Un inspector empieza tantos documentos como quiera, nadie más los toca, y los datos se suben cuando vuelve a zona con cobertura — ni siquiera estando conectado a mitad de ronda. Así que los conflictos de sincronización no pueden darse por diseño; no hay nada que mergear. Modo COMPARTIDO: exige conexión activa siempre. Ante una petición que no llega o un evento de desconexión, el formulario se bloquea y se avisa al usuario; vuelve a ser editable solo tras comprobar con éxito que hay conexión con el servidor. Las marcas de tiempo de los eventos salen siempre del servidor, al llegar el cambio. Sacrificar disponibilidad por consistencia aquí fue deliberado.",
          confirmed: "2026-09-16 — feature end-to-end: varios inspectores editando el mismo documento a la vez, posiblemente conectados a distintos pods de backend. Alberto fue el dueño del esquema MSSQL, la arquitectura de backend y el frontend React/Next.js de esta funcionalidad (el diseño/Figma sí lo recibía de un diseñador, no lo producía él). Redis cumplía dos funciones: guardar el estado en memoria de cada sesión de usuario abierta, y la mensajería pub/sub para sincronizar estado entre instancias del backend. Su jefe proponía por defecto RabbitMQ para la mensajería entre pods; Alberto lo rebatió y usó Redis — ya lo tenían corriendo, y su pub/sub cubría lo necesario sin montar un broker aparte."
        },
        {
          text: "Añadí una tabla de log de eventos para el modo de inspección colaborativo, registrando qué usuario rellenó qué campo y cuándo — la trazabilidad que el proyecto necesitaba allí donde varios inspectores trabajaban sobre el mismo documento.",
          tags: ["audit", "compliance", "database", "event-log"],
          confirmed: "2026-10-09 — CORRIGE la redacción del 2026-09-16 ('cada acción realizada en la aplicación'), que exageraba y no aguanta una repregunta. El log de eventos existía solo para el modo compartido/colaborativo. Las rondas ordinarias son de dueño único: un inspector es el dueño de la inspección, trabaja offline y todo se sube como un único objeto al volver a zona con cobertura — ahí no hay log de eventos, porque el 'quién' nunca está en duda. En modo compartido la marca de tiempo salía del servidor, al llegar el cambio. La normativa no exigía marca de tiempo por lectura en las rondas individuales. No volver a escribir 'cada acción de la aplicación'; acotarlo al modo colaborativo."
        },
        {
          text: "Colaboré en un plugin de Microsoft Word que exporta plantillas de inspectores a HTML con inputs embebidos, conectando el flujo de autoría del cliente con un pipeline digital que alimenta el rellenado en tablet y la analítica posterior — un compañero era el dueño de esta herramienta y la llevaba día a día; Alberto tomó el relevo como desarrollador en un par de ocasiones durante sus ausencias, ganando experiencia práctica construyéndola y manteniéndola.",
          tags: ["integration", "tooling"],
          confirmed: "2026-09-16 — un compañero era el desarrollador principal/dueño de este plugin; Alberto cubrió el desarrollo un par de veces durante las vacaciones de ese compañero, por lo que tiene experiencia práctica real de construcción/mantenimiento pero no lo originó ni fue el dueño end-to-end. La redacción anterior ('Desarrollé un plugin...') sobrestimaba su propiedad y ha sido corregida."
        },
        {
          text: "Usó styled-components en proyectos internos desarrollados durante parones del proyecto principal de Tecnatom.",
          tags: ["css", "styling", "styled-components", "side-project"],
          confirmed: "2026-09-17 — esto fue trabajo en side projects, no parte del código de producción de Tecnatom/PROCEED; se usó durante periodos en los que el proyecto principal estaba parado. Usó transient props (el prefijo `$`, p. ej. `$primary`) para pasar props de solo estilado sin reenviarlas como atributos del DOM en elementos nativos. Los detalles concretos de qué se construyó con ello no están registrados todavía — preguntar a Alberto si una futura aplicación necesita ejemplos más concretos (p. ej. theming, extensión de componentes)."
        }
      ],
      stack: ["Node.js", "Next.js", "TypeScript", "React", "Redux", "Webpack", "Figma", "MongoDB", "MSSQL", "styled-components (side projects)"],
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
