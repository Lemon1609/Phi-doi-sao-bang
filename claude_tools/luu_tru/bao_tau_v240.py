# V240 · ghép 23 bản Bạo Tẩu GPT vẽ lại (giáp mở ra ngoài viền thân) vào 512.
#  GPT vẽ trên ảnh thân 1254 Claude gửi (thân 512 phóng ×2, lệch 115). Claude: dò lệch, cắt phần mở NGOÀI viền thân,
#  ghép thân thường gốc đè lên (thân giữa trùng khít tuyệt đối), quy về đơn vị 512.
#  Phần mở tràn khung 512 → thu cả tranh _bt quanh tâm (256,256) hệ số q (lề ≥ 14 px); game vẽ ô Bạo Tẩu to 1/q
#  (BtFx218.scaleBT) nên thân trên màn hình giữ nguyên cỡ, phần mở to đúng như GPT vẽ.
#  python3 claude_tools/bao_tau_v240.py <thư mục GPT> → ghi src/ship118/tauN_{bac}_bt.png + in bảng q cho btfx218.js
import sys, json
import numpy as np, cv2
from PIL import Image
G = sys.argv[1]
JOBS = [(12, t) for t in ['thuong', 'luc', 'lam', 'tim', 'tim5', 'ss']] + [(10, t) for t in ['thuong', 'luc', 'lam', 'tim', 'tim5', 'ss']] + \
       [(6, t) for t in ['thuong', 'luc', 'lam', 'tim', 'tim5', 'ss']] + [(2, 'thuong'), (2, 'tim'), (2, 'tim5'), (7, 'thuong'), (7, 'tim')]
L = lambda p: np.asarray(Image.open(p).convert('RGBA')).astype(np.float32)
def over(top, bot):
    ta = top[..., 3:4] / 255; ba = bot[..., 3:4] / 255; oa = ta + ba * (1 - ta)
    return np.dstack([(top[..., :3] * ta + bot[..., :3] * ba * (1 - ta)) / np.maximum(oa, 1e-6), oa * 255])
P = 256  # lề thêm quanh khung 512 để giữ phần tràn
Q = {}; SO = {}
for n, t in JOBS:
    N5 = L(f'src/ship118/tau{n}_{t}.png')
    N1 = np.zeros((1254, 1254, 4), np.float32); N1[115:1139, 115:1139] = cv2.resize(N5, (1024, 1024), interpolation=cv2.INTER_LANCZOS4)
    B = L(f'{G}/tau{n}_{t}_bt.png'); B[..., 3] = np.where(B[..., 3] < 24, 0, B[..., 3])
    core = (N1[..., 3] > 200).astype(np.float32); core[:, :627 - 120] = 0; core[:, 627 + 120:] = 0
    pad = 40; Bp = cv2.copyMakeBorder(B, pad, pad, pad, pad, cv2.BORDER_CONSTANT)
    r = cv2.matchTemplate(Bp[..., :3], N1[..., :3], cv2.TM_SQDIFF, mask=np.dstack([core] * 3)); _, _, loc, _ = cv2.minMaxLoc(r)
    dx, dy = loc[0] - pad, loc[1] - pad
    # GPT 1254 → đơn vị 512 có lề P: x512 = (x - 115 - dx)/2 + P
    M = np.float32([[.5, 0, P - (115 + dx) / 2], [0, .5, P - (115 + dy) / 2]])
    Bw = cv2.warpAffine(B, M, (512 + 2 * P, 512 + 2 * P), flags=cv2.INTER_AREA)
    Nw = np.zeros_like(Bw); Nw[P:P + 512, P:P + 512] = N5
    sp = ((Bw[..., 3] > 8) & (cv2.dilate((Nw[..., 3] > 40).astype(np.uint8), np.ones((3, 3), np.uint8)) == 0)).astype(np.uint8)
    sp = cv2.morphologyEx(sp, cv2.MORPH_OPEN, np.ones((3, 3), np.uint8)); sp = cv2.dilate(sp, np.ones((3, 3), np.uint8))
    S = Bw.copy(); S[sp == 0] = 0; BT = over(Nw, S)
    ys, xs = np.where(BT[..., 3] > 24); c = P + 256
    ext = max(c - xs.min(), xs.max() + 1 - c, c - ys.min(), ys.max() + 1 - c)
    q = min(1.0, (256 - 14) / ext)
    A2 = np.float32([[q, 0, 256 - c * q], [0, q, 256 - c * q]])
    BT5 = cv2.warpAffine(BT, A2, (512, 512), flags=cv2.INTER_AREA)
    Image.fromarray(BT5.clip(0, 255).astype(np.uint8), 'RGBA').save(f'src/ship118/tau{n}_{t}_bt.png')
    nb = Nw[..., 3] > 128; bb = BT[..., 3] > 128
    def wid(m): xx = np.where(m.any(0))[0]; return xx.max() - xx.min() + 1
    SO[f'tau{n}_{t}'] = {'lech_GPT': [int(dx), int(dy)], 'rong_bt_tren_thuong': round(wid(bb) / wid(nb), 2), 'dien_tich': round(bb.sum() / nb.sum(), 2), 'q': round(q, 3)}
    if q < 1: Q.setdefault(n - 1, {})[t] = round(q, 4)
json.dump(SO, open('src/ship118_cho/V240_bao_tau_so_do.json', 'w'), ensure_ascii=False, indent=1)
print(json.dumps(SO, ensure_ascii=False)); print('QBT', json.dumps(Q))
