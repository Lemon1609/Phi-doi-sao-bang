# V236 · bảng màu 6 bậc tàu 6 cho hình bung MỚI: giữ bảng màu V233B (chỉ đổi hình), độ chói lấy từ dải đo ảnh mới, khung 2048.
#  python3 claude_tools/tau6_v236_ramp.py <tau6_ramp.json mới> <src/ship118> <ra.json>
import sys, json
import numpy as np
from PIL import Image
fR, D512, fO = sys.argv[1:4]
R = json.load(open(fR))['so']; xs = np.array([r[0] for r in R]); MAG = np.array([r[1:] for r in R], np.float32).max(1)
V = np.round(np.linspace(0, 1, 33), 4)
def table(stops, th=0, gain=1):
    gx = np.array([a for a, _ in stops]); cc = np.array([np.array(b, np.float32) / max(b) for _, b in stops]); out = []
    for v in V:
        g = max(0, (v - th) / (1 - th)) if th else v
        col = np.array([np.interp(g, gx, cc[:, i]) for i in range(3)]); col /= max(col.max(), 1e-6)
        out.append([float(v)] + [int(min(255, round(x))) for x in col * np.interp(g, xs, MAG) * gain])
    return out
C = {'thuong': [(.1, (90, 110, 140)), (.5, (120, 150, 190)), (.9, (225, 230, 240))], 'luc': [(.1, (150, 180, 60)), (.5, (220, 240, 60)), (.9, (250, 255, 230))],
     'lam': [(.1, (40, 50, 160)), (.5, (110, 190, 255)), (.9, (240, 250, 255))], 'tim5': [(.1, (130, 40, 200)), (.5, (240, 90, 230)), (.9, (255, 240, 255))],
     'ss': [(.1, (20, 40, 160)), (.5, (60, 140, 255)), (.9, (245, 250, 255))]}
L2 = {'tim5': [(.1, (200, 60, 220)), (.9, (255, 230, 255))], 'ss': [(.1, (60, 140, 255)), (.9, (240, 245, 255))]}
SH = {'thuong': (.78, .12, .88, 0), 'luc': (.86, .06, .93, 0), 'lam': (.93, .03, .97, 0), 'tim': (1, 0, 1, 0), 'tim5': (1, 0, 1.08, .75), 'ss': (1.08, 0, 1.15, 1)}
def edge(p, row=236):
    a = np.asarray(Image.open(p).convert('RGBA'))[..., 3]; r = np.where(a[row - 6:row + 6].max(0) > 128)[0]; return int(r.min()), int(r.max())
eT = edge(f'{D512}/tau6_tim_bt.png'); OUT = {}
for t, (k, th, gain, l2) in SH.items():
    if t == 'tim': OUT[t] = {'k': 1, 'img': 'so', 'mau': 'so_mau', 'fx': 2048, 'off': [[0, 0], [0, 0]], 'bung': R}; continue
    e = edge(f'{D512}/tau6_{t}_bt.png')
    OUT[t] = {'k': k, 'img': 'so', 'fx': 2048, 'off': [[e[0] - eT[0], 0], [e[1] - eT[1], 0]], 'bung': table(C[t], th, gain)}
    if l2: OUT[t]['bung3'] = table(L2[t], 0, gain * l2); OUT[t]['img3'] = 'so3'
json.dump(OUT, open(fO, 'w'), separators=(',', ':')); print({t: OUT[t]['off'] for t in OUT})
