# Cắt bảng tranh GPT (Phần J) thành tệp game cho src/tb133/
# Dùng: python3 claude_tools/cat_bo.py <thư_mục_gói> <thư_mục_ra> mã:loại [mã:loại ...]
#   loại: armor | missiles | sidearm.  Gói có thư mục con theo mã, mỗi thư mục gồm:
#   icons.png (3 hình) · impact.png (8 khung) · muzzle_trail.png (chớp | vệt) hoặc muzzle.png + trail.png riêng (từ Bộ 05) · beams.png (thường | super)
#   projectile_normal.png / projectile_super.png (4 khung) · tran_1_2_3_bt.png (4 hình, chỉ vũ khí phụ)
#   Biến môi trường XOAY_<mã>_<normal|super|muzzle>=90 (muzzle: chỉ với muzzle.png riêng; chớp phải hướng LÊN)
#   Đạn super mặc định thu theo chiều cao (SUPER_CAO=0 để về cách cũ). Biến cũ: để xoay đạn nằm ngang về hướng lên.
import sys,os
import numpy as np
from PIL import Image
def bbox(im,t=10):return im.getchannel('A').point(lambda v:255 if v>t else 0).getbbox()
def crop(im):b=bbox(im,12);return im.crop(b) if b else im
def prof(im):a=np.array(im).astype(float);return (a[:,:,3]/255*(a[:,:,:3].max(axis=2)/255)).sum(axis=0)
def groups(im,n):
    """Tách n hình theo khoảng trống cột; gộp các cụm vụn; nếu thiếu thì tách cụm rộng nhất tại cột mảnh nhất."""
    p=prof(im);occ=p>2;runs=[];s=None
    for i,v in enumerate(occ):
        if v and s is None:s=i
        if not v and s is not None:runs.append([s,i]);s=None
    if s is not None:runs.append([s,len(occ)])
    runs=[r for r in runs if r[1]-r[0]>6]
    while len(runs)>n:
        g=[runs[i+1][0]-runs[i][1] for i in range(len(runs)-1)];k=int(np.argmin(g));runs[k]=[runs[k][0],runs[k+1][1]];del runs[k+1]
    sm=np.convolve(p,np.ones(15)/15,mode='same')
    while len(runs)<n:
        j=max(range(len(runs)),key=lambda i:runs[i][1]-runs[i][0]);a0,b0=runs[j];w=b0-a0
        lo=a0+int(w*.25);hi=b0-int(w*.25);c=lo+int(np.argmin(sm[lo:hi]));runs[j:j+1]=[[a0,c],[c,b0]]
    cuts=[0]+[(runs[i][1]+runs[i+1][0])//2 for i in range(len(runs)-1)]+[im.width]
    return [im.crop((cuts[i],0,cuts[i+1],im.height)) for i in range(len(runs))]
def gaps(im,n,win=61,gap=150):
    """V146: tách n khung theo n-1 khe tối nhất trên cột đã làm mượt (khung có quầng chạm nhau / khung rỗ giữa)."""
    p=prof(im);sm=np.convolve(p,np.ones(win)/win,mode='same');occ=np.where(sm>1)[0];a,b=occ[0],occ[-1];sel=[]
    for c in np.argsort(sm[a:b])+a:
        if all(abs(c-x)>=gap for x in sel) and c-a>=gap*.6 and b-c>=gap*.6:sel.append(int(c))
        if len(sel)==n-1:break
    c=[0]+sorted(sel)+[im.width];return [im.crop((c[i],0,c[i+1],im.height)) for i in range(n)]
def muzzle_peak(im):
    """V150: muzzle.png là dải nhiều trạng thái (rộng > 2× cao) → tách theo khe tối, chọn khung sáng nhất không bị dính (rộng ≤ 1,8× trung vị)."""
    if im.width<=2*im.height:return im
    p=prof(im);sm=np.convolve(p,np.ones(15)/15,mode='same');occ=sm>2;runs=[];st=None
    for i,v in enumerate(occ):
        if v and st is None:st=i
        if not v and st is not None:runs.append((st,i));st=None
    if st is not None:runs.append((st,len(occ)))
    n=len([r for r in runs if r[1]-r[0]>20])
    if n<2:return im
    fr=[crop(f) for f in gaps(im,n,win=31,gap=80)];ws=sorted(f.width for f in fr);med=ws[len(ws)//2]
    ok=[f for f in fr if f.width<=1.8*med] or fr
    return max(ok,key=lambda f:float((np.array(f).astype(float)[:,:,3]/255).sum()))
def fit(im,W,H,fill=.92):
    c=crop(im);k=min(W*fill/c.width,H*fill/c.height);c=c.resize((max(1,round(c.width*k)),max(1,round(c.height*k))),Image.LANCZOS)
    cv=Image.new('RGBA',(W,H),(0,0,0,0));cv.alpha_composite(c,((W-c.width)//2,(H-c.height)//2));return cv
def sheet(fr,cw,ch,rot=0,fill=.92):
    fr=[f.rotate(rot,expand=True) if rot else f for f in fr];cr=[crop(f) for f in fr]
    mw=max(c.width for c in cr);mh=max(c.height for c in cr);k=min(cw*fill/mw,ch*fill/mh)
    out=Image.new('RGBA',(cw*len(cr),ch),(0,0,0,0))
    for i,c in enumerate(cr):
        c=c.resize((max(1,round(c.width*k)),max(1,round(c.height*k))),Image.LANCZOS);out.alpha_composite(c,(i*cw+(cw-c.width)//2,(ch-c.height)//2))
    return out
def sheet_cao(fr,cw,ch,fill=.98,mep=4):
    """V146: đạn super thu theo CHIỀU CAO (không nhỏ hơn đạn thường); quầng tràn ngang bị cắt, mép làm mờ dần."""
    cr=[crop(f) for f in fr];k=ch*fill/max(c.height for c in cr);out=Image.new('RGBA',(cw*len(cr),ch),(0,0,0,0))
    ramp=np.ones(cw);ramp[:mep]=np.linspace(.15,1,mep);ramp[-mep:]=np.linspace(1,.15,mep)
    for i,c in enumerate(cr):
        c=c.resize((max(1,round(c.width*k)),max(1,round(c.height*k))),Image.LANCZOS)
        big=Image.new('RGBA',(max(cw,c.width),ch),(0,0,0,0));big.alpha_composite(c,((big.width-c.width)//2,(ch-c.height)//2))
        x0=(big.width-cw)//2;cell=big.crop((x0,0,x0+cw,ch))
        if c.width>cw:
            a=np.array(cell).astype(float);a[...,3]*=ramp[None,:];cell=Image.fromarray(a.astype('uint8'),'RGBA')
        out.alpha_composite(cell,(i*cw,0))
    return out
def beam(im,W=64,H=256,ov=48):
    """Tia lặp dọc: lấy dải giữa, đưa về rộng 64, trộn chéo 48 px đầu/cuối để mép trên và dưới khớp nhau."""
    b=bbox(im,20);c=im.crop((b[0],0,b[2],im.height));c=c.crop((0,int(c.height*.2),c.width,int(c.height*.8)))
    k=W*.95/c.width;c=c.resize((max(1,round(c.width*k)),max(1,round(c.height*k))),Image.LANCZOS)
    seg=Image.new('RGBA',(W,c.height),(0,0,0,0));seg.alpha_composite(c,((W-c.width)//2,0))
    if seg.height<H+ov:seg=seg.resize((W,H+ov),Image.LANCZOS)
    a=np.array(seg).astype(float)[:H+ov];w=np.linspace(0,1,ov)[:,None,None];out=a[:H].copy();out[:ov]=a[H:H+ov]*(1-w)+a[:ov]*w
    return Image.fromarray(np.clip(out,0,255).astype('uint8'),'RGBA')
def main():
    src,dst=sys.argv[1],sys.argv[2];os.makedirs(dst,exist_ok=True);done=[]
    for spec in sys.argv[3:]:
        m,kind=spec.split(':');d=os.path.join(src,m);L=lambda f:Image.open(os.path.join(d,f)).convert('RGBA')
        for i,c in enumerate(groups(L('icons.png'),3),1):crop(c).save(f'{dst}/{m}_icon{i}.png');done.append(f'{m}_icon{i}')
        if kind=='sidearm' and os.path.exists(os.path.join(d,'tran_1_2_3_bt.png')):
            for nm,c in zip(['tran1','tran2','tran3','tranbt'],groups(L('tran_1_2_3_bt.png'),4)):crop(c).save(f'{dst}/{m}_{nm}.png');done.append(f'{m}_{nm}')
        pw,ph=(48,128) if kind=='missiles' else (32,64)
        for v in ['normal','super']:
            rot=int(os.environ.get(f'XOAY_{m}_{v}','0'))
            fr4=groups(L(f'projectile_{v}.png'),4)
            (sheet_cao([f.rotate(rot,expand=True) if rot else f for f in fr4],pw,ph) if v=='super' and os.environ.get('SUPER_CAO','1')=='1' else sheet(fr4,pw,ph,rot=rot)).save(f'{dst}/{m}_projectile_{v}.png');done.append(f'{m}_projectile_{v}')
        fr=gaps(L('impact.png'),8) if os.environ.get('IMPACT_KHE','1')=='1' else groups(L('impact.png'),8);sheet(fr,128,128,fill=.96).save(f'{dst}/{m}_impact_normal.png');sheet(fr,192,192,fill=.96).save(f'{dst}/{m}_impact_super.png');done+= [f'{m}_impact_normal',f'{m}_impact_super']
        mz,tr=(muzzle_peak(L('muzzle.png')).rotate(int(os.environ.get(f'XOAY_{m}_muzzle','0')),expand=True),L('trail.png')) if os.path.exists(os.path.join(d,'muzzle.png')) else groups(L('muzzle_trail.png'),2);fit(mz,96,96,.95).save(f'{dst}/{m}_muzzle.png');fit(tr,32,96,.94).save(f'{dst}/{m}_trail.png');done+=[f'{m}_muzzle',f'{m}_trail']
        bn,bs=groups(L('beams.png'),2);beam(bn).save(f'{dst}/{m}_beam_normal.png');beam(bs).save(f'{dst}/{m}_beam_super.png');done+=[f'{m}_beam_normal',f'{m}_beam_super']
    print(len(done),'tệp:',' '.join(done))
if __name__=='__main__':main()
