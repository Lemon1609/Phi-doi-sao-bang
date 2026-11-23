# V309 L17 · tách nền 2 bộ ảnh GPT → WebP q90 (src/ui17img/*.webp)
#  1) flood-fill từ 4 góc mép ngoài mỗi ô: xóa pixel nền (alpha thấp hoặc trắng nhạt ít bão hòa) — KHÔNG xóa trắng toàn cục (giữ đèn LED trắng bên trong)
#  2) khung: flood-fill thêm từ tâm để đục rỗng lòng
#  3) de-fringe 2 px quanh biên cắt: tách phần trắng pha vào (un-premultiply với nền trắng), dọn alpha rác
#  4) khung số 1 (Trắng): giảm bão hòa xanh về tông bạc–trắng
# python3 claude_tools/ui17_assets.py <icons_12.png> <frames_6.png> <thư mục ra>
import sys,os
import numpy as np
from PIL import Image
from collections import deque
ICONS,FRAMES,OUT=sys.argv[1],sys.argv[2],sys.argv[3];os.makedirs(OUT,exist_ok=True)
IC_NAMES=['pha_giap','phan_cong','xung_kich','hap_thu','xung_chan','vo_nl','duy_tri','tu_truong','nap_nhanh','crystal','oc_core','event_week']
FR_NAMES=['f_trang','f_luc','f_lam','f_tim','f_oc5','f_sss']
def bgmask(a,seeds):
  h,w=a.shape[:2];rgb=a[...,:3].astype(int);al=a[...,3].astype(int)
  mx=rgb.max(-1);mn=rgb.min(-1)
  can=(al<40)|((mn>228)&(mx-mn<22))          # nền: gần trong suốt hoặc trắng nhạt
  m=np.zeros((h,w),bool);q=deque()
  for (y,x) in seeds:
    if can[y,x] and not m[y,x]:m[y,x]=True;q.append((y,x))
  while q:
    y,x=q.popleft()
    for dy,dx in ((1,0),(-1,0),(0,1),(0,-1)):
      ny,nx=y+dy,x+dx
      if 0<=ny<h and 0<=nx<w and not m[ny,nx] and can[ny,nx]:m[ny,nx]=True;q.append((ny,nx))
  return m
def defringe(a,m):
  a=a.astype(float);al=a[...,3]/255.;al[m]=0
  # dải biên 2 px cạnh vùng đã xóa
  from scipy.ndimage import binary_dilation
  band=binary_dilation(m,iterations=2)&~m
  rgb=a[...,:3]
  # pixel trắng bán trong suốt ở biên: tách phần trắng (giả định pha với nền trắng)
  lum=rgb.min(-1)
  wb=band&(lum>150)
  k=np.clip(al,0.05,1)[...,None]
  un=np.clip((rgb-(1-k)*255)/k,0,255)
  rgb[wb]=un[wb]
  al[band]=np.where(lum[band]>215,al[band]*.55,al[band])   # viền trắng sáng còn sót → mờ bớt
  al[al<.06]=0;al[al>.96]=1
  a[...,:3]=rgb;a[...,3]=al*255;return a.astype(np.uint8)
def silver(a):
  f=a.astype(float);r,g,b=f[...,0],f[...,1],f[...,2];mx=f[...,:3].max(-1);mn=f[...,:3].min(-1)
  blue=(b>r+18)&(b>=g)&(a[...,3]>0)
  l=(mx+mn)/2;gray=np.stack([l,l,l],-1)
  mix=np.where(blue[...,None],gray*.75+f[...,:3]*.25+12,f[...,:3])
  f[...,:3]=np.clip(mix,0,255);return f.astype(np.uint8)
def keep_main(a):
  # chỉ giữ khối liền chính (bỏ mẩu ảnh ô bên cạnh lấn sang): thành phần chạm vùng giữa ô hoặc lớn ≥ 8 % khối chính
  from scipy.ndimage import label
  m=a[...,3]>8;lb,n=label(m)
  if n<=1:return a
  h,w=m.shape;sz=np.bincount(lb.ravel());sz[0]=0;main=sz.argmax();keep=np.zeros(n+1,bool);keep[main]=True
  cen=lb[h//4:3*h//4,w//4:3*w//4]
  for k in np.unique(cen):
    if k:keep[k]=True
  for k in range(1,n+1):
    if sz[k]>=.08*sz[main]:keep[k]=True
  a=a.copy();a[~keep[lb],3]=0;return a
def trim(im,pad,size):
  bb=im.getchannel('A').point(lambda v:255 if v>8 else 0).getbbox();im=im.crop(bb)
  w,h=im.size;S=max(w,h)+2*pad;c=Image.new('RGBA',(S,S),(0,0,0,0));c.paste(im,((S-w)//2,(S-h)//2));return c.resize((size,size),Image.LANCZOS)
def cells(path,cols,rows):
  im=Image.open(path).convert('RGBA');W,H=im.size;cw,ch=W//cols,H//rows
  for r in range(rows):
    for c in range(cols):yield im.crop((c*cw,r*ch,(c+1)*cw,(r+1)*ch))
rep=[]
for i,cell in enumerate(cells(ICONS,4,3)):
  a=np.array(cell);h,w=a.shape[:2];m=bgmask(a,[(0,0),(0,w-1),(h-1,0),(h-1,w-1),(0,w//2),(h-1,w//2),(h//2,0),(h//2,w-1)])
  a=keep_main(defringe(a,m));im=trim(Image.fromarray(a),4,128);im.save(OUT+'/'+IC_NAMES[i]+'.webp','WEBP',quality=90,method=6);rep.append((IC_NAMES[i],round(m.mean(),3)))
for i,cell in enumerate(cells(FRAMES,3,2)):
  a=np.array(cell);h,w=a.shape[:2]
  m=bgmask(a,[(0,0),(0,w-1),(h-1,0),(h-1,w-1),(0,w//2),(h-1,w//2),(h//2,0),(h//2,w-1)])|bgmask(a,[(h//2,w//2),(h//2-40,w//2),(h//2+40,w//2),(h//2,w//2-40),(h//2,w//2+40)])
  a=defringe(a,m)
  if i==0:a=silver(a)
  im=trim(Image.fromarray(a),0,256);im.save(OUT+'/'+FR_NAMES[i]+'.webp','WEBP',quality=90,method=6);rep.append((FR_NAMES[i],round(m.mean(),3)))
print(rep)
