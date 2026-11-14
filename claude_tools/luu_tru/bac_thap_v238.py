# V238 · Góp ý chủ dự án 12/11 21:05: bậc thấp đừng đơn sắc, nhỏ gọn, xấu.
#  Sửa thẳng bảng RAMP trong src/btfx218.js cho bậc thuong / luc của các tàu đã làm (2, 3, 6, 7, 8):
#  - cánh 2 sắc (mép một màu, thân một màu, lõi trắng), không còn một tông;
#  - cánh to gần bậc tím (thuong k .92, luc k .96), bớt cắt phần mờ, sáng gần bậc tím.
#  Độ chói lấy từ dải đo bậc tím của chính tàu đó. Chạy lại các tauX_*_ramp.py cũ sẽ ghi đè → chạy lại tệp này sau.
import json, re
import numpy as np
P = 'src/btfx218.js'; s = open(P).read()
i = s.index('const RAMP={') + len('const RAMP=')
d = 0; k = i
while True:
    c = s[k]; d += c == '{'; d -= c == '}'; k += 1
    if d == 0: break
js = s[i:k]; R = json.loads(re.sub(r'([{,])(\d+):', r'\1"\2":', js))
V = np.round(np.linspace(0, 1, 33), 4)
def table(mag_src, stops, th, gain):
    xs = np.array([r[0] for r in mag_src]); MAG = np.array([r[1:] for r in mag_src], np.float32).max(1)
    gx = np.array([a for a, _ in stops]); cc = np.array([np.array(b, np.float32) / max(b) for _, b in stops]); out = []
    for v in V:
        g = max(0, (v - th) / (1 - th)) if th else v
        col = np.array([np.interp(g, gx, cc[:, j]) for j in range(3)]); col /= max(col.max(), 1e-6)
        out.append([float(v)] + [int(min(255, round(x))) for x in col * np.interp(g, xs, MAG) * gain])
    return out
# mép → thân → lõi (chói thấp → cao)
NEW = {
 '7': {'thuong': [(.1, (70, 150, 255)), (.5, (255, 140, 60)), (.9, (255, 240, 200))],               # tàu 8: mép lam, thân cam
       'luc': [(.1, (150, 70, 220)), (.5, (240, 110, 190)), (.9, (255, 225, 240))]},
 '6': {'thuong': [(.1, (150, 90, 255)), (.5, (60, 190, 255)), (.9, (225, 245, 255))],               # tàu 7: mép tím, thân lơ
       'luc': [(.1, (220, 240, 60)), (.5, (60, 220, 110)), (.9, (230, 255, 230))]},                  #        mép vàng chanh, thân lục
 '1': {'thuong': [(.1, (255, 110, 90)), (.5, (250, 210, 90)), (.9, (255, 250, 235))],               # tàu 2: mép hồng cam, thân vàng
       'luc': [(.1, (60, 170, 255)), (.5, (40, 220, 150)), (.9, (230, 255, 245))]},                  #        mép lơ, thân lục ngọc
 '2': {'thuong': [(.1, (170, 140, 255)), (.5, (130, 210, 255)), (.9, (240, 248, 255))],             # tàu 3: mép tím nhạt, thân lơ băng
       'luc': [(.1, (80, 200, 255)), (.5, (190, 245, 90)), (.9, (245, 255, 235))]},                  #        mép lơ, thân lục chanh
 '5': {'thuong': [(.1, (140, 90, 230)), (.5, (100, 190, 255)), (.9, (230, 245, 255))],              # tàu 6: mép tím, thân lơ
       'luc': [(.1, (40, 210, 170)), (.5, (220, 240, 60)), (.9, (250, 255, 230))]},                  #        mép lục ngọc, thân vàng chanh
}
SH = {'thuong': (.92, .04, .97), 'luc': (.96, .02, 1.0)}
for sid, tiers in NEW.items():
    src = R[sid]['tim']['bung']
    for t, stops in tiers.items():
        kk, th, gain = SH[t]
        R[sid][t]['k'] = kk; R[sid][t]['bung'] = table(src, stops, th, gain)
out = json.dumps(R, separators=(',', ':'))
out = re.sub(r'"(\d+)":', r'\1:', out)
s = s[:i] + out + s[k:]; open(P, 'w').write(s); print('ok', {sid: list(t) for sid, t in NEW.items()})
