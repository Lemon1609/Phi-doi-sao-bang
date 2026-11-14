# V244 · Rà soát + đổi màu đèn LED / ngọc trên thân theo bậc (góp ý chủ dự án 13/11 06:53: "các bậc tàu thay đổi cả màu led, neon, ngọc").
#  Màu đích từng bậc = màu thân cánh bung bậc đó (midCol của RAMP, cùng màu viền neon V240) → thân, viền neon, cánh cùng một tông mỗi bậc.
#  Đèn / ngọc = vùng nhỏ, rất sáng và đậm màu trên thân (không phải tấm giáp màu lớn). Bậc tím giữ nguyên tranh gốc đã duyệt.
#  python3 claude_tools/led_v244.py kiem            → chỉ đo (màu đèn từng bậc, khác bậc tím bao nhiêu)
#  python3 claude_tools/led_v244.py lam <tàu,...>   → ghi tranh mới vào src/ship118 (bản gốc lưu src/ship118_goc_v244)
import sys, os, json, re, shutil, colorsys
import numpy as np, cv2
from PIL import Image
MODE = sys.argv[1]; SHIPS = [int(x) for x in sys.argv[2].split(',')] if len(sys.argv) > 2 else list(range(1, 13))
T = ['thuong', 'luc', 'lam', 'tim', 'tim5', 'ss']
s = open('src/btfx218.js').read(); i = s.index('const RAMP={') + len('const RAMP='); d = 0; k = i
while True:
    c = s[k]; d += c == '{'; d -= c == '}'; k += 1
    if d == 0: break
R = json.loads(re.sub(r'([{,])(\d+):', r'\1"\2":', s[i:k]))
def midcol(st):
    e = st[int(len(st) * .62)] if st else [0, 255, 200, 120]; m = max(e[1], e[2], e[3], 1); return np.array([e[1] / m, e[2] / m, e[3] / m])
def ledmask(A):
    a = A[..., 3]; rgb = A[..., :3] / 255; mx = rgb.max(-1); mn = rgb.min(-1); sat = (mx - mn) / np.maximum(mx, 1e-3)
    loc = cv2.medianBlur((mx * 255).astype(np.uint8), 21).astype(np.float32) / 255   # đèn / ngọc = điểm sáng nổi hơn vùng quanh nó
    core = ((sat > .45) & (mx > .8) & (mx - loc > .1) & (a > 200)).astype(np.uint8)
    n, lab, st, _ = cv2.connectedComponentsWithStats(core); area = (a > 128).sum(); keep = np.zeros(core.shape, bool)
    for j in range(1, n):
        if st[j, 4] < area * .006: keep |= lab == j
    halo = cv2.dilate(keep.astype(np.uint8), np.ones((5, 5), np.uint8)).astype(bool) & (sat > .3) & (mx > .5) & (mx - loc > 0) & (a > 128)
    return keep | halo, sat, mx
def hue_of(A, m):
    rgb = A[..., :3][m] / 255
    if len(rgb) < 20: return None
    h = np.array([colorsys.rgb_to_hsv(*p)[0] for p in rgb[:: max(1, len(rgb) // 4000)]]) * 2 * np.pi
    return float((np.degrees(np.arctan2(np.sin(h).mean(), np.cos(h).mean())) + 360) % 360)
def hd(a, b): return None if a is None or b is None else round(min(abs(a - b), 360 - abs(a - b)))
OUT = {}
for n in SHIPS:
    if str(n - 1) not in R: continue
    row = {}
    for t in T:
        tgt = midcol(R[str(n - 1)][t]['bung']); th = colorsys.rgb_to_hsv(*tgt)[0] * 360
        for sfx in ('', '_bt'):
            p = f'src/ship118/tau{n}_{t}{sfx}.png'; g = f'src/ship118_goc_v244/tau{n}_{t}{sfx}.png'
            A = np.asarray(Image.open(g if os.path.exists(g) else p).convert('RGBA')).astype(np.float32)
            m, sat, mx = ledmask(A); h0 = hue_of(A, m)
            if sfx == '': row[t] = {'den_hue': None if h0 is None else round(h0), 'dich_hue': round(th), 'px_den': int(m.sum())}
            if MODE in ('lam', 'thu') and t != 'tim' and m.sum() > 0:
                if MODE == 'lam':
                    os.makedirs('src/ship118_goc_v244', exist_ok=True)
                    if not os.path.exists(g): shutil.copy(p, g)
                Lm = (A[..., :3] / 255 * [.299, .587, .114]).sum(-1)
                w = np.clip((mx - .82) / .18, 0, 1) * .65            # lõi đèn ngả trắng
                new = (tgt[None, None] * np.clip(mx * 1.05, 0, 1)[..., None] * (1 - w[..., None]) + w[..., None] * mx[..., None]) * 255
                fm = cv2.GaussianBlur(m.astype(np.float32), (0, 0), 1.0)[..., None] * np.clip((sat[..., None] - .2) / .3, 0, 1)
                B = A.copy(); B[..., :3] = A[..., :3] * (1 - fm) + new * fm
                Image.fromarray(B.clip(0, 255).astype(np.uint8), 'RGBA').save(p if MODE == 'lam' else os.environ['THU'] + f'/tau{n}_{t}{sfx}.png')
    hT = row['tim']['den_hue']
    for t in T: row[t]['khac_tim_do'] = hd(row[t]['den_hue'], hT)
    OUT[n] = row
for n, row in OUT.items():
    print(f'tàu {n}: ' + ' | '.join(f"{t} đèn {v['den_hue']}° → đích {v['dich_hue']}° (khác tím {v['khac_tim_do']}°, {v['px_den']} px)" for t, v in row.items()))
json.dump(OUT, open('src/ship118_cho/V244_ra_soat_den.json', 'w'), ensure_ascii=False, indent=1)
