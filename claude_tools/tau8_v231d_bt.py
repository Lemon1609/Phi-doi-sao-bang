# V231D · ghép sống cánh vẽ lại của GPT (tau8_tim_bt_thu.png, 1254 px) lên CHÍNH thân thường 512 → tau8_tim_bt.png
#  python3 claude_tools/tau8_v231d_bt.py <tau8_tim.png 512> <tau8_tim_bt_thu.png> <ra.png> <so_do.json>
import sys, json
import numpy as np, cv2
from PIL import Image
fT, fB, fO, fJ = sys.argv[1:5]
T = np.asarray(Image.open(fT).convert('RGBA')).astype(np.float32)        # 512, thân chuẩn
B = np.asarray(Image.open(fB).convert('RGBA')).astype(np.float32)        # 1254, bản GPT
SO = {}
# 1) tìm tỉ lệ + vị trí của thân 512 trong ảnh GPT (so lõi thân, bỏ hai bên)
best = None
for s in np.arange(1.9, 2.8, 0.005):
    ts = cv2.resize(T, None, fx=s, fy=s, interpolation=cv2.INTER_LINEAR); a = ts[..., 3] / 255; h, w = a.shape
    if h > B.shape[0]: break
    m = (a > .9).astype(np.float32); m[:, :int(w * .40)] = 0; m[:, int(w * .60):] = 0
    r = cv2.matchTemplate(B[..., :3], ts[..., :3], cv2.TM_SQDIFF, mask=np.dstack([m] * 3)); v, _, loc, _ = cv2.minMaxLoc(r); v /= m.sum() * 3
    if best is None or v < best[0]: best = (v, s, loc)
v, S, (lx, ly) = best
SO['ti_le_512_sang_GPT'] = round(float(S), 4); SO['vi_tri'] = [int(lx), int(ly)]; SO['rmse_loi_than'] = round(float(v) ** .5, 1)
# 2) đưa ảnh GPT về hệ 512 bằng phép ngược
P = 160  # đệm hai bên để mũi sống cánh không bị cắt trước khi thu
M = np.float32([[1 / S, 0, -lx / S + P], [0, 1 / S, -ly / S]])
B5w = cv2.warpAffine(B, M, (512 + 2 * P, 512), flags=cv2.INTER_AREA, borderValue=(0, 0, 0, 0))
Tw = np.zeros_like(B5w); Tw[:, P:P + 512] = T
B5 = B5w[:, P:P + 512]
# so thân giữa của GPT với thân chuẩn (để báo)
core = T[..., 3] > 200; cc = core.copy(); cc[:, :200] = False; cc[:, 312:] = False
d = np.abs(B5[..., :3] - T[..., :3]).mean(-1)[cc & (B5[..., 3] > 200)]
SO['than_giua_GPT_so_chuan'] = {'khac_mau_TB': round(float(d.mean()), 1), 'ti_le_diem_khac_tren_40': round(float((d > 40).mean() * 100), 1)}
# 3) sống cánh = phần GPT nằm ngoài thân chuẩn, nối với vùng ngoài khung bao thân
ys, xs = np.where(T[..., 3] > 128); x0, x1 = xs.min(), xs.max()
sp = ((B5w[..., 3] > 8) & (Tw[..., 3] < 40)).astype(np.uint8); x0 += P; x1 += P
sp = cv2.morphologyEx(sp, cv2.MORPH_OPEN, np.ones((3, 3), np.uint8))
n, lab, st, _ = cv2.connectedComponentsWithStats(sp); keep = np.zeros(sp.shape, bool)
for i in range(1, n):
    xa, ya, wa, ha, ar = st[i]
    if ar > 150 and (xa < x0 - 4 or xa + wa > x1 + 4): keep |= lab == i
keep = cv2.dilate(keep.astype(np.uint8), np.ones((3, 3), np.uint8)).astype(bool) & (B5w[..., 3] > 0)
SPw = B5w.copy(); SPw[~keep] = 0
# thu mỗi sống cánh quanh chân (điểm gần trục giữa nhất) để mũi cách mép khung 512 ít nhất 24 px
acc = np.zeros_like(SPw); cxw = 256 + P
for side in (-1, 1):
    h = SPw.copy()
    if side < 0: h[:, cxw:] = 0
    else: h[:, :cxw] = 0
    ys, xs = np.where(h[..., 3] > 128)
    if not len(xs): continue
    i = np.argmax(xs) if side < 0 else np.argmin(xs); rx, ry = float(xs[i]), float(ys[i])
    tip = xs.min() if side < 0 else xs.max(); lim = (P + 24) if side < 0 else (P + 511 - 24)
    k = min(1.0, abs(lim - rx) / abs(tip - rx)); SO.setdefault('thu_song_canh', {})['trai' if side < 0 else 'phai'] = round(k, 3)
    A = np.float32([[k, 0, rx * (1 - k)], [0, k, ry * (1 - k)]])
    h2 = cv2.warpAffine(h, A, (h.shape[1], h.shape[0]), flags=cv2.INTER_AREA)
    acc = acc + h2 * (1 - acc[..., 3:4] / 255)
SP = acc[:, P:P + 512]
ta = T[..., 3:4] / 255; sa = SP[..., 3:4] / 255; oa = ta + sa * (1 - ta)
out = np.dstack([(T[..., :3] * ta + SP[..., :3] * sa * (1 - ta)) / np.maximum(oa, 1e-6), oa * 255])
Image.fromarray(out.clip(0, 255).astype(np.uint8), 'RGBA').save(fO)
ys, xs = np.where(out[..., 3] > 24); SO['bt_khung_bao'] = [int(xs.min()), int(xs.max()), int(ys.min()), int(ys.max())]
SO['bt_le_min'] = int(min(xs.min(), ys.min(), 511 - xs.max(), 511 - ys.max()))
dd = np.abs(out[..., :3] - T[..., :3]).mean(-1)[core]; SO['than_giua_trung_khit'] = {'khac_mau_TB': round(float(dd.mean()), 2), 'lech_px': 0}
ys, xs = np.where(SP[..., 3] > 128)
for nm, sel in (('trai', xs < 256), ('phai', xs >= 256)):
    if sel.any():
        xx, yy = xs[sel], ys[sel]; i = np.argmin(xx) if nm == 'trai' else np.argmax(xx)
        SO['mui_song_canh_' + nm] = [int(xx[i]), int(yy[i])]
json.dump(SO, open(fJ, 'w'), ensure_ascii=False, indent=1); print(json.dumps(SO, ensure_ascii=False))
