"""
Tailored CV for Expleo — Full-Stack Developer (Vue 3, Node.js, TypeScript),
Senior profile.

Reframes the public CV from "Senior Frontend Engineer" to full-stack,
surfacing the backend/API side (NestJS, TypeORM, GraphQL from LynxView;
Node.js/Redis architecture from Interacso) that data.js's frontend-leaning
public CV doesn't lead with. Testing bullet (Vitest/Jest) is a direct match
for the posting.

Vue: Alberto's only professional Vue work is at LynxView (2018-2020), which
predates Vue 3 (released Sep 2020) — it's Vue 2. He has no professional
Vue 3 experience, though he's kept up with it on his own time and passed a
technical interview on it recently (see experience.js LynxView notes,
confirmed 2026-09-17). Deliberately not mentioned anywhere in this CV: the
stack line just says "Vue 2" (accurate, no need to explain a version
number) and the profile doesn't claim Vue 3. Nothing false is written, and
nothing needs defending on paper — if it comes up, that's an interview
conversation, not a CV line. Don't add a "self-taught Vue 3" caveat here in
a future edit; it reads as justifying rather than as simply honest.

Usage: uv run --with reportlab python3 scripts/tailored/expleo_fullstack_senior.py
Output: pdf/tailored/expleo-fullstack-senior/ (gitignored, not committed)
"""
import json
import sys
from pathlib import Path

REPO = Path(__file__).parent.parent.parent
sys.path.insert(0, str(REPO / "scripts"))
import build_cv  # noqa: E402

OUT_DIR = REPO / "pdf" / "tailored" / "expleo-fullstack-senior"

ROLE = {
    "en": "Senior Full Stack Engineer",
    "es": "Desarrollador Full Stack Senior",
}

PROFILE = {
    "en": (
        "Senior Full Stack Engineer with 8 years building complex web "
        "applications and SaaS platforms. Professional experience with "
        "Node.js, TypeScript, backend APIs (NestJS, GraphQL) and frontend "
        "frameworks (Vue, React). Focused on testing, quality and agile "
        "collaboration, with experience leading evolutions of existing "
        "systems."
    ),
    "es": (
        "Desarrollador Full Stack senior con 8 años de experiencia "
        "construyendo aplicaciones web complejas y plataformas SaaS. "
        "Experiencia profesional con Node.js, TypeScript, APIs backend "
        "(NestJS, GraphQL) y frameworks frontend (Vue, React). Enfocado en "
        "testing, calidad y colaboración en equipos ágiles, con experiencia "
        "liderando evolutivos sobre sistemas existentes."
    ),
}

# data.js's public stack line for LynxView just says "Vue" — make the
# version explicit here (Vue 2, not Vue 3) and surface NestJS/TypeORM,
# which experience.js confirms but data.js's public one-pager omits.
STACK = {
    "en": {
        "LynxView · PLM for Mustang": "Node.js · TypeScript · NestJS · TypeORM · GraphQL · Vue 2 · PostgreSQL",
    },
    "es": {
        "LynxView · PLM para Mustang": "Node.js · TypeScript · NestJS · TypeORM · GraphQL · Vue 2 · PostgreSQL",
    },
}

# Per-company bullet overrides. Company names must match data.js exactly.
BULLETS = {
    "en": {
        "Quadrant Travel Technologies": [
            "Introduced visual regression testing from scratch (44 Playwright/Storybook specs in Docker); grew unit tests from 9 Jest specs to 115 Vitest specs / 842 tests, reaching 88.9% line / 90.4% branch coverage.",
            "Pulled the normalization logic out of the views into a dedicated domain layer — consolidating two inconsistent APIs and flattening 18 service variants into a single ViewModel.",
            "Wrote internal technical documentation — conventions, data contracts, and refactoring protocols — serving as living documentation for the team.",
        ],
        "Interacso · PROCEED for Tecnatom": [
            "Designed an offline-first architecture (Dexie + deferred sync) and a Redis-backed real-time collaboration layer that scales across backend instances — a direct response to intermittent connectivity inside nuclear plants.",
        ],
        "LynxView · PLM for Mustang": [
            "Designed the PostgreSQL schema and wrote versioned, rollback-capable migrations for a new NestJS/TypeORM/GraphQL service, evolving it against live production data; chose TypeORM for its native TypeScript integration.",
        ],
    },
    "es": {
        "Quadrant Travel Technologies": [
            "Introduje testing de regresión visual desde cero (44 specs Playwright/Storybook en Docker); los tests unitarios pasaron de 9 specs Jest a 115 Vitest / 842 tests, con 88,9% de líneas y 90,4% de ramas.",
            "Extraje la lógica de normalización dispersa en las vistas a una capa de dominio centralizada — unificando dos APIs inconsistentes y aplanando 18 variantes de servicio en un único ViewModel.",
            "Redacté documentación técnica interna — convenciones, contratos de datos y protocolos de refactor — que sirve como documentación viva para el equipo.",
        ],
        "Interacso · PROCEED para Tecnatom": [
            "Diseñé una arquitectura offline-first (Dexie + sincronización diferida) y una capa de colaboración en tiempo real con Redis que escala entre instancias del backend — respuesta a la conectividad intermitente en centrales nucleares.",
        ],
        "LynxView · PLM para Mustang": [
            "Diseñé el esquema de PostgreSQL y escribí las migraciones versionadas, con soporte de rollback, de un nuevo servicio NestJS/TypeORM/GraphQL, evolucionándolo sobre datos ya en producción; elegí TypeORM por su integración nativa con TypeScript.",
        ],
    },
}


def build():
    data = build_cv.extract_data(REPO / "data.js")
    tailored = json.loads(json.dumps(data))  # deep copy

    for lang in ("en", "es"):
        d = tailored[lang]
        d["role"] = ROLE[lang]
        d["profile"] = PROFILE[lang]
        for role in d["experience"]:
            overrides = BULLETS[lang].get(role["company"])
            if overrides is not None:
                role["bullets"] = overrides
            new_stack = STACK[lang].get(role["company"])
            if new_stack is not None:
                role["stack"] = new_stack

    for lang in ("en", "es"):
        build_cv.build_pdf(tailored, lang, out_dir=OUT_DIR)


if __name__ == "__main__":
    build()
