#!/usr/bin/env python3
"""V2.4-C · vá nhanh một bản HTML đã có V2.4-A + V2.4-B (vd /home/claude/work/v24b.html):
python3 claude_tools/v24c_rep.py <vào.html> <ra.html>   (bản dựng đầy đủ lấy thẳng từ src/)"""
import sys, os, json, base64
ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')
rd = lambda p: open(os.path.join(ROOT, p), encoding='utf-8').read()
h = open(sys.argv[1], encoding='utf-8').read()
def block(id, src):
    global h
    a = '<script id="%s">' % id; i = h.index(a) + len(a); j = h.index('</script>', i); h = h[:i] + src + h[j:]
block('v24-js', rd('src/v24.js')); block('target307-js', rd('src/target307.js'))
i = h.index('<script id="pkc26-js">'); j = h.index('</script>', i); seg = h[i:j]; k = seg.index('};') + 2
h = h[:i] + seg[:k] + rd('src/pkc26.js') + h[j:]
old = "k=window.BOSS24!==false?Math.min((b.major36?300:250)/bb.w,(b.major36?340:300)/bb.h):Math.min((b.major36?212:156)/bb.w,(b.major36?290:230)/bb.h);"
new = "k=window.BOSS24!==false?(window.BOSSXL24!==false&&window.V24C!==false?Math.min((b.major36?372:336)/bb.w,(b.major36?430:390)/bb.h):Math.min((b.major36?300:250)/bb.w,(b.major36?340:300)/bb.h)):Math.min((b.major36?212:156)/bb.w,(b.major36?290:230)/bb.h);"
if h.count(new) == 0: assert h.count(old) == 1; h = h.replace(old, new)
if 'id="v24c-js"' in h:
    block('v24c-js', rd('src/v24c.js'))
    i = h.index('<style id="v24c-css">') + len('<style id="v24c-css">'); j = h.index('</style>', i); h = h[:i] + rd('src/v24c.css') + h[j:]
    IM = {k[:-5]: 'data:image/webp;base64,' + base64.b64encode(open(os.path.join(ROOT, 'src/v24cimg', k), 'rb').read()).decode() for k in sorted(os.listdir(os.path.join(ROOT, 'src/v24cimg'))) if k.endswith('.webp')}
    i = h.index('<script id="v24c-img-js">'); j = h.index('</script>', i); h = h[:i] + '<script id="v24c-img-js">window.V24C_IMG=' + json.dumps(IM, separators=(',', ':')) + ';' + h[j:]
else:
    IM = {k[:-5]: 'data:image/webp;base64,' + base64.b64encode(open(os.path.join(ROOT, 'src/v24cimg', k), 'rb').read()).decode() for k in sorted(os.listdir(os.path.join(ROOT, 'src/v24cimg'))) if k.endswith('.webp')}
    tail = '<script id="v24c-img-js">window.V24C_IMG=' + json.dumps(IM, separators=(',', ':')) + ';</script><style id="v24c-css">' + rd('src/v24c.css') + '</style><script id="v24c-js">' + rd('src/v24c.js') + '</script>'
    i = h.rindex('</body>'); h = h[:i] + tail + h[i:]
open(sys.argv[2], 'w', encoding='utf-8').write(h); print('ok', len(h))
