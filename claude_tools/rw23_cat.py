# V2.2.3 · cắt 7 bộ cánh Chiến Thần (tranh GPT nền đen) → src/rw23img/ct<N>_<mảnh>.webp + rw23.json
# Dùng: python3 claude_tools/rw23_cat.py <thư mục ảnh ct1_*.png..ct7_*.png> <ra>
#  · CT6 (lửa thuần): độ sáng → alpha (bỏ nhân màu), giữ 2 vòi kim loại đục.
#  · CT1–5, 7 (giáp kim loại + năng lượng): nền đen ngoài + lỗ đen kín lớn = trong suốt; giáp (vùng sáng liền khối, lấp lỗ nhỏ) đục 100 %;
#    phần năng lượng mảnh trên nền đen (tia sét, vạch sáng) khóa đen mềm theo độ sáng → không viền đen, không khung.
# Mỗi mảnh ghi: cỡ, tâm xoay (khớp vai, tính theo px của mảnh), vị trí tâm xoay so với tâm robot (đơn vị = bề ngang ảnh gốc → mã nhân với cỡ cánh).
import sys,os,glob,json
import numpy as np
from PIL import Image
from scipy import ndimage as nd
SRC,OUT=sys.argv[1],sys.argv[2];os.makedirs(OUT,exist_ok=True)
MAXS=420  # cạnh dài tối đa mỗi mảnh (cánh vẽ ~120–300 px trong khung 480)
def load(n):
    f=glob.glob(os.path.join(SRC,'ct%d_*.png'%n))[0];return np.asarray(Image.open(f).convert('RGB')).astype(np.float32)
def unpre(rgb,a):
    o=rgb.copy();m=a>.004
    for c in range(3):o[...,c][m]=np.clip(rgb[...,c][m]/a[m],0,255)
    return o
def mecha(rgb,solid_t=52,void_t=16,void_area=600):
    mx=rgb.max(2)
    bg=mx<=void_t
    lab,n=nd.label(bg)
    border=set(np.unique(np.concatenate([lab[0],lab[-1],lab[:,0],lab[:,-1]])))-{0}
    sizes=nd.sum(np.ones_like(mx),lab,range(n+1))
    voidm=np.isin(lab,[k for k in range(1,n+1) if k in border or sizes[k]>=void_area])
    sol=nd.binary_closing(mx>solid_t,iterations=2)
    sol=nd.binary_fill_holes(sol)&~voidm
    sol=nd.binary_opening(sol,iterations=1)
    # khối giáp nhỏ lẻ (tia sét sáng) không tính là giáp
    lab2,n2=nd.label(sol);s2=nd.sum(np.ones_like(mx),lab2,range(n2+1))
    sol=np.isin(lab2,[k for k in range(1,n2+1) if s2[k]>=900])
    key=np.clip((mx-void_t*.6)/90.0,0,1)**.85
    a=np.where(sol,1.0,key)
    # mép giáp mềm 1 px
    edge=sol^nd.binary_erosion(sol)
    a[edge]=np.maximum(key[edge],.75)
    a[voidm&~sol]=np.minimum(a[voidm&~sol],np.clip((mx[voidm&~sol]-4)/60,0,1))
    return a
def flame(rgb,keep=None):
    mx=rgb.max(2);a=np.clip((mx-6)/235.0,0,1)**.8
    if keep is not None:a=np.maximum(a,keep)
    return a
def save(rgb,a,box,name):
    y0,y1,x0,x1=box;r=unpre(rgb[y0:y1,x0:x1],a[y0:y1,x0:x1]);al=(a[y0:y1,x0:x1]*255).astype(np.uint8)
    im=Image.fromarray(np.dstack([r.astype(np.uint8),al]),'RGBA');s=min(1,MAXS/max(im.size));
    if s<1:im=im.resize((max(1,round(im.width*s)),max(1,round(im.height*s))),Image.LANCZOS)
    im.save(os.path.join(OUT,name+'.webp'),'WEBP',quality=88,method=6);return s,im.size
def bbox(a,x0=0,x1=None,y0=0,y1=None,th=.06):
    sub=a[y0:y1,x0:x1]>th;ys=np.where(sub.any(1))[0];xs=np.where(sub.any(0))[0]
    return (y0+ys[0],y0+ys[-1]+1,x0+xs[0],x0+xs[-1]+1)
J={}
def piece(n,name,rgb,a,box,piv,W):
    # piv: tâm xoay theo px ảnh gốc; W: bề ngang ảnh gốc
    s,sz=save(rgb,a,box,'ct%d_%s'%(n,name));y0,y1,x0,x1=box;H=rgb.shape[0]
    J.setdefault('ct%d'%n,{})[name]={'w':sz[0],'h':sz[1],'px':(piv[0]-x0)*s,'py':(piv[1]-y0)*s,'ox':(piv[0]-W/2)/W,'oy':(piv[1]-H/2)/W,'bw':(x1-x0)/W}
