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
K = ['power', 'heal', 'shield', 'bomb', 'drone', 'super', 'magnet', 'star']
o = cells('src/ship118_cho/V309_gpt_drops_8_3x3.png', 3, 3, range(8), DIL=6)
for i, k in enumerate(K):
    fit(o[i], 192, .03).save(f'src/drop309/{k}.png', optimize=True)
    print(k, o[i].size)
# nam châm: lòng chữ U (dưới tia sét) là vùng tối kín → làm trong suốt
im = np.asarray(Image.open('src/drop309/magnet.png').convert('RGBA')).copy()
L = im[..., :3].max(2).astype(int)
lab, n = ndimage.label((L < 30) & (im[..., 3] > 0))
for i, sl in enumerate(ndimage.find_objects(lab), 1):
    m = lab == i
    if m.sum() > 400:
        im[m, 3] = 0
        ring = ndimage.binary_dilation(m, iterations=2) & ~m & (L < 70)
        im[ring, 3] = (np.clip((L[ring] - 12) / 58, .1, 1) * 255).astype('uint8')
Image.fromarray(im, 'RGBA').save('src/drop309/magnet.png', optimize=True)
