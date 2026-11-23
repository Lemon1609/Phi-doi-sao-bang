# V2.1 Đợt 3 · nén lại ảnh WebP V2.1 trước khi nhúng (chủ dự án 23/11):
#   ảnh trận (đạn, vệt, nổ, tàu con, tên lửa, cánh…) q84 · ảnh lớn 512 (Chiến Thần ct*_f/_r) q89 · ảnh thân tàu (tau*.png) giữ nguyên.
#   Thu cạnh dài: Chiến Thần f/r ≤384 · lớp phủ lớn (canh/song/ult/wing/ex/hit) ≤256 · còn lại ≤192.
#   Chiều cao gốc ghi vào <ra>/_h0.json (tb309 tính cỡ tên lửa theo chiều cao ảnh → Evo21 đặt im.__h0).
#   python3 claude_tools/evo21_nen.py <vào> <ra> [q_tran=84] [q_lon=89]
import sys, os, glob, shutil, re, json
from PIL import Image
vao, ra = sys.argv[1], sys.argv[2]
qt = int(sys.argv[3]) if len(sys.argv) > 3 else 84
ql = int(sys.argv[4]) if len(sys.argv) > 4 else 89
os.makedirs(ra, exist_ok=True)
a = b = 0
H0 = {}
for p in sorted(glob.glob(os.path.join(vao, '*'))):
    n = os.path.basename(p); q = os.path.join(ra, n)
    if not n.endswith('.webp'):
        shutil.copy(p, q); continue
    im = Image.open(p); im.load()
    lon = bool(re.match(r'ct\d+_[fr]\d', n))
    cap = 384 if lon else (256 if re.search(r'(_canh|_song|_ult|_wing|_ex\d|_hit|_i\d)\.webp$', n) else 192)  # _i = ảnh Kho/Xưởng SSS
    if max(im.size) > cap:
        H0[n[:-5]] = im.height; k = cap / max(im.size)
        im = im.convert('RGBA').resize((max(1, round(im.width * k)), max(1, round(im.height * k))), Image.LANCZOS)
    im.save(q, 'WEBP', quality=ql if lon else qt, method=6, alpha_quality=90)
    s0, s1 = os.path.getsize(p), os.path.getsize(q)
    if s1 >= s0 and n[:-5] not in H0: shutil.copy(p, q); s1 = s0
    a += s0; b += s1
json.dump(H0, open(os.path.join(ra, '_h0.json'), 'w'))
print('%d ảnh thu nhỏ' % len(H0)); print('webp %.1f MB → %.1f MB' % (a / 1e6, b / 1e6))
