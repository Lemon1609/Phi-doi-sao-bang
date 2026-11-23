# V309 Lượt 15 · GIẢM DUNG LƯỢNG bản dựng (chạy trên HTML đã dựng, không cần thư mục ảnh gốc).
#  python3 claude_tools/opt15_assets.py <vào.html> <ra.html> [--bao bao_cao.json]
#  A. PNG nhúng → WebP chất lượng 90 (giữ alpha, giữ nguyên kích thước điểm ảnh) khi nhỏ hơn ≥ 10 %.
#     Không nén lại WebP (đo: q85 chỉ còn 96 % → mất nét mà gần như không lợi).
#  B. Gộp ảnh trùng:
#     • CSS `url(data:…)` (kể cả trong chuỗi JS dựng CSS): mỗi ảnh khai báo 1 lần `:root{--i15_N:url(…)}` ở <head>, chỗ dùng → `var(--i15_N)`.
#     • Khối tài nguyên JSON thuần `const TEN={"khóa":"data:…",…};`: bản trùng thứ 2+ → "" và ngay sau khối đó chèn
#       `<script>TEN["khóa"]=GOC["khóa gốc"];</script>` (khối gốc luôn đứng trước → giá trị có trước mọi mã chạy sau).
#  Không thu nhỏ kích thước ảnh (mã nhiều chỗ dựa vào naturalWidth / tọa độ atlas → dễ lệch hình).
import sys, re, base64, io, hashlib, json, collections
from PIL import Image

src, out = sys.argv[1], sys.argv[2]
rep_path = sys.argv[sys.argv.index('--bao') + 1] if '--bao' in sys.argv else None
h = open(src, encoding='utf-8').read()
B0 = len(h.encode())
DATA = re.compile(r'data:image/(png|webp|jpeg|gif);base64,([A-Za-z0-9+/=]{200,})')

def cnt(hh):
    c = collections.Counter()
    for m in re.finditer(r'data:(image/[a-z+]+|audio/[a-z0-9]+|font/[a-z0-9]+);base64,([A-Za-z0-9+/=]+)', hh):
        c[m.group(1)] += len(m.group(2))
    return c

before = cnt(h)
# ---------- A · PNG → WebP ----------
conv = [0, 0, 0]
cache = {}
def to_webp(m):
    if m.group(1) != 'png':
        return m.group(0)
    d = m.group(2)
    if d in cache:
        return cache[d]
    raw = base64.b64decode(d)
    try:
        im = Image.open(io.BytesIO(raw)); im.load()
        if im.mode not in ('RGBA', 'RGB', 'LA', 'L'):
            im = im.convert('RGBA')
        o = io.BytesIO(); im.save(o, 'WEBP', quality=90, method=6)
        w = o.getvalue()
    except Exception:
        cache[d] = m.group(0); return m.group(0)
    if len(w) <= len(raw) * 0.9:
        r = 'data:image/webp;base64,' + base64.b64encode(w).decode()
        conv[0] += 1; conv[1] += len(raw); conv[2] += len(w)
    else:
        r = m.group(0)
    cache[d] = r
    return r
h = DATA.sub(to_webp, h)

# ---------- C · thu nhỏ dải hiệu ứng quá khổ (V309 L15B) ----------
#  Chỉ khóa *_impact_super (khung 192 → 128) và *_impact_normal (khung 128 → 96): vẽ trong trận 52–140 px.
#  Thu nhỏ trên ảnh nhân alpha trước (RGBa) để mép trong suốt không viền tối; WebP q90. Ghi dấu ảnh mới → window.VFX15B để
#  gear_fx_v3 frame() cắt khung theo hệ số (ART148 vốn chia theo naturalHeight). Bỏ qua: OPT15_VFX=0
import os
vfx = {}; vsave = [0, 0, 0]
if os.environ.get('OPT15_VFX', '1') != '0':
    VK = re.compile(r'"([A-Za-z0-9_]+_impact_(super|normal))":\s*"(data:image/(?:webp|png);base64,([A-Za-z0-9+/=]+))"')
    newof = {}
    for m in VK.finditer(h):
        key, kind, uri, d = m.group(1), m.group(2), m.group(3), m.group(4)
        if uri in newof: continue
        try:
            im = Image.open(io.BytesIO(base64.b64decode(d))); im.load(); im = im.convert('RGBA')
        except Exception:
            continue
        W0, H0 = im.size; tgt = 128 if kind == 'super' else 96
        if H0 <= tgt or W0 != H0 * 8:      # chỉ dải 8 khung 1 hàng, đúng cỡ gốc
            continue
        k = tgt / H0
        sm = im.convert('RGBa').resize((round(W0 * k), tgt), Image.LANCZOS).convert('RGBA')
        o = io.BytesIO(); sm.save(o, 'WEBP', quality=90, method=6)
        nu = 'data:image/webp;base64,' + base64.b64encode(o.getvalue()).decode()
        if len(nu) >= len(uri) * 0.9: continue
        newof[uri] = (nu, k); vsave[0] += 1; vsave[1] += len(uri); vsave[2] += len(nu)
    for old, (nu, k) in newof.items():
        h = h.replace(old, nu); vfx[str(len(nu)) + ':' + nu[-24:]] = round(k, 6)
    if vfx:
        i = h.find('<head>') + len('<head>')
        h = h[:i] + '<script id="vfx15b">window.VFX15B=' + json.dumps(vfx) + ';</script>' + h[i:]

