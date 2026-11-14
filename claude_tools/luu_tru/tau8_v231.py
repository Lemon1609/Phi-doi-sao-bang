# V231 · Chuẩn hóa bộ tách lớp tàu 8 Phần Thiên (bậc tím) từ ảnh thử GPT + ảnh bung cánh đã duyệt.
#  python3 claude_tools/tau8_v231.py <than_thuong.png> <than_bung.png> <anh_da_duyet.png> <thu_muc_ra>
#  Ra: tau8_tim.png, tau8_tim_bt.png (512×512), tau8_fx_bung.png, tau8_fx_bung2.png (1024×1024, thang xám),
#      tau8_ramp.json (dải màu đo từ ảnh duyệt), so_do.json (mọi số đo kiểm tra).
#  Cách làm:
#   - Thân thường = than_thuong của GPT, thu về cạnh dài 456 px (cạnh dài tối đa của candoi217), tâm khung bao tại (256, 256).
#   - Thân Bạo Tẩu = CHÍNH thân thường + hai sống cánh cắt từ than_bung, xoay lên theo góc sống cánh của ảnh duyệt,
#     rút ngắn để lọt khung 512 (lề 24 px). Thân giữa trùng khít tuyệt đối với bản thường.
#   - Lông năng lượng và lưỡi plasma lấy thẳng từ ẢNH ĐÃ DUYỆT: trừ nền, xóa vùng thân và giáp sống cánh, tách phần lam.
#     Lưu thang xám (độ sáng = kênh lớn nhất); dải màu theo độ sáng đo từ ảnh duyệt để game tô lại đúng màu bậc tím.
import sys, json
import numpy as np, cv2
from PIL import Image

f_T, f_B, f_AP, OUT = sys.argv[1:5]
T = np.asarray(Image.open(f_T).convert('RGBA')).astype(np.float32)
B = np.asarray(Image.open(f_B).convert('RGBA')).astype(np.float32)
AP = np.asarray(Image.open(f_AP).convert('RGB')).astype(np.float32)
N = T.shape[0]
SO = {}

def bbox(a, th=128):
    ys, xs = np.where(a > th); return xs.min(), xs.max(), ys.min(), ys.max()

# ---------- 1. căn thân GPT với ảnh duyệt (tỉ lệ + vị trí) ----------
best = None
for s in np.arange(0.50, 0.66, 0.0025):
    ts = cv2.resize(T, None, fx=s, fy=s, interpolation=cv2.INTER_AREA); a = ts[..., 3] / 255; h, w = a.shape
    m = (a > .9).astype(np.float32); m[:, :int(w * .38)] = 0; m[:, int(w * .62):] = 0; m[int(h * .55):] = 0
    r = cv2.matchTemplate(AP, ts[..., :3], cv2.TM_SQDIFF, mask=np.dstack([m] * 3)); v, _, loc, _ = cv2.minMaxLoc(r)
    v /= m.sum() * 3
    if best is None or v < best[0]: best = (v, s, loc)
_, S_AP, LOC = best
SO['can_voi_anh_duyet'] = {'ti_le_T_sang_anh_duyet': round(float(S_AP), 4), 'vi_tri': list(map(int, LOC)), 'rmse_loi_than': round(float(best[0]) ** .5, 1)}

# ---------- 2. hệ số về khung 512 ----------
x0, x1, y0, y1 = bbox(T[..., 3])
F = 456 / max(x1 - x0 + 1, y1 - y0 + 1)          # cạnh dài 456 px
CX, CY = (x0 + x1 + 1) / 2, (y0 + y1 + 1) / 2      # tâm khung bao thân (hệ T)
def to512(img):
    M = np.float32([[F, 0, 256 - CX * F], [0, F, 256 - CY * F]])
    return cv2.warpAffine(img, M, (512, 512), flags=cv2.INTER_AREA, borderValue=(0, 0, 0, 0))

# ---------- 3. sống cánh từ than_bung ----------
sp = ((B[..., 3] > 8) & (T[..., 3] < 20)).astype(np.uint8)
sp = cv2.morphologyEx(sp, cv2.MORPH_OPEN, np.ones((5, 5), np.uint8))
n, lab, st, _ = cv2.connectedComponentsWithStats(sp)
keep = np.zeros_like(sp, bool)
for i in range(1, n):
    xa, ya, wa, ha, ar = st[i]
    if ar > 400 and (xa < x0 - 10 or xa + wa > x1 + 10): keep |= lab == i
