# V234B · tàu 2: thân bậc tím sạch của GPT + 5 bậc, cùng MỘT hệ số (bậc cao nhất chạm 456 px); lớp màn cực quang cắt lại từ mẫu
#  theo đúng vị trí thân GPT (dò khớp thân GPT trên ảnh mẫu).
#  python3 claude_tools/tau2_v234b.py <thư mục GPT> <ảnh mẫu> <mask thân mẫu .npy> <thư mục ra>
import sys, json
import numpy as np, cv2
from PIL import Image
G, fA, fM, OUT = sys.argv[1:5]
L = lambda p: np.asarray(Image.open(p).convert('RGBA')).astype(np.float32)
T = ['thuong', 'luc', 'lam', 'tim', 'tim5', 'ss']
def bbox(a, th=128):
    ys, xs = np.where(a > th); return xs.min(), xs.max(), ys.min(), ys.max()
H = {}
for t in T:
    x0, x1, y0, y1 = bbox(L(f'{G}/tau2_{t}.png')[..., 3]); H[t] = (x1 - x0 + 1, y1 - y0 + 1)
F = 456 / max(max(v) for v in H.values())
CX, CY = 627, 627                                  # GPT vẽ mọi bậc quanh tâm khung 1254 (giữ đúng tương quan vị trí)
x0, x1, y0, y1 = bbox(L(f'{G}/tau2_tim.png')[..., 3]); CX, CY = (x0 + x1 + 1) / 2, (y0 + y1 + 1) / 2
SO = {'he_so_chung': round(F, 4), 'tam_tim_gpt': [CX, CY]}
M = np.float32([[F, 0, 256 - CX * F], [0, F, 256 - CY * F]])
def over(top, bot):
    ta = top[..., 3:4] / 255; ba = bot[..., 3:4] / 255; oa = ta + ba * (1 - ta)
    return np.dstack([(top[..., :3] * ta + bot[..., :3] * ba * (1 - ta)) / np.maximum(oa, 1e-6), oa * 255])
for t in T:
    N = L(f'{G}/tau2_{t}.png')
    N[..., 3] = np.where(N[..., 3] < 24, 0, N[..., 3])           # bỏ hạt màu mờ ở viền
    pb = f'{G}/tau2_{t}_bt.png'
    N5 = cv2.warpAffine(N, M, (512, 512), flags=cv2.INTER_AREA)
    if t != 'tim':
        B = L(pb); B[..., 3] = np.where(B[..., 3] < 24, 0, B[..., 3])
        core = (N[..., 3] > 200).astype(np.float32); core[:, :520] = 0; core[:, 734:] = 0
        pad = 30; Bp = cv2.copyMakeBorder(B, pad, pad, pad, pad, cv2.BORDER_CONSTANT)
        r = cv2.matchTemplate(Bp[..., :3], N[..., :3], cv2.TM_SQDIFF, mask=np.dstack([core] * 3)); _, _, loc, _ = cv2.minMaxLoc(r)
        Ba = cv2.warpAffine(B, np.float32([[1, 0, -(loc[0] - pad)], [0, 1, -(loc[1] - pad)]]), (1254, 1254))
        sp = ((Ba[..., 3] > 8) & (N[..., 3] < 40)).astype(np.uint8); sp = cv2.morphologyEx(sp, cv2.MORPH_OPEN, np.ones((5, 5), np.uint8))
        S = Ba.copy(); S[sp == 0] = 0
        P = 200; Mw = M.copy(); Mw[0, 2] += P
        S5 = cv2.warpAffine(S, Mw, (512 + 2 * P, 512), flags=cv2.INTER_AREA)
        ys, xs = np.where(S5[..., 3] > 24); k = 1.0
        if len(xs):
            ext = max(P + 24 - xs.min(), xs.max() - (P + 487), 24 - ys.min(), 0)
            if ext > 0:   # thu phần mở quanh tâm thân cho lọt khung
                half = (xs.max() - xs.min()) / 2; k = max(.7, 1 - ext / half)
                A2 = np.float32([[k, 0, (256 + P) * (1 - k)], [0, k, 256 * (1 - k)]]); S5 = cv2.warpAffine(S5, A2, (512 + 2 * P, 512), flags=cv2.INTER_AREA)
        BT = over(N5, S5[:, P:P + 512])
        SO[t] = {'lech_bt_GPT': [int(loc[0] - pad), int(loc[1] - pad)], 'thu_phan_mo': round(k, 3)}
    else:
        BT = N5
    Image.fromarray(N5.clip(0, 255).astype(np.uint8), 'RGBA').save(f'{OUT}/tau2_{t}.png')
    Image.fromarray(BT.clip(0, 255).astype(np.uint8), 'RGBA').save(f'{OUT}/tau2_{t}_bt.png')
    a = BT[..., 3]; xb0, xb1, yb0, yb1 = bbox(a, 24); n0 = bbox(N5[..., 3])
    SO.setdefault(t, {}).update({'than_512': [int(n0[1] - n0[0] + 1), int(n0[3] - n0[2] + 1)], 'bt_le_min': int(min(xb0, yb0, 511 - xb1, 511 - yb1)),
        'than_giua_khac': round(float(np.abs(BT[..., :3] - N5[..., :3]).mean(-1)[N5[..., 3] > 200].mean()), 2)})