# ---------- B · gộp trùng ----------
tags = [(m.start(), m.end(), m.group(1) or '') for m in re.finditer(r'<script(?:\s+id="([^"]*)")?[^>]*>', h)]
import bisect
starts = [t[0] for t in tags]
JSONHEAD = re.compile(r'\s*(?:(?:const|var|let)\s+|window\.)([A-Za-z_$][\w$]*)\s*=\s*\{')
def script_of(p):
    i = bisect.bisect_right(starts, p) - 1
    if i < 0: return None
    s, e, _ = tags[i]
    end = h.find('</script>', e)
    if p > end: return None
    return (e, end)
pure = {}
def pure_json(sc):
    if sc in pure: return pure[sc]
    body = h[sc[0]:sc[1]]; m = JSONHEAD.match(body); res = None
    if m and body.rstrip().endswith('};'):
        try:
            obj = json.loads(body[body.index('=') + 1:body.rstrip().rindex(';')]); res = (('window.' if body.lstrip().startswith('window.') else '') + m.group(1), obj)
        except Exception:
            res = None
    pure[sc] = res; return res

occ = collections.defaultdict(list)
for m in DATA.finditer(h):
    st, en = m.start(), m.end(); kind = 'other'; info = None
    pre = h[max(0, st - 5):st]
    if pre.endswith('url(') or pre.endswith('url("') or pre.endswith("url('"):
        q = pre[-1] if pre[-1] in '"\'' else ''
        if q and h[en:en + 2] == q + ')' or not q and h[en] == ')':
            kind = 'url'; info = q
    elif h[st - 1] == '"' and h[en] == '"':
        sc = script_of(st)
        if sc:
            pj = pure_json(sc)
            if pj:
                nm, obj = pj
                km = re.search(r'"((?:[^"\\]|\\.)*)":\s*"$', h[max(0, st - 300):st])
                if km:
                    try: key = json.loads('"' + km.group(1) + '"')
                    except Exception: key = None
                    if key is not None and obj.get(key) == m.group(0):   # chỉ khóa cấp 1
                        kind = 'json'; info = (nm, key, sc)
    occ[hashlib.md5(m.group(0).encode()).hexdigest()].append((st, en, kind, info, m.group(0)))

edits = []      # (start, end, text)
rootvars = []
fix = collections.defaultdict(list)   # vị trí chèn → dòng JS
nvar = 0; save_css = save_json = 0
for k, L in occ.items():
    if len(L) < 2: continue
    urls = [o for o in L if o[2] == 'url']
    if urls and (len(urls) >= 2 or len(L) > len(urls)):
        name = '--i15_%d' % nvar; nvar += 1
        rootvars.append('%s:url(%s)' % (name, urls[0][4]))
        for st, en, _, q, d in urls:
            a = st - 4 - len(q); b = en + len(q) + 1    # bao cả url( … )
            assert h[a:a + 4] == 'url(', h[a:a + 10]
            edits.append((a, b, 'var(%s)' % name))
        save_css += (len(urls) - 1) * len(urls[0][4])
    js = [o for o in L if o[2] == 'json']
    if len(js) >= 2:
        g = js[0]; gn, gk, gsc = g[3]
        for st, en, _, (nm, key, sc), d in js[1:]:
            if sc != gsc and sc[0] < gsc[1]:   # khối gốc phải kết thúc trước (cùng khối thì được)
                continue
            edits.append((st, en, ''))
            fix[sc[1] + len('</script>')].append('%s[%s]=%s[%s];' % (nm, json.dumps(key, ensure_ascii=False), gn, json.dumps(gk, ensure_ascii=False)))
            save_json += len(d)
for p, lines in fix.items():
    edits.append((p, p, '<script id="i15fix">' + ''.join(lines) + '</script>'))
edits.sort(key=lambda e: (e[0], e[1]))
outp = []; last = 0
for a, b, t in edits:
    assert a >= last, ('chồng lấn', a, last)
    outp.append(h[last:a]); outp.append(t); last = b
outp.append(h[last:]); h = ''.join(outp)
if rootvars:
    i = h.find('<head>') + len('<head>')
    h = h[:i] + '<style id="i15root">:root{' + ';'.join(rootvars) + '}</style>' + h[i:]
open(out, 'w', encoding='utf-8').write(h)
after = cnt(h); B1 = len(h.encode())
R = {'truoc_MB': round(B0 / 1e6, 2), 'sau_MB': round(B1 / 1e6, 2),
     'png_webp': {'so_anh': conv[0], 'truoc_MB': round(conv[1] / 1e6, 2), 'sau_MB': round(conv[2] / 1e6, 2)},
     'vfx_thu_nho': {'so_anh': vsave[0], 'truoc_MB': round(vsave[1] / 1e6, 2), 'sau_MB': round(vsave[2] / 1e6, 2)},
     'gop_css_bien': nvar, 'gop_css_MB': round(save_css / 1e6, 2), 'gop_json_MB': round(save_json / 1e6, 2), 'chen_fix': len(fix),
     'loai_truoc': {k: round(v / 1e6, 2) for k, v in before.items()}, 'loai_sau': {k: round(v / 1e6, 2) for k, v in after.items()}}
print(json.dumps(R, ensure_ascii=False, indent=1))
if rep_path: open(rep_path, 'w').write(json.dumps(R, ensure_ascii=False, indent=1))
