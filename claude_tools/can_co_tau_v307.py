"""V307 · Căn cỡ 13 tàu × 6 bậc (chủ dự án duyệt 17/11: giữ mẫu gốc, chỉ chỉnh kích thước).
- Độ lớn nhìn thấy ≈ căn bậc hai diện tích (px có alpha>40). Bậc Tím của mọi tàu về cùng một mức (trung vị các tàu), rồi
  các bậc khác theo hệ số F (lớn dần đều). Cạnh dài nhất không quá LIM (khung 512, chừa lề).
- Áp cùng hệ số cho ảnh thân Bạo Tẩu (_bt) của bậc đó. Giữ tâm hình tại chỗ cũ.
Dùng: python3 claude_tools/can_co_tau_v307.py <thư mục ra> [--ghi] (không --ghi thì chỉ xuất ra thư mục để xem)"""
import sys,os
from PIL import Image
import numpy as np
B=['thuong','luc','lam','tim','tim5','ss'];F=[.80,.86,.93,1.0,1.07,1.14];LIM=476
SRC=os.path.join(os.path.dirname(os.path.abspath(__file__)),'..','src','ship118')
out=sys.argv[1];ghi='--ghi' in sys.argv;os.makedirs(out,exist_ok=True)
def mask(im):return np.asarray(im)[...,3]>40
def bb(m):ys,xs=np.where(m);return xs.min(),ys.min(),xs.max()+1,ys.max()+1
def load(n,b,s=''):return Image.open(os.path.join(SRC,f'tau{n}_{b}{s}.png')).convert('RGBA')
sq={n:[np.sqrt(mask(load(n,b)).sum()) for b in B] for n in range(1,14)}
ref=float(np.median([sq[n][3] for n in sq]))
print('mức chuẩn bậc Tím: căn diện tích',round(ref))
def place(im,k,cx,cy):
    sc=im.resize((max(1,round(512*k)),max(1,round(512*k))),Image.LANCZOS);c=Image.new('RGBA',(512,512),(0,0,0,0))
    c.paste(sc,(round(cx-cx*k),round(cy-cy*k)),sc);return c
for n in range(1,14):
    row=[]
    for j,b in enumerate(B):
        im=load(n,b);m=mask(im);x0,y0,x1,y1=bb(m);side=max(x1-x0,y1-y0);cx,cy=(x0+x1)/2,(y0+y1)/2
        k=ref*F[j]/sq[n][j];k=min(k,LIM/side)
        for s in ('','_bt'):
            p=os.path.join(SRC,f'tau{n}_{b}{s}.png')
            if not os.path.exists(p):continue
            r=place(load(n,b,s),k,cx,cy);r.save(os.path.join(out,f'tau{n}_{b}{s}.png'))
            if ghi:r.save(p)
        row.append(f'{k:.2f}')
    print(f'tàu {n}: hệ số',' '.join(row))
