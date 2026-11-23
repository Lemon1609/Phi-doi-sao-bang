# V2.1 Đợt 1 · cắt bộ ảnh GPT 4 bậc của 1 chiến cơ và ghép vào game.
#   python3 claude_tools/evo21_cat.py <N 1..13> <XX_body.png> [<XX_fx.png>] [--ra <thư mục thử>]
#   XX_body.png : NỀN TRẮNG, lưới 2×2 = Thường | Lục / Lam | Tím  → src/ship309/tau<N>_{thuong,luc,lam,tim,tim5,ss}[_bt].png (512, cỡ theo luật cat_tau309v4)
#                 tim5 / ss = ảnh Tím tăng sáng (không cần GPT vẽ); _bt (thân Bạo Tẩu) = thân cùng bậc sáng ×1,22.
#   XX_fx.png   : NỀN ĐEN #000, 2 hàng: hàng 1 = đạn, hàng 2 = cánh Bạo Tẩu (cả đôi). Mỗi hàng 4 hình (Thường→Tím) hoặc 1 hình dùng chung.
#                 → src/evo21img/tau<N>_dan_<bậc>.webp (cao 256) · tau<N>_canh_<bậc>.webp (rộng 768); build nhúng thành window.EVO21_IMG.
#   --ra : ghi vào thư mục khác (xem thử, không đụng src). Ảnh cũ bị thay được sao lưu ở /home/claude/evo21_truoc/.
import sys, os, shutil
import numpy as np
from PIL import Image, ImageEnhance
from scipy import ndimage as nd

G0 = 360
TIER = {'thuong': 1.0, 'luc': 1.0, 'lam': 1.05, 'tim': 1.10, 'tim5': 1.12, 'ss': 1.14}
T4 = ['thuong', 'luc', 'lam', 'tim']


def tach_trang(rgb):
    """nền trắng → alpha: vùng gần trắng nối với mép = nền; viền mềm + khử viền trắng."""
    a = rgb.astype(np.float32)
    mn, mx = a.min(2), a.max(2)
    white = (mn > int(os.environ.get('WMIN', '238'))) & (mx - mn < 16)   # WMIN=248: tàu nhiều giáp trắng / chóp sáng sát nền
    lab, n = nd.label(white)
    edge = set(np.unique(np.concatenate([lab[0], lab[-1], lab[:, 0], lab[:, -1]]))) - {0}
    bg = np.isin(lab, list(edge))
    alpha = np.where(bg, 0, 255).astype(np.float32)
    ring = nd.binary_dilation(bg, iterations=2) & ~bg          # viền 2 px quanh nền
    soft = np.clip((255 - mn) / (255 - 200) * 255, 0, 255)
    alpha[ring] = np.minimum(alpha[ring], soft[ring])
    al = alpha[..., None] / 255
    out = np.where(al > 0, (a - (1 - al) * 255) / np.maximum(al, 1e-3), 0)  # khử pha trắng
    return np.dstack([np.clip(out, 0, 255), alpha]).astype(np.uint8)


def tach_den(rgb):
    a = rgb.astype(np.float32)
    al = a.max(2)
    al = np.where((a < 14).all(2), 0, al)  # R,G,B < 14 → đen tuyệt đối (không lộ khung khi 'lighter')
    out = np.where(al[..., None] > 0, a / np.maximum(al[..., None], 1) * 255, 0)
    return np.dstack([np.clip(out, 0, 255), al]).astype(np.uint8)


def giu_khoi(rgba, frac=.02):
    m = rgba[..., 3] > 40
    lab, n = nd.label(m)
    if n == 0:
        return None
    sz = nd.sum(m, lab, range(1, n + 1))
    keep = [i + 1 for i, s in enumerate(sz) if s >= sz.max() * frac]
    k = np.isin(lab, keep)
    k = nd.binary_dilation(k, iterations=3)
    r = rgba.copy()
    r[..., 3] = np.where(k, r[..., 3], 0)
    ys, xs = np.where(r[..., 3] > 8)
    return Image.fromarray(r[ys.min():ys.max() + 1, xs.min():xs.max() + 1])


