"""
Two Spanish-only CVs sent through friends, with no specific job posting:

- unikal: Unikal Tech Partners, a Spanish IT consultancy group (~800
  people, buy&build). Development sits in its "Innovación Digital" line;
  QualitaHUB, the group company doing custom web development, works with
  a broad stack (React, Angular, Vue, Node, Java, .NET, SQL Server...).
  A consultancy staffs people onto client projects by matching keywords,
  so this version widens the title to Full Stack, adds a grouped
  "Tecnologías" block to the sidebar and stresses work for end clients
  across very different sectors. Nothing is listed that Alberto can't
  defend (see SKILL_NOTES in experience.js: no Angular, Azure, Java,
  Kotlin).

- partner_ms: a .NET developer role at a Microsoft partner. Alberto's .NET
  experience is ~7 years old (Swiss4ward internship, C# web app; VB.NET
  work for Ibergest at LynxView). It is presented as an early
  foundation next to the recent SQL Server and Word plugin work, never as
  current .NET expertise.

Both add the Swiss4ward internship, which the public CV leaves out, and
mention that Realizon was worked entirely in English.

Usage: uv run --with reportlab python3 scripts/tailored/consultoras_unikal_partner_ms.py
Output: pdf/tailored/unikal/ and pdf/tailored/partner-ms-dotnet/ (gitignored)
"""
import json
import sys
from pathlib import Path

from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas

REPO = Path(__file__).parent.parent.parent
sys.path.insert(0, str(REPO / "scripts"))
import build_cv  # noqa: E402

LANG = "es"

QUADRANT = "Quadrant Travel Technologies"
REALIZON = "Realizon · Marketplace de consultas para Bauer Media"
INTERACSO = "Interacso · PROCEED para Tecnatom"
LYNXVIEW = "LynxView · PLM para Mustang"

SWISS4WARD = {
    "title": "Desarrollador en prácticas",
    "company": "Swiss4ward · Derma2go",
    "dates": "2018",
    "project": "Plataforma web de teledermatología: diagnóstico online de problemas de piel por dermatólogos, con pago por consulta. Desarrollada en C# / .NET.",
    "bullets": [],
    "stack": "C# · .NET",
    "integrations": "",
}

QUADRANT_PROJECT = "SaaS para agencias de viajes y tour operadores. Tras empezar en el backoffice, asumí en solitario el frontend de documentación digital y su modernización con IA."

INTERACSO_PROJECT = "Plataforma crítica que digitaliza en tablet las rondas de inspección de centrales nucleares. Tech lead de un equipo de tres."

LYNX_PROJECT = "PLM para los equipos de diseño de Mustang. En paralelo, desarrollo intermitente en las apps de gestión VB.NET de Ibergest."

REALIZON_PROJECT = "Telefonía bilateral con detección de presencia y facturación por minuto. Proyecto íntegramente en inglés con cliente alemán."

B_QUADRANT_DOMAIN = "Extraje la lógica de normalización dispersa en las vistas a una capa de dominio centralizada — unificando dos APIs inconsistentes y aplanando 18 variantes de servicio en un único ViewModel."
B_QUADRANT_TESTING = "Introduje testing de regresión visual desde cero (44 specs Playwright/Storybook en Docker); los tests unitarios pasaron de 9 specs Jest a 115 Vitest / 842 tests, con 88,9% de líneas y 90,4% de ramas."

B_INTERACSO_SQL = "Diseñé desde cero el esquema relacional en SQL Server, sustituyendo NoSQL por las garantías de datos que exigían las inspecciones."
B_INTERACSO_REALTIME = "Arquitectura offline-first (Dexie + sincronización diferida) y colaboración en tiempo real con Redis entre instancias del backend."
B_INTERACSO_AUDIT = "Implementé un log de eventos en base de datos con cada acción de usuario: trazabilidad completa exigida por la normativa nuclear."
B_INTERACSO_WORD = "Colaboré en un plugin de Microsoft Word que exporta plantillas de inspección a HTML, cubriendo las ausencias del responsable."

B_LYNX_MIGRATIONS = "Diseñé el esquema PostgreSQL y sus migraciones versionadas con rollback para un servicio NestJS/TypeORM, sobre datos en producción."

STACK_QUADRANT = "React · Next.js · TypeScript · TanStack Query · Tailwind · Storybook · Jest/Vitest · Testing Library · Playwright · Docker · GitLab CI"
STACK_INTERACSO = "Node.js · Next.js · TypeScript · React · Redux · Redis · SQL Server · MongoDB"
STACK_LYNX = "Node.js · TypeScript · NestJS · TypeORM · GraphQL · Vue 2 · PostgreSQL · VB.NET"

