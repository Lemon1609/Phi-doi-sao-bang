# V237B · tàu 10 (sao từ tau10_v235b.py): 12 thân GPT → 512, cùng MỘT hệ số (bậc cao nhất chạm 456 px);
#  _bt = thân thường + phần súng cắt từ bản bt GPT (thân giữa trùng khít); lớp tinh thể lấy từ ảnh mẫu (đã lấp chỗ càng kẹp)
#  theo đúng vị trí thân GPT (dò khớp cột giữa thân GPT bậc tím trên ảnh mẫu); lớp 2 của GPT (khung 1254 cùng hệ thân).
#  python3 claude_tools/tau10_v235b.py <thư mục GPT> <ảnh mẫu> <E1_mau.npy> <thư mục ra>
import sys, json
import numpy as np, cv2
from PIL import Image
G, fA, fE, OUT = sys.argv[1:5]
L = lambda p: np.asarray(Image.open(p).convert('RGBA')).astype(np.float32)
T = ['thuong', 'luc', 'lam', 'tim', 'tim5', 'ss']
def bbox(a, th=128):
    ys, xs = np.where(a > th); return xs.min(), xs.max(), ys.min(), ys.max()
def over(top, bot):
    ta = top[..., 3:4] / 255; ba = bot[..., 3:4] / 255; oa = ta + ba * (1 - ta)
    return np.dstack([(top[..., :3] * ta + bot[..., :3] * ba * (1 - ta)) / np.maximum(oa, 1e-6), oa * 255])
H = {}
for t in T:
    for sfx in ('', '_bt'):
        x0, x1, y0, y1 = bbox(L(f'{G}/tau10_{t}{sfx}.png')[..., 3]); H[t + sfx] = (x1 - x0 + 1, y1 - y0 + 1)
F = 456 / max(max(v) for v in H.values())
x0, x1, y0, y1 = bbox(L(f'{G}/tau10_tim.png')[..., 3]); CX, CY = (x0 + x1 + 1) / 2, (y0 + y1 + 1) / 2
SO = {'he_so_chung': round(F, 4), 'tam_tim_gpt': [CX, CY]}
M = np.float32([[F, 0, 256 - CX * F], [0, F, 256 - CY * F]])
for t in T:
    N = L(f'{G}/tau10_{t}.png'); N[..., 3] = np.where(N[..., 3] < 24, 0, N[..., 3])
    B = L(f'{G}/tau10_{t}_bt.png'); B[..., 3] = np.where(B[..., 3] < 24, 0, B[..., 3])
    core = (N[..., 3] > 200).astype(np.float32); core[:, :int(CX - 90)] = 0; core[:, int(CX + 90):] = 0
    pad = 30; Bp = cv2.copyMakeBorder(B, pad, pad, pad, pad, cv2.BORDER_CONSTANT)
    r = cv2.matchTemplate(Bp[..., :3], N[..., :3], cv2.TM_SQDIFF, mask=np.dstack([core] * 3)); _, _, loc, _ = cv2.minMaxLoc(r)
    Ba = cv2.warpAffine(B, np.float32([[1, 0, -(loc[0] - pad)], [0, 1, -(loc[1] - pad)]]), (N.shape[1], N.shape[0]))
    sp = ((Ba[..., 3] > 8) & (N[..., 3] < 40)).astype(np.uint8); sp = cv2.morphologyEx(sp, cv2.MORPH_OPEN, np.ones((5, 5), np.uint8))
    sp = cv2.dilate(sp, np.ones((3, 3), np.uint8))
    S = Ba.copy(); S[sp == 0] = 0
    N5 = cv2.warpAffine(N, M, (512, 512), flags=cv2.INTER_AREA); S5 = cv2.warpAffine(S, M, (512, 512), flags=cv2.INTER_AREA)
    BT = over(N5, S5)
    Image.fromarray(N5.clip(0, 255).astype(np.uint8), 'RGBA').save(f'{OUT}/tau10_{t}.png')
    Image.fromarray(BT.clip(0, 255).astype(np.uint8), 'RGBA').save(f'{OUT}/tau10_{t}_bt.png')
    xb0, xb1, yb0, yb1 = bbox(BT[..., 3], 24); n0 = bbox(N5[..., 3])
    SO[t] = {'lech_bt_GPT': [int(loc[0] - pad), int(loc[1] - pad)], 'than_512': [int(n0[1] - n0[0] + 1), int(n0[3] - n0[2] + 1)],
             'bt_le_min': int(min(xb0, yb0, 511 - xb1, 511 - yb1)),
             'than_giua_khac': round(float(np.abs(BT[..., :3] - N5[..., :3]).mean(-1)[N5[..., 3] > 200].mean()), 2)}