def chinh(rgba):
    """cánh / sóng: giữ thành phần chính, bỏ mẩu nhỏ rời (vd đuôi viên đạn hàng trên lọt xuống mép trên)."""
    m = rgba[..., 3] > 24
    m2 = nd.binary_dilation(m, iterations=4)
    lab, n = nd.label(m2)
    if n == 0:
        return None
    sz = nd.sum(m, lab, range(1, n + 1))
    big = sz.max()
    keep = []
    for i, v in enumerate(sz):
        ys, xs = np.where(lab == i + 1)
        top = ys.min() <= 3
        if v >= big * .03 and not (top and v < big * .15):
            keep.append(i + 1)
    r = rgba.copy()
    r[..., 3] = np.where(np.isin(lab, keep), r[..., 3], 0)
    ys, xs = np.where(r[..., 3] > 8)
    return Image.fromarray(r[ys.min():ys.max() + 1, xs.min():xs.max() + 1])


def G(im):
    a = np.asarray(im)[..., 3] > 128
    ys, xs = np.where(a)
    return ((np.ptp(xs) + 1) * (np.ptp(ys) + 1)) ** .5


def place(im, t):
    k = G0 * TIER[t] / G(im)
    big = im.resize((max(1, round(im.width * k)), max(1, round(im.height * k))), Image.LANCZOS)
    if max(big.size) > 500:
        f = 500 / max(big.size)
        big = big.resize((round(big.width * f), round(big.height * f)), Image.LANCZOS)
    out = Image.new('RGBA', (512, 512), (0, 0, 0, 0))
    out.paste(big, (round(256 - big.width / 2), round(256 - big.height / 2)), big)
    return out


def sang(im, b, s=1.0):
    rgb, a = im.convert('RGB'), im.getchannel('A')
    rgb = ImageEnhance.Brightness(rgb).enhance(b)
    if s != 1:
        rgb = ImageEnhance.Color(rgb).enhance(s)
    rgb.putalpha(a)
    return rgb


def nhom_ngang(rgba, gap=12):
    """chia 1 hàng thành các hình theo cột trống."""
    col = (rgba[..., 3] > 30).any(0)
    seg, st = [], None
    for x, v in enumerate(list(col) + [False]):
        if v and st is None:
            st = x
        if not v and st is not None:
            seg.append([st, x])
            st = None
    mg = []
    for s in seg:
        if mg and s[0] - mg[-1][1] < gap:
            mg[-1][1] = s[1]
        else:
            mg.append(s)
    mg = [s for s in mg if s[1] - s[0] > 6]
    return [rgba[:, a:b] for a, b in mg]


