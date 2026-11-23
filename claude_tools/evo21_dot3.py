# V2.1 Đợt 3 · cắt 28 ảnh GPT: 7 tên lửa SSS (ssstlNN) + 7 tàu con SSS (ssswingNN), 3 mốc +0..2 / +3..9 / +10 (chủ dự án 23/11).
#   python3 claude_tools/evo21_dot3.py <thư mục có ssstl/ và ssswing/> <ra>
#   → st_<sss>_<0..2> (tên lửa bay, mốc +10 cạnh dài 210) · st_<sss>_tr<0..2> · st_<sss>_ex0/ex1 · st_<sss>_i<0..2> (384, Kho)
#   → sw_<sss>_<0..2> (thân tàu con, khung 256) · sw_<sss>_b<0..2> · sw_<sss>_wing · sw_<sss>_hit
#   Dùng chung hàm cắt của evo21_dot2 (gom khối liền theo cột, tách 2 hàng FX theo khối liền + dòng ranh).
import sys, os, glob
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import evo21_dot2 as D
D.IN, D.OUT = sys.argv[1], sys.argv[2]
os.makedirs(D.OUT, exist_ok=True)
# tệp gốc có thể nằm ở thư mục con → gom vào 1 thư mục tạm
FLAT = os.path.join(D.OUT, '_vao'); os.makedirs(FLAT, exist_ok=True)
for p in glob.glob(os.path.join(sys.argv[1], '**', '*.png'), recursive=True):
    q = os.path.join(FLAT, os.path.basename(p))
    if not os.path.exists(q): os.symlink(os.path.abspath(p), q)
D.IN = FLAT
TL = ['sss_inferno_cryo', 'sss_thunder_singularity', 'sss_spiral_stellar', 'sss_comet_nova', 'sss_judgement_swarm', 'sss_devour_chrono_m', 'sss_monarch_inferno']
WG = ['sss_rail_disc', 'sss_solar_gravity', 'sss_ricochet_prism', 'sss_lance_orbit', 'sss_halo_carrier', 'sss_devour_chrono_s', 'sss_monarch_rail']
STRICT = {'ssstl01', 'ssstl03', 'ssstl05', 'ssstl07', 'ssswing01', 'ssswing03', 'ssswing04', 'ssswing05', 'ssswing07'}
HOLES = {'ssstl02': [0, 1, 2], 'ssstl03': [0, 1, 2], 'ssstl05': [2], 'ssstl06': [2], 'ssswing05': [0, 1, 2], 'ssswing07': [0, 1, 2]}
KEEP = {'ssstl07'}   # giữ mảnh tinh thể bay rời quanh +10
rep = []
for n, v in enumerate(TL, 1):
    nm = 'ssstl%02d' % n
    cr = D.body4(nm, 3, nm in STRICT, HOLES.get(nm, []), nm in KEEP)
    k = 210 / max(cr[2].size); ki = 384 / max(cr[2].size)
    for t, im in enumerate(cr):
        D.save(D.fit(im, k), 'st_%s_%d' % (v, t)); D.save(D.fit(im, ki), 'st_%s_i%d' % (v, t))
    tr, e0, e1 = D.fx(nm, 3)
    kt = 256 / max(x.height for x in tr if x is not None)
    for t, im in enumerate(tr):
        if im is not None: D.save(D.fit(im, kt), 'st_%s_tr%d' % (v, t))
    for key, im in (('ex0', e0), ('ex1', e1)):
        if im is not None: D.save(D.fit(im, 256 / max(im.size)), 'st_%s_%s' % (v, key))
    rep.append('%s %s: thân %s · lửa %d' % (nm, v, '/'.join('%dx%d' % D.fit(c, k).size for c in cr), sum(x is not None for x in tr)))
for n, v in enumerate(WG, 1):
    nm = 'ssswing%02d' % n
    cr = D.body4(nm, 3, nm in STRICT, HOLES.get(nm, []))
    k = 240 / max(cr[2].size)
    for t, im in enumerate(cr):
        D.save(D.canvas(D.fit(im, k), 256), 'sw_%s_%d' % (v, t)); D.save(D.fit(im, 384 / max(cr[2].size)), 'sw_%s_i%d' % (v, t))
    bu, wi, hi = D.fx(nm, 3)
    kb = 192 / max(max(x.size) for x in bu if x is not None)
    for t, im in enumerate(bu):
        if im is not None: D.save(D.fit(im, kb), 'sw_%s_b%d' % (v, t))
    if wi is not None: D.save(D.fit(wi, 384 / wi.width), 'sw_%s_wing' % v)
    if hi is not None: D.save(D.fit(hi, 256 / max(hi.size)), 'sw_%s_hit' % v)
    rep.append('%s %s: thân %s · đạn %d' % (nm, v, '/'.join(str(max(D.fit(c, k).size)) for c in cr), sum(x is not None for x in bu)))
print('\n'.join(rep))
