"""Create self-hosted Japanese font subsets for the characters used by the site.
Run: .venv-tools/bin/python scripts/subset-fonts.py
New characters fall back to system fonts until these subsets are regenerated.
"""
from pathlib import Path
from urllib.request import urlretrieve
from fontTools import subset
from fontTools.ttLib import TTFont
ROOT = Path(__file__).resolve().parents[1]
CACHE = ROOT / 'design/font-sources'
OUT = ROOT / 'public/fonts'
CACHE.mkdir(exist_ok=True, parents=True)
OUT.mkdir(exist_ok=True, parents=True)
SOURCES = {
    'YujiBoku-Regular.ttf': 'https://raw.githubusercontent.com/google/fonts/main/ofl/yujiboku/YujiBoku-Regular.ttf',
    'NotoSansJP.ttf': 'https://raw.githubusercontent.com/google/fonts/main/ofl/notosansjp/NotoSansJP%5Bwght%5D.ttf',
}
for filename, url in SOURCES.items():
    if not (CACHE/filename).exists():
        urlretrieve(url, CACHE/filename)

def make(source, filename, text):
    font = TTFont(CACHE/source)
    options = subset.Options()
    options.flavor = 'woff2'
    options.layout_features = ['*']
    worker = subset.Subsetter(options=options)
    worker.populate(text=text)
    worker.subset(font)
    font.flavor = 'woff2'
    font.save(OUT/filename)
    print(filename, (OUT/filename).stat().st_size, 'bytes')

brush = '創造作墨とピクセル小さな世界好奇心Tinta y píxel'
nav = '日本語'
texts = ''.join(p.read_text() for p in (ROOT/'src').rglob('*') if p.suffix in ('.ts','.tsx'))
body = ''.join(sorted(set(c for c in texts if ord(c) >= 0x3000 and c not in nav)))
make('YujiBoku-Regular.ttf', 'yuji-portfolio.woff2', brush)
make('NotoSansJP.ttf', 'noto-nav.woff2', nav)
make('NotoSansJP.ttf', 'noto-content.woff2', body)

def ranges(text):
    return ','.join(f'U+{ord(c):04X}' for c in sorted(set(text)))
css = '''/* Self-hosted fonts. Regenerate Japanese subsets with scripts/subset-fonts.py. */
@font-face { font-family: 'DM Sans Variable'; font-style: normal; font-weight: 100 1000; font-display: swap; src: url('/fonts/dm-sans-latin.woff2') format('woff2'); }
@font-face { font-family: 'IBM Plex Mono'; font-style: normal; font-weight: 400; font-display: swap; src: url('/fonts/ibm-plex-mono-latin.woff2') format('woff2'); }
'''
for family,filename,weight,chars in [
    ('Yuji Boku','yuji-portfolio.woff2','400',brush),
    ('Noto Sans JP Variable','noto-nav.woff2','100 900',nav),
    ('Noto Sans JP Variable','noto-content.woff2','100 900',body),
]:
    css += f"@font-face {{ font-family: '{family}'; font-style: normal; font-weight: {weight}; font-display: swap; src: url('/fonts/{filename}') format('woff2'); unicode-range: {ranges(chars)}; }}\n"
(ROOT/'src/app/fonts.css').write_text(css)
