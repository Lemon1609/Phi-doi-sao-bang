#!/usr/bin/env python3
"""V2.4-B · cắt 4 ảnh nền parallax 2 lớp (Vực Dung Nham / Hẻm Băng).
python3 claude_tools/nen24_cat.py <thư mục 90646..90649.png> <ra>
- Nền (floor): thu về rộng 480, nối biên dọc liền mạch bằng hòa trộn BLEND px.
- Vách (cliffs): nối biên như trên rồi quét từng hàng từ hành lang đen giữa ra hai bên
  (dừng ở điểm đầu tiên sáng hơn T) → alpha 0; không khóa màu toàn ảnh nên đá tối vẫn đặc.
  Viền mềm 1 px.
"""
import sys, os, numpy as np
from PIL import Image, ImageFilter

W = 480; BLEND = 72; T = 14
JOB = {'90648': ('bg_lava_floor', 0), '90647': ('bg_lava_cliffs', 1),
       '90646': ('bg_ice_floor', 0), '90649': ('bg_ice_cliffs', 1)}
Q = {0: 84, 1: 88}
LIFT = {'bg_lava_cliffs': 1.35}  # đá bazan gần cùng độ tối với đáy dung nham → nâng sáng nhẹ lớp vách


def wrap(a):
    h = a.shape[0]; b = BLEND
    out = a[:h - b].astype(np.float32).copy()
    t = (np.arange(b, dtype=np.float32) / b)[:, None, None]
    out[:b] = a[h - b:].astype(np.float32) * (1 - t) + a[:b].astype(np.float32) * t
    return out


def cliffs(rgb):
    h, w, _ = rgb.shape
    m = rgb.max(axis=2)
    mask = np.ones((h, w), np.uint8) * 255
    c = w // 2
    for y in range(h):
        row = m[y]
        if row[c] > T:  # hành lang bị che ở hàng này (hiếm) → tìm điểm tối gần tâm
            cand = np.where(row[w // 4:3 * w // 4] <= T)[0]
            if not len(cand):
                continue
            c0 = w // 4 + cand[np.argmin(abs(cand + w // 4 - c))]
        else:
            c0 = c
        l = c0
        while l > 0 and row[l - 1] <= T: l -= 1
        r = c0
        while r < w - 1 and row[r + 1] <= T: r += 1
        mask[y, l:r + 1] = 0
    im = Image.fromarray(mask).filter(ImageFilter.BoxBlur(1))
    # viền 1 px: điểm đặc sát hành lang lấy giá trị mờ, hành lang luôn 0
    return np.where(mask == 0, 0, np.array(im)).astype(np.uint8)


def main(src, dst):
    os.makedirs(dst, exist_ok=True); tot = 0
    for k, (name, cl) in JOB.items():
        im = Image.open(os.path.join(src, k + '.png')).convert('RGB')
        h = round(im.size[1] * W / im.size[0])
        im = im.resize((W, h), Image.LANCZOS)
        a = np.array(im)
        o = np.clip(wrap(a), 0, 255).astype(np.uint8)
        if cl:
            al = cliffs(o)
            if LIFT.get(name): o = np.clip(o.astype(np.float32) * LIFT[name], 0, 255).astype(np.uint8)  # tách vách khỏi đáy tối
            o[al == 0] = 0
            img = Image.fromarray(np.dstack([o, al]), 'RGBA')
            img.save(os.path.join(dst, name + '.webp'), 'WEBP', quality=Q[1], method=6, alpha_quality=90)
        else:
            Image.fromarray(o).save(os.path.join(dst, name + '.webp'), 'WEBP', quality=Q[0], method=6)
        s = os.path.getsize(os.path.join(dst, name + '.webp')); tot += s
        print(name, o.shape[1], 'x', o.shape[0], s, 'B')
    print('TONG', tot, 'B', round(tot / 1024, 1), 'KB')


if __name__ == '__main__':
    main(sys.argv[1], sys.argv[2])
