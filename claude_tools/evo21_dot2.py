# V2.1 Đợt 2 · cắt 52 ảnh GPT: 13 tên lửa (tlNN) + 13 tàu con (wingNN) (chủ dự án 23/11).
#   python3 claude_tools/evo21_dot2.py <thư mục có v21_ten_lua/ và v21_tau_con/> <ra>
#   tlNN_body.png / wingNN_body.png : NỀN TRẮNG, 4 hình ngang = Trắng · Lục · Lam · Tím (gom khối liền theo cột gần nhất, cùng 1 hệ số co → giữ nhịp lớn dần)
#       → tl_<id>_<0..3>.webp (tên lửa bay, cạnh dài bậc Tím 192) · tl_<id>_i<0..3>.webp (bản to 384 cho Kho / túi đồ)
#       → wg_<id>_<0..3>.webp (thân tàu con, khung 256, bậc Tím 240)
#   tlNN_fx.png : NỀN ĐEN · hàng trên 4 vệt lửa đẩy · hàng dưới trái nổ thường / phải nổ Tím-Bạo Tẩu → tl_<id>_tr<0..3>.webp · tl_<id>_ex0/ex1.webp
#   wingNN_fx.png: NỀN ĐEN · hàng trên 4 đạn · hàng dưới trái cánh mini Bạo Tẩu / phải hiệu ứng trúng → wg_<id>_b<0..3>.webp · wg_<id>_wing.webp · wg_<id>_hit.webp
#   Tách hàng / ô bằng THÀNH PHẦN LIÊN THÔNG (giãn 6 px để gom tia lửa), KHÔNG chia cứng 50/50.
import sys, os
import numpy as np
from PIL import Image
from scipy import ndimage as nd
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import evo21_cat as E

IN, OUT = (sys.argv[1], sys.argv[2]) if __name__ == '__main__' else ('', '')
if OUT: os.makedirs(OUT, exist_ok=True)
TL = ['inferno', 'cryo', 'thunder', 'singularity', 'spiral', 'stellar', 'comet36', 'nova36', 'judgement36', 'devour10_m', 'chrono11_m', 'monarch12_m', 'swarm9']
WG = ['rail', 'disc', 'solar', 'ricochet', 'gravity', 'prism', 'lance36', 'orbit36', 'halo36', 'devour10_s', 'chrono11_s', 'monarch12_s', 'carrier9']
STRICT = {'tl02', 'tl03', 'tl05', 'tl06', 'tl07', 'tl09', 'tl11', 'tl12', 'tl13', 'wing01', 'wing02', 'wing04', 'wing06', 'wing07', 'wing08', 'wing09', 'wing12', 'wing13'}
HOLES = {'tl03': [1, 2, 3], 'tl04': [2, 3], 'tl11': [2, 3], 'wing05': [0, 1, 2, 3], 'wing09': [0, 1, 2, 3], 'wing11': [2, 3], 'wing12': [3]}
GLOW = {'tl03'}
rep = []


def save(im, name):
    im.save(os.path.join(OUT, name + '.webp'), 'WEBP', quality=90, method=6)


def body4(name, NC=4, strict=None, holes=None, keep=False):
    os.environ['WMIN'] = '248' if (name in STRICT if strict is None else strict) else '238'
    B = np.asarray(Image.open(os.path.join(IN, name + '_body.png')).convert('RGB'))
    h, w = B.shape[:2]
    A = E.tach_trang(B)
    a8 = B.astype(np.int16)
    if name in GLOW:   # quầng sáng nhạt tỏa ra nền trắng (tl03 bậc Trắng): nền mở rộng qua vùng sáng liền nền, alpha theo độ trắng + khử pha trắng
        bg = A[..., 3] == 0
        light = (a8.min(2) >= 200) & ~bg
        lb, ln = nd.label(light | bg)
        ids = np.unique(lb[bg]); ids = ids[ids > 0]
        reg = np.isin(lb, ids) & light
        wt = np.clip((a8.min(2) - 200) / 52, 0, 1)
        k1 = np.maximum(1 - wt[reg], .06)[:, None]
        A[..., 3][reg] = (255 * (1 - wt[reg])).astype(np.uint8)
        A[..., :3][reg] = np.clip((a8[reg] - (1 - k1) * 255) / k1, 0, 255).astype(np.uint8)
    m = A[..., 3] > 40
    lab, n = nd.label(nd.binary_dilation(m, iterations=3))
    sz = nd.sum(m, lab, range(1, n + 1)); cen = nd.center_of_mass(m, lab, range(1, n + 1))
    col = {}
    for i, (v, (cy, cx)) in enumerate(zip(sz, cen)):
        if v < (8 if keep else 25):
            continue
        col.setdefault(min(NC - 1, int(cx / (w / NC))), []).append(i + 1)
    # khe trắng khép kín: chỉ ở bậc được chỉ định, khe ≥ 60 px (đốm phản quang nhỏ giữ lại)
    tiers = HOLES.get(name, []) if holes is None else holes
    if tiers:
        pure = (a8.min(2) >= 246) & (a8.max(2) - a8.min(2) < 10) & (A[..., 3] > 0)
        zone = np.zeros_like(pure)
        for t in tiers:
            for i in col.get(t, []):
                sl = nd.find_objects((lab == i).astype(int))[0]
                zone[sl] = True
        pure &= zone
        pl, pn = nd.label(pure)
        if pn:
            ps = nd.sum(pure, pl, range(1, pn + 1))
            holes = np.isin(pl, [i + 1 for i, v in enumerate(ps) if v >= 60])
            ring = nd.binary_dilation(holes, iterations=1) & ~holes
            A[..., 3][holes] = 0
            mn = a8.min(2)
            A[..., 3][ring] = np.minimum(A[..., 3][ring], np.clip((255 - mn[ring]) / 85 * 255, 0, 255)).astype(np.uint8)
    crops = []
    for t in range(NC):
        k = np.isin(lab, col.get(t, []))
        r = A.copy(); r[..., 3] = np.where(k, r[..., 3], 0)
        ys, xs = np.where(r[..., 3] > 8)
        assert len(ys), '%s: bậc %d trống' % (name, t)
        crops.append(Image.fromarray(r[ys.min():ys.max() + 1, xs.min():xs.max() + 1]))
    return crops


