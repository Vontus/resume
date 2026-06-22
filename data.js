const DATA = {
  en: {
    ui: { language: "Language", download: "Download PDF" },
    name: "Alberto Martínez Berná",
    role: "Senior Frontend Engineer",
    sections: {
      contact: "Contact",
      profile: "Profile",
      languages: "Languages",
      education: "Education",
      experience: "Experience"
    },
    profile: "Senior Frontend / Full Stack Engineer with 8 years of experience building complex web applications and SaaS platforms. Specialized in React, TypeScript and frontend architecture, focused on scalable products, AI-assisted refactors, complex integrations and cloud-edge solutions.",
    contact: {
      website: { url: "https://vontus.github.io/resume/", label: "Online resume" },
      email: "martinezbernaalberto@gmail.com",
      location: "Alicante, Spain · CET",
      github: { url: "https://github.com/vontus", label: "github.com/vontus" },
      linkedin: {
        url: "https://www.linkedin.com/in/alberto-mart%C3%ADnez-bern%C3%A1-67945a167/",
        label: "in/alberto-martínez-berná"
      }
    },
    languages: [
      { name: "Spanish", level: "Native" },
      { name: "English", level: "Advanced" }
    ],
    education: {
      title: "Higher Education — Cross-Platform Application Development",
      school: "IES Doctor Balmis, Alicante",
      dates: "2016 — 2018"
    },
    stackLabel: "Stack",
    integrationsLabel: "Integrations",
    experience: [
      {
        title: "Senior Frontend Engineer",
        company: "Quadrant Travel Technologies",
        dates: "Jun 2023 — Present",
        project: "Customer-facing SaaS for travel agents and tour operators, focused on trip documentation and booking flows.",
        bullets: [
          "Started on the backoffice side before taking sole ownership of the trip documentation frontend — combined ongoing refactoring, maintenance, and feature delivery with a modernization driven by AI-assisted workflows, with no significant regressions.",
          "Pulled the normalization logic out of the views into a dedicated domain layer — consolidating two inconsistent APIs and flattening 18 service variants into a single ViewModel.",
          "Introduced visual regression testing from scratch (44 Playwright/Storybook specs in Docker); grew unit tests from 9 Jest specs to 115 Vitest specs / 842 tests, reaching 88.9% line / 90.4% branch coverage.",
          "Wrote 23 internal documents — conventions, data contracts, and refactoring protocols — that serve as the repo's living documentation and permanent grounding for AI-assisted work, through the modernization and beyond."
        ],
        stack: "React · Next.js · TypeScript · Tailwind · Storybook · Jest/Vitest · Testing Library · Playwright · GitLab CI",
        integrations: "Smartvel · Google Maps · Notion API · GrowthBook · Sentry"
      },
      {
        title: "Full Stack Engineer",
        company: "Realizon · Consultation marketplace for Bauer Media",
        dates: "Nov 2022 — Mar 2023",
        project: "Platform orchestrating dual-party telephony sessions with presence detection and per-minute billing — connecting consumers with paid advisors and metering session duration end-to-end.",
        bullets: [],
        stack: "Node.js · TypeScript · Cloudflare Workers · Cloudflare KV/DO · Jest · React · Zod · Zustand · Tailwind",
        integrations: "Twilio · PayPal · Sendinblue · Cloudflare · Datadog"
      },
      {
        title: "Full Stack Engineer",
        company: "Interacso · PROCEED for Tecnatom",
        dates: "Mar 2020 — Nov 2022",
        project: "Mission-critical digitisation platform replacing paper inspection rounds at nuclear power plants with interactive tablet forms. Tech-led a team of three.",
        bullets: [
          "Designed an offline-first architecture (Dexie + deferred sync) and a Redis-backed real-time collaboration layer that scales across backend instances — a direct response to intermittent connectivity inside nuclear plants.",
          "Built a Microsoft Word plugin that exports inspector templates to HTML with embedded inputs, bridging the client's existing authoring workflow with a digital pipeline feeding tablet form-filling and downstream analytics."
        ],
        stack: "Node.js · Next.js · TypeScript · React · Redux · MongoDB · MSSQL",
        integrations: ""
      },
      {
        title: "Full Stack Engineer",
        company: "LynxView · PLM for Mustang",
        dates: "Jun 2018 — Mar 2020",
        project: "Product Lifecycle Management platform used by Mustang's design teams to manage footwear, bag and accessory collections. First professional role.",
        bullets: [],
        stack: "Node.js · TypeScript · GraphQL · Vue · PostgreSQL",
        integrations: ""
      }
    ]
  },

  es: {
    ui: { language: "Idioma", download: "Descargar PDF" },
    name: "Alberto Martínez Berná",
    role: "Desarrollador Frontend Senior",
    sections: {
      contact: "Contacto",
      profile: "Perfil",
      languages: "Idiomas",
      education: "Educación",
      experience: "Experiencia"
    },
    profile: "Desarrollador Frontend / Full Stack senior con 8 años de experiencia construyendo aplicaciones web complejas y plataformas SaaS. Especializado en React, TypeScript y arquitectura frontend, enfocado en productos escalables, refactors asistidos por IA, integraciones complejas y soluciones cloud-edge.",
    contact: {
      website: { url: "https://vontus.github.io/resume/", label: "Currículum online" },
      email: "martinezbernaalberto@gmail.com",
      location: "Alicante, España · CET",
      github: { url: "https://github.com/vontus", label: "github.com/vontus" },
      linkedin: {
        url: "https://www.linkedin.com/in/alberto-mart%C3%ADnez-bern%C3%A1-67945a167/",
        label: "in/alberto-martínez-berná"
      }
    },
    languages: [
      { name: "Español", level: "Nativo" },
      { name: "Inglés", level: "Avanzado" }
    ],
    education: {
      title: "Grado Superior en Desarrollo de Aplicaciones Multiplataforma",
      school: "IES Doctor Balmis, Alicante",
      dates: "2016 — 2018"
    },
    stackLabel: "Stack",
    integrationsLabel: "Integraciones",
    experience: [
      {
        title: "Desarrollador Frontend Senior",
        company: "Quadrant Travel Technologies",
        dates: "Jun 2023 — Actualidad",
        project: "SaaS para agentes de viajes y tour operadores, enfocado en documentación digital de los servicios contratados y flujos de reserva.",
        bullets: [
          "Trabajé en el backoffice antes de hacerme cargo en solitario del frontend de documentación digital — he combinado refactorización, mantenimiento y entrega continua de features con una modernización apoyada en IA, sin regresiones relevantes.",
          "Extraje la lógica de normalización dispersa en las vistas a una capa de dominio centralizada — unificando dos APIs inconsistentes y aplanando 18 variantes de servicio en un único ViewModel.",
          "Introduje testing de regresión visual desde cero (44 specs Playwright/Storybook en Docker); los tests unitarios pasaron de 9 specs Jest a 115 Vitest / 842 tests, con 88,9% de líneas y 90,4% de ramas.",
          "Redacté 23 documentos internos — convenciones, contratos de datos y protocolos de refactor — que sirven como documentación viva del repo y contexto permanente para trabajo asistido por IA, tanto durante la modernización como en el desarrollo continuo."
        ],
        stack: "React · Next.js · TypeScript · Tailwind · Storybook · Jest/Vitest · Testing Library · Playwright · GitLab CI",
        integrations: "Smartvel · Google Maps · Notion API · GrowthBook · Sentry"
      },
      {
        title: "Desarrollador Full Stack",
        company: "Realizon · Marketplace de consultas para Bauer Media",
        dates: "Nov 2022 — Mar 2023",
        project: "Plataforma que orquesta sesiones de telefonía bilateral con detección de presencia y facturación por minuto — conectando consumidores con asesores remunerados y midiendo la duración end-to-end.",
        bullets: [],
        stack: "Node.js · TypeScript · Cloudflare Workers · Cloudflare KV/DO · Jest · React · Zod · Zustand · Tailwind",
        integrations: "Twilio · PayPal · Sendinblue · Cloudflare · Datadog"
      },
      {
        title: "Desarrollador Full Stack",
        company: "Interacso · PROCEED para Tecnatom",
        dates: "Mar 2020 — Nov 2022",
        project: "Plataforma mission-critical de digitalización que sustituye las rondas de inspección en papel en centrales nucleares por formularios interactivos en tablet. Tech lead de un equipo de tres.",
        bullets: [
          "Diseñé una arquitectura offline-first (Dexie + sincronización diferida) y una capa de colaboración en tiempo real con Redis que escala entre instancias del backend — respuesta a la conectividad intermitente en centrales nucleares.",
          "Desarrollé un plugin de Microsoft Word que exporta plantillas de inspectores a HTML con inputs embebidos, conectando el flujo de autoría del cliente con un pipeline digital que alimenta el rellenado en tablet y la analítica posterior."
        ],
        stack: "Node.js · Next.js · TypeScript · React · Redux · MongoDB · MSSQL",
        integrations: ""
      },
      {
        title: "Desarrollador Full Stack",
        company: "LynxView · PLM para Mustang",
        dates: "Jun 2018 — Mar 2020",
        project: "Plataforma de Product Lifecycle Management para los equipos de diseño de Mustang en colecciones de calzado, bolsos y accesorios. Primer puesto profesional.",
        bullets: [],
        stack: "Node.js · TypeScript · GraphQL · Vue · PostgreSQL",
        integrations: ""
      }
    ]
  }
};
