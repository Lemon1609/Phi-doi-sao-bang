# V217 · Cân đối cỡ và tỉ lệ thân chiến cơ lúc dựng (không sửa tệp gốc trong src/ship118)
#  Game vẽ mọi tàu vào cùng một khung vuông → tranh chiếm nhiều khung thì tàu to, chiếm ít thì nhỏ.
#  Quy tắc:
#   1) cỡ chuẩn theo bậc G = căn(rộng × cao) của thân (alpha > 128), tăng dần thuong → ss;
#   2) tàu quá dẹt (rộng/cao > 1,30) hoặc quá gầy (< 0,75): nắn tối đa 12 % mỗi chiều;
#   3) cạnh dài nhất không quá 1,13 × G và không quá 456 px;
#   4) bản Bạo Tẩu dùng CÙNG hệ số với bản thường cùng bậc (thân khớp nhau); nếu bản Bạo Tẩu tràn khung 500 px
#      thì giảm chung cả hai;
#   5) căn tâm theo khung bao của thân.
#  Tắt: đặt biến môi trường CANDOI217=0 khi dựng.
import os, glob
import numpy as np
from PIL import Image

T = ['thuong', 'luc', 'lam', 'tim', 'tim5', 'ss']
G = {'thuong': 345, 'luc': 355, 'lam': 368, 'tim': 380, 'tim5': 392, 'ss': 405}
MAXD, MAXBT, KMAX = 456, 500, 1.12
# V230: tàu có dáng cao hẹp đã chốt (chủ dự án 23:24) → KHÔNG nắn tỉ lệ, chỉ đổi cỡ
NO_ASP = {7, 8}  # V231: tàu 8 dáng cao hẹp (mẫu 86546 đã chốt)
# V231E: tàu đã được chuẩn hóa sẵn về 512 (claude_tools/tau8_v231*.py) → giữ NGUYÊN tranh, không đổi cỡ, không căn lại tâm
KEEP = {8}
# V232: từng bậc đã chuẩn hóa sẵn (tàu đang thay dần từng bậc)
KEEPT = {(7, 'tim')}


def _bbox(im, th):
    a = np.asarray(im)[..., 3] > th
    ys, xs = np.where(a)
    if not len(xs):
        return 0, im.width - 1, 0, im.height - 1
    return int(xs.min()), int(xs.max()), int(ys.min()), int(ys.max())


def he_so(nm, bt=None, giu_ti_le=False):
    """Trả về (sx, sy) cho một cặp tranh thường / Bạo Tẩu."""
    x0, x1, y0, y1 = _bbox(nm, 128)
    w, h = x1 - x0 + 1, y1 - y0 + 1
    asp = w / h
    sx = sy = 1.0
    if giu_ti_le:
        pass
    elif asp > 1.30:
        k = min(KMAX, (asp / 1.30) ** .5); sx, sy = 1 / k, k
    elif asp < 0.75:
        k = min(KMAX, (0.75 / asp) ** .5); sx, sy = k, 1 / k
    g = (w * sx * h * sy) ** .5
    return sx, sy, g, w, h


def _ap(im, sx, sy):
    x0, x1, y0, y1 = _bbox(im, 128)
    big = im.resize((max(1, round(im.width * sx)), max(1, round(im.height * sy))), Image.LANCZOS)
    cx, cy = (x0 + x1 + 1) / 2 * sx, (y0 + y1 + 1) / 2 * sy
    out = Image.new('RGBA', im.size, (0, 0, 0, 0))
    out.paste(big, (round(im.width / 2 - cx), round(im.height / 2 - cy)), big)
    return out


def can_doi(thu_muc='src/ship118', log=None):
    """{ 'tau8_tim': ảnh, 'tau8_tim_bt': ảnh, ... } đã cân đối."""
    out = {}
    for n in range(1, 14):
        for t in T:
            p = os.path.join(thu_muc, f'tau{n}_{t}.png')
            if not os.path.exists(p):
                continue
            nm = Image.open(p).convert('RGBA')
            pb = os.path.join(thu_muc, f'tau{n}_{t}_bt.png')
            bt = Image.open(pb).convert('RGBA') if os.path.exists(pb) else None
            if n in KEEP or (n, t) in KEEPT:
                out[f'tau{n}_{t}'] = nm
                if bt is not None:
                    out[f'tau{n}_{t}_bt'] = bt
                if log is not None:
                    log.append((n, t, nm.width, nm.height, 1.0, 1.0))
                continue
            sx, sy, g, w, h = he_so(nm, giu_ti_le=n in NO_ASP)
            s = min(G[t] / g, (9 if n in NO_ASP else 1.13) * G[t] / max(w * sx, h * sy), MAXD / (w * sx), MAXD / (h * sy))
            if bt is not None:
                bx0, bx1, by0, by1 = _bbox(bt, 24)
                bw, bh = bx1 - bx0 + 1, by1 - by0 + 1
                s = min(s, MAXBT / (bw * sx), MAXBT / (bh * sy))
            sx *= s; sy *= s
            out[f'tau{n}_{t}'] = _ap(nm, sx, sy)
            if bt is not None:
                out[f'tau{n}_{t}_bt'] = _ap(bt, sx, sy)
            if log is not None:
                log.append((n, t, w, h, round(sx, 3), round(sy, 3)))
    # tranh khác (không theo mẫu tên) giữ nguyên
    for p in sorted(glob.glob(os.path.join(thu_muc, 'tau*.png'))):
        k = os.path.splitext(os.path.basename(p))[0]
        if k not in out:
            out[k] = Image.open(p).convert('RGBA')
    return out


if __name__ == '__main__':
    L = []
    R = can_doi(log=L)
    print('tàu bậc  rộng×cao gốc → hệ số ngang / dọc → rộng×cao mới')
    for n, t, w, h, sx, sy in L:
        print(f'{n:2} {t:6} {w}×{h} → {sx:.2f} / {sy:.2f} → {round(w*sx)}×{round(h*sy)}')
