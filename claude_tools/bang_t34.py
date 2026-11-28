#!/usr/bin/env python3
"""V2.4-C · ghép bảng T34: python3 claude_tools/bang_t34.py <thư mục chup_v24c> <ra.jpg> [ghi chú, ' | ' xuống dòng]"""
import sys, os
from PIL import Image, ImageDraw, ImageFont
D, OUT = sys.argv[1], sys.argv[2]; NOTE = sys.argv[3] if len(sys.argv) > 3 else ''
F = '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf'
f1, f2, f3 = ImageFont.truetype(F, 30), ImageFont.truetype(F, 19), ImageFont.truetype(F, 15)
TW, TH = 260, 563
ROWS = [
 ('Xung Kích Siêu Tốc · Laser dọc ⚠ · Boss lớn 78 %', [('a_blitz', 'Nón gió + cột lửa · X2'), ('b_vortex', 'Hết Xung Kích: xoáy hút'), ('c_laser_warn', 'Báo laser 0,75 s · ⚠'), ('d_laser_fire', 'Laser + đạn boss lõi trắng'), ('e_crest', 'Huy hiệu CHIẾN THẮNG')]),
 ('Lật rương kết trận · Thẻ Mục tiêu Vô tận', [('f_chest_shake', 'Rương rung'), ('g_chest_open', 'Chớp sáng → mở'), ('h_result', 'Quà hiện đủ'), ('i_target', 'Thẻ Mục tiêu Vô tận'), ('j_target_pass@', 'VƯỢT MỐC! (phóng to)')]),
]
W = 30 + 5 * (TW + 18); H = 100 + len(ROWS) * (TH + 84) + (24 * (NOTE.count(' | ') + 1) + 10 if NOTE else 0)
im = Image.new('RGB', (W, H), (10, 16, 30)); d = ImageDraw.Draw(im)
d.text((26, 24), 'T34 · V2.4-C · Xung Kích · Boss & laser ⚠ · Lật rương · Mục tiêu Vô tận', font=f1, fill=(255, 214, 80))
y = 92
for title, cells in ROWS:
    d.text((26, y), title, font=f2, fill=(140, 220, 255)); y += 32
    for i, (k, cap) in enumerate(cells):
        x = 26 + i * (TW + 18); zoom = k.endswith('@'); k = k.rstrip('@'); t = Image.open(os.path.join(D, k + '.png')).convert('RGB')
        if zoom:
            c = t.crop((t.size[0] - 330, 50, t.size[0], 215)); c = c.resize((TW, int(TW * c.size[1] / c.size[0])), Image.LANCZOS); b = Image.new('RGB', (TW, TH), (14, 22, 40)); b.paste(t.resize((TW, TH)).crop((0, 0, TW, TH)), (0, 0)); b.paste(c, (0, TH // 2 - c.size[1] // 2)); ImageDraw.Draw(b).rectangle((0, TH // 2 - c.size[1] // 2, TW - 1, TH // 2 + c.size[1] // 2), outline=(255, 214, 80), width=2); t = b
        else: t = t.resize((TW, TH))
        im.paste(t, (x, y)); d.rectangle((x - 1, y - 1, x + TW, y + TH), outline=(70, 110, 160)); d.text((x, y + TH + 8), cap, font=f3, fill=(230, 236, 245))
    y += TH + 52
if NOTE:
    for j, ln in enumerate(NOTE.split(' | ')): d.text((26, y + j * 24), ln, font=f3, fill=(200, 230, 200))
im.save(OUT, quality=88); print(OUT, im.size)
