# V2.4-A · cắt 20 bộ cánh riêng (tranh GPT nền đen, chủ dự án 28/11) → src/wing24img/<khóa>.webp + wing24.json
# Dùng: python3 claude_tools/wing24_cat.py <thư mục 90639.png…> <ra>
#  Bảng tệp (chủ dự án): 90639 2×2 = s0 s1 / s2 s3 · 90645 2×2 = s4 s5 / s6 s7 · 90642 2×2 = s8 s9 / s10 s11
#   90640 1×2 = s12 | ct2_O (khối tròn, không lật) · 90643 2×2 = ct1 ct3 / ct4 ct5 · 90641 1×2 = ct6 | ct7
#  Mỗi ảnh là NỬA CÁNH PHẢI: gốc sát mép trái, mã lật gương bên trái.
#  Tách nền lai: nền đen ngoài (loang từ mép) + khe đen kín lớn = trong suốt; giáp kim loại (khối sáng liền, lấp lỗ nhỏ) đục 100 %;
#  phần năng lượng / quầng sáng = độ sáng → alpha rồi khử nhân đen (unpremultiply) → không viền xám trên nền sáng.
#  Tâm xoay (neo) = tâm lõi tròn sáng ở 40 % bên trái khối giáp; s8–s11 neo sát mép phẳng trái.
import sys,os,json
import numpy as np
from PIL import Image
from scipy import ndimage as nd
SRC,OUT=sys.argv[1],sys.argv[2];os.makedirs(OUT,exist_ok=True)
MAXS=int(os.environ.get('MAXS','300'));Q=int(os.environ.get('Q','82'))
GRID={'90639':(2,2,['s0','s1','s2','s3']),'90645':(2,2,['s4','s5','s6','s7']),'90642':(2,2,['s8','s9','s10','s11']),
      '90640':(1,2,['s12','ct2']),'90643':(2,2,['ct1','ct3','ct4','ct5']),'90641':(1,2,['ct6','ct7'])}
SOFT={'s0','s7','ct6'}          # lửa / tia mảnh: khóa đen mềm rộng hơn
EDGE={'s8','s9','s10','s11'}
LEFTCORE={'s2'}
MANUAL={'s0':(.081,.434),'s12':(.051,.469),'ct3':(.090,.352),'ct5':(.094,.371)}  # neo đặt tay (tỉ lệ ảnh ra), đo bằng mắt 28/11    # neo sát mép phẳng trái
def unpre(rgb,a):
    o=rgb.copy();m=a>.004
    for c in range(3):o[...,c][m]=np.clip(rgb[...,c][m]/a[m],0,255)
    return o
def alpha(rgb,k):
    mx=rgb.max(2);void_t=16
    bg=mx<=void_t;lab,n=nd.label(bg)
    border=set(np.unique(np.concatenate([lab[0],lab[-1],lab[:,0],lab[:,-1]])))-{0}
    sizes=nd.sum(np.ones_like(mx),lab,range(n+1))
    voidm=np.isin(lab,[i for i in range(1,n+1) if i in border or sizes[i]>=(250 if k!='ct2' else 2000)])
    # giáp: không bão hòa nhiều (kim loại bạc/vàng/đen nhám) hoặc khối sáng liền; năng lượng = bão hòa cao → mềm
    mn=rgb.min(2);sat=(mx-mn)/np.maximum(mx,1)
    metal=(mx>40)&((sat<.55)|(mx>200))
    sol=nd.binary_closing(metal,iterations=2);sol=nd.binary_fill_holes(sol)&~voidm;sol=nd.binary_opening(sol,iterations=2)
    lab2,n2=nd.label(sol);s2=nd.sum(np.ones_like(mx),lab2,range(n2+1))
    sol=np.isin(lab2,[i for i in range(1,n2+1) if s2[i]>=(1500 if k not in SOFT else 2500)])
    if k in SOFT:sol=nd.binary_erosion(sol,iterations=2)
    key=np.clip((mx-void_t*.5)/(110.0 if k in SOFT else 85.0),0,1)**.8
    a=np.where(sol,1.0,key)
    edge=sol^nd.binary_erosion(sol);a[edge]=np.maximum(key[edge],.7)
    a[voidm&~sol]=np.minimum(a[voidm&~sol],np.clip((mx[voidm&~sol]-4)/60,0,1))
    a[a<.02]=0
    return a,sol
def bbox(m):
    ys=np.where(m.any(1))[0];xs=np.where(m.any(0))[0];return ys[0],ys[-1]+1,xs[0],xs[-1]+1
