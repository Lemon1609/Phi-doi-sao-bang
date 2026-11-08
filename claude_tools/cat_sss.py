# V158 · Cắt gói tranh SSS (Phần E, quy cách "sửa nét": icon1/2/3 1024² + dải hiệu ứng) → src/sss_art/<mã>/
# Dùng: python3 claude_tools/cat_sss.py <thư_mục_gói> <mã_sss>
#  icon1..3.png → icon1..3.png 256² (fit 92%)
#  giáp: chan_don (6) → chan.png 6×128 · ky_nang (6) → kn.png 6×192 · tuyet_ky (8) → tk.png 8×256
#  tên lửa / vũ khí phụ: projectile_normal/super (4) → pn/ps 4×(64×128) · impact_normal/super (6) → in/is 6×128 · muzzle → mz 128 · trail → tr 64×256
#                        tuyet_ky (8) → tk 8×256 · beams (2) → bm 2×(64×512) · tran_1_2_3_bt (4) → pod 4×128
#  Alpha < 12 về 0 (xóa quầng li ti GPT để lại ở khe trống).
import sys,os
sys.path.insert(0,os.path.dirname(os.path.abspath(__file__)))
from cat_bo import gaps,groups,sheet,fit
from PIL import Image
import numpy as np
def L(p):
    im=Image.open(p).convert('RGBA');a=np.array(im);a[...,3]=np.where(a[...,3]<12,0,a[...,3]);return Image.fromarray(a,'RGBA')
def runs(im,gap=24):
    a=np.array(im)[...,3].max(0)>12;n=0;i=0;W=len(a)
    while i<W:
        if a[i]:
            n+=1
            while i<W:
                j=i
                while j<W and not a[j]:j+=1
                if j-i>=gap or j>=W:break
                i=j+1
            continue
        i+=1
    return n
def even(im,n):
    # V161 · GPT xếp các khung cách đều theo cả chiều ngang ảnh (kể cả ô trống cuối) → chia đều nếu mọi ranh giới đều trống
    a=np.array(im)[...,3].max(0)>12;W=im.width;w=W/n
    for i in range(1,n):
        x=int(round(i*w))
        if a[max(0,x-3):x+4].any():return None
    fr=[im.crop((int(round(i*w)),0,int(round((i+1)*w)),im.height)) for i in range(n)]
    ne=[np.array(f)[...,3].max()>12 for f in fr]  # V173: cho phép NHIỀU ô trống ở cuối (GPT để 2 ô cuối trống)
    k=sum(ne)
    return fr if k>=max(2,n-3) and all(ne[:k]) and not any(ne[k:]) else None
def split(im,n):
    f=even(im,n)
    if f:return [x if np.array(x)[...,3].max()>12 else Image.new('RGBA',x.size,(0,0,0,0)) for x in f]
    return split_old(im,n)
