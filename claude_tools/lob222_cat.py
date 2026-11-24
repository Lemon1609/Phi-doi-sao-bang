# V2.2.2 · cắt tấm 4 nút kim loại 3D (90047.png) → src/lob222img/*.webp
# Tách nền: flood-fill TỪ MÉP NGOÀI qua các điểm gần đen (lòng tối của nút không chạm mép nên giữ đục 100 %), viền mềm 1,5 px.
# Dùng: python3 claude_tools/lob222_cat.py <tấm.png> <thư mục ra>
import sys,os,numpy as np
from PIL import Image
from scipy import ndimage as nd
src,out=sys.argv[1],sys.argv[2];os.makedirs(out,exist_ok=True)
im=np.array(Image.open(src).convert('RGB')).astype(np.int16);H,W,_=im.shape
dark=(im.max(axis=2)<=14)                       # nền đen ngoài (và cả lòng nút — chỉ phần NỐI MÉP bị lấy)
lab,n=nd.label(dark);edge=set(np.unique(np.concatenate([lab[0],lab[-1],lab[:,0],lab[:,-1]])))-{0}
bg=np.isin(lab,list(edge))
# bịt khe nhỏ trên viền rồi lấp lòng → lòng tối của nút luôn đục
op=nd.binary_fill_holes(nd.binary_closing(~bg,structure=np.ones((7,7)),iterations=2));bg=~op
# viền mềm: khoảng cách tới phần đục, 0..1,5 px
d=nd.distance_transform_edt(bg)
a=np.clip(1-(d-0.0)/1.5,0,1);a[~bg]=1.0
# ô theo khối đục
lab2,n2=nd.label(~bg);objs=nd.find_objects(lab2);sizes=nd.sum(np.ones_like(lab2),lab2,range(1,n2+1))
keep=sorted([(sizes[i],objs[i]) for i in range(n2) if sizes[i]>20000],key=lambda t:t[1][0].start)
names=['btn_cta_gold','btn_cta_crimson','btn_nav_navy','btn_dock_sq']
print([(int(s),sl) for s,sl in keep]);keep=sorted(keep,key=lambda t:-t[0])[:4];keep=sorted(keep,key=lambda t:t[1][0].start)
rgba=np.dstack([im.astype(np.uint8),(a*255).astype(np.uint8)])
for (s,sl),nm in zip(keep,names):
  y0,y1=max(0,sl[0].start-2),min(H,sl[0].stop+2);x0,x1=max(0,sl[1].start-2),min(W,sl[1].stop+2)
  t=Image.fromarray(rgba[y0:y1,x0:x1],'RGBA')
  mw=640 if nm!='btn_dock_sq' else 256
  if t.width>mw:t=t.resize((mw,round(t.height*mw/t.width)),Image.LANCZOS)
  t.save(os.path.join(out,nm+'.webp'),'WEBP',quality=90,method=6)
  al=np.array(t)[:,:,3];h,w=al.shape;print(nm,t.size,'ty le %.2f'%(w/h),'lõi đục %.3f'%(al[h//3:2*h//3,w//4:3*w//4]>250).mean())
