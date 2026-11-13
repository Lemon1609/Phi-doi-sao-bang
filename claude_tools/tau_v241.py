# V241 · công cụ chung ghép một tàu GPT (12 thân + ảnh bung bậc tím + lớp 2) vào game.
#  python3 claude_tools/tau_v241.py <N> <thư mục GPT> <thư mục ra> [ảnh bung thay thế] [ảnh lớp 2 thay thế]
#  1) Thân thường 6 bậc: cùng MỘT hệ số F (thân thường lớn nhất chạm 456 px), tâm = tâm khung bao thân thường bậc tím.
#  2) Bạo Tẩu: dò bản _bt GPT theo cả tỉ lệ lẫn vị trí (GPT có thể vẽ lệch cỡ), cắt phần giáp mở NGOÀI viền thân thường,
#     ghép thân thường đè lên (thân giữa trùng khít); phần mở tràn khung → thu q quanh tâm, game vẽ ô Bạo Tẩu to 1/q.
#  3) Lớp bung: dò thân thường bậc tím trên ảnh bung (tỉ lệ + vị trí), xóa vùng thân Bạo Tẩu, phần còn lại = năng lượng;
#     khung FR (đơn vị thân 512) vừa đủ chứa, lưu ≤ 1536 px. Lớp 2 căn theo lớp bung bằng tương quan pha.
#  4) Gốc cánh: điểm năng lượng sáng gần thân nhất mỗi bên; lệch gốc từng bậc theo mép thân ở hàng gốc cánh.
import sys, os, json
import numpy as np, cv2
from PIL import Image
N = int(sys.argv[1]); G, OUT = sys.argv[2:4]; os.makedirs(OUT, exist_ok=True)
fB = sys.argv[4] if len(sys.argv) > 4 and sys.argv[4] != '-' else f'{G}/tau{N}_bung_tim.png'
f2 = sys.argv[5] if len(sys.argv) > 5 else f'{G}/tau{N}_bung_tang2.png'
T = ['thuong', 'luc', 'lam', 'tim', 'tim5', 'ss']
def L(p):
    a = np.asarray(Image.open(p).convert('RGBA')).astype(np.float32)
    if (a[..., 3] < 8).mean() < .01:  # không có nền trong suốt → bỏ nền nối với mép ảnh (màu gần màu góc)
        c = np.median(np.concatenate([a[:6, :, :3].reshape(-1, 3), a[-6:, :, :3].reshape(-1, 3)]), 0)
        bgm = (np.abs(cv2.GaussianBlur(a[..., :3], (0, 0), 1.5) - c).max(-1) < 48).astype(np.uint8)
        n, lab = cv2.connectedComponents(bgm); edge = set(np.unique(np.concatenate([lab[0], lab[-1], lab[:, 0], lab[:, -1]]))) - {0}
        a[np.isin(lab, list(edge)), 3] = 0
    a[..., 3] = np.where(a[..., 3] < 24, 0, a[..., 3]); return a
def bbox(a, th=128):
    ys, xs = np.where(a > th); return xs.min(), xs.max(), ys.min(), ys.max()
def over(top, bot):
    ta = top[..., 3:4] / 255; ba = bot[..., 3:4] / 255; oa = ta + ba * (1 - ta)
    return np.dstack([(top[..., :3] * ta + bot[..., :3] * ba * (1 - ta)) / np.maximum(oa, 1e-6), oa * 255])
def match(img, tpl, mask, smin, smax, step):
    """dò tpl (có mask) trên img theo tỉ lệ + vị trí; thô ở ¼ độ phân giải rồi tinh"""
    best = None; d = 4
    im4 = cv2.resize(img, None, fx=1 / d, fy=1 / d, interpolation=cv2.INTER_AREA)
    for s in np.arange(smin, smax, step):
        ts = cv2.resize(tpl, None, fx=s / d, fy=s / d, interpolation=cv2.INTER_AREA); ms = cv2.resize(mask, None, fx=s / d, fy=s / d, interpolation=cv2.INTER_AREA)
        if ts.shape[0] >= im4.shape[0] or ts.shape[1] >= im4.shape[1] or ms.sum() < 20: continue
        r = cv2.matchTemplate(im4, ts, cv2.TM_SQDIFF, mask=np.dstack([ms] * 3)); v, _, loc, _ = cv2.minMaxLoc(r); v /= ms.sum() * 3
        if best is None or v < best[0]: best = (v, s, loc)
    _, s0, l0 = best; best = None
    for s in np.arange(s0 - step, s0 + step + 1e-6, step / 5):
        ts = cv2.resize(tpl, None, fx=s, fy=s, interpolation=cv2.INTER_AREA); ms = cv2.resize(mask, None, fx=s, fy=s, interpolation=cv2.INTER_AREA)
        x0, y0 = max(0, l0[0] * d - 24), max(0, l0[1] * d - 24); sub = img[y0:y0 + ts.shape[0] + 48, x0:x0 + ts.shape[1] + 48]
        if sub.shape[0] < ts.shape[0] or sub.shape[1] < ts.shape[1]: continue
        r = cv2.matchTemplate(sub, ts, cv2.TM_SQDIFF, mask=np.dstack([ms] * 3)); v, _, loc, _ = cv2.minMaxLoc(r); v /= ms.sum() * 3
        if best is None or v < best[0]: best = (v, s, (loc[0] + x0, loc[1] + y0))
    return best
