# V276 · chuẩn hóa hình vũ khí GPT về đúng quy cách: python3 claude_tools/chuan_hoa_sprite.py <thư mục nháp> <thư mục ra>
# Tách khung theo cột trống, bỏ mảnh lạc < 1%, cắt khung chung, co vừa ô (lề 4 px), giữ tỉ lệ, xếp dải ngang.
import sys, os, glob, json
import numpy as np
from PIL import Image
SPEC = {'tau1_cau_lua': (64, 64, 3), 'tau1_cau_lua_bt': (96, 96, 3), 'tau3_khoi_bang': (64, 64, 2), 'tau3_manh_bang': (32, 48, 2),
        'tau4_vuot': (64, 96, 2), 'tau4_vuot_bt': (80, 112, 2), 'tau5_quang_tien': (48, 96, 2), 'tau6_khoi_pixel': (48, 64, 3),
        'tau7_kiem_khi': (40, 112, 2), 'tau7_kiem_khi_bt': (56, 128, 2), 'tau8_ten_lua_nhiet': (48, 96, 2), 'tau10_cau_luc_giac': (64, 64, 2),
        'tau11_cau_ho_den': (64, 64, 3), 'tau11_hat_xoan': (32, 48, 2), 'tau12_dia_banh_rang': (64, 64, 2), 'tau13_luoi_hai': (64, 112, 2),
        'tau13_luoi_hai_bt': (96, 128, 2), 'tl_04_ngu_loi': (64, 112, 2), 'tl_10_bay_dan': (32, 48, 2),
        'vp_nguyet_nhan': (64, 64, 2), 'vp_quang_thuong': (48, 112, 2), 'vp_drone_tau_me': (64, 64, 2), 'vp_dong_ho_cat': (48, 64, 2)}
I, O = sys.argv[1], sys.argv[2]; os.makedirs(O, exist_ok=True); bao = {}
for f in sorted(glob.glob(I + '/*.png')):
    k = os.path.basename(f)[:-4]; cw, ch, n = SPEC.get(k, (48, 96, 2))
    a = np.asarray(Image.open(f).convert('RGBA')).astype(np.float32); al = a[..., 3]
    col = (al > 10).any(0); runs = []; x = 0; W = len(col)
    while x < W:
        if col[x]:
            s = x
            while x < W and col[x:x + 20].any(): x += 1
            runs.append((s, x))
        else: x += 1
    runs = [r for r in runs if (al[:, r[0]:r[1]] > 10).sum() > 0.01 * (al > 10).sum()]
    fr = []
    for s, e in runs:
        sub = a[:, s:e]; ys, xs = np.where(sub[..., 3] > 10); fr.append(sub[ys.min():ys.max() + 1, xs.min():xs.max() + 1])
    bw = max(x.shape[1] for x in fr); bh = max(x.shape[0] for x in fr)
    sc = min((cw - 8) / bw, (ch - 8) / bh); out = Image.new('RGBA', (cw * n, ch), (0, 0, 0, 0))
    for i in range(n):
        src = fr[i % len(fr)]; im = Image.fromarray(src.clip(0, 255).astype(np.uint8), 'RGBA')
        w, h = max(1, round(src.shape[1] * sc)), max(1, round(src.shape[0] * sc)); im = im.resize((w, h), Image.LANCZOS)
        out.alpha_composite(im, (i * cw + (cw - w) // 2, (ch - h) // 2))
    out.save(f'{O}/{k}.png'); bao[k] = {'khung_nhap': len(fr), 'khung_ra': n, 'o': [cw, ch]}
json.dump(bao, open(O + '/bao_cao.json', 'w'), ensure_ascii=False, indent=1)
print(json.dumps({k: v for k, v in bao.items() if v['khung_nhap'] != v['khung_ra']}, ensure_ascii=False))
