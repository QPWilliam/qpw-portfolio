"""Create equivalent Spanish, English and Japanese public CVs from cv-content.json.
Use the bundled Python runtime (ReportLab + pypdf). Japanese requires the static
Noto Sans JP fonts created by scripts/prepare-cv-fonts.py (fonttools).
"""
import json
from pathlib import Path
from shutil import copyfile
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Paragraph, PageBreak
from reportlab.lib.pagesizes import A4
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from pypdf import PdfReader, PdfWriter
from pypdf.generic import NameObject, TextStringObject

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'public/cv'
DATA = json.loads((ROOT / 'scripts/cv-content.json').read_text())
INK, RED, GRAY = [colors.HexColor(value) for value in ['#20211f', '#b94035', '#62645e']]
for name, filename in [('NotoCV', 'NotoSansJP-CV-Regular.ttf'), ('NotoCVBold', 'NotoSansJP-CV-Semibold.ttf')]:
    source = ROOT / 'design/font-sources' / filename
    if not source.exists():
        raise SystemExit('Missing Japanese fonts. Run scripts/prepare-cv-fonts.py with fonttools first.')
    pdfmetrics.registerFont(TTFont(name, str(source)))
pdfmetrics.registerFontFamily('NotoCV', normal='NotoCV', bold='NotoCVBold', italic='NotoCV', boldItalic='NotoCVBold')

def build(locale, content):
    japanese = locale == 'ja'
    regular, bold = ('NotoCV', 'NotoCVBold') if japanese else ('Helvetica', 'Helvetica-Bold')
    styles = getSampleStyleSheet()
    common = dict(wordWrap='CJK' if japanese else None)
    definitions = [
        ('NameCV', bold, 26 if japanese else 29, 36, INK, 0, 9),
        ('RoleCV', regular, 12, 17, RED, 0, 12),
        ('SectionCV', bold, 12, 17, RED, 18, 9),
        ('BodyCV', regular, 9.3 if japanese else 9.5, 14.5, INK, 0, 7),
        ('MetaCV', regular, 8.5, 12, GRAY, 0, 6),
        ('JobCV', bold, 10.5, 15.5, INK, 9, 3),
    ]
    for name, font, size, leading, color, before, after in definitions:
        styles.add(ParagraphStyle(name=name, fontName=font, fontSize=size, leading=leading, textColor=color, spaceBefore=before, spaceAfter=after, keepWithNext=name in ('SectionCV', 'JobCV', 'MetaCV'), **common))
    story = [PageBreak() if item.get('break') else Paragraph(item['text'], styles[item['style']]) for item in content['items']]
    def footer(canvas, doc):
        canvas.setStrokeColor(colors.HexColor('#d8d8ce'))
        canvas.line(45, 43, A4[0] - 45, 43)
        canvas.setFont(regular, 8)
        canvas.setFillColor(GRAY)
        canvas.drawString(45, 29, content['footer'])
        canvas.drawRightString(A4[0] - 45, 29, str(doc.page))
    target = OUT / f'william-burrion-{locale}.pdf'
    SimpleDocTemplate(str(target), pagesize=A4, rightMargin=45, leftMargin=45, topMargin=43, bottomMargin=60, title=content['title'], author='William Burrión').build(story, onFirstPage=footer, onLaterPages=footer)
    reader = PdfReader(target)
    if len(reader.pages) != 2:
        raise RuntimeError(f'{locale}: expected 2 pages, got {len(reader.pages)}')
    writer = PdfWriter(clone_from=reader)
    writer.root_object[NameObject('/Lang')] = TextStringObject(locale)
    with target.open('wb') as output:
        writer.write(output)
    print(f'{target}: 2 pages, {target.stat().st_size:,} bytes')

OUT.mkdir(exist_ok=True, parents=True)
for locale, content in DATA.items():
    build(locale, content)
# Preserve the existing Spanish URL for previously shared links.
copyfile(OUT / 'william-burrion-es.pdf', OUT / 'william-burrion.pdf')