# dò thân GPT bậc tím trên ảnh mẫu (chỉ cột giữa: mũi pha lê, lõi tròn — phần giữ nguyên dáng)
A = np.asarray(Image.open(fA).convert('RGB')).astype(np.float32); Tg = L(f'{G}/tau10_tim.png')
best = None
for s in np.arange(.40, 1.0, .005):
    ts = cv2.resize(Tg, None, fx=s, fy=s, interpolation=cv2.INTER_AREA); a = ts[..., 3] / 255; h, w = a.shape
    if h > A.shape[0] or w > A.shape[1]: continue
    m = (a > .9).astype(np.float32); m[:, :int(w * .4)] = 0; m[:, int(w * .6):] = 0; m[int(h * .45):] = 0
    r = cv2.matchTemplate(A, ts[..., :3], cv2.TM_SQDIFF, mask=np.dstack([m] * 3)); v, _, loc, _ = cv2.minMaxLoc(r); v /= m.sum() * 3
    if best is None or v < best[0]: best = (v, s, loc)
v, s, loc = best; SO['khop_mau'] = {'ti_le': round(float(s), 4), 'vi_tri': list(map(int, loc)), 'rmse': round(float(v) ** .5, 1),
                                     'tam_than_gpt_tren_mau': [round(loc[0] + s * CX, 1), round(loc[1] + s * CY, 1)]}
E1 = np.load(fE).astype(np.float32)
K = F / s; FX = 1536; ox = FX / 2 - (loc[0] + s * CX) * K; oy = FX / 2 - (loc[1] + s * CY) * K
Mfx = np.float32([[K, 0, ox], [0, K, oy]])
lum = lambda X: X[..., 0] * .299 + X[..., 1] * .587 + X[..., 2] * .114
g = np.clip(cv2.warpAffine(lum(E1), Mfx, (FX, FX), flags=cv2.INTER_AREA), 0, 255).astype(np.uint8)
Image.fromarray(np.dstack([g, g, g, g]), 'RGBA').save(f'{OUT}/tau10_fx_khien.png')
Ew = np.clip(cv2.warpAffine(E1, Mfx, (FX, FX), flags=cv2.INTER_AREA), 0, 255); mx = Ew.max(-1, keepdims=True)
Image.fromarray(np.dstack([np.where(mx > 0, Ew / np.maximum(mx, 1) * 255, 0), mx]).clip(0, 255).astype(np.uint8), 'RGBA').save(f'{OUT}/tau10_fx_khien_mau.png')
g1 = lum(E1); ramp = [[0.0, 0, 0, 0]]
for lo in range(0, 256, 16):
    mm = (g1 > max(lo, 4)) & (g1 <= lo + 16)
    if mm.sum() < 30: continue
    ramp.append([round(float(np.median(g1[mm])) / 255, 3)] + [int(v) for v in np.median(E1[mm], 0)])
t2 = L(f'{G}/tau10_fx_khien_tang2.png'); g2 = t2[..., :3].mean(-1) * t2[..., 3] / 255; g2 = np.where(g2 < 10, 0, g2)
g2 = np.clip(cv2.warpAffine(g2, np.float32([[F, 0, FX / 2 - CX * F], [0, F, FX / 2 - CY * F]]), (FX, FX), flags=cv2.INTER_AREA), 0, 255).astype(np.uint8)
Image.fromarray(np.dstack([g2, g2, g2, g2]), 'RGBA').save(f'{OUT}/tau10_fx_khien3.png')
ysg, xsg = np.where(g > 10); SO['fx_khung_bao_1536'] = [int(xsg.min()), int(xsg.max()), int(ysg.min()), int(ysg.max())]
json.dump({'khien': ramp}, open(f'{OUT}/tau10_ramp.json', 'w'))
json.dump(SO, open(f'{OUT}/so_do.json', 'w'), ensure_ascii=False, indent=1); print(json.dumps(SO, ensure_ascii=False))