def coremask(A, frac=.18):
    m = (A[..., 3] > 220).astype(np.float32); x0, x1, y0, y1 = bbox(A[..., 3]); cx = (x0 + x1) / 2; w = (x1 - x0) * frac
    m[:, :int(cx - w)] = 0; m[:, int(cx + w):] = 0; return m
SO = {}; QBT = {}
NN = {t: L(f'{G}/tau{N}_{t}.png') for t in T}
F = 456 / max(max(bbox(a[..., 3])[1] - bbox(a[..., 3])[0] + 1, bbox(a[..., 3])[3] - bbox(a[..., 3])[2] + 1) for a in NN.values())
x0, x1, y0, y1 = bbox(NN['tim'][..., 3]); CX, CY = (x0 + x1 + 1) / 2, (y0 + y1 + 1) / 2
M = np.float32([[F, 0, 256 - CX * F], [0, F, 256 - CY * F]]); SO['he_so_than'] = round(F, 4)
P = 256
for t in T:
    Nt = NN[t]; B = L(f'{G}/tau{N}_{t}_bt.png')
    cm = coremask(Nt)
    v, s, loc = match(B[..., :3] * (B[..., 3:4] / 255), Nt[..., :3] * (Nt[..., 3:4] / 255), cm, .7, 1.35, .05)
    # đưa B về hệ tọa độ thân thường: x_N = (x_B - loc)/s
    Ab = np.float32([[1 / s, 0, -loc[0] / s], [0, 1 / s, -loc[1] / s]])
    Mp = np.float32([[F, 0, P + 256 - CX * F], [0, F, P + 256 - CY * F]])
    Mb = np.vstack([Mp, [0, 0, 1]]) @ np.vstack([Ab, [0, 0, 1]])
    Bw = cv2.warpAffine(B, Mb[:2].astype(np.float32), (512 + 2 * P, 512 + 2 * P), flags=cv2.INTER_AREA)
    Nw = cv2.warpAffine(Nt, Mp, (512 + 2 * P, 512 + 2 * P), flags=cv2.INTER_AREA)
    sp = ((Bw[..., 3] > 8) & (cv2.dilate((Nw[..., 3] > 40).astype(np.uint8), np.ones((3, 3), np.uint8)) == 0)).astype(np.uint8)
    sp = cv2.morphologyEx(sp, cv2.MORPH_OPEN, np.ones((3, 3), np.uint8)); sp = cv2.dilate(sp, np.ones((3, 3), np.uint8))
    S = Bw.copy(); S[sp == 0] = 0; BT = over(Nw, S)
    ys, xs = np.where(BT[..., 3] > 24); c = P + 256
    ext = max(c - xs.min(), xs.max() + 1 - c, c - ys.min(), ys.max() + 1 - c); q = min(1.0, (256 - 14) / ext)
    BT5 = cv2.warpAffine(BT, np.float32([[q, 0, 256 - c * q], [0, q, 256 - c * q]]), (512, 512), flags=cv2.INTER_AREA)
    N5 = Nw[P:P + 512, P:P + 512]
    Image.fromarray(N5.clip(0, 255).astype(np.uint8), 'RGBA').save(f'{OUT}/tau{N}_{t}.png')
    Image.fromarray(BT5.clip(0, 255).astype(np.uint8), 'RGBA').save(f'{OUT}/tau{N}_{t}_bt.png')
    if t == 'tim': np.save(f'{OUT}/_bt_tim_P.npy', BT.astype(np.float16))
    nb = Nw[..., 3] > 128; bb = BT[..., 3] > 128
    wid = lambda m: (lambda xx: xx.max() - xx.min() + 1)(np.where(m.any(0))[0])
    a = N5[..., 3]; m = a > 128; px = N5[..., :3][m]; mx = px.max(1); mn = px.min(1); n0 = bbox(a)
    SO[t] = {'than_512': [int(n0[1] - n0[0] + 1), int(n0[3] - n0[2] + 1)], 'bao_hoa': round(float(((mx - mn) / np.maximum(mx, 1)).mean()), 2),
             'bt_ti_le_GPT': round(float(s), 3), 'bt_rong': round(wid(bb) / wid(nb), 2), 'bt_dien_tich': round(bb.sum() / max(1, nb.sum()), 2), 'q': round(q, 3), 'khop_bt_rmse': round(float(v) ** .5, 1)}
    if q < 1: QBT[t] = round(q, 4)