keep = cv2.dilate(keep.astype(np.uint8), np.ones((5, 5), np.uint8)).astype(bool) & (B[..., 3] > 0)
SPAR = B.copy(); SPAR[~keep] = 0
# góc sống cánh trên ảnh duyệt: đo bằng mắt trên ảnh cắt có thước (giáp đỏ từ vai (540, 395) tới mũi (255, 305)) ≈ 17,5°
ANG = float(np.degrees(np.arctan2(395 - 305, 540 - 255)))
SO['goc_song_canh_anh_duyet_do'] = round(ANG, 1)
bt_extra = np.zeros_like(SPAR)
PIV = {}
for side in (-1, 1):
    half = SPAR.copy()
    if side < 0: half[:, int(CX):] = 0
    else: half[:, :int(CX)] = 0
    ys, xs = np.where(half[..., 3] > 128)
    if not len(xs): continue
    # điểm gốc: mép thân ở hàng giữa của sống cánh
    yc = float(np.median(ys)); xin = x0 if side < 0 else x1
    # dời sống cánh lên đúng đường vai → mũi của ảnh duyệt (sống cánh GPT gắn thấp hơn ≈ 50 px khung 512)
    xa_ = LOC[0] + xin * S_AP; ya_ = 395 - abs(540 - (xa_ if side < 0 else 2 * (LOC[0] + CX * S_AP) - xa_)) * np.tan(np.radians(ANG))
    ty = (ya_ - LOC[1]) / S_AP
    half = cv2.warpAffine(half, np.float32([[1, 0, 0], [0, 1, ty - yc]]), (N, N), flags=cv2.INTER_LINEAR)
    SO.setdefault('doi_song_canh_len_px_T', round(float(yc - ty), 1))
    ys, xs = np.where(half[..., 3] > 128); yc = ty
    # gắn chân sống cánh vào mép thân ở đúng hàng mới (thân hẹp dần lên trên → nếu không dời ngang sẽ hở)
    row = np.where(T[int(round(ty)), :, 3] > 128)[0]
    xe = float(row.min() if side < 0 else row.max())
    xinner = float(xs.max() if side < 0 else xs.min())
    dxs = (xe + 14 - xinner) if side < 0 else (xe - 14 - xinner)
    half = cv2.warpAffine(half, np.float32([[1, 0, dxs], [0, 1, 0]]), (N, N), flags=cv2.INTER_LINEAR)
    ys, xs = np.where(half[..., 3] > 128); xin = xe
    SO.setdefault('doi_ngang_song_canh_px_T', {})['trai' if side < 0 else 'phai'] = round(dxs, 1)
    px, py = float(xin), yc
    # mũi sống cánh hiện tại
    xt = xs.min() if side < 0 else xs.max()
    # độ dài tối đa để mũi lọt khung 512 với lề 24 px sau khi xoay
    L0 = abs(xt - px); Lmax = ((256 - 24) / F - abs(CX - px)) / np.cos(np.radians(ANG)) if True else L0
    k = min(1.0, Lmax / L0)
    ang = -ANG if side < 0 else ANG     # trái: xoay ngược chiều kim (mũi lên), phải: thuận
    M = cv2.getRotationMatrix2D((px, py), -ang if side < 0 else -ang, 1.0)
    # thu theo trục ngang quanh gốc trước khi xoay
    Sx = np.float32([[k, 0, px * (1 - k)], [0, 1, 0]])
    h2 = cv2.warpAffine(half, Sx, (N, N), flags=cv2.INTER_AREA)
    M = cv2.getRotationMatrix2D((px, py), (ANG if side < 0 else -ANG), 1.0)
    h2 = cv2.warpAffine(h2, M, (N, N), flags=cv2.INTER_LINEAR)
    bt_extra = np.maximum(bt_extra, h2) if False else bt_extra + h2 * (1 - bt_extra[..., 3:4] / 255)
    PIV['trai' if side < 0 else 'phai'] = (px, py, k)
