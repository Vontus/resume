"""
Builds EN and ES PDF resumes by reading content from index.html.
Usage: python build_cv.py [--lang en|es]   (default: builds both)
"""
import re
import json
import sys
from pathlib import Path
from reportlab.lib.pagesizes import A4
from reportlab.lib.colors import HexColor
from reportlab.pdfgen import canvas

REPO = Path(__file__).parent.parent
PDF_DIR = REPO / "pdf"

PAGE_W, PAGE_H = A4
MARGIN_X = 46
MARGIN_TOP = 56

INNER_W = PAGE_W - 2 * MARGIN_X
GAP = 26
SIDEBAR_W = 168
MAIN_W = INNER_W - SIDEBAR_W - GAP

SIDEBAR_X = MARGIN_X
MAIN_X = MARGIN_X + SIDEBAR_W + GAP

COLOR_NAME = HexColor("#0F1115")
COLOR_TEXT = HexColor("#2A2F36")
COLOR_MUTED = HexColor("#7A8089")
COLOR_ACCENT = HexColor("#1B3A5C")
COLOR_RULE = HexColor("#E6E8EB")

F_REG = "Helvetica"
F_BOLD = "Helvetica-Bold"
F_ITAL = "Helvetica-Oblique"

PDF_NAMES = {
    "en": "AlbertoMartinezBerna_Resume_EN.pdf",
    "es": "AlbertoMartinezBerna_Resume_ES.pdf",
}


def extract_data(data_path: Path) -> dict:
    """Parse the DATA JS object literal from data.js."""
    text = data_path.read_text(encoding="utf-8")
    marker = "const DATA = {"
    start = text.find(marker) + len(marker) - 1
    if start < 0:
        raise ValueError("Could not find 'const DATA = {' in data.js")
    depth, end = 0, start
    for i, ch in enumerate(text[start:], start):
        if ch == "{":
            depth += 1
        elif ch == "}":
            depth -= 1
            if depth == 0:
                end = i
                break
    js = text[start : end + 1]
    # Quote unquoted JS identifier keys to produce valid JSON
    json_str = re.sub(r'(?<!["\w])([a-zA-Z_]\w*)(?=\s*:)', r'"\1"', js)
    return json.loads(json_str)


# ---------- helpers

def wrap_text(c, text, font, size, max_w):
    c.setFont(font, size)
    words = text.split()
    lines, cur = [], ""
    for w in words:
        test = (cur + " " + w).strip()
        if c.stringWidth(test, font, size) <= max_w:
            cur = test
        else:
            if cur:
                lines.append(cur)
            cur = w
    if cur:
        lines.append(cur)
    return lines


def draw_paragraph(c, text, x, y, max_w, font=F_REG, size=9.5, leading=13.5,
                   color=COLOR_TEXT):
    c.setFillColor(color)
    for line in wrap_text(c, text, font, size, max_w):
        c.setFont(font, size)
        c.drawString(x, y, line)
        y -= leading
    return y


def section_title(c, title, x, y, width):
    c.setFillColor(COLOR_ACCENT)
    c.setFont(F_BOLD, 8.5)
    c.drawString(x, y, title.upper())
    text_w = c.stringWidth(title.upper(), F_BOLD, 8.5)
    c.setStrokeColor(COLOR_ACCENT)
    c.setLineWidth(0.8)
    c.line(x, y - 4, x + text_w, y - 4)
    c.setStrokeColor(COLOR_RULE)
    c.setLineWidth(0.5)
    c.line(x + text_w + 6, y - 4, x + width, y - 4)
    return y - 18


def main_column_title(c, title, x, y, width):
    c.setFillColor(COLOR_NAME)
    c.setFont(F_BOLD, 13)
    c.drawString(x, y, title)
    c.setStrokeColor(COLOR_ACCENT)
    c.setLineWidth(1.0)
    c.line(x, y - 6, x + width, y - 6)
    return y - 22


