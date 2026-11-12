# V235 · Tách lớp tàu 3 X-Dực Băng bậc tím từ mẫu hướng đã chốt V231D (03_x_duc_bang.png).
#  Tinh thể = 4 đa giác dò tay (đối xứng qua trục x=628); càng kẹp kim loại đè lên gốc tinh thể giữ lại cho thân.
#  python3 claude_tools/tau3_v235.py <anh.png> <thu_muc_ra>
#  Ra: tau3_tim_bt.png (thân + tay đòn + càng kẹp, 512), tau3_fx_tt.png (thang xám 1280, tâm thân ở giữa), tau3_fx_tt_mau.png, tau3_ramp.json, so_do.json, mask.npy
import sys, json
import numpy as np, cv2
from PIL import Image
f, OUT = sys.argv[1:3]
A = np.asarray(Image.open(f).convert('RGB')).astype(np.float32); H, W = A.shape[:2]
AX = 628.0
bg = np.median(np.concatenate([A[:10].reshape(-1, 3), A[-10:].reshape(-1, 3)]), 0)
E = np.clip(A - bg - 2, 0, 255); d = np.abs(A - bg).max(-1)
mir = lambda P: [(round(2 * AX - x), y) for x, y in P]
UL = [(50, 146), (316, 219), (430, 342), (492, 408), (440, 487), (400, 482), (161, 340)]
LL = [(52, 1007), (157, 807), (297, 697), (450, 680), (532, 690), (537, 726), (460, 780), (355, 887)]
CL = [(370, 365, 512, 478), (400, 662, 548, 792)]             # vùng càng kẹp (x0,y0,x1,y1) bên trái
tt = np.zeros((H, W), np.uint8)
for P in (UL, LL, mir(UL), mir(LL)): cv2.fillPoly(tt, [np.int32(P)], 1)
tt_d = cv2.dilate(tt, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (25, 25)))
mx = A.max(-1); mn = A.min(-1); s = (mx - mn) / np.maximum(mx, 1)
claw = np.zeros((H, W), np.uint8)
for x0, y0, x1, y1 in CL + [(round(2 * AX - x1), y0, round(2 * AX - x0), y1) for x0, y0, x1, y1 in CL]:
    m = ((s < .30) & (mx > 80) & (mx < 242)).astype(np.uint8)[y0:y1, x0:x1]
    m = cv2.morphologyEx(m, cv2.MORPH_OPEN, np.ones((3, 3), np.uint8))
    m = cv2.morphologyEx(m, cv2.MORPH_CLOSE, np.ones((11, 11), np.uint8))
    n, lab, st, _ = cv2.connectedComponentsWithStats(m)
    for i in range(1, n):
        if st[i, 4] > 120: claw[y0:y1, x0:x1][lab == i] = 1
energy = (tt_d > 0) & (claw == 0)
fg = np.clip((d - 10) / 40, 0, 1)
hullm = (fg > .5) & ~energy
n, lab, st, _ = cv2.connectedComponentsWithStats(hullm.astype(np.uint8))
keep = lab == (1 + np.argmax(st[1:, 4]))          # chỉ khối thân chính (mảnh rời = viền tinh thể)
keep |= claw > 0
keep = cv2.morphologyEx(keep.astype(np.uint8), cv2.MORPH_CLOSE, np.ones((5, 5), np.uint8)).astype(bool)
# lấp lỗ trong thân (đèn LED xanh trong thân)
ff = keep.astype(np.uint8).copy(); msk = np.zeros((H + 2, W + 2), np.uint8); cv2.floodFill(ff, msk, (0, 0), 2)
keep = keep | (ff == 0)
keep &= ~energy | (claw > 0)
np.save(f'{OUT}/mask.npy', keep)
al = cv2.GaussianBlur(keep.astype(np.float32), (3, 3), 0) * np.maximum(fg, keep * 1.0)
ys, xs = np.where(keep); x0, x1, y0, y1 = xs.min(), xs.max(), ys.min(), ys.max()
cx, cy = AX + .5, (y0 + y1 + 1) / 2
F = 456 / max(2 * max(cx - x0, x1 + 1 - cx), y1 - y0 + 1)
Mh = np.float32([[F, 0, 256 - cx * F], [0, F, 256 - cy * F]])
hull = cv2.warpAffine(np.dstack([A * al[..., None], al * 255]), Mh, (512, 512), flags=cv2.INTER_AREA)
a5 = hull[..., 3:4] / 255; hull[..., :3] = np.where(a5 > 0, hull[..., :3] / np.maximum(a5, 1e-3), 0)
hull = hull.clip(0, 255).astype(np.uint8)
Image.fromarray(hull, 'RGBA').save(f'{OUT}/tau3_tim_bt.png')
E1 = E * ((cv2.dilate(tt, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (61, 61))) > 0) & ~keep)[..., None]
lum = lambda X: X[..., 0] * .299 + X[..., 1] * .587 + X[..., 2] * .114
g1 = lum(E1); ramp = [[0.0, 0, 0, 0]]
for lo in range(0, 256, 16):
    mm = (g1 > max(lo, 4)) & (g1 <= lo + 16)
    if mm.sum() < 30: continue
    ramp.append([round(float(np.median(g1[mm])) / 255, 3)] + [int(v) for v in np.median(E1[mm], 0)])
xsr = np.array([r[0] for r in ramp]); csr = np.array([r[1:] for r in ramp], np.float32)
rec = np.stack([np.interp(g1 / 255, xsr, csr[:, i]) for i in range(3)], -1); mw = g1 > 12
FX = 1536
Mfx = np.float32([[F, 0, FX / 2 - cx * F], [0, F, FX / 2 - cy * F]])
g = np.clip(cv2.warpAffine(g1, Mfx, (FX, FX), flags=cv2.INTER_AREA), 0, 255).astype(np.uint8)
Image.fromarray(np.dstack([g, g, g, g]), 'RGBA').save(f'{OUT}/tau3_fx_tt.png')
Ew = np.clip(cv2.warpAffine(E1, Mfx, (FX, FX), flags=cv2.INTER_AREA), 0, 255); m3 = Ew.max(-1, keepdims=True)
Image.fromarray(np.dstack([np.where(m3 > 0, Ew / np.maximum(m3, 1) * 255, 0), m3]).clip(0, 255).astype(np.uint8), 'RGBA').save(f'{OUT}/tau3_fx_tt_mau.png')
json.dump({'tt': ramp}, open(f'{OUT}/tau3_ramp.json', 'w'))
ysg, xsg = np.where(g > 10)
# gốc tinh thể (tâm vùng càng kẹp) quy về 512
piv = []
for x0_, y0_, x1_, y1_ in CL:
    piv.append([round(((x0_ + x1_) / 2 - cx) * F + 256, 1), round(((y0_ + y1_) / 2 - cy) * F + 256, 1)])
SO = {'nen': bg.tolist(), 'than_khung_bao_anh': [int(x0), int(x1), int(y0), int(y1)], 'tam': [cx, cy], 'he_so': round(F, 4),
      'than_512': [round((x1 - x0 + 1) * F), round((y1 - y0 + 1) * F)], 'fx_khung_bao_1536': [int(xsg.min()), int(xsg.max()), int(ysg.min()), int(ysg.max())],
      'goc_tinh_the_trai_512': piv, 'sai_so_tai_tao_mau': round(float(np.abs(rec - E1)[mw].mean()), 1), 'so_bac_dai_mau': len(ramp)}
json.dump(SO, open(f'{OUT}/so_do.json', 'w'), ensure_ascii=False, indent=1); print(json.dumps(SO, ensure_ascii=False))
