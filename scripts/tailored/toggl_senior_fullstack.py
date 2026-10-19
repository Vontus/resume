"""
Tailored CV for Toggl — Senior Full Stack Engineer (Managers Tribe, Toggl 2.0).

Emphasizes the full-stack angle (relational schema design, API layers,
data-dense React/TypeScript UI) over the plain-frontend framing of the
public CV. Pulls two bullets from experience.js that aren't in data.js:
the MSSQL schema design at Interacso and the PostgreSQL/TypeORM/migrations
work at LynxView — both directly relevant to a posting that leans on
Postgres and relational data modeling.

Usage: uv run --with reportlab python3 scripts/tailored/toggl_senior_fullstack.py
Output: pdf/tailored/toggl-senior-fullstack/ (gitignored, not committed)
"""
import json
import sys
from pathlib import Path

REPO = Path(__file__).parent.parent.parent
sys.path.insert(0, str(REPO / "scripts"))
import build_cv  # noqa: E402

OUT_DIR = REPO / "pdf" / "tailored" / "toggl-senior-fullstack"

ROLE = {
    "en": "Senior Full Stack Engineer",
    "es": "Desarrollador Full Stack Senior",
}

# Quadrant ended Jul 2026 — data.js still says "Present" as of this
# application; keep this override until data.js itself is updated.
DATES = {
    "en": {"Quadrant Travel Technologies": "Jun 2023 — Jul 2026 · Remote"},
    "es": {"Quadrant Travel Technologies": "Jun 2023 — Jul 2026 · Remoto"},
}

# data.js doesn't list TanStack Query for Quadrant yet — surfacing it here
# because the posting calls out TanStack experience as a bonus.
STACK = {
    "en": {
        "Quadrant Travel Technologies": "React · Next.js · TypeScript · TanStack Query · Tailwind · Figma · Storybook · Jest/Vitest · Testing Library · Playwright · GitLab CI",
    },
    "es": {
        "Quadrant Travel Technologies": "React · Next.js · TypeScript · TanStack Query · Tailwind · Figma · Storybook · Jest/Vitest · Testing Library · Playwright · GitLab CI",
    },
}

PROFILE = {
    "en": (
        "Senior Full Stack Engineer with 8 years building complex web "
        "applications and SaaS platforms. Comfortable on both sides of the "
        "stack: relational schema design and API layers, plus the "
        "React/TypeScript interfaces built on top of them. Focused on data "
        "integrity, performance, and AI-assisted delivery."
    ),
    "es": (
        "Desarrollador Full Stack senior con 8 años de experiencia "
        "construyendo aplicaciones web complejas y plataformas SaaS. Cómodo "
        "en ambos lados de la pila: diseño de esquemas relacionales y capas "
        "de API, además de las interfaces React/TypeScript que se "
        "construyen sobre ellas. Enfocado en integridad de datos, "
        "rendimiento y desarrollo apoyado en IA."
    ),
}

# Per-company bullet overrides. Company names must match data.js exactly.
BULLETS = {
    "en": {
        "Quadrant Travel Technologies": [
            "Started on the backoffice side before taking sole ownership of the trip documentation frontend — combined ongoing refactoring, maintenance, and feature delivery with a modernization driven by AI-assisted workflows, with no significant regressions.",
            "Pulled the normalization logic out of the views into a dedicated domain layer — consolidating two inconsistent APIs and flattening 18 service variants into a single ViewModel.",
            "Used TanStack Query as more than a fetching layer — invalidated queries by query key after mutations to keep data consistent, and leaned on the query cache itself as a lightweight shared-state layer across components instead of introducing a separate client-state store.",
        ],
        "Interacso · PROCEED for Tecnatom": [
            "Pivoted the platform's data layer from NoSQL to a relational schema (MSSQL) early in the project and designed it from scratch — driven by the client's need for the stronger data guarantees a relational model gives safety-critical inspection records.",
        ],
        "LynxView · PLM for Mustang": [
            "Designed the PostgreSQL schema and wrote versioned, rollback-capable migrations for a new NestJS/TypeORM/GraphQL service, evolving it against live production data; chose TypeORM for its native TypeScript integration.",
        ],
    },
    "es": {
        "Quadrant Travel Technologies": [
            "Trabajé en el backoffice antes de hacerme cargo en solitario del frontend de documentación digital — he combinado refactorización, mantenimiento y entrega continua de features con una modernización apoyada en IA, sin regresiones relevantes.",
            "Extraje la lógica de normalización dispersa en las vistas a una capa de dominio centralizada — unificando dos APIs inconsistentes y aplanando 18 variantes de servicio en un único ViewModel.",
            "Usé TanStack Query como algo más que una capa de fetching — invalidé queries por query key tras las mutaciones para mantener los datos consistentes, y usé la propia caché de queries como una capa ligera de estado compartido entre componentes en lugar de introducir un store de estado cliente aparte.",
        ],
        "Interacso · PROCEED para Tecnatom": [
            "Pivoté la capa de datos de la plataforma, de NoSQL a un esquema relacional (MSSQL), al inicio del proyecto, y lo diseñé desde cero — por la necesidad del cliente de las garantías de datos más sólidas que ofrece un modelo relacional para registros de inspección críticos para la seguridad.",
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
            new_dates = DATES[lang].get(role["company"])
            if new_dates is not None:
                role["dates"] = new_dates
            new_stack = STACK[lang].get(role["company"])
            if new_stack is not None:
                role["stack"] = new_stack

    for lang in ("en", "es"):
        build_cv.build_pdf(tailored, lang, out_dir=OUT_DIR)


if __name__ == "__main__":
    build()
