# V257 · ghép hình bung Gemini vẽ trên khung đặt sẵn thân (V256: khung 1024, thân Bạo Tẩu bậc tím, 1 đơn vị thân 512 = U px, tâm ô = tâm khung).
#  python3 claude_tools/bung_gemini.py <N> <ảnh Gemini> <thư mục ra> [tên lớp]
#  1) dò lại thân (Gemini có thể dời nhẹ) → mặt nạ thân; 2) xóa dấu ✦ góc dưới phải; 3) năng lượng = ảnh − nền, bỏ vùng thân;
#  4) khung fx FR (đơn vị 512) vừa đủ chứa, lưu ≤ 1536 px; fx = độ sáng, fx_mau = màu, fx3 = điểm sáng gắt (lớp 2 cho Tím+/SS);
#  5) phần năng lượng vắt QUA thân lưu riêng fxT (lớp trước thân, dùng sau); 6) gốc cánh = điểm năng lượng sáng gần thân nhất mỗi bên.
import sys, os, json
import numpy as np, cv2
from PIL import Image
N = int(sys.argv[1]); fG, OUT = sys.argv[2:4]; NM = sys.argv[4] if len(sys.argv) > 4 else 'gem'; os.makedirs(OUT, exist_ok=True)
U = float(os.environ.get('U', .75)); KH = os.environ.get('KHUNG', f'/home/claude/work/gemini_bung/khung/tau{N}_than_bao_tau.png')
G = np.asarray(Image.open(fG).convert('RGB')).astype(np.float32)
if G.shape[:2] != (1024, 1024): G = cv2.resize(G, (1024, 1024), interpolation=cv2.INTER_AREA)
K = np.asarray(Image.open(KH).convert('RGB')).astype(np.float32)
m = (K.max(-1) > 12).astype(np.uint8); ys, xs = np.where(m); x0, x1, y0, y1 = xs.min(), xs.max(), ys.min(), ys.max()
tpl = K[y0:y1 + 1, x0:x1 + 1]; msk = m[y0:y1 + 1, x0:x1 + 1]; best = None
_kr = [float(x) for x in os.environ.get('KHOPRANGE', '.9,1.1').split(',')]   # V273: thân to gần kín khung (tàu 4) → thu hẹp dải tỉ lệ dò
for s in np.arange(_kr[0], _kr[1] + .001, .01):
    t = cv2.resize(tpl, None, fx=s, fy=s, interpolation=cv2.INTER_AREA); mm = cv2.resize(msk, None, fx=s, fy=s, interpolation=cv2.INTER_NEAREST)
    r = cv2.matchTemplate(G, t, cv2.TM_SQDIFF, mask=np.dstack([mm] * 3)); v, _, loc, _ = cv2.minMaxLoc(r); v /= mm.sum() * 3
    if best is None or v < best[0]: best = (v, s, loc)
v, s, loc = best
Mh = np.float32([[s, 0, loc[0] - x0 * s], [0, s, loc[1] - y0 * s]])
mw = cv2.warpAffine(m, Mh, (1024, 1024), flags=cv2.INTER_NEAREST)
SO = {'khop_than': {'ti_le': round(float(s), 3), 'lech': [int(loc[0] - x0), int(loc[1] - y0)], 'rmse': round(float(v) ** .5, 1)}}
# dấu ✦ góc dưới phải: điểm xám (ít màu) trong ô 170 px góc
cb = G[854:, 854:]; gray = (cb.max(-1) - cb.min(-1) < 36) & (cb.max(-1) > 24)
gm = cv2.dilate(gray.astype(np.uint8), np.ones((9, 9), np.uint8)) > 0; G[854:, 854:][gm] = 0; SO['xoa_dau_mo_px'] = int(gm.sum())
bg = np.median(np.concatenate([G[:6].reshape(-1, 3), G[:, :6].reshape(-1, 3), G[:, -6:].reshape(-1, 3)]), 0)
hm = cv2.dilate(mw, np.ones((5, 5), np.uint8)) > 0
E = np.clip(G - bg - 6, 0, 255); ET = E * cv2.erode(mw, np.ones((5, 5), np.uint8))[..., None]; E1 = E * (~hm)[..., None]
KT = os.environ.get('KHONGTHAN')   # V258: ảnh (b) Gemini xóa thân, vẽ nốt năng lượng sau thân → dùng thẳng, không lấp, không cắt
if KT:
    GK = np.asarray(Image.open(KT).convert('RGB')).astype(np.float32)
    if GK.shape[:2] != (1024, 1024): GK = cv2.resize(GK, (1024, 1024), interpolation=cv2.INTER_AREA)
    cb = GK[854:, 854:]; gr = (cb.max(-1) - cb.min(-1) < 36) & (cb.max(-1) > 24); GK[854:, 854:][cv2.dilate(gr.astype(np.uint8), np.ones((9, 9), np.uint8)) > 0] = 0
    bk = np.median(np.concatenate([GK[:6].reshape(-1, 3), GK[:, :6].reshape(-1, 3), GK[:, -6:].reshape(-1, 3)]), 0)
    E1full = np.clip(GK - bk - 6, 0, 255); SO['khong_than'] = True
