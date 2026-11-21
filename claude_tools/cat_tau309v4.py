# V309 Lượt 3 · cắt 4 tấm GPT chiến cơ v4 (Thường 13 + Bạo Tẩu 13) → src/ship309/tau<N>_<bậc>[_bt].png (khung 512)
#  - Nhận diện từng tàu bằng thành phần liên thông (gom theo tâm vào ô 3×3) vì có tàu tràn qua ranh ô 418 px
#  - Nền: flood-fill từ mép (R,G,B < 18), thân đục 100 %, dải viền ≤ 3 px tối dần → alpha mềm (giữ quầng neon)
#  - Cỡ: căn(rộng×cao) Thường = G0 × hệ số bậc (1 · 1 · 1,05 · 1,10 · 1,12 · 1,14); Bạo Tẩu cùng hệ số, căn khớp thân bằng IoU
import os, sys, json
import numpy as np
from PIL import Image
from scipy import ndimage

S = 'src/ship118_cho/'
O = 'src/ship309/'
os.makedirs(O, exist_ok=True)
G0 = 360
TIER = {'thuong': 1.0, 'luc': 1.0, 'lam': 1.05, 'tim': 1.10, 'tim5': 1.12, 'ss': 1.14}
MAXL = 486


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


def ships(path, n):
    a = np.asarray(Image.open(path).convert('RGB'))
    img, fg = tach(a)
    lab, k = ndimage.label(ndimage.binary_dilation(fg, iterations=2))
    cell = a.shape[0] / 3
    groups = {}
    for i, sl in enumerate(ndimage.find_objects(lab), 1):
        m = lab[sl] == i
        if m.sum() < 300:
            continue
        ys, xs = np.where(m)
        cy, cx = ys.mean() + sl[0].start, xs.mean() + sl[1].start
        c = int(cy // cell) * 3 + int(cx // cell)
        groups.setdefault(c, []).append(sl)
    out = []
    for c in range(n):
        sls = groups[c]
        y0 = min(s[0].start for s in sls); y1 = max(s[0].stop for s in sls)
        x0 = min(s[1].start for s in sls); x1 = max(s[1].stop for s in sls)
        im = Image.fromarray(img[y0:y1, x0:x1], 'RGBA')
        bb = im.getbbox(); im = im.crop(bb)
        out.append(im)
    return out


def G(im):
    a = np.asarray(im)[..., 3] > 128
    ys, xs = np.where(a)
    return ((np.ptp(xs) + 1) * (np.ptp(ys) + 1)) ** .5


def place(im, k, dx=0, dy=0):
    big = im.resize((max(1, round(im.width * k)), max(1, round(im.height * k))), Image.LANCZOS)
    out = Image.new('RGBA', (512, 512), (0, 0, 0, 0))
    out.paste(big, (round(256 - big.width / 2 + dx), round(256 - big.height / 2 + dy)), big)
    return out


def best_shift(nm, bt):  # căn thân Bạo Tẩu lên thân Thường (cùng tỉ lệ ảnh GPT) bằng IoU mặt nạ
    A = np.asarray(nm)[..., 3] > 128
    B = np.asarray(bt)[..., 3] > 128
    H = max(A.shape[0], B.shape[0]) + 120; W = max(A.shape[1], B.shape[1]) + 120
    def pad(m, oy, ox):
        z = np.zeros((H, W), bool); z[oy:oy + m.shape[0], ox:ox + m.shape[1]] = m; return z
    ay, ax = (H - A.shape[0]) // 2, (W - A.shape[1]) // 2
    PA = pad(A, ay, ax)
    best = (-1, 0, 0)
    bx0 = (W - B.shape[1]) // 2
    by0 = (H - B.shape[0]) // 2
    for dy in range(-50, 51, 2):
        for dx in range(-12, 13, 2):
            oy, ox = by0 + dy, bx0 + dx
            if oy < 0 or ox < 0 or oy + B.shape[0] > H or ox + B.shape[1] > W:
                continue
            PB = pad(B, oy, ox)
            iou = (PA & PB).sum() / max(1, (PA | PB).sum())
            if iou > best[0]:
                best = (iou, dx, dy)
    return best


N1 = ships(S + 'V309_gpt_ships_v4_set1_7_3x3.png', 7) + ships(S + 'V309_gpt_ships_v4_set2_6_3x3.png', 6)
B1 = ships(S + 'V309_gpt_ships_v4_bt_set1_7_3x3.png', 7) + ships(S + 'V309_gpt_ships_v4_bt_set2_6_3x3.png', 6)
log = {}
for i in range(13):
    nm, bt = N1[i], B1[i]
    iou, dx, dy = best_shift(nm, bt)
    for t, f in TIER.items():
        k = G0 * f / G(nm)
        lim = MAXL / max(nm.width, nm.height, bt.width, bt.height)
        k = min(k, lim)
        place(nm, k).save(O + f'tau{i+1}_{t}.png')
        place(bt, k, dx * k, dy * k).save(O + f'tau{i+1}_{t}_bt.png')
    log[i + 1] = dict(nm=nm.size, bt=bt.size, iou=round(float(iou), 2), dx=dx, dy=dy, k_thuong=round(G0 / G(nm), 3))
    print(i + 1, log[i + 1])
json.dump(log, open(O + 'log.json', 'w'), indent=1)
