"""Prepare embedded Japanese CV fonts. Run with the fonttools Python environment.
Run scripts/subset-fonts.py first to cache the licensed Google Fonts source.
"""
from pathlib import Path
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont

root = Path(__file__).resolve().parents[1] / 'design/font-sources'
for name, weight in [('NotoSansJP-CV-Regular.ttf', 400), ('NotoSansJP-CV-Semibold.ttf', 600)]:
    font = TTFont(root / 'NotoSansJP.ttf')
    instantiateVariableFont(font, {'wght': weight}, inplace=True)
    font.save(root / name)
    print(name)
