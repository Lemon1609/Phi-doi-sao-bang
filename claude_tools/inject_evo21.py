# V2.1 Đợt 1 · vá bản HTML đã dựng để thử bộ ảnh GPT mới của 1 chiến cơ + mô-đun evo21 (khỏi dựng lại toàn bộ).
#   python3 claude_tools/inject_evo21.py <vào.html> <ra.html> <thư mục ảnh (ra của evo21_cat.py)> <N> [<N> ...]
#   - thay SHIP118[N-1] (12 ô, webp 256 q88 như build) + SHIP309BB / SHIP309COL (cùng code build74_mau.py)
#   - chèn / thay <script id="evo21-img-js"> (window.EVO21_IMG) và <script id="evo21-js"> (src/evo21.js) trước </body>
import sys, os, io, re, json, base64, glob
from PIL import Image
import numpy as np
inp, outp, d = sys.argv[1:4]
Ns = [int(x) for x in sys.argv[4:]]
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
h = open(inp, encoding='utf-8').read()


def block_json(name):
    for pre in ('const %s=', 'window.%s='):
        i = h.find(pre % name)
        if i >= 0:
            j = i + len(pre % name); break
    assert i >= 0, name
    dec = json.JSONDecoder()
    obj, end = dec.raw_decode(h, j)
    return i, j, end, obj


def put_json(name, obj):
    global h
    i, j, end, _ = block_json(name)
    h = h[:j] + json.dumps(obj, ensure_ascii=False) + h[end:]


_S118 = {}
for N in Ns:
    for p in sorted(glob.glob(os.path.join(d, 'tau%d_*.png' % N))):
        _S118[os.path.splitext(os.path.basename(p))[0]] = Image.open(p).convert('RGBA')
assert _S118, 'không có ảnh thân'
# SHIP118
_, _, _, S = block_json('SHIP118')
for n, im in _S118.items():
    num, f = n[3:].split('_', 1)
    if im.width > 256:
        im = im.resize((256, 256), Image.LANCZOS)
    b = io.BytesIO(); im.save(b, 'WEBP', quality=int(os.environ.get('SHIPQ', '88')))
    S.setdefault(str(int(num) - 1), {})[f] = 'data:image/webp;base64,' + base64.b64encode(b.getvalue()).decode()
put_json('SHIP118', S)
# SHIP309BB / SHIP309COL: chạy đúng đoạn code của build
src = open(os.path.join(ROOT, 'build74_mau.py'), encoding='utf-8').read()
a = src.index('SHIP309COL={};SHIP309BB={}'); b = src.index("print('V118 chien co")
code = src[a:b].replace("if os.environ.get('SHIP309','1')!='0' and os.path.isdir('src/ship309'):", "if True:")
env = {'os': os, '_S118': _S118, '_np': np}
exec(code, env)
for name, new in (('SHIP309BB', env['SHIP309BB']), ('SHIP309COL', env['SHIP309COL'])):
    _, _, _, o = block_json(name)
    o.update(new)
    put_json(name, o)
# EVO21_IMG + evo21.js
IM = {}
for p in sorted(glob.glob(os.path.join(d, '*.webp'))):
    IM[os.path.splitext(os.path.basename(p))[0]] = 'data:image/webp;base64,' + base64.b64encode(open(p, 'rb').read()).decode()
js = open(os.path.join(ROOT, 'src/evo21.js'), encoding='utf-8').read()
H0 = json.load(open(os.path.join(d, '_h0.json'))) if os.path.exists(os.path.join(d, '_h0.json')) else {}
for sid, body in (('evo21-img-js', 'window.EVO21_IMG=' + json.dumps(IM) + ';window.EVO21_H=' + json.dumps(H0) + ';'), ('evo21-js', js), ('evo21-led-js', open(os.path.join(ROOT, 'src/evo21_led.js'), encoding='utf-8').read()), ('evo21-sfx-js', open(os.path.join(ROOT, 'src/evo21_sfx.js'), encoding='utf-8').read())):
    m = re.search(r'<script id="%s">.*?</script>' % sid, h, re.S)
    tag = '<script id="%s">%s</script>' % (sid, body)
    if m:
        h = h[:m.start()] + tag + h[m.end():]
    else:
        k = h.rindex('</body>'); h = h[:k] + tag + h[k:]
open(outp, 'w', encoding='utf-8').write(h)
print('SHIP118:', len(_S118), 'ô · EVO21_IMG:', sorted(IM), '·', round(len(h) / 1e6, 1), 'MB')
