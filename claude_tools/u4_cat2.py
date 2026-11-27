# V2.3 U4 bước 2: cắt 90594 (2×2 tranh VKTT) + 90595 (4×2 hiệu ứng trận) → src/u4img/vktt_*.webp, src/u4fx/fx_vktt_*.webp
# 90594: nền ngoài flood-fill từ mép (max RGB ≤ 22) + xóa hốc đen kín lớn, mép mềm theo độ sáng (giữ tia sét / xoáy mờ).
# 90595 hàng 1 = vật thể đặc (flood-fill + mép sáng), hàng 2 = vòng độ sáng (alpha theo độ sáng, màu khử nhân alpha); cắt vuông căn tâm trục quay.
# python3 claude_tools/u4_cat2.py <90594.png> <90595.png> <ra_img> <ra_fx>
import sys,os,numpy as np
from PIL import Image
from scipy import ndimage as nd
P4,P5,OI,OF=sys.argv[1:5];os.makedirs(OI,exist_ok=True);os.makedirs(OF,exist_ok=True)
def save(rgba,path,S,q=84):
  im=Image.fromarray(rgba.astype(np.uint8),'RGBA');bb=im.getchannel('A').point(lambda v:255 if v>10 else 0).getbbox()
  cx=(bb[0]+bb[2])/2;cy=(bb[1]+bb[3])/2;h=max(bb[2]-bb[0],bb[3]-bb[1])/2+4
  im=im.crop((int(cx-h),int(cy-h),int(cx+h),int(cy+h))).resize((S,S),Image.LANCZOS)
  im.save(path,'WEBP',quality=q,method=6,exact=False);print(os.path.basename(path),S,os.path.getsize(path))
def solid(A,thr=22,void=1500,soft=70,keepbig=True):
  mx=A.max(2);dark=mx<=thr;lab,n=nd.label(dark);edge=set(np.unique(np.r_[lab[0],lab[-1],lab[:,0],lab[:,-1]]))-{0}
  bg=np.isin(lab,list(edge))
  if void:
    sz=nd.sum(dark,lab,range(1,n+1));big=[i+1 for i,s in enumerate(sz) if s>=void]
    bg|=np.isin(lab,big)
  fg=~bg
  if keepbig:
    l,k=nd.label(nd.binary_dilation(fg,iterations=6))
    if k>1:s=nd.sum(fg,l,range(1,k+1));fg&=l==(1+int(np.argmax(s)))
  # mép mềm: trong 5 px quanh nền → alpha theo độ sáng
  d=nd.distance_transform_edt(fg)
  al=np.where(d>5,1.,np.clip(mx/soft,0,1))*fg
  rgb=np.where(al[...,None]>0,A/np.maximum(al[...,None],.35),0).clip(0,255)
  return np.dstack([rgb,al*255])
def lumi(A,k=200,solidthr=0):
  mx=A.max(2);al=np.clip((mx-8)/k,0,1)
  if solidthr:al=np.maximum(al,solid(A,thr=solidthr,void=0,keepbig=False)[...,3]/255*(mx>60))
  rgb=(A/np.maximum(al[...,None],.05)).clip(0,255);return np.dstack([rgb,al*255])
G=np.asarray(Image.open(P4).convert('RGB')).astype(np.float32);H,W=G.shape[:2]
for (r,c),n in {(0,0):'phaodai',(0,1):'thegioi',(1,0):'sansao',(1,1):'luoidien'}.items():
  A=G[H*r//2:H*(r+1)//2,W*c//2:W*(c+1)//2]
  o=solid(A,void=1200 if n!='thegioi' else 900,soft=90)
  if n in('thegioi','luoidien'):  # tia sét / xoáy không gian: thêm lớp độ sáng mềm ngoài khối
    L=lumi(A,160);o[...,3]=np.maximum(o[...,3],L[...,3]);m=o[...,3]>0;o[...,:3]=np.where((L[...,3]>o[...,3]-1)[...,None]&m[...,None],L[...,:3],o[...,:3])
  save(o,os.path.join(OI,'vktt_'+n+'.webp'),256,72)
F=np.asarray(Image.open(P5).convert('RGB')).astype(np.float32);H,W=F.shape[:2]
cols=['phaodai','thegioi','sansao','luoidien'];r1=['turret','bomb','saw','node'];r2=['shield','field','saw_ult','mark']
for c in range(4):
  A=F[0:H//2,W*c//4:W*(c+1)//4]
  if c==1:o=lumi(A,150,solidthr=26)    # bom: lai (vỏ đặc + xoáy mờ)
  else:
    o=solid(A,void=0,soft=110 if c in(2,3) else 70,keepbig=False)
    if c in(2,3):L=lumi(A,170);o[...,3]=np.maximum(o[...,3],L[...,3])
  save(o,os.path.join(OF,'fx_vktt_%s_%s.webp'%(cols[c],r1[c])),128,80)
  A=F[H//2:H,W*c//4:W*(c+1)//4]
  o=lumi(A,170 if c!=0 else 150,solidthr=40 if c==0 else 0)
  save(o,os.path.join(OF,'fx_vktt_%s_%s.webp'%(cols[c],r2[c])),184,66)
