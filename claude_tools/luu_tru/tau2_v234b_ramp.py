# V234B · bảng màu 6 bậc tàu 2 (bảng GPT V234 + nguyên tắc C). python3 ... <tau2_ramp.json> <ra.json>
import sys, json
import numpy as np
R = json.load(open(sys.argv[1]))['cq']; xs = np.array([r[0] for r in R]); MAG = np.array([r[1:] for r in R], np.float32).max(1)
V = np.round(np.linspace(0, 1, 33), 4)
def table(stops, th=0, gain=1):
    gx = np.array([a for a, _ in stops]); cc = np.array([np.array(b, np.float32) / max(b) for _, b in stops]); out = []
    for v in V:
        g = max(0, (v - th) / (1 - th)) if th else v
        col = np.array([np.interp(g, gx, cc[:, i]) for i in range(3)]); col /= max(col.max(), 1e-6)
        out.append([float(v)] + [int(min(255, round(x))) for x in col * np.interp(g, xs, MAG) * gain])
    return out
# màn: ngọn (chói thấp) → giữa → gốc (chói cao)
C = {'thuong': [(.1, (200, 130, 40)), (.5, (240, 220, 120)), (.9, (255, 250, 235))], 'luc': [(.1, (60, 220, 170)), (.5, (40, 200, 140)), (.9, (230, 255, 240))],
     'lam': [(.1, (20, 40, 150)), (.5, (50, 110, 255)), (.9, (230, 245, 255))], 'tim5': [(.1, (160, 60, 220)), (.5, (255, 100, 200)), (.9, (255, 235, 245))],
     'ss': [(.1, (255, 230, 140)), (.5, (255, 200, 60)), (.9, (255, 255, 245))]}
L2 = {'tim5': [(.1, (255, 150, 200)), (.9, (255, 235, 245))], 'ss': [(.1, (255, 230, 160)), (.9, (255, 255, 245))]}
SH = {'thuong': (.78, .12, .88, 0), 'luc': (.86, .06, .93, 0), 'lam': (.93, .03, .97, 0), 'tim': (1, 0, 1, 0), 'tim5': (1, 0, 1.08, .75), 'ss': (1.08, 0, 1.15, 1)}
O = {}
for t, (k, th, gain, l2) in SH.items():
    if t == 'tim': O[t] = {'k': 1, 'img': 'cq', 'mau': 'cq_mau', 'fx': 1280, 'off': [[0, 0], [0, 0]], 'bung': R}; continue
    O[t] = {'k': k, 'img': 'cq', 'fx': 1280, 'off': [[0, 0], [0, 0]], 'bung': table(C[t], th, gain)}
    if l2: O[t]['bung3'] = table(L2[t], 0, gain * l2); O[t]['img3'] = 'cq3'
json.dump(O, open(sys.argv[2], 'w'), separators=(',', ':')); print('ok', list(O))
