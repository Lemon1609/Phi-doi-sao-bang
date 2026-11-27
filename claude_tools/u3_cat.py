# V2.3 U3: cắt 90555 (3 cột: thẻ Kỳ Cựu · tàu thám hiểm · rương mốc) + 90556 (băng rôn điểm danh) → src/u3img/*.webp
# python3 claude_tools/u3_cat.py <90555.png> <90556.png> <ra>
import sys,os,io,numpy as np
from PIL import Image,ImageFilter
from scipy import ndimage as nd
a5,a6,OUT=sys.argv[1:4];os.makedirs(OUT,exist_ok=True)
im=Image.open(a5).convert('RGB');A=np.asarray(im).astype(np.float32);mx=A.max(2)
# nền ngoài: điểm tối (max ≤ 22) liền mép ảnh
dark=mx<=22;lab,n=nd.label(dark);edge=set(np.unique(np.r_[lab[0],lab[-1],lab[:,0],lab[:,-1]]))-{0}
ext=np.isin(lab,list(edge))
fg=~ext;fl,fn=nd.label(fg);sz=nd.sum(fg,fl,range(1,fn+1));cx=nd.center_of_mass(fg,fl,range(1,fn+1))
COLS=[(0,560),(560,1140),(1140,1672)]
def save(rgba,name,maxside,q):
  b=Image.fromarray(rgba,'RGBA');bb=b.getbbox();b=b.crop(bb);s=maxside/max(b.size);b=b.resize((max(1,round(b.width*s)),max(1,round(b.height*s))),Image.LANCZOS)
  f=os.path.join(OUT,name+'.webp');b.save(f,'WEBP',quality=q,method=6);print(name,b.size,os.path.getsize(f));return b
for ci,(x0,x1) in enumerate(COLS):
  keep=np.zeros_like(fg)
  for i in range(fn):
    if sz[i]<40:continue
    if x0<=cx[i][1]<x1:keep|=fl==i+1
  hard=nd.binary_fill_holes(keep)  # lòng kín (khiên tím, rương) giữ đục
  al=hard.astype(np.float32)
  al=np.asarray(Image.fromarray((al*255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(.8))).astype(np.float32)/255  # mép mềm ~1 px
  al=np.minimum(al,np.where(hard,1,al))
  if ci==1:
    # tàu thám hiểm: giữ quầng mềm theo độ sáng (3 tia lửa đẩy cyan ở đáy, ăng-ten) → không viền đen
    soft=np.clip((mx-14)/170,0,1);m=np.zeros_like(hard);m[:,x0:x1]=True
    al=np.maximum(al,np.where(m,soft,0))
  rgb=A.copy()
  # khử viền đen: điểm bán trong suốt → chia màu cho alpha (giới hạn)
  k=np.clip(al,0.25,1)[...,None];rgb=np.where((al<.999)[...,None],np.clip(rgb/k,0,255),rgb)
  rgba=np.dstack([rgb,al*255]).astype(np.uint8);rgba[:,:x0,3]=0;rgba[:,x1:,3]=0
  nm,ms,q=[('ui_veteran_card',300,84),('icon_expedition_probe',176,86),('icon_milestone_chest',128,88)][ci]
  save(rgba,nm,ms,q)
# băng rôn: 760 px ngang, cắt dải trên-giữa giữ nguyên tỉ lệ khung hình 16:9
b=Image.open(a6).convert('RGB');b=b.resize((720,round(720*b.height/b.width)),Image.LANCZOS)
for q in (80,76,72,68,64,60):
  bio=io.BytesIO();b.save(bio,'WEBP',quality=q,method=6)
  if bio.tell()<=64000:break
open(os.path.join(OUT,'banner_login_u3.webp'),'wb').write(bio.getvalue());print('banner_login_u3',b.size,bio.tell(),'q',q)
