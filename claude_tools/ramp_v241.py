# V241 · bảng màu 6 bậc cho 5 tàu V241 (bảng GPT, mép → thân → lõi) + nguyên tắc C và bậc thấp to gần bậc tím.
#  python3 claude_tools/ramp_v241.py <N> <thư mục ra của tau_v241.py> <tên lớp> → <thư mục>/ramp6.json
import sys, json
import numpy as np
N = int(sys.argv[1]); D = sys.argv[2]; NM = sys.argv[3]
R = json.load(open(f'{D}/ramp_tim.json')); SO = json.load(open(f'{D}/so_do.json'))
xs = np.array([r[0] for r in R]); MAG = np.array([r[1:] for r in R], np.float32).max(1)
C = {'đồng': (205, 120, 60), 'vàng ấm': (255, 190, 80), 'trắng vàng': (255, 245, 210), 'lục lá': (60, 200, 70), 'vàng chanh': (220, 240, 60), 'trắng': (245, 248, 255),
     'lam': (50, 90, 255), 'lơ': (80, 200, 255), 'tím': (150, 70, 255), 'vàng kim': (255, 200, 60), 'tím hồng': (220, 90, 230), 'tím sáng': (190, 120, 255),
     'trắng hồng': (255, 230, 245), 'lam đậm': (30, 60, 200), 'lục ngọc': (40, 220, 160), 'trắng lơ': (225, 245, 255), 'lục đậm': (30, 150, 60),
     'lục chanh': (170, 240, 60), 'lam điện': (40, 120, 255), 'lục lam': (40, 200, 200), 'hồng đào': (255, 150, 140), 'vàng nhạt': (255, 235, 150),
     'lục nhạt': (140, 230, 140), 'lam nhạt': (120, 170, 255), 'hồng tím': (230, 100, 220), 'vàng ngà': (255, 240, 200), 'hồng nhạt': (255, 170, 210),
     'lục': (60, 210, 90), 'vàng lục': (190, 230, 70), 'tím đậm': (110, 40, 200), 'hồng rực': (255, 70, 170), 'lam ngọc': (30, 190, 200),
     'trắng tím': (240, 225, 255), 'trắng lam': (225, 235, 255), 'lam xám': (110, 140, 190), 'tím nhạt': (190, 160, 240), 'lơ điện': (60, 220, 255), 'bạc tím': (200, 190, 230)}
PAL = {
 1: {'thuong': ('đồng', 'vàng ấm', 'trắng vàng'), 'luc': ('lục lá', 'vàng chanh', 'trắng'), 'lam': ('lam', 'lơ', 'trắng'), 'tim5': ('tím hồng', 'tím sáng', 'trắng hồng'), 'ss': ('vàng kim', 'trắng vàng', 'trắng')},
 4: {'thuong': ('lam đậm', 'lục ngọc', 'trắng lơ'), 'luc': ('lục đậm', 'lục chanh', 'trắng'), 'lam': ('lam', 'lơ', 'trắng'), 'tim5': ('tím', 'lục ngọc', 'trắng lơ'), 'ss': ('lục lam', 'trắng lơ', 'trắng')},
 5: {'thuong': ('hồng đào', 'vàng nhạt', 'trắng'), 'luc': ('lục nhạt', 'vàng chanh', 'trắng'), 'lam': ('lam nhạt', 'lơ', 'trắng'), 'tim5': ('tím hồng', 'vàng ngà', 'trắng'), 'ss': ('vàng kim', 'trắng vàng', 'trắng')},
 9: {'thuong': ('lam', 'hồng nhạt', 'trắng'), 'luc': ('lục', 'vàng lục', 'trắng'), 'lam': ('lam đậm', 'lơ', 'trắng'), 'tim5': ('tím đậm', 'hồng rực', 'trắng'), 'ss': ('lam ngọc', 'trắng tím', 'trắng')},
 11: {'thuong': ('lam xám', 'tím nhạt', 'trắng lơ'), 'luc': ('lục', 'lam ngọc', 'trắng'), 'lam': ('lam', 'lơ', 'trắng'), 'tim5': ('tím hồng', 'lam ngọc', 'trắng'), 'ss': ('bạc tím', 'trắng lơ', 'trắng')},
}[N]
V = np.round(np.linspace(0, 1, 33), 4)
def table(stops, th=0, gain=1):
    gx = np.array([a for a, _ in stops]); cc = np.array([np.array(b, np.float32) / max(b) for _, b in stops]); out = []
    for v in V:
        g = max(0, (v - th) / (1 - th)) if th else v
        col = np.array([np.interp(g, gx, cc[:, i]) for i in range(3)]); col /= max(col.max(), 1e-6)
        out.append([float(v)] + [int(min(255, round(x))) for x in col * np.interp(g, xs, MAG) * gain])
    return out
SH = {'thuong': (.92, .04, .97, 0), 'luc': (.96, .02, 1, 0), 'lam': (.97, .02, .99, 0), 'tim': (1, 0, 1, 0), 'tim5': (1, 0, 1.08, .75), 'ss': (1.08, 0, 1.15, 1)}
FR = SO['fx_khung']; O = {}; has3 = 'lop2_lech' in SO
for t, (k, th, gain, l2) in SH.items():
    off = SO['off'][t]
    if t == 'tim': O[t] = {'k': 1, 'img': NM, 'mau': NM + '_mau', 'fx': FR, 'off': off, 'bung': R}; continue
    m, b, c = PAL[t]
    O[t] = {'k': k, 'img': NM, 'fx': FR, 'off': off, 'bung': table([(.1, C[m]), (.5, C[b]), (.9, C[c])], th, gain)}
    if l2 and has3: O[t]['bung3'] = table([(.1, C[m]), (.9, C[c])], 0, gain * l2); O[t]['img3'] = NM + '3'
json.dump(O, open(f'{D}/ramp6.json', 'w'), separators=(',', ':')); print(N, 'ok', FR)
