# V237B · bảng màu 6 bậc tàu 10 (bảng GPT V237 + nguyên tắc C, bậc thấp 2 sắc và to gần bậc tím theo góp ý 21:05).
#  python3 ... <tau10_ramp.json> <ra.json> <src/ship118>
import sys, json
import numpy as np
from PIL import Image
R = json.load(open(sys.argv[1]))['khien']; xs = np.array([r[0] for r in R]); MAG = np.array([r[1:] for r in R], np.float32).max(1); D512 = sys.argv[3]
V = np.round(np.linspace(0, 1, 33), 4)
def table(stops, th=0, gain=1):
    gx = np.array([a for a, _ in stops]); cc = np.array([np.array(b, np.float32) / max(b) for _, b in stops]); out = []
    for v in V:
        g = max(0, (v - th) / (1 - th)) if th else v
        col = np.array([np.interp(g, gx, cc[:, i]) for i in range(3)]); col /= max(col.max(), 1e-6)
        out.append([float(v)] + [int(min(255, round(x))) for x in col * np.interp(g, xs, MAG) * gain])
    return out
C = {'thuong': [(.1, (255, 150, 200)), (.5, (130, 220, 170)), (.9, (235, 255, 240))],
     'luc': [(.1, (40, 200, 220)), (.5, (130, 225, 60)), (.9, (240, 255, 230))],
     'lam': [(.1, (20, 170, 190)), (.5, (70, 180, 255)), (.9, (230, 245, 255))],
     'tim5': [(.1, (150, 50, 220)), (.5, (240, 110, 230)), (.9, (255, 240, 255))],
     'ss': [(.1, (255, 170, 90)), (.5, (255, 215, 80)), (.9, (255, 255, 240))]}
L2 = {'tim5': [(.1, (40, 220, 170)), (.9, (220, 255, 240))], 'ss': [(.1, (180, 255, 200)), (.9, (255, 255, 250))]}
SH = {'thuong': (.92, .04, .97, 0), 'luc': (.96, .02, 1, 0), 'lam': (.97, .02, .99, 0), 'tim': (1, 0, 1, 0), 'tim5': (1, 0, 1.08, .75), 'ss': (1.08, 0, 1.15, 1)}
def edge(p, row=250):
    a = np.asarray(Image.open(p).convert('RGBA'))[..., 3]; r = np.where(a[row - 6:row + 6].max(0) > 128)[0]; return int(r.min()), int(r.max())
eT = edge(f'{D512}/tau10_tim.png'); O = {}
for t, (k, th, gain, l2) in SH.items():
    if t == 'tim': O[t] = {'k': 1, 'img': 'khien', 'mau': 'khien_mau', 'fx': 1536, 'off': [[0, 0], [0, 0]], 'bung': R}; continue
    e = edge(f'{D512}/tau10_{t}.png')
    O[t] = {'k': k, 'img': 'khien', 'fx': 1536, 'off': [[e[0] - eT[0], 0], [e[1] - eT[1], 0]], 'bung': table(C[t], th, gain)}
    if l2: O[t]['bung3'] = table(L2[t], 0, gain * l2); O[t]['img3'] = 'khien3'
json.dump(O, open(sys.argv[2], 'w'), separators=(',', ':')); print('ok', {t: O[t]['off'] for t in O})
