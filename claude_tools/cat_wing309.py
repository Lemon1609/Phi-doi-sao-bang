# Cắt 6 nửa cánh năng lượng (GPT 3×2) → src/wing309img/<tên>.webp + piv.json (tâm khớp, tỉ lệ 0–1)
from PIL import Image;import numpy as np;from scipy import ndimage;import json
S='src/ship118_cho/V309_gpt_fx_energy_wings_6_3x2.png';O='src/wing309img/'
N=[['phoenix','cryo','seraph'],['void','cyber','chrono']]
a=np.asarray(Image.open(S).convert('RGB'));H,W=a.shape[:2];P={}
for r in range(2):
  for c in range(3):
    cell=a[int(r*H/2):int((r+1)*H/2),int(c*W/3):int((c+1)*W/3)].astype(float);L=cell.max(2)
    ys,xs=np.where(L>24);y0,y1,x0,x1=ys.min(),ys.max()+1,xs.min(),xs.max()+1
    cell=cell[y0:y1,x0:x1];L=L[y0:y1,x0:x1];h,w=L.shape;cut=int(w*.25)
    # vùng khớp kim loại (25 % trái): flood-fill nền đen từ mép → đục 100 %
    dark=L<18;lab,n=ndimage.label(dark);edge=set(np.unique(np.r_[lab[0],lab[-1],lab[:,0],lab[:,-1]]))-{0};bg=np.isin(lab,list(edge))
    a1=np.where(bg,0,1.0);a2=np.clip((L-6)/249,0,1)            # vùng lông vũ / lửa: alpha = max(R,G,B)
    t=np.clip((np.arange(w)-(cut-int(w*.04)))/(w*.08),0,1)[None,:]  # chuyển tiếp mềm quanh mốc 25 %
    al=a1*(1-t)+np.maximum(a2,a1*.0)*t;al=np.maximum(al,a2)
    al=ndimage.gaussian_filter(al,.5)
    rgb=np.where(al[...,None]>0,np.where((t<1)[...,None]&(a1[...,None]>0),cell,cell/np.maximum(al[...,None],1e-3)),0)
    im=Image.fromarray(np.dstack([np.clip(rgb,0,255),al*255]).astype('uint8'),'RGBA')
    k=512/max(w,h);im=im.resize((round(w*k),round(h*k)),Image.LANCZOS);im.save(O+N[r][c]+'.webp',quality=90)
    # tâm khớp: trọng tâm vùng sáng đục trong 25 % trái
    m=(a1[:, :cut]>0)&(L[:, :cut]>60);yy,xx=np.where(m)
    P[N[r][c]]=[round(float(xx.mean())/w,3),round(float(yy.mean())/h,3)]
json.dump(P,open(O+'piv.json','w'));print(P)
