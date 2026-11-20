# V309 · ghép tranh GPT: 18 quái (6 phe × 3 cỡ), 10 boss × 3 pha + chân dung, 53 icon, 4 ruột nút trận, 2 nền
# python3 claude_tools/ghep_v309_art.py <thư mục giải nén zip> ; bản cũ đã sao lưu ở /home/claude/v309bk/
import sys, os, json, math
import numpy as np
from PIL import Image, ImageFilter
from collections import deque
R = sys.argv[1]
OUT = 'src'

def tach_nen(im, thr=24, inset=0):
    """Ảnh nền đen → RGBA: flood-fill từ mép các điểm tối (lum ≤ thr) + mép mềm."""
    im = im.convert('RGB')
    if inset: im = im.crop((inset, inset, im.width - inset, im.height - inset))
    a = np.asarray(im).astype(np.int16); h, w, _ = a.shape
    lum = a.max(2)
    dark = lum <= thr
    from scipy import ndimage
    lab, n = ndimage.label(dark)
    border = set(np.unique(np.concatenate([lab[0], lab[-1], lab[:, 0], lab[:, -1]]))) - {0}
    bg = np.isin(lab, list(border))
    # vùng tối kín lớn (lòng hở) cũng là nền
    alpha = np.where(bg, 0, 255).astype(np.uint8)
    # mép mềm: điểm sát nền có độ trong theo độ sáng
    edge = np.asarray(Image.fromarray(alpha).filter(ImageFilter.MinFilter(3))) < 255
    soft = np.clip((lum - 6) * 255 // 28, 0, 255).astype(np.uint8)
    alpha = np.where(edge & (alpha == 255), np.minimum(alpha, np.maximum(soft, 90)), alpha)
    out = np.dstack([a.astype(np.uint8), alpha])
    return Image.fromarray(out, 'RGBA')

def cat(im):
    bb = im.getchannel('A').point(lambda v: 255 if v > 40 else 0).getbbox()
    return im.crop(bb) if bb else im

def o_luoi(path, cols, rows, inset=6):
    im = Image.open(path).convert('RGB'); W, H = im.size
    cw, ch = W / cols, H / rows
    return [im.crop((int(c * cw) + inset, int(r * ch) + inset, int((c + 1) * cw) - inset, int((r + 1) * ch) - inset)) for r in range(rows) for c in range(cols)]

# ---------- 1. QUÁI: atlas 6 cột (phe) × 3 hàng (cỡ), ô 256×432 ----------
PHE = ['huyet_giac', 'lo_ren', 'nhat_thuc', 'giap_trung', 'thanh_duong', 'hu_khong']
atlas = Image.new('RGBA', (1536, 1296), (0, 0, 0, 0))
for c, p in enumerate(PHE):
    cells = o_luoi(f'{R}/V309_6_phe_quai_3_co/quai_{p}_3_co.png', 3, 1)
    for r, cell in enumerate(cells):
        s = cat(tach_nen(cell))
        k = min(236 / s.width, 410 / s.height)
        s = s.resize((max(1, round(s.width * k)), max(1, round(s.height * k))), Image.LANCZOS)
        atlas.alpha_composite(s, (c * 256 + (256 - s.width) // 2, r * 432 + (432 - s.height) // 2))
os.makedirs(f'{OUT}/foes309', exist_ok=True)
atlas.save(f'{OUT}/foes309/atlas.png'); print('quái: atlas 1536×1296')

# ---------- 2. BOSS: 3 pha 768² cùng tỉ lệ + đăng ký lại bbox / tâm cánh ----------
BOSS = ['u_anh', 'thietgiap', 'loi_duc', 'tinh_van', 'bang_gia', 'dung_nham', 'san_moi', 'omega', 'hoangde', 'thaico']
W3 = {'thaico': .5, 'thietgiap': .42, 'hoangde': .84}   # pha 3 = cánh gãy: giữ phần thân giữa (tỉ lệ bề ngang như bản cũ)
for b in BOSS:
    d = f'{OUT}/boss82/{b}'
    regp = f'{d}/registration.json'; rj = json.load(open(regp)); reg = rj['phases'] if isinstance(rj, dict) else rj
    ob = reg[0]['bbox']; ow, oh = ob[2] - ob[0], ob[3] - ob[1]; ocy = (ob[1] + ob[3]) / 2
    cells = [cat(tach_nen(c)) for c in o_luoi(f'{R}/V309_10_boss_ba_pha_va_chan_dung/boss_{b}_ba_pha.png', 3, 1)]
    k = min(ow / cells[0].width, 740 / cells[0].height, 740 / cells[0].width)
    for i, s in enumerate(cells):
        s = s.resize((max(1, round(s.width * k)), max(1, round(s.height * k))), Image.LANCZOS)
        cv = Image.new('RGBA', (768, 768), (0, 0, 0, 0))
        x0 = round(383.5 - s.width / 2); y0 = round(min(max(ocy - s.height / 2, 4), 764 - s.height))
        cv.alpha_composite(s, (x0, y0))
        if i == 2 and b in W3:
            A = np.asarray(cv).copy(); hw = s.width * W3[b] / 2
            xs = np.abs(np.arange(768) - 383.5)
            f = np.clip(1 - (xs - hw) / 18, 0, 1)
            A[..., 3] = (A[..., 3] * f[None, :]).astype(np.uint8); cv = Image.fromarray(A, 'RGBA')
        cv.save(f'{d}/phase{i + 1}.png')
        bb = cv.getchannel('A').point(lambda v: 255 if v > 40 else 0).getbbox()
        reg[i]['bbox'] = list(bb)
        if i == 0 and 'left_wing_center' in reg[0]:
            A = np.asarray(cv)[..., 3] > 60; ys, xs = np.nonzero(A)
            cx = 383.5; half = (bb[2] - bb[0]) / 2
            for side, key in ((-1, 'left_wing_center'), (1, 'right_wing_center')):
                m = (xs - cx) * side > half * .45
                if m.sum() > 50: reg[0][key] = [round(float(xs[m].mean()), 2), round(float(ys[m].mean()), 2)]
            # đối xứng
            L, Rr = reg[0]['left_wing_center'], reg[0]['right_wing_center']; dx = (Rr[0] - L[0]) / 2; yy = (L[1] + Rr[1]) / 2
            reg[0]['left_wing_center'] = [round(cx - dx, 2), round(yy, 2)]; reg[0]['right_wing_center'] = [round(cx + dx, 2), round(yy, 2)]
    json.dump(rj, open(regp, 'w'), indent=2)
    print('boss', b, 'tỉ lệ', round(k, 3), reg[0]['bbox'], reg[0].get('left_wing_center'), reg[0].get('right_wing_center'))
# chân dung 5×2 (thứ tự ải 20 → 200)
for b, cell in zip(BOSS, o_luoi(f'{R}/V309_10_boss_ba_pha_va_chan_dung/chan_dung_10_boss_5x2.png', 5, 2, inset=4)):
    s = cat(tach_nen(cell, thr=20)); s.thumbnail((256, 256), Image.LANCZOS)
    cv = Image.new('RGBA', (256, 256), (0, 0, 0, 0)); cv.alpha_composite(s, ((256 - s.width) // 2, (256 - s.height) // 2))
    cv.save(f'{OUT}/boss82/{b}/portrait.png')
print('chân dung: 10')

# ---------- 3. ICON (53) ----------
ten = [l.split('. ', 1)[1].strip() for l in open(f'{R}/V309_bieu_tuong_53_icon/thu_tu_ten_icon.txt', encoding='utf8') if '. ' in l and l[:2].isdigit()]
cells = o_luoi(f'{R}/V309_bieu_tuong_53_icon/bang_icon_01.png', 4, 5) + o_luoi(f'{R}/V309_bieu_tuong_53_icon/bang_icon_02.png', 4, 5) + o_luoi(f'{R}/V309_bieu_tuong_53_icon/bang_icon_03.png', 4, 4)[:13]
assert len(ten) == 53 == len(cells), (len(ten), len(cells))
for n, cell in zip(ten, cells):
    s = cat(tach_nen(cell, thr=20))
    if n.startswith('mat_'):
        sz = 128; dst = f'{OUT}/hop309img/{n}.webp'
    else:
        sz = 96 if n.startswith('res_') else 128; dst = f'{OUT}/ui15/{n}.png'
    s.thumbnail((int(sz * .94), int(sz * .94)), Image.LANCZOS)
    cv = Image.new('RGBA', (sz, sz), (0, 0, 0, 0)); cv.alpha_composite(s, ((sz - s.width) // 2, (sz - s.height) // 2))
    cv.save(dst) if dst.endswith('.png') else cv.save(dst, 'WEBP', quality=90)
print('icon:', len(ten))

# ---------- 4. RUỘT NÚT TRẬN: tên lửa · bom · kỹ năng · phóng to → đĩa tối + icon (vòng khung B10 phủ ngoài) ----------
for n, cell in zip(['hud_missile', 'hud_bomb', 'hud_skill', 'hud_expand'], o_luoi(f'{R}/V309_nut_tran_va_nen/ruot_4_nut_4x1.png', 4, 1)):
    s = cat(tach_nen(cell, thr=20)); s.thumbnail((150, 150), Image.LANCZOS)
    cv = Image.new('RGBA', (256, 256), (0, 0, 0, 0))
    yy, xx = np.mgrid[0:256, 0:256]; r = np.hypot(xx - 127.5, yy - 127.5)
    disc = np.zeros((256, 256, 4), np.uint8)
    t = np.clip(r / 112, 0, 1)
    disc[..., 0] = (10 + 14 * (1 - t)).astype(np.uint8); disc[..., 1] = (18 + 30 * (1 - t)).astype(np.uint8); disc[..., 2] = (34 + 46 * (1 - t)).astype(np.uint8)
    disc[..., 3] = np.where(r <= 112, 235, np.where(r <= 116, (235 * (116 - r) / 4).clip(0, 235), 0)).astype(np.uint8)
    cv.alpha_composite(Image.fromarray(disc, 'RGBA'))
    cv.alpha_composite(s, ((256 - s.width) // 2, (256 - s.height) // 2))
    cv.save(f'{OUT}/ui15/{n}.png')
print('nút trận: 4')

# ---------- 5. NỀN ----------
for n, f in [('bg_map', 'bg_campaign_map.png'), ('bg_kho', 'bg_hangar_shared.png')]:
    Image.open(f'{R}/V309_nut_tran_va_nen/{f}').convert('RGB').resize((1080, 1920), Image.LANCZOS).save(f'{OUT}/ui15/{n}.png')
print('nền: 2')
