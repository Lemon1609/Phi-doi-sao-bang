# V2.2.3 · VFX đợt 1: cắt HÀNG 2 của 90239.png (4 ngọc nhặt + 1 tia sáng) → src/vfx23img/*.webp (128 px)
#  Ngọc (cột 1–4): flood-fill TỪ MÉP ô vào vùng tối (max kênh ≤ 60) = ngoài; trong = đục 100 % (vành kim loại tối giữ đục).
#    Quầng sáng ngoài (pixel ngoài nhưng còn sáng) giữ lại với alpha = độ sáng max kênh, màu chia ngược alpha → không viền đen.
#  Tia sáng (cột 5): alpha = max kênh (vẽ 'lighter').
# Dùng: python3 claude_tools/vfx23_cat.py <90239.png> [ra=src/vfx23img]
import sys,os,numpy as np
from PIL import Image
from scipy import ndimage as nd
P=sys.argv[1];OUT=sys.argv[2] if len(sys.argv)>2 else 'src/vfx23img';os.makedirs(OUT,exist_ok=True)
a=np.asarray(Image.open(P).convert('RGB')).astype(np.float32);H,W,_=a.shape
Y0=548;mx=a.max(2)
cols=(mx[Y0:]>30).any(0);xs=np.where(cols)[0];segs=[];s=p=xs[0]
for x in xs[1:]:
  if x-p>12:segs.append((s,p));s=x
  p=x
segs.append((s,p));assert len(segs)==5,segs
NAMES=['orb_power_p','orb_shield','orb_heal','orb_crystal','fx_hit_spark']
for k,(x0,x1) in enumerate(segs):
  pad=8;x0=max(0,x0-pad);x1=min(W-1,x1+pad);sub=mx[Y0:,x0:x1+1];ys=np.where((sub>30).any(1))[0];y0=Y0+ys.min()-pad;y1=Y0+ys.max()+pad
  c=a[y0:y1+1,x0:x1+1];m=c.max(2)
  if k<4:
    dark=m<=60;lab,n=nd.label(dark);edge=np.unique(np.r_[lab[0],lab[-1],lab[:,0],lab[:,-1]]);edge=edge[edge>0];ext=np.isin(lab,edge)
    al=np.where(ext,np.clip(m/255*1.6,0,1),1.0)
    al=np.maximum(al,nd.gaussian_filter((~ext).astype(np.float32),.8)*(~ext))
  else:
    al=np.clip(m/255,0,1)
  rgb=np.where(al[...,None]>0.003,np.clip(c/np.maximum(al[...,None],1e-3),0,255),0)
  im=Image.fromarray(np.dstack([rgb,al*255]).astype(np.uint8),'RGBA')
  bb=im.getchannel('A').point(lambda v:255 if v>8 else 0).getbbox();im=im.crop(bb)
  s=128/max(im.size);im=im.resize((max(1,round(im.width*s)),max(1,round(im.height*s))),Image.LANCZOS)
  cv=Image.new('RGBA',(128,128),(0,0,0,0));cv.paste(im,((128-im.width)//2,(128-im.height)//2),im)
  cv.save(f'{OUT}/{NAMES[k]}.webp',quality=90,method=6);print(NAMES[k],(x0,y0,x1,y1),im.size)
