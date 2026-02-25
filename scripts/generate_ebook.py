#!/usr/bin/env python3
"""Generate e-book Markdown files from Indonesian Wikipedia sections.

Usage: python3 scripts/generate_ebook.py
"""
import os
import re
import sys
import json
from html.parser import HTMLParser
from urllib.parse import quote

try:
    import requests
except Exception:
    print("This script requires the 'requests' library. Install with: pip install requests")
    sys.exit(1)


class MLStripper(HTMLParser):
    def __init__(self):
        super().__init__()
        self.reset()
        self.fed = []

    def handle_data(self, d):
        self.fed.append(d)

    def get_data(self):
        return ''.join(self.fed)


def strip_tags(html):
    s = MLStripper()
    s.feed(html)
    return s.get_data()


WIKI_API = 'https://id.wikipedia.org/api/rest_v1/page/mobile-sections/'


def fetch_sections(title):
    url = WIKI_API + quote(title)
    r = requests.get(url, timeout=20)
    if r.status_code != 200:
        return None
    return r.json()


def build_markdown(title, data):
    lead = data.get('lead', {})
    lead_html = lead.get('sections', [{}])[0].get('text', '')
    summary = strip_tags(lead_html).strip()

    # Collect up to 6 meaningful sections for chapters
    sections = data.get('remaining', {}).get('sections', [])
    chapters = []
    for sec in sections:
        heading = sec.get('line') or sec.get('heading') or 'Subtopik'
        text = strip_tags(sec.get('text', '') or '')
        if text.strip():
            chapters.append((heading.strip(), text.strip()))
        if len(chapters) >= 6:
            break

    # Ensure at least 5 chapters; if not enough, split long sections
    if len(chapters) < 5:
        joined = '\n\n'.join([c[1] for c in chapters])
        words = joined.split()
        if len(words) > 400:
            # split into 5 roughly equal parts
            n = 5
            per = max(1, len(words)//n)
            new_chaps = []
            for i in range(n):
                part = ' '.join(words[i*per:(i+1)*per])
                new_chaps.append((f'Bagian {i+1}', part))
            chapters = new_chaps

    # If still short, duplicate summary-derived subparts
    while len(chapters) < 5:
        excerpt = ' '.join(summary.split()[:200])
        chapters.append((f'Tambahan {len(chapters)+1}', excerpt))

    # Compose Markdown
    md = []
    md.append('# Judul')
    md.append(title)
    md.append('\n## Ringkasan')
    md.append(summary + '\n')
    md.append('## Daftar Isi')
    for i in range(5):
        md.append(f'{i+1}. Bab {i+1} – {chapters[i][0]}')

    for i in range(5):
        md.append(f'\n## Bab {i+1} – {chapters[i][0]}')
        md.append(chapters[i][1])

    md.append('\n## Kesimpulan')
    concl = 'Ringkasan singkat: topik ini dibahas berdasarkan sumber terbuka (Wikipedia bahasa Indonesia). Untuk detail lebih lanjut, lihat bagian referensi.'
    md.append(concl)

    md.append('\n## Referensi')
    title_url = lead.get('metadata', {}).get('displaytitle') or title
    page_url = lead.get('description') or ''
    # fallback link
    wiki_link = f'https://id.wikipedia.org/wiki/{quote(title)}'
    md.append(f'- Halaman Wikipedia (ID): {wiki_link}')

    return '\n\n'.join(md)


def save_markdown(title, md_text, outdir='ebooks'):
    safe = re.sub(r'[^0-9A-Za-z-_ ]+', '', title).strip().replace(' ', '_')
    fname = f"{safe}.md"
    os.makedirs(outdir, exist_ok=True)
    path = os.path.join(outdir, fname)
    with open(path, 'w', encoding='utf-8') as f:
        f.write(md_text)
    return path


def main():
    topics = [
        'Perubahan iklim',
        'Internet',
        'Komputasi kuantum',
        'Fotosintesis',
        'Vaksinasi',
        'Mata uang kripto',
        'Energi terbarukan',
    ]

    generated = []
    for t in topics:
        print(f'Fetching: {t}')
        data = fetch_sections(t)
        if not data:
            print(f'  Gagal mengambil halaman untuk: {t}')
            continue
        md = build_markdown(t, data)
        path = save_markdown(t, md)
        print(f'  Disimpan: {path}')
        generated.append(path)

    print('\nSelesai. E-book dihasilkan di folder "ebooks"')


if __name__ == '__main__':
    main()
