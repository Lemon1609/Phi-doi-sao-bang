#!/usr/bin/env python3
"""V2.4-C · cắt 6 ảnh: python3 claude_tools/v24c_cat.py <thư mục có 90657.png 90658.png> <ra>
90657 (VFX cộng sáng, nền đen): alpha = độ sáng (max kênh), RGB bỏ nhân trước → vẽ 'lighter' không viền đen; căn tâm hình học.
90658 (UI): huy hiệu + rương đóng = tô loang nền đen từ mép ngoài, viền mềm 1 px; rương mở = lai: thân/nắp đặc (tô loang)
 + chùm tia sáng ngoài thân lấy alpha theo độ sáng (khử đen).
"""
import sys, os, numpy as np
from PIL import Image, ImageFilter
from scipy import ndimage

SRC, OUT = sys.argv[1], sys.argv[2]; os.makedirs(OUT, exist_ok=True)
COL = {'90657': [(69, 599), (758, 925), (1101, 1590)], '90658': [(28, 628), (673, 1111), (1202, 1641)]}


def colcrop(a, x0, x1, pad=16):
    x0 = max(0, x0 - pad); x1 = min(a.shape[1], x1 + pad + 1)
    return a[:, x0:x1]


def bbox(alpha, thr=6):
    ys, xs = np.where(alpha > thr)
    return xs.min(), ys.min(), xs.max() + 1, ys.max() + 1


def lum_alpha(rgb, floor=10):
    m = rgb.max(axis=2).astype(np.float32)
    a = np.clip((m - floor) * 255.0 / (255 - floor), 0, 255)
    k = np.where(a > 0, 255.0 / np.maximum(a, 1), 0)[..., None]
    c = np.clip(rgb.astype(np.float32) * k, 0, 255)
    return np.dstack([c, a]).astype(np.uint8)


def ext_mask(rgb, thr=22):
    """True = nền ngoài (tối, nối với mép ảnh)."""
    dark = rgb.max(axis=2) <= thr
    lab, _ = ndimage.label(dark)
    edge = set(np.unique(np.concatenate([lab[0], lab[-1], lab[:, 0], lab[:, -1]]))) - {0}
    return np.isin(lab, list(edge))


def feather(solid):
    a = (solid * 255).astype(np.uint8)
    b = np.array(Image.fromarray(a).filter(ImageFilter.BoxBlur(1)))
    return np.where(solid, np.maximum(b, 0), 0).astype(np.uint8)


def save(rgba, name, maxw=None, maxh=None, q=82, centre=None):
    al = rgba[..., 3]
    x0, y0, x1, y1 = bbox(al)
    if centre == 'xy':  # đối xứng quanh tâm hình học của bbox → căn giữa thật
        pass
    im = Image.fromarray(rgba[y0:y1, x0:x1], 'RGBA')
    if centre == 'sq':
        s = max(im.size); c = Image.new('RGBA', (s, s)); c.paste(im, ((s - im.size[0]) // 2, (s - im.size[1]) // 2)); im = c
    k = 1.0
    if maxw: k = min(k, maxw / im.size[0])
    if maxh: k = min(k, maxh / im.size[1])
    if k < 1: im = im.resize((max(1, round(im.size[0] * k)), max(1, round(im.size[1] * k))), Image.LANCZOS)
    p = os.path.join(OUT, name + '.webp'); im.save(p, 'WEBP', quality=q, method=6, alpha_quality=88)
    print(name, im.size, os.path.getsize(p)); return os.path.getsize(p)


tot = 0
a = np.array(Image.open(os.path.join(SRC, '90657.png')).convert('RGB'))
for (x0, x1), name, mw, mh in zip(COL['90657'], ['fx_blitz_cone', 'fx_blitz_flame', 'fx_blitz_vortex'], [256, 96, 256], [256, 384, 256]):
    c = lum_alpha(colcrop(a, x0, x1))
    tot += save(c, name, mw, mh, q=80, centre='sq' if 'vortex' in name else None)
b = np.array(Image.open(os.path.join(SRC, '90658.png')).convert('RGB'))
for (x0, x1), name in zip(COL['90658'], ['ui_victory_crest', 'ui_chest_closed', 'ui_chest_open']):
    rgb = colcrop(b, x0, x1); ext = ext_mask(rgb); solid = ~ext
    # bỏ hạt lẻ: giữ khối liền lớn nhất (+ các khối > 400 px)
    lab, n = ndimage.label(solid); sz = ndimage.sum(solid, lab, range(1, n + 1))
    keep = np.isin(lab, [i + 1 for i, s in enumerate(sz) if s >= max(400, sz.max() * .02)])
    al = feather(keep)
    if name == 'ui_chest_open':
        la = lum_alpha(rgb, floor=14)
        soft = np.where(keep, 0, la[..., 3])
        al = np.maximum(al, soft).astype(np.uint8)
        c = np.where(keep[..., None], rgb, la[..., :3])
    else:
        c = rgb
    rgba = np.dstack([c, al]).astype(np.uint8)
    # khử viền đen: điểm bán trong suốt của phần thân lấy màu điểm đặc gần nhất (giữ alpha)
    soft_body = (al > 0) & (al < 255) & (feather(keep) > 0) & (feather(keep) < 255)
    if soft_body.any():
        _, (iy, ix) = ndimage.distance_transform_edt(~(al == 255), return_indices=True)
        rgba[soft_body, :3] = rgba[iy[soft_body], ix[soft_body], :3]
    rgba[al == 0, :3] = 0
    tot += save(rgba, name, 360 if 'crest' in name else 220, None, q=84)
print('TONG', tot, round(tot / 1024, 1), 'KB')
