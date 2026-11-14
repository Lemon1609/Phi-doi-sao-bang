# V301 · chạy t209 tối đa 3 lần; in kết quả từng lần (không giấu lần trượt).
# Lý do: vài kiểm tra trong t209 chờ theo đồng hồ thật nên đôi khi trượt 19/20, và có lần game kẹt ở sảnh (8/20).
# Dùng: python3 tests/t209_on_dinh.py <html tuyệt đối>
import sys, subprocess, re
H = sys.argv[1]; kq = []
for lan in range(1, 4):
    r = subprocess.run([sys.executable, 'tests/v203_v212/t209.py', H], capture_output=True, text=True)
    m = re.findall(r'(\d+) / (\d+)', r.stdout); a, b = map(int, m[-1]) if m else (0, 20)
    hong = [l[:110] for l in r.stdout.splitlines() if l.startswith('✗')]
    kq.append((a, b)); print(f'lần {lan}: {a} / {b}', *(['  ' + h for h in hong]), sep='\n', flush=True)
    if a == b: break
print('KẾT QUẢ:', 'ĐẠT' if kq[-1][0] == kq[-1][1] else 'TRƯỢT', '·', ' → '.join(f'{a}/{b}' for a, b in kq))
