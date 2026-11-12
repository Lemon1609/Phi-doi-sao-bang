# V236 · tàu 6: hình bung MỚI (cánh bóng ma tan rã số, GPT 12/11 19:53) — thân giữ nguyên.
#  Dò thân 512 đang dùng (tau6_tim.png) trên ảnh mới → xóa thân → lớp năng lượng 1536 (tâm thân ở giữa, cùng tỉ lệ thân 512),
#  bản màu bậc tím, dải màu, lớp 2 (cùng khung ảnh 1).
#  python3 claude_tools/tau6_v236.py <tau6_bung_moi.png> <tau6_bung_moi_tang2.png> <tau6_tim.png 512> <thư mục ra>
import sys, json
import numpy as np, cv2
from PIL import Image
fA, f2, fT, OUT = sys.argv[1:5]
A = np.asarray(Image.open(fA).convert('RGB')).astype(np.float32)
T = np.asarray(Image.open(fT).convert('RGBA')).astype(np.float32)
bg = np.median(np.concatenate([A[:10].reshape(-1, 3), A[-10:].reshape(-1, 3)]), 0)
best = None
for s in np.arange(.6, 1.6, .005):
    ts = cv2.resize(T, None, fx=s, fy=s, interpolation=cv2.INTER_AREA); a = ts[..., 3] / 255; h, w = a.shape
    m = (a > .95).astype(np.float32); m[:, :int(w * .42)] = 0; m[:, int(w * .58):] = 0
    r = cv2.matchTemplate(A, ts[..., :3], cv2.TM_SQDIFF, mask=np.dstack([m] * 3)); v, _, loc, _ = cv2.minMaxLoc(r); v /= m.sum() * 3
    if best is None or v < best[0]: best = (v, s, loc)
v, s, loc = best
cx, cy = loc[0] + 256 * s, loc[1] + 256 * s           # tâm thân 512 trên ảnh mới
ts = cv2.resize(T, None, fx=s, fy=s, interpolation=cv2.INTER_AREA); hm = np.zeros(A.shape[:2], np.uint8)
hh, ww = ts.shape[:2]; hm[loc[1]:loc[1] + hh, loc[0]:loc[0] + ww] = ts[..., 3] > 30
# phần thân GPT vẽ hơi khác (mép tối): nới mặt nạ theo vùng tối quanh thân
dark = (A.max(-1) < 70) & (np.abs(A - bg).max(-1) > 18)
near = cv2.dilate(hm, np.ones((15, 15), np.uint8)) > 0
hm = (cv2.dilate(hm, np.ones((5, 5), np.uint8)) > 0) | (dark & near)
E = np.clip(A - bg - 2, 0, 255); E1 = E * (~hm)[..., None]
# khung 2048 (đơn vị thân 512) để chứa hết sải cánh mới; lưu ở 1536 px (vẽ theo khung, không theo độ phân giải ảnh)
FR = 2048; FX = 1536; K = FX / FR / s
Mfx = np.float32([[K, 0, FX / 2 - cx * K], [0, K, FX / 2 - cy * K]])
lum = lambda X: X[..., 0] * .299 + X[..., 1] * .587 + X[..., 2] * .114
g1 = lum(E1)
g = np.clip(cv2.warpAffine(g1, Mfx, (FX, FX), flags=cv2.INTER_AREA), 0, 255).astype(np.uint8)
Image.fromarray(np.dstack([g, g, g, g]), 'RGBA').save(f'{OUT}/tau6_fx_so.png')
Ew = np.clip(cv2.warpAffine(E1, Mfx, (FX, FX), flags=cv2.INTER_AREA), 0, 255); mx = Ew.max(-1, keepdims=True)
Image.fromarray(np.dstack([np.where(mx > 0, Ew / np.maximum(mx, 1) * 255, 0), mx]).clip(0, 255).astype(np.uint8), 'RGBA').save(f'{OUT}/tau6_fx_so_mau.png')
ramp = [[0.0, 0, 0, 0]]
for lo in range(0, 256, 16):
    mm = (g1 > max(lo, 4)) & (g1 <= lo + 16)
    if mm.sum() < 30: continue
    ramp.append([round(float(np.median(g1[mm])) / 255, 3)] + [int(v) for v in np.median(E1[mm], 0)])
t2 = np.asarray(Image.open(f2).convert('RGBA')).astype(np.float32)
if t2[..., 3].min() > 250:   # không có kênh trong suốt → trừ nền
    g2 = lum(np.clip(t2[..., :3] - bg - 2, 0, 255))
else:
    g2 = lum(t2[..., :3]) * t2[..., 3] / 255
g2 = np.where(g2 < 8, 0, g2)
g2 = np.clip(cv2.warpAffine(g2, Mfx, (FX, FX), flags=cv2.INTER_AREA), 0, 255).astype(np.uint8)
Image.fromarray(np.dstack([g2, g2, g2, g2]), 'RGBA').save(f'{OUT}/tau6_fx_so3.png')
json.dump({'so': ramp}, open(f'{OUT}/tau6_ramp.json', 'w'))
ysg, xsg = np.where(g > 10)
# gốc cánh: điểm năng lượng sáng (>40 % đỉnh) sát thân nhất mỗi bên, quy về 512
gg = cv2.GaussianBlur(g.astype(np.float32), (9, 9), 0); th = gg.max() * .4; piv = []
for side in (-1, 1):
    ys, xs = np.where(gg > th); sel = (xs < 768) if side < 0 else (xs > 768); ys, xs = ys[sel], xs[sel]
    i = np.argmax(xs) if side < 0 else np.argmin(xs); piv.append([round(float(xs[i] - 768) * FR / FX + 256, 1), round(float(ys[i] - 768) * FR / FX + 256, 1)])
SO = {'khop_than': {'ti_le_512_sang_anh': round(float(s), 4), 'vi_tri': list(map(int, loc)), 'rmse': round(float(v) ** .5, 1), 'tam': [round(cx, 1), round(cy, 1)]},
      'fx_khung_bao_anh_1536_khung_2048': [int(xsg.min()), int(xsg.max()), int(ysg.min()), int(ysg.max())], 'goc_canh_512': piv, 'so_bac_dai_mau': len(ramp),
      'lop2_khac_0': int((g2 > 10).sum())}
json.dump(SO, open(f'{OUT}/so_do.json', 'w'), ensure_ascii=False, indent=1); print(json.dumps(SO, ensure_ascii=False))
