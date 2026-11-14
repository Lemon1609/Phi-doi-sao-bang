# V239 · bảng màu 6 bậc tàu 12 (bảng GPT V239 + nguyên tắc C, bậc thấp 2 sắc và to gần bậc tím). python3 ... <tau12_ramp.json> <ra.json> <thư mục thân 512>
import sys, json
import numpy as np
from PIL import Image
R = json.load(open(sys.argv[1]))['tg']; xs = np.array([r[0] for r in R]); MAG = np.array([r[1:] for r in R], np.float32).max(1); D512 = sys.argv[3]
V = np.round(np.linspace(0, 1, 33), 4)
def table(stops, th=0, gain=1):
    gx = np.array([a for a, _ in stops]); cc = np.array([np.array(b, np.float32) / max(b) for _, b in stops]); out = []
    for v in V:
        g = max(0, (v - th) / (1 - th)) if th else v
        col = np.array([np.interp(g, gx, cc[:, i]) for i in range(3)]); col /= max(col.max(), 1e-6)
        out.append([float(v)] + [int(min(255, round(x))) for x in col * np.interp(g, xs, MAG) * gain])
    return out
C = {'thuong': [(.1, (110, 170, 230)), (.5, (255, 170, 40)), (.9, (255, 240, 190))],     # mép lơ thép, thân hổ phách
     'luc': [(.1, (20, 150, 120)), (.5, (170, 240, 60)), (.9, (235, 255, 225))],
     'lam': [(.1, (40, 80, 255)), (.5, (80, 200, 255)), (.9, (230, 245, 255))],
     'tim5': [(.1, (90, 40, 170)), (.5, (230, 90, 220)), (.9, (255, 235, 245))],
     'ss': [(.1, (255, 190, 60)), (.5, (255, 240, 180)), (.9, (255, 255, 250))]}
SH = {'thuong': (.92, .04, .97), 'luc': (.96, .02, 1), 'lam': (.97, .02, .99), 'tim': (1, 0, 1), 'tim5': (1, 0, 1.08), 'ss': (1.08, 0, 1.15)}
def edge(p, row=300):
    a = np.asarray(Image.open(p).convert('RGBA'))[..., 3]; r = np.where(a[row - 6:row + 6].max(0) > 128)[0]; return int(r.min()), int(r.max())
eT = edge(f'{D512}/tau12_tim.png'); O = {}
for t, (k, th, gain) in SH.items():
    if t == 'tim': O[t] = {'k': 1, 'img': 'tg', 'mau': 'tg_mau', 'fx': 1536, 'off': [[0, 0], [0, 0]], 'bung': R}; continue
    e = edge(f'{D512}/tau12_{t}.png')
    O[t] = {'k': k, 'img': 'tg', 'fx': 1536, 'off': [[e[0] - eT[0], 0], [e[1] - eT[1], 0]], 'bung': table(C[t], th, gain)}
json.dump(O, open(sys.argv[2], 'w'), separators=(',', ':')); print('ok', {t: O[t]['off'] for t in O}, 'mep tim', eT)