SO['song_canh'] = {k: {'goc_x_T': round(v[0], 1), 'goc_y_T': round(v[1], 1), 'he_so_rut_ngan': round(v[2], 3)} for k, v in PIV.items()}

def over(top, bot):
    ta = top[..., 3:4] / 255; ba = bot[..., 3:4] / 255; oa = ta + ba * (1 - ta)
    rgb = (top[..., :3] * ta + bot[..., :3] * ba * (1 - ta)) / np.maximum(oa, 1e-6)
    return np.dstack([rgb, oa * 255])

BT = over(T, bt_extra)
t512 = to512(T); b512 = to512(BT)
Image.fromarray(t512.clip(0, 255).astype(np.uint8), 'RGBA').save(f'{OUT}/tau8_tim.png')
Image.fromarray(b512.clip(0, 255).astype(np.uint8), 'RGBA').save(f'{OUT}/tau8_tim_bt.png')

# ---------- 4. lớp năng lượng từ ảnh duyệt ----------
bg = np.median(np.concatenate([AP[:60].reshape(-1, 3), AP[-60:].reshape(-1, 3)]), 0)
E = np.clip(AP - bg - 2, 0, 255)
# vùng thân (T căn theo ảnh duyệt) → xóa
ts = cv2.resize(T, None, fx=S_AP, fy=S_AP, interpolation=cv2.INTER_AREA)
hull = np.zeros(AP.shape[:2], np.float32); hh, ww = ts.shape[:2]
hull[LOC[1]:LOC[1] + hh, LOC[0]:LOC[0] + ww] = ts[..., 3] / 255
hullm = cv2.dilate((hull > .15).astype(np.uint8), np.ones((5, 5), np.uint8)).astype(bool)
# giáp sống cánh của ảnh duyệt: dải ±20 px quanh đường vai → mũi, chỉ xóa điểm màu giáp (đỏ, vàng giáp, xám)
hsv = cv2.cvtColor(AP.astype(np.uint8), cv2.COLOR_RGB2HSV).astype(np.float32)
Hh, Ss, Vv = hsv[..., 0] * 2, hsv[..., 1] / 255, hsv[..., 2] / 255
yy, xx = np.mgrid[0:AP.shape[0], 0:AP.shape[1]]
band = np.zeros(AP.shape[:2], bool)
cxa = LOC[0] + CX * S_AP
for side in (-1, 1):
    ax, ay = (540, 395) if side < 0 else (2 * cxa - 540, 395)
    bx, by = (255, 305) if side < 0 else (2 * cxa - 255, 305)
    d = np.abs((by - ay) * xx - (bx - ax) * yy + bx * ay - by * ax) / np.hypot(bx - ax, by - ay)
    tt = ((xx - ax) * (bx - ax) + (yy - ay) * (by - ay)) / ((bx - ax) ** 2 + (by - ay) ** 2)
    band |= (d < 20) & (tt > -0.1) & (tt < 1.05)
armour = band & ((((Hh < 16) | (Hh > 340)) & (Ss > .5)) | ((Ss < .3) & (Vv < .75)))
E[hullm | armour] = 0
blue = (Hh > 180) & (Hh < 240) & (Ss > .3)
E1 = E.copy(); E1[blue] = 0          # lông năng lượng
E2 = E.copy(); E2[~blue] = 0         # lưỡi plasma lam
SO['xoa'] = {'diem_than': int(hullm.sum()), 'diem_giap_song_canh': int(armour.sum()), 'diem_lam_tach_ra': int((blue & (E.max(-1) > 10)).sum())}

# dải màu: g = độ chói (0,299R + 0,587G + 0,114B) — kênh lớn nhất bị bão hòa (R = 255 ở hầu hết lông) nên không phân biệt được gốc / ngọn.
#  Mỗi bậc chói lưu MÀU TUYỆT ĐỐI (trung vị E) → game vẽ cộng sáng đúng màu và đúng cường độ của ảnh duyệt ở bậc tím.
lum = lambda X: (X[..., 0] * .299 + X[..., 1] * .587 + X[..., 2] * .114)
g1 = lum(E1); ramp = [[0.0, 0, 0, 0]]
for lo in range(0, 256, 16):
    m = (g1 > max(lo, 4)) & (g1 <= lo + 16)
    if m.sum() < 30: continue
    ramp.append([round(float(np.median(g1[m])) / 255, 3)] + [int(v) for v in np.median(E1[m], 0)])
