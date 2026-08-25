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
import os
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

# Меняется одним местом при переезде на свой домен.
SITE_HOST = os.environ.get("PORTFOLIO_HOST", "alkontv.github.io")

CONTACTS = {
    "ru": [
        ("Telegram", "@jdm_as_fuck"),
        ("GitHub", "github.com/alkontv"),
        ("Портфолио", f"{SITE_HOST}/cases"),
    ],
    "en": [
        ("Telegram", "@jdm_as_fuck"),
        ("GitHub", "github.com/alkontv"),
        ("Portfolio", f"{SITE_HOST}/cases"),
    ],
}

SECTIONS = {
    "ru": {"about": "О СЕБЕ", "exp": "ОПЫТ РАБОТЫ", "projects": "ИЗБРАННЫЕ ПРОЕКТЫ",
           "skills": "ЧТО УМЕЮ", "extra": "ДОПОЛНИТЕЛЬНО",
           "contacts": "КОНТАКТЫ", "stack": "СТЕК", "soft": "КАК РАБОТАЮ"},
    "en": {"about": "ABOUT", "exp": "WORK EXPERIENCE", "projects": "SELECTED PROJECTS",
           "skills": "WHAT I DO", "extra": "ALSO",
           "contacts": "CONTACTS", "stack": "STACK", "soft": "HOW I WORK"},
}

# На сайте лид — двухстрочный слоган; в резюме нужна должность одной строкой.
ROLE_TITLE = {"ru": "Senior fullstack-разработчик и дизайнер", "en": "Senior fullstack developer and designer"}


def item_name(item, lang):
    """Позиция стека: строка — как есть, объект — по языку."""
    return item if isinstance(item, str) else item[lang]


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
    s_ = SECTIONS[lang]
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
    y = draw(c, s_["contacts"], x, y, "Body", 7.5, MUTED, 14)
    c.setStrokeColor(HexColor("#1f2a3d"))
    c.line(x, y + 5, SIDEBAR - 22, y + 5)
    y -= 6
    for label, value in CONTACTS[lang]:
        y = draw(c, label, x, y, "Body", 7, MUTED, 10)
        y = draw(c, value, x, y, "Body-Bold", 8.2, WHITE, 15, SIDEBAR - 40)

    y -= 10
    y = draw(c, s_["stack"], x, y, "Body", 7.5, MUTED, 14)
    c.line(x, y + 5, SIDEBAR - 22, y + 5)
    y -= 6
    for group in data["stack"]:
        y = draw(c, group["label"][lang].upper(), x, y, "Body", 6.3, ACCENT, 9)
        # В резюме — первые позиции группы: полный список живёт на сайте,
        # а PDF читают придирчивее всего.
        y = draw(c, " · ".join(item_name(i, lang) for i in group["items"][:4]),
                 x, y, "Body", 7.4,
                 HexColor("#e6edf5"), 9, SIDEBAR - 40)
        y -= 2

    # Софт-скиллы уходят в боковую колонку: правая забита под завязку,
    # а здесь до сих пор пустовала нижняя половина.
    y -= 9
    y = draw(c, s_["soft"], x, y, "Body", 7.5, MUTED, 13)
    c.line(x, y + 5, SIDEBAR - 22, y + 5)
    y -= 5
    for item in data["soft"]:
        y = draw(c, item[lang], x, y, "Body", 7, HexColor("#c3cede"), 8.6, SIDEBAR - 40)
        y -= 3.5
    sidebar_rest = y

    # --- светлая колонка ---
    x = SIDEBAR + 30
    colw = W - x - 34
    y = H - 58

    y = draw(c, s_["about"], x, y, "Body", 7.5, ACCENT, 14)
    y = draw(c, copy["sublead"], x, y, "Body", 9, INK_SOFT, 13, colw)

    y -= 12
    figures = [
        (f"{stats['apps']}+", copy["statApps"]),
        (str(stats["markets"]), copy["statMarkets"]),
        (str(stats["sinceYear"]), copy["statSince"]),
    ]
    fx = x
    step = colw / max(len(figures), 1)
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

    y = draw(c, s_["exp"], x, y, "Body", 7.5, ACCENT, 14)
    for job in data["employment"]:
        c.setFont("Body-Bold", 7.6)
        c.setFillColor(ACCENT)
        c.drawString(x, y, job["period"][lang].upper())
        y -= 11
        c.setFont("Body-Bold", 9.6)
        c.setFillColor(INK)
        c.drawString(x, y, job["company"][lang])
        y -= 11
        y = draw(c, job["role"][lang], x, y, "Body", 8.3, INK, 10, colw)
        y = draw(c, job["summary"][lang], x, y, "Body", 7.8, INK_SOFT, 9.2, colw)
        y -= 3

    y -= 8
    y = draw(c, s_["projects"], x, y, "Body", 7.5, ACCENT, 14)
    for p in data["featured"]:
        c.setFont("Body-Bold", 9)
        c.setFillColor(INK)
        c.drawString(x, y, p["name"][lang])
        c.setFont("Body", 6.6)
        c.setFillColor(HexColor("#9aa3af"))
        c.drawString(x + c.stringWidth(p["name"][lang], "Body-Bold", 9) + 7, y, p["industry"][lang].upper())
        y -= 10
        y = draw(c, p["tagline"][lang], x, y, "Body", 8.1, INK_SOFT, 10, colw)
        y -= 2.5

    y -= 6
    y = draw(c, s_["skills"], x, y, "Body", 7.5, ACCENT, 14)
    for group in data["skills"]:
        c.setFont("Body-Bold", 8.2)
        c.setFillColor(INK)
        c.drawString(x, y, group["title"][lang])
        y -= 9.5
        # В резюме — по два пункта на группу: это выжимка, а не каталог.
        items = " · ".join(i[lang] for i in group["items"][:2])
        y = draw(c, items, x, y, "Body", 7.5, INK_SOFT, 8.9, colw)
        y -= 1

    y -= 6
    y = draw(c, s_["extra"], x, y, "Body", 7.5, ACCENT, 14)
    for line in copy["resumeExtraItems"]:
        y = draw(c, line, x, y, "Body", 8.4, INK_SOFT, 11, colw)
        y -= 2

    draw(c, copy["anonNote"], x, 44, "Body", 6.6, HexColor("#9aa3af"), 8.5, colw)

    c.showPage()
    c.save()
    return min(y, sidebar_rest)


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