def role_separator(c, x, y, width):
    c.setStrokeColor(COLOR_RULE)
    c.setLineWidth(0.5)
    c.line(x, y, x + width, y)


# ---------- experience renderer

def draw_role(c, role, company, dates, project, bullets, stack, integrations,
              stack_label, integrations_label, x, w, y):
    c.setFillColor(COLOR_NAME)
    c.setFont(F_BOLD, 10.5)
    c.drawString(x, y, role)
    c.setFont(F_REG, 8.8)
    c.setFillColor(COLOR_MUTED)
    c.drawRightString(x + w, y, dates)
    y -= 13

    if company:
        c.setFont(F_ITAL, 9.2)
        c.setFillColor(COLOR_MUTED)
        c.drawString(x, y, company)
        y -= 12

    if project:
        y = draw_paragraph(c, project, x, y, w, font=F_REG, size=9.4,
                           leading=13.5, color=COLOR_TEXT)
        y -= 4

    if bullets:
        bullet_indent = 12
        bullet_w = w - bullet_indent
        for b in bullets:
            lines = wrap_text(c, b, F_REG, 9.2, bullet_w)
            c.setFont(F_BOLD, 9.4)
            c.setFillColor(COLOR_ACCENT)
            c.drawString(x + 2, y, "·")
            c.setFont(F_REG, 9.2)
            c.setFillColor(COLOR_TEXT)
            for line in lines:
                c.drawString(x + bullet_indent, y, line)
                y -= 13
            y -= 3
        y -= 1

    if stack:
        label = stack_label + "  "
        c.setFont(F_BOLD, 8.5)
        c.setFillColor(COLOR_ACCENT)
        c.drawString(x, y, label)
        label_w = c.stringWidth(label, F_BOLD, 8.5)
        lines = wrap_text(c, stack, F_REG, 8.8, w - label_w)
        c.setFillColor(COLOR_TEXT)
        for i, line in enumerate(lines):
            c.setFont(F_REG, 8.8)
            c.drawString(x + label_w if i == 0 else x, y, line)
            y -= 11.5

    if integrations:
        y -= 1
        label = integrations_label + "  "
        c.setFont(F_BOLD, 8.5)
        c.setFillColor(COLOR_ACCENT)
        c.drawString(x, y, label)
        label_w = c.stringWidth(label, F_BOLD, 8.5)
        lines = wrap_text(c, integrations, F_REG, 8.8, w - label_w)
        c.setFillColor(COLOR_TEXT)
        for i, line in enumerate(lines):
            c.setFont(F_REG, 8.8)
            c.drawString(x + label_w if i == 0 else x, y, line)
            y -= 11.5

    return y - 2


# ---------- sidebar

