"""
Tailored CV for Accenture — technical interview round, Airbus crew
accreditations project. Second CV for the same process: HR offered the
option of uploading a different one, and the interviewer is a senior
frontend engineer (2026-10-09).

Companion to accenture_airbus_fullstack.py, which is what the recruiter
already has. Same facts, different emphasis — nothing here contradicts
that version.

Why frontend-leading:

- In a technical interview the CV is the question bank, and the person
  asking is a senior frontend. What's on here should be what Alberto can
  defend deepest: the last three years at Quadrant as sole owner of a
  React/TypeScript frontend.
- But the role is still 60-70% backend and the recruiter has already seen
  a full-stack CV, so this one doesn't go frontend-only: each entry keeps
  one backend credential (Redis/MSSQL at Interacso, the PostgreSQL schema
  at LynxView), and the profile names the full-stack base explicitly.
  Leading frontend is the point; hiding the backend is not.
- Deliberate conversation bait, all confirmed in experience.js and all
  ground Alberto can hold: the TanStack Query cache used as shared state
  instead of a client-state store, CSS Modules combined with Tailwind
  (the stack line pairs them as one item so the oddity invites the
  question; the @apply detail is the answer, not the bait), visual regression with
  Playwright/Storybook in Docker, the 18-variants-to-one-ViewModel
  refactor, and offline-first with Dexie/IndexedDB.
- The online CV link is back in (the fullstack version dropped it): it's a
  frontend artifact Alberto built himself, and a frontend interviewer is
  likely to open it. That's a question worth inviting.

Not here on purpose: Swiss4ward (2018 C#/.NET internship) and the Ibergest
VB.NET work — real, but neither frontend nor defensible in technical
detail seven years later. The Swiss4ward database-bug story is interview
material for "tell me about a hard problem", not a CV bullet.

Interacso's bullets are overridden rather than inherited: data.js still
carries the Word-plugin bullet that overstates Alberto's ownership (PR #5
fixes it on main and is still open).

Location override: Alicante rather than Torrevieja, as requested for this
application.

Uploaded to Accenture on 2026-10-09. A mock technical interview that same
day broke two of its lines under questioning, and both are fixed here, so
this file no longer matches the PDF that was sent:

- "sin regresiones" was unfalsifiable on its own; it now names the
  visual-regression baseline captured before the refactor.
- the event-log bullet said "cada acción de la aplicación". The log only
  ever existed in the collaborative mode — ordinary rounds are
  single-owner and have none — so it is scoped to that mode now.
- the BFF bullet leads with the public-endpoint-over-private-APIs reason,
  which is what actually justifies a BFF; normalization alone does not.

The sent PDF still carries the old wording, so those two have to be
scoped out loud in the interview.

Usage: uv run --with reportlab python3 scripts/tailored/accenture_airbus_frontend.py
Output: pdf/tailored/accenture-airbus-frontend/ (gitignored, not committed)
"""
import json
import sys
from pathlib import Path

REPO = Path(__file__).parent.parent.parent
sys.path.insert(0, str(REPO / "scripts"))
import build_cv  # noqa: E402

OUT_DIR = REPO / "pdf" / "tailored" / "accenture-airbus-frontend"
LANGS = ("es",)

ROLE = {"es": "Desarrollador Full Stack Senior"}

PROFILE = {
    "es": (
        "Desarrollador Full Stack senior con 8 años de experiencia. Los tres "
        "últimos como responsable único del frontend de un SaaS en React y "
        "TypeScript, trabajando también su BFF en Next: normalización de "
        "varias APIs, capa de dominio, testing y regresión visual. Antes, "
        "Node.js, APIs y esquemas relacionales en MSSQL y PostgreSQL."
    ),
}

CONTACT = {"es": {"location": "Alicante, España · Remoto · CET"}}

STACK = {
    "es": {
        "Quadrant Travel Technologies": "React · Next.js · TypeScript · TanStack Query · Tailwind + CSS Modules · Figma · Storybook · Jest/Vitest · Playwright",
        "Realizon · Marketplace de consultas para Bauer Media": "TypeScript · React (sin framework) · Zustand · Zod · Jest · Cloudflare Workers · Cloudflare KV/DO",
        "Interacso · PROCEED para Tecnatom": "React · Next.js · TypeScript · Redux · Webpack · Dexie · Node.js · Redis · MSSQL",
        "LynxView · PLM para Mustang": "Vue 2 · TypeScript · GraphQL · NestJS · TypeORM · PostgreSQL",
    },
}

PROJECT = {
    "es": {
        "Realizon · Marketplace de consultas para Bauer Media": "Plataforma que orquesta sesiones de telefonía bilateral con facturación por minuto, funcionando en el edge.",
        "Interacso · PROCEED para Tecnatom": "Plataforma crítica que sustituye las rondas de inspección en papel en centrales nucleares por formularios en tablet. Tech lead de un equipo de tres.",
        "LynxView · PLM para Mustang": "Plataforma de Product Lifecycle Management para los equipos de diseño de Mustang. Primer puesto profesional.",
    },
}

BULLETS = {
    "es": {
        "Quadrant Travel Technologies": [
            "Me hice cargo en solitario del frontend de documentación digital: refactor, mantenimiento y entrega de features junto a una modernización apoyada en IA, sobre regresión visual previa.",
            "Llevé la normalización a un BFF en API routes de Next: un único endpoint público sobre APIs de backend privadas, unificadas con Smartvel en un único ViewModel (18 variantes de servicio).",
            "Introduje regresión visual desde cero (44 specs Playwright/Storybook en Docker) y llevé los unitarios de 9 specs a 842 tests, 88,9% de líneas.",
            "Traté la caché de TanStack Query como fuente de verdad del estado de servidor —invalidación por query key tras las mutaciones y ajuste de staleTime/gcTime— en vez de duplicarlo en un store de cliente.",
        ],
        "Realizon · Marketplace de consultas para Bauer Media": [
            "SPA de React sin meta-framework: la plataforma corría en el edge sobre Cloudflare Workers, donde Next no era una opción.",
        ],
        "Interacso · PROCEED para Tecnatom": [
            "Diseñé una arquitectura offline-first (Dexie/IndexedDB + sincronización diferida) y colaboración en tiempo real con Redis entre instancias.",
            "Añadí una tabla de log de eventos del modo colaborativo: qué usuario rellenó qué campo y cuándo, trazabilidad obligatoria en el proyecto.",
        ],
        "LynxView · PLM para Mustang": [
            "Desarrollo full stack con Vue 2 y GraphQL; diseñé el esquema de PostgreSQL y las migraciones versionadas de un servicio NestJS/TypeORM.",
        ],
    },
}


def build():
    data = build_cv.extract_data(REPO / "data.js")
    tailored = json.loads(json.dumps(data))  # deep copy

    for lang in LANGS:
        d = tailored[lang]
        d["role"] = ROLE[lang]
        d["profile"] = PROFILE[lang]
        d["contact"].update(CONTACT[lang])
        for role in d["experience"]:
            overrides = BULLETS[lang].get(role["company"])
            if overrides is not None:
                role["bullets"] = overrides
            new_stack = STACK[lang].get(role["company"])
            if new_stack is not None:
                role["stack"] = new_stack
            new_project = PROJECT[lang].get(role["company"])
            if new_project is not None:
                role["project"] = new_project
        build_cv.build_pdf(tailored, lang, out_dir=OUT_DIR)


if __name__ == "__main__":
    build()
