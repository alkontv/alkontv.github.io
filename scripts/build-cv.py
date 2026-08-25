# -*- coding: utf-8 -*-
"""
Собирает резюме Alan (RU и EN) в public/Alan-CV-{ru,en}.pdf.

Контент берётся из JSON, выгруженного scripts/dump-content.ts, — то есть
из того же источника, что и сайт. Гонораров в резюме нет по той же причине,
что и на сайте: сумма даёт читателю якорь на прайс.

Запуск:
    npx tsx scripts/dump-content.ts > /tmp/content.json
    python3 scripts/build-cv.py /tmp/content.json
"""
import json
import sys
from pathlib import Path

from reportlab.lib.colors import HexColor
from reportlab.lib.pagesizes import A4
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas

FONTS = Path("/System/Library/Fonts/Supplemental")
pdfmetrics.registerFont(TTFont("Body", FONTS / "Arial.ttf"))
pdfmetrics.registerFont(TTFont("Body-Bold", FONTS / "Arial Bold.ttf"))

W, H = A4
SIDEBAR = 196
DARK = HexColor("#0b1120")
ACCENT = HexColor("#0690d4")
WHITE = HexColor("#ffffff")
MUTED = HexColor("#9fb0c4")
INK = HexColor("#111827")
INK_SOFT = HexColor("#4b5563")

CONTACTS = {
    "ru": [
        ("Telegram", "@jdm_as_fuck"),
        ("GitHub", "github.com/alkontv"),
        ("Портфолио", "alkontv.github.io/cases"),
    ],
    "en": [
        ("Telegram", "@jdm_as_fuck"),
        ("GitHub", "github.com/alkontv"),
        ("Portfolio", "alkontv.github.io/cases"),
    ],
}

STACK = {
    "ru": [
        ("MOBILE", "Flutter · FlutterFlow"),
        ("ЯЗЫКИ", "TypeScript · JavaScript · Python · Dart · Go"),
        ("ВЕБ", "React · Next.js · Node.js"),
        ("ДАННЫЕ", "PostgreSQL · Supabase · Firebase · Redis"),
        ("ИНФРАСТРУКТУРА", "Docker · Nginx · VPS · миграции · мониторинг"),
        ("ПЛАТЕЖИ", "эквайринг · подписки · эскроу · крипта"),
    ],
    "en": [
        ("MOBILE", "Flutter · FlutterFlow"),
        ("LANGUAGES", "TypeScript · JavaScript · Python · Dart · Go"),
        ("WEB", "React · Next.js · Node.js"),
        ("DATA", "PostgreSQL · Supabase · Firebase · Redis"),
        ("INFRASTRUCTURE", "Docker · Nginx · VPS · migrations · monitoring"),
        ("PAYMENTS", "acquiring · subscriptions · escrow · crypto"),
    ],
}

EXTRA = {
    "ru": [
        "Менторство начинающих разработчиков.",
        "Предпринимательский бэкграунд: считаю юнит-экономику и понимаю монетизацию.",
    ],
    "en": [
        "Mentoring junior developers.",
        "Entrepreneurial background: I read unit economics and understand monetisation.",
    ],
}

SECTIONS = {
    "ru": {"about": "О СЕБЕ", "exp": "ОПЫТ", "projects": "ИЗБРАННЫЕ ПРОЕКТЫ",
           "skills": "ЧТО УМЕЮ", "extra": "ДОПОЛНИТЕЛЬНО",
           "contacts": "КОНТАКТЫ", "stack": "СТЕК"},
    "en": {"about": "ABOUT", "exp": "EXPERIENCE", "projects": "SELECTED PROJECTS",
           "skills": "WHAT I DO", "extra": "ALSO",
           "contacts": "CONTACTS", "stack": "STACK"},
}

# «кейсов ниже» осмысленно на странице, но не в резюме.
CASES_LABEL = {"ru": "кейсов в портфолио", "en": "cases in portfolio"}

# На сайте лид — двухстрочный слоган; в резюме нужна должность одной строкой.
ROLE_TITLE = {"ru": "Разработчик полного цикла", "en": "Full-cycle developer"}


def wrap(c, text, font, size, width):
    """Разбивает строку по ширине — reportlab сам этого не делает."""
    words, lines, cur = text.split(), [], ""
    for w in words:
        probe = f"{cur} {w}".strip()
        if c.stringWidth(probe, font, size) <= width:
            cur = probe
        else:
            if cur:
                lines.append(cur)
            cur = w
    if cur:
        lines.append(cur)
    return lines


def draw(c, text, x, y, font="Body", size=9, color=INK, leading=12, width=None):
    c.setFont(font, size)
    c.setFillColor(color)
    if width is None:
        c.drawString(x, y, text)
        return y - leading
    for line in wrap(c, text, font, size, width):
        c.drawString(x, y, line)
        y -= leading
    return y


