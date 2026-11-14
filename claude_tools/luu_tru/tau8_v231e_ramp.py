# V231E · sinh bảng màu cánh 6 bậc của tàu 8 theo phương án C (chủ dự án chọn 12/11 11:10) + lớp lông thứ hai.
#  python3 claude_tools/tau8_v231e_ramp.py <tau8_ramp.json bậc tím> <tau8_fx_bung_tang2.png GPT> <so_do_6bac.json> <ra.json> <ra tau8_fx_bung3.png>
import sys, json
import numpy as np, cv2
from PIL import Image
fR, fT2, fS, fO, fB3 = sys.argv[1:6]
R = json.load(open(fR)); S = json.load(open(fS))
xs = np.array([r[0] for r in R['bung']]); cs = np.array([r[1:] for r in R['bung']], np.float32); MAG = cs.max(1)
V = np.round(np.linspace(0, 1, 33), 4)
def norm(c): c = np.array(c, np.float32); return c / max(c.max(), 1)
def table(stops, th=0, gain=1):
    gx = np.array([a for a, _ in stops]); cc = np.array([norm(b) for _, b in stops])
    out = []
    for v in V:
        g = max(0, (v - th) / (1 - th)) if th else v
        col = np.array([np.interp(g, gx, cc[:, i]) for i in range(3)]); col /= max(col.max(), 1e-6)
        m = np.interp(g, xs, MAG) * gain
        out.append([float(v)] + [int(min(255, round(x))) for x in col * m])
    return out
def ptable(c, f):
    c = np.array(c, np.float32) / 255
    return [[float(v)] + [int(min(255, round(x))) for x in c * np.interp(v, [0, .3, .83, 1], [0, 140, 255, 255]) * f] for v in V]
C = {'thuong': [(.1, (110, 25, 20)), (.5, (190, 70, 40)), (.9, (250, 170, 130))], 'luc': [(.1, (150, 70, 200)), (.5, (220, 110, 190)), (.9, (250, 215, 235))],
     'lam': [(.1, (60, 90, 240)), (.5, (170, 110, 255)), (.9, (235, 240, 255))], 'tim5': [(.1, (255, 50, 110)), (.5, (255, 185, 50)), (.9, (255, 250, 225))],
     'ss': [(.1, (255, 70, 40)), (.45, (255, 215, 80)), (.9, (255, 252, 240))]}
PL = {'luc': (110, 120, 230), 'lam': (90, 200, 255), 'tim5': (130, 210, 255), 'ss': (200, 240, 255)}
L2 = {'tim5': [(.1, (255, 40, 110)), (.6, (255, 130, 90)), (.9, (255, 225, 215))], 'ss': [(.1, (90, 60, 255)), (.6, (130, 170, 255)), (.9, (235, 245, 255))]}
# hình theo bậc: [tỉ lệ cánh, ngưỡng chói (bỏ lông mờ → ít, ngắn), độ sáng, plasma, lớp 2]
SH = {'thuong': (.78, .12, .88, 0, 0), 'luc': (.86, .06, .93, .6, 0), 'lam': (.93, .03, .97, .85, 0), 'tim': (1, 0, 1, 1, 0), 'tim5': (1, 0, 1.08, 1, .75), 'ss': (1.08, 0, 1.15, 1, 1)}
rt = S['goc_song_canh_tim_512']
OUT = {}
for t, (k, th, gain, pl, l2) in SH.items():
    e = {'k': k}
    if t == 'tim':
        e['bung'] = R['bung']; e['bung2'] = R['bung2']; e['off'] = [[0, 0], [0, 0]]
    else:
        e['bung'] = table(C[t], th, gain)
        if pl: e['bung2'] = ptable(PL[t], pl)
        if l2: e['bung3'] = table(L2[t], 0, gain * l2)
        g = S[t]['song_canh']; e['off'] = [[round(g['trai']['goc_512'][0] - rt[0][0], 1), round(g['trai']['goc_512'][1] - rt[0][1], 1)],
                                           [round(g['phai']['goc_512'][0] - rt[1][0], 1), round(g['phai']['goc_512'][1] - rt[1][1], 1)]]
    OUT[t] = e
json.dump(OUT, open(fO, 'w'), separators=(',', ':'))
# lớp lông thứ hai: GPT 1254 (thân ở giữa) → 1024, cùng tỉ lệ lớp chính (đặt gốc trùng vai bậc tím, rộng hơn lớp chính ~15 %)
t2 = np.asarray(Image.open(fT2).convert('RGBA')).astype(np.float32)
g = t2[..., :3].mean(-1) * t2[..., 3] / 255
s = 0.85; M = np.float32([[s, 0, 512 - 627 * s], [0, s, 512 - 627 * s]])
g = np.clip(cv2.warpAffine(g, M, (1024, 1024), flags=cv2.INTER_AREA), 0, 255).astype(np.uint8)
Image.fromarray(np.dstack([g, g, g, g]), 'RGBA').save(fB3)
ys, xs2 = np.where(g > 10); print('bung3 khung bao', xs2.min(), xs2.max(), ys.min(), ys.max(), '· số bậc', len(OUT))
