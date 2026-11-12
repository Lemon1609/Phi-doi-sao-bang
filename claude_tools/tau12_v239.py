# V239 · tàu 12 Thời Không: 12 thân GPT → 512 (cùng MỘT hệ số, tâm = tâm thân GPT bậc tím; _bt = thân thường + phần mở cắt từ bản bt GPT)
#  + lớp bung "mảnh giáp ngưng thời gian + mặt đồng hồ hở" tách từ ảnh bung bậc tím GPT (dò thân 512 trên ảnh, xóa thân).
#  python3 claude_tools/tau12_v239.py <thư mục GPT> <thư mục ra>
import sys, json
import numpy as np, cv2
from PIL import Image
G, OUT = sys.argv[1:3]
L = lambda p: np.asarray(Image.open(p).convert('RGBA')).astype(np.float32)
T = ['thuong', 'luc', 'lam', 'tim', 'tim5', 'ss']
def bbox(a, th=128):
    ys, xs = np.where(a > th); return xs.min(), xs.max(), ys.min(), ys.max()
def over(top, bot):
    ta = top[..., 3:4] / 255; ba = bot[..., 3:4] / 255; oa = ta + ba * (1 - ta)
    return np.dstack([(top[..., :3] * ta + bot[..., :3] * ba * (1 - ta)) / np.maximum(oa, 1e-6), oa * 255])
ext = 0
for t in T:
    for sfx in ('', '_bt'):
        x0, x1, y0, y1 = bbox(L(f'{G}/tau12_{t}{sfx}.png')[..., 3]); ext = max(ext, x1 - x0 + 1, y1 - y0 + 1)
F = 456 / ext
x0, x1, y0, y1 = bbox(L(f'{G}/tau12_tim.png')[..., 3]); CX, CY = (x0 + x1 + 1) / 2, (y0 + y1 + 1) / 2
SO = {'he_so_chung': round(F, 4), 'tam_tim_gpt': [CX, CY]}
M = np.float32([[F, 0, 256 - CX * F], [0, F, 256 - CY * F]])
for t in T:
    N = L(f'{G}/tau12_{t}.png'); B = L(f'{G}/tau12_{t}_bt.png')
    for X in (N, B): X[..., 3] = np.where(X[..., 3] < 24, 0, X[..., 3])
    core = (N[..., 3] > 200).astype(np.float32); core[:, :int(CX - 90)] = 0; core[:, int(CX + 90):] = 0
    pad = 30; Bp = cv2.copyMakeBorder(B, pad, pad, pad, pad, cv2.BORDER_CONSTANT)
    r = cv2.matchTemplate(Bp[..., :3], N[..., :3], cv2.TM_SQDIFF, mask=np.dstack([core] * 3)); _, _, loc, _ = cv2.minMaxLoc(r)
    Ba = cv2.warpAffine(B, np.float32([[1, 0, -(loc[0] - pad)], [0, 1, -(loc[1] - pad)]]), (N.shape[1], N.shape[0]))
    sp = ((Ba[..., 3] > 8) & (N[..., 3] < 40)).astype(np.uint8); sp = cv2.morphologyEx(sp, cv2.MORPH_OPEN, np.ones((5, 5), np.uint8)); sp = cv2.dilate(sp, np.ones((3, 3), np.uint8))
    S = Ba.copy(); S[sp == 0] = 0
    N5 = cv2.warpAffine(N, M, (512, 512), flags=cv2.INTER_AREA); BT5 = cv2.warpAffine(over(N, S), M, (512, 512), flags=cv2.INTER_AREA)
    Image.fromarray(N5.clip(0, 255).astype(np.uint8), 'RGBA').save(f'{OUT}/tau12_{t}.png')
    Image.fromarray(BT5.clip(0, 255).astype(np.uint8), 'RGBA').save(f'{OUT}/tau12_{t}_bt.png')
    a = N5[..., 3]; m = a > 128; px = N5[..., :3][m]; mx = px.max(1); mn = px.min(1); n0 = bbox(a); xb0, xb1, yb0, yb1 = bbox(BT5[..., 3], 24)
    SO[t] = {'lech_bt': [int(loc[0] - pad), int(loc[1] - pad)], 'than_512': [int(n0[1] - n0[0] + 1), int(n0[3] - n0[2] + 1)], 'bao_hoa': round(float(((mx - mn) / np.maximum(mx, 1)).mean()), 2),
             'bt_le_min': int(min(xb0, yb0, 511 - xb1, 511 - yb1)), 'phan_mo_px': int((sp > 0).sum())}
