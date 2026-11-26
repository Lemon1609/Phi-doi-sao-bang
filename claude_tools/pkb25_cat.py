# V2.2.3 Gói B · cắt 6 hình từ tranh GPT 90242.png (3 ngọc trên, 3 thiên thạch dưới) → src/pkb25img/*.webp
# Dùng: python3 claude_tools/pkb25_cat.py <90242.png> <ra>
# Nền đen: vùng đặc (lấp lỗ, khối liền lớn nhất) đục 100 %, quầng sáng quanh ngọc khóa đen mềm theo độ sáng; mép mềm 1 px.
import sys,os
import numpy as np
from PIL import Image
from scipy import ndimage as nd
src,out=sys.argv[1],sys.argv[2];os.makedirs(out,exist_ok=True)
im=np.asarray(Image.open(src).convert('RGB')).astype(np.float32);H,W=im.shape[:2]
NAMES=[['orb_s','orb_up','orb_2'],['ast_1','ast_2','ast_3']]
S=160
for r in range(2):
    for c in range(3):
        y0,y1=int(H*r/2),int(H*(r+1)/2);x0,x1=int(W*c/3),int(W*(c+1)/3)
        t=im[y0:y1,x0:x1];mx=t.max(2)
        sol=nd.binary_fill_holes(nd.binary_closing(mx>(20 if r==0 else 14),iterations=2))
        lab,n=nd.label(sol);sz=nd.sum(np.ones_like(mx),lab,range(n+1));k=int(np.argmax(sz[1:]))+1;sol=lab==k
        core=nd.binary_erosion(sol,iterations=1)
        key=np.clip((mx-8)/80.0,0,1)
        a=np.where(core,1.0,np.where(sol,np.maximum(key,.6),key*(r==0)))
        ys,xs=np.where(a>.04);b=(ys.min(),ys.max()+1,xs.min(),xs.max()+1)
        rgb=t.copy();m=a>.004
        for ch in range(3):rgb[...,ch][m]=np.clip(t[...,ch][m]/a[m],0,255)
        rgb=rgb[b[0]:b[1],b[2]:b[3]];al=a[b[0]:b[1],b[2]:b[3]]
        o=Image.fromarray(np.dstack([rgb.astype(np.uint8),(al*255).astype(np.uint8)]),'RGBA')
        s=S/max(o.size);o=o.resize((max(1,round(o.width*s)),max(1,round(o.height*s))),Image.LANCZOS)
        cv=Image.new('RGBA',(S,S));cv.alpha_composite(o,((S-o.width)//2,(S-o.height)//2))
        cv.save(os.path.join(out,NAMES[r][c]+'.webp'),'WEBP',quality=88,method=6)
print('xong')