def widest(im,k):
    # V162 · cắt tại k−1 khe trống RỘNG NHẤT (khung đặt không đều, khe hẹp 20–40 px)
    a=np.array(im)[...,3].max(0)>12;xs=np.where(a)[0]
    if not len(xs):return None
    g=[];i=xs[0]
    while i<=xs[-1]:
        if not a[i]:
            j=i
            while j<=xs[-1] and not a[j]:j+=1
            g.append((j-i,i,j));i=j
        else:i+=1
    if len(g)<k-1:return None
    cut=sorted(g,reverse=True)[:k-1]
    if cut and cut[-1][0]<6:return None
    xs2=[xs[0]]+sorted((s+e)//2 for _,s,e in cut)+[xs[-1]+1]
    return [im.crop((xs2[t],0,xs2[t+1],im.height)) for t in range(k)]
def split_old(im,n):
    a=np.array(im)[...,3].max(0)>12;last=np.where(a)[0][-1] if a.any() else 0
    blank=last<im.width-im.width/n*.8   # ô cuối (theo lưới đều) không có hình → GPT để trống khung cuối
    for k in ((n-1,n) if blank or runs(im)==n-1 else (n,n-1)):
        f=widest(im,k)
        if f and len(f)==k:
            # nếu chỉ n−1 hình mà khe giữa các hình đều rộng hơn hẳn khe trong hình thì hợp lý; thêm ô trống cuối
            return f+[Image.new('RGBA',f[-1].size,(0,0,0,0))]*(n-k)
    return split_older(im,n)
def split_older(im,n):
    if runs(im)==n-1:  # V159: đếm cụm hình — GPT để ô cuối trống thì cắt n−1
        for fn in (groups,gaps):
            try:
                f=fn(im,n-1)
                if len(f)==n-1:return f+[Image.new('RGBA',f[-1].size,(0,0,0,0))]
            except Exception:pass
    for k in (n,n-1):  # V158: GPT có thể để ô cuối trống hẳn (tắt) → cắt n−1 hình rồi thêm 1 ô trống
        for fn in (gaps,groups):
            try:
                f=fn(im,k)
                if len(f)==k:return f+[Image.new('RGBA',f[-1].size,(0,0,0,0))]*(n-k)
            except Exception:pass
    raise SystemExit('không cắt được %d khung'%n)
def main():
    src,sid=sys.argv[1:3];out=f'src/sss_art/{sid}';os.makedirs(out,exist_ok=True);done=[]
    for i in (1,2,3):
        p=f'{src}/icon{i}.png'
        if os.path.exists(p):fit(L(p),256,256,.92).save(f'{out}/icon{i}.png');done.append(f'icon{i}')
    J={'chan_don':('chan',6,128,128),'ky_nang':('kn',6,192,192),'tuyet_ky':('tk',8,256,256),
       'projectile_normal':('pn',4,64,128),'projectile_super':('ps',4,64,128),'impact_normal':('in',6,128,128),'impact_super':('is',6,128,128),
       'tran_1_2_3_bt':('pod',4,128,128),'beams':('bm',2,64,512)}
    for k,(o,n,cw,ch) in J.items():
        p=f'{src}/{k}.png'
        if not os.path.exists(p):continue
        rot=int(os.environ.get('XOAY_'+o,'0'))  # V163: XOAY_kn=90 → xoay ngược chiều kim đồng hồ (hình vẽ nằm ngang mà game cần hướng lên)
        im0=L(p);fr=[im0,im0] if k=='beams' and runs(im0)==1 else split(im0,n)
        sheet(fr,cw,ch,rot=rot,fill=.94).save(f'{out}/{o}.png');done.append(o)
    if os.path.exists(f'{src}/muzzle.png'):fit(L(f'{src}/muzzle.png'),128,128,.94).save(f'{out}/mz.png');done.append('mz')
    if os.path.exists(f'{src}/trail.png'):fit(L(f'{src}/trail.png'),64,256,.96).save(f'{out}/tr.png');done.append('tr')
    # V158 · bản theo quy cách GEAR_FX (như src/tb133/<món>_*) để thay tranh đạn / nổ của MÓN MẸ khi SSS xuất chiến (gear45 sssArt)
    def fade(im,k):
        a=np.array(im).astype(float);a[...,3]*=k;return Image.fromarray(a.astype('uint8'),'RGBA')
    def strip(fr,cw,ch):
        out=Image.new('RGBA',(cw*len(fr),ch),(0,0,0,0))
        for i,f in enumerate(fr):out.alpha_composite(f,(i*cw,0))
        return out
    for k,n in (('projectile_normal',4),('projectile_super',4)):
        p=f'{src}/{k}.png'
        if os.path.exists(p):fr=split(L(p),n)[:3];strip([fit(f,64,128,.94) for f in fr],64,128).save(f'{out}/g_{k}.png');done.append('g_'+k)
    for k,n,c in (('impact_normal',6,128),('impact_super',6,192)):
        p=f'{src}/{k}.png'
        if os.path.exists(p):
            sh=sheet(split(L(p),n),c,c,fill=.94);fr=[sh.crop((i*c,0,(i+1)*c,c)) for i in range(n)];fr[-1]=fade(fr[-1],.45);fr+= [fade(fr[-1],.5),fade(fr[-1],.2)]
            strip(fr,c,c).save(f'{out}/g_{k}.png');done.append('g_'+k)
    if os.path.exists(f'{src}/muzzle.png'):fit(L(f'{src}/muzzle.png'),96,96,.94).save(f'{out}/g_muzzle.png');done.append('g_muzzle')
    if os.path.exists(f'{src}/trail.png'):fit(L(f'{src}/trail.png'),32,96,.98).save(f'{out}/g_trail.png');done.append('g_trail')
    if os.path.exists(f'{src}/beams.png'):
        _b=L(f'{src}/beams.png')
        _one=runs(_b)==1  # V174: GPT có thể chỉ vẽ 1 tia → dùng cho cả 2 (tia mạnh rộng hơn)
        for i,f in enumerate([_b,_b] if _one else split(_b,2)):
            from cat_bo import crop
            c=crop(f);h=c.height;c=c.crop((0,int(h*.12),c.width,int(h*.88)))  # bỏ 2 đầu thon để lặp liền
            c=c.resize((64,256),Image.LANCZOS)
            if _one and i==1:
                w=Image.new('RGBA',(64,256),(0,0,0,0));cc=c.resize((83,256),Image.LANCZOS).crop((9,0,73,256));w.alpha_composite(cc);c=w
            c.save(f'{out}/g_beam_{"normal" if i==0 else "super"}.png');done.append('g_beam'+str(i))
    if os.path.exists(f'{src}/tran_1_2_3_bt.png'):
        for i,f in enumerate(split(L(f'{src}/tran_1_2_3_bt.png'),4),1):fit(f,128,128,.94).save(f'{out}/g_pod{i}.png');done.append(f'g_pod{i}')
    print(sid,len(done),'tệp:',' '.join(done))
if __name__=='__main__':main()
