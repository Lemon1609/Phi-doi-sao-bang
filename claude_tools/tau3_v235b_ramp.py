# V235B · bảng màu 6 bậc tàu 3 (bảng GPT V235 + nguyên tắc C). python3 ... <tau3_ramp.json> <ra.json>
import sys, json
import numpy as np
R = json.load(open(sys.argv[1]))['tt']; xs = np.array([r[0] for r in R]); MAG = np.array([r[1:] for r in R], np.float32).max(1)
V = np.round(np.linspace(0, 1, 33), 4)
def table(stops, th=0, gain=1):
    gx = np.array([a for a, _ in stops]); cc = np.array([np.array(b, np.float32) / max(b) for _, b in stops]); out = []
    for v in V:
        g = max(0, (v - th) / (1 - th)) if th else v
        col = np.array([np.interp(g, gx, cc[:, i]) for i in range(3)]); col /= max(col.max(), 1e-6)
        out.append([float(v)] + [int(min(255, round(x))) for x in col * np.interp(g, xs, MAG) * gain])
    return out
# tinh thể: cạnh (chói thấp) → thân → lõi (chói cao)
C = {'thuong': [(.1, (150, 190, 225)), (.5, (175, 195, 210)), (.9, (240, 245, 250))],
     'luc': [(.1, (110, 230, 170)), (.5, (200, 245, 110)), (.9, (245, 255, 235))],
     'lam': [(.1, (20, 50, 190)), (.5, (40, 120, 255)), (.9, (230, 240, 255))],
     'tim5': [(.1, (150, 60, 225)), (.5, (195, 155, 255)), (.9, (250, 240, 255))],
     'ss': [(.1, (255, 185, 120)), (.5, (255, 235, 150)), (.9, (255, 255, 245))]}
L2 = {'tim5': [(.1, (235, 150, 235)), (.9, (255, 235, 250))], 'ss': [(.1, (255, 235, 170)), (.9, (255, 255, 245))]}
SH = {'thuong': (.78, .12, .88, 0), 'luc': (.86, .06, .93, 0), 'lam': (.93, .03, .97, 0), 'tim': (1, 0, 1, 0), 'tim5': (1, 0, 1.08, .75), 'ss': (1.08, 0, 1.15, 1)}
O = {}
for t, (k, th, gain, l2) in SH.items():
    if t == 'tim': O[t] = {'k': 1, 'img': 'tt', 'mau': 'tt_mau', 'fx': 1280, 'off': [[0, 0], [0, 0]], 'bung': R}; continue
    O[t] = {'k': k, 'img': 'tt', 'fx': 1280, 'off': [[0, 0], [0, 0]], 'bung': table(C[t], th, gain)}
    if l2: O[t]['bung3'] = table(L2[t], 0, gain * l2); O[t]['img3'] = 'tt3'
json.dump(O, open(sys.argv[2], 'w'), separators=(',', ':')); print('ok', list(O))