# lớp bung: dò thân Bạo Tẩu bậc tím (512) trên ảnh bung
A = np.asarray(Image.open(f'{G}/tau12_bung_tim.png').convert('RGB')).astype(np.float32)
Tb = L(f'{OUT}/tau12_tim_bt.png')
bg = np.median(np.concatenate([A[:10].reshape(-1, 3), A[-10:].reshape(-1, 3)]), 0)
best = None
for s in np.arange(.5, 1.6, .005):
    ts = cv2.resize(Tb, None, fx=s, fy=s, interpolation=cv2.INTER_AREA); a = ts[..., 3] / 255; h, w = a.shape
    m = (a > .95).astype(np.float32); m[:, :int(w * .42)] = 0; m[:, int(w * .58):] = 0
    r = cv2.matchTemplate(A, ts[..., :3], cv2.TM_SQDIFF, mask=np.dstack([m] * 3)); v, _, loc, _ = cv2.minMaxLoc(r); v /= m.sum() * 3
    if best is None or v < best[0]: best = (v, s, loc)
v, s, loc = best; cx, cy = loc[0] + 256 * s, loc[1] + 256 * s
ts = cv2.resize(Tb, None, fx=s, fy=s, interpolation=cv2.INTER_AREA); hm = np.zeros(A.shape[:2], np.uint8); hh, ww = ts.shape[:2]
hm[loc[1]:loc[1] + hh, loc[0]:loc[0] + ww] = ts[..., 3] > 30; hm = cv2.dilate(hm, np.ones((5, 5), np.uint8)) > 0
E = np.clip(A - bg - 2, 0, 255); E1 = E * (~hm)[..., None]
FX = 1536; K = 1 / s; Mfx = np.float32([[K, 0, FX / 2 - cx * K], [0, K, FX / 2 - cy * K]])
lum = lambda X: X[..., 0] * .299 + X[..., 1] * .587 + X[..., 2] * .114
g1 = lum(E1); g = np.clip(cv2.warpAffine(g1, Mfx, (FX, FX), flags=cv2.INTER_AREA), 0, 255).astype(np.uint8)
Image.fromarray(np.dstack([g, g, g, g]), 'RGBA').save(f'{OUT}/tau12_fx_tg.png')
Ew = np.clip(cv2.warpAffine(E1, Mfx, (FX, FX), flags=cv2.INTER_AREA), 0, 255); mx = Ew.max(-1, keepdims=True)
Image.fromarray(np.dstack([np.where(mx > 0, Ew / np.maximum(mx, 1) * 255, 0), mx]).clip(0, 255).astype(np.uint8), 'RGBA').save(f'{OUT}/tau12_fx_tg_mau.png')
ramp = [[0.0, 0, 0, 0]]
for lo in range(0, 256, 16):
    mm = (g1 > max(lo, 4)) & (g1 <= lo + 16)
    if mm.sum() < 30: continue
    ramp.append([round(float(np.median(g1[mm])) / 255, 3)] + [int(v) for v in np.median(E1[mm], 0)])
json.dump({'tg': ramp}, open(f'{OUT}/tau12_ramp.json', 'w'))
ysg, xsg = np.where(g > 10)
SO['khop_than_anh_bung'] = {'ti_le': round(float(s), 4), 'vi_tri': list(map(int, loc)), 'rmse': round(float(v) ** .5, 1), 'tam': [round(cx, 1), round(cy, 1)]}
SO['fx_khung_bao_1536'] = [int(xsg.min()), int(xsg.max()), int(ysg.min()), int(ysg.max())]
json.dump(SO, open(f'{OUT}/so_do.json', 'w'), ensure_ascii=False, indent=1); print(json.dumps(SO, ensure_ascii=False))
