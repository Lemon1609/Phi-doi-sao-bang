# V238B · ghép thân bậc thấp GPT vẽ lại (V238_BAC_THAP) vào 512.
#  Mỗi bậc: _bt = thân thường + phần mở cắt từ bản bt GPT (thân giữa trùng khít); cỡ = tỉ lệ × cạnh dài bậc tím 512 của tàu đó
#  (thường .95, lục .97 — góp ý "không nhỏ"), tâm khung bao trùng tâm khung bao bậc tím; lề ≥ 20 px.
#  Cập nhật lệch gốc cánh (off) của bậc đó trong RAMP theo mép thân ở hàng gốc cánh.
#  python3 claude_tools/bac_thap_v238b.py <thư mục GPT>
import sys, json, re
import numpy as np, cv2
from PIL import Image
G = sys.argv[1]
L = lambda p: np.asarray(Image.open(p).convert('RGBA')).astype(np.float32)
def bbox(a, th=128):
    ys, xs = np.where(a > th); return xs.min(), xs.max(), ys.min(), ys.max()
def over(top, bot):
    ta = top[..., 3:4] / 255; ba = bot[..., 3:4] / 255; oa = ta + ba * (1 - ta)
    return np.dstack([(top[..., :3] * ta + bot[..., :3] * ba * (1 - ta)) / np.maximum(oa, 1e-6), oa * 255])
JOBS = [(2, 'thuong'), (3, 'thuong'), (3, 'luc'), (6, 'thuong'), (6, 'luc'), (7, 'thuong'), (10, 'thuong')]
RATIO = {'thuong': .95, 'luc': .97}
ROW = {2: None, 3: 266, 6: 236, 7: 183, 10: 250}
def edge(a, row):
    r = np.where(a[row - 6:row + 6].max(0) > 128)[0]; return int(r.min()), int(r.max())
P = 'src/btfx218.js'; s = open(P).read()
i = s.index('const RAMP={') + len('const RAMP='); d = 0; k = i
while True:
    c = s[k]; d += c == '{'; d -= c == '}'; k += 1
    if d == 0: break
R = json.loads(re.sub(r'([{,])(\d+):', r'\1"\2":', s[i:k]))
SO = {}
for n, t in JOBS:
    N = L(f'{G}/tau{n}_{t}.png'); B = L(f'{G}/tau{n}_{t}_bt.png')
    for X in (N, B): X[..., 3] = np.where(X[..., 3] < 24, 0, X[..., 3])
    x0, x1, y0, y1 = bbox(N[..., 3]); cx = (x0 + x1 + 1) / 2
    core = (N[..., 3] > 200).astype(np.float32); core[:, :int(cx - 90)] = 0; core[:, int(cx + 90):] = 0
    pad = 30; Bp = cv2.copyMakeBorder(B, pad, pad, pad, pad, cv2.BORDER_CONSTANT)
    r = cv2.matchTemplate(Bp[..., :3], N[..., :3], cv2.TM_SQDIFF, mask=np.dstack([core] * 3)); _, _, loc, _ = cv2.minMaxLoc(r)
    Ba = cv2.warpAffine(B, np.float32([[1, 0, -(loc[0] - pad)], [0, 1, -(loc[1] - pad)]]), (N.shape[1], N.shape[0]))
    sp = ((Ba[..., 3] > 8) & (N[..., 3] < 40)).astype(np.uint8); sp = cv2.morphologyEx(sp, cv2.MORPH_OPEN, np.ones((5, 5), np.uint8)); sp = cv2.dilate(sp, np.ones((3, 3), np.uint8))
    S = Ba.copy(); S[sp == 0] = 0; BT = over(N, S)
    T5 = L(f'src/ship118/tau{n}_tim.png'); tx0, tx1, ty0, ty1 = bbox(T5[..., 3]); tl = max(tx1 - tx0 + 1, ty1 - ty0 + 1)
    tcx, tcy = (tx0 + tx1 + 1) / 2, (ty0 + ty1 + 1) / 2
    nl = max(x1 - x0 + 1, y1 - y0 + 1); F = RATIO[t] * tl / nl
    bx0, bx1, by0, by1 = bbox(BT[..., 3], 24); ncx, ncy = cx, (y0 + y1 + 1) / 2
    ext = max((ncx - bx0), (bx1 + 1 - ncx), (ncy - by0), (by1 + 1 - ncy))
    F = min(F, (256 - 20) / ext)
    M = np.float32([[F, 0, tcx - ncx * F], [0, F, tcy - ncy * F]])
    N5 = cv2.warpAffine(N, M, (512, 512), flags=cv2.INTER_AREA); BT5 = cv2.warpAffine(BT, M, (512, 512), flags=cv2.INTER_AREA)
    Image.fromarray(N5.clip(0, 255).astype(np.uint8), 'RGBA').save(f'src/ship118/tau{n}_{t}.png')
    Image.fromarray(BT5.clip(0, 255).astype(np.uint8), 'RGBA').save(f'src/ship118/tau{n}_{t}_bt.png')
    a = N5[..., 3]; m = a > 128; px = N5[..., :3][m]; mx = px.max(1); mn = px.min(1); n0 = bbox(a)
    rec = {'than_512': [int(n0[1] - n0[0] + 1), int(n0[3] - n0[2] + 1)], 'tim_512': [int(tx1 - tx0 + 1), int(ty1 - ty0 + 1)],
           'bao_hoa': round(float(((mx - mn) / np.maximum(mx, 1)).mean()), 2), 'lech_bt': [int(loc[0] - pad), int(loc[1] - pad)]}
    if ROW[n]:
        e = edge(a, ROW[n]); eT = edge(T5[..., 3], ROW[n]); off = [[e[0] - eT[0], 0], [e[1] - eT[1], 0]]
        R[str(n - 1)][t]['off'] = off; rec['off'] = off
    SO[f'tau{n}_{t}'] = rec
out = re.sub(r'"(\d+)":', r'\1:', json.dumps(R, separators=(',', ':')))
s = s[:i] + out + s[k:]; open(P, 'w').write(s)
json.dump(SO, open('src/ship118_cho/V238_bac_thap_so_do.json', 'w'), ensure_ascii=False, indent=1); print(json.dumps(SO, ensure_ascii=False))
