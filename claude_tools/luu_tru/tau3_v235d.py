# V235D · tàu 3: cánh bung MỚI "tinh thể nạp năng lượng cho súng" (GPT 12/11 20:18) — thân giữ nguyên (tau3_tim_bt.png 512).
#  Dò thân 512 trên ảnh mới → xóa thân → lớp năng lượng khung 1280 (đơn vị thân 512, tâm thân ở giữa) + bản màu + dải màu + gốc cánh.
#  python3 claude_tools/tau3_v235d.py <ảnh bung mới> <tau3_tim_bt.png 512> <thư mục ra>
import sys, json
import numpy as np, cv2
from PIL import Image
fA, fT, OUT = sys.argv[1:4]
A = np.asarray(Image.open(fA).convert('RGB')).astype(np.float32)
T = np.asarray(Image.open(fT).convert('RGBA')).astype(np.float32)
bg = np.median(np.concatenate([A[:10].reshape(-1, 3), A[-10:].reshape(-1, 3)]), 0)
best = None
for s in np.arange(1.2, 2.2, .005):
    ts = cv2.resize(T, None, fx=s, fy=s, interpolation=cv2.INTER_AREA); a = ts[..., 3] / 255; h, w = a.shape
    if h > A.shape[0] or w > A.shape[1]: continue
    m = (a > .95).astype(np.float32); m[:, :int(w * .44)] = 0; m[:, int(w * .56):] = 0
    r = cv2.matchTemplate(A, ts[..., :3], cv2.TM_SQDIFF, mask=np.dstack([m] * 3)); v, _, loc, _ = cv2.minMaxLoc(r); v /= m.sum() * 3
    if best is None or v < best[0]: best = (v, s, loc)
v, s, loc = best
cx, cy = loc[0] + 256 * s, loc[1] + 256 * s
ts = cv2.resize(T, None, fx=s, fy=s, interpolation=cv2.INTER_AREA); hm = np.zeros(A.shape[:2], np.uint8)
hh, ww = ts.shape[:2]
y0, x0 = max(loc[1], 0), max(loc[0], 0); y1, x1 = min(loc[1] + hh, A.shape[0]), min(loc[0] + ww, A.shape[1])
hm[y0:y1, x0:x1] = ts[y0 - loc[1]:y1 - loc[1], x0 - loc[0]:x1 - loc[0], 3] > 30
hm = cv2.dilate(hm, np.ones((5, 5), np.uint8)) > 0
E = np.clip(A - bg - 2, 0, 255); E1 = E * (~hm)[..., None]
FX = 1280; K = 1 / s
Mfx = np.float32([[K, 0, FX / 2 - cx * K], [0, K, FX / 2 - cy * K]])
lum = lambda X: X[..., 0] * .299 + X[..., 1] * .587 + X[..., 2] * .114
g1 = lum(E1)
g = np.clip(cv2.warpAffine(g1, Mfx, (FX, FX), flags=cv2.INTER_AREA), 0, 255).astype(np.uint8)
Image.fromarray(np.dstack([g, g, g, g]), 'RGBA').save(f'{OUT}/tau3_fx_tt.png')
Ew = np.clip(cv2.warpAffine(E1, Mfx, (FX, FX), flags=cv2.INTER_AREA), 0, 255); mx = Ew.max(-1, keepdims=True)
Image.fromarray(np.dstack([np.where(mx > 0, Ew / np.maximum(mx, 1) * 255, 0), mx]).clip(0, 255).astype(np.uint8), 'RGBA').save(f'{OUT}/tau3_fx_tt_mau.png')
ramp = [[0.0, 0, 0, 0]]
for lo in range(0, 256, 16):
    mm = (g1 > max(lo, 4)) & (g1 <= lo + 16)
    if mm.sum() < 30: continue
    ramp.append([round(float(np.median(g1[mm])) / 255, 3)] + [int(v) for v in np.median(E1[mm], 0)])
json.dump({'tt': ramp}, open(f'{OUT}/tau3_ramp.json', 'w'))
# gốc cánh: khớp vai — điểm năng lượng sáng (≥ 60 % đỉnh) gần tâm thân nhất mỗi bên, trong nửa trên thân
gg = cv2.GaussianBlur(g.astype(np.float32), (15, 15), 0); th = gg.max() * .6; piv = []
for side in (-1, 1):
    ys, xs = np.where(gg > th); sel = ((xs < 640) if side < 0 else (xs > 640)) & (ys > 640 - 160) & (ys < 640 + 60); ys, xs = ys[sel], xs[sel]
    i = np.argmax(xs) if side < 0 else np.argmin(xs); piv.append([round(float(xs[i] - 640 + 256), 1), round(float(ys[i] - 640 + 256), 1)])
ysg, xsg = np.where(g > 10)
SO = {'khop_than': {'ti_le_512_sang_anh': round(float(s), 4), 'vi_tri': list(map(int, loc)), 'rmse': round(float(v) ** .5, 1), 'tam': [round(cx, 1), round(cy, 1)]},
      'fx_khung_bao_1280': [int(xsg.min()), int(xsg.max()), int(ysg.min()), int(ysg.max())], 'goc_canh_512': piv, 'so_bac_dai_mau': len(ramp)}
json.dump(SO, open(f'{OUT}/so_do.json', 'w'), ensure_ascii=False, indent=1); print(json.dumps(SO, ensure_ascii=False))