# lớp trước thân: chỉ chỗ sáng hơn hẳn tranh thân (năng lượng vắt qua giáp)
Kw = cv2.warpAffine(K, Mh, (1024, 1024), flags=cv2.INTER_AREA); dT = np.clip(G - Kw - 40, 0, 255) * (mw > 0)[..., None]
lum = lambda X: X[..., 0] * .299 + X[..., 1] * .587 + X[..., 2] * .114
g1 = lum(E1); ys, xs = np.where(g1 > 40); c = 512.0
ext = max(np.percentile(abs(xs - c), 99.8), np.percentile(abs(ys - c), 99.8)) / U
FR = int(np.ceil((2 * ext * 1.06 + 128) / 256) * 256); PX = min(FR, 1536); KK = PX / FR / U
Mfx = np.float32([[KK, 0, PX / 2 - c * KK], [0, KK, PX / 2 - c * KK]])
warp = lambda X: cv2.warpAffine(X, Mfx, (PX, PX), flags=cv2.INTER_AREA)
g = np.clip(warp(g1), 0, 255).astype(np.uint8)   # bản chưa lấp: dùng dò gốc cánh
# V257B: lấp chỗ thân bằng năng lượng loang (inpaint + mờ) → bậc khác thân nhỏ hơn / lệch cũng không lộ lỗ đen hình thân. Tắt: FILLK=0
FK = float(os.environ.get('FILLK', .8))
if KT: E1 = E1full
elif FK > 0:
    sm = cv2.resize(E1, (512, 512), interpolation=cv2.INTER_AREA).clip(0, 255).astype(np.uint8); hs = cv2.resize(hm.astype(np.uint8), (512, 512), interpolation=cv2.INTER_NEAREST)
    fl = cv2.GaussianBlur(cv2.inpaint(sm, hs, 12, cv2.INPAINT_TELEA).astype(np.float32), (0, 0), 6); fl = cv2.resize(fl, (1024, 1024), interpolation=cv2.INTER_LINEAR)
    E1 = np.where(hm[..., None], fl * FK, E1)
gw = np.clip(warp(lum(E1)), 0, 255).astype(np.uint8)
# V267: ảnh neon quá sáng (viền trắng gắt) → bảng màu các bậc rơi hết vào đầu trắng, bậc Lục / Lam nhạt. Hạ gamma cho trung bình về ~92 (như các bung đã duyệt). Tắt: GTB=0
GT = float(os.environ.get('GTB', 92)); mm = gw > 10
if GT > 0 and mm.any() and gw[mm].mean() > GT + 8:
    lo, hi = 1.0, 3.0
    for _ in range(30):
        gm = (lo + hi) / 2; mv = (255 * (gw[mm] / 255.0) ** gm).mean()
        lo, hi = (gm, hi) if mv > GT else (lo, gm)
    gw = np.clip(255 * (gw / 255.0) ** ((lo + hi) / 2), 0, 255).astype(np.uint8); SO['gamma_fx'] = round((lo + hi) / 2, 3)
Image.fromarray(np.dstack([gw] * 4), 'RGBA').save(f'{OUT}/fx.png')
Ew = np.clip(warp(E1), 0, 255); mx = Ew.max(-1, keepdims=True)
Image.fromarray(np.dstack([np.where(mx > 0, Ew / np.maximum(mx, 1) * 255, 0), mx]).clip(0, 255).astype(np.uint8), 'RGBA').save(f'{OUT}/fx_mau.png')
g3 = np.clip((gw.astype(np.float32) - 150) * 2.2, 0, 255).astype(np.uint8); Image.fromarray(np.dstack([g3] * 4), 'RGBA').save(f'{OUT}/fx3.png')
gT = np.clip(warp(lum(dT)), 0, 255).astype(np.uint8); SO['lop_truoc_than_px'] = int((gT > 30).sum())
if SO['lop_truoc_than_px'] > 200: Image.fromarray(np.dstack([gT] * 4), 'RGBA').save(f'{OUT}/fxT.png')
ramp = [[0.0, 0, 0, 0]]
for lo in range(0, 256, 16):
    mm = (g1 > max(lo, 4)) & (g1 <= lo + 16)
    if mm.sum() < 30: continue
    ramp.append([round(float(np.median(g1[mm])) / 255, 3)] + [int(v) for v in np.median(E1[mm], 0)])
json.dump(ramp, open(f'{OUT}/ramp_tim.json', 'w'))
gg = cv2.GaussianBlur(g.astype(np.float32), (15, 15), 0); th = gg.max() * .35; piv = []; u = FR / PX
for side in (-1, 1):
    yy, xx = np.where(gg > th); sel = ((xx < PX / 2) if side < 0 else (xx > PX / 2)) & (abs((yy - PX / 2) * u) < float(os.environ.get('PIVBAND', 150))); yy, xx = yy[sel], xx[sel]
    i = np.argmax(xx) if side < 0 else np.argmin(xx); piv.append([round(float((xx[i] - PX / 2) * u + 256), 1), round(float((yy[i] - PX / 2) * u + 256), 1)])
ysg, xsg = np.where(g > 10)
yk, xk = np.where(mw > 0); E2 = (g1 > 40); yb = (yk.min() + 0.0)
cone = tot = 0
for y in range(0, int(yb)):
    half = np.tan(np.radians(30)) * (yb - y); a, b = int(max(0, c - half)), int(min(1024, c + half)); cone += E2[y, a:b].sum(); tot += max(0, b - a)
SO.update({'fx_khung': FR, 'fx_px': PX, 'goc_canh_512': piv, 'rong_nang_luong_so_than': round((xs.max() - xs.min()) / max(1, xk.max() - xk.min()), 2),
           'non60_truoc_mui': round(cone / max(tot, 1), 4), 'ten': NM})
json.dump(SO, open(f'{OUT}/so_do.json', 'w'), ensure_ascii=False, indent=1); print(json.dumps(SO, ensure_ascii=False))
