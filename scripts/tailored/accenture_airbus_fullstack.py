"""
Tailored CV for Accenture — Full Stack (60-70% backend / 30-40% frontend),
project for Airbus: managing accreditations for aircraft crews. Heavily
legal/bureaucratic, with rules that differ per country, many API
integrations, React without Next, Jest, running on AWS.

Referral by a colleague, no public posting — requirements as relayed by
him (2026-09-22). Spanish only, as requested.

How this is angled:

- Backend first. The public CV leads "Senior Frontend Engineer"; this one
  leads full-stack with the backend weight visible (MSSQL and PostgreSQL
  schema design, Node.js APIs, Redis architecture, NestJS/TypeORM).
- The regulated/bureaucratic domain is the strongest card, and it's
  Interacso: nuclear plant inspections, where an event-log audit table of
  every action was a hard regulatory requirement, and MSSQL was chosen
  over NoSQL for data guarantees on safety-critical records. That is the
  closest thing in Alberto's history to "muy legal y con burocracia", and
  it's all confirmed in experience.js.
- "Distintas casuísticas dependiendo del país" has no literal equivalent
  in his history. The honest analogue is Quadrant's normalization layer —
  two inconsistent APIs and 18 service variants flattened into one
  ViewModel. It's kept as the domain-modeling bullet without ever
  claiming per-country legal rules.
- React without Next: Realizon is the only place with professional
  React-and-nothing-else experience (the platform ran at the edge on
  Cloudflare Workers, which ruled Next out — confirmed 2026-09-22). That
  entry had no bullets in data.js; it gets that one, which also carries
  the heaviest integration list (Twilio, PayPal, Sendinblue).
- Jest is named explicitly in the Quadrant testing bullet.

AWS is NOT mentioned anywhere, deliberately. Alberto has no AWS
experience of any kind (confirmed 2026-09-22, recorded in experience.js).
The cloud/infra experience that does exist — Cloudflare Workers, Docker,
Redis, a backend across several pod instances — appears on its own terms
in the stack lines and bullets. Don't add an "AWS" line in a future edit,
and don't paper over the gap with "cloud-agnostic" filler: it's a real
gap, the rest of the CV is strong enough to carry the application, and
it's better raised in conversation than fudged on paper.

Realizon's backend (per-minute billing, presence detection) stays absent:
Alberto doesn't recall the specifics and no bullet was invented for it.

Dropping the online-CV line needs the optional-website support in
build_cv.py (PR #8, branch feat/optional-website-contact). Once that is on
main this runs as-is.

Usage: uv run --with reportlab python3 scripts/tailored/accenture_airbus_fullstack.py
Output: pdf/tailored/accenture-airbus-fullstack/ (gitignored, not committed)
"""
import json
import sys
from pathlib import Path

REPO = Path(__file__).parent.parent.parent
sys.path.insert(0, str(REPO / "scripts"))
import build_cv  # noqa: E402

OUT_DIR = REPO / "pdf" / "tailored" / "accenture-airbus-fullstack"
LANGS = ("es",)

ROLE = {"es": "Desarrollador Full Stack Senior"}

PROFILE = {
    "es": (
        "Desarrollador Full Stack senior con 8 años de experiencia: APIs en "
        "Node.js y TypeScript, diseño de esquemas relacionales, "
        "integraciones con sistemas de terceros y frontend en React. "
        "Experiencia en dominios regulados y críticos, y en unificar reglas "
        "de negocio dispersas en un modelo único, con el testing como parte "
        "del trabajo."
    ),
}

# Contact overrides for this application: Alicante rather than Torrevieja,
# and no link to the public online CV — that version leads "Senior Frontend
# Engineer", which works against a backend-weighted application.
CONTACT = {
    "es": {"location": "Alicante, España · Remoto · CET"},
}
DROP_CONTACT = ("website",)

# experience.js confirms TanStack Query at Quadrant and NestJS/TypeORM at
# LynxView; data.js's public one-pager omits both. Realizon's line makes
# explicit that the React there ran with no framework on top.
STACK = {
    "es": {
        "Quadrant Travel Technologies": "React · Next.js · TypeScript · TanStack Query · Tailwind · Storybook · Jest/Vitest · Testing Library · Playwright · GitLab CI",
        "Realizon · Marketplace de consultas para Bauer Media": "Node.js · TypeScript · Cloudflare Workers · Cloudflare KV/DO · React (sin framework)",
        "Interacso · PROCEED para Tecnatom": "Node.js · TypeScript · React · Next.js · Redux · Redis · MongoDB · MSSQL",
        "LynxView · PLM para Mustang": "Node.js · TypeScript · NestJS · TypeORM · GraphQL · PostgreSQL",
    },
}

BULLETS = {
    "es": {
        "Quadrant Travel Technologies": [
            "Unifiqué dos APIs inconsistentes y 18 variantes de servicio en un único ViewModel, extrayendo la normalización a una capa de dominio.",
            "Introduje regresión visual desde cero (44 specs Playwright/Storybook) y pasé los unitarios de 9 specs Jest a 842 tests, con 88,9% de líneas.",
        ],
        "Realizon · Marketplace de consultas para Bauer Media": [
            "Trabajé en una SPA de React sin meta-framework: la plataforma corría en el edge sobre Cloudflare Workers y Next no era una opción.",
        ],
        "Interacso · PROCEED para Tecnatom": [
            "Añadí una tabla de log de eventos que registraba cada acción de la aplicación — rastro de auditoría completo de quién hizo qué y cuándo, requisito normativo indispensable en este tipo de proyecto.",
            "Pivoté la capa de datos de NoSQL a un esquema relacional (MSSQL) y lo diseñé desde cero — garantías más sólidas para registros de inspección críticos.",
            "Diseñé una arquitectura offline-first (Dexie + sincronización diferida) y una capa de colaboración en tiempo real con Redis que escala entre instancias del backend.",
        ],
        "LynxView · PLM para Mustang": [
            "Diseñé el esquema de PostgreSQL y las migraciones versionadas con rollback de un servicio NestJS/TypeORM/GraphQL en producción.",
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
        for key in DROP_CONTACT:
            d["contact"].pop(key, None)
        for role in d["experience"]:
            overrides = BULLETS[lang].get(role["company"])
            if overrides is not None:
                role["bullets"] = overrides
            new_stack = STACK[lang].get(role["company"])
            if new_stack is not None:
                role["stack"] = new_stack
        build_cv.build_pdf(tailored, lang, out_dir=OUT_DIR)


if __name__ == "__main__":
    build()
