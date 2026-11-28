#!/usr/bin/env python3
"""V2.4-B · vá nhanh một bản HTML đã dựng (đã có V2.4-A) mà không dựng lại 20 phút.
python3 claude_tools/v24b_rep.py <vào.html> <ra.html>
Bản dựng đầy đủ (build74_mau.py) tự lấy các thay đổi từ src/ — tệp này chỉ để thử nhanh.
"""
import sys, os, re, json, base64
ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')
rd = lambda p: open(os.path.join(ROOT, p), encoding='utf-8').read()
PAIRS = [
 # l6309
 ("/* V2.1: hạ nhạc khi nổ lớn */if(!ok())return;try{SND[k](",
  "/* V2.1: hạ nhạc khi nổ lớn */if(window.SND24S&&SND24S.route(k))return;/* V2.4-B: tiếng dựng sẵn */if(!ok())return;try{SND[k]("),
 ("const k=Math.pow(1.04,Math.min(pn++,18));cnt.pick=(cnt.pick||0)+1;if(!ok())return;",
  "const pn0=pn,k=Math.pow(1.04,Math.min(pn++,18));cnt.pick=(cnt.pick||0)+1;if(window.SND24S&&SND24S.chime(pn0))return;/* V2.4-B */if(!ok())return;"),
 # dan307
 (" function emit(id){const c=CFG[id]",
  " function emit(id){try{if(window.SND24S&&mode==='play')SND24S.shot(id);}catch{}/* V2.4-B tiếng đạn chính */const c=CFG[id]"),
]


def main(a, b):
    h = open(a, encoding='utf-8').read()
    def rep(x, y, n=1):
        nonlocal h
        c = h.count(x); assert c == n, (x[:80], c); h = h.replace(x, y)
    for x, y in PAIRS:
        if h.count(y) == 0: rep(x, y)
    # music96: thay nguyên khối nguồn (tìm từ 'const MUSIC96_TRACKS=' tới 'window.Music96=Music96;')
    src = rd('src/music96.js'); i0 = src.index('const MUSIC96_TRACKS='); body = src[i0:]
    j0 = h.index('const MUSIC96_TRACKS='); j1 = h.index('window.Music96=Music96;', j0) + len('window.Music96=Music96;')
    old = h[j0:j1]; assert old.count('function xf(w,t){') == 1
    h = h[:j0] + body.rstrip() + h[j1:]
    # pkc26: ảnh mới + mã mới
    m = re.search(r'<script id="pkc26-js">window\.PKC26_IMG=(\{.*?\});', h, re.S)
    IMG = json.loads(m.group(1))
    for f in sorted(os.listdir(os.path.join(ROOT, 'src/nen24img'))):
        if f.endswith('.webp'):
            IMG[f[:-5]] = 'data:image/webp;base64,' + base64.b64encode(open(os.path.join(ROOT, 'src/nen24img', f), 'rb').read()).decode()
    k0 = m.start(); k1 = h.index('</script>', k0)
    h = h[:k0] + '<script id="pkc26-js">window.PKC26_IMG=' + json.dumps(IMG, separators=(',', ':')) + ';' + rd('src/pkc26.js') + h[k1:]
    # snd24
    if 'id="snd24-js"' not in h:
        tail = '<style id="snd24-css">' + rd('src/snd24.css') + '</style><script id="snd24-js">' + rd('src/snd24.js') + '</script>'
        i = h.rindex('</body>'); h = h[:i] + tail + h[i:]
    open(b, 'w', encoding='utf-8').write(h); print('ok', len(h))


if __name__ == '__main__':
    main(sys.argv[1], sys.argv[2])
