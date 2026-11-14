# V231E · chuẩn hóa 5 bậc còn lại của tàu 8 (GPT vẽ ở khung 1254, cùng tỉ lệ giữa các bậc) về 512 × 512.
#  python3 claude_tools/tau8_v231e_bac.py <thư mục GPT> <tau8_tim.png 512> <tau8_tim_bt.png 512> <thư mục ra>
#  - Thân Bạo Tẩu = CHÍNH thân thường cùng bậc + sống cánh cắt từ bản bt của GPT (thân giữa trùng khít tuyệt đối).
#  - Cùng một hệ số cho cả 5 bậc (giữ tương quan cỡ GPT vẽ: bậc thấp nhỏ hơn); bậc cao nhất chạm cạnh dài 456 px.
#  - Sống cánh quá dài thì thu quanh chân cho mũi cách mép khung ≥ 24 px.
#  - Ghi gốc vai từng bậc (so với bậc tím) để game đặt cánh năng lượng.
import sys, os, json
import numpy as np, cv2
from PIL import Image
G, fT, fTB, OUT = sys.argv[1:5]
os.makedirs(OUT, exist_ok=True)
TIERS = ['thuong', 'luc', 'lam', 'tim5', 'ss']
L = lambda p: np.asarray(Image.open(p).convert('RGBA')).astype(np.float32)
def bbox(a, th=128):
    ys, xs = np.where(a > th); return xs.min(), xs.max(), ys.min(), ys.max()
def over(top, bot):
    ta = top[..., 3:4] / 255; ba = bot[..., 3:4] / 255; oa = ta + ba * (1 - ta)
    return np.dstack([(top[..., :3] * ta + bot[..., :3] * ba * (1 - ta)) / np.maximum(oa, 1e-6), oa * 255])
def spars_of(N, B):
    """sống cánh = phần của B nằm ngoài thân N, nối ra ngoài khung bao thân"""
    core = (N[..., 3] > 200).astype(np.float32); W = N.shape[1]; core[:, :int(W * .41)] = 0; core[:, int(W * .59):] = 0
    pad = 30; Bp = cv2.copyMakeBorder(B, pad, pad, pad, pad, cv2.BORDER_CONSTANT)
    r = cv2.matchTemplate(Bp[..., :3], N[..., :3], cv2.TM_SQDIFF, mask=np.dstack([core] * 3)); _, _, loc, _ = cv2.minMaxLoc(r)
    dx, dy = loc[0] - pad, loc[1] - pad
    Ba = cv2.warpAffine(B, np.float32([[1, 0, -dx], [0, 1, -dy]]), (W, N.shape[0]))
    x0, x1, _, _ = bbox(N[..., 3])
    sp = ((Ba[..., 3] > 8) & (N[..., 3] < 40)).astype(np.uint8)
    sp = cv2.morphologyEx(sp, cv2.MORPH_OPEN, np.ones((5, 5), np.uint8))
    n, lab, st, _ = cv2.connectedComponentsWithStats(sp); keep = np.zeros(sp.shape, bool)
    for i in range(1, n):
        xa, ya, wa, ha, ar = st[i]
        if ar > 300 and (xa < x0 - 6 or xa + wa > x1 + 6): keep |= lab == i
    keep = cv2.dilate(keep.astype(np.uint8), np.ones((5, 5), np.uint8)).astype(bool) & (Ba[..., 3] > 0)
    S = Ba.copy(); S[~keep] = 0
    return S, (dx, dy)
def root_points(S, cx):
    out = []
    for side in (-1, 1):
        h = S[..., 3].copy()
        if side < 0: h[:, int(cx):] = 0
        else: h[:, :int(cx)] = 0
        ys, xs = np.where(h > 128)
        if not len(xs): out.append(None); continue
        i = np.argmax(xs) if side < 0 else np.argmin(xs); out.append((float(xs[i]), float(ys[i])))
    return out