def build(data, lang, out_path):
    c = canvas.Canvas(str(out_path), pagesize=A4)
    copy = data["copy"][lang]
    s = SECTIONS[lang]
    stats = data["stats"]

    c.setTitle("Alan — " + ROLE_TITLE[lang])
    c.setAuthor("Alan")

    # --- тёмная колонка ---
    c.setFillColor(DARK)
    c.rect(0, 0, SIDEBAR, H, stroke=0, fill=1)

    x, y = 22, H - 56
    c.setFont("Body-Bold", 27)
    c.setFillColor(WHITE)
    c.drawString(x, y, "ALAN")
    y -= 20
    y = draw(c, ROLE_TITLE[lang].upper(), x, y, "Body", 7.6, ACCENT, 11, SIDEBAR - 40)

    y -= 18
    y = draw(c, s["contacts"], x, y, "Body", 7.5, MUTED, 14)
    c.setStrokeColor(HexColor("#1f2a3d"))
    c.line(x, y + 5, SIDEBAR - 22, y + 5)
    y -= 6
    for label, value in CONTACTS[lang]:
        y = draw(c, label, x, y, "Body", 7, MUTED, 10)
        y = draw(c, value, x, y, "Body-Bold", 8.2, WHITE, 15, SIDEBAR - 40)

    y -= 10
    y = draw(c, s["stack"], x, y, "Body", 7.5, MUTED, 14)
    c.line(x, y + 5, SIDEBAR - 22, y + 5)
    y -= 6
    for label, value in STACK[lang]:
        y = draw(c, label, x, y, "Body", 6.6, ACCENT, 10)
        y = draw(c, value, x, y, "Body", 7.8, HexColor("#e6edf5"), 10, SIDEBAR - 40)
        y -= 5

    # --- светлая колонка ---
    x = SIDEBAR + 30
    colw = W - x - 34
    y = H - 58

    y = draw(c, s["about"], x, y, "Body", 7.5, ACCENT, 14)
    y = draw(c, copy["sublead"], x, y, "Body", 9, INK_SOFT, 13, colw)

    y -= 12
    figures = [
        (f"{stats['apps']}+", copy["statApps"]),
        (str(data["casesTotal"]), CASES_LABEL[lang]),
        (str(stats["markets"]), copy["statMarkets"]),
        (str(stats["sinceYear"]), copy["statSince"]),
    ]
    fx = x
    step = colw / 4
    for value, label in figures:
        c.setFont("Body-Bold", 13)
        c.setFillColor(INK)
        c.drawString(fx, y, value)
        c.setFont("Body", 6.2)
        c.setFillColor(INK_SOFT)
        for i, line in enumerate(wrap(c, label.upper(), "Body", 6.2, step - 8)[:2]):
            c.drawString(fx, y - 10 - i * 7.5, line)
        fx += step
    y -= 34

    y = draw(c, s["exp"], x, y, "Body", 7.5, ACCENT, 14)
    for e in data["timeline"]:
        c.setFont("Body-Bold", 8.4)
        c.setFillColor(ACCENT)
        c.drawString(x, y, e["year"])
        c.setFont("Body-Bold", 9)
        c.setFillColor(INK)
        c.drawString(x + 40, y, e["title"][lang])
        y -= 11
        y = draw(c, e["subtitle"][lang], x + 40, y, "Body", 8.2, INK_SOFT, 11, colw - 40)
        y -= 2

    y -= 8
    y = draw(c, s["projects"], x, y, "Body", 7.5, ACCENT, 14)
    for p in data["featured"]:
        c.setFont("Body-Bold", 9)
        c.setFillColor(INK)
        c.drawString(x, y, p["name"][lang])
        c.setFont("Body", 6.6)
        c.setFillColor(HexColor("#9aa3af"))
        c.drawString(x + c.stringWidth(p["name"][lang], "Body-Bold", 9) + 7, y, p["industry"][lang].upper())
        y -= 10
        y = draw(c, p["tagline"][lang], x, y, "Body", 8.2, INK_SOFT, 10.5, colw)
        y -= 3

    y -= 6
    y = draw(c, s["skills"], x, y, "Body", 7.5, ACCENT, 14)
    for group in data["skills"]:
        c.setFont("Body-Bold", 8.2)
        c.setFillColor(INK)
        c.drawString(x, y, group["title"][lang])
        y -= 9.5
        # В резюме — по два пункта на группу: это выжимка, а не каталог.
        items = " · ".join(i[lang] for i in group["items"][:2])
        y = draw(c, items, x, y, "Body", 7.6, INK_SOFT, 9.2, colw)
        y -= 1.5

    y -= 6
    y = draw(c, s["extra"], x, y, "Body", 7.5, ACCENT, 14)
    for line in copy["resumeExtraItems"]:
        y = draw(c, line, x, y, "Body", 8.4, INK_SOFT, 11, colw)
        y -= 2

    draw(c, copy["anonNote"], x, 44, "Body", 6.6, HexColor("#9aa3af"), 8.5, colw)

    c.showPage()
    c.save()
    return y


if __name__ == "__main__":
    data = json.load(open(sys.argv[1], encoding="utf-8"))
    public = Path(__file__).resolve().parent.parent / "public"
    failed = []
    for lang in ("ru", "en"):
        rest = build(data, lang, public / f"Alan-CV-{lang}.pdf")
        slack = rest - 60
        print(f"Alan-CV-{lang}.pdf собран, запас по низу страницы: {slack:.0f}pt")
        if slack < 0:
            failed.append(f"{lang}: контент вылезает за нижний край на {-slack:.0f}pt")
    if failed:
        sys.exit("Резюме не помещается на страницу:\n  " + "\n  ".join(failed))