def main():
    args = sys.argv[1:]
    ra = None
    if '--ra' in args:
        i = args.index('--ra'); ra = args[i + 1]; del args[i:i + 2]
    N, body = int(args[0]), args[1]
    fx = args[2] if len(args) > 2 else None
    root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    d_ship = ra or os.path.join(root, 'src/ship309')
    d_img = ra or os.path.join(root, 'src/evo21img')
    os.makedirs(d_ship, exist_ok=True); os.makedirs(d_img, exist_ok=True)
    bk = '/home/claude/evo21_truoc'
    os.makedirs(bk, exist_ok=True)
    rep = []
    # thân 2×2: tách nền trên CẢ ẢNH (tàu Tím tràn qua đường chia ô) rồi gom khối liền theo góc phần tư của tâm
    B = np.asarray(Image.open(body).convert('RGB'))
    h, w = B.shape[:2]
    R = tach_trang(B)
    a8 = B.astype(np.int16)
    pure = (a8.min(2) >= int(os.environ.get('HMIN', '246'))) & (a8.max(2) - a8.min(2) < int(os.environ.get('HSAT', '10'))) & (R[..., 3] > 0)   # khe trắng khép kín (#F6F6F6–#FFFFFF; HMIN/HSAT nới cho khe ám màu hào quang)
    zone = np.zeros_like(pure); zone[int(h * .45):, int(w * .42):] = True            # mặc định CHỈ ô Tím (dưới-phải, tàu tràn qua giữa) — ô khác giáp bạc/trắng sẽ bị thủng
    HO = os.environ.get('HOLES', 'tim')                                                # HOLES=tim (mặc định) · all · none · danh sách bậc 'thuong,tim'
    if HO == 'all': zone[:] = True
    elif HO == 'none': zone[:] = False
    elif HO != 'tim':
        zone[:] = False
        for t in HO.split(','):
            r, c = {'thuong': (0, 0), 'luc': (0, 1), 'lam': (1, 0), 'tim': (1, 1)}[t]
            zone[int(h * (.45 if r else 0)):int(h * (1 if r else .55)), int(w * (.42 if c else 0)):int(w * (1 if c else .58))] = True
    pure &= zone
    lab, n = nd.label(pure)
    if n:
        sz = nd.sum(pure, lab, range(1, n + 1))
        # khe thật: lớn (≥600 px) hoặc ≥200 px nằm sát trục dọc thân tàu (±45 px); đốm phản quang trắng trên giáp thì nhỏ / lệch trục → giữ
        cen = nd.center_of_mass(pure, lab, range(1, n + 1))
        al = R[..., 3] > 40
        def axis(cy, cx):
            y0, y1 = (0, h // 2) if cy < h / 2 else (h // 2, h); x0, x1 = (0, w // 2) if cx < w / 2 else (w // 2, w)
            ys, xs = np.where(al[y0:y1, x0:x1]); return x0 + (xs.min() + xs.max()) / 2 if len(xs) else cx
        holes = np.isin(lab, [i + 1 for i, (v, (cy, cx)) in enumerate(zip(sz, cen)) if v >= 600 or (HO == 'all' and v >= 200 and abs(cx - axis(cy, cx)) < 45)])  # luật trục chỉ cho tàu đục cả 4 ô (#02, #12) — tránh đục lõi sáng giữa thân (#05)
        if os.environ.get('GROW') == '1':   # khe bị vạch hào quang mảnh chia vụn (#10): mở rộng từ khe lớn qua vùng sáng nhạt liền kề, alpha theo độ trắng
            light = (a8.min(2) >= 205) & (a8.max(2) - a8.min(2) < 60) & (R[..., 3] > 0) & zone
            ll, nn = nd.label(light)
            ids = np.unique(ll[holes & light]); ids = ids[ids > 0]
            reg = np.isin(ll, ids) & ~holes
            wt = np.clip((a8.min(2) - 205) / 40, 0, 1)            # 1 = trắng hẳn → trong suốt
            R[..., 3][reg] = (R[..., 3][reg] * (1 - wt[reg])).astype(np.uint8)
            k1 = np.maximum(1 - wt[reg], .08)[:, None]               # khử pha trắng phần còn lại (không thành vệt xám tối)
            R[..., :3][reg] = np.clip((a8[reg] - (1 - k1) * 255) / k1, 0, 255).astype(np.uint8)
        ring = nd.binary_dilation(holes, iterations=1) & ~holes
        R[..., 3][holes] = 0
        mn = a8.min(2)
        R[..., 3][ring] = np.minimum(R[..., 3][ring], np.clip((255 - mn[ring]) / 85 * 255, 0, 255)).astype(np.uint8)
    m = R[..., 3] > 40
    lab, n = nd.label(m)
    sz = nd.sum(m, lab, range(1, n + 1)); cen = nd.center_of_mass(m, lab, range(1, n + 1))
    q = {'thuong': [], 'luc': [], 'lam': [], 'tim': []}
    for i, (v, (cy, cx)) in enumerate(zip(sz, cen)):
        if v < 30: continue
        key = ('thuong', 'luc', 'lam', 'tim')[(cy > h / 2) * 2 + (cx > w / 2)]
        q[key].append((i + 1, v))
    crops = {}
    for t, L in q.items():
        assert L, 'ô %s trống' % t
        big = max(v for _, v in L)
        keep = [i for i, v in L if v >= big * .004]
        k = nd.binary_dilation(np.isin(lab, keep), iterations=2)
        r = R.copy(); r[..., 3] = np.where(k, r[..., 3], 0)
        ys, xs = np.where(r[..., 3] > 8)
        crops[t] = Image.fromarray(r[ys.min():ys.max() + 1, xs.min():xs.max() + 1])
    # cùng 1 hệ số co cho 4 bậc (giữ tỉ lệ lớn dần GPT vẽ); bậc Tím rộng = chiến cơ Tím cũ (REF_W) hoặc vừa khung 500
    ref = float(os.environ.get('REF_W', '0')) or None
    kk = (ref or 470) / crops['tim'].width
    kk = min(kk, 500 / max(crops['tim'].size))
    def put(im, k):
        big = im.resize((max(1, round(im.width * k)), max(1, round(im.height * k))), Image.LANCZOS)
        o = Image.new('RGBA', (512, 512), (0, 0, 0, 0)); o.paste(big, (round(256 - big.width / 2), round(256 - big.height / 2)), big); return o
    # sàn cỡ bậc Trắng (cạnh dài ≥ FLOOR px trên khung 512) rồi giữ nhịp tăng dần Trắng < Lục < Lam < Tím
    FLOOR = float(os.environ.get('FLOOR', '235'))
    L = {t: max(im.size) * kk for t, im in crops.items()}
    want = dict(L)
    want['thuong'] = max(L['thuong'], FLOOR)
    want['luc'] = max(L['luc'], want['thuong'] * 1.10)
    want['lam'] = max(L['lam'], want['luc'] * 1.08)
    want['lam'] = min(want['lam'], L['tim'] * .95); want['luc'] = min(want['luc'], want['lam'] * .93); want['thuong'] = min(want['thuong'], want['luc'] * .91)
    out = {t: put(im, kk * want[t] / L[t]) for t, im in crops.items()}
    rep.append('cạnh dài ' + '/'.join('%d' % want[t] for t in T4))
    out['tim5'] = sang(out['tim'], 1.07, 1.06)
    out['ss'] = sang(out['tim'], 1.13, 1.10)
    rep.append('hệ số %.3f' % kk)
    for t, im in out.items():
        for suf, img in (('', im), ('_bt', sang(im, 1.22))):
            p = os.path.join(d_ship, 'tau%d_%s%s.png' % (N, t, suf))
            if not ra and os.path.exists(p) and not os.path.exists(os.path.join(bk, os.path.basename(p))):
                shutil.copy(p, bk)
            img.save(p)
            rep.append(os.path.basename(p))
    # đạn + cánh
    if fx:
        F = tach_den(np.asarray(Image.open(fx).convert('RGB')))
        rows = (F[..., 3] > 30).any(1)
        H = F.shape[0]
        prof = (F[..., 3] > 30).sum(1)
        lo, hi = int(H * .35), int(H * .65)
        mid = lo + int(np.argmin(prof[lo:hi]))   # hàng ít điểm sáng nhất giữa 2 hàng (đạn 4 chạm sát đỉnh sóng ở vài tàu)
        Wd = F.shape[1]
        cp = (F[mid:, :, 3] > 30).sum(0)
        c0, c1 = int(Wd * .35), int(Wd * .65)
        cm = c0 + int(np.argmin(cp[c0:c1]))      # cột ít điểm sáng nhất giữa cánh và sóng (không chia đôi cứng)
        jobs = [('dan', F[:mid], 'h', int(os.environ.get('DANH', '256')), True), ('canh', F[mid:, :cm], 'w', 768, False), ('song', F[mid:, cm:], 'w', 768, False)]
        for name, part, ax, size, multi in jobs:
            if multi:
                figs = [f for f in (giu_khoi(x, .05) for x in nhom_ngang(part)) if f is not None]
            else:
                figs = [x for x in [chinh(part)] if x is not None]
            if not figs:
                continue
            keys = T4 if len(figs) == 4 else [None]
            for k, im in zip(keys, figs if len(figs) == 4 else figs[:1]):
                f = size / (im.height if ax == 'h' else im.width)
                im = im.resize((max(1, round(im.width * f)), max(1, round(im.height * f))), Image.LANCZOS)
                nm = 'tau%d_%s%s.webp' % (N, name, '_' + k if k else '')
                im.save(os.path.join(d_img, nm), 'WEBP', quality=90, method=6)
                rep.append(nm)
    print('đã ghi', len(rep), 'tệp:', ' '.join(rep))


if __name__ == '__main__':
    main()
