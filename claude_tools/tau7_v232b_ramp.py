# V232B · bảng màu 6 bậc tàu 7 (bảng GPT V232B + nguyên tắc phương án C) + lớp phiến 2 + lệch gốc phiến từng bậc.
import sys, json
import numpy as np, cv2
from PIL import Image
fR, fT2, fS, D512, fO, fB3 = sys.argv[1:7]
R = json.load(open(fR))['kiem']; S = json.load(open(fS)); F = S['he_so_chung_1254_sang_512']
xs = np.array([r[0] for r in R]); MAG = np.array([r[1:] for r in R], np.float32).max(1)
V = np.round(np.linspace(0, 1, 33), 4)
def table(stops, th=0, gain=1):
    gx = np.array([a for a, _ in stops]); cc = np.array([np.array(b, np.float32) / max(b) for _, b in stops])
    out = []
    for v in V:
        g = max(0, (v - th) / (1 - th)) if th else v
        col = np.array([np.interp(g, gx, cc[:, i]) for i in range(3)]); col /= max(col.max(), 1e-6)
        out.append([float(v)] + [int(min(255, round(x))) for x in col * np.interp(g, xs, MAG) * gain])
    return out
C = {'thuong': [(.1, (60, 170, 255)), (.5, (130, 170, 255)), (.9, (220, 245, 255))], 'luc': [(.1, (20, 140, 60)), (.5, (90, 240, 110)), (.9, (220, 255, 225))],
     'lam': [(.1, (40, 80, 255)), (.5, (60, 200, 255)), (.9, (240, 250, 255))], 'tim5': [(.1, (230, 60, 30)), (.5, (255, 220, 60)), (.9, (255, 255, 240))],
     'ss': [(.1, (230, 170, 40)), (.5, (255, 235, 90)), (.9, (255, 255, 245))]}
L2 = {'tim5': [(.1, (255, 60, 110)), (.9, (255, 240, 245))], 'ss': [(.1, (40, 230, 200)), (.9, (230, 255, 250))]}
SH = {'thuong': (.62, .30, .72, 0), 'luc': (.74, .20, .82, 0), 'lam': (.87, .10, .92, 0), 'tim': (1, 0, 1, 0), 'tim5': (1, 0, 1.08, .75), 'ss': (1.08, 0, 1.15, 1)}
def edge(p, row=248):
    a = np.asarray(Image.open(p).convert('RGBA'))[..., 3]; r = np.where(a[row - 6:row + 6].max(0) > 128)[0]; return int(r.min()), int(r.max())
eT = edge(f'{D512}/tau7_tim_bt.png')
OUT = {}
for t, (k, th, gain, l2) in SH.items():
    if t == 'tim':
        OUT[t] = {'k': 1, 'img': 'kiem', 'mau': 'kiem_mau', 'fx': 1280, 'off': [[0, 0], [0, 0]], 'bung': R}; continue
    e = edge(f'{D512}/tau7_{t}_bt.png')
    OUT[t] = {'k': k, 'img': 'kiem', 'fx': 1280, 'off': [[e[0] - eT[0], 0], [e[1] - eT[1], 0]], 'bung': table(C[t], th, gain)}
    if l2: OUT[t]['bung3'] = table(L2[t], 0, gain * l2); OUT[t]['img3'] = 'kiem3'
json.dump(OUT, open(fO, 'w'), separators=(',', ':'))
t2 = np.asarray(Image.open(fT2).convert('RGBA')).astype(np.float32); g = t2[..., :3].mean(-1) * t2[..., 3] / 255
M = np.float32([[F, 0, 640 - 627 * F], [0, F, 640 - 627 * F]])
g = np.clip(cv2.warpAffine(g, M, (1280, 1280), flags=cv2.INTER_AREA), 0, 255).astype(np.uint8)
Image.fromarray(np.dstack([g, g, g, g]), 'RGBA').save(fB3); print({t: OUT[t]['off'] for t in OUT})