# lớp màn cực quang: dò thân GPT bậc tím trên ảnh mẫu → cắt lại năng lượng của mẫu đúng hệ tọa độ thân mới
A = np.asarray(Image.open(fA).convert('RGB')).astype(np.float32); Tg = L(f'{G}/tau2_tim.png')
best = None
for s in np.arange(.55, 1.15, .005):
    ts = cv2.resize(Tg, None, fx=s, fy=s, interpolation=cv2.INTER_AREA); a = ts[..., 3] / 255; h, w = a.shape
    if h > A.shape[0] or w > A.shape[1]: continue
    m = (a > .9).astype(np.float32); m[:, :int(w * .4)] = 0; m[:, int(w * .6):] = 0
    r = cv2.matchTemplate(A, ts[..., :3], cv2.TM_SQDIFF, mask=np.dstack([m] * 3)); v, _, loc, _ = cv2.minMaxLoc(r); v /= m.sum() * 3
    if best is None or v < best[0]: best = (v, s, loc)
v, s, loc = best; SO['khop_mau'] = {'ti_le': round(float(s), 4), 'vi_tri': list(map(int, loc)), 'rmse': round(float(v) ** .5, 1)}
bg = np.median(np.concatenate([A[:10].reshape(-1, 3), A[-10:].reshape(-1, 3)]), 0); E = np.clip(A - bg - 2, 0, 255)
# xóa thân: mặt nạ thân GPT đặt lên mẫu + mặt nạ thân cũ
ts = cv2.resize(Tg, None, fx=s, fy=s, interpolation=cv2.INTER_AREA); hm = np.zeros(A.shape[:2], np.float32)
hh, ww = ts.shape[:2]; hm[loc[1]:loc[1] + hh, loc[0]:loc[0] + ww] = (ts[..., 3] > 30)
hm = np.maximum(hm, np.load(fM).astype(np.float32)); hm = cv2.dilate(hm, np.ones((5, 5), np.uint8))
E1 = E * (1 - hm[..., None])
# mẫu → 512: điểm mẫu (X,Y) = loc + s·(x,y) GPT → 512 = (x - CX)·F + 256
K = F / s; ox = 640 - (loc[0] + s * CX) * K; oy = 640 - (loc[1] + s * CY) * K
Mfx = np.float32([[K, 0, ox], [0, K, oy]]); FX = 1280
lum = lambda X: X[..., 0] * .299 + X[..., 1] * .587 + X[..., 2] * .114
g = np.clip(cv2.warpAffine(lum(E1), Mfx, (FX, FX), flags=cv2.INTER_AREA), 0, 255).astype(np.uint8)
Image.fromarray(np.dstack([g, g, g, g]), 'RGBA').save(f'{OUT}/tau2_fx_cq.png')
Ew = np.clip(cv2.warpAffine(E1, Mfx, (FX, FX), flags=cv2.INTER_AREA), 0, 255); mx = Ew.max(-1, keepdims=True)
Image.fromarray(np.dstack([np.where(mx > 0, Ew / np.maximum(mx, 1) * 255, 0), mx]).clip(0, 255).astype(np.uint8), 'RGBA').save(f'{OUT}/tau2_fx_cq_mau.png')
g1 = lum(E1); ramp = [[0.0, 0, 0, 0]]
for lo in range(0, 256, 16):
    mm = (g1 > max(lo, 4)) & (g1 <= lo + 16)
    if mm.sum() < 30: continue
    ramp.append([round(float(np.median(g1[mm])) / 255, 3)] + [int(v) for v in np.median(E1[mm], 0)])
# lớp 2 của GPT: cùng khung 1254 với thân → 1280 theo hệ số F, tâm CX,CY
t2 = L(f'{G}/tau2_fx_cq_tang2.png'); g2 = t2[..., :3].mean(-1) * t2[..., 3] / 255; g2 = np.where(g2 < 10, 0, g2)
g2 = np.clip(cv2.warpAffine(g2, np.float32([[F, 0, 640 - CX * F], [0, F, 640 - CY * F]]), (FX, FX), flags=cv2.INTER_AREA), 0, 255).astype(np.uint8)
Image.fromarray(np.dstack([g2, g2, g2, g2]), 'RGBA').save(f'{OUT}/tau2_fx_cq3.png')
json.dump({'cq': ramp}, open(f'{OUT}/tau2_ramp.json', 'w'))
json.dump(SO, open(f'{OUT}/so_do.json', 'w'), ensure_ascii=False, indent=1); print(json.dumps(SO, ensure_ascii=False))
