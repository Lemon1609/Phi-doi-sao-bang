# V233B · bậc thường của tàu 6 thiếu khối mũi giữa (GPT ghi chú) → lấy khối mũi của bậc tím, thu theo tỉ lệ bề ngang 380/456,
#  khử bớt màu cho hợp giáp xám than + LED lơ nhạt, đặt DƯỚI thân thường (và bản _bt).
import sys
import numpy as np, cv2
from PIL import Image
fTim, D = sys.argv[1:3]
T = np.asarray(Image.open(fTim).convert('RGBA')).astype(np.float32)
F, cx, cy = 0.8837, 886.5, 408.0   # hệ số + tâm thân bậc tím (tau6_v233.py, so_do.json)
poly = np.array([(887, 168), (845, 238), (831, 320), (844, 424), (931, 424), (945, 320), (931, 238)], np.float32)
p5 = np.stack([(poly[:, 0] - cx) * F + 256, (poly[:, 1] - cy) * F + 256], 1).astype(np.int32)
m = np.zeros((512, 512), np.float32); cv2.fillPoly(m, [p5], 1.0); m = cv2.GaussianBlur(m, (5, 5), 0)
piece = T.copy(); piece[..., 3] *= m
g = piece[..., :3].mean(-1, keepdims=True); piece[..., :3] = (piece[..., :3] * .35 + g * .65) * np.array([.85, .95, 1.1])
k = 380 / 456; A = np.float32([[k, 0, 256 * (1 - k)], [0, k, 256 * (1 - k)]])
piece = cv2.warpAffine(piece, A, (512, 512), flags=cv2.INTER_AREA)
for suf in ('', '_bt'):
    p = f'{D}/tau6_thuong{suf}.png'; N = np.asarray(Image.open(p).convert('RGBA')).astype(np.float32)
    ta = N[..., 3:4] / 255; ba = piece[..., 3:4] / 255; oa = ta + ba * (1 - ta)
    out = np.dstack([(N[..., :3] * ta + piece[..., :3].clip(0, 255) * ba * (1 - ta)) / np.maximum(oa, 1e-6), oa * 255])
    Image.fromarray(out.clip(0, 255).astype(np.uint8), 'RGBA').save(p)
print('ok')
