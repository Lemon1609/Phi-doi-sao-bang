# V257 · cài kết quả bung_gemini.py vào src/btfx218.js: RAMP[id] (ảnh, khung fx, bảng màu bậc tím + ảnh màu), PIV[id]. Các bậc khác giữ bảng màu cũ.
#  python3 claude_tools/cai_bung_gemini.py <N> <thư mục ra của bung_gemini.py> <tên lớp>
import sys, re, json
N = int(sys.argv[1]); D = sys.argv[2]; NM = sys.argv[3]; key = str(N - 1)
p = 'src/btfx218.js'; s = open(p).read(); SO = json.load(open(f'{D}/so_do.json')); RT = json.load(open(f'{D}/ramp_tim.json'))
i = s.index('const RAMP=') + len('const RAMP='); d = 0
for j in range(i, len(s)):
    if s[j] == '{': d += 1
    elif s[j] == '}':
        d -= 1
        if d == 0: break
R = json.loads(re.sub(r'([{,])(\d+):', r'\1"\2":', s[i:j + 1]))
for t, v in R[key].items():
    v['img'] = NM; v['fx'] = SO['fx_khung']
    if t == 'tim': v['bung'] = RT; v['mau'] = NM + '_mau'
    if 'img3' in v: v['img3'] = NM + '3'
txt = json.dumps(R, separators=(',', ':')); txt = re.sub(r'"(\d+)":\{"thuong"', r'\1:{"thuong"', txt)
s = s[:i] + txt + s[j + 1:]
piv = json.dumps(SO['goc_canh_512'], separators=(',', ':'))
m = re.search(r'const PIV=\{', s); k0 = m.end()
mm = re.compile(r'(^|[{,])' + key + r':\[\[[^\]]*\],\[[^\]]*\]\]').search(s, k0 - 1)
s = s[:mm.start()] + mm.group(1) + key + ':' + piv + s[mm.end():]
open(p, 'w').write(s); print('cai', N, NM, SO['fx_khung'], piv)
