# V234C · Tàu 2 · áp tư vấn Gemini (12/11 17:39), phần hình (không đổi đạn):
#  - phần màn vươn trước mũi giảm còn ~45 %, phần rủ sau lưng giữ 100 %;
#  - phần rủ sau mở chữ V ~22° ra ngoài hai thanh ray (như đôi cánh cực quang sau lưng tàu);
#  - đổi dải màu bậc tím sang lục ngọc #00E676 → tím #B388FF (bớt lơ để khỏi lẫn tia laser lơ).
#  python3 claude_tools/tau2_v234c.py <fx_cq.png> <fx_cq3.png> <thư mục ra>
import sys, math
import numpy as np
from PIL import Image
f1, f3, OUT = sys.argv[1:4]
def xu_ly(p, ten):
    g = np.asarray(Image.open(p))[..., 0].astype(np.float32); Hh, W = g.shape; c = W / 2
    out = np.zeros_like(g); tg = math.tan(math.radians(22))
    for y in range(Hh):
        row = g[y]
        if y > c:                                   # rủ sau: tách hai nửa ra ngoài theo chữ V
            d = int(round((y - c) * tg)); L = np.zeros(W, np.float32); R = np.zeros(W, np.float32)
            L[:int(c) - d] = row[d:int(c)]; R[int(c) + d:] = row[int(c):W - d]; out[y] = np.maximum(L, R)
        else:
            out[y] = row
    yy = np.arange(Hh)[:, None]; fac = np.clip(.45 + .55 * (yy - (c - 80)) / 160, .45, 1.0)   # trước 45 % → sau 100 %
    out = np.clip(out * fac, 0, 255).astype(np.uint8)
    Image.fromarray(np.dstack([out, out, out, out]), 'RGBA').save(f'{OUT}/{ten}')
xu_ly(f1, 'tau2_fx_cq.png'); xu_ly(f3, 'tau2_fx_cq3.png'); print('ok')
