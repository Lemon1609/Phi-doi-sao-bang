#!/usr/bin/env python3
"""V2.4-B · ghép bảng T33: python3 claude_tools/bang_t33.py <thư mục ảnh chup_v24b> <ra.jpg> [dòng số đo]"""
import sys, os
from PIL import Image, ImageDraw, ImageFont
D, OUT = sys.argv[1], sys.argv[2]; NOTE = sys.argv[3] if len(sys.argv) > 3 else ''
F = '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf'
f1, f2, f3 = ImageFont.truetype(F, 30), ImageFont.truetype(F, 19), ImageFont.truetype(F, 16)
TW, TH = 300, 650
ROWS = [
 ('Vực Dung Nham · 2 lớp (đáy ×1,0 · vách ×1,65)', [('nen_lava', 'Thường'), ('nen_lava_bt', 'Bạo Tẩu (nền trôi ×1,85)'), ('L:bg_lava_floor', 'Lớp 1 · đáy'), ('L:bg_lava_cliffs', 'Lớp 2 · vách (hành lang trong suốt)')]),
 ('Hẻm Băng · 2 lớp', [('nen_ice', 'Thường'), ('nen_ice_bt', 'Bạo Tẩu'), ('L:bg_ice_floor', 'Lớp 1 · đáy'), ('L:bg_ice_cliffs', 'Lớp 2 · vách')]),
 ('Mở màn radar GO! (0,65 s) + nhãn tên nhạc 3,5 s', [('go_20', 'u = 0,20 · vòng quét'), ('go_45', 'u = 0,45 · GO! bật'), ('go_80', 'u = 0,80 · GO! mờ'), ('mt_boss', 'Nhãn nhạc lúc Boss ra')]),
]
NEN = '/home/claude/phi-doi-sao-bang/src/nen24img/'
W = 40 + 4 * (TW + 24); H = 110 + len(ROWS) * (TH + 90) + (24 * (NOTE.count(' | ') + 1) + 10 if NOTE else 0)
im = Image.new('RGB', (W, H), (10, 16, 30)); d = ImageDraw.Draw(im)
d.text((30, 26), 'T33 · V2.4-B · Nền parallax 2 lớp · Gói âm thanh · Mở màn GO!', font=f1, fill=(255, 214, 80))
y = 100
for title, cells in ROWS:
    d.text((30, y), title, font=f2, fill=(140, 220, 255)); y += 34
    for i, (k, cap) in enumerate(cells):
        x = 30 + i * (TW + 24)
        if k.startswith('L:'):
            src = Image.open(NEN + k[2:] + '.webp').convert('RGBA')
            bg = Image.new('RGBA', src.size, (255, 255, 255, 255))
            for yy in range(0, src.size[1], 24):
                for xx in range(0, src.size[0], 24):
                    if (xx // 24 + yy // 24) % 2: ImageDraw.Draw(bg).rectangle((xx, yy, xx + 23, yy + 23), fill=(200, 205, 215, 255))
            t = Image.alpha_composite(bg, src).convert('RGB')
            t = t.resize((TW, int(TW * t.size[1] / t.size[0])))
            c = Image.new('RGB', (TW, TH), (20, 26, 40)); c.paste(t.crop((0, 0, TW, min(TH, t.size[1]))), (0, 0)); t = c
        else:
            t = Image.open(os.path.join(D, k + '.png')).convert('RGB').resize((TW, TH))
        im.paste(t, (x, y)); d.rectangle((x - 1, y - 1, x + TW, y + TH), outline=(70, 110, 160))
        d.text((x, y + TH + 8), cap, font=f3, fill=(230, 236, 245))
    y += TH + 56
if NOTE:
    for j, ln in enumerate(NOTE.split(' | ')): d.text((30, y + j * 24), ln, font=f3, fill=(200, 230, 200))
im.save(OUT, quality=88); print(OUT, im.size)