SO = {}
# hệ số chung: bậc có thân cao nhất chạm 456 px
H = {}
for t in TIERS:
    x0, x1, y0, y1 = bbox(L(f'{G}/tau8_{t}.png')[..., 3]); H[t] = (x1 - x0 + 1, y1 - y0 + 1, (x0 + x1 + 1) / 2, (y0 + y1 + 1) / 2)
F = 456 / max(max(w, h) for w, h, _, _ in H.values()); SO['he_so_chung_1254_sang_512'] = round(F, 4)
# gốc vai bậc tím (tham chiếu)
T5, TB5 = L(fT), L(fTB)
spT = TB5.copy(); spT[T5[..., 3] > 40] = 0
rT = root_points(spT, 256); SO['goc_song_canh_tim_512'] = rT
for t in TIERS:
    N = L(f'{G}/tau8_{t}.png'); B = L(f'{G}/tau8_{t}_bt.png')
    S, dxy = spars_of(N, B)
    w, h, cx, cy = H[t]
    M = np.float32([[F, 0, 256 - cx * F], [0, F, 256 - cy * F]])
    P = 200
    Mw = M.copy(); Mw[0, 2] += P
    N5 = cv2.warpAffine(N, M, (512, 512), flags=cv2.INTER_AREA)
    S5w = cv2.warpAffine(S, Mw, (512 + 2 * P, 512), flags=cv2.INTER_AREA)
    # thu sống cánh quanh chân cho lọt khung (lề 24)
    acc = np.zeros_like(S5w); info = {}
    for side, (rp) in zip((-1, 1), root_points(S5w, 256 + P)):
        if rp is None: continue
        hh = S5w.copy()
        if side < 0: hh[:, 256 + P:] = 0
        else: hh[:, :256 + P] = 0
        ys, xs = np.where(hh[..., 3] > 24)
        tip = xs.min() if side < 0 else xs.max(); lim = P + 24 if side < 0 else P + 511 - 24
        k = min(1.0, abs(lim - rp[0]) / max(1, abs(tip - rp[0])))
        ytop = ys.min(); k = min(k, (rp[1] - 24) / max(1, rp[1] - ytop)) if ytop < 24 else k
        A = np.float32([[k, 0, rp[0] * (1 - k)], [0, k, rp[1] * (1 - k)]])
        acc = acc + cv2.warpAffine(hh, A, (hh.shape[1], hh.shape[0]), flags=cv2.INTER_AREA) * (1 - acc[..., 3:4] / 255)
        info['trai' if side < 0 else 'phai'] = {'he_so_thu': round(k, 3), 'goc_512': [round(rp[0] - P, 1), round(rp[1], 1)]}
    S5 = acc[:, P:P + 512]
    BT = over(N5, S5)
    Image.fromarray(N5.clip(0, 255).astype(np.uint8), 'RGBA').save(f'{OUT}/tau8_{t}.png')
    Image.fromarray(BT.clip(0, 255).astype(np.uint8), 'RGBA').save(f'{OUT}/tau8_{t}_bt.png')
    a = N5[..., 3]; x0, x1, y0, y1 = bbox(a); xb0, xb1, yb0, yb1 = bbox(BT[..., 3], 24)
    core = a > 200; dd = np.abs(BT[..., :3] - N5[..., :3]).mean(-1)[core]
    SO[t] = {'lech_bt_GPT_so_thuong_px': list(map(int, dxy)), 'than_512_rong_cao': [int(x1 - x0 + 1), int(y1 - y0 + 1)],
             'bt_le_min': int(min(xb0, yb0, 511 - xb1, 511 - yb1)), 'than_giua_khac_mau': round(float(dd.mean()), 2), 'song_canh': info}
json.dump(SO, open(f'{OUT}/so_do_6bac.json', 'w'), ensure_ascii=False, indent=1)
print(json.dumps(SO, ensure_ascii=False))
