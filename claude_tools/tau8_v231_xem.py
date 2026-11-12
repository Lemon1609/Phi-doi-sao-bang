# Ảnh xem thử chồng lớp tàu 8 (V231): nền tối + lông (tô theo dải màu) + plasma + thân Bạo Tẩu, đặt cạnh ảnh đã duyệt cùng tỉ lệ.
#  python3 claude_tools/tau8_v231_xem.py <thu_muc_lop> <anh_da_duyet.png> <ra.png>
import sys, json
import numpy as np
from PIL import Image
D, AP, OUT = sys.argv[1:4]
R = json.load(open(f'{D}/tau8_ramp.json'))
def ramp(g, stops):
    xs = np.array([s[0] for s in stops]); cs = np.array([s[1:] for s in stops], np.float32)
    return np.stack([np.interp(g, xs, cs[:, i]) for i in range(3)], -1)
g1 = np.asarray(Image.open(f'{D}/tau8_fx_bung.png'))[..., 0].astype(np.float32) / 255
g2 = np.asarray(Image.open(f'{D}/tau8_fx_bung2.png'))[..., 0].astype(np.float32) / 255
bg = np.array([1, 9, 43], np.float32)
img = np.tile(bg, (1024, 1024, 1))
img += ramp(g1, R['bung'])
img += ramp(g2, R['bung2'])
img = np.clip(img, 0, 255)
bt = Image.open(f'{D}/tau8_tim_bt.png').convert('RGBA')
canvas = Image.fromarray(img.astype(np.uint8)).convert('RGBA'); canvas.alpha_composite(bt, (256, 256))
so = json.load(open(f'{D}/so_do.json'))
K = so['ti_le_anh_duyet_sang_khung_than']; sx, (lx, ly) = so['can_voi_anh_duyet']['ti_le_T_sang_anh_duyet'], so['can_voi_anh_duyet']['vi_tri']
ap = Image.open(AP).convert('RGBA'); ap = ap.resize((round(ap.width * K), round(ap.height * K)), Image.LANCZOS)
# đặt ảnh duyệt sao cho tâm thân trùng (512,512)
T = np.asarray(Image.open(f'{D}/tau8_tim.png'))[..., 3]
ref = Image.new('RGBA', (1024, 1024), (1, 9, 43, 255))
cx_a = so['_cx_a'] if '_cx_a' in so else None
out = Image.new('RGB', (2048, 1024)); out.paste(canvas.convert('RGB'), (1024, 0))
out.paste(Image.open(AP).convert('RGB').resize((1024, 1024)), (0, 0))
out.save(OUT); print('ok', OUT)
