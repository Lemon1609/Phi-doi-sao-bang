# V2.1 · cắt 21 ảnh GPT của 7 Chiến Thần (chủ dự án 23/11).
#   python3 claude_tools/evo21_ct.py <thư mục ct0i_body/rob0i_body/ct0i_fx> <ra>
#   ct0i_body.png / rob0i_body.png : NỀN TRẮNG, 3 hình ngang = mốc +0..2 | +3..9 | +10
#       → ct<i>_f1..f3.webp (chiến cơ hợp thể) · ct<i>_r1..r3.webp (robot), ô 512 giữ nhịp lớn dần GPT vẽ (cùng 1 hệ số co, +10 vừa 500 px)
#   ct0i_fx.png : NỀN ĐEN, hàng trên 3 đạn robot (mốc 1..3), hàng dưới trái cánh năng lượng · phải Tuyệt kỹ E
#       → ct<i>_dan_1..3.webp (cao 256) · ct<i>_canh.webp · ct<i>_ult.webp (rộng 768). ct02 Tuyệt kỹ lật dọc, ct05 3 đạn lật dọc.
import sys, os
import numpy as np
from PIL import Image
from scipy import ndimage as nd
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import evo21_cat as E

IN, OUT = sys.argv[1], sys.argv[2]
os.makedirs(OUT, exist_ok=True)
# luật riêng: (tên tệp) → {'wmin': ngưỡng nền trắng, 'holes': [cột mốc 0/1/2 được đục khe trắng khép kín], 'keep': giữ mảnh rời nhỏ (drone)}
R = {
 'ct01': dict(wmin=248, holes=[2]), 'rob01': dict(wmin=248, holes=[2]),
 'ct02': dict(holes=[1, 2]), 'rob02': dict(wmin=248, holes=[1, 2]),
 'ct03': dict(holes=[2]), 'rob03': dict(holes=[1, 2]),
 'ct04': dict(wmin=248, holes=[2], keep=True), 'rob04': dict(wmin=248, holes=[2], keep=True),
 'ct05': dict(wmin=248), 'rob05': dict(wmin=248),
 'ct06': dict(), 'rob06': dict(),
 'ct07': dict(wmin=248, holes=[1, 2]), 'rob07': dict(wmin=248, holes=[1, 2]),
}
FLIP = {('ct02', 'ult'), ('ct05', 'dan')}
rep = []


def body(name, out_key):
    cfg = R.get(name, {})
    os.environ['WMIN'] = str(cfg.get('wmin', 238))
    B = np.asarray(Image.open(os.path.join(IN, name + '_body.png')).convert('RGB'))
    h, w = B.shape[:2]
    A = E.tach_trang(B)
    a8 = B.astype(np.int16)
    # cột mốc: chia theo 2 khe dọc ít điểm ảnh nhất quanh 1/3 và 2/3
    prof = (A[..., 3] > 40).sum(0)
    c1 = int(w * .23) + int(np.argmin(prof[int(w * .23):int(w * .43)]))
    c2 = int(w * .57) + int(np.argmin(prof[int(w * .57):int(w * .77)]))
    cuts = [0, c1, c2, w]
    # khe trắng khép kín: chỉ trong cột được phép, khe ≥ 400 px (đốm phản quang / lõi sáng nhỏ được giữ)
    pure = (a8.min(2) >= 246) & (a8.max(2) - a8.min(2) < 10) & (A[..., 3] > 0)
    zone = np.zeros_like(pure)
    for c in cfg.get('holes', []):
        zone[:, cuts[c]:cuts[c + 1]] = True
    pure &= zone
    lab, n = nd.label(pure)
    if n:
        sz = nd.sum(pure, lab, range(1, n + 1))
        holes = np.isin(lab, [i + 1 for i, v in enumerate(sz) if v >= 400])
        ring = nd.binary_dilation(holes, iterations=1) & ~holes
        A[..., 3][holes] = 0
        mn = a8.min(2)
        A[..., 3][ring] = np.minimum(A[..., 3][ring], np.clip((255 - mn[ring]) / 85 * 255, 0, 255)).astype(np.uint8)
    crops = []
    for c in range(3):
        part = A[:, cuts[c]:cuts[c + 1]].copy()
        m = part[..., 3] > 40
        lab, n = nd.label(m)
        if n:
            sz = nd.sum(m, lab, range(1, n + 1))
            sl = nd.find_objects(lab)
            edge = lambda i: sl[i][1].start <= 1 or sl[i][1].stop >= part.shape[1] - 1   # mảnh chạm mép cắt dọc = chóp cánh của hình bên cạnh
            keep = [i + 1 for i, v in enumerate(sz) if v >= (30 if cfg.get('keep') else sz.max() * .004) and not (edge(i) and v < sz.max() * .05)]
            k = nd.binary_dilation(np.isin(lab, keep), iterations=2)
            part[..., 3] = np.where(k, part[..., 3], 0)
        ys, xs = np.where(part[..., 3] > 8)
        crops.append(Image.fromarray(part[ys.min():ys.max() + 1, xs.min():xs.max() + 1]))
    kk = 500 / max(crops[2].size)
    for t, im in enumerate(crops):
        big = im.resize((max(1, round(im.width * kk)), max(1, round(im.height * kk))), Image.LANCZOS)
        o = Image.new('RGBA', (512, 512), (0, 0, 0, 0))
        o.paste(big, (round(256 - big.width / 2), round(256 - big.height / 2)), big)
        o.save(os.path.join(OUT, '%s%d.webp' % (out_key, t + 1)), 'WEBP', quality=90, method=6)
    rep.append('%s: cạnh dài %s' % (name, '/'.join(str(round(max(c.size) * kk)) for c in crops)))


def fx(name, i):
    F = E.tach_den(np.asarray(Image.open(os.path.join(IN, name + '_fx.png')).convert('RGB')))
    H, Wd = F.shape[:2]
    prof = (F[..., 3] > 30).sum(1)
    mid = int(H * .35) + int(np.argmin(prof[int(H * .35):int(H * .65)]))
    cp = (F[mid:, :, 3] > 30).sum(0)
    cm = int(Wd * .35) + int(np.argmin(cp[int(Wd * .35):int(Wd * .65)]))
    figs = [f for f in (E.giu_khoi(x, .05) for x in E.nhom_ngang(F[:mid])) if f is not None]
    assert len(figs) == 3, '%s: hàng đạn có %d hình' % (name, len(figs))
    for t, im in enumerate(figs):
        if (name, 'dan') in FLIP:
            im = im.transpose(Image.FLIP_TOP_BOTTOM)
        f = 256 / im.height if im.height >= im.width else 256 / im.width
        im = im.resize((max(1, round(im.width * f)), max(1, round(im.height * f))), Image.LANCZOS)
        im.save(os.path.join(OUT, 'ct%d_dan_%d.webp' % (i, t + 1)), 'WEBP', quality=90, method=6)
    for key, part in (('canh', F[mid:, :cm]), ('ult', F[mid:, cm:])):
        im = E.chinh(part)
        if (name, key) in FLIP:
            im = im.transpose(Image.FLIP_TOP_BOTTOM)
        f = 768 / im.width
        im = im.resize((768, max(1, round(im.height * f))), Image.LANCZOS)
        im.save(os.path.join(OUT, 'ct%d_%s.webp' % (i, key)), 'WEBP', quality=90, method=6)


for i in range(1, 8):
    body('ct%02d' % i, 'ct%d_f' % i)
    body('rob%02d' % i, 'ct%d_r' % i)
    fx('ct%02d' % i, i)
print('\n'.join(rep))
