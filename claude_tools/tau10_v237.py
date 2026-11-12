# V237 · Tách lớp tàu 10 Tinh Hà bậc tím từ mẫu hướng đã chốt V231D (10_tinh_ha.png).
#  Thân = khối chính không phải màu khiên lục (lấp lỗ); khiên lục giác = phần lục còn lại; 3 tàu con (dưới thân) để riêng.
#  python3 claude_tools/tau10_v237.py <anh.png> <thu_muc_ra>
import sys, json
import numpy as np, cv2
from PIL import Image
f, OUT = sys.argv[1:3]
A = np.asarray(Image.open(f).convert('RGB')).astype(np.float32); H, W = A.shape[:2]
bg = np.median(np.concatenate([A[:10].reshape(-1, 3), A[-10:].reshape(-1, 3)]), 0)
E = np.clip(A - bg - 2, 0, 255); d = np.abs(A - bg).max(-1)
R, G, B = A[..., 0], A[..., 1], A[..., 2]
green = (G > R + 25) & (G > B - 30)
fg = d > 40
nonG = (fg & ~green).astype(np.uint8)
nonG = cv2.morphologyEx(nonG, cv2.MORPH_OPEN, np.ones((3, 3), np.uint8))
n, lab, st, _ = cv2.connectedComponentsWithStats(nonG)
order = np.argsort(-st[1:, 4]) + 1
main = lab == order[0]
main = cv2.morphologyEx(main.astype(np.uint8), cv2.MORPH_CLOSE, np.ones((9, 9), np.uint8))
ff = main.copy(); msk = np.zeros((H + 2, W + 2), np.uint8); cv2.floodFill(ff, msk, (0, 0), 2); hull = (main > 0) | (ff == 0)
ys, xs = np.where(hull); x0, x1, y0, y1 = xs.min(), xs.max(), ys.min(), ys.max()
# tàu con: các khối không-lục lớn nằm dưới thân
drones = np.zeros((H, W), bool)
for i in order[1:8]:
    xa, ya, wa, ha, ar = st[i]
    if ar > 1500 and ya > y1 - 40: drones |= lab == i
drones = cv2.dilate(drones.astype(np.uint8), np.ones((25, 25), np.uint8)).astype(bool) & (d > 18)
AX = (x0 + x1 + 1) / 2
al = cv2.GaussianBlur(hull.astype(np.float32), (3, 3), 0)
cx, cy = AX, (y0 + y1 + 1) / 2
F = 456 / max(x1 - x0 + 1, y1 - y0 + 1)
Mh = np.float32([[F, 0, 256 - cx * F], [0, F, 256 - cy * F]])
h5 = cv2.warpAffine(np.dstack([A * al[..., None], al * 255]), Mh, (512, 512), flags=cv2.INTER_AREA)
a5 = h5[..., 3:4] / 255; h5[..., :3] = np.where(a5 > 0, h5[..., :3] / np.maximum(a5, 1e-3), 0)
Image.fromarray(h5.clip(0, 255).astype(np.uint8), 'RGBA').save(f'{OUT}/tau10_tim_bt_claude_tach.png')
dm = drones.astype(np.float32); dd = np.dstack([A * dm[..., None], dm * 255])
Image.fromarray(dd.clip(0, 255).astype(np.uint8), 'RGBA').crop((0, int(y1 - 40), W, H)).save(f'{OUT}/tau10_tau_con_mau.png')
E1 = E * (~cv2.dilate(hull.astype(np.uint8), np.ones((5, 5), np.uint8)).astype(bool) & ~drones)[..., None]
lum = lambda X: X[..., 0] * .299 + X[..., 1] * .587 + X[..., 2] * .114
g1 = lum(E1); ramp = [[0.0, 0, 0, 0]]
for lo in range(0, 256, 16):
    mm = (g1 > max(lo, 4)) & (g1 <= lo + 16)
    if mm.sum() < 30: continue
    ramp.append([round(float(np.median(g1[mm])) / 255, 3)] + [int(v) for v in np.median(E1[mm], 0)])
FX = 1536
Mfx = np.float32([[F, 0, FX / 2 - cx * F], [0, F, FX / 2 - cy * F]])
g = np.clip(cv2.warpAffine(g1, Mfx, (FX, FX), flags=cv2.INTER_AREA), 0, 255).astype(np.uint8)
Image.fromarray(np.dstack([g, g, g, g]), 'RGBA').save(f'{OUT}/tau10_fx_khien.png')
Ew = np.clip(cv2.warpAffine(E1, Mfx, (FX, FX), flags=cv2.INTER_AREA), 0, 255); mx = Ew.max(-1, keepdims=True)
Image.fromarray(np.dstack([np.where(mx > 0, Ew / np.maximum(mx, 1) * 255, 0), mx]).clip(0, 255).astype(np.uint8), 'RGBA').save(f'{OUT}/tau10_fx_khien_mau.png')
json.dump({'khien': ramp}, open(f'{OUT}/tau10_ramp.json', 'w'))
ysg, xsg = np.where(g > 10)
SO = {'nen': bg.tolist(), 'than_khung_bao_anh': [int(x0), int(x1), int(y0), int(y1)], 'he_so': round(F, 4), 'than_512': [round((x1 - x0 + 1) * F), round((y1 - y0 + 1) * F)],
      'fx_khung_bao_1536': [int(xsg.min()), int(xsg.max()), int(ysg.min()), int(ysg.max())], 'so_tau_con_px': int(drones.sum())}
json.dump(SO, open(f'{OUT}/so_do.json', 'w'), ensure_ascii=False, indent=1); print(json.dumps(SO, ensure_ascii=False))