g2 = lum(E2); ramp2 = [[0.0, 0, 0, 0]]
for lo in range(0, 256, 16):
    m = (g2 > max(lo, 4)) & (g2 <= lo + 16)
    if m.sum() < 30: continue
    ramp2.append([round(float(np.median(g2[m])) / 255, 3)] + [int(v) for v in np.median(E2[m], 0)])
def recon(g, rp):
    xs = np.array([r[0] for r in rp]); cs = np.array([r[1:] for r in rp], np.float32)
    return np.stack([np.interp(g / 255, xs, cs[:, i]) for i in range(3)], -1)
mw = g1 > 12
SO['sai_so_tai_tao_long'] = {'TB_tuyet_doi_moi_kenh': round(float(np.abs(recon(g1, ramp) - E1)[mw].mean()), 1), 'so_diem': int(mw.sum())}
json.dump({'bung': ramp, 'bung2': ramp2}, open(f'{OUT}/tau8_ramp.json', 'w'))
SO['dai_mau_bung_theo_do_choi'] = ramp; SO['dai_mau_plasma'] = ramp2

# đưa về khung 1024×1024, cùng tỉ lệ điểm ảnh với thân 512, tâm thân tại (512, 512)
K = F / S_AP                                       # điểm ảnh ảnh duyệt → điểm ảnh khung thân
cy_a = LOC[1] + CY * S_AP
Mfx = np.float32([[K, 0, 512 - cxa * K], [0, K, 512 - cy_a * K]])
def fx(Ei, name):
    g = cv2.warpAffine(lum(Ei), Mfx, (1024, 1024), flags=cv2.INTER_AREA)
    g = np.clip(g, 0, 255).astype(np.uint8)
    Image.fromarray(np.dstack([g, g, g, g]), 'RGBA').save(f'{OUT}/{name}')
    ys, xs = np.where(g > 10); return [int(xs.min()), int(xs.max()), int(ys.min()), int(ys.max())]
SO['fx_bung_khung_bao'] = fx(E1, 'tau8_fx_bung.png')
SO['fx_bung2_khung_bao'] = fx(E2, 'tau8_fx_bung2.png')
SO['ti_le_anh_duyet_sang_khung_than'] = round(float(K), 4)

# gốc cánh (hệ 512) = vai trên ảnh duyệt (540, 395) và đối xứng
def a2h(x, y): return [round((x - cxa) * K + 256, 1), round((y - cy_a) * K + 256, 1)]
SO['goc_canh_512'] = {'trai': a2h(540, 395), 'phai': a2h(2 * cxa - 540, 395)}
SO['quy_doi_512_sang_1024'] = 'x1024 = x512 + 256, y1024 = y512 + 256 (cùng tỉ lệ điểm ảnh, tâm thân (256,256) ↔ (512,512))'

# ---------- 5. đo kiểm ----------
a_t, a_b = t512[..., 3], b512[..., 3]
x0b, x1b, y0b, y1b = bbox(a_t); SO['than_thuong_512'] = {'khung_bao': [int(x0b), int(x1b), int(y0b), int(y1b)], 'rong_cao': [int(x1b - x0b + 1), int(y1b - y0b + 1)]}
x0c, x1c, y0c, y1c = bbox(a_b, 24); SO['than_bt_512'] = {'khung_bao_alpha24': [int(x0c), int(x1c), int(y0c), int(y1c)], 'le_min': int(min(x0c, y0c, 511 - x1c, 511 - y1c))}
core = a_t > 200
d = np.abs(t512[..., :3] - b512[..., :3]).mean(-1)[core]
SO['than_giua_trung_khit'] = {'khac_mau_TB': round(float(d.mean()), 2), 'khac_max': round(float(d.max()), 1), 'lech_vi_tri_px': 0, 'lech_co': 0}
json.dump(SO, open(f'{OUT}/so_do.json', 'w'), ensure_ascii=False, indent=1)
print(json.dumps(SO, ensure_ascii=False, indent=1))
