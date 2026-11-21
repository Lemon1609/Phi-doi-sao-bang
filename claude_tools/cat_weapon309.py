# V309 Lượt 5 · cắt 8 vật phẩm rơi GPT (3×3, 8 ô đầu) → src/drop309/<loại>.png (192, nền trong suốt)
import os, json
import numpy as np
from PIL import Image
from scipy import ndimage

S = 'src/ship118_cho/'


def tach(a):
    L = a.max(2).astype(int)
    lab, n = ndimage.label(L < 18)
    edge = set(np.unique(np.r_[lab[0], lab[-1], lab[:, 0], lab[:, -1]])) - {0}
    bg = np.isin(lab, list(edge))
    dist = ndimage.distance_transform_edt(~bg)
    al = np.where(bg, 0.0, 1.0)
    band = (~bg) & (dist <= 3) & (L < 70)
    al[band] = np.clip((L[band] - 12) / 58, 0.08, 1)
    rgb = a.astype(float)
    rgb[band] = np.clip(rgb[band] / al[band][:, None], 0, 255)
    return np.dstack([rgb, al * 255]).astype('uint8'), ~bg


def cells(path, nr, nc, want, DIL=2):
    a = np.asarray(Image.open(path).convert('RGB'))
    img, fg = tach(a)
    lab, k = ndimage.label(ndimage.binary_dilation(fg, iterations=DIL) if DIL else fg)
    ch, cw = a.shape[0] / nr, a.shape[1] / nc
    groups = {}
    for i, sl in enumerate(ndimage.find_objects(lab), 1):
        m = lab[sl] == i
        if m.sum() < 200:
            continue
        ys, xs = np.where(m)
        cy, cx = ys.mean() + sl[0].start, xs.mean() + sl[1].start
        groups.setdefault(int(cy // ch) * nc + int(cx // cw), []).append(sl)
    out = {}
    for c in want:
        sls = groups.get(c)
        r0, c0 = divmod(c, nc)
        if not sls or (DIL and (max(s[1].stop for s in sls) - min(s[1].start for s in sls)) > cw * 1.3):  # gộp nhầm sang ô bên cạnh → cắt thẳng theo ô
            y0, y1, x0, x1 = int(r0 * ch), int((r0 + 1) * ch), int(c0 * cw), int((c0 + 1) * cw)
            im = Image.fromarray(img[y0:y1, x0:x1], 'RGBA'); out[c] = im.crop(im.getbbox()); print('cat theo o', path[-30:], c); continue
        y0 = min(s[0].start for s in sls); y1 = max(s[0].stop for s in sls)
        x0 = min(s[1].start for s in sls); x1 = max(s[1].stop for s in sls)
        im = Image.fromarray(img[y0:y1, x0:x1], 'RGBA')
        out[c] = im.crop(im.getbbox())
    return out


def fit(im, n, pad=0.04):
    k = n * (1 - 2 * pad) / max(im.width, im.height)
    big = im.resize((max(1, round(im.width * k)), max(1, round(im.height * k))), Image.LANCZOS)
    o = Image.new('RGBA', (n, n), (0, 0, 0, 0))
    o.paste(big, ((n - big.width) // 2, (n - big.height) // 2), big)
    return o


os.makedirs('src/drop309', exist_ok=True)
# V309 Lượt 6 · 5 hộp đổi súng (GPT 89285, lưới 3×2, 5 ô đầu). Ô → weapons[i] theo tên súng:
#  ô0 gatling cam đôi → LIÊN THANH (weapon0) · ô1 pha lê lam → LASER XUYÊN (weapon2) · ô2 gatling đỏ 3 nòng → ĐẠN TỎA (weapon1)
#  ô3 cầu tím → CẦU PLASMA (weapon4) · ô4 tên lửa lục → TÊN LỬA TỰ TÌM (weapon3)
M = {0: 0, 1: 2, 2: 1, 3: 4, 4: 3}
o = cells('src/ship118_cho/V309_gpt_weapons_5_3x2.png', 2, 3, range(5), DIL=6)
for c, w in M.items():
    fit(o[c], 192, .03).save(f'src/drop309/weapon{w}.png', optimize=True); print(c, w, o[c].size)
