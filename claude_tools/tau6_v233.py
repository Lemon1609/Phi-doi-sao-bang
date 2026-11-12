# V233 · Tách lớp tàu 6 U Linh bậc tím từ ảnh bung đã duyệt (12/11 14:43). Thân tách bằng màu (năng lượng = lam lơ sáng), không theo dải cột.
#  python3 claude_tools/tau6_v233.py <anh_duyet.png> <thu_muc_ra>
import sys, json
import numpy as np, cv2
from PIL import Image
f, OUT = sys.argv[1:3]
A = np.asarray(Image.open(f).convert('RGB')).astype(np.float32); Hh, W = A.shape[:2]
bg = np.median(np.concatenate([A[:10].reshape(-1, 3), A[-10:].reshape(-1, 3)]), 0)
E = np.clip(A - bg - 2, 0, 255); d = E.max(-1)
hsv = cv2.cvtColor(A.astype(np.uint8), cv2.COLOR_RGB2HSV).astype(np.float32); H = hsv[..., 0] * 2; S = hsv[..., 1] / 255; V = hsv[..., 2] / 255
energy = (H > 185) & (H < 245) & (S > .35) & (V > .45)
m = ((~energy) & (np.abs(A - bg).max(-1) > 18)).astype(np.uint8); m[:, :600] = 0; m[:, 1180:] = 0; m[:150] = 0; m[700:] = 0
m = cv2.morphologyEx(m, cv2.MORPH_OPEN, np.ones((5, 5), np.uint8))
n, lab, st, _ = cv2.connectedComponentsWithStats(m); k = 1 + np.argmax(st[1:, 4]); M = (lab == k).astype(np.uint8)
M = cv2.morphologyEx(M, cv2.MORPH_CLOSE, np.ones((15, 15), np.uint8))
cnts, _ = cv2.findContours(M, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE); Fm = np.zeros_like(M); cv2.drawContours(Fm, cnts, -1, 1, -1)
al = cv2.GaussianBlur(Fm.astype(np.float32), (3, 3), 0)
ys, xs = np.where(Fm > 0); x0, x1, y0, y1 = xs.min(), xs.max(), ys.min(), ys.max(); cx, cy = (x0 + x1 + 1) / 2, (y0 + y1 + 1) / 2
F = 456 / max(x1 - x0 + 1, y1 - y0 + 1)
Mh = np.float32([[F, 0, 256 - cx * F], [0, F, 256 - cy * F]])
hull = cv2.warpAffine(np.dstack([A * al[..., None], al * 255]), Mh, (512, 512), flags=cv2.INTER_AREA)
a5 = hull[..., 3:4] / 255; hull[..., :3] = np.where(a5 > 0, hull[..., :3] / np.maximum(a5, 1e-3), 0)
hull = hull.clip(0, 255).astype(np.uint8)
Image.fromarray(hull, 'RGBA').save(f'{OUT}/tau6_tim.png'); Image.fromarray(hull, 'RGBA').save(f'{OUT}/tau6_tim_bt.png')
E1 = E * (1 - cv2.dilate(Fm, np.ones((3, 3), np.uint8))[..., None])
lum = lambda X: X[..., 0] * .299 + X[..., 1] * .587 + X[..., 2] * .114
g1 = lum(E1); ramp = [[0.0, 0, 0, 0]]
for lo in range(0, 256, 16):
    mm = (g1 > max(lo, 4)) & (g1 <= lo + 16)
    if mm.sum() < 30: continue
    ramp.append([round(float(np.median(g1[mm])) / 255, 3)] + [int(v) for v in np.median(E1[mm], 0)])
FX = 1536
Mfx = np.float32([[F, 0, FX / 2 - cx * F], [0, F, FX / 2 - cy * F]])
g = np.clip(cv2.warpAffine(g1, Mfx, (FX, FX), flags=cv2.INTER_AREA), 0, 255).astype(np.uint8)
Image.fromarray(np.dstack([g, g, g, g]), 'RGBA').save(f'{OUT}/tau6_fx_so.png')
Ew = np.clip(cv2.warpAffine(E1, Mfx, (FX, FX), flags=cv2.INTER_AREA), 0, 255); mx = Ew.max(-1, keepdims=True)
Image.fromarray(np.dstack([np.where(mx > 0, Ew / np.maximum(mx, 1) * 255, 0), mx]).clip(0, 255).astype(np.uint8), 'RGBA').save(f'{OUT}/tau6_fx_so_mau.png')
json.dump({'so': ramp}, open(f'{OUT}/tau6_ramp.json', 'w'))
ysg, xsg = np.where(g > 10)
piv = [[round((x0 - cx) * F + 256 + 30, 1), round(256 - 20, 1)], [round((x1 - cx) * F + 256 - 30, 1), round(256 - 20, 1)]]
SO = {'than_khung_bao_anh': [int(x0), int(x1), int(y0), int(y1)], 'he_so': round(F, 4), 'than_512': [round((x1 - x0 + 1) * F), round((y1 - y0 + 1) * F)],
      'fx_khung_bao_1536': [int(xsg.min()), int(xsg.max()), int(ysg.min()), int(ysg.max())], 'goc_512': piv}
json.dump(SO, open(f'{OUT}/so_do.json', 'w'), ensure_ascii=False); print(SO)