VARIANTS = {
    "unikal": {
        "role": "Desarrollador Full Stack Senior",
        "profile": (
            "Desarrollador Full Stack senior con 8 años de experiencia "
            "construyendo aplicaciones web para clientes de sectores muy "
            "distintos: energía nuclear, moda, medios y turismo. "
            "Especializado en React y TypeScript, con backend en Node.js y "
            "bases de datos SQL y NoSQL. Acostumbrado a entrar en código "
            "existente, modernizarlo sin regresiones y dejarlo testeado y "
            "documentado."
        ),
        "bullets": {
            QUADRANT: [B_QUADRANT_DOMAIN, B_QUADRANT_TESTING],
            INTERACSO: [B_INTERACSO_SQL, B_INTERACSO_REALTIME, B_INTERACSO_AUDIT],
            LYNXVIEW: [B_LYNX_MIGRATIONS],
        },
        "skills": [
            ("Frontend", "React · Next.js · Vue · TypeScript · Redux · TanStack Query · Tailwind"),
            ("Backend", "Node.js · NestJS · GraphQL · Cloudflare Workers"),
            ("Bases de datos", "SQL Server · PostgreSQL · MongoDB · Redis"),
            ("Calidad", "Vitest · Jest · Playwright · Storybook · Testing Library"),
            ("DevOps", "Docker · GitLab CI"),
            ("Base en .NET", "C# · .NET · VB.NET"),
        ],
        "out_dir": "unikal",
    },
    "partner_ms": {
        "role": "Desarrollador Full Stack Senior",
        "profile": (
            "Desarrollador Full Stack senior con 8 años de experiencia "
            "construyendo aplicaciones web complejas, de plataformas SaaS a "
            "sistemas críticos para centrales nucleares. Especializado en "
            "TypeScript, React y Node.js, con experiencia en SQL Server y "
            "base en C#/.NET y VB.NET de mis inicios. Enfocado en "
            "arquitectura, testing y documentación."
        ),
        "bullets": {
            QUADRANT: [B_QUADRANT_DOMAIN, B_QUADRANT_TESTING],
            INTERACSO: [B_INTERACSO_SQL, B_INTERACSO_REALTIME, B_INTERACSO_WORD],
            LYNXVIEW: [B_LYNX_MIGRATIONS],
        },
        "skills": [
            ("Ecosistema Microsoft", "C# · .NET · VB.NET · SQL Server · plugin de Word"),
            ("Frontend", "React · Next.js · Vue · TypeScript · Redux · TanStack Query"),
            ("Backend", "Node.js · NestJS · GraphQL · Cloudflare Workers"),
            ("Otras bases de datos", "PostgreSQL · MongoDB · Redis"),
            ("Calidad", "Vitest · Jest · Playwright · Storybook"),
            ("DevOps", "Docker · GitLab CI"),
        ],
        "out_dir": "partner-ms-dotnet",
    },
}


def tailor(data: dict, variant: dict) -> dict:
    d = json.loads(json.dumps(data[LANG]))  # deep copy
    d["role"] = variant["role"]
    d["profile"] = variant["profile"]
    for role in d["experience"]:
        company = role["company"]
        if company in variant["bullets"]:
            role["bullets"] = variant["bullets"][company]
        if company == QUADRANT:
            role["project"] = QUADRANT_PROJECT
            role["stack"] = STACK_QUADRANT
            role["integrations"] = ""
        elif company == REALIZON:
            role["project"] = REALIZON_PROJECT
        elif company == INTERACSO:
            role["project"] = INTERACSO_PROJECT
            role["stack"] = STACK_INTERACSO
        elif company == LYNXVIEW:
            role["project"] = LYNX_PROJECT
            role["stack"] = STACK_LYNX
    d["experience"].append(SWISS4WARD)
    return d


def draw_skills(c, skills, y):
    x, w = build_cv.SIDEBAR_X, build_cv.SIDEBAR_W
    y -= 6
    y = build_cv.section_title(c, "Tecnologías", x, y, w)
    for label, items in skills:
        c.setFont(build_cv.F_BOLD, 8.6)
        c.setFillColor(build_cv.COLOR_NAME)
        c.drawString(x, y, label)
        y -= 11.5
        y = build_cv.draw_paragraph(c, items, x, y, w, size=8.6, leading=11.5)
        y -= 5
    return y


def build_pdf(d: dict, skills, out_dir: Path):
    # Same as build_cv.build_pdf, plus the "Tecnologías" sidebar block.
    out_dir.mkdir(parents=True, exist_ok=True)
    out_path = out_dir / build_cv.PDF_NAMES[LANG]
    c = canvas.Canvas(str(out_path), pagesize=A4)
    c.setTitle(f"{d['name']} — Currículum")
    c.setAuthor(d["name"])

    y_top = build_cv.PAGE_H - build_cv.MARGIN_TOP
    sep_x = build_cv.MAIN_X - build_cv.GAP / 2
    c.setStrokeColor(build_cv.COLOR_RULE)
    c.setLineWidth(0.5)
    c.line(sep_x, build_cv.MARGIN_TOP, sep_x, build_cv.PAGE_H - build_cv.MARGIN_TOP)

    sidebar_y = draw_skills(c, skills, build_cv.draw_sidebar(c, d, y_top))
    main_y = build_cv.draw_main(c, d, y_top)

    c.showPage()
    c.save()
    print(f"Wrote {out_path}  (bottom y: sidebar {sidebar_y:.0f}, main {main_y:.0f}, margin {build_cv.MARGIN_TOP})")


if __name__ == "__main__":
    data = build_cv.extract_data(REPO / "data.js")
    for variant in VARIANTS.values():
        build_pdf(tailor(data, variant), variant["skills"],
                  REPO / "pdf" / "tailored" / variant["out_dir"])
