#!/usr/bin/env python3
"""Gói C (T26) · cắt 3 nền địa hình + lớp mây cho parallax.
python3 claude_tools/pkc26_cat.py <thư mục có bg_*.png> <ra>
 - nền: thu về rộng 480, nối mép trên–dưới bằng hòa trộn 8 % (ảnh lặp dọc không thấy đường nối),
   chỉnh độ sáng trung vị về ~34 (hệ số kẹp .75–1.25), webp ≤ 140 KB.
 - mây: độ sáng → alpha (chuẩn hóa p99.5 = 1), màu trắng ngả lam; khi vẽ α tối đa .28; webp ≤ 80 KB.
"""
import sys, os, io
import numpy as np
from PIL import Image

W = 480
BAND = .08
P50 = 34.0

def seam(a):
    h = a.shape[0]; b = int(round(h * BAND))
    t = np.linspace(0, 1, b)[:, None, None]
    out = a[:h - b].copy()
    out[:b] = a[h - b:] * (1 - t) + a[:b] * t
    return out

def save(im, path, cap, q0=86):
    for q in range(q0, 40, -4):
        buf = io.BytesIO(); im.save(buf, 'WEBP', quality=q, method=6)
        if buf.tell() <= cap * 1024: break
    open(path, 'wb').write(buf.getvalue()); return buf.tell(), q

def main(src, dst):
    os.makedirs(dst, exist_ok=True)
    for n in ('orbit', 'valley', 'skycity'):
        im = Image.open(os.path.join(src, f'bg_{n}.png')).convert('RGB')
        im = im.resize((W, round(im.height * W / im.width)), Image.LANCZOS)
        a = np.asarray(im).astype(float)
        L = a @ [.299, .587, .114]
        k = min(1.25, max(.75, P50 / max(1, np.percentile(L, 50))))
        a = np.clip(seam(a) * k, 0, 255).astype(np.uint8)
        sz, q = save(Image.fromarray(a), os.path.join(dst, f'bg_{n}.webp'), 140)
        print(n, a.shape[1], 'x', a.shape[0], 'sáng ×%.2f' % k, sz, 'B q', q)
    im = Image.open(os.path.join(src, 'bg_clouds_layer.png')).convert('RGB')
    im = im.resize((W, round(im.height * W / im.width)), Image.LANCZOS)
    a = np.asarray(im).astype(float)
    L = a @ [.299, .587, .114]
    hi = max(1, np.percentile(L, 99.5))
    al = np.clip((L - 2) / (hi - 2), 0, 1) ** .85
    al = seam(al[:, :, None])[:, :, 0]
    rgb = np.zeros(al.shape + (3,)); rgb[:] = (214, 232, 255)
    o = np.dstack([rgb, al * 255]).astype(np.uint8)
    sz, q = save(Image.fromarray(o, 'RGBA'), os.path.join(dst, 'bg_clouds.webp'), 80)
    print('clouds', o.shape[1], 'x', o.shape[0], sz, 'B q', q)

if __name__ == '__main__':
    main(sys.argv[1], sys.argv[2])
