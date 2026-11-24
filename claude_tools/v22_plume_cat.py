# V2.2 · cắt 4 luồng đẩy ion-plasma từ assets/vfx/thruster_plumes.png → assets/vfx/plume_*.webp + src/plume22img/
# alpha = max(R,G,B) (mềm), màu gỡ nhân alpha; mỗi cột căn theo trục đối xứng, cắt sát mép miệng ống trên cùng.
import sys,numpy as np
from PIL import Image
SRC=sys.argv[1] if len(sys.argv)>1 else 'assets/vfx/thruster_plumes.png'
A=np.asarray(Image.open(SRC).convert('RGB')).astype(np.float32)/255
V=A.max(2);H,W=V.shape
col=(V>.12).sum(0);on=col>2
segs=[];x=0
while x<W:
  if on[x]:
    s=x
    while x<W and on[x]:x+=1
    if x-s>40:segs.append((s,x))
  x+=1
assert len(segs)==4,segs
NAMES=['cyan','gold','crimson','void'];OW,OH=96,224
for (s,e),nm in zip(segs,NAMES):
  sub=V[:,s:e]
  rows=np.where((sub>.5).sum(1)>3)[0];y0=int(rows.min());ys=np.where((sub>.06).sum(1)>0)[0];y1=int(ys.max())
  # trục đối xứng: trọng tâm độ sáng của 40 % trên
  band=sub[y0:y0+int((y1-y0)*.4)];cx=s+float((band.sum(0)*np.arange(e-s)).sum()/band.sum())
  half=max(cx-s,e-cx)+4;x0=int(round(cx-half));x1=int(round(cx+half))
  y0c=max(0,y0-3)
  C=np.zeros((y1-y0c+1,x1-x0,3),np.float32);xs0=max(0,x0);xs1=min(W,x1)
  C[:,xs0-x0:xs1-x0]=A[y0c:y1+1,xs0:xs1]
  a=C.max(2);rgb=np.where(a[...,None]>1e-4,C/np.maximum(a[...,None],1e-4),0)
  a=np.clip((a-.02)/.98,0,1)  # bỏ nhiễu nền đen
  out=np.dstack([np.clip(rgb,0,1),a])
  im=Image.fromarray((out*255+.5).astype(np.uint8),'RGBA').resize((OW,OH),Image.LANCZOS)
  for d in ('assets/vfx','src/plume22img'):im.save(f'{d}/plume_{nm}.webp',quality=90,method=6)
  print(nm,(s,e),'cx',round(cx,1),'y',y0c,y1,'→',OW,OH)
