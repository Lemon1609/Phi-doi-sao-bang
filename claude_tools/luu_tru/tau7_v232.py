# V232 · Tách lớp tàu 7 Đao Phong bậc tím từ ảnh bung đã duyệt (12/11 13:50, GPT vẽ theo dáng 86543).
#  python3 claude_tools/tau7_v232.py <anh_duyet.png> <thu_muc_ra>
#  Ra: tau7_tim.png = tau7_tim_bt.png (512, thân giống hệt: phần cứng của mẫu đã ở thế mở), tau7_fx_kiem.png (1024², thang xám,
#      chỉ các phiến lưỡi năng lượng, cùng tỉ lệ thân 512, tâm thân ở giữa), tau7_ramp.json (dải màu đo từ ảnh), so_do.json.
import sys, json
import numpy as np, cv2
from PIL import Image
f, OUT = sys.argv[1:3]
A = np.asarray(Image.open(f).convert('RGB')).astype(np.float32); H, W = A.shape[:2]
bg = np.median(np.concatenate([A[:20].reshape(-1, 3), A[-20:].reshape(-1, 3)]), 0)
E = np.clip(A - bg - 2, 0, 255); d = E.max(-1)
XL, XR = 597, 1177           # mép ngoài hai tấm lưỡi cứng ngoài cùng (đo trên ảnh cắt có thước)
band = np.zeros((H, W), bool); band[:, XL:XR + 1] = True
# thân: mọi điểm khác nền trong dải; alpha mềm theo độ khác nền
al = np.clip((d - 14) / 46, 0, 1); al[~band] = 0
al = cv2.morphologyEx((al > .5).astype(np.uint8), cv2.MORPH_OPEN, np.ones((3, 3), np.uint8)).astype(np.float32) * al + al * (al <= .5)
ys, xs = np.where(al > .5); x0, x1, y0, y1 = xs.min(), xs.max(), ys.min(), ys.max()
cx, cy = (x0 + x1 + 1) / 2, (y0 + y1 + 1) / 2
F = 456 / max(x1 - x0 + 1, y1 - y0 + 1)
M = np.float32([[F, 0, 256 - cx * F], [0, F, 256 - cy * F]])
rgb = np.where(al[..., None] > 0, A, 0)
hull = cv2.warpAffine(np.dstack([rgb, al * 255]), M, (512, 512), flags=cv2.INTER_AREA)
hull = hull.clip(0, 255).astype(np.uint8)
Image.fromarray(hull, 'RGBA').save(f'{OUT}/tau7_tim.png'); Image.fromarray(hull, 'RGBA').save(f'{OUT}/tau7_tim_bt.png')
# lớp phiến: ngoài dải thân
E1 = E.copy(); E1[band] = 0
lum = lambda X: X[..., 0] * .299 + X[..., 1] * .587 + X[..., 2] * .114
g1 = lum(E1); ramp = [[0.0, 0, 0, 0]]
for lo in range(0, 256, 16):
    m = (g1 > max(lo, 4)) & (g1 <= lo + 16)
    if m.sum() < 30: continue
    ramp.append([round(float(np.median(g1[m])) / 255, 3)] + [int(v) for v in np.median(E1[m], 0)])
xsr = np.array([r[0] for r in ramp]); csr = np.array([r[1:] for r in ramp], np.float32)
rec = np.stack([np.interp(g1 / 255, xsr, csr[:, i]) for i in range(3)], -1); mw = g1 > 12
FX = 1280  # khung lớp phiến 1280² (1024 không đủ chứa sải phiến của mẫu); tâm thân ở giữa, cùng tỉ lệ điểm ảnh thân 512
K = F; Mfx = np.float32([[K, 0, FX / 2 - cx * K], [0, K, FX / 2 - cy * K]])
g = np.clip(cv2.warpAffine(g1, Mfx, (FX, FX), flags=cv2.INTER_AREA), 0, 255).astype(np.uint8)
# bản MÀU cho bậc tím (đúng màu ảnh duyệt): rgb = E / max, alpha = max → vẽ cộng sáng ra đúng E
Ew = np.clip(cv2.warpAffine(E1, Mfx, (FX, FX), flags=cv2.INTER_AREA), 0, 255); mx = Ew.max(-1, keepdims=True)
mau = np.dstack([np.where(mx > 0, Ew / np.maximum(mx, 1) * 255, 0), mx]).clip(0, 255).astype(np.uint8)
Image.fromarray(mau, 'RGBA').save(f'{OUT}/tau7_fx_kiem_mau.png')
Image.fromarray(np.dstack([g, g, g, g]), 'RGBA').save(f'{OUT}/tau7_fx_kiem.png')
ysg, xsg = np.where(g > 10)
json.dump({'kiem': ramp}, open(f'{OUT}/tau7_ramp.json', 'w'))
# gốc phiến (giữa chùm 3 phiến, ngay mép tấm lưỡi cứng)
rows = np.where((E1[:, XL - 30:XL - 2].max(-1) > 60).any(1))[0]
yr = float(np.median(rows))
piv = [[round((XL - cx) * F + 256, 1), round((yr - cy) * F + 256, 1)], [round((XR - cx) * F + 256, 1), round((yr - cy) * F + 256, 1)]]
SO = {'nen': bg.tolist(), 'than_khung_bao_anh': [int(x0), int(x1), int(y0), int(y1)], 'he_so_anh_sang_512': round(F, 4),
      'than_512_rong_cao': [round((x1 - x0 + 1) * F), round((y1 - y0 + 1) * F)], 'fx_khung_bao_1280': [int(xsg.min()), int(xsg.max()), int(ysg.min()), int(ysg.max())],
      'goc_phien_512': piv, 'sai_so_tai_tao_mau': round(float(np.abs(rec - E1)[mw].mean()), 1), 'so_bac_dai_mau': len(ramp)}
json.dump(SO, open(f'{OUT}/so_do.json', 'w'), ensure_ascii=False, indent=1); print(json.dumps(SO, ensure_ascii=False))