J={}
for f,(R,C,keys) in GRID.items():
    im=np.asarray(Image.open(os.path.join(SRC,f+'.png')).convert('RGB')).astype(np.float32);H,W=im.shape[:2]
    for i,k in enumerate(keys):
        r,c=divmod(i,C);cell=im[r*H//R:(r+1)*H//R, c*W//C:(c+1)*W//C]
        a,sol=alpha(cell,k)
        # bỏ mảnh vụn rất nhỏ xa khối chính (giữ mảnh năng lượng bay rời của s5: ngưỡng thấp)
        lab,n=nd.label(a>.08);sz=nd.sum(np.ones_like(a),lab,range(n+1))
        keep=np.isin(lab,[j for j in range(1,n+1) if sz[j]>=(30 if k=='s5' else 120)])
        a=a*nd.binary_dilation(keep,iterations=6)
        y0,y1,x0,x1=bbox(a>.06);pad=4;y0=max(0,y0-pad);x0=max(0,x0-pad);y1=min(a.shape[0],y1+pad);x1=min(a.shape[1],x1+pad)
        rgb=unpre(cell[y0:y1,x0:x1],a[y0:y1,x0:x1]);al=a[y0:y1,x0:x1];sl=sol[y0:y1,x0:x1]
        hh,ww=al.shape
        if k=='ct2':ax,ay=ww/2,hh/2
        else:
            # lõi: tâm khối giáp DÀY nhất (biến đổi khoảng cách) trong 45 % trái — hub tròn quanh lõi sáng
            fil=nd.binary_fill_holes(sl);dt=nd.distance_transform_edt(fil);dt[:,int(ww*.45):]=0
            ay,ax=np.unravel_index(int(np.argmax(dt)),dt.shape);ay,ax=float(ay),float(ax)
            # tinh chỉnh vào điểm sáng nhất trong bán kính hub (lõi phát sáng)
            r=max(6,int(dt.max()*.8));mx=cell[y0:y1,x0:x1].max(2);ya,yb,xa,xb=int(max(0,ay-r)),int(min(hh,ay+r)),int(max(0,ax-r)),int(min(ww,ax+r))
            sub=mx[ya:yb,xa:xb];hot=sub>=np.percentile(sub,97)
            if hot.any():cy,cx=nd.center_of_mass(hot);ay,ax=ya+cy,xa+cx
            if k in LEFTCORE:  # lõi sát mép trái, giáp quanh mỏng: điểm sáng gọn nhất trong 22 % trái
                mx=cell[y0:y1,x0:x1].max(2);reg=np.zeros_like(mx,bool);reg[:,:int(ww*.22)]=True;reg&=al>.6
                hot=(mx>=np.percentile(mx[reg],96))&reg;lab3,n3=nd.label(hot)
                if n3:s3=nd.sum(hot,lab3,range(n3+1));j=int(np.argmax(s3[1:]))+1;ay,ax=nd.center_of_mass(lab3==j)
            if k in EDGE:
                cols=np.where(sl[int(ay)-20:int(ay)+20].any(0))[0];ax=float(cols[0]+6 if len(cols) else 6)
        s=min(1,MAXS/max(ww,hh))
        out=Image.fromarray(np.dstack([rgb.astype(np.uint8),(al*255).astype(np.uint8)]),'RGBA')
        if s<1:out=out.resize((max(1,round(ww*s)),max(1,round(hh*s))),Image.LANCZOS)
        p=os.path.join(OUT,k+'.webp');out.save(p,'WEBP',quality=Q,method=6,exact=False)
        J[k]={'w':out.width,'h':out.height,'ax':round(ax*s,1),'ay':round(ay*s,1),'kb':round(os.path.getsize(p)/1024,1)}
        # màu tông (cho hào quang tàu con / vòng xung): điểm ảnh rực (α>.7, bão hòa>.45) ở 45 % phải (lưỡi năng lượng)
        rr=rgb[:,int(ww*.55):];aa=al[:,int(ww*.55):];mxx=rr.max(2);mnn=rr.min(2);sat=(mxx-mnn)/np.maximum(mxx,1);m=(aa>.7)&(sat>.45)&(mxx>120)
        cc=np.median(rr[m],0) if m.sum()>50 else np.median(rgb[al>.7],0);J[k]['col']='#%02x%02x%02x'%tuple(int(v) for v in cc)
        if k in MANUAL:J[k]['ax']=round(MANUAL[k][0]*out.width,1);J[k]['ay']=round(MANUAL[k][1]*out.height,1)
        J[k]['ax']=float(J[k]['ax']);J[k]['ay']=float(J[k]['ay'])
        print(k,J[k],flush=True)
json.dump(J,open(os.path.join(OUT,'wing24.json'),'w'),indent=1)
print('TỔNG KB',round(sum(v['kb'] for v in J.values()),1))
