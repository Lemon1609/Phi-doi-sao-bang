#!/usr/bin/env python3
"""U1c: cắt 7 tấm nút / thanh tiêu đề từ tấm 90339.png.
Dùng: python3 -I claude_tools/u1c_cat.py <ảnh tấm> <thư mục ra>
Tách nền: flood-fill nền đen ngoài từ mép ô cắt (max RGB < NG), viền 1 px mềm."""
import sys, os, numpy as np
from PIL import Image
from scipy import ndimage as nd

BOX = {  # x, y, w, h trên tấm 1672x941 ; cạnh ngang đích
 'btn_hero_red':       ((19, 58, 806, 247), 380),
 'btn_hero_gold':      ((846, 58, 806, 247), 380),
 'btn_plate_blue':     ((41, 387, 497, 202), 240),
 'btn_plate_gold':     ((586, 387, 498, 202), 240),
 'btn_plate_green':    ((1133, 386, 497, 203), 240),
 'btn_plate_steel':    ((38, 683, 512, 189), 240),
 'panel_header_silver':((576, 674, 1071, 200), 480),
}
NG = 26

def cut(src, out):
    im = Image.open(src).convert('RGB'); A = np.asarray(im).astype(np.int16)
    os.makedirs(out, exist_ok=True); tot = 0
    for name, ((x, y, w, h), W) in BOX.items():
        p = 3
        c = A[max(0,y-p):y+h+p, max(0,x-p):x+w+p]
        bg = c.max(2) < NG
        lab, _ = nd.label(bg)
        edge = set(np.unique(np.r_[lab[0], lab[-1], lab[:, 0], lab[:, -1]])) - {0}
        ext = np.isin(lab, list(edge))
        body = ~ext
        body = nd.binary_fill_holes(body)
        # giữ khối liền lớn nhất
        bl, n = nd.label(body)
        if n > 1:
            sz = nd.sum(body, bl, range(1, n + 1)); body = bl == (1 + int(np.argmax(sz)))
        ys, xs = np.where(body); y0, y1, x0, x1 = ys.min(), ys.max() + 1, xs.min(), xs.max() + 1
        c = c[y0:y1, x0:x1]; body = body[y0:y1, x0:x1]
        a = body.astype(np.float32)
        # viền 1 px mềm: điểm biên ngoài lấy alpha theo độ sáng
        inner = nd.binary_erosion(body)
        rim = body & ~inner
        lum = c.max(2).astype(np.float32)
        a[rim] = np.clip((lum[rim] - NG) / 60.0 + .45, .45, 1)
        rgba = np.dstack([c.astype(np.uint8), (a * 255).astype(np.uint8)])
        I = Image.fromarray(rgba, 'RGBA')
        Hh = round(I.height * W / I.width)
        # thu nhỏ trên ảnh nhân alpha
        I = I.convert('RGBa').resize((W, Hh), Image.LANCZOS).convert('RGBA')
        fn = os.path.join(out, name + '.webp')
        I.save(fn, 'WEBP', quality=86, method=6)
        s = os.path.getsize(fn); tot += s
        print(name, I.size, s)
    print('TONG', tot)

if __name__ == '__main__':
    cut(sys.argv[1], sys.argv[2])