SO['QBT'] = QBT
# ---- lớp bung ----
A = np.asarray(Image.open(fB).convert('RGB')).astype(np.float32)
bg = np.median(np.concatenate([A[:8].reshape(-1, 3), A[-8:].reshape(-1, 3), A[:, :8].reshape(-1, 3), A[:, -8:].reshape(-1, 3)]), 0)
N5t = np.asarray(Image.open(f'{OUT}/tau{N}_tim.png')).astype(np.float32)
v, s, loc = match(A, N5t[..., :3] * (N5t[..., 3:4] / 255) + bg * (1 - N5t[..., 3:4] / 255), coremask(N5t, .14), float(os.environ.get('SMIN', .5)), float(os.environ.get('SMAX', 3.2)), .1)
cx, cy = loc[0] + 256 * s, loc[1] + 256 * s
BTP = np.load(f'{OUT}/_bt_tim_P.npy').astype(np.float32)  # thân Bạo Tẩu bậc tím ở khung 512+2P (đơn vị 512)
if os.environ.get('HULLBOX'):
    # thân trong ảnh bung GPT vẽ khác hẳn tranh thân → đo tay khung bao thân trên ảnh bung (x0,x1,y0,y1), xóa theo dáng thân thường co giãn vào khung
    hx0, hx1, hy0, hy1 = map(float, os.environ['HULLBOX'].split(',')); nx0, nx1, ny0, ny1 = bbox(N5t[..., 3])
    sx, sy = (hx1 - hx0) / (nx1 - nx0), (hy1 - hy0) / (ny1 - ny0); s = (sx + sy) / 2; cx, cy = (hx0 + hx1) / 2, (hy0 + hy1) / 2; v = -1; loc = (int(hx0), int(hy0))
    Mh = np.float32([[sx, 0, cx - (nx0 + nx1) / 2 * sx], [0, sy, cy - (ny0 + ny1) / 2 * sy]])
    hm = cv2.warpAffine((N5t[..., 3] > 40).astype(np.uint8), Mh, (A.shape[1], A.shape[0]), flags=cv2.INTER_NEAREST)
    hm = cv2.dilate(hm, np.ones((int(os.environ.get('DIL', 17)),) * 2, np.uint8)) > 0
    cx, cy = cx - ((nx0 + nx1) / 2 - 256) * s, cy - ((ny0 + ny1) / 2 - 256) * s   # điểm ứng với tâm khung 512
else:
    Mh = np.float32([[s, 0, cx - (P + 256) * s], [0, s, cy - (P + 256) * s]])
    hm = cv2.warpAffine((BTP[..., 3] > 40).astype(np.uint8), Mh, (A.shape[1], A.shape[0]), flags=cv2.INTER_NEAREST)
    hm = cv2.dilate(hm, np.ones((9, 9), np.uint8)) > 0
E = np.clip(A - bg - 8, 0, 255); E1 = E * (~hm)[..., None]   # −8: bỏ nền loang (ảnh bung có quầng nền)
lum = lambda X: X[..., 0] * .299 + X[..., 1] * .587 + X[..., 2] * .114
g1 = lum(E1); ys, xs = np.where(g1 > 40)
ext = max(np.percentile(abs(xs - cx), 99.8), np.percentile(abs(ys - cy), 99.8)) / s     # đơn vị 512 (bỏ hạt lẻ xa)
FR = int(np.ceil((2 * ext * 1.06 + 128) / 256) * 256); PX = min(FR, 1536); K = PX / FR / s
Mfx = np.float32([[K, 0, PX / 2 - cx * K], [0, K, PX / 2 - cy * K]])
g = np.clip(cv2.warpAffine(g1, Mfx, (PX, PX), flags=cv2.INTER_AREA), 0, 255).astype(np.uint8)
Image.fromarray(np.dstack([g, g, g, g]), 'RGBA').save(f'{OUT}/fx.png')
Ew = np.clip(cv2.warpAffine(E1, Mfx, (PX, PX), flags=cv2.INTER_AREA), 0, 255); mx = Ew.max(-1, keepdims=True)
Image.fromarray(np.dstack([np.where(mx > 0, Ew / np.maximum(mx, 1) * 255, 0), mx]).clip(0, 255).astype(np.uint8), 'RGBA').save(f'{OUT}/fx_mau.png')
ramp = [[0.0, 0, 0, 0]]
for lo in range(0, 256, 16):
    mm = (g1 > max(lo, 4)) & (g1 <= lo + 16)
    if mm.sum() < 30: continue
    ramp.append([round(float(np.median(g1[mm])) / 255, 3)] + [int(v) for v in np.median(E1[mm], 0)])
