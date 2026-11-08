# Dùng: python3 claude_tools/wrap.py <thư_mục_ra>  → tạo wrapped.html (index.html bọc doctype) để smoke test cục bộ
import sys,os
d=sys.argv[1];s=open(os.path.join(d,'index.html'),encoding='utf-8').read()
open(os.path.join(d,'wrapped.html'),'w',encoding='utf-8').write('<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head><body>'+s+'</body></html>')
print('ok')
