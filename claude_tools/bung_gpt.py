# V286 · ghép cánh bung GPT (ảnh vuông bất kỳ, thân vẽ lại lệch): python3 claude_tools/bung_gpt.py <N> <a có thân> <b chỉ năng lượng> <out> <tên>
# Đo tỉ lệ / độ lệch thân của (a) so với khung chuẩn, đưa (b) về đúng thân trong game, thu cho rộng ≤ 880, rồi chạy bung_gemini.py.
import sys, os, json, subprocess
import numpy as np, cv2
from PIL import Image
N, A, B, O, NM = sys.argv[1:6]; os.makedirs(O, exist_ok=True)
K = os.environ.get('KHUNG', os.path.join(os.path.dirname(os.path.abspath(__file__)), 'khung_bung', 'khung', f'tau{N}_than_bao_tau.png'))
for s, d in [(A, 'a1024.png'), (B, 'b1024.png')]: Image.open(s).convert('RGB').resize((1024, 1024), Image.LANCZOS).save(f'{O}/{d}')
env = dict(os.environ, KHOPRANGE='.6,1.5', KHONGTHAN=f'{O}/b1024.png', KHUNG=K, PIVBAND='80')
subprocess.run(['python3', 'claude_tools/bung_gemini.py', N, f'{O}/a1024.png', f'{O}/thu', NM], env=env, capture_output=True)
k = json.load(open(f'{O}/thu/so_do.json'))['khop_than']; s = k['ti_le']; dx, dy = k['lech']
b = np.asarray(Image.open(f'{O}/b1024.png')).astype(np.float32); q = 1 / s
Bm = cv2.warpAffine(b, np.float32([[q, 0, 512 - (512 + dx) * q], [0, q, 512 - (512 + dy) * q]]), (1024, 1024), flags=cv2.INTER_AREA)
ys, xs = np.where(Bm.max(-1) > 40); w = xs.max() - xs.min(); f = min(1, float(os.environ.get('RONG', 880)) / w)
Bm = cv2.warpAffine(Bm, np.float32([[f, 0, 512 * (1 - f)], [0, f, 512 * (1 - f)]]), (1024, 1024), flags=cv2.INTER_AREA)
Image.fromarray(Bm.clip(0, 255).astype(np.uint8)).save(f'{O}/b_can.png')
Kh = np.asarray(Image.open(K).convert('RGB')).astype(np.float32)
Image.fromarray(np.clip(Kh + Bm, 0, 255).astype(np.uint8)).save(f'{O}/a_dung.png')
env.update(KHONGTHAN=f'{O}/b_can.png'); env.pop('KHOPRANGE')
r = subprocess.run(['python3', 'claude_tools/bung_gemini.py', N, f'{O}/a_dung.png', O, NM], env=env, capture_output=True, text=True)
d = json.load(open(f'{O}/so_do.json')); d['gpt'] = {'ti_le_than_gpt': s, 'lech_gpt': [dx, dy], 'rong_goc_px': int(w), 'thu': round(f, 3)}
json.dump(d, open(f'{O}/so_do.json', 'w'), ensure_ascii=False); print(json.dumps(d['gpt']), 'rong/than', d['rong_nang_luong_so_than'], 'non60', d['non60_truoc_mui'])