json.dump(ramp, open(f'{OUT}/ramp_tim.json', 'w'))
# lớp 2: căn theo lớp bung bằng tương quan pha (GPT vẽ riêng)
if os.path.exists(f2):
    t2 = np.asarray(Image.open(f2).convert('RGB')).astype(np.float32); b2 = np.median(np.concatenate([t2[:8].reshape(-1, 3), t2[-8:].reshape(-1, 3)]), 0)
    g2 = lum(np.clip(t2 - b2 - 2, 0, 255))
    if g2.shape != g1.shape: g2 = cv2.resize(g2, (g1.shape[1], g1.shape[0]), interpolation=cv2.INTER_AREA)
    (dx, dy), resp = cv2.phaseCorrelate(cv2.GaussianBlur(g1, (0, 0), 6), cv2.GaussianBlur(g2, (0, 0), 6))
    if abs(dx) > 80 or abs(dy) > 80: dx = dy = 0
    if os.environ.get('L2SHIFT'):  # đo tay độ lệch lớp 2 (lớp 2 dời xuống/sang bao nhiêu px thì khớp) khi tương quan pha yếu
        sx2, sy2 = map(float, os.environ['L2SHIFT'].split(',')); dx, dy, resp = -sx2, -sy2, -1.0
    g2s = cv2.warpAffine(g2, np.float32([[1, 0, -dx], [0, 1, -dy]]), (g2.shape[1], g2.shape[0]))
    g3 = np.clip(cv2.warpAffine(np.where(g2s < 8, 0, g2s), Mfx, (PX, PX), flags=cv2.INTER_AREA), 0, 255).astype(np.uint8)
    Image.fromarray(np.dstack([g3, g3, g3, g3]), 'RGBA').save(f'{OUT}/fx3.png'); SO['lop2_lech'] = [round(dx, 1), round(dy, 1), round(resp, 3)]
# gốc cánh + lệch gốc từng bậc
gg = cv2.GaussianBlur(g.astype(np.float32), (15, 15), 0); th = gg.max() * .35; piv = []; u = FR / PX
for side in (-1, 1):
    yy, xx = np.where(gg > th); sel = ((xx < PX / 2) if side < 0 else (xx > PX / 2)) & (abs((yy - PX / 2) * u) < 150); yy, xx = yy[sel], xx[sel]
    i = np.argmax(xx) if side < 0 else np.argmin(xx); piv.append([round(float((xx[i] - PX / 2) * u + 256), 1), round(float((yy[i] - PX / 2) * u + 256), 1)])
row = int(round((piv[0][1] + piv[1][1]) / 2)); row = min(max(row, 40), 470)
def edge(p):
    a = np.asarray(Image.open(p).convert('RGBA'))[..., 3]; r = np.where(a[max(0, row - 40):row + 40].max(0) > 128)[0]
    return (int(r.min()), int(r.max())) if len(r) else (256, 256)
eT = edge(f'{OUT}/tau{N}_tim.png'); OFF = {}
for t in T:
    e = edge(f'{OUT}/tau{N}_{t}.png'); OFF[t] = [[e[0] - eT[0], 0], [e[1] - eT[1], 0]]
ysg, xsg = np.where(g > 10)
SO.update({'khop_than_anh_bung': {'ti_le': round(float(s), 4), 'vi_tri': list(map(int, loc)), 'rmse': round(float(v) ** .5, 1) if v >= 0 else 'do_tay'},
           'fx_khung': FR, 'fx_px': PX, 'fx_khung_bao': [int(xsg.min()), int(xsg.max()), int(ysg.min()), int(ysg.max())],
           'goc_canh_512': piv, 'hang_goc': row, 'off': OFF})
os.remove(f'{OUT}/_bt_tim_P.npy')
json.dump(SO, open(f'{OUT}/so_do.json', 'w'), ensure_ascii=False, indent=1); print(json.dumps(SO, ensure_ascii=False))
