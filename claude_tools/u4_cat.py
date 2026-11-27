# V2.3 U4: cắt 90580 (bệ trưng bày VKTT) + 90579 (lưới 4×2: 4 khung lục giác phẩm · khe trống · 3 lõi) → src/u4img/*.webp
# Lõi hàng 2 cột 2–4 có sẵn viền lục giác → chỉ lấy LÕI GIỮA (mặt nạ lục giác 70 % tâm, mép mềm) để lồng vào khung không bị 2 lớp viền.
# python3 claude_tools/u4_cat.py <90580.png> <90579.png> <ra>
import sys,os,io,numpy as np
from PIL import Image,ImageDraw,ImageFilter
from scipy import ndimage as nd
st,grid,OUT=sys.argv[1:4];os.makedirs(OUT,exist_ok=True)
def save(im,name,q=86):
  f=os.path.join(OUT,name+'.webp');im.save(f,'WEBP',quality=q,method=6);print(name,im.size,os.path.getsize(f));return f
# 1) bệ: 512×512, ≤ 65 KB
b=Image.open(st).convert('RGB').resize((512,512),Image.LANCZOS)
for q in (82,78,74,70,66,62):
  bio=io.BytesIO();b.save(bio,'WEBP',quality=q,method=6)
  if bio.tell()<=64000:break
open(os.path.join(OUT,'stage_vktt_3d.webp'),'wb').write(bio.getvalue());print('stage_vktt_3d',bio.tell(),'q',q)
# 2) lưới 4×2
G=Image.open(grid).convert('RGB');A=np.asarray(G).astype(np.float32);H,W=A.shape[:2];mx=A.max(2)
dark=mx<=24;lab,_=nd.label(dark);edge=set(np.unique(np.r_[lab[0],lab[-1],lab[:,0],lab[:,-1]]))-{0};ext=np.isin(lab,list(edge))
fg=~ext
def cell(r,c):
  x0,x1=int(W*c/4),int(W*(c+1)/4);y0,y1=int(H*r/2),int(H*(r+1)/2);m=np.zeros_like(fg);m[y0:y1,x0:x1]=fg[y0:y1,x0:x1]
  l,n=nd.label(m);
  if n>1:sz=nd.sum(m,l,range(1,n+1));m=l==(1+int(np.argmax(sz)))
  m=nd.binary_fill_holes(m);ys,xs=np.where(m);bb=(xs.min(),ys.min(),xs.max()+1,ys.max()+1)
  al=np.asarray(Image.fromarray((m*255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(.7))).astype(np.float32)/255
  al=np.where(m,np.maximum(al,.5),al)
  rgba=np.dstack([A,al*255]).astype(np.uint8)[bb[1]:bb[3],bb[0]:bb[2]]
  return Image.fromarray(rgba,'RGBA')
def sq(im,S):# đặt vào khung vuông S, giữ tỉ lệ, căn giữa
  s=S/max(im.size);im=im.resize((round(im.width*s),round(im.height*s)),Image.LANCZOS);o=Image.new('RGBA',(S,S));o.alpha_composite(im,((S-im.width)//2,(S-im.height)//2));return o
for c,n in enumerate(['green','blue','purple','gold']):save(sq(cell(0,c),144),'mod_frame_'+n)
save(sq(cell(1,0),144),'mod_slot_empty')
def hexmask(S,k,feather):
  m=Image.new('L',(S*4,S*4),0);d=ImageDraw.Draw(m);R=S*2*k;cx=cy=S*2
  import math;pts=[(cx+R*math.cos(math.radians(90+60*i)),cy+R*math.sin(math.radians(90+60*i))) for i in range(6)]  # lục giác đỉnh trên (như khung)
  d.polygon(pts,fill=255);m=m.resize((S,S),Image.LANCZOS).filter(ImageFilter.GaussianBlur(feather));return np.asarray(m).astype(np.float32)/255
for c,n in zip([1,2,3],['fire','struct','link']):
  im=sq(cell(1,c),288);a=np.asarray(im).astype(np.float32);S=im.width
  hm=hexmask(S,.70,4)                       # 70 % tâm, mép chuyển mềm
  a[...,3]=a[...,3]*hm
  core=Image.fromarray(a.astype(np.uint8),'RGBA');bb=core.getbbox();core=core.crop(bb)
  save(sq(core,112),'mod_core_'+n)
