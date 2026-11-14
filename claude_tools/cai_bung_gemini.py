# V257 · cài kết quả bung_gemini.py vào src/btfx218.js: RAMP[id] (ảnh, khung fx, bảng màu bậc tím + ảnh màu), PIV[id]. Các bậc khác giữ bảng màu cũ.
#  python3 claude_tools/cai_bung_gemini.py <N> <thư mục ra của bung_gemini.py> <tên lớp>
import sys, re, json
N = int(sys.argv[1]); D = sys.argv[2]; NM = sys.argv[3]; key = str(N - 1)
DIM = json.loads(sys.argv[4]) if len(sys.argv) > 4 else {}  # vd '{"tim5":0.8,"ss":0.8}'
p = 'src/btfx218.js'; s = open(p).read(); SO = json.load(open(f'{D}/so_do.json')); RT = json.load(open(f'{D}/ramp_tim.json'))
i = s.index('const RAMP=') + len('const RAMP='); d = 0
for j in range(i, len(s)):
    if s[j] == '{': d += 1
    elif s[j] == '}':
        d -= 1
        if d == 0: break
R = json.loads(re.sub(r'([{,]\s*)(\d+):', r'\1"\2":', s[i:j + 1]))
for t, v in R[key].items():
    v['img'] = NM; v['fx'] = SO['fx_khung']
    if t == 'tim': v['bung'] = RT; v['mau'] = NM + '_mau'
    if 'img3' in v: v['img3'] = NM + '3'
# V257C: lệch gốc từng bậc theo MÉP THÂN BẠO TẨU (thân vẽ to 1/q) ở hàng gốc cánh, không theo thân thường: năng lượng Gemini vẽ ôm thân Bạo Tẩu bậc tím
import numpy as np
from PIL import Image
qt = json.loads(re.sub(r'([{,])(\d+):', r'\1"\2":', re.search(r'const QBT=(\{.*?\}\});', s, re.S).group(1))).get(key, {})
row = int(round(sum(p[1] for p in SO['goc_canh_512']) / 2))
def edge(t):
    a = np.asarray(Image.open(f'src/ship118/tau{N}_{t}_bt.png').convert('RGBA'))[..., 3]; q = qt.get(t, 1.0); yb = int(round(256 + (row - 256) * q))
    r = np.where(a[max(0, yb - 30):yb + 30].max(0) > 128)[0]; return 256 + (r.min() - 256) / q, 256 + (r.max() - 256) / q
eT = edge('tim')
for t, v in R[key].items():
    e = edge(t); v['off'] = [[0, 0], [0, 0]] if SO.get('khong_than') else [[int(round(e[0] - eT[0])), 0], [int(round(e[1] - eT[1])), 0]]  # ảnh không thân: năng lượng mọc từ lõi chung, mọi bậc cùng gốc
    if t in DIM: v['dim'] = DIM[t]
print('off', {t: v['off'] for t, v in R[key].items()})
txt = '{\n' + ',\n'.join('    %s:%s' % (k, json.dumps(R[k], separators=(',', ':'))) for k in sorted(R, key=int)) + '\n  }'  # V301: mỗi tàu một dòng
s = s[:i] + txt + s[j + 1:]
piv = json.dumps(SO['goc_canh_512'], separators=(',', ':'))
m = re.search(r'const PIV=\{', s); k0 = m.end()
mm = re.compile(r'(^|[{,])' + key + r':\[\[[^\]]*\],\[[^\]]*\]\]').search(s, k0 - 1)
s = s[:mm.start()] + mm.group(1) + key + ':' + piv + s[mm.end():]
open(p, 'w').write(s); print('cai', N, NM, SO['fx_khung'], piv)