def draw_sidebar(c, d, y_top):
    x, w = SIDEBAR_X, SIDEBAR_W
    y = y_top

    parts = d["name"].split(" ", 1)
    c.setFillColor(COLOR_NAME)
    c.setFont(F_BOLD, 20)
    c.drawString(x, y, parts[0])
    y -= 22
    if len(parts) > 1:
        c.drawString(x, y, parts[1])
    y -= 18

    c.setFillColor(COLOR_ACCENT)
    c.setFont(F_REG, 11)
    c.drawString(x, y, d["role"])
    y -= 22

    contact = d["contact"]
    y = section_title(c, d["sections"]["contact"], x, y, w)
    c.setFillColor(COLOR_TEXT)
    # (label, url, underline)
    contact_items = [
        (contact["website"]["label"], contact["website"]["url"], True),
    ]
    if contact.get("phone"):
        contact_items.append(
            (contact["phone"], "tel:" + contact["phone"].replace(" ", ""), False)
        )
    contact_items += [
        (contact["email"], "mailto:" + contact["email"], False),
        (contact["location"], None, False),
        (contact["github"]["label"], contact["github"]["url"], False),
        (contact["linkedin"]["label"], contact["linkedin"]["url"], False),
    ]
    for label, url, underline in contact_items:
        size = 8.8 if c.stringWidth(label, F_REG, 8.8) <= w else 8
        c.setFont(F_REG, size)
        c.drawString(x, y, label)
        tw = c.stringWidth(label, F_REG, size)
        if underline:
            c.setStrokeColor(COLOR_TEXT)
            c.setLineWidth(0.6)
            c.line(x, y - 1.5, x + tw, y - 1.5)
        if url:
            c.linkURL(url, (x, y - 2, x + tw, y + size), relative=0)
        y -= 12
    y -= 8

    y = section_title(c, d["sections"]["profile"], x, y, w)
    y = draw_paragraph(c, d["profile"], x, y, w, font=F_REG, size=8.8,
                       leading=12.5, color=COLOR_TEXT)
    y -= 12

    y = section_title(c, d["sections"]["languages"], x, y, w)
    c.setFillColor(COLOR_TEXT)
    for lang in d["languages"]:
        c.setFont(F_BOLD, 9)
        c.drawString(x, y, lang["name"])
        c.setFont(F_REG, 9)
        c.setFillColor(COLOR_MUTED)
        c.drawRightString(x + w, y, lang["level"])
        c.setFillColor(COLOR_TEXT)
        y -= 13
    y -= 8

    edu = d["education"]
    y = section_title(c, d["sections"]["education"], x, y, w)
    c.setFont(F_BOLD, 9)
    c.setFillColor(COLOR_NAME)
    for line in wrap_text(c, edu["title"], F_BOLD, 9, w):
        c.drawString(x, y, line)
        y -= 12
    c.setFont(F_ITAL, 8.6)
    c.setFillColor(COLOR_TEXT)
    c.drawString(x, y, edu["school"])
    y -= 12
    c.setFont(F_REG, 8.4)
    c.setFillColor(COLOR_MUTED)
    c.drawString(x, y, edu["dates"])
    y -= 14

    return y


# ---------- main column

def draw_main(c, d, y_top):
    x, w = MAIN_X, MAIN_W
    y = y_top

    y = main_column_title(c, d["sections"]["experience"], x, y, w)

    for i, r in enumerate(d["experience"]):
        y = draw_role(
            c,
            role=r["title"],
            company=r["company"],
            dates=r["dates"],
            project=r.get("project", ""),
            bullets=r.get("bullets") or [],
            stack=r.get("stack", ""),
            integrations=r.get("integrations", ""),
            stack_label=d["stackLabel"],
            integrations_label=d["integrationsLabel"],
            x=x, w=w, y=y,
        )
        if i < len(d["experience"]) - 1:
            y -= 3
            role_separator(c, x, y, w)
            y -= 16

    return y


# ---------- build

def build_pdf(all_data: dict, lang: str):
    PDF_DIR.mkdir(exist_ok=True)
    out_path = PDF_DIR / PDF_NAMES[lang]
    d = all_data[lang]

    cv = canvas.Canvas(str(out_path), pagesize=A4)
    cv.setTitle(f"{d['name']} — {'Resume' if lang == 'en' else 'Currículum'}")
    cv.setAuthor(d["name"])

    y_top = PAGE_H - MARGIN_TOP

    sep_x = MAIN_X - GAP / 2
    cv.setStrokeColor(COLOR_RULE)
    cv.setLineWidth(0.5)
    cv.line(sep_x, MARGIN_TOP, sep_x, PAGE_H - MARGIN_TOP)

    draw_sidebar(cv, d, y_top)
    draw_main(cv, d, y_top)

    cv.showPage()
    cv.save()
    print(f"Wrote {out_path}")


if __name__ == "__main__":
    data_file = REPO / "data.js"
    all_data = extract_data(data_file)

    langs_to_build = ["en", "es"]
    if "--lang" in sys.argv:
        idx = sys.argv.index("--lang")
        langs_to_build = [sys.argv[idx + 1]]

    for lang in langs_to_build:
        build_pdf(all_data, lang)