def fit(im, k):
    return im.resize((max(1, round(im.width * k)), max(1, round(im.height * k))), Image.LANCZOS)


def canvas(im, S):
    o = Image.new('RGBA', (S, S), (0, 0, 0, 0)); o.paste(im, (round(S / 2 - im.width / 2), round(S / 2 - im.height / 2)), im); return o


def fx(name, NC=4):
    F = E.tach_den(np.asarray(Image.open(os.path.join(IN, name + '_fx.png')).convert('RGB')))
    H, W = F.shape[:2]
    m = F[..., 3] > 24
    lab, n = nd.label(nd.binary_dilation(m, iterations=6))
    sz = nd.sum(m, lab, range(1, n + 1)); cen = nd.center_of_mass(m, lab, range(1, n + 1))
    big = sz.max()
    prof = m.sum(1); lo, hi = int(H * .3), int(H * .62); bd = lo + int(np.argmin(prof[lo:hi]))   # dòng ít sáng nhất giữa 2 hàng
    yy = np.arange(H)[:, None]
    lab = lab.copy(); nxt = n + 1
    top, bl, br = {k: [] for k in range(NC)}, [], []
    for i, (v, (cy, cx)) in enumerate(zip(sz, cen)):
        if v < big * .002:
            continue
        cm = (lab == i + 1) & m
        up, dn = (cm & (yy < bd)).sum(), (cm & (yy >= bd)).sum()
        if up > v * .15 and dn > v * .15:   # khối dính 2 hàng (chóp vệt lửa Tím chạm tia nổ) → cắt tại dòng ranh
            part = (lab == i + 1) & (yy < bd)
            lab[part] = nxt
            xs = np.where(part)[1].mean()
            top[min(NC - 1, int(xs / (W / NC)))].append(nxt); nxt += 1
            cy, cx = np.argwhere((lab == i + 1)).mean(0)
            (bl if cx < W / 2 else br).append(i + 1)
            continue
        if cy < bd:
            top[min(NC - 1, int(cx / (W / NC)))].append(i + 1)
        elif cx < W / 2:
            bl.append(i + 1)
        else:
            br.append(i + 1)

    def crop(ids):
        if not ids:
            return None
        r = F.copy(); r[..., 3] = np.where(np.isin(lab, ids), r[..., 3], 0)
        ys, xs = np.where(r[..., 3] > 8)
        return Image.fromarray(r[ys.min():ys.max() + 1, xs.min():xs.max() + 1])
    return [crop(top[t]) for t in range(NC)], crop(bl), crop(br)


def main():
    for n, v in enumerate(TL, 1):
        nm = 'tl%02d' % n
        cr = body4(nm)
        k = 192 / max(cr[3].size); ki = 384 / max(cr[3].size)
        for t, im in enumerate(cr):
            save(fit(im, k), 'tl_%s_%d' % (v, t)); save(fit(im, ki), 'tl_%s_i%d' % (v, t))
        tr, e0, e1 = fx(nm)
        kt = 256 / max(x.height for x in tr if x is not None)
        for t, im in enumerate(tr):
            if im is not None:
                save(fit(im, kt), 'tl_%s_tr%d' % (v, t))
        for key, im in (('ex0', e0), ('ex1', e1)):
            if im is not None:
                save(fit(im, 256 / max(im.size)), 'tl_%s_%s' % (v, key))
        rep.append('%s %s: thân %s · lửa %s' % (nm, v, '/'.join('%dx%d' % fit(c, k).size for c in cr), sum(x is not None for x in tr)))
    for n, v in enumerate(WG, 1):
        nm = 'wing%02d' % n
        cr = body4(nm)
        k = 240 / max(cr[3].size)
        for t, im in enumerate(cr):
            save(canvas(fit(im, k), 256), 'wg_%s_%d' % (v, t))
        bu, wi, hi = fx(nm)
        kb = 192 / max(max(x.size) for x in bu if x is not None)
        for t, im in enumerate(bu):
            if im is not None:
                save(fit(im, kb), 'wg_%s_b%d' % (v, t))
        if wi is not None:
            save(fit(wi, 384 / wi.width), 'wg_%s_wing' % v)
        if hi is not None:
            save(fit(hi, 256 / max(hi.size)), 'wg_%s_hit' % v)
        rep.append('%s %s: thân %s · đạn %d' % (nm, v, '/'.join(str(max(fit(c, k).size)) for c in cr), sum(x is not None for x in bu)))
    print('\n'.join(rep))


if __name__ == '__main__':
    main()
