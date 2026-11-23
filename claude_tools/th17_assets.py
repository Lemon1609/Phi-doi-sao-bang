# V309 L17B · 3 tranh Chiến cơ Thần hóa mới (GPT, 23/11) thay tranh V86 → src/th17img/*.webp (448 px, cùng khung ảnh cũ)
#  1) flood-fill nền trắng từ mép ngoài
#  2) lỗ trắng khép kín bên trong (vòng đồng hồ #12, vương miện #13): vùng liền "trắng phẳng" (min ≥ 246, chênh kênh ≤ 9) không chạm mép,
#     chỉ xóa khi đủ lớn và phẳng thật (độ lệch chuẩn sáng thấp) → giữ giáp bạc có khối bóng + lõi năng lượng
#  3) de-fringe 2 px quanh mọi biên cắt (ngoài + lỗ), tách phần trắng pha vào
#  4) căn tâm theo khối đặc, nội dung ~412 px trong ô 448 (như ảnh V86); bản _super = cùng tranh + quầng sáng dựng sẵn (Bạo Tẩu)
# python3 claude_tools/th17_assets.py <ảnh 3 tàu ngang> <thư mục ra>
import sys,os
import numpy as np
from PIL import Image,ImageFilter
from scipy.ndimage import label,binary_dilation
SRC,OUT=sys.argv[1],sys.argv[2];os.makedirs(OUT,exist_ok=True)
NAMES=[('sss11_huyettinh',(255,60,80)),('sss12_vinhhang',(90,190,255)),('sss13_chanthan',(210,90,255))]
im=Image.open(SRC).convert('RGB');a=np.array(im).astype(int);H,W=a.shape[:2]
mn=a.min(-1);mx=a.max(-1);lum=a.mean(-1)
white=(mn>=238)&(mx-mn<=14)
lb,n=label(white)
edge=set(np.unique(np.concatenate([lb[0],lb[-1],lb[:,0],lb[:,-1]])))-{0}
bg=np.isin(lb,list(edge))
# lỗ kín: lõi trắng phẳng chặt hơn
core=(mn>=246)&(mx-mn<=9)&~bg
lc,nc=label(core);holes=np.zeros_like(core);nh=0
for k in range(1,nc+1):
  m=lc==k;sz=m.sum()
  if sz<30:continue
  if lum[m].std()>3.2:continue            # có khối bóng → giáp, giữ
  # vùng quanh phải là viền kim loại (không phải lõi sáng màu): bão hòa trung bình dải biên
  ring=binary_dilation(m,iterations=4)&~m;rr=a[ring];sat=(rr.max(-1)-rr.min(-1)).mean();rl=rr.mean()
  cx=np.where(m)[1].mean()/W
  if cx<1/3:continue                        # #11: không có lỗ nền kín → không đục (đốm trắng là lõi xoáy)
  if cx<2/3 and rl>=200:continue            # #12: viền quanh sáng = lõi sao / tâm phát sáng → giữ
  if cx>=2/3 and not (rl<170 and sat<60):continue   # #13: chỉ đục khe vương miện (viền kim loại tối, ít màu); đốm sáng pha lê giữ
  holes|=m;nh+=1
# mở rộng lỗ sang pixel trắng lỏng hơn liền kề (khử viền trắng lỗ)
loose=(mn>=236)&(mx-mn<=16)
for _ in range(3):holes=holes|(binary_dilation(holes)&loose)
cut=bg|holes
alpha=np.where(cut,0,255).astype(float)
# de-fringe 2 px quanh mọi biên cắt
band=binary_dilation(cut,iterations=2)&~cut
rgb=a.astype(float)
wl=band&(mn>150)
k=np.clip((255-mn)/105.0,0.08,1.0)            # càng trắng càng trong
alpha[wl]=255*k[wl]
un=np.clip((rgb-(1-k[...,None])*255)/k[...,None],0,255)
rgb[wl]=un[wl]
out=np.dstack([rgb,alpha]).astype(np.uint8)
print('lỗ kín đã đục:',nh)
# tách 3 tàu theo cột trống alpha
colfill=(out[...,3]>20).sum(0)
segs=[];inside=False
for x in range(W):
  if colfill[x]>0 and not inside:inside=True;x0=x
  elif colfill[x]==0 and inside:inside=False;segs.append((x0,x))
if inside:segs.append((x0,W))
segs=[s for s in segs if s[1]-s[0]>60]
assert len(segs)==3,segs
for (name,glow),(x0,x1) in zip(NAMES,segs):
  sub=out[:,x0:x1];al=sub[...,3]>20;ys,xs=np.where(al)
  crop=Image.fromarray(sub[ys.min():ys.max()+1,xs.min():xs.max()+1])
  # khử mảnh vụn nhỏ không dính khối chính
  arr=np.array(crop);lb2,n2=label(arr[...,3]>20)
  if n2>1:
    sz=np.bincount(lb2.ravel());sz[0]=0;keep=sz>=max(60,sz.max()*.002);arr[~keep[lb2],3]=0;crop=Image.fromarray(arr)
  w,h=crop.size;S=412/max(w,h);crop=crop.resize((round(w*S),round(h*S)),Image.LANCZOS)
  c=Image.new('RGBA',(448,448),(0,0,0,0));c.alpha_composite(crop,((448-crop.width)//2,(448-crop.height)//2))
  c.save(OUT+'/'+name+'.webp','WEBP',quality=90,method=6)
  # _super: quầng sáng màu hệ dựng sẵn phía sau
  A=c.getchannel('A').filter(ImageFilter.GaussianBlur(14));g=Image.new('RGBA',c.size,glow+(0,));g.putalpha(A.point(lambda v:int(v*.85)))
  sp=Image.new('RGBA',c.size,(0,0,0,0));sp.alpha_composite(g);sp.alpha_composite(c);sp.save(OUT+'/'+name+'_super.webp','WEBP',quality=90,method=6)
  print(name,crop.size)