def pair(n,rgb,a,mount):
    """chia trái/phải tại cột giữa; mount(side,box) → tâm xoay (x,y) ảnh gốc"""
    H,W=a.shape;m=W//2
    for side,(xa,xb) in (('L',(0,m)),('R',(m,W))):
        b=bbox(a,xa,xb);piece(n,side,rgb,a,b,mount(side,b),W)
# ---- CT1 lưỡi hái: khớp = mép trong, ngang tâm khớp tròn
rgb=load(1);a=mecha(rgb);pair(1,rgb,a,lambda s,b:((b[3]-30) if s=='L' else (b[2]+30),b[0]+(b[1]-b[0])*.42))
# ---- CT2 vòng thiên văn: 1 sprite tròn, tâm = tâm vòng
rgb=load(2);a=mecha(rgb,void_area=3000);b=bbox(a);piece(2,'O',rgb,a,b,((b[2]+b[3])/2,(b[0]+b[1])/2),rgb.shape[1])
# ---- CT3 cánh chữ V
rgb=load(3);a=mecha(rgb);pair(3,rgb,a,lambda s,b:((b[3]-20) if s=='L' else (b[2]+20),b[0]+(b[1]-b[0])*.45))
# ---- CT4 cánh dơi: khớp vai ở góc trên-trong
rgb=load(4);a=mecha(rgb);pair(4,rgb,a,lambda s,b:((b[3]-30) if s=='L' else (b[2]+30),b[0]+(b[1]-b[0])*.30))
# ---- CT5 8 phễu: cụm trái/phải, tâm = mép trong giữa cụm
rgb=load(5);a=mecha(rgb);pair(5,rgb,a,lambda s,b:((b[3]) if s=='L' else (b[2]),(b[0]+b[1])/2))
# ---- CT6 ruy băng lửa: độ sáng → alpha, giữ vòi kim loại
rgb=load(6);H,W=rgb.shape[:2];keep=np.zeros((H,W),np.float32)
for xa,xb in ((int(W*.38),int(W*.47)),(int(W*.53),int(W*.62))):
    ya,yb=int(H*.47),int(H*.68);sub=rgb[ya:yb,xa:xb].max(2);reg=nd.binary_fill_holes(sub>20);keep[ya:yb,xa:xb]=np.maximum(keep[ya:yb,xa:xb],reg.astype(np.float32))
a=flame(rgb,keep);pair(6,rgb,a,lambda s,b:((b[3]-25) if s=='L' else (b[2]+25),b[0]+(b[1]-b[0])*.62))
# ---- CT7 6 cánh: mỗi bên 3 dải ngang (trên / giữa / dưới) theo dòng ít điểm sáng nhất
rgb=load(7);a=mecha(rgb);H,W=a.shape;m=W//2
# mỗi cánh là 1 khối liền (nở 3 px để nối lông vũ); 3 khối lớn nhất mỗi bên = trên / giữa / dưới theo trọng tâm y; mảnh vụn gán khối gần nhất
lab0,n=nd.label(a>.5)
szs=nd.sum(np.ones_like(a),lab0,range(n+1))
for side,(xa,xb) in (('L',(0,m)),('R',(m,W))):
    half=np.zeros_like(lab0);half[:,xa:xb]=lab0[:,xa:xb];ids=[k for k in np.unique(half) if k];big=sorted(ids,key=lambda k:-szs[k])[:3]
    seed=np.where(np.isin(half,big),half,0);_,ind=nd.distance_transform_edt(seed==0,return_indices=True);lab=seed[ind[0],ind[1]]
    cy={k:nd.center_of_mass(lab==k)[0] for k in big};order=sorted(big,key=lambda k:cy[k])
    for name,k in zip(('U','M','D'),order):
        mk=np.where(lab==k,a,0).astype(np.float32);mk[:,:xa]=0;mk[:,xb:]=0;b=bbox(mk)
        piv=((b[3]-14) if side=='L' else (b[2]+14),(b[0]+b[1])/2)
        if name=='U':piv=(piv[0],b[1]-30)
        if name=='D':piv=(piv[0],b[0]+24)
        s_,sz_=save(rgb,mk,b,'ct7_%s%s'%(name,side));y0,y1,x0,x1=b
        J.setdefault('ct7',{})[name+side]={'w':sz_[0],'h':sz_[1],'px':(piv[0]-x0)*s_,'py':(piv[1]-y0)*s_,'ox':(piv[0]-W/2)/W,'oy':(piv[1]-H/2)/W,'bw':(x1-x0)/W}
json.dump(J,open(os.path.join(OUT,'rw23.json'),'w'),indent=1,default=float)
print('xong',sum(len(v) for v in J.values()),'mảnh')
