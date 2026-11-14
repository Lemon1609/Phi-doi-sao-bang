# bảng trước / sau 6 bậc: python3 bang269.py <thư mục trước> <thư mục sau> <tiêu đề> <ra.jpg>
import sys
from PIL import Image, ImageDraw, ImageFont
A, B, T, O = sys.argv[1:5]
TI = ['thuong', 'luc', 'lam', 'tim', 'tim5', 'ss']; TN = ['Thường', 'Lục', 'Lam', 'Tím', 'Tím+', 'SS']
F = '120'
try:
    fo = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf', 22)
except Exception:
    fo = ImageFont.load_default()
W, H = 300, 260
im = Image.new('RGB', (6 * W, 2 * H + 80), (12, 12, 18)); d = ImageDraw.Draw(im)
d.text((10, 8), T, fill=(255, 255, 255), font=fo)
for i, t in enumerate(TI):
    d.text((i * W + 10, 44), TN[i], fill=(255, 220, 120), font=fo)
    for r, D in enumerate([A, B]):
        try:
            im.paste(Image.open(f'{D}/{t}_{F}.png').convert('RGB'), (i * W, 80 + r * H))
        except Exception:
            pass
d.text((6, 84), 'TRƯỚC', fill=(200, 200, 200), font=fo); d.text((6, 84 + H), 'SAU', fill=(120, 255, 160), font=fo)
im.save(O, quality=88)
